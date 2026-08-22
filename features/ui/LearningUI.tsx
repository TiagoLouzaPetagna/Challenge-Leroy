"use client";

import Image from "next/image";
import type { ButtonHTMLAttributes, CSSProperties, ReactNode } from "react";

export type MascotPose =
  | "welcome"
  | "approved"
  | "thinking"
  | "alert"
  | "hero"
  | "sad"
  | "encourage"
  | "explaining"
  | "celebration"
  | "gratitude";

export function Mascot({
  pose,
  alt = "",
  size = "medium",
  className = "",
}: {
  pose: MascotPose;
  alt?: string;
  size?: "small" | "medium" | "large";
  className?: string;
}) {
  return (
    <span
      className={`leroyzin leroyzin--${size} ${className}`.trim()}
      aria-hidden={alt ? undefined : "true"}
    >
      {/* PNG oficial: não transformar, redesenhar ou substituir por SVG. */}
      <Image
        src={`/mascot/leroyzin/${pose}.png`}
        alt={alt}
        draggable={false}
        fill
        unoptimized
        priority={pose === "welcome"}
        sizes={size === "large" ? "330px" : size === "medium" ? "190px" : "86px"}
      />
    </span>
  );
}

export function LearningButton({
  children,
  className = "",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={`learning-button ${className}`.trim()}
      type={props.type ?? "button"}
    >
      {children}
    </button>
  );
}

export function ProgressJourney({
  current,
  total,
  label,
  compact = false,
}: {
  current: number;
  total: number;
  label: string;
  compact?: boolean;
}) {
  const safeTotal = Math.max(total, 1);
  const safeCurrent = Math.min(Math.max(current, 0), safeTotal);
  const style = {
    "--journey-progress": `${(safeCurrent / safeTotal) * 100}%`,
  } as CSSProperties;

  return (
    <div
      className={`progress-journey${compact ? " progress-journey--compact" : ""}`}
      aria-label={label}
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={safeTotal}
      aria-valuenow={safeCurrent}
      aria-valuetext={`${safeCurrent} de ${safeTotal}`}
      style={style}
    >
      <div className="progress-journey__rail" aria-hidden="true">
        {Array.from({ length: safeTotal }, (_, index) => (
          <span
            className={
              index < safeCurrent
                ? "is-complete"
                : index === safeCurrent
                  ? "is-current"
                  : ""
            }
            key={index}
          />
        ))}
      </div>
      <strong>{safeCurrent} de {safeTotal}</strong>
    </div>
  );
}

export function IllustratedMessage({ children }: { children?: ReactNode }) {
  return (
    <div className="message-illustration" aria-hidden="true">
      <span className="message-illustration__sun" />
      <span className="message-illustration__spark message-illustration__spark--one" />
      <span className="message-illustration__spark message-illustration__spark--two" />
      <div className="message-illustration__device">
        <div className="message-illustration__browser">
          <span />
          <span />
          <span />
        </div>
        <div className="message-illustration__mail">
          <span className="message-illustration__avatar">!</span>
          <i />
          <i />
          <b>seguranca-contas.example</b>
        </div>
      </div>
      <span className="message-illustration__lens" />
      {children}
    </div>
  );
}
