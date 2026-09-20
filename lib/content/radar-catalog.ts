import type { CompetencyId } from "../domain/types";

export type RadarCategory =
  | "links-e-qr"
  | "mensagens"
  | "identidade"
  | "acesso"
  | "resposta";

export type RadarArticleDefinition = {
  id: string;
  slug: string;
  version: number;
  title: string;
  summary: string;
  category: RadarCategory;
  categoryLabel: string;
  competencyId: CompetencyId;
  competencyLabel: string;
  estimatedMinutes: number;
  status: "available" | "planned";
  updatedLabel: string;
  lead: string;
};

export const RADAR_FEATURED_ARTICLE_ID = "radar:quishing";
export const RADAR_FEATURED_ARTICLE_VERSION = 1;

export const RADAR_ARTICLES: RadarArticleDefinition[] = [
  {
    id: RADAR_FEATURED_ARTICLE_ID,
    slug: "quishing",
    version: RADAR_FEATURED_ARTICLE_VERSION,
    title: "Quishing: phishing escondido em QR Codes",
    summary:
      "Entenda por que um QR Code pode ocultar o destino real e quais verificações fazer antes de continuar.",
    category: "links-e-qr",
    categoryLabel: "Links e QR Codes",
    competencyId: "investigar",
    competencyLabel: "Investigar",
    estimatedMinutes: 4,
    status: "available",
    updatedLabel: "Conteúdo em destaque",
    lead:
      "O QR Code não é perigoso por si só. O risco aparece quando ele é usado para esconder um endereço malicioso e pressionar a pessoa a agir sem verificar.",
  },
  {
    id: "radar:unexpected-attachments",
    slug: "anexos-inesperados",
    version: 1,
    title: "Anexos inesperados e falsas notas fiscais",
    summary:
      "Como avaliar contexto, extensão do arquivo e canal de confirmação antes de abrir um documento.",
    category: "mensagens",
    categoryLabel: "Mensagens e anexos",
    competencyId: "observar",
    competencyLabel: "Observar",
    estimatedMinutes: 5,
    status: "available",
    updatedLabel: "Leitura disponível",
    lead: "Um anexo plausível ainda precisa fazer sentido dentro da rotina esperada.",
  },
  {
    id: "radar:manager-impersonation",
    slug: "falso-gestor",
    version: 1,
    title: "Quando o golpista se passa por um gestor",
    summary:
      "Sinais de autoridade, urgência e sigilo usados para induzir pagamentos ou envio de dados.",
    category: "identidade",
    categoryLabel: "Identidade e confiança",
    competencyId: "verificar",
    competencyLabel: "Verificar",
    estimatedMinutes: 6,
    status: "available",
    updatedLabel: "Leitura disponível",
    lead: "A identidade aparente não substitui a confirmação por um canal conhecido.",
  },
  {
    id: "radar:mfa-fatigue",
    slug: "fadiga-mfa",
    version: 1,
    title: "Fadiga de MFA: aprovações que você não iniciou",
    summary:
      "O que fazer quando notificações de acesso chegam repetidamente ao celular ou computador.",
    category: "acesso",
    categoryLabel: "Contas e acesso",
    competencyId: "decidir",
    competencyLabel: "Decidir",
    estimatedMinutes: 4,
    status: "available",
    updatedLabel: "Leitura disponível",
    lead: "Uma solicitação insistente não se torna legítima por aparecer muitas vezes.",
  },
  {
    id: "radar:message-scams",
    slug: "golpes-por-mensagem",
    version: 1,
    title: "Golpes por mensagem e troca de número",
    summary:
      "Como reconhecer pedidos fora do padrão em aplicativos de mensagem e confirmar a identidade.",
    category: "mensagens",
    categoryLabel: "Mensagens e anexos",
    competencyId: "verificar",
    competencyLabel: "Verificar",
    estimatedMinutes: 5,
    status: "available",
    updatedLabel: "Leitura disponível",
    lead: "Um nome e uma foto conhecidos podem ser copiados; o contexto precisa ser confirmado.",
  },
  {
    id: "radar:after-click",
    slug: "depois-do-clique",
    version: 1,
    title: "Cliquei em um link suspeito. E agora?",
    summary:
      "Uma sequência simples para interromper o risco, reportar rapidamente e apoiar a resposta.",
    category: "resposta",
    categoryLabel: "Resposta segura",
    competencyId: "recuperar",
    competencyLabel: "Recuperar",
    estimatedMinutes: 4,
    status: "available",
    updatedLabel: "Leitura disponível",
    lead: "Reportar cedo ajuda mais do que tentar esconder ou resolver o incidente sozinho.",
  },
];

export const RADAR_QUESTION_OPTIONS = [
  {
    id: "scan-and-trust",
    label: "Abrir o endereço porque a prévia mostra HTTPS",
    explanation:
      "HTTPS protege a conexão, mas não comprova que o endereço pertence ao serviço esperado.",
  },
  {
    id: "inspect-and-confirm",
    label:
      "Fechar a prévia e abrir beneficios.intra.example pela rota que você já utilizava",
    explanation:
      "Correto. A rota já conhecida permite conferir o aviso sem depender do endereço entregue pelo próprio QR Code.",
  },
  {
    id: "avoid-all-qr",
    label: "Decidir que qualquer QR Code encontrado no local é fraudulento",
    explanation:
      "Os sinais justificam interromper e verificar, mas não provam que todo QR Code — nem mesmo este — seja fraudulento.",
  },
] as const;

export const RADAR_CORRECT_OPTION_ID = "inspect-and-confirm";

export const RADAR_QUISHING_CONTENT = {
  understand: {
    title: "O que o QR Code esconde — e o que ele não prova",
    paragraphs: [
      "Um QR Code transforma informações, como um endereço, em uma imagem. Isso facilita o acesso pelo celular, mas impede que você leia o destino antes de apontar a câmera.",
      "A imagem não autentica quem criou o código. Aparência profissional, logotipo e HTTPS também não confirmam que o destino pertence ao serviço esperado.",
    ],
    principle:
      "O código revela um destino; quem confirma a legitimidade é a comparação com uma referência independente.",
  },
  observe: {
    title: "Leia o cartaz como um conjunto de evidências",
    intro:
      "Você encontra este aviso fictício no refeitório. O leitor mostra a prévia do endereço, mas nenhuma página foi aberta.",
    poster: {
      location: "Cartaz fictício · Refeitório",
      headline: "Atualize seus benefícios até as 16h",
      body: "Escaneie o código para evitar a suspensão do acesso.",
      previewLabel: "Prévia mostrada pelo leitor",
      previewAddress: "https://beneficios-colaborador.example/confirmar",
      knownRouteLabel: "Rota já conhecida no trabalho",
      knownRouteAddress: "https://beneficios.intra.example",
    },
    clues: [
      "O prazo curto tenta transformar urgência em ação imediata.",
      "O adesivo parece estar sobreposto ao material original.",
      "O domínio da prévia é diferente da rota interna já conhecida.",
    ],
  },
  evidence: {
    title: "Separe os sinais do que ainda precisa ser confirmado",
    intro:
      "Você já tem motivos para interromper a ação. Ainda não tem elementos para atribuir autoria ou declarar sozinho que houve um golpe.",
    confirmed: [
      "O cartaz cria urgência com um prazo até as 16h.",
      "O QR Code impede a leitura direta do endereço.",
      "A prévia mostra um domínio diferente da rota interna conhecida.",
    ],
    unconfirmed: [
      "Quem colocou o adesivo sobre o cartaz.",
      "Se o endereço da prévia é malicioso.",
      "Se a atualização foi realmente solicitada pela organização.",
    ],
  },
  act: {
    title: "Confirme sem depender do próprio aviso",
    intro:
      "A resposta segura reduz o risco sem transformar suspeita em certeza inventada.",
    steps: [
      {
        label: "Interrompa",
        detail: "Não abra a prévia e não informe dados por causa do prazo apresentado.",
      },
      {
        label: "Compare",
        detail: "Confira o domínio exibido e lembre qual rota você já usa para esse serviço.",
      },
      {
        label: "Acesse por fora",
        detail: "Feche a prévia e entre pela referência que já fazia parte da sua rotina.",
      },
      {
        label: "Preserve o contexto",
        detail: "Se a divergência continuar, registre onde e quando viu o material e busque orientação interna.",
      },
    ],
    prototypeNote:
      "Nesta demonstração, o QR Code é apenas uma representação visual: ele não pode ser escaneado, nenhum link é aberto e nenhum canal de reporte é presumido.",
  },
  check: {
    title: "Aplique a verificação ao caso do refeitório",
    context:
      "Você costuma acessar os benefícios por beneficios.intra.example. O cartaz pede atualização até as 16h, mas a prévia do QR Code mostra beneficios-colaborador.example/confirmar.",
    question: "O que você deve fazer antes de digitar qualquer dado?",
  },
  keyMessage:
    "Um QR Code pode esconder o destino. Ele não confirma quem controla esse destino.",
} as const;

export function findRadarArticleBySlug(slug: string) {
  return RADAR_ARTICLES.find((article) => article.slug === slug) ?? null;
}
