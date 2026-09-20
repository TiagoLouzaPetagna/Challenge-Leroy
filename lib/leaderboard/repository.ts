import { and, eq } from "drizzle-orm";

import { getDb } from "@/db";
import {
  accountProgressSummaries,
  accounts,
  accountStates,
} from "@/db/schema";
import type { AuthenticatedAccount } from "@/lib/auth/types";
import {
  ensureAuthStorage,
  saveAccountProgressSummary,
} from "@/lib/auth/repository";
import { FIRST_LEARNING_PATH } from "@/lib/content/curriculum-catalog";
import type { AppState } from "@/lib/domain/types";
import { isValidState } from "@/lib/state/persistence";

import type {
  CurrentLeaderboardParticipant,
  IndividualLeaderboardEntry,
  LeaderboardResponse,
  SectorLeaderboardEntry,
} from "./types";

type LearnerProgressRow = {
  accountId: string;
  name: string;
  sectorId: string;
  sectorName: string;
  totalPoints: number;
  completedActivities: number;
  completedCurriculumActivities: number;
  averageScore: number;
  leaderboardParticipation: boolean;
  leaderboardIdentity: "initials" | "displayName" | "anonymous";
};

function roundPercentage(value: number): number {
  return Math.round(value * 10) / 10;
}

function stableAnonymousLabel(accountId: string): string {
  let hash = 2166136261;
  for (const character of accountId) {
    hash ^= character.charCodeAt(0);
    hash = Math.imul(hash, 16777619);
  }
  return `Participante ${(hash >>> 0).toString(16).slice(-4).toUpperCase().padStart(4, "0")}`;
}

function initials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "Participante";
  const value = `${parts[0][0] ?? ""}${parts.length > 1 ? parts.at(-1)?.[0] ?? "" : ""}`;
  return value.toLocaleUpperCase("pt-BR");
}

function leaderboardName(row: LearnerProgressRow): string {
  if (row.leaderboardIdentity === "anonymous") {
    return stableAnonymousLabel(row.accountId);
  }
  if (row.leaderboardIdentity === "initials") return initials(row.name);
  return row.name;
}

async function refreshStaleSummaries(): Promise<void> {
  const staleCandidates = await getDb()
    .select({
      accountId: accounts.id,
      stateJson: accountStates.stateJson,
      stateUpdatedAt: accountStates.updatedAt,
      summaryUpdatedAt: accountProgressSummaries.updatedAt,
    })
    .from(accounts)
    .innerJoin(accountStates, eq(accountStates.accountId, accounts.id))
    .leftJoin(
      accountProgressSummaries,
      eq(accountProgressSummaries.accountId, accounts.id),
    )
    .where(and(eq(accounts.role, "learner"), eq(accounts.status, "active")));

  for (const candidate of staleCandidates) {
    if (
      candidate.summaryUpdatedAt &&
      candidate.summaryUpdatedAt >= candidate.stateUpdatedAt
    ) {
      continue;
    }

    try {
      const state = JSON.parse(candidate.stateJson) as unknown;
      if (isValidState(state)) {
        await saveAccountProgressSummary(
          candidate.accountId,
          state as AppState,
          candidate.stateUpdatedAt,
        );
      }
    } catch {
      // Um estado legado corrompido não deve bloquear os demais rankings.
    }
  }
}

async function listLearnerProgress(): Promise<LearnerProgressRow[]> {
  const rows = await getDb()
    .select({
      accountId: accounts.id,
      name: accounts.name,
      sectorId: accounts.sectorId,
      sectorName: accounts.sectorName,
      totalPoints: accountProgressSummaries.totalPoints,
      completedActivities: accountProgressSummaries.completedActivities,
      completedCurriculumActivities:
        accountProgressSummaries.completedCurriculumActivities,
      averageScore: accountProgressSummaries.averageScore,
      leaderboardParticipation:
        accountProgressSummaries.leaderboardParticipation,
      leaderboardIdentity: accountProgressSummaries.leaderboardIdentity,
    })
    .from(accounts)
    .leftJoin(
      accountProgressSummaries,
      eq(accountProgressSummaries.accountId, accounts.id),
    )
    .where(and(eq(accounts.role, "learner"), eq(accounts.status, "active")));

  return rows.map((row) => ({
    accountId: row.accountId,
    name: row.name,
    sectorId: row.sectorId,
    sectorName: row.sectorName,
    totalPoints: row.totalPoints ?? 0,
    completedActivities: row.completedActivities ?? 0,
    completedCurriculumActivities: row.completedCurriculumActivities ?? 0,
    averageScore: row.averageScore ?? 0,
    leaderboardParticipation: row.leaderboardParticipation ?? false,
    leaderboardIdentity: row.leaderboardIdentity ?? "initials",
  }));
}

function createIndividualRanking(
  rows: LearnerProgressRow[],
  currentAccountId: string,
): IndividualLeaderboardEntry[] {
  return rows
    .filter((row) => row.leaderboardParticipation)
    .sort(
      (left, right) =>
        right.totalPoints - left.totalPoints ||
        right.averageScore - left.averageScore ||
        right.completedActivities - left.completedActivities ||
        left.accountId.localeCompare(right.accountId),
    )
    .map((row, index) => ({
      position: index + 1,
      displayName: leaderboardName(row),
      totalPoints: row.totalPoints,
      completedActivities: row.completedActivities,
      averageScore: row.averageScore,
      isCurrent: row.accountId === currentAccountId,
    }));
}

function createSectorRanking(
  rows: LearnerProgressRow[],
  currentSectorId: string,
): SectorLeaderboardEntry[] {
  const groups = new Map<string, LearnerProgressRow[]>();
  for (const row of rows) {
    groups.set(row.sectorId, [...(groups.get(row.sectorId) ?? []), row]);
  }

  const availableActivities = FIRST_LEARNING_PATH.steps.length;
  return [...groups.entries()]
    .map(([sectorId, members]) => {
      const activeMembers = members.filter(
        (member) => member.completedCurriculumActivities > 0,
      );
      const averageScore = activeMembers.length
        ? activeMembers.reduce(
            (total, member) => total + member.averageScore,
            0,
          ) / activeMembers.length
        : 0;
      const completionRate =
        availableActivities === 0
          ? 0
          : (members.reduce(
              (total, member) =>
                total + member.completedCurriculumActivities,
              0,
            ) /
              (members.length * availableActivities)) *
            100;
      const participationRate = (activeMembers.length / members.length) * 100;
      const score = Math.round(
        averageScore * 0.5 + completionRate * 0.3 + participationRate * 0.2,
      );

      return {
        sectorId,
        sectorName: members[0]?.sectorName ?? sectorId,
        score,
        averagePoints: roundPercentage(
          members.reduce((total, member) => total + member.totalPoints, 0) /
            members.length,
        ),
        averageScore: roundPercentage(averageScore),
        completionRate: roundPercentage(completionRate),
        participationRate: roundPercentage(participationRate),
        eligibleParticipants: members.length,
        activeParticipants: activeMembers.length,
        isCurrent: sectorId === currentSectorId,
      };
    })
    .sort(
      (left, right) =>
        right.score - left.score ||
        right.averagePoints - left.averagePoints ||
        left.sectorName.localeCompare(right.sectorName, "pt-BR"),
    )
    .map((entry, index) => ({ ...entry, position: index + 1 }));
}

function createCurrentParticipant(
  rows: LearnerProgressRow[],
  individual: IndividualLeaderboardEntry[],
  currentAccount: AuthenticatedAccount,
): CurrentLeaderboardParticipant | null {
  const current = rows.find((row) => row.accountId === currentAccount.id);
  if (!current) return null;

  return {
    participates: current.leaderboardParticipation,
    position:
      individual.find((entry) => entry.isCurrent)?.position ?? null,
    totalPoints: current.totalPoints,
    completedActivities: current.completedActivities,
    averageScore: current.averageScore,
  };
}

export async function getLeaderboard(
  currentAccount: AuthenticatedAccount,
): Promise<LeaderboardResponse> {
  await ensureAuthStorage();
  await refreshStaleSummaries();
  const rows = await listLearnerProgress();
  const individual = createIndividualRanking(rows, currentAccount.id);

  return {
    generatedAt: new Date().toISOString(),
    availableCurriculumActivities: FIRST_LEARNING_PATH.steps.length,
    individual,
    sectors: createSectorRanking(rows, currentAccount.sectorId),
    currentParticipant: createCurrentParticipant(
      rows,
      individual,
      currentAccount,
    ),
  };
}
