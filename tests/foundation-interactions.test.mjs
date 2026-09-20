import assert from "node:assert/strict";
import { after, before, test } from "node:test";
import { fileURLToPath } from "node:url";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { createServer } from "vite";

let vite;
let mission;
let exercise;
let content;
let rules;
const noop = () => {};
const render = (component, props) => renderToStaticMarkup(createElement(component, props));
before(async () => {
  const root = fileURLToPath(new URL("../", import.meta.url));
  vite = await createServer({ root, configFile: false, server: { middlewareMode: true }, appType: "custom", logLevel: "silent", resolve: { alias: { "@": root, "next/image": fileURLToPath(new URL("../node_modules/vinext/dist/shims/image.js", import.meta.url)) } }, esbuild: { jsx: "automatic" } });
  [mission, content, rules, exercise] = await Promise.all([
    vite.ssrLoadModule("/features/missions/PhishingFoundationMission.tsx"),
    vite.ssrLoadModule("/lib/content/activities/account-lock/v2.ts"),
    vite.ssrLoadModule("/lib/domain/rules.ts"),
    vite.ssrLoadModule("/features/missions/FoundationExercise.tsx"),
  ]);
});
after(async () => { await vite?.close(); });

const renderStage = (stage, props = {}) => render(exercise.FoundationExercise, {
  stage, answer: {}, tested: false, verified: false, titleRef: { current: null },
  field: noop, onTested: noop, onRoute: noop, onTransferRoute: noop, ...props,
});

test("o e-mail permite leitura sem clique obrigatório, links reais ou campos de credenciais", () => {
  const html = renderStage(0);
  assert.match(html, /use o botão abaixo e confirme seus dados/);
  assert.match(html, /<summary>para você/);
  assert.doesNotMatch(html, /<a\b|<input\b|<button\b|<img\b|Conta ativa|Agora, um alerta legítimo/);
});

test("a consulta oficial só aparece na rota independente, inclusive no novo alerta", () => {
  for (const stage of [2, 4]) {
    for (const route of [undefined, "generic-search", "reply-to-message"]) {
      const html = renderStage(stage, { answer: { confirmationRouteId: route }, transferRoute: route });
      assert.doesNotMatch(html, /Sua conta está ativa|O portal confirma|Acesso normal/);
      assert.doesNotMatch(html, /<a\b|<input\b/);
    }
    const html = renderStage(stage, { answer: { confirmationRouteId: "known-official-reference" }, transferRoute: "known-official-reference" });
    assert.match(html, stage === 4 ? /O portal confirma: sua senha expira amanhã/ : /Sua conta está ativa/);
    if (stage === 2) assert.match(html, /acesso\.casa-digital\.example/);
  }
});

test("o segundo e-mail não antecipa a classificação ou a consulta oficial", () => {
  const html = renderStage(4);
  assert.match(html, /Novo e-mail/);
  assert.doesNotMatch(html, /legítimo|legítima|O portal confirma|Alteração disponível/);
});

test("a missão começa na investigação e preserva resultados anteriores compatíveis", () => {
  const props = { existingResult: null, existingCasePackageId: null, rewardAlreadyClaimed: false, claimedPoints: 0, onComplete: noop, onBackToMissions: noop, onOpenSenderLab: noop, onOpenProfile: noop };
  const opening = render(mission.PhishingFoundationMission, props);
  assert.match(opening, /Etapa 1 de 6: Examinar/);
  assert.equal((opening.match(/<progress\b/g) ?? []).length, 1);
  assert.match(opening, /Um aviso\. Trinta minutos\./);
  assert.match(opening, /Continuar/);
  assert.match(opening, /<button\b[^>]*>Continuar</);
  assert.doesNotMatch(opening, /<button\b[^>]*disabled[^>]*>Continuar</);
  assert.doesNotMatch(opening, /type="radio"|Conhecer PARE|Agora, um alerta legítimo/);

  const answer = { attemptId: "foundation-ui-test", completedAt: "2026-09-12T12:00:00Z", activityId: content.PHISHING_FOUNDATION_ACTIVITY_ID, activityVersion: 2, mechanicId: content.PHISHING_FOUNDATION_MECHANIC_ID, casePackageId: content.PHISHING_FOUNDATION_PACKAGE_ID, requestedActionId: "confirm-account-from-message", protectedAssetId: "corporate-account", potentialConsequenceId: "credential-or-session-exposure", pauseDecisionId: "pause-before-message-action", evaluationId: "connect-request-asset-consequence", confirmationRouteId: "known-official-reference", finalAssessmentId: "suspicious-unconfirmed", finalActionId: "keep-account-and-report", reportDetailIds: ["sender-subject-time", "requested-action", "destination-preview", "independent-check-result"], transferDecisionId: "use-known-route-no-incident" };
  const result = rules.evaluatePhishingFoundationV2(answer);
  assert.equal(result.score, 100);
  const withoutMark = { ...answer };
  delete withoutMark.requestedActionId;
  assert.equal(rules.isValidPhishingFoundationV2Submission(withoutMark), true);
  assert.equal(rules.evaluatePhishingFoundationV2(withoutMark).score, 100);
  assert.equal(rules.evaluatePhishingFoundationV2({ ...withoutMark, protectedAssetId: "meeting-calendar", potentialConsequenceId: "temporary-delay" }).requestImpactPoints, 0);
  assert.equal(rules.isValidPhishingFoundationV2Submission({ ...withoutMark, requestedActionId: "invalid" }), false);
  const complete = render(mission.PhishingFoundationMission, { ...props, existingResult: result, existingCasePackageId: answer.casePackageId, rewardAlreadyClaimed: true, claimedPoints: 130 });
  assert.match(complete, /Etapa 6 de 6: Concluir/);
  assert.match(complete, /Rever minhas decisões/);
  assert.match(complete, /130 pontos já registrados/);
  assert.match(complete, /Refazer missão/);
  assert.doesNotMatch(complete, /<details[^>]* open/);
  const legacy = render(mission.PhishingFoundationMission, { ...props, existingResult: result, existingCasePackageId: "previous-package" });
  assert.match(legacy, /Etapa 1 de 6: Examinar/);
});

test("um resultado com falhas recomenda prática e conserva a revisão por competência", () => {
  const html = render(mission.PhishingFoundationMission, { existingResult: { score: 30, requestImpactPoints: 0, pauseEvaluationPoints: 0, confirmationPoints: 0, responseReportPoints: 0, transferPoints: 0, correctReportDetails: 0, totalSafeReportDetails: 4, criticalFailureIds: ["safe-report"], teamPoints: 0, needsReview: true, potentialReward: 100 }, existingCasePackageId: content.PHISHING_FOUNDATION_PACKAGE_ID, rewardAlreadyClaimed: true, claimedPoints: 100, onComplete: noop, onBackToMissions: noop, onOpenSenderLab: noop, onOpenProfile: noop });
  assert.match(html, /Praticar novamente/);
  assert.match(html, /Precisa revisar/);
  assert.doesNotMatch(html, /Entenda por que funcionou/);
});
