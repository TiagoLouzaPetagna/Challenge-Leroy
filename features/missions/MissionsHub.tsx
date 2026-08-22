"use client";

import { ProgressJourney } from "@/features/ui/LearningUI";

export type MissionJourneyStatus =
  | "available"
  | "in_progress"
  | "completed"
  | "locked";

export type MainMissionItem = {
  id: string;
  sequenceLabel: string;
  title: string;
  summary: string;
  status: MissionJourneyStatus;
  statusLabel: string;
  metaLabel: string;
  actionLabel: string;
  isPilot?: boolean;
  isActionDisabled?: boolean;
};

export type SecondaryMissionItem = {
  id: string;
  categoryLabel: string;
  title: string;
  summary: string;
  rewardLabel: string;
  statusLabel: string;
  actionLabel: string;
  isAvailable: boolean;
};

export type JourneyProgressView = {
  completedLabel: string;
  progressValue: number;
  progressMax: number;
  progressAssistiveLabel: string;
  pointsLabel: string;
  levelLabel: string;
};

export type LatestMissionResultView = {
  missionTitle: string;
  scoreLabel: string;
  pointsLabel: string;
  summary: string;
  actionLabel: string;
};

export type MissionReviewView = {
  eyebrow: string;
  title: string;
  summary: string;
  statusLabel: string;
  actionLabel: string;
};

export type LearningPathStepStatus =
  | "available"
  | "in_progress"
  | "completed"
  | "locked"
  | "planned";

export type LearningPathStepView = {
  id: string;
  sequenceLabel: string;
  areaLabel: string;
  title: string;
  summary: string;
  status: LearningPathStepStatus;
  statusLabel: string;
  metaLabel: string;
  actionLabel: string;
  href: string;
  relatedRadarLabel?: string;
  isActionDisabled: boolean;
};

export type LearningPathView = {
  title: string;
  summary: string;
  completedLabel: string;
  progressValue: number;
  progressMax: number;
  progressAssistiveLabel: string;
  principleSteps: readonly string[];
  steps: readonly LearningPathStepView[];
  radarTitle: string;
  radarSummary: string;
  radarRewardLabel: string;
  radarActionLabel: string;
};

export type MissionsHubProps = {
  progress: JourneyProgressView;
  learningPath: LearningPathView;
  missions: readonly MainMissionItem[];
  secondaryMissions: readonly SecondaryMissionItem[];
  latestResult?: LatestMissionResultView;
  review?: MissionReviewView;
  reinforcementExplanation: string;
  onOpenLearningPathStep: (href: string) => void;
  onOpenLearningPathRadar: () => void;
  onOpenMission: (missionId: string) => void;
  onOpenSecondaryMission: (missionId: string) => void;
  onOpenLatestResult?: () => void;
  onOpenReview?: () => void;
};

const statusClassNames: Record<MissionJourneyStatus, string> = {
  available: "is-available",
  in_progress: "is-in-progress",
  completed: "is-completed",
  locked: "is-locked",
};

const learningPathStatusClassNames: Record<LearningPathStepStatus, string> = {
  available: "is-available",
  in_progress: "is-in-progress",
  completed: "is-completed",
  locked: "is-locked",
  planned: "is-planned",
};

export function MissionsHub({
  progress,
  learningPath,
  missions,
  secondaryMissions,
  latestResult,
  review,
  reinforcementExplanation,
  onOpenLearningPathStep,
  onOpenLearningPathRadar,
  onOpenMission,
  onOpenSecondaryMission,
  onOpenLatestResult,
  onOpenReview,
}: MissionsHubProps) {
  const currentLearningPathStepId =
    learningPath.steps.find((step) => step.status === "in_progress")?.id ??
    learningPath.steps.find((step) => step.status === "available")?.id;

  return (
    <div className="missions-hub" aria-labelledby="missions-hub-title">
      <header className="missions-hub__hero missions-hub__hero--compact">
        <div className="missions-hub__hero-copy">
          <p className="missions-hub__eyebrow">Jornada de aprendizagem</p>
          <h1 id="missions-hub-title">Confiança<br />sob pressão</h1>
          <p className="missions-hub__intro">
            Oito encontros para transformar impulso em decisão segura.
          </p>
        </div>
        <div className="missions-hub__hero-art" aria-hidden="true">
          <span className="missions-hub__hill missions-hub__hill--one" />
          <span className="missions-hub__hill missions-hub__hill--two" />
          <span className="missions-hub__flag">✓</span>
          <span className="missions-hub__traveler" />
        </div>
        <div className="missions-hub__progress">
          <ProgressJourney
            current={learningPath.progressValue}
            total={learningPath.progressMax}
            label={learningPath.progressAssistiveLabel}
          />
          <p>{progress.pointsLabel} · {progress.levelLabel}</p>
        </div>
      </header>

      <section
        className="missions-hub__principle missions-hub__principle--strip"
        aria-labelledby="missions-principle-title"
      >
        <span id="missions-principle-title">Um método para quando a pressão chega</span>
        <ol aria-label="Princípio de apoio do percurso">
          {learningPath.principleSteps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </section>

      <section
        className="missions-hub__section missions-hub__curriculum"
        aria-labelledby="learning-path-title"
      >
        <h2 className="sr-only" id="learning-path-title">
          Seu caminho atual
        </h2>

        <ol
          className="missions-hub__curriculum-list missions-hub__blueprint-path"
          aria-label={`Jornada ${learningPath.title}`}
        >
          {learningPath.steps.map((step) => {
            const isCurrent = step.id === currentLearningPathStepId;

            return (
              <li
                className={`missions-hub__curriculum-step ${learningPathStatusClassNames[step.status]}${isCurrent ? " is-current" : ""}`}
                key={step.id}
              >
                <article
                  aria-current={isCurrent ? "step" : undefined}
                  aria-labelledby={`learning-path-${step.sequenceLabel}-title`}
                >
                  <span
                    className="missions-hub__curriculum-sequence"
                    aria-hidden="true"
                  >
                    {step.sequenceLabel}
                  </span>

                  <div className="missions-hub__curriculum-copy">
                    <div className="missions-hub__curriculum-topline">
                      <span className="missions-hub__category">
                        {step.areaLabel}
                      </span>
                      {isCurrent ? (
                        <span className="missions-hub__status missions-hub__status--current">
                          Atual
                        </span>
                      ) : (
                        <span className="missions-hub__status">
                          {step.statusLabel}
                        </span>
                      )}
                    </div>
                    <h3 id={`learning-path-${step.sequenceLabel}-title`}>
                      {step.title}
                    </h3>
                    {isCurrent ? <p>{step.summary}</p> : null}
                    {isCurrent && step.relatedRadarLabel ? (
                      <small>{step.relatedRadarLabel}</small>
                    ) : null}
                  </div>

                  <div className="missions-hub__curriculum-action">
                    <span>{step.metaLabel}</span>
                    {step.isActionDisabled ? (
                      <span
                        className="missions-hub__unavailable-action"
                        aria-label={`${step.statusLabel}: ${step.title}`}
                      >
                        {step.actionLabel}
                      </span>
                    ) : (
                      <button
                        className="missions-hub__primary-action"
                        onClick={() => onOpenLearningPathStep(step.href)}
                        type="button"
                        aria-label={`${step.actionLabel}: ${step.title}`}
                      >
                        {step.actionLabel}
                      </button>
                    )}
                  </div>
                </article>
              </li>
            );
          })}
        </ol>

        <aside
          className="missions-hub__radar-note"
          aria-labelledby="learning-path-radar-title"
        >
          <div>
            <p className="missions-hub__eyebrow">Consulta livre</p>
            <h3 id="learning-path-radar-title">{learningPath.radarTitle}</h3>
            <details className="missions-hub__inline-disclosure">
              <summary>Como o Radar apoia esta jornada</summary>
              <p>{learningPath.radarSummary}</p>
            </details>
          </div>
          <div className="missions-hub__radar-action">
            <span>{learningPath.radarRewardLabel}</span>
            <button
              className="missions-hub__secondary-action"
              onClick={onOpenLearningPathRadar}
              type="button"
            >
              {learningPath.radarActionLabel}
            </button>
          </div>
        </aside>
      </section>

      <section
        className="missions-hub__section missions-hub__prototype-roadmap"
        aria-labelledby="main-missions-title"
      >
        <details>
          <summary>
            <span>
              <span className="missions-hub__eyebrow">
                Visão futura e legado
              </span>
              <strong id="main-missions-title">Roadmap do protótipo</strong>
            </span>
            <span>{missions.length} missões mapeadas</span>
          </summary>
          <p>
            Esta lista preserva a sequência anterior e os conteúdos previstos.
            Use a jornada acima para seguir as atividades publicadas agora.
          </p>

          <ol className="missions-hub__mission-map">
            {missions.map((mission) => {
              const isPlanned = Boolean(mission.isActionDisabled);
              const isLocked = mission.status === "locked" && !isPlanned;
              const visualStatusClass = isPlanned
                ? "is-planned"
                : statusClassNames[mission.status];
              const visualStatusLabel = isPlanned
                ? "Conteúdo previsto"
                : mission.statusLabel;

              return (
                <li
                  className={`missions-hub__mission-card ${visualStatusClass}`}
                  key={mission.id}
                >
                  <article aria-labelledby={`mission-${mission.id}-title`}>
                    <div className="missions-hub__mission-topline">
                      <span className="missions-hub__sequence">
                        {mission.sequenceLabel}
                      </span>
                      <span className="missions-hub__status">
                        {visualStatusLabel}
                      </span>
                    </div>

                    <div className="missions-hub__mission-copy">
                      <h3 id={`mission-${mission.id}-title`}>
                        {mission.title}
                      </h3>
                      {mission.isPilot ? (
                        <span className="missions-hub__pilot-label">
                          Missão piloto
                        </span>
                      ) : null}
                      <p>{mission.summary}</p>
                    </div>

                    <div className="missions-hub__mission-footer">
                      <span>{mission.metaLabel}</span>
                      {isPlanned || isLocked ? (
                        <span className="missions-hub__unavailable-action">
                          {isPlanned
                            ? "Disponibilidade futura"
                            : mission.actionLabel}
                        </span>
                      ) : (
                        <button
                          className="missions-hub__primary-action"
                          onClick={() => onOpenMission(mission.id)}
                          type="button"
                          aria-label={`${mission.actionLabel}: ${mission.title}`}
                        >
                          {mission.actionLabel}
                        </button>
                      )}
                    </div>
                  </article>
                </li>
              );
            })}
          </ol>
        </details>
      </section>

      <section
        className="missions-hub__section missions-hub__learning-loop"
        aria-labelledby="learning-loop-title"
      >
        <div className="missions-hub__section-heading">
          <div>
            <p className="missions-hub__eyebrow">Apoio na medida certa</p>
            <h2 id="learning-loop-title">Reforço adaptativo</h2>
          </div>
        </div>

        <div className="missions-hub__reinforcement-note" role="note">
          <strong>Recomendação, não bloqueio</strong>
          <p>{reinforcementExplanation}</p>
        </div>

        <div className="missions-hub__context-grid">
          {latestResult ? (
            <article
              className="missions-hub__context-card"
              aria-labelledby="latest-result-title"
            >
              <p className="missions-hub__eyebrow">Último resultado</p>
              <h3 id="latest-result-title">{latestResult.missionTitle}</h3>
              <dl className="missions-hub__result-summary">
                <div>
                  <dt>Desempenho</dt>
                  <dd>{latestResult.scoreLabel}</dd>
                </div>
                <div>
                  <dt>Pontos recebidos</dt>
                  <dd>{latestResult.pointsLabel}</dd>
                </div>
              </dl>
              <p>{latestResult.summary}</p>
              {onOpenLatestResult ? (
                <button
                  className="missions-hub__secondary-action"
                  onClick={onOpenLatestResult}
                  type="button"
                >
                  {latestResult.actionLabel}
                </button>
              ) : null}
            </article>
          ) : (
            <article className="missions-hub__context-card is-empty">
              <p className="missions-hub__eyebrow">Último resultado</p>
              <h3>Pronto para começar</h3>
              <p>
                Resultados e pontos aparecerão aqui após a primeira missão.
              </p>
            </article>
          )}

          {review ? (
            <article
              className="missions-hub__context-card"
              aria-labelledby="mission-review-title"
            >
              <div className="missions-hub__mission-topline">
                <p className="missions-hub__eyebrow">{review.eyebrow}</p>
                <span className="missions-hub__status">
                  {review.statusLabel}
                </span>
              </div>
              <h3 id="mission-review-title">{review.title}</h3>
              <p>{review.summary}</p>
              {onOpenReview ? (
                <button
                  className="missions-hub__secondary-action"
                  onClick={onOpenReview}
                  type="button"
                >
                  {review.actionLabel}
                </button>
              ) : null}
            </article>
          ) : (
            <article className="missions-hub__context-card is-empty">
              <p className="missions-hub__eyebrow">Revisão</p>
              <h3>Nenhum reforço pendente</h3>
              <p>
                Se precisar praticar, você receberá uma sugestão sem bloquear a
                jornada.
              </p>
            </article>
          )}
        </div>
      </section>

      <section
        className="missions-hub__section"
        aria-labelledby="secondary-missions-title"
      >
        <div className="missions-hub__section-heading">
          <div>
            <p className="missions-hub__eyebrow">Pratique por habilidade</p>
            <h2 id="secondary-missions-title">Práticas complementares</h2>
          </div>
          <p>Atividades opcionais para reforçar competências específicas.</p>
        </div>

        <ul className="missions-hub__secondary-grid">
          {secondaryMissions.map((mission) => (
            <li key={mission.id}>
              <article
                className={`missions-hub__secondary-card${mission.isAvailable ? " is-available" : " is-locked"}`}
                aria-labelledby={`secondary-${mission.id}-title`}
              >
                <div className="missions-hub__mission-topline">
                  <span className="missions-hub__category">
                    {mission.categoryLabel}
                  </span>
                  <span className="missions-hub__status">
                    {mission.statusLabel}
                  </span>
                </div>
                <h3 id={`secondary-${mission.id}-title`}>{mission.title}</h3>
                <p>{mission.summary}</p>
                <div className="missions-hub__mission-footer">
                  <span>{mission.rewardLabel}</span>
                  <button
                    className="missions-hub__secondary-action"
                    disabled={!mission.isAvailable}
                    onClick={() => onOpenSecondaryMission(mission.id)}
                    type="button"
                  >
                    {mission.actionLabel}
                  </button>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
