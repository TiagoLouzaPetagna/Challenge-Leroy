import type { ActivityContentPackage } from "../../../activities/content";

export const CONVERSATION_RECONSTRUCTION_ACTIVITY_ID =
  "mission:compromised-conversation" as const;
export const CONVERSATION_RECONSTRUCTION_ACTIVITY_VERSION = 2 as const;
export const CONVERSATION_RECONSTRUCTION_MECHANIC_ID =
  "conversation-reconstruction" as const;

export type EvidenceClassificationId = "fact" | "indicator" | "inference";
export type ConversationConclusionId =
  | "legitimate"
  | "malicious-probable"
  | "inconclusive";
export type ConversationConfirmationRouteId =
  | "registered-contact"
  | "same-thread"
  | "request-contact"
  | "public-search";
export type ConversationFinalActionId =
  | "pause-confirm-report"
  | "pause-confirm-normal-process"
  | "refuse-check-official"
  | "continue-request";
export type ConversationReportDetailId =
  | "sender-and-time"
  | "observed-change"
  | "verification-result"
  | "preserved-context"
  | "password-or-code"
  | "forward-to-team";
export type ConversationTransferDecisionId =
  | "pause-use-known-route"
  | "continue-familiar-channel"
  | "reply-for-confirmation"
  | "ignore-without-record";

export type ConversationMessage = {
  id: string;
  timeLabel: string;
  sender: string;
  address: string;
  body: string;
};

export type ConversationEvidence = {
  id: string;
  title: string;
  source: string;
  detail: string;
};

export type ConversationReconstructionContent = {
  pathId: "p1-new-destination" | "p2-legitimate-change" | "p3-scope-change";
  pathLabel: string;
  summary: string;
  role: string;
  caseTitle: string;
  caseContext: string;
  messages: readonly ConversationMessage[];
  initialMessageOrder: readonly string[];
  evidence: readonly ConversationEvidence[];
  consequence: {
    title: string;
    body: string;
    sourceLabel: string;
  };
  transfer: {
    title: string;
    context: string;
    message: string;
  };
  finalActionOptions: readonly {
    id: ConversationFinalActionId;
    label: string;
    detail: string;
  }[];
  reportDetailOptions: readonly {
    id: ConversationReportDetailId;
    label: string;
  }[];
};

export type ConversationReconstructionAllowlists = {
  messageIds: readonly string[];
  correctMessageOrder: readonly string[];
  acceptedTurningPointIds: readonly string[];
  evidenceIds: readonly string[];
  evidenceClassificationIds: readonly EvidenceClassificationId[];
  correctEvidenceClassifications: Readonly<Record<string, EvidenceClassificationId>>;
  conclusionIds: readonly ConversationConclusionId[];
  correctProvisionalConclusionIds: readonly ConversationConclusionId[];
  correctFinalConclusionId: ConversationConclusionId;
  confirmationRouteIds: readonly ConversationConfirmationRouteId[];
  correctConfirmationRouteId: ConversationConfirmationRouteId;
  finalActionIds: readonly ConversationFinalActionId[];
  correctFinalActionId: ConversationFinalActionId;
  reportDetailIds: readonly ConversationReportDetailId[];
  safeReportDetailIds: readonly ConversationReportDetailId[];
  requiresIncidentReport: boolean;
  transferDecisionIds: readonly ConversationTransferDecisionId[];
  correctTransferDecisionId: ConversationTransferDecisionId;
};

const CLASSIFICATIONS = ["fact", "indicator", "inference"] as const;
const CONCLUSIONS = ["legitimate", "malicious-probable", "inconclusive"] as const;
const CONFIRMATION_ROUTES = [
  "registered-contact",
  "same-thread",
  "request-contact",
  "public-search",
] as const;
const TRANSFER_DECISIONS = [
  "pause-use-known-route",
  "continue-familiar-channel",
  "reply-for-confirmation",
  "ignore-without-record",
] as const;

const COMMON_REPORT_OPTIONS = [
  {
    id: "sender-and-time",
    label: "Quem pediu, por onde e a que horas",
  },
  {
    id: "observed-change",
    label: "O que mudou no pedido",
  },
  {
    id: "verification-result",
    label: "Como você conferiu e o que ouviu",
  },
  {
    id: "preserved-context",
    label: "O histórico da conversa, guardado",
  },
  {
    id: "password-or-code",
    label: "Sua senha ou código de acesso",
  },
  {
    id: "forward-to-team",
    label: "A conversa inteira repassada para todo mundo",
  },
] as const satisfies readonly {
  id: ConversationReportDetailId;
  label: string;
}[];

const COMMON_ACTION_OPTIONS = [
  {
    id: "pause-confirm-report",
    label: "Não enviar e avisar a segurança",
    detail: "Guardar a conversa e contar o que você conferiu, sem acusar a Marina.",
  },
  {
    id: "pause-confirm-normal-process",
    label: "Seguir só depois que entrar no portal",
    detail: "Continuar a entrega apenas quando a mudança estiver registrada do jeito de sempre.",
  },
  {
    id: "refuse-check-official",
    label: "Recusar e abrir um chamado",
    detail: "Não passar nada e levar o caso pelo sistema que você já conhece.",
  },
  {
    id: "continue-request",
    label: "Fazer o que ele pediu, ali mesmo",
    detail: "Tratar a conversa antiga como se fosse autorização.",
  },
] as const satisfies readonly {
  id: ConversationFinalActionId;
  label: string;
  detail: string;
}[];

function packageDefinition(
  definition: ActivityContentPackage<
    ConversationReconstructionContent,
    ConversationReconstructionAllowlists
  >,
) {
  return definition;
}

export const COMPROMISED_CONVERSATION_V2_PACKAGES = [
  packageDefinition({
    casePackageId: "mission:compromised-conversation:v2:p1-new-destination",
    activityId: CONVERSATION_RECONSTRUCTION_ACTIVITY_ID,
    activityVersion: CONVERSATION_RECONSTRUCTION_ACTIVITY_VERSION,
    status: "published",
    editorialDate: "2026-08-15",
    content: {
      pathId: "p1-new-destination",
      pathLabel: "O novo destino",
      summary: "Uma entrega de sempre muda de endereço no meio de uma conversa conhecida.",
      role: "Você cuida de uma entrega da Lumen Suprimentos.",
      caseTitle: "Entrega 4821 · confirmação final",
      caseContext:
        "As mensagens chegaram embaralhadas. Coloque na ordem antes de decidir.",
      messages: [
        {
          id: "p1-order-opened",
          timeLabel: "Segunda · 09:12",
          sender: "Marina Lopes · Lumen Suprimentos",
          address: "marina.lopes@lumen-suprimentos.example",
          body: "O pedido 4821 foi separado. A entrega continua prevista para quinta no endereço cadastrado.",
        },
        {
          id: "p1-portal-reviewed",
          timeLabel: "Segunda · 10:03",
          sender: "Lucas",
          address: "lucas@casa-digital.example",
          body: "Revisei os itens pelo portal habitual. Pode manter o endereço e a janela combinados.",
        },
        {
          id: "p1-dispatch-confirmed",
          timeLabel: "Terça · 16:40",
          sender: "Marina Lopes · Lumen Suprimentos",
          address: "marina.lopes@lumen-suprimentos.example",
          body: "Tudo certo com a expedição. O comprovante será anexado ao pedido no portal.",
        },
        {
          id: "p1-destination-change",
          timeLabel: "Quarta · 08:21",
          sender: "Marina Lopes · Lumen Suprimentos",
          address: "marina.lopes@lumen-suprimentos.example",
          body: "Preciso redirecionar a entrega para o depósito auxiliar. Confirme ainda nesta conversa para não perdermos a saída.",
        },
        {
          id: "p1-process-question",
          timeLabel: "Quarta · 08:28",
          sender: "Lucas",
          address: "lucas@casa-digital.example",
          body: "Essa alteração já foi registrada no portal? Nosso procedimento usa o endereço cadastrado no pedido.",
        },
        {
          id: "p1-pressure",
          timeLabel: "Quarta · 08:31",
          sender: "Marina Lopes · Lumen Suprimentos",
          address: "marina.lopes@lumen-suprimentos.example",
          body: "Estou fora do escritório e sem acesso ao portal. Use o endereço que enviei; o caminhão sai em 15 minutos.",
        },
      ],
      initialMessageOrder: [
        "p1-pressure",
        "p1-order-opened",
        "p1-destination-change",
        "p1-portal-reviewed",
        "p1-process-question",
        "p1-dispatch-confirmed",
      ],
      evidence: [
        {
          id: "p1-known-account",
          title: "É a conta de sempre",
          source: "Topo da conversa",
          detail: "O e-mail da Marina é o mesmo das mensagens anteriores.",
        },
        {
          id: "p1-registered-address",
          title: "O portal não mudou nada",
          source: "Pedido 4821",
          detail: "No sistema, o endereço continua o antigo. Ninguém aprovou a troca.",
        },
        {
          id: "p1-process-change",
          title: "O caminho mudou",
          source: "A conversa",
          detail: "Antes tudo passava pelo portal. Agora querem resolver na conversa.",
        },
        {
          id: "p1-urgency",
          title: "Pressa demais",
          source: "Última mensagem",
          detail: "Quinze minutos é pouco tempo para conferir qualquer coisa.",
        },
        {
          id: "p1-compromise-hypothesis",
          title: "Alguém invadiu a conta dela",
          source: "O que você imagina",
          detail: "Pode ser. Mas nada na tela prova isso.",
        },
      ],
      consequence: {
        title: "A Marina diz que não pediu nada disso",
        body: "Você ligou para o telefone que já estava salvo. A Marina atendeu e disse que não pediu troca de endereço nenhuma. E pediu que você avise a segurança.",
        sourceLabel: "Ligação para o contato que já estava salvo",
      },
      transfer: {
        title: "Agora a mesma coisa, mas no chat",
        context: "Outro dia, no chat da empresa. Uma conta conhecida pede para mandar o material para um lugar novo.",
        message: "Mudamos o depósito agora. Responda por aqui e eu atualizo o sistema depois.",
      },
      finalActionOptions: COMMON_ACTION_OPTIONS,
      reportDetailOptions: COMMON_REPORT_OPTIONS,
    },
    allowlists: {
      messageIds: [
        "p1-order-opened",
        "p1-portal-reviewed",
        "p1-dispatch-confirmed",
        "p1-destination-change",
        "p1-process-question",
        "p1-pressure",
      ],
      correctMessageOrder: [
        "p1-order-opened",
        "p1-portal-reviewed",
        "p1-dispatch-confirmed",
        "p1-destination-change",
        "p1-process-question",
        "p1-pressure",
      ],
      acceptedTurningPointIds: ["p1-destination-change"],
      evidenceIds: [
        "p1-known-account",
        "p1-registered-address",
        "p1-process-change",
        "p1-urgency",
        "p1-compromise-hypothesis",
      ],
      evidenceClassificationIds: CLASSIFICATIONS,
      correctEvidenceClassifications: {
        "p1-known-account": "fact",
        "p1-registered-address": "fact",
        "p1-process-change": "fact",
        "p1-urgency": "indicator",
        "p1-compromise-hypothesis": "inference",
      },
      conclusionIds: CONCLUSIONS,
      correctProvisionalConclusionIds: ["malicious-probable", "inconclusive"],
      correctFinalConclusionId: "malicious-probable",
      confirmationRouteIds: CONFIRMATION_ROUTES,
      correctConfirmationRouteId: "registered-contact",
      finalActionIds: COMMON_ACTION_OPTIONS.map((option) => option.id),
      correctFinalActionId: "pause-confirm-report",
      reportDetailIds: COMMON_REPORT_OPTIONS.map((option) => option.id),
      safeReportDetailIds: [
        "sender-and-time",
        "observed-change",
        "verification-result",
        "preserved-context",
      ],
      requiresIncidentReport: true,
      transferDecisionIds: TRANSFER_DECISIONS,
      correctTransferDecisionId: "pause-use-known-route",
    },
    criticalControlIds: ["turning-point", "independent-route", "safe-action", "safe-report"],
    feedback: {
      success: "Você tratou a mudança como um pedido novo e foi conferir por fora.",
      review: "Conversa antiga explica a confiança. Mas não autoriza mudar o combinado.",
    },
    debrief: {
      title: "Conta correta não significa controle comprovado",
      body: "O fato observável é a mudança de destino e processo. Comprometimento é uma hipótese até a confirmação externa.",
    },
  }),
  packageDefinition({
    casePackageId: "mission:compromised-conversation:v2:p2-legitimate-change",
    activityId: CONVERSATION_RECONSTRUCTION_ACTIVITY_ID,
    activityVersion: CONVERSATION_RECONSTRUCTION_ACTIVITY_VERSION,
    status: "published",
    editorialDate: "2026-08-15",
    content: {
      pathId: "p2-legitimate-change",
      pathLabel: "A alteração legítima incompleta",
      summary: "Uma mudança verdadeira ainda precisa percorrer o processo de confirmação.",
      role: "Você organiza a janela de entrega de uma parceira conhecida.",
      caseTitle: "Agenda de recebimento · cobertura temporária",
      caseContext:
        "A conversa parece coerente, mas a solicitação ainda não está registrada. Reconstrua antes de agir.",
      messages: [
        {
          id: "p2-window-proposed",
          timeLabel: "Segunda · 11:10",
          sender: "Renata Alves · Norte Logística",
          address: "renata.alves@norte-logistica.example",
          body: "Reservei a janela de sexta, das 10h às 12h, conforme nosso calendário.",
        },
        {
          id: "p2-window-accepted",
          timeLabel: "Segunda · 11:34",
          sender: "Lucas",
          address: "lucas@casa-digital.example",
          body: "Janela registrada. Se houver ajuste, precisamos atualizar a agenda operacional.",
        },
        {
          id: "p2-vacation-notice",
          timeLabel: "Terça · 15:02",
          sender: "Renata Alves · Norte Logística",
          address: "renata.alves@norte-logistica.example",
          body: "Estarei de férias a partir de amanhã. O Paulo ficará como cobertura no diretório da parceria.",
        },
        {
          id: "p2-window-change",
          timeLabel: "Quarta · 09:06",
          sender: "Renata Alves · Norte Logística",
          address: "renata.alves@norte-logistica.example",
          body: "Conseguimos antecipar para quinta às 16h. Pode confirmar por esta mensagem?",
        },
        {
          id: "p2-record-question",
          timeLabel: "Quarta · 09:14",
          sender: "Lucas",
          address: "lucas@casa-digital.example",
          body: "A agenda continua com sexta. Vou confirmar com a cobertura cadastrada antes de atualizar.",
        },
        {
          id: "p2-friendly-pressure",
          timeLabel: "Quarta · 09:18",
          sender: "Renata Alves · Norte Logística",
          address: "renata.alves@norte-logistica.example",
          body: "Sem problema. Se puder confirmar logo, ajuda o time a fechar a rota.",
        },
      ],
      initialMessageOrder: [
        "p2-friendly-pressure",
        "p2-window-proposed",
        "p2-window-change",
        "p2-vacation-notice",
        "p2-record-question",
        "p2-window-accepted",
      ],
      evidence: [
        {
          id: "p2-known-account",
          title: "Conta conhecida",
          source: "Cabeçalho da conversa",
          detail: "O endereço coincide com o histórico da parceria.",
        },
        {
          id: "p2-unregistered-change",
          title: "Agenda ainda sem alteração",
          source: "Agenda operacional",
          detail: "A janela publicada ainda é sexta, das 10h às 12h.",
        },
        {
          id: "p2-process-change",
          title: "Confirmação fora do fluxo",
          source: "Linha reconstruída",
          detail: "A mudança foi pedida antes de aparecer na agenda operacional.",
        },
        {
          id: "p2-vacation-context",
          title: "Cobertura registrada",
          source: "Mensagem anterior e diretório",
          detail: "Há um substituto oficial informado antes do pedido atual.",
        },
        {
          id: "p2-compromise-hypothesis",
          title: "Conta possivelmente comprometida",
          source: "Hipótese de investigação",
          detail: "A falta de registro permite investigar, mas não comprova invasão.",
        },
      ],
      consequence: {
        title: "A cobertura confirma uma mudança legítima",
        body: "Paulo confirma pelo contato do diretório que a janela mudou e registra a atualização no fluxo operacional.",
        sourceLabel: "Confirmação com a cobertura previamente cadastrada",
      },
      transfer: {
        title: "Verificar não é acusar",
        context: "Uma mensagem em ferramenta de projeto pede antecipação de uma reunião sem atualizar o calendário.",
        message: "A sala mudou. Confirme comigo por aqui e ajustamos o convite depois.",
      },
      finalActionOptions: COMMON_ACTION_OPTIONS,
      reportDetailOptions: COMMON_REPORT_OPTIONS,
    },
    allowlists: {
      messageIds: [
        "p2-window-proposed",
        "p2-window-accepted",
        "p2-vacation-notice",
        "p2-window-change",
        "p2-record-question",
        "p2-friendly-pressure",
      ],
      correctMessageOrder: [
        "p2-window-proposed",
        "p2-window-accepted",
        "p2-vacation-notice",
        "p2-window-change",
        "p2-record-question",
        "p2-friendly-pressure",
      ],
      acceptedTurningPointIds: ["p2-window-change"],
      evidenceIds: [
        "p2-known-account",
        "p2-unregistered-change",
        "p2-process-change",
        "p2-vacation-context",
        "p2-compromise-hypothesis",
      ],
      evidenceClassificationIds: CLASSIFICATIONS,
      correctEvidenceClassifications: {
        "p2-known-account": "fact",
        "p2-unregistered-change": "fact",
        "p2-process-change": "fact",
        "p2-vacation-context": "fact",
        "p2-compromise-hypothesis": "inference",
      },
      conclusionIds: CONCLUSIONS,
      correctProvisionalConclusionIds: ["inconclusive"],
      correctFinalConclusionId: "legitimate",
      confirmationRouteIds: CONFIRMATION_ROUTES,
      correctConfirmationRouteId: "registered-contact",
      finalActionIds: COMMON_ACTION_OPTIONS.map((option) => option.id),
      correctFinalActionId: "pause-confirm-normal-process",
      reportDetailIds: COMMON_REPORT_OPTIONS.map((option) => option.id),
      safeReportDetailIds: [],
      requiresIncidentReport: false,
      transferDecisionIds: TRANSFER_DECISIONS,
      correctTransferDecisionId: "pause-use-known-route",
    },
    criticalControlIds: ["turning-point", "independent-route", "safe-action"],
    feedback: {
      success: "Você confirmou sem acusar e retomou apenas depois do registro oficial.",
      review: "Uma solicitação legítima ainda precisa cumprir o processo antes da execução.",
    },
    debrief: {
      title: "Verificação é compatível com confiança",
      body: "O pedido era legítimo, mas estava inconclusivo no momento inicial. A confirmação externa resolveu a incerteza.",
    },
  }),
  packageDefinition({
    casePackageId: "mission:compromised-conversation:v2:p3-scope-change",
    activityId: CONVERSATION_RECONSTRUCTION_ACTIVITY_ID,
    activityVersion: CONVERSATION_RECONSTRUCTION_ACTIVITY_VERSION,
    status: "published",
    editorialDate: "2026-08-15",
    content: {
      pathId: "p3-scope-change",
      pathLabel: "O chamado fora do padrão",
      summary: "Um chamado interno verdadeiro passa a pedir informação que nunca fez parte do fluxo.",
      role: "Você acompanha um chamado fictício de suporte sobre sincronização de arquivos.",
      caseTitle: "Chamado CDS-1847 · sincronização",
      caseContext:
        "O assunto e o jargão são reais. Descubra quando o escopo mudou e qual canal deve confirmar o pedido.",
      messages: [
        {
          id: "p3-ticket-opened",
          timeLabel: "Segunda · 13:05",
          sender: "Central de Serviços",
          address: "central@servicos.casa-digital.example",
          body: "Chamado CDS-1847 aberto para corrigir a sincronização da pasta Projetos.",
        },
        {
          id: "p3-diagnostic-request",
          timeLabel: "Segunda · 13:22",
          sender: "Central de Serviços",
          address: "central@servicos.casa-digital.example",
          body: "Envie somente o código do erro exibido na área oficial do chamado.",
        },
        {
          id: "p3-diagnostic-sent",
          timeLabel: "Segunda · 13:31",
          sender: "Lucas",
          address: "lucas@casa-digital.example",
          body: "Registrei o código de erro no chamado. A sincronização voltou ao normal.",
        },
        {
          id: "p3-ticket-closed",
          timeLabel: "Segunda · 14:02",
          sender: "Central de Serviços",
          address: "central@servicos.casa-digital.example",
          body: "Chamado concluído. Qualquer nova solicitação deve ser aberta pela área oficial.",
        },
        {
          id: "p3-scope-change",
          timeLabel: "Quinta · 08:47",
          sender: "Central de Serviços",
          address: "central@servicos.casa-digital.example",
          body: "Retomando o CDS-1847: envie a lista de pessoas com acesso à pasta para evitarmos uma nova falha.",
        },
        {
          id: "p3-avoid-process",
          timeLabel: "Quinta · 08:50",
          sender: "Central de Serviços",
          address: "central@servicos.casa-digital.example",
          body: "Não reabra o chamado; isso atrasaria a correção. Pode responder diretamente nesta conversa.",
        },
      ],
      initialMessageOrder: [
        "p3-avoid-process",
        "p3-ticket-opened",
        "p3-ticket-closed",
        "p3-diagnostic-request",
        "p3-scope-change",
        "p3-diagnostic-sent",
      ],
      evidence: [
        {
          id: "p3-known-account",
          title: "Conta interna conhecida",
          source: "Cabeçalho da conversa",
          detail: "O endereço pertence ao domínio fictício usado pela central.",
        },
        {
          id: "p3-closed-ticket",
          title: "Chamado encerrado",
          source: "Histórico oficial",
          detail: "O CDS-1847 foi concluído e novas solicitações exigem outro registro.",
        },
        {
          id: "p3-scope-change-evidence",
          title: "Novo dado solicitado",
          source: "Linha reconstruída",
          detail: "A lista de acessos não fazia parte do diagnóstico original.",
        },
        {
          id: "p3-avoid-official-route",
          title: "Pedido para evitar o sistema",
          source: "Última mensagem",
          detail: "A conversa tenta substituir a área oficial do chamado.",
        },
        {
          id: "p3-compromise-hypothesis",
          title: "Conta possivelmente comprometida",
          source: "Hipótese de investigação",
          detail: "O comportamento permite levantar a hipótese, não confirmar a causa técnica.",
        },
      ],
      consequence: {
        title: "A área oficial não reconhece o novo pedido",
        body: "O catálogo de serviços informa que o chamado permanece encerrado e que a central não solicita listas de acesso por e-mail.",
        sourceLabel: "Consulta simulada na área oficial de serviços",
      },
      transfer: {
        title: "Jargão correto, processo errado",
        context: "Em um canal de projeto fictício, uma conta interna menciona um projeto real e pede a relação de participantes.",
        message: "Já conheço o projeto Atlas. Cole a lista aqui para eu ajustar as permissões sem abrir outro chamado.",
      },
      finalActionOptions: COMMON_ACTION_OPTIONS,
      reportDetailOptions: COMMON_REPORT_OPTIONS,
    },
    allowlists: {
      messageIds: [
        "p3-ticket-opened",
        "p3-diagnostic-request",
        "p3-diagnostic-sent",
        "p3-ticket-closed",
        "p3-scope-change",
        "p3-avoid-process",
      ],
      correctMessageOrder: [
        "p3-ticket-opened",
        "p3-diagnostic-request",
        "p3-diagnostic-sent",
        "p3-ticket-closed",
        "p3-scope-change",
        "p3-avoid-process",
      ],
      acceptedTurningPointIds: ["p3-scope-change"],
      evidenceIds: [
        "p3-known-account",
        "p3-closed-ticket",
        "p3-scope-change-evidence",
        "p3-avoid-official-route",
        "p3-compromise-hypothesis",
      ],
      evidenceClassificationIds: CLASSIFICATIONS,
      correctEvidenceClassifications: {
        "p3-known-account": "fact",
        "p3-closed-ticket": "fact",
        "p3-scope-change-evidence": "fact",
        "p3-avoid-official-route": "indicator",
        "p3-compromise-hypothesis": "inference",
      },
      conclusionIds: CONCLUSIONS,
      correctProvisionalConclusionIds: ["malicious-probable", "inconclusive"],
      correctFinalConclusionId: "malicious-probable",
      confirmationRouteIds: CONFIRMATION_ROUTES,
      correctConfirmationRouteId: "registered-contact",
      finalActionIds: COMMON_ACTION_OPTIONS.map((option) => option.id),
      correctFinalActionId: "refuse-check-official",
      reportDetailIds: COMMON_REPORT_OPTIONS.map((option) => option.id),
      safeReportDetailIds: [
        "sender-and-time",
        "observed-change",
        "verification-result",
        "preserved-context",
      ],
      requiresIncidentReport: true,
      transferDecisionIds: TRANSFER_DECISIONS,
      correctTransferDecisionId: "pause-use-known-route",
    },
    criticalControlIds: ["turning-point", "independent-route", "safe-action", "safe-report"],
    feedback: {
      success: "Você separou conhecimento interno de autorização e voltou ao sistema oficial.",
      review: "Assunto e jargão corretos não substituem escopo, registro e confirmação.",
    },
    debrief: {
      title: "Conhecimento de contexto não concede permissão",
      body: "A ruptura observável foi a mudança de escopo depois do encerramento. A causa técnica continuou incerta.",
    },
  }),
] as const;

export type ConversationReconstructionPackage =
  (typeof COMPROMISED_CONVERSATION_V2_PACKAGES)[number];

export function findConversationReconstructionPackage(casePackageId: string) {
  return (
    COMPROMISED_CONVERSATION_V2_PACKAGES.find(
      (contentPackage) => contentPackage.casePackageId === casePackageId,
    ) ?? null
  );
}
