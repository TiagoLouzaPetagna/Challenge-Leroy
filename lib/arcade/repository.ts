import { getD1Binding } from "@/db";
import { ensureAuthStorage } from "@/lib/auth/repository";
import type { AuthenticatedAccount } from "@/lib/auth/types";
import { DEMO_OVERLOOKED_LEADERBOARD } from "@/lib/content/overlooked-demo-leaderboard";
import { findArcadePublicProfileByAccountId } from "@/lib/content/arcade-public-profiles";

import {
  OVERLOOKED_GAME_ID,
  OVERLOOKED_MAX_SERVER_ELAPSED_SECONDS,
  OVERLOOKED_VALIDATION_VERSION,
  type OverlookedLeaderboardEntry,
  type OverlookedLeaderboardResponse,
  type OverlookedValidatedResult,
  validateOverlookedCompletion,
} from "./overlooked";

type StoredRun = {
  id: string;
  account_id: string;
  status: "started" | "completed";
  started_at: string;
  expires_at: string;
  completed_at: string | null;
  duration_seconds: number | null;
  raw_score: number | null;
  classified_messages: number;
  phishing_reported: number;
  legitimate_completed: number;
  phishing_processed: number;
  legitimate_discarded: number;
  outcomes_json: string | null;
};

type LeaderboardRow = {
  account_id: string;
  name: string;
  sector_name: string;
  leaderboard_identity: "initials" | "displayName" | "anonymous" | null;
  raw_score: number;
  phishing_reported: number;
  legitimate_completed: number;
  phishing_processed: number;
  legitimate_discarded: number;
  completed_at: string;
};

const DEMO_OVERLOOKED_ACCOUNT_IDS = new Set(
  DEMO_OVERLOOKED_LEADERBOARD.map((entry) => entry.accountId),
);

export class OverlookedRunError extends Error {
  constructor(
    message: string,
    readonly status: number,
  ) {
    super(message);
    this.name = "OverlookedRunError";
  }
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
  if (!parts.length) return "Participante";
  return `${parts[0]?.[0] ?? ""}${parts.length > 1 ? parts.at(-1)?.[0] ?? "" : ""}`.toLocaleUpperCase("pt-BR");
}

function displayName(row: LeaderboardRow): string {
  if (DEMO_OVERLOOKED_ACCOUNT_IDS.has(row.account_id)) return row.name;
  if (row.leaderboard_identity === "displayName") return row.name;
  if (row.leaderboard_identity === "anonymous") {
    return stableAnonymousLabel(row.account_id);
  }
  return initials(row.name);
}

function resultFromStoredRun(run: StoredRun): OverlookedValidatedResult {
  return {
    durationSeconds: run.duration_seconds ?? 0,
    rawScore: run.raw_score ?? 0,
    classifiedMessages: run.classified_messages,
    phishingReported: run.phishing_reported,
    legitimateCompleted: run.legitimate_completed,
    phishingProcessed: run.phishing_processed,
    legitimateDiscarded: run.legitimate_discarded,
    outcomes: run.outcomes_json
      ? (JSON.parse(run.outcomes_json) as OverlookedValidatedResult["outcomes"])
      : [],
  };
}

async function findRun(runId: string, accountId: string): Promise<StoredRun | null> {
  return (
    (await getD1Binding()
      .prepare(
        `SELECT id, account_id, status, started_at, expires_at, completed_at,
          duration_seconds, raw_score, classified_messages, phishing_reported,
          legitimate_completed, phishing_processed, legitimate_discarded, outcomes_json
        FROM arcade_runs
        WHERE id = ? AND account_id = ? AND game_id = ?
        LIMIT 1`,
      )
      .bind(runId, accountId, OVERLOOKED_GAME_ID)
      .first<StoredRun>()) ?? null
  );
}

export async function startOverlookedRun(accountId: string) {
  await ensureAuthStorage();
  const d1 = getD1Binding();
  const startedAt = new Date();
  const expiresAt = new Date(
    startedAt.getTime() + OVERLOOKED_MAX_SERVER_ELAPSED_SECONDS * 1000,
  );
  const runId = crypto.randomUUID();

  await d1.batch([
    d1
      .prepare("DELETE FROM arcade_runs WHERE status = 'started' AND expires_at < ?")
      .bind(startedAt.toISOString()),
    d1
      .prepare(
        `INSERT INTO arcade_runs (
          id, account_id, game_id, status, started_at, expires_at, validation_version
        ) VALUES (?, ?, ?, 'started', ?, ?, ?)`,
      )
      .bind(
        runId,
        accountId,
        OVERLOOKED_GAME_ID,
        startedAt.toISOString(),
        expiresAt.toISOString(),
        OVERLOOKED_VALIDATION_VERSION,
      ),
  ]);

  return {
    runId,
    startedAt: startedAt.toISOString(),
    expiresAt: expiresAt.toISOString(),
  };
}

export async function completeOverlookedRun(
  accountId: string,
  runId: string,
  completion: unknown,
): Promise<OverlookedValidatedResult> {
  await ensureAuthStorage();
  const run = await findRun(runId, accountId);
  if (!run) throw new OverlookedRunError("Partida não encontrada.", 404);
  if (run.status === "completed") return resultFromStoredRun(run);

  const now = new Date();
  if (now.toISOString() > run.expires_at) {
    throw new OverlookedRunError("A sessão da partida expirou.", 410);
  }

  const elapsedSeconds =
    (now.getTime() - new Date(run.started_at).getTime()) / 1000;
  const result = validateOverlookedCompletion(completion, elapsedSeconds);
  const update = (await getD1Binding()
    .prepare(
      `UPDATE arcade_runs SET
        status = 'completed', completed_at = ?, duration_seconds = ?, raw_score = ?,
        classified_messages = ?, phishing_reported = ?, legitimate_completed = ?,
        phishing_processed = ?, legitimate_discarded = ?, outcomes_json = ?
      WHERE id = ? AND account_id = ? AND game_id = ? AND status = 'started'`,
    )
    .bind(
      now.toISOString(),
      result.durationSeconds,
      result.rawScore,
      result.classifiedMessages,
      result.phishingReported,
      result.legitimateCompleted,
      result.phishingProcessed,
      result.legitimateDiscarded,
      JSON.stringify(result.outcomes),
      runId,
      accountId,
      OVERLOOKED_GAME_ID,
    )
    .run()) as { meta: { changes?: number } };

  if ((update.meta.changes ?? 0) === 0) {
    const concurrent = await findRun(runId, accountId);
    if (concurrent?.status === "completed") return resultFromStoredRun(concurrent);
    throw new OverlookedRunError("A partida não pôde ser concluída.", 409);
  }
  return result;
}

export async function getOverlookedLeaderboard(
  currentAccount: AuthenticatedAccount,
): Promise<OverlookedLeaderboardResponse> {
  await ensureAuthStorage();
  const demoAccountIds = DEMO_OVERLOOKED_LEADERBOARD.map((entry) => entry.accountId);
  const demoPlaceholders = demoAccountIds.map(() => "?").join(", ");
  const query = await getD1Binding()
    .prepare(
      `WITH best_runs AS (
        SELECT arcade_runs.*,
          ROW_NUMBER() OVER (
            PARTITION BY account_id
            ORDER BY raw_score DESC,
              phishing_reported DESC,
              legitimate_completed DESC,
              (phishing_processed + legitimate_discarded) ASC,
              completed_at ASC,
              id ASC
          ) AS result_order
        FROM arcade_runs
        WHERE game_id = ? AND status = 'completed'
      )
      SELECT best_runs.account_id, accounts.name, accounts.sector_name,
        account_progress_summaries.leaderboard_identity,
        best_runs.raw_score, best_runs.phishing_reported,
        best_runs.legitimate_completed, best_runs.phishing_processed,
        best_runs.legitimate_discarded, best_runs.completed_at
      FROM best_runs
      INNER JOIN accounts ON accounts.id = best_runs.account_id
      LEFT JOIN account_progress_summaries
        ON account_progress_summaries.account_id = best_runs.account_id
      WHERE best_runs.result_order = 1
        AND accounts.status = 'active'
        AND (
          COALESCE(account_progress_summaries.leaderboard_participation, 0) = 1
          OR accounts.id IN (${demoPlaceholders})
        )
      ORDER BY best_runs.raw_score DESC,
        best_runs.phishing_reported DESC,
        best_runs.legitimate_completed DESC,
        (best_runs.phishing_processed + best_runs.legitimate_discarded) ASC,
        best_runs.completed_at ASC,
        best_runs.id ASC
      LIMIT 50`,
    )
    .bind(
      OVERLOOKED_GAME_ID,
      ...demoAccountIds,
    )
    .all<LeaderboardRow>();

  const entries: OverlookedLeaderboardEntry[] = query.results.map((row, index) => {
    const publicProfile = findArcadePublicProfileByAccountId(row.account_id);
    return {
      position: index + 1,
      displayName: displayName(row),
      nickname: publicProfile?.nickname ?? displayName(row),
      avatarUrl: publicProfile?.avatarUrl ?? "/avatar/master/master.png",
      animatedAvatarUrl:
        publicProfile?.animatedAvatarUrl ?? "/avatar/master/master.png",
      profileId: publicProfile?.profileId ?? null,
      sectorName: row.sector_name,
      score: row.raw_score,
      phishingReported: row.phishing_reported,
      legitimateCompleted: row.legitimate_completed,
      mistakes: row.phishing_processed + row.legitimate_discarded,
      completedAt: row.completed_at,
      isCurrent: row.account_id === currentAccount.id,
    };
  });

  return {
    generatedAt: new Date().toISOString(),
    entries,
    currentBest: entries.find((entry) => entry.isCurrent) ?? null,
  };
}
