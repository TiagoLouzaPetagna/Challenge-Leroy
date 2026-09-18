import type { PortalRouteResolution } from "@/lib/activities/types";

import { ActivityShell } from "./ActivityShell";

type ActivityRouteStateProps = {
  resolution: PortalRouteResolution;
  onBack: () => void;
};

export function ActivityRouteState({
  resolution,
  onBack,
}: ActivityRouteStateProps) {
  const planned = resolution.kind === "planned";

  return (
    <ActivityShell
      className={`page-stack activity-route-state ${planned ? "planned" : "unknown"}`}
      activityId={resolution.activityId ?? undefined}
    >
      <section className="section-hero">
        <div>
          <span className="section-badge">
            {resolution.areaLabel} · {planned ? "Planejada" : "Rota indisponível"}
          </span>
          <h1>{resolution.title}</h1>
          <p>
            {planned
              ? "Esta atividade pertence ao portfólio aprovado, mas ainda não possui player, contrato, avaliador e persistência publicados nesta versão do portal."
              : "Não existe uma atividade publicada neste endereço. Nenhuma tentativa, recompensa ou conclusão foi criada."}
          </p>
        </div>
        <div className="purpose-card">
          <span>Estado verdadeiro</span>
          <p>
            {planned
              ? "O conteúdo permanece planejado até concluir implementação e validação."
              : "Use o catálogo da área para escolher uma experiência disponível."}
          </p>
        </div>
      </section>

      <section className="next-panel">
        <div>
          <span className="section-kicker">Navegação segura</span>
          <h2>Voltar ao catálogo da área</h2>
          <p>
            A navegação não gera pontos e conteúdos planejados não simulam uma
            conclusão.
          </p>
        </div>
        <div className="next-actions">
          <button type="button" className="primary-button dark" onClick={onBack}>
            Voltar para {resolution.areaLabel}
          </button>
        </div>
      </section>
    </ActivityShell>
  );
}

