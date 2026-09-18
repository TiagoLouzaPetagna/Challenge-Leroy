"use client";

import { useEffect, useRef } from "react";

/**
 * `covered` (resultado-debrief.md §2.1): true enquanto a celebração/conquista
 * em tela cheia cobre a etapa — Resultado é montado com o mesmo `currentStage`
 * de antes da celebração, então só a mudança de `covered` para `false` marca
 * a entrada real no Resultado.
 *
 * Dispara também na montagem (abertura da atividade, ou reentrada direto no
 * Resultado), não só em transições — o sentinel `null` nunca bate com a
 * primeira chave real. O duplo `requestAnimationFrame` garante que este foco
 * vença o `mainContentRef.focus()` que `app/page.tsx` agenda com um único
 * rAF ao trocar de rota.
 */
export function useActivityStageFocus(currentStage: number, covered = false) {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const previousKeyRef = useRef<string | null>(null);

  useEffect(() => {
    const key = `${currentStage}:${covered}`;
    if (previousKeyRef.current === key) return;
    previousKeyRef.current = key;
    if (covered) return;

    let inner = 0;
    const outer = window.requestAnimationFrame(() => {
      inner = window.requestAnimationFrame(() => titleRef.current?.focus());
    });
    return () => {
      window.cancelAnimationFrame(outer);
      window.cancelAnimationFrame(inner);
    };
  }, [currentStage, covered]);

  return titleRef;
}

