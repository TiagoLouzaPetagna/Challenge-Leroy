"use client";

import { useMemo, useState, type FormEvent } from "react";

import { ActivityAnswerReview } from "@/features/activities/primitives/ActivityAnswerReview";

import {
  RADAR_ARTICLES,
  RADAR_QUESTION_OPTIONS,
  type RadarArticleDefinition,
} from "@/lib/content/radar-catalog";
import { POINT_RULES } from "@/lib/domain/rules";
import type { RadarAnswer, RadarResult } from "@/lib/domain/types";

type RadarHubProps = {
  completedArticleIds: string[];
  radarPoints: number;
  onOpenArticle: (slug: string) => void;
  onBackToOverview: () => void;
};

export function RadarHub({
  completedArticleIds,
  radarPoints,
  onOpenArticle,
  onBackToOverview,
}: RadarHubProps) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [duration, setDuration] = useState("all");
  const [competency, setCompetency] = useState("all");
  const completed = new Set(completedArticleIds);
  const featured = RADAR_ARTICLES[0];
  const filteredArticles = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase("pt-BR");
    return RADAR_ARTICLES.filter((article) => {
      const matchesQuery =
        !normalizedQuery ||
        `${article.title} ${article.summary} ${article.categoryLabel}`
          .toLocaleLowerCase("pt-BR")
          .includes(normalizedQuery);
      const matchesCategory =
        category === "all" || article.category === category;
      const matchesDuration =
        duration === "all" ||
        (duration === "short"
          ? article.estimatedMinutes <= 4
          : article.estimatedMinutes >= 5);
      const matchesCompetency =
        competency === "all" || article.competencyId === competency;
      return (
        matchesQuery &&
        matchesCategory &&
        matchesDuration &&
        matchesCompetency
      );
    });
  }, [category, competency, duration, query]);

  const clearFilters = () => {
    setQuery("");
    setCategory("all");
    setDuration("all");
    setCompetency("all");
  };

  return (
    <div className="page-stack radar-page">
      <section className="radar-hero">
        <div className="radar-hero-copy">
          <span className="section-kicker">Radar educativo</span>
          <h1>Entenda golpes atuais sem transformar tudo em alerta</h1>
          <p>
            Notícias explicadas, técnicas de engenharia social e orientações
            práticas para consultar quando surgir uma dúvida. O Radar não informa
            incidentes ativos da Leroy Merlin.
          </p>
          <div className="radar-hero-actions">
            <button
              type="button"
              className="primary-button"
              onClick={() => onOpenArticle(featured.slug)}
            >
              {completed.has(featured.id) ? "Reler destaque" : "Ler destaque"}
            </button>
            <button type="button" className="text-button" onClick={onBackToOverview}>
              Voltar à visão geral
            </button>
          </div>
        </div>
        <div className="radar-status-card" aria-label="Seu histórico no Radar">
          <span>Seu Radar</span>
          <strong>{completedArticleIds.length}</strong>
          <p>conteúdo concluído</p>
          <small>{radarPoints} pontos confirmados · recompensas únicas</small>
        </div>
      </section>

      <section className="radar-featured-card">
        <div className="radar-featured-marker" aria-hidden="true">
          QR
        </div>
        <div>
          <span className="radar-card-eyebrow">Golpe em foco · {featured.estimatedMinutes} min</span>
          <h2>{featured.title}</h2>
          <p>{featured.summary}</p>
          <div className="radar-card-meta">
            <span>{featured.categoryLabel}</span>
            <span>Competência: {featured.competencyLabel}</span>
            <span>{POINT_RULES.radar} pontos</span>
          </div>
        </div>
        <button
          type="button"
          className="primary-button dark"
          onClick={() => onOpenArticle(featured.slug)}
        >
          {completed.has(featured.id) ? "Reler conteúdo" : "Abrir conteúdo"}
        </button>
      </section>

      <section className="radar-library" aria-labelledby="radar-library-title">
        <div className="radar-section-heading">
          <div>
            <span className="section-kicker">Biblioteca</span>
            <h2 id="radar-library-title">Explore por situação ou habilidade</h2>
          </div>
          <span>{filteredArticles.length} de {RADAR_ARTICLES.length} conteúdos</span>
        </div>
        <div className="radar-filters">
          <label className="radar-search-field">
            <span>Buscar</span>
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Ex.: QR Code, gestor, acesso"
            />
          </label>
          <label>
            <span>Tema</span>
            <select value={category} onChange={(event) => setCategory(event.target.value)}>
              <option value="all">Todos</option>
              <option value="links-e-qr">Links e QR Codes</option>
              <option value="mensagens">Mensagens e anexos</option>
              <option value="identidade">Identidade e confiança</option>
              <option value="acesso">Contas e acesso</option>
              <option value="resposta">Resposta segura</option>
            </select>
          </label>
          <label>
            <span>Duração</span>
            <select value={duration} onChange={(event) => setDuration(event.target.value)}>
              <option value="all">Qualquer duração</option>
              <option value="short">Até 4 minutos</option>
              <option value="long">5 minutos ou mais</option>
            </select>
          </label>
          <label>
            <span>Competência</span>
            <select value={competency} onChange={(event) => setCompetency(event.target.value)}>
              <option value="all">Todas</option>
              <option value="observar">Observar</option>
              <option value="investigar">Investigar</option>
              <option value="verificar">Verificar</option>
              <option value="decidir">Decidir</option>
              <option value="recuperar">Recuperar</option>
            </select>
          </label>
        </div>

        {filteredArticles.length ? (
          <div className="radar-card-grid">
            {filteredArticles.map((article) => {
              const isCompleted = completed.has(article.id);
              return (
                <article className="radar-catalog-card" key={article.id}>
                  <div className="radar-card-topline">
                    <span>{article.categoryLabel}</span>
                    <span className={`radar-content-status ${isCompleted ? "completed" : ""}`}>
                      {isCompleted
                        ? "Concluído"
                        : article.status === "available"
                          ? "Disponível"
                          : "Em preparação"}
                    </span>
                  </div>
                  <h3>{article.title}</h3>
                  <p>{article.summary}</p>
                  <div className="radar-card-meta">
                    <span>{article.estimatedMinutes} min</span>
                    <span>{article.competencyLabel}</span>
                  </div>
                  {article.status === "available" ? (
                    <button
                      type="button"
                      className="text-button"
                      onClick={() => onOpenArticle(article.slug)}
                    >
                      {isCompleted ? "Reler" : "Ler e verificar"} <span aria-hidden="true">→</span>
                    </button>
                  ) : (
                    <span className="radar-planned-note">Estrutura prevista para os próximos lotes</span>
                  )}
                </article>
              );
            })}
          </div>
        ) : (
          <div className="radar-empty-state">
            <strong>Nenhum conteúdo corresponde aos filtros.</strong>
            <p>Remova um filtro para ampliar a biblioteca.</p>
            <button type="button" className="text-button" onClick={clearFilters}>
              Limpar filtros
            </button>
          </div>
        )}
      </section>

      <section className="radar-history-panel">
        <div>
          <span className="section-kicker">Histórico</span>
          <h2>Leituras concluídas</h2>
          <p>
            Uma leitura entra no histórico após a resposta correta. Reler ajuda a
            revisar, mas não duplica pontos nem a conclusão.
          </p>
        </div>
        <div className="radar-history-list">
          {completedArticleIds.length ? (
            RADAR_ARTICLES.filter((article) => completed.has(article.id)).map(
              (article) => (
                <button
                  type="button"
                  key={article.id}
                  onClick={() => onOpenArticle(article.slug)}
                >
                  <span aria-hidden="true">✓</span>
                  <span><strong>{article.title}</strong><small>Disponível para releitura</small></span>
                </button>
              ),
            )
          ) : (
            <p className="radar-history-empty">Conclua o destaque para iniciar seu histórico.</p>
          )}
        </div>
      </section>
    </div>
  );
}

type RadarArticleProps = {
  article: RadarArticleDefinition;
  isCompleted: boolean;
  claimedPoints: number;
  onComplete: (answer: RadarAnswer) => Promise<RadarResult>;
  onBackToRadar: () => void;
  onOpenPhishLab: () => void;
  onOpenMission: () => void;
};

export function RadarArticle({
  article,
  isCompleted,
  claimedPoints,
  onComplete,
  onBackToRadar,
  onOpenPhishLab,
  onOpenMission,
}: RadarArticleProps) {
  const [selectedOptionId, setSelectedOptionId] = useState("");
  const [result, setResult] = useState<RadarResult | null>(null);
  const [feedback, setFeedback] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const selectedOption = RADAR_QUESTION_OPTIONS.find(
    (option) => option.id === selectedOptionId,
  );
  const completedNow = isCompleted || Boolean(result?.correct);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!selectedOptionId || isSubmitting) return;
    setIsSubmitting(true);
    setError("");
    try {
      const nextResult = await onComplete({
        activityId: article.id,
        activityVersion: article.version,
        selectedOptionId,
      });
      setResult(nextResult);
      if (!nextResult.correct) {
        setFeedback(
          selectedOption?.explanation ?? "Revise os sinais e tente novamente.",
        );
        setSelectedOptionId("");
      }
    } catch {
      setError("Não foi possível registrar a verificação agora. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="page-stack radar-article-page">
      <button type="button" className="text-button radar-back-button" onClick={onBackToRadar}>
        ← Voltar ao Radar
      </button>

      <article className="radar-article-shell">
        <header className="radar-article-header">
          <div>
            <span className="section-kicker">{article.categoryLabel}</span>
            <h1>{article.title}</h1>
            <p>{article.lead}</p>
          </div>
          <aside>
            <span>{article.estimatedMinutes} min</span>
            <span>Competência: {article.competencyLabel}</span>
            <span>{POINT_RULES.radar} pontos na primeira conclusão</span>
          </aside>
        </header>

        <div className="radar-article-body">
          <section>
            <span className="radar-section-number">01</span>
            <div>
              <h2>Como o golpe funciona</h2>
              <p>
                O QR Code transforma um endereço em uma imagem. Isso facilita o
                acesso pelo celular, mas também impede que o destino seja lido de
                imediato. Um golpe pode usar cartazes, mensagens, supostos avisos
                de entrega ou cobranças para levar a uma página de captura de dados.
              </p>
            </div>
          </section>
          <section>
            <span className="radar-section-number">02</span>
            <div>
              <h2>Sinais para observar</h2>
              <ul>
                <li>Pedido urgente para escanear, pagar, confirmar ou entrar novamente.</li>
                <li>QR Code recebido fora do contexto esperado ou colado sobre outro material.</li>
                <li>Endereço exibido após a leitura diferente do domínio oficial esperado.</li>
                <li>Página que solicita senha, dados pessoais ou pagamento sem confirmação prévia.</li>
              </ul>
            </div>
          </section>
          <section>
            <span className="radar-section-number">03</span>
            <div>
              <h2>Resposta segura em quatro passos</h2>
              <ol className="radar-safe-steps">
                <li><strong>Pare.</strong><span>Não prossiga apenas por causa da urgência.</span></li>
                <li><strong>Veja o destino.</strong><span>Use a prévia do leitor sem abrir o endereço.</span></li>
                <li><strong>Confirme.</strong><span>Procure o serviço por um canal ou aplicativo conhecido.</span></li>
                <li><strong>Reporte.</strong><span>Se continuar suspeito, use o canal oficial da empresa.</span></li>
              </ol>
            </div>
          </section>
          <aside className="radar-key-message">
            <span>Ideia principal</span>
            <strong>O formato do QR Code não comprova a legitimidade do destino.</strong>
            <p>Contexto, domínio e confirmação continuam sendo as evidências mais úteis.</p>
          </aside>
        </div>
      </article>

      <section className="radar-check-panel" aria-labelledby="radar-check-title">
        <div className="radar-check-heading">
          <div>
            <span className="section-kicker">Verificação final</span>
            <h2 id="radar-check-title">Qual é a atitude mais segura diante de um QR Code inesperado?</h2>
          </div>
          <span className={completedNow ? "completed" : ""}>
            {completedNow ? "Concluído" : `${POINT_RULES.radar} pontos`}
          </span>
        </div>

        {completedNow ? (
          <><div className="radar-complete-message" role="status">
            <span aria-hidden="true">✓</span>
            <div>
              <strong>Conteúdo concluído</strong>
              <p>
                {result?.correct && !result.alreadyCompleted
                  ? `${result.points} pontos foram registrados. A leitura também entrou no seu histórico.`
                  : `${claimedPoints || POINT_RULES.radar} pontos já estavam confirmados. A releitura não duplicou a recompensa.`}
              </p>
            </div>
          </div>
          <ActivityAnswerReview
            items={[
              {
                id: "radar-check",
                title: "Atitude diante de um QR Code inesperado",
                status: "correct",
                userAnswer: selectedOption?.label ?? "Resposta correta registrada anteriormente",
                expectedAnswer: RADAR_QUESTION_OPTIONS.find((option) => option.id === "inspect-and-confirm")?.label,
                explanation: RADAR_QUESTION_OPTIONS.find((option) => option.id === "inspect-and-confirm")?.explanation ?? "Verifique destino e contexto por uma rota conhecida.",
              },
            ]}
          /></>
        ) : (
          <form onSubmit={handleSubmit}>
            <fieldset>
              <legend className="sr-only">Escolha uma resposta</legend>
              {RADAR_QUESTION_OPTIONS.map((option) => (
                <label className="radar-answer-option" key={option.id}>
                  <input
                    type="radio"
                    name="radar-answer"
                    value={option.id}
                    checked={selectedOptionId === option.id}
                    onChange={() => {
                      setSelectedOptionId(option.id);
                      setResult(null);
                      setFeedback("");
                    }}
                  />
                  <span>{option.label}</span>
                </label>
              ))}
            </fieldset>
            {result && !result.correct ? (
              <div className="radar-answer-feedback incorrect" role="alert">
                <strong>Ainda não.</strong>
                <p>{feedback}</p>
              </div>
            ) : null}
            {error ? <p className="radar-submit-error" role="alert">{error}</p> : null}
            <button
              type="submit"
              className="primary-button dark"
              disabled={!selectedOptionId || isSubmitting}
            >
              {isSubmitting ? "Verificando..." : "Verificar resposta"}
            </button>
          </form>
        )}
      </section>

      <section className="radar-next-panel">
        <div>
          <span className="section-kicker">Continue praticando</span>
          <h2>O Radar explica; as outras áreas colocam você em ação</h2>
          <p>
            Investigue endereços no PhishLab ou retorne à jornada principal. Esta
            leitura complementa seu progresso, mas não altera a ordem das Missões.
          </p>
        </div>
        <div>
          <button type="button" className="primary-button" onClick={onOpenPhishLab}>
            Abrir PhishLab
          </button>
          <button type="button" className="text-button" onClick={onOpenMission}>
            Ver Missões <span aria-hidden="true">→</span>
          </button>
        </div>
      </section>
    </div>
  );
}
