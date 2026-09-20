export const OVERLOOKED_GAME_ID = "arcade:overlooked";
export const OVERLOOKED_SESSION_SECONDS = 300;
export const OVERLOOKED_MIN_CLASSIFIED_MESSAGES = 8;
export const OVERLOOKED_MIN_SERVER_ELAPSED_SECONDS = 285;
export const OVERLOOKED_MAX_SERVER_ELAPSED_SECONDS = 20 * 60;
export const OVERLOOKED_VALIDATION_VERSION = 1;

export const OVERLOOKED_EMAILS = {
  "sap-tigre": true,
  "gerente-campinas": true,
  "reset-marcos": true,
  autocad: true,
  "vpn-pedro": true,
  "rdp-typo": false,
  "admin-gmail": false,
  "microsoft-falso": false,
  "rh-falso": false,
  "vpn-diretor": false,
  "tigre-ip": false,
  "lista-usuarios": false,
} as const;

export type OverlookedEmailId = keyof typeof OVERLOOKED_EMAILS;
export type OverlookedOutcome =
  | "pendente"
  | "aceito"
  | "processado"
  | "phishing processado"
  | "legitimo descartado"
  | "phishing reportado";

export type OverlookedOutcomeInput = {
  id: OverlookedEmailId;
  outcome: OverlookedOutcome;
};

export type OverlookedCompletionInput = {
  durationSeconds: number;
  outcomes: OverlookedOutcomeInput[];
};

export type OverlookedValidatedResult = {
  durationSeconds: number;
  rawScore: number;
  classifiedMessages: number;
  phishingReported: number;
  legitimateCompleted: number;
  phishingProcessed: number;
  legitimateDiscarded: number;
  outcomes: OverlookedOutcomeInput[];
};

export type OverlookedLeaderboardEntry = {
  position: number;
  displayName: string;
  nickname: string;
  avatarUrl: string;
  animatedAvatarUrl: string;
  profileId: string | null;
  sectorName: string;
  score: number;
  phishingReported: number;
  legitimateCompleted: number;
  mistakes: number;
  completedAt: string;
  isCurrent: boolean;
};

export type OverlookedLeaderboardResponse = {
  generatedAt: string;
  entries: OverlookedLeaderboardEntry[];
  currentBest: OverlookedLeaderboardEntry | null;
};

export class OverlookedValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "OverlookedValidationError";
  }
}

const OUTCOMES = new Set<OverlookedOutcome>([
  "pendente",
  "aceito",
  "processado",
  "phishing processado",
  "legitimo descartado",
  "phishing reportado",
]);

function isKnownEmailId(value: unknown): value is OverlookedEmailId {
  return typeof value === "string" && value in OVERLOOKED_EMAILS;
}

function isKnownOutcome(value: unknown): value is OverlookedOutcome {
  return typeof value === "string" && OUTCOMES.has(value as OverlookedOutcome);
}

function pointsForOutcome(id: OverlookedEmailId, outcome: OverlookedOutcome): number {
  const legitimate = OVERLOOKED_EMAILS[id];
  if (legitimate && outcome === "processado") return 10;
  if (legitimate && outcome === "legitimo descartado") return -5;
  if (!legitimate && outcome === "phishing reportado") return 15;
  if (!legitimate && outcome === "phishing processado") return -20;
  if (outcome === "pendente" || outcome === "aceito") return 0;
  throw new OverlookedValidationError("O resultado contém uma combinação impossível.");
}

export function validateOverlookedCompletion(
  value: unknown,
  serverElapsedSeconds: number,
): OverlookedValidatedResult {
  if (!value || typeof value !== "object") {
    throw new OverlookedValidationError("Resultado da partida ausente.");
  }

  const input = value as Partial<OverlookedCompletionInput>;
  if (
    typeof input.durationSeconds !== "number" ||
    !Number.isFinite(input.durationSeconds) ||
    input.durationSeconds < OVERLOOKED_SESSION_SECONDS - 1 ||
    input.durationSeconds > OVERLOOKED_SESSION_SECONDS + 2
  ) {
    throw new OverlookedValidationError("A partida precisa chegar ao fim dos cinco minutos.");
  }
  if (
    !Number.isFinite(serverElapsedSeconds) ||
    serverElapsedSeconds < OVERLOOKED_MIN_SERVER_ELAPSED_SECONDS ||
    serverElapsedSeconds > OVERLOOKED_MAX_SERVER_ELAPSED_SECONDS
  ) {
    throw new OverlookedValidationError("A duração da sessão não pôde ser validada.");
  }
  if (!Array.isArray(input.outcomes) || input.outcomes.length > 12) {
    throw new OverlookedValidationError("A lista de mensagens da partida é inválida.");
  }

  const seen = new Set<OverlookedEmailId>();
  const outcomes = input.outcomes.map((item) => {
    if (!item || typeof item !== "object") {
      throw new OverlookedValidationError("Há um resultado de mensagem inválido.");
    }
    const candidate = item as { id?: unknown; outcome?: unknown };
    if (!isKnownEmailId(candidate.id) || !isKnownOutcome(candidate.outcome)) {
      throw new OverlookedValidationError("Há uma mensagem ou decisão desconhecida.");
    }
    if (seen.has(candidate.id)) {
      throw new OverlookedValidationError("Uma mesma mensagem apareceu mais de uma vez.");
    }
    seen.add(candidate.id);
    pointsForOutcome(candidate.id, candidate.outcome);
    return { id: candidate.id, outcome: candidate.outcome };
  });

  const result: OverlookedValidatedResult = {
    durationSeconds: Math.round(input.durationSeconds),
    rawScore: 0,
    classifiedMessages: 0,
    phishingReported: 0,
    legitimateCompleted: 0,
    phishingProcessed: 0,
    legitimateDiscarded: 0,
    outcomes,
  };

  for (const item of outcomes) {
    result.rawScore += pointsForOutcome(item.id, item.outcome);
    if (item.outcome !== "pendente") result.classifiedMessages += 1;
    if (item.outcome === "phishing reportado") result.phishingReported += 1;
    if (item.outcome === "processado") result.legitimateCompleted += 1;
    if (item.outcome === "phishing processado") result.phishingProcessed += 1;
    if (item.outcome === "legitimo descartado") result.legitimateDiscarded += 1;
  }

  if (result.classifiedMessages < OVERLOOKED_MIN_CLASSIFIED_MESSAGES) {
    throw new OverlookedValidationError(
      `Classifique pelo menos ${OVERLOOKED_MIN_CLASSIFIED_MESSAGES} mensagens para validar a partida.`,
    );
  }
  return result;
}
