export type TutorialChipTone = "mode" | "neutral";

export type TutorialStepDefinition = {
  id: string;
  title: string;
  description: string;
  target: string | null;
  chipLabel: string | null;
  chipTone: TutorialChipTone | null;
  /** Só para chips "mode" com cor fixa. O passo "next-step" recebe a cor em runtime (área da recomendação real). */
  chipColor?: string;
};

export const TUTORIAL_STEPS: readonly TutorialStepDefinition[] = [
  {
    id: "welcome",
    title: "Esta é a sua oficina.",
    description:
      "Aqui você treina, uma ferramenta por vez, para reconhecer golpes no dia a dia da loja. Cinco telas e você começa.",
    target: null,
    chipLabel: null,
    chipTone: null,
  },
  {
    id: "next-step",
    title: "Comece sempre por aqui.",
    description:
      "Esta é a sua próxima atividade. A plataforma escolhe uma de cada vez, para você não precisar decidir por onde entrar.",
    target: '[data-tour="next-step"]',
    chipLabel: "Seu próximo passo",
    chipTone: "mode",
  },
  {
    id: "menu",
    title: "Tudo o que existe fica neste menu.",
    description:
      "Jornada conta a história principal. Use a seta ao lado para abrir PhishLab e Simulações, onde você treina decisões. Radar explica os golpes. Equipes é da sua área. Arcade é jogo. Você pode entrar em qualquer uma quando quiser, mesmo quando a plataforma recomenda outra coisa.",
    target: '[data-tour="menu-panel"]',
    chipLabel: "Menu",
    chipTone: "neutral",
  },
  {
    id: "team-shield",
    title: "Sua área joga junto.",
    description:
      "Abra Equipes para praticar o desafio da sua área e acompanhar o progresso do setor. Respostas e erros individuais ficam privados.",
    target: '[data-tour="team-shield"]',
    chipLabel: "Seu setor",
    chipTone: "mode",
    chipColor: "var(--learn-yellow)",
  },
  {
    id: "ready",
    title: "Pronto. Sua primeira Missão está esperando.",
    description:
      "Nela você investiga um caso e decide o que fazer. Esta apresentação não aparece de novo — se quiser rever, ela fica no seu perfil.",
    target: null,
    chipLabel: null,
    chipTone: null,
  },
] as const;

export const TUTORIAL_LAST_STEP = TUTORIAL_STEPS.length - 1;

/** home.md/onboarding.md: só o último passo tem segunda versão (replay pelo Perfil). */
export const TUTORIAL_REPLAY_LAST_STEP = {
  title: "É isso.",
  description: "Você pode voltar aqui quando quiser, pelo seu perfil.",
};
