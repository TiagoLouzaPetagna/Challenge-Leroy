"use client";

import { SectionBanner } from "@/features/ui/SectionBanner";

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
  onOpenLearningPathStep,
}: MissionsHubProps) {
  const currentLearningPathStepId =
    learningPath.steps.find((step) => step.status === "in_progress")?.id ??
    learningPath.steps.find((step) => step.status === "available")?.id;

  return (
    <div className="missions-hub" aria-labelledby="missions-hub-title">
      <SectionBanner variant="missions" labelledBy="missions-hub-title" footer={
        <div className="missions-hub__progress">
          <ProgressJourney
            current={learningPath.progressValue}
            total={learningPath.progressMax}
            label={learningPath.progressAssistiveLabel}
          />
          <p>{progress.pointsLabel} · {progress.levelLabel}</p>
        </div>
      }>
        <span>Jornada de aprendizagem</span>
        <h1 id="missions-hub-title">Confiança<br />a cada passo.</h1>
        <p>Oito encontros para transformar impulso em decisão segura. Siga a trilha e construa novos hábitos de proteção.</p>
      </SectionBanner>

      <section className={`${styles.trailSection} missions-hub__section missions-hub__curriculum`} aria-labelledby="all-missions-title">
        <h2 id="all-missions-title">Todas as Missões</h2>
        <p className={styles.trailExplanation}>
          Os números são as etapas do seu caminho. Entre elas vêm PhishLabs e Simulações.
        </p>

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
                  <span className="missions-hub__curriculum-sequence" aria-hidden="true">
                    {step.sequenceLabel}
                  </span>
                  <div className="missions-hub__curriculum-copy">
                    <div className="missions-hub__curriculum-topline">
                      <span className="missions-hub__category">{step.areaLabel}</span>
                      <span className={`missions-hub__status${isCurrent ? " missions-hub__status--current" : ""}`}>
                        {isCurrent ? "Atual" : step.statusLabel}
                      </span>
                    </div>
                    <h3 id={`learning-path-${step.sequenceLabel}-title`}>{step.title}</h3>
                    {isCurrent ? <p>{step.summary}</p> : null}
                    {isCurrent && step.relatedRadarLabel ? <small>{step.relatedRadarLabel}</small> : null}
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
      </section>
    </div>
  );
}
