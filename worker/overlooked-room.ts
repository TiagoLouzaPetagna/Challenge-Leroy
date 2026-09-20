import { DurableObject } from "cloudflare:workers";

import { setD1Binding } from "../db";
import {
  completeOverlookedDuoRuns,
  startOverlookedDuoRuns,
} from "../lib/arcade/repository";

type RoomEnv = { DB: D1Database };
type RoomStatus = "waiting" | "playing" | "completed" | "abandoned";
type RoomData = {
  code: string;
  hostId: string;
  hostName: string;
  guestId: string | null;
  guestName: string | null;
  status: RoomStatus;
  createdAt: number;
  startedAt?: string;
  hostRunId?: string;
  guestRunId?: string;
  result?: unknown;
};
type SocketIdentity = { accountId: string; role: "host" | "guest" };

function jsonError(message: string, status: number) {
  return Response.json({ error: message }, { status });
}

export class OverlookedRoom extends DurableObject<RoomEnv> {
  private lastSnapshotAt = 0;
  private startPending = false;
  private completionPending = false;

  private async room() {
    return (await this.ctx.storage.get<RoomData>("room")) ?? null;
  }

  private sockets(role?: SocketIdentity["role"]) {
    return this.ctx.getWebSockets().filter((socket) => {
      const identity = socket.deserializeAttachment() as SocketIdentity | null;
      return !role || identity?.role === role;
    });
  }

  private send(role: SocketIdentity["role"] | null, payload: unknown) {
    const message = JSON.stringify(payload);
    for (const socket of this.sockets(role ?? undefined)) {
      try { socket.send(message); } catch { /* A close event will clean up the peer. */ }
    }
  }

  private announce(room: RoomData) {
    this.send(null, {
      type: "room",
      code: room.code,
      status: room.status,
      hostName: room.hostName,
      guestName: room.guestName,
      hostConnected: this.sockets("host").length > 0,
      guestConnected: this.sockets("guest").length > 0,
      startedAt: room.startedAt ?? null,
    });
  }

  async fetch(request: Request): Promise<Response> {
    setD1Binding(this.env.DB);
    const accountId = request.headers.get("X-Overlooked-Account-Id");
    const name = request.headers.get("X-Overlooked-Account-Name")?.slice(0, 80);
    if (!accountId || !name) return jsonError("Sessão necessária.", 401);
    const path = new URL(request.url).pathname;
    const room = await this.room();

    if (path === "/create" && request.method === "POST") {
      if (room) return jsonError("Este código já está em uso.", 409);
      const code = request.headers.get("X-Overlooked-Code") ?? "";
      if (!/^[A-Z2-9]{8}$/.test(code)) return jsonError("Código inválido.", 400);
      const created: RoomData = {
        code, hostId: accountId, hostName: name,
        guestId: null, guestName: null, status: "waiting", createdAt: Date.now(),
      };
      await this.ctx.storage.put("room", created);
      await this.ctx.storage.setAlarm(Date.now() + 2 * 60 * 60 * 1000);
      return Response.json({ code, role: "host" });
    }

    if (!room) return jsonError("Sala não encontrada.", 404);
    if (path === "/join" && request.method === "POST") {
      if (room.guestId === accountId && (room.status === "waiting" || room.status === "playing")) {
        return Response.json({ code: room.code, role: "guest" });
      }
      if (room.status !== "waiting") return jsonError("Esta partida já começou.", 409);
      if (accountId === room.hostId) return jsonError("Entre com outra conta para formar a dupla.", 409);
      if (room.guestId && room.guestId !== accountId) return jsonError("A sala já tem uma dupla.", 409);
      room.guestId = accountId;
      room.guestName = name;
      await this.ctx.storage.put("room", room);
      this.announce(room);
      return Response.json({ code: room.code, role: "guest" });
    }

    if (path === "/socket" && request.headers.get("Upgrade")?.toLowerCase() === "websocket") {
      const role = accountId === room.hostId ? "host" : accountId === room.guestId ? "guest" : null;
      if (!role) return jsonError("Você não participa desta sala.", 403);
      if (room.status === "abandoned") return jsonError("Esta partida foi interrompida.", 410);
      const pair = new WebSocketPair();
      const [client, server] = Object.values(pair);
      for (const previous of this.sockets(role)) previous.close(1000, "Nova conexão da mesma conta");
      this.ctx.acceptWebSocket(server);
      server.serializeAttachment({ accountId, role } satisfies SocketIdentity);
      server.send(JSON.stringify({ type: "connected", role }));
      this.announce(room);
      if (role === "guest" && room.status === "playing" && room.startedAt) {
        server.send(JSON.stringify({ type: "started", startedAt: room.startedAt }));
      }
      if (room.status === "completed" && room.result) {
        server.send(JSON.stringify({ type: "completed", result: room.result }));
      }
      return new Response(null, { status: 101, webSocket: client });
    }

    return jsonError("Ação desconhecida.", 404);
  }

  async webSocketMessage(socket: WebSocket, raw: string | ArrayBuffer) {
    if (typeof raw !== "string" || raw.length > 100_000) return;
    let message: Record<string, unknown>;
    try { message = JSON.parse(raw) as Record<string, unknown>; } catch { return; }
    const identity = socket.deserializeAttachment() as SocketIdentity | null;
    const room = await this.room();
    if (!identity || !room) return;

    if (message.type === "start" && identity.role === "host" && room.status === "waiting") {
      if (this.startPending) return;
      if (!room.guestId || !this.sockets("host").length || !this.sockets("guest").length) {
        socket.send(JSON.stringify({ type: "error", message: "Aguarde a outra pessoa entrar na sala." }));
        return;
      }
      try {
        this.startPending = true;
        setD1Binding(this.env.DB);
        const started = await startOverlookedDuoRuns(room.hostId, room.guestId);
        Object.assign(room, started);
        room.status = "playing";
        await this.ctx.storage.put("room", room);
        this.send(null, { type: "started", startedAt: started.startedAt });
        this.announce(room);
      } catch {
        socket.send(JSON.stringify({ type: "error", message: "Não foi possível iniciar a partida." }));
      } finally {
        this.startPending = false;
      }
      return;
    }

    if (room.status !== "playing") return;
    if (identity.role === "guest") {
      if (message.type === "input" && Array.isArray(message.keys)) {
        const keys = message.keys.filter((key) => ["w", "a", "s", "d"].includes(key)).slice(0, 4);
        this.send("host", { type: "input", keys });
      } else if (message.type === "action") {
        this.send("host", { type: "action" });
      } else if (message.type === "decision" && ["accept", "report", "close"].includes(String(message.value))) {
        this.send("host", { type: "decision", value: message.value });
      }
      return;
    }

    if (message.type === "snapshot") {
      if (Date.now() - this.lastSnapshotAt < 80 || !message.state || typeof message.state !== "object") return;
      this.lastSnapshotAt = Date.now();
      this.send("guest", { type: "snapshot", state: message.state });
      return;
    }

    if (message.type === "complete" && room.guestId && room.hostRunId && room.guestRunId) {
      if (this.completionPending) return;
      if (!this.sockets("guest").length) {
        socket.send(JSON.stringify({ type: "error", message: "A dupla precisa estar conectada no fim da partida." }));
        return;
      }
      try {
        this.completionPending = true;
        setD1Binding(this.env.DB);
        const result = await completeOverlookedDuoRuns(
          room.hostId, room.guestId, room.hostRunId, room.guestRunId,
          { durationSeconds: message.durationSeconds, outcomes: message.outcomes },
        );
        room.status = "completed";
        room.result = result;
        await this.ctx.storage.put("room", room);
        this.send(null, { type: "completed", result, state: message.state });
        this.announce(room);
      } catch (error) {
        socket.send(JSON.stringify({
          type: "error",
          message: error instanceof Error ? error.message : "Não foi possível registrar o resultado.",
        }));
      } finally {
        this.completionPending = false;
      }
    }
  }

  async webSocketClose(socket: WebSocket) {
    const identity = socket.deserializeAttachment() as SocketIdentity | null;
    if (!identity) return;
    const room = await this.room();
    if (!room) return;
    if (identity.role === "host" && room.status === "playing" && !this.sockets("host").length) {
      room.status = "abandoned";
      await this.ctx.storage.put("room", room);
      this.send("guest", { type: "error", message: "A conexão de quem criou a sala caiu. Inicie uma nova partida." });
    }
    this.announce(room);
  }

  async alarm() {
    for (const socket of this.ctx.getWebSockets()) socket.close(1000, "Sala expirada");
    await this.ctx.storage.deleteAll();
  }
}
