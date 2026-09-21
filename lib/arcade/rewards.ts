import { getD1Binding } from "@/db";
import { ensureAuthStorage } from "@/lib/auth/repository";
import { ARCADE_REWARDS } from "@/public/house-3d/arcade-rewards.js";
import { NEW_COLLECTION_ITEMS } from "@/public/house-3d/new-collections-catalog.js";

type ScoreRow = { game_id: string; score: number | null };
type BeatRow = { track_id: string; score: number | null };

export type ArcadeRewardProgress = {
  id: string;
  gameId: string;
  game: string;
  title: string;
  target: number;
  unit: string;
  items: string[];
  imageUrl: string | null;
  current: number;
  unlocked: boolean;
};

export async function getArcadeRewardProgress(accountId: string) {
  await ensureAuthStorage();
  const db = getD1Binding();
  const [ordinary, office, beat] = await Promise.all([
    db.prepare(`SELECT game_id, MAX(score) AS score FROM arcade_game_results
      WHERE account_id = ? AND status = 'completed' AND game_id <> 'phishing-beat'
      GROUP BY game_id`).bind(accountId).all<ScoreRow>(),
    db.prepare(`SELECT MAX(COALESCE(arcade_run_extensions.actual_score, arcade_runs.raw_score)) AS score
      FROM arcade_runs LEFT JOIN arcade_run_extensions ON arcade_run_extensions.run_id = arcade_runs.id
      WHERE arcade_runs.account_id = ? AND arcade_runs.game_id = 'arcade:overlooked'
      AND arcade_runs.status = 'completed'`).bind(accountId).first<{ score: number | null }>(),
    db.prepare(`SELECT track_id, MAX(score) AS score FROM arcade_game_results
      WHERE account_id = ? AND game_id = 'phishing-beat' AND status = 'completed'
      GROUP BY track_id`).bind(accountId).all<BeatRow>(),
  ]);
  const best = new Map(ordinary.results.map((row) => [row.game_id, row.score ?? 0]));
  best.set("overlooked", office?.score ?? 0);
  best.set("phishing-beat", beat.results.reduce((sum, row) => sum + (row.score ?? 0), 0));
  const rewards: ArcadeRewardProgress[] = ARCADE_REWARDS.map((reward) => {
    const current = Math.max(0, best.get(reward.gameId) ?? 0);
    const item = NEW_COLLECTION_ITEMS.find((candidate) => candidate.id === reward.items[0]);
    return { ...reward, imageUrl: item?.image ? `/house-3d/${item.image}` : null, current, unlocked: current >= reward.target };
  });
  return {
    rewards,
    unlockedItemIds: rewards.filter((reward) => reward.unlocked).flatMap((reward) => reward.items),
  };
}
