"use client";

import { useMemo, useState } from "react";

import { Mascot } from "@/features/ui/LearningUI";
import {
  ARCADE_GAMES,
  OVERLOOKED_CASE_BALANCE,
  OVERLOOKED_RANKS,
  OVERLOOKED_SCORING,
  OVERLOOKED_SECONDARY_MISSIONS,
  type ArcadeGame,
  type ArcadeGameStatus,
} from "@/lib/content/arcade-catalog";
import { OverlookedIntegration } from "./OverlookedIntegration";
import styles from "./ArcadeHub.module.css";

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

function ArcadeHeroArtwork() {
  return (
    <div className={styles.heroArtwork} aria-hidden="true">
      <svg className={styles.heroTrack} viewBox="0 0 590 380" focusable="false">
        <path className={styles.heroTrackLine} d="M62 286c72-21 93-93 157-111 78-21 104 61 176 27 49-23 54-78 119-97" />
        <circle cx="62" cy="286" r="12" />
        <circle cx="219" cy="175" r="12" />
        <circle cx="395" cy="202" r="12" />
        <circle cx="514" cy="105" r="12" />
      </svg>

      <div className={styles.heroScore}>
        <span>Leitura de risco</span>
        <strong>08<small>/12</small></strong>
      </div>

      <div className={styles.heroTimer}>
        <span>próximo caso</span>
        <strong>00:07</strong>
      </div>

      <span className={`${styles.heroSignal} ${styles.heroSignalRisk}`}>phishing</span>
      <span className={`${styles.heroSignal} ${styles.heroSignalCheck}`}>verificar</span>
      <span className={styles.heroTarget}><i /><i /><i /></span>
      <span className={styles.heroBolt}>ϟ</span>
      <Mascot pose="arcade" size="large" className={styles.heroMascot} />
    </div>
  );
}

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
  const developmentCount = ARCADE_GAMES.filter(
    (game) => game.status === "development",
  ).length;
  const featuredGame = ARCADE_GAMES[0];

  return (
    <div className="page-stack arcade-page">
      <div className={styles.hub}>
        <section className={styles.introRegion} aria-labelledby="arcade-hero-title">
          <div className={styles.heroTopline}>
            <button type="button" className={styles.backButton} onClick={onBackToOverview}>
              <span aria-hidden="true">←</span> Visão geral
            </button>
            <span className={styles.heroMode}>Prática rápida · regras claras</span>
          </div>

          <header className={styles.editorialHeader}>
            <div className={styles.heroCopy}>
              <span className={styles.kicker}>Arcade · prática em jogo</span>
              <h1 id="arcade-hero-title">Escolha um desafio.</h1>
              <p>Teste sua leitura de risco em rodadas curtas. Cada jogo tem suas regras — e só fica disponível depois de uma integração validada.</p>

              {featuredGame ? (
                <div className={styles.heroActions}>
                  <button type="button" onClick={() => onOpenGame(featuredGame.slug)}>
                    {featuredGame.status === "available" ? "Jogar agora" : "Ver especificação"} <span aria-hidden="true">→</span>
                  </button>
                  <span><i />{featuredGame.statusLabel}</span>
                </div>
              ) : null}

              <p className={styles.catalogStatus} aria-label="Estados do catálogo">
                <span><strong>{availableCount}</strong> partidas ativas</span>
                <span><strong>{readyCount}</strong> pronto para integrar</span>
                <span><strong>{developmentCount}</strong> em desenvolvimento</span>
              </p>
            </div>

            <ArcadeHeroArtwork />
          </header>
        </section>

        <section className={styles.catalogSection} aria-labelledby="arcade-catalog-title">
          <div className={styles.sectionHeading}>
            <div>
              <span className={styles.kicker}>Em destaque</span>
              <h2 id="arcade-catalog-title">Um jogo. Uma habilidade sob pressão.</h2>
            </div>

            <div
              className={styles.filterList}
              role="group"
              aria-label="Filtrar jogos por estado"
            >
              {(Object.keys(FILTER_LABELS) as ArcadeFilter[]).map((item) => {
                const count =
                  item === "all"
                    ? ARCADE_GAMES.length
                    : ARCADE_GAMES.filter((game) => game.status === item).length;
                return (
                  <button
                    type="button"
                    key={item}
                    className={filter === item ? styles.activeFilter : ""}
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
            <div className={styles.gameCollection}>
              {filteredGames.map((game) => (
                <ArcadeGamePoster
                  key={game.id}
                  game={game}
                  onOpen={() => onOpenGame(game.slug)}
                />
              ))}
            </div>
          ) : (
            <div className={styles.emptyState}>
              <span className={styles.emptyTarget} aria-hidden="true">◎</span>
              <div>
                <strong>Nenhum jogo neste estado</strong>
                <p>Hoje, o único desafio mapeado está pronto para integração.</p>
              </div>
              <button type="button" onClick={() => setFilter("all")}>
                Ver jogo em destaque
              </button>
            </div>
          )}
        </section>

        <section className={styles.scoreContract} aria-labelledby="arcade-score-title">
          <div className={styles.scoreFlow} aria-label="Fluxo de uma partida válida">
            <span><small>01</small>Pontuação do jogo</span>
            <b aria-hidden="true">→</b>
            <span><small>02</small>Posição no jogo</span>
            <b aria-hidden="true">→</b>
            <span><small>03</small>Recompensa</span>
          </div>
          <div className={styles.scoreCopy}>
            <span className={styles.kicker}>Contrato de pontuação</span>
            <h2 id="arcade-score-title">Score e pontos cumprem papéis diferentes.</h2>
            <p>
              Subir de posição concede somente a diferença. A recompensa da
              plataforma depende de uma partida válida; não existe ranking global
              entre jogos.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}

function DetectorPosterArtwork() {
  return (
    <svg
      className={styles.detectorArtwork}
      viewBox="0 0 720 610"
      aria-hidden="true"
      focusable="false"
    >
      <path
        className={styles.posterBolt}
        d="M470 15 346 218h97l-70 122 210-226H477l83-99Z"
        fill="#FFD363"
      />

      <g className={styles.caseCounter}>
        <rect x="39" y="35" width="178" height="55" rx="22" fill="#173F35" />
        <circle cx="69" cy="62" r="10" fill="#B8EF3A" />
        <text x="91" y="68">CASO 04 / 12</text>
      </g>

      <g className={styles.incomingMessage}>
        <rect x="34" y="126" width="346" height="238" rx="34" fill="#FFFDF7" stroke="#173F35" strokeWidth="9" />
        <rect x="34" y="126" width="346" height="55" rx="30" fill="#DDF2F1" />
        <circle cx="71" cy="153" r="8" fill="#FF8066" />
        <circle cx="96" cy="153" r="8" fill="#FFD363" />
        <circle cx="121" cy="153" r="8" fill="#41B7AA" />
        <circle cx="89" cy="225" r="30" fill="#CBBCE8" />
        <path d="M74 225h30M89 210v30" stroke="#173F35" strokeWidth="7" strokeLinecap="round" />
        <path d="M139 211h186M139 235h121" stroke="#173F35" strokeWidth="13" strokeLinecap="round" opacity=".75" />
        <path d="M67 290h252M67 318h198" stroke="#65776F" strokeWidth="11" strokeLinecap="round" opacity=".52" />
        <path d="m312 346 42 39-5-51" fill="#FFFDF7" stroke="#173F35" strokeWidth="8" strokeLinejoin="round" />
      </g>

      <g className={styles.targetGroup}>
        <circle cx="530" cy="263" r="119" fill="#FF8066" stroke="#173F35" strokeWidth="9" />
        <circle cx="530" cy="263" r="81" fill="#FFFDF7" stroke="#173F35" strokeWidth="8" />
        <circle cx="530" cy="263" r="43" fill="#173F35" />
        <path d="M530 239v30" stroke="#B8EF3A" strokeWidth="12" strokeLinecap="round" />
        <circle cx="530" cy="289" r="7" fill="#B8EF3A" />
      </g>

      <path
        className={styles.decisionTrace}
        d="M319 388c61 28 108 38 156 15 33-16 49-45 55-88"
        fill="none"
        stroke="#173F35"
        strokeWidth="11"
        strokeLinecap="round"
      />
      <path d="m503 329 28-18 10 31" fill="#173F35" />

      <g className={`${styles.choiceCard} ${styles.choiceCardPhishing}`}>
        <rect x="30" y="431" width="210" height="91" rx="25" fill="#173F35" />
        <circle cx="67" cy="476" r="18" fill="#B8EF3A" />
        <path d="m59 476 6 7 12-15" fill="none" stroke="#173F35" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
        <text x="96" y="483" fill="#FFFDF7">PHISHING</text>
      </g>

      <g className={`${styles.choiceCard} ${styles.choiceCardLegitimate}`}>
        <rect x="255" y="457" width="205" height="78" rx="23" fill="#9DDCE6" stroke="#173F35" strokeWidth="7" />
        <text x="288" y="505" fill="#173F35">LEGÍTIMA</text>
      </g>

      <g className={`${styles.choiceCard} ${styles.choiceCardVerify}`}>
        <rect x="475" y="421" width="211" height="98" rx="25" fill="#CBBCE8" stroke="#173F35" strokeWidth="7" />
        <text x="504" y="478" fill="#173F35">VERIFICAR</text>
      </g>

      <g className={styles.signalPrompt}>
        <rect x="180" y="552" width="359" height="42" rx="18" fill="#FFD363" stroke="#173F35" strokeWidth="6" />
        <text x="223" y="579" fill="#173F35">QUAL SINAL DECIDIU?</text>
      </g>
    </svg>
  );
}

function ArcadeGamePoster({ game, onOpen }: { game: ArcadeGame; onOpen: () => void }) {
  const integrationLabel =
    game.status === "available"
      ? "Conectada"
      : game.status === "ready"
        ? "Aguardando conexão"
        : "Em construção";
  const detailLabel =
    game.status === "ready" ? "Ver especificação" : "Ver detalhes";

  return (
    <article
      className={styles.gamePoster}
      data-status={game.status}
      aria-labelledby={`${game.id}-title`}
    >
      <div className={styles.posterCopy}>
        <div className={styles.posterTopline}>
          <span className={styles.gameStatus} data-status={game.status}>
            <i aria-hidden="true" /> {game.statusLabel}
          </span>
          <span>{game.caseCount} casos</span>
        </div>

        <span className={styles.gameFormat}>Reconhecimento rápido</span>
        <h3 id={`${game.id}-title`}>{game.title}</h3>
        <p>{game.summary}</p>

        <p className={styles.gameHook}>Classifique a mensagem. Identifique o sinal.</p>

        <dl className={styles.gameMeta}>
          <div><dt>Dificuldade</dt><dd>{game.difficulty}</dd></div>
          <div><dt>Duração</dt><dd>{game.duration}</dd></div>
          <div><dt>Pontuação</dt><dd>{game.scoreScale}</dd></div>
        </dl>

        <div className={styles.posterFooter}>
          <button
            type="button"
            onClick={onOpen}
            aria-label={`${detailLabel} de ${game.title}`}
          >
            {detailLabel} <span aria-hidden="true">→</span>
          </button>
          <p>
            <strong>{integrationLabel}</strong>
            <span>{STATUS_HELP[game.status]}</span>
          </p>
        </div>
      </div>

      <div className={styles.posterVisual}>
        <DetectorPosterArtwork />
        <div className={styles.competencyStrip} aria-label="Competências praticadas">
          {game.competencies.map((competency) => (
            <span key={competency}>{competency}</span>
          ))}
        </div>
      </div>
    </article>
  );
}

type ArcadeGameDetailProps = {
  game: ArcadeGame;
  onBackToArcade: () => void;
  onOpenMissions: () => void;
};

export function ArcadeGameDetail({ game, onBackToArcade, onOpenMissions }: ArcadeGameDetailProps) {
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
            <a className="primary-button" href="#overlooked-player">Jogar Overlooked</a>
            <button type="button" className="text-button light" onClick={onOpenMissions}>Ver Missões secundárias</button>
          </div>
        </div>
        <div className="arcade-detail-emblem" aria-hidden="true"><span>{game.shortTitle}</span><strong>{game.caseCount}</strong><small>mensagens</small></div>
      </section>

      <section className="arcade-detail-intro">
        <div><span className="section-kicker">Objetivo</span><h2>Segurança é trabalho em equipe</h2><p>{game.purpose}</p></div>
        <div className="arcade-case-balance">
          {OVERLOOKED_CASE_BALANCE.map((item) => (
            <article key={item.label}><span>{item.marker}</span><strong>{item.count}</strong><p>{item.label}</p></article>
          ))}
        </div>
      </section>

      <section className="arcade-detail-grid">
        <article className="arcade-rules-panel">
          <span className="section-kicker">Como funciona</span>
          <h2>Decidam e processem juntos</h2>
          <ol>
            <li><span>01</span><div><strong>Leiam a caixa de entrada</strong><p>Observem remetente, domínio, contexto e urgência antes de decidir.</p></div></li>
            <li><span>02</span><div><strong>Aceitem ou reportem</strong><p>Use A para aceitar uma solicitação e R para reportar phishing.</p></div></li>
            <li><span>03</span><div><strong>Concluam o fluxo</strong><p>Os dois jogadores movimentam documentos entre as estações do escritório.</p></div></li>
          </ol>
        </article>

        <article className="arcade-scoring-panel">
          <span className="section-kicker">Pontuação própria</span>
          <h2>De −165 a 155 pontos</h2>
          <ul>
            {OVERLOOKED_SCORING.map((item) => (
              <li key={item.label}><span>{item.label}</span><strong>{item.points > 0 ? "+" : ""}{item.points}</strong></li>
            ))}
          </ul>
          <p>A pontuação é recalculada no servidor a partir das decisões, nunca aceita pronta do navegador.</p>
        </article>
      </section>

      <OverlookedIntegration />

      <section className="arcade-detail-bottom-grid">
        <article className="arcade-secondary-panel">
          <span className="section-kicker">Missões secundárias futuras</span>
          <h2>Objetivos separados do leaderboard</h2>
          <ul>{OVERLOOKED_SECONDARY_MISSIONS.map((mission) => <li key={mission}>{mission}</li>)}</ul>
          <button type="button" className="text-button" onClick={onOpenMissions}>Abrir Missões</button>
        </article>
        <article className="arcade-readiness-panel">
          <span className="section-kicker">Situação da integração</span>
          <h2>O que já funciona</h2>
          <ul>
            <li className="done"><span>✓</span>Jogo incorporado ao site</li>
            <li className="done"><span>✓</span>Sessão vinculada à conta</li>
            <li className="done"><span>✓</span>Pontuação recalculada no servidor</li>
            <li className="done"><span>✓</span>Leaderboard por melhor resultado</li>
            <li><span>—</span>Recompensas gerais do Arcade</li>
          </ul>
          <p>As recompensas gerais continuam desacopladas para não alterar o progresso de aprendizagem nesta etapa.</p>
        </article>
      </section>

      <section className="arcade-rank-bands">
        <div><span className="section-kicker">Faixas alcançáveis</span><h2>Títulos ajustados à pontuação real</h2></div>
        <ol>{OVERLOOKED_RANKS.map((rank) => <li key={rank.label}><strong>{rank.minimum}+</strong><span>{rank.label}</span></li>)}</ol>
      </section>
    </div>
  );
}
