"use client";

import { useEffect, useRef } from "react";

export function useActivityStageFocus(currentStage: number) {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const previousStageRef = useRef(currentStage);

  useEffect(() => {
    if (previousStageRef.current === currentStage) return;
    previousStageRef.current = currentStage;

    const frame = window.requestAnimationFrame(() => titleRef.current?.focus());
    return () => window.cancelAnimationFrame(frame);
  }, [currentStage]);

  return titleRef;
}

