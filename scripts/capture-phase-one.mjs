import { mkdir } from "node:fs/promises";
import path from "node:path";

import { chromium } from "@playwright/test";

const baseURL = process.env.PLAYWRIGHT_BASE_URL ?? "http://localhost:3000";
const executablePath = process.env.PLAYWRIGHT_EXECUTABLE_PATH;
const outputDirectory = path.resolve("artifacts/visual-review/phase-1");

await mkdir(outputDirectory, { recursive: true });

const browser = await chromium.launch({ executablePath, headless: true });
const context = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 1,
  reducedMotion: "no-preference",
});
const page = await context.newPage();

async function shot(name) {
  await page.waitForTimeout(500);
  await page.screenshot({
    path: path.join(outputDirectory, `${name}.png`),
    animations: "allow",
    fullPage: false,
  });
}

await page.goto(`${baseURL}/`);
const dialog = page.getByRole("dialog");
await dialog.getByRole("button", { name: "Começar", exact: true }).click();
for (let step = 0; step < 3; step += 1) {
  await dialog.getByRole("button", { name: "Continuar" }).click();
}
await dialog.getByRole("button", { name: "Começar primeira Missão" }).click();
await page.waitForURL(/\/missoes\/aviso-de-bloqueio$/);
await shot("03-missao-abertura");

await page.goto(`${baseURL}/`);
await shot("01-home");

await page.goto(`${baseURL}/missoes`);
await shot("02-missoes");

await page.goto(`${baseURL}/missoes/aviso-de-bloqueio`);
await page.waitForTimeout(800);
await page.getByRole("button", { name: "Começar pelo pedido" }).click();
await page.getByRole("heading", { name: "O que a mensagem quer provocar?" }).waitFor();
await shot("04-missao-investigacao");

await page.getByRole("radio", { name: /Abrir o botão recebido/ }).check();
await page.getByRole("radio", { name: "Conta e credenciais corporativas" }).check();
await page.getByRole("radio", { name: /Entregar credenciais ou uma sessão/ }).check();
await page.getByRole("button", { name: "Aplicar PARE" }).click();
await shot("05-missao-decisao");

await page.getByRole("radio", { name: /Pausar antes de usar/ }).check();
await page.getByRole("radio", { name: /Relacionar o pedido/ }).check();
await page.getByRole("button", { name: "Ver a consequência simulada" }).click();
await shot("06-missao-descoberta");

await page.getByRole("button", { name: "Revisar minha cadeia" }).click();
await page.getByRole("button", { name: "Reconfirmar e responder" }).click();
await page.getByRole("radio", { name: /referência já conhecida/ }).check();
await page.getByRole("radio", { name: /solicitação suspeita/ }).check();
await page.getByRole("radio", { name: /Não usar o botão/ }).check();
for (const label of [
  "Remetente aparente, assunto e horário",
  "Ação solicitada pela mensagem",
  "Prévia inerte do destino apresentado",
  "Resultado da consulta pela referência oficial conhecida",
]) {
  await page.getByRole("checkbox", { name: label }).check();
}
await page.getByRole("button", { name: "Aplicar em outro alerta" }).click();
await page.getByRole("radio", { name: /Abrir a área oficial pela rota conhecida/ }).check();
await page.getByRole("button", { name: "Concluir missão" }).click();
await page.getByRole("heading", { name: "Você respondeu à pressão com processo" }).waitFor();
await shot("07-missao-resultado");

await browser.close();
console.log(outputDirectory);
