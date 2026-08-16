import type { ActivityContentPackage } from "../../../activities/content";

export const WORKDAY_TRIAGE_ACTIVITY_ID = "simulation:workday" as const;
export const WORKDAY_TRIAGE_ACTIVITY_VERSION = 2 as const;
export const WORKDAY_TRIAGE_MECHANIC_ID = "batch-triage" as const;

export type WorkdayQueueId = "resolved" | "inconclusive";
export type WorkdayDraftQueueId = "inbox" | "investigate" | WorkdayQueueId;
export type WorkdayActionId = "proceed" | "verify" | "contain-report" | "dismiss";
export type WorkdayItemKind = "legitimate" | "malicious" | "inconclusive";

export type WorkdayEvidence = {
  id: string;
  label: string;
  value: string;
  explanation: string;
};

export type WorkdayItem = {
  id: string;
  channelLabel: string;
  senderLabel: string;
  sourceLabel: string;
  title: string;
  preview: string;
  body: string;
  receivedAt: string;
  impactLabel: string;
  evidence: readonly WorkdayEvidence[];
};

export type WorkdayTransferCase = {
  title: string;
  context: string;
  actionOptions: readonly { id: WorkdayActionId; label: string }[];
  evidenceOptions: readonly { id: string; label: string }[];
};

export type WorkdayTriageContent = {
  pathId: "p1-opening" | "p2-priority-change" | "p3-returned-pending";
  pathLabel: string;
  openingContext: string;
  task: string;
  items: readonly WorkdayItem[];
  transfer: WorkdayTransferCase;
};

export type WorkdayTriageAllowlists = {
  itemIds: readonly string[];
  evidenceIdsByItemId: Readonly<Record<string, readonly string[]>>;
  requiredEvidenceIdsByItemId: Readonly<Record<string, readonly string[]>>;
  correctQueueByItemId: Readonly<Record<string, WorkdayQueueId>>;
  correctActionByItemId: Readonly<Record<string, WorkdayActionId>>;
  kindByItemId: Readonly<Record<string, WorkdayItemKind>>;
  highImpactItemIds: readonly string[];
  transferActionIds: readonly WorkdayActionId[];
  correctTransferActionId: WorkdayActionId;
  transferEvidenceIds: readonly string[];
  correctTransferEvidenceId: string;
};

type ItemAnswer = {
  kind: WorkdayItemKind;
  queue: WorkdayQueueId;
  action: WorkdayActionId;
  requiredEvidenceIds: readonly string[];
  highImpact?: boolean;
};

const ACTION_OPTIONS = [
  { id: "proceed", label: "Prosseguir pelo processo normal" },
  { id: "verify", label: "Manter a ação bloqueada e verificar" },
  { id: "contain-report", label: "Conter e avisar a equipe responsável" },
  { id: "dismiss", label: "Apenas apagar ou ignorar" },
] as const;

function evidence(
  id: string,
  label: string,
  value: string,
  explanation: string,
): WorkdayEvidence {
  return { id, label, value, explanation };
}

function item(
  definition: Omit<WorkdayItem, "evidence"> & {
    evidence: readonly WorkdayEvidence[];
  },
): WorkdayItem {
  return definition;
}

function packageWith(
  casePackageId: string,
  content: WorkdayTriageContent,
  answers: Readonly<Record<string, ItemAnswer>>,
  correctTransferActionId: WorkdayActionId,
  correctTransferEvidenceId: string,
): ActivityContentPackage<WorkdayTriageContent, WorkdayTriageAllowlists> {
  return {
    activityId: WORKDAY_TRIAGE_ACTIVITY_ID,
    activityVersion: WORKDAY_TRIAGE_ACTIVITY_VERSION,
    casePackageId,
    status: "published",
    editorialDate: "2026-08-16",
    content,
    allowlists: {
      itemIds: content.items.map((entry) => entry.id),
      evidenceIdsByItemId: Object.fromEntries(
        content.items.map((entry) => [
          entry.id,
          entry.evidence.map((entryEvidence) => entryEvidence.id),
        ]),
      ),
      requiredEvidenceIdsByItemId: Object.fromEntries(
        Object.entries(answers).map(([itemId, answer]) => [
          itemId,
          answer.requiredEvidenceIds,
        ]),
      ),
      correctQueueByItemId: Object.fromEntries(
        Object.entries(answers).map(([itemId, answer]) => [itemId, answer.queue]),
      ),
      correctActionByItemId: Object.fromEntries(
        Object.entries(answers).map(([itemId, answer]) => [itemId, answer.action]),
      ),
      kindByItemId: Object.fromEntries(
        Object.entries(answers).map(([itemId, answer]) => [itemId, answer.kind]),
      ),
      highImpactItemIds: Object.entries(answers)
        .filter(([, answer]) => answer.highImpact)
        .map(([itemId]) => itemId),
      transferActionIds: ACTION_OPTIONS.map((option) => option.id),
      correctTransferActionId,
      transferEvidenceIds: content.transfer.evidenceOptions.map((option) => option.id),
      correctTransferEvidenceId,
    },
    criticalControlIds: [
      "no-sensitive-release-without-confirmation",
      "preserve-uncertainty",
      "avoid-blanket-reporting",
      "use-independent-evidence",
    ],
    feedback: {
      success:
        "Você reduziu o ruído, preservou a incerteza e tratou cada item de forma proporcional.",
      review:
        "A triagem precisa distinguir o que já pode ser resolvido do que ainda exige confirmação, sem liberar ação sensível nem reportar tudo.",
    },
    debrief: {
      title: "Inconclusivo é uma pendência controlada, não um erro",
      body:
        "Urgência, familiaridade e aparência mudam a prioridade da investigação, mas não substituem fatos. Resolva o que tem base, contenha o que foi confirmado e mantenha sob controle o que ainda depende de verificação.",
    },
  };
}

const p1Items = [
  item({
    id: "p1-team-meeting",
    channelLabel: "Aviso interno",
    senderLabel: "Equipe Casa & Decoração",
    sourceLabel: "Mural interno · Loja 047",
    title: "Alinhamento da área às 15h",
    preview: "Reunião presencial, sem link ou envio de dados.",
    body: "A equipe fará um alinhamento presencial às 15h na sala de treinamento. A mensagem apenas informa horário e local.",
    receivedAt: "08:06",
    impactLabel: "Rotina da equipe",
    evidence: [
      evidence("p1-meeting-source", "Origem", "Mural interno autenticado", "A origem corresponde ao canal usado pela equipe."),
      evidence("p1-meeting-context", "Agenda", "Sala reservada às 15h", "A reserva já existia no calendário interno."),
    ],
  }),
  item({
    id: "p1-account-warning",
    channelLabel: "E-mail",
    senderLabel: "Central de Segurança",
    sourceLabel: "alerta@seguranca-contas.example",
    title: "Conta bloqueada em 20 minutos",
    preview: "Confirme os dados no endereço recebido.",
    body: "O aviso ameaça suspender a conta e pede confirmação imediata em um endereço enviado na própria mensagem.",
    receivedAt: "08:19",
    impactLabel: "Credenciais",
    evidence: [
      evidence("p1-warning-address", "Endereço completo", "alerta@seguranca-contas.example", "O domínio não corresponde ao serviço interno conhecido."),
      evidence("p1-warning-destination", "Destino", "leroymerlin.seguranca-contas.example", "A marca aparece antes do domínio registrado por outra organização."),
      evidence("p1-warning-context", "Contexto", "Nenhum alerta na área oficial", "A consulta independente não confirma bloqueio."),
    ],
  }),
  item({
    id: "p1-stock-sheet",
    channelLabel: "Chat",
    senderLabel: "Carlos · Gestão da loja",
    sourceLabel: "Conversa de projeto",
    title: "Planilha completa de inventário",
    preview: "Pedido incomum feito durante um deslocamento.",
    body: "O perfil conhecido pede a planilha completa ainda nesta conversa. Não há chamado ou confirmação disponível neste momento.",
    receivedAt: "08:31",
    impactLabel: "Documento interno",
    evidence: [
      evidence("p1-stock-profile", "Perfil", "Conta conhecida da gestão", "Uma conta conhecida não comprova quem a controla agora."),
      evidence("p1-stock-history", "Histórico", "Esse tipo de arquivo não é enviado por chat", "O pedido foge do processo habitual."),
    ],
  }),
  item({
    id: "p1-invoice",
    channelLabel: "E-mail",
    senderLabel: "Fornecedor Novo Lar",
    sourceLabel: "financeiro@novo-lar-faturas.example",
    title: "Nota fiscal corrigida — pagamento hoje",
    preview: "Arquivo com macro e pedido para habilitar conteúdo.",
    body: "A mensagem apresenta uma suposta correção de nota e orienta abrir um arquivo com macro antes de um vencimento no mesmo dia.",
    receivedAt: "08:44",
    impactLabel: "Arquivo e pagamento",
    evidence: [
      evidence("p1-invoice-sender", "Cadastro", "Fornecedor não encontrado", "O remetente não consta no cadastro fictício."),
      evidence("p1-invoice-file", "Arquivo", "NF_047_corrigida.xlsm", "O formato permite macros e a mensagem pede habilitação."),
      evidence("p1-invoice-order", "Pedido", "Nenhuma cobrança esperada", "Não existe pedido associado ao documento."),
    ],
  }),
  item({
    id: "p1-benefits",
    channelLabel: "Aviso interno",
    senderLabel: "Pessoas & Cultura",
    sourceLabel: "Portal de colaboradores",
    title: "Calendário de benefícios atualizado",
    preview: "Consulta pelo portal que a equipe já utiliza.",
    body: "O aviso informa novas datas e orienta consultar o conteúdo diretamente no portal conhecido, sem fornecer link nem pedir dados.",
    receivedAt: "09:02",
    impactLabel: "Informativo",
    evidence: [
      evidence("p1-benefits-source", "Origem", "Portal de colaboradores", "O aviso foi aberto no canal interno conhecido."),
      evidence("p1-benefits-request", "Pedido", "Nenhuma credencial ou dado solicitado", "O conteúdo não cria uma ação sensível."),
    ],
  }),
  item({
    id: "p1-training",
    channelLabel: "Calendário",
    senderLabel: "Academia de Aprendizagem",
    sourceLabel: "Agenda corporativa",
    title: "Atendimento seguro · terça-feira",
    preview: "Convite esperado para a sala de treinamento.",
    body: "O convite confirma uma inscrição feita anteriormente e não contém link externo, anexo ou pedido de informação.",
    receivedAt: "09:14",
    impactLabel: "Agenda",
    evidence: [
      evidence("p1-training-enrollment", "Inscrição", "Solicitação registrada ontem", "O histórico confirma que a pessoa iniciou a inscrição."),
      evidence("p1-training-location", "Local", "Sala de treinamento", "O local e o horário correspondem à agenda."),
    ],
  }),
  item({
    id: "p1-repeat-request",
    channelLabel: "Chat",
    senderLabel: "Carlos · novo contato",
    sourceLabel: "Número não cadastrado",
    title: "É sobre a planilha que pedi por e-mail",
    preview: "O segundo canal repete o pedido anterior.",
    body: "Um contato não cadastrado repete o pedido da planilha e usa a mensagem anterior como suposta confirmação.",
    receivedAt: "09:27",
    impactLabel: "Documento interno",
    evidence: [
      evidence("p1-repeat-number", "Contato", "Número não cadastrado", "O novo contato não é uma fonte independente."),
      evidence("p1-repeat-linkage", "Narrativa", "Repete o mesmo pedido", "Dois canais controlados pelo solicitante não confirmam um ao outro."),
    ],
  }),
] as const;

const p1Content: WorkdayTriageContent = {
  pathId: "p1-opening",
  pathLabel: "Abertura do expediente",
  openingContext:
    "O expediente começou com sete itens de canais diferentes. Alguns fazem parte da rotina, outros pedem uma ação sensível e dois ainda não possuem informação suficiente para uma decisão definitiva.",
  task:
    "Reduza a caixa, investigue apenas o necessário e termine com cada item em Resolvidos ou Inconclusivos. O resultado só aparecerá depois da revisão global.",
  items: p1Items,
  transfer: {
    title: "O mesmo pedido apareceu em outra ferramenta",
    context:
      "Uma solicitação inconclusiva recebida por e-mail reaparece em um chat enviado pelo mesmo solicitante. Nenhum dos dois canais foi obtido fora do pedido.",
    actionOptions: ACTION_OPTIONS,
    evidenceOptions: [
      { id: "same-story", label: "As duas mensagens repetem a mesma história" },
      { id: "independent-record", label: "Registro obtido no diretório ou sistema conhecido" },
      { id: "familiar-photo", label: "Foto e nome parecem familiares" },
    ],
  },
};

const p2Items = [
  item({ id: "p2-stock-count", channelLabel: "Tarefa interna", senderLabel: "Operação da loja", sourceLabel: "Sistema de tarefas", title: "Contagem antecipada para 11h", preview: "Prazo mudou por uma necessidade real.", body: "A tarefa cadastrada ontem foi antecipada e mantém o mesmo responsável e escopo.", receivedAt: "09:01", impactLabel: "Operação", evidence: [evidence("p2-stock-ticket", "Registro", "Tarefa #047-221 atualizada", "A mudança existe no sistema conhecido."), evidence("p2-stock-owner", "Responsável", "Mesmo responsável cadastrado", "A origem e o escopo foram preservados.")] }),
  item({ id: "p2-service-window", channelLabel: "Aviso interno", senderLabel: "Tecnologia", sourceLabel: "Catálogo de serviços", title: "Manutenção começa às 10h30", preview: "Janela legítima antecipada em quinze minutos.", body: "O catálogo interno informa mudança curta no horário da manutenção, sem pedir senha ou instalação.", receivedAt: "09:07", impactLabel: "Disponibilidade", evidence: [evidence("p2-service-ticket", "Chamado", "Mudança registrada no chamado #TI-884", "O aviso possui registro independente."), evidence("p2-service-request", "Pedido", "Nenhuma ação sensível", "A mensagem é informativa.")] }),
  item({ id: "p2-support-chat", channelLabel: "Chat", senderLabel: "Suporte urgente", sourceLabel: "Perfil externo", title: "Instale o corretivo antes da manutenção", preview: "O contato usa a urgência real para pedir instalação.", body: "Um perfil externo cita a manutenção verdadeira e envia uma ferramenta que supostamente evita a indisponibilidade.", receivedAt: "09:11", impactLabel: "Dispositivo", evidence: [evidence("p2-support-profile", "Perfil", "Externo e sem chamado", "O perfil não está ligado ao chamado oficial."), evidence("p2-support-catalog", "Catálogo", "Nenhuma instalação prevista", "A manutenção legítima não exige ferramenta local."), evidence("p2-support-file", "Arquivo", "corretivo-urgente.exe", "A execução foi pedida fora do catálogo.")] }),
  item({ id: "p2-partner-request", channelLabel: "E-mail", senderLabel: "Parceiro de exposição", sourceLabel: "contato@projeto-casa.example", title: "Lista de participantes para hoje", preview: "O parceiro parece conhecido, mas o pedido é novo.", body: "O endereço conhecido pede uma lista com dados pessoais. Não há solicitação no projeto nem contato disponível neste momento.", receivedAt: "09:18", impactLabel: "Dados pessoais", evidence: [evidence("p2-partner-address", "Endereço", "Contato usado anteriormente", "O endereço é conhecido, mas o pedido continua sem autorização."), evidence("p2-partner-project", "Projeto", "Nenhuma solicitação registrada", "Falta base independente para liberar os dados.")] }),
  item({ id: "p2-unpolished-notice", channelLabel: "Aviso interno", senderLabel: "Manutenção predial", sourceLabel: "Mural da loja", title: "corredor 4 isolado", preview: "Texto curto e pouco polido.", body: "O aviso informa isolamento temporário do corredor 4 e não pede clique, dado ou resposta.", receivedAt: "09:24", impactLabel: "Segurança física", evidence: [evidence("p2-notice-source", "Origem", "Mural interno", "O conteúdo foi publicado no canal conhecido."), evidence("p2-notice-confirmation", "Confirmação", "Chamado predial #P-118", "O registro confirma o isolamento apesar do texto pouco polido.")] }),
] as const;

const p2Content: WorkdayTriageContent = {
  pathId: "p2-priority-change",
  pathLabel: "Mudança de prioridade",
  openingContext:
    "Duas urgências reais mudaram a ordem do trabalho. No mesmo intervalo chegaram uma solicitação perigosa, uma pendência sensível e um aviso visualmente imperfeito.",
  task:
    "Priorize pelo impacto sem transformar urgência ou aparência em veredito. Preserve o processo mesmo quando o prazo é verdadeiro.",
  items: p2Items,
  transfer: {
    title: "Aviso estranho, origem confirmada",
    context:
      "Uma mensagem curta contém erros de digitação, mas foi aberta diretamente no sistema interno e corresponde a um chamado já registrado.",
    actionOptions: ACTION_OPTIONS,
    evidenceOptions: [
      { id: "writing-quality", label: "A qualidade do texto" },
      { id: "known-system-record", label: "O chamado aberto no sistema conhecido" },
      { id: "urgent-banner", label: "O destaque visual de urgência" },
    ],
  },
};

const p3Items = [
  item({ id: "p3-delivery", channelLabel: "E-mail", senderLabel: "Logística interna", sourceLabel: "logistica@colaboradores.leroymerlin.example", title: "Entrega interna confirmada", preview: "Pedido e local conferem.", body: "A entrega interna foi confirmada para o ponto já indicado no pedido.", receivedAt: "10:03", impactLabel: "Rotina", evidence: [evidence("p3-delivery-order", "Pedido", "Pedido #047-903 confirmado", "O registro conhecido confirma a entrega."), evidence("p3-delivery-source", "Origem", "Domínio interno conhecido", "A origem corresponde ao processo.")] }),
  item({ id: "p3-password-reset", channelLabel: "E-mail", senderLabel: "Acesso urgente", sourceLabel: "recuperacao@conta-segura.example", title: "Redefinição obrigatória", preview: "Link recebido para redefinir senha.", body: "A mensagem afirma que uma redefinição foi solicitada, embora nenhuma recuperação tenha sido iniciada.", receivedAt: "10:12", impactLabel: "Credenciais", evidence: [evidence("p3-reset-origin", "Origem", "conta-segura.example", "O domínio não pertence ao serviço conhecido."), evidence("p3-reset-session", "Área oficial", "Nenhuma recuperação iniciada", "A consulta independente contradiz a mensagem.")] }),
  item({ id: "p3-vendor-pending", channelLabel: "Chat", senderLabel: "Marina · fornecedor", sourceLabel: "Conta usada no projeto", title: "Aprovar nova arte até o meio-dia", preview: "Pedido plausível sem registro inicial.", body: "A conta conhecida pede aprovação de uma arte em um endereço novo. No início do lote, o projeto não contém essa atualização.", receivedAt: "10:20", impactLabel: "Publicação externa", evidence: [evidence("p3-vendor-history", "Histórico", "Conta conhecida; destino novo", "A familiaridade não confirma a alteração."), evidence("p3-vendor-project", "Projeto", "Atualização ainda não registrada", "Sem resposta independente, o item deve continuar pendente."), evidence("p3-vendor-response", "Resposta posterior", "Contato cadastrado nega o novo endereço", "A confirmação obtida fora do chat permite conter o pedido.")] }),
  item({ id: "p3-roster", channelLabel: "Tarefa interna", senderLabel: "Liderança da área", sourceLabel: "Sistema de tarefas", title: "Atualizar escala da semana", preview: "Tarefa cadastrada e sem envio externo.", body: "A tarefa pede atualizar horários no sistema interno, dentro da responsabilidade habitual.", receivedAt: "10:28", impactLabel: "Operação", evidence: [evidence("p3-roster-task", "Registro", "Tarefa atribuída no sistema", "A origem e a necessidade estão confirmadas."), evidence("p3-roster-scope", "Escopo", "Somente horários internos", "Não há pedido de dados ou ação externa.")] }),
  item({ id: "p3-qr-poster", channelLabel: "Foto no chat", senderLabel: "Grupo da loja", sourceLabel: "Imagem de cartaz", title: "QR para pesquisa obrigatória", preview: "A imagem não mostra o destino.", body: "Uma foto de cartaz diz que a pesquisa deve ser respondida hoje por QR, mas a origem e o destino ainda não foram confirmados.", receivedAt: "10:34", impactLabel: "Destino oculto", evidence: [evidence("p3-qr-image", "Imagem", "QR sem prévia do destino", "A imagem sozinha não revela quem controla o destino."), evidence("p3-qr-campaign", "Campanhas", "Nenhuma campanha encontrada", "A ausência não prova fraude, mas mantém a pendência.")] }),
  item({ id: "p3-calendar", channelLabel: "Calendário", senderLabel: "Equipe de projetos", sourceLabel: "Agenda corporativa", title: "Revisão semanal do projeto", preview: "Série recorrente já conhecida.", body: "A ocorrência pertence a uma série criada anteriormente e mantém participantes e sala usuais.", receivedAt: "10:41", impactLabel: "Agenda", evidence: [evidence("p3-calendar-series", "Série", "Criada há seis semanas", "O histórico confirma a recorrência."), evidence("p3-calendar-details", "Detalhes", "Participantes e sala preservados", "Não houve mudança sensível.")] }),
] as const;

const p3Content: WorkdayTriageContent = {
  pathId: "p3-returned-pending",
  pathLabel: "Pendência que voltou",
  openingContext:
    "Um pedido plausível ainda não possuía confirmação quando chegou. Durante a triagem, uma resposta obtida pelo contato cadastrado acrescentou um fato novo ao caso.",
  task:
    "Não adivinhe antes da confirmação. Use a nova evidência para retomar a pendência e decidir sem apagar o estado anterior de incerteza.",
  items: p3Items,
  transfer: {
    title: "A confirmação chegou como nota de chamado",
    context:
      "Um pedido antes inconclusivo agora aparece em uma nota de chamado aberta diretamente no sistema conhecido, com o mesmo escopo e responsável.",
    actionOptions: ACTION_OPTIONS,
    evidenceOptions: [
      { id: "request-repetition", label: "O pedido foi repetido" },
      { id: "known-ticket-note", label: "A nota existe no chamado aberto pelo sistema conhecido" },
      { id: "same-deadline", label: "O prazo continua igual" },
    ],
  },
};

export const WORKDAY_TRIAGE_V2_PACKAGES = [
  packageWith(
    "simulation:workday:v2:p1-opening",
    p1Content,
    {
      "p1-team-meeting": { kind: "legitimate", queue: "resolved", action: "proceed", requiredEvidenceIds: ["p1-meeting-source", "p1-meeting-context"] },
      "p1-account-warning": { kind: "malicious", queue: "resolved", action: "contain-report", requiredEvidenceIds: ["p1-warning-address", "p1-warning-destination", "p1-warning-context"], highImpact: true },
      "p1-stock-sheet": { kind: "inconclusive", queue: "inconclusive", action: "verify", requiredEvidenceIds: ["p1-stock-profile", "p1-stock-history"], highImpact: true },
      "p1-invoice": { kind: "malicious", queue: "resolved", action: "contain-report", requiredEvidenceIds: ["p1-invoice-sender", "p1-invoice-file", "p1-invoice-order"], highImpact: true },
      "p1-benefits": { kind: "legitimate", queue: "resolved", action: "proceed", requiredEvidenceIds: ["p1-benefits-source", "p1-benefits-request"] },
      "p1-training": { kind: "legitimate", queue: "resolved", action: "proceed", requiredEvidenceIds: ["p1-training-enrollment", "p1-training-location"] },
      "p1-repeat-request": { kind: "inconclusive", queue: "inconclusive", action: "verify", requiredEvidenceIds: ["p1-repeat-number", "p1-repeat-linkage"], highImpact: true },
    },
    "verify",
    "independent-record",
  ),
  packageWith(
    "simulation:workday:v2:p2-priority-change",
    p2Content,
    {
      "p2-stock-count": { kind: "legitimate", queue: "resolved", action: "proceed", requiredEvidenceIds: ["p2-stock-ticket", "p2-stock-owner"] },
      "p2-service-window": { kind: "legitimate", queue: "resolved", action: "proceed", requiredEvidenceIds: ["p2-service-ticket", "p2-service-request"] },
      "p2-support-chat": { kind: "malicious", queue: "resolved", action: "contain-report", requiredEvidenceIds: ["p2-support-profile", "p2-support-catalog", "p2-support-file"], highImpact: true },
      "p2-partner-request": { kind: "inconclusive", queue: "inconclusive", action: "verify", requiredEvidenceIds: ["p2-partner-address", "p2-partner-project"], highImpact: true },
      "p2-unpolished-notice": { kind: "legitimate", queue: "resolved", action: "proceed", requiredEvidenceIds: ["p2-notice-source", "p2-notice-confirmation"] },
    },
    "proceed",
    "known-system-record",
  ),
  packageWith(
    "simulation:workday:v2:p3-returned-pending",
    p3Content,
    {
      "p3-delivery": { kind: "legitimate", queue: "resolved", action: "proceed", requiredEvidenceIds: ["p3-delivery-order", "p3-delivery-source"] },
      "p3-password-reset": { kind: "malicious", queue: "resolved", action: "contain-report", requiredEvidenceIds: ["p3-reset-origin", "p3-reset-session"], highImpact: true },
      "p3-vendor-pending": { kind: "malicious", queue: "resolved", action: "contain-report", requiredEvidenceIds: ["p3-vendor-history", "p3-vendor-project", "p3-vendor-response"], highImpact: true },
      "p3-roster": { kind: "legitimate", queue: "resolved", action: "proceed", requiredEvidenceIds: ["p3-roster-task", "p3-roster-scope"] },
      "p3-qr-poster": { kind: "inconclusive", queue: "inconclusive", action: "verify", requiredEvidenceIds: ["p3-qr-image", "p3-qr-campaign"] },
      "p3-calendar": { kind: "legitimate", queue: "resolved", action: "proceed", requiredEvidenceIds: ["p3-calendar-series", "p3-calendar-details"] },
    },
    "proceed",
    "known-ticket-note",
  ),
] as const;

export const WORKDAY_TRIAGE_CANONICAL_PACKAGE_ID =
  WORKDAY_TRIAGE_V2_PACKAGES[0].casePackageId;

export const WORKDAY_ACTION_OPTIONS = ACTION_OPTIONS;

export function findWorkdayTriageV2Package(casePackageId: string) {
  return WORKDAY_TRIAGE_V2_PACKAGES.find(
    (contentPackage) => contentPackage.casePackageId === casePackageId,
  );
}
