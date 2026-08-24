import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";

function captureBrowserErrors(page: Page) {
  const errors: string[] = [];

  page.on("pageerror", (error) => errors.push(`pageerror: ${error.message}`));
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(`console: ${message.text()}`);
  });

  return () => expect(errors).toEqual([]);
}

async function completeRequiredTutorial(page: Page) {
  await page.goto("/");
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  await expect(dialog).toHaveAccessibleName(/Etapa 1 de 5/);
  await expect(dialog.getByRole("heading", { level: 2 })).toBeFocused();
  await expect(dialog.locator(".guided-tour-welcome-mascot")).toBeVisible();
  await expect(dialog.locator('.leroyzin img[src$="/welcome.png"]')).toHaveCount(1);

  await dialog.getByRole("button", { name: "Começar", exact: true }).click();
  await expect(dialog.locator(".guided-tour-welcome-mascot")).toHaveCount(0);
  for (let step = 0; step < 3; step += 1) {
    await dialog.getByRole("button", { name: "Continuar" }).click();
  }
  await dialog.getByRole("button", { name: "Começar primeira Missão" }).click();
  await expect(page).toHaveURL(/\/missoes\/aviso-de-bloqueio$/);
}

async function expectNoHorizontalOverflow(page: Page) {
  await expect
    .poll(() =>
      page.evaluate(
        () =>
          document.documentElement.scrollWidth <=
          document.documentElement.clientWidth,
      ),
    )
    .toBe(true);
}

async function expectCompactActivityProgress(
  page: Page,
  accessibleName: string,
  currentLabel: string,
) {
  const progress = page.getByRole("region", { name: accessibleName });
  await expect(progress).toBeVisible();
  await expect(progress.locator('[aria-current="step"]')).toHaveText(currentLabel);
  await expect(progress.getByRole("progressbar")).toHaveCount(1);
  await expect(progress).toContainText("0 etapas concluídas");
  await expect(progress).not.toContainText("A seguir");
  return progress;
}

test("opera a fundação PARE v2 por teclado, move o foco e mantém a página acessível", async ({
  page,
}) => {
  const expectNoBrowserErrors = captureBrowserErrors(page);
  await completeRequiredTutorial(page);

  const shell = page.locator('[data-activity-id="mission:account-lock"]');
  await expect(shell).toBeVisible();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "O aviso que não podia esperar",
  );
  await expect(
    page.getByRole("heading", {
      level: 2,
      name: /Sua conta será bloqueada em 30 minutos/,
    }),
  ).toBeFocused();

  const missionProgress = page.getByRole("region", {
    name: "Progresso da missão de fundamento",
  });
  await expect(page.getByRole("progressbar")).toHaveCount(1);
  await expect(missionProgress.getByRole("progressbar")).toHaveAttribute(
    "aria-label",
    "Etapa 1 de 20: Abertura",
  );
  await expect(missionProgress).toContainText("1 / 20");
  await expect(missionProgress).toContainText("Perceber o pedido");

  await page.evaluate(() => document.fonts.ready);
  const browserVisualContract = await page.evaluate(() => {
    const heading = document.querySelector<HTMLElement>(".foundation-opening h2");
    const rootStyle = getComputedStyle(document.documentElement);
    return {
      bodyFont: getComputedStyle(document.body).fontFamily,
      headingFont: heading ? getComputedStyle(heading).fontFamily : "",
      frauncesLoaded: document.fonts.check('24px "Fraunces Variable"'),
      manropeLoaded: document.fonts.check('16px "Manrope Variable"'),
      scrollbarWidth: rootStyle.scrollbarWidth,
      scrollbarColor: rootStyle.scrollbarColor,
    };
  });
  expect(browserVisualContract.bodyFont).toContain("Manrope Variable");
  expect(browserVisualContract.headingFont).toContain("Fraunces Variable");
  expect(browserVisualContract.frauncesLoaded).toBe(true);
  expect(browserVisualContract.manropeLoaded).toBe(true);
  expect(browserVisualContract.scrollbarWidth).toBe("thin");
  expect(browserVisualContract.scrollbarColor).not.toBe("auto");

  const advance = async (buttonName: string, headingName: string) => {
    await page.getByRole("button", { name: buttonName, exact: true }).press("Enter");
    await expect(
      page.getByRole("heading", { level: 2, name: headingName, exact: true }),
    ).toBeFocused();
  };

  const start = page.getByRole("button", { name: "Observar a mensagem" });
  await start.focus();
  await page.keyboard.press("Enter");
  await expect(
    page.getByRole("heading", {
      level: 2,
      name: "Antes da urgência, veja quem fala",
    }),
  ).toBeFocused();

  await advance("Identificar o pedido", "O que o aviso quer que você faça?");
  await expect(
    page.getByText(
      "É a ação que o aviso tenta provocar, ainda que você não deva executá-la.",
    ),
  ).toHaveCount(0);
  await page.getByRole("radio", { name: /Abrir o botão recebido/ }).check();
  await advance("Nomear o ativo", "O que pode ser afetado?");
  await page.getByRole("radio", { name: "Conta e credenciais corporativas" }).check();
  await advance(
    "Antecipar a consequência",
    "Se a ação seguir adiante, o que pode acontecer?",
  );
  await page.getByRole("radio", { name: /Entregar credenciais ou uma sessão/ }).check();
  await advance("Conhecer PARE", "Pressão vira processo");
  await advance("Praticar a pausa", "Qual pausa protege sua decisão?");
  await page.getByRole("radio", { name: /Pausar antes de usar/ }).check();
  await advance("Visualizar a análise", "Três peças formam uma cadeia");
  await advance("Escolher como avaliar", "Como você avalia este aviso?");
  await page.getByRole("radio", { name: /Relacionar o pedido/ }).check();
  await advance("Ver o destino representado", "O botão muda o destino da ação");
  await advance("Comparar rotas", "Duas rotas, duas origens");
  await advance("Escolher uma rota", "Onde você confere o estado da conta?");
  await page.getByRole("radio", { name: /referência já conhecida/ }).check();
  await advance(
    "Consultar o estado",
    "A fonte conhecida mostra o estado da conta",
  );
  await expect(missionProgress.getByRole("progressbar")).toHaveAttribute(
    "aria-label",
    "Etapa 13 de 20: Consultar o estado oficial",
  );
  await expect(missionProgress).toContainText("13 / 20");
  await expect(missionProgress).toContainText("Reconfirmar");

  await advance("Concluir a avaliação", "O que já é possível concluir?");
  await page.getByRole("radio", { name: /solicitação suspeita/ }).check();
  await advance(
    "Escolher a resposta",
    "Qual resposta mantém o trabalho seguro?",
  );
  await page.getByRole("radio", { name: /Não usar o botão/ }).check();
  await advance("Preparar o reporte", "O que pertence ao reporte?");
  for (const label of [
    "Remetente aparente, assunto e horário",
    "Ação solicitada pela mensagem",
    "Prévia inerte do destino apresentado",
    "Resultado da consulta pela referência oficial conhecida",
  ]) {
    await page.getByRole("checkbox", { name: label }).check();
  }
  await advance("Aplicar em outro alerta", "Agora, um alerta legítimo");
  await advance(
    "Decidir no novo cenário",
    "O processo muda quando o alerta é legítimo?",
  );
  await page.getByRole("radio", { name: /Abrir a área oficial pela rota conhecida/ }).check();
  await page.getByRole("button", { name: "Concluir missão" }).press("Enter");
  await expect(
    page.getByRole("heading", {
      level: 2,
      name: "Você respondeu à pressão com processo",
    }),
  ).toBeFocused();

  await expect(missionProgress.getByRole("progressbar")).toHaveAttribute(
    "aria-label",
    "Etapa 20 de 20: Resultado",
  );
  await expect(missionProgress).toContainText("20 / 20");
  await expect(missionProgress).toContainText("Missão concluída");

  const resultDetails = page.locator("details.foundation-result-details");
  await expect(resultDetails).toHaveJSProperty("open", false);
  await expect(
    page.getByRole("heading", {
      name: "O que você acertou e o que precisa revisar",
    }),
  ).toBeHidden();
  await resultDetails
    .getByText("Ver detalhamento da pontuação e do aprendizado", { exact: true })
    .click();
  await expect(resultDetails).toHaveJSProperty("open", true);
  await expect(
    page.getByRole("heading", {
      name: "O que você acertou e o que precisa revisar",
    }),
  ).toBeVisible();

  const foundationAttempt = await page.evaluate(() => {
    const envelope = JSON.parse(
      window.localStorage.getItem("casa-digital-segura:mvp:v1") ?? "null",
    );
    return Object.values(envelope.state.learning.attempts).find(
      (attempt: unknown) =>
        typeof attempt === "object" &&
        attempt !== null &&
        "mechanicId" in attempt &&
        attempt.mechanicId === "phishing-foundation",
    );
  });
  expect(foundationAttempt).toMatchObject({
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
  });

  const accessibility = await new AxeBuilder({ page }).analyze();
  expect(
    accessibility.violations.filter((violation) =>
      ["serious", "critical"].includes(violation.impact ?? ""),
    ),
  ).toEqual([]);

  await expectNoHorizontalOverflow(page);
  await page.setViewportSize({ width: 1440, height: 900 });
  await expectNoHorizontalOverflow(page);
  expectNoBrowserErrors();
});

test("preserva contraste, texto ampliado e movimento reduzido no fluxo", async ({
  page,
}) => {
  const expectNoBrowserErrors = captureBrowserErrors(page);
  await completeRequiredTutorial(page);
  await page.goto("/perfil");
  await page.getByRole("tab", { name: "Preferências", exact: true }).click();

  await page.getByRole("checkbox", { name: /Alto contraste/ }).check();
  await page.getByLabel(/Tamanho do texto/).selectOption("extraLarge");
  await page.getByRole("checkbox", { name: /Reduzir movimentos/ }).check();
  await page.getByRole("button", { name: "Salvar preferências" }).click();

  const appShell = page.locator(".app-shell");
  await expect(appShell).toHaveAttribute("data-high-contrast", "true");
  await expect(appShell).toHaveAttribute("data-text-size", "extraLarge");
  await expect(appShell).toHaveAttribute("data-reduced-motion", "true");

  await page.goto("/missoes/aviso-de-bloqueio");
  await expect(page.locator('[data-activity-id="mission:account-lock"]')).toBeVisible();
  await expectNoHorizontalOverflow(page);
  expectNoBrowserErrors();
});

test("rotas planejadas e desconhecidas mantêm estado explícito no navegador", async ({
  page,
}) => {
  const expectNoBrowserErrors = captureBrowserErrors(page);
  await completeRequiredTutorial(page);

  await page.goto("/missoes/pedido-urgente-do-gestor");
  await expect(page.locator(".activity-route-state.planned")).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Pedido urgente de um gestor" }),
  ).toBeVisible();

  await page.goto("/phishlab/atividade-inexistente");
  await expect(page.locator(".activity-route-state.unknown")).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Atividade não encontrada" }),
  ).toBeVisible();
  await expectNoHorizontalOverflow(page);
  expectNoBrowserErrors();
});

test("hubs de prática distinguem disponível e planejado sem barreiras de acesso", async ({
  page,
}) => {
  const expectNoBrowserErrors = captureBrowserErrors(page);
  await completeRequiredTutorial(page);

  await page.goto("/simulacoes");
  await expect(
    page.getByRole("heading", { name: "Escolha seu cenário." }),
  ).toBeVisible();
  await expect(page.getByRole("heading", { name: "Uma manhã comum" })).toBeVisible();
  const simulationProduction = page.locator("section").filter({
    has: page.getByRole("heading", { name: "Em produção", exact: true }),
  });
  await expect(simulationProduction.getByRole("button")).toHaveCount(0);
  await expect(simulationProduction.locator("article")).toHaveCount(2);
  for (const scenarioName of ["Central de mensagens", "Ataque multicanal"]) {
    const scenario = simulationProduction.locator("article").filter({
      has: page.getByRole("heading", { name: scenarioName }),
    });
    await expect(scenario.getByText(/Em produção/i).first()).toBeVisible();
  }
  const simulationAccessibility = await new AxeBuilder({ page }).analyze();
  expect(
    simulationAccessibility.violations.filter((violation) =>
      ["serious", "critical"].includes(violation.impact ?? ""),
    ),
  ).toEqual([]);
  await expectNoHorizontalOverflow(page);

  await page.goto("/phishlab");
  await expect(page.getByText("O que você quer investigar?", { exact: true })).toBeVisible();
  for (const stationId of ["mirror-page", "incident-line"]) {
    const station = page.locator(`[data-station-id="${stationId}"]`);
    await expect(station.getByText("Em produção").first()).toBeVisible();
    await expect(station.getByRole("button")).toHaveCount(0);
  }
  const phishLabAccessibility = await new AxeBuilder({ page }).analyze();
  expect(
    phishLabAccessibility.violations.filter((violation) =>
      ["serious", "critical"].includes(violation.impact ?? ""),
    ),
  ).toEqual([]);

  await page.setViewportSize({ width: 390, height: 844 });
  await expectNoHorizontalOverflow(page);
  expectNoBrowserErrors();
});

test("conclui a anatomia de URL v2 por teclado e persiste o envelope atual", async ({
  page,
}) => {
  const expectNoBrowserErrors = captureBrowserErrors(page);
  await completeRequiredTutorial(page);
  await page.goto("/phishlab/analisador-de-links");

  const shell = page.locator('[data-activity-id="phishlab:link-analyzer"]');
  await expect(shell).toBeVisible();
  await expectCompactActivityProgress(
    page,
    "Progresso de Domínio sob a lupa",
    "Abertura",
  );
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Domínio sob a lupa",
  );
  await expect(page.getByText("Caso atribuído", { exact: true })).toBeVisible();
  await expect(page.getByText("Seu papel", { exact: true })).toBeVisible();
  await expect(page.getByText("Sua tarefa", { exact: true })).toBeVisible();
  await expect(page.getByRole("radio")).toHaveCount(0);

  await page
    .getByRole("button", { name: "Aprender a separar o endereço" })
    .press("Enter");
  await expect(
    page.getByRole("heading", { name: "Exemplo de calibração" }),
  ).toBeFocused();
  await page
    .getByRole("button", { name: "Aplicar sem marcações prontas" })
    .press("Enter");
  await expect(
    page.getByRole("heading", {
      name: "A marca aparece antes da origem real",
    }),
  ).toBeFocused();

  const roleAssignments = [
    "Protocolo",
    "Subdomínio",
    "Domínio registrado",
    "Caminho",
    "Parâmetro",
  ];
  await expect(
    page.getByRole("heading", { name: "Monte a anatomia do endereço" }),
  ).toBeVisible();
  await expect(page.getByRole("combobox")).toHaveCount(0);
  for (let index = 0; index < roleAssignments.length; index += 1) {
    await page
      .getByRole("button", { name: new RegExp(`^${roleAssignments[index]}`) })
      .press("Enter");
    await page
      .getByRole("button", { name: new RegExp(`^Trecho ${index + 1},`) })
      .press("Enter");
  }
  await page
    .getByRole("button", { name: "Concluir a anatomia e decidir" })
    .press("Enter");

  await page
    .getByRole("radio", { name: /seguranca-contas\.example/ })
    .check();
  await page
    .getByRole("radio", { name: "Suspeito; usar outra rota" })
    .check();
  await page
    .getByRole("radio", {
      name: /Fechar e abrir o serviço por favorito ou diretório conhecido/,
    })
    .check();
  await page
    .getByRole("button", { name: "Ver consequência simulada" })
    .press("Enter");
  await page
    .getByRole("button", { name: "Revisar antes de confirmar" })
    .press("Enter");
  await page
    .getByRole("button", { name: "Ir à confirmação final" })
    .press("Enter");
  await page
    .getByRole("button", { name: "Confirmar e abrir transferência" })
    .press("Enter");

  await page
    .getByRole("radio", { name: /leroymerlin\.example/ })
    .check();
  await page
    .getByRole("radio", { name: "Legítimo neste contexto" })
    .check();
  await page
    .getByRole("button", { name: "Enviar análise completa" })
    .press("Enter");

  await expect(page.getByRole("heading", { name: "100/100" })).toBeFocused();
  await expect(page.getByText("30/30", { exact: true })).toBeVisible();
  await expect(page.getByText("25/25", { exact: true }).first()).toBeVisible();
  await expect(
    page.getByRole("heading", {
      name: "O que você acertou e o que precisa revisar",
    }),
  ).toBeVisible();
  await expect(page.getByText("Sua resposta", { exact: true }).first()).toBeVisible();
  await expect(
    page.getByText("Resposta esperada", { exact: true }).first(),
  ).toBeVisible();

  const accessibility = await new AxeBuilder({ page }).analyze();
  expect(
    accessibility.violations.filter((violation) =>
      ["serious", "critical"].includes(violation.impact ?? ""),
    ),
  ).toEqual([]);

  const persisted = await page.evaluate(() =>
    JSON.parse(
      window.localStorage.getItem("casa-digital-segura:mvp:v1") ?? "null",
    ),
  );
  expect(persisted.schemaVersion).toBe(14);
  expect(persisted.appVersion).toBe("mvp-local-v14");
  expect(
    Object.values(persisted.state.learning.attempts).some(
      (attempt: unknown) =>
        typeof attempt === "object" &&
        attempt !== null &&
        "mechanicId" in attempt &&
        attempt.mechanicId === "url-anatomy",
    ),
  ).toBe(true);

  await page.getByRole("button", { name: "Ver debrief" }).press("Enter");
  await expect(
    page.getByRole("heading", {
      name: "A origem é definida pelo domínio registrado",
    }),
  ).toBeFocused();
  await expectNoHorizontalOverflow(page);
  expectNoBrowserErrors();
});

test("conclui o mapa de identidade v2 por teclado sem expor os pacotes internos", async ({
  page,
}) => {
  const expectNoBrowserErrors = captureBrowserErrors(page);
  await completeRequiredTutorial(page);
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/phishlab/quem-enviou-de-verdade");

  const shell = page.locator('[data-activity-id="phishlab:true-sender"]');
  await expect(shell).toBeVisible();
  await expectCompactActivityProgress(
    page,
    "Progresso do laboratório de identidade",
    "Abertura",
  );
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Separe o que está comprovado do que ainda não está",
  );
  await expect(page.getByText(/^P1$|^P2$|^P3$/)).toHaveCount(0);

  await page
    .getByRole("button", { name: "Aprender a ler os campos" })
    .press("Enter");
  await expect(
    page.getByRole("heading", { name: "O que cada campo consegue provar" }),
  ).toBeFocused();
  await page.getByRole("button", { name: "Montar o mapa do caso" }).press("Enter");

  const fieldRelations = [
    "declared-identity",
    "sender-account",
    "reply-destination",
    "address-domain",
    "process-context",
  ];
  const relationSelectors = page.getByRole("combobox");
  for (let index = 0; index < fieldRelations.length; index += 1) {
    await relationSelectors.nth(index).selectOption(fieldRelations[index]);
  }
  await page
    .getByRole("button", { name: "Classificar o que está comprovado" })
    .press("Enter");

  const assessments = [0, 1, 0, 0, 1];
  const claimGroups = page.locator(".identity-claim-list fieldset");
  for (let index = 0; index < assessments.length; index += 1) {
    await claimGroups
      .nth(index)
      .getByRole("radio")
      .nth(assessments[index])
      .check();
  }
  await page
    .getByRole("button", { name: "Decidir e escolher confirmação" })
    .press("Enter");

  await page
    .getByRole("radio", { name: "Suspeito; interromper e reportar" })
    .check();
  await page
    .getByRole("radio", {
      name: /Abrir o suporte pelo diretório oficial já conhecido/,
    })
    .check();
  await page
    .getByRole("button", { name: "Revisar resposta principal" })
    .press("Enter");
  await page
    .getByRole("button", { name: "Aplicar em outro contexto" })
    .press("Enter");

  await page
    .getByRole("radio", { name: "Legítimo neste contexto" })
    .check();
  await page
    .getByRole("radio", {
      name: /Conferir na área oficial do fluxo que eu mesmo iniciei/,
    })
    .check();
  await page.getByRole("button", { name: "Concluir laboratório" }).press("Enter");

  await expect(page.getByRole("heading", { name: "100/100" })).toBeFocused();
  await expect(page.getByText("20/20", { exact: true })).toBeVisible();
  await expect(page.getByText("30/30", { exact: true })).toBeVisible();
  await expect(
    page.getByRole("heading", {
      name: "O que você acertou e o que precisa revisar",
    }),
  ).toBeVisible();

  const persisted = await page.evaluate(() =>
    JSON.parse(
      window.localStorage.getItem("casa-digital-segura:mvp:v1") ?? "null",
    ),
  );
  expect(persisted.schemaVersion).toBe(14);
  expect(persisted.appVersion).toBe("mvp-local-v14");
  expect(
    Object.values(persisted.state.learning.attempts).some(
      (attempt: unknown) =>
        typeof attempt === "object" &&
        attempt !== null &&
        "mechanicId" in attempt &&
        attempt.mechanicId === "identity-map",
    ),
  ).toBe(true);

  const accessibility = await new AxeBuilder({ page }).analyze();
  expect(
    accessibility.violations.filter((violation) =>
      ["serious", "critical"].includes(violation.impact ?? ""),
    ),
  ).toEqual([]);
  await expectNoHorizontalOverflow(page);

  await page.getByRole("button", { name: "Ver debrief" }).press("Enter");
  await expect(
    page.getByRole("heading", {
      name: "Conta usada não é o mesmo que pessoa confirmada",
    }),
  ).toBeFocused();
  expectNoBrowserErrors();
});

test("reconstrói a conversa v2 por teclado, confirma fora do fio e abre o debrief", async ({
  page,
}) => {
  const expectNoBrowserErrors = captureBrowserErrors(page);
  await completeRequiredTutorial(page);
  await page.goto("/missoes/a-conversa-ja-estava-acontecendo");

  const shell = page.locator(
    '[data-activity-id="mission:compromised-conversation"]',
  );
  await expect(shell).toBeVisible();
  await expectCompactActivityProgress(
    page,
    "Progresso de A conversa já estava acontecendo",
    "Abertura",
  );
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "A conversa já estava acontecendo",
  );
  await expect(page.getByText("Caso atribuído", { exact: true })).toBeVisible();
  await expect(page.getByText("Seu papel", { exact: true })).toBeVisible();
  await expect(page.getByText("Sua tarefa", { exact: true })).toBeVisible();
  await expect(page.getByRole("radio")).toHaveCount(0);

  await page.getByRole("button", { name: "Iniciar reconstrução" }).press("Enter");
  await expect(
    page.getByRole("heading", {
      name: "Primeiro organize as mensagens; depois sustente sua leitura com evidências",
    }),
  ).toBeFocused();

  const desiredPositions = [
    ["p1-order-opened", "1"],
    ["p1-portal-reviewed", "2"],
    ["p1-dispatch-confirmed", "3"],
    ["p1-destination-change", "4"],
    ["p1-process-question", "5"],
  ];
  for (const [artifactId, position] of desiredPositions) {
    await page
      .locator(`[data-artifact-id="${artifactId}"] select`)
      .selectOption(position);
  }

  const evidenceTitles = [
    "Conta conhecida",
    "Destino cadastrado",
    "Mudança de processo",
    "Pressão temporal",
    "Conta possivelmente comprometida",
  ];
  for (const title of evidenceTitles) {
    await page
      .locator(".conversation-evidence-board article")
      .filter({ hasText: title })
      .getByRole("button", { name: "Prender no painel" })
      .press("Enter");
  }
  await page
    .locator(".conversation-evidence-board article")
    .filter({ hasText: "Pressão temporal" })
    .getByRole("combobox")
    .selectOption("indicator");
  await page
    .locator(".conversation-evidence-board article")
    .filter({ hasText: "Conta possivelmente comprometida" })
    .getByRole("combobox")
    .selectOption("inference");

  await page.getByRole("button", { name: "Marcar a mudança" }).press("Enter");
  await page.getByRole("radio", { name: /Quarta · 08:21/ }).check();
  await page.getByRole("radio", { name: "Uso indevido provável" }).check();
  await page
    .getByRole("button", {
      name: "Verificar pelo contato ou sistema já conhecido",
    })
    .press("Enter");
  await expect(
    page.getByRole("heading", { name: "O contato cadastrado nega a mudança" }),
  ).toBeFocused();

  await page
    .getByRole("button", { name: "Revisar com a nova informação" })
    .press("Enter");
  await page
    .getByRole("button", { name: "Montar resposta final" })
    .press("Enter");
  await page
    .getByRole("radio", {
      name: /Abrir o diretório, portal ou chamado que a empresa já usava/,
    })
    .check();
  await page.getByRole("radio", { name: "Uso indevido provável" }).check();
  await page
    .getByRole("radio", { name: /Manter a pausa e reportar pelo canal oficial/ })
    .check();
  for (const label of [
    "Remetente aparente, canal e horário da solicitação",
    "Mudança observada no pedido ou no processo",
    "Rota usada para confirmar e resposta obtida",
    "Referência ao contexto preservado da conversa",
  ]) {
    await page.getByRole("checkbox", { name: label }).check();
  }
  await page
    .getByRole("button", { name: "Aplicar em outro canal" })
    .press("Enter");
  await page
    .getByRole("radio", {
      name: "Pausar e confirmar pelo diretório, portal ou contato que já existia antes desta mensagem",
    })
    .check();
  await page.getByRole("button", { name: "Concluir Missão" }).press("Enter");

  await expect(
    page.getByRole("heading", { name: "Processo seguro aplicado" }),
  ).toBeFocused();
  await expect(page.locator(".result-score strong")).toHaveText("100");
  await expect(page.getByText("20/20", { exact: true }).first()).toBeVisible();
  await expect(
    page.getByRole("heading", {
      name: "O que você acertou e o que precisa revisar",
    }),
  ).toBeVisible();
  await expect(page.getByText("Sua resposta", { exact: true }).first()).toBeVisible();
  await expect(
    page.getByText("Resposta esperada", { exact: true }).first(),
  ).toBeVisible();

  const accessibility = await new AxeBuilder({ page }).analyze();
  expect(
    accessibility.violations.filter((violation) =>
      ["serious", "critical"].includes(violation.impact ?? ""),
    ),
  ).toEqual([]);

  const persisted = await page.evaluate(() =>
    JSON.parse(
      window.localStorage.getItem("casa-digital-segura:mvp:v1") ?? "null",
    ),
  );
  expect(persisted.schemaVersion).toBe(14);
  expect(persisted.appVersion).toBe("mvp-local-v14");
  expect(
    Object.values(persisted.state.learning.attempts).some(
      (attempt: unknown) =>
        typeof attempt === "object" &&
        attempt !== null &&
        "mechanicId" in attempt &&
        attempt.mechanicId === "conversation-reconstruction",
    ),
  ).toBe(true);

  await page.getByRole("button", { name: "Abrir debrief" }).press("Enter");
  await expect(
    page.getByRole("heading", {
      name: "Conta correta não significa controle comprovado",
    }),
  ).toBeFocused();
  await expect(page.getByRole("heading", { name: "Você iniciou este acesso?" })).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Praticar com outro caso" }),
  ).toBeVisible();
  await page
    .getByRole("button", { name: "Praticar com outro caso" })
    .press("Enter");
  await expect(
    page.getByText("A alteração legítima incompleta", { exact: true }),
  ).toBeVisible();
  await expect(page.getByRole("radio")).toHaveCount(0);
  await expectNoHorizontalOverflow(page);
  expectNoBrowserErrors();
});

test("opera o console de MFA v2 em sequência e revisa cada decisão", async ({
  page,
}) => {
  const expectNoBrowserErrors = captureBrowserErrors(page);
  await completeRequiredTutorial(page);

  await page.evaluate(() => {
    const storageKey = "casa-digital-segura:mvp:v1";
    const envelope = JSON.parse(window.localStorage.getItem(storageKey) ?? "null");
    const completedAt = "2026-08-15T19:00:00.000Z";
    const senderAttemptId = "browser:mfa:sender-prerequisite";
    const domainAttemptId = "browser:mfa:domain-prerequisite";
    envelope.state.learning.attempts[senderAttemptId] = {
      attemptId: senderAttemptId,
      activityId: "phishlab:true-sender",
      activityVersion: 1,
      completedAt,
      usedTools: ["displayName", "fromAddress", "replyTo", "messageContext"],
      usedHint: false,
      guidedVerdict: "suspicious",
      independentVerdict: "inconclusive",
      independentEvidence: ["known-address", "changed-request"],
      status: "evaluated",
      result: {
        score: 100,
        evidencePoints: 30,
        conclusionPoints: 25,
        toolsPoints: 20,
        independentPoints: 25,
        usedTools: 4,
        selectedEvidence: 2,
        teamPoints: 3,
        needsReview: false,
        potentialReward: 78,
      },
    };
    envelope.state.learning.attempts[domainAttemptId] = {
      attemptId: domainAttemptId,
      activityId: "phishlab:link-analyzer",
      activityVersion: 1,
      completedAt,
      usedTools: ["protocol", "subdomain", "registeredDomain", "path"],
      usedHint: false,
      guidedVerdict: "suspicious",
      independentVerdict: "legitimate",
      independentEvidence: ["registered-domain", "expected-context"],
      status: "evaluated",
      result: {
        score: 100,
        evidencePoints: 30,
        conclusionPoints: 25,
        toolsPoints: 20,
        independentPoints: 25,
        usedTools: 4,
        selectedEvidence: 2,
        teamPoints: 3,
        needsReview: false,
        potentialReward: 78,
      },
    };
    envelope.state.learning.activityProgress["phishlab:true-sender"] = {
      activityId: "phishlab:true-sender",
      status: "completed",
      attemptIds: [senderAttemptId],
      lastAttemptId: senderAttemptId,
      bestScore: 100,
      completedAt,
    };
    envelope.state.learning.activityProgress["phishlab:link-analyzer"] = {
      activityId: "phishlab:link-analyzer",
      status: "completed",
      attemptIds: [domainAttemptId],
      lastAttemptId: domainAttemptId,
      bestScore: 100,
      completedAt,
    };
    window.localStorage.setItem(storageKey, JSON.stringify(envelope));
  });

  await page.goto("/missoes/voce-iniciou-este-acesso");
  const shell = page.locator('[data-activity-id="mission:mfa-fatigue"]');
  await expect(shell).toBeVisible();
  await expectCompactActivityProgress(
    page,
    "Progresso de Você iniciou este acesso",
    "Abertura",
  );
  await shell.getByRole("button", { name: "Abrir console simulado" }).click();

  for (let eventIndex = 0; eventIndex < 3; eventIndex += 1) {
    await shell
      .getByRole("radio", { name: /Não corresponde a nenhuma ação iniciada/ })
      .last()
      .check();
    await shell.getByRole("radio", { name: "Negar esta solicitação" }).last().check();
    if (eventIndex < 2) {
      await shell
        .getByRole("button", {
          name: "Registrar e mostrar a próxima solicitação",
        })
        .click();
    }
  }
  await shell
    .getByRole("button", { name: "Continuar para o contato recebido" })
    .click();
  await shell
    .getByRole("radio", { name: /Encerrar o contato sem aprovar/ })
    .check();
  await shell
    .getByRole("button", { name: "Sair do chat e localizar a área oficial" })
    .click();
  await shell
    .getByRole("radio", { name: /Abrir a área de segurança pela intranet/ })
    .check();
  await shell
    .getByRole("checkbox", { name: "Revisar os eventos de autenticação" })
    .check();
  await shell
    .getByRole("checkbox", { name: /Solicitar encerramento das sessões/ })
    .check();
  await shell.getByRole("button", { name: "Montar o reporte" }).click();
  for (const name of [
    "Horários das solicitações",
    "Dispositivos e localizações exibidos",
    "Canal e horário do contato de suposto suporte",
    "O que foi aprovado, negado ou revisado",
  ]) {
    await shell.getByRole("checkbox", { name }).check();
  }
  await shell.getByRole("button", { name: "Revisar minhas decisões" }).click();
  await shell
    .getByRole("button", { name: "Aplicar a regra em um novo pedido" })
    .click();
  await shell
    .getByRole("radio", { name: /Não corresponde a nenhuma ação iniciada/ })
    .check();
  await shell
    .getByRole("radio", { name: /Negar e abrir a área oficial/ })
    .check();
  await shell.getByRole("button", { name: "Concluir missão" }).click();

  await expect(shell.getByRole("heading", { name: "Processo seguro concluído" })).toBeFocused();
  await expect(shell).toContainText("100/100");
  await expect(shell).toContainText("O que você acertou e o que precisa revisar");
  const persisted = await page.evaluate(() =>
    JSON.parse(
      window.localStorage.getItem("casa-digital-segura:mvp:v1") ?? "null",
    ),
  );
  expect(persisted.schemaVersion).toBe(14);
  expect(persisted.appVersion).toBe("mvp-local-v14");
  expect(
    Object.values(persisted.state.learning.attempts).some(
      (attempt: unknown) =>
        typeof attempt === "object" &&
        attempt !== null &&
        "mechanicId" in attempt &&
        attempt.mechanicId === "mfa-console",
    ),
  ).toBe(true);

  const accessibility = await new AxeBuilder({ page })
    .include('[data-activity-id="mission:mfa-fatigue"]')
    .analyze();
  expect(
    accessibility.violations.filter((violation) =>
      ["serious", "critical"].includes(violation.impact ?? ""),
    ),
  ).toEqual([]);
  await expectNoHorizontalOverflow(page);
  expectNoBrowserErrors();
});

test("monta a resposta pós-clique v2 por teclado e explica cada acerto ou erro", async ({
  page,
}) => {
  const expectNoBrowserErrors = captureBrowserErrors(page);
  await completeRequiredTutorial(page);
  await page.goto("/missoes/cliquei-e-agora");

  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Cliquei. E agora?",
  );
  await expectCompactActivityProgress(
    page,
    "Progresso de Cliquei. E agora?",
    "Contexto",
  );
  await page.getByRole("button", { name: "Reconstruir o ocorrido" }).click();

  for (let index = 0; index < 3; index += 1) {
    await page
      .getByRole("button", { name: "Mover Mensagem recebida para cima" })
      .click();
  }
  for (let index = 0; index < 2; index += 1) {
    await page
      .getByRole("button", { name: "Mover Botão selecionado para cima" })
      .click();
  }
  await page
    .getByRole("button", { name: "Mover Página visualizada para cima" })
    .click();
  await page
    .getByRole("radio", { name: /Abri o link e não enviei dados/ })
    .check();
  await page.getByRole("button", { name: "Organizar as ações" }).click();

  const assignments = [
    ["Manter a página fechada", "Primeiras ações seguras"],
    ["Preservar horário, canal e destino aparente", "Primeiras ações seguras"],
    ["Avisar a equipe responsável que o link foi aberto", "Primeiras ações seguras"],
    ["Seguir as medidas indicadas pela área responsável", "Ações sob orientação da equipe responsável"],
    ["Apagar a mensagem e o histórico", "Ações que aumentam o risco"],
    ["Encaminhar o conteúdo para avisar colegas", "Ações que aumentam o risco"],
    ["Abrir novamente para investigar por conta própria", "Ações que aumentam o risco"],
  ] as const;
  for (const [cardTitle, groupLabel] of assignments) {
    await page
      .locator(".recovery-action-tray article", { hasText: cardTitle })
      .getByRole("combobox")
      .selectOption({ label: groupLabel });
  }
  await expect(page.getByText("7 de 7 ações organizadas.")).toBeVisible();
  await page
    .getByRole("button", { name: "Entender o efeito do plano" })
    .click();
  await page.getByRole("button", { name: "Revisar meu plano" }).click();
  await page.getByRole("button", { name: "Montar o reporte" }).click();

  await page
    .getByRole("radio", {
      name: /Abrir a página de segurança pela intranet/,
    })
    .check();
  for (const name of [
    "Canal em que a solicitação chegou",
    "Horário aproximado do ocorrido",
    "Origem e destino aparentes",
    "Ação que realmente foi realizada",
    "Dispositivo usado, sem dados secretos",
  ]) {
    await page.getByRole("checkbox", { name }).check();
  }
  await page
    .getByRole("button", { name: "Aplicar em outro contexto" })
    .click();
  await page
    .getByRole("radio", { name: /Clique sem envio de dados/ })
    .check();
  const transferSelects = page.locator(".recovery-transfer-order select");
  await transferSelects
    .nth(0)
    .selectOption({ label: "Manter a página fechada" });
  await transferSelects
    .nth(1)
    .selectOption({ label: "Avisar a equipe responsável que o link foi aberto" });
  await page.getByRole("button", { name: "Concluir atividade" }).click();

  await expect(page.getByText("100", { exact: true }).first()).toBeVisible();
  await expect(
    page.getByRole("heading", {
      name: "O que você acertou e o que precisa revisar",
    }),
  ).toBeVisible();
  const transferExposureReview = page.locator(
    ".activity-answer-review__item",
    { has: page.getByRole("heading", { name: "O que aconteceu no novo contexto" }) },
  );
  await expect(transferExposureReview).toContainText("Acertou");
  await expect(transferExposureReview).toContainText("Clique sem envio de dados");
  const transferActionsReview = page.locator(
    ".activity-answer-review__item",
    { has: page.getByRole("heading", { name: "Primeiras ações no novo contexto" }) },
  );
  await expect(transferActionsReview).toContainText("Acertou");
  await expect(transferActionsReview).toContainText(
    "Manter a página fechada → Avisar a equipe responsável que o link foi aberto",
  );

  const persisted = await page.evaluate(() =>
    JSON.parse(
      window.localStorage.getItem("casa-digital-segura:mvp:v1") ?? "null",
    ),
  );
  expect(persisted.schemaVersion).toBe(14);
  expect(persisted.appVersion).toBe("mvp-local-v14");
  expect(
    Object.values(persisted.state.learning.attempts).some(
      (attempt: unknown) =>
        typeof attempt === "object" &&
        attempt !== null &&
        "mechanicId" in attempt &&
        attempt.mechanicId === "incident-response-builder",
    ),
  ).toBe(true);

  await page.getByRole("button", { name: "Ver resumo final" }).click();
  await page.getByRole("button", { name: "Praticar outro caso" }).click();
  await expect(
    page.getByRole("heading", {
      name: "Você recebeu um comprovante fictício associado a uma entrega possível.",
    }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Reconstruir o ocorrido" }).click();
  await page
    .getByRole("radio", {
      name: /Baixado; abertura ou execução não comprovadas/,
    })
    .check();
  await page.getByRole("button", { name: "Organizar as ações" }).click();
  await expect(page.getByText("Contexto deste exercício")).toBeVisible();
  await expect(
    page.getByText(
      "O histórico mostra que o arquivo foi visualizado no navegador e baixado. Não há registro suficiente para afirmar que ele foi aberto ou executado.",
    ),
  ).toBeVisible();
  await expect(
    page.getByText("Primeiras ações seguras", { exact: true }).first(),
  ).toBeVisible();
  await expect(
    page
      .getByText("Ações sob orientação da equipe responsável", { exact: true })
      .first(),
  ).toBeVisible();
  await expect(
    page.getByText("Ações que aumentam o risco", { exact: true }).first(),
  ).toBeVisible();
  await expect(
    page.getByText("Não abrir nem executar o arquivo baixado"),
  ).toBeVisible();
  await expect(
    page.getByText("Avisar a equipe responsável sobre o download"),
  ).toBeVisible();
  await expect(page.getByText("Interrompa e reporte agora")).toHaveCount(0);

  const accessibility = await new AxeBuilder({ page }).analyze();
  expect(
    accessibility.violations.filter((violation) =>
      ["serious", "critical"].includes(violation.impact ?? ""),
    ),
  ).toEqual([]);
  await expectNoHorizontalOverflow(page);
  expectNoBrowserErrors();
});

test("tria Uma manhã comum v2 por teclado, preserva inconclusivos e revisa o lote", async ({
  page,
}) => {
  const expectNoBrowserErrors = captureBrowserErrors(page);
  await completeRequiredTutorial(page);
  await page.goto("/simulacoes/dia-de-trabalho");

  const shell = page.locator('[data-activity-id="simulation:workday"]');
  await expect(shell).toBeVisible();
  await expectCompactActivityProgress(
    page,
    "Progresso de Uma manhã comum",
    "Contexto",
  );
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Uma manhã comum",
  );
  await expect(page.getByText("Pacote atribuído")).toBeVisible();
  await expect(page.getByText(/^P1$|^P2$|^P3$/)).toHaveCount(0);

  await page.getByRole("button", { name: "Começar a triagem" }).click();
  await expect(
    page.getByRole("heading", {
      level: 2,
      name: "Reduza a entrada sem forçar uma certeza",
    }),
  ).toBeFocused();

  const cases = [
    {
      title: "Alinhamento da área às 15h",
      evidence: ["Origem", "Agenda"],
      action: "Prosseguir pelo processo normal",
      queue: "Resolvidos",
    },
    {
      title: "Conta bloqueada em 20 minutos",
      evidence: ["Endereço completo", "Destino", "Contexto"],
      action: "Conter e avisar a equipe responsável",
      queue: "Resolvidos",
    },
    {
      title: "Planilha completa de inventário",
      evidence: ["Perfil", "Histórico"],
      action: "Manter a ação bloqueada e verificar",
      queue: "Inconclusivos",
    },
    {
      title: "Nota fiscal corrigida — pagamento hoje",
      evidence: ["Cadastro", "Arquivo", "Pedido"],
      action: "Conter e avisar a equipe responsável",
      queue: "Resolvidos",
    },
    {
      title: "Calendário de benefícios atualizado",
      evidence: ["Origem", "Pedido"],
      action: "Prosseguir pelo processo normal",
      queue: "Resolvidos",
    },
    {
      title: "Atendimento seguro · terça-feira",
      evidence: ["Inscrição", "Local"],
      action: "Prosseguir pelo processo normal",
      queue: "Resolvidos",
    },
    {
      title: "É sobre a planilha que pedi por e-mail",
      evidence: ["Contato", "Narrativa"],
      action: "Manter a ação bloqueada e verificar",
      queue: "Inconclusivos",
    },
  ];

  const reader = page.locator(".workday-v2-reader");
  for (const item of cases) {
    await page
      .getByRole("button", { name: new RegExp(item.title.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")) })
      .click();
    await expect(reader.getByRole("heading", { level: 3 })).toHaveText(item.title);
    for (const evidenceLabel of item.evidence) {
      await reader
        .getByRole("button", { name: new RegExp(`^${evidenceLabel}`) })
        .click();
    }
    await reader.getByRole("radio", { name: item.action }).check();
    await reader.locator(".workday-v2-destination select").selectOption({
      label: item.queue,
    });
  }

  await expect(page.getByText("7 de 7")).toBeVisible();
  await page.getByRole("button", { name: "Revisar o lote" }).click();
  await expect(
    page.getByRole("heading", {
      level: 2,
      name: "Confira o lote antes de concluir",
    }),
  ).toBeFocused();
  await expect(page.locator(".workday-v2-review-list article")).toHaveCount(7);

  await page.getByRole("button", { name: "Aplicar em outro canal" }).click();
  await page
    .getByRole("radio", { name: "Manter a ação bloqueada e verificar" })
    .check();
  await page
    .getByRole("radio", {
      name: "Registro obtido no diretório ou sistema conhecido",
    })
    .check();
  await page.getByRole("button", { name: "Concluir Simulação" }).click();

  await expect(
    page.getByRole("heading", {
      level: 2,
      name: "O lote foi tratado com proporcionalidade",
    }),
  ).toBeFocused();
  await expect(page.locator(".result-score")).toContainText("100");
  await expect(page.locator(".activity-answer-review__item")).toHaveCount(8);
  await expect(page.getByText("Acertou", { exact: true })).toHaveCount(8);

  const persisted = await page.evaluate(() =>
    JSON.parse(
      window.localStorage.getItem("casa-digital-segura:mvp:v1") ?? "null",
    ),
  );
  expect(persisted.schemaVersion).toBe(14);
  expect(persisted.appVersion).toBe("mvp-local-v14");
  expect(
    Object.values(persisted.state.learning.attempts).some(
      (attempt: unknown) =>
        typeof attempt === "object" &&
        attempt !== null &&
        "mechanicId" in attempt &&
        attempt.mechanicId === "batch-triage",
    ),
  ).toBe(true);

  const accessibility = await new AxeBuilder({ page }).analyze();
  expect(
    accessibility.violations.filter((violation) =>
      ["serious", "critical"].includes(violation.impact ?? ""),
    ),
  ).toEqual([]);
  await expectNoHorizontalOverflow(page);
  expectNoBrowserErrors();
});

test("opera Mudança bancária v2 como estação e mantém o resultado privado", async ({
  page,
}) => {
  const expectNoBrowserErrors = captureBrowserErrors(page);
  await completeRequiredTutorial(page);
  await page.goto("/equipes/mudanca-bancaria-sem-atalho");

  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Mudança bancária sem atalho",
  );
  await expectCompactActivityProgress(
    page,
    "Progresso de Mudança bancária sem atalho",
    "Contexto",
  );
  await expect(page.getByText("Estação de processo · caso fictício")).toBeVisible();
  await page.getByRole("button", { name: "Começar pela comparação" }).click();
  await expect(
    page.getByRole("heading", {
      level: 1,
      name: "O que mudou e o que apenas parece convincente?",
    }),
  ).toBeFocused();

  for (const label of [
    "A conta bancária é diferente",
    "O telefone de confirmação é novo",
    "O pedido tenta abrir uma exceção",
    "O prazo não comprova autorização",
  ]) {
    await page.getByRole("checkbox", { name: new RegExp(label) }).check();
  }
  await page.getByRole("button", { name: "Escolher a confirmação" }).click();
  await page
    .getByRole("radio", { name: /Contato homologado no cadastro/ })
    .check();
  await page.getByRole("button", { name: "Consultar esta fonte" }).click();
  await expect(
    page.getByText(/a fornecedora não pediu a alteração/),
  ).toBeVisible();
  await page.getByRole("button", { name: "Montar o processo" }).click();

  for (const label of [
    "Suspender alteração e pagamento relacionado",
    "Preservar mensagem e documento",
    "Confirmar pelo contato cadastrado",
    "Manter o bloqueio após a negativa",
    "Abrir o fluxo oficial",
    "Exigir segunda aprovação",
    "Registrar possível comprometimento",
  ]) {
    await page.getByRole("checkbox", { name: new RegExp(label) }).check();
  }
  await expect(page.getByText("7 ações no processo.")).toBeVisible();
  await page.getByRole("button", { name: "Montar o reporte" }).click();

  for (const label of [
    "Remetente e horário",
    "Fornecedor, pedido e valor",
    "Mudança solicitada",
    "Contenção adotada",
    "Fonte consultada e resposta",
  ]) {
    await page.getByRole("checkbox", { name: new RegExp(label) }).check();
  }
  await expect(page.getByText("Nenhum reporte será enviado.")).toBeVisible();
  await page.getByRole("button", { name: "Revisar a estação" }).click();
  await expect(
    page.getByRole("heading", {
      level: 1,
      name: "Confira o processo que você montou",
    }),
  ).toBeFocused();
  await page.getByRole("button", { name: "Concluir estação" }).click();

  await expect(
    page.getByRole("heading", {
      level: 1,
      name: "O processo protegeu a mudança",
    }),
  ).toBeFocused();
  await expect(page.locator(".bank-change-result-score")).toContainText("100");
  await expect(page.getByText("Acertou", { exact: true })).toHaveCount(5);
  await expect(page.getByText("Controles completos", { exact: true })).toBeVisible();

  const persisted = await page.evaluate(() =>
    JSON.parse(
      window.localStorage.getItem("casa-digital-segura:mvp:v1") ?? "null",
    ),
  );
  expect(persisted.schemaVersion).toBe(14);
  expect(persisted.appVersion).toBe("mvp-local-v14");
  expect(
    Object.values(persisted.state.learning.attempts).some(
      (attempt: unknown) =>
        typeof attempt === "object" &&
        attempt !== null &&
        "mechanicId" in attempt &&
        attempt.mechanicId === "process-station",
    ),
  ).toBe(true);

  const accessibility = await new AxeBuilder({ page }).analyze();
  expect(
    accessibility.violations.filter((violation) =>
      ["serious", "critical"].includes(violation.impact ?? ""),
    ),
  ).toEqual([]);
  await expectNoHorizontalOverflow(page);
  expectNoBrowserErrors();
});
