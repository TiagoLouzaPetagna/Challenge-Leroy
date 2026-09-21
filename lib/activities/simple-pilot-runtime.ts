import { MANAGER_REQUEST_ID, SIMPLE_PILOTS, SIMPLE_PILOT_VERSION } from "../content/activities/simple-pilots";
import { POINT_RULES } from "../domain/rules";
import type { LegacySimplePilotResult, LegacySimplePilotSubmission, SimplePilotResult, SimplePilotSubmission } from "../domain/types";

function hasValidMetadata(value: { activityId: SimplePilotSubmission["activityId"]; casePackageId: string; attemptId: string; completedAt: string }): boolean {
  return Boolean(
    SIMPLE_PILOTS[value.activityId] &&
    value.casePackageId === `${value.activityId}:case-1` &&
    typeof value.attemptId === "string" && value.attemptId.length > 0 &&
    typeof value.completedAt === "string" && !Number.isNaN(Date.parse(value.completedAt)),
  );
}

export function isValidSimplePilotSubmission(value: SimplePilotSubmission): boolean {
  const definition = SIMPLE_PILOTS[value.activityId];
  return Boolean(
    definition &&
    value.activityVersion === SIMPLE_PILOT_VERSION &&
    hasValidMetadata(value) &&
    Array.isArray(value.answerIds) &&
    value.answerIds.length === definition.tasks.length &&
    definition.tasks.every((task, index) => task.options.some((option) => option.id === value.answerIds[index])),
  );
}

export function isValidLegacySimplePilotSubmission(value: LegacySimplePilotSubmission): boolean {
  const definition = SIMPLE_PILOTS[value.activityId];
  const legacySecondAnswer = value.activityId === MANAGER_REQUEST_ID ? "independent" : "own-route";
  return Boolean(
    definition && value.activityVersion === 1 && hasValidMetadata(value) &&
    definition.tasks[0].options.some((option) => option.id === value.firstAnswerId) &&
    (value.activityId === MANAGER_REQUEST_ID
      ? definition.tasks[1].options.some((option) => option.id === value.secondAnswerId)
      : ["open-received", legacySecondAnswer].includes(value.secondAnswerId)),
  );
}

export function evaluateSimplePilot(submission: SimplePilotSubmission): SimplePilotResult {
  if (!isValidSimplePilotSubmission(submission)) throw new Error("Atividade piloto inválida.");
  const definition = SIMPLE_PILOTS[submission.activityId];
  const correctAnswers = definition.tasks.map((task, index) => submission.answerIds[index] === task.correctId) as SimplePilotResult["correctAnswers"];
  const score = correctAnswers.filter(Boolean).length * 25;
  const basePoints = definition.area === "mission" ? POINT_RULES.mainMission : POINT_RULES.phishLab;
  return {
    score,
    correctAnswers,
    needsReview: score < 100,
    potentialReward: Math.round(basePoints * score / 100),
  };
}

export function evaluateLegacySimplePilot(submission: LegacySimplePilotSubmission): LegacySimplePilotResult {
  if (!isValidLegacySimplePilotSubmission(submission)) throw new Error("Atividade piloto antiga inválida.");
  const firstCorrect = submission.firstAnswerId === (submission.activityId === MANAGER_REQUEST_ID ? "approval" : "registered");
  const secondCorrect = submission.secondAnswerId === (submission.activityId === MANAGER_REQUEST_ID ? "independent" : "own-route");
  const score = Number(firstCorrect) * 50 + Number(secondCorrect) * 50;
  const basePoints = submission.activityId === MANAGER_REQUEST_ID ? POINT_RULES.mainMission : POINT_RULES.phishLab;
  return { score, firstCorrect, secondCorrect, needsReview: score < 100, potentialReward: Math.round(basePoints * score / 100) };
}
