"use client";

import { useEffect, useRef, type KeyboardEvent } from "react";

import { Mascot } from "@/features/ui/LearningUI";

type ActivityCelebrationProps = {
  activityTitle: string;
  modeColor: string;
  onContinue: () => void;
};

/**
 * resultado-debrief.md §3: tela inteira, sem números, não avança sozinha
 * (WCAG 2.2.1) — a ação de continuar fica visível desde o primeiro quadro.
 * §14: descartável por Enter, Espaço ou Esc, além do clique no botão.
 */
export function ActivityCelebration({
  activityTitle,
  modeColor,
  onContinue,
}: ActivityCelebrationProps) {
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

  return (
    <div
      className="activity-celebration"
      style={{ "--celebration-color": modeColor } as React.CSSProperties}
      role="region"
      aria-labelledby="activity-celebration-title"
      onKeyDown={handleKeyDown}
    >
      <div className="activity-celebration__mascot">
        <Mascot pose="celebration" size="large" alt="" />
      </div>
      <h1 id="activity-celebration-title" ref={headingRef} tabIndex={-1}>
        Você concluiu
        <br />
        {activityTitle}
      </h1>
      <button type="button" className="primary-button dark" onClick={onContinue}>
        Continuar <span aria-hidden="true">→</span>
      </button>
    </div>
  );
}
