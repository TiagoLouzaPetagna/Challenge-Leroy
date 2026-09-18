import { FIRST_LEARNING_PATH } from "../content/curriculum-catalog";
import type { AppState, LearningAttempt } from "../domain/types";
import {
  appReducer,
  createDemoState,
  type AppAction,
} from "../state/app-reducer";
import { selectTotalPoints } from "../state/selectors";

import type { AuthoritativeProgressSummary } from "./types";

function actionForAttempt(attempt: LearningAttempt): AppAction | null {
  if ("mechanicId" in attempt) {
    switch (attempt.mechanicId) {
      case "phishing-foundation":
        return { type: "PHISHING_FOUNDATION_V2_COMPLETED", payload: attempt };
      case "conversation-reconstruction":
        return {
          type: "CONVERSATION_RECONSTRUCTION_V2_COMPLETED",
          payload: attempt,
        };
      case "mfa-console":
        return { type: "MFA_CONSOLE_V2_COMPLETED", payload: attempt };
      case "incident-response-builder":
        return { type: "RECOVERY_BUILDER_V2_COMPLETED", payload: attempt };
      case "url-anatomy":
        return { type: "DOMAIN_ANALYZER_V2_COMPLETED", payload: attempt };
      case "identity-map":
        return { type: "TRUE_SENDER_V2_COMPLETED", payload: attempt };
      case "batch-triage":
        return { type: "WORKDAY_TRIAGE_V2_COMPLETED", payload: attempt };
      case "process-station":
        return { type: "BANK_PROCESS_V2_COMPLETED", payload: attempt };
    }
  }

  if ("incidentType" in attempt) {
    return { type: "RECOVERY_MISSION_COMPLETED", payload: attempt };
  }
  if ("usedTools" in attempt) {
    return { type: "PHISHLAB_COMPLETED", payload: attempt };
  }
  if ("messageDecisions" in attempt) {
    return { type: "SIMULATION_COMPLETED", payload: attempt };
  }
  if ("selectedOptionId" in attempt) {
    return { type: "RADAR_COMPLETED", payload: attempt };
  }
  if ("caseDecisions" in attempt) {
    return { type: "TEAM_CHALLENGE_COMPLETED", payload: attempt };
  }
  if ("initialActionId" in attempt) {
    return { type: "BANK_CHANGE_COMPLETED", payload: attempt };
  }
  if ("decision" in attempt) {
    return { type: "MISSION_COMPLETED", payload: attempt };
  }

  return null;
}

function replayValidatedProgress(state: AppState): AppState {
  return Object.values(state.learning.attempts)
    .sort(
      (left, right) =>
        left.completedAt.localeCompare(right.completedAt) ||
        left.attemptId.localeCompare(right.attemptId),
    )
    .reduce((replayed, attempt) => {
      const action = actionForAttempt(attempt);
      return action ? appReducer(replayed, action) : replayed;
    }, createDemoState());
}

export function calculateAuthoritativeProgressSummary(
  state: AppState,
): AuthoritativeProgressSummary {
  const replayed = replayValidatedProgress(state);
  const completedProgress = Object.values(
    replayed.learning.activityProgress,
  ).filter((progress) => progress.status === "completed");
  const curriculumIds = new Set<string>(
    FIRST_LEARNING_PATH.steps.map((step) => step.activityId),
  );
  const scoredProgress = completedProgress.filter(
    (progress) => typeof progress.bestScore === "number",
  );
  const averageScore = scoredProgress.length
    ? Math.round(
        scoredProgress.reduce(
          (total, progress) => total + (progress.bestScore ?? 0),
          0,
        ) / scoredProgress.length,
      )
    : 0;
  const lastActivityAt = Object.values(replayed.learning.attempts).reduce<
    string | null
  >(
    (latest, attempt) =>
      latest === null || attempt.completedAt > latest
        ? attempt.completedAt
        : latest,
    null,
  );

  return {
    totalPoints: selectTotalPoints(replayed),
    completedActivities: completedProgress.length,
    completedCurriculumActivities: completedProgress.filter((progress) =>
      curriculumIds.has(progress.activityId),
    ).length,
    completedMissions: completedProgress.filter((progress) =>
      progress.activityId.startsWith("mission:"),
    ).length,
    averageScore,
    leaderboardParticipation: state.preferences.leaderboardParticipation,
    leaderboardIdentity: state.preferences.leaderboardIdentity,
    lastActivityAt,
  };
}
