import { and, eq } from "drizzle-orm";

import { getDb } from "@/db";
import { accounts, teamProtocolResponses } from "@/db/schema";
import type { AuthenticatedAccount } from "@/lib/auth/types";
import { currentWorkAreaId } from "@/lib/content/sector-catalog";
import { getLeaderboard } from "@/lib/leaderboard/repository";

import { currentTeamPeriod } from "./protocol";
import { ensureTeamProtocolStorage } from "./protocol-repository";
import { buildTeamSectorRankings, type TeamRankingsResponse } from "./rankings";

export async function getTeamRankings(account: AuthenticatedAccount): Promise<TeamRankingsResponse> {
  await ensureTeamProtocolStorage();
  const period = currentTeamPeriod();
  const leaderboard = await getLeaderboard(account);
  const db = getDb();
  const [members, responses] = await Promise.all([
    db.select({ id: accounts.id, sectorId: accounts.sectorId }).from(accounts).where(and(
      eq(accounts.role, "learner"), eq(accounts.status, "active"),
    )),
    db.select({ accountId: teamProtocolResponses.accountId, sectorId: teamProtocolResponses.sectorId })
      .from(teamProtocolResponses)
      .where(eq(teamProtocolResponses.periodId, period.id)),
  ]);
  const validMembers = new Map(members.map((member) => [member.id, member.sectorId]));
  const participantsBySector = new Map<string, Set<string>>();
  for (const response of responses) {
    const workAreaId = currentWorkAreaId(response.sectorId);
    if (validMembers.get(response.accountId) !== workAreaId) continue;
    const participants = participantsBySector.get(workAreaId) ?? new Set<string>();
    participants.add(response.accountId);
    participantsBySector.set(workAreaId, participants);
  }
  const sectors = leaderboard.sectors.map((sector) => ({
    sectorId: sector.sectorId,
    sectorName: sector.sectorName,
    eligibleMembers: sector.eligibleParticipants,
    participants: participantsBySector.get(sector.sectorId)?.size ?? 0,
    averagePoints: sector.averagePoints,
  }));
  return {
    periodId: period.id,
    periodLabel: period.label,
    ...buildTeamSectorRankings(sectors, account.sectorId),
  };
}
