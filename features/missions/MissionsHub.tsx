"use client";

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
  const currentLearningPathStepId = learningPath.steps.find(
    (step) => step.status === "in_progress" || step.status === "available",
  )?.id;

  return (
    <div className="missions-hub" aria-labelledby="missions-hub-title">
      <header className="missions-hub__hero">
        <div className="missions-hub__hero-copy">
          <p className="missions-hub__eyebrow">Jornada contínua</p>
          <h1 id="missions-hub-title">Missões</h1>
          <p className="missions-hub__intro">
            Avance por situações próximas da rotina, investigue evidências e
            pratique decisões seguras contra phishing.
          </p>
        </div>

        <dl className="missions-hub__summary" aria-label="Resumo da jornada">
          <div className="missions-hub__summary-item">
            <dt>Progresso</dt>
            <dd>{progress.completedLabel}</dd>
          </div>
          <div className="missions-hub__summary-item">
            <dt>Pontos</dt>
            <dd>{progress.pointsLabel}</dd>
          </div>
          <div className="missions-hub__summary-item">
            <dt>Nível</dt>
            <dd>{progress.levelLabel}</dd>
          </div>
        </dl>

        <div className="missions-hub__progress">
          <div className="missions-hub__progress-heading">
            <span>Progresso da jornada principal</span>
            <strong>{progress.completedLabel}</strong>
          </div>
          <progress
            aria-label={progress.progressAssistiveLabel}
            max={progress.progressMax}
            value={progress.progressValue}
          >
            {progress.completedLabel}
          </progress>
        </div>
      </header>

      <section
        className="missions-hub__section missions-hub__curriculum"
        aria-labelledby="learning-path-title"
      >
        <div className="missions-hub__section-heading">
          <div>
            <p className="missions-hub__eyebrow">Primeiro percurso aprovado</p>
            <h2 id="learning-path-title">{learningPath.title}</h2>
          </div>
          <p>{learningPath.summary}</p>
        </div>

        <div className="missions-hub__curriculum-overview">
          <div className="missions-hub__curriculum-progress">
            <div>
              <span>Progresso do percurso</span>
              <strong>{learningPath.completedLabel}</strong>
            </div>
            <progress
              aria-label={learningPath.progressAssistiveLabel}
              max={learningPath.progressMax}
              value={learningPath.progressValue}
            >
              {learningPath.completedLabel}
            </progress>
          </div>

          <div className="missions-hub__principle" role="note">
            <span>Princípio de apoio</span>
            <ol aria-label="Princípio de apoio do percurso">
              {learningPath.principleSteps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </div>
        </div>

        <ol className="missions-hub__curriculum-list">
          {learningPath.steps.map((step) => (
            <li
              className={`missions-hub__curriculum-step ${learningPathStatusClassNames[step.status]}`}
              key={step.id}
            >
              <article
                aria-current={step.id === currentLearningPathStepId ? "step" : undefined}
                aria-labelledby={`learning-path-${step.sequenceLabel}-title`}
              >
                <span className="missions-hub__curriculum-sequence" aria-hidden="true">
                  {step.sequenceLabel}
                </span>

                <div className="missions-hub__curriculum-copy">
                  <div className="missions-hub__curriculum-topline">
                    <span className="missions-hub__category">{step.areaLabel}</span>
                    <span className="missions-hub__status">{step.statusLabel}</span>
                  </div>
                  <h3 id={`learning-path-${step.sequenceLabel}-title`}>{step.title}</h3>
                  <p>{step.summary}</p>
                  {step.relatedRadarLabel ? (
                    <small>{step.relatedRadarLabel}</small>
                  ) : null}
                </div>

                <div className="missions-hub__curriculum-action">
                  <span>{step.metaLabel}</span>
                  {step.isActionDisabled ? (
                    <span className="missions-hub__unavailable-action">
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
          ))}
        </ol>

        <aside className="missions-hub__radar-note" aria-labelledby="learning-path-radar-title">
          <div>
            <p className="missions-hub__eyebrow">Consulta livre</p>
            <h3 id="learning-path-radar-title">{learningPath.radarTitle}</h3>
            <p>{learningPath.radarSummary}</p>
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
        className="missions-hub__section"
        aria-labelledby="main-missions-title"
      >
        <div className="missions-hub__section-heading">
          <div>
            <p className="missions-hub__eyebrow">Caminho principal</p>
            <h2 id="main-missions-title">Sua sequência de missões</h2>
          </div>
          <p>
            Concluir uma missão libera a próxima. A nota orienta o reforço,
            mas não interrompe seu avanço.
          </p>
        </div>

        <ol className="missions-hub__mission-map">
          {missions.map((mission) => {
            const isLocked = mission.status === "locked";
            const isActionDisabled = isLocked || mission.isActionDisabled;

            return (
              <li
                className={`missions-hub__mission-card ${statusClassNames[mission.status]}`}
                key={mission.id}
              >
                <article aria-labelledby={`mission-${mission.id}-title`}>
                  <div className="missions-hub__mission-topline">
                    <span className="missions-hub__sequence">
                      {mission.sequenceLabel}
                    </span>
                    <span className="missions-hub__status">
                      {mission.statusLabel}
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
                    <button
                      className="missions-hub__primary-action"
                      disabled={isActionDisabled}
                      onClick={() => onOpenMission(mission.id)}
                      type="button"
                    >
                      {mission.actionLabel}
                    </button>
                  </div>
                </article>
              </li>
            );
          })}
        </ol>
      </section>

      <section
        className="missions-hub__section missions-hub__learning-loop"
        aria-labelledby="learning-loop-title"
      >
        <div className="missions-hub__section-heading">
          <div>
            <p className="missions-hub__eyebrow">Aprender sem travar</p>
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
                Seu desempenho, seus pontos e as recomendações aparecerão aqui
                após a primeira missão.
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
                Quando uma habilidade precisar de prática, a plataforma vai
                sugerir uma atividade curta sem bloquear a próxima missão.
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
            <p className="missions-hub__eyebrow">Atividades secundárias</p>
            <h2 id="secondary-missions-title">Práticas complementares</h2>
          </div>
          <p>
            Exercícios opcionais ajudam a variar o treinamento e fortalecer
            competências específicas ao longo da jornada.
          </p>
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
