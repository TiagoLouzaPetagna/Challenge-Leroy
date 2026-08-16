"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";

import {
  TUTORIAL_LAST_STEP,
  TUTORIAL_STEPS,
} from "./tutorial-catalog";

type GuidedTutorialProps = {
  mode: "required" | "replay";
  persistedStep: number;
  reducedMotion: boolean;
  onStepChange: (step: number) => void;
  onComplete: () => void;
  onCloseReplay: () => void;
};

function clamp(value: number, minimum: number, maximum: number): number {
  return Math.min(Math.max(value, minimum), maximum);
}

export function GuidedTutorial({
  mode,
  persistedStep,
  reducedMotion,
  onStepChange,
  onComplete,
  onCloseReplay,
}: GuidedTutorialProps) {
  const [replayStep, setReplayStep] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const activeStep = mode === "replay" ? replayStep : persistedStep;
  const step = TUTORIAL_STEPS[activeStep] ?? TUTORIAL_STEPS[0];

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const updatePosition = () => {
      const target = step.target
        ? document.querySelector<HTMLElement>(step.target)
        : null;

      if (!target) {
        root.dataset.hasTarget = "false";
        root.removeAttribute("data-card-side");
        return;
      }

      const rect = target.getBoundingClientRect();
      const padding = window.innerWidth <= 620 ? 8 : 12;
      const left = clamp(rect.left - padding, 8, window.innerWidth - 16);
      const top = clamp(rect.top - padding, 8, window.innerHeight - 16);
      const width = clamp(
        rect.width + padding * 2,
        0,
        window.innerWidth - left - 8,
      );
      const height = clamp(
        rect.height + padding * 2,
        0,
        window.innerHeight - top - 8,
      );
      const cardWidth = Math.min(410, window.innerWidth - 40);
      const roomOnRight = window.innerWidth - (left + width);
      const placeOnRight = roomOnRight >= cardWidth + 28;
      const cardLeft = placeOnRight
        ? left + width + 20
        : Math.max(20, left - cardWidth - 20);
      const cardTop = clamp(top, 20, Math.max(20, window.innerHeight - 500));

      root.dataset.hasTarget = "true";
      root.dataset.cardSide = placeOnRight ? "right" : "left";
      const style = root.style;
      style.setProperty("--tour-left", `${left}px`);
      style.setProperty("--tour-top", `${top}px`);
      style.setProperty("--tour-width", `${width}px`);
      style.setProperty("--tour-height", `${height}px`);
      style.setProperty("--tour-card-left", `${cardLeft}px`);
      style.setProperty("--tour-card-top", `${cardTop}px`);
    };

    const target = step.target
      ? document.querySelector<HTMLElement>(step.target)
      : null;
    target?.scrollIntoView({
      block: window.innerWidth <= 620 ? "start" : "center",
      inline: "nearest",
      behavior: reducedMotion ? "auto" : "smooth",
    });

    const frame = window.requestAnimationFrame(updatePosition);
    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition, true);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition, true);
    };
  }, [activeStep, reducedMotion, step.target]);

  useEffect(() => {
    headingRef.current?.focus();
  }, [activeStep]);

  const setStep = (nextStep: number) => {
    const safeStep = clamp(nextStep, 0, TUTORIAL_LAST_STEP);
    if (mode === "replay") setReplayStep(safeStep);
    else onStepChange(safeStep);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Escape") {
      event.preventDefault();
      if (mode === "replay") onCloseReplay();
      return;
    }

    if (event.key !== "Tab") return;
    const controls = rootRef.current?.querySelectorAll<HTMLElement>(
      'button:not([disabled]), [href], [tabindex]:not([tabindex="-1"])',
    );
    if (!controls?.length) return;
    const first = controls[0];
    const last = controls[controls.length - 1];

    if (
      event.shiftKey &&
      (document.activeElement === first || document.activeElement === headingRef.current)
    ) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  return (
    <div
      ref={rootRef}
      className="guided-tour"
      data-has-target="false"
      role="dialog"
      aria-modal="true"
      aria-labelledby="guided-tour-title"
      aria-describedby="guided-tour-description"
      onKeyDown={handleKeyDown}
    >
      <div className="guided-tour-full-shade" aria-hidden="true" />
      <div className="guided-tour-shade top" aria-hidden="true" />
      <div className="guided-tour-shade left" aria-hidden="true" />
      <div className="guided-tour-shade right" aria-hidden="true" />
      <div className="guided-tour-shade bottom" aria-hidden="true" />
      <div className="guided-tour-highlight" aria-hidden="true" />

      <section className="guided-tour-card">
        <div className="guided-tour-meta">
          <span>{step.eyebrow}</span>
          <strong>Etapa {activeStep + 1} de {TUTORIAL_STEPS.length}</strong>
        </div>
        <h2 id="guided-tour-title" ref={headingRef} tabIndex={-1}>
          <span className="sr-only">
            Etapa {activeStep + 1} de {TUTORIAL_STEPS.length}:{" "}
          </span>
          {step.title}
        </h2>
        <p id="guided-tour-description">{step.description}</p>
        <p className="guided-tour-detail">{step.detail}</p>
        <p className="guided-tour-target-label">
          <span aria-hidden="true">◎</span> Área em destaque: {step.targetLabel}
        </p>

        <ol className="guided-tour-progress" aria-label="Progresso do tutorial">
          {TUTORIAL_STEPS.map((item, index) => (
            <li
              key={item.id}
              className={
                index === activeStep
                  ? "active"
                  : index < activeStep
                    ? "completed"
                    : ""
              }
            >
              <span className="sr-only">{item.title}</span>
            </li>
          ))}
        </ol>

        <div className="guided-tour-actions">
          <div>
            {activeStep > 0 ? (
              <button
                type="button"
                className="text-button"
                onClick={() => setStep(activeStep - 1)}
              >
                Voltar
              </button>
            ) : null}
            {mode === "replay" ? (
              <button
                type="button"
                className="text-button guided-tour-close"
                onClick={onCloseReplay}
              >
                Fechar tutorial
              </button>
            ) : null}
          </div>
          {activeStep === TUTORIAL_LAST_STEP ? (
            <button type="button" className="primary-button" onClick={onComplete}>
              {mode === "replay" ? "Concluir revisão" : "Começar primeira Missão"}
            </button>
          ) : (
            <button
              type="button"
              className="primary-button"
              onClick={() => setStep(activeStep + 1)}
            >
              {activeStep === 0 ? "Começar" : "Continuar"}
            </button>
          )}
        </div>
      </section>
    </div>
  );
}
