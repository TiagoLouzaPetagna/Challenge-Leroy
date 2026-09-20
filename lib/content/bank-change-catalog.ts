import type {
  BankChangeEvidenceId,
  BankChangeEvidenceAssessmentId,
  BankChangeInitialActionId,
  BankChangeProcessActionId,
  BankChangeReportActionId,
  BankChangeStageId,
  BankChangeVerificationRouteId,
  CompetencyId,
} from "../domain/types";

export const BANK_CHANGE_ACTIVITY_ID = "team:bank-change";
export const BANK_CHANGE_ACTIVITY_VERSION = 1;

export const BANK_CHANGE_SCENARIO = {
  supplier: "Madeira Norte Componentes",
  senderName: "Renata Lopes",
  senderAddress: "renata.lopes@madeiranorte.example",
  subject: "Alteração bancária — pedido 8731",
  receivedAt: "Hoje, 10:14",
  paymentContext:
    "O pedido 8731, no valor de R$ 48.760,00, está previsto no lote de amanhã às 11h.",
  request:
    "Renata pede que o pagamento seja direcionado a uma nova conta ainda hoje. A conversa já existia, o pedido e o valor estão corretos e há um PDF com papel timbrado. A mensagem orienta confirmar pelo novo número informado no documento.",
  registeredAccount: "Agência 0412 · conta final 2047",
  requestedAccount: "Agência 3180 · conta final 9916",
  registeredContact: "Contato homologado · telefone final 0187",
  suppliedContact: "Novo telefone informado no pedido · final 7742",
  registeredContactResponse:
    "O contato homologado confirma que a fornecedora não solicitou alteração bancária e pede o bloqueio preventivo do pedido.",
  procedure:
    "Toda alteração bancária exige confirmação independente por contato previamente cadastrado, registro no fluxo oficial e segunda aprovação antes de qualquer liberação.",
} as const;

export type BankChangeChoice<Id extends string> = {
  id: Id;
  label: string;
  detail: string;
  points: number;
  feedback: string;
  safe: boolean;
};

export type BankChangeStage = {
  id: BankChangeStageId;
  shortLabel: string;
  title: string;
  prompt: string;
  weight: number;
  competencyIds: CompetencyId[];
};

export const BANK_CHANGE_STAGES: readonly BankChangeStage[] = [
  {
    id: "initial-action",
    shortLabel: "Conter",
    title: "O que você faz primeiro?",
    prompt:
      "O lote será fechado amanhã. Escolha uma ação imediata antes de investigar a origem do pedido.",
    weight: 20,
    competencyIds: ["decidir"],
  },
  {
    id: "evidence-assessment",
    shortLabel: "Interpretar",
    title: "O que as evidências realmente provam?",
    prompt:
      "A conversa, o pedido, o valor e o PDF parecem coerentes. Avalie o limite dessas evidências.",
    weight: 20,
    competencyIds: ["verificar"],
  },
  {
    id: "verification-route",
    shortLabel: "Confirmar",
    title: "Por qual canal você confirma?",
    prompt:
      "Escolha uma rota que não dependa das informações entregues pela própria solicitação.",
    weight: 25,
    competencyIds: ["verificar"],
  },
  {
    id: "process-action",
    shortLabel: "Proteger",
    title: "Como o processo deve continuar?",
    prompt:
      "O contato homologado negou a mudança. Defina o tratamento do pagamento e de futuras alterações válidas.",
    weight: 20,
    competencyIds: ["decidir", "orientar"],
  },
  {
    id: "report-action",
    shortLabel: "Reportar",
    title: "O que deve entrar no reporte?",
    prompt:
      "Registre o possível comprometimento sem expor segredos nem espalhar a mensagem para colegas.",
    weight: 15,
    competencyIds: ["reportar"],
  },
] as const;

export const BANK_CHANGE_INITIAL_ACTIONS: readonly BankChangeChoice<BankChangeInitialActionId>[] = [
  {
    id: "pause-and-preserve",
    label: "Suspender a mudança e preservar o pedido",
    detail:
      "Interromper a alteração e o pagamento relacionado, mantendo mensagem e documento para verificação.",
    points: 20,
    feedback:
      "Correto: a pausa reduz o impacto sem destruir evidências nem assumir que o pedido é legítimo ou fraudulento.",
    safe: true,
  },
  {
    id: "reply-and-hold",
    label: "Responder que vai analisar e deixar o lote em espera",
    detail: "Evita pagar agora, mas mantém a validação dentro do canal possivelmente comprometido.",
    points: 10,
    feedback:
      "A espera ajuda, mas responder na mesma conversa não cria uma confirmação independente.",
    safe: false,
  },
  {
    id: "apply-now",
    label: "Atualizar agora para não perder o prazo",
    detail: "Usar o documento e os dados corretos do pedido como autorização suficiente.",
    points: 0,
    feedback:
      "A urgência é parte da pressão. Nenhuma mudança deve ocorrer antes da verificação independente.",
    safe: false,
  },
  {
    id: "ignore-request",
    label: "Excluir a mensagem e seguir com o lote",
    detail: "Descartar o pedido sem registrar nem verificar o possível comprometimento.",
    points: 0,
    feedback:
      "Excluir apaga contexto útil e não protege o processo contra novas tentativas.",
    safe: false,
  },
] as const;

export const BANK_CHANGE_EVIDENCE_ASSESSMENTS: readonly BankChangeChoice<BankChangeEvidenceAssessmentId>[] = [
  {
    id: "plausible-not-authenticated",
    label: "São sinais de plausibilidade, não de autenticidade",
    detail:
      "Uma conta comprometida pode preservar histórico, nomes, valores e documentos convincentes.",
    points: 20,
    feedback:
      "Exato: contexto correto ajuda a investigação, mas não autentica uma nova instrução bancária.",
    safe: true,
  },
  {
    id: "thread-proves-identity",
    label: "A conversa anterior prova quem enviou",
    detail: "O histórico existente seria suficiente para confiar no novo dado bancário.",
    points: 0,
    feedback:
      "Contas reais podem ser comprometidas. O histórico torna o golpe convincente, não seguro.",
    safe: false,
  },
  {
    id: "document-proves-change",
    label: "O PDF timbrado comprova a mudança",
    detail: "A aparência formal do documento seria uma autorização independente.",
    points: 0,
    feedback:
      "Papel timbrado e assinatura visual podem ser copiados ou produzidos por quem controla a conta.",
    safe: false,
  },
  {
    id: "urgency-supports-request",
    label: "O prazo curto reforça que o pedido é real",
    detail: "A proximidade do pagamento explicaria a exceção ao processo.",
    points: 5,
    feedback:
      "O prazo explica a pressão, mas não valida identidade, conta ou autorização.",
    safe: false,
  },
] as const;

export const BANK_CHANGE_VERIFICATION_ROUTES: readonly BankChangeChoice<BankChangeVerificationRouteId>[] = [
  {
    id: "registered-contact",
    label: "Usar o contato previamente cadastrado",
    detail:
      "Consultar o cadastro homologado e iniciar uma nova ligação pelo telefone já registrado.",
    points: 25,
    feedback:
      "Correto: o canal vem de uma fonte anterior e não das informações controladas pela solicitação.",
    safe: true,
  },
  {
    id: "public-search",
    label: "Buscar um telefone na internet",
    detail: "Procurar um contato público sem usar o cadastro interno existente.",
    points: 5,
    feedback:
      "É uma tentativa de sair da conversa, mas resultados públicos também podem estar errados ou manipulados.",
    safe: false,
  },
  {
    id: "request-contact",
    label: "Ligar para o novo número do PDF",
    detail: "Confirmar pelo telefone fornecido junto com a alteração.",
    points: 0,
    feedback:
      "O contato entregue pela própria solicitação não é independente e pode levar ao atacante.",
    safe: false,
  },
  {
    id: "same-thread",
    label: "Pedir confirmação na mesma conversa",
    detail: "Responder ao remetente que enviou a mudança.",
    points: 0,
    feedback:
      "Se a conta estiver comprometida, a confirmação volta para a mesma pessoa que criou o pedido.",
    safe: false,
  },
] as const;

export const BANK_CHANGE_PROCESS_ACTIONS: readonly BankChangeChoice<BankChangeProcessActionId>[] = [
  {
    id: "block-report-second-approval",
    label: "Manter bloqueio, abrir o fluxo e exigir segunda aprovação",
    detail:
      "O pedido atual fica suspenso; qualquer mudança futura recomeça pelo processo oficial completo.",
    points: 20,
    feedback:
      "Correto: confirmação independente e segunda aprovação são controles complementares, não substitutos.",
    safe: true,
  },
  {
    id: "pay-old-account-now",
    label: "Pagar a conta antiga para cumprir o prazo",
    detail: "Ignorar a troca, mas liberar o pagamento antes de encerrar o incidente.",
    points: 5,
    feedback:
      "A conta antiga reduz um risco, mas o pagamento deve permanecer suspenso até o tratamento oficial do incidente.",
    safe: false,
  },
  {
    id: "supervisor-only-approval",
    label: "Atualizar se o supervisor aprovar",
    detail: "Usar uma aprovação interna como substituta da confirmação do fornecedor.",
    points: 0,
    feedback:
      "A segunda aprovação não autentica o fornecedor e não substitui o contato independente.",
    safe: false,
  },
  {
    id: "update-and-review-later",
    label: "Atualizar agora e revisar depois",
    detail: "Registrar a exceção para investigação após o pagamento.",
    points: 0,
    feedback:
      "Revisar depois não recupera um pagamento desviado. O controle precisa ocorrer antes da alteração.",
    safe: false,
  },
] as const;

export const BANK_CHANGE_REPORT_ACTIONS: readonly BankChangeChoice<BankChangeReportActionId>[] = [
  {
    id: "official-complete-report",
    label: "Reportar pelo canal oficial com contexto operacional",
    detail:
      "Informar remetente, horário, pedido, ação tomada e confirmação independente, sem senhas ou códigos.",
    points: 15,
    feedback:
      "Correto: o reporte preserva contexto acionável, evita segredos e permite contenção coordenada.",
    safe: true,
  },
  {
    id: "finance-only",
    label: "Avisar somente o Financeiro",
    detail: "Pedir que o pagamento continue bloqueado, sem registrar possível comprometimento.",
    points: 5,
    feedback:
      "O Financeiro precisa saber, mas o canal oficial também deve receber o possível comprometimento.",
    safe: false,
  },
  {
    id: "team-chat-forward",
    label: "Encaminhar tudo no chat da equipe",
    detail: "Compartilhar mensagem, PDF e contatos para alertar colegas.",
    points: 0,
    feedback:
      "Espalhar o conteúdo amplia exposição e não substitui um reporte controlado pelo canal oficial.",
    safe: false,
  },
  {
    id: "wait-for-more",
    label: "Aguardar outra tentativa antes de reportar",
    detail: "Manter o bloqueio local sem avisar a área responsável.",
    points: 0,
    feedback:
      "Reportar cedo permite proteger outras pessoas e investigar a conta comprometida.",
    safe: false,
  },
] as const;

export const BANK_CHANGE_EVIDENCE: readonly {
  id: BankChangeEvidenceId;
  label: string;
  summary: string;
  detail: string;
}[] = [
  {
    id: "request-context",
    label: "Solicitação recebida",
    summary: "Conversa, pedido e documento parecem consistentes.",
    detail: BANK_CHANGE_SCENARIO.request,
  },
  {
    id: "payment-schedule",
    label: "Lote de pagamento",
    summary: "Existe pressão real de prazo.",
    detail: BANK_CHANGE_SCENARIO.paymentContext,
  },
  {
    id: "vendor-record",
    label: "Cadastro homologado",
    summary: `${BANK_CHANGE_SCENARIO.registeredAccount} · ${BANK_CHANGE_SCENARIO.registeredContact}`,
    detail:
      "O cadastro existente não contém o novo telefone nem a conta indicada na solicitação.",
  },
  {
    id: "official-procedure",
    label: "Procedimento de alteração",
    summary: "Confirmação independente e segunda aprovação são obrigatórias.",
    detail: BANK_CHANGE_SCENARIO.procedure,
  },
  {
    id: "registered-contact-response",
    label: "Retorno do contato cadastrado",
    summary: "A fornecedora nega a mudança.",
    detail: BANK_CHANGE_SCENARIO.registeredContactResponse,
  },
] as const;

export const BANK_CHANGE_CORRECT_CHOICES = {
  initialActionId: "pause-and-preserve",
  evidenceAssessmentId: "plausible-not-authenticated",
  verificationRouteId: "registered-contact",
  processActionId: "block-report-second-approval",
  reportActionId: "official-complete-report",
} as const;

export const BANK_CHANGE_CRITICAL_STAGES: readonly BankChangeStageId[] = [
  "initial-action",
  "verification-route",
  "process-action",
  "report-action",
] as const;

export function findBankChangeStage(stageId: BankChangeStageId) {
  return BANK_CHANGE_STAGES.find((stage) => stage.id === stageId) ?? null;
}

