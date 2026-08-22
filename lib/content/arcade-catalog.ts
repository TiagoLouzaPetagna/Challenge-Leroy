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

export const ARCADE_REWARD_TIERS = [
  { id: "participation", label: "Partida válida", positionLabel: "Participação", points: 10 },
  { id: "top-25", label: "Top 25", positionLabel: "Até 25º", points: 25 },
  { id: "top-10", label: "Top 10", positionLabel: "Até 10º", points: 50 },
  { id: "top-3", label: "Top 3", positionLabel: "Até 3º", points: 75 },
  { id: "first", label: "1º lugar", positionLabel: "1º", points: 100 },
] as const;

export const ARCADE_GAMES: ArcadeGame[] = [
  {
    id: "arcade:detector",
    slug: "detector-relampago",
    title: "Detector Relâmpago",
    shortTitle: "DR",
    status: "ready",
    statusLabel: "Pronto para integração",
    summary:
      "Reconheça o tipo da mensagem e identifique o sinal mais importante em 12 casos variados.",
    purpose:
      "Praticar reconhecimento rápido sem substituir a investigação aprofundada de Simulações e PhishLab.",
    difficulty: "Intermediário",
    duration: "4–6 min",
    competencies: ["Observar", "Decidir"],
    scoreScale: "Até 1.200 pontos",
    caseCount: 12,
  },
];

export const DETECTOR_SCORING = [
  { label: "Classificação correta", points: 70 },
  { label: "Sinal principal correto", points: 30 },
] as const;

export const DETECTOR_TIE_BREAKS = [
  "Maior pontuação",
  "Maior sequência de acertos completos",
  "Menor quantidade de falsos positivos",
  "Resultado alcançado primeiro",
] as const;

export const DETECTOR_CASE_BALANCE = [
  { label: "Phishing", count: 4, marker: "PH" },
  { label: "Legítimas no contexto", count: 4, marker: "LG" },
  { label: "Exigem verificação", count: 4, marker: "VE" },
] as const;

export const DETECTOR_SECONDARY_MISSIONS = [
  "Concluir uma partida válida",
  "Acertar pelo menos 8 das 12 classificações",
  "Alcançar uma sequência de cinco acertos completos",
  "Terminar sem falsos positivos",
] as const;

export const DETECTOR_LEADERBOARD_PREVIEW = [
  { position: 1, name: "Ana P.", area: "Ferramentas", score: 1140, streak: 11 },
  { position: 2, name: "Rafael M.", area: "Tintas", score: 1110, streak: 10 },
  { position: 3, name: "Camila S.", area: "Jardim", score: 1080, streak: 9 },
  { position: 4, name: "Diego R.", area: "Logística", score: 1040, streak: 8 },
] as const;

export function findArcadeGameBySlug(slug: string | null | undefined) {
  return ARCADE_GAMES.find((game) => game.slug === slug) ?? null;
}
