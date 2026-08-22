export type TutorialStepDefinition = {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  detail: string;
  target: string | null;
  targetLabel: string;
};

export const TUTORIAL_STEPS: readonly TutorialStepDefinition[] = [
  {
    id: "welcome",
    eyebrow: "Boas-vindas",
    title: "Sua jornada pela Casa Digital Segura começa aqui",
    description:
      "Em cerca de dois minutos, você conhecerá os principais espaços do portal e como acompanhar sua evolução.",
    detail:
      "Todos os casos, endereços e mensagens utilizados nas atividades são fictícios e foram preparados para uma experiência segura.",
    target: null,
    targetLabel: "Apresentação inicial do portal",
  },
  {
    id: "next-step",
    eyebrow: "Orientação personalizada",
    title: "Comece sempre pelo seu próximo passo",
    description:
      "A Visão geral destaca uma atividade principal e explica por que ela foi recomendada para você.",
    detail:
      "Uma revisão pode ganhar destaque quando houver algo para praticar, mas nunca bloqueia a continuação da jornada.",
    target: '[data-tour="next-step"]',
    targetLabel: "Cartão Seu próximo passo",
  },
  {
    id: "learning-areas",
    eyebrow: "Minha jornada",
    title: "Cada área desenvolve uma parte da aprendizagem",
    description:
      "Missões contam a história principal; Simulações exercitam decisões; PhishLab aprofunda a investigação; Radar explica técnicas; e Arcade reúne jogos futuros.",
    detail:
      "Você pode explorar livremente essas áreas, mesmo quando a plataforma apresenta uma recomendação.",
    target: '[data-tour="learning-navigation"]',
    targetLabel: "Grupo Minha jornada da navegação principal",
  },
  {
    id: "progress",
    eyebrow: "Evolução com privacidade",
    title: "Pontos e escudo mostram progressos diferentes",
    description:
      "Os pontos confirmados aumentam seu nível pessoal, enquanto o escudo combina participação, precisão e cobertura de competências da equipe.",
    detail:
      "Suas notas, seus erros e suas decisões ficam no perfil privado. Colegas visualizam somente os indicadores agregados da equipe.",
    target: '[data-tour="progress-summary"]',
    targetLabel: "Resumo de pontos e nível",
  },
  {
    id: "ready",
    eyebrow: "Tudo pronto",
    title: "Agora você já pode começar a jornada",
    description:
      "A primeira Missão apresenta o fundamento usado nas atividades seguintes e explica cada decisão dentro do próprio contexto.",
    detail:
      "Quando um caso pedir reporte ou recuperação, a própria atividade mostrará a orientação fictícia necessária. Nenhuma ação envia um reporte real.",
    target: null,
    targetLabel: "Conclusão da apresentação inicial",
  },
] as const;

export const TUTORIAL_LAST_STEP = TUTORIAL_STEPS.length - 1;
