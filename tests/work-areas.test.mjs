import assert from "node:assert/strict";
import test from "node:test";

import {
  currentWorkAreaId,
  findSectorDefinition,
  legacySectorIdsFor,
  SECTOR_CATALOG,
} from "../lib/content/sector-catalog.ts";
import { getTeamProtocolCase } from "../lib/teams/protocol.ts";

test("o cadastro oferece áreas de trabalho e converte os setores demonstrativos", () => {
  assert.ok(SECTOR_CATALOG.some(({ id, name }) => id === "loja-comercio" && name === "Loja - Comércio"));
  assert.ok(SECTOR_CATALOG.some(({ id, name }) => id === "matriz-tecnologia" && name === "Matriz - Tecnologia"));
  assert.ok(SECTOR_CATALOG.every(({ id }) => id !== "ferramentas" && id !== "tintas" && id !== "jardim"));
  assert.equal(currentWorkAreaId("casa-decoracao"), "loja-comercio");
  assert.equal(currentWorkAreaId("administracao"), "loja-gestao");
  assert.equal(currentWorkAreaId("tecnologia"), "matriz-tecnologia");
  assert.equal(findSectorDefinition("madeiras")?.name, "Loja - Comércio");
  assert.ok(legacySectorIdsFor("loja-comercio").includes("casa-decoracao"));
  assert.equal(currentWorkAreaId("setor-personalizado"), "setor-personalizado");
  for (const area of SECTOR_CATALOG) {
    assert.doesNotMatch(getTeamProtocolCase(area.id, "2026-09").situation, /pedido da área/);
  }
});
