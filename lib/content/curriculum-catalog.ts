import type { CompetencyId } from "../domain/types";
import {
  PHISHLAB_ACTIVITY_ID,
  PILOT_MISSION_ID,
  POINT_RULES,
  SIMULATION_ACTIVITY_ID,
} from "../domain/rules";

export type CurriculumArea =
  | "mission"
  | "phishlab"
  | "simulation"
  | "team";

export type CurriculumActivityId =
  | `mission:${string}`
  | `phishlab:${string}`
  | `simulation:${string}`
  | `team:${string}`;

export type RadarActivityId = `radar:${string}`;
export type CurriculumPathId = `curriculum:${string}`;
export type CurriculumStepId = `${CurriculumPathId}:${string}`;
export type CurriculumRoute = `/${string}`;

export type CurriculumIntegrationStatus = "available" | "planned";

export type CurriculumPresentationStatus =
  | "completed"
  | "inProgress"
  | "available"
  | "locked"
  | "planned";

export type CurriculumStepDefinition = {
  id: CurriculumStepId;
  activityId: CurriculumActivityId;
  activityVersion: number;
  order: number;
  area: CurriculumArea;
  title: string;
  summary: string;
  route: CurriculumRoute;
  estimatedMinutes: number;
  basePoints: number;
  competencyFocus: readonly CompetencyId[];
  integrationStatus: CurriculumIntegrationStatus;
  prerequisiteActivityIds: readonly CurriculumActivityId[];
  recommendedAfterActivityIds: readonly CurriculumActivityId[];
  relatedRadarActivityIds: readonly RadarActivityId[];
};

export type OptionalRadarReference = {
  activityId: RadarActivityId;
  title: string;
  route: CurriculumRoute;
  relatedStepIds: readonly CurriculumStepId[];
  optional: true;
  awardsPointsOnCompletion: true;
  prerequisite: false;
};

export type CurriculumPathDefinition = {
  id: CurriculumPathId;
  title: string;
  summary: string;
  steps: readonly CurriculumStepDefinition[];
  optionalRadar: readonly OptionalRadarReference[];
};

export type CurriculumStepPresentation = CurriculumStepDefinition & {
  presentationStatus: CurriculumPresentationStatus;
};

export type LearningPathValidationIssue = {
  code:
    | "duplicate-step-id"
    | "duplicate-activity-id"
    | "missing-prerequisite"
    | "missing-recommendation"
    | "prerequisite-cycle";
  message: string;
  stepId?: CurriculumStepId;
  activityId?: CurriculumActivityId;
};

export type LearningPathValidationResult = {
  valid: boolean;
  issues: readonly LearningPathValidationIssue[];
};

export const CONFIDENCE_UNDER_PRESSURE_PATH_ID =
  "curriculum:confidence-under-pressure" as const;

const STEP_IDS = {
  foundation:
    "curriculum:confidence-under-pressure:phishing-foundation",
  compromisedConversation:
    "curriculum:confidence-under-pressure:compromised-conversation",
  trueSender: "curriculum:confidence-under-pressure:true-sender",
  domainInspection: "curriculum:confidence-under-pressure:domain-inspection",
  unexpectedAccess: "curriculum:confidence-under-pressure:unexpected-access",
  afterClick: "curriculum:confidence-under-pressure:after-click",
  ordinaryMorning: "curriculum:confidence-under-pressure:ordinary-morning",
  bankChange: "curriculum:confidence-under-pressure:bank-change",
} as const satisfies Record<string, CurriculumStepId>;

export const OPTIONAL_RADAR_CONTENT = [
  {
    activityId: "radar:manager-impersonation",
    title: "Quando o golpista se passa por um gestor",
    route: "/radar/falso-gestor",
    relatedStepIds: [
      STEP_IDS.compromisedConversation,
      STEP_IDS.trueSender,
      STEP_IDS.bankChange,
    ],
    optional: true,
    awardsPointsOnCompletion: true,
    prerequisite: false,
  },
  {
    activityId: "radar:message-scams",
    title: "Golpes por mensagem e troca de número",
    route: "/radar/golpes-por-mensagem",
    relatedStepIds: [STEP_IDS.trueSender, STEP_IDS.ordinaryMorning],
    optional: true,
    awardsPointsOnCompletion: true,
    prerequisite: false,
  },
  {
    activityId: "radar:quishing",
    title: "Quishing: phishing escondido em QR Codes",
    route: "/radar/quishing",
    relatedStepIds: [STEP_IDS.domainInspection],
    optional: true,
    awardsPointsOnCompletion: true,
    prerequisite: false,
  },
  {
    activityId: "radar:mfa-fatigue",
    title: "Fadiga de MFA: aprovações que você não iniciou",
    route: "/radar/fadiga-mfa",
    relatedStepIds: [STEP_IDS.unexpectedAccess],
    optional: true,
    awardsPointsOnCompletion: true,
    prerequisite: false,
  },
  {
    activityId: "radar:after-click",
    title: "Cliquei em um link suspeito. E agora?",
    route: "/radar/depois-do-clique",
    relatedStepIds: [STEP_IDS.afterClick],
    optional: true,
    awardsPointsOnCompletion: true,
    prerequisite: false,
  },
  {
    activityId: "radar:unexpected-attachments",
    title: "Anexos inesperados e falsas notas fiscais",
    route: "/radar/anexos-inesperados",
    relatedStepIds: [STEP_IDS.ordinaryMorning],
    optional: true,
    awardsPointsOnCompletion: true,
    prerequisite: false,
  },
] as const satisfies readonly OptionalRadarReference[];

const FIRST_LEARNING_PATH_STEPS = [
  {
      id: STEP_IDS.foundation,
      activityId: PILOT_MISSION_ID,
      activityVersion: 2,
      order: 1,
      area: "mission",
      title: "O aviso que não podia esperar",
      summary:
        "Aprenda PARE: identifique o pedido e a consequência, confirme fora da mensagem e responda pelo processo seguro.",
      route: "/missoes/aviso-de-bloqueio",
      estimatedMinutes: 9,
      basePoints: POINT_RULES.mainMission,
      competencyFocus: [
        "observar",
        "investigar",
        "verificar",
        "decidir",
        "reportar",
      ],
      integrationStatus: "available",
      prerequisiteActivityIds: [],
      recommendedAfterActivityIds: [],
      relatedRadarActivityIds: [],
  },
  {
      id: STEP_IDS.compromisedConversation,
      activityId: "mission:compromised-conversation",
      activityVersion: 2,
      order: 4,
      area: "mission",
      title: "A conversa já estava acontecendo",
      summary:
        "Reconstrua uma conversa, localize a mudança de comportamento e confirme o pedido fora do mesmo fio.",
      route: "/missoes/a-conversa-ja-estava-acontecendo",
      estimatedMinutes: 11,
      basePoints: POINT_RULES.mainMission,
      competencyFocus: ["observar", "investigar", "verificar", "reportar"],
      integrationStatus: "available",
      prerequisiteActivityIds: [],
      recommendedAfterActivityIds: [PHISHLAB_ACTIVITY_ID],
      relatedRadarActivityIds: ["radar:manager-impersonation"],
  },
  {
      id: STEP_IDS.trueSender,
      activityId: "phishlab:true-sender",
      activityVersion: 2,
      order: 2,
      area: "phishlab",
      title: "Quem enviou de verdade?",
      summary:
        "Mapeie o que nome exibido, From, Reply-To, domínio e contexto realmente comprovam antes de confiar na identidade.",
      route: "/phishlab/quem-enviou-de-verdade",
      estimatedMinutes: 9,
      basePoints: POINT_RULES.phishLab,
      competencyFocus: ["observar", "investigar", "verificar"],
      integrationStatus: "available",
      prerequisiteActivityIds: [],
      recommendedAfterActivityIds: [PILOT_MISSION_ID],
      relatedRadarActivityIds: [
        "radar:manager-impersonation",
        "radar:message-scams",
      ],
  },
  {
      id: STEP_IDS.domainInspection,
      activityId: PHISHLAB_ACTIVITY_ID,
      activityVersion: 2,
      order: 3,
      area: "phishlab",
      title: "Domínio sob a lupa",
      summary:
        "Separe protocolo, subdomínio, domínio registrado, caminho e parâmetro para identificar a origem que realmente receberia a ação.",
      route: "/phishlab/analisador-de-links",
      estimatedMinutes: 9,
      basePoints: POINT_RULES.phishLab,
      competencyFocus: ["observar", "investigar", "decidir"],
      integrationStatus: "available",
      prerequisiteActivityIds: [],
      recommendedAfterActivityIds: ["phishlab:true-sender"],
      relatedRadarActivityIds: ["radar:quishing"],
  },
  {
      id: STEP_IDS.unexpectedAccess,
      activityId: "mission:mfa-fatigue",
      activityVersion: 2,
      order: 5,
      area: "mission",
      title: "Você iniciou este acesso?",
      summary:
        "Responda a aprovações repetidas de acesso e a uma falsa abordagem de suporte sem entregar o segundo fator.",
      route: "/missoes/voce-iniciou-este-acesso",
      estimatedMinutes: 9,
      basePoints: POINT_RULES.mainMission,
      competencyFocus: ["investigar", "verificar", "decidir", "reportar"],
      integrationStatus: "available",
      prerequisiteActivityIds: ["phishlab:true-sender", PHISHLAB_ACTIVITY_ID],
      recommendedAfterActivityIds: [],
      relatedRadarActivityIds: ["radar:mfa-fatigue"],
  },
  {
      id: STEP_IDS.afterClick,
      activityId: "mission:clicked-now-what",
      activityVersion: 2,
      order: 6,
      area: "mission",
      title: "Cliquei. E agora?",
      summary:
        "Priorize contenção e reporte depois de uma ação suspeita, sem esconder o incidente ou improvisar uma recuperação.",
      route: "/missoes/cliquei-e-agora",
      estimatedMinutes: 12,
      basePoints: POINT_RULES.mainMission,
      competencyFocus: ["decidir", "reportar", "recuperar"],
      integrationStatus: "available",
      prerequisiteActivityIds: [],
      recommendedAfterActivityIds: ["mission:mfa-fatigue"],
      relatedRadarActivityIds: ["radar:after-click"],
  },
  {
      id: STEP_IDS.ordinaryMorning,
      activityId: SIMULATION_ACTIVITY_ID,
      activityVersion: 2,
      order: 7,
      area: "simulation",
      title: "Uma manhã comum",
      summary:
        "Trate mensagens legítimas, suspeitas e inconclusivas em uma rotina na qual o risco não vem identificado.",
      route: "/simulacoes/dia-de-trabalho",
      estimatedMinutes: 14,
      basePoints: POINT_RULES.simulation,
      competencyFocus: [
        "observar",
        "investigar",
        "verificar",
        "decidir",
        "reportar",
      ],
      integrationStatus: "available",
      prerequisiteActivityIds: [],
      recommendedAfterActivityIds: ["mission:clicked-now-what"],
      relatedRadarActivityIds: [
        "radar:unexpected-attachments",
        "radar:message-scams",
      ],
  },
  {
      id: STEP_IDS.bankChange,
      activityId: "team:bank-change",
      activityVersion: 2,
      order: 8,
      area: "team",
      title: "Mudança bancária sem atalho",
      summary:
        "Conclua individualmente um caso de alteração bancária e contribua com o resultado agregado da equipe.",
      route: "/equipes/mudanca-bancaria-sem-atalho",
      estimatedMinutes: 14,
      basePoints: POINT_RULES.teamOperation,
      competencyFocus: ["verificar", "decidir", "reportar", "orientar"],
      integrationStatus: "available",
      prerequisiteActivityIds: [],
      recommendedAfterActivityIds: [SIMULATION_ACTIVITY_ID],
      relatedRadarActivityIds: ["radar:manager-impersonation"],
  },
] as const satisfies readonly CurriculumStepDefinition[];

export const FIRST_LEARNING_PATH = {
  id: CONFIDENCE_UNDER_PRESSURE_PATH_ID,
  title: "Confiança sob pressão",
  summary:
    "Um percurso transversal para reconhecer manipulação, verificar identidade e destino, responder com segurança e reportar rapidamente.",
  steps: [...FIRST_LEARNING_PATH_STEPS].sort(
    (left, right) => left.order - right.order,
  ),
  optionalRadar: OPTIONAL_RADAR_CONTENT,
} as const satisfies CurriculumPathDefinition;

export const CONFIDENCE_UNDER_PRESSURE_PATH = FIRST_LEARNING_PATH;

export function findLearningPathStepById(
  stepId: string,
  path: CurriculumPathDefinition = FIRST_LEARNING_PATH,
): CurriculumStepDefinition | null {
  return path.steps.find((step) => step.id === stepId) ?? null;
}

export function findLearningPathStepByActivityId(
  activityId: string,
  path: CurriculumPathDefinition = FIRST_LEARNING_PATH,
): CurriculumStepDefinition | null {
  return path.steps.find((step) => step.activityId === activityId) ?? null;
}

export function getLearningPathStepRoute(
  stepIdOrActivityId: string,
  path: CurriculumPathDefinition = FIRST_LEARNING_PATH,
): CurriculumRoute | null {
  const step =
    findLearningPathStepById(stepIdOrActivityId, path) ??
    findLearningPathStepByActivityId(stepIdOrActivityId, path);

  return step?.route ?? null;
}

const EMPTY_ACTIVITY_IDS: ReadonlySet<string> = new Set<string>();

export function getLearningPathStepStatus(
  step: CurriculumStepDefinition,
  completedActivityIds: ReadonlySet<string>,
  inProgressActivityIds: ReadonlySet<string> = EMPTY_ACTIVITY_IDS,
): CurriculumPresentationStatus {
  if (completedActivityIds.has(step.activityId)) return "completed";
  if (step.integrationStatus === "planned") return "planned";
  if (inProgressActivityIds.has(step.activityId)) return "inProgress";

  const prerequisitesCompleted = step.prerequisiteActivityIds.every(
    (activityId) => completedActivityIds.has(activityId),
  );

  return prerequisitesCompleted ? "available" : "locked";
}

export function getCurriculumPresentation(
  completedActivityIds: ReadonlySet<string>,
  inProgressActivityIds: ReadonlySet<string> = EMPTY_ACTIVITY_IDS,
  path: CurriculumPathDefinition = FIRST_LEARNING_PATH,
): readonly CurriculumStepPresentation[] {
  return path.steps.map((step) => ({
    ...step,
    presentationStatus: getLearningPathStepStatus(
      step,
      completedActivityIds,
      inProgressActivityIds,
    ),
  }));
}

export function hasCurriculumPrerequisiteCycle(
  path: CurriculumPathDefinition = FIRST_LEARNING_PATH,
): boolean {
  const stepsByActivityId = new Map(
    path.steps.map((step) => [step.activityId, step]),
  );
  const visiting = new Set<CurriculumActivityId>();
  const visited = new Set<CurriculumActivityId>();

  const visit = (activityId: CurriculumActivityId): boolean => {
    if (visiting.has(activityId)) return true;
    if (visited.has(activityId)) return false;

    const step = stepsByActivityId.get(activityId);
    if (!step) return false;

    visiting.add(activityId);

    if (
      step.prerequisiteActivityIds.some((prerequisiteId) =>
        visit(prerequisiteId),
      )
    ) {
      return true;
    }

    visiting.delete(activityId);
    visited.add(activityId);
    return false;
  };

  return path.steps.some((step) => visit(step.activityId));
}

export function validateLearningPath(
  path: CurriculumPathDefinition = FIRST_LEARNING_PATH,
): LearningPathValidationResult {
  const issues: LearningPathValidationIssue[] = [];
  const stepIds = new Set<CurriculumStepId>();
  const activityIds = new Set<CurriculumActivityId>();

  for (const step of path.steps) {
    if (stepIds.has(step.id)) {
      issues.push({
        code: "duplicate-step-id",
        message: `O identificador de etapa ${step.id} está duplicado.`,
        stepId: step.id,
      });
    }
    stepIds.add(step.id);

    if (activityIds.has(step.activityId)) {
      issues.push({
        code: "duplicate-activity-id",
        message: `A atividade ${step.activityId} aparece em mais de uma etapa.`,
        stepId: step.id,
        activityId: step.activityId,
      });
    }
    activityIds.add(step.activityId);
  }

  for (const step of path.steps) {
    for (const prerequisiteId of step.prerequisiteActivityIds) {
      if (!activityIds.has(prerequisiteId)) {
        issues.push({
          code: "missing-prerequisite",
          message: `O pré-requisito ${prerequisiteId} não pertence ao percurso.`,
          stepId: step.id,
          activityId: prerequisiteId,
        });
      }
    }

    for (const recommendedId of step.recommendedAfterActivityIds) {
      if (!activityIds.has(recommendedId)) {
        issues.push({
          code: "missing-recommendation",
          message: `A recomendação ${recommendedId} não pertence ao percurso.`,
          stepId: step.id,
          activityId: recommendedId,
        });
      }
    }
  }

  if (hasCurriculumPrerequisiteCycle(path)) {
    issues.push({
      code: "prerequisite-cycle",
      message: "O percurso contém um ciclo entre pré-requisitos obrigatórios.",
    });
  }

  return {
    valid: issues.length === 0,
    issues,
  };
}
