export type ProtocolActionId = "pause" | "verify" | "report" | "shortcut";

export type ProtocolAction = {
  id: ProtocolActionId;
  label: string;
};

export type TeamProtocolCase = {
  situation: string;
  from: string;
  subject: string;
  message: string;
  reference: string;
  actions: ProtocolAction[];
};

export type TeamProtocolBoard = {
  sectorId: string;
  sectorName: string;
  periodId: string;
  periodLabel: string;
  participants: number;
  safeDecisions: number | null;
  myOrder: ProtocolActionId[] | null;
};

export const SAFE_PROTOCOL_ORDER: readonly ProtocolActionId[] = ["pause", "verify", "report"];

export function currentTeamPeriod(now = new Date()) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Sao_Paulo",
    year: "numeric",
    month: "2-digit",
  }).formatToParts(now);
  const year = parts.find((part) => part.type === "year")?.value ?? "0000";
  const month = parts.find((part) => part.type === "month")?.value ?? "00";
  const label = new Intl.DateTimeFormat("pt-BR", {
    timeZone: "America/Sao_Paulo",
    month: "long",
    year: "numeric",
  }).format(now);
  return { id: `${year}-${month}`, label };
}

const SECTOR_CASES: Record<string, { request: string; reference: string; sender: string }> = {
  "centro-distribuicao": { request: "uma coleta fora do horário combinado", reference: "a programação do centro de distribuição", sender: "Transportadora parceira" },
  "loja-atendimento": { request: "uma alteração no atendimento de um cliente", reference: "o protocolo de atendimento", sender: "Central de atendimento" },
  "loja-comercio": { request: "uma entrega de um pedido de cliente", reference: "o pedido no sistema", sender: "Fornecedor" },
  "loja-gestao": { request: "uma alteração dos dados de pagamento", reference: "o cadastro do fornecedor", sender: "Financeiro do fornecedor" },
  "loja-logistica": { request: "uma mudança de endereço de entrega", reference: "a ordem de transporte", sender: "Transportadora parceira" },
  "loja-novos-negocios": { request: "uma proposta de parceria", reference: "a proposta registrada no sistema", sender: "Parceiro comercial" },
  "loja-servicos": { request: "uma mudança no agendamento de instalação", reference: "a ordem de serviço", sender: "Prestador de serviço" },
  "matriz-cadeia-suprimentos": { request: "uma mudança na entrega de um fornecedor", reference: "o contrato de fornecimento", sender: "Fornecedor" },
  "matriz-expansao": { request: "uma alteração no cronograma de uma obra", reference: "o contrato da obra", sender: "Empresa contratada" },
  "matriz-experiencia-atendimento-clientes": { request: "uma alteração em uma solicitação de cliente", reference: "o protocolo de atendimento", sender: "Central de atendimento" },
  "matriz-marketing": { request: "uma mudança nos arquivos de uma campanha", reference: "o planejamento da campanha", sender: "Agência parceira" },
  "matriz-novos-negocios": { request: "uma nova condição de parceria", reference: "a proposta aprovada", sender: "Parceiro comercial" },
  "matriz-oferta-produto": { request: "uma alteração no cadastro de um produto", reference: "o registro do produto", sender: "Fornecedor" },
  "matriz-performance-economico-financeira": { request: "uma alteração dos dados de pagamento", reference: "o cadastro do fornecedor", sender: "Financeiro do fornecedor" },
  "matriz-recursos-humanos": { request: "uma alteração de dados na folha de pagamento", reference: "o registro de pessoal", sender: "Contato externo" },
  "matriz-tecnologia": { request: "uma liberação urgente de acesso", reference: "o chamado de suporte", sender: "Equipe de suporte" },
  plataforma: { request: "uma mudança na transferência de estoque", reference: "a ordem de transferência", sender: "Operação logística" },
  televendas: { request: "uma alteração em um pedido de cliente", reference: "o pedido no sistema", sender: "Contato de vendas" },
  "casa-decoracao": { request: "uma entrega de itens de decoração", reference: "o pedido no sistema", sender: "Fornecedor de decoração" },
  ferramentas: { request: "um pedido de ferramentas", reference: "o pedido no sistema", sender: "Fornecedor de ferramentas" },
  tintas: { request: "uma encomenda de tintas", reference: "a encomenda no sistema", sender: "Fornecedor de tintas" },
  jardim: { request: "uma entrega de produtos de jardim", reference: "o pedido no sistema", sender: "Fornecedor de jardim" },
  madeiras: { request: "um pedido de madeiras", reference: "o pedido no sistema", sender: "Fornecedor de madeiras" },
  logistica: { request: "uma mudança de endereço de entrega", reference: "a ordem de transporte", sender: "Transportadora parceira" },
  atendimento: { request: "uma alteração no atendimento de um cliente", reference: "o protocolo de atendimento", sender: "Central de atendimento" },
  administracao: { request: "uma alteração dos dados de pagamento", reference: "o cadastro do fornecedor", sender: "Financeiro do fornecedor" },
  tecnologia: { request: "uma liberação urgente de acesso", reference: "o chamado de suporte", sender: "Equipe de suporte" },
};

export function getTeamProtocolCase(sectorId: string, periodId: string): TeamProtocolCase {
  const focus = SECTOR_CASES[sectorId] ?? {
    request: "uma alteração em um pedido da área",
    reference: "o registro interno do pedido",
    sender: "Contato externo",
  };
  const month = Number(periodId.slice(-2));
  const variation = Number.isFinite(month) ? month % 3 : 0;
  const subjectTopic = focus.request.replace(/^(um|uma) /, "");
  const message = variation === 0
    ? `Precisamos confirmar ${focus.request} ainda hoje. Use o telefone desta mensagem para liberar a mudança.`
    : variation === 1
      ? `Há uma atualização sobre ${focus.request}. Acesse o link enviado aqui para concluir a confirmação.`
      : `Enviamos novos dados para ${focus.request}. Confira o anexo e faça a alteração antes do prazo.`;
  const shortcutLabel = variation === 0
    ? "Usar o telefone desta mensagem para resolver mais rápido"
    : variation === 1
      ? "Usar o link desta mensagem para confirmar o pedido"
      : "Usar os dados do anexo para executar o pedido";

  return {
    situation: `Uma mensagem solicita ${focus.request}. Antes de agir, é preciso verificar por fora da mensagem.`,
    from: focus.sender,
    subject: `Solicitação: ${subjectTopic}`,
    message,
    reference: focus.reference,
    actions: [
      { id: "shortcut", label: shortcutLabel },
      { id: "report", label: "Se houver divergência, não executar e registrar no canal interno" },
      { id: "pause", label: "Pausar a alteração antes de executar o pedido" },
      { id: "verify", label: `Conferir ${focus.reference} e confirmar pelo contato já conhecido` },
    ],
  };
}

export function isProtocolOrder(value: unknown): value is ProtocolActionId[] {
  return Array.isArray(value) &&
    value.length === 3 &&
    new Set(value).size === 3 &&
    value.every((id) => id === "pause" || id === "verify" || id === "report" || id === "shortcut");
}

export function isSafeProtocolOrder(order: readonly ProtocolActionId[]): boolean {
  return SAFE_PROTOCOL_ORDER.every((id, index) => order[index] === id);
}
