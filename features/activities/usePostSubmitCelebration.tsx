"use client";

import { useState } from "react";

import { ActivityAchievementUnlock } from "./primitives/ActivityAchievementUnlock";
import { ActivityCelebration } from "./primitives/ActivityCelebration";
import type { AchievementDefinition } from "@/lib/content/achievement-catalog";

/**
 * resultado-debrief.md §3/§4: Celebration (sempre) seguida do beat opcional
 * de Conquista. Estado local que precisa sobreviver ao remount pós-hidratação
 * do player — por isso o único caller é o mission player, nunca o frame.
 */
export function usePostSubmitCelebration(
  activityTitle: string,
  modeColor: string,
) {
  const [phase, setPhase] = useState<"celebration" | "achievement" | null>(null);
  const [justUnlocked, setJustUnlocked] = useState<AchievementDefinition[]>([]);

  const begin = (achievements: readonly AchievementDefinition[]) => {
    setJustUnlocked([...achievements]);
    setPhase("celebration");
  };

  const reset = () => {
    setPhase(null);
    setJustUnlocked([]);
  };

  const screen =
    phase === "celebration" ? (
      <ActivityCelebration
        activityTitle={activityTitle}
        modeColor={modeColor}
        onContinue={() => setPhase(justUnlocked.length > 0 ? "achievement" : null)}
      />
    ) : phase === "achievement" ? (
      <ActivityAchievementUnlock
        achievements={justUnlocked}
        onContinue={() => setPhase(null)}
      />
    ) : null;

  return { screen, begin, reset };
}
