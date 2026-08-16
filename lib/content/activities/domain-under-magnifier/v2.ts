import type { ActivityContentPackage } from "../../../activities/content";
import type { LinkVerdict } from "../../../domain/types";

export const DOMAIN_ANALYZER_V2_ACTIVITY_ID = "phishlab:link-analyzer";
export const DOMAIN_ANALYZER_V2_ACTIVITY_VERSION = 2 as const;
export const URL_ANATOMY_MECHANIC_ID = "url-anatomy" as const;

export type UrlSegmentRoleId =
  | "protocol"
  | "subdomain"
  | "registeredDomain"
  | "path"
  | "parameter";

export type DomainAnalyzerSafeRouteId =
  | "official-favorite"
  | "continue-initiated-flow"
  | "analyzed-address";

export type DomainAnalyzerSegment = {
  id: string;
  value: string;
  roleId: UrlSegmentRoleId;
};

export type DomainAnalyzerCase = {
  id: string;
  title: string;
  context: string;
  url: string;
  expectedOrigin: string;
  segments: readonly DomainAnalyzerSegment[];
  correctRegisteredDomainSegmentId: string;
  correctVerdictId: LinkVerdict;
};

export type DomainAnalyzerV2Content = {
  pathId: "p1-left-brand" | "p2-path-brand" | "p3-long-legitimate";
  pathLabel: string;
  summary: string;
  role: string;
  situation: string;
  task: string;
  protectedConsequence: string;
  calibration: DomainAnalyzerCase;
  mainCase: DomainAnalyzerCase;
  transferCase: DomainAnalyzerCase;
  roleOptions: readonly { id: UrlSegmentRoleId; label: string }[];
  verdictOptions: readonly { id: LinkVerdict; label: string }[];
  safeRouteOptions: readonly {
    id: DomainAnalyzerSafeRouteId;
    label: string;
  }[];
};

export type DomainAnalyzerV2Allowlists = {
  segmentRoleIds: readonly UrlSegmentRoleId[];
  verdictIds: readonly LinkVerdict[];
  safeRouteIds: readonly DomainAnalyzerSafeRouteId[];
  correctSafeRouteId: DomainAnalyzerSafeRouteId;
  helpIds: readonly ["role-reference"];
};

const roleOptions = [
  { id: "protocol", label: "Protocolo" },
  { id: "subdomain", label: "Subdomínio" },
  { id: "registeredDomain", label: "Domínio registrado" },
  { id: "path", label: "Caminho" },
  { id: "parameter", label: "Parâmetro" },
] as const;

const verdictOptions = [
  { id: "legitimate", label: "Legítimo neste contexto" },
  { id: "suspicious", label: "Suspeito; usar outra rota" },
  { id: "inconclusive", label: "Inconclusivo; verificar" },
] as const;

const safeRouteOptions = [
  {
    id: "official-favorite",
    label: "Fechar e abrir o serviço por favorito ou diretório conhecido",
  },
  {
    id: "continue-initiated-flow",
    label: "Continuar somente o fluxo que eu mesmo iniciei na origem esperada",
  },
  {
    id: "analyzed-address",
    label: "Abrir o endereço analisado para testar se a página parece verdadeira",
  },
] as const;

const calibration: DomainAnalyzerCase = {
  id: "calibration-store",
  title: "Exemplo de calibração",
  context:
    "A tabela já vem preenchida para mostrar como cada trecho cumpre uma função.",
  url: "https://conta.loja.example/pedidos?origem=portal",
  expectedOrigin: "loja.example",
  segments: [
    { id: "cal-protocol", value: "https://", roleId: "protocol" },
    { id: "cal-subdomain", value: "conta.", roleId: "subdomain" },
    {
      id: "cal-domain",
      value: "loja.example",
      roleId: "registeredDomain",
    },
    { id: "cal-path", value: "/pedidos", roleId: "path" },
    { id: "cal-parameter", value: "?origem=portal", roleId: "parameter" },
  ],
  correctRegisteredDomainSegmentId: "cal-domain",
  correctVerdictId: "legitimate",
};

function createPackage(
  casePackageId: string,
  editorialDate: string,
  pathId: DomainAnalyzerV2Content["pathId"],
  pathLabel: string,
  summary: string,
  mainCase: DomainAnalyzerCase,
  transferCase: DomainAnalyzerCase,
  correctSafeRouteId: DomainAnalyzerSafeRouteId,
  feedback: ActivityContentPackage<
    DomainAnalyzerV2Content,
    DomainAnalyzerV2Allowlists
  >["feedback"],
) {
  return {
    casePackageId,
    activityId: DOMAIN_ANALYZER_V2_ACTIVITY_ID,
    activityVersion: DOMAIN_ANALYZER_V2_ACTIVITY_VERSION,
    status: "published",
    editorialDate,
    content: {
      pathId,
      pathLabel,
      summary,
      role:
        "Você recebeu um endereço dentro de uma situação de trabalho e precisa analisá-lo antes de decidir por onde continuar.",
      situation: `${mainCase.context} ${summary}`,
      task:
        "Separe os cinco trechos do endereço, identifique o domínio registrado e compare essa origem com a origem esperada no processo. Depois escolha uma conclusão e uma rota segura.",
      protectedConsequence:
        "A análise evita que uma palavra conhecida esconda uma origem diferente e também evita bloquear um endereço legítimo apenas por ser longo ou incomum.",
      calibration,
      mainCase,
      transferCase,
      roleOptions,
      verdictOptions,
      safeRouteOptions,
    },
    allowlists: {
      segmentRoleIds: roleOptions.map((option) => option.id),
      verdictIds: verdictOptions.map((option) => option.id),
      safeRouteIds: safeRouteOptions.map((option) => option.id),
      correctSafeRouteId,
      helpIds: ["role-reference"],
    },
    criticalControlIds: [
      "registered-domain",
      "safe-route",
      "transfer-origin",
    ],
    feedback,
    debrief: {
      title: "A origem é definida pelo domínio registrado",
      body:
        "Protocolo, subdomínio, caminho e parâmetro ajudam a interpretar o endereço, mas não substituem a fronteira do domínio registrado nem o contexto em que o fluxo começou.",
    },
  } as const satisfies ActivityContentPackage<
    DomainAnalyzerV2Content,
    DomainAnalyzerV2Allowlists
  >;
}

export const DOMAIN_UNDER_MAGNIFIER_V2_PACKAGES = [
  createPackage(
    "phishlab:link-analyzer:v2:p1-left-brand",
    "2026-08-15",
    "p1-left-brand",
    "Marca à esquerda",
    "Uma marca conhecida aparece antes do domínio que realmente controla o endereço.",
    {
      id: "p1-main",
      title: "A marca aparece antes da origem real",
      context:
        "Um aviso não solicitado ameaça suspender a conta e pede confirmação imediata.",
      url: "https://leroymerlin.conta.seguranca-contas.example/confirmar?retorno=portal",
      expectedOrigin: "leroymerlin.example",
      segments: [
        { id: "p1-main-protocol", value: "https://", roleId: "protocol" },
        {
          id: "p1-main-subdomain",
          value: "leroymerlin.conta.",
          roleId: "subdomain",
        },
        {
          id: "p1-main-domain",
          value: "seguranca-contas.example",
          roleId: "registeredDomain",
        },
        { id: "p1-main-path", value: "/confirmar", roleId: "path" },
        {
          id: "p1-main-parameter",
          value: "?retorno=portal",
          roleId: "parameter",
        },
      ],
      correctRegisteredDomainSegmentId: "p1-main-domain",
      correctVerdictId: "suspicious",
    },
    {
      id: "p1-transfer",
      title: "A mesma marca aparece em uma origem esperada",
      context:
        "O compartilhamento foi iniciado no portal fictício e a origem esperada é leroymerlin.example.",
      url: "https://arquivos.leroymerlin.example/compartilhar?id=348",
      expectedOrigin: "leroymerlin.example",
      segments: [
        {
          id: "p1-transfer-protocol",
          value: "https://",
          roleId: "protocol",
        },
        {
          id: "p1-transfer-subdomain",
          value: "arquivos.",
          roleId: "subdomain",
        },
        {
          id: "p1-transfer-domain",
          value: "leroymerlin.example",
          roleId: "registeredDomain",
        },
        {
          id: "p1-transfer-path",
          value: "/compartilhar",
          roleId: "path",
        },
        {
          id: "p1-transfer-parameter",
          value: "?id=348",
          roleId: "parameter",
        },
      ],
      correctRegisteredDomainSegmentId: "p1-transfer-domain",
      correctVerdictId: "legitimate",
    },
    "official-favorite",
    {
      success:
        "Você separou a marca visual da origem e escolheu uma rota obtida fora do aviso.",
      review:
        "Revise qual trecho é o domínio registrado e evite usar o próprio endereço analisado como confirmação.",
    },
  ),
  createPackage(
    "phishlab:link-analyzer:v2:p2-path-brand",
    "2026-08-15",
    "p2-path-brand",
    "Marca depois da barra",
    "Palavras de marca aparecem no caminho e no parâmetro, sem mudar a origem.",
    {
      id: "p2-main",
      title: "A marca aparece somente depois da barra",
      context:
        "Uma mensagem inesperada pede atualização cadastral em nome de uma instituição fictícia.",
      url: "https://acesso-seguro.example/leroymerlin/entrar?destino=leroymerlin.example",
      expectedOrigin: "leroymerlin.example",
      segments: [
        { id: "p2-main-protocol", value: "https://", roleId: "protocol" },
        { id: "p2-main-subdomain", value: "", roleId: "subdomain" },
        {
          id: "p2-main-domain",
          value: "acesso-seguro.example",
          roleId: "registeredDomain",
        },
        {
          id: "p2-main-path",
          value: "/leroymerlin/entrar",
          roleId: "path",
        },
        {
          id: "p2-main-parameter",
          value: "?destino=leroymerlin.example",
          roleId: "parameter",
        },
      ],
      correctRegisteredDomainSegmentId: "p2-main-domain",
      correctVerdictId: "suspicious",
    },
    {
      id: "p2-transfer",
      title: "Parâmetros também existem em campanhas legítimas",
      context:
        "A campanha foi aberta pelo portal fictício e mantém a origem esperada.",
      url: "https://leroymerlin.example/campanha?origem=boletim",
      expectedOrigin: "leroymerlin.example",
      segments: [
        {
          id: "p2-transfer-protocol",
          value: "https://",
          roleId: "protocol",
        },
        { id: "p2-transfer-subdomain", value: "", roleId: "subdomain" },
        {
          id: "p2-transfer-domain",
          value: "leroymerlin.example",
          roleId: "registeredDomain",
        },
        {
          id: "p2-transfer-path",
          value: "/campanha",
          roleId: "path",
        },
        {
          id: "p2-transfer-parameter",
          value: "?origem=boletim",
          roleId: "parameter",
        },
      ],
      correctRegisteredDomainSegmentId: "p2-transfer-domain",
      correctVerdictId: "legitimate",
    },
    "official-favorite",
    {
      success:
        "Você distinguiu a origem das palavras colocadas no caminho e no parâmetro.",
      review:
        "Palavras posteriores à barra descrevem recursos; volte à fronteira do domínio registrado.",
    },
  ),
  createPackage(
    "phishlab:link-analyzer:v2:p3-long-legitimate",
    "2026-08-15",
    "p3-long-legitimate",
    "Endereço longo legítimo",
    "O comprimento parece complexo, mas contexto e domínio registrado permanecem coerentes.",
    {
      id: "p3-main",
      title: "Um endereço longo no fluxo que você iniciou",
      context:
        "Você iniciou este treinamento no portal e espera a origem leroymerlin.example.",
      url: "https://treinamento.colaboradores.leroymerlin.example/curso/phishing?modulo=dominios",
      expectedOrigin: "leroymerlin.example",
      segments: [
        { id: "p3-main-protocol", value: "https://", roleId: "protocol" },
        {
          id: "p3-main-subdomain",
          value: "treinamento.colaboradores.",
          roleId: "subdomain",
        },
        {
          id: "p3-main-domain",
          value: "leroymerlin.example",
          roleId: "registeredDomain",
        },
        {
          id: "p3-main-path",
          value: "/curso/phishing",
          roleId: "path",
        },
        {
          id: "p3-main-parameter",
          value: "?modulo=dominios",
          roleId: "parameter",
        },
      ],
      correctRegisteredDomainSegmentId: "p3-main-domain",
      correctVerdictId: "legitimate",
    },
    {
      id: "p3-transfer",
      title: "Uma troca pequena muda a origem",
      context:
        "A finalidade continua igual, mas o domínio registrado já não é o esperado.",
      url: "https://treinamento.colaboradores.leroymerlin-acesso.example/curso/phishing?modulo=dominios",
      expectedOrigin: "leroymerlin.example",
      segments: [
        {
          id: "p3-transfer-protocol",
          value: "https://",
          roleId: "protocol",
        },
        {
          id: "p3-transfer-subdomain",
          value: "treinamento.colaboradores.",
          roleId: "subdomain",
        },
        {
          id: "p3-transfer-domain",
          value: "leroymerlin-acesso.example",
          roleId: "registeredDomain",
        },
        {
          id: "p3-transfer-path",
          value: "/curso/phishing",
          roleId: "path",
        },
        {
          id: "p3-transfer-parameter",
          value: "?modulo=dominios",
          roleId: "parameter",
        },
      ],
      correctRegisteredDomainSegmentId: "p3-transfer-domain",
      correctVerdictId: "suspicious",
    },
    "continue-initiated-flow",
    {
      success:
        "Você evitou usar comprimento como veredito e comparou origem, contexto e finalidade.",
      review:
        "Endereço longo não é fraude por si só; revise domínio registrado e contexto iniciado.",
    },
  ),
] as const;

export type DomainAnalyzerV2Package =
  (typeof DOMAIN_UNDER_MAGNIFIER_V2_PACKAGES)[number];

export function findDomainAnalyzerV2Package(casePackageId: string) {
  return (
    DOMAIN_UNDER_MAGNIFIER_V2_PACKAGES.find(
      (contentPackage) => contentPackage.casePackageId === casePackageId,
    ) ?? null
  );
}
