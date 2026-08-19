type ActivityProgressProps = {
  steps: readonly string[];
  currentStep: number;
  className?: string;
  ariaLabel: string;
  eyebrow?: string;
};

export function ActivityProgress({
  steps,
  currentStep,
  className,
  ariaLabel,
  eyebrow = "Progresso da atividade",
}: ActivityProgressProps) {
  const safeCurrentStep = Math.min(Math.max(currentStep, 0), steps.length - 1);
  const completedCount = safeCurrentStep;
  const remainingCount = Math.max(steps.length - safeCurrentStep - 1, 0);

  return (
    <section
      className={`activity-stage-progress ${className ?? ""}`.trim()}
      aria-label={ariaLabel}
    >
      <div className="activity-stage-progress__heading">
        <div>
          <span>{eyebrow}</span>
          <strong aria-current="step">{steps[safeCurrentStep]}</strong>
        </div>
        <b>
          Etapa {safeCurrentStep + 1} de {steps.length}
        </b>
      </div>

      <progress
        max={steps.length}
        value={safeCurrentStep + 1}
        aria-label={`${ariaLabel}: etapa ${safeCurrentStep + 1} de ${steps.length}, ${steps[safeCurrentStep]}`}
      />

      <div className="activity-stage-progress__counts" aria-hidden="true">
        <span>{completedCount} {completedCount === 1 ? "etapa concluída" : "etapas concluídas"}</span>
        <span>{remainingCount} {remainingCount === 1 ? "etapa restante depois desta" : "etapas restantes depois desta"}</span>
      </div>
    </section>
  );
}
