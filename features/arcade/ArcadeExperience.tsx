"use client";


import { Mascot } from "@/features/ui/LearningUI";
import {
  ARCADE_GAMES,
  type ArcadeGame,
} from "@/lib/content/arcade-catalog";
import { OverlookedIntegration } from "./OverlookedIntegration";
import { ArcadeGameIntegration } from "./ArcadeGameIntegration";
import styles from "./ArcadeHub.module.css";

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

export function ArcadeHub({ onOpenGame }: ArcadeHubProps) {
  const featuredGame = ARCADE_GAMES[0];

  return (
    <div className="page-stack arcade-page">
      <div className={styles.hub}>
        <section className={styles.introRegion} aria-labelledby="arcade-hero-title">

          <header className={styles.editorialHeader}>
            <div className={styles.heroCopy}>
              <h1 id="arcade-hero-title">Escolha um desafio.</h1>

              {featuredGame ? (
                <div className={styles.heroActions}>
                  <button type="button" onClick={() => onOpenGame(featuredGame.slug)}>
                    {featuredGame.status === "available" ? "Jogar agora" : "Ver especificação"} <span aria-hidden="true">→</span>
                  </button>
                </div>
              ) : null}

            </div>

            <ArcadeHeroArtwork />
          </header>
        </section>

        <section className={styles.catalogSection} aria-labelledby="arcade-catalog-title">
          <div className={styles.sectionHeading}>
            <div>
              <h2 id="arcade-catalog-title">Escolha seu jogo.</h2>
            </div>
          </div>

          <div className={styles.gameCollection}>
              {ARCADE_GAMES.map((game) => (
                <ArcadeGamePoster
                  key={game.id}
                  game={game}
                  onOpen={() => onOpenGame(game.slug)}
                />
              ))}
            </div>
        </section>
      </div>
    </div>
  );
}

function ArcadeGamePoster({ game, onOpen }: { game: ArcadeGame; onOpen: () => void }) {
  const detailLabel =
    game.status === "ready" ? "Ver especificação" : "Ver detalhes";

  return (
    <article
      className={styles.gamePoster}
      data-status={game.status}
      aria-labelledby={`${game.id}-title`}
    >
      <div className={styles.posterCopy}>

        <span className={styles.gameFormat}>{game.format}</span>
        <h3 id={`${game.id}-title`}>{game.title}</h3>
        <p>{game.summary}</p>


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
            Jogar <span aria-hidden="true">→</span>
          </button>
        </div>
      </div>

      <div className={styles.posterVisual}>
        <div
          className={styles.gameArtwork}
          data-game={game.slug}
          style={game.artwork ? { backgroundImage: `url("${game.artwork}")` } : undefined}
          aria-hidden="true"
        >
          {game.slug === "phishing-escape" ? <span>ESCAPE</span> : null}
        </div>
      </div>
    </article>
  );
}

type ArcadeGameDetailProps = {
  game: ArcadeGame;
  onBackToArcade: () => void;
};

export function ArcadeGameDetail({ game, onBackToArcade }: ArcadeGameDetailProps) {
  return (
    <div className="page-stack arcade-detail-page arcade-game-room">
      <header className="arcade-game-toolbar">
        <button type="button" className="arcade-game-toolbar__back" onClick={onBackToArcade}>
          <span aria-hidden="true">←</span> Todos os jogos
        </button>
        <div>
          <strong>{game.title}</strong>
          <span>{game.difficulty} · {game.duration}</span>
        </div>
        <span className="arcade-game-toolbar__status"><i aria-hidden="true" /> Disponível</span>
      </header>

      {game.slug === "overlooked" ? (
        <OverlookedIntegration />
      ) : (
        <ArcadeGameIntegration game={game} />
      )}
    </div>
  );
}
