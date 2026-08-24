export type AchievementId =
  | "olhar-atento"
  | "verificacao-segura"
  | "protecao-em-equipe"
  | "investigacao-consolidada";

export type AchievementDefinition = {
  id: AchievementId;
  title: string;
  description: string;
  condition: string;
  rewardPoints: number;
};

// O valor fica na definição de cada conquista para permitir ajustes individuais
// quando o catálogo definitivo de recompensas for definido.
export const ACHIEVEMENT_CATALOG: readonly AchievementDefinition[] = [
  {
    id: "olhar-atento",
    title: "Olhar atento",
    description: "Relacionou o pedido, o ativo protegido e a consequência.",
    condition:
      "Identifique corretamente pedido, ativo e consequência na primeira Missão.",
    rewardPoints: 100,
  },
  {
    id: "verificacao-segura",
    title: "Verificação segura",
    description: "Confirmou um pedido incomum por outro canal conhecido.",
    condition: "Escolha corretamente verificar por outro canal em uma atividade.",
    rewardPoints: 100,
  },
  {
    id: "protecao-em-equipe",
    title: "Proteção em equipe",
    description: "Fez uma contribuição válida para a proteção coletiva.",
    condition: "Conclua o desafio de Equipes com uma contribuição agregada.",
    rewardPoints: 100,
  },
  {
    id: "investigacao-consolidada",
    title: "Investigação consolidada",
    description: "Demonstrou a competência Investigar em contextos diferentes.",
    condition: "Alcance o nível Consolidada na competência Investigar.",
    rewardPoints: 100,
  },
] as const;

export function achievementClaimKey(id: AchievementId): string {
  return `achievement:${id}`;
}

export function findAchievement(id: string): AchievementDefinition | undefined {
  return ACHIEVEMENT_CATALOG.find((achievement) => achievement.id === id);
}
