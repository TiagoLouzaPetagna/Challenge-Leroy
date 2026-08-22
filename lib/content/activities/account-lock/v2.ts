import type { ActivityContentPackage } from "../../../activities/content";

export const PHISHING_FOUNDATION_ACTIVITY_ID = "mission:account-lock" as const;
export const PHISHING_FOUNDATION_ACTIVITY_VERSION = 2 as const;
export const PHISHING_FOUNDATION_MECHANIC_ID = "phishing-foundation" as const;
export const PHISHING_FOUNDATION_PACKAGE_ID =
  "mission:account-lock:v2:foundation-account-alert" as const;

export type FoundationRequestedActionId =
  | "confirm-account-from-message"
  | "read-notice-only"
  | "wait-for-manager";
export type FoundationProtectedAssetId =
  | "corporate-account"
  | "meeting-calendar"
  | "delivery-record";
export type FoundationConsequenceId =
  | "credential-or-session-exposure"
  | "temporary-delay"
  | "message-deletion";
export type FoundationPauseDecisionId =
  | "pause-before-message-action"
  | "open-message-first"
  | "delete-without-review";
export type FoundationEvaluationId =
  | "connect-request-asset-consequence"
  | "trust-corporate-appearance"
  | "treat-urgency-as-proof";
export type FoundationConfirmationRouteId =
  | "known-official-reference"
  | "generic-search"
  | "message-button"
  | "reply-to-message";
export type FoundationAssessmentId =
  | "suspicious-unconfirmed"
  | "confirmed-malicious"
  | "legitimate";
export type FoundationFinalActionId =
  | "keep-account-and-report"
  | "delete-only"
  | "continue-through-message"
  | "share-secret-with-support";
export type FoundationReportDetailId =
  | "sender-subject-time"
  | "requested-action"
  | "destination-preview"
  | "independent-check-result"
  | "password-or-code"
  | "personal-data";
export type FoundationTransferDecisionId =
  | "use-known-route-no-incident"
  | "report-as-attack"
  | "discard-without-checking"
  | "follow-message-instruction";

export type PhishingFoundationContent = {
  role: string;
  situation: string;
  task: string;
  protectedOutcome: string;
  message: {
    senderName: string;
    senderAddress: string;
    subject: string;
    receivedAt: string;
    body: readonly string[];
    buttonLabel: string;
    destinationPreview: string;
  };
  officialReference: {
    label: string;
    address: string;
    serviceStatus: string;
  };
  transfer: {
    title: string;
    senderName: string;
    senderAddress: string;
    subject: string;
    body: string;
    officialStatus: string;
  };
};

export type PhishingFoundationAllowlists = {
  requestedActionIds: readonly FoundationRequestedActionId[];
  protectedAssetIds: readonly FoundationProtectedAssetId[];
  consequenceIds: readonly FoundationConsequenceId[];
  pauseDecisionIds: readonly FoundationPauseDecisionId[];
  evaluationIds: readonly FoundationEvaluationId[];
  confirmationRouteIds: readonly FoundationConfirmationRouteId[];
  assessmentIds: readonly FoundationAssessmentId[];
  finalActionIds: readonly FoundationFinalActionId[];
  reportDetailIds: readonly FoundationReportDetailId[];
  transferDecisionIds: readonly FoundationTransferDecisionId[];
  correctRequestedActionId: FoundationRequestedActionId;
  correctProtectedAssetId: FoundationProtectedAssetId;
  correctConsequenceId: FoundationConsequenceId;
  correctPauseDecisionId: FoundationPauseDecisionId;
  correctEvaluationId: FoundationEvaluationId;
  correctConfirmationRouteId: FoundationConfirmationRouteId;
  correctAssessmentId: FoundationAssessmentId;
  correctFinalActionId: FoundationFinalActionId;
  safeReportDetailIds: readonly FoundationReportDetailId[];
  correctTransferDecisionId: FoundationTransferDecisionId;
};

export const FOUNDATION_REQUESTED_ACTION_OPTIONS = [
  {
    id: "confirm-account-from-message",
    label: "Abrir o botão recebido e confirmar a conta",
    detail: "É a ação que o aviso tenta provocar, ainda que você não deva executá-la.",
  },
  {
    id: "read-notice-only",
    label: "Apenas ler um comunicado sem fazer nada",
    detail: "Isso descreve uma mensagem informativa, não o pedido deste aviso.",
  },
  {
    id: "wait-for-manager",
    label: "Esperar uma autorização do gestor",
    detail: "O texto não apresenta essa etapa como pedido principal.",
  },
] as const;

export const FOUNDATION_ASSET_OPTIONS = [
  {
    id: "corporate-account",
    label: "Conta e credenciais corporativas",
    detail: "O botão pede uma confirmação ligada diretamente à sua conta de trabalho.",
  },
  {
    id: "meeting-calendar",
    label: "Agenda de reuniões",
    detail: "O aviso não menciona reunião, convite ou calendário.",
  },
  {
    id: "delivery-record",
    label: "Cadastro de uma entrega",
    detail: "Não existe pedido, pacote ou endereço de entrega neste caso.",
  },
] as const;

export const FOUNDATION_CONSEQUENCE_OPTIONS = [
  {
    id: "credential-or-session-exposure",
    label: "Entregar credenciais ou uma sessão a um destino não verificado",
    detail: "Uma página aberta pelo botão poderia receber sua senha ou assumir uma sessão autenticada.",
  },
  {
    id: "temporary-delay",
    label: "Atrasar uma tarefa por alguns minutos",
    detail: "Fazer uma pausa pode atrasar a ação, mas esse não é o risco principal de obedecer ao aviso.",
  },
  {
    id: "message-deletion",
    label: "Apagar somente a mensagem recebida",
    detail: "Excluir o e-mail é uma ação possível depois da análise, não uma consequência de informar dados.",
  },
] as const;

export const FOUNDATION_PAUSE_OPTIONS = [
  {
    id: "pause-before-message-action",
    label: "Pausar antes de usar qualquer controle da mensagem",
    detail: "A pausa cria espaço para entender o pedido e escolher outra rota.",
  },
  {
    id: "open-message-first",
    label: "Abrir o botão primeiro e avaliar a página depois",
    detail: "O destino recebido não pode confirmar a própria solicitação.",
  },
  {
    id: "delete-without-review",
    label: "Excluir imediatamente, sem entender ou registrar o caso",
    detail: "Evita o clique, mas perde contexto e não ajuda outras pessoas.",
  },
] as const;

export const FOUNDATION_EVALUATION_OPTIONS = [
  {
    id: "connect-request-asset-consequence",
    label: "Relacionar o pedido, o que ele afeta e a consequência possível",
    detail: "Aqui: abrir o botão pode expor a conta e as credenciais em um destino ainda não verificado.",
  },
  {
    id: "trust-corporate-appearance",
    label: "Usar o visual corporativo como confirmação",
    detail: "Cores, logotipo e tom profissional podem ser copiados e não confirmam a origem.",
  },
  {
    id: "treat-urgency-as-proof",
    label: "Tratar o prazo curto como prova de fraude",
    detail: "Urgência pede cautela, mas alertas legítimos também podem ter prazo.",
  },
] as const;

export const FOUNDATION_CONFIRMATION_OPTIONS = [
  {
    id: "known-official-reference",
    label: "Fechar o e-mail e abrir a Área oficial pela referência já conhecida",
    detail: "Você usa um favorito ou endereço que já utilizava antes do aviso; assim consulta o estado da conta sem depender da mensagem.",
  },
  {
    id: "generic-search",
    label: "Pesquisar o nome do serviço e abrir o primeiro resultado",
    detail: "Sair do e-mail ajuda, mas anúncios e resultados manipulados também podem levar a páginas falsas.",
  },
  {
    id: "message-button",
    label: "Usar o botão presente no próprio aviso",
    detail: "O próprio e-mail escolheria o destino da verificação; por isso ele continuaria servindo como prova de si mesmo.",
  },
  {
    id: "reply-to-message",
    label: "Responder ao remetente perguntando se o aviso é verdadeiro",
    detail: "Se o remetente for falso ou a conta estiver comprometida, quem enviou o aviso também poderá responder.",
  },
] as const;

export const FOUNDATION_ASSESSMENT_OPTIONS = [
  {
    id: "suspicious-unconfirmed",
    label: "É uma solicitação suspeita; não preciso provar a origem para agir com segurança",
    detail: "A Área oficial mostra que a conta está ativa. Isso basta para não usar o botão e reportar os fatos, mesmo sem identificar o autor.",
  },
  {
    id: "confirmed-malicious",
    label: "Está tecnicamente comprovado que o remetente é um atacante",
    detail: "A divergência torna o aviso suspeito, mas não identifica tecnicamente quem controla o endereço.",
  },
  {
    id: "legitimate",
    label: "É legítima porque usa aparência corporativa",
    detail: "A aparência do e-mail não supera o estado consultado na Área oficial.",
  },
] as const;

export const FOUNDATION_FINAL_ACTION_OPTIONS = [
  {
    id: "keep-account-and-report",
    label: "Não usar o botão, manter a conta e reportar pelo canal oficial",
    detail: "Você evita o destino do e-mail, preserva as informações do caso e alerta a equipe responsável.",
  },
  {
    id: "delete-only",
    label: "Apenas excluir e encerrar o assunto",
    detail: "Evita o clique, mas não permite que a equipe investigue ou proteja outras pessoas.",
  },
  {
    id: "continue-through-message",
    label: "Voltar ao aviso e continuar a confirmação",
    detail: "Isso ignora a consulta oficial que mostrou a conta ativa.",
  },
  {
    id: "share-secret-with-support",
    label: "Enviar senha ou código para o suporte validar",
    detail: "Senha e código não devem ser enviados a outra pessoa para confirmar um alerta.",
  },
] as const;

export const FOUNDATION_REPORT_OPTIONS = [
  {
    id: "sender-subject-time",
    label: "Remetente aparente, assunto e horário",
    detail: "São fatos observáveis no próprio e-mail.",
  },
  {
    id: "requested-action",
    label: "Ação solicitada pela mensagem",
    detail: "Explique que o aviso pediu para abrir um botão e confirmar a conta.",
  },
  {
    id: "destination-preview",
    label: "Prévia inerte do destino apresentado",
    detail: "Registre apenas o endereço exibido, sem abrir o destino.",
  },
  {
    id: "independent-check-result",
    label: "Resultado da consulta pela referência oficial conhecida",
    detail: "Informe que a Área oficial mostrou a conta ativa e sem bloqueio.",
  },
  {
    id: "password-or-code",
    label: "Senha ou código da conta",
    detail: "Segredos de acesso nunca pertencem a um reporte.",
  },
  {
    id: "personal-data",
    label: "Dados pessoais sem relação com o caso",
    detail: "Inclua somente informações necessárias para investigar o aviso.",
  },
] as const;

export const FOUNDATION_TRANSFER_OPTIONS = [
  {
    id: "use-known-route-no-incident",
    label: "Abrir a área oficial pela rota conhecida e seguir o processo normal",
    detail: "O aviso pode ser legítimo e ainda assim não precisa trazer um link.",
  },
  {
    id: "report-as-attack",
    label: "Reportar como ataque sem conferir o estado oficial",
    detail: "Mantém segurança, mas transforma qualquer alerta em incidente.",
  },
  {
    id: "discard-without-checking",
    label: "Descartar o aviso sem verificar a expiração",
    detail: "A conta pode exigir uma ação legítima pelo processo normal.",
  },
  {
    id: "follow-message-instruction",
    label: "Seguir a instrução recebida sem consultar outra referência",
    detail: "O processo deixa de ser independente.",
  },
] as const;

export const PHISHING_FOUNDATION_V2_PACKAGE: ActivityContentPackage<
  PhishingFoundationContent,
  PhishingFoundationAllowlists
> = {
  casePackageId: PHISHING_FOUNDATION_PACKAGE_ID,
  activityId: PHISHING_FOUNDATION_ACTIVITY_ID,
  activityVersion: PHISHING_FOUNDATION_ACTIVITY_VERSION,
  status: "published",
  editorialDate: "2026-08-15",
  content: {
    role: "Você está iniciando o expediente e precisa proteger sua conta sem interromper o trabalho.",
    situation:
      "Chegou um aviso inesperado dizendo que sua conta será bloqueada em 30 minutos. Não havia manutenção anunciada.",
    task:
      "Descubra o que a mensagem quer que você faça, o que essa ação pode afetar e conclua PARE antes de responder.",
    protectedOutcome:
      "Sua decisão deve manter a conta segura sem ignorar um alerta que poderia ser legítimo.",
    message: {
      senderName: "Central de Acessos",
      senderAddress: "suporte@seguranca-contas.example",
      subject: "Ação necessária: sua conta será bloqueada hoje",
      receivedAt: "Hoje · 08:12",
      body: [
        "Identificamos uma divergência em sua conta corporativa.",
        "Para evitar o bloqueio nos próximos 30 minutos, use o botão abaixo e confirme seus dados.",
      ],
      buttonLabel: "Confirmar conta",
      destinationPreview: "login-colaborador.example/validar",
    },
    officialReference: {
      label: "Área oficial de acesso · referência previamente conhecida",
      address: "acesso.casa-digital.example",
      serviceStatus:
        "Conta ativa. Não há bloqueio, divergência ou manutenção registrada.",
    },
    transfer: {
      title: "Agora, um alerta legítimo",
      senderName: "Identidade Corporativa",
      senderAddress: "identidade@casa-digital.example",
      subject: "Sua senha expira amanhã",
      body:
        "A senha corporativa expira amanhã. Não há link nesta mensagem. Quando for conveniente, abra a Área oficial de acesso pelo seu favorito.",
      officialStatus:
        "A área oficial confirma que a senha expira amanhã e oferece o fluxo normal de alteração.",
    },
  },
  allowlists: {
    requestedActionIds: FOUNDATION_REQUESTED_ACTION_OPTIONS.map(({ id }) => id),
    protectedAssetIds: FOUNDATION_ASSET_OPTIONS.map(({ id }) => id),
    consequenceIds: FOUNDATION_CONSEQUENCE_OPTIONS.map(({ id }) => id),
    pauseDecisionIds: FOUNDATION_PAUSE_OPTIONS.map(({ id }) => id),
    evaluationIds: FOUNDATION_EVALUATION_OPTIONS.map(({ id }) => id),
    confirmationRouteIds: FOUNDATION_CONFIRMATION_OPTIONS.map(({ id }) => id),
    assessmentIds: FOUNDATION_ASSESSMENT_OPTIONS.map(({ id }) => id),
    finalActionIds: FOUNDATION_FINAL_ACTION_OPTIONS.map(({ id }) => id),
    reportDetailIds: FOUNDATION_REPORT_OPTIONS.map(({ id }) => id),
    transferDecisionIds: FOUNDATION_TRANSFER_OPTIONS.map(({ id }) => id),
    correctRequestedActionId: "confirm-account-from-message",
    correctProtectedAssetId: "corporate-account",
    correctConsequenceId: "credential-or-session-exposure",
    correctPauseDecisionId: "pause-before-message-action",
    correctEvaluationId: "connect-request-asset-consequence",
    correctConfirmationRouteId: "known-official-reference",
    correctAssessmentId: "suspicious-unconfirmed",
    correctFinalActionId: "keep-account-and-report",
    safeReportDetailIds: [
      "sender-subject-time",
      "requested-action",
      "destination-preview",
      "independent-check-result",
    ],
    correctTransferDecisionId: "use-known-route-no-incident",
  },
  criticalControlIds: [
    "pause-before-action",
    "independent-confirmation",
    "safe-response",
    "safe-report",
    "legitimate-transfer",
  ],
  feedback: {
    success:
      "Você entendeu o pedido, protegeu a conta e confirmou por uma rota que não dependia da mensagem.",
    review:
      "A pausa ajuda, mas precisa terminar em confirmação independente e resposta proporcional.",
  },
  debrief: {
    title: "Phishing tenta provocar uma ação",
    body:
      "PARE transforma pressão em processo: pare, avalie o pedido e a consequência, reconfirme por uma fonte independente e então escale e responda. O mesmo processo também evita classificar todo alerta como golpe.",
  },
};

export function findPhishingFoundationPackage(casePackageId: string) {
  return casePackageId === PHISHING_FOUNDATION_PACKAGE_ID
    ? PHISHING_FOUNDATION_V2_PACKAGE
    : undefined;
}
