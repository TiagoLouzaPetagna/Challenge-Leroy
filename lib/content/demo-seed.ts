import {
  APP_SCHEMA_VERSION,
  TUTORIAL_VERSION,
  type AppState,
} from "../domain/types";
import { DEMO_SECTOR_RANKING } from "./team-challenge-catalog";

const DEMO_STARTED_AT = "2026-08-01T12:00:00.000Z";

export function createDemoState(): AppState {
  return {
    meta: {
      schemaVersion: APP_SCHEMA_VERSION,
      revision: 0,
      savedAt: DEMO_STARTED_AT,
    },
    demo: {
      learner: {
        id: "lucas",
        name: "Lucas",
        store: "Loja 047",
        area: "Casa & Decoração",
      },
      administrator: {
        id: "marina",
        name: "Marina",
      },
      activeRole: "learner",
    },
    learning: {
      attempts: {},
      activityProgress: {},
      rewardClaims: {},
      pointLedger: [],
      competencyEvidence: [],
      recommendations: {},
      history: [],
    },
    teams: {
      id: "loja-047-casa-decoracao",
      name: "Loja 047 · Casa & Decoração",
      baseShield: 71,
      contributionClaims: {},
      aggregateClaims: {},
      sectorAggregate: {
        eligibleParticipants: 20,
        validParticipants: 13,
        correctDecisions: 52,
        validDecisions: 65,
        requiredCompetencyIds: ["observar", "verificar", "decidir"],
        coveredCompetencyIds: ["observar", "verificar"],
      },
      ranking: DEMO_SECTOR_RANKING.map((entry) => ({ ...entry })),
      activeGoal: {
        id: "goal:bank-change",
        title: "Levar o setor ao escudo Resiliente",
        description:
          "Aumentar participação, precisão e cobertura com decisões seguras sobre alterações bancárias.",
        targetScore: 75,
      },
      history: [
        {
          id: "team-history:goal-started",
          title: "Meta coletiva iniciada",
          detail: "Mudança bancária sem atalho está disponível para o setor.",
          createdAt: DEMO_STARTED_AT,
        },
      ],
    },
    preferences: {
      reducedMotion: false,
      highContrast: false,
      soundEnabled: true,
      notificationsEnabled: true,
      textSize: "default",
      captionsEnabled: true,
      leaderboardParticipation: false,
      leaderboardIdentity: "initials",
      notificationMission: true,
      notificationReview: true,
      notificationArcade: true,
      notificationTeam: true,
      notificationRadar: true,
      reminderFrequency: "weekly",
    },
    onboarding: {
      tutorial: {
        version: TUTORIAL_VERSION,
        status: "required",
        currentStep: 0,
        completedAt: null,
      },
    },
    admin: {
      auditLog: [],
    },
  };
}
