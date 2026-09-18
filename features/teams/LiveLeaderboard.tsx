"use client";

import { useEffect, useState } from "react";

import type { LeaderboardResponse } from "@/lib/leaderboard/types";

type LiveLeaderboardProps = {
  onOpenProfile: () => void;
};

function formatPercentage(value: number): string {
  return new Intl.NumberFormat("pt-BR", { maximumFractionDigits: 1 }).format(
    value,
  );
}

export function LiveLeaderboard({ onOpenProfile }: LiveLeaderboardProps) {
  const [data, setData] = useState<LeaderboardResponse | null>(null);
  const [error, setError] = useState("");
  const [requestVersion, setRequestVersion] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    async function loadLeaderboard() {
      setError("");
      try {
        const response = await fetch("/api/leaderboard", {
          cache: "no-store",
          credentials: "same-origin",
          signal: controller.signal,
        });
        if (!response.ok) throw new Error("leaderboard-unavailable");
        setData((await response.json()) as LeaderboardResponse);
      } catch (requestError) {
        if (
          requestError instanceof DOMException &&
          requestError.name === "AbortError"
        ) {
          return;
        }
        setError("A classificação não pôde ser atualizada agora.");
      }
    }

    void loadLeaderboard();
    return () => controller.abort();
  }, [requestVersion]);

  if (!data && !error) {
    return (
      <section
        className="teams-live-leaderboard teams-live-leaderboard--loading"
        aria-live="polite"
      >
        <span className="section-kicker">Classificação conectada</span>
        <h2>Atualizando progresso confirmado…</h2>
        <p>Os pontos são recalculados no servidor antes de entrar no ranking.</p>
      </section>
    );
  }

  if (!data) {
    return (
      <section className="teams-live-leaderboard teams-live-leaderboard--error">
        <span className="section-kicker">Classificação conectada</span>
        <h2>Não foi possível carregar o ranking</h2>
        <p role="alert">{error}</p>
        <button
          type="button"
          className="text-button"
          onClick={() => setRequestVersion((value) => value + 1)}
        >
          Tentar novamente
        </button>
      </section>
    );
  }

  const currentSector = data.sectors.find((entry) => entry.isCurrent) ?? null;
  const currentParticipant = data.currentParticipant;

  return (
    <section
      className="teams-live-leaderboard"
      aria-labelledby="live-leaderboard-title"
    >
      <header className="teams-live-leaderboard__heading">
        <div>
          <span className="section-kicker">Classificação conectada</span>
          <h2 id="live-leaderboard-title">Progresso real, comparação justa</h2>
          <p>
            O servidor refaz os cálculos a partir das atividades concluídas.
            Pontos informados diretamente pelo navegador não entram no placar.
          </p>
        </div>
        <span className="teams-live-leaderboard__status">
          Arcade não incluído
        </span>
      </header>

      <div className="teams-live-leaderboard__grid">
        <article className="teams-ranking-panel">
          <div className="teams-section-heading compact">
            <div>
              <span className="section-kicker">Ranking por setor</span>
              <h3>Resultado normalizado</h3>
            </div>
            <span>
              {currentSector ? `${currentSector.position}º lugar` : "Visão geral"}
            </span>
          </div>

          {currentSector ? (
            <div className="teams-current-ranking">
              <span>{currentSector.sectorName}</span>
              <strong>{currentSector.position}º</strong>
              <small>
                {currentSector.score}/100 · {currentSector.averagePoints} pontos
                por pessoa
              </small>
            </div>
          ) : null}

          <ol aria-label="Classificação dos setores por progresso real">
            {data.sectors.map((entry) => (
              <li
                key={entry.sectorId}
                className={entry.isCurrent ? "current" : ""}
              >
                <span>{entry.position}</span>
                <div>
                  <strong>{entry.sectorName}</strong>
                  <small>
                    {formatPercentage(entry.participationRate)}% participação ·{" "}
                    {formatPercentage(entry.completionRate)}% conclusão
                  </small>
                </div>
                <b>{entry.score}</b>
              </li>
            ))}
          </ol>
          <p>
            Nota do setor: 50% desempenho médio, 30% conclusão e 20%
            participação. O tamanho bruto da equipe não dá vantagem.
          </p>
        </article>

        <article className="teams-ranking-panel teams-ranking-panel--individual">
          <div className="teams-section-heading compact">
            <div>
              <span className="section-kicker">Ranking individual</span>
              <h3>Participação voluntária</h3>
            </div>
            <span>{currentParticipant?.position ? `${currentParticipant.position}º lugar` : "Opcional"}</span>
          </div>

          {currentParticipant ? (
            <div className="teams-individual-summary">
              <div>
                <span>Seus pontos confirmados</span>
                <strong>{currentParticipant.totalPoints}</strong>
              </div>
              <div>
                <span>Atividades</span>
                <strong>{currentParticipant.completedActivities}</strong>
              </div>
              <div>
                <span>Média</span>
                <strong>{currentParticipant.averageScore || "—"}</strong>
              </div>
            </div>
          ) : null}

          {currentParticipant && !currentParticipant.participates ? (
            <div className="teams-ranking-opt-in">
              <strong>Você não aparece publicamente</strong>
              <p>
                Ative a participação em Meu perfil e escolha entre nome,
                iniciais ou identidade anônima.
              </p>
              <button type="button" className="text-button" onClick={onOpenProfile}>
                Ajustar no perfil
              </button>
            </div>
          ) : data.individual.length === 0 ? (
            <div className="teams-ranking-opt-in">
              <strong>Ainda não há participantes visíveis</strong>
              <p>O ranking será preenchido conforme as contas aderirem.</p>
            </div>
          ) : (
            <ol aria-label="Classificação individual voluntária">
              {data.individual.slice(0, 10).map((entry) => (
                <li
                  key={`${entry.position}:${entry.displayName}`}
                  className={entry.isCurrent ? "current" : ""}
                >
                  <span>{entry.position}</span>
                  <div>
                    <strong>{entry.displayName}</strong>
                    <small>
                      {entry.completedActivities} atividades · média {entry.averageScore || "—"}
                    </small>
                  </div>
                  <b>{entry.totalPoints}</b>
                </li>
              ))}
            </ol>
          )}
          <p>
            Quem não participa continua contribuindo apenas para os números
            agregados do setor.
          </p>
        </article>
      </div>
    </section>
  );
}
