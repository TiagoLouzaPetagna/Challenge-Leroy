"use client";

import { useState, type FormEvent } from "react";
import {
  MessagesSquare,
  MousePointerClick,
  Paperclip,
  Smartphone,
  UserRound,
  type LucideIcon,
} from "lucide-react";

import { ActivityShell } from "@/features/activities/ActivityShell";
import { ActivityAnswerReview } from "@/features/activities/primitives/ActivityAnswerReview";
import { ActivityProgress } from "@/features/activities/primitives/ActivityProgress";
import { EvidenceTray } from "@/features/activities/primitives/EvidenceTray";
import { useActivityStageFocus } from "@/features/activities/useActivityStageFocus";
import type { RadarArticleDefinition } from "@/lib/content/radar-catalog";
import { findAdditionalRadarLesson, type RadarLesson } from "@/lib/content/radar-lessons";
import { POINT_RULES } from "@/lib/domain/rules";
import type { RadarAnswer, RadarResult } from "@/lib/domain/types";

import styles from "./RadarArticle.module.css";

type Props = {
  article: RadarArticleDefinition;
  isCompleted: boolean;
  claimedPoints: number;
  onComplete: (answer: RadarAnswer) => Promise<RadarResult>;
  onBackToRadar: () => void;
  onOpenRelatedActivity: (href: string) => void;
};

const STEPS = ["Entenda", "Observe", "Não conclua cedo", "Aja", "Confira", "Resultado"] as const;
const RESULT_STAGE = STEPS.length - 1;

const CASE_ICON: Record<string, LucideIcon> = {
  "radar:unexpected-attachments": Paperclip,
  "radar:manager-impersonation": UserRound,
  "radar:mfa-fatigue": Smartphone,
  "radar:message-scams": MessagesSquare,
  "radar:after-click": MousePointerClick,
};

function StageNavigation({ backLabel, onBack, nextLabel, onNext }: {
  backLabel: string;
  onBack: () => void;
  nextLabel: string;
  onNext: () => void;
}) {
  return <nav className={styles.stageNavigation} aria-label="Navegação da leitura">
    <button type="button" className={styles.secondaryButton} onClick={onBack}>
      <span aria-hidden="true">←</span> {backLabel}
    </button>
    <button type="button" className={styles.primaryButton} onClick={onNext}>
      {nextLabel} <span aria-hidden="true">→</span>
    </button>
  </nav>;
}

function EvidencePractice({ lesson }: { lesson: RadarLesson }) {
  const [selected, setSelected] = useState<string[]>([]);
  const [checked, setChecked] = useState(false);
  const items = [
    ...lesson.evidence.confirmed.map((label, index) => ({ id: `fact-${index}`, label })),
    ...lesson.evidence.unconfirmed.map((label, index) => ({ id: `unknown-${index}`, label })),
  ].sort((left, right) => Number(left.id.split("-")[1]) - Number(right.id.split("-")[1]));
  const correct = items.filter((item) => selected.includes(item.id) === item.id.startsWith("fact-")).length;

  return <div>
    <EvidenceTray
      items={items}
      selectedIds={selected}
      title="Fatos que você pode registrar"
      onToggle={(id) => {
        setSelected((current) => current.includes(id) ? current.filter((value) => value !== id) : [...current, id]);
        setChecked(false);
      }}
    />
    <button type="button" className={styles.secondaryButton} onClick={() => setChecked(true)}>
      Conferir minha separação
    </button>
    {checked ? <div className={styles.practiceFeedback} role="status">
      <strong>{correct === items.length ? "Você separou os fatos das suposições." : `${correct} de ${items.length} informações no lugar certo.`}</strong>
      <p>{lesson.evidence.feedback}</p>
      {correct < items.length ? <p>Ajuste os cartões e confira novamente.</p> : null}
    </div> : null}
  </div>;
}

export function RadarAdditionalArticle({
  article,
  isCompleted,
  claimedPoints,
  onComplete,
  onBackToRadar,
  onOpenRelatedActivity,
}: Props) {
  const lesson = findAdditionalRadarLesson(article.id);
  if (!lesson) return null;
  return <RadarAdditionalArticleContent
    article={article}
    lesson={lesson}
    isCompleted={isCompleted}
    claimedPoints={claimedPoints}
    onComplete={onComplete}
    onBackToRadar={onBackToRadar}
    onOpenRelatedActivity={onOpenRelatedActivity}
  />;
}

function RadarAdditionalArticleContent({
  article,
  lesson,
  isCompleted,
  claimedPoints,
  onComplete,
  onBackToRadar,
  onOpenRelatedActivity,
}: Props & { lesson: RadarLesson }) {
  const [stage, setStage] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState("");
  const [result, setResult] = useState<RadarResult | null>(null);
  const [feedback, setFeedback] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const stageTitleRef = useActivityStageFocus(stage);
  const selectedOption = lesson.check.options.find((option) => option.id === selectedOptionId);
  const correctOption = lesson.check.options.find((option) => option.id === lesson.check.correctOptionId);
  const completedNow = isCompleted || Boolean(result?.correct);
  const CaseIcon = CASE_ICON[article.id] ?? Paperclip;

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
        moveTo(RESULT_STAGE);
      } else {
        setFeedback(selectedOption?.explanation ?? "Revise os sinais e tente novamente.");
        setSelectedOptionId("");
      }
    } catch {
      setError("Não foi possível registrar a verificação agora. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return <ActivityShell
    className={`activity-workspace page-stack radar-article-page ${styles.page}`}
    activityId={article.id}
  >
    <button type="button" className={styles.backToRadar} onClick={onBackToRadar}>
      <span aria-hidden="true">←</span> Voltar ao Radar
    </button>

    <header className={`${styles.hero} ${stage > 0 ? "activity-context-summary" : ""}`}>
      <div className={styles.heroCopy}>
        <span className={styles.eyebrow}>{article.categoryLabel}</span>
        <h1>{article.title}</h1>
        <p>{article.lead}</p>
      </div>
      <aside className={styles.metaCard} aria-label="Informações da leitura">
        <span>Leitura guiada</span>
        <strong>{article.estimatedMinutes} min</strong>
        <p>Competência · {article.competencyLabel}</p>
        <small>{POINT_RULES.radar} pontos na primeira conclusão correta</small>
      </aside>
    </header>

    <ActivityProgress
      className={styles.progress}
      steps={STEPS}
      currentStep={stage}
      ariaLabel={`Progresso da leitura: ${article.title}`}
      eyebrow="Leitura em etapas"
    />

    <section className={styles.stageCard} data-stage={STEPS[stage]}>
      {stage === 0 ? <div className={styles.stageContent}>
        <header className={styles.stageHeading}>
          <span className={styles.stageBadge}>Entenda</span>
          <h2 ref={stageTitleRef} tabIndex={-1}>{lesson.concept.title}</h2>
        </header>
        <div className={styles.understandGrid}>
          <div className={styles.prose}>{lesson.concept.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
          <aside className={styles.conceptCard}>
            <strong>{lesson.concept.cardTitle}</strong>
            <p>{lesson.concept.principle}</p>
          </aside>
        </div>
        <div className={styles.firstAction}>
          <button type="button" className={styles.primaryButton} onClick={() => moveTo(1)}>
            Observar um caso fictício <span aria-hidden="true">→</span>
          </button>
        </div>
      </div> : null}

      {stage === 1 ? <div className={styles.stageContent}>
        <header className={styles.stageHeading}>
          <span className={styles.stageBadge}>Observe</span>
          <h2 ref={stageTitleRef} tabIndex={-1}>{lesson.observe.title}</h2>
          <p>{lesson.observe.instruction}</p>
        </header>
        <div className={styles.observeLayout}>
          <article className={`${styles.poster} ${styles.caseCard}`} aria-label={lesson.observe.caseLabel}>
            <div className={styles.caseTopline}>
              <CaseIcon size={26} strokeWidth={1.8} aria-hidden="true" />
              <span className={styles.posterLocation}>{lesson.observe.caseLabel}</span>
            </div>
            <h3>{lesson.observe.caseTitle}</h3>
            <p>{lesson.observe.caseBody}</p>
            <dl className={styles.caseDetails}>
              {lesson.observe.details.map((detail) => <div key={detail.label}>
                <dt>{detail.label}</dt><dd>{detail.value}</dd>
              </div>)}
            </dl>
          </article>
          <div className={styles.cluePanel}>
            <span className={styles.panelLabel}>Explore os detalhes</span>
            <ol>{lesson.observe.clues.map((clue) => <li key={clue.title}>
              <details><summary>{clue.title}</summary><p>{clue.detail}</p></details>
            </li>)}</ol>
            <p className={styles.cautionNote}>{lesson.observe.caution}</p>
          </div>
        </div>
        <StageNavigation backLabel="Voltar ao conceito" onBack={() => moveTo(0)} nextLabel="Separar fatos de hipóteses" onNext={() => moveTo(2)} />
      </div> : null}

      {stage === 2 ? <div className={styles.stageContent}>
        <header className={styles.stageHeading}>
          <span className={styles.stageBadge}>Não conclua cedo</span>
          <h2 ref={stageTitleRef} tabIndex={-1}>{lesson.evidence.title}</h2>
          <p>{lesson.evidence.instruction} Arraste os cartões ou clique para adicionar.</p>
        </header>
        <EvidencePractice lesson={lesson} />
        <StageNavigation backLabel="Rever o caso" onBack={() => moveTo(1)} nextLabel="Ver a resposta segura" onNext={() => moveTo(3)} />
      </div> : null}

      {stage === 3 ? <div className={styles.stageContent}>
        <header className={styles.stageHeading}>
          <span className={styles.stageBadge}>Aja</span>
          <h2 ref={stageTitleRef} tabIndex={-1}>{lesson.act.title}</h2>
          <p>{lesson.act.intro}</p>
        </header>
        <ol className={styles.actionSteps}>{lesson.act.steps.map((step, index) => <li key={step.label}>
          <span>{String(index + 1).padStart(2, "0")}</span>
          <div><strong>{step.label}</strong><p>{step.detail}</p></div>
        </li>)}</ol>
        <StageNavigation backLabel="Rever as evidências" onBack={() => moveTo(2)} nextLabel="Conferir o entendimento" onNext={() => moveTo(4)} />
      </div> : null}

      {stage === 4 ? <div className={styles.stageContent}>
        <header className={styles.stageHeading}>
          <span className={styles.stageBadge}>Confira</span>
          <h2 ref={stageTitleRef} tabIndex={-1}>{lesson.check.title}</h2>
          <p>{lesson.check.context}</p>
        </header>
        {completedNow ? <div className={styles.alreadyComplete} role="status">
          <span aria-hidden="true">✓</span>
          <div><strong>Esta leitura já foi concluída.</strong><p>Você pode rever a resposta sem receber pontos novamente.</p></div>
          <button type="button" className={styles.primaryButton} onClick={() => moveTo(RESULT_STAGE)}>Ver resultado <span aria-hidden="true">→</span></button>
        </div> : <form className={styles.checkForm} onSubmit={handleSubmit}>
          <fieldset>
            <legend>{lesson.check.question}</legend>
            <div className={styles.answerList}>{lesson.check.options.map((option) => <label className={styles.answerOption} key={option.id}>
              <input type="radio" name="radar-answer" value={option.id} checked={selectedOptionId === option.id} onChange={() => { setSelectedOptionId(option.id); setResult(null); setFeedback(""); }} />
              <span>{option.label}</span>
            </label>)}</div>
          </fieldset>
          {result && !result.correct ? <div className={styles.incorrectFeedback} role="alert"><strong>Ainda não.</strong><p>{feedback}</p></div> : null}
          {error ? <p className={styles.submitError} role="alert">{error}</p> : null}
          <div className={styles.formActions}>
            <button type="button" className={styles.secondaryButton} onClick={() => moveTo(3)}><span aria-hidden="true">←</span> Rever a resposta segura</button>
            <button type="submit" className={styles.primaryButton} disabled={!selectedOptionId || isSubmitting}>{isSubmitting ? "Verificando..." : "Verificar resposta"}</button>
          </div>
        </form>}
      </div> : null}

      {stage === RESULT_STAGE ? <div className={styles.stageContent}>
        <header className={styles.stageHeading}>
          <span className={styles.stageBadge}>Resultado</span>
          <h2 ref={stageTitleRef} tabIndex={-1}>{lesson.resultTitle}</h2>
        </header>
        <div className={styles.resultSummary} role="status">
          <span aria-hidden="true">✓</span>
          <div>
            <strong>Conteúdo concluído</strong>
            <p>{result?.correct && !result.alreadyCompleted
              ? `${result.points} pontos foram registrados. A leitura também entrou no seu histórico.`
              : `${claimedPoints || POINT_RULES.radar} pontos já estavam confirmados. A releitura não duplicou a recompensa.`}</p>
          </div>
        </div>
        <ActivityAnswerReview
          className={styles.answerReview}
          title="Como você respondeu ao caso"
          description="Confira a decisão e o motivo pelo qual ela reduz o risco."
          items={[{
            id: "radar-check",
            title: lesson.check.question,
            status: "correct",
            userAnswer: selectedOption?.label ?? "Resposta correta registrada anteriormente",
            expectedAnswer: correctOption?.label,
            explanation: correctOption?.explanation ?? "Confirme os fatos antes de agir.",
          }]}
        />
        <section className={styles.nextPanel} aria-labelledby="radar-next-title">
          <div>
            <span className={styles.eyebrow}>Continue praticando</span>
            <h3 id="radar-next-title">{lesson.related.label}</h3>
            <p>{lesson.related.description}</p>
          </div>
          <div className={styles.nextActions}>
            <button type="button" className={styles.primaryButton} onClick={() => onOpenRelatedActivity(lesson.related.href)}>Abrir atividade</button>
            <button type="button" className={styles.secondaryButton} onClick={onBackToRadar}>Voltar ao Radar <span aria-hidden="true">→</span></button>
          </div>
        </section>
      </div> : null}
    </section>
  </ActivityShell>;
}
