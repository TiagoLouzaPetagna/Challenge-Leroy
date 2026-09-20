import { getD1Binding } from "@/db";
import { ensureAuthStorage } from "@/lib/auth/repository";
import type { AuthenticatedAccount } from "@/lib/auth/types";
import { DEMO_OVERLOOKED_LEADERBOARD } from "@/lib/content/overlooked-demo-leaderboard";
import { findArcadePublicProfileByAccountId } from "@/lib/content/arcade-public-profiles";
import { findOwnPublicHouse } from "@/lib/house/public-houses";

import {
  OVERLOOKED_GAME_ID,
  OVERLOOKED_MAX_SERVER_ELAPSED_SECONDS,
  OVERLOOKED_VALIDATION_VERSION,
  type OverlookedLeaderboardEntry,
  type OverlookedLeaderboardResponse,
  type OverlookedDuoLeaderboardEntry,
  type OverlookedDuoLeaderboardResponse,
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
  actual_score: number | null;
  result_json: string | null;
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

type DuoLeaderboardRow = {
  host_id: string;
  host_name: string;
  host_identity: LeaderboardRow["leaderboard_identity"];
  guest_id: string;
  guest_name: string;
  guest_identity: LeaderboardRow["leaderboard_identity"];
  raw_score: number;
  completed_at: string;
};

const DEMO_OVERLOOKED_ACCOUNT_IDS = new Set<string>(
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

function displayName(row: Pick<LeaderboardRow, "account_id" | "name" | "leaderboard_identity">): string {
  if (DEMO_OVERLOOKED_ACCOUNT_IDS.has(row.account_id)) return row.name;
  if (row.leaderboard_identity === "displayName") return row.name;
  if (row.leaderboard_identity === "anonymous") {
    return stableAnonymousLabel(row.account_id);
  }
  return initials(row.name);
}

// Existing arcade_runs rows retain their original CHECK constraints. The extension
// stores the full result from the expanded 26-message game for ranking and retries.
function legacyScore(score: number): number {
  return Math.max(-165, Math.min(155, score));
}

function resultFromStoredRun(run: StoredRun): OverlookedValidatedResult {
  if (run.result_json) return JSON.parse(run.result_json) as OverlookedValidatedResult;
  return {
    durationSeconds: run.duration_seconds ?? 0,
    rawScore: run.actual_score ?? run.raw_score ?? 0,
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
        `SELECT arcade_runs.id, account_id, status, started_at, expires_at, completed_at,
          duration_seconds, raw_score, classified_messages, phishing_reported,
          legitimate_completed, phishing_processed, legitimate_discarded, outcomes_json,
          arcade_run_extensions.actual_score, arcade_run_extensions.result_json
        FROM arcade_runs
        LEFT JOIN arcade_run_extensions ON arcade_run_extensions.run_id = arcade_runs.id
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

export async function startOverlookedDuoRuns(hostId: string, guestId: string) {
  if (hostId === guestId) throw new OverlookedRunError("A dupla precisa ter duas contas.", 400);
  await ensureAuthStorage();
  const d1 = getD1Binding();
  const startedAt = new Date();
  const expiresAt = new Date(startedAt.getTime() + OVERLOOKED_MAX_SERVER_ELAPSED_SECONDS * 1000);
  const hostRunId = crypto.randomUUID();
  const guestRunId = crypto.randomUUID();
  const runStatements = [hostId, guestId].map((accountId, index) =>
    d1.prepare(`INSERT INTO arcade_runs (
      id, account_id, game_id, status, started_at, expires_at, validation_version
    ) VALUES (?, ?, ?, 'started', ?, ?, ?)`).bind(
      index === 0 ? hostRunId : guestRunId,
      accountId, OVERLOOKED_GAME_ID, startedAt.toISOString(),
      expiresAt.toISOString(), OVERLOOKED_VALIDATION_VERSION,
    ),
  );
  await d1.batch([...runStatements, d1.prepare(`INSERT INTO arcade_duo_matches (id, host_run_id, guest_run_id)
    VALUES (?, ?, ?)`).bind(crypto.randomUUID(), hostRunId, guestRunId)]);
  return { hostRunId, guestRunId, startedAt: startedAt.toISOString() };
}

export async function completeOverlookedDuoRuns(
  hostId: string,
  guestId: string,
  hostRunId: string,
  guestRunId: string,
  completion: unknown,
): Promise<OverlookedValidatedResult> {
  await ensureAuthStorage();
  const [hostRun, guestRun] = await Promise.all([
    findRun(hostRunId, hostId), findRun(guestRunId, guestId),
  ]);
  if (hostRun?.status === "completed" && guestRun?.status === "completed" &&
    (hostRun.actual_score ?? hostRun.raw_score) === (guestRun.actual_score ?? guestRun.raw_score)) {
    return resultFromStoredRun(hostRun);
  }
  if (!hostRun || !guestRun || hostRun.status !== "started" || guestRun.status !== "started") {
    throw new OverlookedRunError("A partida da dupla não está ativa.", 409);
  }
  const now = new Date();
  if (now.toISOString() > hostRun.expires_at || now.toISOString() > guestRun.expires_at) {
    throw new OverlookedRunError("A sessão da dupla expirou.", 410);
  }
  const elapsed = (now.getTime() - new Date(hostRun.started_at).getTime()) / 1000;
  const result = validateOverlookedCompletion(completion, elapsed);
  const d1 = getD1Binding();
  const runs = [
    [hostRunId, hostId], [guestRunId, guestId],
  ];
  const updates = await d1.batch([...runs.map(([runId, accountId]) => d1.prepare(`UPDATE arcade_runs SET
    status = 'completed', completed_at = ?, duration_seconds = ?, raw_score = ?,
    classified_messages = ?, phishing_reported = ?, legitimate_completed = ?,
    phishing_processed = ?, legitimate_discarded = ?, outcomes_json = ?
    WHERE id = ? AND account_id = ? AND game_id = ? AND status = 'started'`).bind(
    now.toISOString(), result.durationSeconds, legacyScore(result.rawScore),
    Math.min(result.classifiedMessages, 12), Math.min(result.phishingReported, 7), Math.min(result.legitimateCompleted, 5),
    Math.min(result.phishingProcessed, 7), Math.min(result.legitimateDiscarded, 5), JSON.stringify(result.outcomes),
    runId, accountId, OVERLOOKED_GAME_ID,
  )), ...runs.map(([runId]) => d1.prepare(`INSERT OR IGNORE INTO arcade_run_extensions (run_id, actual_score, result_json)
    VALUES (?, ?, ?)`).bind(runId, result.rawScore, JSON.stringify(result)))]) as Array<{ meta: { changes?: number } }>;
  if (updates.slice(0, 2).some((update) => (update.meta.changes ?? 0) !== 1)) {
    throw new OverlookedRunError("Não foi possível registrar os dois resultados.", 409);
  }
  return result;
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
  const d1 = getD1Binding();
  const [update] = (await d1.batch([
    d1.prepare(
      `UPDATE arcade_runs SET
        status = 'completed', completed_at = ?, duration_seconds = ?, raw_score = ?,
        classified_messages = ?, phishing_reported = ?, legitimate_completed = ?,
        phishing_processed = ?, legitimate_discarded = ?, outcomes_json = ?
      WHERE id = ? AND account_id = ? AND game_id = ? AND status = 'started'`,
    )
    .bind(
      now.toISOString(),
      result.durationSeconds,
      legacyScore(result.rawScore),
      Math.min(result.classifiedMessages, 12),
      Math.min(result.phishingReported, 7),
      Math.min(result.legitimateCompleted, 5),
      Math.min(result.phishingProcessed, 7),
      Math.min(result.legitimateDiscarded, 5),
      JSON.stringify(result.outcomes),
      runId,
      accountId,
      OVERLOOKED_GAME_ID,
    ),
    d1.prepare(`INSERT OR IGNORE INTO arcade_run_extensions (run_id, actual_score, result_json)
      VALUES (?, ?, ?)`).bind(runId, result.rawScore, JSON.stringify(result)),
  ])) as Array<{ meta: { changes?: number } }>;

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
          COALESCE(arcade_run_extensions.actual_score, arcade_runs.raw_score) AS ranking_score,
          ROW_NUMBER() OVER (
            PARTITION BY arcade_runs.account_id
            ORDER BY COALESCE(arcade_run_extensions.actual_score, arcade_runs.raw_score) DESC,
              phishing_reported DESC,
              legitimate_completed DESC,
              (phishing_processed + legitimate_discarded) ASC,
              completed_at ASC,
              id ASC
          ) AS result_order
        FROM arcade_runs
        LEFT JOIN arcade_run_extensions ON arcade_run_extensions.run_id = arcade_runs.id
        WHERE game_id = ? AND status = 'completed'
          AND NOT EXISTS (
            SELECT 1 FROM arcade_duo_matches
            WHERE host_run_id = arcade_runs.id OR guest_run_id = arcade_runs.id
          )
      )
      SELECT best_runs.account_id, accounts.name, accounts.sector_name,
        account_progress_summaries.leaderboard_identity,
        best_runs.ranking_score AS raw_score, best_runs.phishing_reported,
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
      ORDER BY best_runs.ranking_score DESC,
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

  const houses = await Promise.all(query.results.slice(0, 3).map((row) => findOwnPublicHouse(row.account_id)));
  const entries: OverlookedLeaderboardEntry[] = query.results.map((row, index) => {
    const publicProfile = findArcadePublicProfileByAccountId(row.account_id);
    const house = houses[index];
    return {
      position: index + 1,
      displayName: displayName(row),
      nickname: house?.nickname ?? publicProfile?.nickname ?? displayName(row),
      avatarUrl: house?.avatarUrl ?? publicProfile?.avatarUrl ?? "/avatar/master/master.png",
      animatedAvatarUrl:
        house?.avatarUrl ?? publicProfile?.animatedAvatarUrl ?? "/avatar/master/master.png",
      profileId: house?.profileId ?? publicProfile?.profileId ?? null,
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

export async function getOverlookedDuoLeaderboard(
  currentAccount: AuthenticatedAccount,
): Promise<OverlookedDuoLeaderboardResponse> {
  await ensureAuthStorage();
  const demoIds = DEMO_OVERLOOKED_LEADERBOARD.map((entry) => entry.accountId);
  const placeholders = demoIds.map(() => "?").join(", ");
  const query = await getD1Binding().prepare(`WITH completed_matches AS (
      SELECT host.account_id AS host_id, guest.account_id AS guest_id,
        COALESCE(host_result.actual_score, host.raw_score) AS raw_score,
        host.completed_at, arcade_duo_matches.id,
        ROW_NUMBER() OVER (
          PARTITION BY MIN(host.account_id, guest.account_id), MAX(host.account_id, guest.account_id)
          ORDER BY COALESCE(host_result.actual_score, host.raw_score) DESC, host.phishing_reported DESC,
            host.legitimate_completed DESC,
            (host.phishing_processed + host.legitimate_discarded) ASC,
            host.completed_at ASC, arcade_duo_matches.id ASC
        ) AS pair_order
      FROM arcade_duo_matches
      INNER JOIN arcade_runs AS host ON host.id = arcade_duo_matches.host_run_id
      INNER JOIN arcade_runs AS guest ON guest.id = arcade_duo_matches.guest_run_id
      LEFT JOIN arcade_run_extensions AS host_result ON host_result.run_id = host.id
      LEFT JOIN arcade_run_extensions AS guest_result ON guest_result.run_id = guest.id
      WHERE host.game_id = ? AND guest.game_id = ?
        AND host.status = 'completed' AND guest.status = 'completed'
        AND COALESCE(host_result.actual_score, host.raw_score) = COALESCE(guest_result.actual_score, guest.raw_score)
    )
    SELECT matches.host_id, hosts.name AS host_name,
      host_progress.leaderboard_identity AS host_identity,
      matches.guest_id, guests.name AS guest_name,
      guest_progress.leaderboard_identity AS guest_identity,
      matches.raw_score, matches.completed_at
    FROM completed_matches AS matches
    INNER JOIN accounts AS hosts ON hosts.id = matches.host_id
    INNER JOIN accounts AS guests ON guests.id = matches.guest_id
    LEFT JOIN account_progress_summaries AS host_progress ON host_progress.account_id = hosts.id
    LEFT JOIN account_progress_summaries AS guest_progress ON guest_progress.account_id = guests.id
    WHERE matches.pair_order = 1
      AND hosts.status = 'active' AND guests.status = 'active'
      AND (COALESCE(host_progress.leaderboard_participation, 0) = 1 OR hosts.id IN (${placeholders}))
      AND (COALESCE(guest_progress.leaderboard_participation, 0) = 1 OR guests.id IN (${placeholders}))
    ORDER BY matches.raw_score DESC, matches.completed_at ASC, matches.id ASC
    LIMIT 50`).bind(OVERLOOKED_GAME_ID, OVERLOOKED_GAME_ID, ...demoIds, ...demoIds)
    .all<DuoLeaderboardRow>();

  const houses = await Promise.all(query.results.slice(0, 3).flatMap((row) => [
    findOwnPublicHouse(row.host_id), findOwnPublicHouse(row.guest_id),
  ]));
  const entries: OverlookedDuoLeaderboardEntry[] = query.results.map((row, index) => {
    const players = (["host", "guest"] as const).map((role, playerIndex) => {
      const accountId = role === "host" ? row.host_id : row.guest_id;
      const name = role === "host" ? row.host_name : row.guest_name;
      const identity = role === "host" ? row.host_identity : row.guest_identity;
      const visibleName = displayName({ account_id: accountId, name, leaderboard_identity: identity });
      const profile = findArcadePublicProfileByAccountId(accountId);
      const house = houses[index * 2 + playerIndex];
      return {
        displayName: visibleName,
        nickname: house?.nickname ?? profile?.nickname ?? visibleName,
        avatarUrl: house?.avatarUrl ?? profile?.avatarUrl ?? "/avatar/master/master.png",
        animatedAvatarUrl: house?.avatarUrl ?? profile?.animatedAvatarUrl ?? "/avatar/master/master.png",
        profileId: house?.profileId ?? profile?.profileId ?? null,
        isCurrent: accountId === currentAccount.id,
      };
    }) as OverlookedDuoLeaderboardEntry["players"];
    return {
      position: index + 1, players, score: row.raw_score,
      completedAt: row.completed_at,
      isCurrent: players.some((player) => player.isCurrent),
    };
  });
  return {
    generatedAt: new Date().toISOString(), entries,
    currentBest: entries.find((entry) => entry.isCurrent) ?? null,
  };
}
