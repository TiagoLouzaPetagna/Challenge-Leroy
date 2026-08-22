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
  role: "Você está conferindo o pedido antes de liberar o próximo lote de pagamentos.",
  situation:
    "A fornecedora Madeira Norte Componentes usa uma conversa conhecida para pedir uma nova conta bancária. O pedido e o valor conferem, mas a mudança chegou perto do fechamento do lote e traz um telefone novo no próprio documento.",
  task:
    "Compare o pedido com o cadastro, escolha de onde partirá a confirmação e monte um processo que impeça pagamento ou alteração antes da verificação.",
  protectedOutcome:
    "Evitar que um pedido convincente substitua os controles usados para confirmar fornecedor, beneficiário e autorização.",
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
    { id: "account-changed", label: "A conta bancária é diferente", detail: "O beneficiário solicitado não corresponde ao cadastro homologado." },
    { id: "contact-changed", label: "O telefone de confirmação é novo", detail: "O número veio no mesmo documento que pede a alteração." },
    { id: "exception-requested", label: "O pedido tenta abrir uma exceção", detail: "A urgência é usada para antecipar uma mudança sensível." },
    { id: "deadline-is-not-authorization", label: "O prazo não comprova autorização", detail: "O lote existe, mas não autentica a nova conta." },
    { id: "order-matches", label: "O número do pedido é diferente", detail: "Na verdade, o pedido 8731 coincide nos dois registros." },
    { id: "sender-matches", label: "O endereço conhecido autoriza a mudança", detail: "A conta pode ser real e ainda estar comprometida." },
  ],
  contactOptions: [
    { id: "registered-directory", label: "Contato homologado no cadastro", source: "Diretório interno criado antes desta solicitação", consequence: "O contato cadastrado informa que a fornecedora não pediu a alteração e solicita o bloqueio preventivo do pedido." },
    { id: "request-document", label: "Telefone informado no PDF", source: "O próprio documento que solicita a mudança", consequence: "A pessoa que atende confirma a nova conta, mas esse contato veio da solicitação e não é uma confirmação independente." },
    { id: "same-thread", label: "Responder na mesma conversa", source: "A conta de e-mail que enviou o pedido", consequence: "A conversa repete a instrução. Se a conta estiver comprometida, o pedido continua confirmando a si mesmo." },
    { id: "public-search", label: "Primeiro telefone encontrado em uma busca", source: "Resultado público sem vínculo com o cadastro", consequence: "O resultado não comprova que o contato pertence ao fornecedor nem que possui autorização para confirmar a mudança." },
  ],
  processCards: [
    { id: "suspend-change", label: "Suspender alteração e pagamento relacionado", detail: "Impede que a urgência produza um efeito antes da confirmação." },
    { id: "preserve-request", label: "Preservar mensagem e documento", detail: "Mantém os fatos necessários para análise e comunicação interna." },
    { id: "confirm-registered-contact", label: "Confirmar pelo contato cadastrado", detail: "A confirmação começa em uma fonte anterior ao pedido." },
    { id: "keep-block", label: "Manter o bloqueio após a negativa", detail: "A resposta do fornecedor impede a liberação do pedido atual." },
    { id: "open-official-flow", label: "Abrir o fluxo oficial", detail: "Registra o possível comprometimento e qualquer mudança futura." },
    { id: "require-second-approval", label: "Exigir segunda aprovação", detail: "Complementa a confirmação; não a substitui." },
    { id: "report-compromise", label: "Registrar possível comprometimento", detail: "Compartilha os fatos pelo processo fictício do exercício." },
    { id: "update-requested-account", label: "Atualizar a conta solicitada", detail: "Executaria a mudança antes de uma confirmação válida." },
    { id: "pay-old-account", label: "Pagar a conta antiga imediatamente", detail: "Ainda liberaria o pagamento antes de encerrar o incidente." },
    { id: "manager-approval-only", label: "Usar apenas a aprovação do gestor", detail: "Aprovação interna não autentica a instrução do fornecedor." },
    { id: "forward-team-chat", label: "Encaminhar tudo no chat da equipe", detail: "Espalha conteúdo sem substituir o registro controlado." },
  ],
  reportBlocks: [
    { id: "sender-and-time", label: "Remetente e horário", detail: "Quem apareceu como remetente e quando o pedido chegou." },
    { id: "supplier-and-order", label: "Fornecedor, pedido e valor", detail: "Contexto operacional suficiente para localizar o caso." },
    { id: "requested-change", label: "Mudança solicitada", detail: "Indicação mascarada de que houve troca de conta e contato." },
    { id: "containment-taken", label: "Contenção adotada", detail: "Alteração e pagamento relacionados foram suspensos." },
    { id: "verification-source-and-response", label: "Fonte consultada e resposta", detail: "Contato cadastrado negou a alteração." },
    { id: "full-bank-details", label: "Dados bancários completos", detail: "Detalhe excessivo que não é necessário para este reporte." },
    { id: "password-or-code", label: "Senha ou código temporário", detail: "Segredos nunca devem entrar no reporte." },
    { id: "unverified-accusation", label: "Acusar uma pessoa sem evidência", detail: "O caso sustenta possível comprometimento, não autoria comprovada." },
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
