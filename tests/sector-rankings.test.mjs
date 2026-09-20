import assert from "node:assert/strict";
import test from "node:test";

import { buildTeamSectorRankings } from "../lib/teams/rankings.ts";

test("participação compara proporções e a média de pontos não favorece setores maiores", () => {
  const { participation, points } = buildTeamSectorRankings([
    { sectorId: "a", sectorName: "A", eligibleMembers: 20, participants: 12, averagePoints: 120 },
    { sectorId: "b", sectorName: "B", eligibleMembers: 5, participants: 4, averagePoints: 120 },
    { sectorId: "c", sectorName: "C", eligibleMembers: 8, participants: 0, averagePoints: 90 },
    { sectorId: "empty", sectorName: "Vazio", eligibleMembers: 0, participants: 0, averagePoints: 0 },
  ], "b");

  assert.deepEqual(participation.map(({ sectorId, participationRate, position }) => [sectorId, participationRate, position]), [
    ["b", 80, 1], ["a", 60, 2], ["c", 0, 3],
  ]);
  assert.deepEqual(points.map(({ sectorId, position }) => [sectorId, position]), [
    ["a", 1], ["b", 1], ["c", 3],
  ]);
  assert.equal(participation[0].isCurrent, true);
});

test("ordena participação pela proporção exata antes de arredondar para exibição", () => {
  const { participation } = buildTeamSectorRankings([
    { sectorId: "a", sectorName: "A", eligibleMembers: 1001, participants: 500, averagePoints: 0 },
    { sectorId: "b", sectorName: "B", eligibleMembers: 1000, participants: 500, averagePoints: 0 },
  ], "a");
  assert.deepEqual(participation.map(({ sectorId, participationRate, position }) => [sectorId, participationRate, position]), [
    ["b", 50, 1], ["a", 50, 2],
  ]);
});
