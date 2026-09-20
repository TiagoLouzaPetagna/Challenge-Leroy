import type { ActivityContentPackage } from "../../../activities/content";
import type { LinkVerdict } from "../../../domain/types";

export const TRUE_SENDER_V2_ACTIVITY_ID = "phishlab:true-sender";
export const TRUE_SENDER_V2_ACTIVITY_VERSION = 2 as const;
export const IDENTITY_MAP_MECHANIC_ID = "identity-map" as const;

export type IdentityRelationId =
  | "declared-identity"
  | "sender-account"
  | "reply-destination"
  | "address-domain"
  | "process-context"
  | "current-controller";

export type IdentityClaimAssessmentId = "fact" | "inference" | "unproven";

export type IdentityVerificationRouteId =
  | "official-directory"
  | "registered-contact"
  | "initiated-workflow"
  | "same-message-reply"
  | "request-provided-link"
  | "share-secret";

export type IdentityField = {
  id: string;
  label: string;
  value: string;
  correctRelationId: IdentityRelationId;
  explanation: string;
};

export type IdentityClaim = {
  id: string;
  text: string;
  correctAssessmentId: IdentityClaimAssessmentId;
};

export type IdentityTransferCase = {
  id: string;
  title: string;
  context: string;
  fieldSummary: readonly { label: string; value: string }[];
  correctVerdictId: LinkVerdict;
  correctVerificationRouteId: IdentityVerificationRouteId;
};

export type TrueSenderV2Content = {
  pathId: "p1-support" | "p2-known-account" | "p3-legitimate-context";
  pathLabel: string;
  summary: string;
  role: string;
  situation: string;
  task: string;
  protectedConsequence: string;
  calibration: {
    title: string;
    body: string;
    examples: readonly { field: string; proves: string; doesNotProve: string }[];
  };
  message: {
    subject: string;
    body: string;
    note: string;
  };
  fields: readonly IdentityField[];
  claims: readonly IdentityClaim[];
  correctVerdictId: LinkVerdict;
  correctVerificationRouteId: IdentityVerificationRouteId;
  transferCase: IdentityTransferCase;
};

export type TrueSenderV2Allowlists = {
  relationIds: readonly IdentityRelationId[];
  claimAssessmentIds: readonly IdentityClaimAssessmentId[];
  verdictIds: readonly LinkVerdict[];
  verificationRouteIds: readonly IdentityVerificationRouteId[];
  helpIds: readonly ["identity-reference"];
};

export const IDENTITY_RELATION_OPTIONS = [
  {
    id: "declared-identity",
    label: "O nome que a pessoa escolheu mostrar",
    detail: "Qualquer um pode digitar o nome que quiser aqui.",
  },
  {
    id: "sender-account",
    label: "A conta que aparece como remetente",
    detail: "É o endereço que o e-mail diz ser a origem.",
  },
  {
    id: "reply-destination",
    label: "Para onde sua resposta iria",
    detail: "Pode ser um endereço diferente do remetente.",
  },
  {
    id: "address-domain",
    label: "O site dono do endereço",
    detail: "É a parte depois do @. Dá para comparar com o site que você conhece.",
  },
  {
    id: "process-context",
    label: "Se o pedido combina com o seu trabalho",
    detail: "Você esperava isso? Existe chamado aberto?",
  },
  {
    id: "current-controller",
    label: "Quem está usando a conta agora",
    detail: "Nenhum campo do e-mail mostra isso.",
  },
] as const satisfies readonly {
  id: IdentityRelationId;
  label: string;
  detail: string;
}[];

export const IDENTITY_CLAIM_ASSESSMENT_OPTIONS = [
  {
    id: "fact",
    label: "Dá para ver no e-mail",
    detail: "Está escrito ali, na sua frente.",
  },
  {
    id: "unproven",
    label: "Não dá para saber",
    detail: "Pode até ser verdade, mas o e-mail não prova.",
  },
] as const satisfies readonly {
  id: IdentityClaimAssessmentId;
  label: string;
  detail: string;
}[];

export const IDENTITY_VERDICT_OPTIONS = [
  { id: "legitimate", label: "Posso atender o pedido" },
  { id: "suspicious", label: "É golpe. Parar e reportar" },
  { id: "inconclusive", label: "Ainda não sei. Preciso conferir antes" },
] as const satisfies readonly { id: LinkVerdict; label: string }[];

export const IDENTITY_VERIFICATION_OPTIONS = [
  {
    id: "official-directory",
    label: "Ligar para o suporte pelo número da intranet",
    detail: "Você acha o número sozinho, sem usar nada que veio no e-mail.",
  },
  {
    id: "registered-contact",
    label: "Falar pelo contato que você já tinha antes",
    detail: "O telefone ou ramal que você já usava com essa pessoa.",
  },
  {
    id: "initiated-workflow",
    label: "Conferir no sistema onde você mesmo abriu o pedido",
    detail: "Se o pedido é real, ele está registrado lá.",
  },
  {
    id: "same-message-reply",
    label: "Responder o e-mail perguntando se é verdade",
    detail: "Quem enviou o golpe vai responder que sim.",
  },
  {
    id: "request-provided-link",
    label: "Clicar no link ou ligar no número do e-mail",
    detail: "É o golpista confirmando o próprio golpe.",
  },
  {
    id: "share-secret",
    label: "Mandar o código para eles confirmarem",
    detail: "O código é sua chave. Nunca se manda para ninguém.",
  },
] as const satisfies readonly {
  id: IdentityVerificationRouteId;
  label: string;
  detail: string;
}[];

const calibration = {
  title: "O que cada campo consegue provar",
  body:
    "Antes do caso, veja a diferença entre o texto que aparece na tela, a conta usada e a pessoa que pode estar controlando essa conta.",
  examples: [
    {
      field: "Nome exibido",
      proves: "Mostra a identidade declarada na interface.",
      doesNotProve: "Não comprova quem escreveu a mensagem.",
    },
    {
      field: "De / From",
      proves: "Mostra a conta apresentada como remetente.",
      doesNotProve: "Não comprova quem controla a conta agora.",
    },
    {
      field: "Reply-To",
      proves: "Mostra para onde a resposta seria enviada.",
      doesNotProve: "Não torna a solicitação segura, mesmo quando coincide com o From.",
    },
  ],
} as const;

const allowlists: TrueSenderV2Allowlists = {
  relationIds: IDENTITY_RELATION_OPTIONS.map((option) => option.id),
  // `inference` permanece aceito somente para preservar tentativas v2 antigas.
  // A interface publicada oferece apenas Comprovado e Não comprovado.
  claimAssessmentIds: ["fact", "inference", "unproven"],
  verdictIds: IDENTITY_VERDICT_OPTIONS.map((option) => option.id),
  verificationRouteIds: IDENTITY_VERIFICATION_OPTIONS.map(
    (option) => option.id,
  ),
  helpIds: ["identity-reference"],
};

function createPackage(
  casePackageId: string,
  content: TrueSenderV2Content,
  feedback: ActivityContentPackage<
    TrueSenderV2Content,
    TrueSenderV2Allowlists
  >["feedback"],
) {
  return {
    casePackageId,
    activityId: TRUE_SENDER_V2_ACTIVITY_ID,
    activityVersion: TRUE_SENDER_V2_ACTIVITY_VERSION,
    status: "published",
    editorialDate: "2026-08-15",
    content,
    allowlists,
    criticalControlIds: ["human-control", "independent-route", "secret-sharing"],
    feedback,
    debrief: {
      title: "Leve isto para o trabalho",
      body:
        "O e-mail mostra qual conta enviou. Ele nunca mostra quem estava usando essa conta. Quando o pedido for fora do normal ou pedir um código, confirme por um caminho que você já conhecia antes do e-mail.",
    },
  } as const satisfies ActivityContentPackage<
    TrueSenderV2Content,
    TrueSenderV2Allowlists
  >;
}

export const TRUE_SENDER_V2_PACKAGES = [
  createPackage(
    "phishlab:true-sender:v2:p1-support-without-ticket",
    {
      pathId: "p1-support",
      pathLabel: "Suporte sem chamado",
      summary: "Um suposto suporte pede um código temporário sem existir chamado.",
      role: "Você recebeu uma mensagem no e-mail de trabalho e precisa verificar a identidade antes de responder.",
      situation:
        "Um e-mail assinado por André Silva, do Suporte, diz que seu acesso falhou e pede seu código de seis dígitos em dez minutos. Você não pediu ajuda nenhuma.",
      task:
        "Descubra o que o e-mail realmente prova — e o que ele só está afirmando.",
      protectedConsequence:
        "O processo protege seu código temporário e evita que uma identidade apenas declarada receba acesso à conta.",
      calibration,
      message: {
        subject: "Falha no acesso — validação necessária",
        body:
          "Detectamos uma falha no seu acesso. Responda com o código de seis dígitos exibido no aplicativo para evitar o bloqueio em 10 minutos.",
        note: "Mensagem fictícia e inerte: não aceita resposta nem código.",
      },
      fields: [
        {
          id: "p1-display-name",
          label: "Nome exibido",
          value: "André Silva · Suporte de Identidade",
          correctRelationId: "declared-identity",
          explanation: "Esse nome é digitado por quem envia. Dá para escrever qualquer coisa.",
        },
        {
          id: "p1-from",
          label: "De / From",
          value: "andre.silva@acessos-corporativos.example",
          correctRelationId: "sender-account",
          explanation: "É a conta que o e-mail diz ser a origem. Diz — não prova.",
        },
        {
          id: "p1-reply-to",
          label: "Reply-To",
          value: "atendimento@resposta-rapida.example",
          correctRelationId: "reply-destination",
          explanation: "Repare: sua resposta não vai para o André. Vai para outro endereço.",
        },
        {
          id: "p1-domain",
          label: "Domínio do From",
          value: "acessos-corporativos.example",
          correctRelationId: "address-domain",
          explanation: "É o site dono do endereço. Não é o da empresa.",
        },
        {
          id: "p1-context",
          label: "Contexto conhecido",
          value: "Você não abriu chamado. E o suporte nunca pede código por mensagem.",
          correctRelationId: "process-context",
          explanation: "Este é o sinal mais forte: o pedido não encaixa na sua rotina.",
        },
      ],
      claims: [
        {
          id: "p1-account-used",
          text: "O e-mail chegou da conta andre.silva@acessos-corporativos.example.",
          correctAssessmentId: "fact",
        },
        {
          id: "p1-person-controls",
          text: "Quem escreveu foi mesmo o André Silva.",
          correctAssessmentId: "unproven",
        },
        {
          id: "p1-reply-route",
          text: "Se você responder, a resposta vai para atendimento@resposta-rapida.example.",
          correctAssessmentId: "fact",
        },
        {
          id: "p1-process-conflict",
          text: "Você não abriu chamado nenhum.",
          correctAssessmentId: "fact",
        },
        {
          id: "p1-compromise-hypothesis",
          text: "É um golpe para roubar o seu código.",
          correctAssessmentId: "unproven",
        },
      ],
      correctVerdictId: "suspicious",
      correctVerificationRouteId: "official-directory",
      transferCase: {
        id: "p1-shared-mailbox",
        title: "Agora um e-mail parecido, mas diferente",
        context:
          "Desta vez foi você quem pediu. Você abriu um pedido de entrega no portal da empresa, e a confirmação chegou. O endereço de resposta é outro — é a caixa da equipe de entregas, como o procedimento diz.",
        fieldSummary: [
          { label: "De", value: "avisos@entregas.example" },
          { label: "Reply-To", value: "atendimento@entregas.example" },
          { label: "Contexto", value: "Solicitação iniciada e registrada no portal oficial" },
        ],
        correctVerdictId: "legitimate",
        correctVerificationRouteId: "initiated-workflow",
      },
    },
    {
      success:
        "Você percebeu a diferença entre o que o e-mail mostra e o que ele prova — e conferiu por fora.",
      review:
        "A ideia central: um e-mail nunca confirma a si mesmo. Quem confirma é você, por um caminho que já existia antes.",
    },
  ),
  createPackage(
    "phishlab:true-sender:v2:p2-known-account-new-process",
    {
      pathId: "p2-known-account",
      pathLabel: "Conta certa, processo diferente",
      summary: "Uma conta conhecida muda o destino e o procedimento dentro de uma conversa real.",
      role: "Você acompanha um pedido com um fornecedor conhecido e precisa decidir se a conta correta basta para autorizar a mudança.",
      situation:
        "Marina Lopes continua uma conversa real pela conta esperada, mas pede autenticação urgente em um portal que nunca foi usado nesse processo.",
      task:
        "Mapeie os fatos disponíveis, deixe o controle humano como não comprovado e escolha como confirmar a mudança fora da conversa.",
      protectedConsequence:
        "A verificação impede que uma conta comprometida transforme uma conversa verdadeira em autorização para um processo novo.",
      calibration,
      message: {
        subject: "Pedido 8731 — novo acesso para confirmação",
        body:
          "O arquivo anterior expirou. Entre com sua conta no novo acesso em 20 minutos para mantermos a entrega.",
        note: "A conversa e as identidades são fictícias; o destino descrito não é navegável.",
      },
      fields: [
        {
          id: "p2-display-name",
          label: "Nome exibido",
          value: "Marina Lopes · Lumen Suprimentos",
          correctRelationId: "declared-identity",
          explanation: "O nome corresponde ao contato conhecido, mas continua sendo apresentação visual.",
        },
        {
          id: "p2-from",
          label: "De / From",
          value: "marina.lopes@lumen-suprimentos.example",
          correctRelationId: "sender-account",
          explanation: "A conta apresentada é a mesma do histórico.",
        },
        {
          id: "p2-reply-to",
          label: "Reply-To",
          value: "marina.lopes@lumen-suprimentos.example",
          correctRelationId: "reply-destination",
          explanation: "A resposta permaneceria na mesma conta conhecida.",
        },
        {
          id: "p2-domain",
          label: "Domínio do From",
          value: "lumen-suprimentos.example",
          correctRelationId: "address-domain",
          explanation: "O domínio coincide com o histórico, sem comprovar quem controla a conta agora.",
        },
        {
          id: "p2-context",
          label: "Contexto conhecido",
          value: "Thread real; novo portal e autenticação nunca previstos no processo.",
          correctRelationId: "process-context",
          explanation: "A continuidade é real, mas a ação solicitada mudou.",
        },
      ],
      claims: [
        {
          id: "p2-account-used",
          text: "A conta usada é a mesma registrada no histórico da conversa.",
          correctAssessmentId: "fact",
        },
        {
          id: "p2-person-controls",
          text: "Marina Lopes está comprovadamente controlando a conta agora.",
          correctAssessmentId: "unproven",
        },
        {
          id: "p2-process-changed",
          text: "O pedido introduz um portal e uma autenticação fora do processo anterior.",
          correctAssessmentId: "fact",
        },
        {
          id: "p2-compromise-hypothesis",
          text: "A conta pode estar comprometida ou a mudança pode ser legítima e ainda não confirmada.",
          correctAssessmentId: "unproven",
        },
        {
          id: "p2-safe-request",
          text: "Endereço e Reply-To coerentes comprovam que o novo pedido está autorizado.",
          correctAssessmentId: "unproven",
        },
      ],
      correctVerdictId: "inconclusive",
      correctVerificationRouteId: "registered-contact",
      transferCase: {
        id: "p2-known-chat",
        title: "A mesma mudança chega pelo chat",
        context:
          "A conta conhecida do fornecedor repete no chat corporativo o pedido de usar o novo portal. O canal mudou, mas nenhuma confirmação independente foi obtida.",
        fieldSummary: [
          { label: "Conta", value: "Marina Lopes · contato conhecido" },
          { label: "Canal", value: "Chat corporativo" },
          { label: "Mudança", value: "Novo portal fora do processo habitual" },
        ],
        correctVerdictId: "inconclusive",
        correctVerificationRouteId: "registered-contact",
      },
    },
    {
      success:
        "Você reconheceu que uma conta verdadeira pode exigir confirmação quando o comportamento e o processo mudam.",
      review:
        "Conta e thread corretas são fatos úteis, mas não comprovam a pessoa no controle nem autorizam um processo novo.",
    },
  ),
  createPackage(
    "phishlab:true-sender:v2:p3-legitimate-unusual-message",
    {
      pathId: "p3-legitimate-context",
      pathLabel: "Mensagem legítima incomum",
      summary: "Uma confirmação fora do horário continua coerente com uma tarefa iniciada pelo funcionário.",
      role: "Você iniciou uma atualização de cadastro e recebe a confirmação esperada fora do horário habitual.",
      situation:
        "A mensagem chega da conta prevista, responde para a mesma origem e corresponde ao protocolo que você abriu na área oficial. Ela não pede segredo nem muda o processo.",
      task:
        "Use o conjunto de campos e o registro anterior para sustentar uma conclusão legítima sem transformar um único sinal em prova absoluta.",
      protectedConsequence:
        "O processo evita falsos positivos sem permitir ações além da finalidade que você iniciou.",
      calibration,
      message: {
        subject: "Protocolo 4821 — cadastro atualizado",
        body:
          "A atualização solicitada foi concluída. Consulte o protocolo 4821 na área de cadastro para revisar o resultado.",
        note: "Mensagem fictícia; nenhum botão ou destino externo é oferecido.",
      },
      fields: [
        {
          id: "p3-display-name",
          label: "Nome exibido",
          value: "Central de Cadastro",
          correctRelationId: "declared-identity",
          explanation: "O nome declara a função do serviço.",
        },
        {
          id: "p3-from",
          label: "De / From",
          value: "notificacoes@cadastro.example",
          correctRelationId: "sender-account",
          explanation: "A conta coincide com o registro do protocolo iniciado.",
        },
        {
          id: "p3-reply-to",
          label: "Reply-To",
          value: "notificacoes@cadastro.example",
          correctRelationId: "reply-destination",
          explanation: "Uma resposta iria para a mesma conta do serviço.",
        },
        {
          id: "p3-domain",
          label: "Domínio do From",
          value: "cadastro.example",
          correctRelationId: "address-domain",
          explanation: "O domínio coincide com a origem documentada no fluxo iniciado.",
        },
        {
          id: "p3-context",
          label: "Contexto conhecido",
          value: "Protocolo 4821 aberto pelo funcionário; finalidade e resultado esperados.",
          correctRelationId: "process-context",
          explanation: "O registro anterior sustenta a finalidade da mensagem.",
        },
      ],
      claims: [
        {
          id: "p3-account-used",
          text: "A mensagem usa a conta registrada para notificações do protocolo.",
          correctAssessmentId: "fact",
        },
        {
          id: "p3-person-controls",
          text: "Uma pessoa específica está comprovadamente controlando a conta do serviço.",
          correctAssessmentId: "unproven",
        },
        {
          id: "p3-context-fit",
          text: "Finalidade, protocolo e origem correspondem à tarefa iniciada pelo funcionário.",
          correctAssessmentId: "fact",
        },
        {
          id: "p3-night-risk",
          text: "O horário incomum, sozinho, comprova que a mensagem é maliciosa.",
          correctAssessmentId: "unproven",
        },
        {
          id: "p3-legitimate-hypothesis",
          text: "O conjunto de fatos sustenta que esta é a confirmação esperada do fluxo iniciado.",
          correctAssessmentId: "fact",
        },
      ],
      correctVerdictId: "legitimate",
      correctVerificationRouteId: "initiated-workflow",
      transferCase: {
        id: "p3-context-missing",
        title: "O mesmo aviso, mas sem protocolo conhecido",
        context:
          "A origem e o texto parecem iguais, porém você não iniciou atualização e não encontra protocolo correspondente na área oficial.",
        fieldSummary: [
          { label: "De", value: "notificacoes@cadastro.example" },
          { label: "Pedido anterior", value: "Nenhum registro encontrado" },
          { label: "Ação solicitada", value: "Consultar uma atualização não iniciada" },
        ],
        correctVerdictId: "inconclusive",
        correctVerificationRouteId: "official-directory",
      },
    },
    {
      success:
        "Você usou contexto, finalidade e origem em conjunto e evitou transformar horário incomum em veredito.",
      review:
        "Uma mensagem legítima precisa ser sustentada pelo processo iniciado; um sinal isolado não substitui o conjunto de fatos.",
    },
  ),
] as const;

export type TrueSenderV2Package = (typeof TRUE_SENDER_V2_PACKAGES)[number];

export function findTrueSenderV2Package(casePackageId: string) {
  return (
    TRUE_SENDER_V2_PACKAGES.find(
      (contentPackage) => contentPackage.casePackageId === casePackageId,
    ) ?? null
  );
}
