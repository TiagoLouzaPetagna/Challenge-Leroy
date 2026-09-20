"use client";

import type { ReactNode, RefObject } from "react";
import { ArrowRight, Check, Mail, type LucideIcon } from "lucide-react";

import { ActivityShell } from "@/features/activities/ActivityShell";

import styles from "./Lesson.module.css";

export function Icon({ icon: Component, size = 20 }: { icon: LucideIcon; size?: number }) {
  return <Component size={size} strokeWidth={1.8} aria-hidden="true" />;
}

type LessonShellProps = {
  activityId: string;
  area: string;
  topic: string;
  title: string;
  steps: readonly string[];
  stage: number;
  /** Null quando a etapa já pode avançar; caso contrário, o que falta fazer. */
  pending: string | null;
  nextLabel: string;
  onNext: () => void;
  /** Volta para uma etapa já concluída. O rodapé tem só o botão de avançar. */
  onStageSelect?: (stage: number) => void;
  /**
   * Classe extra no elemento raiz. Lições que ainda usam a marcação global antiga
   * precisam de "activity-workspace", que carrega as regras que normalizam essas
   * classes; sem ela o layout legado volta ao estilo cru.
   */
  pageClassName?: string;
  busy?: boolean;
  error?: string;
  children: ReactNode;
};

export function LessonShell({
  activityId,
  area,
  topic,
  title,
  steps,
  stage,
  pending,
  nextLabel,
  onNext,
  onStageSelect,
  pageClassName,
  busy = false,
  error = "",
  children,
}: LessonShellProps) {
  return (
    <ActivityShell activityId={activityId} className={pageClassName ? `${styles.page} ${pageClassName}` : styles.page}>
      <header className={styles.header}>
        <span className={styles.eyebrow}>
          <span />
          {area}
          <span className={styles.eyebrowDivider}>/</span>
          {topic}
        </span>
        <h1>{title}</h1>
      </header>

      <section className={styles.progress} aria-label={`Progresso: ${title}`}>
        <ol>
          {steps.map((step, index) => {
            const done = stage > index;
            const marker = <span>{done ? <Icon icon={Check} size={13} /> : `0${index + 1}`}</span>;
            return (
              <li
                key={step}
                aria-current={stage === index ? "step" : undefined}
                className={done ? styles.done : ""}
              >
                {done && onStageSelect ? (
                  <button
                    type="button"
                    className={styles.stepBack}
                    disabled={busy}
                    onClick={() => onStageSelect(index)}
                  >
                    {marker}
                    <strong>{step}</strong>
                  </button>
                ) : (
                  <>
                    {marker}
                    <strong>{step}</strong>
                  </>
                )}
              </li>
            );
          })}
        </ol>
        <progress
          value={stage}
          max={steps.length - 1}
          aria-label={`Etapa ${stage + 1} de ${steps.length}: ${steps[stage]}`}
        />
      </section>

      <div className={styles.workspace}>
        {children}

        {error ? (
          <p className={styles.error} role="alert">
            {error}
          </p>
        ) : null}

        <footer className={styles.footer}>
          <div className={styles.nextStep} role="status">
            {pending ? <span>{pending}</span> : null}
          </div>
          <button
            type="button"
            className={styles.primary}
            disabled={Boolean(pending) || busy}
            onClick={onNext}
          >
            {busy ? "Salvando…" : nextLabel}
            <Icon icon={ArrowRight} size={18} />
          </button>
        </footer>
      </div>
    </ActivityShell>
  );
}

export function StageHeading({
  label,
  title,
  instruction,
  titleRef,
}: {
  label: string;
  title: string;
  instruction: string;
  titleRef?: RefObject<HTMLHeadingElement | null>;
}) {
  return (
    <>
      <div className={styles.stageHeading}>
        <span className={styles.microLabel}>{label}</span>
        <h2 ref={titleRef} tabIndex={-1}>
          {title}
        </h2>
      </div>
      <div className={styles.instruction}>
        <p>{instruction}</p>
      </div>
    </>
  );
}

export function EmailCard({
  subject,
  senderName,
  from,
  replyTo,
  body,
  note,
  receivedAt = "08:12",
}: {
  subject: string;
  senderName: string;
  from: string;
  replyTo?: string;
  body: string;
  note?: string;
  receivedAt?: string;
}) {
  return (
    <article className={styles.email} aria-label="E-mail do caso (exemplo fictício)">
      <div className={styles.emailToolbar}>
        <span>
          <Icon icon={Mail} size={16} /> Caixa de entrada
        </span>
        <span>Recebido {receivedAt}</span>
      </div>
      <div className={styles.emailContent}>
        <h3 className={styles.emailSubject}>{subject}</h3>
        <div className={styles.emailMeta}>
          <span className={styles.emailAvatar}>
            <Icon icon={Mail} size={19} />
          </span>
          <div>
            <strong>{senderName}</strong>
            <p className={styles.emailRow}>
              <span>de:</span>
              <code>{from}</code>
            </p>
            {replyTo ? (
              <p className={styles.emailRow}>
                <span>a resposta vai para:</span>
                <code>{replyTo}</code>
              </p>
            ) : null}
          </div>
        </div>
        <div className={styles.emailBody}>
          <p>{body}</p>
        </div>
        {note ? <small className={styles.emailNote}>{note}</small> : null}
      </div>
    </article>
  );
}

export function Note({ title, children }: { title?: string; children: ReactNode }) {
  return (
    <div className={styles.note}>
      <div>
        {title ? <strong>{title}</strong> : null}
        {children}
      </div>
    </div>
  );
}

export { styles as lessonStyles };
