import { getD1Binding } from "@/db";
import { ensureAuthStorage } from "@/lib/auth/repository";
import type { AuthenticatedAccount } from "@/lib/auth/types";
import { findArcadePublicProfileByAccountId } from "@/lib/content/arcade-public-profiles";
import { findOwnPublicHouse } from "@/lib/house/public-houses";
import type { OverlookedLeaderboardEntry } from "./overlooked";

export const GAME_SLUGS = ["dumb-ways-to-phish", "dumb-ways-extras", "phish-slice", "email-please", "phishing-beat", "phishing-escape", "chefia-em-jogo"] as const;
export type GameSlug = typeof GAME_SLUGS[number];
const TRACK_IDS = ["passo", "contra", "freio", "swing", "trinca", "resposta"] as const;
const MAX_SCORE: Record<GameSlug, number> = {
  "dumb-ways-to-phish": 1_000_000,
  "dumb-ways-extras": 10,
  "phish-slice": 1_000_000,
  "email-please": 100_000,
  "phishing-beat": 20_000,
  "phishing-escape": 1_000,
  "chefia-em-jogo": 100_000,
};

export class GameResultError extends Error {
  constructor(message: string, readonly status = 400) { super(message); }
}

export function isGameSlug(value: string): value is GameSlug {
  return GAME_SLUGS.some((slug) => slug === value);
}

export async function startGameResult(accountId: string, game: GameSlug) {
  await ensureAuthStorage();
  const id = crypto.randomUUID();
  await getD1Binding().prepare(
    "INSERT INTO arcade_game_results (id, account_id, game_id, status, started_at) VALUES (?, ?, ?, 'started', ?)",
  ).bind(id, accountId, game, new Date().toISOString()).run();
  return { runId: id };
}

export async function completeGameResult(accountId: string, game: GameSlug, runId: unknown, score: unknown, trackId: unknown) {
  if (typeof runId !== "string" || !Number.isInteger(score) || (score as number) < 0 || (score as number) > MAX_SCORE[game]) {
    throw new GameResultError("Resultado inválido.");
  }
  const track = game === "phishing-beat" && typeof trackId === "string" && TRACK_IDS.some((id) => id === trackId) ? trackId : "";
  if (game === "phishing-beat" && !track) throw new GameResultError("Fase inválida.");
  await ensureAuthStorage();
  const result = await getD1Binding().prepare(
    `UPDATE arcade_game_results SET status = 'completed', completed_at = ?, score = ?, track_id = ?
     WHERE id = ? AND account_id = ? AND game_id = ? AND status = 'started'`,
  ).bind(new Date().toISOString(), score, track, runId, accountId, game).run() as { meta: { changes?: number } };
  if (!result.meta.changes) throw new GameResultError("Partida não encontrada ou já registrada.", 409);
  return { score, trackId: track };
}

type RankRow = {
  account_id: string;
  name: string;
  sector_name: string;
  leaderboard_identity: "initials" | "displayName" | "anonymous" | null;
  score: number;
  completed_at: string;
};

export async function getGameLeaderboard(account: AuthenticatedAccount, game: GameSlug) {
  await ensureAuthStorage();
  // Phishing Beat ranks the sum of each player's personal best across its six phases.
  // Other games rank each player's single best completed run.
  const scoreSql = game === "phishing-beat"
    ? `WITH phase_bests AS (
         SELECT account_id, track_id, MAX(score) AS score, MIN(completed_at) AS completed_at
         FROM arcade_game_results WHERE game_id = ? AND status = 'completed'
         GROUP BY account_id, track_id
       ), bests AS (
         SELECT account_id, SUM(score) AS score, MAX(completed_at) AS completed_at
         FROM phase_bests GROUP BY account_id
       )`
    : `WITH bests AS (
         SELECT account_id, MAX(score) AS score, MIN(completed_at) AS completed_at
         FROM arcade_game_results WHERE game_id = ? AND status = 'completed'
         GROUP BY account_id
       )`;
  const rows = await getD1Binding().prepare(
    `${scoreSql}
     SELECT bests.account_id, accounts.name, accounts.sector_name,
       account_progress_summaries.leaderboard_identity, bests.score, bests.completed_at
     FROM bests JOIN accounts ON accounts.id = bests.account_id
     LEFT JOIN account_progress_summaries ON account_progress_summaries.account_id = bests.account_id
     WHERE accounts.status = 'active' AND (
       COALESCE(account_progress_summaries.leaderboard_participation, 0) = 1
       OR bests.account_id = ?
     )
     ORDER BY bests.score DESC, bests.completed_at ASC, bests.account_id ASC LIMIT 50`,
  ).bind(game, account.id).all<RankRow>();
  const houses = await Promise.all(rows.results.slice(0, 3).map((row) => findOwnPublicHouse(row.account_id)));
  const entries: OverlookedLeaderboardEntry[] = rows.results.map((row, index) => {
    const profile = findArcadePublicProfileByAccountId(row.account_id);
    const house = houses[index];
    const parts = row.name.trim().split(/\s+/);
    const visible = row.leaderboard_identity === "displayName" ? row.name
      : row.leaderboard_identity === "anonymous" ? `Participante ${index + 1}`
        : `${parts[0]?.[0] ?? ""}${parts.at(-1)?.[0] ?? ""}`.toLocaleUpperCase("pt-BR");
    return {
      position: index + 1, displayName: visible,
      nickname: house?.nickname ?? profile?.nickname ?? visible,
      avatarUrl: house?.avatarUrl ?? profile?.avatarUrl ?? "/avatar/master/master.png",
      animatedAvatarUrl: house?.avatarUrl ?? profile?.animatedAvatarUrl ?? "/avatar/master/master.png",
      profileId: house?.profileId ?? profile?.profileId ?? null,
      sectorName: row.sector_name, score: row.score, phishingReported: 0,
      legitimateCompleted: 0, mistakes: 0, completedAt: row.completed_at,
      isCurrent: row.account_id === account.id,
    };
  });
  return { generatedAt: new Date().toISOString(), entries, currentBest: entries.find((entry) => entry.isCurrent) ?? null };
}
