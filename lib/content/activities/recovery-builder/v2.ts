import type { ActivityContentPackage } from "../../../activities/content";

export const RECOVERY_BUILDER_ACTIVITY_ID = "mission:clicked-now-what" as const;
export const RECOVERY_BUILDER_ACTIVITY_VERSION = 2 as const;
export const RECOVERY_BUILDER_MECHANIC_ID = "incident-response-builder" as const;

export type RecoveryActionGroupId = "now" | "next" | "do-not";
export type RecoveryOfficialRouteId =
  | "known-report-guide"
  | "message-contact"
  | "first-search-result";
export type RecoveryReportBlockId =
  | "received-channel"
  | "occurred-at"
  | "apparent-origin-destination"
  | "action-taken"
  | "affected-device"
  | "password-or-code"
  | "unconfirmed-claim";

export type RecoveryActionPlacement = {
  actionId: string;
  groupId: RecoveryActionGroupId;
  position: number;
};

export type RecoveryTimelineFact = {
  id: string;
  timeLabel: string;
  title: string;
  detail: string;
};

export type RecoveryExposureOption = {
  id: string;
  label: string;
  detail: string;
};

export type RecoveryActionCard = {
  id: string;
  title: string;
  detail: string;
};

export type RecoveryBuilderContent = {
  pathId: "p1-clicked-destination" | "p2-file-stage" | "p3-session-review";
  pathLabel: string;
  summary: string;
  role: string;
  situation: string;
  task: string;
  protectedConsequence: string;
  timelineFacts: readonly RecoveryTimelineFact[];
  exposureOptions: readonly RecoveryExposureOption[];
  actionCards: readonly RecoveryActionCard[];
  consequence: string;
  transfer: {
    title: string;
    context: string;
    exposureOptions: readonly RecoveryExposureOption[];
  };
};

export type RecoveryBuilderAllowlists = {
  timelineFactIds: readonly string[];
  correctTimelineFactIds: readonly string[];
  exposureStageIds: readonly string[];
  correctExposureStageId: string;
  actionIds: readonly string[];
  actionGroupIds: readonly RecoveryActionGroupId[];
  correctGroupByActionId: Readonly<Record<string, RecoveryActionGroupId>>;
  precedencePairs: readonly (readonly [string, string])[];
  harmfulActionIds: readonly string[];
  persistentRecoveryActionIds: readonly string[];
  officialRouteIds: readonly RecoveryOfficialRouteId[];
  correctOfficialRouteId: RecoveryOfficialRouteId;
  reportBlockIds: readonly RecoveryReportBlockId[];
  safeReportBlockIds: readonly RecoveryReportBlockId[];
  transferExposureIds: readonly string[];
  correctTransferExposureId: string;
  transferFirstActionIds: readonly string[];
  correctTransferFirstActionIds: readonly string[];
};

export const RECOVERY_ACTION_GROUP_OPTIONS = [
  {
    id: "now",
    label: "Agora, sozinho",
    description: "Dá para fazer assim que você percebe.",
  },
  {
    id: "next",
    label: "Depois, com a equipe",
    description: "Só depois que a segurança orientar.",
  },
  {
    id: "do-not",
    label: "Nunca",
    description: "Isso piora a situação.",
  },
] as const;

export const RECOVERY_OFFICIAL_ROUTE_OPTIONS = [
  {
    id: "known-report-guide",
    label: "Abrir a página de segurança pela intranet",
    detail: "Você já conhecia esse caminho antes de tudo acontecer.",
  },
  {
    id: "message-contact",
    label: "Falar com o contato que veio na mensagem",
    detail: "É o golpe dizendo onde você deve confirmar o golpe.",
  },
  {
    id: "first-search-result",
    label: "Procurar no Google e abrir o primeiro link",
    detail: "Aparecer primeiro não prova que o site é o certo.",
  },
] as const satisfies ReadonlyArray<{
  id: RecoveryOfficialRouteId;
  label: string;
  detail: string;
}>;

export const RECOVERY_REPORT_BLOCK_OPTIONS = [
  { id: "received-channel", label: "Por onde a mensagem chegou", safe: true },
  { id: "occurred-at", label: "Mais ou menos que horas foi", safe: true },
  {
    id: "apparent-origin-destination",
    label: "De quem parecia ser e para onde ia",
    safe: true,
  },
  { id: "action-taken", label: "O que você realmente fez", safe: true },
  { id: "affected-device", label: "Qual aparelho você usou", safe: true },
  {
    id: "password-or-code",
    label: "Sua senha ou código",
    safe: false,
  },
  {
    id: "unconfirmed-claim",
    label: "Dizer que invadiram sua conta, sem ter certeza",
    safe: false,
  },
] as const satisfies ReadonlyArray<{
  id: RecoveryReportBlockId;
  label: string;
  safe: boolean;
}>;

const GROUP_IDS = ["now", "next", "do-not"] as const;
const OFFICIAL_ROUTE_IDS = RECOVERY_OFFICIAL_ROUTE_OPTIONS.map((item) => item.id);
const REPORT_BLOCK_IDS = RECOVERY_REPORT_BLOCK_OPTIONS.map((item) => item.id);
const SAFE_REPORT_BLOCK_IDS = RECOVERY_REPORT_BLOCK_OPTIONS.filter(
  (item) => item.safe,
).map((item) => item.id);

const commonHarmfulCards: readonly RecoveryActionCard[] = [
  {
    id: "delete-evidence",
    title: "Apagar a mensagem e o histórico",
    detail: "Some com o que ajudaria a entender o que houve.",
  },
  {
    id: "forward-content",
    title: "Repassar a mensagem para os colegas",
    detail: "Espalha o material suspeito para mais gente.",
  },
  {
    id: "reopen-content",
    title: "Abrir de novo para investigar sozinho",
    detail: "Volta a mexer justamente no que é suspeito.",
  },
];

const p1Content: RecoveryBuilderContent = {
  pathId: "p1-clicked-destination",
  pathLabel: "Abri o destino",
  summary: "Resposta proporcional depois de abrir um link sem enviar dados.",
  role: "Chegou um aviso de documento pendente no meio do expediente.",
  situation:
    "Você clicou no botão, viu uma tela de login e fechou. Não digitou nada e não baixou nada.",
  task:
    "Descubra até onde você foi, monte o plano e peça ajuda — sem abrir a página de novo.",
  protectedConsequence:
    "Uma descrição precisa permite que a área responsável oriente a recuperação sem presumir uma exposição que não aconteceu.",
  timelineFacts: [
    { id: "p1-message", timeLabel: "09:12", title: "Mensagem recebida", detail: "Aviso fictício de documento pendente." },
    { id: "p1-link", timeLabel: "09:14", title: "Botão selecionado", detail: "O navegador abriu outra página." },
    { id: "p1-page", timeLabel: "09:14", title: "Página visualizada", detail: "Nenhum campo foi preenchido e nenhum arquivo foi baixado." },
    { id: "p1-close", timeLabel: "09:15", title: "Página fechada", detail: "A interação parou antes de novo passo." },
  ],
  exposureOptions: [
    { id: "clicked-no-data", label: "Abri o link, mas não digitei nada", detail: "É o que os fatos mostram." },
    { id: "entered-data", label: "Digitei meu usuário e senha", detail: "Nada no caso diz isso." },
    { id: "downloaded-file", label: "Baixei ou abri um arquivo", detail: "Nenhum arquivo foi baixado." },
    { id: "unknown-compromise", label: "Minha conta foi invadida", detail: "Um clique sozinho não prova isso." },
  ],
  actionCards: [
    { id: "stop-interaction", title: "Deixar a página fechada", detail: "Não digitar nada e não voltar no link." },
    { id: "preserve-context", title: "Anotar a hora, o canal e para onde o link ia", detail: "Guardar os fatos, sem repassar a mensagem." },
    { id: "report-official", title: "Avisar a segurança que você abriu o link", detail: "Contar que fechou a página e não digitou nada." },
    { id: "follow-guidance", title: "Fazer o que a equipe mandar", detail: "Seguir só o que a segurança orientar." },
    ...commonHarmfulCards,
  ],
  consequence:
    "Se o reporte vier cedo e separar clique de envio de dados, a resposta pode ser proporcional. Reabrir, apagar ou encaminhar reduz a qualidade do contexto.",
  transfer: {
    title: "Agora a mesma coisa, no chat do projeto",
    context:
      "Você abriu um link que chegou no chat, fechou a página e não digitou nada.",
    exposureOptions: [
      { id: "transfer-clicked-no-data", label: "Cliquei, mas não digitei nada", detail: "É só o que aconteceu de fato." },
      { id: "transfer-account-taken", label: "Minha conta foi invadida", detail: "Isso não foi comprovado." },
      { id: "transfer-no-incident", label: "Não preciso avisar ninguém", detail: "O clique precisa ser contado mesmo assim." },
    ],
  },
};

const p2Content: RecoveryBuilderContent = {
  pathId: "p2-file-stage",
  pathLabel: "Até onde o arquivo foi?",
  summary: "Diferenciar visualização, download, abertura e execução de um artefato.",
  role: "Você recebeu um comprovante fictício associado a uma entrega possível.",
  situation:
    "O histórico mostra que o arquivo foi visualizado no navegador e baixado. Não há registro suficiente para afirmar que ele foi aberto ou executado.",
  task:
    "Ordene os fatos, registre o último estágio comprovado e organize um plano que preserve a incerteza no reporte.",
  protectedConsequence:
    "A área responsável precisa saber a diferença entre baixar, abrir e executar para orientar a resposta correta.",
  timelineFacts: [
    { id: "p2-share", timeLabel: "14:02", title: "Compartilhamento recebido", detail: "Documento inesperado em serviço fictício." },
    { id: "p2-preview", timeLabel: "14:04", title: "Prévia visualizada", detail: "O conteúdo apareceu no navegador." },
    { id: "p2-download", timeLabel: "14:05", title: "Download registrado", detail: "O arquivo foi salvo no dispositivo." },
    { id: "p2-uncertain", timeLabel: "14:06", title: "Etapa seguinte incerta", detail: "Não há fato que confirme abertura ou execução." },
  ],
  exposureOptions: [
    { id: "downloaded-not-opened", label: "Baixado; abertura ou execução não comprovadas", detail: "É o limite sustentado pelos registros." },
    { id: "preview-only", label: "Somente visualizado", detail: "Ignora o download já registrado." },
    { id: "executed", label: "Executado", detail: "Não existe evidência desse estágio." },
    { id: "no-exposure", label: "Nenhuma interação", detail: "Contradiz a prévia e o download." },
  ],
  actionCards: [
    { id: "stop-interaction", title: "Não abrir nem executar o arquivo baixado", detail: "O arquivo já foi salvo, mas abri-lo ou executá-lo criaria uma nova exposição." },
    { id: "preserve-context", title: "Registrar a origem, o horário e que houve download", detail: "Também é importante informar que abertura e execução não foram comprovadas." },
    { id: "report-official", title: "Avisar a equipe responsável sobre o download", detail: "Pedir orientação sem anexar nem encaminhar o arquivo baixado." },
    { id: "follow-guidance", title: "Cumprir as medidas orientadas para o dispositivo", detail: "Aguardar a orientação antes de excluir o arquivo, iniciar varreduras ou alterar o dispositivo." },
    ...commonHarmfulCards,
  ],
  consequence:
    "Declarar a incerteza evita tanto minimizar quanto inventar execução. A investigação técnica pertence à área responsável.",
  transfer: {
    title: "Arquivo em outro serviço de compartilhamento",
    context: "Uma prévia foi aberta, mas não há registro de download.",
    exposureOptions: [
      { id: "transfer-preview-only", label: "Prévia visualizada; download não comprovado", detail: "Mantém o limite dos fatos." },
      { id: "transfer-executed", label: "Arquivo executado", detail: "Não há registro desse estágio." },
      { id: "transfer-ignore", label: "Nenhuma ação é necessária", detail: "A interação ainda pode ser reportada." },
    ],
  },
};

const p3Content: RecoveryBuilderContent = {
  pathId: "p3-session-review",
  pathLabel: "A sessão parece diferente",
  summary: "Revisar sessão não reconhecida após uma exposição narrada.",
  role: "Você já informou uma exposição fictícia e abriu a Área oficial simulada.",
  situation:
    "A área mostra uma sessão de dispositivo não reconhecido depois do evento. Isso justifica revisão, mas não prova sozinho quem iniciou o acesso.",
  task:
    "Registre o que é fato, organize revisão e recuperação pela área oficial e monte um reporte sem segredo.",
  protectedConsequence:
    "Revisar sessões e fatores pelo processo oficial pode limitar acesso persistente sem apagar evidências ou criar certeza artificial.",
  timelineFacts: [
    { id: "p3-exposure", timeLabel: "16:20", title: "Exposição relatada", detail: "Uma ação anterior foi registrada no exercício." },
    { id: "p3-official", timeLabel: "16:24", title: "Área oficial aberta", detail: "A rota conhecida foi usada fora da mensagem." },
    { id: "p3-session", timeLabel: "16:25", title: "Sessão não reconhecida", detail: "Um dispositivo diferente aparece na lista." },
    { id: "p3-pending", timeLabel: "16:26", title: "Revisão ainda pendente", detail: "Nenhuma revogação real ocorreu nesta demonstração." },
  ],
  exposureOptions: [
    { id: "unrecognized-session", label: "Sessão não reconhecida; origem ainda não comprovada", detail: "É o fato e o limite disponíveis." },
    { id: "confirmed-attacker", label: "Atacante confirmado", detail: "A identidade não foi comprovada." },
    { id: "recognized-session", label: "Sessão reconhecida", detail: "Contradiz o contexto do caso." },
    { id: "nothing-to-review", label: "Nada precisa ser revisto", detail: "A sessão desconhecida exige tratamento." },
  ],
  actionCards: [
    { id: "stop-interaction", title: "Interromper novas aprovações e contatos", detail: "Não ampliar a exposição enquanto o caso é tratado." },
    { id: "preserve-context", title: "Preservar os dados da sessão", detail: "Registrar serviço, horário e dispositivo aparente." },
    { id: "report-official", title: "Avisar a equipe responsável sobre a sessão desconhecida", detail: "Informar o novo fato sem afirmar quem iniciou o acesso." },
    { id: "review-sessions", title: "Solicitar revisão e encerramento da sessão", detail: "A ação é simulada e depende da área oficial." },
    { id: "request-recovery", title: "Seguir a recuperação de conta orientada", detail: "Revisar fatores e credenciais conforme o procedimento." },
    ...commonHarmfulCards,
  ],
  consequence:
    "Trocar a senha pode não encerrar todas as sessões. A revisão e a recuperação precisam usar os controles oficiais e preservar o que foi observado.",
  transfer: {
    title: "Sessão não reconhecida em outro serviço",
    context: "Outro serviço fictício mostra um acesso que você não reconhece.",
    exposureOptions: [
      { id: "transfer-unrecognized-session", label: "Sessão não reconhecida; precisa de revisão", detail: "Não atribui autoria sem prova." },
      { id: "transfer-confirmed-attacker", label: "Atacante confirmado", detail: "O registro sozinho não comprova identidade." },
      { id: "transfer-ignore", label: "Ignorar até surgir dano", detail: "Adia uma revisão necessária." },
    ],
  },
};

function packageWith(
  casePackageId: string,
  content: RecoveryBuilderContent,
  correctExposureStageId: string,
  correctGroupByActionId: Readonly<Record<string, RecoveryActionGroupId>>,
  precedencePairs: readonly (readonly [string, string])[],
  persistentRecoveryActionIds: readonly string[],
  correctTransferExposureId: string,
  correctTransferFirstActionIds: readonly string[],
): ActivityContentPackage<RecoveryBuilderContent, RecoveryBuilderAllowlists> {
  return {
    activityId: RECOVERY_BUILDER_ACTIVITY_ID,
    activityVersion: RECOVERY_BUILDER_ACTIVITY_VERSION,
    casePackageId,
    status: "published",
    editorialDate: "2026-08-16",
    content,
    allowlists: {
      timelineFactIds: content.timelineFacts.map((fact) => fact.id),
      correctTimelineFactIds: content.timelineFacts.map((fact) => fact.id),
      exposureStageIds: content.exposureOptions.map((option) => option.id),
      correctExposureStageId,
      actionIds: content.actionCards.map((card) => card.id),
      actionGroupIds: GROUP_IDS,
      correctGroupByActionId,
      precedencePairs,
      harmfulActionIds: ["delete-evidence", "forward-content", "reopen-content"],
      persistentRecoveryActionIds,
      officialRouteIds: OFFICIAL_ROUTE_IDS,
      correctOfficialRouteId: "known-report-guide",
      reportBlockIds: REPORT_BLOCK_IDS,
      safeReportBlockIds: SAFE_REPORT_BLOCK_IDS,
      transferExposureIds: content.transfer.exposureOptions.map((option) => option.id),
      correctTransferExposureId,
      transferFirstActionIds: content.actionCards
        .filter((card) => !["delete-evidence", "forward-content", "reopen-content"].includes(card.id))
        .map((card) => card.id),
      correctTransferFirstActionIds,
    },
    criticalControlIds: [
      "stop-and-do-not-reopen",
      "official-route",
      "safe-report",
      "preserve-and-do-not-forward",
      "persistent-recovery",
      "transfer",
    ],
    feedback: {
      success: "Você registrou o estágio real, organizou uma resposta proporcional e reportou sem segredo.",
      review: "A resposta deve partir do que realmente aconteceu, interromper o risco e usar o procedimento oficial sem apagar o contexto.",
    },
    debrief: {
      title: "Precisão permite agir cedo sem exagerar nem minimizar",
      body: "Abra mensagem, clique, download, execução, credencial e sessão são estágios diferentes. Relate o último estágio comprovado, preserve a incerteza e siga a recuperação orientada.",
    },
  };
}

const baseGroups = {
  "stop-interaction": "now",
  "preserve-context": "now",
  "report-official": "now",
  "follow-guidance": "next",
  "delete-evidence": "do-not",
  "forward-content": "do-not",
  "reopen-content": "do-not",
} as const;

export const RECOVERY_BUILDER_V2_PACKAGES = [
  packageWith(
    "mission:clicked-now-what:v2:p1-clicked-destination",
    p1Content,
    "clicked-no-data",
    baseGroups,
    [["stop-interaction", "report-official"], ["report-official", "follow-guidance"]],
    [],
    "transfer-clicked-no-data",
    ["stop-interaction", "report-official"],
  ),
  packageWith(
    "mission:clicked-now-what:v2:p2-file-stage",
    p2Content,
    "downloaded-not-opened",
    baseGroups,
    [["stop-interaction", "report-official"], ["report-official", "follow-guidance"]],
    [],
    "transfer-preview-only",
    ["stop-interaction", "report-official"],
  ),
  packageWith(
    "mission:clicked-now-what:v2:p3-session-review",
    p3Content,
    "unrecognized-session",
    {
      "stop-interaction": "now",
      "preserve-context": "now",
      "report-official": "now",
      "review-sessions": "next",
      "request-recovery": "next",
      "delete-evidence": "do-not",
      "forward-content": "do-not",
      "reopen-content": "do-not",
    },
    [["stop-interaction", "report-official"], ["report-official", "review-sessions"], ["review-sessions", "request-recovery"]],
    ["review-sessions", "request-recovery"],
    "transfer-unrecognized-session",
    ["report-official", "review-sessions"],
  ),
] as const;

export const RECOVERY_BUILDER_CANONICAL_PACKAGE_ID =
  RECOVERY_BUILDER_V2_PACKAGES[0].casePackageId;

export function findRecoveryBuilderV2Package(casePackageId: string) {
  return RECOVERY_BUILDER_V2_PACKAGES.find(
    (contentPackage) => contentPackage.casePackageId === casePackageId,
  );
}
