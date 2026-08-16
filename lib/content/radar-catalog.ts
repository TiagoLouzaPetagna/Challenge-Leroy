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
    status: "planned",
    updatedLabel: "Próximo conteúdo",
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
    status: "planned",
    updatedLabel: "Conteúdo planejado",
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
    status: "planned",
    updatedLabel: "Conteúdo planejado",
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
    status: "planned",
    updatedLabel: "Conteúdo planejado",
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
    status: "planned",
    updatedLabel: "Conteúdo planejado",
    lead: "Reportar cedo ajuda mais do que tentar esconder ou resolver o incidente sozinho.",
  },
];

export const RADAR_QUESTION_OPTIONS = [
  {
    id: "scan-and-trust",
    label: "Escanear e confiar se a página usar HTTPS",
    explanation:
      "HTTPS protege a conexão, mas não comprova que o site pertence à organização esperada.",
  },
  {
    id: "inspect-and-confirm",
    label: "Ver o destino, avaliar o contexto e confirmar por um canal conhecido",
    explanation:
      "Correto. O destino e o contexto precisam ser verificados antes de qualquer dado ou ação sensível.",
  },
  {
    id: "avoid-all-qr",
    label: "Evitar todos os QR Codes, mesmo os esperados",
    explanation:
      "Bloquear todos os QR Codes gera falsos positivos. O objetivo é investigar e confirmar, não rejeitar automaticamente.",
  },
] as const;

export const RADAR_CORRECT_OPTION_ID = "inspect-and-confirm";

export function findRadarArticleBySlug(slug: string) {
  return RADAR_ARTICLES.find((article) => article.slug === slug) ?? null;
}
