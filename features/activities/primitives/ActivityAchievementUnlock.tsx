"use client";

import { useEffect, useRef, type KeyboardEvent } from "react";

import { Mascot } from "@/features/ui/LearningUI";
import type { AchievementDefinition } from "@/lib/content/achievement-catalog";

type ActivityAchievementUnlockProps = {
  achievements: readonly AchievementDefinition[];
  onContinue: () => void;
};

/**
 * resultado-debrief.md §4: só aparece quando algo desbloqueou nesta tentativa.
 * Mais de uma conquista vira um beat só, nunca N telas cheias.
 * §14: descartável por Enter, Espaço ou Esc, como a Celebração.
 */
export function ActivityAchievementUnlock({
  achievements,
  onContinue,
}: ActivityAchievementUnlockProps) {
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    headingRef.current?.focus();
  }, []);

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.target instanceof HTMLButtonElement) return;
    if (event.key === "Enter" || event.key === " " || event.key === "Escape") {
      event.preventDefault();
      onContinue();
    }
  };

  if (achievements.length === 0) return null;

  return (
    <div
      className="activity-achievement"
      role="region"
      aria-labelledby="activity-achievement-title"
      onKeyDown={handleKeyDown}
    >
      <div className="activity-achievement__mascot">
        <Mascot pose="trophy" size="large" alt="" />
      </div>
      <h1 id="activity-achievement-title" ref={headingRef} tabIndex={-1}>
        {achievements.length === 1 ? "Conquista desbloqueada" : "Conquistas desbloqueadas"}
      </h1>
      <ul className="activity-achievement__list">
        {achievements.map((achievement) => (
          <li key={achievement.id}>
            <strong>{achievement.title}</strong>
            <p>{achievement.condition}</p>
            <span>+{achievement.rewardPoints} pontos</span>
          </li>
        ))}
      </ul>
      <button type="button" className="primary-button dark" onClick={onContinue}>
        Continuar <span aria-hidden="true">→</span>
      </button>
    </div>
  );
}
