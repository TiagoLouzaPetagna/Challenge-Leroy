import { createDemoState as createSeedState } from "../content/demo-seed";
import { findLearningPathStepByActivityId } from "../content/curriculum-catalog";
import { grantEarnedAchievements } from "../domain/achievements";
import {
  createBankChangeCompetencyEvidence,
  createBankProcessV2CompetencyEvidence,
  createConversationReconstructionV2CompetencyEvidence,
  createDomainAnalyzerV2CompetencyEvidence,
  createPhishLabCompetencyEvidence,
  createSimulationCompetencyEvidence,
  createWorkdayTriageV2CompetencyEvidence,
  createRadarCompetencyEvidence,
  createMissionCompetencyEvidence,
  createMfaConsoleV2CompetencyEvidence,
  createPhishingFoundationV2CompetencyEvidence,
  createRecoveryMissionCompetencyEvidence,
  createRecoveryBuilderV2CompetencyEvidence,
  createTeamChallengeCompetencyEvidence,
  createTrueSenderV2CompetencyEvidence,
  evaluateBankChange,
  evaluateBankProcessV2,
  evaluateConversationReconstructionV2,
  evaluateDomainAnalyzerV2,
  evaluateMission,
  evaluateMfaConsoleV2,
  evaluatePhishingFoundationV2,
  evaluateRecoveryMission,
  evaluateRecoveryBuilderV2,
  evaluatePhishLab,
  evaluateSimulation,
  evaluateWorkdayTriageV2,
  evaluateRadar,
  evaluateTeamChallenge,
  evaluateTrueSenderV2,
  getMissionRuntimeDefinition,
  getRecoveryMissionRuntimeDefinition,
  getPhishLabRuntimeDefinition,
  isValidMissionSubmission,
  isValidMfaConsoleV2Submission,
  isValidPhishingFoundationV2Submission,
  isValidRecoveryMissionSubmission,
  isValidRecoveryBuilderV2Submission,
  isValidPhishLabSubmission,
  isValidSimulationSubmission,
  isValidWorkdayTriageV2Submission,
  isValidRadarSubmission,
  isValidTeamChallengeSubmission,
  isValidBankChangeSubmission,
  isValidBankProcessV2Submission,
  isValidConversationReconstructionV2Submission,
  isValidDomainAnalyzerV2Submission,
  isValidTrueSenderV2Submission,
  BANK_CHANGE_AGGREGATE_CLAIM,
  BANK_CHANGE_REWARD_CLAIM,
  PHISHLAB_ACTIVITY_ID,
  SIMULATION_ACTIVITY_ID,
  SIMULATION_REWARD_CLAIM,
  SIMULATION_TEAM_CLAIM,
  RADAR_REWARD_CLAIM,
  TEAM_CHALLENGE_AGGREGATE_CLAIM,
  TEAM_CHALLENGE_REWARD_CLAIM,
} from "../domain/rules";
import type {
  AppState,
  BankChangeSubmission,
  BankProcessV2Submission,
  BankChangeResult,
  BankProcessV2Result,
  CompetencyEvidence,
  LearningAttempt,
  ConversationReconstructionV2Submission,
  DomainAnalyzerV2Submission,
  LearnerRegistration,
  LearnerPreferences,
  ManagementTestUser,
  MissionSubmission,
  MfaConsoleV2Submission,
  PhishingFoundationV2Submission,
  PhishLabSubmission,
  PointEntry,
  RadarSubmission,
  RecoveryMissionSubmission,
  RecoveryBuilderV2Submission,
  RewardClaim,
  SimulationSubmission,
  WorkdayTriageV2Submission,
  TeamAggregateClaim,
  TeamChallengeSubmission,
  TrueSenderV2Submission,
} from "../domain/types";

export type { AppState } from "../domain/types";

export type AppAction =
  | { type: "MISSION_COMPLETED"; payload: MissionSubmission }
  | {
      type: "PHISHING_FOUNDATION_V2_COMPLETED";
      payload: PhishingFoundationV2Submission;
    }
  | {
      type: "CONVERSATION_RECONSTRUCTION_V2_COMPLETED";
      payload: ConversationReconstructionV2Submission;
    }
  | {
      type: "MFA_CONSOLE_V2_COMPLETED";
      payload: MfaConsoleV2Submission;
    }
  | { type: "RECOVERY_MISSION_COMPLETED"; payload: RecoveryMissionSubmission }
  | {
      type: "RECOVERY_BUILDER_V2_COMPLETED";
      payload: RecoveryBuilderV2Submission;
    }
  | { type: "PHISHLAB_COMPLETED"; payload: PhishLabSubmission }
  | {
      type: "DOMAIN_ANALYZER_V2_COMPLETED";
      payload: DomainAnalyzerV2Submission;
    }
  | {
      type: "TRUE_SENDER_V2_COMPLETED";
      payload: TrueSenderV2Submission;
    }
  | { type: "SIMULATION_COMPLETED"; payload: SimulationSubmission }
  | {
      type: "WORKDAY_TRIAGE_V2_COMPLETED";
      payload: WorkdayTriageV2Submission;
    }
  | { type: "RADAR_COMPLETED"; payload: RadarSubmission }
  | { type: "TEAM_CHALLENGE_COMPLETED"; payload: TeamChallengeSubmission }
  | { type: "BANK_CHANGE_COMPLETED"; payload: BankChangeSubmission }
  | { type: "BANK_PROCESS_V2_COMPLETED"; payload: BankProcessV2Submission }
  | {
      type: "PREFERENCES_SAVED";
      payload: {
        preferences: LearnerPreferences;
        changedAt: string;
      };
    }
  | {
      type: "LEARNER_PROFILE_REGISTERED";
      payload: {
        registration: LearnerRegistration;
        changedAt: string;
      };
    }
  | {
      type: "DEMO_ROLE_CHANGED";
      payload: {
        role: "learner" | "administrator";
        changedAt: string;
      };
    }
  | {
      type: "MANAGEMENT_TEST_USER_SAVED";
      payload: {
        user: ManagementTestUser;
        changedAt: string;
      };
    }
  | {
      type: "MANAGEMENT_TEST_USER_STATUS_CHANGED";
      payload: {
        userId: string;
        status: "active" | "inactive";
        changedAt: string;
      };
    }
  | { type: "TUTORIAL_STARTED"; payload: { changedAt: string } }
  | {
      type: "TUTORIAL_STEP_CHANGED";
      payload: { step: number; changedAt: string };
    }
  | { type: "TUTORIAL_COMPLETED"; payload: { changedAt: string } }
  | { type: "DEMO_RESET" };

export function createDemoState(): AppState {
  return createSeedState();
}

export const initialAppState: AppState = createDemoState();

function completeMission(
  state: AppState,
  submission: MissionSubmission,
): AppState {
  const definition = getMissionRuntimeDefinition(submission.activityId);
  const curriculumStep = findLearningPathStepByActivityId(
    submission.activityId,
  );
  const prerequisitesCompleted =
    curriculumStep?.prerequisiteActivityIds.every(
      (activityId) =>
        state.learning.activityProgress[activityId]?.status === "completed",
    ) ?? true;

  if (
    !definition ||
    !isValidMissionSubmission(submission) ||
    !prerequisitesCompleted
  ) {
    return state;
  }

  if (state.learning.attempts[submission.attemptId]) {
    return state;
  }

  const evaluatedResult = evaluateMission(submission);
  const alreadyContributed = Boolean(
    state.teams.contributionClaims[definition.teamClaimKey],
  );
  const result = alreadyContributed
    ? { ...evaluatedResult, teamPoints: 0 }
    : evaluatedResult;
  const attempt = {
    ...submission,
    status: "evaluated" as const,
    result,
  };
  const previousProgress = state.learning.activityProgress[submission.activityId];
  const alreadyRewarded = Boolean(
    state.learning.rewardClaims[definition.rewardClaimKey],
  );
  const rewardClaim: RewardClaim = {
    claimKey: definition.rewardClaimKey,
    sourceId: submission.activityId,
    points: result.potentialReward,
    claimedAt: submission.completedAt,
  };
  const pointEntry: PointEntry = {
    id: `points:${definition.rewardClaimKey}`,
    claimKey: definition.rewardClaimKey,
    sourceId: submission.activityId,
    category: "learning",
    points: result.potentialReward,
    status: "confirmed",
    createdAt: submission.completedAt,
  };
  const reviewId = `review:${submission.activityId}`;
  const nextRecommendations = { ...state.learning.recommendations };

  if (result.needsReview) {
    nextRecommendations[reviewId] = {
      id: reviewId,
      sourceActivityId: submission.activityId,
      targetActivityId: definition.reviewTargetActivityId,
      reason: definition.reviewReason,
      status: "recommended",
      createdAt: submission.completedAt,
    };
  } else {
    delete nextRecommendations[reviewId];
  }

  return {
    ...state,
    meta: {
      ...state.meta,
      revision: state.meta.revision + 1,
      savedAt: submission.completedAt,
    },
    learning: {
      ...state.learning,
      attempts: {
        ...state.learning.attempts,
        [submission.attemptId]: attempt,
      },
      activityProgress: {
        ...state.learning.activityProgress,
        [submission.activityId]: {
          activityId: submission.activityId,
          status: "completed",
          attemptIds: [
            ...(previousProgress?.attemptIds ?? []),
            submission.attemptId,
          ],
          lastAttemptId: submission.attemptId,
          bestScore: Math.max(previousProgress?.bestScore ?? 0, result.score),
          completedAt:
            previousProgress?.completedAt ?? submission.completedAt,
        },
      },
      rewardClaims: alreadyRewarded
        ? state.learning.rewardClaims
        : {
            ...state.learning.rewardClaims,
            [definition.rewardClaimKey]: rewardClaim,
          },
      pointLedger: alreadyRewarded
        ? state.learning.pointLedger
        : [...state.learning.pointLedger, pointEntry],
      competencyEvidence: [
        ...state.learning.competencyEvidence,
        ...createMissionCompetencyEvidence(submission, result),
      ],
      recommendations: nextRecommendations,
      history: [
        ...state.learning.history,
        {
          id: `history:${submission.attemptId}`,
          kind: "activityCompleted",
          sourceId: submission.activityId,
          title: `Missão ${definition.title} concluída`,
          createdAt: submission.completedAt,
        },
        ...(!alreadyRewarded
          ? [
              {
                id: `history:reward:${definition.rewardClaimKey}`,
                kind: "rewardGranted" as const,
                sourceId: submission.activityId,
                title: `${result.potentialReward} pontos gerais concedidos`,
                createdAt: submission.completedAt,
              },
            ]
          : []),
      ],
    },
    teams: alreadyContributed
      ? state.teams
      : {
          ...state.teams,
          contributionClaims: {
            ...state.teams.contributionClaims,
            [definition.teamClaimKey]: {
              claimKey: definition.teamClaimKey,
              sourceId: submission.activityId,
              points: result.teamPoints,
              createdAt: submission.completedAt,
            },
          },
        },
  };
}

function completePhishingFoundationV2(
  state: AppState,
  submission: PhishingFoundationV2Submission,
): AppState {
  const definition = getMissionRuntimeDefinition(submission.activityId);

  if (
    !definition ||
    !isValidPhishingFoundationV2Submission(submission) ||
    state.learning.attempts[submission.attemptId]
  ) {
    return state;
  }

  const evaluatedResult = evaluatePhishingFoundationV2(submission);
  const alreadyContributed = Boolean(
    state.teams.contributionClaims[definition.teamClaimKey],
  );
  const result = alreadyContributed
    ? { ...evaluatedResult, teamPoints: 0 }
    : evaluatedResult;
  const attempt = {
    ...submission,
    status: "evaluated" as const,
    result,
  };
  const previousProgress =
    state.learning.activityProgress[submission.activityId];
  const alreadyRewarded = Boolean(
    state.learning.rewardClaims[definition.rewardClaimKey],
  );
  const rewardClaim: RewardClaim = {
    claimKey: definition.rewardClaimKey,
    sourceId: submission.activityId,
    points: result.potentialReward,
    claimedAt: submission.completedAt,
  };
  const pointEntry: PointEntry = {
    id: `points:${definition.rewardClaimKey}`,
    claimKey: definition.rewardClaimKey,
    sourceId: submission.activityId,
    category: "learning",
    points: result.potentialReward,
    status: "confirmed",
    createdAt: submission.completedAt,
  };
  const reviewId = `review:${submission.activityId}`;
  const nextRecommendations = { ...state.learning.recommendations };

  if (result.needsReview) {
    nextRecommendations[reviewId] = {
      id: reviewId,
      sourceActivityId: submission.activityId,
      targetActivityId: definition.reviewTargetActivityId,
      reason:
        "Reaplicar PARE com foco na confirmação por uma referência independente da mensagem.",
      status: "recommended",
      createdAt: submission.completedAt,
    };
  } else {
    delete nextRecommendations[reviewId];
  }

  return {
    ...state,
    meta: {
      ...state.meta,
      revision: state.meta.revision + 1,
      savedAt: submission.completedAt,
    },
    learning: {
      ...state.learning,
      attempts: {
        ...state.learning.attempts,
        [submission.attemptId]: attempt,
      },
      activityProgress: {
        ...state.learning.activityProgress,
        [submission.activityId]: {
          activityId: submission.activityId,
          status: "completed",
          attemptIds: [
            ...(previousProgress?.attemptIds ?? []),
            submission.attemptId,
          ],
          lastAttemptId: submission.attemptId,
          bestScore: Math.max(previousProgress?.bestScore ?? 0, result.score),
          completedAt: previousProgress?.completedAt ?? submission.completedAt,
        },
      },
      rewardClaims: alreadyRewarded
        ? state.learning.rewardClaims
        : {
            ...state.learning.rewardClaims,
            [definition.rewardClaimKey]: rewardClaim,
          },
      pointLedger: alreadyRewarded
        ? state.learning.pointLedger
        : [...state.learning.pointLedger, pointEntry],
      competencyEvidence: [
        ...state.learning.competencyEvidence,
        ...createPhishingFoundationV2CompetencyEvidence(submission, result),
      ],
      recommendations: nextRecommendations,
      history: [
        ...state.learning.history,
        {
          id: `history:${submission.attemptId}`,
          kind: "activityCompleted",
          sourceId: submission.activityId,
          title: `Missão ${definition.title} concluída`,
          createdAt: submission.completedAt,
        },
        ...(!alreadyRewarded
          ? [
              {
                id: `history:reward:${definition.rewardClaimKey}`,
                kind: "rewardGranted" as const,
                sourceId: submission.activityId,
                title: `${result.potentialReward} pontos gerais concedidos`,
                createdAt: submission.completedAt,
              },
            ]
          : []),
      ],
    },
    teams: alreadyContributed
      ? state.teams
      : {
          ...state.teams,
          contributionClaims: {
            ...state.teams.contributionClaims,
            [definition.teamClaimKey]: {
              claimKey: definition.teamClaimKey,
              sourceId: submission.activityId,
              points: result.teamPoints,
              createdAt: submission.completedAt,
            },
          },
        },
  };
}

function completeConversationReconstructionV2(
  state: AppState,
  submission: ConversationReconstructionV2Submission,
): AppState {
  const definition = getMissionRuntimeDefinition(submission.activityId);

  if (
    !definition ||
    !isValidConversationReconstructionV2Submission(submission) ||
    state.learning.attempts[submission.attemptId]
  ) {
    return state;
  }

  const evaluatedResult = evaluateConversationReconstructionV2(submission);
  const alreadyContributed = Boolean(
    state.teams.contributionClaims[definition.teamClaimKey],
  );
  const result = alreadyContributed
    ? { ...evaluatedResult, teamPoints: 0 }
    : evaluatedResult;
  const attempt = {
    ...submission,
    status: "evaluated" as const,
    result,
  };
  const previousProgress =
    state.learning.activityProgress[submission.activityId];
  const alreadyRewarded = Boolean(
    state.learning.rewardClaims[definition.rewardClaimKey],
  );
  const rewardClaim: RewardClaim = {
    claimKey: definition.rewardClaimKey,
    sourceId: submission.activityId,
    points: result.potentialReward,
    claimedAt: submission.completedAt,
  };
  const pointEntry: PointEntry = {
    id: `points:${definition.rewardClaimKey}`,
    claimKey: definition.rewardClaimKey,
    sourceId: submission.activityId,
    category: "learning",
    points: result.potentialReward,
    status: "confirmed",
    createdAt: submission.completedAt,
  };
  const reviewId = `review:${submission.activityId}`;
  const nextRecommendations = { ...state.learning.recommendations };

  if (result.needsReview) {
    nextRecommendations[reviewId] = {
      id: reviewId,
      sourceActivityId: submission.activityId,
      targetActivityId: definition.reviewTargetActivityId,
      reason: definition.reviewReason,
      status: "recommended",
      createdAt: submission.completedAt,
    };
  } else {
    delete nextRecommendations[reviewId];
  }

  return {
    ...state,
    meta: {
      ...state.meta,
      revision: state.meta.revision + 1,
      savedAt: submission.completedAt,
    },
    learning: {
      ...state.learning,
      attempts: {
        ...state.learning.attempts,
        [submission.attemptId]: attempt,
      },
      activityProgress: {
        ...state.learning.activityProgress,
        [submission.activityId]: {
          activityId: submission.activityId,
          status: "completed",
          attemptIds: [
            ...(previousProgress?.attemptIds ?? []),
            submission.attemptId,
          ],
          lastAttemptId: submission.attemptId,
          bestScore: Math.max(previousProgress?.bestScore ?? 0, result.score),
          completedAt: previousProgress?.completedAt ?? submission.completedAt,
        },
      },
      rewardClaims: alreadyRewarded
        ? state.learning.rewardClaims
        : {
            ...state.learning.rewardClaims,
            [definition.rewardClaimKey]: rewardClaim,
          },
      pointLedger: alreadyRewarded
        ? state.learning.pointLedger
        : [...state.learning.pointLedger, pointEntry],
      competencyEvidence: [
        ...state.learning.competencyEvidence,
        ...createConversationReconstructionV2CompetencyEvidence(
          submission,
          result,
        ),
      ],
      recommendations: nextRecommendations,
      history: [
        ...state.learning.history,
        {
          id: `history:${submission.attemptId}`,
          kind: "activityCompleted",
          sourceId: submission.activityId,
          title: `Missão ${definition.title} concluída`,
          createdAt: submission.completedAt,
        },
        ...(!alreadyRewarded
          ? [
              {
                id: `history:reward:${definition.rewardClaimKey}`,
                kind: "rewardGranted" as const,
                sourceId: submission.activityId,
                title: `${result.potentialReward} pontos gerais concedidos`,
                createdAt: submission.completedAt,
              },
            ]
          : []),
      ],
    },
    teams: alreadyContributed
      ? state.teams
      : {
          ...state.teams,
          contributionClaims: {
            ...state.teams.contributionClaims,
            [definition.teamClaimKey]: {
              claimKey: definition.teamClaimKey,
              sourceId: submission.activityId,
              points: result.teamPoints,
              createdAt: submission.completedAt,
            },
          },
        },
  };
}

function completeMfaConsoleV2(
  state: AppState,
  submission: MfaConsoleV2Submission,
): AppState {
  const definition = getMissionRuntimeDefinition(submission.activityId);
  const curriculumStep = findLearningPathStepByActivityId(submission.activityId);
  const prerequisitesCompleted =
    curriculumStep?.prerequisiteActivityIds.every(
      (activityId) =>
        state.learning.activityProgress[activityId]?.status === "completed",
    ) ?? true;

  if (
    !definition ||
    !prerequisitesCompleted ||
    !isValidMfaConsoleV2Submission(submission) ||
    state.learning.attempts[submission.attemptId]
  ) {
    return state;
  }

  const evaluatedResult = evaluateMfaConsoleV2(submission);
  const alreadyContributed = Boolean(
    state.teams.contributionClaims[definition.teamClaimKey],
  );
  const result = alreadyContributed
    ? { ...evaluatedResult, teamPoints: 0 }
    : evaluatedResult;
  const attempt = {
    ...submission,
    status: "evaluated" as const,
    result,
  };
  const previousProgress =
    state.learning.activityProgress[submission.activityId];
  const alreadyRewarded = Boolean(
    state.learning.rewardClaims[definition.rewardClaimKey],
  );
  const rewardClaim: RewardClaim = {
    claimKey: definition.rewardClaimKey,
    sourceId: submission.activityId,
    points: result.potentialReward,
    claimedAt: submission.completedAt,
  };
  const pointEntry: PointEntry = {
    id: `points:${definition.rewardClaimKey}`,
    claimKey: definition.rewardClaimKey,
    sourceId: submission.activityId,
    category: "learning",
    points: result.potentialReward,
    status: "confirmed",
    createdAt: submission.completedAt,
  };
  const reviewId = `review:${submission.activityId}`;
  const nextRecommendations = { ...state.learning.recommendations };

  if (result.needsReview) {
    nextRecommendations[reviewId] = {
      id: reviewId,
      sourceActivityId: submission.activityId,
      targetActivityId: definition.reviewTargetActivityId,
      reason: definition.reviewReason,
      status: "recommended",
      createdAt: submission.completedAt,
    };
  } else {
    delete nextRecommendations[reviewId];
  }

  return {
    ...state,
    meta: {
      ...state.meta,
      revision: state.meta.revision + 1,
      savedAt: submission.completedAt,
    },
    learning: {
      ...state.learning,
      attempts: {
        ...state.learning.attempts,
        [submission.attemptId]: attempt,
      },
      activityProgress: {
        ...state.learning.activityProgress,
        [submission.activityId]: {
          activityId: submission.activityId,
          status: "completed",
          attemptIds: [
            ...(previousProgress?.attemptIds ?? []),
            submission.attemptId,
          ],
          lastAttemptId: submission.attemptId,
          bestScore: Math.max(previousProgress?.bestScore ?? 0, result.score),
          completedAt: previousProgress?.completedAt ?? submission.completedAt,
        },
      },
      rewardClaims: alreadyRewarded
        ? state.learning.rewardClaims
        : {
            ...state.learning.rewardClaims,
            [definition.rewardClaimKey]: rewardClaim,
          },
      pointLedger: alreadyRewarded
        ? state.learning.pointLedger
        : [...state.learning.pointLedger, pointEntry],
      competencyEvidence: [
        ...state.learning.competencyEvidence,
        ...createMfaConsoleV2CompetencyEvidence(submission, result),
      ],
      recommendations: nextRecommendations,
      history: [
        ...state.learning.history,
        {
          id: `history:${submission.attemptId}`,
          kind: "activityCompleted",
          sourceId: submission.activityId,
          title: `Missão ${definition.title} concluída`,
          createdAt: submission.completedAt,
        },
        ...(!alreadyRewarded
          ? [
              {
                id: `history:reward:${definition.rewardClaimKey}`,
                kind: "rewardGranted" as const,
                sourceId: submission.activityId,
                title: `${result.potentialReward} pontos gerais concedidos`,
                createdAt: submission.completedAt,
              },
            ]
          : []),
      ],
    },
    teams: alreadyContributed
      ? state.teams
      : {
          ...state.teams,
          contributionClaims: {
            ...state.teams.contributionClaims,
            [definition.teamClaimKey]: {
              claimKey: definition.teamClaimKey,
              sourceId: submission.activityId,
              points: result.teamPoints,
              createdAt: submission.completedAt,
            },
          },
        },
  };
}

function completeRecoveryMission(
  state: AppState,
  submission: RecoveryMissionSubmission,
): AppState {
  const definition = getRecoveryMissionRuntimeDefinition(
    submission.activityId,
  );
  const curriculumStep = findLearningPathStepByActivityId(
    submission.activityId,
  );
  const prerequisitesCompleted =
    curriculumStep?.prerequisiteActivityIds.every(
      (activityId) =>
        state.learning.activityProgress[activityId]?.status === "completed",
    ) ?? true;

  if (
    !definition ||
    !isValidRecoveryMissionSubmission(submission) ||
    !prerequisitesCompleted ||
    state.learning.attempts[submission.attemptId]
  ) {
    return state;
  }

  const evaluatedResult = evaluateRecoveryMission(submission);
  const alreadyContributed = Boolean(
    state.teams.contributionClaims[definition.teamClaimKey],
  );
  const result = alreadyContributed
    ? { ...evaluatedResult, teamPoints: 0 }
    : evaluatedResult;
  const attempt = {
    ...submission,
    status: "evaluated" as const,
    result,
  };
  const previousProgress = state.learning.activityProgress[submission.activityId];
  const alreadyRewarded = Boolean(
    state.learning.rewardClaims[definition.rewardClaimKey],
  );
  const rewardClaim: RewardClaim = {
    claimKey: definition.rewardClaimKey,
    sourceId: submission.activityId,
    points: result.potentialReward,
    claimedAt: submission.completedAt,
  };
  const pointEntry: PointEntry = {
    id: `points:${definition.rewardClaimKey}`,
    claimKey: definition.rewardClaimKey,
    sourceId: submission.activityId,
    category: "learning",
    points: result.potentialReward,
    status: "confirmed",
    createdAt: submission.completedAt,
  };
  const reviewId = `review:${submission.activityId}`;
  const nextRecommendations = { ...state.learning.recommendations };

  if (result.needsReview) {
    nextRecommendations[reviewId] = {
      id: reviewId,
      sourceActivityId: submission.activityId,
      targetActivityId: definition.reviewTargetActivityId,
      reason: definition.reviewReason,
      status: "recommended",
      createdAt: submission.completedAt,
    };
  } else {
    delete nextRecommendations[reviewId];
  }

  return {
    ...state,
    meta: {
      ...state.meta,
      revision: state.meta.revision + 1,
      savedAt: submission.completedAt,
    },
    learning: {
      ...state.learning,
      attempts: {
        ...state.learning.attempts,
        [submission.attemptId]: attempt,
      },
      activityProgress: {
        ...state.learning.activityProgress,
        [submission.activityId]: {
          activityId: submission.activityId,
          status: "completed",
          attemptIds: [
            ...(previousProgress?.attemptIds ?? []),
            submission.attemptId,
          ],
          lastAttemptId: submission.attemptId,
          bestScore: Math.max(previousProgress?.bestScore ?? 0, result.score),
          completedAt:
            previousProgress?.completedAt ?? submission.completedAt,
        },
      },
      rewardClaims: alreadyRewarded
        ? state.learning.rewardClaims
        : {
            ...state.learning.rewardClaims,
            [definition.rewardClaimKey]: rewardClaim,
          },
      pointLedger: alreadyRewarded
        ? state.learning.pointLedger
        : [...state.learning.pointLedger, pointEntry],
      competencyEvidence: [
        ...state.learning.competencyEvidence,
        ...createRecoveryMissionCompetencyEvidence(submission, result),
      ],
      recommendations: nextRecommendations,
      history: [
        ...state.learning.history,
        {
          id: `history:${submission.attemptId}`,
          kind: "activityCompleted",
          sourceId: submission.activityId,
          title: `Missão ${definition.title} concluída`,
          createdAt: submission.completedAt,
        },
        ...(!alreadyRewarded
          ? [
              {
                id: `history:reward:${definition.rewardClaimKey}`,
                kind: "rewardGranted" as const,
                sourceId: submission.activityId,
                title: `${result.potentialReward} pontos gerais concedidos`,
                createdAt: submission.completedAt,
              },
            ]
          : []),
      ],
    },
    teams: alreadyContributed
      ? state.teams
      : {
          ...state.teams,
          contributionClaims: {
            ...state.teams.contributionClaims,
            [definition.teamClaimKey]: {
              claimKey: definition.teamClaimKey,
              sourceId: submission.activityId,
              points: result.teamPoints,
              createdAt: submission.completedAt,
            },
          },
        },
  };
}

function completeRecoveryBuilderV2(
  state: AppState,
  submission: RecoveryBuilderV2Submission,
): AppState {
  const definition = getRecoveryMissionRuntimeDefinition(submission.activityId);
  if (
    !definition ||
    !isValidRecoveryBuilderV2Submission(submission) ||
    state.learning.attempts[submission.attemptId]
  ) {
    return state;
  }
  const evaluatedResult = evaluateRecoveryBuilderV2(submission);
  const alreadyContributed = Boolean(
    state.teams.contributionClaims[definition.teamClaimKey],
  );
  const result = alreadyContributed
    ? { ...evaluatedResult, teamPoints: 0 }
    : evaluatedResult;
  const attempt = { ...submission, status: "evaluated" as const, result };
  const previousProgress = state.learning.activityProgress[submission.activityId];
  const alreadyRewarded = Boolean(
    state.learning.rewardClaims[definition.rewardClaimKey],
  );
  const rewardClaim: RewardClaim = {
    claimKey: definition.rewardClaimKey,
    sourceId: submission.activityId,
    points: result.potentialReward,
    claimedAt: submission.completedAt,
  };
  const pointEntry: PointEntry = {
    id: `points:${definition.rewardClaimKey}`,
    claimKey: definition.rewardClaimKey,
    sourceId: submission.activityId,
    category: "learning",
    points: result.potentialReward,
    status: "confirmed",
    createdAt: submission.completedAt,
  };
  const reviewId = `review:${submission.activityId}`;
  const nextRecommendations = { ...state.learning.recommendations };
  if (result.needsReview) {
    nextRecommendations[reviewId] = {
      id: reviewId,
      sourceActivityId: submission.activityId,
      targetActivityId: definition.reviewTargetActivityId,
      reason: definition.reviewReason,
      status: "recommended",
      createdAt: submission.completedAt,
    };
  } else {
    delete nextRecommendations[reviewId];
  }
  return {
    ...state,
    meta: {
      ...state.meta,
      revision: state.meta.revision + 1,
      savedAt: submission.completedAt,
    },
    learning: {
      ...state.learning,
      attempts: {
        ...state.learning.attempts,
        [submission.attemptId]: attempt,
      },
      activityProgress: {
        ...state.learning.activityProgress,
        [submission.activityId]: {
          activityId: submission.activityId,
          status: "completed",
          attemptIds: [
            ...(previousProgress?.attemptIds ?? []),
            submission.attemptId,
          ],
          lastAttemptId: submission.attemptId,
          bestScore: Math.max(previousProgress?.bestScore ?? 0, result.score),
          completedAt: previousProgress?.completedAt ?? submission.completedAt,
        },
      },
      rewardClaims: alreadyRewarded
        ? state.learning.rewardClaims
        : {
            ...state.learning.rewardClaims,
            [definition.rewardClaimKey]: rewardClaim,
          },
      pointLedger: alreadyRewarded
        ? state.learning.pointLedger
        : [...state.learning.pointLedger, pointEntry],
      competencyEvidence: [
        ...state.learning.competencyEvidence,
        ...createRecoveryBuilderV2CompetencyEvidence(submission, result),
      ],
      recommendations: nextRecommendations,
      history: [
        ...state.learning.history,
        {
          id: `history:${submission.attemptId}`,
          kind: "activityCompleted",
          sourceId: submission.activityId,
          title: `Missão ${definition.title} concluída`,
          createdAt: submission.completedAt,
        },
        ...(!alreadyRewarded
          ? [
              {
                id: `history:reward:${definition.rewardClaimKey}`,
                kind: "rewardGranted" as const,
                sourceId: submission.activityId,
                title: `${result.potentialReward} pontos gerais concedidos`,
                createdAt: submission.completedAt,
              },
            ]
          : []),
      ],
    },
    teams: alreadyContributed
      ? state.teams
      : {
          ...state.teams,
          contributionClaims: {
            ...state.teams.contributionClaims,
            [definition.teamClaimKey]: {
              claimKey: definition.teamClaimKey,
              sourceId: submission.activityId,
              points: result.teamPoints,
              createdAt: submission.completedAt,
            },
          },
        },
  };
}

function completePhishLab(
  state: AppState,
  submission: PhishLabSubmission,
): AppState {
  const definition = getPhishLabRuntimeDefinition(submission.activityId);

  if (
    !definition ||
    !isValidPhishLabSubmission(submission) ||
    state.learning.attempts[submission.attemptId]
  ) {
    return state;
  }

  const evaluatedResult = evaluatePhishLab(submission);
  const alreadyContributed = Boolean(
    state.teams.contributionClaims[definition.teamClaimKey],
  );
  const result = alreadyContributed
    ? { ...evaluatedResult, teamPoints: 0 }
    : evaluatedResult;
  const attempt = {
    ...submission,
    status: "evaluated" as const,
    result,
  };
  const previousProgress = state.learning.activityProgress[submission.activityId];
  const alreadyRewarded = Boolean(
    state.learning.rewardClaims[definition.rewardClaimKey],
  );
  const rewardClaim: RewardClaim = {
    claimKey: definition.rewardClaimKey,
    sourceId: submission.activityId,
    points: result.potentialReward,
    claimedAt: submission.completedAt,
  };
  const pointEntry: PointEntry = {
    id: `points:${definition.rewardClaimKey}`,
    claimKey: definition.rewardClaimKey,
    sourceId: submission.activityId,
    category: "learning",
    points: result.potentialReward,
    status: "confirmed",
    createdAt: submission.completedAt,
  };
  const nextRecommendations = { ...state.learning.recommendations };

  for (const [recommendationId, recommendation] of Object.entries(
    nextRecommendations,
  )) {
    if (
      recommendation.status === "recommended" &&
      recommendation.targetActivityId === submission.activityId
    ) {
      nextRecommendations[recommendationId] = {
        ...recommendation,
        status: "completed",
      };
    }
  }

  return {
    ...state,
    meta: {
      ...state.meta,
      revision: state.meta.revision + 1,
      savedAt: submission.completedAt,
    },
    learning: {
      ...state.learning,
      attempts: {
        ...state.learning.attempts,
        [submission.attemptId]: attempt,
      },
      activityProgress: {
        ...state.learning.activityProgress,
        [submission.activityId]: {
          activityId: submission.activityId,
          status: "completed",
          attemptIds: [
            ...(previousProgress?.attemptIds ?? []),
            submission.attemptId,
          ],
          lastAttemptId: submission.attemptId,
          bestScore: Math.max(previousProgress?.bestScore ?? 0, result.score),
          completedAt: previousProgress?.completedAt ?? submission.completedAt,
        },
      },
      rewardClaims: alreadyRewarded
        ? state.learning.rewardClaims
        : {
            ...state.learning.rewardClaims,
            [definition.rewardClaimKey]: rewardClaim,
          },
      pointLedger: alreadyRewarded
        ? state.learning.pointLedger
        : [...state.learning.pointLedger, pointEntry],
      competencyEvidence: [
        ...state.learning.competencyEvidence,
        ...createPhishLabCompetencyEvidence(submission, result),
      ],
      recommendations: nextRecommendations,
      history: [
        ...state.learning.history,
        {
          id: `history:${submission.attemptId}`,
          kind: "activityCompleted",
          sourceId: submission.activityId,
          title: `PhishLab ${definition.title} concluído`,
          createdAt: submission.completedAt,
        },
        ...(!alreadyRewarded
          ? [
              {
                id: `history:reward:${definition.rewardClaimKey}`,
                kind: "rewardGranted" as const,
                sourceId: submission.activityId,
                title: `${result.potentialReward} pontos gerais concedidos`,
                createdAt: submission.completedAt,
              },
            ]
          : []),
      ],
    },
    teams: alreadyContributed
      ? state.teams
      : {
          ...state.teams,
          contributionClaims: {
            ...state.teams.contributionClaims,
            [definition.teamClaimKey]: {
              claimKey: definition.teamClaimKey,
              sourceId: submission.activityId,
              points: result.teamPoints,
              createdAt: submission.completedAt,
            },
          },
        },
  };
}

function completeDomainAnalyzerV2(
  state: AppState,
  submission: DomainAnalyzerV2Submission,
): AppState {
  const definition = getPhishLabRuntimeDefinition(submission.activityId);

  if (
    !definition ||
    !isValidDomainAnalyzerV2Submission(submission) ||
    state.learning.attempts[submission.attemptId]
  ) {
    return state;
  }

  const evaluatedResult = evaluateDomainAnalyzerV2(submission);
  const alreadyContributed = Boolean(
    state.teams.contributionClaims[definition.teamClaimKey],
  );
  const result = alreadyContributed
    ? { ...evaluatedResult, teamPoints: 0 }
    : evaluatedResult;
  const attempt = {
    ...submission,
    status: "evaluated" as const,
    result,
  };
  const previousProgress =
    state.learning.activityProgress[submission.activityId];
  const alreadyRewarded = Boolean(
    state.learning.rewardClaims[definition.rewardClaimKey],
  );
  const rewardClaim: RewardClaim = {
    claimKey: definition.rewardClaimKey,
    sourceId: submission.activityId,
    points: result.potentialReward,
    claimedAt: submission.completedAt,
  };
  const pointEntry: PointEntry = {
    id: `points:${definition.rewardClaimKey}`,
    claimKey: definition.rewardClaimKey,
    sourceId: submission.activityId,
    category: "learning",
    points: result.potentialReward,
    status: "confirmed",
    createdAt: submission.completedAt,
  };
  const nextRecommendations = { ...state.learning.recommendations };

  for (const [recommendationId, recommendation] of Object.entries(
    nextRecommendations,
  )) {
    if (
      recommendation.status === "recommended" &&
      recommendation.targetActivityId === submission.activityId
    ) {
      nextRecommendations[recommendationId] = {
        ...recommendation,
        status: "completed",
      };
    }
  }

  return {
    ...state,
    meta: {
      ...state.meta,
      revision: state.meta.revision + 1,
      savedAt: submission.completedAt,
    },
    learning: {
      ...state.learning,
      attempts: {
        ...state.learning.attempts,
        [submission.attemptId]: attempt,
      },
      activityProgress: {
        ...state.learning.activityProgress,
        [submission.activityId]: {
          activityId: submission.activityId,
          status: "completed",
          attemptIds: [
            ...(previousProgress?.attemptIds ?? []),
            submission.attemptId,
          ],
          lastAttemptId: submission.attemptId,
          bestScore: Math.max(previousProgress?.bestScore ?? 0, result.score),
          completedAt: previousProgress?.completedAt ?? submission.completedAt,
        },
      },
      rewardClaims: alreadyRewarded
        ? state.learning.rewardClaims
        : {
            ...state.learning.rewardClaims,
            [definition.rewardClaimKey]: rewardClaim,
          },
      pointLedger: alreadyRewarded
        ? state.learning.pointLedger
        : [...state.learning.pointLedger, pointEntry],
      competencyEvidence: [
        ...state.learning.competencyEvidence,
        ...createDomainAnalyzerV2CompetencyEvidence(submission, result),
      ],
      recommendations: nextRecommendations,
      history: [
        ...state.learning.history,
        {
          id: `history:${submission.attemptId}`,
          kind: "activityCompleted",
          sourceId: submission.activityId,
          title: `PhishLab ${definition.title} concluído`,
          createdAt: submission.completedAt,
        },
        ...(!alreadyRewarded
          ? [
              {
                id: `history:reward:${definition.rewardClaimKey}`,
                kind: "rewardGranted" as const,
                sourceId: submission.activityId,
                title: `${result.potentialReward} pontos gerais concedidos`,
                createdAt: submission.completedAt,
              },
            ]
          : []),
      ],
    },
    teams: alreadyContributed
      ? state.teams
      : {
          ...state.teams,
          contributionClaims: {
            ...state.teams.contributionClaims,
            [definition.teamClaimKey]: {
              claimKey: definition.teamClaimKey,
              sourceId: submission.activityId,
              points: result.teamPoints,
              createdAt: submission.completedAt,
            },
          },
        },
  };
}

function completeTrueSenderV2(
  state: AppState,
  submission: TrueSenderV2Submission,
): AppState {
  const definition = getPhishLabRuntimeDefinition(submission.activityId);

  if (
    !definition ||
    !isValidTrueSenderV2Submission(submission) ||
    state.learning.attempts[submission.attemptId]
  ) {
    return state;
  }

  const evaluatedResult = evaluateTrueSenderV2(submission);
  const alreadyContributed = Boolean(
    state.teams.contributionClaims[definition.teamClaimKey],
  );
  const result = alreadyContributed
    ? { ...evaluatedResult, teamPoints: 0 }
    : evaluatedResult;
  const attempt = {
    ...submission,
    status: "evaluated" as const,
    result,
  };
  const previousProgress =
    state.learning.activityProgress[submission.activityId];
  const alreadyRewarded = Boolean(
    state.learning.rewardClaims[definition.rewardClaimKey],
  );
  const rewardClaim: RewardClaim = {
    claimKey: definition.rewardClaimKey,
    sourceId: submission.activityId,
    points: result.potentialReward,
    claimedAt: submission.completedAt,
  };
  const pointEntry: PointEntry = {
    id: `points:${definition.rewardClaimKey}`,
    claimKey: definition.rewardClaimKey,
    sourceId: submission.activityId,
    category: "learning",
    points: result.potentialReward,
    status: "confirmed",
    createdAt: submission.completedAt,
  };
  const nextRecommendations = { ...state.learning.recommendations };

  for (const [recommendationId, recommendation] of Object.entries(
    nextRecommendations,
  )) {
    if (
      recommendation.status === "recommended" &&
      recommendation.targetActivityId === submission.activityId
    ) {
      nextRecommendations[recommendationId] = {
        ...recommendation,
        status: "completed",
      };
    }
  }

  return {
    ...state,
    meta: {
      ...state.meta,
      revision: state.meta.revision + 1,
      savedAt: submission.completedAt,
    },
    learning: {
      ...state.learning,
      attempts: {
        ...state.learning.attempts,
        [submission.attemptId]: attempt,
      },
      activityProgress: {
        ...state.learning.activityProgress,
        [submission.activityId]: {
          activityId: submission.activityId,
          status: "completed",
          attemptIds: [
            ...(previousProgress?.attemptIds ?? []),
            submission.attemptId,
          ],
          lastAttemptId: submission.attemptId,
          bestScore: Math.max(previousProgress?.bestScore ?? 0, result.score),
          completedAt: previousProgress?.completedAt ?? submission.completedAt,
        },
      },
      rewardClaims: alreadyRewarded
        ? state.learning.rewardClaims
        : {
            ...state.learning.rewardClaims,
            [definition.rewardClaimKey]: rewardClaim,
          },
      pointLedger: alreadyRewarded
        ? state.learning.pointLedger
        : [...state.learning.pointLedger, pointEntry],
      competencyEvidence: [
        ...state.learning.competencyEvidence,
        ...createTrueSenderV2CompetencyEvidence(submission, result),
      ],
      recommendations: nextRecommendations,
      history: [
        ...state.learning.history,
        {
          id: `history:${submission.attemptId}`,
          kind: "activityCompleted",
          sourceId: submission.activityId,
          title: `PhishLab ${definition.title} concluído`,
          createdAt: submission.completedAt,
        },
        ...(!alreadyRewarded
          ? [
              {
                id: `history:reward:${definition.rewardClaimKey}`,
                kind: "rewardGranted" as const,
                sourceId: submission.activityId,
                title: `${result.potentialReward} pontos gerais concedidos`,
                createdAt: submission.completedAt,
              },
            ]
          : []),
      ],
    },
    teams: alreadyContributed
      ? state.teams
      : {
          ...state.teams,
          contributionClaims: {
            ...state.teams.contributionClaims,
            [definition.teamClaimKey]: {
              claimKey: definition.teamClaimKey,
              sourceId: submission.activityId,
              points: result.teamPoints,
              createdAt: submission.completedAt,
            },
          },
        },
  };
}

function completeSimulation(
  state: AppState,
  submission: SimulationSubmission,
): AppState {
  if (
    !isValidSimulationSubmission(submission) ||
    state.learning.attempts[submission.attemptId]
  ) {
    return state;
  }

  const evaluatedResult = evaluateSimulation(submission);
  const alreadyContributed = Boolean(
    state.teams.contributionClaims[SIMULATION_TEAM_CLAIM],
  );
  const result = alreadyContributed
    ? { ...evaluatedResult, teamPoints: 0 }
    : evaluatedResult;
  const attempt = {
    ...submission,
    status: "evaluated" as const,
    result,
  };
  const previousProgress = state.learning.activityProgress[submission.activityId];
  const alreadyRewarded = Boolean(
    state.learning.rewardClaims[SIMULATION_REWARD_CLAIM],
  );
  const rewardClaim: RewardClaim = {
    claimKey: SIMULATION_REWARD_CLAIM,
    sourceId: submission.activityId,
    points: result.potentialReward,
    claimedAt: submission.completedAt,
  };
  const pointEntry: PointEntry = {
    id: `points:${SIMULATION_REWARD_CLAIM}`,
    claimKey: SIMULATION_REWARD_CLAIM,
    sourceId: submission.activityId,
    category: "learning",
    points: result.potentialReward,
    status: "confirmed",
    createdAt: submission.completedAt,
  };
  const nextRecommendations = { ...state.learning.recommendations };

  for (const [recommendationId, recommendation] of Object.entries(
    nextRecommendations,
  )) {
    if (
      recommendation.status === "recommended" &&
      recommendation.targetActivityId === SIMULATION_ACTIVITY_ID
    ) {
      nextRecommendations[recommendationId] = {
        ...recommendation,
        status: "completed",
      };
    }
  }

  const followUpId = `review:${SIMULATION_ACTIVITY_ID}`;
  if (result.needsReview) {
    nextRecommendations[followUpId] = {
      id: followUpId,
      sourceActivityId: SIMULATION_ACTIVITY_ID,
      targetActivityId: PHISHLAB_ACTIVITY_ID,
      reason:
        result.falsePositives > 1
          ? "Revisar evidências antes de reportar para reduzir falsos positivos."
          : "Reforçar a investigação antes de decidir como tratar uma mensagem.",
      status: "recommended",
      createdAt: submission.completedAt,
    };
  } else if (nextRecommendations[followUpId]) {
    nextRecommendations[followUpId] = {
      ...nextRecommendations[followUpId],
      status: "completed",
    };
  }

  return {
    ...state,
    meta: {
      ...state.meta,
      revision: state.meta.revision + 1,
      savedAt: submission.completedAt,
    },
    learning: {
      ...state.learning,
      attempts: {
        ...state.learning.attempts,
        [submission.attemptId]: attempt,
      },
      activityProgress: {
        ...state.learning.activityProgress,
        [submission.activityId]: {
          activityId: submission.activityId,
          status: "completed",
          attemptIds: [
            ...(previousProgress?.attemptIds ?? []),
            submission.attemptId,
          ],
          lastAttemptId: submission.attemptId,
          bestScore: Math.max(previousProgress?.bestScore ?? 0, result.score),
          completedAt: previousProgress?.completedAt ?? submission.completedAt,
        },
      },
      rewardClaims: alreadyRewarded
        ? state.learning.rewardClaims
        : {
            ...state.learning.rewardClaims,
            [SIMULATION_REWARD_CLAIM]: rewardClaim,
          },
      pointLedger: alreadyRewarded
        ? state.learning.pointLedger
        : [...state.learning.pointLedger, pointEntry],
      competencyEvidence: [
        ...state.learning.competencyEvidence,
        ...createSimulationCompetencyEvidence(submission, result),
      ],
      recommendations: nextRecommendations,
      history: [
        ...state.learning.history,
        {
          id: `history:${submission.attemptId}`,
          kind: "activityCompleted",
          sourceId: submission.activityId,
          title: "Simulação Uma manhã comum concluída",
          createdAt: submission.completedAt,
        },
        ...(!alreadyRewarded
          ? [
              {
                id: `history:reward:${SIMULATION_REWARD_CLAIM}`,
                kind: "rewardGranted" as const,
                sourceId: submission.activityId,
                title: `${result.potentialReward} pontos gerais concedidos`,
                createdAt: submission.completedAt,
              },
            ]
          : []),
      ],
    },
    teams: alreadyContributed
      ? state.teams
      : {
          ...state.teams,
          contributionClaims: {
            ...state.teams.contributionClaims,
            [SIMULATION_TEAM_CLAIM]: {
              claimKey: SIMULATION_TEAM_CLAIM,
              sourceId: submission.activityId,
              points: result.teamPoints,
              createdAt: submission.completedAt,
            },
          },
        },
  };
}

function completeWorkdayTriageV2(
  state: AppState,
  submission: WorkdayTriageV2Submission,
): AppState {
  if (
    !isValidWorkdayTriageV2Submission(submission) ||
    state.learning.attempts[submission.attemptId]
  ) {
    return state;
  }

  const evaluatedResult = evaluateWorkdayTriageV2(submission);
  const alreadyContributed = Boolean(
    state.teams.contributionClaims[SIMULATION_TEAM_CLAIM],
  );
  const result = alreadyContributed
    ? { ...evaluatedResult, teamPoints: 0 }
    : evaluatedResult;
  const attempt = {
    ...submission,
    status: "evaluated" as const,
    result,
  };
  const previousProgress = state.learning.activityProgress[submission.activityId];
  const alreadyRewarded = Boolean(
    state.learning.rewardClaims[SIMULATION_REWARD_CLAIM],
  );
  const rewardClaim: RewardClaim = {
    claimKey: SIMULATION_REWARD_CLAIM,
    sourceId: submission.activityId,
    points: result.potentialReward,
    claimedAt: submission.completedAt,
  };
  const pointEntry: PointEntry = {
    id: `points:${SIMULATION_REWARD_CLAIM}`,
    claimKey: SIMULATION_REWARD_CLAIM,
    sourceId: submission.activityId,
    category: "learning",
    points: result.potentialReward,
    status: "confirmed",
    createdAt: submission.completedAt,
  };
  const nextRecommendations = { ...state.learning.recommendations };

  for (const [recommendationId, recommendation] of Object.entries(
    nextRecommendations,
  )) {
    if (
      recommendation.status === "recommended" &&
      recommendation.targetActivityId === SIMULATION_ACTIVITY_ID
    ) {
      nextRecommendations[recommendationId] = {
        ...recommendation,
        status: "completed",
      };
    }
  }

  const followUpId = `review:${SIMULATION_ACTIVITY_ID}`;
  if (result.needsReview) {
    nextRecommendations[followUpId] = {
      id: followUpId,
      sourceActivityId: SIMULATION_ACTIVITY_ID,
      targetActivityId: PHISHLAB_ACTIVITY_ID,
      reason:
        result.falsePositives > 0
          ? "Revisar evidências antes de conter um item legítimo."
          : "Reforçar a confirmação independente e a preservação de pendências inconclusivas.",
      status: "recommended",
      createdAt: submission.completedAt,
    };
  } else if (nextRecommendations[followUpId]) {
    nextRecommendations[followUpId] = {
      ...nextRecommendations[followUpId],
      status: "completed",
    };
  }

  return {
    ...state,
    meta: {
      ...state.meta,
      revision: state.meta.revision + 1,
      savedAt: submission.completedAt,
    },
    learning: {
      ...state.learning,
      attempts: {
        ...state.learning.attempts,
        [submission.attemptId]: attempt,
      },
      activityProgress: {
        ...state.learning.activityProgress,
        [submission.activityId]: {
          activityId: submission.activityId,
          status: "completed",
          attemptIds: [
            ...(previousProgress?.attemptIds ?? []),
            submission.attemptId,
          ],
          lastAttemptId: submission.attemptId,
          bestScore: Math.max(previousProgress?.bestScore ?? 0, result.score),
          completedAt: previousProgress?.completedAt ?? submission.completedAt,
        },
      },
      rewardClaims: alreadyRewarded
        ? state.learning.rewardClaims
        : {
            ...state.learning.rewardClaims,
            [SIMULATION_REWARD_CLAIM]: rewardClaim,
          },
      pointLedger: alreadyRewarded
        ? state.learning.pointLedger
        : [...state.learning.pointLedger, pointEntry],
      competencyEvidence: [
        ...state.learning.competencyEvidence,
        ...createWorkdayTriageV2CompetencyEvidence(submission, result),
      ],
      recommendations: nextRecommendations,
      history: [
        ...state.learning.history,
        {
          id: `history:${submission.attemptId}`,
          kind: "activityCompleted",
          sourceId: submission.activityId,
          title: "Simulação Uma manhã comum concluída",
          createdAt: submission.completedAt,
        },
        ...(!alreadyRewarded
          ? [
              {
                id: `history:reward:${SIMULATION_REWARD_CLAIM}`,
                kind: "rewardGranted" as const,
                sourceId: submission.activityId,
                title: `${result.potentialReward} pontos gerais concedidos`,
                createdAt: submission.completedAt,
              },
            ]
          : []),
      ],
    },
    teams: alreadyContributed
      ? state.teams
      : {
          ...state.teams,
          contributionClaims: {
            ...state.teams.contributionClaims,
            [SIMULATION_TEAM_CLAIM]: {
              claimKey: SIMULATION_TEAM_CLAIM,
              sourceId: submission.activityId,
              points: result.teamPoints,
              createdAt: submission.completedAt,
            },
          },
        },
  };
}

function completeRadar(
  state: AppState,
  submission: RadarSubmission,
): AppState {
  if (
    !isValidRadarSubmission(submission) ||
    state.learning.attempts[submission.attemptId]
  ) {
    return state;
  }

  const evaluatedResult = evaluateRadar(submission);
  if (!evaluatedResult.correct) return state;

  const alreadyRewarded = Boolean(
    state.learning.rewardClaims[RADAR_REWARD_CLAIM],
  );
  const previousProgress = state.learning.activityProgress[submission.activityId];

  // Uma releitura pode acontecer na interface, mas não cria uma segunda
  // conclusão, evidência ou recompensa para o mesmo conteúdo.
  if (previousProgress?.status === "completed") return state;

  const attempt = {
    ...submission,
    status: "evaluated" as const,
    result: evaluatedResult,
  };
  const rewardClaim: RewardClaim = {
    claimKey: RADAR_REWARD_CLAIM,
    sourceId: submission.activityId,
    points: evaluatedResult.points,
    claimedAt: submission.completedAt,
  };
  const pointEntry: PointEntry = {
    id: `points:${RADAR_REWARD_CLAIM}`,
    claimKey: RADAR_REWARD_CLAIM,
    sourceId: submission.activityId,
    category: "radar",
    points: evaluatedResult.points,
    status: "confirmed",
    createdAt: submission.completedAt,
  };

  return {
    ...state,
    meta: {
      ...state.meta,
      revision: state.meta.revision + 1,
      savedAt: submission.completedAt,
    },
    learning: {
      ...state.learning,
      attempts: {
        ...state.learning.attempts,
        [submission.attemptId]: attempt,
      },
      activityProgress: {
        ...state.learning.activityProgress,
        [submission.activityId]: {
          activityId: submission.activityId,
          status: "completed",
          attemptIds: [submission.attemptId],
          lastAttemptId: submission.attemptId,
          bestScore: evaluatedResult.score,
          completedAt: submission.completedAt,
        },
      },
      rewardClaims: alreadyRewarded
        ? state.learning.rewardClaims
        : {
            ...state.learning.rewardClaims,
            [RADAR_REWARD_CLAIM]: rewardClaim,
          },
      pointLedger: alreadyRewarded
        ? state.learning.pointLedger
        : [...state.learning.pointLedger, pointEntry],
      competencyEvidence: [
        ...state.learning.competencyEvidence,
        ...createRadarCompetencyEvidence(submission),
      ],
      history: [
        ...state.learning.history,
        {
          id: `history:${submission.attemptId}`,
          kind: "activityCompleted",
          sourceId: submission.activityId,
          title: "Radar: Quishing concluído",
          createdAt: submission.completedAt,
        },
        ...(!alreadyRewarded
          ? [
              {
                id: `history:reward:${RADAR_REWARD_CLAIM}`,
                kind: "rewardGranted" as const,
                sourceId: submission.activityId,
                title: `${evaluatedResult.points} pontos do Radar concedidos`,
                createdAt: submission.completedAt,
              },
            ]
          : []),
      ],
    },
  };
}

function completeTeamChallenge(
  state: AppState,
  submission: TeamChallengeSubmission,
): AppState {
  if (
    !isValidTeamChallengeSubmission(submission) ||
    state.learning.attempts[submission.attemptId]
  ) {
    return state;
  }

  const result = evaluateTeamChallenge(submission);
  const attempt = {
    ...submission,
    status: "evaluated" as const,
    result,
  };
  const previousProgress = state.learning.activityProgress[submission.activityId];
  const alreadyRewarded = Boolean(
    state.learning.rewardClaims[TEAM_CHALLENGE_REWARD_CLAIM],
  );
  const alreadyAggregated = Boolean(
    state.teams.aggregateClaims[TEAM_CHALLENGE_AGGREGATE_CLAIM],
  );
  const alreadyParticipating =
    Object.keys(state.teams.aggregateClaims).length > 0;
  const rewardClaim: RewardClaim = {
    claimKey: TEAM_CHALLENGE_REWARD_CLAIM,
    sourceId: submission.activityId,
    points: result.potentialReward,
    claimedAt: submission.completedAt,
  };
  const pointEntry: PointEntry = {
    id: `points:${TEAM_CHALLENGE_REWARD_CLAIM}`,
    claimKey: TEAM_CHALLENGE_REWARD_CLAIM,
    sourceId: submission.activityId,
    category: "team",
    points: result.potentialReward,
    status: "confirmed",
    createdAt: submission.completedAt,
  };
  const aggregateClaim: TeamAggregateClaim = {
    claimKey: TEAM_CHALLENGE_AGGREGATE_CLAIM,
    sourceId: submission.activityId,
    correctDecisions: result.correctDecisions,
    totalDecisions: result.totalDecisions,
    coveredCompetencyIds: result.coveredCompetencyIds,
    createdAt: submission.completedAt,
  };
  const coveredCompetencies = new Set(
    state.teams.sectorAggregate.coveredCompetencyIds,
  );
  for (const competencyId of result.coveredCompetencyIds) {
    if (
      state.teams.sectorAggregate.requiredCompetencyIds.includes(competencyId)
    ) {
      coveredCompetencies.add(competencyId);
    }
  }
  const nextAggregate = alreadyAggregated
    ? state.teams.sectorAggregate
    : {
        ...state.teams.sectorAggregate,
        validParticipants:
          state.teams.sectorAggregate.validParticipants +
          (alreadyParticipating ? 0 : 1),
        correctDecisions:
          state.teams.sectorAggregate.correctDecisions +
          result.correctDecisions,
        validDecisions:
          state.teams.sectorAggregate.validDecisions + result.totalDecisions,
        coveredCompetencyIds: [...coveredCompetencies],
      };

  return {
    ...state,
    meta: {
      ...state.meta,
      revision: state.meta.revision + 1,
      savedAt: submission.completedAt,
    },
    learning: {
      ...state.learning,
      attempts: {
        ...state.learning.attempts,
        [submission.attemptId]: attempt,
      },
      activityProgress: {
        ...state.learning.activityProgress,
        [submission.activityId]: {
          activityId: submission.activityId,
          status: "completed",
          attemptIds: [
            ...(previousProgress?.attemptIds ?? []),
            submission.attemptId,
          ],
          lastAttemptId: submission.attemptId,
          bestScore: Math.max(previousProgress?.bestScore ?? 0, result.score),
          completedAt: previousProgress?.completedAt ?? submission.completedAt,
        },
      },
      rewardClaims: alreadyRewarded
        ? state.learning.rewardClaims
        : {
            ...state.learning.rewardClaims,
            [TEAM_CHALLENGE_REWARD_CLAIM]: rewardClaim,
          },
      pointLedger: alreadyRewarded
        ? state.learning.pointLedger
        : [...state.learning.pointLedger, pointEntry],
      competencyEvidence: [
        ...state.learning.competencyEvidence,
        ...createTeamChallengeCompetencyEvidence(submission, result),
      ],
      history: [
        ...state.learning.history,
        {
          id: `history:${submission.attemptId}`,
          kind: "activityCompleted",
          sourceId: submission.activityId,
          title: "Equipes: Caixa de Entrada Segura concluída",
          createdAt: submission.completedAt,
        },
        ...(!alreadyRewarded
          ? [
              {
                id: `history:reward:${TEAM_CHALLENGE_REWARD_CLAIM}`,
                kind: "rewardGranted" as const,
                sourceId: submission.activityId,
                title: `${result.potentialReward} pontos de Equipes concedidos`,
                createdAt: submission.completedAt,
              },
            ]
          : []),
      ],
    },
    teams: {
      ...state.teams,
      sectorAggregate: nextAggregate,
      aggregateClaims: alreadyAggregated
        ? state.teams.aggregateClaims
        : {
            ...state.teams.aggregateClaims,
            [TEAM_CHALLENGE_AGGREGATE_CLAIM]: aggregateClaim,
          },
      history: alreadyAggregated
        ? state.teams.history
        : [
            ...state.teams.history,
            {
              id: `team-history:${TEAM_CHALLENGE_AGGREGATE_CLAIM}`,
              title: "Nova participação válida",
              detail:
                "Os indicadores do setor foram atualizados sem publicar o resultado individual.",
              createdAt: submission.completedAt,
            },
          ],
    },
  };
}

function completeBankChange(
  state: AppState,
  submission: BankChangeSubmission | BankProcessV2Submission,
): AppState {
  const isV2 = "mechanicId" in submission;
  if (
    !(isV2
      ? isValidBankProcessV2Submission(submission)
      : isValidBankChangeSubmission(submission)) ||
    state.learning.attempts[submission.attemptId]
  ) {
    return state;
  }

  let result: BankChangeResult | BankProcessV2Result;
  let attempt: LearningAttempt;
  let competencyEvidence: CompetencyEvidence[];
  if ("mechanicId" in submission) {
    const evaluated = evaluateBankProcessV2(submission);
    result = evaluated;
    attempt = { ...submission, status: "evaluated", result: evaluated };
    competencyEvidence = createBankProcessV2CompetencyEvidence(
      submission,
      evaluated,
    );
  } else {
    const evaluated = evaluateBankChange(submission);
    result = evaluated;
    attempt = { ...submission, status: "evaluated", result: evaluated };
    competencyEvidence = createBankChangeCompetencyEvidence(
      submission,
      evaluated,
    );
  }
  const previousProgress = state.learning.activityProgress[submission.activityId];
  const alreadyRewarded = Boolean(
    state.learning.rewardClaims[BANK_CHANGE_REWARD_CLAIM],
  );
  const alreadyAggregated = Boolean(
    state.teams.aggregateClaims[BANK_CHANGE_AGGREGATE_CLAIM],
  );
  const alreadyParticipating =
    Object.keys(state.teams.aggregateClaims).length > 0;
  const rewardClaim: RewardClaim = {
    claimKey: BANK_CHANGE_REWARD_CLAIM,
    sourceId: submission.activityId,
    points: result.potentialReward,
    claimedAt: submission.completedAt,
  };
  const pointEntry: PointEntry = {
    id: `points:${BANK_CHANGE_REWARD_CLAIM}`,
    claimKey: BANK_CHANGE_REWARD_CLAIM,
    sourceId: submission.activityId,
    category: "team",
    points: result.potentialReward,
    status: "confirmed",
    createdAt: submission.completedAt,
  };
  const aggregateClaim: TeamAggregateClaim = {
    claimKey: BANK_CHANGE_AGGREGATE_CLAIM,
    sourceId: submission.activityId,
    correctDecisions: result.correctDecisions,
    totalDecisions: result.totalDecisions,
    coveredCompetencyIds: result.coveredCompetencyIds,
    createdAt: submission.completedAt,
  };
  const coveredCompetencies = new Set(
    state.teams.sectorAggregate.coveredCompetencyIds,
  );
  for (const competencyId of result.coveredCompetencyIds) {
    if (
      state.teams.sectorAggregate.requiredCompetencyIds.includes(competencyId)
    ) {
      coveredCompetencies.add(competencyId);
    }
  }
  const nextAggregate = alreadyAggregated
    ? state.teams.sectorAggregate
    : {
        ...state.teams.sectorAggregate,
        validParticipants:
          state.teams.sectorAggregate.validParticipants +
          (alreadyParticipating ? 0 : 1),
        correctDecisions:
          state.teams.sectorAggregate.correctDecisions + result.correctDecisions,
        validDecisions:
          state.teams.sectorAggregate.validDecisions + result.totalDecisions,
        coveredCompetencyIds: [...coveredCompetencies],
      };
  const reviewId = `review:${submission.activityId}`;
  const nextRecommendations = { ...state.learning.recommendations };

  if (result.needsReview) {
    nextRecommendations[reviewId] = {
      id: reviewId,
      sourceActivityId: submission.activityId,
      targetActivityId: submission.activityId,
      reason:
        "Repratique a confirmação independente, a segunda aprovação e o reporte oficial antes de liberar uma alteração bancária.",
      status: "recommended",
      createdAt: submission.completedAt,
    };
  } else if (nextRecommendations[reviewId]) {
    nextRecommendations[reviewId] = {
      ...nextRecommendations[reviewId],
      status: "completed",
    };
  }

  return {
    ...state,
    meta: {
      ...state.meta,
      revision: state.meta.revision + 1,
      savedAt: submission.completedAt,
    },
    learning: {
      ...state.learning,
      attempts: {
        ...state.learning.attempts,
        [submission.attemptId]: attempt,
      },
      activityProgress: {
        ...state.learning.activityProgress,
        [submission.activityId]: {
          activityId: submission.activityId,
          status: "completed",
          attemptIds: [
            ...(previousProgress?.attemptIds ?? []),
            submission.attemptId,
          ],
          lastAttemptId: submission.attemptId,
          bestScore: Math.max(previousProgress?.bestScore ?? 0, result.score),
          completedAt: previousProgress?.completedAt ?? submission.completedAt,
        },
      },
      rewardClaims: alreadyRewarded
        ? state.learning.rewardClaims
        : {
            ...state.learning.rewardClaims,
            [BANK_CHANGE_REWARD_CLAIM]: rewardClaim,
          },
      pointLedger: alreadyRewarded
        ? state.learning.pointLedger
        : [...state.learning.pointLedger, pointEntry],
      competencyEvidence: [
        ...state.learning.competencyEvidence,
        ...competencyEvidence,
      ],
      recommendations: nextRecommendations,
      history: [
        ...state.learning.history,
        {
          id: `history:${submission.attemptId}`,
          kind: "activityCompleted",
          sourceId: submission.activityId,
          title: "Equipes: Mudança bancária sem atalho concluída",
          createdAt: submission.completedAt,
        },
        ...(!alreadyRewarded
          ? [
              {
                id: `history:reward:${BANK_CHANGE_REWARD_CLAIM}`,
                kind: "rewardGranted" as const,
                sourceId: submission.activityId,
                title: `${result.potentialReward} pontos de Equipes concedidos`,
                createdAt: submission.completedAt,
              },
            ]
          : []),
      ],
    },
    teams: {
      ...state.teams,
      sectorAggregate: nextAggregate,
      aggregateClaims: alreadyAggregated
        ? state.teams.aggregateClaims
        : {
            ...state.teams.aggregateClaims,
            [BANK_CHANGE_AGGREGATE_CLAIM]: aggregateClaim,
          },
      history: alreadyAggregated
        ? state.teams.history
        : [
            ...state.teams.history,
            {
              id: `team-history:${BANK_CHANGE_AGGREGATE_CLAIM}`,
              title: "Nova contribuição válida",
              detail:
                "Os indicadores do setor foram atualizados sem publicar escolhas, nota ou evidências individuais.",
              createdAt: submission.completedAt,
            },
          ],
    },
  };
}

export function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case "MISSION_COMPLETED": {
      const nextState = completeMission(state, action.payload);
      return nextState === state
        ? state
        : grantEarnedAchievements(nextState, action.payload.completedAt);
    }
    case "PHISHING_FOUNDATION_V2_COMPLETED": {
      const nextState = completePhishingFoundationV2(state, action.payload);
      return nextState === state
        ? state
        : grantEarnedAchievements(nextState, action.payload.completedAt);
    }
    case "CONVERSATION_RECONSTRUCTION_V2_COMPLETED": {
      const nextState = completeConversationReconstructionV2(
        state,
        action.payload,
      );
      return nextState === state
        ? state
        : grantEarnedAchievements(nextState, action.payload.completedAt);
    }
    case "MFA_CONSOLE_V2_COMPLETED": {
      const nextState = completeMfaConsoleV2(state, action.payload);
      return nextState === state
        ? state
        : grantEarnedAchievements(nextState, action.payload.completedAt);
    }
    case "RECOVERY_MISSION_COMPLETED": {
      const nextState = completeRecoveryMission(state, action.payload);
      return nextState === state
        ? state
        : grantEarnedAchievements(nextState, action.payload.completedAt);
    }
    case "RECOVERY_BUILDER_V2_COMPLETED": {
      const nextState = completeRecoveryBuilderV2(state, action.payload);
      return nextState === state
        ? state
        : grantEarnedAchievements(nextState, action.payload.completedAt);
    }
    case "PHISHLAB_COMPLETED": {
      const nextState = completePhishLab(state, action.payload);
      return nextState === state
        ? state
        : grantEarnedAchievements(nextState, action.payload.completedAt);
    }
    case "DOMAIN_ANALYZER_V2_COMPLETED": {
      const nextState = completeDomainAnalyzerV2(state, action.payload);
      return nextState === state
        ? state
        : grantEarnedAchievements(nextState, action.payload.completedAt);
    }
    case "TRUE_SENDER_V2_COMPLETED": {
      const nextState = completeTrueSenderV2(state, action.payload);
      return nextState === state
        ? state
        : grantEarnedAchievements(nextState, action.payload.completedAt);
    }
    case "SIMULATION_COMPLETED": {
      const nextState = completeSimulation(state, action.payload);
      return nextState === state
        ? state
        : grantEarnedAchievements(nextState, action.payload.completedAt);
    }
    case "WORKDAY_TRIAGE_V2_COMPLETED": {
      const nextState = completeWorkdayTriageV2(state, action.payload);
      return nextState === state
        ? state
        : grantEarnedAchievements(nextState, action.payload.completedAt);
    }
    case "RADAR_COMPLETED": {
      const nextState = completeRadar(state, action.payload);
      return nextState === state
        ? state
        : grantEarnedAchievements(nextState, action.payload.completedAt);
    }
    case "TEAM_CHALLENGE_COMPLETED": {
      const nextState = completeTeamChallenge(state, action.payload);
      return nextState === state
        ? state
        : grantEarnedAchievements(nextState, action.payload.completedAt);
    }
    case "BANK_CHANGE_COMPLETED": {
      const nextState = completeBankChange(state, action.payload);
      return nextState === state
        ? state
        : grantEarnedAchievements(nextState, action.payload.completedAt);
    }
    case "BANK_PROCESS_V2_COMPLETED": {
      const nextState = completeBankChange(state, action.payload);
      return nextState === state
        ? state
        : grantEarnedAchievements(nextState, action.payload.completedAt);
    }
    case "PREFERENCES_SAVED":
      return {
        ...state,
        meta: {
          ...state.meta,
          revision: state.meta.revision + 1,
          savedAt: action.payload.changedAt,
        },
        preferences: {
          ...action.payload.preferences,
        },
      };
    case "DEMO_ROLE_CHANGED": {
      if (
        action.payload.role !== "learner" &&
        action.payload.role !== "administrator"
      ) {
        return state;
      }

      if (state.demo.activeRole === action.payload.role) {
        return state;
      }

      return {
        ...state,
        meta: {
          ...state.meta,
          revision: state.meta.revision + 1,
          savedAt: action.payload.changedAt,
        },
        demo: {
          ...state.demo,
          activeRole: action.payload.role,
        },
      };
    }
    case "MANAGEMENT_TEST_USER_SAVED": {
      if (state.demo.activeRole !== "administrator") {
        return state;
      }

      const id = action.payload.user.id.trim();
      const employeeId = action.payload.user.employeeId.trim();
      const name = action.payload.user.name.trim();
      const sectorId = action.payload.user.sectorId.trim();
      const sectorName = action.payload.user.sectorName.trim();
      const existing = state.admin.testUsers.find((user) => user.id === id);
      const duplicateEmployeeId = state.admin.testUsers.some(
        (user) =>
          user.id !== id &&
          user.employeeId.toLocaleLowerCase("pt-BR") ===
            employeeId.toLocaleLowerCase("pt-BR"),
      );

      if (
        id.length < 3 ||
        employeeId.length < 3 ||
        employeeId.length > 32 ||
        name.length < 2 ||
        name.length > 80 ||
        sectorId.length < 2 ||
        sectorId.length > 64 ||
        sectorName.length < 2 ||
        sectorName.length > 80 ||
        duplicateEmployeeId ||
        (action.payload.user.status !== "active" &&
          action.payload.user.status !== "inactive") ||
        Number.isNaN(Date.parse(action.payload.user.createdAt)) ||
        Number.isNaN(Date.parse(action.payload.user.updatedAt))
      ) {
        return state;
      }

      const savedUser: ManagementTestUser = {
        ...action.payload.user,
        id,
        employeeId,
        name,
        sectorId,
        sectorName,
        status: existing?.status ?? "active",
        createdAt: existing?.createdAt ?? action.payload.user.createdAt,
        updatedAt: action.payload.changedAt,
      };
      const nextUsers = existing
        ? state.admin.testUsers.map((user) =>
            user.id === savedUser.id ? savedUser : user,
          )
        : [...state.admin.testUsers, savedUser];

      return {
        ...state,
        meta: {
          ...state.meta,
          revision: state.meta.revision + 1,
          savedAt: action.payload.changedAt,
        },
        admin: {
          ...state.admin,
          testUsers: nextUsers,
          auditLog: [
            ...state.admin.auditLog,
            {
              id: `audit:test-user:${savedUser.id}:${action.payload.changedAt}`,
              action: existing
                ? "managementTestUserUpdated"
                : "managementTestUserCreated",
              actorId: state.demo.administrator.id,
              createdAt: action.payload.changedAt,
            },
          ],
        },
      };
    }
    case "MANAGEMENT_TEST_USER_STATUS_CHANGED": {
      if (
        state.demo.activeRole !== "administrator" ||
        (action.payload.status !== "active" &&
          action.payload.status !== "inactive")
      ) {
        return state;
      }

      const existing = state.admin.testUsers.find(
        (user) => user.id === action.payload.userId,
      );
      if (!existing || existing.status === action.payload.status) {
        return state;
      }

      return {
        ...state,
        meta: {
          ...state.meta,
          revision: state.meta.revision + 1,
          savedAt: action.payload.changedAt,
        },
        admin: {
          ...state.admin,
          testUsers: state.admin.testUsers.map((user) =>
            user.id === existing.id
              ? {
                  ...user,
                  status: action.payload.status,
                  updatedAt: action.payload.changedAt,
                }
              : user,
          ),
          auditLog: [
            ...state.admin.auditLog,
            {
              id: `audit:test-user-status:${existing.id}:${action.payload.changedAt}`,
              action:
                action.payload.status === "active"
                  ? "managementTestUserActivated"
                  : "managementTestUserDeactivated",
              actorId: state.demo.administrator.id,
              createdAt: action.payload.changedAt,
            },
          ],
        },
      };
    }
    case "LEARNER_PROFILE_REGISTERED": {
      const employeeId = action.payload.registration.employeeId.trim();
      const learnerName = action.payload.registration.name.trim();
      const sectorId = action.payload.registration.sectorId.trim();
      const sectorName = action.payload.registration.sectorName.trim();
      const leaderboardIdentity =
        action.payload.registration.leaderboardIdentity;

      if (
        employeeId.length < 3 ||
        employeeId.length > 32 ||
        learnerName.length < 2 ||
        learnerName.length > 80 ||
        sectorId.length < 2 ||
        sectorId.length > 64 ||
        sectorName.length < 2 ||
        sectorName.length > 80 ||
        (leaderboardIdentity !== "initials" &&
          leaderboardIdentity !== "displayName" &&
          leaderboardIdentity !== "anonymous")
      ) {
        return state;
      }

      const normalizedSectorName = sectorName.toLocaleLowerCase("pt-BR");
      const existingSectorEntry = state.teams.ranking.find(
        (entry) =>
          entry.id === sectorId ||
          entry.name
            .replace(/^Loja\s+\d+\s*·\s*/i, "")
            .trim()
            .toLocaleLowerCase("pt-BR") === normalizedSectorName,
      );
      const nextRanking = existingSectorEntry
        ? state.teams.ranking.map((entry) =>
            entry.id === existingSectorEntry.id
              ? { ...entry, id: sectorId, name: sectorName }
              : entry,
          )
        : [
            ...state.teams.ranking,
            {
              id: sectorId,
              name: sectorName,
              score: state.teams.baseShield,
            },
          ];

      return {
        ...state,
        meta: {
          ...state.meta,
          revision: state.meta.revision + 1,
          savedAt: action.payload.changedAt,
        },
        demo: {
          ...state.demo,
          learner: {
            id: employeeId,
            name: learnerName,
            store: "Unidade não utilizada no P1",
            area: sectorName,
          },
          activeRole: "learner",
        },
        teams: {
          ...state.teams,
          id: sectorId,
          name: sectorName,
          ranking: nextRanking,
        },
        preferences: {
          ...state.preferences,
          leaderboardParticipation:
            action.payload.registration.leaderboardParticipation,
          leaderboardIdentity:
            leaderboardIdentity,
        },
        admin: {
          ...state.admin,
          auditLog: [
            ...state.admin.auditLog,
            {
              id: `audit:learner-profile:${action.payload.changedAt}`,
              action: "learnerProfileRegisteredInLocalDemo",
              actorId: employeeId,
              createdAt: action.payload.changedAt,
            },
          ],
        },
      };
    }
    case "TUTORIAL_STARTED":
      return {
        ...state,
        meta: {
          ...state.meta,
          revision: state.meta.revision + 1,
          savedAt: action.payload.changedAt,
        },
        onboarding: {
          ...state.onboarding,
          tutorial: {
            ...state.onboarding.tutorial,
            status: "inProgress",
            currentStep:
              state.onboarding.tutorial.status === "inProgress"
                ? state.onboarding.tutorial.currentStep
                : 0,
            completedAt: null,
          },
        },
      };
    case "TUTORIAL_STEP_CHANGED":
      if (
        !Number.isInteger(action.payload.step) ||
        action.payload.step < 0 ||
        action.payload.step > 6
      ) {
        return state;
      }
      return {
        ...state,
        meta: {
          ...state.meta,
          revision: state.meta.revision + 1,
          savedAt: action.payload.changedAt,
        },
        onboarding: {
          ...state.onboarding,
          tutorial: {
            ...state.onboarding.tutorial,
            status: "inProgress",
            currentStep: action.payload.step,
          },
        },
      };
    case "TUTORIAL_COMPLETED":
      return {
        ...state,
        meta: {
          ...state.meta,
          revision: state.meta.revision + 1,
          savedAt: action.payload.changedAt,
        },
        onboarding: {
          ...state.onboarding,
          tutorial: {
            ...state.onboarding.tutorial,
            status: "completed",
            currentStep: 6,
            completedAt: action.payload.changedAt,
          },
        },
      };
    case "DEMO_RESET":
      return createDemoState();
    default:
      return state;
  }
}
