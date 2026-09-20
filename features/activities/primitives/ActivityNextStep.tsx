"use client";

import { ArrowRight } from "lucide-react";

type ActivityNextStepProps = {
  area: string;
  title: string;
  onOpen: () => void;
};

export function ActivityNextStep({ area, title, onOpen }: ActivityNextStepProps) {
  return (
    <section className="activity-next-step" aria-label="Próxima atividade">
      <div>
        <span>Próxima atividade · {area}</span>
        <h3>{title}</h3>
      </div>
      <button type="button" className="primary-button" onClick={onOpen}>
        Abrir atividade <ArrowRight size={18} strokeWidth={2} aria-hidden="true" />
      </button>
    </section>
  );
}
