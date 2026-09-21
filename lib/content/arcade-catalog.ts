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
  format: string;
  artwork?: string;
};

export const ARCADE_GAMES: ArcadeGame[] = [
  {
    id: "arcade:overlooked",
    slug: "overlooked",
    title: "Office Defenders",
    shortTitle: "OD",
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
    format: "Cooperativo",
    artwork: "/arcade/covers/office-defenders.png",
  },
  {
    id: "arcade:dumb-ways-to-phish",
    slug: "dumb-ways-to-phish",
    title: "Dumb Ways to Phish",
    shortTitle: "DW",
    status: "available",
    statusLabel: "Disponível",
    summary: "Microjogos rápidos: três vidas para observar, agir e reconhecer armadilhas digitais.",
    purpose: "Praticar decisões de segurança em diferentes situações sob pressão de tempo.",
    difficulty: "Microjogos",
    duration: "Livre",
    competencies: ["Agir", "Observar", "Decidir"],
    scoreScale: "Recorde da sequência",
    caseCount: 0,
    format: "Sequência de microjogos",
    artwork: "/arcade/covers/dumb-ways-to-phish.png",
  },
  {
    id: "arcade:dumb-ways-extras",
    slug: "dumb-ways-extras",
    title: "Dumb Ways: Extras",
    shortTitle: "DX",
    status: "available",
    statusLabel: "Disponível",
    summary: "Cinco treinos rápidos sobre links, logins e confirmação de pedidos, com um desafio extra para desbloquear.",
    purpose: "Praticar a inspeção de endereços e a confirmação de pedidos em rodadas curtas.",
    difficulty: "Microjogos",
    duration: "10 rodadas por jogo",
    competencies: ["Observar", "Verificar", "Decidir"],
    scoreScale: "Melhor partida: até 10 acertos",
    caseCount: 10,
    format: "Cinco jogos e desafio mestre",
    artwork: "/arcade/covers/dumb-ways-extras.png",
  },
  {
    id: "arcade:phish-slice",
    slug: "phish-slice",
    title: "Phish Slice",
    shortTitle: "PS",
    status: "available",
    statusLabel: "Disponível",
    summary: "Compare os domínios e corte as imitações antes que atravessem a arena.",
    purpose: "Treinar a leitura de domínios e identificar endereços falsos.",
    difficulty: "Agilidade",
    duration: "Livre",
    competencies: ["Comparar", "Reagir"],
    scoreScale: "Recorde no jogo",
    caseCount: 0,
    format: "Corte e precisão",
    artwork: "/arcade/covers/phish-slice.png",
  },
  {
    id: "arcade:email-please",
    slug: "email-please",
    title: "Email, Please",
    shortTitle: "EP",
    status: "available",
    statusLabel: "Disponível",
    summary: "Analise mensagens na mesa e carimbe sua decisão sobre cada caso.",
    purpose: "Investigar sinais de phishing em mensagens e anexos.",
    difficulty: "Investigação",
    duration: "Livre",
    competencies: ["Investigar", "Classificar"],
    scoreScale: "Acertos até 2 erros",
    caseCount: 0,
    format: "Mesa de análise",
    artwork: "/arcade/covers/email-please.png",
  },
  {
    id: "arcade:phishing-beat",
    slug: "phishing-beat",
    title: "Phishing Beat",
    shortTitle: "PB",
    status: "available",
    statusLabel: "Disponível",
    summary: "Observe o remetente ou domínio e reporte o phishing no ritmo da música.",
    purpose: "Reconhecer inconsistências no contexto de cada fase.",
    difficulty: "Ritmo",
    duration: "6 fases",
    competencies: ["Ritmo", "Atenção"],
    scoreScale: "Soma dos recordes das 6 fases",
    caseCount: 0,
    format: "Jogo de ritmo",
    artwork: "/arcade/covers/phishing-beat.png",
  },
  {
    id: "arcade:phishing-escape",
    slug: "phishing-escape",
    title: "Phishing Escape",
    shortTitle: "PE",
    status: "available",
    statusLabel: "Disponível",
    summary: "Explore o escritório, encontre pistas e resolva o desafio de phishing.",
    purpose: "Aplicar sinais de segurança em uma exploração interativa.",
    difficulty: "Exploração",
    duration: "Livre",
    competencies: ["Explorar", "Investigar"],
    scoreScale: "Pontuação no jogo",
    caseCount: 0,
    format: "Escape room",
  },
  {
    id: "arcade:chefia-em-jogo",
    slug: "chefia-em-jogo",
    title: "Chefia em Jogo",
    shortTitle: "CJ",
    status: "available",
    statusLabel: "Disponível",
    summary: "Decida entre pessoas, segurança e resultados para permanecer no cargo.",
    purpose: "Treinar decisões sobre riscos digitais dentro da rotina de uma empresa.",
    difficulty: "Estratégia",
    duration: "Livre",
    competencies: ["Decidir", "Equilibrar", "Investigar"],
    scoreScale: "Semanas no cargo",
    caseCount: 0,
    format: "Cartas e decisões",
    artwork: "/arcade/covers/chefia-em-jogo.png",
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
