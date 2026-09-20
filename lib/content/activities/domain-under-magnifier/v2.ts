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
  { id: "protocol", label: "O começo (https://)" },
  { id: "subdomain", label: "Vem antes do site" },
  { id: "registeredDomain", label: "O site de verdade" },
  { id: "path", label: "A página dentro do site" },
  { id: "parameter", label: "Os extras depois do ?" },
] as const;

const verdictOptions = [
  { id: "legitimate", label: "Posso abrir" },
  { id: "suspicious", label: "É golpe. Não abrir" },
  { id: "inconclusive", label: "Ainda não sei. Preciso conferir" },
] as const;

const safeRouteOptions = [
  {
    id: "official-favorite",
    label: "Fechar e abrir o site pelos meus favoritos",
  },
  {
    id: "continue-initiated-flow",
    label: "Continuar só o que eu mesmo comecei",
  },
  {
    id: "analyzed-address",
    label: "Abrir o link para ver se a página parece real",
  },
] as const;

const calibration: DomainAnalyzerCase = {
  id: "calibration-store",
  title: "Um exemplo primeiro",
  context:
    "Este já vem respondido, só para você ver como funciona.",
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
        "Chegou um link no trabalho. Antes de clicar, vale descobrir de onde ele vem.",
      situation: mainCase.context,
      task:
        "Separe as partes do link, ache qual delas é o site de verdade e compare com o site que você esperava.",
      protectedConsequence:
        "Assim um nome conhecido não engana você — e um link comprido, mas verdadeiro, não é barrado à toa.",
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
    "O nome vem antes",
    "O nome da empresa aparece no link, mas quem manda é outro site.",
    {
      id: "p1-main",
      title: "O nome conhecido vem antes do site real",
      context:
        "Um aviso que você não pediu diz que sua conta será suspensa e manda confirmar agora.",
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
      title: "Agora o mesmo nome, mas no site certo",
      context:
        "Desta vez foi você quem pediu o arquivo, pelo portal da empresa.",
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
        "Você não se deixou levar pelo nome conhecido e foi conferir por fora.",
      review:
        "O site de verdade é o trecho logo antes da primeira barra. E o próprio link nunca serve de prova.",
    },
  ),
  createPackage(
    "phishlab:link-analyzer:v2:p2-path-brand",
    "2026-08-15",
    "p2-path-brand",
    "O nome vem depois da barra",
    "O nome da empresa aparece depois da barra. Isso não muda o site.",
    {
      id: "p2-main",
      title: "O nome conhecido só aparece depois da barra",
      context:
        "Uma mensagem que você não esperava pede para atualizar seu cadastro.",
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
      title: "Link comprido também pode ser verdadeiro",
      context:
        "Foi você quem abriu esta campanha, pelo portal da empresa.",
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
        "Você viu que o que vem depois da barra não muda o site.",
      review:
        "Tudo que vem depois da primeira barra é só a página. O site é o que vem antes dela.",
    },
  ),
  createPackage(
    "phishlab:link-analyzer:v2:p3-long-legitimate",
    "2026-08-15",
    "p3-long-legitimate",
    "Link comprido, mas verdadeiro",
    "O link é longo e assusta, mas o site e o contexto batem.",
    {
      id: "p3-main",
      title: "Um link comprido que você mesmo pediu",
      context:
        "Foi você quem abriu este treinamento no portal da empresa.",
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
      title: "Uma letra a mais muda tudo",
      context:
        "Parece o mesmo link de antes. Olhe com atenção o site.",
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
        "Você não julgou pelo tamanho do link: comparou o site e o contexto.",
      review:
        "Link comprido não é golpe por si só. O que importa é o site e se foi você quem começou.",
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
