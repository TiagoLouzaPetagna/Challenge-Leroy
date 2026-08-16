type ActivityProgressProps = {
  steps: readonly string[];
  currentStep: number;
  className?: string;
  ariaLabel: string;
};

export function ActivityProgress({
  steps,
  currentStep,
  className,
  ariaLabel,
}: ActivityProgressProps) {
  return (
    <ol className={className} aria-label={ariaLabel}>
      {steps.map((step, index) => (
        <li
          key={step}
          className={
            index === currentStep
              ? "active"
              : index < currentStep
                ? "complete"
                : ""
          }
          aria-current={index === currentStep ? "step" : undefined}
        >
          <span>{index < currentStep ? "✓" : index + 1}</span>
          <strong>{step}</strong>
        </li>
      ))}
    </ol>
  );
}

