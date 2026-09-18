import type {
  RecoveryActionId,
  RecoveryImmediateActionId,
  RecoveryIncidentType,
  RecoveryReportDetailId,
} from "../domain/types";

export type RecoveryIncidentDefinition = {
  id: RecoveryIncidentType;
  sequenceLabel: string;
  title: string;
  shortLabel: string;
  summary: string;
  consequence: string;
  responseSummary: string;
  expectedActionIds: readonly RecoveryActionId[];
};

export const RECOVERY_INCIDENTS = [
  {
    id: "opened-message",
    sequenceLabel: "01",
    title: "Abri a mensagem",
    shortLabel: "Mensagem aberta",
    summary:
      "Você abriu o e-mail ou o chat, mas não selecionou links, anexos ou botões.",
    consequence:
      "Abrir uma mensagem não significa automaticamente que a conta foi comprometida. Ainda assim, preserve os dados e reporte a suspeita pelo canal oficial.",
    responseSummary:
      "Interrompa a interação, preserve remetente e horário e reporte sem encaminhar a mensagem aos colegas.",
    expectedActionIds: [
      "stop-interaction",
      "preserve-details",
      "report-official",
    ],
  },
  {
    id: "clicked-link",
    sequenceLabel: "02",
    title: "Cliquei em um link",
    shortLabel: "Link selecionado",
    summary:
      "A página foi aberta, mas você não digitou credenciais, aprovou acesso ou baixou um arquivo.",
    consequence:
      "O clique aumenta a necessidade de resposta, mas não prova sozinho que credenciais foram expostas. Pare de interagir e informe exatamente o que aconteceu.",
    responseSummary:
      "Feche a página, não insira dados, preserve o destino aparente e reporte rapidamente pelo caminho oficial.",
    expectedActionIds: [
      "stop-interaction",
      "preserve-details",
      "report-official",
    ],
  },
  {
    id: "entered-credentials",
    sequenceLabel: "03",
    title: "Informei minhas credenciais",
    shortLabel: "Credenciais informadas",
    summary:
      "Usuário e senha foram inseridos em uma página aberta a partir da mensagem suspeita.",
    consequence:
      "As credenciais podem ter sido capturadas. A prioridade é reportar, trocar a senha por uma rota conhecida e revisar sessões conforme a orientação oficial.",
    responseSummary:
      "Interrompa, reporte imediatamente, abra o serviço pelo endereço conhecido, troque a senha e revise as sessões ativas.",
    expectedActionIds: [
      "stop-interaction",
      "report-official",
      "change-password-known-route",
      "review-sessions",
    ],
  },
  {
    id: "approved-mfa",
    sequenceLabel: "04",
    title: "Aprovei uma autenticação",
    shortLabel: "MFA aprovado",
    summary:
      "Uma solicitação que você não iniciou foi aprovada no aplicativo de autenticação.",
    consequence:
      "A aprovação pode ter permitido uma sessão indevida. Negue novos pedidos, reporte e siga a revisão de acessos pelo canal oficial.",
    responseSummary:
      "Negue novas solicitações, reporte imediatamente, revise sessões e troque a senha pela rota conhecida quando orientado.",
    expectedActionIds: [
      "deny-further-mfa",
      "report-official",
      "review-sessions",
      "change-password-known-route",
    ],
  },
] as const satisfies readonly RecoveryIncidentDefinition[];

export const RECOVERY_IMMEDIATE_OPTIONS = [
  {
    id: "report-now",
    title: "Interromper e reportar agora",
    detail:
      "Parar a interação, usar o canal oficial e informar com precisão o que aconteceu antes de improvisar outras ações.",
  },
  {
    id: "secure-alone-first",
    title: "Tentar resolver sozinho antes de reportar",
    detail:
      "Realizar mudanças por conta própria e avisar somente depois, o que pode atrasar a resposta coordenada.",
  },
  {
    id: "wait-for-signs",
    title: "Esperar para ver se algo acontece",
    detail:
      "Continuar a rotina e reportar apenas se surgir um sinal posterior de comprometimento.",
  },
  {
    id: "hide-incident",
    title: "Apagar tudo e não contar",
    detail:
      "Tentar evitar consequências removendo a mensagem e escondendo a ação realizada.",
  },
] as const satisfies ReadonlyArray<{
  id: RecoveryImmediateActionId;
  title: string;
  detail: string;
}>;

export const RECOVERY_ACTION_OPTIONS = [
  {
    id: "stop-interaction",
    title: "Parar a interação",
    detail: "Fechar a página ou conversa e não inserir novos dados.",
    harmful: false,
  },
  {
    id: "preserve-details",
    title: "Preservar os detalhes",
    detail: "Manter remetente, horário, canal e destino aparente para análise.",
    harmful: false,
  },
  {
    id: "report-official",
    title: "Usar o canal oficial",
    detail: "Abrir a orientação corporativa por uma rota já conhecida.",
    harmful: false,
  },
  {
    id: "change-password-known-route",
    title: "Trocar a senha pela rota conhecida",
    detail: "Abrir o serviço independentemente da mensagem e seguir a orientação oficial.",
    harmful: false,
  },
  {
    id: "review-sessions",
    title: "Revisar sessões e acessos",
    detail: "Verificar sessões ativas e encerrar acessos não reconhecidos quando orientado.",
    harmful: false,
  },
  {
    id: "deny-further-mfa",
    title: "Negar novas solicitações de MFA",
    detail: "Não aprovar novas notificações enquanto o caso é tratado.",
    harmful: false,
  },
  {
    id: "delete-evidence",
    title: "Excluir mensagem e histórico",
    detail: "Remover informações que poderiam ajudar a entender o incidente.",
    harmful: true,
  },
  {
    id: "forward-to-colleagues",
    title: "Encaminhar para avisar colegas",
    detail: "Espalhar o conteúdo suspeito fora do fluxo oficial de reporte.",
    harmful: true,
  },
  {
    id: "continue-interaction",
    title: "Voltar à página para confirmar",
    detail: "Continuar usando o destino suspeito para descobrir se ele era verdadeiro.",
    harmful: true,
  },
] as const satisfies ReadonlyArray<{
  id: RecoveryActionId;
  title: string;
  detail: string;
  harmful: boolean;
}>;

export const RECOVERY_REPORT_DETAIL_OPTIONS = [
  {
    id: "received-channel",
    label: "Canal em que a mensagem ou solicitação chegou",
    safe: true,
  },
  {
    id: "occurred-at",
    label: "Horário aproximado do ocorrido",
    safe: true,
  },
  {
    id: "apparent-sender-destination",
    label: "Remetente e destino aparentes",
    safe: true,
  },
  {
    id: "action-taken",
    label: "Ação realizada: abriu, clicou, informou dados ou aprovou",
    safe: true,
  },
  {
    id: "affected-device",
    label: "Dispositivo utilizado, sem enviar dados secretos",
    safe: true,
  },
  {
    id: "password-or-code",
    label: "Senha ou código temporário para o suporte conferir",
    safe: false,
  },
] as const satisfies ReadonlyArray<{
  id: RecoveryReportDetailId;
  label: string;
  safe: boolean;
}>;

export const SAFE_RECOVERY_REPORT_DETAIL_IDS = new Set<RecoveryReportDetailId>(
  RECOVERY_REPORT_DETAIL_OPTIONS.filter((item) => item.safe).map(
    (item) => item.id,
  ),
);

export const HARMFUL_RECOVERY_ACTION_IDS = new Set<RecoveryActionId>(
  RECOVERY_ACTION_OPTIONS.filter((item) => item.harmful).map(
    (item) => item.id,
  ),
);

export function findRecoveryIncident(
  incidentType: RecoveryIncidentType,
): RecoveryIncidentDefinition {
  return (
    RECOVERY_INCIDENTS.find((incident) => incident.id === incidentType) ??
    RECOVERY_INCIDENTS[0]
  );
}
