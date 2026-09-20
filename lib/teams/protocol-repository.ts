import { and, eq, inArray } from "drizzle-orm";

import { getD1Binding, getDb } from "@/db";
import { accounts, teamProtocolResponses } from "@/db/schema";
import type { AuthenticatedAccount } from "@/lib/auth/types";
import { legacySectorIdsFor } from "@/lib/content/sector-catalog";

import {
  currentTeamPeriod,
  isProtocolOrder,
  isSafeProtocolOrder,
  type ProtocolActionId,
  type TeamProtocolBoard,
} from "./protocol";

let storageReady: Promise<void> | null = null;

export async function ensureTeamProtocolStorage() {
  storageReady ??= getD1Binding().batch([
    getD1Binding().prepare(`CREATE TABLE IF NOT EXISTS team_protocol_responses (
      id TEXT PRIMARY KEY NOT NULL,
      account_id TEXT NOT NULL REFERENCES accounts(id) ON DELETE CASCADE,
      sector_id TEXT NOT NULL,
      period_id TEXT NOT NULL,
      order_json TEXT NOT NULL,
      correct INTEGER NOT NULL,
      submitted_at TEXT NOT NULL
    )`),
    getD1Binding().prepare("CREATE UNIQUE INDEX IF NOT EXISTS idx_team_protocol_account_sector_period ON team_protocol_responses(account_id, sector_id, period_id)"),
    getD1Binding().prepare("CREATE INDEX IF NOT EXISTS idx_team_protocol_sector_period ON team_protocol_responses(sector_id, period_id)"),
  ]).then(() => undefined).catch((error) => {
    storageReady = null;
    throw error;
  });
  await storageReady;
}

export async function getTeamProtocolBoard(account: AuthenticatedAccount): Promise<TeamProtocolBoard> {
  await ensureTeamProtocolStorage();
  const period = currentTeamPeriod();
  const db = getDb();
  const [members, responses] = await Promise.all([
    db.select({ id: accounts.id }).from(accounts).where(and(
      eq(accounts.sectorId, account.sectorId), eq(accounts.status, "active"),
    )),
    db.select({ accountId: teamProtocolResponses.accountId, sectorId: teamProtocolResponses.sectorId, orderJson: teamProtocolResponses.orderJson, correct: teamProtocolResponses.correct, submittedAt: teamProtocolResponses.submittedAt })
      .from(teamProtocolResponses)
      .where(and(inArray(teamProtocolResponses.sectorId, [account.sectorId, ...legacySectorIdsFor(account.sectorId)]), eq(teamProtocolResponses.periodId, period.id))),
  ]);
  const memberIds = new Set(members.map((member) => member.id));
  const latestByAccount = new Map<string, typeof responses[number]>();
  for (const response of responses) {
    if (!memberIds.has(response.accountId)) continue;
    const previous = latestByAccount.get(response.accountId);
    if (!previous || response.submittedAt > previous.submittedAt ||
      (response.submittedAt === previous.submittedAt && response.sectorId === account.sectorId)) {
      latestByAccount.set(response.accountId, response);
    }
  }
  const currentResponses = [...latestByAccount.values()];
  const mine = currentResponses.find((response) => response.accountId === account.id);
  let myOrder: ProtocolActionId[] | null = null;
  if (mine) {
    try {
      const parsed: unknown = JSON.parse(mine.orderJson);
      if (isProtocolOrder(parsed)) myOrder = parsed;
    } catch { /* An invalid saved answer remains private and can be replaced. */ }
  }
  return {
    sectorId: account.sectorId,
    sectorName: account.sectorName,
    periodId: period.id,
    periodLabel: period.label,
    participants: currentResponses.length,
    safeDecisions: currentResponses.length >= 3
      ? currentResponses.filter((response) => response.correct).length
      : null,
    myOrder,
  };
}

export async function submitTeamProtocol(account: AuthenticatedAccount, order: unknown): Promise<TeamProtocolBoard> {
  if (!isProtocolOrder(order)) throw new TeamProtocolInputError();
  await ensureTeamProtocolStorage();
  const period = currentTeamPeriod();
  const now = new Date().toISOString();
  await getDb().insert(teamProtocolResponses).values({
    id: `${account.id}:${account.sectorId}:${period.id}`,
    accountId: account.id,
    sectorId: account.sectorId,
    periodId: period.id,
    orderJson: JSON.stringify(order),
    correct: isSafeProtocolOrder(order),
    submittedAt: now,
  }).onConflictDoUpdate({
    target: [teamProtocolResponses.accountId, teamProtocolResponses.sectorId, teamProtocolResponses.periodId],
    set: { orderJson: JSON.stringify(order), correct: isSafeProtocolOrder(order), submittedAt: now },
  });
  return getTeamProtocolBoard(account);
}

export class TeamProtocolInputError extends Error {
  constructor() { super("Escolha três ações diferentes para montar a sequência."); }
}
