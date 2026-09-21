"use client";

import { useEffect, useRef, useState } from "react";
import { Maximize2, Trophy } from "lucide-react";
import type { ArcadeGame } from "@/lib/content/arcade-catalog";
import type { OverlookedLeaderboardResponse } from "@/lib/arcade/overlooked";
import { ArcadeLeaderboardPodium } from "./ArcadeLeaderboardPodium";

type GameFinishMessage = {
  source?: string; version?: number; type?: string; game?: string;
  score?: unknown; trackId?: unknown; mode?: unknown; completed?: unknown;
};

export function ArcadeGameIntegration({ game }: { game: ArcadeGame }) {
  const scoreUnit = game.slug === "email-please" || game.slug === "dumb-ways-extras" ? "acertos" : game.slug === "chefia-em-jogo" ? "semanas" : "pontos";
  const unitFor = (score: number) => score === 1
    ? game.slug === "chefia-em-jogo" ? "semana" : game.slug === "email-please" || game.slug === "dumb-ways-extras" ? "acerto" : scoreUnit
    : scoreUnit;
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const runRef = useRef<string | null>(null);
  const savingRef = useRef(false);
  const [leaderboard, setLeaderboard] = useState<OverlookedLeaderboardResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [lastScore, setLastScore] = useState<number | null>(null);
  const url = `/api/arcade/games/${game.slug}`;

  useEffect(() => {
    let active = true;
    const load = async () => {
      try {
        const response = await fetch(url, { credentials: "same-origin", cache: "no-store" });
        if (!response.ok) throw new Error("Ranking indisponível.");
        if (active) setLeaderboard(await response.json() as OverlookedLeaderboardResponse);
      } catch { if (active) setError("Ranking indisponível. Tente novamente mais tarde."); }
    };
    const start = async () => {
      try {
        const response = await fetch(url, {
          method: "POST", credentials: "same-origin", headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ action: "start" }),
        });
        if (!response.ok) throw new Error("Não foi possível iniciar o registro da partida.");
        const body = await response.json() as { runId: string };
        if (active) runRef.current = body.runId;
      } catch { if (active) setError("Não foi possível iniciar o registro da partida."); }
    };
    const onMessage = async (event: MessageEvent<GameFinishMessage>) => {
      const message = event.data;
      if (event.origin !== window.location.origin || event.source !== iframeRef.current?.contentWindow ||
          message?.source !== "fortifica:arcade-game" || message.version !== 1 ||
          message.type !== "arcade:finished" || message.game !== game.slug || savingRef.current) return;
      if (game.slug === "phishing-beat" && message.mode === "training") return;
      const runId = runRef.current;
      if (!runId) { setError("A partida terminou antes de o registro ficar disponível. Recarregue o jogo."); return; }
      savingRef.current = true;
      runRef.current = null;
      try {
        const response = await fetch(url, {
          method: "POST", credentials: "same-origin", headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ action: "complete", runId, score: message.score, trackId: message.trackId }),
        });
        if (!response.ok) throw new Error("Não foi possível salvar a pontuação.");
        const body = await response.json() as { result: { score: number }; leaderboard: OverlookedLeaderboardResponse };
        if (active) { setLastScore(body.result.score); setLeaderboard(body.leaderboard); setError(null); }
      } catch { if (active) setError("Não foi possível salvar a pontuação. A próxima partida poderá ser registrada."); }
      finally { savingRef.current = false; if (active) void start(); }
    };
    void load();
    void start();
    window.addEventListener("message", onMessage);
    return () => { active = false; window.removeEventListener("message", onMessage); };
  }, [game.slug, url]);

  return <>
    <section className="arcade-player-panel" aria-label={`Jogar ${game.title}`}>
      <div className="arcade-player-frame-shell">
        <div className="arcade-player-topbar">
          <div className="arcade-player-title"><span aria-hidden="true">{game.shortTitle}</span>
            <div><strong>{game.title}</strong><small>{game.format}</small></div></div>
          <button type="button" onClick={() => void iframeRef.current?.requestFullscreen?.()}>
            <Maximize2 size={17} strokeWidth={2.2} aria-hidden="true" /> Tela cheia
          </button>
        </div>
        <iframe ref={iframeRef} className="arcade-player-frame"
          src={`/arcade-games/${game.slug}/index.html`} title={`Jogo ${game.title}`}
          allow="fullscreen; autoplay" allowFullScreen />
        <div className="arcade-player-bottombar" aria-hidden="true"><span><i /> Jogo carregado</span><span>Casa Digital Arcade</span></div>
      </div>
      {lastScore !== null ? <div className="arcade-last-result" role="status">
        <span>Última partida registrada</span><strong>{lastScore} {unitFor(lastScore)}</strong>
      </div> : null}
    </section>
    <section className="arcade-ranking-section" aria-label={`Ranking de ${game.title}`}>
      <div className="arcade-section-heading"><div>
        <span className="section-kicker"><Trophy size={14} strokeWidth={2.3} aria-hidden="true" /> Hall da fama</span>
        <h2>{game.title}</h2><p className="arcade-ranking-intro">{game.slug === "chefia-em-jogo"
          ? "O ranking conta as semanas sobrevividas no cargo. Clique em um personagem para visitar sua casa."
          : game.slug === "dumb-ways-to-phish"
          ? "O ranking considera a sequência de microjogos. Clique em um personagem para visitar sua casa."
          : game.slug === "dumb-ways-extras"
          ? "O ranking considera a melhor partida de dez rodadas em qualquer um dos desafios. Clique em um personagem para visitar sua casa."
          : "Clique em um personagem para visitar sua casa."}</p>
      </div>{leaderboard?.currentBest ? <span className="arcade-current-score">Sua melhor: <strong>
        {leaderboard.currentBest.score} {game.slug === "chefia-em-jogo" || game.slug === "email-please" || game.slug === "dumb-ways-extras" ? unitFor(leaderboard.currentBest.score) : "pts"}</strong></span> : null}</div>
      <div className="arcade-ranking-stage">{error ? <div className="arcade-ranking-empty" role="status">
        <strong>Registro temporariamente indisponível</strong><p>{error}</p></div>
        : leaderboard?.entries.length ? <ArcadeLeaderboardPodium entries={leaderboard.entries} gameTitle={game.title}
            scoreUnit={game.slug === "email-please" || game.slug === "dumb-ways-extras" ? "acertos" : game.slug === "chefia-em-jogo" ? "semanas" : "pts"}
            singularScoreUnit={game.slug === "chefia-em-jogo" ? "semana" : game.slug === "email-please" || game.slug === "dumb-ways-extras" ? "acerto" : undefined} />
        : <div className="arcade-ranking-empty"><strong>A primeira posição está aberta</strong>
          <p>Conclua uma partida para inaugurar o pódio.</p></div>}</div>
    </section>
  </>;
}
