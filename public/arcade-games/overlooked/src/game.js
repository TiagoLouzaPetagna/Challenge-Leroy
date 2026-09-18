const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const ui = {
  startScreen: document.getElementById("startScreen"),
  gameScreen: document.getElementById("gameScreen"),
  resultScreen: document.getElementById("resultScreen"),
  emailModal: document.getElementById("emailModal"),
  startButton: document.getElementById("startButton"),
  restartButton: document.getElementById("restartButton"),
  closeEmailButton: document.getElementById("closeEmailButton"),
  acceptButton: document.getElementById("acceptButton"),
  reportButton: document.getElementById("reportButton"),
  emailSubject: document.getElementById("emailSubject"),
  emailSender: document.getElementById("emailSender"),
  emailBody: document.getElementById("emailBody"),
  readTimerBar: document.getElementById("readTimerBar"),
  finalScore: document.getElementById("finalScore"),
  rankTitle: document.getElementById("rankTitle"),
  breakdown: document.getElementById("breakdown"),
  resultList: document.getElementById("resultList"),
  integrationStatus: document.getElementById("integrationStatus"),
  resultIntegrationStatus: document.getElementById("resultIntegrationStatus"),
};

const BRIDGE_SOURCE = "fortifica:overlooked-game";
const PLATFORM_SOURCE = "fortifica:arcade-platform";
const BRIDGE_VERSION = 1;
const isEmbedded = window.parent !== window;
let activeRunId = null;
let awaitingSession = false;

const BASE_TILE = 128;
const TILE = 48;
const WORLD_SCALE = TILE / BASE_TILE;
const world = (value) => value * WORLD_SCALE;
const pixel = (value) => Math.round(world(value));
const MAP_COLS = 12;
const MAP_ROWS = 7;
const WIDTH = TILE * MAP_COLS;
const HEIGHT = TILE * MAP_ROWS;
canvas.width = WIDTH;
canvas.height = HEIGHT;
setCanvasSmoothing(false);
const SESSION_LENGTH = 300;
const MAX_QUEUE = 3;
const READ_LIMIT = 28;
const FIRST_EMAIL_ID = "gerente-campinas";
const EMAIL_ARRIVAL_MIN_SECONDS = 4;
const EMAIL_ARRIVAL_MAX_SECONDS = 7;
const ACTION_RANGE = world(70);
const PLAYER_SPRITE_SIZE = 48;
// The layered character art is centered at (27, 24), with its ground anchor at y = 36.
const PLAYER_SPRITE_ANCHOR_Y = 36;
const PLAYER_SPRITE_PIVOT_X = 27;
const PLAYER_SPRITE_PIVOT_Y = 24;
// Fast enough to undo two players walking directly into each other, but capped so
// overlaps caused by spawning or frame drops are corrected over a few frames.
const PLAYER_SEPARATION_SPEED = world(520);
const PAPER_SIZE = 16;
const BADGE_SIZE = 28;
const ARROW_SIZE = 32;
const PIXEL_GLYPHS = {
  "0": ["111", "101", "101", "101", "111"],
  "1": ["010", "110", "010", "010", "111"],
  "2": ["111", "001", "111", "100", "111"],
  "3": ["111", "001", "111", "001", "111"],
  "4": ["101", "101", "111", "001", "001"],
  "5": ["111", "100", "111", "001", "111"],
  "6": ["111", "100", "111", "101", "111"],
  "7": ["111", "001", "010", "010", "010"],
  "8": ["111", "101", "111", "101", "111"],
  "9": ["111", "101", "111", "001", "111"],
  ":": ["000", "010", "000", "010", "000"],
  "-": ["000", "000", "111", "000", "000"],
};

const FLOW_LABELS = {
  computer: "Computador",
  printer: "Impressora",
  signature: "Assinatura",
  stamp: "Carimbo",
  scanner: "Escaneador",
  deposit: "Deposito",
};

const FLOW_TIMES = {
  printer: 5,
  signature: 6,
  stamp: 5.5,
  scanner: 5,
  computer: 4,
};

const emails = [
  {
    id: "sap-tigre",
    legitimate: true,
    title: "Abertura de porta - Integracao SAP Tigre",
    sender: "infraestrutura@leroymerlin.com.br",
    subject: "Solicitacao de abertura de porta - Integracao SAP Fornecedor Tigre",
    body:
      "Conforme aprovacao do projeto de integracao com o fornecedor Tigre (ticket #LM-7823), solicito a abertura da porta 443 no servidor de homologacao 10.10.5.22. Janela de implementacao: quinta-feira 22h-00h. Aprovacao do gestor Fabio Monteiro (matricula LM-3341, ramal 4412) registrada no sistema.\n\nCarlos Eduardo Pinto, Infra e Redes, Mat. LM-2209 | Ramal 4401",
    flow: ["printer", "signature", "scanner", "computer"],
    signs: [
      "Dominio oficial da empresa.",
      "Ticket, aprovador, matricula e ramal verificaveis.",
      "Porta 443 com justificativa tecnica e janela especifica.",
    ],
  },
  {
    id: "gerente-campinas",
    legitimate: true,
    title: "Criacao de usuario - Gerente Campinas",
    sender: "rh.corporativo@leroymerlin.com.br",
    subject: "Onboarding - Criacao de perfil de acesso - Gerente Loja Campinas",
    body:
      "Informamos a contratacao de Renata Souza para Gerente de Loja Campinas, inicio 18/11. Solicito criacao do perfil GL-03 com acesso ao Totvs e pasta \\\\lm-files\\lojas\\campinas. Formulario RH-2024-1147 assinado pelo diretor regional anexo. Duvidas: ramal 3001.\n\nFernanda Alves, Analista de RH, Mat. LM-1892",
    flow: ["printer", "deposit"],
    signs: [
      "Remetente corporativo oficial.",
      "Perfil, sistemas e formulario com referencia especifica.",
      "Ramal e matricula disponiveis para confirmacao.",
    ],
  },
  {
    id: "reset-marcos",
    legitimate: true,
    title: "Reset de senha - Marcos Vinicius",
    sender: "suporte.interno@leroymerlin.com.br",
    subject: "Reset de senha - Marcos Vinicius - Loja BH Shopping",
    body:
      "O colaborador Marcos Vinicius da Costa (matricula LM-5503, loja BH Shopping) esta bloqueado apos viagem. Confirmei a identidade pelo cracha presencialmente. Solicito reset conforme procedimento GOV-RESET-02.\n\nJuliana Ferraz, Supervisora de Loja, Ramal: (31) 3344-5500 r.201",
    flow: ["computer"],
    signs: [
      "Identidade confirmada presencialmente.",
      "Procedimento interno referenciado.",
      "Matricula e ramal fisico para verificacao.",
    ],
  },
  {
    id: "autocad",
    legitimate: true,
    title: "Whitelist AutoCAD - Obras e Reformas",
    sender: "ti.corporativo@leroymerlin.com.br",
    subject: "Whitelist - AutoCAD 2025 - Equipe de Obras e Reformas",
    body:
      "O AutoCAD 2025 foi homologado pelo comite de seguranca em 05/11 (ata LM-SEC-2024-38, disponivel em /governanca/atas na intranet). Licencas adquiridas via LM-PC-4421. Solicito adicao na whitelist nos 12 computadores da equipe de Obras e Reformas (hostnames LM-OBR-001 a LM-OBR-012).\n\nRenato Carvalho, TI Corporativo, Mat. LM-0934 | Ramal 4388",
    flow: ["computer"],
    signs: [
      "Ata de homologacao e processo de compra citados.",
      "Hostnames especificos em vez de pedido amplo.",
      "Remetente com matricula e ramal.",
    ],
  },
  {
    id: "vpn-pedro",
    legitimate: true,
    title: "VPN - Pedro Henrique Lemos",
    sender: "rh.corporativo@leroymerlin.com.br",
    subject: "Liberacao VPN - Acordo de Trabalho Remoto - Analista BI",
    body:
      "Conforme acordo de trabalho remoto aprovado em 01/11 (documento TR-2024-0892), solicito liberacao de acesso VPN para Pedro Henrique Lemos (matricula LM-4471, analista de BI). Equipamento passou pela checagem de seguranca (certificado SEC-LM-2024-4471 emitido em 08/11).\n\nFernanda Alves, Analista de RH, Mat. LM-1892 | Ramal 3001",
    flow: ["printer", "signature", "deposit"],
    signs: [
      "Documento formal e certificado de seguranca.",
      "Matricula do colaborador e da solicitante.",
      "Ramal corporativo para duvidas.",
    ],
  },
  {
    id: "rdp-typo",
    legitimate: false,
    title: "Porta 3389 - dominio 1eroymerlin",
    sender: "infraestrutura@1eroymerlin.com.br",
    subject: "Urgente - Liberar acesso remoto para manutencao",
    body:
      "Precisamos que a porta 3389 seja aberta no servidor principal ainda hoje para que nosso parceiro tecnico realize uma manutencao emergencial. O sistema de vendas esta apresentando lentidao critica e impactando todas as lojas. Por favor confirmar quando estiver feito.\n\nEquipe de Infraestrutura",
    fakeFlow: ["computer"],
    signs: [
      "Dominio usa numero 1 no lugar do L em leroymerlin.",
      "Porta 3389 (RDP) abre acesso remoto de alto risco.",
      "Sem ticket, matricula, fornecedor ou contato verificavel.",
    ],
  },
  {
    id: "admin-gmail",
    legitimate: false,
    title: "Usuario admin - dominio gmail.com",
    sender: "diretoria.ti@leroymerlin.com.br.gmail.com",
    subject: "Criacao de usuario - Projeto Confidencial",
    body:
      'Preciso que criem hoje um usuario chamado "svc_auditoria_ext" com perfil de administrador de dominio. E para um projeto de auditoria externa que comeca amanha. Nao registrem ticket por enquanto, a diretoria prefere manter discreto nessa fase inicial. Conto com voces.\n\nDiretor de TI',
    fakeFlow: ["computer"],
    signs: [
      "Dominio real termina em gmail.com.",
      "Administrador de dominio nunca deve ser criado sem processo formal.",
      "Pedido para nao registrar ticket e manter sigilo.",
    ],
  },
  {
    id: "microsoft-falso",
    legitimate: false,
    title: "Microsoft 365 - suporte falso",
    sender: "renovacao@microsoft-leroymerlin.support",
    subject: "Acao obrigatoria - Licencas Microsoft 365 expiram em 48h",
    body:
      "Identificamos que as licencas Microsoft 365 da sua organizacao entrarao em carencia em 48 horas. Para evitar bloqueio dos servicos de e-mail e Teams em toda a empresa, acesse o portal abaixo e valide os dados de contrato:\n\nhttps://ms365-renewal.leroymerlin.support/validate\n\nMicrosoft Partner Support",
    fakeFlow: ["computer"],
    signs: [
      "Dominio .support nao pertence a Microsoft nem a Leroy Merlin.",
      "Link externo pede validacao de dados de contrato.",
      "Urgencia e ameaca de bloqueio para criar panico.",
    ],
  },
  {
    id: "rh-falso",
    legitimate: false,
    title: "RH - revalidacao de credenciais",
    sender: "rh-notificacoes@leroymerlin-support.com.br",
    subject: "Atualizacao obrigatoria de cadastro - Prazo: hoje",
    body:
      "O departamento de RH informa que todos os perfis de acesso precisam ser revalidados ate o final do dia de hoje como parte da auditoria anual de acessos. Caso nao seja feito, seu acesso aos sistemas sera suspenso preventivamente. Acesse o portal de revalidacao com suas credenciais corporativas:\n\nhttps://portal-rh.leroymerlin-support.com.br/revalidacao\n\nRH Corporativo, Leroy Merlin",
    fakeFlow: ["computer"],
    signs: [
      "Dominio leroymerlin-support.com.br nao e oficial.",
      "Nenhum processo interno pede credenciais por e-mail.",
      "Prazo 'hoje' sem data concreta e link externo de login.",
    ],
  },
  {
    id: "vpn-diretor",
    legitimate: false,
    title: "VPN diretor - notebook pessoal",
    sender: "f.rodrigues@leroymerlin.com.br",
    subject: "VPN urgente - estou em Sao Paulo",
    body:
      "Pessoal, estou em SP para uma reuniao com a matriz francesa e preciso de acesso VPN liberado agora no meu notebook pessoal. Nao consigo ligar, estou em reuniao o dia todo. O notebook e um Dell XPS, Windows 11. Podem liberar? Fico no aguardo.\n\nFelipe Rodrigues, Diretor Regional",
    fakeFlow: ["computer"],
    signs: [
      "Notebook pessoal nao possui certificado corporativo.",
      "Desculpa explicita para impedir verificacao por telefone.",
      "Sem ticket, matricula ou certificado do equipamento.",
    ],
  },
  {
    id: "tigre-ip",
    legitimate: false,
    title: "Tigre - IP suspeito",
    sender: "suporte@tigre.com.br",
    subject: "Atualizacao de endpoint - Integracao NF-e",
    body:
      "Bom dia equipe Leroy Merlin. Precisamos atualizar o endpoint de integracao de NF-e para o novo endereco. Por favor atualizem nas configuracoes de firewall para liberar tambem a porta 8443 para o IP 185.220.101.47. Qualquer duvida estou a disposicao.\n\nSuporte Tecnico, Tigre",
    fakeFlow: ["printer", "stamp", "scanner", "computer"],
    signs: [
      "Nao referencia o ticket de integracao existente.",
      "IP publico suspeito sem processo formal de atualizacao.",
      "Sem nome do contato tecnico habitual.",
    ],
  },
  {
    id: "lista-usuarios",
    legitimate: false,
    title: "TI - lista de usuarios ativos",
    sender: "ti.corporativo@leroymerlin.com.br",
    subject: "Procedimento de rotina - Verificacao de contas inativas",
    body:
      "Bom dia. Como parte do processo trimestral de higiene de acessos, precisamos que a equipe de governanca nos envie a lista completa de usuarios ativos com seus respectivos perfis de acesso e datas de ultimo login. O relatorio pode ser enviado diretamente para este e-mail.\n\nRenato Carvalho, TI Corporativo, Mat. LM-0934 | Ramal 4388",
    fakeFlow: ["computer"],
    signs: [
      "O remetente parece correto, mas o pedido e o problema.",
      "Lista de usuarios e perfis por e-mail seria vazamento de dados.",
      "Nao ha ticket ou referencia formal do processo.",
    ],
  },
];

const COUNTER_COLOR = "#748079";

const stationDefs = [
  { id: "email", label: "E-mail", x: TILE * 5, y: TILE * 3, w: TILE, h: TILE, color: "#2368a2" },
  { id: "printer", label: "Impressora", x: TILE * 6, y: 0, w: TILE, h: TILE, color: "#16706c" },
  { id: "signature", label: "Assinatura", x: WIDTH - TILE, y: TILE * 2, w: TILE, h: TILE, color: "#d66b22" },
  { id: "stamp", label: "Carimbo", x: TILE * 2, y: HEIGHT - TILE, w: TILE, h: TILE, color: "#805a28" },
  { id: "deposit", label: "Deposito", x: TILE * 8, y: HEIGHT - TILE, w: TILE, h: TILE, color: "#66714c" },
  { id: "scanner", label: "Escaneador", x: TILE * 10, y: HEIGHT - TILE, w: TILE, h: TILE, color: "#6b4fa3" },
  { id: "computer", label: "Computador", x: 0, y: TILE * 2, w: TILE, h: TILE, color: "#1f7a45" },
];

const counterDefs = buildCounterLayout();

const keys = new Set();
let lastFrame = performance.now();
let game;

const PLAYER1_WALK_LEFT_SEQUENCE = [0, 2, 4, 2, 0, 1, 3, 5, 3, 1];
const PLAYER2_WALK_LEFT_SEQUENCE = [1, 3, 5, 3, 1, 0, 2, 4, 2, 0];
const EMAIL_NOTIFICATION_SEQUENCE = [0, 1, 2, 1];
const SIGNATURE_WRITE_SEQUENCE = [2, 3, 4, 3];
const SCANNER_SCAN_SEQUENCE = [0, 1, 2, 3, 4, 5, 4, 3, 2, 1];
const NEWTON_CRADLE_SEQUENCE = [0, 0, 1, 2, 3, 4, 4, 5, 6, 7];
const HOT_COFFEE_SEQUENCE = [0, 1, 2, 3, 4, 5, 4, 3, 2, 1];
const MINI_AQUARIUM_SEQUENCE = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const PLAYER2_HOLD_PAPER_FOOT_SEQUENCE = [
  "rightMid",
  "rightFinal",
  "rightMid",
  "leftMid",
  "leftFinal",
  "leftMid",
];
const EXCLAMATION_SEQUENCE = [0, 1, 2, 3, 4, 3, 2, 1, 0];
const sprites = {
  counters: {
    sideVertical: loadSprite("assets/sprites/counter-side-vertical.png"),
    sideHorizontal: loadSprite("assets/sprites/counter-side-horizontal.png"),
    cornerBottomRight: loadSprite("assets/sprites/counter-corner-bottom-right.png"),
    cornerBottomLeft: loadSprite("assets/sprites/counter-corner-bottom-left.png"),
    cornerTopRight: loadSprite("assets/sprites/counter-corner-top-right.png"),
    cornerTopLeft: loadSprite("assets/sprites/counter-corner-top-left.png"),
    centerRight: loadSprite("assets/sprites/counter-center-right.png"),
    centerLeft: loadSprite("assets/sprites/counter-center-left.png"),
  },
  countersLight: {
    sideVertical: loadSprite("assets/sprites/counter-side-vertical-light.png"),
    sideHorizontal: loadSprite("assets/sprites/counter-side-horizontal-light.png"),
    cornerBottomRight: loadSprite("assets/sprites/counter-corner-bottom-right-light.png"),
    cornerBottomLeft: loadSprite("assets/sprites/counter-corner-bottom-left-light.png"),
    cornerTopRight: loadSprite("assets/sprites/counter-corner-top-right-light.png"),
    cornerTopLeft: loadSprite("assets/sprites/counter-corner-top-left-light.png"),
    centerRight: loadSprite("assets/sprites/counter-center-right-light.png"),
    centerLeft: loadSprite("assets/sprites/counter-center-left-light.png"),
  },
  counterDecor: {
    newtonCradle: [
      loadSprite("assets/sprites/counter-newton-cradle-0.png"),
      loadSprite("assets/sprites/counter-newton-cradle-1.png"),
      loadSprite("assets/sprites/counter-newton-cradle-2.png"),
      loadSprite("assets/sprites/counter-newton-cradle-3.png"),
      loadSprite("assets/sprites/counter-newton-cradle-4.png"),
      loadSprite("assets/sprites/counter-newton-cradle-5.png"),
      loadSprite("assets/sprites/counter-newton-cradle-6.png"),
      loadSprite("assets/sprites/counter-newton-cradle-7.png"),
    ],
    hotCoffee: [
      loadSprite("assets/sprites/counter-hot-coffee-0.png"),
      loadSprite("assets/sprites/counter-hot-coffee-1.png"),
      loadSprite("assets/sprites/counter-hot-coffee-2.png"),
      loadSprite("assets/sprites/counter-hot-coffee-3.png"),
      loadSprite("assets/sprites/counter-hot-coffee-4.png"),
      loadSprite("assets/sprites/counter-hot-coffee-5.png"),
    ],
    miniAquarium: [
      loadSprite("assets/sprites/counter-mini-aquarium-0.png"),
      loadSprite("assets/sprites/counter-mini-aquarium-1.png"),
      loadSprite("assets/sprites/counter-mini-aquarium-2.png"),
      loadSprite("assets/sprites/counter-mini-aquarium-3.png"),
      loadSprite("assets/sprites/counter-mini-aquarium-4.png"),
      loadSprite("assets/sprites/counter-mini-aquarium-5.png"),
      loadSprite("assets/sprites/counter-mini-aquarium-6.png"),
      loadSprite("assets/sprites/counter-mini-aquarium-7.png"),
      loadSprite("assets/sprites/counter-mini-aquarium-8.png"),
      loadSprite("assets/sprites/counter-mini-aquarium-9.png"),
    ],
  },
  floor: {
    normal: loadSprite("assets/sprites/floor-normal.png"),
    common: loadSprite("assets/sprites/floor-common.png"),
    rare: [
      loadSprite("assets/sprites/floor-rare-0.png"),
      loadSprite("assets/sprites/floor-rare-1.png"),
    ],
    unique: [
      loadSprite("assets/sprites/floor-unique-0.png"),
      loadSprite("assets/sprites/floor-unique-1.png"),
    ],
  },
  floorShadow: loadSprite("assets/sprites/floor-shadow.png"),
  floorShadowCorner: loadSprite("assets/sprites/floor-shadow-corner.png"),
  computer: {
    on: loadSprite("assets/sprites/computer-on.png"),
    off: loadSprite("assets/sprites/computer-off.png"),
    frames: [
      loadSprite("assets/sprites/computer-process-0.png"),
      loadSprite("assets/sprites/computer-process-1.png"),
      loadSprite("assets/sprites/computer-process-2.png"),
      loadSprite("assets/sprites/computer-process-3.png"),
    ],
  },
  printer: {
    idle: loadSprite("assets/sprites/printer-idle.png"),
    frames: [
      loadSprite("assets/sprites/printer-print-0.png"),
      loadSprite("assets/sprites/printer-print-1.png"),
      loadSprite("assets/sprites/printer-print-2.png"),
      loadSprite("assets/sprites/printer-print-3.png"),
      loadSprite("assets/sprites/printer-print-4.png"),
    ],
  },
  stationEquipment: {
    stamp: {
      idle: loadSprite("assets/sprites/stamp-station.png"),
      frames: [
        loadSprite("assets/sprites/stamp-press-0.png"),
        loadSprite("assets/sprites/stamp-press-1.png"),
        loadSprite("assets/sprites/stamp-press-2.png"),
        loadSprite("assets/sprites/stamp-press-3.png"),
        loadSprite("assets/sprites/stamp-press-4.png"),
      ],
    },
    deposit: loadSprite("assets/sprites/deposit-station.png"),
    email: {
      idle: loadSprite("assets/sprites/email-terminal.png"),
      frames: [
        loadSprite("assets/sprites/email-notification-0.png"),
        loadSprite("assets/sprites/email-notification-1.png"),
        loadSprite("assets/sprites/email-notification-2.png"),
      ],
    },
    signature: {
      idle: loadSprite("assets/sprites/signature-station.png"),
      frames: [
        loadSprite("assets/sprites/signature-write-0.png"),
        loadSprite("assets/sprites/signature-write-1.png"),
        loadSprite("assets/sprites/signature-write-2.png"),
        loadSprite("assets/sprites/signature-write-3.png"),
        loadSprite("assets/sprites/signature-write-4.png"),
      ],
    },
    scanner: {
      idle: loadSprite("assets/sprites/scanner-station.png"),
      frames: [
        loadSprite("assets/sprites/scanner-scan-0.png"),
        loadSprite("assets/sprites/scanner-scan-1.png"),
        loadSprite("assets/sprites/scanner-scan-2.png"),
        loadSprite("assets/sprites/scanner-scan-3.png"),
        loadSprite("assets/sprites/scanner-scan-4.png"),
        loadSprite("assets/sprites/scanner-scan-5.png"),
      ],
    },
  },
  exclamation: [
    loadSprite("assets/sprites/exclamation-0.png"),
    loadSprite("assets/sprites/exclamation-1.png"),
    loadSprite("assets/sprites/exclamation-2.png"),
    loadSprite("assets/sprites/exclamation-3.png"),
    loadSprite("assets/sprites/exclamation-4.png"),
  ],
  arrow: [
    loadSprite("assets/sprites/arrow-0.png"),
    loadSprite("assets/sprites/arrow-1.png"),
    loadSprite("assets/sprites/arrow-2.png"),
    loadSprite("assets/sprites/arrow-3.png"),
    loadSprite("assets/sprites/arrow-4.png"),
    loadSprite("assets/sprites/arrow-5.png"),
  ],
  paper: {
    normal: loadSprite("assets/sprites/paper.png"),
    signed: loadSprite("assets/sprites/paper-signed.png"),
    stamped: loadSprite("assets/sprites/paper-stamped.png"),
  },
  player1IdleLeftLayers: {
    body: loadSprite("assets/sprites/player1-idle-left-body.png"),
    foot: loadSprite("assets/sprites/player1-idle-left-foot.png"),
  },
  player1WalkLeftLayers: PLAYER1_WALK_LEFT_SEQUENCE.map((frame) => ({
    body: loadSprite(`assets/sprites/player1-walk-left-body-${frame}.png`),
    foot: loadSprite(`assets/sprites/player1-walk-left-foot-${frame}.png`),
  })),
  player2IdleLeftLayers: {
    body: loadSprite("assets/sprites/player2-idle-left-body.png"),
    foot: loadSprite("assets/sprites/player2-idle-left-foot.png"),
  },
  player2HoldPaper: {
    bodies: {
      normal: loadSprite("assets/sprites/player2-hold-paper-body.png"),
      signed: loadSprite("assets/sprites/player2-hold-paper-body-signed.png"),
      stamped: loadSprite("assets/sprites/player2-hold-paper-body-stamped.png"),
    },
    feet: {
      idle: loadSprite("assets/sprites/player2-hold-paper-foot-idle.png"),
      rightStart: loadSprite("assets/sprites/player2-hold-paper-foot-right-start.png"),
      rightMid: loadSprite("assets/sprites/player2-hold-paper-foot-right-mid.png"),
      rightFinal: loadSprite("assets/sprites/player2-hold-paper-foot-right-final.png"),
      leftStart: loadSprite("assets/sprites/player2-hold-paper-foot-left-start.png"),
      leftMid: loadSprite("assets/sprites/player2-hold-paper-foot-left-mid.png"),
      leftFinal: loadSprite("assets/sprites/player2-hold-paper-foot-left-final.png"),
    },
  },
  player2WalkLeftLayers: PLAYER2_WALK_LEFT_SEQUENCE.map((frame) => ({
    body: loadSprite(`assets/sprites/player2-walk-left-body-${frame}.png`),
    foot: loadSprite(`assets/sprites/player2-walk-left-foot-${frame}.png`),
  })),
};

function loadSprite(src) {
  const image = new Image();
  image.src = src;
  return image;
}

function setCanvasSmoothing(enabled) {
  ctx.imageSmoothingEnabled = enabled;
  ctx.mozImageSmoothingEnabled = enabled;
  ctx.webkitImageSmoothingEnabled = enabled;
  ctx.msImageSmoothingEnabled = enabled;
}

function fitCanvasToViewport() {
  const viewportWidth = ui.gameScreen.clientWidth || window.innerWidth;
  const viewportHeight = ui.gameScreen.clientHeight || window.innerHeight;
  const dpr = window.devicePixelRatio || 1;
  const physicalWidth = Math.floor(viewportWidth * dpr);
  const physicalHeight = Math.floor(viewportHeight * dpr);
  const zoom = Math.max(
    1,
    Math.floor(Math.min(physicalWidth / WIDTH, physicalHeight / HEIGHT)),
  );
  const displayWidth = WIDTH * zoom;
  const displayHeight = HEIGHT * zoom;
  const left = Math.floor((physicalWidth - displayWidth) / 2);
  const top = Math.floor((physicalHeight - displayHeight) / 2);

  canvas.style.width = `${displayWidth / dpr}px`;
  canvas.style.height = `${displayHeight / dpr}px`;
  canvas.style.left = `${left / dpr}px`;
  canvas.style.top = `${top / dpr}px`;
}

function buildCounterLayout() {
  const byPosition = new Map();
  const add = (x, y, group = "edge") => {
    const key = `${x},${y}`;
    if (!byPosition.has(key)) {
      const station = stationDefs.find((item) => item.x === x && item.y === y);
      byPosition.set(key, {
        id: `counter-${x}-${y}`,
        label: station ? station.label : "Bancada",
        stationId: station?.id ?? null,
        group,
        x,
        y,
        w: TILE,
        h: TILE,
        color: station?.color ?? COUNTER_COLOR,
      });
    }
  };

  for (let x = 0; x <= WIDTH - TILE; x += TILE) {
    add(x, 0, "top");
    add(x, HEIGHT - TILE, "bottom");
  }
  for (let y = TILE; y <= HEIGHT - TILE * 2; y += TILE) {
    add(0, y, "left");
    add(WIDTH - TILE, y, "right");
  }
  for (let x = TILE * 3; x <= TILE * 10; x += TILE) {
    add(x, TILE * 3, "middle");
  }

  return [...byPosition.values()];
}

function createStations() {
  return Object.fromEntries(
    stationDefs.map((station) => [
      station.id,
      {
        ...station,
        queue: [],
        output: null,
        processing: null,
      },
    ]),
  );
}

function createCounters() {
  const counters = counterDefs.map((counter) => ({
    ...counter,
    surfaceItem: null,
    decor: null,
    decorPhase: 0,
  }));
  const decorCandidates = shuffle(
    counters.filter((counter) => counter.group === "middle" && !counter.stationId),
  );
  const cradleCounter = decorCandidates[0];
  if (cradleCounter) {
    cradleCounter.decor = "newtonCradle";
    cradleCounter.decorPhase = Math.floor(Math.random() * NEWTON_CRADLE_SEQUENCE.length);
  }
  const coffeeCounter = decorCandidates[1];
  if (coffeeCounter) {
    coffeeCounter.decor = "hotCoffee";
    coffeeCounter.decorPhase = Math.floor(Math.random() * HOT_COFFEE_SEQUENCE.length);
  }
  const aquariumCounter = decorCandidates[2];
  if (aquariumCounter) {
    aquariumCounter.decor = "miniAquarium";
    aquariumCounter.decorPhase = Math.floor(Math.random() * MINI_AQUARIUM_SEQUENCE.length);
  }

  return Object.fromEntries(counters.map((counter) => [counter.id, counter]));
}

function freshGame() {
  const deck = buildEmailDeck();
  return {
    mode: "playing",
    timeLeft: SESSION_LENGTH,
    score: 0,
    nextEmailIn: 0.7,
    deck,
    queue: [],
    appeared: [],
    currentEmail: null,
    readTime: READ_LIMIT,
    stations: createStations(),
    counters: createCounters(),
    floorTiles: createFloorTiles(),
    floorShadows: createFloorShadows(),
    tasks: {},
    floorItems: [],
    players: [
      {
        id: 1,
        x: TILE * 4,
        y: TILE * 2,
        r: world(22),
        hitbox: { w: world(44), h: world(40), offsetY: world(-18) },
        speed: world(220),
        color: "#2368a2",
        direction: "down",
        visualDirection: "down",
        moving: false,
        animTime: 0,
        carrying: null,
      },
      {
        id: 2,
        x: TILE * 4,
        y: TILE * 5 + TILE / 2,
        r: world(22),
        hitbox: { w: world(54), h: world(42), offsetY: world(-10) },
        speed: world(220),
        color: "#d66b22",
        direction: "down",
        visualDirection: "down",
        moving: false,
        animTime: 0,
        carrying: null,
      },
    ],
    stats: {
      legitCompleted: 0,
      phishingReported: 0,
      phishingProcessed: 0,
      legitDiscarded: 0,
    },
  };
}

function buildEmailDeck() {
  const firstEmail = emails.find((email) => email.id === FIRST_EMAIL_ID);
  const remainingEmails = shuffle(
    emails.filter((email) => email.id !== FIRST_EMAIL_ID),
  );
  if (firstEmail) remainingEmails.push(firstEmail);
  return remainingEmails;
}

function shuffle(values) {
  for (let i = values.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [values[i], values[j]] = [values[j], values[i]];
  }
  return values;
}

function createFloorTiles() {
  const tiles = [];
  for (let x = 0; x < WIDTH; x += TILE) {
    for (let y = 0; y < HEIGHT; y += TILE) {
      tiles.push({
        x,
        y,
        type: "normal",
        variant: 0,
        rotation: randomTileRotation(),
      });
    }
  }

  const occupied = new Set(counterDefs.map((counter) => `${counter.x},${counter.y}`));
  const specialTiles = shuffle(tiles.filter((tile) => !occupied.has(`${tile.x},${tile.y}`)));
  assignFloorType(specialTiles, "common", 3);
  assignFloorType(specialTiles, "rare", 2);
  assignFloorType(specialTiles, "unique", 1);
  return tiles;
}

function createFloorShadows() {
  const occupied = new Set(counterDefs.map((counter) => `${counter.x},${counter.y}`));
  const directions = [
    { key: "top", dx: 0, dy: -TILE, rotation: 0 },
    { key: "right", dx: TILE, dy: 0, rotation: Math.PI / 2 },
    { key: "bottom", dx: 0, dy: TILE, rotation: Math.PI },
    { key: "left", dx: -TILE, dy: 0, rotation: -Math.PI / 2 },
  ];
  const cornerRotations = {
    "top,right": 0,
    "right,bottom": Math.PI / 2,
    "bottom,left": Math.PI,
    "left,top": -Math.PI / 2,
  };
  const shadows = [];

  for (let x = 0; x < WIDTH; x += TILE) {
    for (let y = 0; y < HEIGHT; y += TILE) {
      if (occupied.has(`${x},${y}`)) continue;

      const touching = directions.filter((item) =>
        occupied.has(`${x + item.dx},${y + item.dy}`),
      );
      const corner = cornerShadowForDirections(touching, cornerRotations);
      if (corner) {
        shadows.push({ x, y, rotation: corner.rotation, type: "corner" });
      } else if (touching.length > 0) {
        shadows.push({ x, y, rotation: touching[0].rotation, type: "single" });
      }
    }
  }

  return shadows;
}

function cornerShadowForDirections(directions, rotations) {
  const keys = directions.map((item) => item.key);
  const pairs = [
    ["top", "right"],
    ["right", "bottom"],
    ["bottom", "left"],
    ["left", "top"],
  ];
  const pair = pairs.find(([a, b]) => keys.includes(a) && keys.includes(b));
  if (!pair) return null;

  return { rotation: rotations[pair.join(",")] };
}

function assignFloorType(pool, type, count) {
  const variants = sprites.floor[type];
  const variantCount = Array.isArray(variants) ? variants.length : 1;
  const total = count * variantCount;
  for (let i = 0; i < total && pool.length > 0; i += 1) {
    const tile = pool.pop();
    tile.type = type;
    tile.variant = Array.isArray(variants) ? i % variants.length : 0;
  }
}

function randomTileRotation() {
  return Math.floor(Math.random() * 4) * (Math.PI / 2);
}

function startGame() {
  game = freshGame();
  setIntegrationStatus(ui.integrationStatus, "Partida conectada. Boa sorte!", "success");
  setIntegrationStatus(ui.resultIntegrationStatus, "");
  document.body.classList.add("is-playing");
  ui.startScreen.classList.add("hidden");
  ui.resultScreen.classList.add("hidden");
  ui.gameScreen.classList.remove("hidden");
  ui.emailModal.classList.add("hidden");
  fitCanvasToViewport();
  requestGameFullscreen();
  lastFrame = performance.now();
  requestAnimationFrame(loop);
}

function requestGameFullscreen() {
  const target = document.documentElement;
  if (document.fullscreenElement || !target.requestFullscreen) return;
  target.requestFullscreen().catch(() => {});
}

function exitGameFullscreen() {
  if (!document.fullscreenElement || !document.exitFullscreen) return;
  document.exitFullscreen().catch(() => {});
}

function loop(now) {
  const dt = Math.min((now - lastFrame) / 1000, 0.05);
  lastFrame = now;

  if (game && game.mode === "playing") {
    update(dt);
    draw();
    requestAnimationFrame(loop);
  }
}

function update(dt) {
  game.timeLeft -= dt;
  if (game.timeLeft <= 0) {
    game.timeLeft = 0;
    finishGame();
    return;
  }

  updateEmailArrival(dt);
  updatePlayers(dt);
  updateStations(dt);
  updateEmailModal(dt);
}

function updateEmailArrival(dt) {
  if (game.queue.length >= MAX_QUEUE || game.deck.length === 0) {
    return;
  }

  game.nextEmailIn -= dt;
  if (game.nextEmailIn <= 0) {
    const email = game.deck.pop();
    game.queue.push(email);
    if (!game.appeared.some((item) => item.id === email.id)) {
      game.appeared.push({
        ...email,
        outcome: "pendente",
        points: 0,
      });
    }
    game.nextEmailIn =
      EMAIL_ARRIVAL_MIN_SECONDS +
      Math.random() * (EMAIL_ARRIVAL_MAX_SECONDS - EMAIL_ARRIVAL_MIN_SECONDS);
  }
}

function updatePlayers(dt) {
  const bindings = [
    { up: "w", down: "s", left: "a", right: "d" },
    { up: "arrowup", down: "arrowdown", left: "arrowleft", right: "arrowright" },
  ];

  game.players.forEach((player, index) => {
    const input = bindings[index];
    let dx = 0;
    let dy = 0;
    if (keys.has(input.up)) dy -= 1;
    if (keys.has(input.down)) dy += 1;
    if (keys.has(input.left)) dx -= 1;
    if (keys.has(input.right)) dx += 1;

    const wantsToMove = dx !== 0 || dy !== 0;
    player.moving = false;

    if (wantsToMove) {
      const length = Math.hypot(dx, dy);
      dx /= length;
      dy /= length;
      player.direction = directionFromVector(dx, dy, player.direction);
      player.visualDirection = visualDirectionFromVector(dx, dy, player.direction);
      player.lastMoveX = dx;
      player.lastMoveY = dy;
      player.moving = movePlayer(player, dx * player.speed * dt, dy * player.speed * dt);
    }

    player.animTime = player.moving ? player.animTime + dt : 0;
  });

  resolvePlayerSeparation(dt);
}

function resolvePlayerSeparation(dt) {
  for (let firstIndex = 0; firstIndex < game.players.length; firstIndex += 1) {
    for (let secondIndex = firstIndex + 1; secondIndex < game.players.length; secondIndex += 1) {
      separatePlayerPair(game.players[firstIndex], game.players[secondIndex], dt);
    }
  }
}

function separatePlayerPair(first, second, dt) {
  const firstRadius = first.separationRadius ?? first.r;
  const secondRadius = second.separationRadius ?? second.r;
  const minimumDistance = firstRadius + secondRadius;
  const offsetX = second.x - first.x;
  const offsetY = second.y - first.y;
  const currentDistance = Math.hypot(offsetX, offsetY);

  if (currentDistance >= minimumDistance) return;

  // A deterministic direction also separates players spawned at the exact same point.
  const normalX = currentDistance > 0.001 ? offsetX / currentDistance : 1;
  const normalY = currentDistance > 0.001 ? offsetY / currentDistance : 0;
  const overlap = minimumDistance - currentDistance;
  const correction = Math.min(overlap, PLAYER_SEPARATION_SPEED * dt);
  const correctionPerPlayer = correction / 2;

  // Reuse normal movement resolution so the separation cannot push anyone through
  // counters or beyond the map limits. Passive pushes do not change facing/animation.
  movePlayer(first, -normalX * correctionPerPlayer, -normalY * correctionPerPlayer);
  movePlayer(second, normalX * correctionPerPlayer, normalY * correctionPerPlayer);
}

function directionFromVector(dx, dy, fallback = "down") {
  if (Math.abs(dx) >= Math.abs(dy) && dx !== 0) {
    return dx > 0 ? "right" : "left";
  }
  if (dy !== 0) {
    return dy > 0 ? "down" : "up";
  }
  return fallback;
}

function visualDirectionFromVector(dx, dy, fallback = "down") {
  return directionFromVector(dx, dy, fallback);
}

function movePlayer(player, dx, dy) {
  const oldX = player.x;
  const oldY = player.y;
  const bounds = movementBoundsForPlayer(player);

  player.x = clamp(player.x + dx, bounds.minX, bounds.maxX);
  if (collides(player)) player.x = oldX;
  player.y = clamp(player.y + dy, bounds.minY, bounds.maxY);
  if (collides(player)) player.y = oldY;

  return player.x !== oldX || player.y !== oldY;
}

function movementBoundsForPlayer(player) {
  const hitbox = player.hitbox ?? {
    w: player.r * 2,
    h: player.r * 2,
    offsetX: 0,
    offsetY: 0,
  };
  const offsetX = hitbox.offsetX ?? 0;
  const offsetY = hitbox.offsetY ?? 0;

  return {
    minX: hitbox.w / 2 - offsetX,
    maxX: WIDTH - hitbox.w / 2 - offsetX,
    minY: hitbox.h / 2 - offsetY,
    maxY: HEIGHT - hitbox.h / 2 - offsetY,
  };
}

function collides(player) {
  return counterDefs.some((rect) => circleRectCollision(player, rect));
}

function updateStations(dt) {
  Object.values(game.stations).forEach((station) => {
    if (!station.processing) return;

    const processing = station.processing;
    if (processing.mode === "manual") {
      const player = game.players.find((item) => item.id === processing.playerId);
      if (!player || !nearRect(player, station, world(58))) {
        station.processing = null;
        station.output = processing.taskId;
        return;
      }
    }

    processing.elapsed += dt;
    if (processing.elapsed >= processing.duration) {
      completeStationProcess(station);
    }
  });
}

function completeStationProcess(station) {
  const task = game.tasks[station.processing.taskId];
  station.processing = null;
  if (!task) return;

  updateTaskPaperState(task, station.id);
  task.stepIndex += 1;
  if (task.stepIndex >= task.flow.length) {
    completeTask(task);
    return;
  }

  const nextStep = task.flow[task.stepIndex];
  if (station.id === "scanner" && nextStep === "computer") {
    game.stations.computer.queue.push(task.id);
    task.status = "Arquivo digital no computador";
    return;
  }

  station.output = task.id;
  task.status = `Levar para ${FLOW_LABELS[nextStep]}`;
}

function updateTaskPaperState(task, stationId) {
  if (stationId === "signature") {
    task.paperState = "signed";
  } else if (stationId === "stamp") {
    task.paperState = "stamped";
  }
}

function updateEmailModal(dt) {
  if (!game.currentEmail) return;
  game.readTime = Math.max(0, game.readTime - dt);
  ui.readTimerBar.style.transform = `scaleX(${game.readTime / READ_LIMIT})`;
}

function handleAction(player) {
  if (!game || game.mode !== "playing" || game.currentEmail) return;

  const station = nearestStation(player, ACTION_RANGE);
  const counter = nearestCounter(player, ACTION_RANGE);
  if (player.carrying) {
    if (station && tryUseCarriedItem(player, station)) return;
    if (counter && placeOnCounter(player, counter)) return;
    dropOnFloor(player);
    return;
  }

  if (station?.id === "email") {
    openEmail();
    return;
  }

  if (station && pickUpFromStation(player, station)) return;
  if (counter && pickUpFromCounter(player, counter)) return;
  if (pickUpFromFloor(player)) return;
  if (station && startQueuedWork(player, station)) return;
}

function tryUseCarriedItem(player, station) {
  const task = game.tasks[player.carrying];
  if (!task || !canUseCarriedItemAtStation(player, station)) return false;

  if (station.id === "deposit") {
    player.carrying = null;
    completeTask(task);
    return true;
  }

  if (station.id === "signature" || station.id === "stamp") {
    station.processing = {
      taskId: task.id,
      elapsed: 0,
      duration: FLOW_TIMES[station.id],
      mode: "manual",
      playerId: player.id,
    };
    player.carrying = null;
    task.status = `${FLOW_LABELS[station.id]} em andamento`;
    return true;
  }

  if (station.id === "scanner") {
    station.processing = {
      taskId: task.id,
      elapsed: 0,
      duration: FLOW_TIMES.scanner,
      mode: "auto",
    };
    player.carrying = null;
    task.status = "Digitalizando";
    return true;
  }

  return false;
}

function placeOnCounter(player, counter) {
  if (!canPlaceCarriedItemOnCounter(player, counter)) return false;

  counter.surfaceItem = player.carrying;
  const task = game.tasks[player.carrying];
  if (task) task.status = `Aguardando em ${counter.label}`;
  player.carrying = null;
  return true;
}

function canUseCarriedItemAtStation(player, station) {
  if (!player?.carrying || !station) return false;

  const task = game.tasks[player.carrying];
  if (!task || task.flow[task.stepIndex] !== station.id) return false;

  if (station.id === "deposit") return true;
  if (station.id !== "signature" && station.id !== "stamp" && station.id !== "scanner") {
    return false;
  }

  const counter = counterForStation(station.id);
  return !station.processing && !station.output && !counter?.surfaceItem;
}

function canPlaceCarriedItemOnCounter(player, counter) {
  if (!player?.carrying || !counter) return false;

  const station = counter.stationId ? game.stations[counter.stationId] : null;
  return counter.stationId !== "email" && !counter.surfaceItem && !station?.processing && !station?.output;
}

function pickUpFromStation(player, station) {
  const taskId = station.output;
  if (!taskId) return false;
  station.output = null;
  player.carrying = taskId;
  const task = game.tasks[taskId];
  if (task) task.status = `Com P${player.id}`;
  return true;
}

function pickUpFromCounter(player, counter) {
  if (!counter.surfaceItem) return false;
  player.carrying = counter.surfaceItem;
  counter.surfaceItem = null;
  const task = game.tasks[player.carrying];
  if (task) task.status = `Com P${player.id}`;
  return true;
}

function pickUpFromFloor(player) {
  const index = game.floorItems.findIndex((item) => distance(player, item) < world(42));
  if (index < 0) return false;
  const [item] = game.floorItems.splice(index, 1);
  player.carrying = item.taskId;
  const task = game.tasks[item.taskId];
  if (task) task.status = `Com P${player.id}`;
  return true;
}

function dropOnFloor(player) {
  const taskId = player.carrying;
  game.floorItems.push({ taskId, x: player.x + world(12), y: player.y + world(12) });
  const task = game.tasks[taskId];
  if (task) task.status = "No chao";
  player.carrying = null;
}

function startQueuedWork(player, station) {
  if (!["printer", "computer"].includes(station.id)) return false;
  const counter = counterForStation(station.id);
  if (station.processing || station.output || counter?.surfaceItem || station.queue.length === 0) {
    return false;
  }

  const taskId = station.queue.shift();
  const task = game.tasks[taskId];
  if (!task) return false;

  station.processing = {
    taskId,
    elapsed: 0,
    duration: FLOW_TIMES[station.id],
    mode: "auto",
    playerId: player.id,
  };
  task.status = `${FLOW_LABELS[station.id]} processando`;
  return true;
}

function completeTask(task) {
  task.completed = true;
  task.status = "Concluida";

  const appeared = findAppeared(task.email.id);
  if (task.email.legitimate) {
    game.score += 10;
    game.stats.legitCompleted += 1;
    if (appeared) {
      appeared.outcome = "processado";
      appeared.points = 10;
    }
  } else {
    game.score -= 20;
    game.stats.phishingProcessed += 1;
    if (appeared) {
      appeared.outcome = "phishing processado";
      appeared.points = -20;
    }
  }
}

function openEmail() {
  if (game.queue.length === 0) return;
  const email = game.queue[0];
  game.currentEmail = email;
  game.readTime = READ_LIMIT;
  ui.emailSubject.textContent = email.subject;
  ui.emailSender.textContent = email.sender;
  ui.emailBody.textContent = email.body;
  ui.readTimerBar.style.transform = "scaleX(1)";
  ui.emailModal.classList.remove("hidden");
}

function closeEmail() {
  game.currentEmail = null;
  ui.emailModal.classList.add("hidden");
}

function decideEmail(decision) {
  const email = game.currentEmail;
  if (!email) return;

  game.queue.shift();
  const appeared = findAppeared(email.id);

  if (decision === "report") {
    if (email.legitimate) {
      game.score -= 5;
      game.stats.legitDiscarded += 1;
      if (appeared) {
        appeared.outcome = "legitimo descartado";
        appeared.points = -5;
      }
    } else {
      game.score += 15;
      game.stats.phishingReported += 1;
      if (appeared) {
        appeared.outcome = "phishing reportado";
        appeared.points = 15;
      }
    }
    closeEmail();
    return;
  }

  const flow = email.legitimate ? email.flow : email.fakeFlow;
  const task = {
    id: `task-${email.id}-${Date.now()}`,
    email,
    flow,
    stepIndex: 0,
    paperState: "normal",
    status: `Aguardando ${FLOW_LABELS[flow[0]]}`,
    completed: false,
  };

  game.tasks[task.id] = task;
  game.stations[flow[0]].queue.push(task.id);
  if (appeared) {
    appeared.outcome = "aceito";
    appeared.points = 0;
  }
  closeEmail();
}

function finishGame() {
  game.mode = "ended";
  document.body.classList.remove("is-playing");
  exitGameFullscreen();
  ui.gameScreen.classList.add("hidden");
  ui.emailModal.classList.add("hidden");
  ui.resultScreen.classList.remove("hidden");
  renderResults();
  if (activeRunId) {
    setIntegrationStatus(ui.resultIntegrationStatus, "Validando o resultado na plataforma...");
    postToPlatform("overlooked:completed", {
      runId: activeRunId,
      durationSeconds: SESSION_LENGTH - game.timeLeft,
      outcomes: game.appeared.map((email) => ({ id: email.id, outcome: email.outcome })),
    });
  } else {
    setIntegrationStatus(
      ui.resultIntegrationStatus,
      "Partida local: entre na Casa Digital para registrar o resultado.",
    );
  }
}

function findAppeared(id) {
  return game.appeared.find((item) => item.id === id);
}

function renderResults() {
  ui.finalScore.textContent = game.score;
  ui.rankTitle.textContent = rankForScore(game.score);
  ui.breakdown.innerHTML = [
    ["Requisicoes concluidas", game.stats.legitCompleted],
    ["Phishings reportados", game.stats.phishingReported],
    ["Phishings processados", game.stats.phishingProcessed],
    ["Legitimos descartados", game.stats.legitDiscarded],
  ]
    .map(([label, value]) => `<div><span>${label}</span><strong>${value}</strong></div>`)
    .join("");

  ui.resultList.innerHTML = game.appeared
    .map((email) => {
      const mistake =
        email.outcome === "phishing processado" || email.outcome === "legitimo descartado";
      const signs = email.signs.map((sign) => `<li>${escapeHtml(sign)}</li>`).join("");
      return `<article class="${mistake ? "mistake" : ""}">
        <h2>${escapeHtml(email.title)}</h2>
        <p><strong>${email.legitimate ? "Legitimo" : "Phishing"}</strong> - ${escapeHtml(email.outcome)} (${email.points > 0 ? "+" : ""}${email.points} pts)</p>
        <p>${escapeHtml(email.subject)}</p>
        ${mistake || !email.legitimate ? `<ul>${signs}</ul>` : ""}
      </article>`;
    })
    .join("");
}

function rankForScore(score) {
  if (score >= 140) return "Elite Anti-Phishing";
  if (score >= 110) return "Cacador de Phishing";
  if (score >= 80) return "Guardiao Digital";
  if (score >= 50) return "Analista de Governanca";
  if (score >= 20) return "Analista em Formacao";
  if (score >= 0) return "Em treinamento";
  return "Revisao necessaria";
}

function setIntegrationStatus(element, message, state = "") {
  if (!element) return;
  element.textContent = message;
  element.classList.toggle("is-error", state === "error");
  element.classList.toggle("is-success", state === "success");
}

function postToPlatform(type, payload = {}) {
  if (!isEmbedded) return;
  window.parent.postMessage(
    { source: BRIDGE_SOURCE, version: BRIDGE_VERSION, type, ...payload },
    window.location.origin,
  );
}

function requestIntegratedStart() {
  requestGameFullscreen();
  if (!isEmbedded) {
    activeRunId = null;
    startGame();
    return;
  }
  if (awaitingSession) return;
  awaitingSession = true;
  ui.startButton.disabled = true;
  ui.restartButton.disabled = true;
  setIntegrationStatus(ui.integrationStatus, "Abrindo uma sessão válida...");
  setIntegrationStatus(ui.resultIntegrationStatus, "Abrindo uma nova sessão válida...");
  postToPlatform("overlooked:start-request");
}

window.addEventListener("message", (event) => {
  if (
    event.source !== window.parent ||
    event.origin !== window.location.origin ||
    !event.data ||
    event.data.source !== PLATFORM_SOURCE ||
    event.data.version !== BRIDGE_VERSION
  ) {
    return;
  }

  if (event.data.type === "overlooked:session-ready" && typeof event.data.runId === "string") {
    activeRunId = event.data.runId;
    awaitingSession = false;
    ui.startButton.disabled = false;
    ui.restartButton.disabled = false;
    startGame();
  }
  if (event.data.type === "overlooked:session-error") {
    awaitingSession = false;
    ui.startButton.disabled = false;
    ui.restartButton.disabled = false;
    const message = event.data.message || "Não foi possível abrir a partida.";
    setIntegrationStatus(ui.integrationStatus, message, "error");
    setIntegrationStatus(ui.resultIntegrationStatus, message, "error");
  }
  if (event.data.type === "overlooked:result-saved") {
    setIntegrationStatus(
      ui.resultIntegrationStatus,
      `Resultado validado: ${event.data.score} pontos.`,
      "success",
    );
  }
  if (event.data.type === "overlooked:result-error") {
    setIntegrationStatus(
      ui.resultIntegrationStatus,
      event.data.message || "Não foi possível validar o resultado.",
      "error",
    );
  }
});

function draw() {
  const playersByDepth = [...game.players].sort((first, second) => first.y - second.y || first.id - second.id);

  ctx.clearRect(0, 0, WIDTH, HEIGHT);
  drawFloor();
  drawFloorShadows();
  drawZones();
  playersByDepth.forEach(drawPlayerFootLayer);
  Object.values(game.counters).forEach(drawCounter);
  drawFloorItems();
  playersByDepth.forEach(drawCarriedTaskArrow);
  playersByDepth.forEach(drawPlayer);
  drawGameStatus();
}

function drawFloor() {
  ctx.imageSmoothingEnabled = false;
  for (const tile of game.floorTiles) {
    const sprite = spriteForFloorTile(tile);
    if (sprite?.complete) {
      drawFloorTileSprite(sprite, tile);
    } else {
      ctx.fillStyle = "#d8d8d8";
      ctx.fillRect(tile.x, tile.y, TILE, TILE);
    }
  }
}

function drawFloorTileSprite(sprite, tile) {
  if (!tile.rotation) {
    ctx.drawImage(sprite, tile.x, tile.y, TILE, TILE);
    return;
  }

  ctx.save();
  ctx.translate(tile.x + TILE / 2, tile.y + TILE / 2);
  ctx.rotate(tile.rotation);
  ctx.drawImage(sprite, -TILE / 2, -TILE / 2, TILE, TILE);
  ctx.restore();
}

function drawFloorShadows() {
  ctx.imageSmoothingEnabled = false;
  for (const shadow of game.floorShadows) {
    const sprite = shadow.type === "corner" ? sprites.floorShadowCorner : sprites.floorShadow;
    if (!sprite?.complete) continue;

    ctx.save();
    ctx.translate(shadow.x + TILE / 2, shadow.y + TILE / 2);
    ctx.rotate(shadow.rotation);
    ctx.drawImage(sprite, -TILE / 2, -TILE / 2, TILE, TILE);
    ctx.restore();
  }
}

function spriteForFloorTile(tile) {
  const sprite = sprites.floor[tile.type] ?? sprites.floor.normal;
  return Array.isArray(sprite) ? sprite[tile.variant % sprite.length] : sprite;
}

function drawZones() {
  ctx.fillStyle = "#6b7570";
  ctx.font = `700 ${pixel(12)}px sans-serif`;
}

function drawCounter(counter) {
  const station = counter.stationId ? game.stations[counter.stationId] : null;
  const highlighted = isPaperPlacementTarget(counter);
  const machineHighlight =
    highlighted && (station?.id === "printer" || station?.id === "computer");
  const counterSprite = spriteForCounter(counter, highlighted && !machineHighlight);
  if (counterSprite?.complete) {
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(counterSprite, counter.x, counter.y, counter.w, counter.h);
  } else {
    ctx.fillStyle = COUNTER_COLOR;
    ctx.fillRect(counter.x, counter.y, counter.w, counter.h);
  }
  if (
    station &&
    station.id !== "stamp" &&
    station.id !== "deposit" &&
    station.id !== "email" &&
    station.id !== "signature" &&
    station.id !== "scanner" &&
    station.id !== "computer"
  ) {
    drawStationSurfaceAccent(counter, highlighted);
  }
  ctx.strokeStyle = "rgba(30, 42, 37, 0.18)";
  ctx.lineWidth = 1;
  ctx.strokeRect(counter.x + 0.5, counter.y + 0.5, counter.w - 1, counter.h - 1);

  if (station) {
    drawStationIcon(counter, station);
  }

  if (!station && !counter.surfaceItem) {
    drawCounterDecoration(counter);
  }

  if (machineHighlight) {
    drawCounterLightWash(counter);
  }

  if (station?.processing) {
    const ratio = station.processing.elapsed / station.processing.duration;
    drawProgress(counter.x + 3, counter.y + counter.h - 5, counter.w - 6, 3, ratio);
  }

  if (station?.queue.length > 0) {
    drawBadge(counter.x + counter.w - 7, counter.y + 14, station.queue.length);
  }

  if (station?.id === "email" && game.queue.length > 0) {
    drawBadge(counter.x + counter.w - 7, counter.y + 14, game.queue.length);
  }

  const paperTaskId = counter.surfaceItem ?? (station?.id !== "printer" ? station?.output : null);
  if (paperTaskId) {
    drawPaper(counter.x + 6, counter.y + 5, paperTaskId);
  }
}

function drawCounterDecoration(counter) {
  let frames;
  let sequence;
  let frameDuration;

  if (counter.decor === "newtonCradle") {
    frames = sprites.counterDecor.newtonCradle;
    sequence = NEWTON_CRADLE_SEQUENCE;
    frameDuration = 140;
  } else if (counter.decor === "hotCoffee") {
    frames = sprites.counterDecor.hotCoffee;
    sequence = HOT_COFFEE_SEQUENCE;
    frameDuration = 220;
  } else if (counter.decor === "miniAquarium") {
    frames = sprites.counterDecor.miniAquarium;
    sequence = MINI_AQUARIUM_SEQUENCE;
    frameDuration = 240;
  } else {
    return;
  }

  const sequenceIndex =
    (Math.floor(performance.now() / frameDuration) + counter.decorPhase) % sequence.length;
  const frame = sequence[sequenceIndex];
  const sprite = frames[frame];
  if (!sprite?.complete) return;

  ctx.imageSmoothingEnabled = false;
  ctx.drawImage(sprite, counter.x, counter.y, counter.w, counter.h);
}

function drawStationSurfaceAccent(counter, highlighted) {
  const inset = 7;
  const x = counter.x + inset;
  const y = counter.y + inset;
  const width = counter.w - inset * 2;
  const height = counter.h - inset * 2;

  ctx.save();
  ctx.fillStyle = counter.color;
  ctx.globalAlpha = highlighted ? 0.72 : 0.58;
  ctx.fillRect(x, y, width, height);

  ctx.globalAlpha = highlighted ? 0.82 : 0.62;
  ctx.fillRect(x, y, width, 2);

  ctx.globalAlpha = 1;
  ctx.strokeStyle = "rgba(30, 42, 45, 0.36)";
  ctx.lineWidth = 1;
  ctx.strokeRect(x + 0.5, y + 0.5, width - 1, height - 1);
  ctx.restore();
}

function drawCounterLightWash(counter) {
  const sprite = spriteForCounter(counter, true);
  if (!sprite?.complete) return;

  ctx.save();
  ctx.globalAlpha = 0.42;
  ctx.drawImage(sprite, counter.x, counter.y, counter.w, counter.h);
  ctx.restore();
}

function isPaperPlacementTarget(counter) {
  return game.players.some((player) => {
    if (!canPlaceCarriedItemOnCounter(player, counter)) return false;

    const station = nearestStation(player, ACTION_RANGE);
    if (station && canUseCarriedItemAtStation(player, station)) return false;

    return nearestCounter(player, ACTION_RANGE) === counter;
  });
}

function spriteForCounter(counter, highlighted = false) {
  const c = highlighted ? sprites.countersLight : sprites.counters;
  if (counter.group === "middle") {
    if (counter.x === TILE * 3) return c.centerLeft;
    if (counter.x === TILE * 10) return c.centerRight;
    return c.sideHorizontal;
  }
  if (counter.x === 0 && counter.y === 0) return c.cornerTopLeft;
  if (counter.x === WIDTH - TILE && counter.y === 0) return c.cornerTopRight;
  if (counter.x === 0 && counter.y === HEIGHT - TILE) return c.cornerBottomLeft;
  if (counter.x === WIDTH - TILE && counter.y === HEIGHT - TILE) return c.cornerBottomRight;
  if (counter.group === "left" || counter.group === "right") return c.sideVertical;
  return c.sideHorizontal;
}

function drawStationIcon(counter, station) {
  if (station.id === "printer") {
    drawPrinterStation(counter, station);
    return;
  }

  if (station.id === "computer") {
    drawComputerStation(counter, station);
    return;
  }

  if (station.id === "stamp") {
    drawStampStation(counter, station);
    return;
  }

  if (station.id === "email") {
    drawEmailStation(counter);
    return;
  }

  if (station.id === "deposit") {
    drawDepositStation(counter);
    return;
  }

  if (station.id === "signature") {
    drawSignatureStation(counter, station);
    return;
  }

  if (station.id === "scanner") {
    drawScannerStation(counter, station);
    return;
  }
}

function drawEnvelopeIcon(x, y, w, h) {
  const centerX = x + Math.floor(w / 2);
  const centerY = y + Math.floor(h / 2);
  drawPixelRect(x, y, w, h);
  drawPixelLine(x, y, centerX, centerY);
  drawPixelLine(x + w - 1, y, centerX, centerY);
  drawPixelLine(x, y + h - 1, centerX - 2, centerY + 1);
  drawPixelLine(x + w - 1, y + h - 1, centerX + 2, centerY + 1);
}

function drawPenIcon(x, y) {
  drawPixelLine(x + 12, y + 29, x + 28, y + 13, 2);
  drawPixelLine(x + 13, y + 31, x + 30, y + 14);
  ctx.fillRect(x + 10, y + 30, 4, 4);
  drawPixelLine(x + 9, y + 35, x + 17, y + 33);
  drawPixelLine(x + 17, y + 33, x + 23, y + 35);
  drawPixelLine(x + 23, y + 35, x + 31, y + 32);
}

function drawStampIcon(x, y) {
  ctx.fillRect(x + 21, y + 12, 6, 8);
  ctx.fillRect(x + 18, y + 19, 12, 4);
  drawPixelRect(x + 14, y + 23, 20, 8, 2);
  ctx.fillRect(x + 12, y + 33, 24, 3);
}

function drawStampStation(counter, station) {
  const stamp = sprites.stationEquipment.stamp;
  let sprite = stamp.idle;

  if (station.processing) {
    const progress = station.processing.elapsed / station.processing.duration;
    if (progress < 0.3 || progress >= 0.7) {
      sprite = stamp.frames[0];
    } else if (progress < 0.4) {
      sprite = stamp.frames[1];
    } else if (progress < 0.48) {
      sprite = stamp.frames[2];
    } else if (progress < 0.54) {
      sprite = stamp.frames[3];
    } else if (progress < 0.62) {
      sprite = stamp.frames[2];
    } else {
      sprite = stamp.frames[4];
    }
  }

  if (sprite.complete) {
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(sprite, counter.x, counter.y, counter.w, counter.h);
    return;
  }

  ctx.save();
  ctx.fillStyle = "rgba(255, 255, 255, 0.95)";
  drawStampIcon(counter.x, counter.y);
  ctx.restore();
}

function drawSignatureStation(counter, station) {
  const signature = sprites.stationEquipment.signature;
  let sprite = signature.idle;

  if (station.processing) {
    const progress = station.processing.elapsed / station.processing.duration;
    if (progress < 0.08 || progress > 0.92) {
      sprite = signature.frames[0];
    } else if (progress < 0.16 || progress > 0.84) {
      sprite = signature.frames[1];
    } else {
      const sequenceIndex =
        Math.floor(station.processing.elapsed * 8) % SIGNATURE_WRITE_SEQUENCE.length;
      sprite = signature.frames[SIGNATURE_WRITE_SEQUENCE[sequenceIndex]];
    }
  }

  if (sprite.complete) {
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(sprite, counter.x, counter.y, counter.w, counter.h);
    return;
  }

  ctx.save();
  ctx.fillStyle = "rgba(255, 255, 255, 0.95)";
  drawPenIcon(counter.x, counter.y);
  ctx.restore();
}

function drawEmailStation(counter) {
  const email = sprites.stationEquipment.email;
  let sprite = email.idle;

  if (game.queue.length > 0) {
    const sequenceIndex =
      Math.floor(performance.now() / 160) % EMAIL_NOTIFICATION_SEQUENCE.length;
    sprite = email.frames[EMAIL_NOTIFICATION_SEQUENCE[sequenceIndex]];
  }

  if (sprite.complete) {
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(sprite, counter.x, counter.y, counter.w, counter.h);
    return;
  }

  ctx.save();
  ctx.fillStyle = "rgba(255, 255, 255, 0.95)";
  drawEnvelopeIcon(counter.x + 10, counter.y + 10, 18, 12);
  ctx.restore();
}

function drawDepositStation(counter) {
  const sprite = sprites.stationEquipment.deposit;
  if (sprite.complete) {
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(sprite, counter.x, counter.y, counter.w, counter.h);
    return;
  }

  ctx.save();
  ctx.fillStyle = "rgba(255, 255, 255, 0.95)";
  drawDepositIcon(counter.x, counter.y);
  ctx.restore();
}

function drawScannerIcon(x, y) {
  drawPixelRect(x + 11, y + 16, 26, 17, 2);
  drawPixelLine(x + 14, y + 13, x + 34, y + 16);
  ctx.fillRect(x + 15, y + 22, 18, 2);
}

function drawScannerStation(counter, station) {
  const scanner = sprites.stationEquipment.scanner;
  let sprite = scanner.idle;

  if (station.processing) {
    const sequenceIndex = Math.floor(station.processing.elapsed * 9) % SCANNER_SCAN_SEQUENCE.length;
    sprite = scanner.frames[SCANNER_SCAN_SEQUENCE[sequenceIndex]];
  }

  if (sprite.complete) {
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(sprite, counter.x, counter.y, counter.w, counter.h);
    return;
  }

  ctx.save();
  ctx.fillStyle = "rgba(255, 255, 255, 0.95)";
  drawScannerIcon(counter.x, counter.y);
  ctx.restore();
}

function drawDepositIcon(x, y) {
  drawPixelRect(x + 11, y + 17, 26, 18, 2);
  ctx.fillRect(x + 16, y + 24, 16, 2);
  ctx.fillRect(x + 14, y + 14, 20, 3);
}

function drawPixelRect(x, y, w, h, thickness = 1) {
  const left = Math.round(x);
  const top = Math.round(y);
  const width = Math.round(w);
  const height = Math.round(h);
  ctx.fillRect(left, top, width, thickness);
  ctx.fillRect(left, top + height - thickness, width, thickness);
  ctx.fillRect(left, top + thickness, thickness, height - thickness * 2);
  ctx.fillRect(left + width - thickness, top + thickness, thickness, height - thickness * 2);
}

function drawPixelLine(x0, y0, x1, y1, thickness = 1) {
  let x = Math.round(x0);
  let y = Math.round(y0);
  const endX = Math.round(x1);
  const endY = Math.round(y1);
  const dx = Math.abs(endX - x);
  const sx = x < endX ? 1 : -1;
  const dy = -Math.abs(endY - y);
  const sy = y < endY ? 1 : -1;
  let error = dx + dy;

  while (true) {
    ctx.fillRect(x, y, thickness, thickness);
    if (x === endX && y === endY) break;
    const doubledError = error * 2;
    if (doubledError >= dy) {
      error += dy;
      x += sx;
    }
    if (doubledError <= dx) {
      error += dx;
      y += sy;
    }
  }
}

function drawPrinterStation(counter, station) {
  let sprite = sprites.printer.idle;
  if (station.output) {
    sprite = sprites.printer.frames[sprites.printer.frames.length - 1];
  } else if (station.processing) {
    const progress = clamp(station.processing.elapsed / station.processing.duration, 0, 0.999);
    const frame = Math.floor(progress * sprites.printer.frames.length);
    sprite = sprites.printer.frames[frame];
  }

  if (sprite.complete) {
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(sprite, counter.x, counter.y, counter.w, counter.h);
    return;
  }

  drawPrinterFallbackIcon(counter);
}

function drawComputerStation(counter, station) {
  const active = station.queue.length > 0 || station.processing || station.output;
  let sprite = active ? sprites.computer.on : sprites.computer.off;

  if (station.processing) {
    const frame = Math.floor(station.processing.elapsed * 8) % sprites.computer.frames.length;
    sprite = sprites.computer.frames[frame];
  }

  if (sprite.complete) {
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(sprite, counter.x, counter.y, counter.w, counter.h);
    return;
  }

  drawComputerFallbackIcon(counter);
}

function drawPrinterFallbackIcon(counter) {
  ctx.save();
  ctx.fillStyle = "rgba(255, 255, 255, 0.85)";
  drawPixelRect(counter.x + 10, counter.y + 12, 28, 15, 2);
  ctx.fillRect(counter.x + 15, counter.y + 7, 18, 7);
  drawPixelRect(counter.x + 14, counter.y + 26, 20, 9, 2);
  ctx.restore();
}

function drawComputerFallbackIcon(counter) {
  ctx.save();
  ctx.fillStyle = "rgba(255, 255, 255, 0.95)";
  drawPixelRect(counter.x + 10, counter.y + 9, 28, 20, 2);
  ctx.fillRect(counter.x + 23, counter.y + 29, 2, 6);
  ctx.fillRect(counter.x + 17, counter.y + 35, 14, 2);
  ctx.restore();
}

function drawBadge(x, y) {
  const sequenceIndex = Math.floor(performance.now() / 115) % EXCLAMATION_SEQUENCE.length;
  const frame = sprites.exclamation[EXCLAMATION_SEQUENCE[sequenceIndex]];
  const size = BADGE_SIZE;

  if (frame?.complete) {
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(frame, Math.round(x - size / 2), Math.round(y - size / 2), size, size);
    return;
  }

  ctx.fillStyle = "#fff21f";
  ctx.fillRect(Math.round(x) - 2, Math.round(y) - 9, 4, 12);
  ctx.fillRect(Math.round(x) - 2, Math.round(y) + 6, 4, 4);
}

function drawProgress(x, y, w, h, ratio) {
  ctx.fillStyle = "rgba(255, 255, 255, 0.35)";
  ctx.fillRect(x, y, w, h);
  ctx.fillStyle = "#e9b949";
  ctx.fillRect(x, y, Math.round(w * clamp(ratio, 0, 1)), h);
}

function drawCarriedTaskArrow(player) {
  if (!player.carrying) return;

  const target = targetCounterForCarriedTask(player);
  if (!target) return;

  const targetX = target.x + target.w / 2;
  const targetY = target.y + target.h / 2;
  const dx = targetX - player.x;
  const dy = targetY - player.y;
  const length = Math.hypot(dx, dy);
  if (length < world(48)) return;

  const unitX = dx / length;
  const unitY = dy / length;
  const arrowX = Math.round(player.x + unitX * world(62));
  const arrowY = Math.round(player.y + unitY * world(62) - world(18));
  const rawAngle = Math.atan2(dy, dx) + Math.PI / 2;
  const angle = Math.round(rawAngle / (Math.PI / 2)) * (Math.PI / 2);
  const size = ARROW_SIZE;
  const frame = sprites.arrow[Math.floor(performance.now() / 95) % sprites.arrow.length];

  ctx.save();
  ctx.translate(arrowX, arrowY);
  ctx.rotate(angle);
  if (frame?.complete) {
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(frame, -size / 2, -size / 2, size, size);
  } else {
    ctx.fillStyle = "#fff21f";
    ctx.fillRect(-2, -8, 4, 18);
    ctx.fillRect(-6, -8, 12, 4);
    ctx.fillRect(-4, -12, 8, 4);
    ctx.fillRect(-2, -16, 4, 4);
  }
  ctx.restore();
}

function targetCounterForCarriedTask(player) {
  const task = game.tasks[player.carrying];
  if (!task) return null;

  const step = task.flow[task.stepIndex];
  return counterForStation(step);
}

function drawGameStatus() {
  const time = formatTime(game.timeLeft);
  const score = String(game.score);
  const danger = game.timeLeft <= 30;
  const textScale = 2;
  const timeWidth = measurePixelText(time, textScale);
  const scoreWidth = measurePixelText(score, textScale);
  const panelWidth = Math.max(timeWidth, scoreWidth) + 10;
  const panelHeight = 28;
  const panelX = WIDTH - 9 - panelWidth;
  const panelY = HEIGHT - 9 - panelHeight;

  ctx.save();
  ctx.fillStyle = "rgba(23, 33, 31, 0.68)";
  ctx.fillRect(panelX, panelY, panelWidth, panelHeight);

  drawPixelText(score, WIDTH - 14, panelY + 4, "#fffdf4", textScale, "right");
  drawPixelText(
    time,
    WIDTH - 14,
    panelY + 15,
    danger ? "#ff6868" : "#fffdf4",
    textScale,
    "right",
  );
  ctx.restore();
}

function measurePixelText(value, scale = 1) {
  const text = String(value);
  if (text.length === 0) return 0;
  return text.length * 3 * scale + (text.length - 1) * scale;
}

function drawPixelText(value, x, y, color, scale = 1, align = "left") {
  const text = String(value);
  const width = measurePixelText(text, scale);
  let cursorX = Math.round(align === "right" ? x - width : x);
  const top = Math.round(y);
  ctx.fillStyle = color;

  for (const character of text) {
    const glyph = PIXEL_GLYPHS[character];
    if (glyph) {
      glyph.forEach((row, rowIndex) => {
        [...row].forEach((cell, columnIndex) => {
          if (cell === "1") {
            ctx.fillRect(
              cursorX + columnIndex * scale,
              top + rowIndex * scale,
              scale,
              scale,
            );
          }
        });
      });
    }
    cursorX += 4 * scale;
  }
}

function drawFloorItems() {
  game.floorItems.forEach((item) => drawPaper(item.x, item.y, item.taskId));
}

function drawPlayerFootLayer(player) {
  const transform = transformForDirection(player.visualDirection);

  if (player.id === 1) {
    const foot = player.moving
      ? player1LayeredWalkFrame(player).foot
      : sprites.player1IdleLeftLayers.foot;
    if (foot.complete) {
      drawPlayerSprite(player, foot, transform);
    }
    return;
  }

  if (player.id !== 2) return;
  if (player.carrying) {
    const foot = player.moving ? player2HoldPaperWalkFootFrame(player) : sprites.player2HoldPaper.feet.idle;
    if (foot.complete) {
      drawPlayerSprite(player, foot, transform);
    }
    return;
  }

  const foot = player.moving
    ? player2LayeredWalkFrame(player).foot
    : sprites.player2IdleLeftLayers.foot;
  if (foot.complete) {
    drawPlayerSprite(player, foot, transform);
  }
}

function drawPlayer(player) {
  const transform = transformForDirection(player.visualDirection);

  if (player.id === 1) {
    const body = player.moving
      ? player1LayeredWalkFrame(player).body
      : sprites.player1IdleLeftLayers.body;
    if (body.complete) {
      drawPlayerSprite(player, body, transform);
      if (player.carrying) drawPaper(player.x - 5, player.y - 16, player.carrying);
      return;
    }
  }

  if (player.id === 2) {
    if (player.carrying) {
      const body = player2HoldPaperBodyForTask(player.carrying);
      if (body.complete) {
        drawPlayerSprite(player, body, transform);
        return;
      }
    }

    const body = player.moving
      ? player2LayeredWalkFrame(player).body
      : sprites.player2IdleLeftLayers.body;
    if (body.complete) {
      drawPlayerSprite(player, body, transform);
      return;
    }
  }

  ctx.fillStyle = player.color;
  const fallbackSize = Math.max(4, Math.round(player.r * 2));
  ctx.fillRect(
    Math.round(player.x - fallbackSize / 2),
    Math.round(player.y - fallbackSize / 2),
    fallbackSize,
    fallbackSize,
  );
  if (player.carrying) drawPaper(player.x - 5, player.y - 16, player.carrying);
}

function player1LayeredWalkFrame(player) {
  const frames = sprites.player1WalkLeftLayers;
  const frame = Math.floor(player.animTime * 8) % frames.length;
  return frames[frame];
}

function player2LayeredWalkFrame(player) {
  const frames = sprites.player2WalkLeftLayers;
  const frame = Math.floor(player.animTime * 10) % frames.length;
  return frames[frame];
}

function player2HoldPaperWalkFootFrame(player) {
  const frame = Math.floor(player.animTime * 6) % PLAYER2_HOLD_PAPER_FOOT_SEQUENCE.length;
  const key = PLAYER2_HOLD_PAPER_FOOT_SEQUENCE[frame];
  return sprites.player2HoldPaper.feet[key];
}

function player2HoldPaperBodyForTask(taskId) {
  return sprites.player2HoldPaper.bodies[paperStateForTask(taskId)] ?? sprites.player2HoldPaper.bodies.normal;
}

function paperSpriteForTask(taskId) {
  return sprites.paper[paperStateForTask(taskId)] ?? sprites.paper.normal;
}

function paperStateForTask(taskId) {
  return game.tasks[taskId]?.paperState ?? "normal";
}

function transformForDirection(direction) {
  if (direction === "right") return { flipX: true, rotation: 0 };
  if (direction === "up") return { flipX: false, rotation: Math.PI / 2 };
  if (direction === "down") return { flipX: false, rotation: -Math.PI / 2 };
  return { flipX: false, rotation: 0 };
}

function drawPlayerSprite(player, sprite, transform = {}) {
  const spriteW = PLAYER_SPRITE_SIZE;
  const spriteH = PLAYER_SPRITE_SIZE;
  const renderX = Math.round(player.x + (transform.offsetX ?? 0));
  const renderY = Math.round(
    player.y - (PLAYER_SPRITE_ANCHOR_Y - PLAYER_SPRITE_PIVOT_Y) +
      (transform.offsetY ?? 0),
  );
  ctx.imageSmoothingEnabled = false;
  ctx.save();
  ctx.translate(renderX, renderY);
  ctx.rotate(transform.rotation ?? 0);
  ctx.scale(transform.flipX ? -1 : 1, 1);
  ctx.drawImage(
    sprite,
    -PLAYER_SPRITE_PIVOT_X,
    -PLAYER_SPRITE_PIVOT_Y,
    spriteW,
    spriteH,
  );
  ctx.restore();
}

function drawPaper(x, y, taskId = null) {
  const sprite = paperSpriteForTask(taskId);
  const renderX = Math.round(x);
  const renderY = Math.round(y);
  if (sprite?.complete) {
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(sprite, renderX, renderY, PAPER_SIZE, PAPER_SIZE);
    return;
  }

  ctx.save();
  ctx.translate(renderX, renderY);
  ctx.fillStyle = "#fffdf4";
  ctx.fillRect(2, 1, 12, 14);
  ctx.fillStyle = "#8d988f";
  drawPixelRect(2, 1, 12, 14);
  ctx.fillStyle = "#c7b46a";
  ctx.fillRect(5, 6, 7, 1);
  ctx.fillRect(5, 9, 7, 1);
  ctx.fillRect(5, 12, 5, 1);
  ctx.restore();
}

function nearestStation(player, range) {
  let best = null;
  let bestDistance = Infinity;
  Object.values(game.stations).forEach((station) => {
    const d = distanceToRect(player, station);
    if (d < range && d < bestDistance) {
      best = station;
      bestDistance = d;
    }
  });
  return best;
}

function nearestCounter(player, range) {
  let best = null;
  let bestDistance = Infinity;
  Object.values(game.counters).forEach((counter) => {
    const d = distanceToRect(player, counter);
    if (d < range && d < bestDistance) {
      best = counter;
      bestDistance = d;
    }
  });
  return best;
}

function counterForStation(stationId) {
  return Object.values(game.counters).find((counter) => counter.stationId === stationId);
}

function nearRect(point, rect, range) {
  return distanceToRect(point, rect) < range;
}

function distanceToRect(point, rect) {
  const x = clamp(point.x, rect.x, rect.x + rect.w);
  const y = clamp(point.y, rect.y, rect.y + rect.h);
  return Math.hypot(point.x - x, point.y - y);
}

function circleRectCollision(circle, rect) {
  if (circle.hitbox) {
    return rectsOverlap(playerHitbox(circle), rect);
  }
  return distanceToRect(circle, rect) < circle.r;
}

function playerHitbox(player) {
  const hitbox =
    player.hitbox ??
    { w: player.r * 2, h: player.r * 2, offsetX: 0, offsetY: 0 };
  return {
    x: player.x - hitbox.w / 2 + (hitbox.offsetX ?? 0),
    y: player.y - hitbox.h / 2 + (hitbox.offsetY ?? 0),
    w: hitbox.w,
    h: hitbox.h,
  };
}

function rectsOverlap(a, b) {
  return a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;
}

function distance(a, b) {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function formatTime(seconds) {
  const total = Math.ceil(seconds);
  const minutes = Math.floor(total / 60);
  const rest = total % 60;
  return `${String(minutes).padStart(2, "0")}:${String(rest).padStart(2, "0")}`;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

window.addEventListener("keydown", (event) => {
  const key = event.key.toLowerCase();
  if (["arrowup", "arrowdown", "arrowleft", "arrowright", "enter", " "].includes(key)) {
    event.preventDefault();
  }
  if (game?.currentEmail) {
    if (key === "a") decideEmail("accept");
    if (key === "r") decideEmail("report");
    if (key === "escape") closeEmail();
    keys.add(key);
    return;
  }
  if (key === "e" && !keys.has("e")) handleAction(game?.players[0]);
  if (key === "enter" && !keys.has("enter")) handleAction(game?.players[1]);
  keys.add(key);
});

window.addEventListener("keyup", (event) => {
  keys.delete(event.key.toLowerCase());
});

window.addEventListener("resize", fitCanvasToViewport);
document.addEventListener("fullscreenchange", fitCanvasToViewport);

ui.startButton.addEventListener("click", requestIntegratedStart);
ui.restartButton.addEventListener("click", requestIntegratedStart);
ui.closeEmailButton.addEventListener("click", closeEmail);
ui.acceptButton.addEventListener("click", () => decideEmail("accept"));
ui.reportButton.addEventListener("click", () => decideEmail("report"));

fitCanvasToViewport();
postToPlatform("overlooked:ready");
