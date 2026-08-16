import type {
  EvidenceKey,
  SimulationActionKey,
} from "../domain/types";

export type SimulationMessageKind = "legitimate" | "phishing" | "verify";

export type SimulationMessageDefinition = {
  id: string;
  senderName: string;
  senderAddress: string;
  subject: string;
  preview: string;
  body: string;
  receivedAt: string;
  artifactLabel: string;
  artifactValue: string;
  kind: SimulationMessageKind;
  expectedAction: SimulationActionKey;
  relevantEvidence: EvidenceKey[];
  evidenceDetails: Record<EvidenceKey, string>;
};

export const WORKDAY_SIMULATION_ID = "simulation:workday";
export const WORKDAY_SIMULATION_VERSION = 1;

export const WORKDAY_MESSAGES: readonly SimulationMessageDefinition[] = [
  {
    id: "team-meeting",
    senderName: "Equipe Casa & Decoração",
    senderAddress: "equipe.casa047@colaboradores.leroymerlin.example",
    subject: "Reunião rápida às 15h",
    preview: "Vamos alinhar a organização da área antes do fechamento.",
    body:
      "Olá, equipe. Hoje teremos uma reunião rápida na sala de treinamento às 15h para alinhar a organização da área. Não é necessário acessar links ou enviar informações.",
    receivedAt: "08:12",
    artifactLabel: "Sem link ou anexo",
    artifactValue: "Mensagem informativa",
    kind: "legitimate",
    expectedAction: "keep",
    relevantEvidence: ["sender", "context"],
    evidenceDetails: {
      sender:
        "O endereço utiliza o domínio fictício conhecido colaboradores.leroymerlin.example.",
      link: "A mensagem não possui link nem anexo.",
      context:
        "O assunto é compatível com a rotina da equipe e não pede dados ou urgência incomum.",
    },
  },
  {
    id: "account-expiry",
    senderName: "Central de Segurança",
    senderAddress: "alerta@seguranca-contas.example",
    subject: "Sua conta será bloqueada em 20 minutos",
    preview: "Confirme seus dados agora para evitar a suspensão.",
    body:
      "Detectamos uma falha de validação. Para evitar o bloqueio imediato, confirme sua conta no endereço indicado. A equipe não poderá reverter a suspensão após o prazo.",
    receivedAt: "08:37",
    artifactLabel: "Destino exibido",
    artifactValue: "https://leroymerlin.seguranca-contas.example/confirmar",
    kind: "phishing",
    expectedAction: "report",
    relevantEvidence: ["sender", "link", "context"],
    evidenceDetails: {
      sender:
        "O endereço usa seguranca-contas.example, que não corresponde ao domínio fictício conhecido.",
      link:
        "Leroy Merlin aparece apenas antes do domínio registrado seguranca-contas.example.",
      context:
        "A urgência extrema e a ameaça de bloqueio tentam impedir uma verificação cuidadosa.",
    },
  },
  {
    id: "manager-stock-request",
    senderName: "Carlos · Gestão da loja",
    senderAddress: "carlos.souza@colaboradores.leroymerlin.example",
    subject: "Preciso da planilha de inventário agora",
    preview: "Estou fora da loja. Envie a planilha completa nesta conversa.",
    body:
      "Lucas, estou em deslocamento e preciso conferir uma divergência. Pode responder com a planilha completa de inventário? Se preferir, confirme comigo pelo ramal cadastrado antes do envio.",
    receivedAt: "09:05",
    artifactLabel: "Solicitação incomum",
    artifactValue: "Documento interno completo",
    kind: "verify",
    expectedAction: "verify",
    relevantEvidence: ["sender", "context"],
    evidenceDetails: {
      sender:
        "O endereço parece conhecido, mas um remetente legítimo também pode ter a conta comprometida.",
      link: "Não existe link; o risco está no pedido de informação.",
      context:
        "O pedido foge do processo habitual e a própria mensagem permite confirmar pelo ramal conhecido.",
    },
  },
  {
    id: "invoice-attachment",
    senderName: "Fornecedor Novo Lar",
    senderAddress: "financeiro@novo-lar-faturas.example",
    subject: "Nota fiscal corrigida — pagamento hoje",
    preview: "Abra o documento protegido e habilite a visualização.",
    body:
      "Segue a nota fiscal corrigida. O arquivo foi protegido pelo nosso novo sistema. Abra o anexo e habilite o conteúdo para visualizar os valores antes do vencimento de hoje.",
    receivedAt: "09:42",
    artifactLabel: "Anexo fictício",
    artifactValue: "NF_047_corrigida.xlsm",
    kind: "phishing",
    expectedAction: "report",
    relevantEvidence: ["sender", "link", "context"],
    evidenceDetails: {
      sender:
        "O fornecedor e o domínio não aparecem no histórico fictício de contatos conhecidos.",
      link:
        "O anexo usa um formato com macros e pede que o conteúdo seja habilitado.",
      context:
        "Não havia cobrança esperada, e o vencimento no mesmo dia cria pressão artificial.",
    },
  },
  {
    id: "benefits-update",
    senderName: "Pessoas & Cultura",
    senderAddress: "pessoas@colaboradores.leroymerlin.example",
    subject: "Calendário de benefícios atualizado",
    preview: "Consulte as novas datas diretamente no portal conhecido.",
    body:
      "O calendário de benefícios do próximo mês foi atualizado. Consulte as datas entrando diretamente no portal interno que você já utiliza. Esta mensagem não solicita senha ou confirmação de dados.",
    receivedAt: "10:18",
    artifactLabel: "Orientação de acesso",
    artifactValue: "Entrar diretamente no portal conhecido",
    kind: "legitimate",
    expectedAction: "keep",
    relevantEvidence: ["sender", "context"],
    evidenceDetails: {
      sender:
        "O endereço utiliza o domínio fictício conhecido dos colaboradores.",
      link: "Não há link; a orientação é acessar o portal diretamente.",
      context:
        "A mensagem não pede credenciais e orienta o uso de um canal já conhecido.",
    },
  },
  {
    id: "training-confirmation",
    senderName: "Academia de Aprendizagem",
    senderAddress: "academia@colaboradores.leroymerlin.example",
    subject: "Inscrição confirmada: atendimento seguro",
    preview: "Sua participação foi registrada para terça-feira.",
    body:
      "Sua inscrição no encontro Atendimento seguro foi confirmada para terça-feira, às 10h, na sala de treinamento. Caso não possa participar, avise sua liderança pelo canal habitual.",
    receivedAt: "11:03",
    artifactLabel: "Sem ação digital",
    artifactValue: "Confirmação de agenda",
    kind: "legitimate",
    expectedAction: "keep",
    relevantEvidence: ["sender", "context"],
    evidenceDetails: {
      sender:
        "O remetente utiliza o domínio fictício conhecido dos colaboradores.",
      link: "A mensagem não possui link ou anexo.",
      context:
        "O conteúdo confirma uma atividade e direciona qualquer mudança ao canal habitual.",
    },
  },
] as const;

