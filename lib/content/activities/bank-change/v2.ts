import type { ActivityContentPackage } from "../../../activities/content";

export const BANK_CHANGE_PROCESS_ACTIVITY_ID = "team:bank-change" as const;
export const BANK_CHANGE_PROCESS_ACTIVITY_VERSION = 2 as const;
export const BANK_CHANGE_PROCESS_MECHANIC_ID = "process-station" as const;

export type BankComparisonId =
  | "account-changed"
  | "contact-changed"
  | "exception-requested"
  | "deadline-is-not-authorization"
  | "order-matches"
  | "sender-matches";

export type BankContactSourceId =
  | "registered-directory"
  | "request-document"
  | "same-thread"
  | "public-search";

export type BankProcessGroupId = "process" | "outside-process";

export type BankProcessCardId =
  | "suspend-change"
  | "preserve-request"
  | "confirm-registered-contact"
  | "keep-block"
  | "open-official-flow"
  | "require-second-approval"
  | "report-compromise"
  | "update-requested-account"
  | "pay-old-account"
  | "manager-approval-only"
  | "forward-team-chat";

export type BankReportBlockId =
  | "sender-and-time"
  | "supplier-and-order"
  | "requested-change"
  | "containment-taken"
  | "verification-source-and-response"
  | "full-bank-details"
  | "password-or-code"
  | "unverified-accusation";

export type BankProcessContent = {
  role: string;
  situation: string;
  task: string;
  protectedOutcome: string;
  supplier: string;
  request: {
    sender: string;
    address: string;
    receivedAt: string;
    order: string;
    amount: string;
    bankAccount: string;
    contact: string;
    requestedException: string;
  };
  record: {
    order: string;
    amount: string;
    bankAccount: string;
    contact: string;
    procedure: string;
  };
  comparisonOptions: readonly { id: BankComparisonId; label: string; detail: string }[];
  contactOptions: readonly { id: BankContactSourceId; label: string; source: string; consequence: string }[];
  processCards: readonly { id: BankProcessCardId; label: string; detail: string }[];
  reportBlocks: readonly { id: BankReportBlockId; label: string; detail: string }[];
};

export type BankProcessAllowlists = {
  comparisonIds: readonly BankComparisonId[];
  requiredComparisonIds: readonly BankComparisonId[];
  contactSourceIds: readonly BankContactSourceId[];
  correctContactSourceId: BankContactSourceId;
  processCardIds: readonly BankProcessCardId[];
  requiredProcessCardIds: readonly BankProcessCardId[];
  unsafeProcessCardIds: readonly BankProcessCardId[];
  requiredRelations: readonly { before: BankProcessCardId; after: BankProcessCardId }[];
  reportBlockIds: readonly BankReportBlockId[];
  requiredReportBlockIds: readonly BankReportBlockId[];
  unsafeReportBlockIds: readonly BankReportBlockId[];
};

const content: BankProcessContent = {
  role: "Você confere os pedidos antes de liberar os pagamentos do dia.",
  situation:
    "A fornecedora Madeira Norte pediu, numa conversa de sempre, para depositar em outra conta. O pedido e o valor batem. Mas a troca chegou em cima da hora e traz um telefone novo no próprio documento.",
  task:
    "Compare o pedido com o cadastro, decida por onde confirmar e monte os passos que seguram o pagamento até ter certeza.",
  protectedOutcome:
    "Impedir que um pedido bem feito pule a conferência e o dinheiro vá para a conta errada.",
  supplier: "Madeira Norte Componentes",
  request: {
    sender: "Renata Lopes",
    address: "renata.lopes@madeiranorte.example",
    receivedAt: "Hoje, 10:14",
    order: "Pedido 8731",
    amount: "R$ 48.760,00",
    bankAccount: "Agência 3180 · conta final 9916",
    contact: "Telefone informado no PDF · final 7742",
    requestedException: "Alterar a conta hoje para entrar no lote de amanhã às 11h.",
  },
  record: {
    order: "Pedido 8731",
    amount: "R$ 48.760,00",
    bankAccount: "Agência 0412 · conta final 2047",
    contact: "Contato homologado · telefone final 0187",
    procedure:
      "Confirmar pelo contato previamente cadastrado, registrar no fluxo oficial e exigir segunda aprovação antes de qualquer mudança.",
  },
  comparisonOptions: [
    { id: "account-changed", label: "A conta bancária é outra", detail: "Não é a conta que está no cadastro." },
    { id: "contact-changed", label: "O telefone é novo", detail: "E veio no mesmo papel que pede a troca." },
    { id: "exception-requested", label: "Estão pedindo para abrir uma exceção", detail: "A pressa serve para pular a conferência." },
    { id: "deadline-is-not-authorization", label: "Ter prazo não é autorização", detail: "O lote é real, mas isso não confirma a conta nova." },
    { id: "order-matches", label: "O número do pedido é diferente", detail: "Na verdade o pedido 8731 é o mesmo nos dois." },
    { id: "sender-matches", label: "Veio do e-mail de sempre, então pode", detail: "A conta pode ser real e mesmo assim estar invadida." },
  ],
  contactOptions: [
    { id: "registered-directory", label: "O contato que já estava no cadastro", source: "Cadastrado antes deste pedido", consequence: "O contato cadastrado informa que a fornecedora não pediu a alteração e solicita o bloqueio preventivo do pedido." },
    { id: "request-document", label: "O telefone que veio no documento", source: "O próprio papel que pede a troca", consequence: "A pessoa que atende confirma a nova conta, mas esse contato veio da solicitação e não é uma confirmação independente." },
    { id: "same-thread", label: "Responder ali mesmo no e-mail", source: "A conta que mandou o pedido", consequence: "A conversa repete a instrução. Se a conta estiver comprometida, o pedido continua confirmando a si mesmo." },
    { id: "public-search", label: "O primeiro telefone que aparece no Google", source: "Resultado de busca, sem ligação com o cadastro", consequence: "O resultado não comprova que o contato pertence ao fornecedor nem que possui autorização para confirmar a mudança." },
  ],
  processCards: [
    { id: "suspend-change", label: "Segurar a troca e o pagamento", detail: "Nada acontece até você ter certeza." },
    { id: "preserve-request", label: "Guardar a mensagem e o documento", detail: "Sem eles ninguém consegue analisar depois." },
    { id: "confirm-registered-contact", label: "Ligar para o contato do cadastro", detail: "O número que já existia antes do pedido." },
    { id: "keep-block", label: "Manter tudo parado depois da negativa", detail: "Se o fornecedor diz que não pediu, não libera." },
    { id: "open-official-flow", label: "Abrir um chamado oficial", detail: "Deixa o caso registrado no sistema." },
    { id: "require-second-approval", label: "Pedir uma segunda aprovação", detail: "Ajuda, mas não substitui a confirmação." },
    { id: "report-compromise", label: "Avisar que a conta pode estar invadida", detail: "Conta os fatos para quem investiga." },
    { id: "update-requested-account", label: "Trocar a conta no sistema", detail: "Seria fazer a mudança antes de confirmar." },
    { id: "pay-old-account", label: "Pagar na conta antiga agora mesmo", detail: "Ainda libera dinheiro com o caso em aberto." },
    { id: "manager-approval-only", label: "Só pedir o ok do gestor", detail: "Ok de dentro não confirma o que o fornecedor pediu." },
    { id: "forward-team-chat", label: "Jogar tudo no chat da equipe", detail: "Espalha o caso sem registrar em lugar nenhum." },
  ],
  reportBlocks: [
    { id: "sender-and-time", label: "Quem mandou e a que horas", detail: "Ajuda a localizar o caso." },
    { id: "supplier-and-order", label: "Fornecedor, número do pedido e valor", detail: "O básico para achar o pedido no sistema." },
    { id: "requested-change", label: "O que pediram para mudar", detail: "Que houve troca de conta e de telefone." },
    { id: "containment-taken", label: "O que você fez", detail: "Se segurou a troca e o pagamento." },
    { id: "verification-source-and-response", label: "Como você conferiu e o que ouviu", detail: "Para onde ligou e o que responderam." },
    { id: "full-bank-details", label: "Agência e conta completas", detail: "Isso não precisa ir no reporte." },
    { id: "password-or-code", label: "Sua senha ou código", detail: "Isso nunca entra em um reporte." },
    { id: "unverified-accusation", label: "Acusar uma pessoa sem evidência", detail: "Afirmação sobre quem teria feito a alteração." },
  ],
};

export const BANK_CHANGE_PROCESS_V2_PACKAGE: ActivityContentPackage<BankProcessContent, BankProcessAllowlists> = {
  activityId: BANK_CHANGE_PROCESS_ACTIVITY_ID,
  activityVersion: BANK_CHANGE_PROCESS_ACTIVITY_VERSION,
  casePackageId: "team:bank-change:v2:registered-supplier-change",
  status: "published",
  editorialDate: "2026-08-16",
  content,
  allowlists: {
    comparisonIds: content.comparisonOptions.map((item) => item.id),
    requiredComparisonIds: ["account-changed", "contact-changed", "exception-requested", "deadline-is-not-authorization"],
    contactSourceIds: content.contactOptions.map((item) => item.id),
    correctContactSourceId: "registered-directory",
    processCardIds: content.processCards.map((item) => item.id),
    requiredProcessCardIds: ["suspend-change", "preserve-request", "confirm-registered-contact", "keep-block", "open-official-flow", "require-second-approval", "report-compromise"],
    unsafeProcessCardIds: ["update-requested-account", "pay-old-account", "manager-approval-only", "forward-team-chat"],
    requiredRelations: [
      { before: "suspend-change", after: "confirm-registered-contact" },
      { before: "confirm-registered-contact", after: "keep-block" },
      { before: "keep-block", after: "open-official-flow" },
      { before: "open-official-flow", after: "require-second-approval" },
    ],
    reportBlockIds: content.reportBlocks.map((item) => item.id),
    requiredReportBlockIds: ["sender-and-time", "supplier-and-order", "requested-change", "containment-taken", "verification-source-and-response"],
    unsafeReportBlockIds: ["full-bank-details", "password-or-code", "unverified-accusation"],
  },
  criticalControlIds: ["contain-before-change", "independent-contact", "official-flow-and-second-approval", "safe-report"],
  feedback: {
    success: "Você manteve a mudança e o pagamento bloqueados até confirmar pelo cadastro e preservar o processo completo.",
    review: "O processo ainda contém um atalho: revise a origem do contato, a ordem dos controles ou os dados incluídos no reporte.",
  },
  debrief: {
    title: "Um pedido plausível não substitui o processo",
    body: "Pedido, valor, conversa e documento podem ser verdadeiros e ainda assim não autorizar um novo beneficiário. O controle decisivo começa fora da solicitação e continua com bloqueio, fluxo oficial e segunda aprovação.",
  },
};

export const BANK_CHANGE_PROCESS_CANONICAL_PACKAGE_ID = BANK_CHANGE_PROCESS_V2_PACKAGE.casePackageId;

export function findBankChangeProcessV2Package(casePackageId: string) {
  return casePackageId === BANK_CHANGE_PROCESS_V2_PACKAGE.casePackageId
    ? BANK_CHANGE_PROCESS_V2_PACKAGE
    : undefined;
}
