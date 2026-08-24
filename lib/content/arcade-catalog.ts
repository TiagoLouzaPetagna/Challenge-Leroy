export type ArcadeGameStatus = "development" | "ready" | "available";

export type ArcadeGame = {
  id: string;
  slug: string;
  title: string;
  shortTitle: string;
  status: ArcadeGameStatus;
  statusLabel: string;
  summary: string;
  purpose: string;
  difficulty: string;
  duration: string;
  competencies: string[];
  scoreScale: string;
  caseCount: number;
};

export const ARCADE_GAMES: ArcadeGame[] = [
  {
    id: "arcade:overlooked",
    slug: "overlooked",
    title: "Overlooked",
    shortTitle: "OV",
    status: "available",
    statusLabel: "Disponível",
    summary:
      "Protejam juntos a rotina do escritório: reportem phishing e concluam solicitações legítimas antes que o expediente termine.",
    purpose:
      "Treinar reconhecimento de mensagens suspeitas e execução cuidadosa de solicitações legítimas em uma dinâmica cooperativa para duas pessoas.",
    difficulty: "Cooperativo",
    duration: "5 min",
    competencies: ["Observar", "Cooperar", "Decidir"],
    scoreScale: "De −165 a 155 pontos",
    caseCount: 12,
  },
];

export const OVERLOOKED_SCORING = [
  { label: "Phishing reportado", points: 15 },
  { label: "Solicitação legítima concluída", points: 10 },
  { label: "Solicitação legítima descartada", points: -5 },
  { label: "Phishing processado", points: -20 },
] as const;

export const OVERLOOKED_TIE_BREAKS = [
  "Maior pontuação",
  "Mais phishings reportados",
  "Mais solicitações legítimas concluídas",
  "Menos erros",
  "Resultado alcançado primeiro",
] as const;

export const OVERLOOKED_CASE_BALANCE = [
  { label: "Mensagens legítimas", count: 5, marker: "LG" },
  { label: "Tentativas de phishing", count: 7, marker: "PH" },
  { label: "Jogadores no mesmo teclado", count: 2, marker: "2P" },
] as const;

export const OVERLOOKED_SECONDARY_MISSIONS = [
  "Concluir uma partida válida classificando pelo menos oito mensagens",
  "Alcançar 100 pontos ou mais",
  "Reportar todos os phishings que aparecerem",
  "Terminar sem descartar uma solicitação legítima",
] as const;

export const OVERLOOKED_RANKS = [
  { minimum: 140, label: "Elite Anti-Phishing" },
  { minimum: 110, label: "Caçador de Phishing" },
  { minimum: 80, label: "Guardião Digital" },
  { minimum: 50, label: "Analista de Governança" },
  { minimum: 20, label: "Analista em Formação" },
  { minimum: 0, label: "Em treinamento" },
  { minimum: -165, label: "Revisão necessária" },
] as const;

export function findArcadeGameBySlug(slug: string | null | undefined) {
  if (slug === "detector-relampago") {
    return ARCADE_GAMES.find((game) => game.slug === "overlooked") ?? null;
  }
  return ARCADE_GAMES.find((game) => game.slug === slug) ?? null;
}
