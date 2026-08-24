"use client";

import { useMemo, useState, type FormEvent } from "react";

import { ActivityShell } from "@/features/activities/ActivityShell";
import { ActivityAnswerReview } from "@/features/activities/primitives/ActivityAnswerReview";
import { ActivityProgress } from "@/features/activities/primitives/ActivityProgress";
import { useActivityStageFocus } from "@/features/activities/useActivityStageFocus";
import { Mascot } from "@/features/ui/LearningUI";

import {
  RADAR_ARTICLES,
  RADAR_QUISHING_CONTENT,
  RADAR_QUESTION_OPTIONS,
  type RadarArticleDefinition,
} from "@/lib/content/radar-catalog";
import { POINT_RULES } from "@/lib/domain/rules";
import type { RadarAnswer, RadarResult } from "@/lib/domain/types";

import articleStyles from "./RadarArticle.module.css";
import styles from "./RadarHub.module.css";

type RadarHubProps = {
  completedArticleIds: string[];
  radarPoints: number;
  onOpenArticle: (slug: string) => void;
  onBackToOverview: () => void;
};

const FEATURED_RADAR_ARTICLE = RADAR_ARTICLES[0];
const RADAR_LIBRARY_ARTICLES = RADAR_ARTICLES.filter(
  (article) => article.id !== FEATURED_RADAR_ARTICLE.id,
);

const RADAR_CATEGORIES = [
  { value: "all", label: "Todos" },
  { value: "links-e-qr", label: "Links e QR Codes" },
  { value: "mensagens", label: "Mensagens e anexos" },
  { value: "identidade", label: "Identidade e confiança" },
  { value: "acesso", label: "Contas e acesso" },
  { value: "resposta", label: "Resposta segura" },
] as const;

type RadarCoverKind =
  | "quishing"
  | "attachment"
  | "impersonation"
  | "mfa"
  | "messages"
  | "recovery";

const RADAR_COVER_BY_ID: Record<string, RadarCoverKind> = {
  "radar:quishing": "quishing",
  "radar:unexpected-attachments": "attachment",
  "radar:manager-impersonation": "impersonation",
  "radar:mfa-fatigue": "mfa",
  "radar:message-scams": "messages",
  "radar:after-click": "recovery",
};

function RadarCoverArtwork({ kind }: { kind: RadarCoverKind }) {
  if (kind === "quishing") {
    return (
      <svg className={styles.coverArtwork} viewBox="0 0 460 290" aria-hidden="true">
        <circle className={styles.signalRing} cx="347" cy="88" r="62" />
        <path className={styles.signalPath} d="M83 223C142 168 189 205 247 145C279 112 296 88 347 88" />
        <g className={styles.qrCard}>
          <rect x="56" y="48" width="150" height="150" rx="24" />
          <path d="M82 75h34v34H82zM145 75h34v34h-34zM82 138h34v34H82zM139 132h17v17h-17zM162 151h17v21h-17zM133 158h17v14h-17z" />
        </g>
        <g className={styles.phone}>
          <rect x="277" y="55" width="116" height="190" rx="27" />
          <rect x="292" y="78" width="86" height="133" rx="13" />
          <path d="M307 103h18v18h-18zM345 103h18v18h-18zM307 141h18v18h-18zM340 136h11v11h-11zM354 151h11v11h-11zM335 167h11v11h-11z" />
          <path d="M331 226h8" />
        </g>
        <circle className={styles.signalDot} cx="347" cy="88" r="9" />
      </svg>
    );
  }

  if (kind === "attachment") {
    return (
      <svg className={styles.coverArtwork} viewBox="0 0 360 230" aria-hidden="true">
        <path className={styles.backShape} d="M48 79l132-45 121 61-28 99-164 9z" />
        <g className={styles.paper}>
          <path d="M119 38h105l43 43v116H119z" />
          <path d="M224 38v43h43M145 116h82M145 139h69M145 162h48" />
        </g>
        <path className={styles.paperclip} d="M94 100v67c0 30 43 30 43 0V84c0-20-29-20-29 0v76c0 10 14 10 14 0v-57" />
        <circle className={styles.alertDot} cx="276" cy="61" r="25" />
        <path className={styles.alertMark} d="M276 48v17M276 75v1" />
      </svg>
    );
  }

  if (kind === "impersonation") {
    return (
      <svg className={styles.coverArtwork} viewBox="0 0 360 230" aria-hidden="true">
        <circle className={styles.profileHalo} cx="119" cy="112" r="76" />
        <circle className={styles.profileHead} cx="119" cy="91" r="30" />
        <path className={styles.profileBody} d="M61 174c8-39 29-58 58-58s50 19 58 58" />
        <g className={styles.chatPrimary}>
          <path d="M187 50h130v68H215l-25 21 6-21h-9z" />
          <path d="M214 76h72M214 94h46" />
        </g>
        <g className={styles.chatSecondary}>
          <path d="M184 143h105v52h-72l-22 17 5-17h-16z" />
          <path d="M207 165h57M207 180h38" />
        </g>
        <path className={styles.identityQuestion} d="M299 138c0-15 24-14 24 0 0 11-12 10-12 20M311 173v2" />
      </svg>
    );
  }

  if (kind === "mfa") {
    return (
      <svg className={styles.coverArtwork} viewBox="0 0 360 230" aria-hidden="true">
        <circle className={styles.backShape} cx="178" cy="113" r="91" />
        <g className={styles.phone}>
          <rect x="111" y="24" width="112" height="188" rx="27" />
          <rect x="125" y="48" width="84" height="128" rx="11" />
          <path d="M160 193h14" />
        </g>
        <g className={styles.promptStack}>
          <rect x="139" y="67" width="133" height="43" rx="14" />
          <path d="M154 82h74M154 95h49" />
          <rect x="155" y="119" width="145" height="43" rx="14" />
          <path d="M171 134h84M171 147h55" />
          <rect x="182" y="171" width="120" height="35" rx="12" />
          <path d="M197 184h68M197 195h40" />
        </g>
        <path className={styles.denyMark} d="M79 64l34 34M113 64L79 98" />
      </svg>
    );
  }

  if (kind === "messages") {
    return (
      <svg className={styles.coverArtwork} viewBox="0 0 360 230" aria-hidden="true">
        <path className={styles.backShape} d="M40 58c60-47 162-46 240 5 61 40 43 121-18 143H67C20 176 5 99 40 58z" />
        <g className={styles.messageLeft}>
          <path d="M55 55h164v70H96l-29 24 7-24H55z" />
          <circle cx="88" cy="89" r="13" />
          <path d="M112 80h76M112 99h51" />
        </g>
        <g className={styles.messageRight}>
          <path d="M137 140h166v61H165l-20 16 5-16h-13z" />
          <path d="M165 164h102M165 182h70" />
        </g>
        <path className={styles.switchArrow} d="M260 43h48l-13-13M308 43l-13 13" />
      </svg>
    );
  }

  return (
    <svg className={styles.coverArtwork} viewBox="0 0 360 230" aria-hidden="true">
      <circle className={styles.backShape} cx="178" cy="112" r="92" />
      <path className={styles.brokenLink} d="M75 91l31-31c20-20 52-20 72 0l8 8M275 139l-30 30c-20 20-52 20-72 0l-8-8M126 144l92-92M120 113l-17 17M238 92l18-18" />
      <g className={styles.shield}>
        <path d="M203 91l58-23 58 23v42c0 45-26 71-58 84-32-13-58-39-58-84z" />
        <path d="M235 139l18 18 36-42" />
      </g>
      <path className={styles.cursor} d="M49 150l31 66 13-27 28-12z" />
    </svg>
  );
}

function RadarContentCover({
  article,
  featured = false,
}: {
  article: RadarArticleDefinition;
  featured?: boolean;
}) {
  const kind = RADAR_COVER_BY_ID[article.id] ?? "quishing";

  return (
    <div
      className={`${styles.cover} ${featured ? styles.coverFeatured : ""}`.trim()}
      data-cover={kind}
    >
      <span className={styles.coverLabel}>{article.categoryLabel}</span>
      <RadarCoverArtwork kind={kind} />
    </div>
  );
}

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
  const featured = FEATURED_RADAR_ARTICLE;
  const filteredArticles = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase("pt-BR");
    return RADAR_LIBRARY_ARTICLES.filter((article) => {
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
      <div className={styles.page}>
        <header className={styles.hero} aria-labelledby="radar-page-title">
          <div className={styles.heroCopy}>
            <span className={styles.eyebrow}>Radar educativo</span>
            <h1 id="radar-page-title">Explore sinais antes que eles virem problema.</h1>
            <p>
              Conteúdos curtos para reconhecer golpes, investigar padrões e tomar
              decisões mais seguras.
            </p>
            <small id="radar-scope-note" className={styles.scopeNote}>
              Conteúdo educativo — não é um feed de incidentes ativos da Leroy Merlin.
            </small>
            <button
              type="button"
              className={`text-button ${styles.backButton}`}
              onClick={onBackToOverview}
            >
              <span aria-hidden="true">←</span> Voltar à visão geral
            </button>
          </div>

          <figure className={styles.heroVisual}>
            <span className={styles.heroOrbit} aria-hidden="true" />
            <span className={styles.heroSignalOne} aria-hidden="true" />
            <span className={styles.heroSignalTwo} aria-hidden="true" />
            <Mascot
              pose="radar"
              size="large"
              className={styles.mascot}
              alt="Leroyzin examinando sinais no Radar"
            />
            <figcaption>Observe · investigue · confirme</figcaption>
          </figure>

          <aside className={styles.progress} aria-label="Seu histórico no Radar">
            <div>
              <strong>{completedArticleIds.length}</strong>
              <span>conteúdo concluído</span>
            </div>
            <span className={styles.progressDivider} aria-hidden="true" />
            <div>
              <strong>{radarPoints}</strong>
              <span>pontos confirmados</span>
            </div>
            <small>Recompensas únicas</small>
          </aside>
        </header>

        <section className={styles.featured} aria-labelledby="radar-featured-title">
          <RadarContentCover article={featured} featured />
          <div className={styles.featuredCopy}>
            <div className={styles.cardTopline}>
              <span>Leitura em destaque</span>
              <span
                className={`${styles.status} ${
                  completed.has(featured.id) ? styles.statusCompleted : styles.statusAvailable
                }`}
              >
                {completed.has(featured.id) ? "Concluído" : "Disponível"}
              </span>
            </div>
            <h2 id="radar-featured-title">{featured.title}</h2>
            <p>{featured.summary}</p>
            <div
              className={styles.metadata}
              role="list"
              aria-label={`Dados da leitura ${featured.title}`}
            >
              <span role="listitem">{featured.estimatedMinutes} min</span>
              <span role="listitem">{featured.competencyLabel}</span>
              <span role="listitem">+{POINT_RULES.radar} pontos</span>
            </div>
            <button
              type="button"
              className={`primary-button dark ${styles.featuredAction}`}
              onClick={() => onOpenArticle(featured.slug)}
            >
              {completed.has(featured.id) ? "Reler conteúdo" : "Explorar conteúdo"}
              <span aria-hidden="true">→</span>
            </button>
          </div>
        </section>

        <section className={styles.library} aria-labelledby="radar-library-title">
          <div className={styles.sectionHeading}>
            <div>
              <span className={styles.eyebrow}>Biblioteca</span>
              <h2 id="radar-library-title">Explore por situação ou habilidade</h2>
            </div>
            <p>Escolha um assunto e veja o que merece sua atenção.</p>
          </div>

          <div className={styles.filters} aria-describedby="radar-scope-note">
            <label className={styles.searchField}>
              <span className="sr-only">Buscar conteúdo</span>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <circle cx="11" cy="11" r="6" />
                <path d="m16 16 4 4" />
              </svg>
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Buscar na biblioteca"
                aria-controls="radar-library-results"
              />
            </label>

            <fieldset className={styles.categoryFilters}>
              <legend>Tema</legend>
              <div>
                {RADAR_CATEGORIES.map((item) => (
                  <button
                    type="button"
                    key={item.value}
                    aria-pressed={category === item.value}
                    aria-controls="radar-library-results"
                    onClick={() => setCategory(item.value)}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </fieldset>

            <div className={styles.selectFilters}>
              <label>
                <span>Duração</span>
                <select
                  value={duration}
                  onChange={(event) => setDuration(event.target.value)}
                  aria-controls="radar-library-results"
                >
                  <option value="all">Qualquer duração</option>
                  <option value="short">Até 4 minutos</option>
                  <option value="long">5 minutos ou mais</option>
                </select>
              </label>
              <label>
                <span>Competência</span>
                <select
                  value={competency}
                  onChange={(event) => setCompetency(event.target.value)}
                  aria-controls="radar-library-results"
                >
                  <option value="all">Todas</option>
                  <option value="observar">Observar</option>
                  <option value="investigar">Investigar</option>
                  <option value="verificar">Verificar</option>
                  <option value="decidir">Decidir</option>
                  <option value="recuperar">Recuperar</option>
                </select>
              </label>
            </div>
          </div>

          <div className={styles.resultBar}>
            <span aria-live="polite">
              {filteredArticles.length} resultado{filteredArticles.length === 1 ? "" : "s"}
            </span>
            {query || category !== "all" || duration !== "all" || competency !== "all" ? (
              <button type="button" onClick={clearFilters}>
                Limpar filtros
              </button>
            ) : (
              <span>Catálogo em expansão</span>
            )}
          </div>

          <div id="radar-library-results">
            {filteredArticles.length ? (
              <div className={styles.cardGrid}>
                {filteredArticles.map((article) => {
                  const isCompleted = completed.has(article.id);
                  return (
                    <article
                      className={`${styles.catalogCard} ${
                        article.status === "planned" ? styles.catalogCardPlanned : ""
                      }`.trim()}
                      key={article.id}
                    >
                      <RadarContentCover article={article} />
                      <div className={styles.cardBody}>
                        <div className={styles.cardTopline}>
                          <span>{article.categoryLabel}</span>
                          <span
                            className={`${styles.status} ${
                              isCompleted
                                ? styles.statusCompleted
                                : article.status === "available"
                                  ? styles.statusAvailable
                                  : styles.statusPlanned
                            }`}
                          >
                            {isCompleted
                              ? "Concluído"
                              : article.status === "available"
                                ? "Disponível"
                                : "Em preparação"}
                          </span>
                        </div>
                        <h3>{article.title}</h3>
                        <p>{article.summary}</p>
                        <div
                          className={styles.metadata}
                          role="list"
                          aria-label={`Dados da leitura ${article.title}`}
                        >
                          <span role="listitem">{article.estimatedMinutes} min</span>
                          <span role="listitem">{article.competencyLabel}</span>
                          <span role="listitem">+{POINT_RULES.radar} pontos</span>
                        </div>
                        {article.status === "available" ? (
                          <button
                            type="button"
                            className={`text-button ${styles.cardAction}`}
                            onClick={() => onOpenArticle(article.slug)}
                          >
                            {isCompleted ? "Reler" : "Ler e verificar"}{" "}
                            <span aria-hidden="true">→</span>
                          </button>
                        ) : (
                          <span className={styles.plannedNote}>
                            Em produção · leitura ainda não disponível
                          </span>
                        )}
                      </div>
                    </article>
                  );
                })}
              </div>
            ) : (
              <div className={styles.emptyState}>
                <span aria-hidden="true">◎</span>
                <div>
                  <strong>Nenhum conteúdo corresponde aos filtros.</strong>
                  <p>Remova um filtro para ampliar a biblioteca.</p>
                </div>
                <button type="button" className="text-button" onClick={clearFilters}>
                  Limpar filtros
                </button>
              </div>
            )}
          </div>
        </section>

        <section className={styles.history} aria-labelledby="radar-history-title">
          <div className={styles.historyHeading}>
            <span className={styles.eyebrow}>Seu percurso</span>
            <h2 id="radar-history-title">Leituras concluídas</h2>
            <p>Releia quando precisar. A recompensa é registrada apenas uma vez.</p>
          </div>
          <div className={styles.historyList}>
            {completedArticleIds.length ? (
              RADAR_ARTICLES.filter((article) => completed.has(article.id)).map(
                (article) => (
                  <button
                    type="button"
                    key={article.id}
                    onClick={() => onOpenArticle(article.slug)}
                  >
                    <span className={styles.historyCheck} aria-hidden="true">✓</span>
                    <span>
                      <strong>{article.title}</strong>
                      <small>Disponível para releitura</small>
                    </span>
                    <span aria-hidden="true">→</span>
                  </button>
                ),
              )
            ) : (
              <p className={styles.historyEmpty}>
                <span aria-hidden="true">○</span>
                Conclua o destaque para iniciar seu histórico.
              </p>
            )}
          </div>
        </section>
      </div>
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

const RADAR_ARTICLE_STEPS = [
  "Entenda",
  "Observe",
  "Não conclua cedo",
  "Aja",
  "Confira",
  "Resultado",
] as const;

const RADAR_RESULT_STAGE = RADAR_ARTICLE_STEPS.length - 1;

function RadarStageNavigation({
  backLabel,
  onBack,
  nextLabel,
  onNext,
  disabled = false,
}: {
  backLabel: string;
  onBack: () => void;
  nextLabel: string;
  onNext: () => void;
  disabled?: boolean;
}) {
  return (
    <nav className={articleStyles.stageNavigation} aria-label="Navegação da leitura">
      <button type="button" className={articleStyles.secondaryButton} onClick={onBack}>
        <span aria-hidden="true">←</span> {backLabel}
      </button>
      <button
        type="button"
        className={articleStyles.primaryButton}
        disabled={disabled}
        onClick={onNext}
      >
        {nextLabel} <span aria-hidden="true">→</span>
      </button>
    </nav>
  );
}

export function RadarArticle({
  article,
  isCompleted,
  claimedPoints,
  onComplete,
  onBackToRadar,
  onOpenPhishLab,
  onOpenMission,
}: RadarArticleProps) {
  const [stage, setStage] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState("");
  const [result, setResult] = useState<RadarResult | null>(null);
  const [feedback, setFeedback] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const stageTitleRef = useActivityStageFocus(stage);
  const selectedOption = RADAR_QUESTION_OPTIONS.find(
    (option) => option.id === selectedOptionId,
  );
  const correctOption = RADAR_QUESTION_OPTIONS.find(
    (option) => option.id === "inspect-and-confirm",
  );
  const completedNow = isCompleted || Boolean(result?.correct);

  const moveTo = (nextStage: number) => {
    setError("");
    setStage(nextStage);
  };

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
      if (nextResult.correct) {
        moveTo(RADAR_RESULT_STAGE);
      } else {
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
    <ActivityShell
      className={`page-stack radar-article-page ${articleStyles.page}`}
      activityId={article.id}
    >
      <button type="button" className={articleStyles.backToRadar} onClick={onBackToRadar}>
        <span aria-hidden="true">←</span> Voltar ao Radar
      </button>

      <header className={articleStyles.hero}>
        <div className={articleStyles.heroCopy}>
          <span className={articleStyles.eyebrow}>{article.categoryLabel}</span>
          <h1>{article.title}</h1>
          <p>{article.lead}</p>
        </div>
        <aside className={articleStyles.metaCard} aria-label="Informações da leitura">
          <span>Leitura guiada</span>
          <strong>{article.estimatedMinutes} min</strong>
          <p>Competência · {article.competencyLabel}</p>
          <small>{POINT_RULES.radar} pontos na primeira conclusão correta</small>
        </aside>
      </header>

      <ActivityProgress
        className={articleStyles.progress}
        steps={RADAR_ARTICLE_STEPS}
        currentStep={stage}
        ariaLabel="Progresso da leitura sobre Quishing"
        eyebrow="Leitura em etapas"
      />

      <section className={articleStyles.stageCard} data-stage={RADAR_ARTICLE_STEPS[stage]}>
        {stage === 0 ? (
          <div className={articleStyles.stageContent}>
            <header className={articleStyles.stageHeading}>
              <span className={articleStyles.stageBadge}>Entenda</span>
              <h2 ref={stageTitleRef} tabIndex={-1}>
                {RADAR_QUISHING_CONTENT.understand.title}
              </h2>
            </header>

            <div className={articleStyles.understandGrid}>
              <div className={articleStyles.prose}>
                {RADAR_QUISHING_CONTENT.understand.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
              <aside className={articleStyles.conceptCard}>
                <span aria-hidden="true">QR</span>
                <strong>Imagem não é identidade</strong>
                <p>{RADAR_QUISHING_CONTENT.understand.principle}</p>
              </aside>
            </div>

            <div className={articleStyles.firstAction}>
              <button type="button" className={articleStyles.primaryButton} onClick={() => moveTo(1)}>
                Observar um caso fictício <span aria-hidden="true">→</span>
              </button>
            </div>
          </div>
        ) : null}

        {stage === 1 ? (
          <div className={articleStyles.stageContent}>
            <header className={articleStyles.stageHeading}>
              <span className={articleStyles.stageBadge}>Observe</span>
              <h2 ref={stageTitleRef} tabIndex={-1}>
                {RADAR_QUISHING_CONTENT.observe.title}
              </h2>
              <p>{RADAR_QUISHING_CONTENT.observe.intro}</p>
            </header>

            <div className={articleStyles.observeLayout}>
              <article className={articleStyles.poster} aria-label="Cartaz fictício com QR Code não escaneável">
                <span className={articleStyles.posterLocation}>
                  {RADAR_QUISHING_CONTENT.observe.poster.location}
                </span>
                <h3>{RADAR_QUISHING_CONTENT.observe.poster.headline}</h3>
                <p>{RADAR_QUISHING_CONTENT.observe.poster.body}</p>
                <div className={articleStyles.fakeQrRow}>
                  <div className={articleStyles.fakeQr} aria-hidden="true">
                    <span>QR</span>
                  </div>
                  <div className={articleStyles.previewCard}>
                    <small>{RADAR_QUISHING_CONTENT.observe.poster.previewLabel}</small>
                    <code>{RADAR_QUISHING_CONTENT.observe.poster.previewAddress}</code>
                    <span>Representação inerte · não abre</span>
                  </div>
                </div>
                <div className={articleStyles.knownRoute}>
                  <small>{RADAR_QUISHING_CONTENT.observe.poster.knownRouteLabel}</small>
                  <code>{RADAR_QUISHING_CONTENT.observe.poster.knownRouteAddress}</code>
                </div>
              </article>

              <div className={articleStyles.cluePanel}>
                <span className={articleStyles.panelLabel}>Três sinais para investigar</span>
                <ol>
                  {RADAR_QUISHING_CONTENT.observe.clues.map((clue, index) => (
                    <li key={clue}>
                      <span>{index + 1}</span>
                      <p>{clue}</p>
                    </li>
                  ))}
                </ol>
                <p className={articleStyles.cautionNote}>
                  Esses sinais justificam uma pausa. Sozinhos, ainda não provam autoria nem intenção.
                </p>
              </div>
            </div>

            <RadarStageNavigation
              backLabel="Voltar ao conceito"
              onBack={() => moveTo(0)}
              nextLabel="Separar fatos de hipóteses"
              onNext={() => moveTo(2)}
            />
          </div>
        ) : null}

        {stage === 2 ? (
          <div className={articleStyles.stageContent}>
            <header className={articleStyles.stageHeading}>
              <span className={articleStyles.stageBadge}>Não conclua cedo</span>
              <h2 ref={stageTitleRef} tabIndex={-1}>
                {RADAR_QUISHING_CONTENT.evidence.title}
              </h2>
              <p>{RADAR_QUISHING_CONTENT.evidence.intro}</p>
            </header>

            <div className={articleStyles.evidenceGrid}>
              <article className={articleStyles.confirmedCard}>
                <span>Comprovado neste caso</span>
                <ul>
                  {RADAR_QUISHING_CONTENT.evidence.confirmed.map((item) => (
                    <li key={item}><span aria-hidden="true">✓</span>{item}</li>
                  ))}
                </ul>
              </article>
              <article className={articleStyles.unconfirmedCard}>
                <span>Não comprovado</span>
                <ul>
                  {RADAR_QUISHING_CONTENT.evidence.unconfirmed.map((item) => (
                    <li key={item}><span aria-hidden="true">?</span>{item}</li>
                  ))}
                </ul>
              </article>
            </div>

            <aside className={articleStyles.keyMessage}>
              <span>Ideia principal</span>
              <strong>{RADAR_QUISHING_CONTENT.keyMessage}</strong>
            </aside>

            <RadarStageNavigation
              backLabel="Rever o cartaz"
              onBack={() => moveTo(1)}
              nextLabel="Ver a resposta segura"
              onNext={() => moveTo(3)}
            />
          </div>
        ) : null}

        {stage === 3 ? (
          <div className={articleStyles.stageContent}>
            <header className={articleStyles.stageHeading}>
              <span className={articleStyles.stageBadge}>Aja</span>
              <h2 ref={stageTitleRef} tabIndex={-1}>
                {RADAR_QUISHING_CONTENT.act.title}
              </h2>
              <p>{RADAR_QUISHING_CONTENT.act.intro}</p>
            </header>

            <ol className={articleStyles.actionSteps}>
              {RADAR_QUISHING_CONTENT.act.steps.map((step, index) => (
                <li key={step.label}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <div>
                    <strong>{step.label}</strong>
                    <p>{step.detail}</p>
                  </div>
                </li>
              ))}
            </ol>

            <p className={articleStyles.prototypeNote}>
              <strong>Limite desta demonstração.</strong>{" "}
              {RADAR_QUISHING_CONTENT.act.prototypeNote}
            </p>

            <RadarStageNavigation
              backLabel="Rever as evidências"
              onBack={() => moveTo(2)}
              nextLabel="Conferir o entendimento"
              onNext={() => moveTo(4)}
            />
          </div>
        ) : null}

        {stage === 4 ? (
          <div className={articleStyles.stageContent}>
            <header className={articleStyles.stageHeading}>
              <span className={articleStyles.stageBadge}>Confira</span>
              <h2 ref={stageTitleRef} tabIndex={-1}>
                {RADAR_QUISHING_CONTENT.check.title}
              </h2>
              <p>{RADAR_QUISHING_CONTENT.check.context}</p>
            </header>

            {completedNow ? (
              <div className={articleStyles.alreadyComplete} role="status">
                <span aria-hidden="true">✓</span>
                <div>
                  <strong>Esta leitura já foi concluída.</strong>
                  <p>Você pode rever a resposta registrada sem receber os pontos novamente.</p>
                </div>
                <button type="button" className={articleStyles.primaryButton} onClick={() => moveTo(RADAR_RESULT_STAGE)}>
                  Ver resultado <span aria-hidden="true">→</span>
                </button>
              </div>
            ) : (
              <form className={articleStyles.checkForm} onSubmit={handleSubmit}>
                <fieldset>
                  <legend>{RADAR_QUISHING_CONTENT.check.question}</legend>
                  <div className={articleStyles.answerList}>
                    {RADAR_QUESTION_OPTIONS.map((option) => (
                      <label className={articleStyles.answerOption} key={option.id}>
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
                  </div>
                </fieldset>

                {result && !result.correct ? (
                  <div className={articleStyles.incorrectFeedback} role="alert">
                    <strong>Ainda não.</strong>
                    <p>{feedback}</p>
                  </div>
                ) : null}
                {error ? <p className={articleStyles.submitError} role="alert">{error}</p> : null}

                <div className={articleStyles.formActions}>
                  <button type="button" className={articleStyles.secondaryButton} onClick={() => moveTo(3)}>
                    <span aria-hidden="true">←</span> Rever a resposta segura
                  </button>
                  <button
                    type="submit"
                    className={articleStyles.primaryButton}
                    disabled={!selectedOptionId || isSubmitting}
                  >
                    {isSubmitting ? "Verificando..." : "Verificar resposta"}
                  </button>
                </div>
              </form>
            )}
          </div>
        ) : null}

        {stage === RADAR_RESULT_STAGE ? (
          <div className={articleStyles.stageContent}>
            <header className={articleStyles.stageHeading}>
              <span className={articleStyles.stageBadge}>Resultado</span>
              <h2 ref={stageTitleRef} tabIndex={-1}>
                Você confirmou o destino sem depender do QR Code
              </h2>
            </header>

            <div className={articleStyles.resultSummary} role="status">
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
              className={articleStyles.answerReview}
              title="Como você respondeu ao caso"
              description="Confira a decisão e o motivo pelo qual ela reduz a dependência do aviso suspeito."
              items={[
                {
                  id: "radar-check",
                  title: RADAR_QUISHING_CONTENT.check.question,
                  status: "correct",
                  userAnswer:
                    selectedOption?.label ?? "Resposta correta registrada anteriormente",
                  expectedAnswer: correctOption?.label,
                  explanation:
                    correctOption?.explanation ??
                    "Verifique o destino e o contexto por uma rota já conhecida.",
                },
              ]}
            />

            <section className={articleStyles.nextPanel} aria-labelledby="radar-next-title">
              <div>
                <span className={articleStyles.eyebrow}>Continue praticando</span>
                <h3 id="radar-next-title">O Radar explica; as outras áreas colocam você em ação</h3>
                <p>
                  Investigue endereços no PhishLab ou retorne à jornada principal.
                  Esta leitura é opcional e não altera a ordem das Missões.
                </p>
              </div>
              <div className={articleStyles.nextActions}>
                <button type="button" className={articleStyles.primaryButton} onClick={onOpenPhishLab}>
                  Abrir PhishLab
                </button>
                <button type="button" className={articleStyles.secondaryButton} onClick={onOpenMission}>
                  Ver Missões <span aria-hidden="true">→</span>
                </button>
              </div>
            </section>
          </div>
        ) : null}
      </section>
    </ActivityShell>
  );
}
