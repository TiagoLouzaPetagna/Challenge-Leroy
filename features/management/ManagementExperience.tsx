const MANAGEMENT_AREAS = [
  {
    id: "authoring",
    marker: "AU",
    label: "Autoria",
    title: "Estúdio de conteúdos",
    description:
      "Estrutura casos, evidências e decisões para novas atividades, sempre com revisão antes da publicação.",
    status: "Conteúdo previsto",
  },
  {
    id: "scheduling",
    marker: "PR",
    label: "Programação",
    title: "Campanhas e públicos",
    description:
      "Organiza temporadas e trilhas por competência ou área, sem disparos ou segmentações ativos nesta versão.",
    status: "Planejado",
  },
  {
    id: "insights",
    marker: "IN",
    label: "Indicadores",
    title: "Leitura agregada",
    description:
      "Resume domínio, reporte, recuperação e retenção por grupos, sem expor erros ou notas individuais.",
    status: "Conteúdo previsto",
  },
  {
    id: "governance",
    marker: "GO",
    label: "Governança",
    title: "Revisão e auditoria",
    description:
      "Prevê aprovação entre Segurança, Educação e Privacidade, com versões, permissões e prazos de retenção.",
    status: "Planejado",
  },
] as const;

export function ManagementExperience() {
  return (
    <div className="page-stack management-page">
      <header className="management-hero" aria-labelledby="management-title">
        <div className="management-hero-copy">
          <span className="management-eyebrow">Visão conceitual</span>
          <h1 id="management-title">Gestão do programa</h1>
          <p>
            Uma referência para equipes de Gestão, Segurança e Educação
            Corporativa. Esta visão permanece visível no protótipo para tornar o
            modelo completo compreensível, sem representar um painel
            administrativo já implementado.
          </p>
        </div>

        <aside
          className="management-scope"
          aria-labelledby="management-scope-title"
        >
          <span>Escopo atual</span>
          <h2 id="management-scope-title">Protótipo funcional</h2>
          <p>
            A experiência de aprendizagem pode ser demonstrada. Autorização,
            publicação, integrações e dados administrativos continuam fora deste
            protótipo.
          </p>
        </aside>
      </header>

      <section
        className="management-section"
        aria-labelledby="management-areas-title"
      >
        <div className="management-section-heading">
          <div>
            <span className="management-eyebrow">Mapa da solução</span>
            <h2 id="management-areas-title">Quatro áreas previstas</h2>
          </div>
          <p>
            Os cards descrevem intenção e escopo. Nenhum deles executa ações ou
            simula recursos indisponíveis.
          </p>
        </div>

        <div className="management-area-grid">
          {MANAGEMENT_AREAS.map((area) => (
            <article
              key={area.id}
              className="management-area-card"
              aria-labelledby={`management-area-${area.id}`}
            >
              <div className="management-card-heading">
                <span className="management-area-marker" aria-hidden="true">
                  {area.marker}
                </span>
                <span className="management-card-status">{area.status}</span>
              </div>
              <span className="management-area-label">{area.label}</span>
              <h3 id={`management-area-${area.id}`}>{area.title}</h3>
              <p>{area.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section
        className="management-principles"
        aria-labelledby="management-principles-title"
      >
        <div className="management-section-heading">
          <div>
            <span className="management-eyebrow">Princípios de leitura</span>
            <h2 id="management-principles-title">
              Indicadores úteis, pessoas protegidas
            </h2>
          </div>
        </div>

        <div className="management-principle-grid">
          <article className="management-principle-card">
            <span>Indicadores agregados</span>
            <h3>Decisões sobre o programa</h3>
            <p>
              Tendências por grupo orientam conteúdo e reforço sem criar listas
              públicas de falhas, rankings de risco ou comparações individuais.
            </p>
          </article>
          <article className="management-principle-card">
            <span>Privacidade por princípio</span>
            <h3>Somente o necessário</h3>
            <p>
              Resultados individuais permanecem privados; uma implementação
              futura deverá limitar acesso, finalidade e retenção antes de tratar
              dados administrativos.
            </p>
          </article>
        </div>
      </section>
    </div>
  );
}
