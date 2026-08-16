"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
  type ReactNode,
} from "react";

import {
  appReducer,
  createDemoState,
  initialAppState,
  type AppAction,
  type AppState,
} from "@/lib/state/app-reducer";
import {
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
  isValidConversationReconstructionV2Submission,
  isValidBankChangeSubmission,
  isValidBankProcessV2Submission,
  isValidDomainAnalyzerV2Submission,
  isValidRecoveryMissionSubmission,
  isValidRecoveryBuilderV2Submission,
  isValidPhishLabSubmission,
  isValidRadarSubmission,
  isValidSimulationSubmission,
  isValidWorkdayTriageV2Submission,
  isValidTeamChallengeSubmission,
  isValidTrueSenderV2Submission,
  SIMULATION_TEAM_CLAIM,
  RADAR_REWARD_CLAIM,
} from "@/lib/domain/rules";
import { executeActivitySubmission } from "@/lib/activities/runtime/execute-activity";
import type {
  BankChangeAnswer,
  BankChangeResult,
  BankChangeSubmission,
  BankProcessV2Answer,
  BankProcessV2Result,
  BankProcessV2Submission,
  ConversationReconstructionV2Answer,
  ConversationReconstructionV2Result,
  ConversationReconstructionV2Submission,
  DomainAnalyzerV2Answer,
  DomainAnalyzerV2Result,
  DomainAnalyzerV2Submission,
  MissionAnswer,
  MissionResult,
  MissionSubmission,
  MfaConsoleV2Answer,
  MfaConsoleV2Result,
  MfaConsoleV2Submission,
  PhishingFoundationV2Answer,
  PhishingFoundationV2Result,
  PhishingFoundationV2Submission,
  PhishLabAnswer,
  PhishLabResult,
  PhishLabSubmission,
  RadarAnswer,
  RadarResult,
  RadarSubmission,
  RecoveryMissionAnswer,
  RecoveryMissionResult,
  RecoveryMissionSubmission,
  RecoveryBuilderV2Answer,
  RecoveryBuilderV2Result,
  RecoveryBuilderV2Submission,
  SimulationAnswer,
  SimulationResult,
  SimulationSubmission,
  WorkdayTriageV2Answer,
  WorkdayTriageV2Result,
  WorkdayTriageV2Submission,
  TeamChallengeAnswer,
  TeamChallengeResult,
  TeamChallengeSubmission,
  TrueSenderV2Answer,
  TrueSenderV2Result,
  TrueSenderV2Submission,
  LearnerPreferences,
} from "@/lib/domain/types";
import { findLearningPathStepByActivityId } from "@/lib/content/curriculum-catalog";
import {
  clearPersistedState,
  loadPersistedState,
  LOCAL_SECURITY_NOTICE,
  savePersistedState,
} from "@/lib/state/persistence";

type HydrationAction = {
  type: "__LOCAL_STATE_HYDRATED__";
  payload: AppState;
};

type AppContextValue = {
  state: AppState;
  isHydrated: boolean;
  securityMode: "local-demo" | "server-authoritative";
  isAuthoritative: boolean;
  localSecurityNotice: string;
  persistenceError: string | null;
  submitMission: (answer: MissionAnswer) => Promise<MissionResult>;
  submitPhishingFoundationV2: (
    answer: PhishingFoundationV2Answer,
  ) => Promise<PhishingFoundationV2Result>;
  submitConversationReconstructionV2: (
    answer: ConversationReconstructionV2Answer,
  ) => Promise<ConversationReconstructionV2Result>;
  submitMfaConsoleV2: (
    answer: MfaConsoleV2Answer,
  ) => Promise<MfaConsoleV2Result>;
  submitRecoveryMission: (
    answer: RecoveryMissionAnswer,
  ) => Promise<RecoveryMissionResult>;
  submitRecoveryBuilderV2: (
    answer: RecoveryBuilderV2Answer,
  ) => Promise<RecoveryBuilderV2Result>;
  submitPhishLab: (answer: PhishLabAnswer) => Promise<PhishLabResult>;
  submitDomainAnalyzerV2: (
    answer: DomainAnalyzerV2Answer,
  ) => Promise<DomainAnalyzerV2Result>;
  submitTrueSenderV2: (
    answer: TrueSenderV2Answer,
  ) => Promise<TrueSenderV2Result>;
  submitSimulation: (
    answer: SimulationAnswer,
  ) => Promise<SimulationResult>;
  submitWorkdayTriageV2: (
    answer: WorkdayTriageV2Answer,
  ) => Promise<WorkdayTriageV2Result>;
  submitRadar: (answer: RadarAnswer) => Promise<RadarResult>;
  submitTeamChallenge: (
    answer: TeamChallengeAnswer,
  ) => Promise<TeamChallengeResult>;
  submitBankChange: (
    answer: BankChangeAnswer,
  ) => Promise<BankChangeResult>;
  submitBankProcessV2: (
    answer: BankProcessV2Answer,
  ) => Promise<BankProcessV2Result>;
  savePreferences: (preferences: LearnerPreferences) => void;
  startTutorial: () => void;
  setTutorialStep: (step: number) => void;
  completeTutorial: () => void;
  resetDemo: () => void;
};

const AppContext = createContext<AppContextValue | null>(null);

function providerReducer(
  state: AppState,
  action: AppAction | HydrationAction,
): AppState {
  if (action.type === "__LOCAL_STATE_HYDRATED__") {
    return action.payload;
  }

  return appReducer(state, action as AppAction);
}

function createAttemptMetadata() {
  const completedAt = new Date().toISOString();
  const attemptId =
    typeof globalThis.crypto?.randomUUID === "function"
      ? globalThis.crypto.randomUUID()
      : `attempt-${completedAt}-${Math.random().toString(36).slice(2)}`;

  return { attemptId, completedAt };
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, internalDispatch] = useReducer(providerReducer, initialAppState);
  const [isHydrated, setIsHydrated] = useState(false);
  const [persistenceError, setPersistenceError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    queueMicrotask(() => {
      if (cancelled) return;

      try {
        const persistedState = loadPersistedState();

        internalDispatch({
          type: "__LOCAL_STATE_HYDRATED__",
          payload: persistedState ?? createDemoState(),
        });
      } catch {
        internalDispatch({
          type: "__LOCAL_STATE_HYDRATED__",
          payload: createDemoState(),
        });
        setPersistenceError(
          "Não foi possível recuperar o progresso salvo neste navegador.",
        );
      } finally {
        setIsHydrated(true);
      }
    });

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!isHydrated) {
      return;
    }

    let cancelled = false;

    queueMicrotask(() => {
      if (cancelled) return;

      try {
        savePersistedState(state);
        setPersistenceError(null);
      } catch {
        setPersistenceError(
          "O progresso desta sessão não pôde ser salvo neste navegador.",
        );
      }
    });

    return () => {
      cancelled = true;
    };
  }, [isHydrated, state]);

  const submitMission = useCallback(
    async (answer: MissionAnswer): Promise<MissionResult> => {
      if (!isHydrated) {
        throw new Error("O progresso local ainda está sendo carregado.");
      }

      const { attemptId, completedAt } = createAttemptMetadata();
      const submission: MissionSubmission = {
        ...answer,
        attemptId,
        completedAt,
      };
      const definition = getMissionRuntimeDefinition(submission.activityId);
      const curriculumStep = findLearningPathStepByActivityId(
        submission.activityId,
      );
      const prerequisitesCompleted =
        curriculumStep?.prerequisiteActivityIds.every(
          (activityId) =>
            state.learning.activityProgress[activityId]?.status ===
            "completed",
        ) ?? true;
      return executeActivitySubmission({
        submission,
        validate: (candidate) =>
          Boolean(definition) &&
          isValidMissionSubmission(candidate) &&
          prerequisitesCompleted,
        evaluate: evaluateMission,
        adaptResult: (result) =>
          definition && state.teams.contributionClaims[definition.teamClaimKey]
            ? { ...result, teamPoints: 0 }
            : result,
        persist: (acceptedSubmission) => {
          internalDispatch({
            type: "MISSION_COMPLETED",
            payload: acceptedSubmission,
          });
        },
        invalidMessage: "A Missão informada não está disponível nesta versão.",
      });
    },
    [
      isHydrated,
      state.learning.activityProgress,
      state.teams.contributionClaims,
    ],
  );

  const submitPhishingFoundationV2 = useCallback(
    async (
      answer: PhishingFoundationV2Answer,
    ): Promise<PhishingFoundationV2Result> => {
      if (!isHydrated) {
        throw new Error("O progresso local ainda está sendo carregado.");
      }

      const { attemptId, completedAt } = createAttemptMetadata();
      const submission: PhishingFoundationV2Submission = {
        ...answer,
        attemptId,
        completedAt,
      };
      const definition = getMissionRuntimeDefinition(submission.activityId);

      return executeActivitySubmission({
        submission,
        validate: (candidate) =>
          Boolean(definition) &&
          isValidPhishingFoundationV2Submission(candidate),
        evaluate: evaluatePhishingFoundationV2,
        adaptResult: (result) =>
          definition && state.teams.contributionClaims[definition.teamClaimKey]
            ? { ...result, teamPoints: 0 }
            : result,
        persist: (acceptedSubmission) => {
          internalDispatch({
            type: "PHISHING_FOUNDATION_V2_COMPLETED",
            payload: acceptedSubmission,
          });
        },
        invalidMessage:
          "O pacote da fundação de phishing não está disponível nesta versão.",
      });
    },
    [isHydrated, state.teams.contributionClaims],
  );

  const submitConversationReconstructionV2 = useCallback(
    async (
      answer: ConversationReconstructionV2Answer,
    ): Promise<ConversationReconstructionV2Result> => {
      if (!isHydrated) {
        throw new Error("O progresso local ainda está sendo carregado.");
      }

      const { attemptId, completedAt } = createAttemptMetadata();
      const submission: ConversationReconstructionV2Submission = {
        ...answer,
        attemptId,
        completedAt,
      };
      const definition = getMissionRuntimeDefinition(submission.activityId);

      return executeActivitySubmission({
        submission,
        validate: (candidate) =>
          Boolean(definition) &&
          isValidConversationReconstructionV2Submission(candidate),
        evaluate: evaluateConversationReconstructionV2,
        adaptResult: (result) =>
          definition && state.teams.contributionClaims[definition.teamClaimKey]
            ? { ...result, teamPoints: 0 }
            : result,
        persist: (acceptedSubmission) => {
          internalDispatch({
            type: "CONVERSATION_RECONSTRUCTION_V2_COMPLETED",
            payload: acceptedSubmission,
          });
        },
        invalidMessage:
          "O pacote de reconstrução da conversa não está disponível nesta versão.",
      });
    },
    [isHydrated, state.teams.contributionClaims],
  );

  const submitMfaConsoleV2 = useCallback(
    async (answer: MfaConsoleV2Answer): Promise<MfaConsoleV2Result> => {
      if (!isHydrated) {
        throw new Error("O progresso local ainda está sendo carregado.");
      }

      const { attemptId, completedAt } = createAttemptMetadata();
      const submission: MfaConsoleV2Submission = {
        ...answer,
        attemptId,
        completedAt,
      };
      const definition = getMissionRuntimeDefinition(submission.activityId);
      const curriculumStep = findLearningPathStepByActivityId(
        submission.activityId,
      );
      const prerequisitesCompleted =
        curriculumStep?.prerequisiteActivityIds.every(
          (activityId) =>
            state.learning.activityProgress[activityId]?.status === "completed",
        ) ?? true;

      return executeActivitySubmission({
        submission,
        validate: (candidate) =>
          Boolean(definition) &&
          prerequisitesCompleted &&
          isValidMfaConsoleV2Submission(candidate),
        evaluate: evaluateMfaConsoleV2,
        adaptResult: (result) =>
          definition && state.teams.contributionClaims[definition.teamClaimKey]
            ? { ...result, teamPoints: 0 }
            : result,
        persist: (acceptedSubmission) => {
          internalDispatch({
            type: "MFA_CONSOLE_V2_COMPLETED",
            payload: acceptedSubmission,
          });
        },
        invalidMessage:
          "O pacote do console de autenticação não está disponível nesta versão.",
      });
    },
    [isHydrated, state.learning.activityProgress, state.teams.contributionClaims],
  );

  const submitRecoveryMission = useCallback(
    async (
      answer: RecoveryMissionAnswer,
    ): Promise<RecoveryMissionResult> => {
      if (!isHydrated) {
        throw new Error("O progresso local ainda está sendo carregado.");
      }

      const { attemptId, completedAt } = createAttemptMetadata();
      const submission: RecoveryMissionSubmission = {
        ...answer,
        attemptId,
        completedAt,
      };
      const definition = getRecoveryMissionRuntimeDefinition(
        submission.activityId,
      );
      const curriculumStep = findLearningPathStepByActivityId(
        submission.activityId,
      );
      const prerequisitesCompleted =
        curriculumStep?.prerequisiteActivityIds.every(
          (activityId) =>
            state.learning.activityProgress[activityId]?.status ===
            "completed",
        ) ?? true;

      return executeActivitySubmission({
        submission,
        validate: (candidate) =>
          Boolean(definition) &&
          isValidRecoveryMissionSubmission(candidate) &&
          prerequisitesCompleted,
        evaluate: evaluateRecoveryMission,
        adaptResult: (result) =>
          definition && state.teams.contributionClaims[definition.teamClaimKey]
            ? { ...result, teamPoints: 0 }
            : result,
        persist: (acceptedSubmission) => {
          internalDispatch({
            type: "RECOVERY_MISSION_COMPLETED",
            payload: acceptedSubmission,
          });
        },
        invalidMessage:
          "A Missão de recuperação não está disponível nesta versão.",
      });
    },
    [
      isHydrated,
      state.learning.activityProgress,
      state.teams.contributionClaims,
    ],
  );

  const submitRecoveryBuilderV2 = useCallback(
    async (
      answer: RecoveryBuilderV2Answer,
    ): Promise<RecoveryBuilderV2Result> => {
      if (!isHydrated) {
        throw new Error("O progresso local ainda está sendo carregado.");
      }
      const { attemptId, completedAt } = createAttemptMetadata();
      const submission: RecoveryBuilderV2Submission = {
        ...answer,
        attemptId,
        completedAt,
      };
      const definition = getRecoveryMissionRuntimeDefinition(submission.activityId);
      return executeActivitySubmission({
        submission,
        validate: (candidate) =>
          Boolean(definition) && isValidRecoveryBuilderV2Submission(candidate),
        evaluate: evaluateRecoveryBuilderV2,
        adaptResult: (result) =>
          definition && state.teams.contributionClaims[definition.teamClaimKey]
            ? { ...result, teamPoints: 0 }
            : result,
        persist: (acceptedSubmission) => {
          internalDispatch({
            type: "RECOVERY_BUILDER_V2_COMPLETED",
            payload: acceptedSubmission,
          });
        },
        invalidMessage:
          "O montador de resposta ao incidente não está disponível nesta versão.",
      });
    },
    [isHydrated, state.teams.contributionClaims],
  );

  const submitPhishLab = useCallback(
    async (answer: PhishLabAnswer): Promise<PhishLabResult> => {
      if (!isHydrated) {
        throw new Error("O progresso local ainda está sendo carregado.");
      }

      const { attemptId, completedAt } = createAttemptMetadata();
      const submission: PhishLabSubmission = {
        ...answer,
        attemptId,
        completedAt,
      };
      const definition = getPhishLabRuntimeDefinition(submission.activityId);
      return executeActivitySubmission({
        submission,
        validate: (candidate) =>
          Boolean(definition) && isValidPhishLabSubmission(candidate),
        evaluate: evaluatePhishLab,
        adaptResult: (result) =>
          definition && state.teams.contributionClaims[definition.teamClaimKey]
            ? { ...result, teamPoints: 0 }
            : result,
        persist: (acceptedSubmission) => {
          internalDispatch({
            type: "PHISHLAB_COMPLETED",
            payload: acceptedSubmission,
          });
        },
        invalidMessage: "O PhishLab informado não está disponível nesta versão.",
      });
    },
    [isHydrated, state.teams.contributionClaims],
  );

  const submitDomainAnalyzerV2 = useCallback(
    async (
      answer: DomainAnalyzerV2Answer,
    ): Promise<DomainAnalyzerV2Result> => {
      if (!isHydrated) {
        throw new Error("O progresso local ainda está sendo carregado.");
      }

      const { attemptId, completedAt } = createAttemptMetadata();
      const submission: DomainAnalyzerV2Submission = {
        ...answer,
        attemptId,
        completedAt,
      };
      const definition = getPhishLabRuntimeDefinition(submission.activityId);

      return executeActivitySubmission({
        submission,
        validate: (candidate) =>
          Boolean(definition) && isValidDomainAnalyzerV2Submission(candidate),
        evaluate: evaluateDomainAnalyzerV2,
        adaptResult: (result) =>
          definition && state.teams.contributionClaims[definition.teamClaimKey]
            ? { ...result, teamPoints: 0 }
            : result,
        persist: (acceptedSubmission) => {
          internalDispatch({
            type: "DOMAIN_ANALYZER_V2_COMPLETED",
            payload: acceptedSubmission,
          });
        },
        invalidMessage:
          "O pacote de Domínio sob a lupa não está disponível nesta versão.",
      });
    },
    [isHydrated, state.teams.contributionClaims],
  );

  const submitTrueSenderV2 = useCallback(
    async (answer: TrueSenderV2Answer): Promise<TrueSenderV2Result> => {
      if (!isHydrated) {
        throw new Error("O progresso local ainda está sendo carregado.");
      }

      const { attemptId, completedAt } = createAttemptMetadata();
      const submission: TrueSenderV2Submission = {
        ...answer,
        attemptId,
        completedAt,
      };
      const definition = getPhishLabRuntimeDefinition(submission.activityId);

      return executeActivitySubmission({
        submission,
        validate: (candidate) =>
          Boolean(definition) && isValidTrueSenderV2Submission(candidate),
        evaluate: evaluateTrueSenderV2,
        adaptResult: (result) =>
          definition && state.teams.contributionClaims[definition.teamClaimKey]
            ? { ...result, teamPoints: 0 }
            : result,
        persist: (acceptedSubmission) => {
          internalDispatch({
            type: "TRUE_SENDER_V2_COMPLETED",
            payload: acceptedSubmission,
          });
        },
        invalidMessage:
          "O pacote de Quem enviou de verdade? não está disponível nesta versão.",
      });
    },
    [isHydrated, state.teams.contributionClaims],
  );

  const submitSimulation = useCallback(
    async (answer: SimulationAnswer): Promise<SimulationResult> => {
      if (!isHydrated) {
        throw new Error("O progresso local ainda está sendo carregado.");
      }

      const { attemptId, completedAt } = createAttemptMetadata();
      const submission: SimulationSubmission = {
        ...answer,
        attemptId,
        completedAt,
      };
      return executeActivitySubmission({
        submission,
        validate: isValidSimulationSubmission,
        evaluate: evaluateSimulation,
        adaptResult: (result) =>
          state.teams.contributionClaims[SIMULATION_TEAM_CLAIM]
            ? { ...result, teamPoints: 0 }
            : result,
        persist: (acceptedSubmission) => {
          internalDispatch({
            type: "SIMULATION_COMPLETED",
            payload: acceptedSubmission,
          });
        },
        invalidMessage:
          "A Simulação informada não está disponível nesta versão.",
      });
    },
    [isHydrated, state.teams.contributionClaims],
  );

  const submitWorkdayTriageV2 = useCallback(
    async (
      answer: WorkdayTriageV2Answer,
    ): Promise<WorkdayTriageV2Result> => {
      if (!isHydrated) {
        throw new Error("O progresso local ainda está sendo carregado.");
      }

      const { attemptId, completedAt } = createAttemptMetadata();
      const submission: WorkdayTriageV2Submission = {
        ...answer,
        attemptId,
        completedAt,
      };
      return executeActivitySubmission({
        submission,
        validate: isValidWorkdayTriageV2Submission,
        evaluate: evaluateWorkdayTriageV2,
        adaptResult: (result) =>
          state.teams.contributionClaims[SIMULATION_TEAM_CLAIM]
            ? { ...result, teamPoints: 0 }
            : result,
        persist: (acceptedSubmission) => {
          internalDispatch({
            type: "WORKDAY_TRIAGE_V2_COMPLETED",
            payload: acceptedSubmission,
          });
        },
        invalidMessage:
          "O pacote de triagem de Uma manhã comum não está disponível nesta versão.",
      });
    },
    [isHydrated, state.teams.contributionClaims],
  );

  const submitRadar = useCallback(
    async (answer: RadarAnswer): Promise<RadarResult> => {
      if (!isHydrated) {
        throw new Error("O progresso local ainda está sendo carregado.");
      }

      const { attemptId, completedAt } = createAttemptMetadata();
      const submission: RadarSubmission = {
        ...answer,
        attemptId,
        completedAt,
      };
      const alreadyCompleted = Boolean(
        state.learning.rewardClaims[RADAR_REWARD_CLAIM],
      );
      return executeActivitySubmission({
        submission,
        validate: isValidRadarSubmission,
        evaluate: evaluateRadar,
        adaptResult: (result) => ({
          ...result,
          points: alreadyCompleted ? 0 : result.points,
          alreadyCompleted,
        }),
        persist: (acceptedSubmission, result) => {
          if (result.correct && !alreadyCompleted) {
            internalDispatch({
              type: "RADAR_COMPLETED",
              payload: acceptedSubmission,
            });
          }
        },
        invalidMessage: "O conteúdo do Radar não está disponível nesta versão.",
      });
    },
    [isHydrated, state.learning.rewardClaims],
  );

  const submitTeamChallenge = useCallback(
    async (answer: TeamChallengeAnswer): Promise<TeamChallengeResult> => {
      if (!isHydrated) {
        throw new Error("O progresso local ainda está sendo carregado.");
      }

      const { attemptId, completedAt } = createAttemptMetadata();
      const submission: TeamChallengeSubmission = {
        ...answer,
        attemptId,
        completedAt,
      };
      return executeActivitySubmission({
        submission,
        validate: isValidTeamChallengeSubmission,
        evaluate: evaluateTeamChallenge,
        persist: (acceptedSubmission) => {
          internalDispatch({
            type: "TEAM_CHALLENGE_COMPLETED",
            payload: acceptedSubmission,
          });
        },
        invalidMessage:
          "As respostas do desafio de Equipes estão incompletas.",
      });
    },
    [isHydrated],
  );

  const submitBankChange = useCallback(
    async (answer: BankChangeAnswer): Promise<BankChangeResult> => {
      if (!isHydrated) {
        throw new Error("O progresso local ainda está sendo carregado.");
      }

      const { attemptId, completedAt } = createAttemptMetadata();
      const submission: BankChangeSubmission = {
        ...answer,
        attemptId,
        completedAt,
      };

      return executeActivitySubmission({
        submission,
        validate: isValidBankChangeSubmission,
        evaluate: evaluateBankChange,
        persist: (acceptedSubmission) => {
          internalDispatch({
            type: "BANK_CHANGE_COMPLETED",
            payload: acceptedSubmission,
          });
        },
        invalidMessage: "As respostas do desafio bancário estão incompletas.",
      });
    },
    [isHydrated],
  );

  const submitBankProcessV2 = useCallback(
    async (answer: BankProcessV2Answer): Promise<BankProcessV2Result> => {
      if (!isHydrated) {
        throw new Error("O progresso local ainda está sendo carregado.");
      }

      const { attemptId, completedAt } = createAttemptMetadata();
      const submission: BankProcessV2Submission = {
        ...answer,
        attemptId,
        completedAt,
      };

      return executeActivitySubmission({
        submission,
        validate: isValidBankProcessV2Submission,
        evaluate: evaluateBankProcessV2,
        persist: (acceptedSubmission) => {
          internalDispatch({
            type: "BANK_PROCESS_V2_COMPLETED",
            payload: acceptedSubmission,
          });
        },
        invalidMessage: "A estação bancária ainda possui etapas incompletas.",
      });
    },
    [isHydrated],
  );

  const resetDemo = useCallback(() => {
    try {
      clearPersistedState();
      setPersistenceError(null);
    } catch {
      setPersistenceError(
        "O progresso salvo anteriormente não pôde ser removido deste navegador.",
      );
    }

    internalDispatch({ type: "DEMO_RESET" });
  }, []);

  const savePreferences = useCallback(
    (preferences: LearnerPreferences) => {
      if (!isHydrated) {
        throw new Error("As preferências locais ainda estão sendo carregadas.");
      }

      internalDispatch({
        type: "PREFERENCES_SAVED",
        payload: { preferences, changedAt: new Date().toISOString() },
      });
    },
    [isHydrated],
  );

  const startTutorial = useCallback(() => {
    internalDispatch({
      type: "TUTORIAL_STARTED",
      payload: { changedAt: new Date().toISOString() },
    });
  }, []);

  const setTutorialStep = useCallback((step: number) => {
    internalDispatch({
      type: "TUTORIAL_STEP_CHANGED",
      payload: { step, changedAt: new Date().toISOString() },
    });
  }, []);

  const completeTutorial = useCallback(() => {
    internalDispatch({
      type: "TUTORIAL_COMPLETED",
      payload: { changedAt: new Date().toISOString() },
    });
  }, []);

  const value = useMemo<AppContextValue>(
    () => ({
      state,
      isHydrated,
      securityMode: "local-demo",
      isAuthoritative: false,
      localSecurityNotice: LOCAL_SECURITY_NOTICE,
      persistenceError,
      submitMission,
      submitPhishingFoundationV2,
      submitConversationReconstructionV2,
      submitMfaConsoleV2,
      submitRecoveryMission,
      submitRecoveryBuilderV2,
      submitPhishLab,
      submitDomainAnalyzerV2,
      submitTrueSenderV2,
      submitSimulation,
      submitWorkdayTriageV2,
      submitRadar,
      submitTeamChallenge,
      submitBankChange,
      submitBankProcessV2,
      savePreferences,
      startTutorial,
      setTutorialStep,
      completeTutorial,
      resetDemo,
    }),
    [
      isHydrated,
      persistenceError,
      resetDemo,
      state,
      submitMission,
      submitPhishingFoundationV2,
      submitConversationReconstructionV2,
      submitMfaConsoleV2,
      submitRecoveryMission,
      submitRecoveryBuilderV2,
      submitPhishLab,
      submitDomainAnalyzerV2,
      submitTrueSenderV2,
      submitSimulation,
      submitWorkdayTriageV2,
      submitRadar,
      submitTeamChallenge,
      submitBankChange,
      submitBankProcessV2,
      savePreferences,
      startTutorial,
      setTutorialStep,
      completeTutorial,
    ],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppState(): AppContextValue {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("useAppState deve ser usado dentro de AppProvider.");
  }

  return context;
}

export default AppProvider;
