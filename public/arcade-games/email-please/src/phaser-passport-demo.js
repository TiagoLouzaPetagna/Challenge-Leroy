const WIDTH = 640;
const HEIGHT = 360;
const RENDER_RESOLUTION = 1;
const PIXEL_FALLBACK = '"Fixedsys", "Terminal", "Lucida Console", "Courier New", monospace';
const FONT_DOCUMENT = '"BM Mini", "MiniKylie", "Atari Small", ' + PIXEL_FALLBACK;
const FONT_TITLE = '"PixelPlay", "Atari Small", "Nokia Cellphone FC", ' + PIXEL_FALLBACK;
const FONT_READABLE = '"Nokia Cellphone FC", "Atari Small", "PixelPlay", ' + PIXEL_FALLBACK;
const FONT_UI = FONT_READABLE;
const FONT_STAMP = '"BM Germar", "PixelPlay", "Atari Small", ' + PIXEL_FALLBACK;
const DOCUMENT_BODY_FONT_SIZE = "8px";
const DOCUMENT_META_FONT_SIZE = "8px";
const DOCUMENT_INK = "#2b302d";
const DOCUMENT_MUTED_INK = "#454b47";
const ADMIN_INK = "#2b221a";
const ADMIN_MUTED_INK = "#4b4032";
const TEXT_COUNTER_ROTATION = 0.58;
const DOCUMENT_MIN_VISIBLE_EDGE = 34;
const ENVELOPE_SCALE = 1.5;
const ENVELOPE_SOURCE_WIDTH = 64;
const ENVELOPE_CLOSED_SOURCE_HEIGHT = 96;
const ENVELOPE_OPEN_TOP_SOURCE_HEIGHT = 16;
const ENVELOPE_STACK_VISIBLE_COUNT = 3;
const ENVELOPE_STACK_TOP_X = 0;
const ENVELOPE_STACK_TOP_Y = -70;
const ENVELOPE_STACK_SPACING_X = 4;
const ENVELOPE_STACK_SPACING_Y = 5;
const SCANNER_HIGHLIGHT_COLOR = 0x5CE65C;
const SCANNER_FOCUS_DEPTH = 1500;
const SCANNER_FOCUS_ALPHA = 0.42;
const SCANNER_FOCUS_FADE_DURATION = 120;
const SCANNER_RECEIPT_WIDTH = 104;
const SCANNER_RECEIPT_HEIGHT = 48;
const SCANNER_X = 76;
const SCANNER_Y = 35;
const SCANNER_RECEIPT_REST_Y = 122;
const SCANNER_FRONT_DEPTH = 4;
const SHIFT_BULLETIN = {
  foldedWidth: 178,
  foldedHeight: 46,
  openWidth: 202,
  startX: 340,
  startY: 50,
  targetX: 525,
  targetY: 266,
};
const SHIFT_BULLETIN_PREVIEW = {
  number: "01",
  title: "ALTERAÇÕES DE TRIAGEM",
  changes: [
    {
      duration: "RUN",
      sectionTitle: "ALTERAÇÃO PERMANENTE",
      title: "DESLIGAMENTO",
      lines: ["Helena Voss não representa", "mais a Aurora Contábil."],
      validity: "VIGÊNCIA: TODA A JOGATINA",
    },
    {
      duration: "TURN",
      sectionTitle: "ORDEM TEMPORÁRIA",
      title: "CAMPANHA DE ZIP",
      lines: ["ZIP da Aurora permitido ao", "Financeiro com CAMP-####."],
      validity: "VIGÊNCIA: ESTE TURNO",
    },
  ],
};
const ASSET_VERSION = Date.now();
let stampMarkTextureId = 0;
const STAMP_STATION = {
  x: 520,
  y: 84,
  width: 550,
  height: 250,
  scale: 0.52,
  visibleEdge: 34,
  pressDistance: 24,
  strikeYOffset: 55,
  hitbox: new Phaser.Geom.Rectangle(0, 0, 92, 90),
  rejectCenter: new Phaser.Math.Vector2(140.5, 104),
  approveCenter: new Phaser.Math.Vector2(382.5, 104),
  layers: {
    back: { key: "stampBack", path: "assets/carrimbo-partedetras.png" },
    baseShadow: { key: "stampBaseShadow", path: "assets/carrimbo-base.png" },
    red: { key: "stampRed", path: "assets/carrimbo-vermelho.png" },
    green: { key: "stampGreen", path: "assets/carrimbo-verde.png" },
    baseFront: { key: "stampBaseFront", path: "assets/carrimbo-base-frente.png" },
  },
};

const fixedSpots = {
  inbox: new Phaser.Geom.Rectangle(164, 4, 154, 54),
};
const INBOX_MAIL_SLOT = {
  envelopeX: 268,
  envelopeY: 32,
  storedScale: 0.44,
  arrivalScale: 0.32,
  arrivalDuration: 520,
  settleDuration: 115,
};
const DELIVERY_BUTTON = {
  x: 354,
  y: 31,
  width: 60,
  height: 46,
};
const BULLETIN_EMAIL_INTERVAL = 5;
const GENERATED_TURN_EMAIL_COUNT = BULLETIN_EMAIL_INTERVAL;
const MAX_TRIAGE_ERRORS = 2;

const documentStarts = {
  email: new Phaser.Math.Vector2(302, 202),
  senderCard: new Phaser.Math.Vector2(440, 184),
  exeAttachment: new Phaser.Math.Vector2(338, 288),
  zipAttachment: new Phaser.Math.Vector2(392, 290),
  docxAttachment: new Phaser.Math.Vector2(446, 292),
  pdfAttachment: new Phaser.Math.Vector2(500, 290),
  xlsxAttachment: new Phaser.Math.Vector2(554, 292),
  batAttachment: new Phaser.Math.Vector2(286, 318),
  msiAttachment: new Phaser.Math.Vector2(608, 318),
};
const GENERATED_ATTACHMENT_LAYOUTS = {
  exe: { destination: documentStarts.exeAttachment, angle: 9, scale: 0.55, previewScale: 0.5, width: 34, height: 36 },
  zip: { destination: documentStarts.zipAttachment, angle: 14, scale: 0.55, previewScale: 0.5, width: 34, height: 36 },
  docx: { destination: documentStarts.docxAttachment, angle: -6, scale: 0.55, previewScale: 0.48, width: 34, height: 38 },
  pdf: { destination: documentStarts.pdfAttachment, angle: 6, scale: 0.55, previewScale: 0.48, width: 34, height: 38 },
  xlsx: { destination: documentStarts.xlsxAttachment, angle: -10, scale: 0.55, previewScale: 0.48, width: 34, height: 38 },
  bat: { destination: documentStarts.batAttachment, angle: -5, scale: 0.55, previewScale: 0.5, width: 34, height: 36 },
  msi: { destination: documentStarts.msiAttachment, angle: 7, scale: 0.55, previewScale: 0.5, width: 34, height: 36 },
};

const REGULATION_BOOK_BODY_LINE_SPACING = 2;
const REGULATION_BOOK_COMPACT_LINE_SPACING = 1;
const RULEBOOK_DESIGN = {
  x: 180,
  y: 210,
  width: 360,
  height: 244,
  coverX: -180,
  coverY: -122,
  pageTop: -112,
  pageWidth: 160,
  pageHeight: 224,
  leftPageX: -171,
  rightPageX: 11,
  leftCenterX: -91,
  rightCenterX: 91,
  leftContentX: -161,
  rightContentX: 21,
  contentTop: -80,
  contentWidth: 140,
  contentHeight: 164,
  footerY: 95,
  tabX: 191,
  tabStartY: -69,
  tabSpacing: 46,
  tabWidth: 26,
  tabHeight: 40,
};

const regulationBookSections = [
  {
    id: "rules",
    tab: "RULES",
    accent: 0x7b2e2a,
    pages: [
      {
        template: "rules",
        leftTitle: "REGRAS BÁSICAS",
        rightTitle: "IDENTIDADE",
        left: [
          "Recuse malware, senhas e códigos MFA.",
          "Recuse mudança bancária feita só por e-mail.",
          "Não envie dados para fora nem desative proteções por pedido recebido.",
          "Remetente e setor devem combinar com o pedido.",
        ],
        right: [
          "Confira nome, endereço e cargo no cadastro da seção NET.",
          "Mensagens internas usam correio.corp e origem INTERNA.",
          "Mensagens da Aurora usam aurora-contabil.nac.",
          "RESPONDER A deve usar um domínio autorizado.",
        ],
      },
      {
        template: "rules",
        leftTitle: "LINKS",
        rightTitle: "BOLETIM",
        left: [
          "Analise todo link no scanner antes de decidir.",
          "Destino e caminho devem corresponder ao serviço esperado.",
          "cor.re é o encurtador interno; destino não resolvido é recusado.",
          "Um link correto não torna legítimo um pedido proibido.",
        ],
        right: [
          "Contas e operações suspensas ficam bloqueadas durante a vigência.",
          "Faixas de protocolo suspensas não podem ser usadas.",
          "Desligamentos permanecem até o fim da jogatina.",
          "Protocolos exigidos constam na NET e no boletim.",
        ],
      },
    ],
  },
  {
    id: "net",
    tab: "NET",
    accent: 0x4f6a59,
    pages: [
      {
        template: "flow",
        leftTitle: "REDE INTERNA",
        rightTitle: "CONTAS DE SERVIÇO",
        left: [
          { label: "CORREIO.CORP", text: "Domínio dos funcionários e das contas de serviço." },
          { label: "ACESSO.CORREIO.CORP", text: "Perfil e atividade da conta." },
          { label: "ARQUIVOS / SUPORTE", text: "arquivos.correio.corp e suporte.correio.corp." },
          { label: "COR.RE", text: "Encurtador interno; confirme o destino no scanner." },
        ],
        right: [
          { label: "ACESSO", text: "acesso@correio.corp // avisos de conta." },
          { label: "ARQUIVOS", text: "arquivos@correio.corp // pacotes ARQ-####." },
          { label: "SUPORTE", text: "suporte@correio.corp // chamados SUP-####." },
          { label: "LIMITE", text: "Cada conta executa somente a própria operação." },
        ],
      },
      {
        template: "flow",
        leftTitle: "FUNCIONÁRIOS A",
        rightTitle: "FUNCIONÁRIOS B",
        left: [
          { label: "LÍVIA NUNES", text: "livia.nunes@correio.corp // RH" },
          { label: "OTÁVIO MENDES", text: "otavio.mendes@correio.corp // Gerente de Pessoal" },
          { label: "CAIO FERRAZ", text: "caio.ferraz@correio.corp // Suporte de TI" },
          { label: "DAVI LACERDA", text: "davi.lacerda@correio.corp // Administrador de Sistemas" },
        ],
        right: [
          { label: "ELISA PRADO", text: "elisa.prado@correio.corp // Analista Financeiro" },
          { label: "TOMÁS LEAL", text: "tomas.leal@correio.corp // Gerente Financeiro" },
          { label: "RENATA AZEVEDO", text: "renata.azevedo@correio.corp // Jurídico" },
          { label: "DÁRIO SALLES", text: "dario.salles@correio.corp // Advogado Corporativo" },
        ],
      },
      {
        template: "flow",
        leftTitle: "RH",
        rightTitle: "TI",
        left: [
          { label: "CADASTRO", text: "Lívia ou Otávio: PDF sem script ou link /perfil/atualizar." },
          { label: "FOLHA", text: "Otávio: XLSX para Financeiro com FOL-####." },
          { label: "PLANILHA", text: "Na folha, XLSX sem macros; confirme FOL-####." },
        ],
        right: [
          { label: "CHAMADO", text: "Funcionário para TI: SUP-####, sem anexo ou PDF sem script." },
          { label: "MANUTENÇÃO", text: "Davi para TI: BAT não verificado com MAN-####." },
          { label: "IMPLANTAÇÃO", text: "Davi para TI: EXE sem alertas ou MSI verificado com DEP-####." },
        ],
      },
      {
        template: "flow",
        leftTitle: "OUTRAS OPERAÇÕES",
        rightTitle: "SERVIÇOS",
        left: [
          { label: "FINANCEIRO", text: "Elisa ou Tomás: XLSX sem macros, FIN-####, para RH/Jurídico." },
          { label: "JURÍDICO", text: "Dário: PDF sem script ou DOCX sem macros, JUR-####." },
          { label: "COMUNICADO", text: "Funcionários podem enviar texto sem anexo a outros setores." },
        ],
        right: [
          { label: "ARQUIVOS", text: "ZIP com ARQ-#### para o setor indicado." },
          { label: "ACESSO", text: "Link direto ou cor.re para /conta/atividade." },
          { label: "SUPORTE", text: "Link /chamados/acompanhar com SUP-####." },
        ],
      },
      {
        template: "partner",
        leftTitle: "AURORA CONTÁBIL",
        rightTitle: "AUTORIZAÇÕES",
        partner: {
          base: "aurora-contabil.nac",
          services: ["portal.aurora-contabil.nac"],
          roles: ["Auditora", "Analista Fiscal", "Suporte Técnico"],
          sectors: ["Financeiro", "TI"],
          protocol: "AUD-#### (auditoria)",
          rules: [
            "Auditora: XLSX para Financeiro com AUD-####.",
            "Analista Fiscal: XLSX, PDF, DOCX ou texto para Financeiro.",
            "Suporte Técnico: link /suporte/chamado para TI.",
            "Siga o boletim para suspensões ou campanhas.",
          ],
          denied: ["EXE", "MSI", "BAT"],
        },
      },
    ],
  },
  {
    id: "files",
    tab: "FILES",
    accent: 0x596b73,
    pages: [
      {
        template: "rules",
        leftTitle: "DOCUMENTOS",
        rightTitle: "PROGRAMAS E LINKS",
        left: [
          "PDF com script não autorizado deve ser recusado.",
          "DOCX e XLSX comuns: julgue o pedido e o remetente.",
          "ZIP: CONTEÚDO COMPACTADO exige contexto e protocolo.",
          "Scanner sem alerta não valida o pedido do e-mail.",
        ],
        right: [
          "EXE MALICIOSO e BAT MALICIOSO: recuse.",
          "EXE, BAT e MSI exigem operação de TI autorizada.",
          "MSI VERIFICADO confirma o publicador, não a finalidade.",
          "Links revelam o destino; confira domínio e caminho.",
        ],
      },
    ],
  },
  {
    id: "flow",
    tab: "FLOW",
    accent: 0x9c7d2e,
    pages: [
      {
        template: "flow",
        leftTitle: "DECISÃO",
        rightTitle: "DOCUMENTOS DO TURNO",
        left: [
          { label: "1 CONFERIR", text: "Compare o e-mail, o visto e o scanner." },
          { label: "2 CONSULTAR", text: "Veja a operação na NET e o boletim vigente." },
          { label: "3 CARIMBAR", text: "Aceite ou negue no visto antes de devolver." },
        ],
        right: [
          { label: "BOLETIM", text: "Altera permissões pelo prazo indicado." },
          { label: "VIGÊNCIA", text: "Confira se a mudança ainda vale." },
          { label: "MEMORANDO", text: "Registra uma decisão incorreta." },
        ],
      },
    ],
  },
];

const config = {
  type: Phaser.AUTO,
  parent: "game",
  width: WIDTH,
  height: HEIGHT,
  resolution: RENDER_RESOLUTION,
  backgroundColor: "#17130f",
  pixelArt: true,
  render: {
    antialias: false,
    pixelArt: true,
    roundPixels: true,
  },
  scale: {
    mode: Phaser.Scale.NONE,
  },
  scene: {
    preload,
    create,
    update,
  },
};

const game = new Phaser.Game(config);

function fitCanvasToViewport() {
  if (!game.canvas) return;

  const scaleX = window.innerWidth / WIDTH;
  const scaleY = window.innerHeight / HEIGHT;
  const scale = Math.min(scaleX, scaleY);

  game.canvas.style.width = `${Math.floor(WIDTH * scale)}px`;
  game.canvas.style.height = `${Math.floor(HEIGHT * scale)}px`;
}

window.addEventListener("resize", fitCanvasToViewport);
requestAnimationFrame(fitCanvasToViewport);

function preload() {
  Object.values(STAMP_STATION.layers).forEach((layer) => {
    this.load.image(layer.key, versionedAssetPath(layer.path));
  });
  this.load.image("exeAttachment", versionedAssetPath("assets/exe.png"));
  this.load.image("zipAttachment", versionedAssetPath("assets/zip.png"));
  this.load.image("docxAttachment", versionedAssetPath("assets/docx.png"));
  this.load.image("pdfAttachment", versionedAssetPath("assets/pdf.png"));
  this.load.image("xlsxAttachment", versionedAssetPath("assets/xlsx.png"));
  this.load.image("batAttachment", versionedAssetPath("assets/bat.png"));
  this.load.image("msiAttachment", versionedAssetPath("assets/msi.png"));
  this.load.image("emailSealLogo", versionedAssetPath("assets/logo.png"));
  this.load.image("envelopeClosed", versionedAssetPath("assets/envelope-fechado.png"));
  this.load.image("envelopeOpenTop", versionedAssetPath("assets/envelope-aberto-parte-alta.png"));
  this.load.image("envelopeOpenBottom", versionedAssetPath("assets/envelope-aberto-parte-baixa.png"));
}

function versionedAssetPath(path) {
  return `${path}?v=${ASSET_VERSION}`;
}

function create() {
  this.documents = [];
  this.tableDocuments = [];
  this.shiftBulletins = [];
  this.activeDocument = null;
  this.draggedDocument = null;
  this.stamp = null;
  this.isStamping = false;
  this.heldOffset = new Phaser.Math.Vector2();
  this.dragTarget = new Phaser.Math.Vector2(WIDTH / 2, HEIGHT / 2);
  this.isDraggingDocument = false;
  this.isScannerMode = false;
  this.scanReceipts = [];
  this.nextDocumentDepth = 20;
  this.stampSequence = 0;
  this.answeredEmailCount = 0;
  this.currentEnvelope = null;
  this.isSubmittingMail = false;
  this.awaitingBulletin = false;
  this.nextBulletinNumber = 1;
  this.correctAnswerCount = 0;
  this.incorrectAnswerCount = 0;
  this.gameOver = false;
  initializeGeneratedMailRuntime(this);

  drawDesk(this);
  drawInbox(this);
  drawRegulationBook(this);
  drawScanner(this);
  drawMemoTray(this);
  drawStampPad(this);
  createStamp(this);
  createScannerFocusOverlay(this);

  this.turnPresentationStarted = false;
  this.startTurnHandler = () => beginShiftPresentation(this);
  window.addEventListener("emailplease:start-turn", this.startTurnHandler);
  this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
    window.removeEventListener("emailplease:start-turn", this.startTurnHandler);
  });
  if (window.emailPleaseTurnRequested) {
    this.time.delayedCall(0, this.startTurnHandler);
  }

  if (this.input.keyboard) {
    this.scanKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.scanKeyDownHandler = () => setScannerMode(this, true);
    this.scanKeyUpHandler = () => setScannerMode(this, false);
    this.scanKey.on("down", this.scanKeyDownHandler);
    this.scanKey.on("up", this.scanKeyUpHandler);
    this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
      this.scanKey.off("down", this.scanKeyDownHandler);
      this.scanKey.off("up", this.scanKeyUpHandler);
    });
  }

  this.input.on("dragstart", (_pointer, object) => {
    if (!object.getData("draggableDocument")) return;
    if (this.draggedDocument?.getData("manualEnvelopeDrag")) return;
    if (this.isScannerMode) return;

    startDocumentDrag(this, object, _pointer);
  });

  this.input.on("drag", (pointer, object) => {
    if (!object.getData("draggableDocument")) return;
    if (this.draggedDocument?.getData("manualEnvelopeDrag") && object !== this.draggedDocument) return;

    updateDocumentDragTarget(this, object, pointer);
  });

  this.input.on("dragend", (_pointer, object) => {
    if (!object.getData("draggableDocument")) return;
    if (this.draggedDocument?.getData("manualEnvelopeDrag") && object !== this.draggedDocument) return;

    finishDocumentDrag(this, object, _pointer);
  });

  this.input.on("pointermove", (pointer) => {
    const pendingContentDrag = this.pendingEnvelopeContentDrag;
    if (pendingContentDrag) {
      const dragDistance = Phaser.Math.Distance.Between(
        pendingContentDrag.x,
        pendingContentDrag.y,
        pointer.x,
        pointer.y,
      );
      if (dragDistance >= 6) {
        this.pendingEnvelopeContentDrag = null;
        const document = startEnvelopeContentDrag(this, pendingContentDrag.envelope, pointer);
        if (document) updateDocumentDragTarget(this, document, pointer);
      }
      return;
    }

    const object = this.draggedDocument;
    if (!object?.getData("manualEnvelopeDrag")) return;

    updateDocumentDragTarget(this, object, pointer);
  });

  this.input.on("pointerdown", (pointer) => {
    const envelope = getEnvelopeAtPointer(this, pointer);
    if (!envelope) return;
    if (tryPullEnvelopeContent(this, envelope, pointer)) return;
    beginEnvelopePress(this, envelope, pointer);
  });

  this.input.on("pointerup", (pointer) => {
    if (this.pendingEnvelopeContentDrag) {
      this.pendingEnvelopeContentDrag = null;
      this.skipEnvelopeToggle = false;
      this.pendingEnvelopeClick = null;
      return;
    }

    const manualDocument = this.draggedDocument;
    if (manualDocument?.getData("manualEnvelopeDrag")) {
      finishDocumentDrag(this, manualDocument, pointer);
      this.skipEnvelopeToggle = false;
      this.pendingEnvelopeClick = null;
      return;
    }

    if (this.skipEnvelopeToggle) {
      this.pendingEnvelopeClick?.envelope?.setData("pressedEnvelope", false);
      this.skipEnvelopeToggle = false;
      this.pendingEnvelopeClick = null;
      return;
    }

    const pending = this.pendingEnvelopeClick;
    if (!pending) return;

    this.pendingEnvelopeClick = null;
    const envelope = pending.envelope;
    if (!envelope?.active || !envelope.getData("canOpen")) return;

    const pressDistance = Phaser.Math.Distance.Between(pending.x, pending.y, pointer.x, pointer.y);
    envelope.setData("pressedEnvelope", false);
    envelope.setData("wasDragged", false);
    if (pressDistance <= 8) {
      if (envelope.getData("isOpen")) {
        closeMailEnvelope(this, envelope, true);
      } else {
        openMailEnvelope(this, envelope, true);
      }
    }
  });
}

function update(_time, delta) {
  if (!this.draggedDocument) return;

  if (this.isDraggingDocument) {
    const friction = 1 - Math.pow(0.001, delta / 1000);
    this.draggedDocument.x = Math.round(
      Phaser.Math.Linear(this.draggedDocument.x, this.dragTarget.x, friction),
    );
    this.draggedDocument.y = Math.round(
      Phaser.Math.Linear(this.draggedDocument.y, this.dragTarget.y, friction),
    );
    syncUprightText(this.draggedDocument);
  }
}

function startDocumentDrag(scene, object, pointer, options = {}) {
  scene.isDraggingDocument = true;
  scene.draggedDocument = object;
  scene.activeDocument = object;
  object.setData("wasDragged", true);
  object.setData("manualEnvelopeDrag", options.manualEnvelopeDrag ?? false);
  object.setDepth(++scene.nextDocumentDepth);
  scene.tweens.killTweensOf(object);
  if (object.name === "mailEnvelope" && object.getData("storedInInbox")) {
    object.setData("storedInInbox", false);
    object.setData("readyForDelivery", false);
    object.setData("canOpen", true);
    scene.inboxIndicator?.setFillStyle(0x4c554c, 1);
    setDeliveryButtonEnabled(scene, false);
    updateMailFlowStatus(scene);
    scene.tweens.add({
      targets: object,
      scaleX: 1,
      scaleY: 1,
      duration: 210,
      ease: "Cubic.Out",
      onUpdate: () => syncUprightText(object),
    });
  }
  scene.heldOffset.set(object.x - pointer.x, object.y - pointer.y);
  scene.dragTarget.set(object.x, object.y);
  object.bodyShadow?.setAlpha(object.shadowDragAlpha ?? 0.45);
  if (object.shadowDragPosition) {
    object.bodyShadow?.setPosition(object.shadowDragPosition.x, object.shadowDragPosition.y);
  } else {
    object.bodyShadow?.setPosition(8, 10);
  }
  object.cursorPulse?.setVisible(true);
}

function updateDocumentDragTarget(scene, object, pointer) {
  const pointerSpeedX = pointer.velocity?.x ?? 0;
  scene.dragTarget.set(pointer.x + scene.heldOffset.x, pointer.y + scene.heldOffset.y);
  if (object.getData("lockRotation")) {
    object.rotation = 0;
  } else {
    object.rotation = Phaser.Math.Angle.RotateTo(
      object.rotation,
      Phaser.Math.Clamp(pointerSpeedX * 0.00045, -0.08, 0.08),
      0.03,
    );
  }
  syncUprightText(object);
}

function finishDocumentDrag(scene, object, pointer = null) {
  scene.isDraggingDocument = false;
  scene.draggedDocument = null;
  object.setData("manualEnvelopeDrag", false);
  object.cursorPulse?.setVisible(false);
  object.bodyShadow?.setAlpha(0);
  if (object.shadowHomePosition) {
    object.bodyShadow?.setPosition(object.shadowHomePosition.x, object.shadowHomePosition.y);
  } else {
    object.bodyShadow?.setPosition(5, 7);
  }

  const sourceEnvelope = object.getData("sourceEnvelope");
  if (sourceEnvelope?.active) sourceEnvelope.setData("isPullingContent", false);
  if (object.name === "mailEnvelope" && isEnvelopeOverInbox(object, pointer)) {
    if (tryDockEnvelopeForDelivery(scene, object)) return;
    rejectEnvelopeFromInbox(scene, object);
    return;
  }
  const returnEnvelope = getEnvelopeReturnTarget(scene, object, pointer);
  if (returnEnvelope && returnDocumentToEnvelope(scene, returnEnvelope, object)) {
    return;
  }
  object.setData("sourceEnvelope", null);
  settleDocument(scene, object);
}

function drawDesk(scene) {
  scene.add.rectangle(320, 192, 640, 336, 0x342218).setOrigin(0.5);
  scene.add.rectangle(320, 356, 640, 8, 0x151412).setOrigin(0.5);
  scene.add.rectangle(320, 78, 640, 42, 0x25231d).setOrigin(0.5);
  scene.add.rectangle(320, 58, 640, 8, 0x0d0f0d).setOrigin(0.5);

  addPixelLine(scene, 0, 100, 640, 100, 0x5f4a36);
  addPixelLine(scene, 0, 352, 640, 352, 0x0b0c0a);
  addPixelLine(scene, 0, 250, 640, 250, 0x241912);

  for (let x = 0; x < WIDTH; x += 32) {
    scene.add.rectangle(x + 1, 100, 2, 252, 0x2a1d16).setOrigin(0, 0);
  }

  for (let x = 18; x < WIDTH; x += 64) {
    scene.add.rectangle(x, 132, 28, 3, 0x473020, 0.42).setOrigin(0, 0);
    scene.add.rectangle(x + 30, 318, 20, 2, 0x140f0c, 0.4).setOrigin(0, 0);
  }

  scene.add
    .text(18, 94, "POSTO DE TRIAGEM // CORREIO CORPORATIVO", {
      fontFamily: FONT_UI,
      fontSize: "8px",
      color: "#b8ad88",
    })
    .setOrigin(0, 0.5);
}

function drawInbox(scene) {
  const dock = fixedSpots.inbox;
  const graphics = scene.add.graphics();
  graphics.fillStyle(0x222722, 1);
  graphics.fillRect(dock.x, dock.y, dock.width, dock.height);
  graphics.fillStyle(0x141914, 1);
  graphics.fillRect(dock.x + 5, dock.y + 5, 52, 36);
  graphics.fillStyle(0x354139, 1);
  graphics.fillRect(dock.x + 8, dock.y + 8, 46, 30);
  graphics.fillStyle(0x111410, 1);
  graphics.fillRect(dock.x + 61, dock.y + 4, 86, 46);
  graphics.fillStyle(0x4f5d52, 1);
  graphics.fillRect(dock.x + 65, dock.y + 7, 78, 3);
  graphics.fillRect(dock.x + 65, dock.y + 44, 78, 3);
  graphics.lineStyle(2, 0x788779, 1);
  graphics.strokeRect(dock.x + 1, dock.y + 1, dock.width - 2, dock.height - 2);
  graphics.lineStyle(1, 0x59675c, 1);
  graphics.strokeRect(dock.x + 60, dock.y + 3, 88, 48);

  scene.inboxStatusText = scene.add
    .text(dock.x + 31, dock.y + 23, "SEM\nCORREIO", {
      fontFamily: FONT_TITLE,
      fontSize: "8px",
      color: "#89958a",
      align: "center",
      lineSpacing: 0,
    })
    .setOrigin(0.5);

  scene.inboxIndicator = scene.add
    .rectangle(dock.x + 31, dock.y + 47, 43, 3, 0x4c554c)
    .setOrigin(0.5);
  const frontLip = scene.add.container(0, 0);
  frontLip.add([
    scene.add.rectangle(dock.x + 104, dock.y + 52, 94, 6, 0x10120f).setOrigin(0.5),
    scene.add.rectangle(dock.x + 104, dock.y + 50, 86, 2, 0x7f8c7d).setOrigin(0.5),
  ]);
  frontLip.setDepth(5);
  scene.inboxFrontLip = frontLip;

  const button = scene.add.container(DELIVERY_BUTTON.x, DELIVERY_BUTTON.y).setDepth(12);
  const buttonShadow = scene.add.rectangle(2, 3, DELIVERY_BUTTON.width, DELIVERY_BUTTON.height, 0x090b09, 0.8);
  const buttonHousing = scene.add.rectangle(0, 0, DELIVERY_BUTTON.width, DELIVERY_BUTTON.height, 0x313731);
  buttonHousing.setStrokeStyle(2, 0x788779, 1);
  const buttonFace = scene.add.rectangle(0, -2, 48, 26, 0x555b51);
  buttonFace.setStrokeStyle(2, 0x282d28, 1);
  const buttonText = scene.add.text(0, -2, "ENVIAR", {
    fontFamily: FONT_UI,
    fontSize: "8px",
    color: "#8e968a",
  }).setOrigin(0.5);
  const buttonReadyLight = scene.add.rectangle(0, 17, 34, 3, 0x474d45);
  button.add([buttonShadow, buttonHousing, buttonFace, buttonText, buttonReadyLight]);
  button.setSize(DELIVERY_BUTTON.width, DELIVERY_BUTTON.height);
  button.setInteractive(
    new Phaser.Geom.Rectangle(0, 0, DELIVERY_BUTTON.width, DELIVERY_BUTTON.height),
    Phaser.Geom.Rectangle.Contains,
  );
  button.input.cursor = "pointer";
  button.on("pointerdown", (_pointer, _localX, _localY, event) => {
    event?.stopPropagation();
    animateDeliveryButtonPress(scene);
    if (!button.getData("enabled")) {
      flashDeliveryStatus(scene, "ENVELOPE\nPENDENTE", "#c9a47d");
      return;
    }
    submitMailEnvelope(scene);
  });
  scene.deliveryButton = button;
  scene.deliveryButtonFace = buttonFace;
  scene.deliveryButtonText = buttonText;
  scene.deliveryButtonReadyLight = buttonReadyLight;
  setDeliveryButtonEnabled(scene, false);
}

function setDeliveryButtonEnabled(scene, enabled) {
  const button = scene.deliveryButton;
  if (!button) return;

  button.setData("enabled", enabled);
  scene.deliveryButtonFace?.setFillStyle(enabled ? 0x8b9d6a : 0x555b51, 1);
  scene.deliveryButtonText?.setColor(enabled ? "#182018" : "#8e968a");
  scene.deliveryButtonReadyLight?.setFillStyle(enabled ? 0xa8cf78 : 0x474d45, 1);
}

function setDeliveryStatus(scene, text, color = "#b7c0b5") {
  const statusText = scene.inboxStatusText;
  if (!statusText) return;

  statusText.setFontSize("8px").setText(text).setColor(color);
  if (statusText.width > 46) statusText.setFontSize("7px");
}

function flashDeliveryStatus(scene, text, color = "#d5bd8d", duration = 950) {
  const token = (scene.deliveryStatusToken ?? 0) + 1;
  scene.deliveryStatusToken = token;
  setDeliveryStatus(scene, text, color);
  scene.time.delayedCall(duration, () => {
    if (scene.deliveryStatusToken !== token) return;
    updateMailFlowStatus(scene);
  });
}

function animateDeliveryButtonPress(scene) {
  const button = scene.deliveryButton;
  if (!button || scene.tweens.isTweening(button)) return;

  scene.tweens.add({
    targets: button,
    scaleX: 0.96,
    scaleY: 0.94,
    duration: 45,
    yoyo: true,
    ease: "Quad.Out",
  });
}

function updateMailFlowStatus(scene) {
  if (scene.gameOver) {
    setDeliveryStatus(scene, "FIM DE\nJOGO", "#d7a09a");
    return;
  }
  if (scene.isSubmittingMail) {
    setDeliveryStatus(scene, "ENVIANDO", "#a8cf78");
    return;
  }
  if (scene.awaitingBulletin) {
    setDeliveryStatus(scene, "NOVO\nBOLETIM", "#d7b07d");
    return;
  }

  const envelope = scene.currentEnvelope;
  if (!envelope?.active) {
    setDeliveryStatus(scene, "SEM\nCORREIO", "#89958a");
    return;
  }
  if (envelope.getData("readyForDelivery")) {
    const verdict = envelope.getData("responseVerdict");
    setDeliveryStatus(
      scene,
      verdict?.type === "approve" ? "ACEITO\nPRONTO" : "NEGADO\nPRONTO",
      verdict?.type === "approve" ? "#b9d48d" : "#d7a09a",
    );
    return;
  }
  if (envelope.getData("storedInInbox")) {
    setDeliveryStatus(scene, "NOVO\nEMAIL", "#b9d48d");
    return;
  }
  setDeliveryStatus(scene, "EM\nTRIAGEM", "#b7c0b5");
}

function drawRegulationBook(scene) {
  const layout = RULEBOOK_DESIGN;
  const book = scene.add.container(layout.x, layout.y);
  book.name = "regulationBook";
  book.setDepth(3);
  setupDraggableDocument(scene, book, layout.width, layout.height, new Phaser.Math.Vector2(0, 0));
  book.setData("stampable", false);
  book.setData("lockRotation", true);

  const shadow = createPaperShadow(scene, 8, 10, layout.width - 6, layout.height - 6);
  const art = scene.add.graphics();
  art.fillStyle(0x17140f, 1);
  art.fillRect(layout.coverX, layout.coverY, layout.width, layout.height);
  art.fillStyle(0x4a4335, 1);
  art.fillRect(layout.coverX + 3, layout.coverY + 3, layout.width - 6, layout.height - 6);
  art.fillStyle(0x6b624d, 1);
  art.fillRect(layout.coverX + 7, layout.coverY + 7, layout.width - 14, 3);
  art.fillStyle(0xd8ddb2, 1);
  art.fillRect(layout.leftPageX, layout.pageTop, layout.pageWidth, layout.pageHeight);
  art.fillStyle(0xe2e5bc, 1);
  art.fillRect(layout.rightPageX, layout.pageTop, layout.pageWidth, layout.pageHeight);
  art.fillStyle(0xaaaF88, 1);
  art.fillRect(-11, layout.pageTop, 22, layout.pageHeight);
  art.fillStyle(0x302c23, 1);
  art.fillRect(-3, layout.pageTop - 3, 6, layout.pageHeight + 6);
  art.lineStyle(2, 0x302c23, 1);
  art.strokeRect(layout.coverX, layout.coverY, layout.width, layout.height);
  art.lineStyle(1, 0x777b62, 0.8);
  art.strokeRect(layout.leftPageX, layout.pageTop, layout.pageWidth, layout.pageHeight);
  art.strokeRect(layout.rightPageX, layout.pageTop, layout.pageWidth, layout.pageHeight);
  art.fillStyle(0x4f4a3c, 1);
  art.fillRect(layout.leftPageX + 5, layout.pageTop - 1, 15, 32);
  art.fillStyle(0xd8ddb2, 1);
  art.fillTriangle(layout.leftPageX + 5, layout.pageTop + 31, layout.leftPageX + 12.5, layout.pageTop + 23, layout.leftPageX + 20, layout.pageTop + 31);

  art.fillStyle(0x8f9474, 0.22);
  [
    [-154, -96], [-132, -37], [-149, 58], [-73, 99], [-26, -87],
    [24, -98], [46, -25], [149, -61], [116, 91], [158, 35],
  ].forEach(([x, y]) => art.fillRect(x, y, 2, 1));

  const binding = scene.add.graphics();
  for (let y = -99; y <= 99; y += 14) {
    binding.fillStyle(0x39352b, 1);
    binding.fillRect(-18, y - 2, 36, 4);
    binding.fillStyle(0x85836c, 1);
    binding.fillRect(-8, y - 6, 16, 12);
    binding.fillStyle(0xd8ddb2, 1);
    binding.fillRect(-4, y - 3, 8, 6);
  }

  const tabSet = createRulebookTabs(scene, book);
  const pageLayer = scene.add.container(0, 0);
  const previousHit = scene.add
    .rectangle(-163, 99, 24, 22, 0x2b221a, 0.001)
    .setInteractive({ useHandCursor: true });
  const nextHit = scene.add
    .rectangle(163, 99, 24, 22, 0x2b221a, 0.001)
    .setInteractive({ useHandCursor: true });
  const previousLabel = scene.add.text(-163, 95, "<", {
    fontFamily: FONT_UI,
    fontSize: "8px",
    color: "#4f4a3c",
  }).setOrigin(0.5, 0);
  const nextLabel = scene.add.text(163, 95, ">", {
    fontFamily: FONT_UI,
    fontSize: "8px",
    color: "#4f4a3c",
  }).setOrigin(0.5, 0);
  const pulse = scene.add.rectangle(0, 0, layout.width, layout.height, 0xfff2a8, 0.08).setVisible(false);

  previousHit.on("pointerdown", (_pointer, _localX, _localY, event) => {
    event?.stopPropagation();
    setRulebookPage(scene, book, book.pageIndex - 1);
  });
  nextHit.on("pointerdown", (_pointer, _localX, _localY, event) => {
    event?.stopPropagation();
    setRulebookPage(scene, book, book.pageIndex + 1);
  });

  book.add([
    shadow,
    art,
    tabSet.rail,
    pageLayer,
    binding,
    ...tabSet.tabs.flatMap(({ tab, accent, label }) => [tab, accent, label]),
    previousHit,
    nextHit,
    previousLabel,
    nextLabel,
    pulse,
  ]);
  book.bodyShadow = shadow;
  book.cursorPulse = pulse;
  book.pageLayer = pageLayer;
  book.tabs = tabSet.tabs;
  book.previousHit = previousHit;
  book.nextHit = nextHit;
  book.previousLabel = previousLabel;
  book.nextLabel = nextLabel;
  book.sectionIndex = 0;
  book.pageIndex = 0;
  setPaperBounds(book, layout.coverX, layout.coverY, layout.width, layout.height);
  setUprightTexts(book, [previousLabel, nextLabel]);
  renderRulebook(book);
}

function createRulebookTabs(scene, book) {
  const layout = RULEBOOK_DESIGN;
  const rail = scene.add.graphics();
  rail.fillStyle(0x2d2a21, 1);
  rail.fillRect(170, -96, 16, 192);
  rail.fillStyle(0x625c49, 1);
  for (let y = -88; y <= 88; y += 12) rail.fillRect(174, y, 3, 3);

  const tabs = regulationBookSections.map((section, index) => {
    const x = layout.tabX;
    const y = layout.tabStartY + index * layout.tabSpacing;
    const tab = scene.add
      .rectangle(x, y, layout.tabWidth, layout.tabHeight, 0xb9bd93)
      .setStrokeStyle(2, 0x4f4a3c, 1)
      .setInteractive({ useHandCursor: true });
    const accent = scene.add.rectangle(x - 10, y, 3, layout.tabHeight - 6, section.accent, 1);
    const label = scene.add.text(x + 1, y, section.tab, {
      fontFamily: FONT_UI,
      fontSize: "8px",
      color: "#4f4a3c",
    }).setOrigin(0.5).setAngle(90);

    tab.on("pointerdown", (_pointer, _localX, _localY, event) => {
      event?.stopPropagation();
      setRulebookSection(scene, book, index);
    });
    return { tab, accent, label };
  });

  return { rail, tabs };
}

function setRulebookPage(scene, book, pageIndex) {
  const pages = regulationBookSections[book.sectionIndex].pages;
  const nextPage = Phaser.Math.Clamp(pageIndex, 0, pages.length - 1);
  if (nextPage === book.pageIndex) return;
  transitionRulebook(scene, book, () => {
    book.pageIndex = nextPage;
  }, Math.sign(nextPage - book.pageIndex));
}

function setRulebookSection(scene, book, sectionIndex) {
  const nextSection = Phaser.Math.Wrap(sectionIndex, 0, regulationBookSections.length);
  if (nextSection === book.sectionIndex && book.pageIndex === 0) return;
  transitionRulebook(scene, book, () => {
    book.sectionIndex = nextSection;
    book.pageIndex = 0;
  }, 0);
}

function transitionRulebook(scene, book, applyChange, direction) {
  scene.tweens.killTweensOf(book.pageLayer);
  book.pageLayer.setAlpha(0).setX(direction * 5);
  applyChange();
  renderRulebook(book);
  scene.tweens.add({
    targets: book.pageLayer,
    alpha: 1,
    x: 0,
    duration: 80,
    ease: "Cubic.Out",
  });
}

function renderRulebook(book) {
  const scene = book.scene;
  const layout = RULEBOOK_DESIGN;
  const section = regulationBookSections[book.sectionIndex];
  const page = section.pages[book.pageIndex];
  const layer = book.pageLayer;
  layer.removeAll(true);

  renderRulebookHeader(scene, layer, layout.leftCenterX, page.leftTitle, section.accent);
  renderRulebookHeader(scene, layer, layout.rightCenterX, page.rightTitle, section.accent);
  const left = createRulebookSide(scene, layer, layout.leftContentX, layout.contentTop);
  const right = createRulebookSide(scene, layer, layout.rightContentX, layout.contentTop);

  switch (page.template) {
    case "rules":
      renderRulebookRules(scene, left, page.left, section.accent);
      renderRulebookRules(scene, right, page.right, section.accent);
      break;
    case "net-index":
      renderRulebookNetIndex(book, left, right, page, section.accent);
      break;
    case "partner":
      renderRulebookPartner(scene, left, right, page.partner, section.accent);
      break;
    case "files":
      renderRulebookFileSide(scene, left, page.leftFile, section.accent);
      renderRulebookFileSide(scene, right, page.rightFile, section.accent);
      break;
    case "flow":
      renderRulebookFlowSide(scene, left, page.left, section.accent);
      renderRulebookFlowSide(scene, right, page.right, section.accent);
      break;
    default:
      renderRulebookRules(scene, left, page.left ?? [], section.accent);
      renderRulebookRules(scene, right, page.right ?? [], section.accent);
  }

  rulebookText(scene, layer, layout.leftContentX + 22, layout.footerY, section.tab, {
    color: rulebookColor(section.accent),
    fontFamily: FONT_UI,
  });
  rulebookText(scene, layer, layout.rightContentX + layout.contentWidth - 22, layout.footerY, `${book.pageIndex + 1}/${section.pages.length}`, {
    color: rulebookColor(section.accent),
    fontFamily: FONT_UI,
    originX: 1,
  });

  book.tabs.forEach(({ tab, accent, label }, index) => {
    const active = index === book.sectionIndex;
    tab.setFillStyle(active ? 0xe2e5bc : 0xb9bd93, 1);
    tab.setStrokeStyle(2, active ? section.accent : 0x4f4a3c, 1);
    accent.setAlpha(active ? 1 : 0.42);
    label.setColor(active ? "#2d2a21" : ADMIN_MUTED_INK);
  });

  const canGoBack = book.pageIndex > 0;
  const canGoForward = book.pageIndex < section.pages.length - 1;
  book.previousHit.input.enabled = canGoBack;
  book.nextHit.input.enabled = canGoForward;
  book.previousLabel.setAlpha(canGoBack ? 1 : 0.16);
  book.nextLabel.setAlpha(canGoForward ? 1 : 0.16);
}

function renderRulebookHeader(scene, layer, centerX, title, accent) {
  rulebookText(scene, layer, centerX, -104, title, {
    width: RULEBOOK_DESIGN.contentWidth,
    color: rulebookColor(accent),
    fontFamily: FONT_UI,
    align: "center",
    originX: 0.5,
  });
  rulebookRect(scene, layer, centerX - 70, -88, 140, 2, accent, 0.72);
  rulebookRect(scene, layer, centerX - 70, -88, 18, 2, 0x302c23, 0.85);
}

function createRulebookSide(scene, layer, x, y) {
  const container = scene.add.container(x, y);
  layer.add(container);
  return {
    container,
    width: RULEBOOK_DESIGN.contentWidth,
    height: RULEBOOK_DESIGN.contentHeight,
  };
}

function rulebookText(scene, parent, x, y, text, options = {}) {
  const style = {
    fontFamily: options.fontFamily ?? FONT_READABLE,
    fontSize: "8px",
    color: options.color ?? "#343229",
    lineSpacing: options.lineSpacing ?? 0,
    align: options.align ?? "left",
  };
  if (options.width) style.wordWrap = { width: options.width, useAdvancedWrap: true };
  const object = scene.add.text(x, y, text, style);
  object.setOrigin(options.originX ?? 0, options.originY ?? 0);
  parent.add(object);
  return object;
}

function rulebookRect(scene, parent, x, y, width, height, color, alpha = 1) {
  const object = scene.add.rectangle(x, y, width, height, color, alpha).setOrigin(0, 0);
  parent.add(object);
  return object;
}

function fitRulebookTexts(texts, availableHeight, preferredSpacing, minimumSpacing = 0) {
  let spacing = preferredSpacing;
  let heights = texts.map((text) => Math.ceil(text.height));
  while (heights.reduce((sum, height) => sum + height, 0) > availableHeight && spacing > minimumSpacing) {
    spacing -= 1;
    texts.forEach((text) => text.setLineSpacing(spacing));
    heights = texts.map((text) => Math.ceil(text.height));
  }
  return heights;
}

function rulebookDistributedGap(availableHeight, heights, maximumGap = 10) {
  if (heights.length < 2) return 0;
  const contentHeight = heights.reduce((sum, height) => sum + height, 0);
  return Math.max(0, Math.min(maximumGap, Math.floor((availableHeight - contentHeight) / (heights.length - 1))));
}

function renderRulebookRules(scene, side, rules, accent, availableHeight = side.height) {
  const blocks = rules.slice(0, 4).map((rule, index) => {
    const text = rulebookText(scene, side.container, 17, 0, rule, {
      width: side.width - 17,
      lineSpacing: REGULATION_BOOK_BODY_LINE_SPACING,
    });
    return { index, text };
  });
  const heights = fitRulebookTexts(
    blocks.map(({ text }) => text),
    availableHeight - Math.max(0, blocks.length - 1) * 3,
    REGULATION_BOOK_BODY_LINE_SPACING,
    REGULATION_BOOK_COMPACT_LINE_SPACING,
  ).map((height) => Math.max(10, height));
  const gap = rulebookDistributedGap(availableHeight, heights, 10);
  let y = 0;

  blocks.forEach(({ index, text }, blockIndex) => {
    text.setY(y);
    rulebookRect(scene, side.container, 0, y + 1, 11, 11, accent, 0.88);
    rulebookText(scene, side.container, 3, y + 2, String(index + 1), {
      color: "#f2f0d1",
      fontFamily: FONT_UI,
    });
    if (blockIndex < blocks.length - 1 && gap >= 5) {
      rulebookRect(scene, side.container, 17, y + heights[blockIndex] + Math.floor(gap / 2), side.width - 17, 1, accent, 0.18);
    }
    y += heights[blockIndex] + gap;
  });
}

function renderRulebookNetIndex(book, left, right, page, accent) {
  if (page.left.some((entry) => typeof entry === "string" && entry.includes("\n"))) {
    renderRulebookInternal(book.scene, left, page.left, accent);
  } else {
    renderRulebookDirectory(book, left, page.left, accent);
  }

  if (typeof page.right[0] === "object") {
    renderRulebookDirectory(book, right, page.right, accent);
  } else {
    renderRulebookRules(book.scene, right, page.right, accent);
  }
}

function renderRulebookInternal(scene, side, entries, accent) {
  entries.slice(0, 4).forEach((entry, index) => {
    const [domain, purpose] = entry.split("\n");
    const y = index * 26;
    rulebookRect(scene, side.container, 0, y + 1, 4, 20, accent, 0.72);
    rulebookText(scene, side.container, 9, y, domain, { width: side.width - 9 });
    rulebookText(scene, side.container, 9, y + 11, purpose.toUpperCase(), {
      width: side.width - 9,
      color: rulebookColor(accent),
      fontFamily: FONT_UI,
    });
  });

  rulebookRect(scene, side.container, 0, 110, 4, 43, accent, 0.72);
  rulebookText(scene, side.container, 9, 110, "ENCURTADOR", {
    color: rulebookColor(accent),
    fontFamily: FONT_UI,
  });
  rulebookText(scene, side.container, 9, 122, entries[4]?.replace("\n", " ") ?? "", {
    width: side.width - 9,
    lineSpacing: REGULATION_BOOK_COMPACT_LINE_SPACING,
  });
}

function renderRulebookDirectory(book, side, entries, accent) {
  const scene = book.scene;
  const rowHeight = 32;
  entries.slice(0, 5).forEach((entry, index) => {
    const y = index * rowHeight;
    const hit = rulebookRect(scene, side.container, 0, y, side.width, rowHeight - 2, accent, 0.001)
      .setInteractive({ useHandCursor: true });
    const markerBar = rulebookRect(scene, side.container, 0, y + 4, 4, rowHeight - 10, accent, 0.62);
    const name = rulebookText(scene, side.container, 9, y, entry.text.toUpperCase(), {
      width: side.width - 27,
      lineSpacing: REGULATION_BOOK_COMPACT_LINE_SPACING,
    });
    name.setY(Math.round(y + (rowHeight - 2 - name.height) / 2));
    const arrow = rulebookText(scene, side.container, side.width - 5, y, ">", {
      color: rulebookColor(accent),
      fontFamily: FONT_UI,
      originX: 1,
    });
    arrow.setY(Math.round(y + (rowHeight - 2 - arrow.height) / 2));
    rulebookRect(scene, side.container, 9, y + rowHeight - 2, side.width - 9, 1, accent, 0.18);

    hit.on("pointerdown", (_pointer, _localX, _localY, event) => {
      event?.stopPropagation();
      setRulebookPage(scene, book, entry.targetPage);
    });
    hit.on("pointerover", () => {
      hit.setFillStyle(accent, 0.12);
      markerBar.setAlpha(1);
      arrow.setX(side.width - 2);
    });
    hit.on("pointerout", () => {
      hit.setFillStyle(accent, 0.001);
      markerBar.setAlpha(0.62);
      arrow.setX(side.width - 5);
    });
  });
}

function renderRulebookPartner(scene, left, right, partner, accent) {
  renderRulebookIdentity(scene, left, partner, accent);
  renderRulebookPartnerRules(scene, right, partner, accent);
}

function renderRulebookIdentity(scene, side, partner, accent) {
  const fields = [
    { label: "DOMÍNIO", value: partner.base },
    { label: "SERVIÇOS", value: partner.services.join("\n") },
    { label: "CARGOS", value: partner.roles.join("\n") },
    { label: "DESTINO", value: partner.sectors.join(", ") },
    { label: "PROTOCOLO", value: partner.protocol },
  ];
  const groups = fields.map((field) => {
    const label = rulebookText(scene, side.container, 0, 0, field.label, {
      color: rulebookColor(accent),
      fontFamily: FONT_UI,
    });
    const value = rulebookText(scene, side.container, 8, 0, field.value, {
      width: side.width - 8,
      lineSpacing: REGULATION_BOOK_COMPACT_LINE_SPACING,
    });
    return { label, value };
  });
  const labelHeight = Math.max(...groups.map(({ label }) => Math.ceil(label.height)));
  const valueHeights = fitRulebookTexts(
    groups.map(({ value }) => value),
    side.height - groups.length * (labelHeight + 3) - Math.max(0, groups.length - 1) * 2,
    REGULATION_BOOK_COMPACT_LINE_SPACING,
  );
  const heights = valueHeights.map((height) => labelHeight + 3 + height);
  const gap = rulebookDistributedGap(side.height, heights, 8);
  let y = 0;

  groups.forEach(({ label, value }, index) => {
    label.setY(y);
    value.setY(y + labelHeight + 3);
    if (index < groups.length - 1 && gap >= 5) {
      rulebookRect(scene, side.container, 8, y + heights[index] + Math.floor(gap / 2), side.width - 8, 1, accent, 0.18);
    }
    y += heights[index] + gap;
  });
}

function renderRulebookPartnerRules(scene, side, partner, accent) {
  const deniedTop = side.height - 24;
  renderRulebookRules(scene, side, partner.rules, accent, deniedTop - 6);
  rulebookRect(scene, side.container, 0, deniedTop - 3, side.width, 1, accent, 0.35);
  rulebookText(scene, side.container, 0, deniedTop, "NÃO AUTORIZADOS", {
    color: rulebookColor(accent),
    fontFamily: FONT_UI,
  });
  partner.denied.slice(0, 4).forEach((extension, index) => {
    const x = index * 35;
    rulebookRect(scene, side.container, x, deniedTop + 12, 32, 11, 0x8f2f2a, 0.11)
      .setStrokeStyle(1, 0x8f2f2a, 0.52);
    rulebookText(scene, side.container, x + 16, deniedTop + 14, extension, {
      color: "#5e2f2a",
      fontFamily: FONT_UI,
      originX: 0.5,
    });
  });
}

function renderRulebookFileSide(scene, side, file, accent) {
  rulebookSprite(scene, side.container, 11, 12, file.visual, 20, 20);
  rulebookText(scene, side.container, 27, 1, "RESULTADOS", {
    color: rulebookColor(accent),
    fontFamily: FONT_UI,
  });
  rulebookText(scene, side.container, 27, 12, "DO SCANNER", {
    color: "#555a50",
    fontFamily: FONT_UI,
  });

  let outputY = 30;
  file.outcomes.forEach((outcome) => {
    const [label, ...valueParts] = outcome.split(":");
    const box = rulebookRect(scene, side.container, 0, outputY, side.width, 24, accent, 0.07)
      .setStrokeStyle(1, accent, 0.34);
    const resultLabel = rulebookText(scene, side.container, 6, outputY + 3, label, {
      color: rulebookColor(accent),
      fontFamily: FONT_UI,
    });
    const resultValue = rulebookText(scene, side.container, 6, outputY + 5 + resultLabel.height, valueParts.join(":").trim(), {
      width: side.width - 12,
      lineSpacing: REGULATION_BOOK_COMPACT_LINE_SPACING,
    });
    const boxHeight = Math.ceil(8 + resultLabel.height + resultValue.height);
    box.setDisplaySize(side.width, boxHeight);
    outputY += boxHeight + 3;
  });

  const interpretationY = outputY + 4;
  rulebookRect(scene, side.container, 0, interpretationY, side.width, 1, accent, 0.34);
  rulebookText(scene, side.container, 0, interpretationY + 5, "INTERPRETAÇÃO", {
    color: rulebookColor(accent),
    fontFamily: FONT_UI,
  });
  const noteTop = interpretationY + 17;
  const notes = file.notes.map((note) =>
    rulebookText(scene, side.container, 10, noteTop, note, {
      width: side.width - 10,
      lineSpacing: REGULATION_BOOK_BODY_LINE_SPACING,
    }),
  );
  const noteHeights = fitRulebookTexts(
    notes,
    side.height - noteTop - Math.max(0, notes.length - 1) * 4,
    REGULATION_BOOK_BODY_LINE_SPACING,
  );
  const gap = rulebookDistributedGap(side.height - noteTop, noteHeights, 8);
  let noteY = noteTop;
  notes.forEach((note, index) => {
    note.setY(noteY);
    rulebookRect(scene, side.container, 0, noteY + 3, 5, 5, accent, 0.68);
    noteY += noteHeights[index] + gap;
  });
}

function renderRulebookFlowSide(scene, side, entries, accent) {
  const blocks = entries.map((entry) => {
    const label = rulebookText(scene, side.container, 9, 0, entry.label, {
      width: side.width - 9,
      color: rulebookColor(accent),
      fontFamily: FONT_UI,
    });
    const text = rulebookText(scene, side.container, 9, 0, entry.text, {
      width: side.width - 9,
      lineSpacing: REGULATION_BOOK_COMPACT_LINE_SPACING,
    });
    return { label, text };
  });
  const labelHeight = Math.max(...blocks.map(({ label }) => Math.ceil(label.height)));
  const bodyHeights = fitRulebookTexts(
    blocks.map(({ text }) => text),
    side.height - blocks.length * (labelHeight + 3) - Math.max(0, blocks.length - 1) * 3,
    REGULATION_BOOK_COMPACT_LINE_SPACING,
  );
  const heights = bodyHeights.map((height) => labelHeight + 3 + height);
  const gap = rulebookDistributedGap(side.height, heights, 10);
  let y = 0;

  blocks.forEach(({ label, text }, index) => {
    label.setY(y);
    text.setY(y + labelHeight + 3);
    rulebookRect(scene, side.container, 0, y + 1, 4, Math.max(10, heights[index] - 2), accent, 0.72);
    y += heights[index] + gap;
  });
}

function rulebookSprite(scene, parent, x, y, visual, maxWidth, maxHeight) {
  const image = scene.add.image(x, y, visual.key);
  const fittedScale = Math.min(maxWidth / image.width, maxHeight / image.height, 1);
  image.setScale(Math.min(visual.scale ?? fittedScale, fittedScale));
  parent.add(image);
  return image;
}

function rulebookColor(color) {
  return `#${color.toString(16).padStart(6, "0")}`;
}


function createPaperShadow(scene, x, y, width, height) {
  return scene.add.rectangle(x, y, width, height, 0x050706, 1).setAlpha(0);
}

function createStampMark(scene, x, y, options = {}) {
  const fontSize = options.fontSize ?? 16;
  const width = options.width ?? 108;
  const height = options.height ?? 42;
  const textureKey = `stamp-mark-${stampMarkTextureId}`;
  stampMarkTextureId += 1;

  const texture = scene.textures.createCanvas(textureKey, width, height);
  texture.context.clearRect(0, 0, width, height);
  texture.refresh();

  const mark = scene.add.image(x, y, textureKey);
  mark.setOrigin(0.5);
  mark.canvasTexture = texture;
  mark.markWidth = width;
  mark.markHeight = height;
  mark.dotSize = options.dotSize ?? 3;
  mark.fontSize = fontSize;
  mark.lineSpacing = options.lineSpacing ?? -Math.max(3, Math.round(fontSize * 0.24));
  mark.stampOptions = {
    width,
    height,
    fontSize,
    dotSize: mark.dotSize,
    lineSpacing: mark.lineSpacing,
  };
  mark.setAngle(0);
  mark.setAlpha(0);
  mark.setVisible(false);
  return mark;
}

function createStampMarkFromTemplate(scene, template) {
  return createStampMark(scene, template.x, template.y, template.stampOptions);
}

function updateStampMark(mark, verdict) {
  const texture = mark.canvasTexture;
  const context = texture.context;
  const width = mark.markWidth;
  const height = mark.markHeight;
  const dotSize = mark.dotSize;
  const step = dotSize * 2;
  const fontSize = mark.fontSize;
  const lineHeight = Math.max(8, fontSize + mark.lineSpacing);
  const lines = verdict.text.split("\n");
  const textX = verdict.type === "reject" && width >= 96 ? width / 2 - 10 : width / 2;
  const firstLineY = height / 2 - ((lines.length - 1) * lineHeight) / 2;

  clearStampMarkCrop(mark);
  context.clearRect(0, 0, width, height);
  context.imageSmoothingEnabled = false;
  context.globalAlpha = 0.94;
  context.fillStyle = verdict.color;

  for (let x = 0; x < width; x += step) {
    context.fillRect(x, 0, dotSize, dotSize);
    context.fillRect(x + dotSize, height - dotSize, dotSize, dotSize);
  }

  for (let y = 0; y < height; y += step) {
    context.fillRect(0, y + dotSize, dotSize, dotSize);
    context.fillRect(width - dotSize, y, dotSize, dotSize);
  }

  if (verdict.type === "reject" && width >= 96) {
    const xCenter = width - 15;
    const xSize = Math.min(15, height * 0.3);
    context.strokeStyle = verdict.color;
    context.lineWidth = Math.max(3, dotSize);
    context.beginPath();
    context.moveTo(xCenter - xSize, height / 2 - xSize);
    context.lineTo(xCenter + xSize, height / 2 + xSize);
    context.moveTo(xCenter + xSize, height / 2 - xSize);
    context.lineTo(xCenter - xSize, height / 2 + xSize);
    context.stroke();
  }

  context.font = `${fontSize}px "BM Germar", "PixelPlay", monospace`;
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.fillStyle = verdict.color;
  lines.forEach((line, index) => {
    context.fillText(line, textX, firstLineY + index * lineHeight);
  });
  context.globalAlpha = 1;
  texture.refresh();
}

function clearStampMarkCrop(mark) {
  if (mark.resetCrop) {
    mark.resetCrop();
    return;
  }

  mark.setCrop();
}

function drawScanner(scene) {
  const scanner = scene.add.container(SCANNER_X, SCANNER_Y);
  scanner.setDepth(3);

  const shadow = scene.add.graphics();
  shadow.fillStyle(0x090a08, 0.45);
  shadow.fillRect(-61, -30, 132, 73);
  shadow.fillRect(-55, 43, 120, 4);

  const body = scene.add.graphics();
  body.fillStyle(0x29262a, 1);
  body.fillRect(-66, -31, 132, 66);
  body.fillRect(-60, -37, 120, 6);
  body.fillRect(-62, 35, 124, 4);
  body.fillStyle(0x77727b, 1);
  body.fillRect(-62, -28, 124, 59);
  body.fillRect(-56, -33, 112, 5);
  body.fillStyle(0xaaa5ad, 1);
  body.fillRect(-57, -30, 108, 3);
  body.fillRect(-59, -25, 3, 43);
  body.fillStyle(0x55515a, 1);
  body.fillRect(-59, 17, 118, 12);
  body.fillStyle(0x39363c, 1);
  body.fillRect(-58, 29, 116, 4);

  const panel = scene.add.graphics();
  panel.fillStyle(0x3a373d, 1);
  panel.fillRect(-52, -26, 88, 29);
  panel.fillStyle(0x918c95, 1);
  panel.fillRect(-49, -23, 82, 23);

  const glass = scene.add.rectangle(-8, -11, 70, 16, 0x252c28);
  const screenShade = scene.add.rectangle(-8, -18, 66, 2, 0x748077, 0.22);
  const beam = scene.add.rectangle(-40, -11, 2, 14, SCANNER_HIGHLIGHT_COLOR, 0);
  const screenText = scene.add.text(-8, -11, "", {
    fontFamily: FONT_UI,
    fontSize: "8px",
    color: "#10251b",
  });
  screenText.setOrigin(0.5);

  const controls = scene.add.graphics();
  controls.fillStyle(0x37343a, 1);
  controls.fillRect(40, -23, 15, 15);
  controls.fillRect(41, -3, 13, 9);
  controls.fillStyle(0xb8b3bb, 1);
  controls.fillRect(42, -21, 11, 11);
  controls.fillRect(43, -1, 9, 5);
  const statusLight = scene.add.rectangle(47, -16, 5, 5, 0x48423a);
  const button = scene.add.rectangle(47, 1, 5, 2, 0x49464d);

  const slot = scene.add.graphics();
  slot.fillStyle(0x29262a, 1);
  slot.fillRect(-53, 18, 106, 13);
  slot.fillStyle(0x111210, 1);
  slot.fillRect(-48, 20, 96, 7);
  slot.fillStyle(0x090a08, 1);
  slot.fillRect(-44, 22, 88, 5);

  const label = scene.add.text(-48, 7, "M.D.A // SCAN-04", {
    fontFamily: FONT_UI,
    fontSize: "7px",
    color: "#201d23",
  });
  label.setOrigin(0, 0.5);

  const rivets = scene.add.graphics();
  rivets.fillStyle(0xc4c0c7, 1);
  rivets.fillRect(-58, -24, 2, 2);
  rivets.fillRect(56, -24, 2, 2);
  rivets.fillStyle(0x403c43, 1);
  rivets.fillRect(-58, 26, 2, 2);
  rivets.fillRect(56, 26, 2, 2);

  scanner.add([
    shadow,
    body,
    panel,
    glass,
    screenShade,
    beam,
    screenText,
    controls,
    statusLight,
    button,
    slot,
    label,
    rivets,
  ]);

  const front = scene.add.container(SCANNER_X, SCANNER_Y).setDepth(SCANNER_FRONT_DEPTH);
  const frontLip = scene.add.graphics();
  frontLip.fillStyle(0x29262a, 1);
  frontLip.fillRect(-53, 27, 106, 8);
  frontLip.fillRect(-57, 35, 18, 5);
  frontLip.fillRect(39, 35, 18, 5);
  frontLip.fillStyle(0x8d8891, 1);
  frontLip.fillRect(-49, 27, 98, 5);
  frontLip.fillStyle(0xb8b3bb, 1);
  frontLip.fillRect(-47, 27, 94, 2);
  frontLip.fillStyle(0x4b4750, 1);
  frontLip.fillRect(-53, 32, 106, 3);
  front.add(frontLip);

  scene.scannerMachine = {
    container: scanner,
    front,
    glass,
    beam,
    slot,
    label,
    screenText,
    statusLight,
    isScanning: false,
    scanCycle: 0,
  };
}

function createScannerFocusOverlay(scene) {
  scene.scannerFocusOverlay = scene.add
    .rectangle(WIDTH / 2, HEIGHT / 2, WIDTH, HEIGHT, 0x050706, 1)
    .setDepth(SCANNER_FOCUS_DEPTH)
    .setAlpha(0)
    .setVisible(false);
}

function setScannerMode(scene, enabled) {
  if (enabled && scene.gameOver) return;
  if (scene.isScannerMode === enabled) return;

  scene.isScannerMode = enabled;
  updateScannerFocusOverlay(scene, enabled);
  updateScannerHighlights(scene);
  if (!scene.scannerMachine) return;

  if (!scene.scannerMachine.isScanning) {
    setScannerIdleVisual(scene.scannerMachine, enabled);
  }
}

function setScannerIdleVisual(machine, armed) {
  machine.beam.setX(-40).setAlpha(0);
  machine.glass.setFillStyle(0x252c28, 1);
  machine.screenText.setText("").setAlpha(0);
  machine.statusLight.setFillStyle(armed ? 0xa89956 : 0x48423a, 1);
}

function updateScannerFocusOverlay(scene, enabled) {
  const overlay = scene.scannerFocusOverlay;
  if (!overlay) return;

  scene.tweens.killTweensOf(overlay);
  if (enabled) {
    overlay.setVisible(true);
    scene.tweens.add({
      targets: overlay,
      alpha: SCANNER_FOCUS_ALPHA,
      duration: SCANNER_FOCUS_FADE_DURATION,
      ease: "Quad.InOut",
    });
    return;
  }

  scene.tweens.add({
    targets: overlay,
    alpha: 0,
    duration: SCANNER_FOCUS_FADE_DURATION,
    ease: "Quad.InOut",
    onComplete: () => overlay.setVisible(false),
  });
}

function setScannerResult(scene, document, lines) {
  document.setData("scannerResult", lines);
  document.setData("scannerSelected", false);
  document.scannerHighlight = createScannerHighlight(scene, document);
  document.add(document.scannerHighlight);
  updateScannerHighlightForDocument(scene, document);
  updateScannerFocusForDocument(scene, document);
}

function createScannerHighlight(scene, document) {
  const bounds = getPaperBounds(document);
  const highlight = scene.add.container(0, 0);
  const wash = scene.add.graphics();
  wash.fillStyle(SCANNER_HIGHLIGHT_COLOR, 0.1);
  wash.fillRect(bounds.x, bounds.y, bounds.width, bounds.height);

  const frame = scene.add.graphics();
  frame.lineStyle(2, SCANNER_HIGHLIGHT_COLOR, 0.9);
  frame.strokeRect(bounds.x + 1, bounds.y + 1, bounds.width - 2, bounds.height - 2);

  const corners = scene.add.graphics();
  drawScannerCorners(corners, bounds);

  const line = scene.add
    .rectangle(bounds.x + bounds.width / 2, bounds.y + 3, bounds.width - 4, 2, SCANNER_HIGHLIGHT_COLOR, 0.75)
    .setOrigin(0.5);
  highlight.add([wash, frame, corners, line]);
  highlight.wash = wash;
  highlight.frame = frame;
  highlight.corners = corners;
  highlight.scanLine = line;
  highlight.scanBounds = bounds;
  highlight.visualState = "hidden";
  highlight.setVisible(false);
  return highlight;
}

function drawScannerCorners(graphics, bounds) {
  const inset = 2;
  const left = bounds.x + inset;
  const right = bounds.x + bounds.width - inset;
  const top = bounds.y + inset;
  const bottom = bounds.y + bounds.height - inset;
  const length = Math.max(6, Math.min(12, Math.floor(Math.min(bounds.width, bounds.height) * 0.24)));

  graphics.lineStyle(3, 0x294d3d, 0.65);
  drawScannerCornerLines(graphics, left + 1, right + 1, top + 1, bottom + 1, length);
  graphics.lineStyle(2, SCANNER_HIGHLIGHT_COLOR, 1);
  drawScannerCornerLines(graphics, left, right, top, bottom, length);
}

function drawScannerCornerLines(graphics, left, right, top, bottom, length) {
  graphics.lineBetween(left, top, left + length, top);
  graphics.lineBetween(left, top, left, top + length);
  graphics.lineBetween(right, top, right - length, top);
  graphics.lineBetween(right, top, right, top + length);
  graphics.lineBetween(left, bottom, left + length, bottom);
  graphics.lineBetween(left, bottom, left, bottom - length);
  graphics.lineBetween(right, bottom, right - length, bottom);
  graphics.lineBetween(right, bottom, right, bottom - length);
}

function updateScannerHighlights(scene) {
  scene.tableDocuments?.forEach((document) => {
    updateScannerHighlightForDocument(scene, document);
    updateScannerFocusForDocument(scene, document);
  });
}

function updateScannerHighlightForDocument(scene, document) {
  if (!document.scannerHighlight) return;

  const visible = Boolean(scene.isScannerMode && document.getData("scannerResult") && document.active);
  const hover = Boolean(document.getData("scannerHover"));
  const selected = Boolean(document.getData("scannerSelected"));
  const state = !visible ? "hidden" : selected ? "selected" : hover ? "hover" : "active";
  const highlight = document.scannerHighlight;
  if (highlight.visualState === state) return;

  stopScannerHighlightTweens(scene, highlight);
  resetScannerHighlightVisual(highlight);
  highlight.visualState = state;

  if (state === "hidden") {
    document.setData("scannerSelected", false);
    highlight.setVisible(false);
    return;
  }

  highlight.setVisible(true).setAlpha(1);
  if (state === "active") {
    animateScannerHighlightActive(scene, highlight);
  } else if (state === "hover") {
    animateScannerHighlightHover(scene, highlight);
  } else {
    animateScannerHighlightSelected(scene, document, highlight);
  }
}

function stopScannerHighlightTweens(scene, highlight) {
  [highlight.wash, highlight.frame, highlight.corners, highlight.scanLine].forEach((target) => {
    if (target) scene.tweens.killTweensOf(target);
  });
}

function resetScannerHighlightVisual(highlight) {
  const bounds = highlight.scanBounds;
  highlight.wash.setAlpha(0);
  highlight.frame.setVisible(false).setAlpha(0);
  highlight.corners.setAlpha(1).setScale(1);
  highlight.scanLine.setAlpha(0).setY(bounds.y + 3).setScale(1);
}

function animateScannerHighlightActive(scene, highlight) {
  const bounds = highlight.scanBounds;
  highlight.wash.setAlpha(0.18);
  highlight.corners.setAlpha(0.5);
  highlight.scanLine.setAlpha(0.16);

  scene.tweens.add({
    targets: highlight.corners,
    alpha: 0.86,
    duration: 900,
    yoyo: true,
    repeat: -1,
    ease: "Sine.InOut",
  });
  scene.tweens.add({
    targets: highlight.scanLine,
    y: bounds.y + bounds.height - 3,
    alpha: 0.34,
    duration: 1600,
    yoyo: true,
    repeat: -1,
    ease: "Sine.InOut",
  });
}

function animateScannerHighlightHover(scene, highlight) {
  const bounds = highlight.scanBounds;
  highlight.wash.setAlpha(0.42);
  highlight.frame.setVisible(true).setAlpha(0.2);
  highlight.corners.setScale(1.08).setAlpha(1);
  highlight.scanLine.setAlpha(0.9);

  scene.tweens.add({
    targets: highlight.corners,
    scaleX: 1,
    scaleY: 1,
    duration: 150,
    ease: "Back.Out",
  });
  scene.tweens.add({
    targets: highlight.scanLine,
    y: bounds.y + bounds.height - 3,
    duration: 450,
    yoyo: true,
    repeat: -1,
    ease: "Sine.InOut",
  });
}

function animateScannerHighlightSelected(scene, document, highlight) {
  const bounds = highlight.scanBounds;
  highlight.wash.setAlpha(0.68);
  highlight.frame.setVisible(true).setAlpha(1);
  highlight.corners.setScale(1.1).setAlpha(1);
  highlight.scanLine.setAlpha(1).setScale(1, 2);

  scene.tweens.add({
    targets: highlight.corners,
    scaleX: 0.96,
    scaleY: 0.96,
    duration: 140,
    yoyo: true,
    repeat: 1,
    ease: "Quad.InOut",
  });
  scene.tweens.add({
    targets: highlight.scanLine,
    y: bounds.y + bounds.height - 3,
    duration: 200,
    ease: "Cubic.InOut",
  });
  scene.tweens.add({
    targets: highlight.frame,
    alpha: 0.15,
    duration: 110,
    yoyo: true,
    repeat: 2,
    ease: "Stepped",
    onComplete: () => {
      document.setData("scannerSelected", false);
      updateScannerHighlightForDocument(scene, document);
    },
  });
}

function updateScannerFocusForDocument(scene, document) {
  const shouldFocus = Boolean(scene.isScannerMode && document.getData("scannerResult") && document.active);
  const previousDepth = document.getData("scannerPreviousDepth");

  if (shouldFocus) {
    if (typeof previousDepth !== "number") {
      document.setData("scannerPreviousDepth", document.depth);
    }
    const baseDepth = typeof previousDepth === "number" ? previousDepth : document.depth;
    document.setDepth(SCANNER_FOCUS_DEPTH + 10 + baseDepth * 0.001);
    return;
  }

  if (typeof previousDepth === "number") {
    document.setDepth(previousDepth);
    document.setData("scannerPreviousDepth", null);
  }
}

function scanDocument(scene, document) {
  const lines = document.getData("scannerResult");
  if (!lines) return false;
  if (scene.scannerMachine?.isScanning) return true;

  animateScannedDocument(scene, document);
  animateScannerScan(scene, () => printScannerReceipt(scene, lines));
  return true;
}

function animateScannerScan(scene, onComplete) {
  const machine = scene.scannerMachine;
  if (!machine) {
    onComplete?.();
    return;
  }

  machine.isScanning = true;
  const scanCycle = ++machine.scanCycle;
  scene.tweens.killTweensOf(machine.beam);
  scene.tweens.killTweensOf(machine.glass);
  scene.tweens.killTweensOf(machine.statusLight);
  machine.glass.setFillStyle(0x8bc7a8, 1);
  machine.screenText.setText("LENDO").setAlpha(1);
  machine.statusLight.setFillStyle(0xa9dc78, 1);
  machine.beam.setAlpha(1);
  machine.beam.setX(-40);
  scene.tweens.add({
    targets: machine.beam,
    x: 24,
    duration: 110,
    repeat: 1,
    yoyo: true,
    ease: "Quad.InOut",
    onComplete: () => {
      machine.beam.setAlpha(0);
      machine.screenText.setText("OK");
      machine.glass.setFillStyle(0x9bd5b7, 1);
      onComplete?.();
      scene.time.delayedCall(170, () => {
        if (machine.scanCycle !== scanCycle) return;
        machine.isScanning = false;
        setScannerIdleVisual(machine, scene.isScannerMode);
      });
    },
  });
}

function animateScannedDocument(scene, document) {
  if (!document.scannerHighlight) return;

  document.setData("scannerSelected", true);
  document.scannerHighlight.visualState = "pending-selection";
  updateScannerHighlightForDocument(scene, document);
}

function printScannerReceipt(scene, lines) {
  const receipt = createScannerReceipt(scene, lines);
  scene.scanReceipts.push(receipt);
  scene.documents.push(receipt);
  scene.activeDocument = receipt;

  receipt.x = SCANNER_X;
  receipt.y = SCANNER_Y + 23;
  receipt.alpha = 0;
  receipt.scaleY = 0.16;
  receipt.setDepth(++scene.nextDocumentDepth);
  syncUprightText(receipt);

  scene.tweens.add({
    targets: receipt,
    alpha: 1,
    y: SCANNER_Y + 53,
    scaleY: 1,
    duration: 190,
    ease: "Cubic.Out",
    onUpdate: () => syncUprightText(receipt),
    onComplete: () => {
      scene.tweens.add({
        targets: receipt,
        y: SCANNER_RECEIPT_REST_Y,
        scaleX: 1.02,
        scaleY: 0.98,
        duration: 70,
        yoyo: true,
        ease: "Quad.Out",
        onUpdate: () => syncUprightText(receipt),
        onComplete: () => syncUprightText(receipt),
      });
    },
  });
}

function wrapScannerReceiptLine(line, maxLength = 17) {
  const parts = [];
  let remaining = String(line ?? "");
  while (remaining.length > maxLength) {
    let splitAt = -1;
    for (let index = maxLength; index >= Math.floor(maxLength * 0.55); index -= 1) {
      if ([".", "/", "-"].includes(remaining[index])) {
        splitAt = remaining[index] === "." || remaining[index] === "/" ? index : index + 1;
        break;
      }
    }
    if (splitAt < 1) splitAt = maxLength;
    parts.push(remaining.slice(0, splitAt));
    remaining = remaining.slice(splitAt);
  }
  if (remaining || !parts.length) parts.push(remaining);
  return parts;
}

function formatScannerReceiptLines(lines, maxLength = 17) {
  return lines.flatMap((line) => wrapScannerReceiptLine(line, maxLength));
}

function createScannerReceipt(scene, lines) {
  const isLinkReceipt = lines[0] === "LINK";
  const receiptWidth = isLinkReceipt ? 144 : SCANNER_RECEIPT_WIDTH;
  const formattedLines = formatScannerReceiptLines(lines, isLinkReceipt ? 26 : 17);
  const receiptHeight = Math.max(
    SCANNER_RECEIPT_HEIGHT,
    Math.min(82, 14 + formattedLines.length * 9),
  );
  const receipt = scene.add.container(0, 0);
  receipt.name = "scannerReceipt";
  setupDraggableDocument(
    scene,
    receipt,
    receiptWidth,
    receiptHeight,
    new Phaser.Math.Vector2(0, receiptHeight / 2 - 12),
  );
  receipt.setData("lockRotation", true);
  const shadow = createPaperShadow(scene, 4, 5, receiptWidth - 6, receiptHeight - 6);
  const paper = scene.add.rectangle(0, 0, receiptWidth - 6, receiptHeight - 6, 0xd6caa9);
  const text = scene.add.text(-receiptWidth / 2 + 8, -receiptHeight / 2 + 7, formattedLines.join("\n"), {
    fontFamily: FONT_READABLE,
    fontSize: "7px",
    color: ADMIN_INK,
    lineSpacing: 0,
  });
  const pulse = scene.add
    .rectangle(0, 0, receiptWidth, receiptHeight, 0xfff2a8, 0.08)
    .setVisible(false);
  const stampMark = createStampMark(scene, 0, receiptHeight / 2 - 12, {
    width: 70,
    height: 26,
    fontSize: 10,
    dotSize: 2,
  });

  receipt.add([shadow, paper, text, pulse, stampMark]);
  receipt.bodyShadow = shadow;
  receipt.cursorPulse = pulse;
  receipt.stampMark = stampMark;
  setPaperBounds(receipt, -receiptWidth / 2 + 3, -receiptHeight / 2 + 3,
    receiptWidth - 6, receiptHeight - 6);
  setUprightTexts(receipt, [text]);
  receipt.setAngle(0);
  return receipt;
}

function drawMemoTray(scene) {
  const memo = scene.add.container(320, 287);
  memo.name = "protocolMemo";
  memo.setDepth(2);
  memo.setVisible(false);
  setupDraggableDocument(scene, memo, 178, 46, new Phaser.Math.Vector2(52, 9));
  memo.setData("lockRotation", true);

  const shadow = createPaperShadow(scene, 5, 7, 174, 42);
  const paper = scene.add.rectangle(0, 0, 174, 42, 0xc8b98e);
  const stripe = scene.add.rectangle(0, -14, 164, 6, 0x7b2e2a);
  const title = scene.add.text(-76, -9, "M.D.A. // MEMORANDO", {
    fontFamily: FONT_TITLE,
    fontSize: "8px",
    color: "#2b221a",
  });
  const copy = scene.add.text(-76, 5, "PROTOCOLO QUEBRADO", {
    fontFamily: FONT_DOCUMENT,
    fontSize: DOCUMENT_BODY_FONT_SIZE,
    color: "#5b2420",
    wordWrap: { width: 152, useAdvancedWrap: true },
  });
  const pulse = scene.add.rectangle(0, 0, 178, 46, 0xfff2a8, 0.08).setVisible(false);
  const stampMark = createStampMark(scene, 52, 9, {
    width: 92,
    height: 30,
    fontSize: 12,
    dotSize: 3,
  });

  memo.add([shadow, paper, stripe, title, copy, pulse, stampMark]);
  memo.bodyShadow = shadow;
  memo.cursorPulse = pulse;
  memo.stampMark = stampMark;
  memo.messageText = copy;
  setPaperBounds(memo, -87, -21, 174, 42);
  setUprightTexts(memo, [title, copy]);
  memo.setAngle(0);
  scene.protocolMemo = memo;
  syncUprightText(memo);
}

function showProtocolMemo(scene, message = "PROTOCOLO QUEBRADO") {
  const memo = scene.protocolMemo;
  if (!memo) return;

  memo.messageText.setFontSize(DOCUMENT_BODY_FONT_SIZE).setText(message);
  if (memo.messageText.height > 18) memo.messageText.setFontSize("7px");
  memo.setVisible(true).setAlpha(0).setScale(0.72);
  memo.setDepth(++scene.nextDocumentDepth);
  scene.tweens.add({
    targets: memo,
    alpha: 1,
    scaleX: 1,
    scaleY: 1,
    duration: 140,
    ease: "Back.Out",
    onUpdate: () => syncUprightText(memo),
  });
}

function normalizeShiftBulletinData(generatedBulletin, number) {
  if (!generatedBulletin) {
    return {
      ...SHIFT_BULLETIN_PREVIEW,
      number: String(number).padStart(2, "0"),
    };
  }

  return {
    number: String(number).padStart(2, "0"),
    title: "ALTERACOES DE TRIAGEM",
    changes: generatedBulletin.changes.map((change) => ({
      duration: change.duration,
      sectionTitle: change.duration === "RUN" ? "ALTERACAO PERMANENTE" : "ORDEM TEMPORARIA",
      title: change.title,
      lines: change.lines,
      validity: `VIGENCIA: ${change.validity}`,
    })),
  };
}

function createShiftBulletin(
  scene,
  generatedBulletin = null,
  number = scene.nextBulletinNumber,
) {
  const bulletinData = normalizeShiftBulletinData(generatedBulletin, number);
  const changes = [
    ...bulletinData.changes.filter((change) => change.duration === "RUN"),
    ...bulletinData.changes.filter((change) => change.duration === "TURN"),
  ].slice(0, 2);
  const bulletin = scene.add.container(SHIFT_BULLETIN.targetX, SHIFT_BULLETIN.targetY);
  bulletin.name = "shiftBulletin";
  bulletin.setDepth(2);
  bulletin.setVisible(false);
  setupDraggableDocument(
    scene,
    bulletin,
    SHIFT_BULLETIN.foldedWidth,
    SHIFT_BULLETIN.foldedHeight,
    new Phaser.Math.Vector2(0, 42),
  );
  bulletin.setData("lockRotation", true);
  bulletin.setData("stampable", false);
  bulletin.setData("isOpen", false);
  bulletin.setData("isAnimating", false);
  bulletin.setData("hasArrived", false);
  bulletin.setData("hasBeenRead", false);
  bulletin.setData("releasedNextMail", false);

  const shadow = createPaperShadow(
    scene,
    5,
    7,
    SHIFT_BULLETIN.foldedWidth - 4,
    SHIFT_BULLETIN.foldedHeight - 4,
  );

  const foldedLayer = scene.add.container(0, 0);
  const foldedPaper = scene.add.graphics();
  foldedPaper.fillStyle(0x2b221a, 1);
  foldedPaper.fillRect(-89, -23, 178, 46);
  foldedPaper.fillStyle(0xc8b98e, 1);
  foldedPaper.fillRect(-87, -21, 174, 42);
  foldedPaper.fillStyle(0x7b2e2a, 1);
  foldedPaper.fillRect(-82, -16, 164, 6);
  foldedPaper.fillStyle(0xe0d3ab, 1);
  foldedPaper.fillRect(-82, -16, 164, 2);
  const foldedTitle = scene.add.text(-76, -8, `BOLETIM ${bulletinData.number}`, {
    fontFamily: FONT_TITLE,
    fontSize: "8px",
    color: "#2b221a",
  });
  const foldedCopy = scene.add.text(-76, 6, bulletinData.title, {
    fontFamily: FONT_READABLE,
    fontSize: DOCUMENT_BODY_FONT_SIZE,
    color: "#5b2420",
  });
  const foldedArrow = scene.add.graphics();
  foldedArrow.fillStyle(0x4b4032, 1);
  foldedArrow.fillTriangle(64, -2, 76, -2, 70, 5);
  foldedLayer.add([foldedPaper, foldedTitle, foldedCopy, foldedArrow]);

  const openLayer = scene.add.container(0, 0).setVisible(false);
  const openPaper = scene.add.graphics();
  const openTitle = scene.add.text(-88, 0, "BOLETIM DE TRIAGEM", {
    fontFamily: FONT_TITLE,
    fontSize: "8px",
    color: "#2b221a",
  });
  const turnNumber = scene.add.text(72, 0, bulletinData.number, {
    fontFamily: FONT_UI,
    fontSize: "8px",
    color: "#5b2420",
  }).setOrigin(1, 0);
  const operation = scene.add.text(-88, 0, bulletinData.title, {
    fontFamily: FONT_READABLE,
    fontSize: DOCUMENT_BODY_FONT_SIZE,
    color: ADMIN_MUTED_INK,
    wordWrap: { width: 176, useAdvancedWrap: true },
  });
  const blocks = changes.map((change) => {
    const temporary = change.duration === "TURN";
    return {
      temporary,
      section: scene.add.text(-88, 0, change.sectionTitle, {
        fontFamily: FONT_UI,
        fontSize: "8px",
        color: temporary ? "#7b2e2a" : ADMIN_MUTED_INK,
        wordWrap: { width: 176, useAdvancedWrap: true },
      }),
      title: scene.add.text(-80, 0, change.title, {
        fontFamily: FONT_UI,
        fontSize: "8px",
        color: temporary ? "#5b2420" : ADMIN_INK,
        wordWrap: { width: 164, useAdvancedWrap: true },
      }),
      body: scene.add.text(-80, 0, change.lines.join("\n"), {
        fontFamily: FONT_READABLE,
        fontSize: "7px",
        color: ADMIN_INK,
        lineSpacing: 2,
        wordWrap: { width: 164, useAdvancedWrap: true },
      }),
      validity: scene.add.text(-80, 0, change.validity, {
        fontFamily: FONT_UI,
        fontSize: "7px",
        color: temporary ? "#5b2420" : ADMIN_MUTED_INK,
        wordWrap: { width: 164, useAdvancedWrap: true },
      }),
    };
  });

  let cursor = 54;
  blocks.forEach((block, index) => {
    block.top = cursor;
    block.section.setY(cursor);
    cursor += block.section.height + 4;
    block.title.setY(cursor);
    cursor += block.title.height + 3;
    block.body.setY(cursor);
    cursor += block.body.height + 5;
    block.validity.setY(cursor);
    cursor += block.validity.height;
    block.bottom = cursor;
    if (index < blocks.length - 1) {
      block.dividerY = cursor + 7;
      cursor += 16;
    }
  });

  const openHeight = Math.max(blocks.length > 1 ? 188 : 136, cursor + 14);
  const top = -openHeight / 2;
  bulletin.setData("openHeight", openHeight);
  openTitle.setY(top + 17);
  turnNumber.setY(top + 17);
  operation.setY(top + 31);
  blocks.forEach((block) => {
    [block.section, block.title, block.body, block.validity].forEach((text) => {
      text.setY(text.y + top);
    });
  });

  openPaper.fillStyle(0x2b221a, 1);
  openPaper.fillRect(-101, top, 202, openHeight);
  openPaper.fillStyle(0xd9cca4, 1);
  openPaper.fillRect(-99, top + 2, 198, openHeight - 4);
  openPaper.fillStyle(0xe0d3ab, 1);
  openPaper.fillRect(-94, top + 7, 188, 3);
  openPaper.fillStyle(0x7b2e2a, 1);
  openPaper.fillRect(-94, top + 10, 188, 6);
  openPaper.fillStyle(0x9f936f, 0.8);
  openPaper.fillRect(-94, top + 46, 188, 2);
  blocks.forEach((block) => {
    openPaper.fillStyle(block.temporary ? 0x7b2e2a : 0x9d8f67, 1);
    openPaper.fillRect(-88, top + block.top + 12, 3, block.bottom - block.top - 12);
    if (block.dividerY) {
      openPaper.fillStyle(0x9f936f, 0.8);
      openPaper.fillRect(-94, top + block.dividerY, 188, 2);
    }
  });

  const openArrow = scene.add.graphics();
  openArrow.fillStyle(0x4b4032, 1);
  openArrow.fillTriangle(82, top + 25, 94, top + 25, 88, top + 18);
  const blockTexts = blocks.flatMap((block) => [
    block.section,
    block.title,
    block.body,
    block.validity,
  ]);
  openLayer.add([
    openPaper,
    openTitle,
    turnNumber,
    operation,
    ...blockTexts,
    openArrow,
  ]);

  const attentionPulse = scene.add
    .rectangle(0, -13, SHIFT_BULLETIN.foldedWidth - 14, 6, 0xffe19a, 1)
    .setAlpha(0);
  const dragPulse = scene.add
    .rectangle(0, 0, SHIFT_BULLETIN.foldedWidth, SHIFT_BULLETIN.foldedHeight, 0xfff2a8, 0.08)
    .setVisible(false);
  bulletin.add([shadow, foldedLayer, openLayer, attentionPulse, dragPulse]);
  bulletin.bodyShadow = shadow;
  bulletin.cursorPulse = dragPulse;
  bulletin.attentionPulse = attentionPulse;
  bulletin.foldedLayer = foldedLayer;
  bulletin.openLayer = openLayer;
  bulletin.dragPulse = dragPulse;
  setShiftBulletinGeometry(bulletin, false);
  setUprightTexts(bulletin, [
    foldedTitle,
    foldedCopy,
    openTitle,
    turnNumber,
    operation,
    ...blockTexts,
  ]);

  bulletin.on("pointerdown", (pointer) => {
    bulletin.setData("pressPoint", { x: pointer.x, y: pointer.y });
  });

  bulletin.on("pointerup", (pointer, _localX, _localY, event) => {
    const pressPoint = bulletin.getData("pressPoint");
    const pressDistance = pressPoint
      ? Phaser.Math.Distance.Between(pressPoint.x, pressPoint.y, pointer.x, pointer.y)
      : 0;
    const wasDragging =
      bulletin.getData("wasDragged") ||
      pressDistance > 6 ||
      scene.draggedDocument === bulletin ||
      (scene.isDraggingDocument && scene.activeDocument === bulletin);
    bulletin.setData("pressPoint", null);

    if (
      !bulletin.getData("hasArrived") ||
      bulletin.getData("isAnimating") ||
      wasDragging
    ) return;

    if (!bulletin.getData("isOpen")) {
      event?.stopPropagation();
      openShiftBulletin(scene, bulletin);
      return;
    }

    const localPoint = worldPointToDocumentLocal(bulletin, pointer);
    if (localPoint.x >= 76 && localPoint.y <= -bulletin.getData("openHeight") / 2 + 36) {
      event?.stopPropagation();
      closeShiftBulletin(scene, bulletin);
    }
  });

  scene.shiftBulletin = bulletin;
  scene.shiftBulletins.push(bulletin);
  return bulletin;
}

function setShiftBulletinGeometry(bulletin, isOpen) {
  const width = isOpen ? SHIFT_BULLETIN.openWidth : SHIFT_BULLETIN.foldedWidth;
  const height = isOpen ? bulletin.getData("openHeight") : SHIFT_BULLETIN.foldedHeight;
  bulletin.setSize(width, height);
  bulletin.setData("docWidth", width);
  bulletin.setData("docHeight", height);
  bulletin.input?.hitArea?.setTo(0, 0, width, height);
  bulletin.bodyShadow?.setSize(width - 4, height - 4);
  bulletin.dragPulse?.setSize(width, height);
  bulletin.input.cursor = isOpen ? "grab" : "pointer";
  setPaperBounds(bulletin, -width / 2 + 2, -height / 2 + 2, width - 4, height - 4);
}

function beginShiftPresentation(scene) {
  if (scene.turnPresentationStarted) return;

  scene.turnPresentationStarted = true;
  spawnMailDocuments(scene);
}

function presentShiftBulletin(scene, bulletin) {
  if (!bulletin?.active) return;

  bulletin.setVisible(true);
  bulletin.setAlpha(0);
  bulletin.setPosition(SHIFT_BULLETIN.startX, SHIFT_BULLETIN.startY);
  bulletin.setScale(0.34);
  bulletin.setAngle(-2);
  bulletin.setDepth(++scene.nextDocumentDepth);
  bulletin.input.enabled = false;

  scene.tweens.add({
    targets: bulletin,
    x: SHIFT_BULLETIN.targetX,
    y: SHIFT_BULLETIN.targetY + 7,
    alpha: 1,
    scaleX: 1.045,
    scaleY: 1.045,
    angle: 0,
    duration: 260,
    ease: "Cubic.Out",
    onUpdate: () => syncUprightText(bulletin),
    onComplete: () => {
      scene.tweens.add({
        targets: bulletin,
        y: SHIFT_BULLETIN.targetY - 3,
        scaleX: 0.99,
        scaleY: 0.99,
        duration: 55,
        ease: "Quad.Out",
        onComplete: () => {
          scene.tweens.add({
            targets: bulletin,
            y: SHIFT_BULLETIN.targetY,
            scaleX: 1,
            scaleY: 1,
            duration: 45,
            ease: "Back.Out",
            onComplete: () => {
              bulletin.setData("hasArrived", true);
              bulletin.input.enabled = true;
              scene.cameras.main.shake(55, 0.0015);
              startShiftBulletinPulse(scene, bulletin);
              syncUprightText(bulletin);
            },
          });
        },
      });
    },
  });
}

function startShiftBulletinPulse(scene, bulletin) {
  scene.tweens.killTweensOf(bulletin.attentionPulse);
  bulletin.attentionPulse.setVisible(true).setAlpha(0.02);
  scene.tweens.add({
    targets: bulletin.attentionPulse,
    alpha: 0.14,
    duration: 400,
    yoyo: true,
    repeat: -1,
    ease: "Sine.InOut",
  });
}

function stopShiftBulletinPulse(scene, bulletin) {
  scene.tweens.killTweensOf(bulletin.attentionPulse);
  bulletin.attentionPulse.setAlpha(0).setVisible(false);
}

function openShiftBulletin(scene, bulletin) {
  if (bulletin.getData("isOpen") || bulletin.getData("isAnimating")) return;

  bulletin.setData("isAnimating", true);
  bulletin.input.enabled = false;
  bulletin.setDepth(++scene.nextDocumentDepth);
  stopShiftBulletinPulse(scene, bulletin);
  setShiftBulletinGeometry(bulletin, true);
  bulletin.openLayer.setVisible(true).setAlpha(0).setScale(1, 0.28);
  const openHeight = bulletin.getData("openHeight");
  const openY = Phaser.Math.Clamp(
    bulletin.y,
    openHeight / 2 + 6,
    HEIGHT - openHeight / 2 - 6,
  );

  scene.tweens.add({
    targets: bulletin.foldedLayer,
    alpha: 0,
    scaleY: 0.65,
    duration: 40,
    ease: "Quad.In",
    onComplete: () => {
      bulletin.foldedLayer.setVisible(false).setScale(1).setAlpha(1);
      scene.tweens.add({
        targets: bulletin.openLayer,
        alpha: 1,
        scaleY: 1,
        duration: 115,
        ease: "Back.Out",
        onComplete: () => {
          bulletin.setData("isOpen", true);
          bulletin.setData("isAnimating", false);
          bulletin.input.enabled = true;
          markShiftBulletinRead(scene, bulletin);
          syncUprightText(bulletin);
        },
      });
      scene.tweens.add({
        targets: bulletin,
        y: openY,
        duration: 115,
        ease: "Quad.Out",
      });
    },
  });
}

function closeShiftBulletin(scene, bulletin) {
  if (!bulletin.getData("isOpen") || bulletin.getData("isAnimating")) return;

  bulletin.setData("isAnimating", true);
  bulletin.input.enabled = false;
  bulletin.foldedLayer.setVisible(true).setAlpha(0).setScale(1, 0.65);

  scene.tweens.add({
    targets: bulletin.openLayer,
    alpha: 0,
    scaleY: 0.28,
    duration: 80,
    ease: "Quad.In",
    onComplete: () => {
      bulletin.openLayer.setVisible(false).setScale(1).setAlpha(1);
      scene.tweens.add({
        targets: bulletin.foldedLayer,
        alpha: 1,
        scaleY: 1,
        duration: 75,
        ease: "Back.Out",
        onComplete: () => {
          bulletin.setData("isOpen", false);
          bulletin.setData("isAnimating", false);
          setShiftBulletinGeometry(bulletin, false);
          bulletin.input.enabled = true;
          syncUprightText(bulletin);
        },
      });
    },
  });
}

function markShiftBulletinRead(scene, bulletin) {
  if (bulletin.getData("hasBeenRead")) return;

  bulletin.setData("hasBeenRead", true);
  if (bulletin.getData("releasedNextMail")) return;

  bulletin.setData("releasedNextMail", true);
  scene.awaitingBulletin = false;
  updateMailFlowStatus(scene);
  scene.time.delayedCall(120, () => spawnMailDocuments(scene));
}

function drawStampPad(scene) {
  const shownX = STAMP_STATION.x;
  const hiddenX = stampStationHiddenX();
  const station = scene.add.container(hiddenX, STAMP_STATION.y);
  station.setDepth(1000);

  const back = scene.add.image(0, 0, STAMP_STATION.layers.back.key);
  const baseShadow = scene.add.image(0, 0, STAMP_STATION.layers.baseShadow.key);
  const red = scene.add.image(0, 0, STAMP_STATION.layers.red.key);
  const green = scene.add.image(0, 0, STAMP_STATION.layers.green.key);
  const baseFront = scene.add.image(0, 0, STAMP_STATION.layers.baseFront.key);
  [back, baseShadow, red, green, baseFront].forEach((layer) => {
    layer.setScale(STAMP_STATION.scale);
    layer.setOrigin(0.5);
    layer.setData("homeY", 0);
  });

  const revealHit = scene.add
    .rectangle(
      -STAMP_STATION.width * STAMP_STATION.scale * 0.5 + STAMP_STATION.visibleEdge * 0.5,
      0,
      STAMP_STATION.visibleEdge,
      STAMP_STATION.height * STAMP_STATION.scale,
      0xffffff,
      0.001,
    )
    .setInteractive({ useHandCursor: true });
  revealHit.on("pointerdown", (_pointer, _localX, _localY, event) => {
    event?.stopPropagation();
    toggleStampStation(scene);
  });

  station.add([back, baseShadow, red, green, baseFront, revealHit]);
  scene.stampStation = {
    container: station,
    baseShadow,
    baseFront,
    red,
    green,
    back,
    revealHit,
    shownX,
    hiddenX,
    currentX: hiddenX,
    isOpen: false,
    isAnimating: false,
  };
}

function createStamp(scene) {
  const stationX = scene.stampStation?.currentX ?? STAMP_STATION.x;
  const rejectPosition = stampStationPoint(STAMP_STATION.rejectCenter, stationX);
  const approvePosition = stampStationPoint(STAMP_STATION.approveCenter, stationX);
  const rejectStamp = createStampDevice(scene, rejectPosition.x, rejectPosition.y, {
    type: "reject",
    layer: scene.stampStation.red,
    sourcePoint: STAMP_STATION.rejectCenter,
  });
  const approveStamp = createStampDevice(scene, approvePosition.x, approvePosition.y, {
    type: "approve",
    layer: scene.stampStation.green,
    sourcePoint: STAMP_STATION.approveCenter,
  });

  scene.stamps = [rejectStamp, approveStamp];
  scene.stamp = approveStamp;
  setStampStationX(scene, stationX);
  return approveStamp;
}

function stampStationHiddenX() {
  return WIDTH + (STAMP_STATION.width * STAMP_STATION.scale) / 2 - STAMP_STATION.visibleEdge;
}

function stampStationOffset(sourcePoint) {
  return new Phaser.Math.Vector2(
    (sourcePoint.x - STAMP_STATION.width / 2) * STAMP_STATION.scale,
    (sourcePoint.y - STAMP_STATION.height / 2) * STAMP_STATION.scale,
  );
}

function stampStationPoint(sourcePoint, stationX = STAMP_STATION.x) {
  const offset = stampStationOffset(sourcePoint);
  return new Phaser.Math.Vector2(stationX + offset.x, STAMP_STATION.y + offset.y);
}

function createStampDevice(scene, x, y, style) {
  const stamp = scene.add.container(x, y);
  stamp.name = `${style.type}Stamp`;
  stamp.stationOffset = stampStationOffset(style.sourcePoint);
  stamp.home = new Phaser.Math.Vector2(x, y);
  stamp.strikePoint = new Phaser.Math.Vector2(x, y + STAMP_STATION.strikeYOffset);
  stamp.verdictType = style.type;
  stamp.layer = style.layer;
  stamp.setSize(88, 92);
  stamp.setDepth(1010);
  enableStampInput(stamp);

  const shadow = scene.add.rectangle(0, 0, 88, 92, 0xffffff, 0.001);
  stamp.add(shadow);
  stamp.shadow = shadow;

  stamp.on("pointerdown", () => stampActiveDocument(scene, stamp));
  stamp.on("pointerover", () => {
    if (!scene.isStamping && stamp.layer) setStampLayerHighlight(stamp.layer, true);
  });
  stamp.on("pointerout", () => {
    if (!scene.isStamping && stamp.layer) setStampLayerHighlight(stamp.layer, false);
  });

  return stamp;
}

function toggleStampStation(scene) {
  if (!scene.stampStation || scene.stampStation.isAnimating || scene.isStamping) return;

  const targetX = scene.stampStation.isOpen
    ? scene.stampStation.hiddenX
    : scene.stampStation.shownX;
  animateStampStationSlide(scene, targetX, !scene.stampStation.isOpen);
}

function animateStampStationSlide(scene, targetX, opening) {
  const station = scene.stampStation;
  if (!station) return;

  const direction = targetX < station.currentX ? -1 : 1;
  const state = { x: station.currentX };
  const steps = [
    { x: targetX + direction * 16, duration: opening ? 185 : 135, ease: "Cubic.Out" },
    { x: targetX - direction * 9, duration: 70, ease: "Quad.InOut" },
    { x: targetX + direction * 5, duration: 54, ease: "Quad.InOut" },
    { x: targetX - direction * 2, duration: 42, ease: "Quad.InOut" },
    { x: targetX, duration: 36, ease: "Quad.Out" },
  ];

  station.isAnimating = true;
  scene.tweens.killTweensOf(state);
  runStampStationSlideStep(scene, state, steps, 0, () => {
    setStampStationX(scene, targetX);
    station.isOpen = opening;
    station.isAnimating = false;
  });
}

function runStampStationSlideStep(scene, state, steps, index, onComplete) {
  const step = steps[index];
  if (!step) {
    onComplete?.();
    return;
  }

  scene.tweens.add({
    targets: state,
    x: step.x,
    duration: step.duration,
    ease: step.ease,
    onUpdate: () => setStampStationX(scene, state.x),
    onComplete: () => runStampStationSlideStep(scene, state, steps, index + 1, onComplete),
  });
}

function setStampStationX(scene, x) {
  const station = scene.stampStation;
  if (!station) return;

  station.currentX = x;
  station.container.setX(x);
  scene.stamps?.forEach((stamp) => {
    if (!stamp.stationOffset) return;
    const homeX = x + stamp.stationOffset.x;
    const homeY = STAMP_STATION.y + stamp.stationOffset.y;
    stamp.home.set(homeX, homeY);
    stamp.strikePoint.set(homeX, homeY + STAMP_STATION.strikeYOffset);
    if (!scene.isStamping) stamp.setPosition(homeX, homeY);
  });
}

function setStampLayerHighlight(layer, enabled) {
  layer.setAlpha(1);

  if (layer.preFX) {
    layer.preFX.clear();
    if (enabled) layer.preFX.addColorMatrix().brightness(1.16);
    return;
  }

  layer.clearTint();
  if (enabled) layer.setTint(0xfff2d6);
}

function initializeGeneratedMailRuntime(scene) {
  const generator = window.EmailPleaseGenerator;
  const adapter = window.EmailPleaseCaseAdapter;
  if (!generator || !adapter) {
    throw new Error("Email generator and game case adapter must be loaded before Phaser.");
  }

  const requestedSeed = new URLSearchParams(window.location.search).get("seed");
  scene.emailGenerator = generator;
  scene.emailCaseAdapter = adapter;
  scene.mailRunState = generator.createRunState({
    seed: requestedSeed || `game-${Date.now()}`,
  });
  scene.mailQueue = [];
  scene.currentGeneratedCase = null;
  scene.currentMailView = null;
  scene.currentGeneratedTurn = null;
  scene.pendingGeneratedBulletin = null;
  prepareGeneratedTurn(scene, true);
}

function prepareGeneratedTurn(scene, initialTurn = false) {
  const options = {
    runState: scene.mailRunState,
    emailCount: GENERATED_TURN_EMAIL_COUNT,
    requireBulletin: !initialTurn,
  };
  if (initialTurn) options.bulletinChangeIds = [];

  const turn = scene.emailGenerator.generateTurn(options);
  scene.mailRunState = turn.runState;
  scene.currentGeneratedTurn = turn;
  scene.pendingGeneratedBulletin = turn.bulletin;
  scene.mailQueue = turn.cases.slice();
  return turn;
}

function takeNextGeneratedMail(scene) {
  const generatedCase = scene.mailQueue.shift();
  if (!generatedCase) return null;

  scene.currentGeneratedCase = generatedCase;
  scene.currentMailView = scene.emailCaseAdapter.adaptGeneratedCase(generatedCase);
  return scene.currentMailView;
}

function spawnMailDocuments(scene) {
  if (scene.gameOver || scene.awaitingBulletin || scene.isSubmittingMail) return;

  const mailView = takeNextGeneratedMail(scene);
  if (!mailView) {
    updateMailFlowStatus(scene);
    return;
  }

  scene.documents.forEach((document) => document.destroy());
  scene.tableDocuments = scene.tableDocuments.filter((document) => document.active && document.scene);
  scene.documents = [];
  scene.scanReceipts = [];

  const envelope = createMailEnvelope(scene, mailView);
  scene.documents.push(envelope);
  scene.currentEnvelope = envelope;
  scene.activeDocument = envelope;
  setDeliveryButtonEnabled(scene, false);
  resetStamp(scene);
  animateEnvelopeToInbox(scene, envelope);
}

function spawnEnvelopeContents(scene, envelope) {
  if (!envelope.getData("contentQueue")) {
    const contentQueue = createEnvelopeContentSpecs(scene, envelope.getData("mailView"));
    envelope.setData("contentQueue", contentQueue);
    envelope.setData("contentIndex", 0);
    envelope.setData("expectedContentCount", contentQueue.length);
  }

  updateEnvelopeContentPreviews(scene, envelope);
}

function createEnvelopeContentSpecs(scene, mailView = scene.currentMailView) {
  if (!mailView) throw new Error("Cannot create envelope contents without a generated mail view.");

  const specs = [
    {
      id: "email",
      create: (targetScene) => createEmailDocument(targetScene, mailView.email),
      destination: documentStarts.email,
      angle: -4,
      startScale: 0.28,
      preview: { kind: "email", width: 44, height: 58, color: 0xe4e5df, stroke: 0x7e857d },
    },
    {
      id: "sender-card",
      create: (targetScene) => createSenderCard(targetScene, mailView.visa),
      destination: documentStarts.senderCard,
      angle: 5,
      startScale: 0.3,
      preview: { kind: "card", width: 44, height: 54, color: 0xeadfd0, stroke: 0x4b392a },
    },
  ];

  if (mailView.attachment) {
    const attachment = mailView.attachment;
    const layout = GENERATED_ATTACHMENT_LAYOUTS[attachment.type];
    if (!layout) throw new Error(`Unsupported generated attachment: ${attachment.type}`);
    specs.push({
      id: attachment.type,
      create: (targetScene) => createGeneratedAttachment(targetScene, attachment),
      destination: layout.destination,
      angle: layout.angle,
      startScale: layout.scale,
      preview: {
        kind: "sprite",
        textureKey: attachment.textureKey,
        scale: layout.previewScale,
        width: layout.width,
        height: layout.height,
      },
    });
  }

  return specs;
}

function updateEnvelopeContentPreviews(scene, envelope) {
  const layer = envelope.envelopeContentLayer;
  if (!layer) return;

  layer.removeAll(true);
  layer.setVisible(envelope.getData("isOpen"));

  const queue = envelope.getData("contentQueue") ?? [];
  const index = envelope.getData("contentIndex") ?? 0;
  const visibleCount = Math.min(ENVELOPE_STACK_VISIBLE_COUNT, Math.max(0, queue.length - index));

  for (let stackIndex = visibleCount - 1; stackIndex >= 0; stackIndex -= 1) {
    const spec = queue[index + stackIndex];
    const preview = createEnvelopeContentPreview(scene, spec, stackIndex);
    const position = envelopeContentPreviewPosition(stackIndex);
    preview.setPosition(position.x, position.y);
    layer.add(preview);
  }
}

function createEnvelopeContentPreview(scene, spec, stackIndex) {
  const previewData = spec.preview;
  const preview = scene.add.container(0, 0);
  const width = previewData.width;
  const height = previewData.height;

  preview.setAlpha(1 - stackIndex * 0.14);
  preview.setScale(1 - stackIndex * 0.04);
  preview.setAngle(-2 + stackIndex * 2.5);

  if (previewData.kind === "sprite") {
    const shadow = scene.add.rectangle(2, 3, width, height, 0x050706, 0.24);
    const image = scene.add.image(0, 0, previewData.textureKey);
    image.setOrigin(0.5);
    image.setScale(previewData.scale);
    preview.add([shadow, image]);
    return preview;
  }

  const paper = scene.add.graphics();
  paper.fillStyle(previewData.color, 1);
  paper.fillRect(-width / 2, -height / 2, width, height);
  paper.lineStyle(2, previewData.stroke, 1);
  paper.strokeRect(-width / 2, -height / 2, width, height);

  if (previewData.kind === "email") {
    paper.lineStyle(1, 0xaeb8ad, 1);
    paper.lineBetween(-width / 2 + 5, -height / 2 + 10, width / 2 - 13, -height / 2 + 10);
    paper.lineBetween(-width / 2 + 5, -height / 2 + 18, width / 2 - 7, -height / 2 + 18);
    paper.lineBetween(-width / 2 + 5, -height / 2 + 27, width / 2 - 5, -height / 2 + 27);
    paper.fillStyle(0xe4ad5c, 1);
    paper.fillCircle(width / 2 - 11, height / 2 - 12, 7);
  } else {
    paper.lineStyle(2, 0xb09a2d, 1);
    paper.strokeRect(-11, -height / 2 + 8, 22, 13);
    paper.lineStyle(1, 0x8c7c72, 1);
    paper.lineBetween(-width / 2 + 6, 0, width / 2 - 6, 0);
    paper.lineBetween(-width / 2 + 6, 9, width / 2 - 6, 9);
  }

  preview.add(paper);
  return preview;
}

function envelopeContentPreviewPosition(stackIndex) {
  return new Phaser.Math.Vector2(
    ENVELOPE_STACK_TOP_X + stackIndex * ENVELOPE_STACK_SPACING_X,
    ENVELOPE_STACK_TOP_Y + stackIndex * ENVELOPE_STACK_SPACING_Y,
  );
}

function tryPullEnvelopeContent(scene, envelope, pointer) {
  if (!envelope.getData("isOpen") || !isPointerInsideCurrentEnvelopePreview(envelope, pointer)) {
    return false;
  }

  if (envelope.getData("isPullingContent")) return true;
  scene.pendingEnvelopeContentDrag = {
    envelope,
    x: pointer.x,
    y: pointer.y,
  };
  scene.pendingEnvelopeClick = null;
  scene.skipEnvelopeToggle = true;
  return true;
}

function isPointerInsideCurrentEnvelopePreview(envelope, pointer) {
  const queue = envelope.getData("contentQueue") ?? [];
  const index = envelope.getData("contentIndex") ?? 0;
  const spec = queue[index];
  if (!spec) return false;

  const local = pointerToEnvelopeLocal(envelope, pointer);
  const position = envelopeContentPreviewPosition(0);
  const width = spec.preview.width;
  const height = spec.preview.height;
  const top = position.y - height / 2;
  const bottom = Math.min(position.y + height / 2, envelopePocketMouthY() + 4);
  if (bottom <= top) return false;

  const bounds = new Phaser.Geom.Rectangle(position.x - width / 2, top, width, bottom - top);

  return Phaser.Geom.Rectangle.Contains(bounds, local.x, local.y);
}

function pointerToEnvelopeLocal(envelope, pointer) {
  return new Phaser.Math.Vector2(
    (pointer.x - envelope.x) / (envelope.scaleX || 1),
    (pointer.y - envelope.y) / (envelope.scaleY || 1),
  );
}

function startEnvelopeContentDrag(scene, envelope, pointer) {
  const queue = envelope.getData("contentQueue") ?? [];
  const index = envelope.getData("contentIndex") ?? 0;
  const spec = queue[index];
  if (!spec) return null;

  if (spec.id === "sender-card") {
    envelope.setData("responseVerdict", null);
    setDeliveryButtonEnabled(scene, false);
  }

  scene.pendingEnvelopeClick = null;
  scene.skipEnvelopeToggle = true;
  envelope.setData("pressedEnvelope", false);
  envelope.setData("isPullingContent", true);
  envelope.setData("contentIndex", index + 1);
  updateEnvelopeContentPreviews(scene, envelope);

  const document = spec.create(scene);
  const start = envelopeContentPreviewPosition(0);
  document.x = envelope.x + start.x * (envelope.scaleX || 1);
  document.y = envelope.y + start.y * (envelope.scaleY || 1);
  document.rotation = document.getData("lockRotation")
    ? 0
    : Phaser.Math.DegToRad(spec.angle);
  document.alpha = 1;
  document.setScale(spec.startScale);
  document.setData("sourceEnvelope", envelope);
  document.setData("envelopeSpec", spec);
  restoreDocumentLastStamp(scene, document, spec.lastStamp);
  scene.documents.push(document);
  scene.activeDocument = document;
  syncUprightText(document);
  startDocumentDrag(scene, document, pointer, { manualEnvelopeDrag: true });

  scene.tweens.add({
    targets: document,
    scaleX: 1,
    scaleY: 1,
    duration: 170,
    ease: "Cubic.Out",
    onUpdate: () => syncUprightText(document),
  });
  return document;
}

function animateEnvelopeToInbox(scene, envelope) {
  const slot = INBOX_MAIL_SLOT;
  envelope.setPosition(slot.envelopeX, -58);
  envelope.setScale(slot.arrivalScale);
  envelope.setAlpha(0);
  envelope.setAngle(-2);
  envelope.setDepth(++scene.nextDocumentDepth);
  scene.inboxFrontLip?.setDepth(envelope.depth + 0.1);
  envelope.setData("storedInInbox", true);
  envelope.setData("readyForDelivery", false);
  envelope.setData("responseVerdict", null);
  envelope.setData("canOpen", false);
  envelope.input.enabled = false;
  scene.inboxIndicator?.setFillStyle(0x4c554c, 1);
  setDeliveryStatus(scene, "RECEBENDO", "#b7c0b5");
  syncUprightText(envelope);

  scene.tweens.add({
    targets: envelope,
    y: slot.envelopeY + 3,
    alpha: 1,
    angle: 0,
    scaleX: slot.storedScale * 1.04,
    scaleY: slot.storedScale * 1.04,
    duration: slot.arrivalDuration,
    ease: "Cubic.Out",
    onUpdate: () => syncUprightText(envelope),
    onComplete: () => {
      scene.tweens.add({
        targets: envelope,
        y: slot.envelopeY,
        scaleX: slot.storedScale,
        scaleY: slot.storedScale,
        duration: slot.settleDuration,
        ease: "Sine.Out",
        onUpdate: () => syncUprightText(envelope),
        onComplete: () => {
          envelope.input.enabled = true;
          envelope.setData("pressedEnvelope", false);
          scene.inboxIndicator?.setFillStyle(0x8fb07c, 1);
          updateMailFlowStatus(scene);
          syncUprightText(envelope);
        },
      });
    },
  });
}

function isEnvelopeOverInbox(envelope, pointer) {
  const dock = fixedSpots.inbox;
  const target = new Phaser.Geom.Rectangle(dock.x - 4, dock.y - 4, dock.width + 8, dock.height + 10);
  const point = pointer && Number.isFinite(pointer.x) && Number.isFinite(pointer.y)
    ? pointer
    : envelope;
  return Phaser.Geom.Rectangle.Contains(target, point.x, point.y);
}

function validateEnvelopeForDelivery(scene, envelope) {
  const queue = envelope.getData("contentQueue") ?? [];
  const index = envelope.getData("contentIndex") ?? 0;
  const enclosedSpecs = queue.slice(index);
  const looseDocuments = scene.documents.filter(
    (document) =>
      document !== envelope &&
      document.active &&
      document.getData("envelopeSpec"),
  );
  const looseVisa = looseDocuments.find(
    (document) => document.getData("envelopeSpec")?.id === "sender-card",
  );
  const enclosedVisa = enclosedSpecs.find((spec) => spec.id === "sender-card");
  const latestVisaStamp = looseVisa?.getData("lastStamp") ?? enclosedVisa?.lastStamp ?? null;

  if (!latestVisaStamp?.verdict) {
    return { ok: false, status: "CARIMBE\nO VISTO", color: "#d7a09a" };
  }
  if (envelope.getData("isOpen")) {
    return { ok: false, status: "FECHE O\nENVELOPE", color: "#d5bd8d" };
  }

  const expectedCount = envelope.getData("expectedContentCount") ?? 0;
  const hasAllContents =
    expectedCount > 0 &&
    enclosedSpecs.length === expectedCount &&
    looseDocuments.length === 0 &&
    !envelope.getData("isPullingContent");
  if (!hasAllContents || !enclosedVisa?.lastStamp) {
    return { ok: false, status: "RECOLOQUE\nOS ITENS", color: "#d5bd8d" };
  }

  return {
    ok: true,
    verdict: { ...enclosedVisa.lastStamp.verdict },
  };
}

function tryDockEnvelopeForDelivery(scene, envelope) {
  const validation = validateEnvelopeForDelivery(scene, envelope);
  if (!validation.ok) {
    flashDeliveryStatus(scene, validation.status, validation.color, 1250);
    return false;
  }

  scene.tweens.killTweensOf(envelope);
  envelope.setData("storedInInbox", true);
  envelope.setData("readyForDelivery", false);
  envelope.setData("responseVerdict", validation.verdict);
  envelope.setData("canOpen", false);
  envelope.setData("pressedEnvelope", false);
  envelope.input.enabled = false;
  envelope.setDepth(++scene.nextDocumentDepth);
  scene.inboxFrontLip?.setDepth(envelope.depth + 0.1);
  scene.inboxIndicator?.setFillStyle(0xd0b36f, 1);
  setDeliveryButtonEnabled(scene, false);
  setDeliveryStatus(scene, "INSERINDO", "#d5bd8d");

  scene.tweens.add({
    targets: envelope,
    x: INBOX_MAIL_SLOT.envelopeX,
    y: INBOX_MAIL_SLOT.envelopeY + 2,
    scaleX: INBOX_MAIL_SLOT.storedScale * 1.05,
    scaleY: INBOX_MAIL_SLOT.storedScale * 0.96,
    rotation: 0,
    duration: 230,
    ease: "Cubic.InOut",
    onUpdate: () => syncUprightText(envelope),
    onComplete: () => {
      scene.tweens.add({
        targets: envelope,
        y: INBOX_MAIL_SLOT.envelopeY,
        scaleX: INBOX_MAIL_SLOT.storedScale,
        scaleY: INBOX_MAIL_SLOT.storedScale,
        duration: 85,
        ease: "Back.Out",
        onUpdate: () => syncUprightText(envelope),
        onComplete: () => {
          envelope.setData("readyForDelivery", true);
          envelope.input.enabled = true;
          scene.inboxIndicator?.setFillStyle(
            validation.verdict.type === "approve" ? 0x91b56f : 0xb56f68,
            1,
          );
          setDeliveryButtonEnabled(scene, true);
          updateMailFlowStatus(scene);
        },
      });
    },
  });
  return true;
}

function rejectEnvelopeFromInbox(scene, envelope) {
  envelope.setData("storedInInbox", false);
  envelope.setData("readyForDelivery", false);
  envelope.setData("canOpen", true);
  scene.inboxIndicator?.setFillStyle(0x4c554c, 1);
  setDeliveryButtonEnabled(scene, false);
  scene.tweens.killTweensOf(envelope);
  scene.tweens.add({
    targets: envelope,
    x: Phaser.Math.Clamp(envelope.x, 90, WIDTH - 90),
    y: 118,
    scaleX: 1,
    scaleY: 1,
    duration: 190,
    ease: "Back.Out",
    onUpdate: () => syncUprightText(envelope),
  });
}

function submitMailEnvelope(scene) {
  const envelope = scene.currentEnvelope;
  if (
    !envelope?.active ||
    !envelope.getData("readyForDelivery") ||
    scene.gameOver ||
    scene.isSubmittingMail
  ) return;

  const verdict = envelope.getData("responseVerdict");
  if (!verdict) {
    setDeliveryButtonEnabled(scene, false);
    flashDeliveryStatus(scene, "CARIMBE\nO VISTO", "#d7a09a");
    return;
  }

  scene.isSubmittingMail = true;
  scene.lastSubmittedVerdict = { ...verdict };
  envelope.setData("readyForDelivery", false);
  envelope.input.enabled = false;
  setDeliveryButtonEnabled(scene, false);
  setDeliveryStatus(scene, "ENVIANDO", "#a8cf78");
  scene.inboxIndicator?.setFillStyle(0xa8cf78, 1);
  scene.tweens.killTweensOf(envelope);

  scene.tweens.add({
    targets: envelope,
    y: -52,
    alpha: 0,
    scaleX: INBOX_MAIL_SLOT.arrivalScale,
    scaleY: INBOX_MAIL_SLOT.arrivalScale,
    duration: 390,
    ease: "Cubic.In",
    onUpdate: () => syncUprightText(envelope),
    onComplete: () => completeMailSubmission(scene),
  });
}

const TRIAGE_MEMO_MESSAGES = {
  ATTACHMENT_NOT_AUTHORIZED: "ANEXO NAO AUTORIZADO",
  ATTACHMENT_SCAN_NOT_AUTHORIZED: "RESULTADO DO ANEXO INVALIDO",
  BULLETIN_AUTHORIZATION_REQUIRED: "BOLETIM NAO OBSERVADO",
  CONTACT_DATA_MISMATCH: "DADOS DO REMETENTE DIVERGEM",
  CONTACT_DISMISSED: "REMETENTE DESLIGADO",
  CONTACT_OUTSIDE_FUNCTION: "CARGO NAO AUTORIZADO",
  CONTACT_SUSPENDED: "CONTA SUSPENSA",
  INTERNAL_ORIGIN_MISMATCH: "ORIGEM DECLARADA INVALIDA",
  LINK_DESTINATION_UNRECOGNIZED: "DESTINO DO LINK INVALIDO",
  LINK_DESTINATION_UNRESOLVED: "DESTINO NAO RESOLVIDO",
  LINK_DISPLAY_TARGET_MISMATCH: "LINK EXIBIDO DIVERGE",
  LINK_IDN_HOST_UNRECOGNIZED: "HOST IDN NAO RECONHECIDO",
  LINK_PATH_NOT_AUTHORIZED: "CAMINHO DO LINK INVALIDO",
  LINK_SHORTENER_UNRECOGNIZED: "ENCURTADOR NAO RECONHECIDO",
  MALWARE_CONFIRMED: "MALWARE FOI AUTORIZADO",
  OPERATION_SUSPENDED: "OPERACAO SUSPENSA",
  PARTNER_SUSPENDED: "PARCEIRO SUSPENSO",
  PROHIBITED_REQUEST: "PEDIDO PROIBIDO",
  PROTOCOL_INVALID: "PROTOCOLO INVALIDO",
  PROTOCOL_MISSING: "PROTOCOLO AUSENTE",
  PROTOCOL_RANGE_SUSPENDED: "SERIE DE PROTOCOLO SUSPENSA",
  RECIPIENT_NOT_AUTHORIZED: "DESTINATARIO INCORRETO",
  REPLY_TO_DIVERGENT: "ENDERECO DE RESPOSTA DIVERGE",
  SENDER_DOMAIN_UNRECOGNIZED: "DOMINIO NAO RECONHECIDO",
};

function recordSubmittedDecision(scene) {
  const generatedCase = scene.currentGeneratedCase;
  const expected = generatedCase?.evaluation?.verdict ?? null;
  const chosen = scene.lastSubmittedVerdict?.type === "approve" ? "ACCEPT" : "REJECT";
  const correct = Boolean(expected && chosen === expected);
  const violations = generatedCase?.evaluation?.violations ?? [];

  if (correct) scene.correctAnswerCount += 1;
  else scene.incorrectAnswerCount += 1;
  scene.lastSubmissionResult = {
    caseId: generatedCase?.id ?? null,
    expected,
    chosen,
    correct,
    violations: [...violations],
  };

  if (!correct) {
    const message = expected === "ACCEPT"
      ? "EMAIL VALIDO RECUSADO"
      : TRIAGE_MEMO_MESSAGES[violations[0]] ?? "REGRA DE TRIAGEM VIOLADA";
    showProtocolMemo(scene, message);
  }
  return scene.lastSubmissionResult;
}

function completeMailSubmission(scene) {
  scene.answeredEmailCount += 1;
  const submission = recordSubmittedDecision(scene);
  scene.documents.forEach((document) => {
    if (document.active) document.destroy();
  });
  scene.documents = [];
  scene.scanReceipts = [];
  scene.tableDocuments = scene.tableDocuments.filter((document) => document.active && document.scene);
  scene.currentEnvelope = null;
  scene.activeDocument = null;
  scene.currentGeneratedCase = null;
  scene.currentMailView = null;
  scene.isSubmittingMail = false;
  scene.inboxIndicator?.setFillStyle(0x4c554c, 1);
  setDeliveryStatus(
    scene,
    submission.correct ? "DECISAO\nCORRETA" : `ERRO\n${scene.incorrectAnswerCount}/${MAX_TRIAGE_ERRORS}`,
    submission.correct ? "#b9d48d" : "#d7a09a",
  );

  if (scene.incorrectAnswerCount >= MAX_TRIAGE_ERRORS) {
    scene.gameOver = true;
    setScannerMode(scene, false);
    scene.time.delayedCall(620, () => showGameOver(scene));
    return;
  }

  const feedbackDelay = submission.correct ? 320 : 620;
  scene.time.delayedCall(feedbackDelay, () => {
    if (!scene.mailQueue.length) {
      const nextTurn = prepareGeneratedTurn(scene, false);
      if (nextTurn.bulletin) {
        scene.awaitingBulletin = true;
        updateMailFlowStatus(scene);
        const bulletin = createShiftBulletin(
          scene,
          nextTurn.bulletin,
          scene.nextBulletinNumber,
        );
        scene.nextBulletinNumber += 1;
        presentShiftBulletin(scene, bulletin);
        return;
      }
    }

    updateMailFlowStatus(scene);
    spawnMailDocuments(scene);
  });
}

function showGameOver(scene) {
  window.parent.postMessage({ source: "fortifica:arcade-game", version: 1, type: "arcade:finished", game: "email-please", score: scene.correctAnswerCount }, location.origin);
  const overlay = scene.add.container(0, 0).setDepth(5000);
  const shade = scene.add.rectangle(0, 0, WIDTH, HEIGHT, 0x100e0c, 0.78).setOrigin(0);
  shade.setInteractive();
  const panel = scene.add.rectangle(WIDTH / 2, HEIGHT / 2, 260, 148, 0xd9cba4);
  panel.setStrokeStyle(3, 0x51402f);
  const stripe = scene.add.rectangle(WIDTH / 2, 120, 240, 6, 0x7b2e2a);
  const title = scene.add.text(WIDTH / 2, 137, "TURNO ENCERRADO", {
    fontFamily: FONT_TITLE,
    fontSize: "15px",
    color: "#2b221a",
  }).setOrigin(0.5);
  const reason = scene.add.text(WIDTH / 2, 162, "LIMITE DE ERROS ATINGIDO", {
    fontFamily: FONT_UI,
    fontSize: "9px",
    color: "#65332f",
  }).setOrigin(0.5);
  const score = scene.add.text(
    WIDTH / 2,
    183,
    `ACERTOS ${scene.correctAnswerCount}     ERROS ${scene.incorrectAnswerCount}/${MAX_TRIAGE_ERRORS}`,
    { fontFamily: FONT_UI, fontSize: "9px", color: "#2b221a" },
  ).setOrigin(0.5);
  const restart = scene.add.rectangle(WIDTH / 2, 218, 126, 28, 0x4f6a59);
  restart.setStrokeStyle(2, 0x29392f);
  restart.setInteractive({ useHandCursor: true });
  const restartText = scene.add.text(WIDTH / 2, 218, "RECOMEÇAR", {
    fontFamily: FONT_UI,
    fontSize: "10px",
    color: "#f2f0d1",
  }).setOrigin(0.5);
  restart.on("pointerdown", (_pointer, _localX, _localY, event) => {
    event?.stopPropagation();
    scene.scene.restart();
  });
  overlay.add([shade, panel, stripe, title, reason, score, restart, restartText]);
}

function animateDocumentFromEnvelope(
  scene,
  envelope,
  document,
  destination,
  startOffsetX,
  startOffsetY,
  angle,
  delay,
  options = {},
) {
  document.x = envelope.x + startOffsetX;
  document.y = envelope.y + startOffsetY;
  document.rotation = Phaser.Math.DegToRad(angle);
  document.alpha = options.startAlpha ?? 0;
  document.setScale(options.startScale ?? 0.72);
  document.setDepth(++scene.nextDocumentDepth);
  syncUprightText(document);

  scene.tweens.add({
    targets: document,
    alpha: 1,
    x: destination.x,
    y: destination.y + 8,
    rotation: Phaser.Math.DegToRad(angle * -0.35),
    scaleX: 1,
    scaleY: 1,
    duration: options.duration ?? 245,
    delay,
    ease: "Cubic.Out",
    onUpdate: () => syncUprightText(document),
    onComplete: () => {
      scene.tweens.add({
        targets: document,
        y: destination.y,
        rotation: Phaser.Math.DegToRad(angle * 0.25),
        duration: 85,
        ease: "Back.Out",
        onUpdate: () => syncUprightText(document),
        onComplete: () => {
          syncUprightText(document);
          options.onComplete?.();
        },
      });
    },
  });
}

function setupDraggableDocument(scene, container, width, height, stampOffset) {
  container.setSize(width, height);
  container.setData("draggableDocument", true);
  container.setData("docWidth", width);
  container.setData("docHeight", height);
  container.setInteractive(
    new Phaser.Geom.Rectangle(0, 0, width, height),
    Phaser.Geom.Rectangle.Contains,
  );
  container.input.cursor = "grab";
  container.stampOffset = stampOffset;
  scene.input.setDraggable(container);
  scene.tableDocuments.push(container);

  container.on("pointerdown", (_pointer, _localX, _localY, event) => {
    if (scene.isScannerMode && scanDocument(scene, container)) {
      event?.stopPropagation();
      return;
    }

    container.setData("wasDragged", false);
    scene.activeDocument = container;
    container.setDepth(++scene.nextDocumentDepth);
  });
  container.on("pointerover", () => {
    container.setData("scannerHover", true);
    updateScannerHighlightForDocument(scene, container);
  });
  container.on("pointerout", () => {
    container.setData("scannerHover", false);
    updateScannerHighlightForDocument(scene, container);
  });

  return container;
}

function setPaperBounds(document, x, y, width, height) {
  document.setData("paperBounds", new Phaser.Geom.Rectangle(x, y, width, height));
}

function getPaperBounds(document) {
  return (
    document.getData("paperBounds") ??
    new Phaser.Geom.Rectangle(
      -(document.getData("docWidth") ?? 120) / 2,
      -(document.getData("docHeight") ?? 120) / 2,
      document.getData("docWidth") ?? 120,
      document.getData("docHeight") ?? 120,
    )
  );
}

function setUprightTexts(container, texts) {
  container.uprightTexts = texts;
  syncUprightText(container);
}

function syncUprightText(container) {
  if (!container.uprightTexts) return;

  const counterRotation = -container.rotation * TEXT_COUNTER_ROTATION;
  container.uprightTexts.forEach((text) => {
    text.rotation = counterRotation;
  });
}

function createMailEnvelope(scene, mailView = scene.currentMailView) {
  const container = scene.add.container(0, 0);
  container.name = "mailEnvelope";
  const metrics = envelopeMetrics(false);
  setupDraggableDocument(scene, container, metrics.width, metrics.height, new Phaser.Math.Vector2(0, 24));
  container.setData("lockRotation", true);
  container.setData("canOpen", false);
  container.setData("mailView", mailView);
  container.setData("generatedCaseId", mailView?.id ?? null);

  const shadow = createPaperShadow(scene, 7, 10, metrics.width - 6, metrics.height - 10);
  const closedImage = scene.add.image(0, 0, "envelopeClosed");
  closedImage.setOrigin(0.5);
  closedImage.setScale(ENVELOPE_SCALE);
  const openBottom = scene.add.image(0, 0, "envelopeOpenBottom");
  openBottom.setOrigin(0.5);
  openBottom.setScale(ENVELOPE_SCALE);
  openBottom.setVisible(false);
  const openTop = scene.add.image(0, envelopeOpenTopOffsetY(), "envelopeOpenTop");
  openTop.setOrigin(0.5);
  openTop.setScale(ENVELOPE_SCALE);
  openTop.setVisible(false);
  const contentLayer = scene.add.container(0, 0);
  contentLayer.setVisible(false);
  const pulse = scene.add
    .rectangle(0, 0, metrics.width, metrics.height, 0xfff2a8, 0.08)
    .setVisible(false);
  const stampMark = createStampMark(scene, 0, 24, {
    width: 74,
    height: 28,
    fontSize: 10,
    dotSize: 2,
  });

  container.add([shadow, openTop, contentLayer, openBottom, closedImage, pulse, stampMark]);
  container.bodyShadow = shadow;
  container.cursorPulse = pulse;
  container.stampMark = stampMark;
  container.envelopeImage = closedImage;
  container.envelopeClosedImage = closedImage;
  container.envelopeOpenBottom = openBottom;
  container.envelopeOpenTop = openTop;
  container.envelopeContentLayer = contentLayer;
  container.envelopePulse = pulse;
  setPaperBounds(container, -metrics.width / 2, -metrics.height / 2, metrics.width, metrics.height);

  container.on("pointerdown", (pointer) => {
    if (tryPullEnvelopeContent(scene, container, pointer)) return;
    beginEnvelopePress(scene, container, pointer);
  });
  return container;
}

function resizeEnvelopeDocument(scene, container, isOpen) {
  const metrics = envelopeMetrics(isOpen);
  container.setSize(metrics.width, metrics.height);
  container.setData("docWidth", metrics.width);
  container.setData("docHeight", metrics.height);
  if (container.input?.hitArea?.setTo) {
    container.input.hitArea.setTo(0, 0, metrics.width, metrics.height);
  }
  return metrics;
}

function beginEnvelopePress(scene, envelope, pointer) {
  if (!envelope.getData("canOpen")) return;

  envelope.setData("pressedEnvelope", true);
  scene.pendingEnvelopeClick = {
    envelope,
    x: pointer.x,
    y: pointer.y,
  };
}

function getEnvelopeAtPointer(scene, pointer) {
  const envelope = scene.documents?.find(
    (document) => document.name === "mailEnvelope" && document.active,
  );
  if (!envelope || !envelope.getData("canOpen")) return null;

  if (isPointerInsideEnvelopeVisual(envelope, pointer)) return envelope;
  if (envelope.getData("isOpen") && isPointerInsideCurrentEnvelopePreview(envelope, pointer)) {
    return envelope;
  }

  return null;
}

function isPointerInsideEnvelopeVisual(envelope, pointer) {
  const width = (envelope.getData("docWidth") ?? envelopeMetrics(false).width) * Math.abs(envelope.scaleX || 1);
  const height = (envelope.getData("docHeight") ?? envelopeMetrics(false).height) * Math.abs(envelope.scaleY || 1);
  const bounds = new Phaser.Geom.Rectangle(envelope.x - width / 2, envelope.y - height / 2, width, height);

  return Phaser.Geom.Rectangle.Contains(bounds, pointer.x, pointer.y);
}

function getEnvelopeReturnTarget(scene, document, pointer) {
  if (document.name === "mailEnvelope" || !document.getData("envelopeSpec")) return null;

  const envelope = scene.documents?.find(
    (candidate) => candidate.name === "mailEnvelope" && candidate.active && candidate.getData("isOpen"),
  );
  if (!envelope) return null;

  const point = pointer ?? document;
  return isPointInsideEnvelopeReturnArea(envelope, point) ? envelope : null;
}

function isPointInsideEnvelopeReturnArea(envelope, point) {
  const width = (envelope.getData("docWidth") ?? envelopeMetrics(false).width) * Math.abs(envelope.scaleX || 1);
  const height = (envelope.getData("docHeight") ?? envelopeMetrics(false).height) * Math.abs(envelope.scaleY || 1);
  const topExtra = ENVELOPE_OPEN_TOP_SOURCE_HEIGHT * ENVELOPE_SCALE + 32;
  const bounds = new Phaser.Geom.Rectangle(
    envelope.x - width / 2 - 10,
    envelope.y - height / 2 - topExtra,
    width + 20,
    height + topExtra + 8,
  );

  return Phaser.Geom.Rectangle.Contains(bounds, point.x, point.y);
}

function returnDocumentToEnvelope(scene, envelope, document) {
  const spec = document.getData("envelopeSpec");
  if (!spec) return false;

  spec.lastStamp = cloneStampRecord(document.getData("lastStamp"));
  if (spec.id === "sender-card") {
    envelope.setData("responseVerdict", spec.lastStamp?.verdict ?? null);
  }

  const queue = envelope.getData("contentQueue") ??
    createEnvelopeContentSpecs(scene, envelope.getData("mailView"));
  const index = envelope.getData("contentIndex") ?? 0;
  const target = envelopeContentPreviewPosition(0);
  const targetX = envelope.x + target.x * (envelope.scaleX || 1);
  const targetY = envelope.y + target.y * (envelope.scaleY || 1);

  envelope.setData("isPullingContent", true);
  document.setData("sourceEnvelope", null);
  document.disableInteractive();
  scene.tweens.killTweensOf(document);
  scene.activeDocument = envelope;

  scene.tweens.add({
    targets: document,
    x: targetX,
    y: targetY,
    scaleX: spec.startScale,
    scaleY: spec.startScale,
    alpha: 0.35,
    rotation: Phaser.Math.DegToRad(spec.angle),
    duration: 170,
    ease: "Cubic.In",
    onUpdate: () => syncUprightText(document),
    onComplete: () => {
      queue.splice(index, 0, spec);
      envelope.setData("contentQueue", queue);
      envelope.setData("contentIndex", index);
      envelope.setData("isPullingContent", false);
      scene.documents = scene.documents.filter((candidate) => candidate !== document);
      scene.tableDocuments = scene.tableDocuments.filter((candidate) => candidate !== document);
      document.destroy();
      updateEnvelopeContentPreviews(scene, envelope);
    },
  });

  scene.tweens.add({
    targets: envelope,
    scaleX: 1.03,
    scaleY: 0.98,
    duration: 65,
    yoyo: true,
    ease: "Quad.Out",
  });
  return true;
}

function openMailEnvelope(scene, envelope, ignoreDragging = false) {
  if (
    !envelope.getData("canOpen") ||
    envelope.getData("isOpen") ||
    (scene.isDraggingDocument && !ignoreDragging)
  ) return;

  envelope.setData("isOpen", true);
  envelope.envelopeClosedImage?.setVisible(false);
  envelope.envelopeOpenBottom?.setVisible(true);
  envelope.envelopeOpenTop?.setVisible(true);
  envelope.envelopeContentLayer?.setVisible(true);
  envelope.setDepth(++scene.nextDocumentDepth);

  scene.tweens.add({
    targets: envelope,
    scaleX: 1.04,
    scaleY: 0.98,
    duration: 55,
    yoyo: true,
    ease: "Quad.Out",
  });
  spawnEnvelopeContents(scene, envelope);
}

function closeMailEnvelope(scene, envelope, ignoreDragging = false) {
  if (
    !envelope.getData("canOpen") ||
    !envelope.getData("isOpen") ||
    (scene.isDraggingDocument && !ignoreDragging)
  ) return;

  envelope.setData("isOpen", false);
  envelope.envelopeClosedImage?.setVisible(true);
  envelope.envelopeOpenBottom?.setVisible(false);
  envelope.envelopeOpenTop?.setVisible(false);
  envelope.envelopeContentLayer?.setVisible(false);
  envelope.setDepth(++scene.nextDocumentDepth);

  scene.tweens.add({
    targets: envelope,
    scaleX: 0.98,
    scaleY: 1.03,
    duration: 55,
    yoyo: true,
    ease: "Quad.Out",
  });
}

function envelopeMetrics(isOpen) {
  const width = ENVELOPE_SOURCE_WIDTH * ENVELOPE_SCALE;
  const height = ENVELOPE_CLOSED_SOURCE_HEIGHT * ENVELOPE_SCALE;

  return {
    width,
    height,
  };
}

function envelopeOpenTopOffsetY() {
  return -((ENVELOPE_CLOSED_SOURCE_HEIGHT + ENVELOPE_OPEN_TOP_SOURCE_HEIGHT) * ENVELOPE_SCALE) / 2;
}

function envelopePocketMouthY() {
  return -(ENVELOPE_CLOSED_SOURCE_HEIGHT * ENVELOPE_SCALE) / 2;
}

function createEmailDocument(scene, emailData = scene.currentMailView?.email) {
  if (!emailData) throw new Error("Cannot render an email document without generated data.");

  const documentWidth = 180;
  const documentHeight = 256;
  const paperWidth = 174;
  const paperHeight = 250;
  const contentLeft = -78;
  const contentRight = 78;
  const contentWidth = contentRight - contentLeft;
  const container = scene.add.container(0, 0);
  container.name = "emailDocument";
  setupDraggableDocument(scene, container, documentWidth, documentHeight, new Phaser.Math.Vector2(30, 82));
  container.setData("lockRotation", true);

  const shadow = createPaperShadow(scene, 6, 8, paperWidth, paperHeight);
  const paper = scene.add.graphics();
  paper.fillStyle(0xe4e5df, 1);
  paper.fillRect(-paperWidth / 2, -paperHeight / 2, paperWidth, paperHeight);
  paper.lineStyle(3, 0x7e857d, 1);
  paper.strokeRect(-paperWidth / 2, -paperHeight / 2, paperWidth, paperHeight);
  drawEmailSeal(paper, 59, 101, 22);
  const sealLogo = scene.add.image(59, 101, "emailSealLogo");

  const texts = [];
  let cursorY = -116;
  const atIndex = emailData.senderAddress.lastIndexOf("@");
  const senderAccount = atIndex >= 0
    ? emailData.senderAddress.slice(0, atIndex)
    : emailData.senderAddress;
  const senderHost = atIndex >= 0 ? emailData.senderAddress.slice(atIndex) : "";
  const sender = createEmailText(scene, contentLeft, cursorY, `DE: ${senderAccount}`, 94, {
    fontSize: DOCUMENT_META_FONT_SIZE,
    noWrap: true,
  });
  fitTextToWidth(sender, 94, 7);
  texts.push(sender);

  const date = createEmailText(scene, contentRight, cursorY, emailData.date, contentWidth, {
    align: "right",
    fontSize: DOCUMENT_META_FONT_SIZE,
    noWrap: true,
  });
  date.setOrigin(1, 0);
  texts.push(date);

  cursorY += 12;
  const domain = createEmailText(scene, contentLeft, cursorY, senderHost, contentWidth, {
    fontSize: DOCUMENT_META_FONT_SIZE,
    color: "#274a6c",
    noWrap: true,
  });
  fitTextToWidth(domain, contentWidth, 7);
  texts.push(domain);

  cursorY += 12;
  const title = createEmailText(scene, contentLeft, cursorY, emailData.subject, contentWidth, {
    color: DOCUMENT_MUTED_INK,
  });
  texts.push(title);

  cursorY += Math.ceil(title.height) + 4;
  drawEmailSeparator(paper, cursorY, contentLeft, contentRight);
  cursorY += 8;

  const body = createEmailText(
    scene,
    contentLeft,
    cursorY,
    emailData.body,
    contentWidth,
  );
  if (cursorY + body.height > 54) body.setFontSize("7px");
  texts.push(body);
  cursorY += Math.ceil(body.height) + 7;

  if (emailData.link) {
    drawEmailSeparator(paper, cursorY, contentLeft, contentRight);
    cursorY += 7;
    const linkIntro = createEmailText(
      scene,
      contentLeft,
      cursorY,
      emailData.link.prompt,
      contentWidth - 8,
      { fontSize: "7px", color: DOCUMENT_MUTED_INK },
    );
    texts.push(linkIntro);
    cursorY += Math.ceil(linkIntro.height) + 4;

    const visibleLink = String(emailData.link.text);
    const linkParts = /^([a-z][a-z0-9+.-]*:\/\/[^/?#]+)(.*)$/i.exec(visibleLink);
    const access = createEmailText(
      scene,
      contentLeft,
      cursorY,
      linkParts?.[1] ?? visibleLink,
      contentWidth,
      { fontSize: "7px", color: "#274a6c", noWrap: true },
    );
    let continuation = "";
    if (linkParts && access.width > contentWidth) {
      const authority = linkParts[1];
      const hostStart = authority.indexOf("://") + 3;
      for (let dot = authority.lastIndexOf("."); dot > hostStart; dot = authority.lastIndexOf(".", dot - 1)) {
        access.setText(authority.slice(0, dot));
        if (access.width <= contentWidth) {
          continuation = authority.slice(dot);
          break;
        }
      }
      if (!continuation) access.setText(authority);
    }
    fitTextToWidth(access, contentWidth, 5);
    texts.push(access);
    let linkLineY = cursorY + Math.ceil(access.height) + 2;
    if (continuation) {
      const suffix = createEmailText(scene, contentLeft, linkLineY, continuation, contentWidth,
        { fontSize: "7px", color: "#274a6c", noWrap: true });
      fitTextToWidth(suffix, contentWidth, 6);
      texts.push(suffix);
      linkLineY += Math.ceil(suffix.height) + 2;
    }
    if (linkParts?.[2]) {
      const path = createEmailText(scene, contentLeft, linkLineY,
        linkParts[2], 108, { fontSize: "7px", color: "#274a6c", noWrap: true });
      fitTextToWidth(path, 108, 5);
      texts.push(path);
    }
  }

  const pulse = scene.add.rectangle(0, 0, documentWidth, documentHeight, 0xfff2a8, 0.08).setVisible(false);
  const stampMark = createStampMark(scene, 30, 82, {
    width: 84,
    height: 34,
    fontSize: 14,
    dotSize: 3,
  });

  container.add([
    shadow,
    paper,
    ...texts,
    sealLogo,
    pulse,
    stampMark,
  ]);
  container.bodyShadow = shadow;
  container.cursorPulse = pulse;
  container.stampMark = stampMark;
  setPaperBounds(container, -paperWidth / 2, -paperHeight / 2, paperWidth, paperHeight);
  setUprightTexts(container, [...texts, sealLogo]);
  if (emailData.link?.scannerResult) {
    setScannerResult(scene, container, emailData.link.scannerResult);
  }
  return container;
}

function createEmailText(scene, x, y, text, width, options = {}) {
  return scene.add.text(x, y, text, {
    fontFamily: options.fontFamily ?? FONT_READABLE,
    fontSize: options.fontSize ?? DOCUMENT_BODY_FONT_SIZE,
    color: options.color ?? DOCUMENT_INK,
    lineSpacing: options.lineSpacing ?? 1,
    align: options.align ?? "left",
    ...(options.noWrap ? {} : { wordWrap: { width, useAdvancedWrap: true } }),
  });
}

function fitTextToWidth(textObject, maxWidth, minimumFontSize = 6) {
  let fontSize = Number.parseInt(textObject.style.fontSize, 10) || 8;
  while (textObject.width > maxWidth && fontSize > minimumFontSize) {
    fontSize -= 1;
    textObject.setFontSize(`${fontSize}px`);
  }
  return textObject;
}

function drawEmailSeparator(graphics, y, left = -66, right = 64) {
  graphics.fillStyle(0x8f9991, 1);
  for (let x = left; x <= right; x += 6) {
    graphics.fillRect(x, y, 3, 2);
  }
}

function drawEmailSeal(graphics, x, y, radius) {
  graphics.fillStyle(0x99e550, 1);
  graphics.fillCircle(x, y, radius);
}

function createExeAttachment(scene, attachment = {}) {
  return createFileAttachment(scene, {
    name: "exeAttachment",
    textureKey: attachment.textureKey ?? "exeAttachment",
    label: attachment.label ?? "ANEXO .EXE",
    scannerResult: attachment.scannerResult ?? ["EXE", "REPUTACAO:", "MALICIOSO"],
    width: 60,
    height: 64,
    imageY: -2,
    shadowWidth: 54,
    shadowHeight: 58,
    paperBounds: new Phaser.Geom.Rectangle(-26, -31, 52, 58),
    stampWidth: 58,
    stampY: 14,
  });
}

function createZipAttachment(scene, attachment = {}) {
  return createFileAttachment(scene, {
    name: "zipAttachment",
    textureKey: "zipAttachment",
    label: "ANEXO .ZIP",
    scannerResult: attachment.scannerResult ?? ["ZIP", "CONTEUDO:", "COMPACTADO"],
  });
}

function createDocxAttachment(scene, attachment = {}) {
  return createFileAttachment(scene, {
    name: "docxAttachment",
    textureKey: "docxAttachment",
    label: "ANEXO .DOCX",
    scannerResult: attachment.scannerResult ?? ["DOCX", "MACROS:", "AUSENTES"],
  });
}

function createPdfAttachment(scene, attachment = {}) {
  return createFileAttachment(scene, {
    name: "pdfAttachment",
    textureKey: "pdfAttachment",
    label: "ANEXO .PDF",
    scannerResult: attachment.scannerResult ?? ["PDF", "SCRIPT:", "EMBUTIDO"],
  });
}

function createXlsxAttachment(scene, attachment = {}) {
  return createFileAttachment(scene, {
    name: "xlsxAttachment",
    textureKey: "xlsxAttachment",
    label: "ANEXO .XLSX",
    scannerResult: attachment.scannerResult ?? ["XLSX", "MACROS:", "AUSENTES"],
  });
}

function createBatAttachment(scene, attachment = {}) {
  return createFileAttachment(scene, {
    name: "batAttachment",
    textureKey: "batAttachment",
    label: "ANEXO .BAT",
    scannerResult: attachment.scannerResult ?? ["BAT", "COMPORTAMENTO:", "NAO VERIFICADO"],
    width: 60,
    height: 60,
    imageY: -4,
    shadowWidth: 54,
    shadowHeight: 54,
    paperBounds: new Phaser.Geom.Rectangle(-26, -30, 52, 54),
    stampWidth: 56,
  });
}

function createMsiAttachment(scene, attachment = {}) {
  return createFileAttachment(scene, {
    name: "msiAttachment",
    textureKey: "msiAttachment",
    label: "ANEXO .MSI",
    scannerResult: attachment.scannerResult ?? ["MSI", "PUBLICADOR:", "NAO VERIFICADO"],
    width: 60,
    height: 60,
    imageY: -4,
    shadowWidth: 54,
    shadowHeight: 54,
    shadowTextureKey: "msiAttachment",
    shadowTint: 0x050706,
    shadowAlpha: 0.5,
    shadowX: 5,
    shadowY: 3,
    shadowDragX: 8,
    shadowDragY: 6,
    paperBounds: new Phaser.Geom.Rectangle(-26, -30, 52, 54),
    stampWidth: 56,
  });
}

function createFileAttachment(scene, options) {
  const container = scene.add.container(0, 0);
  const width = options.width ?? 52;
  const height = options.height ?? 60;
  const stampY = options.stampY ?? 12;

  container.name = options.name;
  setupDraggableDocument(scene, container, width, height, new Phaser.Math.Vector2(0, stampY));

  const shadow = options.shadowTextureKey
    ? scene.add.image(options.shadowX ?? 5, options.shadowY ?? 7, options.shadowTextureKey).setAlpha(0)
    : createPaperShadow(
        scene,
        5,
        7,
        options.shadowWidth ?? 44,
        options.shadowHeight ?? 54,
      );
  if (options.shadowTint && shadow.setTint) {
    shadow.setTint(options.shadowTint);
  }
  const image = scene.add.image(0, options.imageY ?? -3, options.textureKey);
  const label = scene.add.text(0, options.labelY ?? 31, options.label, {
    fontFamily: FONT_UI,
    fontSize: "8px",
    color: "#cdbf96",
  });
  const pulse = scene.add.rectangle(0, 0, width, height, 0xfff2a8, 0.08).setVisible(false);
  const stampMark = createStampMark(scene, 0, stampY, {
    width: options.stampWidth ?? 52,
    height: 24,
    fontSize: 10,
    dotSize: 2,
  });

  image.setOrigin(0.5);
  label.setOrigin(0.5);
  container.add([shadow, image, label, pulse, stampMark]);
  container.bodyShadow = shadow;
  container.shadowDragAlpha = options.shadowAlpha;
  if (options.shadowTextureKey) {
    container.shadowHomePosition = new Phaser.Math.Vector2(
      options.shadowX ?? 5,
      options.shadowY ?? 7,
    );
    container.shadowDragPosition = new Phaser.Math.Vector2(
      options.shadowDragX ?? options.shadowX ?? 5,
      options.shadowDragY ?? options.shadowY ?? 7,
    );
  }
  container.cursorPulse = pulse;
  container.stampMark = stampMark;
  const bounds = options.paperBounds ?? new Phaser.Geom.Rectangle(-21, -29, 42, 54);
  setPaperBounds(container, bounds.x, bounds.y, bounds.width, bounds.height);
  setUprightTexts(container, [label]);
  if (options.scannerResult) {
    setScannerResult(scene, container, options.scannerResult);
  }
  return container;
}

function createGeneratedAttachment(scene, attachment) {
  const creators = {
    exe: createExeAttachment,
    zip: createZipAttachment,
    docx: createDocxAttachment,
    pdf: createPdfAttachment,
    xlsx: createXlsxAttachment,
    bat: createBatAttachment,
    msi: createMsiAttachment,
  };
  const createAttachment = creators[attachment.type];
  if (!createAttachment) throw new Error(`Unsupported attachment renderer: ${attachment.type}`);
  return createAttachment(scene, attachment);
}

function createSenderCard(scene, visaData = scene.currentMailView?.visa) {
  if (!visaData) throw new Error("Cannot render a sender card without generated data.");

  const documentWidth = 180;
  const documentHeight = 194;
  const paperWidth = 174;
  const paperHeight = 188;
  const container = scene.add.container(0, 0);
  container.name = "senderCard";
  setupDraggableDocument(scene, container, documentWidth, documentHeight, new Phaser.Math.Vector2(0, -50));
  container.setData("lockRotation", true);

  const shadow = createPaperShadow(scene, 6, 8, paperWidth, paperHeight);
  const card = scene.add.graphics();
  card.fillStyle(0xeadfd0, 1);
  card.fillRect(-paperWidth / 2, -paperHeight / 2, paperWidth, paperHeight);
  card.lineStyle(3, 0x4b392a, 1);
  card.strokeRect(-paperWidth / 2, -paperHeight / 2, paperWidth, paperHeight);

  card.lineStyle(3, 0xb09a2d, 1);
  card.strokeRect(-52, -69, 104, 40);

  for (let y = -66; y <= -34; y += 8) {
    card.lineStyle(1, 0x8c7c72, 1);
    card.lineBetween(-70, y, -66, y + 3);
    card.lineBetween(-66, y + 3, -70, y + 6);
    card.lineBetween(70, y, 66, y + 3);
    card.lineBetween(66, y + 3, 70, y + 6);
  }

  card.lineStyle(1, 0x8c7c72, 1);
  card.lineBetween(-77, 7, 77, 7);
  card.strokeRect(-77, 21, 154, 48);
  card.lineBetween(-77, 37, 77, 37);
  card.lineBetween(-77, 53, 77, 53);
  card.lineBetween(-77, 78, 77, 78);

  const title = scene.add.text(-76, -86, "CORPSEC // VISTO", {
    fontFamily: FONT_TITLE,
    fontSize: "8px",
    color: "#51483f",
  });
  const senderName = scene.add.text(-76, -17, `REMETENTE: ${visaData.senderName.toUpperCase()}`, {
    fontFamily: FONT_READABLE,
    fontSize: "8px",
    color: "#2b221a",
  });
  fitTextToWidth(senderName, 152, 7);
  const role = scene.add.text(-76, -5, `CARGO: ${visaData.role.toUpperCase()}`, {
    fontFamily: FONT_READABLE,
    fontSize: "8px",
    color: "#2b221a",
  });
  fitTextToWidth(role, 152, 7);
  const detailRows = [
    `ORIGEM: ${visaData.origin === "INT" ? "INTERNA" : "EXTERNA"}`,
    `ANEXO: ${visaData.hasAttachment ? "SIM" : "NÃO"}`,
    `LINK: ${visaData.hasLink ? "SIM" : "NÃO"}`,
  ].map((label, index) =>
    scene.add
      .text(-70, 29 + index * 16, label, {
        fontFamily: FONT_READABLE,
        fontSize: "8px",
        color: "#2b221a",
      })
      .setOrigin(0, 0.5),
  );
  const code = scene.add.text(76, 82, visaData.code, {
    fontFamily: FONT_READABLE,
    fontSize: "8px",
    color: "#2b221a",
  });
  code.setOrigin(1, 0);
  fitTextToWidth(code, 74, 7);
  const pulse = scene.add.rectangle(0, 0, documentWidth, documentHeight, 0xfff2a8, 0.08).setVisible(false);
  const stampMark = createStampMark(scene, 0, -50, {
    width: 96,
    height: 36,
    fontSize: 14,
    dotSize: 3,
  });

  container.add([
    shadow,
    card,
    title,
    senderName,
    role,
    ...detailRows,
    code,
    pulse,
    stampMark,
  ]);
  container.bodyShadow = shadow;
  container.cursorPulse = pulse;
  container.stampMark = stampMark;
  setPaperBounds(container, -paperWidth / 2, -paperHeight / 2, paperWidth, paperHeight);
  setUprightTexts(container, [title, senderName, role, ...detailRows, code]);
  return container;
}

function stampActiveDocument(scene, activeStamp = scene.stamp) {
  const stamp = activeStamp;
  if (!stamp || scene.isStamping || scene.isDraggingDocument) return;

  scene.stamp = stamp;
  const stampTarget = stampTargetUnderStamp(scene, stamp);
  const document = stampTarget?.document ?? null;
  const verdict = document ? verdictForStamp(stamp.verdictType) : null;
  const pressLayer = stamp.layer;
  if (!pressLayer) return;

  scene.isStamping = true;
  scene.stamps?.forEach((stampDevice) => stampDevice.disableInteractive());
  scene.tweens.killTweensOf(stamp);
  scene.tweens.killTweensOf(pressLayer);
  stamp.setDepth(1020);
  stamp.shadow.setAlpha(0.42);
  setStampLayerHighlight(pressLayer, false);

  scene.tweens.add({
    targets: pressLayer,
    y: STAMP_STATION.pressDistance,
    scaleX: STAMP_STATION.scale * 1.015,
    scaleY: STAMP_STATION.scale * 0.985,
    duration: 260,
    ease: "Cubic.InOut",
    onComplete: () => {
      if (document && verdict) {
        applyStampMark(scene, document, verdict, stampTarget.localPoint);
      }
      scene.cameras.main.shake(70, 0.0024);
      if (document?.bodyShadow) document.bodyShadow.setPosition(8, 11);

      scene.tweens.add({
        targets: pressLayer,
        y: STAMP_STATION.pressDistance + 3,
        duration: 42,
        yoyo: true,
        ease: "Quad.Out",
        onComplete: () => {
          scene.time.delayedCall(45, () => {
            scene.tweens.add({
              targets: pressLayer,
              y: 0,
              scaleX: STAMP_STATION.scale,
              scaleY: STAMP_STATION.scale,
              duration: 185,
              ease: "Back.Out",
              onComplete: () => returnStampHome(scene),
            });
          });
        },
      });
    },
  });
}

function stampTargetUnderStamp(scene, stamp) {
  const strike = stamp.strikePoint ?? stamp.home;
  const candidates = (scene.tableDocuments ?? []).filter(
    (document) =>
      document.active &&
      document.scene &&
      document.visible &&
      document.getData("draggableDocument") &&
      document.getData("stampable") !== false,
  ).sort((a, b) => b.depth - a.depth);

  for (const document of candidates) {
    const bounds = getPaperBounds(document);
    const mark = document.stampMark;
    const markWidth = mark?.markWidth ?? 108;
    const markHeight = mark?.markHeight ?? 42;
    const localPoint = worldPointToDocumentLocal(document, strike);
    const overlapsX =
      localPoint.x + markWidth / 2 >= bounds.left &&
      localPoint.x - markWidth / 2 <= bounds.right;
    const overlapsY =
      localPoint.y + markHeight / 2 >= bounds.top &&
      localPoint.y - markHeight / 2 <= bounds.bottom;

    if (overlapsX && overlapsY) return { document, localPoint };
  }

  return null;
}

function worldPointToDocumentLocal(document, point) {
  const dx = point.x - document.x;
  const dy = point.y - document.y;
  const rotation = document.rotation ?? 0;
  const cos = Math.cos(rotation);
  const sin = Math.sin(rotation);

  return new Phaser.Math.Vector2(
    (dx * cos + dy * sin) / (document.scaleX || 1),
    (-dx * sin + dy * cos) / (document.scaleY || 1),
  );
}

function applyStampMark(scene, document, verdict, localPoint = null) {
  const template = document.stampMark;
  const mark = createStampMarkFromTemplate(scene, template);
  document.add(mark);

  updateStampMark(mark, verdict);
  if (localPoint) {
    mark.setPosition(localPoint.x, localPoint.y);
  } else if (document.stampOffset) {
    mark.setPosition(document.stampOffset.x, document.stampOffset.y);
  }
  if (!cropStampMarkToDocument(document, mark)) {
    mark.destroy();
    return;
  }
  const stampRecord = {
    sequence: ++scene.stampSequence,
    verdict: { ...verdict },
    localPoint: { x: mark.x, y: mark.y },
  };
  document.setData("lastStamp", stampRecord);
  mark.setVisible(true);
  mark.setAlpha(0);
  mark.setRotation(0);
  mark.setScale(1.35);

  scene.tweens.add({
    targets: mark,
    alpha: 0.92,
    scaleX: 1,
    scaleY: 1,
    duration: 85,
    ease: "Linear",
  });

  scene.tweens.add({
    targets: document,
    scaleX: document.scaleX * 1.015,
    scaleY: document.scaleY * 0.985,
    duration: 55,
    yoyo: true,
    ease: "Quad.Out",
    onComplete: () => document.bodyShadow.setPosition(5, 7),
  });
}

function cloneStampRecord(record) {
  if (!record) return null;
  return {
    sequence: record.sequence,
    verdict: { ...record.verdict },
    localPoint: { ...record.localPoint },
  };
}

function restoreDocumentLastStamp(scene, document, record) {
  const restored = cloneStampRecord(record);
  if (!restored || !document.stampMark) return;

  const mark = createStampMarkFromTemplate(scene, document.stampMark);
  document.add(mark);
  updateStampMark(mark, restored.verdict);
  mark.setPosition(restored.localPoint.x, restored.localPoint.y);
  if (!cropStampMarkToDocument(document, mark)) {
    mark.destroy();
    return;
  }

  mark.setVisible(true).setAlpha(0.92).setScale(1).setRotation(0);
  document.setData("lastStamp", restored);
  scene.stampSequence = Math.max(scene.stampSequence, restored.sequence ?? 0);
}

function cropStampMarkToDocument(document, mark) {
  const bounds = getPaperBounds(document);
  const left = Math.max(-mark.markWidth / 2, bounds.left - mark.x);
  const right = Math.min(mark.markWidth / 2, bounds.right - mark.x);
  const top = Math.max(-mark.markHeight / 2, bounds.top - mark.y);
  const bottom = Math.min(mark.markHeight / 2, bounds.bottom - mark.y);
  const cropWidth = right - left;
  const cropHeight = bottom - top;

  if (cropWidth <= 0 || cropHeight <= 0) return false;

  if (cropWidth >= mark.markWidth - 1 && cropHeight >= mark.markHeight - 1) {
    clearStampMarkCrop(mark);
    return true;
  }

  mark.setCrop(
    Math.round(left + mark.markWidth / 2),
    Math.round(top + mark.markHeight / 2),
    Math.round(cropWidth),
    Math.round(cropHeight),
  );
  return true;
}

function returnStampHome(scene) {
  const stamp = scene.stamp;
  if (!stamp) return;
  scene.isStamping = false;
  scene.stamps?.forEach((stampDevice) => {
    stampDevice.setDepth(1010);
    stampDevice.shadow.setAlpha(0.28);
    stampDevice.setScale(1);
    if (stampDevice.layer) {
      setStampLayerHighlight(stampDevice.layer, false);
      stampDevice.layer.setY(0);
      stampDevice.layer.setScale(STAMP_STATION.scale);
    }
    enableStampInput(stampDevice);
  });
}

function resetStamp(scene) {
  const stamps = scene.stamps ?? (scene.stamp ? [scene.stamp] : []);
  if (!stamps.length) return;

  scene.isStamping = false;
  stamps.forEach((stamp) => {
    const home = stamp.home;
    if (!home) return;
    scene.tweens.killTweensOf(stamp);
    if (stamp.layer) scene.tweens.killTweensOf(stamp.layer);
    stamp.setPosition(home.x, home.y);
    stamp.setRotation(0);
    stamp.setScale(1);
    stamp.setDepth(1010);
    stamp.shadow.setAlpha(0.28);
    if (stamp.layer) {
      setStampLayerHighlight(stamp.layer, false);
      stamp.layer.setPosition(0, 0);
      stamp.layer.setRotation(0);
      stamp.layer.setScale(STAMP_STATION.scale);
    }
    enableStampInput(stamp);
  });
}

function enableStampInput(stamp) {
  stamp.setInteractive(
    STAMP_STATION.hitbox,
    Phaser.Geom.Rectangle.Contains,
  );
  stamp.input.cursor = "pointer";
}

function verdictForStamp(verdictType = "reject") {
  if (verdictType === "approve") {
    return { type: "approve", text: "EMAIL\nACEITO", color: "#547a28" };
  }
  return { type: "reject", text: "EMAIL\nNEGADO", color: "#91302f" };
}

function settleDocument(scene, document) {
  const docWidth = document.getData("docWidth") ?? 120;
  const docHeight = document.getData("docHeight") ?? 120;
  const halfWidth = docWidth / 2;
  const halfHeight = docHeight / 2;
  const visibleX = Math.min(DOCUMENT_MIN_VISIBLE_EDGE, halfWidth);
  const visibleY = Math.min(DOCUMENT_MIN_VISIBLE_EDGE, halfHeight);
  const finalX = Math.round(
    Phaser.Math.Clamp(
      document.x,
      visibleX - halfWidth,
      WIDTH + halfWidth - visibleX,
    ),
  );
  const finalY = Math.round(
    Phaser.Math.Clamp(
      document.y,
      visibleY - halfHeight,
      HEIGHT + halfHeight - visibleY,
    ),
  );
  const currentAngle = Phaser.Math.RadToDeg(document.rotation);
  const finalRotation = document.getData("lockRotation")
    ? 0
    : Phaser.Math.DegToRad(Phaser.Math.Clamp(currentAngle * 0.55, -3, 3));

  scene.tweens.add({
    targets: document,
    x: finalX,
    y: finalY,
    rotation: finalRotation,
    scaleX: 1.015,
    scaleY: 0.985,
    duration: 130,
    ease: "Cubic.Out",
    onUpdate: () => syncUprightText(document),
    onComplete: () => {
      syncUprightText(document);
      scene.cameras.main.shake(55, 0.0018);
      scene.tweens.add({
        targets: document,
        scaleX: 1,
        scaleY: 1,
        y: finalY - 2,
        duration: 70,
        yoyo: true,
        ease: "Quad.Out",
        onUpdate: () => syncUprightText(document),
        onComplete: () => syncUprightText(document),
      });
    },
  });
}

function addPixelLine(scene, x1, y1, x2, y2, color) {
  const graphics = scene.add.graphics();
  graphics.lineStyle(2, color, 1);
  graphics.beginPath();
  graphics.moveTo(x1, y1);
  graphics.lineTo(x2, y2);
  graphics.strokePath();
}
