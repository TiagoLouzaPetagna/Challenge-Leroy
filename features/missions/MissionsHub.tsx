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
  durationLabel: string;
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

const trailStatusClassNames: Partial<Record<LearningPathStepStatus, string>> = {
  completed: styles.isCompleted,
  in_progress: styles.isCurrent,
  planned: styles.isPlanned,
};

export function MissionsHub({
  progress,
  learningPath,
  onOpenLearningPathStep,
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

      <section className={styles.trailSection} aria-labelledby="all-missions-title">
        <h2 id="all-missions-title">Todas as Missões</h2>
        <p className={styles.trailExplanation}>
          Os números são as etapas do seu caminho. Entre elas vêm PhishLabs e Simulações.
        </p>

        <ol className={styles.trail} aria-label={`Jornada ${learningPath.title}`}>
          {learningPath.steps.map((step) => {
            const isCurrent = step.id === currentLearningPathStepId;
            const statusClass = isCurrent
              ? styles.isCurrent
              : trailStatusClassNames[step.status];

            return (
              <li
                className={[styles.trailItem, statusClass]
                  .filter(Boolean)
                  .join(" ")}
                key={step.id}
                aria-current={isCurrent ? "step" : undefined}
              >
                <span className={styles.trailNode} aria-hidden="true">
                  {step.status === "completed" ? "✓" : step.sequenceLabel}
                </span>

                <div className={styles.trailCopy}>
                  {isCurrent ? (
                    <span className={styles.trailHere}>Sua próxima Missão</span>
                  ) : null}
                  <strong id={`learning-path-${step.sequenceLabel}-title`}>
                    {step.title}
                  </strong>
                  {step.status === "planned" ? (
                    <span className={styles.chip}>Em produção</span>
                  ) : null}
                  {step.status === "locked" ? (
                    <p className={styles.trailPrerequisites}>{step.statusLabel}</p>
                  ) : null}
                </div>

                {!step.isActionDisabled ? (
                  <button
                    type="button"
                    className={isCurrent ? "learning-button" : "text-button"}
                    onClick={() => onOpenLearningPathStep(step.href)}
                    aria-label={`${step.actionLabel}: ${step.title}`}
                  >
                    {step.actionLabel} <span aria-hidden="true">→</span>
                  </button>
                ) : null}
              </li>
            );
          })}
        </ol>
      </section>
    </div>
  );
}
