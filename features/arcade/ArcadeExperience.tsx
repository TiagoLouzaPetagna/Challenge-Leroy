"use client";

import { useMemo, useState } from "react";

import {
  ARCADE_GAMES,
  ARCADE_REWARD_TIERS,
  DETECTOR_CASE_BALANCE,
  DETECTOR_LEADERBOARD_PREVIEW,
  DETECTOR_SCORING,
  DETECTOR_SECONDARY_MISSIONS,
  DETECTOR_TIE_BREAKS,
  type ArcadeGame,
  type ArcadeGameStatus,
} from "@/lib/content/arcade-catalog";

type ArcadeFilter = "all" | ArcadeGameStatus;

const FILTER_LABELS: Record<ArcadeFilter, string> = {
  all: "Todos",
  available: "Disponíveis",
  ready: "Prontos para integrar",
  development: "Em desenvolvimento",
};

const STATUS_HELP: Record<ArcadeGameStatus, string> = {
  available: "A partida está conectada e pode registrar resultados válidos.",
  ready: "A proposta está definida, mas o jogo externo ainda não foi conectado.",
  development: "O jogo continua sendo construído em um projeto separado.",
};

type ArcadeHubProps = {
  onOpenGame: (slug: string) => void;
  onBackToOverview: () => void;
};

export function ArcadeHub({ onOpenGame, onBackToOverview }: ArcadeHubProps) {
  const [filter, setFilter] = useState<ArcadeFilter>("all");
  const filteredGames = useMemo(
    () =>
      filter === "all"
        ? ARCADE_GAMES
        : ARCADE_GAMES.filter((game) => game.status === filter),
    [filter],
  );
  const availableCount = ARCADE_GAMES.filter(
    (game) => game.status === "available",
  ).length;
  const readyCount = ARCADE_GAMES.filter((game) => game.status === "ready").length;

  return (
    <div className="page-stack arcade-page">
      <section className="arcade-hero">
        <div className="arcade-hero-copy">
          <span className="section-kicker">Catálogo de jogos e minigames</span>
          <h1>Cada jogo tem suas regras. Cada leaderboard mede só aquele jogo.</h1>
          <p>
            O Arcade organiza projetos desenvolvidos separadamente. Pontuações
            brutas de jogos diferentes nunca são comparadas, e nenhuma partida
            aparece como disponível antes de uma integração real.
          </p>
          <div className="arcade-hero-actions">
            <button
              type="button"
              className="primary-button dark"
              onClick={() => onOpenGame("detector-relampago")}
            >
              Ver Detector Relâmpago
            </button>
            <button type="button" className="text-button" onClick={onBackToOverview}>
              Voltar à visão geral
            </button>
          </div>
        </div>
        <div className="arcade-hero-stats" aria-label="Situação atual do catálogo">
          <article><strong>{ARCADE_GAMES.length}</strong><span>jogo especificado</span></article>
          <article><strong>{readyCount}</strong><span>pronto para integrar</span></article>
          <article><strong>{availableCount}</strong><span>partidas disponíveis</span></article>
        </div>
      </section>

      <section className="arcade-principle-panel">
        <div className="arcade-principle-mark" aria-hidden="true">01</div>
        <div>
          <span className="section-kicker">Separação importante</span>
          <h2>Pontuação do jogo não é o mesmo que pontos da plataforma</h2>
          <p>
            A pontuação organiza o leaderboard específico. A posição alcançada
            libera uma faixa de recompensa na progressão geral.
          </p>
        </div>
        <div className="arcade-score-equation" aria-label="Fluxo da recompensa">
          <span>Pontuação</span><b>→</b><span>Posição</span><b>→</b><span>Recompensa</span>
        </div>
      </section>

      <section className="arcade-catalog-section" aria-labelledby="arcade-catalog-title">
        <div className="arcade-section-heading">
          <div>
            <span className="section-kicker">Biblioteca independente</span>
            <h2 id="arcade-catalog-title">Catálogo atual</h2>
          </div>
          <div className="arcade-filter-list" aria-label="Filtrar jogos por estado">
            {(Object.keys(FILTER_LABELS) as ArcadeFilter[]).map((item) => {
              const count =
                item === "all"
                  ? ARCADE_GAMES.length
                  : ARCADE_GAMES.filter((game) => game.status === item).length;
              return (
                <button
                  type="button"
                  key={item}
                  className={filter === item ? "active" : ""}
                  onClick={() => setFilter(item)}
                  aria-pressed={filter === item}
                >
                  {FILTER_LABELS[item]} <span>{count}</span>
                </button>
              );
            })}
          </div>
        </div>

        {filteredGames.length ? (
          <div className="arcade-game-grid">
            {filteredGames.map((game) => (
              <ArcadeGameCard key={game.id} game={game} onOpen={() => onOpenGame(game.slug)} />
            ))}
          </div>
        ) : (
          <div className="arcade-empty-state">
            <strong>Nenhum jogo neste estado</strong>
            <p>O catálogo não cria jogos fictícios apenas para preencher espaço.</p>
            <button type="button" className="text-button" onClick={() => setFilter("all")}>Ver catálogo completo</button>
          </div>
        )}
      </section>

      <section className="arcade-reward-panel">
        <div>
          <span className="section-kicker">Faixas permanentes</span>
          <h2>Subir de posição concede somente a diferença</h2>
          <p>
            Não há temporadas ou fechamento de rodada. Uma faixa já alcançada
            nunca concede novamente pontos e perder posição não remove recompensas.
          </p>
        </div>
        <ol>
          {ARCADE_REWARD_TIERS.map((tier) => (
            <li key={tier.id}>
              <span>{tier.positionLabel}</span>
              <strong>{tier.points}</strong>
              <small>pontos totais</small>
            </li>
          ))}
        </ol>
      </section>

      <section className="arcade-integration-panel">
        <div>
          <span className="section-kicker">Organização dos projetos</span>
          <h2>O catálogo e a partida continuam separados</h2>
        </div>
        <div className="arcade-integration-flow">
          <article><span>Plataforma</span><strong>Catálogo, posição e recompensa</strong><p>Controla progresso, histórico e leaderboards.</p></article>
          <b aria-hidden="true">↔</b>
          <article><span>Jogo externo</span><strong>Mecânica e eventos brutos</strong><p>Controla a experiência da partida, sem declarar pontos gerais.</p></article>
        </div>
      </section>
    </div>
  );
}

function ArcadeGameCard({ game, onOpen }: { game: ArcadeGame; onOpen: () => void }) {
  return (
    <article className={`arcade-game-card status-${game.status}`}>
      <div className="arcade-game-cover" aria-hidden="true">
        <span>{game.shortTitle}</span>
        <b>{game.caseCount}</b>
      </div>
      <div className="arcade-game-content">
        <span className="arcade-game-status">{game.statusLabel}</span>
        <h3>{game.title}</h3>
        <p>{game.summary}</p>
        <div className="arcade-game-tags">
          {game.competencies.map((competency) => <span key={competency}>{competency}</span>)}
        </div>
        <dl>
          <div><dt>Dificuldade</dt><dd>{game.difficulty}</dd></div>
          <div><dt>Duração</dt><dd>{game.duration}</dd></div>
          <div><dt>Minha posição</dt><dd>Sem resultado</dd></div>
        </dl>
        <small>{STATUS_HELP[game.status]}</small>
        <button type="button" className="primary-button dark" onClick={onOpen}>Ver detalhes</button>
      </div>
    </article>
  );
}

type ArcadeGameDetailProps = {
  game: ArcadeGame;
  onBackToArcade: () => void;
  onOpenMissions: () => void;
};

export function ArcadeGameDetail({
  game,
  onBackToArcade,
  onOpenMissions,
}: ArcadeGameDetailProps) {
  return (
    <div className="page-stack arcade-detail-page">
      <button type="button" className="text-button arcade-back-button" onClick={onBackToArcade}>← Voltar para o Arcade</button>

      <section className="arcade-detail-hero">
        <div>
          <span className="arcade-game-status inverse">{game.statusLabel}</span>
          <h1>{game.title}</h1>
          <p>{game.summary}</p>
          <div className="arcade-detail-tags">
            <span>{game.difficulty}</span><span>{game.duration}</span><span>{game.scoreScale}</span>
          </div>
          <div className="arcade-detail-actions">
            <button type="button" className="primary-button" disabled>Aguardando integração</button>
            <button type="button" className="text-button light" onClick={onOpenMissions}>Ver Missões secundárias</button>
          </div>
        </div>
        <div className="arcade-detail-emblem" aria-hidden="true"><span>{game.shortTitle}</span><strong>{game.caseCount}</strong><small>casos</small></div>
      </section>

      <section className="arcade-detail-intro">
        <div><span className="section-kicker">Objetivo</span><h2>Reconhecimento rápido com motivo</h2><p>{game.purpose}</p></div>
        <div className="arcade-case-balance">
          {DETECTOR_CASE_BALANCE.map((item) => (
            <article key={item.label}><span>{item.marker}</span><strong>{item.count}</strong><p>{item.label}</p></article>
          ))}
        </div>
      </section>

      <section className="arcade-detail-grid">
        <article className="arcade-rules-panel">
          <span className="section-kicker">Como funciona</span>
          <h2>Duas escolhas por caso</h2>
          <ol>
            <li><span>01</span><div><strong>Classifique</strong><p>Legítima no contexto, phishing ou verificar por outro canal.</p></div></li>
            <li><span>02</span><div><strong>Identifique o sinal</strong><p>Escolha o indício mais importante para justificar a classificação.</p></div></li>
            <li><span>03</span><div><strong>Construa a sequência</strong><p>Um acerto completo exige classificação e sinal corretos.</p></div></li>
          </ol>
        </article>

        <article className="arcade-scoring-panel">
          <span className="section-kicker">Pontuação própria</span>
          <h2>Até 1.200 pontos</h2>
          <ul>
            {DETECTOR_SCORING.map((item) => <li key={item.label}><span>{item.label}</span><strong>+{item.points}</strong></li>)}
            <li className="total"><span>Máximo por caso</span><strong>100</strong></li>
          </ul>
          <p>A sequência não soma pontos. Ela é o primeiro desempate.</p>
        </article>
      </section>

      <section className="arcade-ranking-section">
        <div className="arcade-section-heading">
          <div><span className="section-kicker">Leaderboard específico</span><h2>Prévia demonstrativa</h2></div>
          <span className="arcade-preview-label">Não está ativo</span>
        </div>
        <div className="arcade-ranking-layout">
          <ol className="arcade-ranking-list">
            {DETECTOR_LEADERBOARD_PREVIEW.map((entry) => (
              <li key={entry.position}>
                <span>{entry.position}</span>
                <div><strong>{entry.name}</strong><small>{entry.area}</small></div>
                <div><b>{entry.score}</b><small>sequência {entry.streak}</small></div>
              </li>
            ))}
          </ol>
          <article className="arcade-tiebreak-panel">
            <span className="section-kicker">Ordem de desempate</span>
            <ol>{DETECTOR_TIE_BREAKS.map((item, index) => <li key={item}><span>{index + 1}</span>{item}</li>)}</ol>
          </article>
        </div>
        <p className="arcade-preview-note">Os nomes e resultados acima servem apenas para demonstrar a futura organização. Nenhuma pessoa possui uma partida real registrada.</p>
      </section>

      <section className="arcade-detail-rewards">
        <div><span className="section-kicker">Recompensas do jogo</span><h2>Uma faixa por vez, sem temporadas</h2><p>Ao melhorar a posição, somente a diferença até o novo total é concedida.</p></div>
        <ol>{ARCADE_REWARD_TIERS.map((tier) => <li key={tier.id}><span>{tier.label}</span><strong>{tier.points}</strong><small>pontos totais</small></li>)}</ol>
      </section>

      <section className="arcade-detail-bottom-grid">
        <article className="arcade-secondary-panel">
          <span className="section-kicker">Missões secundárias possíveis</span>
          <h2>Objetivos separados do leaderboard</h2>
          <ul>{DETECTOR_SECONDARY_MISSIONS.map((mission) => <li key={mission}>{mission}</li>)}</ul>
          <button type="button" className="text-button" onClick={onOpenMissions}>Abrir Missões</button>
        </article>
        <article className="arcade-readiness-panel">
          <span className="section-kicker">Situação da integração</span>
          <h2>O que já está definido</h2>
          <ul>
            <li className="done"><span>✓</span>Regras e pontuação</li>
            <li className="done"><span>✓</span>Leaderboard e desempates</li>
            <li className="done"><span>✓</span>Faixas de recompensa</li>
            <li><span>—</span>Conexão com o projeto do jogo</li>
            <li><span>—</span>Registro de partidas válidas</li>
          </ul>
          <p>O botão Jogar continuará indisponível até que essas duas últimas etapas sejam implementadas.</p>
        </article>
      </section>
    </div>
  );
}
