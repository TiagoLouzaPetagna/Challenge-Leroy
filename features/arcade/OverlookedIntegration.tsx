"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Maximize2, Trophy } from "lucide-react";

import type {
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
};

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
  const [leaderboard, setLeaderboard] =
    useState<OverlookedLeaderboardResponse | null>(null);
  const [rankingError, setRankingError] = useState<string | null>(null);
  const [lastResult, setLastResult] = useState<OverlookedValidatedResult | null>(null);

  const sendToGame = useCallback((type: string, payload: Record<string, unknown> = {}) => {
    iframeRef.current?.contentWindow?.postMessage(
      { source: PLATFORM_SOURCE, version: BRIDGE_VERSION, type, ...payload },
      window.location.origin,
    );
  }, []);

  const openFullscreen = useCallback(() => {
    void iframeRef.current?.requestFullscreen?.();
  }, []);

  const refreshLeaderboard = useCallback(async () => {
    try {
      const response = await fetch("/api/arcade/overlooked", {
        cache: "no-store",
        credentials: "same-origin",
      });
      if (!response.ok) {
        throw new Error(await responseMessage(response, "Ranking indisponível."));
      }
      setLeaderboard((await response.json()) as OverlookedLeaderboardResponse);
      setRankingError(null);
    } catch (error) {
      setRankingError(error instanceof Error ? error.message : "Ranking indisponível.");
    }
  }, []);

  useEffect(() => {
    let active = true;
    fetch("/api/arcade/overlooked", {
      cache: "no-store",
      credentials: "same-origin",
    })
      .then(async (response) => {
        if (!response.ok) {
          throw new Error(await responseMessage(response, "Ranking indisponível."));
        }
        return response.json() as Promise<OverlookedLeaderboardResponse>;
      })
      .then((response) => {
        if (!active) return;
        setLeaderboard(response);
        setRankingError(null);
      })
      .catch((error: unknown) => {
        if (!active) return;
        setRankingError(error instanceof Error ? error.message : "Ranking indisponível.");
      });
    return () => {
      active = false;
    };
  }, []);

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
          setLeaderboard(body.leaderboard);
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
  }, [isStarting, sendToGame]);

  return (
    <>
      <section id="overlooked-player" className="arcade-player-panel">
        <div className="arcade-player-frame-shell">
          <div className="arcade-player-topbar">
            <div className="arcade-player-title">
              <span aria-hidden="true">OV</span>
              <div>
                <strong>Overlooked</strong>
                <small>2 jogadores · mesmo teclado</small>
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
            src="/arcade-games/overlooked/index.html"
            title="Jogo Overlooked"
            allow="fullscreen"
            allowFullScreen
          />
          <div className="arcade-player-bottombar" aria-hidden="true">
            <span><i /> Jogo carregado</span>
            <span>Casa Digital Arcade</span>
          </div>
        </div>

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
            <h2>Quem domina o escritório?</h2>
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
            <ArcadeLeaderboardPodium entries={leaderboard.entries} />
          ) : (
            <div className="arcade-ranking-empty">
              <strong>A primeira posição está aberta</strong>
              <p>Conclua uma partida para inaugurar o pódio.</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
