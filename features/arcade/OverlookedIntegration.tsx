"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Copy, Gamepad2, Maximize2, Trophy, UsersRound } from "lucide-react";

import type {
  OverlookedDuoLeaderboardResponse,
  OverlookedLeaderboardResponse,
  OverlookedValidatedResult,
} from "@/lib/arcade/overlooked";
import { ArcadeLeaderboardPodium } from "./ArcadeLeaderboardPodium";

const GAME_SOURCE = "fortifica:overlooked-game";
const PLATFORM_SOURCE = "fortifica:arcade-platform";
const BRIDGE_VERSION = 1;

type GameMessage = {
  source?: string;
  version?: number;
  type?: string;
  runId?: unknown;
  durationSeconds?: unknown;
  outcomes?: unknown;
  roomStatus?: unknown;
  roomPhase?: unknown;
  guestName?: unknown;
  guestConnected?: unknown;
  result?: unknown;
  message?: unknown;
};

type OnlineRoom = { code: string; role: "host" | "guest" };

function invitationCode() {
  if (typeof window === "undefined") return "";
  const code = new URLSearchParams(window.location.search).get("officeRoom")?.trim().toUpperCase() ?? "";
  return /^[A-Z2-9]{8}$/.test(code) ? code : "";
}

type CompleteResponse = {
  accepted: true;
  result: OverlookedValidatedResult;
  leaderboard: OverlookedLeaderboardResponse;
};

async function responseMessage(response: Response, fallback: string) {
  try {
    const body = (await response.json()) as { error?: unknown };
    return typeof body.error === "string" ? body.error : fallback;
  } catch {
    return fallback;
  }
}

export function OverlookedIntegration() {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const activeRunRef = useRef<string | null>(null);
  const completingRunRef = useRef<string | null>(null);
  const [isStarting, setIsStarting] = useState(false);
  const [localLeaderboard, setLocalLeaderboard] =
    useState<OverlookedLeaderboardResponse | null>(null);
  const [duoLeaderboard, setDuoLeaderboard] =
    useState<OverlookedDuoLeaderboardResponse | null>(null);
  const [rankingError, setRankingError] = useState<string | null>(null);
  const [lastResult, setLastResult] = useState<OverlookedValidatedResult | null>(null);
  const [mode, setMode] = useState<"local" | "online">("local");
  const leaderboard = mode === "online" ? duoLeaderboard : localLeaderboard;
  const [room, setRoom] = useState<OnlineRoom | null>(null);
  const [roomCode, setRoomCode] = useState("");
  const [roomBusy, setRoomBusy] = useState(false);
  const [roomStatus, setRoomStatus] = useState("");
  const [roomPhase, setRoomPhase] = useState("waiting");
  const [guestName, setGuestName] = useState<string | null>(null);
  const [guestConnected, setGuestConnected] = useState(false);
  const inviteAttempted = useRef(false);

  const sendToGame = useCallback((type: string, payload: Record<string, unknown> = {}) => {
    iframeRef.current?.contentWindow?.postMessage(
      { source: PLATFORM_SOURCE, version: BRIDGE_VERSION, type, ...payload },
      window.location.origin,
    );
  }, []);

  const openFullscreen = useCallback(() => {
    void iframeRef.current?.requestFullscreen?.();
  }, []);

  const openRoom = useCallback(async (action: "create" | "join", code = "") => {
    setRoomBusy(true);
    setRoomStatus("");
    try {
      const response = await fetch("/api/arcade/overlooked/room", {
        method: "POST",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action, code }),
      });
      if (!response.ok) throw new Error(await responseMessage(response, "Não foi possível abrir a sala."));
      const joined = await response.json() as OnlineRoom;
      if (!/^[A-Z2-9]{8}$/.test(joined.code) || !["host", "guest"].includes(joined.role)) {
        throw new Error("Resposta inválida da sala.");
      }
      setRoom(joined);
      setMode("online");
      setRoomStatus(joined.role === "host" ? "Compartilhe o convite e aguarde a dupla." : "Conectando à dupla...");
    } catch (error) {
      setRoomStatus(error instanceof Error ? error.message : "Não foi possível abrir a sala.");
    } finally {
      setRoomBusy(false);
    }
  }, []);

  useEffect(() => {
    if (inviteAttempted.current) return;
    const code = invitationCode();
    if (code) {
      const timer = window.setTimeout(() => {
        if (inviteAttempted.current) return;
        inviteAttempted.current = true;
        setMode("online");
        setRoomCode(code);
        void openRoom("join", code);
      }, 0);
      return () => window.clearTimeout(timer);
    }
  }, [openRoom]);

  const copyInvite = useCallback(async () => {
    if (!room) return;
    const url = new URL(window.location.href);
    url.searchParams.set("officeRoom", room.code);
    try {
      await navigator.clipboard.writeText(url.toString());
      setRoomStatus("Convite copiado. Envie para sua dupla.");
    } catch {
      setRoomStatus(`Código da sala: ${room.code}`);
    }
  }, [room]);

  const refreshLeaderboard = useCallback(async () => {
    try {
      const response = await fetch(`/api/arcade/overlooked${mode === "online" ? "?mode=online" : ""}`, {
        cache: "no-store",
        credentials: "same-origin",
      });
      if (!response.ok) {
        throw new Error(await responseMessage(response, "Ranking indisponível."));
      }
      if (mode === "online") {
        setDuoLeaderboard((await response.json()) as OverlookedDuoLeaderboardResponse);
      } else {
        setLocalLeaderboard((await response.json()) as OverlookedLeaderboardResponse);
      }
      setRankingError(null);
    } catch (error) {
      setRankingError(error instanceof Error ? error.message : "Ranking indisponível.");
    }
  }, [mode]);

  useEffect(() => {
    const timer = window.setTimeout(() => void refreshLeaderboard(), 0);
    return () => window.clearTimeout(timer);
  }, [refreshLeaderboard]);

  useEffect(() => {
    const onMessage = async (event: MessageEvent<GameMessage>) => {
      if (
        event.origin !== window.location.origin ||
        event.source !== iframeRef.current?.contentWindow ||
        event.data?.source !== GAME_SOURCE ||
        event.data.version !== BRIDGE_VERSION
      ) {
        return;
      }

      if (event.data.type === "overlooked:room-update") {
        if (typeof event.data.roomStatus === "string") setRoomStatus(event.data.roomStatus);
        if (typeof event.data.roomPhase === "string") setRoomPhase(event.data.roomPhase);
        setGuestName(typeof event.data.guestName === "string" ? event.data.guestName : null);
        setGuestConnected(event.data.guestConnected === true);
        return;
      }
      if (event.data.type === "overlooked:room-error") {
        setRoomStatus(typeof event.data.message === "string" ? event.data.message : "A conexão da sala caiu.");
        return;
      }
      if (event.data.type === "overlooked:online-completed") {
        if (event.data.result && typeof event.data.result === "object") {
          setLastResult(event.data.result as OverlookedValidatedResult);
        }
        await refreshLeaderboard();
        return;
      }

      if (event.data.type === "overlooked:start-request") {
        if (isStarting) return;
        setIsStarting(true);
        try {
          const response = await fetch("/api/arcade/overlooked", {
            method: "POST",
            credentials: "same-origin",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ action: "start" }),
          });
          if (!response.ok) {
            throw new Error(await responseMessage(response, "Não foi possível iniciar."));
          }
          const body = (await response.json()) as { runId?: unknown };
          if (typeof body.runId !== "string") throw new Error("Sessão inválida.");
          activeRunRef.current = body.runId;
          completingRunRef.current = null;
          sendToGame("overlooked:session-ready", { runId: body.runId });
        } catch (error) {
          sendToGame("overlooked:session-error", {
            message: error instanceof Error ? error.message : "Não foi possível iniciar.",
          });
        } finally {
          setIsStarting(false);
        }
        return;
      }

      if (event.data.type === "overlooked:completed") {
        const runId = event.data.runId;
        if (
          typeof runId !== "string" ||
          runId !== activeRunRef.current ||
          completingRunRef.current === runId
        ) {
          return;
        }
        completingRunRef.current = runId;
        try {
          const response = await fetch("/api/arcade/overlooked", {
            method: "POST",
            credentials: "same-origin",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              action: "complete",
              runId,
              durationSeconds: event.data.durationSeconds,
              outcomes: event.data.outcomes,
            }),
          });
          if (!response.ok) {
            throw new Error(
              await responseMessage(response, "Não foi possível validar o resultado."),
            );
          }
          const body = (await response.json()) as CompleteResponse;
          setLastResult(body.result);
          setLocalLeaderboard(body.leaderboard);
          setRankingError(null);
          activeRunRef.current = null;
          sendToGame("overlooked:result-saved", { score: body.result.rawScore });
        } catch (error) {
          sendToGame("overlooked:result-error", {
            message:
              error instanceof Error
                ? error.message
                : "Não foi possível validar o resultado.",
          });
        } finally {
          completingRunRef.current = null;
        }
      }
    };

    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [isStarting, refreshLeaderboard, sendToGame]);

  return (
    <>
      <section id="overlooked-player" className="arcade-player-panel">
        <div className="office-mode-picker" role="group" aria-label="Modo de jogo">
          <button type="button" className={mode === "local" ? "is-active" : ""}
            onClick={() => { if (mode === "local") return; setMode("local"); setRoom(null); setRoomStatus(""); setRoomPhase("waiting"); }}>
            <Gamepad2 size={17} aria-hidden="true" /> Mesmo computador
          </button>
          <button type="button" className={mode === "online" ? "is-active" : ""}
            onClick={() => { if (mode === "online") return; setMode("online"); setRoom(null); setRoomStatus(""); setRoomPhase("waiting"); }}>
            <UsersRound size={17} aria-hidden="true" /> Dupla online
          </button>
        </div>
        {mode === "online" ? (
          <div className="office-room-lobby">
            {room ? (
              <>
                <div>
                  <span>Sala da dupla</span>
                  <strong>{room.code}</strong>
                  <p>{room.role === "host"
                    ? guestConnected ? `${guestName ?? "Sua dupla"} entrou. Inicie a partida no jogo.` : "Envie o convite para a outra pessoa."
                    : "Você entrou como jogador 2. Aguarde o início da partida."}</p>
                </div>
                {room.role === "host" ? <button type="button" onClick={() => void copyInvite()}>
                  <Copy size={16} aria-hidden="true" /> Copiar convite
                </button> : null}
                {roomPhase === "completed" || roomPhase === "abandoned" ? (
                  <button type="button" onClick={() => {
                    setRoom(null);
                    setRoomPhase("waiting");
                    setRoomStatus("");
                    setGuestConnected(false);
                  }}>Nova sala</button>
                ) : null}
              </>
            ) : (
              <>
                <div>
                  <span>Joguem em computadores diferentes</span>
                  <strong>Uma sala, duas pessoas</strong>
                  <p>Crie uma sala e envie o convite ou entre com o código recebido.</p>
                </div>
                <div className="office-room-actions">
                  <button type="button" disabled={roomBusy} onClick={() => void openRoom("create")}>Criar sala</button>
                  <label>
                    <span className="sr-only">Código da sala</span>
                    <input value={roomCode} maxLength={8} placeholder="CÓDIGO"
                      onChange={(event) => setRoomCode(event.target.value.toUpperCase().replace(/[^A-Z2-9]/g, ""))} />
                  </label>
                  <button type="button" disabled={roomBusy || roomCode.length !== 8}
                    onClick={() => void openRoom("join", roomCode)}>Entrar</button>
                </div>
              </>
            )}
            {roomStatus ? <p className="office-room-status" role="status">{roomStatus}</p> : null}
          </div>
        ) : null}
        {mode === "local" || room ? (
        <div className="arcade-player-frame-shell">
          <div className="arcade-player-topbar">
            <div className="arcade-player-title">
              <span aria-hidden="true">OD</span>
              <div>
                <strong>Office Defenders</strong>
                <small>{mode === "local" ? "2 jogadores · mesmo teclado" : "2 jogadores · sala online"}</small>
              </div>
            </div>
            <button type="button" onClick={openFullscreen}>
              <Maximize2 size={17} strokeWidth={2.2} aria-hidden="true" />
              Tela cheia
            </button>
          </div>
          <iframe
            ref={iframeRef}
            className="arcade-player-frame"
            src={mode === "local" ? "/arcade-games/overlooked/index.html" : `/arcade-games/overlooked/index.html?mode=online&code=${room?.code}`}
            title="Jogo Office Defenders"
            allow="fullscreen"
            allowFullScreen
          />
          <div className="arcade-player-bottombar" aria-hidden="true">
            <span><i /> Jogo carregado</span>
            <span>Casa Digital Arcade</span>
          </div>
        </div>
        ) : null}

        {lastResult ? (
          <div className="arcade-last-result" role="status">
            <span>Última partida validada</span>
            <strong>{lastResult.rawScore} pontos</strong>
            <small>{lastResult.classifiedMessages} mensagens classificadas</small>
          </div>
        ) : null}
      </section>

      <section id="arcade-ranking" className="arcade-ranking-section">
        <div className="arcade-section-heading">
          <div>
            <span className="section-kicker"><Trophy size={14} strokeWidth={2.3} aria-hidden="true" /> Hall da fama</span>
            <h2>{mode === "online" ? "Duplas que dominam o escritório" : "Quem domina o escritório?"}</h2>
            <p className="arcade-ranking-intro">Clique em um personagem para visitar sua casa.</p>
          </div>
          {leaderboard?.currentBest ? (
            <span className="arcade-current-score">
              Sua melhor: <strong>{leaderboard.currentBest.score} pts</strong>
            </span>
          ) : null}
        </div>
        <div className="arcade-ranking-stage">
          {rankingError ? (
            <div className="arcade-ranking-empty" role="status">
              <strong>Ranking temporariamente indisponível</strong>
              <p>{rankingError}</p>
              <button type="button" className="text-button" onClick={() => void refreshLeaderboard()}>
                Tentar novamente
              </button>
            </div>
          ) : leaderboard?.entries.length ? (
            mode === "online"
              ? <ArcadeLeaderboardPodium entries={[]} duoEntries={duoLeaderboard?.entries ?? []} />
              : <ArcadeLeaderboardPodium entries={localLeaderboard?.entries ?? []} />
          ) : (
            <div className="arcade-ranking-empty">
              <strong>A primeira posição está aberta</strong>
              <p>{mode === "online" ? "Concluam uma partida online para inaugurar o pódio de duplas." : "Conclua uma partida para inaugurar o pódio."}</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
