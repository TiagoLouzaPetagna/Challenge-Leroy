// Populates only Wrangler's local D1 database with clearly labeled ranking fixtures.
// Run with: node scripts/seed-local-sector-ranking.mjs
import { execFileSync } from "node:child_process";
import { pbkdf2Sync, randomBytes } from "node:crypto";
import { mkdtempSync, rmdirSync, unlinkSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const testPassword = "TesteCasa#2026";
const workAreas = [
  {
    id: "loja-gestao",
    name: "Loja - Gestão",
    people: [
      ["Bruna Almeida", 195, true, true],
      ["Diego Moreira", 175, true, true],
      ["Luiza Ferreira", 155, true, false],
    ],
  },
  {
    id: "loja-atendimento",
    name: "Loja - Atendimento",
    people: [
      ["Carla Ribeiro", 220, true, true],
      ["Felipe Martins", 205, true, false],
      ["Nina Barbosa", 190, false, false],
    ],
  },
  {
    id: "loja-comercio",
    name: "Loja - Comércio",
    people: [
      ["Joana Santos", 160, true, true],
      ["Pedro Nunes", 140, true, true],
      ["Lara Costa", 120, false, false],
    ],
  },
  {
    id: "matriz-tecnologia",
    name: "Matriz - Tecnologia",
    people: [
      ["Rafael Lima", 340, true, true],
      ["Sofia Mendes", 300, false, false],
      ["Vitor Rocha", 260, false, false],
    ],
  },
];

function sql(value) {
  if (typeof value === "number") return String(value);
  return `'${String(value).replaceAll("'", "''")}'`;
}

const now = new Date();
const periodParts = new Intl.DateTimeFormat("en-CA", {
  timeZone: "America/Sao_Paulo", year: "numeric", month: "2-digit",
}).formatToParts(now);
const periodId = `${periodParts.find((part) => part.type === "year")?.value}-${periodParts.find((part) => part.type === "month")?.value}`;
const timestamp = now.toISOString();
const statements = [];
let number = 0;

for (const area of workAreas) {
  for (const [name, points, participated, safe] of area.people) {
    number += 1;
    const employeeId = `TESTE-RK-${String(number).padStart(3, "0")}`;
    const accountId = `local-test:sector-ranking:${String(number).padStart(3, "0")}`;
    const salt = randomBytes(16).toString("hex");
    const passwordHash = pbkdf2Sync(testPassword, Buffer.from(salt, "hex"), 100_000, 32, "sha256").toString("hex");
    statements.push(`INSERT OR IGNORE INTO accounts (
      id, employee_id, name, role, sector_id, sector_name, status,
      password_salt, password_hash, password_iterations, created_at, updated_at
    ) VALUES (${[
      accountId, employeeId, `Teste · ${name}`, "learner", area.id, area.name, "active",
      salt, passwordHash, 100_000, timestamp, timestamp,
    ].map(sql).join(", ")});`);
    statements.push(`INSERT OR IGNORE INTO account_progress_summaries (
      account_id, total_points, completed_activities, completed_curriculum_activities,
      completed_missions, average_score, leaderboard_participation, leaderboard_identity,
      last_activity_at, updated_at
    ) VALUES (${[
      accountId, points, 3, 3, 1, 80, 0, "initials", timestamp, timestamp,
    ].map(sql).join(", ")});`);
    if (participated) {
      const responseId = `${accountId}:${area.id}:${periodId}`;
      statements.push(`INSERT OR IGNORE INTO team_protocol_responses (
        id, account_id, sector_id, period_id, order_json, correct, submitted_at
      ) VALUES (${[
        responseId, accountId, area.id, periodId,
        JSON.stringify(safe ? ["pause", "verify", "report"] : ["pause", "shortcut", "verify"]),
        safe ? 1 : 0, timestamp,
      ].map(sql).join(", ")});`);
    }
  }
}

const temporaryDirectory = mkdtempSync(path.join(tmpdir(), "fortifica-ranking-"));
const sqlFile = path.join(temporaryDirectory, "seed.sql");
try {
  writeFileSync(sqlFile, statements.join("\n"), "utf8");
  execFileSync(process.execPath, [
    path.join(projectRoot, "node_modules", "wrangler", "bin", "wrangler.js"),
    "d1", "execute", "fortifica-db", "--local", "--config", "wrangler.jsonc", "--file", sqlFile,
  ], {
    cwd: projectRoot,
    encoding: "utf8",
    maxBuffer: 4_000_000,
    env: {
      ...process.env,
      WRANGLER_WRITE_LOGS: "false",
      WRANGLER_LOG_PATH: path.join(projectRoot, ".wrangler", "logs"),
    },
  });
  console.log(`Banco D1 local: ${number} funcionários de teste em ${workAreas.length} áreas, com pontos e participações de ${periodId}.`);
  console.log(`Matrículas: TESTE-RK-001 a TESTE-RK-${String(number).padStart(3, "0")}. Senha local: ${testPassword}`);
} finally {
  unlinkSync(sqlFile);
  rmdirSync(temporaryDirectory);
}
