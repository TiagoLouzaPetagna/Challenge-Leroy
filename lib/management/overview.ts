import { and, eq, notLike } from "drizzle-orm";

import { getDb } from "@/db";
import { accountProgressSummaries, accounts, accountStates } from "@/db/schema";
import { ensureAuthStorage } from "@/lib/auth/repository";
import { FIRST_LEARNING_PATH } from "@/lib/content/curriculum-catalog";
import type { AppState } from "@/lib/domain/types";
import { isValidState } from "@/lib/state/persistence";

const journeySteps = [...FIRST_LEARNING_PATH.steps]
  .filter((step) => step.integrationStatus === "available")
  .sort((a, b) => a.order - b.order);

export type ManagementPerson = {
  id: string;
  name: string;
  employeeId: string;
  sectorId: string;
  sectorName: string;
  status: "active" | "inactive";
  createdAt: string;
  lastLoginAt: string | null;
  lastActivityAt: string | null;
  totalPoints: number;
  completedActivities: number;
  averageScore: number;
  journey: {
    completed: number;
    total: number;
    nextTitle: string | null;
    steps: { id: string; title: string; completed: boolean }[];
  };
};

export async function getManagementPeople(): Promise<ManagementPerson[]> {
  await ensureAuthStorage();
  const rows = await getDb()
    .select({ account: accounts, summary: accountProgressSummaries, savedState: accountStates.stateJson })
    .from(accounts)
    .leftJoin(accountProgressSummaries, eq(accounts.id, accountProgressSummaries.accountId))
    .leftJoin(accountStates, eq(accounts.id, accountStates.accountId))
    .where(and(eq(accounts.role, "learner"), notLike(accounts.id, "local-test:sector-ranking:%")));

  return rows.map(({ account, summary, savedState }) => {
    let state: AppState | null = null;
    if (savedState) {
      try {
        const parsed: unknown = JSON.parse(savedState);
        if (isValidState(parsed)) state = parsed;
      } catch { /* A damaged snapshot must not break the whole dashboard. */ }
    }
    const steps = journeySteps.map((step) => ({
      id: step.activityId,
      title: step.title,
      completed: state?.learning.activityProgress[step.activityId]?.status === "completed",
    }));
    return {
      id: account.id,
      name: account.name,
      employeeId: account.employeeId,
      sectorId: account.sectorId,
      sectorName: account.sectorName,
      status: account.status,
      createdAt: account.createdAt,
      lastLoginAt: account.lastLoginAt,
      lastActivityAt: summary?.lastActivityAt ?? null,
      totalPoints: summary?.totalPoints ?? 0,
      completedActivities: summary?.completedActivities ?? 0,
      averageScore: summary?.averageScore ?? 0,
      journey: {
        completed: steps.filter((step) => step.completed).length,
        total: steps.length,
        nextTitle: steps.find((step) => !step.completed)?.title ?? null,
        steps,
      },
    };
  }).sort((a, b) => a.name.localeCompare(b.name, "pt-BR"));
}
