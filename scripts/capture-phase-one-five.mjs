import { mkdir } from "node:fs/promises";
import path from "node:path";

import { chromium } from "@playwright/test";

const baseURL = process.env.PLAYWRIGHT_BASE_URL ?? "http://localhost:4173";
const executablePath = process.env.PLAYWRIGHT_EXECUTABLE_PATH;
const outputDirectory = path.resolve("artifacts/visual-review/phase-1-5");

await mkdir(outputDirectory, { recursive: true });

const browser = await chromium.launch({ executablePath, headless: true });
const context = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 1,
  reducedMotion: "no-preference",
});
const page = await context.newPage();

async function shot(name) {
  await page.evaluate(() => document.fonts.ready);
  await page.mouse.move(1, 1);
  await page.waitForTimeout(350);
  await page.screenshot({
    path: path.join(outputDirectory, `${name}.png`),
    animations: "disabled",
    fullPage: false,
  });
}

async function advance(buttonName) {
  await page.getByRole("button", { name: buttonName, exact: true }).click();
}

await page.goto(`${baseURL}/`);
const dialog = page.getByRole("dialog");
await dialog.waitFor();
await shot("01-onboarding-boas-vindas");

await dialog.getByRole("button", { name: "Começar", exact: true }).click();
for (let step = 0; step < 3; step += 1) {
  await dialog.getByRole("button", { name: "Continuar" }).click();
}
await dialog.getByRole("button", { name: "Começar primeira Missão" }).click();
await page.waitForURL(/\/missoes\/aviso-de-bloqueio$/);
await shot("04-missao-abertura");

await page.goto(`${baseURL}/`);
await shot("02-home");

await page.goto(`${baseURL}/missoes`);
await shot("03-missoes");

await page.goto(`${baseURL}/missoes/aviso-de-bloqueio`);
await shot("04-missao-abertura");

await advance("Observar a mensagem");
await shot("05-missao-observar-remetente");

await advance("Identificar o pedido");
await shot("06-missao-pedido");
await page.getByRole("radio", { name: /Abrir o botão recebido/ }).check();

await advance("Nomear o ativo");
await shot("07-missao-ativo");
await page.getByRole("radio", { name: "Conta e credenciais corporativas" }).check();

await advance("Antecipar a consequência");
await shot("08-missao-consequencia");
await page.getByRole("radio", { name: /Entregar credenciais ou uma sessão/ }).check();

await advance("Conhecer PARE");
await shot("09-missao-pare");

await advance("Praticar a pausa");
await page.getByRole("radio", { name: /Pausar antes de usar/ }).check();
await advance("Visualizar a análise");
await shot("10-missao-analise");

await advance("Escolher como avaliar");
await page.getByRole("radio", { name: /Relacionar o pedido/ }).check();
await advance("Ver o destino representado");
await shot("11-missao-destino-didatico");

await advance("Comparar rotas");
await shot("12-missao-comparar-rotas");
await advance("Escolher uma rota");
await shot("13-missao-reconfirmar");

await page.getByRole("radio", { name: /referência já conhecida/ }).check();
await advance("Consultar o estado");
await advance("Concluir a avaliação");
await page.getByRole("radio", { name: /solicitação suspeita/ }).check();
await advance("Escolher a resposta");
await shot("14-missao-decisao-final");

await page.getByRole("radio", { name: /Não usar o botão/ }).check();
await advance("Preparar o reporte");
for (const label of [
  "Remetente aparente, assunto e horário",
  "Ação solicitada pela mensagem",
  "Prévia inerte do destino apresentado",
  "Resultado da consulta pela referência oficial conhecida",
]) {
  await page.getByRole("checkbox", { name: label }).check();
}
await advance("Aplicar em outro alerta");
await shot("15-missao-transferencia");

await advance("Decidir no novo cenário");
await page
  .getByRole("radio", { name: /Abrir a área oficial pela rota conhecida/ })
  .check();
await advance("Concluir missão");
await page
  .getByRole("heading", { name: "Você respondeu à pressão com processo" })
  .waitFor();
await shot("16-missao-resultado");

await page
  .getByText("Ver detalhamento da pontuação e do aprendizado", { exact: true })
  .click();
await shot("17-missao-resultado-detalhes");

await browser.close();
console.log(outputDirectory);
