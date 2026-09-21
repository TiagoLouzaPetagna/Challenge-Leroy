export const SIMPLE_PILOT_VERSION = 2 as const;

export const MANAGER_REQUEST_ID = "mission:urgent-manager-request" as const;
export const LOOKALIKE_ID = "phishlab:lookalike-identifier" as const;
export const UNEXPECTED_DOCUMENT_ID = "mission:unexpected-document" as const;
export const DESTINATION_CHAIN_ID = "phishlab:destination-chain" as const;

import type { CompetencyId } from "../../domain/types";

export type SimplePilotCoverKind = "manager" | "lookalike" | "attachment" | "chain";
export type SimplePilotOption = { id: string; label: string; detail?: string };
export type SimplePilotTask = {
  kind: "choice" | "place";
  prompt: string;
  context?: string;
  hint?: string;
  options: readonly SimplePilotOption[];
  target?: string;
  correctId: string;
};
export type SimplePilotDefinition = {
  activityId: string;
  version: typeof SIMPLE_PILOT_VERSION;
  area: "mission" | "phishlab";
  title: string;
  eyebrow: string;
  route: `/${string}`;
  coverKind: SimplePilotCoverKind;
  durationMinutes: number;
  skill: string;
  competencyFocus: readonly CompetencyId[];
  recommendedAfterActivityIds: readonly string[];
  acceptedVersions: readonly number[];
  summary: string;
  caseLabel: string;
  caseIntro: string;
  scene: "manager-message" | "domain-comparison" | "unexpected-attachment" | "destination-chain";
  tasks: readonly [SimplePilotTask, SimplePilotTask, SimplePilotTask, SimplePilotTask];
  feedbackTitle: string;
  feedback: string;
  nextArea: string;
  nextTitle: string;
  nextRoute: string;
};

export const SIMPLE_PILOTS = {
  [MANAGER_REQUEST_ID]: {
    activityId: MANAGER_REQUEST_ID,
    version: SIMPLE_PILOT_VERSION,
    area: "mission",
    title: "Pedido urgente de um gestor",
    eyebrow: "Missão extra · Decidir sob pressão",
    route: "/missoes/pedido-urgente-do-gestor",
    coverKind: "manager",
    durationMinutes: 5,
    skill: "Decidir sob pressão",
    competencyFocus: ["verificar", "decidir"],
    recommendedAfterActivityIds: [LOOKALIKE_ID],
    acceptedVersions: [1, 2],
    summary: "Um pedido urgente quer pular uma aprovação. O que você faz antes de alterar o cadastro?",
    caseLabel: "Mensagem recebida",
    caseIntro: "Um suposto gestor pede uma mudança no cadastro de fornecedor para hoje.",
    scene: "manager-message",
    tasks: [
      {
        kind: "choice",
        prompt: "O que precisa de confirmação antes de agir?",
        options: [
          { id: "deadline", label: "O prazo de hoje" },
          { id: "approval", label: "Pular a segunda aprovação" },
          { id: "supplier", label: "O nome do fornecedor" },
        ],
        correctId: "approval",
      },
      {
        kind: "place",
        prompt: "Coloque a ação segura no próximo passo.",
        hint: "Arraste um cartão ou selecione-o e toque no espaço.",
        target: "Antes de alterar o cadastro",
        options: [
          { id: "independent", label: "Confirmar com o gestor pelo contato interno conhecido", detail: "Manter as duas aprovações" },
          { id: "same-thread", label: "Responder à mensagem e seguir o pedido", detail: "Dispensar a segunda aprovação" },
        ],
        correctId: "independent",
      },
      {
        kind: "choice",
        context: "Pelo contato interno, o gestor confirma que o prazo é hoje.",
        prompt: "Essa confirmação permite pular a segunda aprovação?",
        options: [
          { id: "keep-approval", label: "Não. O prazo não muda quem precisa aprovar." },
          { id: "skip-approval", label: "Sim. A confirmação do gestor substitui a aprovação." },
        ],
        correctId: "keep-approval",
      },
      {
        kind: "place",
        context: "A pessoa responsável pela segunda aprovação está ausente.",
        prompt: "Como encaminhar a alteração agora?",
        hint: "Arraste um cartão ou selecione-o e toque no espaço.",
        target: "Próximo passo",
        options: [
          { id: "approved-substitute", label: "Acionar o substituto previsto ou aguardar a aprovação", detail: "Registrar o pedido no fluxo correto" },
          { id: "approve-later", label: "Alterar agora e pedir aprovação amanhã", detail: "Resolver a urgência primeiro" },
        ],
        correctId: "approved-substitute",
      },
    ],
    feedbackTitle: "Pressa não substitui aprovação.",
    feedback: "Confirme o pedido com o gestor pelo contato interno que você já conhece. Mesmo que ele confirme a urgência, a segunda aprovação continua fazendo parte do processo.",
    nextArea: "PhishLab",
    nextTitle: "Uma letra fora do lugar",
    nextRoute: "/phishlab/uma-letra-fora-do-lugar",
  },
  [LOOKALIKE_ID]: {
    activityId: LOOKALIKE_ID,
    version: SIMPLE_PILOT_VERSION,
    area: "phishlab",
    title: "Uma letra fora do lugar",
    eyebrow: "Estação 03 · Comparar endereços",
    route: "/phishlab/uma-letra-fora-do-lugar",
    coverKind: "lookalike",
    durationMinutes: 5,
    skill: "Comparar endereços",
    competencyFocus: ["observar", "investigar", "decidir"],
    recommendedAfterActivityIds: ["phishlab:link-analyzer"],
    acceptedVersions: [1, 2],
    summary: "Compare o endereço recebido com a referência cadastrada e escolha por onde entrar.",
    caseLabel: "Dois endereços, uma referência",
    caseIntro: "Um aviso pede acesso ao portal. Você tem o endereço registrado pela empresa para comparar.",
    scene: "domain-comparison",
    tasks: [
      {
        kind: "place",
        prompt: "Qual endereço coincide com a referência?",
        hint: "Arraste um endereço ou selecione-o e toque no espaço.",
        target: "Coincide com o cadastro",
        options: [
          { id: "received", label: "contas.empreza.example" },
          { id: "registered", label: "contas.empresa.example" },
        ],
        correctId: "registered",
      },
      {
        kind: "choice",
        prompt: "Onde está a diferença entre os endereços?",
        options: [
          { id: "main-name", label: "No nome: empresa virou empreza" },
          { id: "suffix", label: "No final: .example mudou" },
          { id: "no-difference", label: "Não há diferença" },
        ],
        correctId: "main-name",
      },
      {
        kind: "choice",
        context: "O aviso usa a mesma marca e parece ter sido escrito pela empresa.",
        prompt: "O que a comparação permite concluir?",
        options: [
          { id: "not-confirmed", label: "O endereço do aviso não coincide com o cadastro" },
          { id: "criminal-owner", label: "Já sabemos quem criou o endereço do aviso" },
          { id: "visual-match", label: "A aparência confirma que o endereço é seguro" },
        ],
        correctId: "not-confirmed",
      },
      {
        kind: "place",
        prompt: "Coloque a rota segura para entrar na conta.",
        hint: "Arraste um cartão ou selecione-o e toque no espaço.",
        target: "Minha rota de acesso",
        options: [
          { id: "own-route", label: "Usar o endereço cadastrado", detail: "Sem abrir o link do aviso" },
          { id: "open-received", label: "Abrir o endereço do aviso", detail: "A página parece a mesma" },
        ],
        correctId: "own-route",
      },
    ],
    feedbackTitle: "Uma letra muda o destino.",
    feedback: "O endereço do aviso troca o “s” por “z”. Essa diferença basta para não usar aquele caminho. Ela não revela quem criou o endereço; para entrar, use a referência cadastrada.",
    nextArea: "PhishLab",
    nextTitle: "Domínio sob a lupa",
    nextRoute: "/phishlab/analisador-de-links",
  },
  [UNEXPECTED_DOCUMENT_ID]: {
    activityId: UNEXPECTED_DOCUMENT_ID,
    version: SIMPLE_PILOT_VERSION,
    area: "mission",
    title: "Documento inesperado",
    eyebrow: "Missão extra · Conferir antes de abrir",
    route: "/missoes/documento-inesperado",
    coverKind: "attachment",
    durationMinutes: 5,
    skill: "Conferir anexos",
    competencyFocus: ["observar", "verificar", "reportar"],
    recommendedAfterActivityIds: ["mission:compromised-conversation"],
    acceptedVersions: [2],
    summary: "Um currículo chegou para uma vaga que você não conhece. O que conferir antes de abrir o anexo?",
    caseLabel: "E-mail recebido",
    caseIntro: "Uma pessoa diz ter recebido indicação para uma vaga em sua área e envia um currículo. Você não foi avisado de nenhuma seleção aberta.",
    scene: "unexpected-attachment",
    tasks: [
      {
        kind: "choice",
        prompt: "O que falta confirmar antes de abrir o anexo?",
        options: [
          { id: "open-position", label: "Se existe uma seleção aberta para a área" },
          { id: "file-size", label: "Se o arquivo é pequeno" },
          { id: "polite-message", label: "Se a mensagem é educada" },
        ],
        correctId: "open-position",
      },
      {
        kind: "place",
        prompt: "Coloque a verificação no próximo passo.",
        hint: "Arraste um cartão ou selecione-o e toque no espaço.",
        target: "Antes de abrir",
        options: [
          { id: "ask-hr", label: "Consultar o RH pelo canal interno", detail: "Confirmar se o arquivo era esperado" },
          { id: "open-first", label: "Abrir o currículo para entender o pedido", detail: "Conferir depois" },
        ],
        correctId: "ask-hr",
      },
      {
        kind: "choice",
        context: "O RH informa que não há seleção aberta para essa área.",
        prompt: "O que você pode concluir sobre o anexo?",
        options: [
          { id: "unexpected", label: "Ele é inesperado; não sabemos seu conteúdo" },
          { id: "proven-malware", label: "Ele contém malware, com certeza" },
          { id: "safe-candidate", label: "Ele é seguro porque pode ser um candidato real" },
        ],
        correctId: "unexpected",
      },
      {
        kind: "place",
        prompt: "Como tratar essa mensagem agora?",
        hint: "Arraste um cartão ou selecione-o e toque no espaço.",
        target: "Encaminhamento",
        options: [
          { id: "report-without-opening", label: "Encaminhar pelo procedimento interno sem abrir", detail: "Registrar o contexto da mensagem" },
          { id: "disable-protection", label: "Desativar a proteção para testar o arquivo", detail: "Abrir e conferir por conta própria" },
        ],
        correctId: "report-without-opening",
      },
    ],
    feedbackTitle: "Confirme o contexto antes do arquivo.",
    feedback: "A ausência de seleção torna o anexo inesperado, mas não revela seu conteúdo. Não abra nem desligue a proteção para verificar: encaminhe a mensagem pelo procedimento interno.",
    nextArea: "Missões",
    nextTitle: "A conversa já estava acontecendo",
    nextRoute: "/missoes/a-conversa-ja-estava-acontecendo",
  },
  [DESTINATION_CHAIN_ID]: {
    activityId: DESTINATION_CHAIN_ID,
    version: SIMPLE_PILOT_VERSION,
    area: "phishlab",
    title: "Para onde esse link realmente vai?",
    eyebrow: "Estação 04 · Seguir o destino",
    route: "/phishlab/para-onde-esse-link-realmente-vai",
    coverKind: "chain",
    durationMinutes: 5,
    skill: "Investigar destinos",
    competencyFocus: ["investigar", "verificar", "decidir"],
    recommendedAfterActivityIds: ["phishlab:link-analyzer"],
    acceptedVersions: [2],
    summary: "Uma prévia mostra o percurso de um botão de e-mail. Confira onde ele termina antes de decidir.",
    caseLabel: "Prévia segura do link",
    caseIntro: "Um e-mail oferece um documento da equipe. A prévia abaixo mostra o texto do botão, o endereço intermediário e o destino final sem abrir nenhuma página.",
    scene: "destination-chain",
    tasks: [
      {
        kind: "choice",
        prompt: "O texto do botão confirma para onde ele leva?",
        options: [
          { id: "label-is-promise", label: "Não. O texto é uma promessa, não o destino." },
          { id: "label-is-proof", label: "Sim. O texto do botão confirma o destino." },
        ],
        correctId: "label-is-promise",
      },
      {
        kind: "place",
        prompt: "Coloque o último endereço do percurso no destino final.",
        hint: "Arraste um cartão ou selecione-o e toque no espaço.",
        target: "Destino final",
        options: [
          { id: "final-other", label: "arquivos-verificacao.example/entrar", detail: "Último endereço da prévia" },
          { id: "first-hop", label: "acesso.empresa.example/redir", detail: "Endereço intermediário" },
        ],
        correctId: "final-other",
      },
      {
        kind: "choice",
        context: "O destino final não coincide com o portal de documentos cadastrado pela empresa.",
        prompt: "O que essa diferença permite concluir?",
        options: [
          { id: "not-the-portal", label: "Esse link não termina no portal esperado" },
          { id: "intermediate-safe", label: "O endereço intermediário torna o final seguro" },
          { id: "owner-known", label: "Já sabemos quem criou o endereço final" },
        ],
        correctId: "not-the-portal",
      },
      {
        kind: "place",
        prompt: "Qual rota usar para consultar o documento?",
        hint: "Arraste um cartão ou selecione-o e toque no espaço.",
        target: "Minha próxima ação",
        options: [
          { id: "open-own-route", label: "Abrir o portal cadastrado por conta própria", detail: "Conferir se o documento existe lá" },
          { id: "follow-message", label: "Seguir o link do e-mail", detail: "O primeiro endereço parece corporativo" },
        ],
        correctId: "open-own-route",
      },
    ],
    feedbackTitle: "Confira o último destino.",
    feedback: "O botão promete um documento, mas o percurso termina fora do portal cadastrado. Não use esse link; acesse o portal por conta própria e confira se o documento está disponível.",
    nextArea: "PhishLab",
    nextTitle: "Domínio sob a lupa",
    nextRoute: "/phishlab/analisador-de-links",
  },
} as const satisfies Record<string, SimplePilotDefinition>;

export type SimplePilotId = keyof typeof SIMPLE_PILOTS;

export function isSimplePilotId(activityId: string | null): activityId is SimplePilotId {
  return activityId !== null && Object.prototype.hasOwnProperty.call(SIMPLE_PILOTS, activityId);
}
