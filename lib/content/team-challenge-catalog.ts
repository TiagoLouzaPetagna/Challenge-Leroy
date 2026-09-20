import type {
  CompetencyId,
  EvidenceKey,
  SimulationActionKey,
} from "../domain/types";

export const TEAM_CHALLENGE_ID = "team:secure-inbox";
export const TEAM_CHALLENGE_VERSION = 1;

export type TeamChallengeCase = {
  id: string;
  sender: string;
  address: string;
  subject: string;
  preview: string;
  destination: string;
  context: string;
  kind: "legitimate" | "phishing" | "verify";
  expectedAction: SimulationActionKey;
  competencyId: Extract<
    CompetencyId,
    "observar" | "verificar" | "decidir"
  >;
  relevantEvidence: EvidenceKey[];
  explanation: string;
};

export const TEAM_CHALLENGE_CASES: TeamChallengeCase[] = [
  {
    id: "expected-delivery-schedule",
    sender: "Agenda de Entregas",
    address: "agenda@operacao-interna.example",
    subject: "Atualização da entrega já programada",
    preview: "O horário da entrega de amanhã foi ajustado em 30 minutos.",
    destination: "Portal interno demonstrativo, sem link ativo",
    context:
      "A equipe já aguardava essa entrega e o número do pedido coincide com o registro fictício do caso.",
    kind: "legitimate",
    expectedAction: "keep",
    competencyId: "observar",
    relevantEvidence: ["sender", "context"],
    explanation:
      "A solicitação corresponde ao contexto esperado e não pede credenciais ou ações fora do fluxo conhecido.",
  },
  {
    id: "urgent-qr-reactivation",
    sender: "Central de Acessos",
    address: "reativacao@acesso-urgente.example",
    subject: "Escaneie o QR Code para evitar bloqueio",
    preview: "Sua conta será suspensa hoje se a reativação não for concluída.",
    destination: "conta-segura-reativacao.example",
    context:
      "Nenhum chamado de acesso foi aberto e a mensagem usa urgência para direcionar a um domínio desconhecido.",
    kind: "phishing",
    expectedAction: "report",
    competencyId: "observar",
    relevantEvidence: ["link", "context"],
    explanation:
      "Urgência, contexto inesperado e destino desconhecido tornam o reporte a ação mais segura.",
  },
  {
    id: "unusual-manager-request",
    sender: "Gestão da área",
    address: "gestao.area@mensagens-internas.example",
    subject: "Preciso desta compra ainda hoje",
    preview: "Você consegue confirmar o pagamento antes da reunião?",
    destination: "Sem link; pedido enviado por mensagem",
    context:
      "O nome é conhecido, mas o pedido financeiro não segue o procedimento habitual e não possui solicitação registrada.",
    kind: "verify",
    expectedAction: "verify",
    competencyId: "verificar",
    relevantEvidence: ["sender", "context"],
    explanation:
      "A identidade aparente não basta. Um pedido incomum deve ser confirmado por outro canal conhecido.",
  },
  {
    id: "unexpected-invoice",
    sender: "Cobranças Parceiros",
    address: "faturamento@documentos-pendentes.example",
    subject: "Nota fiscal pendente — consulte o anexo",
    preview: "Abra o documento para evitar cobrança de juros.",
    destination: "Arquivo NF_pendente.zip, apenas representado no exercício",
    context:
      "Não existe fornecedor ou compra correspondente no contexto fictício apresentado.",
    kind: "phishing",
    expectedAction: "report",
    competencyId: "decidir",
    relevantEvidence: ["sender", "context"],
    explanation:
      "O anexo inesperado, a pressão e a ausência de contexto justificam interromper e reportar.",
  },
  {
    id: "scheduled-training",
    sender: "Universidade Corporativa",
    address: "universidade@aprendizagem-interna.example",
    subject: "Confirmação do treinamento de amanhã",
    preview: "Sua inscrição foi confirmada. Consulte o horário no portal interno.",
    destination: "Portal interno demonstrativo, sem link ativo",
    context:
      "A inscrição aparece na agenda fictícia e a mensagem não solicita senha, pagamento ou download.",
    kind: "legitimate",
    expectedAction: "keep",
    competencyId: "decidir",
    relevantEvidence: ["sender", "context"],
    explanation:
      "O contexto é coerente e não há pedido sensível. Reportar criaria um falso positivo desnecessário.",
  },
];

export const TEAM_ACTION_LABELS: Record<SimulationActionKey, string> = {
  keep: "Manter",
  verify: "Verificar por outro canal",
  report: "Reportar",
  delete: "Excluir",
};

export const DEMO_SECTOR_RANKING = [
  { id: "loja-atendimento", name: "Loja - Atendimento", score: 84 },
  { id: "loja-logistica", name: "Loja - Logística", score: 78 },
  { id: "loja-comercio", name: "Loja - Comércio", score: 71 },
  { id: "matriz-tecnologia", name: "Matriz - Tecnologia", score: 68 },
] as const;
