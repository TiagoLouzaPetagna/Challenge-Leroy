import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import test from "node:test";

const projectRoot = new URL("../", import.meta.url);

async function render(pathname = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(new URL(pathname, "http://localhost/"), {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("renderiza a plataforma Casa Digital Segura", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Casa Digital Segura \| Leroy Merlin<\/title>/i);
  assert.match(html, /Casa Digital/);
  assert.match(html, /Sua pr.xima escolha/);
  assert.match(html, /O aviso que n.{0,4}o podia esperar/);
  assert.doesNotMatch(html, /Como reportar/);
  assert.match(html, /Ver toda a jornada/);
  assert.doesNotMatch(html, /Ver estrutura/);
  assert.match(html, /Protótipo funcional/);
  assert.doesNotMatch(html, /Your site is taking shape|Building your site/i);
  assert.doesNotMatch(html, /name=["']codex-preview["']/i);
});

test("renderiza as rotas funcionais do fluxo principal", async () => {
  const cases = [
    {
      pathname: "/missoes",
      expected: [
        /class="missions-hub"/,
        /id="missions-hub-title">Confian/,
        /O aviso que n/,
        /Confian.{0,4}a sob press/,
        /A conversa j.{0,4} estava acontecendo/,
        /Quem enviou de verdade/,
        /Dom.nio sob a lupa/,
        /Voc. iniciou este acesso/,
        /Cliquei\. E agora/,
        /Uma manh. comum/,
        /Mudan.a banc.ria sem atalho/,
        /Todas as Miss.es/,
      ],
    },
    {
      pathname: "/missoes/aviso-de-bloqueio",
      expected: [
        /data-activity-id="mission:account-lock"/,
        /<h1>O aviso que n/,
        /sua conta ser. bloqueada/,
        /Continuar/,
        /Progresso da miss.o de fundamento/,
        /Etapa 1 de 6/,
        /Leia o e-mail e observe o que ele pede/,
      ],
    },
    {
      pathname: "/missoes/a-conversa-ja-estava-acontecendo",
      expected: [
        /class="activity-workspace page-stack conversation-reconstruction-page"/,
        /<h1>A conversa j.{0,4} estava acontecendo<\/h1>/,
        /Caso atribu.do/,
        /Seu papel/,
        /Sua tarefa/,
        /Iniciar reconstru..o/,
        /100.{0,30}pontos-base/,
      ],
    },
    {
      pathname: "/missoes/voce-iniciou-este-acesso",
      expected: [
        /class="activity-workspace page-stack mission-page mfa-mission-page"/,
        /<h1>Voc. iniciou este acesso\?<\/h1>/,
        /Prepara..o necess.ria/,
        /Quem enviou de verdade/,
        /Dom.nio sob a lupa/,
      ],
    },
    {
      pathname: "/missoes/cliquei-e-agora",
      expected: [
        /class="activity-workspace page-stack mission-page recovery-mission-page recovery-builder-page"/,
        /Cliquei\. E agora\?/,
        /Reconstrua o que aconteceu/,
        /Reconstruir o ocorrido/,
        /etapa 1 de 9/,
        /100.{0,30}pontos-base/,
      ],
    },
    {
      pathname: "/perfil",
      expected: [
        /class="page-stack profile-page"/,
        /<h1[^>]*>Lucas<\/h1>/,
        /Áreas de Meu perfil/,
        /Atividade recente/,
        /Conquistas/,
        /Preferências/,
      ],
    },
    {
      pathname: "/avatar-lab",
      expected: [
        /Meu personagem/,
        /Criador de personagem/,
        /Voltar ao perfil/,
        /avatar-creator\/\?embedded=1/,
      ],
    },
    {
      pathname: "/perfil/historico",
      expected: [
        /class="page-stack profile-page"/,
        /Hist.rico de atividades/,
        /O hist.rico come.a com sua primeira atividade/,
        /Origem dos pontos/,
      ],
    },
    {
      pathname: "/perfil/conquistas",
      expected: [
        /class="page-stack profile-page"/,
        /Marcos pessoais/,
        /Cada conquista concede 100 pontos/,
        /Olhar atento/,
      ],
    },
    {
      pathname: "/phishlab",
      expected: [
        /class="page-stack lab-page"/,
        /id="phishlab-title">Toda mensagem<br\/>deixa pistas\.<\/h1>/,
        /Quem enviou de verdade/,
        /Dom.nio sob a lupa/,
        /Espelho de P/,
      ],
    },
    {
      pathname: "/phishlab/quem-enviou-de-verdade",
      expected: [
        /class="activity-workspace page-stack identity-map-page"/,
        /Observe quem está pedindo/,
        /O que aconteceu/,
        /60 pontos-base/,
      ],
    },
    {
      pathname: "/phishlab/analisador-de-links",
      expected: [
        /class="activity-workspace page-stack lab-player-page url-anatomy-page"/,
        /<h1>Dom.nio sob a lupa<\/h1>/,
        /Seu caso/,
        /Sua tarefa/,
        /60 pontos-base/,
      ],
    },
    {
      pathname: "/simulacoes",
      expected: [
        /class="page-stack simulation-page"/,
        /id="simulations-title">Na d.vida,<br\/>treine sua escolha\.<\/h1>/,
        /Uma manh. comum/,
        /Ataque multicanal/,
      ],
    },
    {
      pathname: "/simulacoes/dia-de-trabalho",
      expected: [
        /class="activity-workspace page-stack simulation-player-page workday-v2-page"/,
        /Uma manh. comum/,
        /Começar a triagem/,
        /70.{0,30}pontos-base/,
      ],
    },
    {
      pathname: "/arcade",
      expected: [
        /class="page-stack arcade-page"/,
        /Escolha um desafio/,
        /Overlooked/,
        /Jogar agora/,
        /Um jogo\. Uma habilidade sob press.o/,
        /Score e pontos cumprem pap.is diferentes/,
      ],
    },
    {
      pathname: "/arcade/overlooked",
      expected: [
        /class="page-stack arcade-detail-page arcade-game-room"/,
        /Todos os jogos/,
        /Jogo carregado/,
        /Tela cheia/,
        /Hall da fama/,
      ],
    },
    {
      pathname: "/radar",
      expected: [
        /class="page-stack radar-page"/,
        /Explore sinais antes que eles virem problema/,
        /Quishing: phishing escondido em QR Codes/,
        /Explore por situa/,
      ],
    },
    {
      pathname: "/radar/quishing",
      expected: [
        /class="activity-workspace page-stack radar-article-page [^"]+"/,
        /Leitura em etapas/,
        /Etapa.{0,20}1.{0,20}de.{0,20}6/,
        /O que o QR Code esconde/,
        /Observar um caso fict.cio/,
        /5.{0,30}pontos na primeira conclus/,
      ],
    },
    {
      pathname: "/equipes",
      expected: [
        /class="page-stack teams-page"/,
        /Tr.s indicadores, nenhum ranking individual/,
        /40% \+ 40% \+ 20%/,
        /Caixa de Entrada Segura/,
      ],
    },
    {
      pathname: "/equipes/caixa-de-entrada-segura",
      expected: [
        /class="activity-workspace page-stack team-challenge-page"/,
        /Caixa de Entrada Segura/,
        /Voc. receber. cinco mensagens completas/,
        /Abrir a caixa de entrada/,
      ],
    },
    {
      pathname: "/equipes/mudanca-bancaria-sem-atalho",
      expected: [
        /class="activity-workspace page-stack bank-change-page bank-process-page"/,
        /<h1[^>]*>\s*Mudan.a banc.ria sem atalho\s*<\/h1>/,
        /A fornecedora Madeira Norte Componentes usa uma conversa conhecida/,
        /Estação de processo/,
        /Seu papel/,
        /80.{0,40}pontos-base/,
      ],
    },
  ];

  for (const { pathname, expected } of cases) {
    const response = await render(pathname);
    assert.equal(response.status, 200, pathname);
    assert.match(
      response.headers.get("content-type") ?? "",
      /^text\/html\b/i,
      pathname,
    );
    const html = await response.text();
    for (const pattern of expected) assert.match(html, pattern, `${pathname}: ${pattern}`);
  }
});

test("define um Master Avatar pixel art com grade e camadas estáveis", async () => {
  const [master, geometry] = await Promise.all([
    readFile(new URL("features/avatar/MasterAvatar.tsx", projectRoot), "utf8"),
    readFile(new URL("features/avatar/avatar-master.ts", projectRoot), "utf8"),
  ]);

  assert.match(geometry, /width: 64/);
  assert.match(geometry, /height: 96/);
  assert.match(geometry, /MASTER_AVATAR_ANCHORS/);
  assert.match(geometry, /\/avatar\/base\/body-base\.png/);
  assert.match(geometry, /\/avatar\/bottoms\/base-underwear\.png/);
  assert.match(geometry, /\/avatar\/face\/face-01\.png/);
  assert.match(master, /data-avatar-master="true"/);
  assert.match(master, /data-pixel-grid/);

  const pngAssets = [
    "public/avatar/base/body-base.png",
    "public/avatar/bottoms/base-underwear.png",
    "public/avatar/face/face-01.png",
    "public/avatar/master/master.png",
  ];
  for (const asset of pngAssets) {
    const png = await readFile(new URL(asset, projectRoot));
    assert.equal(png.readUInt32BE(16), 64, `${asset} deve ter 64 px de largura`);
    assert.equal(png.readUInt32BE(20), 96, `${asset} deve ter 96 px de altura`);
    assert.equal(png[25], 6, `${asset} deve usar PNG RGBA com transparência`);
  }

  const layers = [
    "hair-back",
    "body",
    "lower-clothing",
    "shoes",
    "upper-clothing",
    "face",
    "hair-front",
    "glasses",
    "head-accessory",
    "special-accessory",
  ];
  let previousIndex = -1;
  for (const layer of layers) {
    const currentIndex = geometry.indexOf(`"${layer}"`);
    assert.ok(currentIndex > previousIndex, `${layer} deve manter a ordem do master`);
    previousIndex = currentIndex;
  }

  const profileResponse = await render("/perfil");
  const profileHtml = await profileResponse.text();
  assert.doesNotMatch(profileHtml, /data-avatar-master="true"/);

  const labResponse = await render("/avatar-lab");
  const labHtml = await labResponse.text();
  assert.match(labHtml, /Criador de personagem/);
  assert.match(labHtml, /avatar-creator\/\?embedded=1/);
  const creatorScript = await readFile(new URL("public/avatar-creator/app.js", projectRoot), "utf8");
  assert.match(creatorScript, /casa-digital:avatar-saved/);
  assert.match(creatorScript, /toDataURL\("image\/png"\)/);
});

test("simplifica a missão em seis etapas preservando o contrato e a identidade visual", async () => {
  const [mission, chrome, designSystem, layout, packageJson, tutorial, home] =
    await Promise.all([
      readFile(new URL("features/missions/PhishingFoundationMission.tsx", projectRoot), "utf8"),
      readFile(new URL("features/ui/PortalChrome.tsx", projectRoot), "utf8"),
      readFile(new URL("app/design-system.css", projectRoot), "utf8"),
      readFile(new URL("app/layout.tsx", projectRoot), "utf8"),
      readFile(new URL("package.json", projectRoot), "utf8"),
      readFile(new URL("features/onboarding/GuidedTutorial.tsx", projectRoot), "utf8"),
      readFile(new URL("app/page.tsx", projectRoot), "utf8"),
    ]);

  const stageBlock = mission.match(/const STEPS = (\[[^;]+\]);/)?.[1] ?? "[]";
  assert.equal(JSON.parse(stageBlock).length, 6);
  assert.match(mission, /useActivityStageFocus\(stage, Boolean\(celebration\.screen\)\)/);
  assert.doesNotMatch(mission, /ActivityProgress/);
  assert.doesNotMatch(mission, /option\.detail/);
  assert.match(mission, /Rever minhas decisões/);
  assert.match(mission, /reportDetailIds\?\.length/);

  for (const field of [
    "protectedAssetId",
    "potentialConsequenceId",
    "pauseDecisionId",
    "evaluationId",
    "confirmationRouteId",
    "finalAssessmentId",
    "finalActionId",
    "reportDetailIds",
    "transferDecisionId",
  ]) {
    assert.match(mission, new RegExp(`\\b${field}\\b`));
  }

  assert.doesNotMatch(chrome, /current=\{1\}|total=\{4\}|ProgressJourney/);
  assert.equal(tutorial.match(/pose="hero"/g)?.length, 1);
  assert.match(tutorial, /activeStep === 0/);
  assert.doesNotMatch(mission, /pose="welcome"/);

  assert.match(packageJson, /@fontsource-variable\/fraunces/);
  assert.match(packageJson, /@fontsource-variable\/manrope/);
  assert.match(layout, /@fontsource-variable\/fraunces\/wght\.css/);
  assert.match(layout, /@fontsource-variable\/manrope\/wght\.css/);
  assert.match(designSystem, /"Fraunces Variable"/);
  assert.match(designSystem, /"Manrope Variable"/);
  assert.match(designSystem, /scrollbar-width:\s*thin/);
  assert.match(designSystem, /\*::\-webkit-scrollbar/);
  assert.match(designSystem, /@media \(forced-colors: active\)[\s\S]*scrollbar-color:\s*auto/);
  assert.match(designSystem, /--motion-fast:\s*160ms/);
  assert.match(designSystem, /--motion-medium:\s*280ms/);
  assert.match(designSystem, /--motion-slow:\s*440ms/);

  assert.doesNotMatch(home, /<p>\{nextStep\.description\}<\/p>/);
  assert.match(home, /nextStep\.journeyAlternative \? \(/);

  const response = await render("/missoes/aviso-de-bloqueio");
  const html = await response.text();
  assert.equal(html.match(/<progress\b/g)?.length, 1);
  assert.match(html, /aria-label="Etapa 1 de 6: Examinar"/);
});

test("todas as atividades disponíveis encerram com revisão explícita das respostas", async () => {
  const reviewComponent = await readFile(
    new URL("features/activities/primitives/ActivityAnswerReview.tsx", projectRoot),
    "utf8",
  );
  assert.match(reviewComponent, /O que você acertou e o que precisa revisar/);
  assert.match(reviewComponent, /Acertou/);
  assert.match(reviewComponent, /Precisa revisar/);
  assert.match(reviewComponent, /item\.userAnswer/);
  assert.match(reviewComponent, /Resposta esperada/);

  const playersUsingSharedReview = [
    "features/missions/PhishingFoundationMission.tsx",
    "features/missions/ConversationReconstructionMission.tsx",
    "features/missions/MfaFatigueMission.tsx",
    "features/missions/RecoveryMission.tsx",
    "features/phishlab/SenderInspectorLab.tsx",
    "features/phishlab/DomainUnderMagnifierLab.tsx",
    "features/simulations/SimulationExperience.tsx",
    "features/radar/RadarExperience.tsx",
  ];
  for (const file of playersUsingSharedReview) {
    assert.match(await readFile(new URL(file, projectRoot), "utf8"), /ActivityAnswerReview/);
  }

  for (const file of [
    "features/teams/TeamsExperience.tsx",
    "features/teams/BankChangeChallenge.tsx",
  ]) {
    const source = await readFile(new URL(file, projectRoot), "utf8");
    assert.match(source, /O que você acertou e o que precisa revisar/);
    assert.match(source, /Acertou/);
    assert.match(source, /Precisa revisar/);
  }
});

test("mantém o estado account-backed atrás de uma fronteira central e versionada", async () => {
  const [provider, reducer, persistence, selectors, layout, page] = await Promise.all([
    readFile(new URL("app/providers.tsx", projectRoot), "utf8"),
    readFile(new URL("lib/state/app-reducer.ts", projectRoot), "utf8"),
    readFile(new URL("lib/state/persistence.ts", projectRoot), "utf8"),
    readFile(new URL("lib/state/selectors.ts", projectRoot), "utf8"),
    readFile(new URL("app/layout.tsx", projectRoot), "utf8"),
    readFile(new URL("app/page.tsx", projectRoot), "utf8"),
  ]);

  assert.match(provider, /useReducer\s*\(/);
  assert.match(provider, /loadPersistedState/);
  assert.match(provider, /fetch\("\/api\/state"/);
  assert.match(provider, /securityMode: "account-backed"/);
  assert.match(provider, /isHydrated/);
  assert.match(provider, /submitMission/);
  assert.match(provider, /submitPhishLab/);
  assert.match(provider, /submitSimulation/);
  assert.match(provider, /submitRadar/);
  assert.match(provider, /submitTeamChallenge/);
  assert.match(provider, /submitBankChange/);
  assert.match(provider, /savePreferences/);
  assert.match(provider, /startTutorial/);
  assert.match(provider, /setTutorialStep/);
  assert.match(provider, /completeTutorial/);

  assert.match(persistence, /casa-digital-segura:mvp:v1/);
  assert.match(persistence, /schemaVersion/);
  assert.match(persistence, /localStorage/);

  assert.match(reducer, /MISSION_COMPLETED/);
  assert.match(reducer, /PHISHLAB_COMPLETED/);
  assert.match(reducer, /SIMULATION_COMPLETED/);
  assert.match(reducer, /RADAR_COMPLETED/);
  assert.match(reducer, /TEAM_CHALLENGE_COMPLETED/);
  assert.match(reducer, /BANK_CHANGE_COMPLETED/);
  assert.match(reducer, /PREFERENCES_SAVED/);
  assert.match(reducer, /TUTORIAL_STARTED/);
  assert.match(reducer, /TUTORIAL_STEP_CHANGED/);
  assert.match(reducer, /TUTORIAL_COMPLETED/);
  assert.match(reducer, /DEMO_RESET/);
  assert.match(reducer, /rewardClaims/);
  assert.match(reducer, /pointLedger/);

  assert.match(selectors, /selectTotalPoints/);
  assert.match(selectors, /selectCurrentLevel/);
  assert.match(selectors, /selectJourneyProgress/);
  assert.match(selectors, /selectNextStep/);
  assert.match(selectors, /selectCompetencyOverview/);
  assert.match(selectors, /selectPointOrigins/);
  assert.match(selectors, /selectActivityTimeline/);
  assert.match(selectors, /selectRecentActivity/);
  assert.match(layout, /<AppProvider>/);
  assert.match(page, /useAppState\s*\(/);
  assert.doesNotMatch(page, /evaluatePilotMission/);
  assert.match(page, /Reiniciar meu progresso/);
});

test("concede a recompensa da missão uma única vez", async () => {
  const { createServer } = await import("vite");
  const vite = await createServer({
    root: fileURLToPath(projectRoot),
    configFile: false,
    server: { middlewareMode: true },
    appType: "custom",
    logLevel: "silent",
  });

  try {
    const [
      { appReducer, createDemoState },
      {
        selectLatestMissionRewardBreakdown,
        selectTeamShield,
        selectTotalPoints,
      },
      { loadPersistedState, savePersistedState, STORAGE_KEY },
    ] =
      await Promise.all([
        vite.ssrLoadModule("/lib/state/app-reducer.ts"),
        vite.ssrLoadModule("/lib/state/selectors.ts"),
        vite.ssrLoadModule("/lib/state/persistence.ts"),
      ]);
    const firstSubmission = {
      attemptId: "attempt:test:1",
      activityId: "mission:account-lock",
      activityVersion: 1,
      completedAt: "2026-08-01T13:00:00.000Z",
      decision: "verificar",
      inspectedEvidence: ["sender", "link", "context"],
      selectedReasonIds: ["domain", "urgency"],
    };

    const initial = createDemoState();
    const rejected = appReducer(initial, {
      type: "MISSION_COMPLETED",
      payload: { ...firstSubmission, activityId: "mission:invented" },
    });
    assert.equal(rejected, initial);
    const rejectedReason = appReducer(initial, {
      type: "MISSION_COMPLETED",
      payload: { ...firstSubmission, selectedReasonIds: ["invented"] },
    });
    assert.equal(rejectedReason, initial);

    const afterFirst = appReducer(initial, {
      type: "MISSION_COMPLETED",
      payload: firstSubmission,
    });
    assert.equal(selectTotalPoints(afterFirst), 220);
    assert.equal(selectTeamShield(afterFirst), 71);
    assert.equal(afterFirst.learning.pointLedger.length, 2);
    assert.equal(Object.keys(afterFirst.teams.contributionClaims).length, 1);
    assert.deepEqual(selectLatestMissionRewardBreakdown(afterFirst), {
      attemptId: "attempt:test:1",
      activityId: "mission:account-lock",
      basePoints: 100,
      bonusRate: 0.2,
      bonusPercentage: 20,
      bonusPoints: 20,
      totalPoints: 120,
      claimStatus: "granted",
      rewardGranted: true,
      grantedOnThisAttempt: true,
      grantedPoints: 120,
    });

    const afterDuplicate = appReducer(afterFirst, {
      type: "MISSION_COMPLETED",
      payload: firstSubmission,
    });
    assert.equal(afterDuplicate, afterFirst);
    assert.equal(selectTotalPoints(afterDuplicate), 220);

    const afterReplay = appReducer(afterDuplicate, {
      type: "MISSION_COMPLETED",
      payload: {
        ...firstSubmission,
        attemptId: "attempt:test:2",
        completedAt: "2026-08-01T14:00:00.000Z",
        decision: "reportar",
        selectedReasonIds: ["domain", "urgency", "destination"],
      },
    });
    assert.equal(afterReplay.learning.pointLedger.length, 2);
    assert.equal(selectTotalPoints(afterReplay), 220);
    assert.equal(selectTeamShield(afterReplay), 71);
    assert.equal(Object.keys(afterReplay.learning.attempts).length, 2);
    assert.equal(Object.keys(afterReplay.teams.contributionClaims).length, 1);
    assert.equal(
      afterReplay.learning.attempts["attempt:test:2"].result.teamPoints,
      0,
    );
    assert.deepEqual(selectLatestMissionRewardBreakdown(afterReplay), {
      attemptId: "attempt:test:2",
      activityId: "mission:account-lock",
      basePoints: 100,
      bonusRate: 0.3,
      bonusPercentage: 30,
      bonusPoints: 30,
      totalPoints: 130,
      claimStatus: "alreadyGranted",
      rewardGranted: true,
      grantedOnThisAttempt: false,
      grantedPoints: 0,
    });

    const reset = appReducer(afterReplay, { type: "DEMO_RESET" });
    assert.equal(selectTotalPoints(reset), 0);
    assert.equal(selectTeamShield(reset), 71);
    assert.equal(Object.keys(reset.learning.attempts).length, 0);
    assert.equal(Object.keys(reset.teams.contributionClaims).length, 0);

    const values = new Map();
    const previousWindow = Object.getOwnPropertyDescriptor(globalThis, "window");
    Object.defineProperty(globalThis, "window", {
      configurable: true,
      value: {
        localStorage: {
          getItem(key) {
            return values.get(key) ?? null;
          },
          setItem(key, value) {
            values.set(key, String(value));
          },
          removeItem(key) {
            values.delete(key);
          },
        },
      },
    });

    try {
      savePersistedState(afterReplay);
      assert.deepEqual(loadPersistedState(), afterReplay);

      const invalidEnvelope = JSON.parse(values.get(STORAGE_KEY));
      invalidEnvelope.state.learning.pointLedger = [null];
      values.set(STORAGE_KEY, JSON.stringify(invalidEnvelope));
      assert.equal(loadPersistedState(), null);
      assert.equal(values.has(STORAGE_KEY), false);
    } finally {
      if (previousWindow) {
        Object.defineProperty(globalThis, "window", previousWindow);
      } else {
        delete globalThis.window;
      }
    }
  } finally {
    await vite.close();
  }

});

test("valida conquistas de 100 pontos e a migração de preferências do Lote 7A", async () => {
  const { createServer } = await import("vite");
  const vite = await createServer({
    root: fileURLToPath(projectRoot),
    configFile: false,
    server: { middlewareMode: true },
    appType: "custom",
    logLevel: "silent",
  });

  try {
    const [
      { appReducer, createDemoState },
      { selectAchievements },
      { selectTotalPoints },
      { loadPersistedState, STORAGE_KEY },
    ] = await Promise.all([
      vite.ssrLoadModule("/lib/state/app-reducer.ts"),
      vite.ssrLoadModule("/lib/domain/achievements.ts"),
      vite.ssrLoadModule("/lib/state/selectors.ts"),
      vite.ssrLoadModule("/lib/state/persistence.ts"),
    ]);

    const initial = createDemoState();
    assert.equal(initial.meta.schemaVersion, 15);
    assert.equal(initial.onboarding.tutorial.status, "required");
    assert.equal(selectAchievements(initial).length, 4);
    assert.ok(
      selectAchievements(initial).every(
        (achievement) => achievement.rewardPoints === 100 && !achievement.unlocked,
      ),
    );

    const afterMission = appReducer(initial, {
      type: "MISSION_COMPLETED",
      payload: {
        attemptId: "attempt:achievement:mission",
        activityId: "mission:account-lock",
        activityVersion: 1,
        completedAt: "2026-08-01T18:30:00.000Z",
        decision: "verificar",
        inspectedEvidence: ["sender", "link", "context"],
        selectedReasonIds: ["domain", "urgency"],
      },
    });
    const attentive = selectAchievements(afterMission).find(
      (achievement) => achievement.id === "olhar-atento",
    );
    assert.equal(attentive.unlocked, true);
    assert.equal(attentive.rewardPoints, 100);
    assert.equal(selectTotalPoints(afterMission), 220);
    assert.equal(
      afterMission.learning.pointLedger.filter(
        (entry) => entry.category === "achievement",
      ).length,
      1,
    );

    const changedPreferences = {
      ...afterMission.preferences,
      highContrast: true,
      textSize: "large",
      leaderboardParticipation: true,
      leaderboardIdentity: "anonymous",
      notificationsEnabled: false,
    };
    const afterPreferences = appReducer(afterMission, {
      type: "PREFERENCES_SAVED",
      payload: {
        preferences: changedPreferences,
        changedAt: "2026-08-01T18:35:00.000Z",
      },
    });
    assert.deepEqual(afterPreferences.preferences, changedPreferences);

    const values = new Map();
    const previousWindow = Object.getOwnPropertyDescriptor(globalThis, "window");
    Object.defineProperty(globalThis, "window", {
      configurable: true,
      value: {
        localStorage: {
          getItem(key) {
            return values.get(key) ?? null;
          },
          setItem(key, value) {
            values.set(key, String(value));
          },
          removeItem(key) {
            values.delete(key);
          },
        },
      },
    });

    try {
      const legacyV2 = structuredClone(afterMission);
      legacyV2.meta.schemaVersion = 2;
      legacyV2.preferences = {
        reducedMotion: true,
        highContrast: false,
        soundEnabled: false,
        notificationsEnabled: true,
      };
      delete legacyV2.learning.rewardClaims["achievement:olhar-atento"];
      legacyV2.learning.pointLedger = legacyV2.learning.pointLedger.filter(
        (entry) => entry.category !== "achievement",
      );
      legacyV2.learning.history = legacyV2.learning.history.filter(
        (event) => event.kind !== "achievementUnlocked",
      );
      values.set(
        STORAGE_KEY,
        JSON.stringify({
          schemaVersion: 2,
          appVersion: "mvp-local-v2",
          savedAt: "2026-08-01T18:40:00.000Z",
          state: legacyV2,
        }),
      );

      const migrated = loadPersistedState();
      assert.equal(migrated.meta.schemaVersion, 15);
      assert.equal(migrated.onboarding.tutorial.status, "available");
      assert.equal(migrated.preferences.reducedMotion, true);
      assert.equal(migrated.preferences.soundEnabled, false);
      assert.equal(migrated.preferences.textSize, "default");
      assert.equal(migrated.preferences.leaderboardParticipation, false);
      assert.equal(
        selectAchievements(migrated).find(
          (achievement) => achievement.id === "olhar-atento",
        ).unlocked,
        true,
      );
      assert.equal(selectTotalPoints(migrated), 220);

      const legacyV3 = structuredClone(afterPreferences);
      legacyV3.meta.schemaVersion = 3;
      delete legacyV3.onboarding;
      values.set(
        STORAGE_KEY,
        JSON.stringify({
          schemaVersion: 3,
          appVersion: "mvp-local-v3",
          savedAt: "2026-08-01T18:45:00.000Z",
          state: legacyV3,
        }),
      );

      const migratedV3 = loadPersistedState();
      assert.equal(migratedV3.meta.schemaVersion, 15);
      assert.equal(migratedV3.onboarding.tutorial.status, "available");
      assert.equal(migratedV3.onboarding.tutorial.currentStep, 0);
      assert.equal(selectTotalPoints(migratedV3), 220);
    } finally {
      if (previousWindow) {
        Object.defineProperty(globalThis, "window", previousWindow);
      } else {
        delete globalThis.window;
      }
    }
  } finally {
    await vite.close();
  }
});

test("mantém o tutorial 7B versionado, retomável e sem conceder pontos", async () => {
  const { createServer } = await import("vite");
  const vite = await createServer({
    root: fileURLToPath(projectRoot),
    configFile: false,
    server: { middlewareMode: true },
    appType: "custom",
    logLevel: "silent",
  });

  try {
    const [
      { appReducer, createDemoState },
      { selectTotalPoints },
      { loadPersistedState, savePersistedState },
    ] = await Promise.all([
      vite.ssrLoadModule("/lib/state/app-reducer.ts"),
      vite.ssrLoadModule("/lib/state/selectors.ts"),
      vite.ssrLoadModule("/lib/state/persistence.ts"),
    ]);
    const [page, tutorialView, tutorialCatalog, profile, documentation] =
      await Promise.all([
        readFile(new URL("app/page.tsx", projectRoot), "utf8"),
        readFile(
          new URL("features/onboarding/GuidedTutorial.tsx", projectRoot),
          "utf8",
        ),
        readFile(new URL("features/onboarding/tutorial-catalog.ts", projectRoot), "utf8"),
        readFile(new URL("features/profile/ProfileView.tsx", projectRoot), "utf8"),
        readFile(new URL("DOCUMENTACAO-PLATAFORMA.md", projectRoot), "utf8"),
      ]);

    const initial = createDemoState();
    const initialPoints = selectTotalPoints(initial);
    assert.deepEqual(initial.onboarding.tutorial, {
      version: 1,
      status: "required",
      currentStep: 0,
      completedAt: null,
    });

    const started = appReducer(initial, {
      type: "TUTORIAL_STARTED",
      payload: { changedAt: "2026-08-02T12:00:00.000Z" },
    });
    assert.equal(started.onboarding.tutorial.status, "inProgress");
    assert.equal(selectTotalPoints(started), initialPoints);

    const invalidStep = appReducer(started, {
      type: "TUTORIAL_STEP_CHANGED",
      payload: { step: 7, changedAt: "2026-08-02T12:01:00.000Z" },
    });
    assert.equal(invalidStep, started);

    const inProgress = appReducer(started, {
      type: "TUTORIAL_STEP_CHANGED",
      payload: { step: 4, changedAt: "2026-08-02T12:02:00.000Z" },
    });
    assert.equal(inProgress.onboarding.tutorial.currentStep, 4);
    assert.equal(selectTotalPoints(inProgress), initialPoints);

    const values = new Map();
    const previousWindow = Object.getOwnPropertyDescriptor(globalThis, "window");
    Object.defineProperty(globalThis, "window", {
      configurable: true,
      value: {
        localStorage: {
          getItem(key) {
            return values.get(key) ?? null;
          },
          setItem(key, value) {
            values.set(key, String(value));
          },
          removeItem(key) {
            values.delete(key);
          },
        },
      },
    });

    try {
      savePersistedState(inProgress);
      const restored = loadPersistedState();
      assert.equal(restored.onboarding.tutorial.status, "inProgress");
      assert.equal(restored.onboarding.tutorial.currentStep, 4);
      assert.equal(selectTotalPoints(restored), initialPoints);
    } finally {
      if (previousWindow) {
        Object.defineProperty(globalThis, "window", previousWindow);
      } else {
        delete globalThis.window;
      }
    }

    const completed = appReducer(inProgress, {
      type: "TUTORIAL_COMPLETED",
      payload: { changedAt: "2026-08-02T12:03:00.000Z" },
    });
    assert.equal(completed.onboarding.tutorial.status, "completed");
    assert.equal(completed.onboarding.tutorial.currentStep, 6);
    assert.equal(
      completed.onboarding.tutorial.completedAt,
      "2026-08-02T12:03:00.000Z",
    );
    assert.equal(selectTotalPoints(completed), initialPoints);

    assert.match(page, /tour="next-step"/);
    assert.match(page, /data-tour="progress-summary"/);
    assert.match(page, /data-tour="team-shield"/);
    assert.doesNotMatch(page, /data-tour="report-button"/);
    assert.doesNotMatch(page, /Como reportar/);
    assert.match(page, /showTutorialInvitation/);
    assert.match(tutorialView, /aria-modal="true"/);
    assert.match(tutorialView, /data-has-target="false"/);
    assert.match(tutorialView, /Ir para as Missões/);
    assert.doesNotMatch(tutorialView, /Pular(?: o)? tutorial/i);
    assert.match(tutorialCatalog, /Pronto\. Sua primeira Missão está esperando/);
    assert.match(tutorialCatalog, /\[data-tour="menu-panel"\]/);
    assert.doesNotMatch(tutorialCatalog, /report-button/);
    assert.match(profile, /Rever tutorial do portal/);
    assert.match(profile, /Iniciar tutorial do portal/);
    assert.match(documentation, /## 30\. Lote 7B/);
    assert.match(documentation, /não existe botão \*\*Pular tutorial\*\*/i);
  } finally {
    await vite.close();
  }
});

test("deriva jornada, recomendações e perfil somente dos registros reais", async () => {
  const { createServer } = await import("vite");
  const vite = await createServer({
    root: fileURLToPath(projectRoot),
    configFile: false,
    server: { middlewareMode: true },
    appType: "custom",
    logLevel: "silent",
  });

  try {
    const [
      { appReducer, createDemoState },
      {
        selectCompetencyOverview,
        selectJourneyProgress,
        selectLatestMissionResult,
        selectLatestMissionRewardBreakdown,
        selectLearningHistory,
        selectLevelProgress,
        selectMainJourney,
        selectNextStep,
        selectPointOrigins,
        selectTotalPoints,
      },
    ] = await Promise.all([
      vite.ssrLoadModule("/lib/state/app-reducer.ts"),
      vite.ssrLoadModule("/lib/state/selectors.ts"),
    ]);

    const initial = createDemoState();
    const initialJourney = selectMainJourney(initial);
    assert.equal(initialJourney.length, 5);
    assert.equal(initialJourney[0].status, "available");
    assert.equal(initialJourney[1].status, "locked");
    assert.ok(
      initialJourney.slice(1).every((mission) => mission.status === "locked"),
    );
    assert.deepEqual(
      {
        completed: selectJourneyProgress(initial).completedMissions,
        percentage: selectJourneyProgress(initial).percentage,
        nextKind: selectNextStep(initial).kind,
      },
      { completed: 0, percentage: 0, nextKind: "startMission" },
    );

    const afterLowScore = appReducer(initial, {
      type: "MISSION_COMPLETED",
      payload: {
        attemptId: "attempt:low-score",
        activityId: "mission:account-lock",
        activityVersion: 1,
        completedAt: "2026-08-01T15:00:00.000Z",
        decision: "abrir",
        inspectedEvidence: [],
        selectedReasonIds: [],
      },
    });

    assert.equal(selectLatestMissionResult(afterLowScore).score, 0);
    assert.equal(selectTotalPoints(afterLowScore), 100);

    const journey = selectMainJourney(afterLowScore);
    assert.equal(journey[0].status, "completed");
    assert.equal(
      journey[1].status,
      "available",
      "a conclusão deve liberar a Missão 2 mesmo com nota zero",
    );
    assert.ok(
      journey.slice(2).every((mission) => mission.status === "locked"),
    );

    const progress = selectJourneyProgress(afterLowScore);
    assert.equal(progress.completedMissions, 1);
    assert.equal(progress.totalMissions, 5);
    assert.equal(progress.percentage, 20);
    assert.equal(progress.currentMission.id, "mission:delivery-qr");

    const nextStep = selectNextStep(afterLowScore);
    assert.equal(nextStep.kind, "adaptiveReview");
    assert.equal(nextStep.targetId, "phishlab:link-analyzer");
    assert.equal(nextStep.optional, true);
    assert.equal(nextStep.journeyAlternative.targetId, "phishlab:true-sender");
    assert.match(nextStep.description, /n.{0,4}o bloqueia/i);

    assert.deepEqual(selectLatestMissionRewardBreakdown(afterLowScore), {
      attemptId: "attempt:low-score",
      activityId: "mission:account-lock",
      basePoints: 100,
      bonusRate: 0,
      bonusPercentage: 0,
      bonusPoints: 0,
      totalPoints: 100,
      claimStatus: "granted",
      rewardGranted: true,
      grantedOnThisAttempt: true,
      grantedPoints: 100,
    });

    const level = selectLevelProgress(afterLowScore);
    assert.equal(level.currentLevel.id, "fundacao");
    assert.equal(level.totalPoints, 100);
    assert.equal(level.pointsToNextLevel, 200);
    assert.equal(level.progressPercentage, 33);

    const competencies = selectCompetencyOverview(afterLowScore);
    assert.deepEqual(
      competencies.map((competency) => competency.id),
      [
        "observar",
        "investigar",
        "verificar",
        "decidir",
        "reportar",
        "recuperar",
        "orientar",
      ],
    );
    assert.equal(competencies.length, 7);
    assert.equal(
      competencies.find((item) => item.id === "investigar").levelId,
      "developing",
    );
    assert.equal(
      competencies.find((item) => item.id === "verificar").levelId,
      "notAssessed",
    );
    assert.equal(
      competencies.find((item) => item.id === "investigar").evidenceCount,
      1,
    );

    const history = selectLearningHistory(afterLowScore);
    assert.equal(history.length, 2);
    assert.deepEqual(
      new Set(history.map((event) => event.kind)),
      new Set(["activityCompleted", "rewardGranted"]),
    );

    const pointOrigins = selectPointOrigins(afterLowScore);
    assert.equal(pointOrigins.length, 1);
    assert.deepEqual(
      {
        sourceId: pointOrigins[0].sourceId,
        category: pointOrigins[0].category,
        points: pointOrigins[0].points,
        status: pointOrigins[0].status,
      },
      {
        sourceId: "mission:account-lock",
        category: "learning",
        points: 100,
        status: "confirmed",
      },
    );
  } finally {
    await vite.close();
  }
});

test("executa o ciclo adaptativo sem bloquear a jornada nem duplicar recompensas", async () => {
  const { createServer } = await import("vite");
  const vite = await createServer({
    root: fileURLToPath(projectRoot),
    configFile: false,
    server: { middlewareMode: true },
    appType: "custom",
    logLevel: "silent",
  });

  try {
    const [
      { appReducer, createDemoState },
      {
        selectActiveReview,
        selectCompetencyOverview,
        selectJourneyProgress,
        selectLatestActivityRewardBreakdown,
        selectLatestPhishLabResult,
        selectLatestSimulationResult,
        selectNextStep,
        selectTeamShield,
        selectTotalPoints,
      },
      { WORKDAY_MESSAGES },
      { loadPersistedState, savePersistedState },
    ] = await Promise.all([
      vite.ssrLoadModule("/lib/state/app-reducer.ts"),
      vite.ssrLoadModule("/lib/state/selectors.ts"),
      vite.ssrLoadModule("/lib/content/simulation-catalog.ts"),
      vite.ssrLoadModule("/lib/state/persistence.ts"),
    ]);

    const afterMission = appReducer(createDemoState(), {
      type: "MISSION_COMPLETED",
      payload: {
        attemptId: "attempt:cycle:mission",
        activityId: "mission:account-lock",
        activityVersion: 1,
        completedAt: "2026-08-01T16:00:00.000Z",
        decision: "abrir",
        inspectedEvidence: [],
        selectedReasonIds: [],
      },
    });
    assert.equal(selectNextStep(afterMission).targetId, "phishlab:link-analyzer");
    assert.equal(selectJourneyProgress(afterMission).completedMissions, 1);

    const labSubmission = {
      attemptId: "attempt:cycle:lab",
      activityId: "phishlab:link-analyzer",
      activityVersion: 1,
      completedAt: "2026-08-01T16:20:00.000Z",
      usedTools: ["protocol", "subdomain", "registeredDomain", "path"],
      usedHint: false,
      guidedVerdict: "suspicious",
      independentVerdict: "legitimate",
      independentEvidence: ["registered-domain", "expected-context"],
    };
    const afterLab = appReducer(afterMission, {
      type: "PHISHLAB_COMPLETED",
      payload: labSubmission,
    });

    assert.equal(selectLatestPhishLabResult(afterLab).score, 100);
    assert.equal(selectTotalPoints(afterLab), 178);
    assert.equal(selectTeamShield(afterLab), 71);
    assert.equal(selectNextStep(afterLab).targetId, "phishlab:true-sender");
    assert.equal(
      selectNextStep(afterLab).href,
      "/phishlab/quem-enviou-de-verdade",
    );
    assert.deepEqual(
      {
        base: selectLatestActivityRewardBreakdown(
          afterLab,
          "phishlab:link-analyzer",
        ).basePoints,
        bonus: selectLatestActivityRewardBreakdown(
          afterLab,
          "phishlab:link-analyzer",
        ).bonusPercentage,
        total: selectLatestActivityRewardBreakdown(
          afterLab,
          "phishlab:link-analyzer",
        ).totalPoints,
      },
      { base: 60, bonus: 30, total: 78 },
    );
    assert.equal(
      selectJourneyProgress(afterLab).completedMissions,
      1,
      "PhishLab não deve avançar a jornada principal",
    );

    const successfulDecisions = WORKDAY_MESSAGES.map((message) => ({
      messageId: message.id,
      action: message.expectedAction,
      inspectedEvidence: ["sender", "link", "context"],
    }));
    const afterSimulation = appReducer(afterLab, {
      type: "SIMULATION_COMPLETED",
      payload: {
        attemptId: "attempt:cycle:simulation",
        activityId: "simulation:workday",
        activityVersion: 1,
        completedAt: "2026-08-01T16:50:00.000Z",
        messageDecisions: successfulDecisions,
      },
    });

    assert.equal(selectLatestSimulationResult(afterSimulation).score, 100);
    assert.equal(selectLatestSimulationResult(afterSimulation).falsePositives, 0);
    assert.equal(selectTotalPoints(afterSimulation), 469);
    assert.equal(selectTeamShield(afterSimulation), 71);
    assert.equal(selectActiveReview(afterSimulation), null);
    assert.equal(selectNextStep(afterSimulation).kind, "nextMission");
    assert.equal(selectNextStep(afterSimulation).targetId, "phishlab:true-sender");
    assert.equal(selectJourneyProgress(afterSimulation).completedMissions, 1);
    assert.equal(afterSimulation.learning.pointLedger.length, 5);

    const competencies = selectCompetencyOverview(afterSimulation);
    assert.ok(
      competencies.find((item) => item.id === "investigar").evidenceCount >= 3,
    );
    assert.equal(
      competencies.find((item) => item.id === "verificar").levelId,
      "consolidated",
    );

    const afterLabReplay = appReducer(afterSimulation, {
      type: "PHISHLAB_COMPLETED",
      payload: {
        ...labSubmission,
        attemptId: "attempt:cycle:lab-replay",
        completedAt: "2026-08-01T17:10:00.000Z",
      },
    });
    assert.equal(selectTotalPoints(afterLabReplay), 469);
    assert.equal(afterLabReplay.learning.pointLedger.length, 5);
    assert.equal(selectActiveReview(afterLabReplay), null);

    const afterLowSimulationReplay = appReducer(afterLabReplay, {
      type: "SIMULATION_COMPLETED",
      payload: {
        attemptId: "attempt:cycle:simulation-low",
        activityId: "simulation:workday",
        activityVersion: 1,
        completedAt: "2026-08-01T17:30:00.000Z",
        messageDecisions: WORKDAY_MESSAGES.map((message) => ({
          messageId: message.id,
          action: "delete",
          inspectedEvidence: [],
        })),
      },
    });
    assert.equal(selectTotalPoints(afterLowSimulationReplay), 469);
    assert.equal(afterLowSimulationReplay.learning.pointLedger.length, 5);
    assert.equal(selectLatestSimulationResult(afterLowSimulationReplay).needsReview, true);
    assert.equal(selectNextStep(afterLowSimulationReplay).targetId, "phishlab:link-analyzer");
    assert.equal(selectJourneyProgress(afterLowSimulationReplay).completedMissions, 1);

    const values = new Map();
    const previousWindow = Object.getOwnPropertyDescriptor(globalThis, "window");
    Object.defineProperty(globalThis, "window", {
      configurable: true,
      value: {
        localStorage: {
          getItem(key) {
            return values.get(key) ?? null;
          },
          setItem(key, value) {
            values.set(key, String(value));
          },
          removeItem(key) {
            values.delete(key);
          },
        },
      },
    });

    try {
      savePersistedState(afterLowSimulationReplay);
      assert.deepEqual(loadPersistedState(), afterLowSimulationReplay);
    } finally {
      if (previousWindow) {
        Object.defineProperty(globalThis, "window", previousWindow);
      } else {
        delete globalThis.window;
      }
    }
  } finally {
    await vite.close();
  }
});

test("agrega o desafio de Equipes com privacidade e contribuição única", async () => {
  const { createServer } = await import("vite");
  const vite = await createServer({
    root: fileURLToPath(projectRoot),
    configFile: false,
    server: { middlewareMode: true },
    appType: "custom",
    logLevel: "silent",
  });

  try {
    const [
      { appReducer, createDemoState },
      {
        selectJourneyProgress,
        selectLatestTeamChallengeResult,
        selectSectorMetrics,
        selectSectorRanking,
        selectTeamChallengeContribution,
        selectTotalPoints,
      },
      { TEAM_CHALLENGE_CASES },
      { loadPersistedState, STORAGE_KEY },
    ] = await Promise.all([
      vite.ssrLoadModule("/lib/state/app-reducer.ts"),
      vite.ssrLoadModule("/lib/state/selectors.ts"),
      vite.ssrLoadModule("/lib/content/team-challenge-catalog.ts"),
      vite.ssrLoadModule("/lib/state/persistence.ts"),
    ]);

    const initial = createDemoState();
    assert.deepEqual(selectSectorMetrics(initial), {
      participation: 65,
      precision: 80,
      coverage: 66.67,
      score: 71,
      shieldLevel: "Protegido",
    });
    assert.equal(
      selectSectorRanking(initial).find((entry) => entry.isCurrent).position,
      3,
    );

    const submission = {
      attemptId: "attempt:team:perfect",
      activityId: "team:secure-inbox",
      activityVersion: 1,
      completedAt: "2026-08-01T19:00:00.000Z",
      caseDecisions: TEAM_CHALLENGE_CASES.map((challengeCase) => ({
        caseId: challengeCase.id,
        action: challengeCase.expectedAction,
        inspectedEvidence: challengeCase.relevantEvidence,
      })),
    };
    const rejected = appReducer(initial, {
      type: "TEAM_CHALLENGE_COMPLETED",
      payload: { ...submission, caseDecisions: submission.caseDecisions.slice(1) },
    });
    assert.equal(rejected, initial);

    const afterFirst = appReducer(initial, {
      type: "TEAM_CHALLENGE_COMPLETED",
      payload: submission,
    });
    assert.equal(selectLatestTeamChallengeResult(afterFirst).score, 100);
    assert.equal(selectLatestTeamChallengeResult(afterFirst).correctDecisions, 5);
    assert.equal(selectTotalPoints(afterFirst), 304);
    assert.equal(selectJourneyProgress(afterFirst).completedMissions, 0);
    assert.deepEqual(selectSectorMetrics(afterFirst), {
      participation: 70,
      precision: 81.43,
      coverage: 100,
      score: 81,
      shieldLevel: "Resiliente",
    });
    assert.equal(afterFirst.teams.sectorAggregate.validParticipants, 14);
    assert.equal(afterFirst.teams.sectorAggregate.correctDecisions, 57);
    assert.equal(afterFirst.teams.sectorAggregate.validDecisions, 70);
    assert.equal(
      selectSectorRanking(afterFirst).find((entry) => entry.isCurrent).position,
      2,
    );
    const privateAggregate = selectTeamChallengeContribution(afterFirst);
    assert.deepEqual(Object.keys(privateAggregate).sort(), [
      "claimKey",
      "correctDecisions",
      "coveredCompetencyIds",
      "createdAt",
      "sourceId",
      "totalDecisions",
    ]);

    const afterReplay = appReducer(afterFirst, {
      type: "TEAM_CHALLENGE_COMPLETED",
      payload: {
        ...submission,
        attemptId: "attempt:team:replay",
        completedAt: "2026-08-01T19:20:00.000Z",
        caseDecisions: TEAM_CHALLENGE_CASES.map((challengeCase) => ({
          caseId: challengeCase.id,
          action: "delete",
          inspectedEvidence: [],
        })),
      },
    });
    assert.equal(selectLatestTeamChallengeResult(afterReplay).score, 0);
    assert.equal(selectTotalPoints(afterReplay), 304);
    assert.deepEqual(afterReplay.teams.sectorAggregate, afterFirst.teams.sectorAggregate);
    assert.equal(Object.keys(afterReplay.teams.aggregateClaims).length, 1);
    assert.equal(afterReplay.learning.pointLedger.length, 3);
    assert.equal(afterReplay.learning.activityProgress["team:secure-inbox"].bestScore, 100);

    const values = new Map();
    const previousWindow = Object.getOwnPropertyDescriptor(globalThis, "window");
    Object.defineProperty(globalThis, "window", {
      configurable: true,
      value: {
        localStorage: {
          getItem(key) {
            return values.get(key) ?? null;
          },
          setItem(key, value) {
            values.set(key, String(value));
          },
          removeItem(key) {
            values.delete(key);
          },
        },
      },
    });

    try {
      const legacy = structuredClone(initial);
      legacy.meta.schemaVersion = 1;
      legacy.meta.revision = 7;
      legacy.demo.learner.name = "Pessoa migrada";
      delete legacy.teams.aggregateClaims;
      delete legacy.teams.sectorAggregate;
      delete legacy.teams.ranking;
      delete legacy.teams.activeGoal;
      delete legacy.teams.history;
      values.set(
        STORAGE_KEY,
        JSON.stringify({
          schemaVersion: 1,
          appVersion: "mvp-local-v1",
          savedAt: "2026-08-01T19:30:00.000Z",
          state: legacy,
        }),
      );
      const migrated = loadPersistedState();
      assert.equal(migrated.meta.schemaVersion, 15);
      assert.equal(migrated.onboarding.tutorial.status, "available");
      assert.equal(migrated.meta.revision, 7);
      assert.equal(migrated.demo.learner.name, "Pessoa migrada");
      assert.equal(selectSectorMetrics(migrated).score, 71);
      assert.deepEqual(migrated.learning, initial.learning);
    } finally {
      if (previousWindow) {
        Object.defineProperty(globalThis, "window", previousWindow);
      } else {
        delete globalThis.window;
      }
    }
  } finally {
    await vite.close();
  }
});

test("valida Mudanca bancaria sem atalho, privacidade e coexistencia do agregado", async () => {
  const { createServer } = await import("vite");
  const vite = await createServer({
    root: fileURLToPath(projectRoot),
    configFile: false,
    server: { middlewareMode: true },
    appType: "custom",
    logLevel: "silent",
  });

  try {
    const [
      { appReducer, createDemoState },
      {
        selectBankChangeContribution,
        selectLatestBankChangeResult,
      },
      {
        BANK_CHANGE_ACTIVITY_ID,
        BANK_CHANGE_ACTIVITY_VERSION,
        BANK_CHANGE_CORRECT_CHOICES,
        BANK_CHANGE_EVIDENCE,
      },
      {
        BANK_CHANGE_AGGREGATE_CLAIM,
        BANK_CHANGE_REWARD_CLAIM,
        evaluateBankChange,
        isValidBankChangeSubmission,
      },
      { TEAM_CHALLENGE_CASES },
      { loadPersistedState, STORAGE_KEY },
    ] = await Promise.all([
      vite.ssrLoadModule("/lib/state/app-reducer.ts"),
      vite.ssrLoadModule("/lib/state/selectors.ts"),
      vite.ssrLoadModule("/lib/content/bank-change-catalog.ts"),
      vite.ssrLoadModule("/lib/domain/rules.ts"),
      vite.ssrLoadModule("/lib/content/team-challenge-catalog.ts"),
      vite.ssrLoadModule("/lib/state/persistence.ts"),
    ]);

    const perfectSubmission = {
      attemptId: "attempt:bank-change:perfect",
      activityId: BANK_CHANGE_ACTIVITY_ID,
      activityVersion: BANK_CHANGE_ACTIVITY_VERSION,
      completedAt: "2026-08-07T10:00:00.000Z",
      ...BANK_CHANGE_CORRECT_CHOICES,
      inspectedEvidenceIds: BANK_CHANGE_EVIDENCE.map((evidence) => evidence.id),
    };
    assert.equal(isValidBankChangeSubmission(perfectSubmission), true);
    assert.equal(
      isValidBankChangeSubmission({
        ...perfectSubmission,
        inspectedEvidenceIds: ["vendor-record", "vendor-record"],
      }),
      false,
    );
    assert.equal(
      isValidBankChangeSubmission({
        ...perfectSubmission,
        activityId: "team:invented",
      }),
      false,
    );

    const perfectResult = evaluateBankChange(perfectSubmission);
    assert.deepEqual(perfectResult, {
      score: 100,
      correctDecisions: 5,
      totalDecisions: 5,
      stageScores: {
        "initial-action": 20,
        "evidence-assessment": 20,
        "verification-route": 25,
        "process-action": 20,
        "report-action": 15,
      },
      competencyScores: {
        verificar: 100,
        decidir: 100,
        reportar: 100,
        orientar: 100,
      },
      coveredCompetencyIds: [
        "verificar",
        "decidir",
        "reportar",
        "orientar",
      ],
      needsReview: false,
      criticalFailureStageIds: [],
      potentialReward: 104,
    });

    const unsafeSubmission = {
      ...perfectSubmission,
      attemptId: "attempt:bank-change:unsafe",
      completedAt: "2026-08-07T10:20:00.000Z",
      initialActionId: "apply-now",
      evidenceAssessmentId: "thread-proves-identity",
      verificationRouteId: "request-contact",
      processActionId: "update-and-review-later",
      reportActionId: "team-chat-forward",
      inspectedEvidenceIds: ["request-context"],
    };
    const unsafeResult = evaluateBankChange(unsafeSubmission);
    assert.equal(unsafeResult.score, 0);
    assert.equal(unsafeResult.correctDecisions, 0);
    assert.equal(unsafeResult.needsReview, true);
    assert.deepEqual(unsafeResult.criticalFailureStageIds, [
      "initial-action",
      "verification-route",
      "process-action",
      "report-action",
    ]);
    assert.deepEqual(unsafeResult.coveredCompetencyIds, []);
    assert.equal(unsafeResult.potentialReward, 80);

    const initial = createDemoState();
    const rejected = appReducer(initial, {
      type: "BANK_CHANGE_COMPLETED",
      payload: {
        ...perfectSubmission,
        inspectedEvidenceIds: ["vendor-record", "vendor-record"],
      },
    });
    assert.equal(rejected, initial);

    const afterBank = appReducer(initial, {
      type: "BANK_CHANGE_COMPLETED",
      payload: perfectSubmission,
    });
    assert.equal(selectLatestBankChangeResult(afterBank).score, 100);
    assert.equal(
      afterBank.learning.rewardClaims[BANK_CHANGE_REWARD_CLAIM].points,
      104,
    );
    assert.equal(
      afterBank.learning.pointLedger.filter(
        (entry) => entry.sourceId === BANK_CHANGE_ACTIVITY_ID,
      ).length,
      1,
    );
    assert.equal(afterBank.teams.sectorAggregate.validParticipants, 14);
    assert.equal(afterBank.teams.sectorAggregate.correctDecisions, 57);
    assert.equal(afterBank.teams.sectorAggregate.validDecisions, 70);

    const privateAggregate = selectBankChangeContribution(afterBank);
    assert.deepEqual(Object.keys(privateAggregate).sort(), [
      "claimKey",
      "correctDecisions",
      "coveredCompetencyIds",
      "createdAt",
      "sourceId",
      "totalDecisions",
    ]);
    assert.equal(privateAggregate.claimKey, BANK_CHANGE_AGGREGATE_CLAIM);
    for (const privateKey of [
      "attemptId",
      "learnerId",
      "score",
      "stageScores",
      "initialActionId",
      "verificationRouteId",
      "inspectedEvidenceIds",
    ]) {
      assert.equal(privateKey in privateAggregate, false, privateKey);
    }

    const duplicateAttempt = appReducer(afterBank, {
      type: "BANK_CHANGE_COMPLETED",
      payload: perfectSubmission,
    });
    assert.equal(duplicateAttempt, afterBank);

    const afterUnsafeReplay = appReducer(afterBank, {
      type: "BANK_CHANGE_COMPLETED",
      payload: unsafeSubmission,
    });
    assert.equal(selectLatestBankChangeResult(afterUnsafeReplay).score, 0);
    assert.equal(
      afterUnsafeReplay.learning.pointLedger.filter(
        (entry) => entry.sourceId === BANK_CHANGE_ACTIVITY_ID,
      ).length,
      1,
    );
    assert.deepEqual(
      afterUnsafeReplay.teams.sectorAggregate,
      afterBank.teams.sectorAggregate,
    );
    assert.deepEqual(
      afterUnsafeReplay.teams.aggregateClaims[BANK_CHANGE_AGGREGATE_CLAIM],
      afterBank.teams.aggregateClaims[BANK_CHANGE_AGGREGATE_CLAIM],
    );
    assert.equal(
      afterUnsafeReplay.learning.activityProgress[BANK_CHANGE_ACTIVITY_ID]
        .bestScore,
      100,
    );
    assert.equal(
      afterUnsafeReplay.learning.activityProgress[BANK_CHANGE_ACTIVITY_ID]
        .attemptIds.length,
      2,
    );

    const legacySubmission = {
      attemptId: "attempt:team:coexistence",
      activityId: "team:secure-inbox",
      activityVersion: 1,
      completedAt: "2026-08-07T10:40:00.000Z",
      caseDecisions: TEAM_CHALLENGE_CASES.map((challengeCase) => ({
        caseId: challengeCase.id,
        action: challengeCase.expectedAction,
        inspectedEvidence: challengeCase.relevantEvidence,
      })),
    };
    const afterBankThenLegacy = appReducer(afterBank, {
      type: "TEAM_CHALLENGE_COMPLETED",
      payload: legacySubmission,
    });
    assert.equal(afterBankThenLegacy.teams.sectorAggregate.validParticipants, 14);
    assert.equal(afterBankThenLegacy.teams.sectorAggregate.correctDecisions, 62);
    assert.equal(afterBankThenLegacy.teams.sectorAggregate.validDecisions, 75);
    assert.equal(
      Object.keys(afterBankThenLegacy.teams.aggregateClaims).length,
      2,
    );

    const afterLegacy = appReducer(createDemoState(), {
      type: "TEAM_CHALLENGE_COMPLETED",
      payload: legacySubmission,
    });
    const afterLegacyThenBank = appReducer(afterLegacy, {
      type: "BANK_CHANGE_COMPLETED",
      payload: perfectSubmission,
    });
    assert.equal(afterLegacyThenBank.teams.sectorAggregate.validParticipants, 14);
    assert.equal(afterLegacyThenBank.teams.sectorAggregate.correctDecisions, 62);
    assert.equal(afterLegacyThenBank.teams.sectorAggregate.validDecisions, 75);

    const values = new Map();
    const previousWindow = Object.getOwnPropertyDescriptor(globalThis, "window");
    Object.defineProperty(globalThis, "window", {
      configurable: true,
      value: {
        localStorage: {
          getItem(key) {
            return values.get(key) ?? null;
          },
          setItem(key, value) {
            values.set(key, String(value));
          },
          removeItem(key) {
            values.delete(key);
          },
        },
      },
    });

    try {
      const legacyV5 = structuredClone(afterLegacy);
      legacyV5.meta.schemaVersion = 5;
      values.set(
        STORAGE_KEY,
        JSON.stringify({
          schemaVersion: 5,
          appVersion: "mvp-local-v5",
          savedAt: "2026-08-07T11:00:00.000Z",
          state: legacyV5,
        }),
      );
      const migratedV5 = loadPersistedState();
      assert.equal(migratedV5.meta.schemaVersion, 15);
      assert.deepEqual(migratedV5.learning, afterLegacy.learning);
      assert.deepEqual(migratedV5.teams, afterLegacy.teams);
      assert.deepEqual(migratedV5.preferences, afterLegacy.preferences);
      assert.deepEqual(migratedV5.onboarding, afterLegacy.onboarding);
    } finally {
      if (previousWindow) {
        Object.defineProperty(globalThis, "window", previousWindow);
      } else {
        delete globalThis.window;
      }
    }
  } finally {
    await vite.close();
  }
});

test("agrupa a atividade recente, preserva recompensas e integra a contribuição de Equipes", async () => {
  const { createServer } = await import("vite");
  const vite = await createServer({
    root: fileURLToPath(projectRoot),
    configFile: false,
    server: { middlewareMode: true },
    appType: "custom",
    logLevel: "silent",
  });

  try {
    const [
      { appReducer, createDemoState },
      { selectActivityTimeline, selectRecentActivity, selectTotalPoints },
      { TEAM_CHALLENGE_CASES },
    ] = await Promise.all([
      vite.ssrLoadModule("/lib/state/app-reducer.ts"),
      vite.ssrLoadModule("/lib/state/selectors.ts"),
      vite.ssrLoadModule("/lib/content/team-challenge-catalog.ts"),
    ]);

    const initial = createDemoState();
    assert.equal(initial.meta.schemaVersion, 15);
    assert.deepEqual(selectActivityTimeline(initial), []);

    const afterTutorial = appReducer(initial, {
      type: "TUTORIAL_STARTED",
      payload: { changedAt: "2026-08-03T12:00:00.000Z" },
    });
    assert.deepEqual(selectActivityTimeline(afterTutorial), []);

    const firstMission = appReducer(afterTutorial, {
      type: "MISSION_COMPLETED",
      payload: {
        attemptId: "attempt:timeline:mission:1",
        activityId: "mission:account-lock",
        activityVersion: 1,
        completedAt: "2026-08-03T12:10:00.000Z",
        decision: "verificar",
        inspectedEvidence: ["sender", "link", "context"],
        selectedReasonIds: ["domain", "urgency", "destination"],
      },
    });
    const firstTimeline = selectActivityTimeline(firstMission);
    const firstMissionItem = firstTimeline.find(
      (item) => item.sourceId === "mission:account-lock",
    );
    const achievementItem = firstTimeline.find(
      (item) => item.kind === "achievement",
    );
    assert.ok(firstMissionItem);
    assert.equal(firstMissionItem.attemptCount, 1);
    assert.equal(firstMissionItem.latestScore, 92);
    assert.equal(firstMissionItem.bestScore, 92);
    assert.equal(firstMissionItem.confirmedPoints, 130);
    assert.equal(firstMissionItem.href, "/missoes/aviso-de-bloqueio");
    assert.match(firstMissionItem.detail, /competências praticadas/);
    assert.ok(achievementItem);
    assert.equal(achievementItem.confirmedPoints, 100);
    assert.equal(achievementItem.href, "/perfil/conquistas");

    const pointsAfterFirst = selectTotalPoints(firstMission);
    const afterReplay = appReducer(firstMission, {
      type: "MISSION_COMPLETED",
      payload: {
        attemptId: "attempt:timeline:mission:2",
        activityId: "mission:account-lock",
        activityVersion: 1,
        completedAt: "2026-08-03T12:20:00.000Z",
        decision: "abrir",
        inspectedEvidence: [],
        selectedReasonIds: [],
      },
    });
    const replayTimeline = selectActivityTimeline(afterReplay);
    const replayMissionItems = replayTimeline.filter(
      (item) => item.sourceId === "mission:account-lock",
    );
    assert.equal(replayMissionItems.length, 1);
    assert.equal(replayMissionItems[0].attemptCount, 2);
    assert.equal(replayMissionItems[0].latestScore, 0);
    assert.equal(replayMissionItems[0].bestScore, 92);
    assert.equal(replayMissionItems[0].confirmedPoints, 130);
    assert.match(replayMissionItems[0].detail, /repetição não concedeu novos pontos/);
    assert.equal(selectTotalPoints(afterReplay), pointsAfterFirst);

    const afterTeam = appReducer(afterReplay, {
      type: "TEAM_CHALLENGE_COMPLETED",
      payload: {
        attemptId: "attempt:timeline:team:1",
        activityId: "team:secure-inbox",
        activityVersion: 1,
        completedAt: "2026-08-03T12:30:00.000Z",
        caseDecisions: TEAM_CHALLENGE_CASES.map((challengeCase) => ({
          caseId: challengeCase.id,
          action: challengeCase.expectedAction,
          inspectedEvidence: challengeCase.relevantEvidence,
        })),
      },
    });
    const teamItem = selectActivityTimeline(afterTeam).find(
      (item) => item.sourceId === "team:secure-inbox",
    );
    assert.ok(teamItem);
    assert.equal(teamItem.hasTeamContribution, true);
    assert.equal(teamItem.href, "/equipes/caixa-de-entrada-segura");
    assert.match(teamItem.detail, /Participação agregada registrada/);
    assert.equal(selectRecentActivity(afterTeam, 1).length, 1);
    assert.equal(selectRecentActivity(afterTeam, 1)[0].sourceId, "team:secure-inbox");

    const [page, profile, documentation] = await Promise.all([
      readFile(new URL("app/page.tsx", projectRoot), "utf8"),
      readFile(new URL("features/profile/ProfileView.tsx", projectRoot), "utf8"),
      readFile(new URL("DOCUMENTACAO-PLATAFORMA.md", projectRoot), "utf8"),
    ]);
    assert.match(page, /selectRecentActivity/);
    assert.match(page, /activityTimeline\.map\(toActivityView\)/);
    assert.doesNotMatch(page, /learningHistory\.slice\(0, 6\)/);
    assert.match(profile, /model\.history\.slice\(0, 3\)/);
    assert.match(profile, /Histórico de atividades/);
    assert.match(documentation, /## 31\. Lote 7C/);
    assert.match(documentation, /esquema persistido permanecer na versão 4/);
  } finally {
    await vite.close();
  }
});

test("conclui o primeiro recorte de Confiança sob pressão com contratos versionados", async () => {
  const { createServer } = await import("vite");
  const vite = await createServer({
    root: fileURLToPath(projectRoot),
    configFile: false,
    server: { middlewareMode: true },
    appType: "custom",
    logLevel: "silent",
  });

  try {
    const [
      { appReducer, createDemoState },
      {
        selectActiveReview,
        selectActivityTimeline,
        selectLatestMissionResult,
        selectLatestPhishLabResult,
        selectNextStep,
      },
      {
        evaluateMission,
        evaluatePhishLab,
        COMPROMISED_CONVERSATION_MISSION_ID,
        SENDER_INSPECTOR_ACTIVITY_ID,
      },
      { loadPersistedState, savePersistedState },
    ] = await Promise.all([
      vite.ssrLoadModule("/lib/state/app-reducer.ts"),
      vite.ssrLoadModule("/lib/state/selectors.ts"),
      vite.ssrLoadModule("/lib/domain/rules.ts"),
      vite.ssrLoadModule("/lib/state/persistence.ts"),
    ]);

    const perfectMissionSubmission = {
      attemptId: "attempt:pressure:mission:perfect",
      activityId: COMPROMISED_CONVERSATION_MISSION_ID,
      activityVersion: 1,
      completedAt: "2026-08-04T12:00:00.000Z",
      decision: "reportar",
      inspectedEvidence: ["sender", "link", "context"],
      selectedReasonIds: ["domain", "urgency", "destination"],
    };
    assert.deepEqual(
      {
        score: evaluateMission(perfectMissionSubmission).score,
        reward: evaluateMission(perfectMissionSubmission).potentialReward,
      },
      { score: 100, reward: 130 },
    );

    const initial = createDemoState();
    const rejectedMission = appReducer(initial, {
      type: "MISSION_COMPLETED",
      payload: {
        ...perfectMissionSubmission,
        activityId: "mission:unknown-pressure-case",
      },
    });
    assert.equal(rejectedMission, initial);

    const afterMission = appReducer(initial, {
      type: "MISSION_COMPLETED",
      payload: {
        ...perfectMissionSubmission,
        attemptId: "attempt:pressure:mission:first",
        decision: "abrir",
        inspectedEvidence: [],
        selectedReasonIds: [],
      },
    });
    assert.equal(
      selectLatestMissionResult(
        afterMission,
        COMPROMISED_CONVERSATION_MISSION_ID,
      ).score,
      0,
    );
    assert.equal(
      afterMission.learning.activityProgress[
        COMPROMISED_CONVERSATION_MISSION_ID
      ].status,
      "completed",
    );
    assert.equal(
      Object.values(afterMission.learning.rewardClaims).find(
        (claim) => claim.sourceId === COMPROMISED_CONVERSATION_MISSION_ID,
      ).points,
      100,
    );
    assert.equal(
      selectActiveReview(afterMission).targetActivityId,
      SENDER_INSPECTOR_ACTIVITY_ID,
    );

    const perfectSenderLabSubmission = {
      attemptId: "attempt:pressure:sender:first",
      activityId: SENDER_INSPECTOR_ACTIVITY_ID,
      activityVersion: 1,
      completedAt: "2026-08-04T12:20:00.000Z",
      usedTools: ["displayName", "fromAddress", "replyTo", "messageContext"],
      usedHint: false,
      guidedVerdict: "suspicious",
      independentVerdict: "inconclusive",
      independentEvidence: ["known-address", "changed-request"],
    };
    assert.deepEqual(
      {
        score: evaluatePhishLab(perfectSenderLabSubmission).score,
        reward: evaluatePhishLab(perfectSenderLabSubmission).potentialReward,
      },
      { score: 100, reward: 78 },
    );

    const rejectedLab = appReducer(afterMission, {
      type: "PHISHLAB_COMPLETED",
      payload: {
        ...perfectSenderLabSubmission,
        activityId: "phishlab:unknown-sender-case",
      },
    });
    assert.equal(rejectedLab, afterMission);

    const afterLab = appReducer(afterMission, {
      type: "PHISHLAB_COMPLETED",
      payload: perfectSenderLabSubmission,
    });
    assert.equal(
      selectLatestPhishLabResult(afterLab, SENDER_INSPECTOR_ACTIVITY_ID).score,
      100,
    );
    assert.equal(
      Object.values(afterLab.learning.rewardClaims).find(
        (claim) => claim.sourceId === SENDER_INSPECTOR_ACTIVITY_ID,
      ).points,
      78,
    );
    assert.equal(
      afterLab.learning.recommendations[
        `review:${COMPROMISED_CONVERSATION_MISSION_ID}`
      ].status,
      "completed",
    );
    assert.equal(selectActiveReview(afterLab), null);
    assert.deepEqual(
      {
        target: selectNextStep(afterLab).targetId,
        optional: selectNextStep(afterLab).optional,
      },
      {
        target: "mission:account-lock",
        optional: false,
      },
    );
    const senderTimeline = selectActivityTimeline(afterLab).find(
      (item) => item.sourceId === SENDER_INSPECTOR_ACTIVITY_ID,
    );
    assert.equal(senderTimeline.href, "/phishlab/quem-enviou-de-verdade");
    assert.match(senderTimeline.title, /^Quem enviou de verdade\?/);

    const afterReplay = appReducer(afterLab, {
      type: "PHISHLAB_COMPLETED",
      payload: {
        ...perfectSenderLabSubmission,
        attemptId: "attempt:pressure:sender:replay",
        completedAt: "2026-08-04T12:30:00.000Z",
      },
    });
    assert.equal(
      afterReplay.learning.pointLedger.filter(
        (entry) => entry.sourceId === SENDER_INSPECTOR_ACTIVITY_ID,
      ).length,
      1,
    );
    assert.equal(
      Object.values(afterReplay.teams.contributionClaims).filter(
        (claim) => claim.sourceId === SENDER_INSPECTOR_ACTIVITY_ID,
      ).length,
      1,
    );
    assert.equal(
      afterReplay.learning.attempts["attempt:pressure:sender:replay"].result
        .teamPoints,
      0,
    );

    const values = new Map();
    const previousWindow = Object.getOwnPropertyDescriptor(globalThis, "window");
    Object.defineProperty(globalThis, "window", {
      configurable: true,
      value: {
        localStorage: {
          getItem(key) {
            return values.get(key) ?? null;
          },
          setItem(key, value) {
            values.set(key, String(value));
          },
          removeItem(key) {
            values.delete(key);
          },
        },
      },
    });

    try {
      savePersistedState(afterReplay);
      const restored = loadPersistedState();
      assert.equal(restored.meta.schemaVersion, 15);
      assert.deepEqual(restored, afterReplay);
    } finally {
      if (previousWindow) {
        Object.defineProperty(globalThis, "window", previousWindow);
      } else {
        delete globalThis.window;
      }
    }

    const documentation = await readFile(
      new URL("DOCUMENTACAO-PLATAFORMA.md", projectRoot),
      "utf8",
    );
    assert.match(
      documentation,
      /## 33\. Primeiro recorte funcional de Confiança sob pressão/,
    );
    assert.match(documentation, /APP_SCHEMA_VERSION = 4/);
    assert.match(documentation, /Arcade permanece inalterado/i);
  } finally {
    await vite.close();
  }
});

test("libera e conclui Você iniciou este acesso? somente depois dos dois PhishLabs", async () => {
  const { createServer } = await import("vite");
  const vite = await createServer({
    root: fileURLToPath(projectRoot),
    configFile: false,
    server: { middlewareMode: true },
    appType: "custom",
    logLevel: "silent",
  });

  try {
    const mfaPlayerSource = await readFile(
      new URL("features/missions/MfaFatigueMission.tsx", projectRoot),
      "utf8",
    );
    assert.match(mfaPlayerSource, /Compare os dados do pedido com seu acesso/);
    assert.match(mfaPlayerSource, /Chegou uma mensagem do suporte/);
    assert.match(mfaPlayerSource, /Abra a área de segurança da conta/);
    assert.match(mfaPlayerSource, /Separe as informações para a equipe/);
    assert.match(mfaPlayerSource, /onOpenRecovery/);
    assert.doesNotMatch(mfaPlayerSource, /Negar&nbsp;&nbsp; Aprovar/);

    const [
      { appReducer, createDemoState },
      {
        selectActiveReview,
        selectActivityTimeline,
        selectLatestMfaConsoleResult,
      },
      {
        evaluateMfaConsoleV2,
        MFA_FATIGUE_MISSION_ID,
        SENDER_INSPECTOR_ACTIVITY_ID,
      },
      { getCurriculumPresentation },
      {
        MFA_CONSOLE_CANONICAL_PACKAGE_ID,
      },
    ] = await Promise.all([
      vite.ssrLoadModule("/lib/state/app-reducer.ts"),
      vite.ssrLoadModule("/lib/state/selectors.ts"),
      vite.ssrLoadModule("/lib/domain/rules.ts"),
      vite.ssrLoadModule("/lib/content/curriculum-catalog.ts"),
      vite.ssrLoadModule("/lib/content/activities/mfa-console/v2.ts"),
    ]);

    const perfectMissionSubmission = {
      attemptId: "attempt:mfa:mission:perfect",
      activityId: MFA_FATIGUE_MISSION_ID,
      activityVersion: 2,
      casePackageId: MFA_CONSOLE_CANONICAL_PACKAGE_ID,
      completedAt: "2026-08-05T10:30:00.000Z",
      mechanicId: "mfa-console",
      eventInitiationAssociations: [
        { eventId: "p2-event-1", associationId: "no-self-action" },
        { eventId: "p2-event-2", associationId: "no-self-action" },
        { eventId: "p2-event-3", associationId: "no-self-action" },
      ],
      eventActions: [
        { eventId: "p2-event-1", actionId: "deny" },
        { eventId: "p2-event-2", actionId: "deny" },
        { eventId: "p2-event-3", actionId: "deny" },
      ],
      supportResponseIds: ["end-contact"],
      officialEntryRouteId: "known-security-area",
      officialConsoleActionIds: [
        "review-events",
        "end-unrecognized-sessions",
      ],
      reportDetailIds: [
        "event-times",
        "device-and-location",
        "support-contact",
        "actions-taken",
      ],
      transferAssociationId: "no-self-action",
      transferActionId: "deny-and-open-official",
    };
    assert.deepEqual(
      {
        score: evaluateMfaConsoleV2(perfectMissionSubmission).score,
        reward: evaluateMfaConsoleV2(perfectMissionSubmission).potentialReward,
      },
      { score: 100, reward: 130 },
    );

    const initial = createDemoState();
    const blockedWithoutLabs = appReducer(initial, {
      type: "MFA_CONSOLE_V2_COMPLETED",
      payload: perfectMissionSubmission,
    });
    assert.equal(blockedWithoutLabs, initial);

    const senderSubmission = {
      attemptId: "attempt:mfa:sender-prerequisite",
      activityId: SENDER_INSPECTOR_ACTIVITY_ID,
      activityVersion: 1,
      completedAt: "2026-08-05T10:00:00.000Z",
      usedTools: ["displayName", "fromAddress", "replyTo", "messageContext"],
      usedHint: false,
      guidedVerdict: "suspicious",
      independentVerdict: "inconclusive",
      independentEvidence: ["known-address", "changed-request"],
    };
    const afterSender = appReducer(initial, {
      type: "PHISHLAB_COMPLETED",
      payload: senderSubmission,
    });
    const stillLocked = getCurriculumPresentation(
      new Set([SENDER_INSPECTOR_ACTIVITY_ID]),
    );
    assert.equal(stillLocked[4].presentationStatus, "locked");

    const domainSubmission = {
      attemptId: "attempt:mfa:domain-prerequisite",
      activityId: "phishlab:link-analyzer",
      activityVersion: 1,
      completedAt: "2026-08-05T10:15:00.000Z",
      usedTools: ["protocol", "subdomain", "registeredDomain", "path"],
      usedHint: false,
      guidedVerdict: "suspicious",
      independentVerdict: "legitimate",
      independentEvidence: ["registered-domain", "expected-context"],
    };
    const afterLabs = appReducer(afterSender, {
      type: "PHISHLAB_COMPLETED",
      payload: domainSubmission,
    });
    const available = getCurriculumPresentation(
      new Set([SENDER_INSPECTOR_ACTIVITY_ID, "phishlab:link-analyzer"]),
    );
    assert.equal(available[4].presentationStatus, "available");

    const afterMission = appReducer(afterLabs, {
      type: "MFA_CONSOLE_V2_COMPLETED",
      payload: perfectMissionSubmission,
    });
    assert.equal(
      selectLatestMfaConsoleResult(afterMission).score,
      100,
    );
    assert.equal(
      afterMission.learning.activityProgress[MFA_FATIGUE_MISSION_ID].status,
      "completed",
    );
    assert.equal(
      Object.values(afterMission.learning.rewardClaims).find(
        (claim) => claim.sourceId === MFA_FATIGUE_MISSION_ID,
      ).points,
      130,
    );
    assert.equal(
      afterMission.learning.recommendations[
        `review:${MFA_FATIGUE_MISSION_ID}`
      ],
      undefined,
    );

    const timelineItem = selectActivityTimeline(afterMission).find(
      (item) => item.sourceId === MFA_FATIGUE_MISSION_ID,
    );
    assert.equal(
      timelineItem.href,
      "/missoes/voce-iniciou-este-acesso",
    );
    assert.match(timelineItem.title, /^Você iniciou este acesso\?/);

    const afterUnsafeReplay = appReducer(afterMission, {
      type: "MFA_CONSOLE_V2_COMPLETED",
      payload: {
        ...perfectMissionSubmission,
        attemptId: "attempt:mfa:mission:unsafe-replay",
        completedAt: "2026-08-05T10:40:00.000Z",
        eventActions: [
          { eventId: "p2-event-1", actionId: "approve" },
          { eventId: "p2-event-2", actionId: "deny" },
          { eventId: "p2-event-3", actionId: "deny" },
        ],
        supportResponseIds: ["share-code", "end-contact"],
        officialEntryRouteId: "message-link",
        officialConsoleActionIds: ["keep-everything"],
        reportDetailIds: ["password-or-code"],
        transferAssociationId: "active-self-action",
        transferActionId: "approve",
      },
    });
    assert.equal(
      afterUnsafeReplay.learning.pointLedger.filter(
        (entry) => entry.sourceId === MFA_FATIGUE_MISSION_ID,
      ).length,
      1,
    );
    assert.equal(
      Object.values(afterUnsafeReplay.teams.contributionClaims).filter(
        (claim) => claim.sourceId === MFA_FATIGUE_MISSION_ID,
      ).length,
      1,
    );
    assert.equal(
      selectActiveReview(afterUnsafeReplay).targetActivityId,
      SENDER_INSPECTOR_ACTIVITY_ID,
    );

    const documentation = await readFile(
      new URL("DOCUMENTACAO-PLATAFORMA.md", projectRoot),
      "utf8",
    );
    assert.match(documentation, /## 34\. Segundo recorte funcional/);
    assert.match(documentation, /mission:mfa-fatigue/);
    assert.match(
      documentation,
      /44\.13 Revis.o de clareza da vers.o 1 de Voc. iniciou este acesso/,
    );
    assert.match(documentation, /cinco atividades disponíveis e duas em produção/);
  } finally {
    await vite.close();
  }
});

test("migra o envelope local v10 para v11 sem fabricar atividade", async () => {
  const { createServer } = await import("vite");
  const vite = await createServer({
    root: fileURLToPath(projectRoot),
    configFile: false,
    server: { middlewareMode: true },
    appType: "custom",
    logLevel: "silent",
  });

  const previousWindow = globalThis.window;
  const values = new Map();
  try {
    const [{ createDemoState }, { loadPersistedState, STORAGE_KEY }] =
      await Promise.all([
        vite.ssrLoadModule("/lib/state/app-reducer.ts"),
        vite.ssrLoadModule("/lib/state/persistence.ts"),
      ]);
    const legacyV10 = createDemoState();
    legacyV10.meta.schemaVersion = 10;
    values.set(
      STORAGE_KEY,
      JSON.stringify({
        schemaVersion: 10,
        appVersion: "mvp-local-v10",
        savedAt: "2026-08-15T19:00:00.000Z",
        state: legacyV10,
      }),
    );
    Object.defineProperty(globalThis, "window", {
      configurable: true,
      value: {
        localStorage: {
          getItem: (key) => values.get(key) ?? null,
          setItem: (key, value) => values.set(key, value),
          removeItem: (key) => values.delete(key),
        },
      },
    });

    const migrated = loadPersistedState();
    const expected = structuredClone(legacyV10);
    expected.meta.schemaVersion = 15;
    assert.deepEqual(migrated, expected);
    assert.equal(Object.keys(migrated.learning.attempts).length, 0);
    assert.equal(Object.keys(migrated.learning.rewardClaims).length, 0);
  } finally {
    if (previousWindow === undefined) {
      delete globalThis.window;
    } else {
      Object.defineProperty(globalThis, "window", {
        configurable: true,
        value: previousWindow,
      });
    }
    await vite.close();
  }
});

test("adapta a recuperação aos quatro incidentes e preserva as migrações anteriores", async () => {
  const { createServer } = await import("vite");
  const vite = await createServer({
    root: fileURLToPath(projectRoot),
    configFile: false,
    server: { middlewareMode: true },
    appType: "custom",
    logLevel: "silent",
  });

  try {
    const [
      { appReducer, createDemoState },
      {
        selectActiveReview,
        selectActivityTimeline,
        selectBestMissionSummary,
        selectLatestRecoveryMissionResult,
      },
      {
        evaluateRecoveryMission,
        RECOVERY_MISSION_ID,
      },
      { RECOVERY_INCIDENTS, RECOVERY_REPORT_DETAIL_OPTIONS },
      { loadPersistedState, savePersistedState, STORAGE_KEY },
    ] = await Promise.all([
      vite.ssrLoadModule("/lib/state/app-reducer.ts"),
      vite.ssrLoadModule("/lib/state/selectors.ts"),
      vite.ssrLoadModule("/lib/domain/rules.ts"),
      vite.ssrLoadModule("/lib/content/recovery-mission-catalog.ts"),
      vite.ssrLoadModule("/lib/state/persistence.ts"),
    ]);

    const safeReportDetailIds = RECOVERY_REPORT_DETAIL_OPTIONS.filter(
      (item) => item.safe,
    ).map((item) => item.id);

    for (const [index, incident] of RECOVERY_INCIDENTS.entries()) {
      const result = evaluateRecoveryMission({
        attemptId: `attempt:recovery:path:${index}`,
        activityId: RECOVERY_MISSION_ID,
        activityVersion: 1,
        completedAt: `2026-08-06T10:0${index}:00.000Z`,
        incidentType: incident.id,
        immediateActionId: "report-now",
        selectedRecoveryActionIds: [...incident.expectedActionIds],
        selectedReportDetailIds: safeReportDetailIds,
      });
      assert.deepEqual(
        {
          score: result.score,
          reward: result.potentialReward,
          review: result.needsReview,
        },
        { score: 100, reward: 130, review: false },
      );
    }

    assert.throws(() =>
      evaluateRecoveryMission({
        attemptId: "attempt:recovery:invalid",
        activityId: RECOVERY_MISSION_ID,
        activityVersion: 1,
        completedAt: "2026-08-06T10:10:00.000Z",
        incidentType: "clicked-link",
        immediateActionId: "report-now",
        selectedRecoveryActionIds: ["stop-interaction", "stop-interaction"],
        selectedReportDetailIds: ["received-channel"],
      }),
    );

    const initial = createDemoState();
    const credentialIncident = RECOVERY_INCIDENTS.find(
      (item) => item.id === "entered-credentials",
    );
    const perfectSubmission = {
      attemptId: "attempt:recovery:first",
      activityId: RECOVERY_MISSION_ID,
      activityVersion: 1,
      completedAt: "2026-08-06T10:20:00.000Z",
      incidentType: credentialIncident.id,
      immediateActionId: "report-now",
      selectedRecoveryActionIds: [...credentialIncident.expectedActionIds],
      selectedReportDetailIds: safeReportDetailIds,
    };
    const afterFirst = appReducer(initial, {
      type: "RECOVERY_MISSION_COMPLETED",
      payload: perfectSubmission,
    });
    assert.equal(
      selectLatestRecoveryMissionResult(afterFirst).score,
      100,
    );
    assert.equal(
      afterFirst.learning.activityProgress[RECOVERY_MISSION_ID].status,
      "completed",
    );
    assert.equal(
      Object.values(afterFirst.learning.rewardClaims).find(
        (claim) => claim.sourceId === RECOVERY_MISSION_ID,
      ).points,
      130,
    );
    assert.equal(
      afterFirst.learning.competencyEvidence.filter(
        (evidence) => evidence.activityId === RECOVERY_MISSION_ID,
      ).length,
      3,
    );
    const timelineItem = selectActivityTimeline(afterFirst).find(
      (item) => item.sourceId === RECOVERY_MISSION_ID,
    );
    assert.equal(timelineItem.href, "/missoes/cliquei-e-agora");
    assert.match(timelineItem.title, /^Missão Cliquei\. E agora\? concluída$/);
    assert.deepEqual(selectBestMissionSummary(afterFirst), {
      activityId: RECOVERY_MISSION_ID,
      title: "Cliquei. E agora?",
      score: 100,
    });

    const afterReplay = appReducer(afterFirst, {
      type: "RECOVERY_MISSION_COMPLETED",
      payload: {
        ...perfectSubmission,
        attemptId: "attempt:recovery:risky-replay",
        completedAt: "2026-08-06T10:30:00.000Z",
        incidentType: "clicked-link",
        immediateActionId: "hide-incident",
        selectedRecoveryActionIds: [
          "delete-evidence",
          "continue-interaction",
        ],
        selectedReportDetailIds: [
          "received-channel",
          "password-or-code",
        ],
      },
    });
    assert.equal(selectLatestRecoveryMissionResult(afterReplay).score, 0);
    assert.equal(
      afterReplay.learning.pointLedger.filter(
        (entry) => entry.sourceId === RECOVERY_MISSION_ID,
      ).length,
      1,
    );
    assert.equal(
      Object.values(afterReplay.teams.contributionClaims).filter(
        (claim) => claim.sourceId === RECOVERY_MISSION_ID,
      ).length,
      1,
    );
    assert.equal(
      selectActiveReview(afterReplay).targetActivityId,
      RECOVERY_MISSION_ID,
    );

    const values = new Map();
    const previousWindow = Object.getOwnPropertyDescriptor(globalThis, "window");
    Object.defineProperty(globalThis, "window", {
      configurable: true,
      value: {
        localStorage: {
          getItem(key) {
            return values.get(key) ?? null;
          },
          setItem(key, value) {
            values.set(key, String(value));
          },
          removeItem(key) {
            values.delete(key);
          },
        },
      },
    });

    try {
      savePersistedState(afterReplay);
      const savedEnvelope = JSON.parse(values.get(STORAGE_KEY));
      assert.equal(savedEnvelope.schemaVersion, 15);
      assert.equal(savedEnvelope.appVersion, "mvp-local-v15");
      assert.deepEqual(loadPersistedState(), afterReplay);

      const priorVersionState = appReducer(createDemoState(), {
        type: "MISSION_COMPLETED",
        payload: {
          attemptId: "attempt:v4:preserved",
          activityId: "mission:account-lock",
          activityVersion: 1,
          completedAt: "2026-08-06T10:40:00.000Z",
          decision: "verificar",
          inspectedEvidence: ["sender", "link", "context"],
          selectedReasonIds: ["domain", "urgency", "destination"],
        },
      });
      const legacyV4 = structuredClone(priorVersionState);
      legacyV4.meta.schemaVersion = 4;
      values.set(
        STORAGE_KEY,
        JSON.stringify({
          schemaVersion: 4,
          appVersion: "mvp-local-v4",
          savedAt: "2026-08-06T10:45:00.000Z",
          state: legacyV4,
        }),
      );
      const migratedV4 = loadPersistedState();
      assert.equal(migratedV4.meta.schemaVersion, 15);
      assert.deepEqual(migratedV4.learning, priorVersionState.learning);
      assert.deepEqual(migratedV4.preferences, priorVersionState.preferences);
      assert.deepEqual(migratedV4.onboarding, priorVersionState.onboarding);
      assert.deepEqual(migratedV4.teams, priorVersionState.teams);
    } finally {
      if (previousWindow) {
        Object.defineProperty(globalThis, "window", previousWindow);
      } else {
        delete globalThis.window;
      }
    }

    const documentation = await readFile(
      new URL("DOCUMENTACAO-PLATAFORMA.md", projectRoot),
      "utf8",
    );
    assert.match(documentation, /## 35\. Terceiro recorte funcional/);
    assert.match(documentation, /APP_SCHEMA_VERSION` passa de `4` para `5`/);
    assert.match(documentation, /seis atividades disponíveis e uma em produção/);
  } finally {
    await vite.close();
  }
});

test("monta a resposta pós-clique v2 sem reinterpretar a tentativa legada", async () => {
  const { createServer } = await import("vite");
  const vite = await createServer({
    root: fileURLToPath(projectRoot),
    configFile: false,
    server: { middlewareMode: true },
    appType: "custom",
    logLevel: "silent",
  });

  try {
    const [
      { appReducer, createDemoState },
      {
        evaluateRecoveryBuilderV2,
        isValidRecoveryBuilderV2Submission,
      },
      {
        RECOVERY_BUILDER_ACTIVITY_ID,
        RECOVERY_BUILDER_ACTIVITY_VERSION,
        RECOVERY_BUILDER_MECHANIC_ID,
        RECOVERY_BUILDER_V2_PACKAGES,
      },
      {
        selectLatestRecoveryBuilderPackageId,
        selectLatestRecoveryBuilderSubmission,
        selectLatestRecoveryMissionResult,
      },
      { APP_SCHEMA_VERSION },
      { loadPersistedState, STORAGE_KEY },
      { FIRST_LEARNING_PATH },
      { findActivityById },
    ] = await Promise.all([
      vite.ssrLoadModule("/lib/state/app-reducer.ts"),
      vite.ssrLoadModule("/lib/domain/rules.ts"),
      vite.ssrLoadModule("/lib/content/activities/recovery-builder/v2.ts"),
      vite.ssrLoadModule("/lib/state/selectors.ts"),
      vite.ssrLoadModule("/lib/domain/types.ts"),
      vite.ssrLoadModule("/lib/state/persistence.ts"),
      vite.ssrLoadModule("/lib/content/curriculum-catalog.ts"),
      vite.ssrLoadModule("/lib/activities/registry.ts"),
    ]);

    const perfectSubmissionFor = (contentPackage, attemptId) => ({
      attemptId,
      activityId: RECOVERY_BUILDER_ACTIVITY_ID,
      activityVersion: RECOVERY_BUILDER_ACTIVITY_VERSION,
      casePackageId: contentPackage.casePackageId,
      completedAt: "2026-08-16T14:00:00.000Z",
      mechanicId: RECOVERY_BUILDER_MECHANIC_ID,
      timelineFactIds: [...contentPackage.allowlists.correctTimelineFactIds],
      exposureStageId: contentPackage.allowlists.correctExposureStageId,
      actionPlacements: contentPackage.allowlists.actionGroupIds.flatMap(
        (groupId) =>
          contentPackage.allowlists.actionIds
            .filter(
              (actionId) =>
                contentPackage.allowlists.correctGroupByActionId[actionId] ===
                groupId,
            )
            .map((actionId, position) => ({ actionId, groupId, position })),
      ),
      reportBlockIds: [...contentPackage.allowlists.safeReportBlockIds],
      officialRouteActionId:
        contentPackage.allowlists.correctOfficialRouteId,
      transferExposureId:
        contentPackage.allowlists.correctTransferExposureId,
      transferFirstActionIds: [
        ...contentPackage.allowlists.correctTransferFirstActionIds,
      ],
    });

    for (const [index, contentPackage] of RECOVERY_BUILDER_V2_PACKAGES.entries()) {
      const submission = perfectSubmissionFor(
        contentPackage,
        `attempt:recovery-builder:perfect:${index}`,
      );
      assert.equal(isValidRecoveryBuilderV2Submission(submission), true);
      assert.deepEqual(
        evaluateRecoveryBuilderV2(submission),
        {
          score: 100,
          casePackageId: contentPackage.casePackageId,
          exposurePoints: 20,
          classificationPoints: 30,
          precedencePoints: 15,
          proportionalityPoints: 15,
          reportPoints: 20,
          correctPlacements: contentPackage.allowlists.actionIds.length,
          totalPlacements: contentPackage.allowlists.actionIds.length,
          correctPrecedencePairs:
            contentPackage.allowlists.precedencePairs.length,
          totalPrecedencePairs: contentPackage.allowlists.precedencePairs.length,
          safeReportBlocks: contentPackage.allowlists.safeReportBlockIds.length,
          criticalFailureIds: [],
          teamPoints: 12,
          needsReview: false,
          potentialReward: 130,
        },
      );
    }

    const canonicalPackage = RECOVERY_BUILDER_V2_PACKAGES[0];
    const perfectSubmission = perfectSubmissionFor(
      canonicalPackage,
      "attempt:recovery-builder:first",
    );
    assert.equal(
      isValidRecoveryBuilderV2Submission({
        ...perfectSubmission,
        actionPlacements: perfectSubmission.actionPlacements.slice(1),
      }),
      false,
    );
    assert.throws(() =>
      evaluateRecoveryBuilderV2({
        ...perfectSubmission,
        activityVersion: 1,
      }),
    );

    const initial = createDemoState();
    const afterFirst = appReducer(initial, {
      type: "RECOVERY_BUILDER_V2_COMPLETED",
      payload: perfectSubmission,
    });
    assert.equal(selectLatestRecoveryMissionResult(afterFirst).score, 100);
    assert.equal(
      selectLatestRecoveryBuilderPackageId(afterFirst),
      canonicalPackage.casePackageId,
    );
    assert.equal(
      selectLatestRecoveryBuilderSubmission(afterFirst).mechanicId,
      RECOVERY_BUILDER_MECHANIC_ID,
    );
    assert.equal(
      Object.values(afterFirst.learning.rewardClaims).filter(
        (claim) => claim.sourceId === RECOVERY_BUILDER_ACTIVITY_ID,
      ).length,
      1,
    );
    assert.equal(
      afterFirst.learning.pointLedger.filter(
        (entry) => entry.sourceId === RECOVERY_BUILDER_ACTIVITY_ID,
      ).length,
      1,
    );
    assert.equal(
      Object.values(afterFirst.teams.contributionClaims).filter(
        (claim) => claim.sourceId === RECOVERY_BUILDER_ACTIVITY_ID,
      ).length,
      1,
    );

    const duplicate = appReducer(afterFirst, {
      type: "RECOVERY_BUILDER_V2_COMPLETED",
      payload: perfectSubmission,
    });
    assert.deepEqual(duplicate, afterFirst);

    const replay = appReducer(afterFirst, {
      type: "RECOVERY_BUILDER_V2_COMPLETED",
      payload: {
        ...perfectSubmission,
        attemptId: "attempt:recovery-builder:replay",
        completedAt: "2026-08-16T14:10:00.000Z",
        officialRouteActionId: "message-contact",
        reportBlockIds: ["password-or-code"],
      },
    });
    assert.equal(selectLatestRecoveryMissionResult(replay).needsReview, true);
    assert.equal(Object.keys(replay.learning.rewardClaims).length, 1);
    assert.equal(replay.learning.pointLedger.length, 1);
    assert.equal(
      Object.values(replay.teams.contributionClaims).filter(
        (claim) => claim.sourceId === RECOVERY_BUILDER_ACTIVITY_ID,
      ).length,
      1,
    );

    const curriculumStep = FIRST_LEARNING_PATH.steps.find(
      (step) => step.activityId === RECOVERY_BUILDER_ACTIVITY_ID,
    );
    assert.equal(curriculumStep.activityVersion, 2);
    assert.equal(curriculumStep.estimatedMinutes, 12);
    const runtime = findActivityById(RECOVERY_BUILDER_ACTIVITY_ID);
    assert.equal(runtime.publishedVersion, 2);
    assert.deepEqual(runtime.acceptedVersions, [1, 2]);
    assert.equal(runtime.contractFamily, "incident-response-builder-v2");

    const values = new Map();
    const previousWindow = Object.getOwnPropertyDescriptor(globalThis, "window");
    Object.defineProperty(globalThis, "window", {
      configurable: true,
      value: {
        localStorage: {
          getItem(key) {
            return values.get(key) ?? null;
          },
          setItem(key, value) {
            values.set(key, String(value));
          },
          removeItem(key) {
            values.delete(key);
          },
        },
      },
    });
    try {
      const legacyV11 = structuredClone(afterFirst);
      legacyV11.meta.schemaVersion = 11;
      values.set(
        STORAGE_KEY,
        JSON.stringify({
          schemaVersion: 11,
          appVersion: "mvp-local-v11",
          savedAt: "2026-08-16T14:20:00.000Z",
          state: legacyV11,
        }),
      );
      const migrated = loadPersistedState();
      assert.equal(APP_SCHEMA_VERSION, 15);
      assert.equal(migrated.meta.schemaVersion, 15);
      assert.deepEqual(migrated.learning, afterFirst.learning);
      assert.deepEqual(migrated.preferences, afterFirst.preferences);
      assert.deepEqual(migrated.onboarding, afterFirst.onboarding);
      assert.deepEqual(migrated.teams, afterFirst.teams);
    } finally {
      if (previousWindow) {
        Object.defineProperty(globalThis, "window", previousWindow);
      } else {
        delete globalThis.window;
      }
    }
  } finally {
    await vite.close();
  }
});

test("publica Mudança bancária v2 como estação de processo sem duplicar v1", async () => {
  const { createServer } = await import("vite");
  const vite = await createServer({
    root: fileURLToPath(projectRoot),
    configFile: false,
    server: { middlewareMode: true },
    appType: "custom",
    logLevel: "silent",
  });

  try {
    const {
      BANK_CHANGE_PROCESS_V2_PACKAGE,
      BANK_CHANGE_PROCESS_ACTIVITY_ID,
      BANK_CHANGE_PROCESS_ACTIVITY_VERSION,
      BANK_CHANGE_PROCESS_MECHANIC_ID,
    } = await vite.ssrLoadModule(
      "/lib/content/activities/bank-change/v2.ts",
    );
    const {
      evaluateBankProcessV2,
      isValidBankProcessV2Submission,
      BANK_CHANGE_REWARD_CLAIM,
      BANK_CHANGE_AGGREGATE_CLAIM,
    } = await vite.ssrLoadModule("/lib/domain/rules.ts");
    const { createDemoState, appReducer } = await vite.ssrLoadModule(
      "/lib/state/app-reducer.ts",
    );
    const { findActivityById } = await vite.ssrLoadModule(
      "/lib/activities/registry.ts",
    );
    const { FIRST_LEARNING_PATH } = await vite.ssrLoadModule(
      "/lib/content/curriculum-catalog.ts",
    );
    const { APP_SCHEMA_VERSION } = await vite.ssrLoadModule(
      "/lib/domain/types.ts",
    );
    const { STORAGE_KEY, loadPersistedState } = await vite.ssrLoadModule(
      "/lib/state/persistence.ts",
    );

    const allowlists = BANK_CHANGE_PROCESS_V2_PACKAGE.allowlists;
    const perfectSubmission = {
      attemptId: "attempt:bank-process-v2:perfect",
      activityId: BANK_CHANGE_PROCESS_ACTIVITY_ID,
      activityVersion: BANK_CHANGE_PROCESS_ACTIVITY_VERSION,
      casePackageId: BANK_CHANGE_PROCESS_V2_PACKAGE.casePackageId,
      completedAt: "2026-08-16T18:00:00.000Z",
      mechanicId: BANK_CHANGE_PROCESS_MECHANIC_ID,
      selectedComparisonIds: [...allowlists.requiredComparisonIds],
      contactSourceId: allowlists.correctContactSourceId,
      contactResponseViewed: true,
      processPlacements: [
        ...allowlists.requiredProcessCardIds.map((cardId, position) => ({
          cardId,
          groupId: "process",
          position,
        })),
        ...allowlists.unsafeProcessCardIds.map((cardId, position) => ({
          cardId,
          groupId: "outside-process",
          position,
        })),
      ],
      selectedReportBlockIds: [...allowlists.requiredReportBlockIds],
    };

    assert.equal(isValidBankProcessV2Submission(perfectSubmission), true);
    const perfectResult = evaluateBankProcessV2(perfectSubmission);
    assert.equal(perfectResult.score, 100);
    assert.equal(perfectResult.correctDecisions, 5);
    assert.equal(perfectResult.potentialReward, 104);
    assert.equal(perfectResult.needsReview, false);

    assert.equal(
      isValidBankProcessV2Submission({
        ...perfectSubmission,
        attemptId: "attempt:bank-process-v2:duplicate",
        processPlacements: [
          ...perfectSubmission.processPlacements,
          perfectSubmission.processPlacements[0],
        ],
      }),
      false,
    );
    const unsafe = {
      ...perfectSubmission,
      attemptId: "attempt:bank-process-v2:unsafe",
      contactSourceId: "request-document",
      processPlacements: [
        ...allowlists.requiredProcessCardIds
          .filter((cardId) => cardId !== "suspend-change")
          .map((cardId, position) => ({
            cardId,
            groupId: "process",
            position,
          })),
        ...["suspend-change", ...allowlists.unsafeProcessCardIds].map(
          (cardId, position) => ({
            cardId,
            groupId: "outside-process",
            position,
          }),
        ),
      ],
      selectedReportBlockIds: ["password-or-code"],
    };
    const unsafeResult = evaluateBankProcessV2(unsafe);
    assert.equal(unsafeResult.needsReview, true);
    assert.ok(unsafeResult.criticalFailureIds.includes("independent-contact"));
    assert.ok(unsafeResult.criticalFailureIds.includes("safe-report"));

    const initial = createDemoState();
    const afterFirst = appReducer(initial, {
      type: "BANK_PROCESS_V2_COMPLETED",
      payload: perfectSubmission,
    });
    assert.equal(
      afterFirst.learning.rewardClaims[BANK_CHANGE_REWARD_CLAIM].points,
      104,
    );
    assert.equal(
      afterFirst.teams.aggregateClaims[BANK_CHANGE_AGGREGATE_CLAIM]
        .correctDecisions,
      5,
    );
    const replay = appReducer(afterFirst, {
      type: "BANK_PROCESS_V2_COMPLETED",
      payload: perfectSubmission,
    });
    assert.strictEqual(replay, afterFirst);

    const legacySubmission = {
      attemptId: "attempt:bank-change:v1-before-v2",
      activityId: "team:bank-change",
      activityVersion: 1,
      completedAt: "2026-08-16T17:00:00.000Z",
      initialActionId: "pause-and-preserve",
      evidenceAssessmentId: "plausible-not-authenticated",
      verificationRouteId: "registered-contact",
      processActionId: "block-report-second-approval",
      reportActionId: "official-complete-report",
      inspectedEvidenceIds: ["vendor-record", "official-procedure"],
    };
    const afterLegacy = appReducer(createDemoState(), {
      type: "BANK_CHANGE_COMPLETED",
      payload: legacySubmission,
    });
    const afterV2 = appReducer(afterLegacy, {
      type: "BANK_PROCESS_V2_COMPLETED",
      payload: perfectSubmission,
    });
    assert.equal(afterV2.learning.activityProgress["team:bank-change"].attemptIds.length, 2);
    assert.equal(
      Object.values(afterV2.learning.rewardClaims).filter(
        (claim) => claim.sourceId === "team:bank-change",
      ).length,
      1,
    );
    assert.equal(Object.keys(afterV2.teams.aggregateClaims).length, 1);
    assert.equal(afterV2.teams.sectorAggregate.validParticipants, afterLegacy.teams.sectorAggregate.validParticipants);
    assert.equal(afterV2.teams.sectorAggregate.validDecisions, afterLegacy.teams.sectorAggregate.validDecisions);

    const runtime = findActivityById("team:bank-change");
    assert.equal(runtime.publishedVersion, 2);
    assert.deepEqual(runtime.acceptedVersions, [1, 2]);
    assert.equal(runtime.contractFamily, "bank-process-v2");
    assert.deepEqual(runtime.publishedCasePackageIds, [BANK_CHANGE_PROCESS_V2_PACKAGE.casePackageId]);
    const curriculumStep = FIRST_LEARNING_PATH.steps.find(
      (step) => step.activityId === "team:bank-change",
    );
    assert.equal(curriculumStep.activityVersion, 2);
    assert.equal(curriculumStep.estimatedMinutes, 14);

    const values = new Map();
    const previousWindow = Object.getOwnPropertyDescriptor(globalThis, "window");
    Object.defineProperty(globalThis, "window", {
      configurable: true,
      value: {
        localStorage: {
          getItem(key) { return values.get(key) ?? null; },
          setItem(key, value) { values.set(key, String(value)); },
          removeItem(key) { values.delete(key); },
        },
      },
    });
    try {
      const legacyV13 = structuredClone(afterFirst);
      legacyV13.meta.schemaVersion = 13;
      values.set(STORAGE_KEY, JSON.stringify({
        schemaVersion: 13,
        appVersion: "mvp-local-v13",
        savedAt: "2026-08-16T18:10:00.000Z",
        state: legacyV13,
      }));
      const migrated = loadPersistedState();
      assert.equal(APP_SCHEMA_VERSION, 15);
      assert.equal(migrated.meta.schemaVersion, 15);
      assert.deepEqual(migrated.learning, afterFirst.learning);
      assert.deepEqual(migrated.teams, afterFirst.teams);
    } finally {
      if (previousWindow) Object.defineProperty(globalThis, "window", previousWindow);
      else delete globalThis.window;
    }
  } finally {
    await vite.close();
  }
});

test("integra o Overlooked com pontuação recalculável e ranking próprio", async () => {
  const { createServer } = await import("vite");
  const vite = await createServer({
    root: fileURLToPath(projectRoot),
    configFile: false,
    server: { middlewareMode: true },
    appType: "custom",
    logLevel: "silent",
  });

  try {
    const {
      ARCADE_GAMES,
      OVERLOOKED_SCORING,
      OVERLOOKED_TIE_BREAKS,
      findArcadeGameBySlug,
    } = await vite.ssrLoadModule("/lib/content/arcade-catalog.ts");
    const { validateOverlookedCompletion } = await vite.ssrLoadModule(
      "/lib/arcade/overlooked.ts",
    );
    const { DEMO_OVERLOOKED_LEADERBOARD } = await vite.ssrLoadModule(
      "/lib/content/overlooked-demo-leaderboard.ts",
    );

    assert.equal(ARCADE_GAMES.length, 1);
    assert.equal(ARCADE_GAMES[0].status, "available");
    assert.equal(findArcadeGameBySlug("overlooked").scoreScale, "De −165 a 155 pontos");
    assert.deepEqual(OVERLOOKED_SCORING.map((item) => item.points), [15, 10, -5, -20]);
    assert.equal(OVERLOOKED_TIE_BREAKS[1], "Mais phishings reportados");
    assert.deepEqual(
      DEMO_OVERLOOKED_LEADERBOARD.map((entry) => [entry.accountId, entry.score]),
      [
        ["account:lucas-learner", 130],
        ["account:marina-admin", 85],
        ["account:ana-learner", 70],
      ],
    );
    for (const entry of DEMO_OVERLOOKED_LEADERBOARD) {
      assert.equal(
        validateOverlookedCompletion(
          { durationSeconds: 300, outcomes: entry.outcomes },
          300,
        ).rawScore,
        entry.score,
      );
    }

    const validated = validateOverlookedCompletion(
      {
        durationSeconds: 300,
        outcomes: [
          { id: "sap-tigre", outcome: "processado" },
          { id: "gerente-campinas", outcome: "processado" },
          { id: "reset-marcos", outcome: "legitimo descartado" },
          { id: "autocad", outcome: "aceito" },
          { id: "rdp-typo", outcome: "phishing reportado" },
          { id: "admin-gmail", outcome: "phishing reportado" },
          { id: "microsoft-falso", outcome: "phishing processado" },
          { id: "rh-falso", outcome: "aceito" },
        ],
      },
      300,
    );
    assert.equal(validated.rawScore, 25);
    assert.equal(validated.classifiedMessages, 8);
    assert.throws(
      () => validateOverlookedCompletion({ durationSeconds: 300, outcomes: [
        { id: "sap-tigre", outcome: "phishing reportado" },
      ] }, 300),
      /combina..o imposs.vel/,
    );

    const component = await readFile(
      new URL("features/arcade/ArcadeExperience.tsx", projectRoot),
      "utf8",
    );
    const integration = await readFile(
      new URL("features/arcade/OverlookedIntegration.tsx", projectRoot),
      "utf8",
    );
    const gameHtml = await readFile(
      new URL("public/arcade-games/overlooked/index.html", projectRoot),
      "utf8",
    );
    const gameScript = await readFile(
      new URL("public/arcade-games/overlooked/src/game.js", projectRoot),
      "utf8",
    );
    const gameStyles = await readFile(
      new URL("public/arcade-games/overlooked/styles.css", projectRoot),
      "utf8",
    );
    assert.match(component, /arcade-game-toolbar/);
    assert.match(integration, /\/arcade-games\/overlooked\/index\.html/);
    assert.match(integration, /overlooked:completed/);
    assert.match(gameHtml, /<title>Overlooked<\/title>/);
    assert.match(gameHtml, /class="email-app-bar"/);
    assert.match(gameHtml, /Casa Digital/);
    assert.match(gameScript, /FIRST_EMAIL_ID = "gerente-campinas"/);
    assert.match(gameScript, /flow: \["printer", "deposit"\]/);
    assert.match(gameScript, /remainingEmails\.push\(firstEmail\)/);
    assert.match(gameScript, /EMAIL_ARRIVAL_MIN_SECONDS = 4/);
    assert.match(gameScript, /EMAIL_ARRIVAL_MAX_SECONDS = 7/);
    assert.match(gameStyles, /\.modal__panel \{[\s\S]*?font-family: Arial/);
    assert.match(gameStyles, /\.email-app-bar \{[\s\S]*?#173f35/);
    assert.doesNotMatch(component + integration + gameHtml, /cover\.(png|jpg|webp)/i);
  } finally {
    await vite.close();
  }
});

test("conclui o Radar somente com a resposta correta e não duplica pontos", async () => {
  const { createServer } = await import("vite");
  const vite = await createServer({
    root: fileURLToPath(projectRoot),
    configFile: false,
    server: { middlewareMode: true },
    appType: "custom",
    logLevel: "silent",
  });

  try {
    const [
      { appReducer, createDemoState },
      {
        selectCompletedRadarIds,
        selectJourneyProgress,
        selectLatestRadarResult,
        selectPointOrigins,
        selectTotalPoints,
      },
      { loadPersistedState, savePersistedState },
    ] = await Promise.all([
      vite.ssrLoadModule("/lib/state/app-reducer.ts"),
      vite.ssrLoadModule("/lib/state/selectors.ts"),
      vite.ssrLoadModule("/lib/state/persistence.ts"),
    ]);

    const initial = createDemoState();
    const wrong = appReducer(initial, {
      type: "RADAR_COMPLETED",
      payload: {
        attemptId: "attempt:radar:wrong",
        activityId: "radar:quishing",
        activityVersion: 1,
        completedAt: "2026-08-01T18:00:00.000Z",
        selectedOptionId: "scan-and-trust",
      },
    });
    assert.equal(wrong, initial);

    const afterCorrect = appReducer(initial, {
      type: "RADAR_COMPLETED",
      payload: {
        attemptId: "attempt:radar:correct",
        activityId: "radar:quishing",
        activityVersion: 1,
        completedAt: "2026-08-01T18:05:00.000Z",
        selectedOptionId: "inspect-and-confirm",
      },
    });

    assert.equal(selectLatestRadarResult(afterCorrect).correct, true);
    assert.equal(selectTotalPoints(afterCorrect), 5);
    assert.deepEqual(selectCompletedRadarIds(afterCorrect), ["radar:quishing"]);
    assert.equal(selectJourneyProgress(afterCorrect).completedMissions, 0);
    assert.equal(afterCorrect.learning.competencyEvidence.length, 2);
    assert.equal(afterCorrect.learning.history.length, 2);
    assert.equal(selectPointOrigins(afterCorrect)[0].category, "radar");

    const afterReread = appReducer(afterCorrect, {
      type: "RADAR_COMPLETED",
      payload: {
        attemptId: "attempt:radar:reread",
        activityId: "radar:quishing",
        activityVersion: 1,
        completedAt: "2026-08-01T18:10:00.000Z",
        selectedOptionId: "inspect-and-confirm",
      },
    });
    assert.equal(afterReread, afterCorrect);
    assert.equal(selectTotalPoints(afterReread), 5);
    assert.equal(afterReread.learning.pointLedger.length, 1);

    const values = new Map();
    const previousWindow = Object.getOwnPropertyDescriptor(globalThis, "window");
    Object.defineProperty(globalThis, "window", {
      configurable: true,
      value: {
        localStorage: {
          getItem(key) {
            return values.get(key) ?? null;
          },
          setItem(key, value) {
            values.set(key, String(value));
          },
          removeItem(key) {
            values.delete(key);
          },
        },
      },
    });

    try {
      savePersistedState(afterCorrect);
      assert.deepEqual(loadPersistedState(), afterCorrect);
    } finally {
      if (previousWindow) {
        Object.defineProperty(globalThis, "window", previousWindow);
      } else {
        delete globalThis.window;
      }
    }
  } finally {
    await vite.close();
  }
});

test("publica a fundação PARE v2 com contrato, avaliação e recompensa idempotente entre versões", async () => {
  const { createServer } = await import("vite");
  const vite = await createServer({
    root: fileURLToPath(projectRoot),
    configFile: false,
    server: { middlewareMode: true },
    appType: "custom",
    logLevel: "silent",
  });

  try {
    const [rules, content, reducerModule, selectors, persistence, achievements] = await Promise.all([
      vite.ssrLoadModule("/lib/domain/rules.ts"),
      vite.ssrLoadModule("/lib/content/activities/account-lock/v2.ts"),
      vite.ssrLoadModule("/lib/state/app-reducer.ts"),
      vite.ssrLoadModule("/lib/state/selectors.ts"),
      vite.ssrLoadModule("/lib/state/persistence.ts"),
      vite.ssrLoadModule("/lib/domain/achievements.ts"),
    ]);
    const perfect = {
      attemptId: "attempt:foundation:v2:perfect",
      activityId: content.PHISHING_FOUNDATION_ACTIVITY_ID,
      activityVersion: content.PHISHING_FOUNDATION_ACTIVITY_VERSION,
      casePackageId: content.PHISHING_FOUNDATION_PACKAGE_ID,
      completedAt: "2026-08-15T18:00:00.000Z",
      mechanicId: content.PHISHING_FOUNDATION_MECHANIC_ID,
      requestedActionId: "confirm-account-from-message",
      protectedAssetId: "corporate-account",
      potentialConsequenceId: "credential-or-session-exposure",
      pauseDecisionId: "pause-before-message-action",
      evaluationId: "connect-request-asset-consequence",
      confirmationRouteId: "known-official-reference",
      finalAssessmentId: "suspicious-unconfirmed",
      finalActionId: "keep-account-and-report",
      reportDetailIds: [
        "sender-subject-time",
        "requested-action",
        "destination-preview",
        "independent-check-result",
      ],
      transferDecisionId: "use-known-route-no-incident",
    };

    assert.equal(rules.isValidPhishingFoundationV2Submission(perfect), true);
    assert.deepEqual(rules.evaluatePhishingFoundationV2(perfect), {
      score: 100,
      requestImpactPoints: 20,
      pauseEvaluationPoints: 15,
      confirmationPoints: 25,
      responseReportPoints: 25,
      transferPoints: 15,
      correctReportDetails: 4,
      totalSafeReportDetails: 4,
      criticalFailureIds: [],
      teamPoints: 12,
      needsReview: false,
      potentialReward: 130,
    });
    assert.equal(
      rules.isValidPhishingFoundationV2Submission({
        ...perfect,
        confirmationRouteId: "invented-route",
      }),
      false,
    );

    const initial = reducerModule.createDemoState();
    const afterFoundation = reducerModule.appReducer(initial, {
      type: "PHISHING_FOUNDATION_V2_COMPLETED",
      payload: perfect,
    });
    assert.equal(selectors.selectTotalPoints(afterFoundation), 230);
    assert.equal(
      achievements.selectAchievements(afterFoundation).find(
        (achievement) => achievement.id === "olhar-atento",
      ).unlocked,
      true,
    );
    assert.equal(
      selectors.selectLatestPhishingFoundationResult(afterFoundation).score,
      100,
    );
    assert.equal(
      selectors.selectLatestPhishingFoundationPackageId(afterFoundation),
      content.PHISHING_FOUNDATION_PACKAGE_ID,
    );
    assert.equal(
      afterFoundation.learning.rewardClaims[
        "mission:account-lock:first-completion"
      ].points,
      130,
    );

    const replay = reducerModule.appReducer(afterFoundation, {
      type: "PHISHING_FOUNDATION_V2_COMPLETED",
      payload: { ...perfect, attemptId: "attempt:foundation:v2:replay" },
    });
    assert.equal(selectors.selectTotalPoints(replay), 230);
    assert.equal(replay.learning.pointLedger.length, 2);
    assert.equal(
      Object.keys(replay.teams.contributionClaims).filter((key) =>
        key.includes("mission:account-lock"),
      ).length,
      1,
    );
    const legacyAfterV2 = reducerModule.appReducer(afterFoundation, {
      type: "MISSION_COMPLETED",
      payload: {
        attemptId: "attempt:foundation:v1:after-v2",
        activityId: "mission:account-lock",
        activityVersion: 1,
        completedAt: "2026-08-15T18:10:00.000Z",
        decision: "reportar",
        inspectedEvidence: ["sender", "link", "context"],
        selectedReasonIds: ["domain", "urgency", "destination"],
      },
    });
    assert.equal(
      legacyAfterV2.learning.rewardClaims[
        "mission:account-lock:first-completion"
      ].points,
      130,
    );
    assert.equal(
      legacyAfterV2.learning.pointLedger.filter(
        (entry) => entry.sourceId === perfect.activityId,
      ).length,
      1,
    );
    assert.equal(
      Object.keys(legacyAfterV2.teams.contributionClaims).filter((key) =>
        key.includes("mission:account-lock"),
      ).length,
      1,
    );

    const legacyFirst = reducerModule.appReducer(initial, {
      type: "MISSION_COMPLETED",
      payload: {
        attemptId: "attempt:foundation:v1:legacy",
        activityId: "mission:account-lock",
        activityVersion: 1,
        completedAt: "2026-08-15T17:00:00.000Z",
        decision: "reportar",
        inspectedEvidence: ["sender", "link", "context"],
        selectedReasonIds: ["domain", "urgency", "destination"],
      },
    });
    const upgraded = reducerModule.appReducer(legacyFirst, {
      type: "PHISHING_FOUNDATION_V2_COMPLETED",
      payload: { ...perfect, attemptId: "attempt:foundation:v2:after-v1" },
    });
    assert.equal(selectors.selectTotalPoints(upgraded), selectors.selectTotalPoints(legacyFirst));
    assert.equal(
      upgraded.learning.pointLedger.filter(
        (entry) => entry.sourceId === perfect.activityId,
      ).length,
      1,
    );
    assert.equal(upgraded.learning.activityProgress[perfect.activityId].attemptIds.length, 2);

    const values = new Map();
    const previousWindow = Object.getOwnPropertyDescriptor(globalThis, "window");
    Object.defineProperty(globalThis, "window", {
      configurable: true,
      value: {
        localStorage: {
          getItem(key) {
            return values.get(key) ?? null;
          },
          setItem(key, value) {
            values.set(key, String(value));
          },
          removeItem(key) {
            values.delete(key);
          },
        },
      },
    });
    try {
      const legacyV8 = structuredClone(legacyFirst);
      legacyV8.meta.schemaVersion = 8;
      values.set(
        persistence.STORAGE_KEY,
        JSON.stringify({
          schemaVersion: 8,
          appVersion: "mvp-local-v8",
          savedAt: "2026-08-15T18:30:00.000Z",
          state: legacyV8,
        }),
      );
      const migrated = persistence.loadPersistedState();
      assert.equal(migrated.meta.schemaVersion, 15);
      assert.deepEqual(
        migrated.learning.attempts,
        legacyV8.learning.attempts,
      );
      assert.deepEqual(
        migrated.learning.rewardClaims,
        legacyV8.learning.rewardClaims,
      );
    } finally {
      if (previousWindow) {
        Object.defineProperty(globalThis, "window", previousWindow);
      } else {
        delete globalThis.window;
      }
    }
  } finally {
    await vite.close();
  }
});

test("mantém o primeiro percurso transversal íntegro e sem dependência do Radar", async () => {
  const { createServer } = await import("vite");
  const vite = await createServer({
    root: fileURLToPath(projectRoot),
    configFile: false,
    server: { middlewareMode: true },
    appType: "custom",
    logLevel: "silent",
  });

  try {
    const {
      FIRST_LEARNING_PATH,
      getCurriculumPresentation,
      getLearningPathStepRoute,
      validateLearningPath,
    } = await vite.ssrLoadModule("/lib/content/curriculum-catalog.ts");

    assert.equal(FIRST_LEARNING_PATH.steps.length, 8);
    assert.deepEqual(
      FIRST_LEARNING_PATH.steps.map((step) => step.order),
      [1, 2, 3, 4, 5, 6, 7, 8],
    );
    assert.deepEqual(
      FIRST_LEARNING_PATH.steps.map((step) => step.area),
      ["mission", "phishlab", "phishlab", "mission", "mission", "mission", "simulation", "team"],
    );
    assert.deepEqual(
      FIRST_LEARNING_PATH.steps.map((step) => step.title),
      [
        "O aviso que não podia esperar",
        "Quem enviou de verdade?",
        "Domínio sob a lupa",
        "A conversa já estava acontecendo",
        "Você iniciou este acesso?",
        "Cliquei. E agora?",
        "Uma manhã comum",
        "Mudança bancária sem atalho",
      ],
    );
    assert.deepEqual(
      FIRST_LEARNING_PATH.steps.map((step) => step.basePoints),
      [100, 60, 60, 100, 100, 100, 70, 80],
    );
    assert.deepEqual(
      FIRST_LEARNING_PATH.steps.map((step) => step.activityVersion),
      [2, 2, 2, 2, 2, 2, 2, 2],
    );
    assert.equal(
      new Set(FIRST_LEARNING_PATH.steps.map((step) => step.id)).size,
      FIRST_LEARNING_PATH.steps.length,
    );
    assert.equal(
      new Set(FIRST_LEARNING_PATH.steps.map((step) => step.activityId)).size,
      FIRST_LEARNING_PATH.steps.length,
    );
    assert.equal(
      FIRST_LEARNING_PATH.steps.some(
        (step) => step.area === "radar" || step.area === "arcade",
      ),
      false,
    );
    assert.equal(
      FIRST_LEARNING_PATH.steps.some((step) =>
        step.prerequisiteActivityIds.some((activityId) =>
          activityId.startsWith("radar:"),
        ),
      ),
      false,
    );
    assert.ok(
      FIRST_LEARNING_PATH.optionalRadar.every(
        (article) =>
          article.optional &&
          article.awardsPointsOnCompletion &&
          article.prerequisite === false,
      ),
    );
    assert.deepEqual(validateLearningPath(FIRST_LEARNING_PATH), {
      valid: true,
      issues: [],
    });
    assert.equal(
      getLearningPathStepRoute("mission:compromised-conversation"),
      "/missoes/a-conversa-ja-estava-acontecendo",
    );
    assert.equal(
      getLearningPathStepRoute("phishlab:true-sender"),
      "/phishlab/quem-enviou-de-verdade",
    );
    assert.equal(
      getLearningPathStepRoute("phishlab:link-analyzer"),
      "/phishlab/analisador-de-links",
    );
    assert.equal(
      getLearningPathStepRoute("mission:mfa-fatigue"),
      "/missoes/voce-iniciou-este-acesso",
    );
    assert.equal(
      getLearningPathStepRoute("mission:clicked-now-what"),
      "/missoes/cliquei-e-agora",
    );
    assert.equal(
      getLearningPathStepRoute("simulation:workday"),
      "/simulacoes/dia-de-trabalho",
    );

    const initialPresentation = getCurriculumPresentation(new Set());
    assert.deepEqual(
      initialPresentation.map((step) => step.presentationStatus),
      ["available", "available", "available", "available", "locked", "available", "available", "available"],
    );

    const afterPrerequisites = getCurriculumPresentation(
      new Set(["phishlab:true-sender", "phishlab:link-analyzer"]),
    );
    assert.equal(afterPrerequisites[4].presentationStatus, "available");

    const afterExistingActivities = getCurriculumPresentation(
      new Set(["phishlab:link-analyzer"]),
      new Set(["simulation:workday"]),
    );
    assert.equal(afterExistingActivities[2].presentationStatus, "completed");
    assert.equal(afterExistingActivities[6].presentationStatus, "inProgress");
  } finally {
    await vite.close();
  }
});

test("resolve o registro P0 sem rotas duplicadas nem queda silenciosa no hub", async () => {
  const { createServer } = await import("vite");
  const vite = await createServer({
    root: fileURLToPath(projectRoot),
    configFile: false,
    server: { middlewareMode: true },
    appType: "custom",
    logLevel: "silent",
  });

  try {
    const {
      PORTAL_ACTIVITY_REGISTRY,
      findActivityById,
      resolvePortalRoute,
      validateActivityRegistry,
    } = await vite.ssrLoadModule("/lib/activities/registry.ts");
    const { DOMAIN_UNDER_MAGNIFIER_V1_PACKAGE } = await vite.ssrLoadModule(
      "/lib/content/activities/domain-under-magnifier/v1.ts",
    );

    assert.equal(PORTAL_ACTIVITY_REGISTRY.length, 31);
    assert.equal(
      new Set(PORTAL_ACTIVITY_REGISTRY.map((item) => item.activityId)).size,
      PORTAL_ACTIVITY_REGISTRY.length,
    );
    assert.equal(
      new Set(PORTAL_ACTIVITY_REGISTRY.map((item) => item.route)).size,
      PORTAL_ACTIVITY_REGISTRY.length,
    );
    assert.deepEqual(validateActivityRegistry(), []);
    assert.equal(
      PORTAL_ACTIVITY_REGISTRY.filter(
        (item) => item.integrationStatus === "available",
      ).length,
      10,
    );
    assert.equal(
      PORTAL_ACTIVITY_REGISTRY.filter(
        (item) => item.integrationStatus === "planned",
      ).length,
      21,
    );

    const domainActivity = findActivityById("phishlab:link-analyzer");
    assert.equal(domainActivity.playerKey, "link-analyzer");
    assert.equal(domainActivity.publishedVersion, 2);
    assert.deepEqual(domainActivity.acceptedVersions, [1, 2]);
    assert.equal(domainActivity.publishedCasePackageIds.length, 4);
    assert.equal(
      domainActivity.publishedCasePackageIds[0],
      DOMAIN_UNDER_MAGNIFIER_V1_PACKAGE.casePackageId,
    );
    assert.equal(
      DOMAIN_UNDER_MAGNIFIER_V1_PACKAGE.casePackageId,
      "phishlab:link-analyzer:v1:default",
    );
    assert.deepEqual(
      DOMAIN_UNDER_MAGNIFIER_V1_PACKAGE.allowlists.toolIds,
      ["protocol", "subdomain", "registeredDomain", "path"],
    );

    assert.deepEqual(
      resolvePortalRoute("/phishlab/analisador-de-links/"),
      {
        pathname: "/phishlab/analisador-de-links",
        kind: "activity",
        view: "laboratorio",
        title: "Domínio sob a lupa",
        areaLabel: "PhishLab",
        hubRoute: "/phishlab",
        activityId: "phishlab:link-analyzer",
        playerKey: "link-analyzer",
      },
    );
    assert.equal(
      resolvePortalRoute("/missoes/pedido-urgente-do-gestor").kind,
      "planned",
    );
    assert.equal(
      resolvePortalRoute("/radar/falso-gestor").kind,
      "planned",
    );
    assert.deepEqual(resolvePortalRoute("/simulacoes/nao-existe"), {
      pathname: "/simulacoes/nao-existe",
      kind: "unknown",
      view: "simulacoes",
      title: "Atividade não encontrada",
      areaLabel: "Simulações",
      hubRoute: "/simulacoes",
      activityId: null,
      playerKey: null,
    });

    const visualRegistry = await readFile(
      new URL("features/activities/player-registry.tsx", projectRoot),
      "utf8",
    );
    for (const activity of PORTAL_ACTIVITY_REGISTRY.filter(
      (item) =>
        item.integrationStatus === "available",
    )) {
      assert.match(visualRegistry, new RegExp(`"${activity.playerKey}"`));
    }
  } finally {
    await vite.close();
  }
});

test("executa submissões na ordem validar, avaliar, persistir e retornar", async () => {
  const { createServer } = await import("vite");
  const vite = await createServer({
    root: fileURLToPath(projectRoot),
    configFile: false,
    server: { middlewareMode: true },
    appType: "custom",
    logLevel: "silent",
  });

  try {
    const {
      ActivitySubmissionValidationError,
      executeActivitySubmission,
    } = await vite.ssrLoadModule(
      "/lib/activities/runtime/execute-activity.ts",
    );
    const calls = [];
    const submission = { value: 4 };

    const result = executeActivitySubmission({
      submission,
      validate(candidate) {
        calls.push("validate");
        return candidate.value === 4;
      },
      evaluate(candidate) {
        calls.push("evaluate");
        return { score: candidate.value * 20 };
      },
      adaptResult(evaluated) {
        calls.push("adapt");
        return { ...evaluated, score: evaluated.score + 5 };
      },
      persist(accepted, evaluated) {
        calls.push("persist");
        assert.equal(accepted, submission);
        assert.deepEqual(evaluated, { score: 85 });
      },
      invalidMessage: "inválida",
    });

    assert.deepEqual(calls, ["validate", "evaluate", "adapt", "persist"]);
    assert.deepEqual(result, { score: 85 });

    const rejectedCalls = [];
    assert.throws(
      () =>
        executeActivitySubmission({
          submission,
          validate() {
            rejectedCalls.push("validate");
            return false;
          },
          evaluate() {
            rejectedCalls.push("evaluate");
            return { score: 100 };
          },
          persist() {
            rejectedCalls.push("persist");
          },
          invalidMessage: "inválida",
        }),
      (error) =>
        error instanceof ActivitySubmissionValidationError &&
        error.message === "inválida",
    );
    assert.deepEqual(rejectedCalls, ["validate"]);
  } finally {
    await vite.close();
  }
});

test("publica Domínio sob a lupa v2 sem reinterpretar tentativas ou recompensas v1", async () => {
  const { createServer } = await import("vite");
  const vite = await createServer({
    root: fileURLToPath(projectRoot),
    configFile: false,
    server: { middlewareMode: true },
    appType: "custom",
    logLevel: "silent",
  });

  try {
    const [
      contentModule,
      rulesModule,
      reducerModule,
      persistenceModule,
      selectorsModule,
    ] =
      await Promise.all([
        vite.ssrLoadModule(
          "/lib/content/activities/domain-under-magnifier/v2.ts",
        ),
        vite.ssrLoadModule("/lib/domain/rules.ts"),
        vite.ssrLoadModule("/lib/state/app-reducer.ts"),
        vite.ssrLoadModule("/lib/state/persistence.ts"),
        vite.ssrLoadModule("/lib/state/selectors.ts"),
      ]);
    const {
      DOMAIN_UNDER_MAGNIFIER_V2_PACKAGES,
      DOMAIN_ANALYZER_V2_ACTIVITY_ID,
      DOMAIN_ANALYZER_V2_ACTIVITY_VERSION,
      URL_ANATOMY_MECHANIC_ID,
    } = contentModule;
    const {
      evaluateDomainAnalyzerV2,
      isValidDomainAnalyzerV2Submission,
      PHISHLAB_REWARD_CLAIM,
      PHISHLAB_TEAM_CLAIM,
    } = rulesModule;
    const { appReducer, createDemoState } = reducerModule;
    const { loadPersistedState, STORAGE_KEY } = persistenceModule;
    const { selectLatestDomainAnalyzerPackageId } = selectorsModule;

    assert.equal(DOMAIN_UNDER_MAGNIFIER_V2_PACKAGES.length, 3);
    assert.equal(
      new Set(
        DOMAIN_UNDER_MAGNIFIER_V2_PACKAGES.map(
          (contentPackage) => contentPackage.casePackageId,
        ),
      ).size,
      3,
    );
    for (const contentPackage of DOMAIN_UNDER_MAGNIFIER_V2_PACKAGES) {
      assert.equal(contentPackage.activityVersion, 2);
      assert.equal(contentPackage.content.mainCase.segments.length, 5);
      assert.equal(contentPackage.content.transferCase.segments.length, 5);
      assert.ok(contentPackage.content.mainCase.url.includes(".example"));
      assert.ok(contentPackage.content.transferCase.url.includes(".example"));
      assert.ok(
        contentPackage.content.mainCase.segments.some(
          (segment) => segment.roleId === "parameter",
        ),
      );
    }

    const selectedPackage = DOMAIN_UNDER_MAGNIFIER_V2_PACKAGES[0];
    const perfectSubmission = {
      attemptId: "attempt:domain-v2:perfect",
      activityId: DOMAIN_ANALYZER_V2_ACTIVITY_ID,
      activityVersion: DOMAIN_ANALYZER_V2_ACTIVITY_VERSION,
      casePackageId: selectedPackage.casePackageId,
      completedAt: "2026-08-15T17:00:00.000Z",
      mechanicId: URL_ANATOMY_MECHANIC_ID,
      answerPayload: {
        segmentRoleById: Object.fromEntries(
          selectedPackage.content.mainCase.segments.map((segment) => [
            segment.id,
            segment.roleId,
          ]),
        ),
        registeredDomainSelectionId:
          selectedPackage.content.mainCase.correctRegisteredDomainSegmentId,
        inspectedSegmentIds: selectedPackage.content.mainCase.segments.map(
          (segment) => segment.id,
        ),
        verdictId: selectedPackage.content.mainCase.correctVerdictId,
        safeRouteId: selectedPackage.allowlists.correctSafeRouteId,
        transferRegisteredDomainSelectionId:
          selectedPackage.content.transferCase
            .correctRegisteredDomainSegmentId,
        transferVerdictId:
          selectedPackage.content.transferCase.correctVerdictId,
        usedHelpIds: ["role-reference"],
      },
    };

    assert.equal(isValidDomainAnalyzerV2Submission(perfectSubmission), true);
    const perfectResult = evaluateDomainAnalyzerV2(perfectSubmission);
    assert.equal(perfectResult.score, 100);
    assert.equal(perfectResult.anatomyPoints, 30);
    assert.equal(perfectResult.domainConclusionPoints, 25);
    assert.equal(perfectResult.safeRoutePoints, 20);
    assert.equal(perfectResult.transferPoints, 25);
    assert.equal(perfectResult.potentialReward, 78);
    assert.equal(perfectResult.needsReview, false);

    const invalidExtraSegment = structuredClone(perfectSubmission);
    invalidExtraSegment.attemptId = "attempt:domain-v2:invalid-extra";
    invalidExtraSegment.answerPayload.segmentRoleById.extra = "path";
    assert.equal(
      isValidDomainAnalyzerV2Submission(invalidExtraSegment),
      false,
    );
    assert.throws(() => evaluateDomainAnalyzerV2(invalidExtraSegment));

    const initial = createDemoState();
    const v1Submission = {
      attemptId: "attempt:domain-v1:preserved",
      activityId: "phishlab:link-analyzer",
      activityVersion: 1,
      completedAt: "2026-08-15T16:00:00.000Z",
      usedTools: ["protocol", "subdomain", "registeredDomain", "path"],
      usedHint: false,
      guidedVerdict: "suspicious",
      independentVerdict: "legitimate",
      independentEvidence: ["registered-domain", "expected-context"],
    };
    const afterV1 = appReducer(initial, {
      type: "PHISHLAB_COMPLETED",
      payload: v1Submission,
    });
    assert.equal(selectLatestDomainAnalyzerPackageId(afterV1), null);
    const v1Reward = afterV1.learning.rewardClaims[PHISHLAB_REWARD_CLAIM];
    const afterV2 = appReducer(afterV1, {
      type: "DOMAIN_ANALYZER_V2_COMPLETED",
      payload: perfectSubmission,
    });
    assert.equal(
      selectLatestDomainAnalyzerPackageId(afterV2),
      selectedPackage.casePackageId,
    );

    assert.equal(
      afterV2.learning.activityProgress[DOMAIN_ANALYZER_V2_ACTIVITY_ID]
        .attemptIds.length,
      2,
    );
    assert.equal(
      afterV2.learning.attempts[v1Submission.attemptId].activityVersion,
      1,
    );
    assert.equal(
      afterV2.learning.attempts[perfectSubmission.attemptId].activityVersion,
      2,
    );
    assert.deepEqual(
      afterV2.learning.rewardClaims[PHISHLAB_REWARD_CLAIM],
      v1Reward,
    );
    assert.equal(
      afterV2.learning.pointLedger.filter(
        (entry) => entry.sourceId === DOMAIN_ANALYZER_V2_ACTIVITY_ID,
      ).length,
      1,
    );
    assert.equal(Boolean(afterV2.teams.contributionClaims[PHISHLAB_TEAM_CLAIM]), true);
    assert.strictEqual(
      appReducer(afterV2, {
        type: "DOMAIN_ANALYZER_V2_COMPLETED",
        payload: perfectSubmission,
      }),
      afterV2,
    );

    const previousWindow = Object.getOwnPropertyDescriptor(globalThis, "window");
    const values = new Map();
    Object.defineProperty(globalThis, "window", {
      configurable: true,
      value: {
        localStorage: {
          getItem(key) {
            return values.get(key) ?? null;
          },
          setItem(key, value) {
            values.set(key, value);
          },
          removeItem(key) {
            values.delete(key);
          },
        },
      },
    });

    try {
      const legacyV6 = structuredClone(afterV1);
      legacyV6.meta.schemaVersion = 6;
      values.set(
        STORAGE_KEY,
        JSON.stringify({
          schemaVersion: 6,
          appVersion: "mvp-local-v6",
          savedAt: "2026-08-15T16:05:00.000Z",
          state: legacyV6,
        }),
      );
      const migrated = loadPersistedState();
      const expected = structuredClone(legacyV6);
      expected.meta.schemaVersion = 15;
      assert.deepEqual(migrated, expected);
      assert.equal(
        migrated.learning.activityProgress[DOMAIN_ANALYZER_V2_ACTIVITY_ID]
          .attemptIds.length,
        1,
      );
      assert.equal(
        migrated.learning.attempts[v1Submission.attemptId].activityVersion,
        1,
      );
    } finally {
      if (previousWindow) {
        Object.defineProperty(globalThis, "window", previousWindow);
      } else {
        delete globalThis.window;
      }
    }
  } finally {
    await vite.close();
  }

  const [domainLabSource, designSystem] = await Promise.all([
    readFile(
      new URL("features/phishlab/DomainUnderMagnifierLab.tsx", projectRoot),
      "utf8",
    ),
    readFile(new URL("app/design-system.css", projectRoot), "utf8"),
  ]);
  assert.match(domainLabSource, /function SegmentDragBoard/);
  assert.match(domainLabSource, /draggable/);
  assert.match(domainLabSource, /data-url-drop-segment/);
  assert.match(domainLabSource, /onPointerMove/);
  assert.match(domainLabSource, /className="url-foundation-progress"/);
  assert.doesNotMatch(domainLabSource, /<select/);
  assert.match(designSystem, /\.url-drag-board/);
  assert.match(designSystem, /\.domain-foundation-opening/);
});

test("publica A conversa já estava acontecendo v2 com três reconstruções e compatibilidade v1", async () => {
  const { createServer } = await import("vite");
  const vite = await createServer({
    root: fileURLToPath(projectRoot),
    configFile: false,
    server: { middlewareMode: true },
    appType: "custom",
    logLevel: "silent",
  });

  try {
    const [contentModule, rulesModule, reducerModule, persistenceModule, selectorsModule, registryModule] =
      await Promise.all([
        vite.ssrLoadModule(
          "/lib/content/activities/compromised-conversation/v2.ts",
        ),
        vite.ssrLoadModule("/lib/domain/rules.ts"),
        vite.ssrLoadModule("/lib/state/app-reducer.ts"),
        vite.ssrLoadModule("/lib/state/persistence.ts"),
        vite.ssrLoadModule("/lib/state/selectors.ts"),
        vite.ssrLoadModule("/lib/activities/registry.ts"),
      ]);
    const {
      COMPROMISED_CONVERSATION_V2_PACKAGES,
      CONVERSATION_RECONSTRUCTION_ACTIVITY_ID,
      CONVERSATION_RECONSTRUCTION_ACTIVITY_VERSION,
      CONVERSATION_RECONSTRUCTION_MECHANIC_ID,
    } = contentModule;
    const {
      COMPROMISED_CONVERSATION_REWARD_CLAIM,
      COMPROMISED_CONVERSATION_TEAM_CLAIM,
      evaluateConversationReconstructionV2,
      isValidConversationReconstructionV2Submission,
    } = rulesModule;
    const { appReducer, createDemoState } = reducerModule;
    const { loadPersistedState, STORAGE_KEY } = persistenceModule;
    const {
      selectLatestConversationReconstructionPackageId,
      selectLatestConversationReconstructionResult,
    } = selectorsModule;
    const { findActivityById } = registryModule;

    assert.equal(COMPROMISED_CONVERSATION_V2_PACKAGES.length, 3);
    assert.equal(
      new Set(
        COMPROMISED_CONVERSATION_V2_PACKAGES.map(
          (contentPackage) => contentPackage.casePackageId,
        ),
      ).size,
      3,
    );
    for (const contentPackage of COMPROMISED_CONVERSATION_V2_PACKAGES) {
      assert.equal(contentPackage.activityVersion, 2);
      assert.equal(contentPackage.content.messages.length, 6);
      assert.equal(contentPackage.content.evidence.length, 5);
      assert.deepEqual(
        new Set(contentPackage.content.initialMessageOrder),
        new Set(contentPackage.allowlists.messageIds),
      );
      assert.ok(
        contentPackage.content.messages.every((message) =>
          message.address.endsWith(".example"),
        ),
      );
    }

    const selectedPackage = COMPROMISED_CONVERSATION_V2_PACKAGES[0];
    const perfectSubmission = {
      attemptId: "attempt:conversation-v2:perfect",
      activityId: CONVERSATION_RECONSTRUCTION_ACTIVITY_ID,
      activityVersion: CONVERSATION_RECONSTRUCTION_ACTIVITY_VERSION,
      casePackageId: selectedPackage.casePackageId,
      completedAt: "2026-08-15T18:00:00.000Z",
      mechanicId: CONVERSATION_RECONSTRUCTION_MECHANIC_ID,
      orderedArtifactIds: [...selectedPackage.allowlists.correctMessageOrder],
      turningPointArtifactId:
        selectedPackage.allowlists.acceptedTurningPointIds[0],
      evidenceAssessments: Object.entries(
        selectedPackage.allowlists.correctEvidenceClassifications,
      ).map(([evidenceId, classificationId]) => ({
        evidenceId,
        classificationId,
      })),
      provisionalConclusionId:
        selectedPackage.allowlists.correctProvisionalConclusionIds[0],
      finalConclusionId:
        selectedPackage.allowlists.correctFinalConclusionId,
      confirmationRouteId:
        selectedPackage.allowlists.correctConfirmationRouteId,
      finalActionId: selectedPackage.allowlists.correctFinalActionId,
      reportDetailIds: [...selectedPackage.allowlists.safeReportDetailIds],
      transferDecisionId:
        selectedPackage.allowlists.correctTransferDecisionId,
    };

    assert.equal(
      isValidConversationReconstructionV2Submission(perfectSubmission),
      true,
    );
    const perfectResult = evaluateConversationReconstructionV2(perfectSubmission);
    assert.equal(perfectResult.score, 100);
    assert.equal(perfectResult.reconstructionPoints, 20);
    assert.equal(perfectResult.turningPointPoints, 20);
    assert.equal(perfectResult.evidencePoints, 20);
    assert.equal(perfectResult.calibrationPoints, 15);
    assert.equal(perfectResult.confirmationPoints, 15);
    assert.equal(perfectResult.responsePoints, 10);
    assert.equal(perfectResult.potentialReward, 130);
    assert.deepEqual(perfectResult.criticalFailureIds, []);

    const legitimatePackage = COMPROMISED_CONVERSATION_V2_PACKAGES[1];
    const legitimateSubmission = {
      ...perfectSubmission,
      attemptId: "attempt:conversation-v2:legitimate",
      casePackageId: legitimatePackage.casePackageId,
      orderedArtifactIds: [...legitimatePackage.allowlists.correctMessageOrder],
      turningPointArtifactId:
        legitimatePackage.allowlists.acceptedTurningPointIds[0],
      evidenceAssessments: Object.entries(
        legitimatePackage.allowlists.correctEvidenceClassifications,
      ).map(([evidenceId, classificationId]) => ({
        evidenceId,
        classificationId,
      })),
      provisionalConclusionId:
        legitimatePackage.allowlists.correctProvisionalConclusionIds[0],
      finalConclusionId:
        legitimatePackage.allowlists.correctFinalConclusionId,
      confirmationRouteId:
        legitimatePackage.allowlists.correctConfirmationRouteId,
      finalActionId: legitimatePackage.allowlists.correctFinalActionId,
      reportDetailIds: [],
      transferDecisionId:
        legitimatePackage.allowlists.correctTransferDecisionId,
    };
    assert.equal(
      evaluateConversationReconstructionV2(legitimateSubmission).score,
      100,
    );

    const duplicateOrder = structuredClone(perfectSubmission);
    duplicateOrder.attemptId = "attempt:conversation-v2:duplicate";
    duplicateOrder.orderedArtifactIds[1] = duplicateOrder.orderedArtifactIds[0];
    assert.equal(
      isValidConversationReconstructionV2Submission(duplicateOrder),
      false,
    );
    const invalidLegitimateReport = structuredClone(legitimateSubmission);
    invalidLegitimateReport.attemptId = "attempt:conversation-v2:bad-report";
    invalidLegitimateReport.reportDetailIds = ["sender-and-time"];
    assert.equal(
      isValidConversationReconstructionV2Submission(invalidLegitimateReport),
      false,
    );

    const initial = createDemoState();
    const v1Submission = {
      attemptId: "attempt:conversation-v1:preserved",
      activityId: CONVERSATION_RECONSTRUCTION_ACTIVITY_ID,
      activityVersion: 1,
      completedAt: "2026-08-15T17:00:00.000Z",
      decision: "reportar",
      inspectedEvidence: ["sender", "link", "context"],
      selectedReasonIds: ["domain", "urgency", "destination"],
    };
    const afterV1 = appReducer(initial, {
      type: "MISSION_COMPLETED",
      payload: v1Submission,
    });
    const v1Reward =
      afterV1.learning.rewardClaims[COMPROMISED_CONVERSATION_REWARD_CLAIM];
    assert.equal(selectLatestConversationReconstructionPackageId(afterV1), null);
    assert.equal(selectLatestConversationReconstructionResult(afterV1).score, 100);

    const afterV2 = appReducer(afterV1, {
      type: "CONVERSATION_RECONSTRUCTION_V2_COMPLETED",
      payload: perfectSubmission,
    });
    assert.equal(
      selectLatestConversationReconstructionPackageId(afterV2),
      selectedPackage.casePackageId,
    );
    assert.equal(selectLatestConversationReconstructionResult(afterV2).score, 100);
    assert.equal(
      afterV2.learning.activityProgress[CONVERSATION_RECONSTRUCTION_ACTIVITY_ID]
        .attemptIds.length,
      2,
    );
    assert.deepEqual(
      afterV2.learning.rewardClaims[COMPROMISED_CONVERSATION_REWARD_CLAIM],
      v1Reward,
    );
    assert.equal(
      afterV2.learning.pointLedger.filter(
        (entry) => entry.sourceId === CONVERSATION_RECONSTRUCTION_ACTIVITY_ID,
      ).length,
      1,
    );
    assert.equal(
      Boolean(
        afterV2.teams.contributionClaims[
          COMPROMISED_CONVERSATION_TEAM_CLAIM
        ],
      ),
      true,
    );
    assert.strictEqual(
      appReducer(afterV2, {
        type: "CONVERSATION_RECONSTRUCTION_V2_COMPLETED",
        payload: perfectSubmission,
      }),
      afterV2,
    );

    const definition = findActivityById(
      CONVERSATION_RECONSTRUCTION_ACTIVITY_ID,
    );
    assert.equal(definition.publishedVersion, 2);
    assert.equal(definition.contractFamily, "conversation-reconstruction-v2");
    assert.deepEqual(definition.acceptedVersions, [1, 2]);
    assert.equal(definition.publishedCasePackageIds.length, 3);

    const previousWindow = Object.getOwnPropertyDescriptor(globalThis, "window");
    const values = new Map();
    Object.defineProperty(globalThis, "window", {
      configurable: true,
      value: {
        localStorage: {
          getItem(key) {
            return values.get(key) ?? null;
          },
          setItem(key, value) {
            values.set(key, value);
          },
          removeItem(key) {
            values.delete(key);
          },
        },
      },
    });

    try {
      const legacyV7 = structuredClone(afterV1);
      legacyV7.meta.schemaVersion = 7;
      values.set(
        STORAGE_KEY,
        JSON.stringify({
          schemaVersion: 7,
          appVersion: "mvp-local-v7",
          savedAt: "2026-08-15T17:05:00.000Z",
          state: legacyV7,
        }),
      );
      const migrated = loadPersistedState();
      const expected = structuredClone(legacyV7);
      expected.meta.schemaVersion = 15;
      assert.deepEqual(migrated, expected);
      assert.equal(
        migrated.learning.attempts[v1Submission.attemptId].activityVersion,
        1,
      );
    } finally {
      if (previousWindow) {
        Object.defineProperty(globalThis, "window", previousWindow);
      } else {
        delete globalThis.window;
      }
    }

    const response = await render("/missoes/a-conversa-ja-estava-acontecendo");
    assert.equal(response.status, 200);
    const html = await response.text();
    assert.match(html, /data-activity-id="mission:compromised-conversation"/);
    assert.match(html, /Miss.o . vers.o 2/);
    assert.match(html, /Caso atribu.do/);
    assert.doesNotMatch(html, />P1<|>P2<|>P3</);
    assert.doesNotMatch(html, /Percurso desta tentativa/);
    assert.match(html, /Iniciar reconstru..o/);
  } finally {
    await vite.close();
  }
});

test("publica Quem enviou de verdade? v2 com mapa de identidade e compatibilidade v1", async () => {
  const { createServer } = await import("vite");
  const vite = await createServer({
    root: fileURLToPath(projectRoot),
    configFile: false,
    server: { middlewareMode: true },
    appType: "custom",
    logLevel: "silent",
  });

  try {
    const [contentModule, rulesModule, reducerModule, persistenceModule, selectorsModule, registryModule] =
      await Promise.all([
        vite.ssrLoadModule(
          "/lib/content/activities/true-sender/v2.ts",
        ),
        vite.ssrLoadModule("/lib/domain/rules.ts"),
        vite.ssrLoadModule("/lib/state/app-reducer.ts"),
        vite.ssrLoadModule("/lib/state/persistence.ts"),
        vite.ssrLoadModule("/lib/state/selectors.ts"),
        vite.ssrLoadModule("/lib/activities/registry.ts"),
      ]);
    const {
      TRUE_SENDER_V2_PACKAGES,
      TRUE_SENDER_V2_ACTIVITY_ID,
      TRUE_SENDER_V2_ACTIVITY_VERSION,
      IDENTITY_MAP_MECHANIC_ID,
    } = contentModule;
    const {
      evaluateTrueSenderV2,
      isValidTrueSenderV2Submission,
      SENDER_INSPECTOR_REWARD_CLAIM,
      SENDER_INSPECTOR_TEAM_CLAIM,
    } = rulesModule;
    const { appReducer, createDemoState } = reducerModule;
    const { loadPersistedState, STORAGE_KEY } = persistenceModule;
    const {
      selectLatestTrueSenderPackageId,
      selectLatestTrueSenderResult,
    } = selectorsModule;
    const { findActivityById } = registryModule;

    assert.equal(TRUE_SENDER_V2_PACKAGES.length, 3);
    assert.equal(
      new Set(
        TRUE_SENDER_V2_PACKAGES.map(
          (contentPackage) => contentPackage.casePackageId,
        ),
      ).size,
      3,
    );
    assert.equal(
      TRUE_SENDER_V2_PACKAGES[0].casePackageId,
      "phishlab:true-sender:v2:p1-support-without-ticket",
    );
    for (const contentPackage of TRUE_SENDER_V2_PACKAGES) {
      assert.equal(contentPackage.activityId, TRUE_SENDER_V2_ACTIVITY_ID);
      assert.equal(contentPackage.activityVersion, 2);
      assert.equal(contentPackage.content.fields.length, 5);
      assert.equal(contentPackage.content.claims.length, 5);
      assert.deepEqual(
        [...new Set(contentPackage.content.claims.map((claim) => claim.correctAssessmentId))].sort(),
        ["fact", "unproven"],
      );
      assert.ok(
        contentPackage.content.fields
          .filter((field) => field.id.includes("from") || field.id.includes("reply"))
          .every((field) => field.value.includes(".example")),
      );
    }

    const selectedPackage = TRUE_SENDER_V2_PACKAGES[0];
    const perfectSubmission = {
      attemptId: "attempt:true-sender-v2:perfect",
      activityId: TRUE_SENDER_V2_ACTIVITY_ID,
      activityVersion: TRUE_SENDER_V2_ACTIVITY_VERSION,
      casePackageId: selectedPackage.casePackageId,
      completedAt: "2026-08-15T19:00:00.000Z",
      mechanicId: IDENTITY_MAP_MECHANIC_ID,
      answerPayload: {
        fieldRelationById: Object.fromEntries(
          selectedPackage.content.fields.map((field) => [
            field.id,
            field.correctRelationId,
          ]),
        ),
        claimAssessmentById: Object.fromEntries(
          selectedPackage.content.claims.map((claim) => [
            claim.id,
            claim.correctAssessmentId,
          ]),
        ),
        inspectedEvidenceIds: selectedPackage.content.fields.map(
          (field) => field.id,
        ),
        verdictId: selectedPackage.content.correctVerdictId,
        verificationRouteId:
          selectedPackage.content.correctVerificationRouteId,
        transferVerdictId:
          selectedPackage.content.transferCase.correctVerdictId,
        transferVerificationRouteId:
          selectedPackage.content.transferCase.correctVerificationRouteId,
        usedHelpIds: ["identity-reference"],
      },
    };

    assert.equal(isValidTrueSenderV2Submission(perfectSubmission), true);
    const perfectResult = evaluateTrueSenderV2(perfectSubmission);
    assert.deepEqual(
      {
        score: perfectResult.score,
        map: perfectResult.mapPoints,
        evidence: perfectResult.evidencePoints,
        conclusion: perfectResult.conclusionPoints,
        transfer: perfectResult.transferPoints,
        reward: perfectResult.potentialReward,
        review: perfectResult.needsReview,
      },
      {
        score: 100,
        map: 20,
        evidence: 30,
        conclusion: 25,
        transfer: 25,
        reward: 78,
        review: false,
      },
    );

    const invalidExtraField = structuredClone(perfectSubmission);
    invalidExtraField.attemptId = "attempt:true-sender-v2:extra";
    invalidExtraField.answerPayload.fieldRelationById.extra = "sender-account";
    assert.equal(isValidTrueSenderV2Submission(invalidExtraField), false);
    assert.throws(() => evaluateTrueSenderV2(invalidExtraField));

    const invalidDuplicateEvidence = structuredClone(perfectSubmission);
    invalidDuplicateEvidence.attemptId = "attempt:true-sender-v2:duplicate";
    invalidDuplicateEvidence.answerPayload.inspectedEvidenceIds.push(
      invalidDuplicateEvidence.answerPayload.inspectedEvidenceIds[0],
    );
    assert.equal(isValidTrueSenderV2Submission(invalidDuplicateEvidence), false);

    const unsafeHumanControl = structuredClone(perfectSubmission);
    unsafeHumanControl.attemptId = "attempt:true-sender-v2:unsafe-control";
    unsafeHumanControl.answerPayload.fieldRelationById[
      selectedPackage.content.fields[0].id
    ] = "current-controller";
    const unsafeResult = evaluateTrueSenderV2(unsafeHumanControl);
    assert.ok(unsafeResult.criticalFailureIds.includes("human-control"));
    assert.equal(unsafeResult.needsReview, true);

    const initial = createDemoState();
    const v1Submission = {
      attemptId: "attempt:true-sender-v1:preserved",
      activityId: TRUE_SENDER_V2_ACTIVITY_ID,
      activityVersion: 1,
      completedAt: "2026-08-15T18:00:00.000Z",
      usedTools: ["displayName", "fromAddress", "replyTo", "messageContext"],
      usedHint: false,
      guidedVerdict: "suspicious",
      independentVerdict: "inconclusive",
      independentEvidence: ["known-address", "changed-request"],
    };
    const afterV1 = appReducer(initial, {
      type: "PHISHLAB_COMPLETED",
      payload: v1Submission,
    });
    const v1Reward = afterV1.learning.rewardClaims[SENDER_INSPECTOR_REWARD_CLAIM];
    assert.equal(selectLatestTrueSenderPackageId(afterV1), null);
    assert.equal(selectLatestTrueSenderResult(afterV1).score, 100);

    const afterV2 = appReducer(afterV1, {
      type: "TRUE_SENDER_V2_COMPLETED",
      payload: perfectSubmission,
    });
    assert.equal(
      selectLatestTrueSenderPackageId(afterV2),
      selectedPackage.casePackageId,
    );
    assert.equal(selectLatestTrueSenderResult(afterV2).score, 100);
    assert.equal(
      afterV2.learning.activityProgress[TRUE_SENDER_V2_ACTIVITY_ID].attemptIds
        .length,
      2,
    );
    assert.deepEqual(
      afterV2.learning.rewardClaims[SENDER_INSPECTOR_REWARD_CLAIM],
      v1Reward,
    );
    assert.equal(
      afterV2.learning.pointLedger.filter(
        (entry) => entry.sourceId === TRUE_SENDER_V2_ACTIVITY_ID,
      ).length,
      1,
    );
    assert.equal(
      Boolean(afterV2.teams.contributionClaims[SENDER_INSPECTOR_TEAM_CLAIM]),
      true,
    );
    assert.strictEqual(
      appReducer(afterV2, {
        type: "TRUE_SENDER_V2_COMPLETED",
        payload: perfectSubmission,
      }),
      afterV2,
    );

    const definition = findActivityById(TRUE_SENDER_V2_ACTIVITY_ID);
    assert.equal(definition.publishedVersion, 2);
    assert.equal(definition.contractFamily, "identity-map-v2");
    assert.deepEqual(definition.acceptedVersions, [1, 2]);
    assert.equal(definition.publishedCasePackageIds.length, 3);

    const previousWindow = Object.getOwnPropertyDescriptor(globalThis, "window");
    const values = new Map();
    Object.defineProperty(globalThis, "window", {
      configurable: true,
      value: {
        localStorage: {
          getItem(key) {
            return values.get(key) ?? null;
          },
          setItem(key, value) {
            values.set(key, value);
          },
          removeItem(key) {
            values.delete(key);
          },
        },
      },
    });

    try {
      const legacyV9 = structuredClone(afterV1);
      legacyV9.meta.schemaVersion = 9;
      values.set(
        STORAGE_KEY,
        JSON.stringify({
          schemaVersion: 9,
          appVersion: "mvp-local-v9",
          savedAt: "2026-08-15T18:05:00.000Z",
          state: legacyV9,
        }),
      );
      const migrated = loadPersistedState();
      const expected = structuredClone(legacyV9);
      expected.meta.schemaVersion = 15;
      assert.deepEqual(migrated, expected);
      assert.equal(
        migrated.learning.attempts[v1Submission.attemptId].activityVersion,
        1,
      );
    } finally {
      if (previousWindow) {
        Object.defineProperty(globalThis, "window", previousWindow);
      } else {
        delete globalThis.window;
      }
    }

    const response = await render("/phishlab/quem-enviou-de-verdade");
    assert.equal(response.status, 200);
    const html = await response.text();
    assert.match(html, /data-activity-id="phishlab:true-sender"/);
    assert.match(html, /class="activity-workspace page-stack identity-map-page"/);
    assert.match(html, /Ver um exemplo/);
    assert.doesNotMatch(html, />P1<|>P2<|>P3</);
  } finally {
    await vite.close();
  }
});

test("publica Uma manhã comum v2 como triagem em lote sem reabrir recompensas v1", async () => {
  const { createServer } = await import("vite");
  const vite = await createServer({
    root: fileURLToPath(projectRoot),
    configFile: false,
    server: { middlewareMode: true },
    appType: "custom",
    logLevel: "silent",
  });

  try {
    const [contentModule, rulesModule, reducerModule, persistenceModule, registryModule, curriculumModule, achievementsModule] =
      await Promise.all([
        vite.ssrLoadModule("/lib/content/activities/workday-triage/v2.ts"),
        vite.ssrLoadModule("/lib/domain/rules.ts"),
        vite.ssrLoadModule("/lib/state/app-reducer.ts"),
        vite.ssrLoadModule("/lib/state/persistence.ts"),
        vite.ssrLoadModule("/lib/activities/registry.ts"),
        vite.ssrLoadModule("/lib/content/curriculum-catalog.ts"),
        vite.ssrLoadModule("/lib/domain/achievements.ts"),
      ]);
    const {
      WORKDAY_TRIAGE_ACTIVITY_ID,
      WORKDAY_TRIAGE_ACTIVITY_VERSION,
      WORKDAY_TRIAGE_MECHANIC_ID,
      WORKDAY_TRIAGE_V2_PACKAGES,
    } = contentModule;
    const {
      SIMULATION_REWARD_CLAIM,
      SIMULATION_TEAM_CLAIM,
      evaluateWorkdayTriageV2,
      isValidWorkdayTriageV2Submission,
    } = rulesModule;
    const { appReducer, createDemoState } = reducerModule;
    const { loadPersistedState, STORAGE_KEY } = persistenceModule;
    const { findActivityById } = registryModule;
    const { FIRST_LEARNING_PATH } = curriculumModule;
    const { selectAchievements } = achievementsModule;

    assert.equal(WORKDAY_TRIAGE_V2_PACKAGES.length, 3);
    assert.deepEqual(
      WORKDAY_TRIAGE_V2_PACKAGES.map((entry) => entry.content.items.length),
      [7, 5, 6],
    );
    assert.equal(
      new Set(WORKDAY_TRIAGE_V2_PACKAGES.map((entry) => entry.casePackageId)).size,
      3,
    );
    for (const contentPackage of WORKDAY_TRIAGE_V2_PACKAGES) {
      assert.equal(contentPackage.activityVersion, 2);
      assert.equal(contentPackage.status, "published");
      assert.ok(contentPackage.content.items.length >= 5);
      assert.ok(
        contentPackage.content.items.every(
          (item) =>
            !/https?:\/\//i.test(item.body) &&
            !/mailto:|tel:/i.test(item.body),
        ),
      );
    }

    const selectedPackage = WORKDAY_TRIAGE_V2_PACKAGES[0];
    const perfectSubmission = {
      attemptId: "attempt:workday-v2:perfect",
      activityId: WORKDAY_TRIAGE_ACTIVITY_ID,
      activityVersion: WORKDAY_TRIAGE_ACTIVITY_VERSION,
      casePackageId: selectedPackage.casePackageId,
      completedAt: "2026-08-16T13:00:00.000Z",
      mechanicId: WORKDAY_TRIAGE_MECHANIC_ID,
      itemDecisions: selectedPackage.content.items.map((item) => ({
        itemId: item.id,
        queueId: selectedPackage.allowlists.correctQueueByItemId[item.id],
        actionId: selectedPackage.allowlists.correctActionByItemId[item.id],
        inspectedEvidenceIds: [
          ...selectedPackage.allowlists.requiredEvidenceIdsByItemId[item.id],
        ],
      })),
      transferActionId: selectedPackage.allowlists.correctTransferActionId,
      transferEvidenceId: selectedPackage.allowlists.correctTransferEvidenceId,
    };

    assert.equal(isValidWorkdayTriageV2Submission(perfectSubmission), true);
    const perfectResult = evaluateWorkdayTriageV2(perfectSubmission);
    assert.equal(perfectResult.score, 100);
    assert.equal(perfectResult.triagePoints, 30);
    assert.equal(perfectResult.actionPoints, 30);
    assert.equal(perfectResult.evidencePoints, 25);
    assert.equal(perfectResult.calibrationPoints, 15);
    assert.equal(perfectResult.potentialReward, 91);
    assert.equal(perfectResult.falsePositives, 0);
    assert.deepEqual(perfectResult.criticalFailureIds, []);

    const invalidDuplicate = structuredClone(perfectSubmission);
    invalidDuplicate.attemptId = "attempt:workday-v2:duplicate-item";
    invalidDuplicate.itemDecisions[1].itemId = invalidDuplicate.itemDecisions[0].itemId;
    assert.equal(isValidWorkdayTriageV2Submission(invalidDuplicate), false);
    assert.throws(() => evaluateWorkdayTriageV2(invalidDuplicate));

    const unsafeSubmission = structuredClone(perfectSubmission);
    unsafeSubmission.attemptId = "attempt:workday-v2:unsafe";
    const sensitive = unsafeSubmission.itemDecisions.find(
      (decision) => decision.itemId === "p1-stock-sheet",
    );
    sensitive.queueId = "resolved";
    sensitive.actionId = "proceed";
    const unsafeResult = evaluateWorkdayTriageV2(unsafeSubmission);
    assert.equal(unsafeResult.needsReview, true);
    assert.ok(
      unsafeResult.criticalFailureIds.includes("unsafe-release:p1-stock-sheet"),
    );

    const initial = createDemoState();
    const afterV2 = appReducer(initial, {
      type: "WORKDAY_TRIAGE_V2_COMPLETED",
      payload: perfectSubmission,
    });
    assert.equal(
      afterV2.learning.activityProgress[WORKDAY_TRIAGE_ACTIVITY_ID].bestScore,
      100,
    );
    assert.equal(
      afterV2.learning.rewardClaims[SIMULATION_REWARD_CLAIM].points,
      91,
    );
    assert.equal(
      afterV2.teams.contributionClaims[SIMULATION_TEAM_CLAIM].points,
      perfectResult.teamPoints,
    );
    assert.equal(
      selectAchievements(afterV2).find(
        (achievement) => achievement.id === "verificacao-segura",
      ).unlocked,
      true,
    );
    assert.strictEqual(
      appReducer(afterV2, {
        type: "WORKDAY_TRIAGE_V2_COMPLETED",
        payload: perfectSubmission,
      }),
      afterV2,
    );

    const v1Submission = {
      attemptId: "attempt:workday-v1:preserved",
      activityId: WORKDAY_TRIAGE_ACTIVITY_ID,
      activityVersion: 1,
      completedAt: "2026-08-16T12:00:00.000Z",
      messageDecisions: [
        { messageId: "team-meeting", action: "keep", inspectedEvidence: ["sender", "link", "context"] },
        { messageId: "account-expiry", action: "report", inspectedEvidence: ["sender", "link", "context"] },
        { messageId: "manager-stock-request", action: "verify", inspectedEvidence: ["sender", "link", "context"] },
        { messageId: "invoice-attachment", action: "report", inspectedEvidence: ["sender", "link", "context"] },
        { messageId: "benefits-update", action: "keep", inspectedEvidence: ["sender", "link", "context"] },
        { messageId: "training-confirmation", action: "keep", inspectedEvidence: ["sender", "link", "context"] },
      ],
    };
    const afterV1 = appReducer(createDemoState(), {
      type: "SIMULATION_COMPLETED",
      payload: v1Submission,
    });
    const originalReward = afterV1.learning.rewardClaims[SIMULATION_REWARD_CLAIM];
    const afterUpgrade = appReducer(afterV1, {
      type: "WORKDAY_TRIAGE_V2_COMPLETED",
      payload: perfectSubmission,
    });
    assert.equal(
      afterUpgrade.learning.activityProgress[WORKDAY_TRIAGE_ACTIVITY_ID].attemptIds.length,
      2,
    );
    assert.deepEqual(
      afterUpgrade.learning.rewardClaims[SIMULATION_REWARD_CLAIM],
      originalReward,
    );
    assert.equal(
      afterUpgrade.learning.pointLedger.filter(
        (entry) => entry.sourceId === WORKDAY_TRIAGE_ACTIVITY_ID,
      ).length,
      1,
    );
    assert.equal(
      Object.hasOwn(afterUpgrade.teams.contributionClaims, SIMULATION_TEAM_CLAIM),
      true,
    );

    const definition = findActivityById(WORKDAY_TRIAGE_ACTIVITY_ID);
    assert.equal(definition.publishedVersion, 2);
    assert.equal(definition.contractFamily, "batch-triage-v2");
    assert.deepEqual(definition.acceptedVersions, [1, 2]);
    assert.equal(definition.publishedCasePackageIds.length, 3);
    assert.equal(
      FIRST_LEARNING_PATH.steps.find(
        (step) => step.activityId === WORKDAY_TRIAGE_ACTIVITY_ID,
      ).activityVersion,
      2,
    );

    const previousWindow = Object.getOwnPropertyDescriptor(globalThis, "window");
    const values = new Map();
    Object.defineProperty(globalThis, "window", {
      configurable: true,
      value: {
        localStorage: {
          getItem(key) {
            return values.get(key) ?? null;
          },
          setItem(key, value) {
            values.set(key, value);
          },
          removeItem(key) {
            values.delete(key);
          },
        },
      },
    });
    try {
      const legacyV12 = structuredClone(afterV1);
      legacyV12.meta.schemaVersion = 12;
      values.set(
        STORAGE_KEY,
        JSON.stringify({
          schemaVersion: 12,
          appVersion: "mvp-local-v12",
          savedAt: "2026-08-16T12:05:00.000Z",
          state: legacyV12,
        }),
      );
      const migrated = loadPersistedState();
      const expected = structuredClone(legacyV12);
      expected.meta.schemaVersion = 15;
      assert.deepEqual(migrated, expected);
    } finally {
      if (previousWindow) {
        Object.defineProperty(globalThis, "window", previousWindow);
      } else {
        delete globalThis.window;
      }
    }

    const response = await render("/simulacoes/dia-de-trabalho");
    assert.equal(response.status, 200);
    const html = await response.text();
    assert.match(html, /data-activity-id="simulation:workday"/);
    assert.match(html, /Simula..o . vers.o 2/);
    assert.match(html, /Come.ar a triagem/);
    assert.match(html, /class="activity-stage-progress workday-foundation-progress"/);
    assert.match(html, /class="workday-v2-opening workday-foundation-opening"/);
    assert.match(html, /workday-opening-inbox/);
    assert.doesNotMatch(html, />P1<|>P2<|>P3</);
  } finally {
    await vite.close();
  }
});

test("mostra estados explícitos para atividades planejadas e rotas desconhecidas", async () => {
  const cases = [
    {
      pathname: "/missoes/pedido-urgente-do-gestor",
      expected: [
        /class="page-stack activity-route-state planned"/,
        /Pedido urgente de um gestor/,
        /Planejada/,
        /ainda n.o possui player, contrato, avaliador e persist.ncia/,
      ],
    },
    {
      pathname: "/radar/falso-gestor",
      expected: [
        /class="page-stack activity-route-state planned"/,
        /Quando o golpista se passa por um gestor/,
        /conte.do permanece planejado/,
      ],
    },
    {
      pathname: "/phishlab/atividade-inexistente",
      expected: [
        /class="page-stack activity-route-state unknown"/,
        /Atividade n.o encontrada/,
        /Nenhuma tentativa, recompensa ou conclus.o foi criada/,
      ],
    },
  ];

  for (const item of cases) {
    const response = await render(item.pathname);
    assert.equal(response.status, 200);
    const html = await response.text();
    for (const pattern of item.expected) assert.match(html, pattern);
  }
});

test("mantém a gestão protegida por login e apresenta a organização somente por setor", async () => {
  const homeResponse = await render("/");
  assert.equal(homeResponse.status, 200);
  const homeHtml = await homeResponse.text();
  assert.doesNotMatch(homeHtml, /Painel de gest.o/);
  assert.doesNotMatch(homeHtml, /Loja 047/);

  const profileResponse = await render("/perfil");
  assert.equal(profileResponse.status, 200);
  const profileHtml = await profileResponse.text();
  assert.match(profileHtml, /Casa &amp; Decora..o/);
  assert.doesNotMatch(profileHtml, /Loja 047/);

  const managementResponse = await render("/gestao");
  assert.equal(managementResponse.status, 307);
  assert.match(
    managementResponse.headers.get("location") ?? "",
    /\/login\?returnTo=%2Fgestao$/,
  );

  const loginResponse = await render("/login");
  assert.equal(loginResponse.status, 200);
  const loginHtml = await loginResponse.text();
  assert.match(loginHtml, /Acesso . plataforma/);
  assert.match(loginHtml, /name="employeeId"/);
  assert.match(loginHtml, /type="password"/);
  assert.match(loginHtml, /N.o h. cadastro p.blico/);
});

test("preserva a migração do cadastro legado e mantém o Arcade fora do fluxo de cadastro", async () => {
  const { createServer } = await import("vite");
  const vite = await createServer({
    root: fileURLToPath(projectRoot),
    configFile: false,
    server: { middlewareMode: true },
    appType: "custom",
    logLevel: "silent",
  });

  try {
    const [
      { appReducer, createDemoState },
      { selectLearnerSector, selectSectorRanking },
      { loadPersistedState, savePersistedState },
    ] =
      await Promise.all([
        vite.ssrLoadModule("/lib/state/app-reducer.ts"),
        vite.ssrLoadModule("/lib/state/selectors.ts"),
        vite.ssrLoadModule("/lib/state/persistence.ts"),
      ]);
    const initial = createDemoState();
    const registered = appReducer(initial, {
      type: "LEARNER_PROFILE_REGISTERED",
      payload: {
        changedAt: "2026-08-23T19:00:00.000Z",
        registration: {
          employeeId: "LM-2048",
          name: "Ana Souza",
          sectorId: "logistica",
          sectorName: "Logística",
          leaderboardParticipation: true,
          leaderboardIdentity: "initials",
        },
      },
    });

    assert.equal(registered.demo.learner.id, "LM-2048");
    assert.equal(registered.demo.learner.name, "Ana Souza");
    assert.equal(registered.demo.activeRole, "learner");
    assert.equal(selectLearnerSector(registered).name, "Logística");
    assert.equal(registered.preferences.leaderboardParticipation, true);
    assert.equal(registered.preferences.leaderboardIdentity, "initials");
    assert.strictEqual(registered.learning, initial.learning);
    assert.equal(
      selectSectorRanking(registered).find((entry) => entry.isCurrent).name,
      "Logística",
    );
    assert.equal(
      registered.admin.auditLog.at(-1).action,
      "learnerProfileRegisteredInLocalDemo",
    );

    const sameNamedSector = appReducer(initial, {
      type: "LEARNER_PROFILE_REGISTERED",
      payload: {
        changedAt: "2026-08-23T19:00:30.000Z",
        registration: {
          employeeId: "LM-1024",
          name: "Bruno Lima",
          sectorId: "casa-decoracao",
          sectorName: "Casa & Decoração",
          leaderboardParticipation: false,
          leaderboardIdentity: "anonymous",
        },
      },
    });
    assert.equal(sameNamedSector.teams.ranking.length, initial.teams.ranking.length);
    assert.equal(
      sameNamedSector.teams.ranking.filter(
        (entry) => entry.name === "Casa & Decoração",
      ).length,
      1,
    );

    const invalid = appReducer(initial, {
      type: "LEARNER_PROFILE_REGISTERED",
      payload: {
        changedAt: "2026-08-23T19:01:00.000Z",
        registration: {
          employeeId: "x",
          name: "A",
          sectorId: "x",
          sectorName: "X",
          leaderboardParticipation: false,
          leaderboardIdentity: "anonymous",
        },
      },
    });
    assert.strictEqual(invalid, initial);

    const previousWindow = Object.getOwnPropertyDescriptor(globalThis, "window");
    const values = new Map();
    Object.defineProperty(globalThis, "window", {
      configurable: true,
      value: {
        localStorage: {
          getItem(key) {
            return values.get(key) ?? null;
          },
          setItem(key, value) {
            values.set(key, String(value));
          },
          removeItem(key) {
            values.delete(key);
          },
        },
      },
    });

    try {
      savePersistedState(registered);
      const restored = loadPersistedState();
      assert.equal(restored.demo.learner.id, "LM-2048");
      assert.equal(restored.teams.name, "Logística");
      assert.deepEqual(restored.learning, registered.learning);
    } finally {
      if (previousWindow) {
        Object.defineProperty(globalThis, "window", previousWindow);
      } else {
        delete globalThis.window;
      }
    }
  } finally {
    await vite.close();
  }

  const response = await render("/cadastro");
  assert.equal(response.status, 307);
  assert.match(response.headers.get("location") ?? "", /\/perfil$/);
});

test("vincula identidade e progresso à conta autenticada sem troca por rota", async () => {
  const { createServer } = await import("vite");
  const vite = await createServer({
    root: fileURLToPath(projectRoot),
    configFile: false,
    server: { middlewareMode: true },
    appType: "custom",
    logLevel: "silent",
  });

  try {
    const [
      { createDemoState },
      { bindStateToAccount },
      { derivePasswordHash },
      { safeReturnPath },
    ] = await Promise.all([
      vite.ssrLoadModule("/lib/state/app-reducer.ts"),
      vite.ssrLoadModule("/lib/state/account-state.ts"),
      vite.ssrLoadModule("/lib/auth/password.ts"),
      vite.ssrLoadModule("/lib/auth/http.ts"),
    ]);

    const initial = createDemoState();
    initial.learning.history.push({
      id: "history:account-test",
      kind: "activityCompleted",
      sourceId: "mission:test",
      title: "Atividade preservada",
      createdAt: "2026-08-23T21:00:00.000Z",
    });
    const marina = {
      id: "account:marina-admin",
      employeeId: "ADMIN-0001",
      name: "Marina Alves",
      role: "administrator",
      sectorId: "administracao",
      sectorName: "Administração",
    };
    const lucas = {
      id: "account:lucas-learner",
      employeeId: "FUNC-0001",
      name: "Lucas",
      role: "learner",
      sectorId: "casa-decoracao",
      sectorName: "Casa & Decoração",
    };

    const administratorState = bindStateToAccount(initial, marina);
    assert.equal(administratorState.demo.learner.name, "Marina Alves");
    assert.equal(administratorState.demo.administrator.name, "Marina Alves");
    assert.equal(administratorState.demo.activeRole, "administrator");
    assert.equal(administratorState.learning.history.length, 1);

    const learnerState = bindStateToAccount(createDemoState(), lucas);
    assert.equal(learnerState.demo.learner.name, "Lucas");
    assert.equal(learnerState.demo.activeRole, "learner");
    assert.equal(learnerState.teams.name, "Casa & Decoração");

    assert.equal(
      await derivePasswordHash(
        "AdminCasa#2026",
        "f4adb627c2d31eedf35bb44e6f78fdf3",
        210_000,
      ),
      "42298bbfe23c0f41aa4e38072a10ca644e698825f470f075e0dc09135441f838",
    );
    assert.equal(safeReturnPath("//example.com"), "/");
    assert.equal(safeReturnPath("/gestao?tab=pessoas"), "/gestao?tab=pessoas");
  } finally {
    await vite.close();
  }

  const [hosting, schema, repository, page, management] = await Promise.all([
    readFile(new URL(".openai/hosting.json", projectRoot), "utf8"),
    readFile(new URL("db/schema.ts", projectRoot), "utf8"),
    readFile(new URL("lib/auth/repository.ts", projectRoot), "utf8"),
    readFile(new URL("app/page.tsx", projectRoot), "utf8"),
    readFile(new URL("features/management/ManagementExperience.tsx", projectRoot), "utf8"),
  ]);
  assert.match(hosting, /"d1": "DB"/);
  assert.match(schema, /authSessions/);
  assert.match(schema, /accountStates/);
  assert.match(repository, /PBKDF|passwordHash|tokenHash|crypto\.getRandomValues/);
  assert.match(page, /account\?\.role === "administrator"/);
  assert.doesNotMatch(management, /Abrir gest.o demonstrativa/);
});

test("recalcula o leaderboard no servidor sem aceitar pontos injetados pelo navegador", async () => {
  const { createServer } = await import("vite");
  const vite = await createServer({
    root: fileURLToPath(projectRoot),
    configFile: false,
    server: { middlewareMode: true },
    appType: "custom",
    logLevel: "silent",
  });

  try {
    const [
      { appReducer, createDemoState },
      { calculateAuthoritativeProgressSummary },
      {
        BANK_CHANGE_ACTIVITY_ID,
        BANK_CHANGE_ACTIVITY_VERSION,
        BANK_CHANGE_CORRECT_CHOICES,
        BANK_CHANGE_EVIDENCE,
      },
    ] = await Promise.all([
      vite.ssrLoadModule("/lib/state/app-reducer.ts"),
      vite.ssrLoadModule("/lib/leaderboard/projection.ts"),
      vite.ssrLoadModule("/lib/content/bank-change-catalog.ts"),
    ]);

    const completed = appReducer(createDemoState(), {
      type: "BANK_CHANGE_COMPLETED",
      payload: {
        attemptId: "attempt:leaderboard:bank-change",
        activityId: BANK_CHANGE_ACTIVITY_ID,
        activityVersion: BANK_CHANGE_ACTIVITY_VERSION,
        completedAt: "2026-08-23T18:00:00.000Z",
        ...BANK_CHANGE_CORRECT_CHOICES,
        inspectedEvidenceIds: BANK_CHANGE_EVIDENCE.map((item) => item.id),
      },
    });
    completed.preferences.leaderboardParticipation = true;

    const honest = calculateAuthoritativeProgressSummary(completed);
    completed.learning.pointLedger.push({
      id: "points:injected",
      claimKey: "injected",
      sourceId: "browser:injected",
      category: "learning",
      points: 50_000,
      status: "confirmed",
      createdAt: "2026-08-23T18:01:00.000Z",
    });
    const recalculated = calculateAuthoritativeProgressSummary(completed);

    assert.equal(honest.completedCurriculumActivities, 1);
    assert.equal(honest.averageScore, 100);
    assert.equal(honest.leaderboardParticipation, true);
    assert.equal(recalculated.totalPoints, honest.totalPoints);
    assert.ok(recalculated.totalPoints < 50_000);
  } finally {
    await vite.close();
  }

  const [schema, route, liveLeaderboard] = await Promise.all([
    readFile(new URL("db/schema.ts", projectRoot), "utf8"),
    readFile(new URL("app/api/leaderboard/route.ts", projectRoot), "utf8"),
    readFile(new URL("features/teams/LiveLeaderboard.tsx", projectRoot), "utf8"),
  ]);
  assert.match(schema, /accountProgressSummaries/);
  assert.match(route, /findAccountBySessionToken/);
  assert.match(liveLeaderboard, /50% desempenho m.dio, 30% conclus.o e 20%/);
  assert.match(liveLeaderboard, /Arcade n.o inclu.do/);
});

test("gerencia pessoas de teste por setor no modo administrativo local e migra v14", async () => {
  const { createServer } = await import("vite");
  const vite = await createServer({
    root: fileURLToPath(projectRoot),
    configFile: false,
    server: { middlewareMode: true },
    appType: "custom",
    logLevel: "silent",
  });

  try {
    const [
      { appReducer, createDemoState },
      { loadPersistedState, STORAGE_KEY },
    ] = await Promise.all([
      vite.ssrLoadModule("/lib/state/app-reducer.ts"),
      vite.ssrLoadModule("/lib/state/persistence.ts"),
    ]);
    const initial = createDemoState();
    const testUser = {
      id: "test-user:paula-jardim",
      employeeId: "TESTE-2001",
      name: "Paula Ribeiro",
      sectorId: "jardim",
      sectorName: "Jardim",
      status: "active",
      createdAt: "2026-08-23T20:00:00.000Z",
      updatedAt: "2026-08-23T20:00:00.000Z",
    };
    const denied = appReducer(initial, {
      type: "MANAGEMENT_TEST_USER_SAVED",
      payload: { user: testUser, changedAt: testUser.updatedAt },
    });
    assert.strictEqual(denied, initial);

    const administrator = appReducer(initial, {
      type: "DEMO_ROLE_CHANGED",
      payload: {
        role: "administrator",
        changedAt: "2026-08-23T19:59:00.000Z",
      },
    });
    assert.equal(administrator.demo.activeRole, "administrator");

    const created = appReducer(administrator, {
      type: "MANAGEMENT_TEST_USER_SAVED",
      payload: { user: testUser, changedAt: testUser.updatedAt },
    });
    assert.equal(created.admin.testUsers.length, initial.admin.testUsers.length + 1);
    assert.equal(created.admin.testUsers.at(-1).sectorName, "Jardim");
    assert.equal(created.admin.auditLog.at(-1).action, "managementTestUserCreated");

    const duplicate = appReducer(created, {
      type: "MANAGEMENT_TEST_USER_SAVED",
      payload: {
        user: {
          ...testUser,
          id: "test-user:duplicated",
          name: "Outra Pessoa",
        },
        changedAt: "2026-08-23T20:01:00.000Z",
      },
    });
    assert.strictEqual(duplicate, created);

    const inactive = appReducer(created, {
      type: "MANAGEMENT_TEST_USER_STATUS_CHANGED",
      payload: {
        userId: testUser.id,
        status: "inactive",
        changedAt: "2026-08-23T20:02:00.000Z",
      },
    });
    assert.equal(
      inactive.admin.testUsers.find((user) => user.id === testUser.id).status,
      "inactive",
    );
    assert.equal(
      inactive.admin.auditLog.at(-1).action,
      "managementTestUserDeactivated",
    );

    const previousWindow = Object.getOwnPropertyDescriptor(globalThis, "window");
    const values = new Map();
    const legacyV14 = structuredClone(initial);
    legacyV14.meta.schemaVersion = 14;
    delete legacyV14.admin.testUsers;
    values.set(
      STORAGE_KEY,
      JSON.stringify({
        schemaVersion: 14,
        appVersion: "mvp-local-v14",
        savedAt: legacyV14.meta.savedAt,
        state: legacyV14,
      }),
    );
    Object.defineProperty(globalThis, "window", {
      configurable: true,
      value: {
        localStorage: {
          getItem(key) { return values.get(key) ?? null; },
          setItem(key, value) { values.set(key, String(value)); },
          removeItem(key) { values.delete(key); },
        },
      },
    });

    try {
      const migrated = loadPersistedState();
      assert.equal(migrated.meta.schemaVersion, 15);
      assert.equal(migrated.admin.testUsers.length, 3);
      assert.deepEqual(migrated.learning, initial.learning);
      assert.deepEqual(migrated.teams, initial.teams);
    } finally {
      if (previousWindow) {
        Object.defineProperty(globalThis, "window", previousWindow);
      } else {
        delete globalThis.window;
      }
    }
  } finally {
    await vite.close();
  }
});
