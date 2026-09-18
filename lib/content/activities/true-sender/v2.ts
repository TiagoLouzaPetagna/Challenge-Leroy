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
    label: "Declara como o remetente quer ser apresentado",
    detail: "É um rótulo visível; não autentica a pessoa.",
  },
  {
    id: "sender-account",
    label: "Identifica a conta usada no campo De",
    detail: "Mostra a conta apresentada como origem da mensagem.",
  },
  {
    id: "reply-destination",
    label: "Define para onde uma resposta seria enviada",
    detail: "O Reply-To pode ser igual ou diferente do endereço de origem.",
  },
  {
    id: "address-domain",
    label: "Identifica o domínio presente no endereço",
    detail: "O domínio ajuda a comparar a origem esperada, mas não prova autorização.",
  },
  {
    id: "process-context",
    label: "Mostra se o pedido combina com o processo esperado",
    detail: "Chamado, tarefa iniciada e finalidade ajudam a avaliar o pedido.",
  },
  {
    id: "current-controller",
    label: "Comprova qual pessoa controla a conta agora",
    detail: "Nenhum campo comum da mensagem comprova isso sozinho.",
  },
] as const satisfies readonly {
  id: IdentityRelationId;
  label: string;
  detail: string;
}[];

export const IDENTITY_CLAIM_ASSESSMENT_OPTIONS = [
  {
    id: "fact",
    label: "Comprovado",
    detail: "A afirmação é sustentada diretamente pelo artefato ou pelo processo conhecido.",
  },
  {
    id: "unproven",
    label: "Não comprovado",
    detail: "Os dados disponíveis não bastam para sustentar essa afirmação, mesmo que ela pareça plausível.",
  },
] as const satisfies readonly {
  id: IdentityClaimAssessmentId;
  label: string;
  detail: string;
}[];

export const IDENTITY_VERDICT_OPTIONS = [
  { id: "legitimate", label: "Legítimo neste contexto" },
  { id: "suspicious", label: "Suspeito; interromper e reportar" },
  { id: "inconclusive", label: "Inconclusivo; preciso verificar" },
] as const satisfies readonly { id: LinkVerdict; label: string }[];

export const IDENTITY_VERIFICATION_OPTIONS = [
  {
    id: "official-directory",
    label: "Abrir o suporte pelo diretório oficial já conhecido",
    detail: "A rota existe fora desta mensagem e permite conferir o pedido.",
  },
  {
    id: "registered-contact",
    label: "Usar o contato que já estava cadastrado antes do pedido",
    detail: "A confirmação não depende da conversa que está sendo verificada.",
  },
  {
    id: "initiated-workflow",
    label: "Conferir na área oficial do fluxo que eu mesmo iniciei",
    detail: "O registro esperado existe fora da mensagem recebida.",
  },
  {
    id: "same-message-reply",
    label: "Responder à própria mensagem pedindo confirmação",
    detail: "A resposta permanece no mesmo canal cuja identidade está em dúvida.",
  },
  {
    id: "request-provided-link",
    label: "Usar o link ou contato fornecido nesta solicitação",
    detail: "A solicitação continuaria confirmando a si mesma.",
  },
  {
    id: "share-secret",
    label: "Enviar o código solicitado para validar o atendimento",
    detail: "Código temporário é um segredo e não deve ser compartilhado.",
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
      title: "Conta usada não é o mesmo que pessoa confirmada",
      body:
        "Nome, From, Reply-To, domínio e contexto revelam fatos diferentes. Quando o pedido muda o processo ou solicita um segredo, confirme por uma rota obtida fora da própria mensagem.",
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
        "Alguém usando o nome de André Silva, do Suporte de Identidade, afirma que seu acesso falhou e pede um código temporário em dez minutos. Você não abriu chamado.",
      task:
        "Relacione cada campo ao que ele realmente informa, marque o que está comprovado ou não comprovado e escolha uma confirmação que não dependa desta mensagem.",
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
          explanation: "O texto declara uma identidade, mas pode ser escolhido por quem envia.",
        },
        {
          id: "p1-from",
          label: "De / From",
          value: "andre.silva@acessos-corporativos.example",
          correctRelationId: "sender-account",
          explanation: "Este é o endereço apresentado como conta remetente.",
        },
        {
          id: "p1-reply-to",
          label: "Reply-To",
          value: "atendimento@resposta-rapida.example",
          correctRelationId: "reply-destination",
          explanation: "Uma resposta seria desviada para este endereço.",
        },
        {
          id: "p1-domain",
          label: "Domínio do From",
          value: "acessos-corporativos.example",
          correctRelationId: "address-domain",
          explanation: "É o domínio do endereço, diferente do diretório interno esperado.",
        },
        {
          id: "p1-context",
          label: "Contexto conhecido",
          value: "Nenhum chamado aberto; suporte não solicita códigos por mensagem.",
          correctRelationId: "process-context",
          explanation: "O pedido não combina com a tarefa nem com o processo esperado.",
        },
      ],
      claims: [
        {
          id: "p1-account-used",
          text: "A mensagem apresenta andre.silva@acessos-corporativos.example como conta remetente.",
          correctAssessmentId: "fact",
        },
        {
          id: "p1-person-controls",
          text: "André Silva está comprovadamente controlando essa conta neste momento.",
          correctAssessmentId: "unproven",
        },
        {
          id: "p1-reply-route",
          text: "Uma resposta seria enviada a atendimento@resposta-rapida.example.",
          correctAssessmentId: "fact",
        },
        {
          id: "p1-process-conflict",
          text: "A ausência de chamado e o pedido de código conflitam com o processo conhecido.",
          correctAssessmentId: "fact",
        },
        {
          id: "p1-compromise-hypothesis",
          text: "A mensagem pode ser uma tentativa de obter o código usando uma identidade falsa.",
          correctAssessmentId: "unproven",
        },
      ],
      correctVerdictId: "suspicious",
      correctVerificationRouteId: "official-directory",
      transferCase: {
        id: "p1-shared-mailbox",
        title: "Uma caixa compartilhada legítima",
        context:
          "Você iniciou uma solicitação de entrega no portal oficial. A confirmação chega da conta esperada, e o procedimento registrado informa que respostas vão para a caixa operacional do mesmo serviço.",
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
        "Você separou identidade declarada, conta usada e controle não comprovado antes de escolher uma rota independente.",
      review:
        "Revise o que cada campo realmente prova e por que a própria mensagem não pode confirmar a identidade que apresenta.",
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
