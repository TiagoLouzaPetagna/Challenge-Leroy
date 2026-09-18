import type { ActivityContentPackage } from "../../../activities/content";

export const MFA_CONSOLE_ACTIVITY_ID = "mission:mfa-fatigue" as const;
export const MFA_CONSOLE_ACTIVITY_VERSION = 2 as const;
export const MFA_CONSOLE_MECHANIC_ID = "mfa-console" as const;

export type MfaAssociationId =
  | "active-self-action"
  | "ended-self-action"
  | "no-self-action";

export type MfaEventActionId = "approve" | "deny" | "review-official";

export type MfaSupportResponseId =
  | "end-contact"
  | "refuse-and-question"
  | "share-code"
  | "approve-next";

export type MfaOfficialEntryRouteId =
  | "known-security-area"
  | "message-link"
  | "first-search-result";

export type MfaOfficialConsoleActionId =
  | "review-events"
  | "end-unrecognized-sessions"
  | "request-account-recovery"
  | "keep-everything";

export type MfaReportDetailId =
  | "event-times"
  | "device-and-location"
  | "support-contact"
  | "actions-taken"
  | "password-or-code"
  | "hide-approval";

export type MfaTransferActionId =
  | "approve"
  | "deny-and-open-official"
  | "reply-with-code"
  | "ignore";

export type MfaOwnAction = {
  id: string;
  timeLabel: string;
  service: string;
  purpose: string;
  challenge: string;
  status: "active" | "ended";
};

export type MfaConsoleEvent = {
  id: string;
  timeLabel: string;
  title: string;
  service: string;
  purpose: string;
  challenge: string;
  device: string;
  location: string;
  statusLabel: string;
};

export type MfaSupportTurn = {
  id: string;
  sender: string;
  safeBranchMessage: string;
  unsafeBranchMessage: string;
};

export type MfaConsoleContent = {
  pathId: "p1-delayed-prompt" | "p2-prompt-fatigue" | "p3-exposure-recovery";
  pathLabel: string;
  summary: string;
  role: string;
  situation: string;
  protectedConsequence: string;
  priorExposureNote?: string;
  ownActions: readonly MfaOwnAction[];
  events: readonly MfaConsoleEvent[];
  supportTurns: readonly MfaSupportTurn[];
  officialArea: {
    title: string;
    description: string;
    sessions: readonly {
      id: string;
      device: string;
      location: string;
      lastSeen: string;
      recognized: boolean;
    }[];
  };
  transfer: {
    title: string;
    context: string;
    event: MfaConsoleEvent;
  };
};

export type MfaConsoleAllowlists = {
  eventIds: readonly string[];
  associationIds: readonly MfaAssociationId[];
  eventActionIds: readonly MfaEventActionId[];
  correctAssociationByEventId: Readonly<Record<string, MfaAssociationId>>;
  correctActionByEventId: Readonly<Record<string, MfaEventActionId>>;
  supportResponseIds: readonly MfaSupportResponseId[];
  safeSupportResponseIds: readonly MfaSupportResponseId[];
  officialEntryRouteIds: readonly MfaOfficialEntryRouteId[];
  correctOfficialEntryRouteId: MfaOfficialEntryRouteId;
  officialConsoleActionIds: readonly MfaOfficialConsoleActionId[];
  requiredOfficialConsoleActionIds: readonly MfaOfficialConsoleActionId[];
  reportDetailIds: readonly MfaReportDetailId[];
  safeReportDetailIds: readonly MfaReportDetailId[];
  transferAssociationIds: readonly MfaAssociationId[];
  correctTransferAssociationId: MfaAssociationId;
  transferActionIds: readonly MfaTransferActionId[];
  correctTransferActionId: MfaTransferActionId;
};

const ASSOCIATION_IDS = [
  "active-self-action",
  "ended-self-action",
  "no-self-action",
] as const;

const EVENT_ACTION_IDS = ["approve", "deny", "review-official"] as const;

const SUPPORT_RESPONSE_IDS = [
  "end-contact",
  "refuse-and-question",
  "share-code",
  "approve-next",
] as const;

const OFFICIAL_ENTRY_ROUTE_IDS = [
  "known-security-area",
  "message-link",
  "first-search-result",
] as const;

const OFFICIAL_CONSOLE_ACTION_IDS = [
  "review-events",
  "end-unrecognized-sessions",
  "request-account-recovery",
  "keep-everything",
] as const;

const REPORT_DETAIL_IDS = [
  "event-times",
  "device-and-location",
  "support-contact",
  "actions-taken",
  "password-or-code",
  "hide-approval",
] as const;

const TRANSFER_ACTION_IDS = [
  "approve",
  "deny-and-open-official",
  "reply-with-code",
  "ignore",
] as const;

const commonSupportTurns: readonly MfaSupportTurn[] = [
  {
    id: "support-opening",
    sender: "Central de Acesso · atendimento recebido",
    safeBranchMessage:
      "Vi que você negou os pedidos. Para interromper a falha, aprove a próxima solicitação que aparecer.",
    unsafeBranchMessage:
      "A aprovação foi registrada. Para terminar a correção, envie agora o código de seis dígitos que aparecer no aplicativo.",
  },
  {
    id: "support-pressure",
    sender: "Central de Acesso · atendimento recebido",
    safeBranchMessage:
      "Sem essa confirmação sua conta pode ser bloqueada. Continue aqui no chat para evitarmos a interrupção.",
    unsafeBranchMessage:
      "Não feche esta conversa. Precisamos de mais uma aprovação para retirar o dispositivo desconhecido.",
  },
] as const;

const p1Content: MfaConsoleContent = {
  pathId: "p1-delayed-prompt",
  pathLabel: "O pedido que chegou atrasado",
  summary:
    "Um pedido pode parecer relacionado ao que você fez. A aprovação só é segura enquanto a ação continua ativa e todos os detalhes correspondem.",
  role: "Você está concluindo uma alteração fictícia de preferência no portal corporativo.",
  situation:
    "O primeiro pedido chega durante a alteração iniciada por você. Depois que o fluxo termina, outro pedido muito parecido aparece.",
  protectedConsequence:
    "Evitar aprovar uma nova autenticação apenas porque ela se parece com uma ação legítima anterior.",
  ownActions: [
    {
      id: "profile-update",
      timeLabel: "10:04",
      service: "Portal de Pessoas",
      purpose: "Salvar preferência de contato",
      challenge: "41",
      status: "active",
    },
    {
      id: "profile-update-ended",
      timeLabel: "10:07",
      service: "Portal de Pessoas",
      purpose: "Preferência salva; fluxo encerrado",
      challenge: "41",
      status: "ended",
    },
  ],
  events: [
    {
      id: "p1-active-event",
      timeLabel: "10:05",
      title: "Confirmar alteração no Portal de Pessoas",
      service: "Portal de Pessoas",
      purpose: "Salvar preferência de contato",
      challenge: "41",
      device: "Notebook corporativo atual",
      location: "São Paulo · localização aproximada",
      statusLabel: "A ação registrada ainda está ativa",
    },
    {
      id: "p1-ended-event",
      timeLabel: "10:11",
      title: "Confirmar nova alteração no Portal de Pessoas",
      service: "Portal de Pessoas",
      purpose: "Salvar preferência de contato",
      challenge: "41",
      device: "Notebook reconhecido",
      location: "São Paulo · localização aproximada",
      statusLabel: "A ação registrada já terminou",
    },
  ],
  supportTurns: commonSupportTurns,
  officialArea: {
    title: "Área de segurança do Portal de Pessoas",
    description:
      "Esta tela fictícia foi aberta pelo portal que já era usado antes dos pedidos. Ela mostra eventos e sessões sem executar nenhuma ação real.",
    sessions: [
      {
        id: "current-notebook",
        device: "Notebook corporativo atual",
        location: "São Paulo",
        lastSeen: "Agora",
        recognized: true,
      },
      {
        id: "unknown-browser",
        device: "Navegador não reconhecido",
        location: "Local não confirmado",
        lastSeen: "10:11",
        recognized: false,
      },
    ],
  },
  transfer: {
    title: "Mesmo contexto, nova autoria",
    context:
      "À tarde, surge um pedido com os mesmos dados visuais, mas você não iniciou nenhuma ação naquele momento.",
    event: {
      id: "p1-transfer-event",
      timeLabel: "15:26",
      title: "Confirmar alteração no Portal de Pessoas",
      service: "Portal de Pessoas",
      purpose: "Salvar preferência de contato",
      challenge: "41",
      device: "Notebook reconhecido",
      location: "São Paulo · localização aproximada",
      statusLabel: "Nenhuma ação própria está ativa",
    },
  },
};

const p2Content: MfaConsoleContent = {
  pathId: "p2-prompt-fatigue",
  pathLabel: "Aprova só para parar",
  summary:
    "Pedidos repetidos tentam transformar cansaço e urgência em aprovação. A autoria da ação continua sendo o critério principal.",
  role: "Você é a pessoa responsável pela conta corporativa que recebeu os pedidos.",
  situation:
    "Você não está entrando em nenhum serviço. Três pedidos aparecem em sequência e, depois, alguém procura você pelo chat dizendo ser do suporte.",
  protectedConsequence:
    "Impedir que a repetição, a ameaça de bloqueio ou o falso suporte obtenham uma aprovação ou código.",
  ownActions: [],
  events: [
    {
      id: "p2-event-1",
      timeLabel: "10:14",
      title: "Aprovar entrada no Painel Corporativo",
      service: "Painel Corporativo",
      purpose: "Entrar na conta",
      challenge: "73",
      device: "Navegador desconhecido",
      location: "Curitiba · localização aproximada",
      statusLabel: "Nenhuma entrada foi iniciada por você",
    },
    {
      id: "p2-event-2",
      timeLabel: "10:15",
      title: "Nova tentativa de entrada",
      service: "Painel Corporativo",
      purpose: "Entrar na conta",
      challenge: "73",
      device: "Navegador desconhecido",
      location: "Curitiba · localização aproximada",
      statusLabel: "Pedido repetido; nenhuma ação própria encontrada",
    },
    {
      id: "p2-event-3",
      timeLabel: "10:16",
      title: "Última tentativa antes do bloqueio",
      service: "Painel Corporativo",
      purpose: "Entrar na conta",
      challenge: "73",
      device: "Navegador desconhecido",
      location: "Curitiba · localização aproximada",
      statusLabel: "A ameaça de bloqueio não comprova autoria",
    },
  ],
  supportTurns: commonSupportTurns,
  officialArea: {
    title: "Segurança da conta",
    description:
      "Esta área fictícia foi aberta pela intranet conhecida, sem usar o endereço do chat. Ela não encerra sessão nem envia reporte real.",
    sessions: [
      {
        id: "known-session",
        device: "Notebook corporativo atual",
        location: "São Paulo",
        lastSeen: "Agora",
        recognized: true,
      },
      {
        id: "unknown-session",
        device: "Navegador não reconhecido",
        location: "Curitiba",
        lastSeen: "10:16",
        recognized: false,
      },
    ],
  },
  transfer: {
    title: "Um único pedido também precisa de autoria",
    context:
      "No dia seguinte aparece somente um pedido, sem repetição e sem mensagem de suporte. Você continua sem ter iniciado uma entrada.",
    event: {
      id: "p2-transfer-event",
      timeLabel: "09:08",
      title: "Aprovar entrada no Painel Corporativo",
      service: "Painel Corporativo",
      purpose: "Entrar na conta",
      challenge: "18",
      device: "Notebook reconhecido",
      location: "São Paulo · localização aproximada",
      statusLabel: "Nenhuma entrada foi iniciada por você",
    },
  },
};

const p3Content: MfaConsoleContent = {
  pathId: "p3-exposure-recovery",
  pathLabel: "A aprovação já aconteceu",
  summary:
    "Depois de uma aprovação ou código compartilhado, o objetivo muda: negar novos eventos, encerrar o contato e iniciar recuperação sem culpa.",
  role: "Você assume a resposta a um incidente fictício na própria conta.",
  situation:
    "A narrativa informa que uma aprovação foi aceita antes do início da atividade. Agora chegam novos pedidos e o mesmo falso suporte tenta manter a conversa.",
  protectedConsequence:
    "Conter a possível exposição sem esconder o que aconteceu nem fornecer novos fatores.",
  priorExposureNote:
    "Antes desta atividade, uma solicitação não iniciada foi aprovada. Isso é um fato do caso, não uma punição ou pergunta.",
  ownActions: [],
  events: [
    {
      id: "p3-event-1",
      timeLabel: "16:32",
      title: "Aprovar registro de novo dispositivo",
      service: "Conta Corporativa",
      purpose: "Registrar dispositivo",
      challenge: "56",
      device: "Celular não reconhecido",
      location: "Local não confirmado",
      statusLabel: "Nenhum registro foi iniciado por você",
    },
    {
      id: "p3-event-2",
      timeLabel: "16:34",
      title: "Confirmar recuperação da conta",
      service: "Conta Corporativa",
      purpose: "Recuperar acesso",
      challenge: "09",
      device: "Celular não reconhecido",
      location: "Local não confirmado",
      statusLabel: "A recuperação não foi iniciada pela área oficial",
    },
  ],
  supportTurns: commonSupportTurns,
  officialArea: {
    title: "Central fictícia de recuperação",
    description:
      "A área conhecida mostra o que pode precisar de tratamento. Os botões representam solicitações ao processo, não efeitos reais na conta.",
    sessions: [
      {
        id: "known-session",
        device: "Notebook corporativo atual",
        location: "São Paulo",
        lastSeen: "Agora",
        recognized: true,
      },
      {
        id: "unknown-mobile",
        device: "Celular não reconhecido",
        location: "Local não confirmado",
        lastSeen: "16:34",
        recognized: false,
      },
    ],
  },
  transfer: {
    title: "O código continua sendo um fator",
    context:
      "Uma nova mensagem de chat pede um código para confirmar que a recuperação é realmente sua. A conversa foi recebida, não iniciada pela área oficial.",
    event: {
      id: "p3-transfer-event",
      timeLabel: "16:40",
      title: "Código para continuar a recuperação",
      service: "Conta Corporativa",
      purpose: "Recuperar acesso",
      challenge: "22",
      device: "Dispositivo não informado",
      location: "Local não informado",
      statusLabel: "O pedido veio pelo contato que está sendo verificado",
    },
  },
};

function packageWith(
  casePackageId: string,
  content: MfaConsoleContent,
  correctAssociationByEventId: Readonly<Record<string, MfaAssociationId>>,
  correctActionByEventId: Readonly<Record<string, MfaEventActionId>>,
  requiredOfficialConsoleActionIds: readonly MfaOfficialConsoleActionId[],
): ActivityContentPackage<MfaConsoleContent, MfaConsoleAllowlists> {
  return {
    activityId: MFA_CONSOLE_ACTIVITY_ID,
    activityVersion: MFA_CONSOLE_ACTIVITY_VERSION,
    casePackageId,
    status: "published",
    editorialDate: "2026-08-15",
    content,
    allowlists: {
      eventIds: content.events.map((event) => event.id),
      associationIds: ASSOCIATION_IDS,
      eventActionIds: EVENT_ACTION_IDS,
      correctAssociationByEventId,
      correctActionByEventId,
      supportResponseIds: SUPPORT_RESPONSE_IDS,
      safeSupportResponseIds: ["end-contact", "refuse-and-question"],
      officialEntryRouteIds: OFFICIAL_ENTRY_ROUTE_IDS,
      correctOfficialEntryRouteId: "known-security-area",
      officialConsoleActionIds: OFFICIAL_CONSOLE_ACTION_IDS,
      requiredOfficialConsoleActionIds,
      reportDetailIds: REPORT_DETAIL_IDS,
      safeReportDetailIds: [
        "event-times",
        "device-and-location",
        "support-contact",
        "actions-taken",
      ],
      transferAssociationIds: ASSOCIATION_IDS,
      correctTransferAssociationId: "no-self-action",
      transferActionIds: TRANSFER_ACTION_IDS,
      correctTransferActionId: "deny-and-open-official",
    },
    criticalControlIds: [
      "unsafe-factor-approval",
      "unsafe-support-contact",
      "independent-route",
      "recovery-actions",
      "safe-report",
      "transfer",
    ],
    feedback: {
      success:
        "Você vinculou as solicitações às próprias ações e tratou a interferência pela área oficial.",
      review:
        "Aprovação e código só pertencem ao fluxo que você iniciou; contatos recebidos não confirmam essa autoria.",
    },
    debrief: {
      title: "A autoria da ação vem antes da aparência do pedido",
      body:
        "Repetição, urgência e suporte não criam uma autorização. Negue o que não iniciou e verifique por uma rota conhecida.",
    },
  };
}

export const MFA_CONSOLE_V2_PACKAGES = [
  packageWith(
    "mission:mfa-fatigue:v2:p2-prompt-fatigue",
    p2Content,
    {
      "p2-event-1": "no-self-action",
      "p2-event-2": "no-self-action",
      "p2-event-3": "no-self-action",
    },
    {
      "p2-event-1": "deny",
      "p2-event-2": "deny",
      "p2-event-3": "deny",
    },
    ["review-events", "end-unrecognized-sessions"],
  ),
  packageWith(
    "mission:mfa-fatigue:v2:p1-delayed-prompt",
    p1Content,
    {
      "p1-active-event": "active-self-action",
      "p1-ended-event": "ended-self-action",
    },
    {
      "p1-active-event": "approve",
      "p1-ended-event": "deny",
    },
    ["review-events", "end-unrecognized-sessions"],
  ),
  packageWith(
    "mission:mfa-fatigue:v2:p3-exposure-recovery",
    p3Content,
    {
      "p3-event-1": "no-self-action",
      "p3-event-2": "no-self-action",
    },
    {
      "p3-event-1": "deny",
      "p3-event-2": "deny",
    },
    [
      "review-events",
      "end-unrecognized-sessions",
      "request-account-recovery",
    ],
  ),
] as const;

export const MFA_CONSOLE_CANONICAL_PACKAGE_ID =
  MFA_CONSOLE_V2_PACKAGES[0].casePackageId;

export type MfaConsoleV2Package = (typeof MFA_CONSOLE_V2_PACKAGES)[number];

export function findMfaConsoleV2Package(casePackageId: string) {
  return MFA_CONSOLE_V2_PACKAGES.find(
    (contentPackage) => contentPackage.casePackageId === casePackageId,
  );
}
