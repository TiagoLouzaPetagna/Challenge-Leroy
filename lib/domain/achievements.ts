import {
  ACHIEVEMENT_CATALOG,
  achievementClaimKey,
  type AchievementDefinition,
  type AchievementId,
} from "../content/achievement-catalog";
import { WORKDAY_MESSAGES } from "../content/simulation-catalog";
import { TEAM_CHALLENGE_CASES } from "../content/team-challenge-catalog";
import type { AppState, LearningAttempt } from "./types";

export type AchievementProgress = AchievementDefinition & {
  current: number;
  target: number;
  unlocked: boolean;
  unlockedAt: string | null;
};

function attempts(state: AppState): LearningAttempt[] {
  return Object.values(state.learning.attempts);
}

function hasCompleteMissionInvestigation(state: AppState): boolean {
  return attempts(state).some(
    (attempt) =>
      "decision" in attempt &&
      ["sender", "link", "context"].every((evidence) =>
        attempt.inspectedEvidence.includes(evidence as "sender" | "link" | "context"),
      ),
  );
}

function hasCorrectVerification(state: AppState): boolean {
  const verificationMessageIds = new Set(
    WORKDAY_MESSAGES.filter((message) => message.expectedAction === "verify").map(
      (message) => message.id,
    ),
  );
  const verificationCaseIds = new Set(
    TEAM_CHALLENGE_CASES.filter((item) => item.expectedAction === "verify").map(
      (item) => item.id,
    ),
  );

  return attempts(state).some((attempt) => {
    if ("messageDecisions" in attempt) {
      return attempt.messageDecisions.some(
        (decision) =>
          decision.action === "verify" &&
          verificationMessageIds.has(decision.messageId),
      );
    }

    if ("caseDecisions" in attempt) {
      return attempt.caseDecisions.some(
        (decision) =>
          decision.action === "verify" && verificationCaseIds.has(decision.caseId),
      );
    }

    if ("verificationRouteId" in attempt) {
      return attempt.verificationRouteId === "registered-contact";
    }

    return false;
  });
}

function investigationContexts(state: AppState): number {
  return new Set(
    state.learning.competencyEvidence
      .filter(
        (evidence) =>
          evidence.competencyId === "investigar" &&
          evidence.score >= 60 &&
          (evidence.context === "independent" || evidence.context === "review"),
      )
      .map((evidence) => evidence.activityId),
  ).size;
}

function progressFor(state: AppState, id: AchievementId): { current: number; target: number } {
  switch (id) {
    case "olhar-atento":
      return { current: hasCompleteMissionInvestigation(state) ? 1 : 0, target: 1 };
    case "verificacao-segura":
      return { current: hasCorrectVerification(state) ? 1 : 0, target: 1 };
    case "protecao-em-equipe":
      return {
        current: Object.keys(state.teams.aggregateClaims).length > 0 ? 1 : 0,
        target: 1,
      };
    case "investigacao-consolidada":
      return { current: Math.min(investigationContexts(state), 2), target: 2 };
  }
}

export function selectAchievements(state: AppState): AchievementProgress[] {
  return ACHIEVEMENT_CATALOG.map((achievement) => {
    const claim = state.learning.rewardClaims[achievementClaimKey(achievement.id)];
    const progress = progressFor(state, achievement.id);
    return {
      ...achievement,
      ...progress,
      unlocked: Boolean(claim),
      unlockedAt: claim?.claimedAt ?? null,
    };
  });
}

export function grantEarnedAchievements(state: AppState, changedAt: string): AppState {
  const earned = selectAchievements(state).filter(
    (achievement) =>
      achievement.current >= achievement.target && !achievement.unlocked,
  );

  if (earned.length === 0) return state;

  const rewardClaims = { ...state.learning.rewardClaims };
  const pointLedger = [...state.learning.pointLedger];
  const history = [...state.learning.history];

  for (const achievement of earned) {
    const claimKey = achievementClaimKey(achievement.id);
    rewardClaims[claimKey] = {
      claimKey,
      sourceId: claimKey,
      points: achievement.rewardPoints,
      claimedAt: changedAt,
    };
    pointLedger.push({
      id: `points:${claimKey}`,
      claimKey,
      sourceId: claimKey,
      category: "achievement",
      points: achievement.rewardPoints,
      status: "confirmed",
      createdAt: changedAt,
    });
    history.push({
      id: `history:${claimKey}`,
      kind: "achievementUnlocked",
      sourceId: claimKey,
      title: `Conquista ${achievement.title} desbloqueada (+${achievement.rewardPoints} pontos)`,
      createdAt: changedAt,
    });
  }

  return {
    ...state,
    meta: {
      ...state.meta,
      revision: state.meta.revision + earned.length,
      savedAt: changedAt,
    },
    learning: {
      ...state.learning,
      rewardClaims,
      pointLedger,
      history,
    },
  };
}
