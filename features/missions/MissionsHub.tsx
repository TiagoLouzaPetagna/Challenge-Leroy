"use client";

import { ProgressJourney } from "@/features/ui/LearningUI";
import styles from "./MissionsLower.module.css";

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
  available: styles.isAvailable,
  in_progress: styles.isInProgress,
  completed: styles.isCompleted,
  locked: styles.isLocked,
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

      <div className={styles.lowerPage}>
        <section
          className={`${styles.section} ${styles.roadmap}`}
          aria-labelledby="main-missions-title"
        >
          <details className={styles.roadmapDisclosure}>
            <summary className={styles.roadmapSummary}>
              <span className={styles.roadmapHeading}>
                <span className={styles.eyebrow}>Outras práticas</span>
                <h2 id="main-missions-title">Mais atividades da jornada</h2>
              </span>
              <span className={styles.roadmapCount}>
                <strong>{missions.length}</strong>
                <span>missões mapeadas</span>
                <span className={styles.disclosureIcon} aria-hidden="true" />
              </span>
            </summary>

            <div className={styles.roadmapBody}>
              <p className={styles.roadmapIntro}>
                Consulte outras atividades mapeadas para esta trilha. As práticas
                disponíveis aparecem primeiro no percurso acima.
              </p>

              <ol className={styles.roadmapList}>
                {missions.map((mission) => {
                  const isPlanned = Boolean(mission.isActionDisabled);
                  const isLocked = mission.status === "locked" && !isPlanned;
                  const visualStatusClass = isPlanned
                    ? styles.isPlanned
                    : statusClassNames[mission.status];
                  const visualStatusLabel = isPlanned
                      ? "Em breve"
                    : mission.statusLabel;

                  return (
                    <li
                      className={`${styles.roadmapItem} ${visualStatusClass}`}
                      key={mission.id}
                    >
                      <article aria-labelledby={`mission-${mission.id}-title`}>
                        <span className={styles.sequence} aria-hidden="true">
                          {mission.sequenceLabel}
                        </span>

                        <div className={styles.roadmapCopy}>
                          <div className={styles.itemTopline}>
                            <span className={styles.status}>
                              {visualStatusLabel}
                            </span>
                            {mission.isPilot ? (
                              <span className={styles.pilotLabel}>Missão piloto</span>
                            ) : null}
                          </div>
                          <h3 id={`mission-${mission.id}-title`}>
                            {mission.title}
                          </h3>
                          <p>{mission.summary}</p>
                        </div>

                        <div className={styles.roadmapMeta}>
                          <span>{mission.metaLabel}</span>
                          {isPlanned || isLocked ? (
                            <span className={styles.unavailableAction}>
                              {isPlanned
                                ? "Em breve"
                                : mission.actionLabel}
                            </span>
                          ) : (
                            <button
                              className={styles.primaryAction}
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
            </div>
          </details>
        </section>

        <section
          className={`${styles.section} ${styles.reinforcement}`}
          aria-labelledby="learning-loop-title"
        >
          <div className={styles.reinforcementHeader}>
            <div>
              <p className={styles.eyebrow}>Apoio na medida certa</p>
              <h2 id="learning-loop-title">Reforço adaptativo</h2>
            </div>

            <div className={styles.reinforcementNote} role="note">
              <span className={styles.supportMark} aria-hidden="true">✓</span>
              <div>
                <strong>Recomendação, não bloqueio</strong>
                <p>{reinforcementExplanation}</p>
              </div>
            </div>
          </div>

          <div className={styles.contextGrid}>
            {latestResult ? (
              <article
                className={styles.contextCard}
                aria-labelledby="latest-result-title"
              >
                <p className={styles.eyebrow}>Último resultado</p>
                <h3 id="latest-result-title">{latestResult.missionTitle}</h3>
                <dl className={styles.resultSummary}>
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
                    className={styles.textAction}
                    onClick={onOpenLatestResult}
                    type="button"
                  >
                    {latestResult.actionLabel}
                    <span aria-hidden="true"> →</span>
                  </button>
                ) : null}
              </article>
            ) : (
              <article className={`${styles.contextCard} ${styles.isEmpty}`}>
                <p className={styles.eyebrow}>Último resultado</p>
                <h3>Pronto para começar</h3>
                <p>
                  Resultados e pontos aparecerão aqui após a primeira missão.
                </p>
              </article>
            )}

            {review ? (
              <article
                className={`${styles.contextCard} ${styles.recommendedCard}`}
                aria-labelledby="mission-review-title"
              >
                <div className={styles.itemTopline}>
                  <p className={styles.eyebrow}>{review.eyebrow}</p>
                  <span className={styles.status}>{review.statusLabel}</span>
                </div>
                <h3 id="mission-review-title">{review.title}</h3>
                <p>{review.summary}</p>
                {onOpenReview ? (
                  <button
                    className={styles.secondaryAction}
                    onClick={onOpenReview}
                    type="button"
                  >
                    {review.actionLabel}
                  </button>
                ) : null}
              </article>
            ) : (
              <article className={`${styles.contextCard} ${styles.isEmpty}`}>
                <div className={styles.itemTopline}>
                  <p className={styles.eyebrow}>Revisão</p>
                  <span className={styles.optionalLabel}>Opcional</span>
                </div>
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
          className={`${styles.section} ${styles.practices}`}
          aria-labelledby="secondary-missions-title"
        >
          <div className={styles.sectionHeading}>
            <div>
              <p className={styles.eyebrow}>Pratique por habilidade</p>
              <h2 id="secondary-missions-title">Práticas complementares</h2>
            </div>
            <p>Atividades opcionais para reforçar competências específicas.</p>
          </div>

          <ul className={styles.practiceShelf}>
            {secondaryMissions.map((mission) => (
              <li key={mission.id}>
                <article
                  className={`${styles.practiceCard} ${mission.isAvailable ? styles.isAvailable : styles.isLocked}`}
                  aria-labelledby={`secondary-${mission.id}-title`}
                >
                  <div className={styles.itemTopline}>
                    <span className={styles.category}>
                      {mission.categoryLabel}
                    </span>
                    <span className={styles.status}>
                      {mission.statusLabel}
                    </span>
                  </div>
                  <h3 id={`secondary-${mission.id}-title`}>{mission.title}</h3>
                  <p>{mission.summary}</p>
                  <div className={styles.practiceFooter}>
                    <span>{mission.rewardLabel}</span>
                    {mission.isAvailable ? (
                      <button
                        className={styles.secondaryAction}
                        onClick={() => onOpenSecondaryMission(mission.id)}
                        type="button"
                      >
                        {mission.actionLabel}
                      </button>
                    ) : (
                      <span className={styles.lockedAction}>
                        <span aria-hidden="true">●</span>
                        {mission.actionLabel}
                      </span>
                    )}
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </section>

        <footer className={styles.closingNote}>
          <span className={styles.closingMark} aria-hidden="true">✓</span>
          <p>
            <strong>Continue no seu ritmo.</strong>
            As práticas complementares são opcionais e não bloqueiam sua jornada.
          </p>
        </footer>
      </div>
    </div>
  );
}
