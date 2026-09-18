"use client";

import { useEffect, useRef, useState, type CSSProperties, type KeyboardEvent } from "react";

import {
  TUTORIAL_LAST_STEP,
  TUTORIAL_REPLAY_LAST_STEP,
  TUTORIAL_STEPS,
} from "./tutorial-catalog";
import { Mascot } from "../ui/LearningUI";
import styles from "./GuidedTutorial.module.css";

type GuidedTutorialProps = {
  mode: "required" | "replay";
  persistedStep: number;
  reducedMotion: boolean;
  nextStepAreaColor: string;
  onStepChange: (step: number) => void;
  onComplete: () => void;
  onCloseReplay: () => void;
  onMenuStepChange: (active: boolean) => void;
};

function clamp(value: number, minimum: number, maximum: number): number {
  return Math.min(Math.max(value, minimum), maximum);
}

export function GuidedTutorial({
  mode,
  persistedStep,
  reducedMotion,
  nextStepAreaColor,
  onStepChange,
  onComplete,
  onCloseReplay,
  onMenuStepChange,
}: GuidedTutorialProps) {
  const [replayStep, setReplayStep] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const activeStep = clamp(
    mode === "replay" ? replayStep : persistedStep,
    0,
    TUTORIAL_LAST_STEP,
  );
  const step = TUTORIAL_STEPS[activeStep];
  const isLastStep = activeStep === TUTORIAL_LAST_STEP;
  const isReplayClosing = mode === "replay" && isLastStep;
  const title = isReplayClosing ? TUTORIAL_REPLAY_LAST_STEP.title : step.title;
  const description = isReplayClosing
    ? TUTORIAL_REPLAY_LAST_STEP.description
    : step.description;
  const chipColor = step.id === "next-step" ? nextStepAreaColor : step.chipColor;

  // O passo "menu" abre o painel real do Shell; nenhum outro passo mexe nele.
  useEffect(() => {
    const isMenuStep = step.id === "menu";
    onMenuStepChange(isMenuStep);
    return () => {
      if (isMenuStep) onMenuStepChange(false);
    };
  }, [step.id, onMenuStepChange]);

  // team-shield é a última seção da Home: sem esta folga, a página não tem
  // espaço para rolar o alvo até o centro pretendido, e o recorte fica perto
  // demais do cartão fixo (canto inferior direito) — colisão real em 1440px.
  useEffect(() => {
    const previous = document.body.style.paddingBottom;
    document.body.style.paddingBottom = `${window.innerHeight}px`;
    return () => {
      document.body.style.paddingBottom = previous;
    };
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const updatePosition = () => {
      const target = step.target
        ? document.querySelector<HTMLElement>(step.target)
        : null;

      if (!target) {
        root.dataset.hasTarget = "false";
        return;
      }

      const rect = target.getBoundingClientRect();
      const padding = 12;
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

      root.dataset.hasTarget = "true";
      const style = root.style;
      style.setProperty("--tour-left", `${left}px`);
      style.setProperty("--tour-top", `${top}px`);
      style.setProperty("--tour-width", `${width}px`);
      style.setProperty("--tour-height", `${height}px`);
    };

    const target = step.target
      ? document.querySelector<HTMLElement>(step.target)
      : null;
    if (target) {
      const rect = target.getBoundingClientRect();
      const scrollTarget = rect.top + window.scrollY + rect.height / 2 - 300;
      window.scrollTo({
        top: Math.max(0, scrollTarget),
        behavior: reducedMotion ? "auto" : "smooth",
      });
    }

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

  const primaryLabel = isLastStep
    ? mode === "replay"
      ? "Concluir revisão"
      : "Ir para as Missões"
    : activeStep === 0
      ? "Começar"
      : "Continuar";

  return (
    <div
      ref={rootRef}
      className={styles.tour}
      data-has-target="false"
      role="dialog"
      aria-modal="true"
      aria-labelledby="guided-tour-title"
      aria-describedby="guided-tour-description"
      onKeyDown={handleKeyDown}
    >
      <div className={styles.shade} aria-hidden="true" />

      <section className={styles.card}>
        {activeStep === 0 ? (
          <div className={styles.mascot}>
            <Mascot
              pose="hero"
              size="medium"
              alt="Leroyzin recebe você na Casa Digital Segura."
            />
          </div>
        ) : null}

        {step.chipLabel ? (
          <span
            className={styles.chip}
            data-tone={step.chipTone ?? "neutral"}
            style={chipColor ? ({ "--chip-color": chipColor } as CSSProperties) : undefined}
          >
            {step.chipLabel}
          </span>
        ) : null}

        <h2 id="guided-tour-title" className={styles.title} ref={headingRef} tabIndex={-1}>
          <span className="sr-only">
            Etapa {activeStep + 1} de {TUTORIAL_STEPS.length}:{" "}
          </span>
          {title}
        </h2>
        <p id="guided-tour-description" className={styles.body}>
          {description}
        </p>

        <ol className={styles.progress} aria-hidden="true">
          {TUTORIAL_STEPS.map((item, index) => (
            <li
              key={item.id}
              data-state={
                index === activeStep ? "current" : index < activeStep ? "done" : undefined
              }
            />
          ))}
        </ol>

        <div className={styles.actions}>
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
              <button type="button" className="text-button" onClick={onCloseReplay}>
                Fechar tutorial
              </button>
            ) : null}
          </div>
          <button
            type="button"
            className="primary-button"
            onClick={isLastStep ? onComplete : () => setStep(activeStep + 1)}
          >
            {primaryLabel}
          </button>
        </div>
      </section>
    </div>
  );
}
