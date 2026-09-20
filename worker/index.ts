/** Cloudflare Worker entry point for the vinext-starter template. */
import { handleImageOptimization, DEFAULT_DEVICE_SIZES, DEFAULT_IMAGE_SIZES } from "vinext/server/image-optimization";
import handler from "vinext/server/app-router-entry";
import { setD1Binding } from "../db";
import { readSessionToken } from "../lib/auth/http";
import { findAccountBySessionToken } from "../lib/auth/repository";

export { OverlookedRoom } from "./overlooked-room";

interface Env {
  ASSETS: Fetcher;
  DB?: D1Database;
  OVERLOOKED_ROOMS?: DurableObjectNamespace;
  IMAGES: {
    input(stream: ReadableStream): {
      transform(options: Record<string, unknown>): {
        output(options: { format: string; quality: number }): Promise<{ response(): Response }>;
      };
    };
  };
}

interface ExecutionContext {
  waitUntil(promise: Promise<unknown>): void;
  passThroughOnException(): void;
}

// Image security config. SVG sources with .svg extension auto-skip the
// optimization endpoint on the client side (served directly, no proxy).
// To route SVGs through the optimizer (with security headers), set
// dangerouslyAllowSVG: true in next.config.js and uncomment below:
// const imageConfig: ImageConfig = { dangerouslyAllowSVG: true };

const worker = {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    if (env.DB) setD1Binding(env.DB);
    const url = new URL(request.url);

    if (url.pathname === "/api/arcade/overlooked/room" ||
      url.pathname === "/api/arcade/overlooked/room/socket") {
      if (!env.DB || !env.OVERLOOKED_ROOMS) {
        return Response.json({ error: "Salas online indisponíveis neste ambiente." }, { status: 503 });
      }
      const account = await findAccountBySessionToken(readSessionToken(request));
      if (!account) return Response.json({ error: "Entre na sua conta para jogar em dupla." }, { status: 401 });
      const headers = new Headers({
        "X-Overlooked-Account-Id": account.id,
        "X-Overlooked-Account-Name": account.name,
      });
      if (url.pathname.endsWith("/socket")) {
        const code = url.searchParams.get("code")?.trim().toUpperCase() ?? "";
        if (!/^[A-Z2-9]{8}$/.test(code) || request.headers.get("Upgrade")?.toLowerCase() !== "websocket") {
          return Response.json({ error: "Conexão inválida." }, { status: 400 });
        }
        headers.set("Upgrade", "websocket");
        return env.OVERLOOKED_ROOMS.get(env.OVERLOOKED_ROOMS.idFromName(code))
          .fetch(new Request("https://room/socket", { headers }));
      }
      if (request.method !== "POST") return Response.json({ error: "Método inválido." }, { status: 405 });
      let body: { action?: unknown; code?: unknown };
      try { body = await request.json() as typeof body; } catch {
        return Response.json({ error: "Pedido inválido." }, { status: 400 });
      }
      if (body.action === "join") {
        const code = typeof body.code === "string" ? body.code.trim().toUpperCase() : "";
        if (!/^[A-Z2-9]{8}$/.test(code)) return Response.json({ error: "Digite um código de oito caracteres." }, { status: 400 });
        return env.OVERLOOKED_ROOMS.get(env.OVERLOOKED_ROOMS.idFromName(code))
          .fetch(new Request("https://room/join", { method: "POST", headers }));
      }
      if (body.action === "create") {
        const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
        for (let attempt = 0; attempt < 4; attempt += 1) {
          const bytes = crypto.getRandomValues(new Uint8Array(8));
          const code = Array.from(bytes, (value) => alphabet[value % alphabet.length]).join("");
          headers.set("X-Overlooked-Code", code);
          const response = await env.OVERLOOKED_ROOMS.get(env.OVERLOOKED_ROOMS.idFromName(code))
            .fetch(new Request("https://room/create", { method: "POST", headers }));
          if (response.status !== 409) return response;
        }
        return Response.json({ error: "Não foi possível abrir uma sala. Tente novamente." }, { status: 503 });
      }
      return Response.json({ error: "Ação desconhecida." }, { status: 400 });
    }

    if (url.pathname === "/_vinext/image") {
      const allowedWidths = [...DEFAULT_DEVICE_SIZES, ...DEFAULT_IMAGE_SIZES];
      return handleImageOptimization(request, {
        fetchAsset: (path) => env.ASSETS.fetch(new Request(new URL(path, request.url))),
        transformImage: async (body, { width, format, quality }) => {
          const result = await env.IMAGES.input(body).transform(width > 0 ? { width } : {}).output({ format, quality });
          return result.response();
        },
      }, allowedWidths);
    }

    return handler.fetch(request, env, ctx);
  },
};

export default worker;
