import {
  ACTIVITY_LABELS,
  COMPETENCY_CATALOG,
  MAIN_MISSION_JOURNEY,
} from "../content/learning-catalog";
import { findAchievement } from "../content/achievement-catalog";
import {
  findLearningPathStepByActivityId,
  getCurriculumPresentation,
} from "../content/curriculum-catalog";
import {
  BANK_CHANGE_AGGREGATE_CLAIM,
  calculatePerformanceBonus,
  calculateSectorMetrics,
  LEVEL_RULES,
  PHISHLAB_ACTIVITY_ID,
  PILOT_MISSION_ID,
  POINT_RULES,
  SIMULATION_ACTIVITY_ID,
  RADAR_ACTIVITY_ID,
  RECOVERY_MISSION_ID,
  TEAM_CHALLENGE_ACTIVITY_ID,
} from "../domain/rules";
import type {
  ActivityTimelineItem,
  AppState,
  BankChangeAttempt,
  BankChangeResult,
  BankProcessV2Attempt,
  BankProcessV2Result,
  CompetencyLevelId,
  CompetencyOverview,
  CompetencyId,
  ConversationReconstructionV2Result,
  DomainAnalyzerV2Result,
  HistoryEvent,
  JourneyMissionView,
  JourneyProgress,
  LevelProgress,
  MissionRewardBreakdown,
  MissionResult,
  MfaConsoleV2Result,
  MfaConsoleV2Submission,
  PhishingFoundationV2Result,
  NextStepRecommendation,
  PhishLabResult,
  PointOrigin,
  SimulationResult,
  WorkdayTriageV2Attempt,
  WorkdayTriageV2Result,
  RadarResult,
  RecoveryMissionResult,
  RecoveryBuilderV2Result,
  RecoveryBuilderV2Submission,
  SectorMetrics,
  TeamChallengeResult,
  TeamChallengeAttempt,
  TrueSenderV2Result,
} from "../domain/types";

export function selectTotalPoints(state: AppState): number {
  return state.learning.pointLedger.reduce(
    (total, entry) =>
      entry.status === "confirmed" ? total + entry.points : total,
    0,
  );
}

function sectorDisplayName(value: string): string {
  return value.replace(/^Loja\s+\d+\s*·\s*/i, "").trim();
}

export function selectLearnerSector(state: AppState): {
  id: string;
  name: string;
} {
  const storedName = state.teams.name || state.demo.learner.area;

  return {
    id: state.teams.id,
    name: sectorDisplayName(storedName),
  };
}

export function selectBestMissionSummary(state: AppState): {
  activityId: string;
  title: string;
  score: number;
} | null {
  const [best] = Object.values(state.learning.activityProgress)
    .filter(
      (activity) =>
        activity.activityId.startsWith("mission:") &&
        typeof activity.bestScore === "number",
    )
    .sort((left, right) => {
      const scoreDifference = (right.bestScore ?? 0) - (left.bestScore ?? 0);

      if (scoreDifference !== 0) {
        return scoreDifference;
      }

      return (right.completedAt ?? "").localeCompare(
        left.completedAt ?? "",
      );
    });

  return best
    ? {
        activityId: best.activityId,
        title: ACTIVITY_LABELS[best.activityId] ?? "Missão concluída",
        score: best.bestScore as number,
      }
    : null;
}

export function selectPendingPoints(state: AppState): number {
  return state.learning.pointLedger.reduce(
    (total, entry) =>
      entry.status === "pending" ? total + entry.points : total,
    0,
  );
}

export function selectCurrentLevel(state: AppState) {
  const totalPoints = selectTotalPoints(state);
  return [...LEVEL_RULES]
    .reverse()
    .find((level) => totalPoints >= level.minimum) ?? LEVEL_RULES[0];
}

export function selectLevelProgress(state: AppState): LevelProgress {
  const totalPoints = selectTotalPoints(state);
  const currentLevel = selectCurrentLevel(state);
  const currentIndex = LEVEL_RULES.findIndex(
    (level) => level.id === currentLevel.id,
  );
  const nextLevel = LEVEL_RULES[currentIndex + 1] ?? null;
  const pointsToNextLevel = nextLevel
    ? Math.max(0, nextLevel.minimum - totalPoints)
    : null;
  const progressPercentage = nextLevel
    ? Math.round(
        Math.max(
          0,
          Math.min(
            1,
            (totalPoints - currentLevel.minimum) /
              (nextLevel.minimum - currentLevel.minimum),
          ),
        ) * 100,
      )
    : 100;

  return {
    currentLevel: { ...currentLevel },
    nextLevel: nextLevel ? { ...nextLevel } : null,
    totalPoints,
    pointsToNextLevel,
    progressPercentage,
    isMaximumLevel: nextLevel === null,
  };
}

export function selectPointsToNextLevel(state: AppState): number | null {
  return selectLevelProgress(state).pointsToNextLevel;
}

export function selectLatestMissionResult(
  state: AppState,
  activityId = PILOT_MISSION_ID,
): MissionResult | null {
  const progress = state.learning.activityProgress[activityId];
  const attempt = progress?.lastAttemptId
    ? state.learning.attempts[progress.lastAttemptId]
    : undefined;
  return attempt && "decision" in attempt ? attempt.result : null;
}

export function selectLatestPhishingFoundationResult(
  state: AppState,
): MissionResult | PhishingFoundationV2Result | null {
  const progress = state.learning.activityProgress[PILOT_MISSION_ID];
  const attempt = progress?.lastAttemptId
    ? state.learning.attempts[progress.lastAttemptId]
    : undefined;

  if (
    attempt &&
    "mechanicId" in attempt &&
    attempt.mechanicId === "phishing-foundation"
  ) {
    return attempt.result;
  }

  return attempt && "decision" in attempt ? attempt.result : null;
}

export function selectLatestPhishingFoundationPackageId(
  state: AppState,
): string | null {
  const progress = state.learning.activityProgress[PILOT_MISSION_ID];
  const attempt = progress?.lastAttemptId
    ? state.learning.attempts[progress.lastAttemptId]
    : undefined;

  return attempt &&
    "mechanicId" in attempt &&
    attempt.mechanicId === "phishing-foundation"
    ? attempt.casePackageId
    : null;
}

export function selectLatestConversationReconstructionResult(
  state: AppState,
): MissionResult | ConversationReconstructionV2Result | null {
  const activityId = "mission:compromised-conversation";
  const progress = state.learning.activityProgress[activityId];
  const attempt = progress?.lastAttemptId
    ? state.learning.attempts[progress.lastAttemptId]
    : undefined;

  if (
    attempt &&
    "mechanicId" in attempt &&
    attempt.mechanicId === "conversation-reconstruction"
  ) {
    return attempt.result;
  }

  return attempt && "decision" in attempt ? attempt.result : null;
}

export function selectLatestConversationReconstructionPackageId(
  state: AppState,
): string | null {
  const activityId = "mission:compromised-conversation";
  const progress = state.learning.activityProgress[activityId];
  const attempt = progress?.lastAttemptId
    ? state.learning.attempts[progress.lastAttemptId]
    : undefined;

  return attempt &&
    "mechanicId" in attempt &&
    attempt.mechanicId === "conversation-reconstruction"
    ? attempt.casePackageId
    : null;
}

export function selectLatestMfaConsoleResult(
  state: AppState,
): MissionResult | MfaConsoleV2Result | null {
  const activityId = "mission:mfa-fatigue";
  const progress = state.learning.activityProgress[activityId];
  const attempt = progress?.lastAttemptId
    ? state.learning.attempts[progress.lastAttemptId]
    : undefined;

  if (
    attempt &&
    "mechanicId" in attempt &&
    attempt.mechanicId === "mfa-console"
  ) {
    return attempt.result;
  }

  return attempt && "decision" in attempt ? attempt.result : null;
}

export function selectLatestMfaConsolePackageId(
  state: AppState,
): string | null {
  const activityId = "mission:mfa-fatigue";
  const progress = state.learning.activityProgress[activityId];
  const attempt = progress?.lastAttemptId
    ? state.learning.attempts[progress.lastAttemptId]
    : undefined;

  return attempt &&
    "mechanicId" in attempt &&
    attempt.mechanicId === "mfa-console"
    ? attempt.casePackageId
    : null;
}

export function selectLatestMfaConsoleSubmission(
  state: AppState,
): MfaConsoleV2Submission | null {
  const activityId = "mission:mfa-fatigue";
  const progress = state.learning.activityProgress[activityId];
  const attempt = progress?.lastAttemptId
    ? state.learning.attempts[progress.lastAttemptId]
    : undefined;

  return attempt &&
    "mechanicId" in attempt &&
    attempt.mechanicId === "mfa-console"
    ? attempt
    : null;
}

export function selectLatestRecoveryMissionResult(
  state: AppState,
  activityId = RECOVERY_MISSION_ID,
): RecoveryMissionResult | RecoveryBuilderV2Result | null {
  const progress = state.learning.activityProgress[activityId];
  const attempt = progress?.lastAttemptId
    ? state.learning.attempts[progress.lastAttemptId]
    : undefined;
  return attempt &&
    ("incidentType" in attempt ||
      ("mechanicId" in attempt &&
        attempt.mechanicId === "incident-response-builder"))
    ? attempt.result
    : null;
}

export function selectLatestRecoveryBuilderSubmission(
  state: AppState,
): RecoveryBuilderV2Submission | null {
  const progress = state.learning.activityProgress[RECOVERY_MISSION_ID];
  const attempt = progress?.lastAttemptId
    ? state.learning.attempts[progress.lastAttemptId]
    : undefined;
  return attempt &&
    "mechanicId" in attempt &&
    attempt.mechanicId === "incident-response-builder"
    ? attempt
    : null;
}

export function selectLatestRecoveryBuilderPackageId(
  state: AppState,
): string | null {
  return selectLatestRecoveryBuilderSubmission(state)?.casePackageId ?? null;
}

export function selectLatestPhishLabResult(
  state: AppState,
  activityId = PHISHLAB_ACTIVITY_ID,
): PhishLabResult | null {
  const progress = state.learning.activityProgress[activityId];
  const attempt = progress?.lastAttemptId
    ? state.learning.attempts[progress.lastAttemptId]
    : undefined;
  return attempt && "guidedVerdict" in attempt ? attempt.result : null;
}

export function selectLatestTrueSenderResult(
  state: AppState,
): PhishLabResult | TrueSenderV2Result | null {
  const activityId = "phishlab:true-sender";
  const progress = state.learning.activityProgress[activityId];
  const attempt = progress?.lastAttemptId
    ? state.learning.attempts[progress.lastAttemptId]
    : undefined;

  if (attempt && "mechanicId" in attempt && attempt.mechanicId === "identity-map") {
    return attempt.result;
  }

  return attempt && "guidedVerdict" in attempt ? attempt.result : null;
}

export function selectLatestTrueSenderPackageId(
  state: AppState,
): string | null {
  const activityId = "phishlab:true-sender";
  const progress = state.learning.activityProgress[activityId];
  const attempt = progress?.lastAttemptId
    ? state.learning.attempts[progress.lastAttemptId]
    : undefined;

  return attempt && "mechanicId" in attempt && attempt.mechanicId === "identity-map"
    ? attempt.casePackageId
    : null;
}

export function selectLatestDomainAnalyzerResult(
  state: AppState,
): PhishLabResult | DomainAnalyzerV2Result | null {
  const progress = state.learning.activityProgress[PHISHLAB_ACTIVITY_ID];
  const attempt = progress?.lastAttemptId
    ? state.learning.attempts[progress.lastAttemptId]
    : undefined;

  if (attempt && "mechanicId" in attempt && attempt.mechanicId === "url-anatomy") {
    return attempt.result;
  }

  return attempt && "guidedVerdict" in attempt ? attempt.result : null;
}

export function selectLatestDomainAnalyzerPackageId(
  state: AppState,
): string | null {
  const progress = state.learning.activityProgress[PHISHLAB_ACTIVITY_ID];
  const attempt = progress?.lastAttemptId
    ? state.learning.attempts[progress.lastAttemptId]
    : undefined;

  return attempt && "mechanicId" in attempt && attempt.mechanicId === "url-anatomy"
    ? attempt.casePackageId
    : null;
}

export function selectLatestSimulationResult(
  state: AppState,
  activityId = SIMULATION_ACTIVITY_ID,
): SimulationResult | WorkdayTriageV2Result | null {
  const progress = state.learning.activityProgress[activityId];
  const attempt = progress?.lastAttemptId
    ? state.learning.attempts[progress.lastAttemptId]
    : undefined;
  return attempt &&
    ("messageDecisions" in attempt ||
      ("mechanicId" in attempt && attempt.mechanicId === "batch-triage"))
    ? attempt.result
    : null;
}

export function selectLatestWorkdayTriageV2Attempt(
  state: AppState,
  activityId = SIMULATION_ACTIVITY_ID,
): WorkdayTriageV2Attempt | null {
  const progress = state.learning.activityProgress[activityId];
  const attempt = progress?.lastAttemptId
    ? state.learning.attempts[progress.lastAttemptId]
    : undefined;
  return attempt &&
    "mechanicId" in attempt &&
    attempt.mechanicId === "batch-triage"
    ? attempt
    : null;
}

export function selectLatestTeamChallengeResult(
  state: AppState,
  activityId = TEAM_CHALLENGE_ACTIVITY_ID,
): TeamChallengeResult | null {
  const progress = state.learning.activityProgress[activityId];
  const attempt = progress?.lastAttemptId
    ? state.learning.attempts[progress.lastAttemptId]
    : undefined;
  return attempt && "caseDecisions" in attempt ? attempt.result : null;
}

export function selectLatestTeamChallengeAttempt(
  state: AppState,
  activityId = TEAM_CHALLENGE_ACTIVITY_ID,
): TeamChallengeAttempt | null {
  const progress = state.learning.activityProgress[activityId];
  const attempt = progress?.lastAttemptId
    ? state.learning.attempts[progress.lastAttemptId]
    : undefined;
  return attempt && "caseDecisions" in attempt ? attempt : null;
}

export function selectLatestBankChangeResult(
  state: AppState,
): BankChangeResult | null {
  const progress = state.learning.activityProgress["team:bank-change"];
  const attempt = progress?.lastAttemptId
    ? state.learning.attempts[progress.lastAttemptId]
    : undefined;
  return attempt && "initialActionId" in attempt ? attempt.result : null;
}

export function selectLatestBankChangeAttempt(
  state: AppState,
): BankChangeAttempt | null {
  const progress = state.learning.activityProgress["team:bank-change"];
  const attempt = progress?.lastAttemptId
    ? state.learning.attempts[progress.lastAttemptId]
    : undefined;
  return attempt && "initialActionId" in attempt ? attempt : null;
}

export function selectLatestBankProcessV2Result(
  state: AppState,
): BankProcessV2Result | null {
  const progress = state.learning.activityProgress["team:bank-change"];
  const attempt = progress?.lastAttemptId
    ? state.learning.attempts[progress.lastAttemptId]
    : undefined;
  return attempt && "mechanicId" in attempt && attempt.mechanicId === "process-station"
    ? attempt.result
    : null;
}

export function selectLatestBankProcessV2Attempt(
  state: AppState,
): BankProcessV2Attempt | null {
  const progress = state.learning.activityProgress["team:bank-change"];
  const attempt = progress?.lastAttemptId
    ? state.learning.attempts[progress.lastAttemptId]
    : undefined;
  return attempt && "mechanicId" in attempt && attempt.mechanicId === "process-station"
    ? attempt
    : null;
}

function isMissionCompleted(state: AppState, activityId: string): boolean {
  return state.learning.activityProgress[activityId]?.status === "completed";
}

export function selectMainJourney(state: AppState): JourneyMissionView[] {
  return MAIN_MISSION_JOURNEY.map((mission) => {
    const progress = state.learning.activityProgress[mission.id];
    const prerequisiteCompleted = mission.prerequisiteMissionId
      ? isMissionCompleted(state, mission.prerequisiteMissionId)
      : true;
    const status =
      progress?.status === "completed"
        ? "completed"
        : progress?.status === "inProgress" && prerequisiteCompleted
          ? "inProgress"
          : prerequisiteCompleted
            ? "available"
            : "locked";

    return {
      ...mission,
      href: `/missoes/${mission.slug}`,
      status,
      attemptCount: progress?.attemptIds.length ?? 0,
      bestScore: progress?.bestScore ?? null,
      completedAt: progress?.completedAt ?? null,
    };
  });
}

export function selectJourneyProgress(state: AppState): JourneyProgress {
  const missions = selectMainJourney(state);
  const completedMissions = missions.filter(
    (mission) => mission.status === "completed",
  ).length;
  const currentMission =
    missions.find((mission) => mission.status === "inProgress") ??
    missions.find((mission) => mission.status === "available") ??
    null;

  return {
    missions,
    completedMissions,
    totalMissions: missions.length,
    percentage:
      missions.length === 0
        ? 0
        : Math.round((completedMissions / missions.length) * 100),
    currentMission,
    nextLockedMission:
      missions.find((mission) => mission.status === "locked") ?? null,
    isComplete: completedMissions === missions.length,
  };
}

function activityHref(activityId: string): string {
  const curriculumStep = findLearningPathStepByActivityId(activityId);
  if (curriculumStep) return curriculumStep.route;

  const mission = MAIN_MISSION_JOURNEY.find(
    (item) => item.id === activityId,
  );
  if (mission) return `/missoes/${mission.slug}`;
  if (activityId === PHISHLAB_ACTIVITY_ID) {
    return "/phishlab/analisador-de-links";
  }
  if (activityId === SIMULATION_ACTIVITY_ID) {
    return "/simulacoes/dia-de-trabalho";
  }
  if (activityId === RADAR_ACTIVITY_ID) {
    return "/radar/quishing";
  }
  if (activityId === TEAM_CHALLENGE_ACTIVITY_ID) {
    return "/equipes/caixa-de-entrada-segura";
  }
  if (activityId.startsWith("simulation:")) return "/simulacoes";
  if (activityId.startsWith("radar:")) return "/radar";
  if (activityId.startsWith("arcade:")) return "/arcade";
  if (activityId.startsWith("team:")) return "/equipes";
  return "/missoes";
}

export function selectNextStep(
  state: AppState,
): NextStepRecommendation {
  const activeReview = selectActiveReview(state);
  const completedActivityIds = new Set<string>();
  const inProgressActivityIds = new Set<string>();

  Object.values(state.learning.activityProgress).forEach((progress) => {
    if (progress.status === "completed") {
      completedActivityIds.add(progress.activityId);
    } else if (progress.status === "inProgress") {
      inProgressActivityIds.add(progress.activityId);
    }
  });

  const curriculum = getCurriculumPresentation(
    completedActivityIds,
    inProgressActivityIds,
  );
  const currentActivity =
    curriculum.find((activity) => activity.presentationStatus === "inProgress") ??
    curriculum.find((activity) => activity.presentationStatus === "available") ??
    null;

  if (activeReview) {
    const journeyAlternative = currentActivity
      ? {
          targetId: currentActivity.activityId,
          href: currentActivity.route,
          label: "Continuar jornada",
        }
      : null;

    return {
      kind: "adaptiveReview",
      targetId: activeReview.targetActivityId,
      href: activityHref(activeReview.targetActivityId),
      eyebrow: "Reforço recomendado",
      title:
        ACTIVITY_LABELS[activeReview.targetActivityId] ??
        "Atividade de reforço",
      description: `${activeReview.reason} Esta revisão é opcional e não bloqueia a próxima Missão.`,
      actionLabel: "Iniciar reforço",
      optional: true,
      journeyAlternative,
    };
  }

  if (currentActivity) {
    const isPilot = currentActivity.activityId === PILOT_MISSION_ID;
    const isInProgress = currentActivity.presentationStatus === "inProgress";

    return {
      kind: isInProgress
        ? "continueMission"
        : isPilot
          ? "startMission"
          : "nextMission",
      targetId: currentActivity.activityId,
      href: currentActivity.route,
      eyebrow: isPilot ? "Comece sua jornada" : "Próxima atividade",
      title: currentActivity.title,
      description: currentActivity.summary,
      actionLabel: isInProgress
        ? "Continuar atividade"
        : isPilot
          ? "Começar Missão"
          : "Abrir próxima atividade",
      optional: false,
      journeyAlternative: null,
    };
  }

  return {
    kind: "journeyComplete",
    targetId: "radar",
    href: "/radar",
    eyebrow: "Jornada principal concluída",
    title: "Continue protegendo a rotina",
    description:
      "Explore uma atividade complementar para manter as competências em prática.",
    actionLabel: "Explorar Radar",
    optional: true,
    journeyAlternative: null,
  };
}

export const selectNextStepRecommendation = selectNextStep;

export function selectMissionRewardBreakdown(
  state: AppState,
  attemptId: string,
): MissionRewardBreakdown | null {
  const attempt = state.learning.attempts[attemptId];
  if (!attempt || !("decision" in attempt)) return null;

  return selectActivityRewardBreakdown(state, attemptId);
}

function activityBasePoints(activityId: string): number | null {
  const curriculumStep = findLearningPathStepByActivityId(activityId);
  if (curriculumStep) return curriculumStep.basePoints;

  if (activityId === PILOT_MISSION_ID) return POINT_RULES.mainMission;
  if (activityId === PHISHLAB_ACTIVITY_ID) return POINT_RULES.phishLab;
  if (activityId === SIMULATION_ACTIVITY_ID) return POINT_RULES.simulation;
  if (activityId === RADAR_ACTIVITY_ID) return POINT_RULES.radar;
  if (activityId === TEAM_CHALLENGE_ACTIVITY_ID) {
    return POINT_RULES.teamOperation;
  }
  return null;
}

export function selectActivityRewardBreakdown(
  state: AppState,
  attemptId: string,
): MissionRewardBreakdown | null {
  const attempt = state.learning.attempts[attemptId];
  if (!attempt) return null;
  const basePoints = activityBasePoints(attempt.activityId);
  if (basePoints === null) return null;

  const bonusRate = calculatePerformanceBonus(attempt.result.score);
  const bonusPoints = Math.round(basePoints * bonusRate);
  const claim = Object.values(state.learning.rewardClaims).find(
    (rewardClaim) => rewardClaim.sourceId === attempt.activityId,
  );
  const grantedOnThisAttempt = claim?.claimedAt === attempt.completedAt;
  const rewardGranted = Boolean(claim);

  return {
    attemptId,
    activityId: attempt.activityId,
    basePoints,
    bonusRate,
    bonusPercentage: Math.round(bonusRate * 100),
    bonusPoints,
    totalPoints: basePoints + bonusPoints,
    claimStatus: grantedOnThisAttempt
      ? "granted"
      : rewardGranted
        ? "alreadyGranted"
        : "unclaimed",
    rewardGranted,
    grantedOnThisAttempt,
    grantedPoints: grantedOnThisAttempt ? (claim?.points ?? 0) : 0,
  };
}

export function selectLatestMissionRewardBreakdown(
  state: AppState,
  activityId = PILOT_MISSION_ID,
): MissionRewardBreakdown | null {
  const lastAttemptId =
    state.learning.activityProgress[activityId]?.lastAttemptId;
  return lastAttemptId
    ? selectActivityRewardBreakdown(state, lastAttemptId)
    : null;
}

export function selectLatestActivityRewardBreakdown(
  state: AppState,
  activityId: string,
): MissionRewardBreakdown | null {
  const lastAttemptId = state.learning.activityProgress[activityId]?.lastAttemptId;
  return lastAttemptId
    ? selectActivityRewardBreakdown(state, lastAttemptId)
    : null;
}

export function selectCompetencyScores(
  state: AppState,
): Partial<Record<CompetencyId, number>> {
  return state.learning.competencyEvidence.reduce<
    Partial<Record<CompetencyId, number>>
  >((scores, evidence) => {
    scores[evidence.competencyId] = Math.max(
      scores[evidence.competencyId] ?? 0,
      evidence.score,
    );
    return scores;
  }, {});
}

const COMPETENCY_LEVEL_LABELS: Record<CompetencyLevelId, string> = {
  notAssessed: "Não avaliada",
  developing: "Em desenvolvimento",
  practicing: "Em prática",
  consolidated: "Consolidada",
  mastered: "Dominada",
};

function competencyLevel(
  evidence: AppState["learning"]["competencyEvidence"],
): CompetencyLevelId {
  if (evidence.length === 0) return "notAssessed";

  const demonstrated = evidence.filter((item) => item.score >= 60);
  if (demonstrated.length === 0) return "developing";

  const independentOrReview = demonstrated.filter(
    (item) => item.context === "independent" || item.context === "review",
  );
  const demonstratedActivities = new Set(
    independentOrReview.map((item) => item.activityId),
  );
  const includesReview = independentOrReview.some(
    (item) => item.context === "review",
  );

  if (demonstratedActivities.size >= 3 && includesReview) return "mastered";
  if (demonstratedActivities.size >= 2) return "consolidated";
  if (independentOrReview.length > 0) return "practicing";
  return "developing";
}

export function selectCompetencyOverview(
  state: AppState,
): CompetencyOverview[] {
  return COMPETENCY_CATALOG.map((competency) => {
    const evidence = state.learning.competencyEvidence
      .filter((item) => item.competencyId === competency.id)
      .sort(
        (left, right) =>
          Date.parse(right.createdAt) - Date.parse(left.createdAt),
      );
    const levelId = competencyLevel(evidence);
    const demonstratedContexts = new Set(
      evidence
        .filter((item) => item.score >= 60)
        .map((item) => item.activityId),
    ).size;

    return {
      ...competency,
      score:
        evidence.length === 0
          ? null
          : Math.max(...evidence.map((item) => item.score)),
      levelId,
      levelLabel: COMPETENCY_LEVEL_LABELS[levelId],
      evidenceCount: evidence.length,
      demonstratedContexts,
      latestActivityId: evidence[0]?.activityId ?? null,
      latestEvidenceAt: evidence[0]?.createdAt ?? null,
    };
  });
}

export function selectActiveReview(state: AppState) {
  return (
    Object.values(state.learning.recommendations)
      .filter((recommendation) => recommendation.status === "recommended")
      .sort(
        (left, right) =>
          Date.parse(right.createdAt) - Date.parse(left.createdAt),
      )[0] ?? null
  );
}

export function selectTeamShield(state: AppState): number {
  return selectSectorMetrics(state).score;
}

export function selectSectorMetrics(state: AppState): SectorMetrics {
  return calculateSectorMetrics(state.teams.sectorAggregate);
}

export function selectSectorRanking(state: AppState) {
  const currentScore = selectSectorMetrics(state).score;
  return state.teams.ranking
    .map((entry) =>
      entry.id === state.teams.id
        ? { ...entry, name: sectorDisplayName(entry.name), score: currentScore }
        : { ...entry, name: sectorDisplayName(entry.name) },
    )
    .sort((left, right) => right.score - left.score)
    .map((entry, index) => ({
      ...entry,
      position: index + 1,
      isCurrent: entry.id === state.teams.id,
    }));
}

export function selectTeamChallengeContribution(state: AppState) {
  const claim = Object.values(state.teams.aggregateClaims).find(
    (item) => item.sourceId === TEAM_CHALLENGE_ACTIVITY_ID,
  );
  return claim ?? null;
}

export function selectBankChangeContribution(state: AppState) {
  return state.teams.aggregateClaims[BANK_CHANGE_AGGREGATE_CLAIM] ?? null;
}

const POINT_CATEGORY_LABELS: Record<PointOrigin["category"], string> = {
  learning: "Aprendizagem",
  arcade: "Arcade",
  team: "Equipe",
  radar: "Radar",
  achievement: "Conquista",
};

function activityLabel(activityId: string): string {
  const achievement = activityId.startsWith("achievement:")
    ? findAchievement(activityId.slice("achievement:".length))
    : undefined;
  return (
    achievement?.title ??
    findLearningPathStepByActivityId(activityId)?.title ??
    MAIN_MISSION_JOURNEY.find((mission) => mission.id === activityId)?.title ??
    ACTIVITY_LABELS[activityId] ??
    activityId
  );
}

export function selectPointOrigins(state: AppState): PointOrigin[] {
  return [...state.learning.pointLedger]
    .sort(
      (left, right) =>
        Date.parse(right.createdAt) - Date.parse(left.createdAt),
    )
    .map((entry) => ({
      id: entry.id,
      sourceId: entry.sourceId,
      sourceLabel: activityLabel(entry.sourceId),
      category: entry.category,
      categoryLabel: POINT_CATEGORY_LABELS[entry.category],
      points: entry.points,
      status: entry.status,
      createdAt: entry.createdAt,
    }));
}

export function selectLearningHistory(state: AppState): HistoryEvent[] {
  return [...state.learning.history].sort(
    (left, right) =>
      Date.parse(right.createdAt) - Date.parse(left.createdAt),
  );
}

function activityCategoryLabel(activityId: string): string {
  const curriculumArea = findLearningPathStepByActivityId(activityId)?.area;
  if (curriculumArea === "phishlab") return "PhishLab";
  if (curriculumArea === "simulation") return "Simulação";
  if (curriculumArea === "team") return "Equipes";
  if (curriculumArea === "mission") return "Missão";

  if (activityId === PHISHLAB_ACTIVITY_ID) return "PhishLab";
  if (activityId === SIMULATION_ACTIVITY_ID) return "Simulação";
  if (activityId.startsWith("radar:")) return "Radar";
  if (activityId.startsWith("team:")) return "Equipes";
  return "Missão";
}

function completedActivityTitle(activityId: string): string {
  const mission = MAIN_MISSION_JOURNEY.find((item) => item.id === activityId);
  return mission
    ? `Missão ${mission.title} concluída`
    : `${activityLabel(activityId)} concluída`;
}

function pluralize(
  value: number,
  singular: string,
  plural: string,
): string {
  return `${value} ${value === 1 ? singular : plural}`;
}

function confirmedPointsForSource(state: AppState, sourceId: string): number {
  return state.learning.pointLedger.reduce(
    (total, entry) =>
      entry.sourceId === sourceId && entry.status === "confirmed"
        ? total + entry.points
        : total,
    0,
  );
}

export function selectActivityTimeline(
  state: AppState,
): ActivityTimelineItem[] {
  const activityItems = Object.values(state.learning.activityProgress)
    .filter((progress) => progress.status === "completed")
    .map((progress): ActivityTimelineItem | null => {
      const attempts = progress.attemptIds
        .map((attemptId) => state.learning.attempts[attemptId])
        .filter((attempt) => Boolean(attempt))
        .sort(
          (left, right) =>
            Date.parse(right.completedAt) - Date.parse(left.completedAt),
        );
      const latestAttempt = attempts[0];
      if (!latestAttempt) return null;

      const latestScore = latestAttempt.result.score;
      const bestScore = Math.max(
        progress.bestScore ?? latestScore,
        ...attempts.map((attempt) => attempt.result.score),
      );
      const attemptIds = new Set(attempts.map((attempt) => attempt.attemptId));
      const competencyCount = new Set(
        state.learning.competencyEvidence
          .filter((evidence) => attemptIds.has(evidence.attemptId))
          .map((evidence) => evidence.competencyId),
      ).size;
      const confirmedPoints = confirmedPointsForSource(
        state,
        progress.activityId,
      );
      const hasTeamContribution = Object.values(
        state.teams.aggregateClaims,
      ).some((claim) => claim.sourceId === progress.activityId);
      const scoreDetail =
        attempts.length > 1
          ? `${pluralize(attempts.length, "tentativa", "tentativas")}; resultado mais recente ${latestScore}/100 e melhor resultado ${bestScore}/100.`
          : `Resultado ${latestScore}/100.`;
      const rewardDetail =
        confirmedPoints > 0
          ? attempts.length > 1
            ? ` A recompensa da primeira conclusão permanece em ${confirmedPoints} pontos; a repetição não concedeu novos pontos.`
            : ` ${confirmedPoints} pontos confirmados.`
          : " Nenhum ponto confirmado.";
      const competencyDetail = ` ${pluralize(
        competencyCount,
        "competência praticada",
        "competências praticadas",
      )}.`;
      const teamDetail = hasTeamContribution
        ? " Participação agregada registrada para a equipe, sem expor o resultado individual."
        : "";

      return {
        id: `activity:${progress.activityId}`,
        kind: "learningActivity",
        sourceId: progress.activityId,
        categoryLabel: activityCategoryLabel(progress.activityId),
        title: completedActivityTitle(progress.activityId),
        detail: `${scoreDetail}${rewardDetail}${competencyDetail}${teamDetail}`,
        createdAt: latestAttempt.completedAt,
        attemptCount: attempts.length,
        latestScore,
        bestScore,
        confirmedPoints,
        competencyCount,
        hasTeamContribution,
        href: activityHref(progress.activityId),
        actionLabel: "Rever resultado",
      };
    })
    .filter((item): item is ActivityTimelineItem => item !== null);

  const achievementItems = Object.values(state.learning.rewardClaims)
    .filter((claim) => claim.sourceId.startsWith("achievement:"))
    .map((claim): ActivityTimelineItem => {
      const achievement = findAchievement(
        claim.sourceId.slice("achievement:".length),
      );
      const confirmedPoints = confirmedPointsForSource(state, claim.sourceId);

      return {
        id: claim.sourceId,
        kind: "achievement",
        sourceId: claim.sourceId,
        categoryLabel: "Conquista",
        title: achievement
          ? `Conquista ${achievement.title} desbloqueada`
          : "Conquista desbloqueada",
        detail: `${confirmedPoints} pontos confirmados pela conquista. A recompensa foi registrada uma única vez.`,
        createdAt: claim.claimedAt,
        attemptCount: 0,
        latestScore: null,
        bestScore: null,
        confirmedPoints,
        competencyCount: 0,
        hasTeamContribution: false,
        href: "/perfil/conquistas",
        actionLabel: "Ver conquista",
      };
    });

  return [...activityItems, ...achievementItems].sort(
    (left, right) =>
      Date.parse(right.createdAt) - Date.parse(left.createdAt),
  );
}

export function selectRecentActivity(
  state: AppState,
  limit = 5,
): ActivityTimelineItem[] {
  return selectActivityTimeline(state).slice(0, limit);
}

export function selectLatestRadarResult(state: AppState): RadarResult | null {
  const lastAttemptId =
    state.learning.activityProgress[RADAR_ACTIVITY_ID]?.lastAttemptId;
  const attempt = lastAttemptId ? state.learning.attempts[lastAttemptId] : null;
  return attempt && "selectedOptionId" in attempt ? attempt.result : null;
}

export function selectCompletedRadarIds(state: AppState): string[] {
  return Object.values(state.learning.activityProgress)
    .filter(
      (progress) =>
        progress.activityId.startsWith("radar:") &&
        progress.status === "completed",
    )
    .map((progress) => progress.activityId);
}
