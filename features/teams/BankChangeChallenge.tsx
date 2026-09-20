"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type Dispatch,
  type RefObject,
  type SetStateAction,
} from "react";

import { useDragReorder } from "@/features/activities/useDragReorder";
import { usePostSubmitCelebration } from "@/features/activities/usePostSubmitCelebration";
import { EvidenceTray } from "@/features/activities/primitives/EvidenceTray";
import { ChevronDown } from "lucide-react";

import {
  Icon,
  LessonShell,
  Note,
  lessonStyles as s,
} from "@/features/activities/lesson/LessonShell";
import { ActivityAnswerReview } from "@/features/activities/primitives/ActivityAnswerReview";
import { Mascot } from "@/features/ui/LearningUI";
import {
  BANK_CHANGE_PROCESS_ACTIVITY_ID,
  BANK_CHANGE_PROCESS_ACTIVITY_VERSION,
  BANK_CHANGE_PROCESS_CANONICAL_PACKAGE_ID,
  BANK_CHANGE_PROCESS_MECHANIC_ID,
  BANK_CHANGE_PROCESS_V2_PACKAGE,
  type BankComparisonId,
  type BankContactSourceId,
  type BankProcessCardId,
  type BankReportBlockId,
} from "@/lib/content/activities/bank-change/v2";
import type { AchievementDefinition } from "@/lib/content/achievement-catalog";
import type {
  BankProcessV2Answer,
  BankProcessV2Attempt,
  BankProcessV2Result,
} from "@/lib/domain/types";

type BankChangeChallengeProps = {
  existingAttempt: BankProcessV2Attempt | null;
  existingResult: BankProcessV2Result | null;
  hasLegacyCompletion: boolean;
  rewardAlreadyClaimed: boolean;
  aggregateAlreadyCounted: boolean;
  claimedPoints: number;
  reducedMotion: boolean;
  onComplete: (answer: BankProcessV2Answer) => Promise<BankProcessV2Result>;
  onBackToTeams: () => void;
  onOpenProfile: () => void;
  getUnlockedAchievementIds: () => Set<string>;
  getNewlyUnlockedAchievements: (beforeIds: Set<string>) => AchievementDefinition[];
};

type View = "compare" | "contact" | "response" | "process" | "report" | "result";

const STEPS: readonly { id: View; label: string }[] = [
  { id: "compare", label: "Comparar" },
  { id: "contact", label: "Confirmar" },
  { id: "response", label: "Resposta" },
  { id: "process", label: "Processo" },
  { id: "report", label: "Reporte" },
] as const;
const STEP_LABELS = STEPS.map((step) => step.label);
const LAST_STEP = STEPS.length - 1;

const contentPackage = BANK_CHANGE_PROCESS_V2_PACKAGE;
const { content } = contentPackage;

function toggleId<T extends string>(items: T[], id: T): T[] {
  return items.includes(id) ? items.filter((item) => item !== id) : [...items, id];
}

function move<T>(items: T[], index: number, direction: -1 | 1): T[] {
  const target = index + direction;
  if (target < 0 || target >= items.length) return items;
  const next = [...items];
  [next[index], next[target]] = [next[target], next[index]];
  return next;
}

function contactLabel(id: BankContactSourceId | "") {
  return content.contactOptions.find((option) => option.id === id)?.label ?? "Não escolhido";
}

export function BankChangeChallenge(props: BankChangeChallengeProps) {
  const {
    existingAttempt, existingResult, hasLegacyCompletion, rewardAlreadyClaimed,
    aggregateAlreadyCounted, claimedPoints, reducedMotion, onComplete,
    onBackToTeams, onOpenProfile, getUnlockedAchievementIds,
    getNewlyUnlockedAchievements,
  } = props;
  const celebration = usePostSubmitCelebration("Mudança bancária sem atalho", "var(--learn-yellow)");
  const [view, setView] = useState<View>(existingResult ? "result" : "compare");
  const [comparisonIds, setComparisonIds] = useState<BankComparisonId[]>(existingAttempt?.selectedComparisonIds ?? []);
  const [contactSourceId, setContactSourceId] = useState<BankContactSourceId | "">(existingAttempt?.contactSourceId ?? "");
  const initialProcessIds = useMemo(() => existingAttempt
    ? existingAttempt.processPlacements.filter((item) => item.groupId === "process").sort((a, b) => a.position - b.position).map((item) => item.cardId)
    : [], [existingAttempt]);
  const [processIds, setProcessIds] = useState<BankProcessCardId[]>(initialProcessIds);
  const [reportBlockIds, setReportBlockIds] = useState<BankReportBlockId[]>(existingAttempt?.selectedReportBlockIds ?? []);
  const [result, setResult] = useState<BankProcessV2Result | null>(existingResult);
  const [countedOnThisAttempt, setCountedOnThisAttempt] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const headingRef = useRef<HTMLHeadingElement>(null);
  const selectedContact = content.contactOptions.find((option) => option.id === contactSourceId);
  const outsideProcessIds = content.processCards.map((card) => card.id).filter((id) => !processIds.includes(id));
  useEffect(() => { headingRef.current?.focus(); }, [view]);

  const go = (next: View) => {
    setView(next);
    window.scrollTo({ top: 0, behavior: reducedMotion ? "auto" : "smooth" });
  };

  const submit = async () => {
    if (!contactSourceId || isSubmitting) return;
    setIsSubmitting(true);
    setError("");
    const beforeIds = getUnlockedAchievementIds();
    try {
      const nextResult = await onComplete({
        activityId: BANK_CHANGE_PROCESS_ACTIVITY_ID,
        activityVersion: BANK_CHANGE_PROCESS_ACTIVITY_VERSION,
        casePackageId: BANK_CHANGE_PROCESS_CANONICAL_PACKAGE_ID,
        mechanicId: BANK_CHANGE_PROCESS_MECHANIC_ID,
        selectedComparisonIds: comparisonIds,
        contactSourceId,
        contactResponseViewed: true,
        processPlacements: [
          ...processIds.map((cardId, position) => ({ cardId, groupId: "process" as const, position })),
          ...outsideProcessIds.map((cardId, position) => ({ cardId, groupId: "outside-process" as const, position })),
        ],
        selectedReportBlockIds: reportBlockIds,
      });
      setResult(nextResult);
      setCountedOnThisAttempt(!aggregateAlreadyCounted);
      go("result");
      celebration.begin(getNewlyUnlockedAchievements(beforeIds));
    } catch {
      setError("Não foi possível registrar a estação agora. Revise as etapas e tente novamente.");
    } finally { setIsSubmitting(false); }
  };

  const restart = () => {
    setComparisonIds([]); setContactSourceId(""); setProcessIds([]); setReportBlockIds([]);
    setResult(null); setCountedOnThisAttempt(false); setError(""); celebration.reset(); go("compare");
  };

  if (celebration.screen) return celebration.screen;

  if (view === "result" && result) {
    const checks = [
      { label: "O que mudou no pedido", score: result.comparisonPoints, max: 20 },
      { label: "De onde veio a confirmação", score: result.contactPoints, max: 25 },
      { label: "Quais ações entram no processo", score: result.processClassificationPoints, max: 20 },
      { label: "A ordem das ações", score: result.processRelationPoints, max: 20 },
      { label: "O que foi para o reporte", score: result.reportPoints, max: 15 },
    ];
    return (
      <div className={s.page}>
        <div className={s.result}>
          <div className={s.resultHero}>
            <Mascot pose={result.needsReview ? "explaining" : "celebration"} size="medium" />
            <div>
              <span className={s.microLabel}>
                {result.needsReview ? "CONCLUÍDO · HÁ O QUE REVER" : "CONCLUÍDO"}
              </span>
              <h3 ref={headingRef} tabIndex={-1}>
                {result.needsReview
                  ? "Você chegou ao fim. Vamos rever algumas respostas?"
                  : "Você segurou o pagamento até ter certeza."}
              </h3>
              <p>
                Um pedido bem feito não substitui a conferência. Quem confirma é você, por um
                caminho que já existia antes do pedido chegar.
              </p>
            </div>
          </div>

          <details className={s.review} open>
            <summary>
              Rever minhas respostas
              <span>{result.score}/100 · só você vê</span>
              <Icon icon={ChevronDown} size={18} />
            </summary>
            <ActivityAnswerReview
              items={[
                ...checks.map((check, index) => ({
                  id: `check-${index}`,
                  title: check.label,
                  status: check.score === check.max ? ("correct" as const) : ("review" as const),
                  userAnswer: `${check.score} de ${check.max} pontos`,
                  explanation: "",
                })),
                {
                  id: "contact",
                  title: "Por onde você confirmou",
                  status:
                    contactSourceId === "registered-directory"
                      ? ("correct" as const)
                      : ("review" as const),
                  userAnswer: contactLabel(contactSourceId),
                  expectedAnswer: "O contato que já estava no cadastro",
                  explanation: "A confirmação precisa vir de algo anterior ao pedido.",
                },
                {
                  id: "process",
                  title: "Seu processo",
                  status: result.processRelationPoints === 20 ? ("correct" as const) : ("review" as const),
                  userAnswer:
                    processIds
                      .map((id) => content.processCards.find((card) => card.id === id)?.label)
                      .join(" → ") || "Nenhuma ação incluída",
                  explanation: "Segurar vem antes de confirmar. A segunda aprovação soma, não substitui.",
                },
                {
                  id: "report",
                  title: "Seu reporte",
                  status: result.reportPoints === 15 ? ("correct" as const) : ("review" as const),
                  userAnswer:
                    reportBlockIds
                      .map((id) => content.reportBlocks.find((block) => block.id === id)?.label)
                      .join(" · ") || "Nenhum item incluído",
                  explanation: "Fatos e o que você fez entram. Senha e dados bancários completos, não.",
                },
              ]}
            />
          </details>

          <div className="activity-completion-actions" aria-label="Ações após a conclusão">
            <button type="button" className="activity-completion-button" onClick={restart}>Praticar novamente</button>
            <button type="button" className="activity-completion-button" onClick={onBackToTeams}>Voltar às equipes</button>
            <button type="button" className="activity-completion-button" onClick={onOpenProfile}>Meu perfil</button>
          </div>
        </div>
      </div>
    );
  }

  const stepIds = STEPS.map((step) => step.id);
  const currentStep = Math.max(0, stepIds.indexOf(view));
  const pending = [
    comparisonIds.length === 0 ? "Marque o que mudou no pedido." : null,
    contactSourceId ? null : "Escolha de onde parte a confirmação.",
    null,
    processIds.length === 0 ? "Escolha as ações do processo." : null,
    reportBlockIds.length === 0 ? "Marque o que vai no reporte." : null,
  ][currentStep];

  function advance() {
    if (currentStep === LAST_STEP) {
      void submit();
      return;
    }
    go(stepIds[currentStep + 1]);
  }

  return (
    <LessonShell
      activityId={BANK_CHANGE_PROCESS_ACTIVITY_ID}
      area="EQUIPES"
      topic="MUDANÇA BANCÁRIA"
      title="Mudança bancária sem atalho"
      steps={STEP_LABELS}
      stage={currentStep}
      pending={pending}
      nextLabel={currentStep === LAST_STEP ? "Concluir" : "Continuar"}
      onNext={advance}
      onStageSelect={(index) => go(stepIds[index])}
      pageClassName="activity-workspace bank-change-page bank-process-page"
      busy={isSubmitting}
      error={error}
    >
      {view === "compare" ? (
        <>
          <div style={{ marginBottom: 26 }}>
            <Note title="O caso">{content.situation}</Note>
          </div>
          <CompareStep comparisonIds={comparisonIds} setComparisonIds={setComparisonIds} headingRef={headingRef} go={go} />
        </>
      ) : null}
      {view === "contact" ? (
        <ContactStep contactSourceId={contactSourceId} setContactSourceId={setContactSourceId} headingRef={headingRef} go={go} />
      ) : null}
      {view === "response" && selectedContact ? (
        <section className="bank-process-station bank-process-response">
          <header>
            <span className="section-kicker">Estação 3 · o que você descobriu</span>
            <h1 ref={headingRef} tabIndex={-1}>E o que essa fonte respondeu?</h1>
            <p>Você escolheu <strong>{selectedContact.label}</strong>.</p>
          </header>
          <article role="status">
            <span>Origem consultada</span>
            <strong>{selectedContact.source}</strong>
            <p>{selectedContact.consequence}</p>
          </article>
          <p className="bank-process-hint">Dá para voltar e escolher outra fonte, se quiser.</p>
        </section>
      ) : null}
      {view === "process" ? (
        <ProcessStep processIds={processIds} setProcessIds={setProcessIds} headingRef={headingRef} go={go} />
      ) : null}
      {view === "report" ? (
        <ReportStep reportBlockIds={reportBlockIds} setReportBlockIds={setReportBlockIds} headingRef={headingRef} go={go} />
      ) : null}
    </LessonShell>
  );
}

type StepProps = { headingRef: RefObject<HTMLHeadingElement | null>; go: (view: View) => void };

function CompareStep({ comparisonIds, setComparisonIds, headingRef, go }: StepProps & { comparisonIds: BankComparisonId[]; setComparisonIds: Dispatch<SetStateAction<BankComparisonId[]>> }) {
  return <section className="bank-process-station"><header><span className="section-kicker">Estação 1 · o pedido e o cadastro</span><h1 ref={headingRef} tabIndex={-1}>O que mudou no pedido?</h1><p>Compare a solicitação com o cadastro. Marque os pontos que precisam de confirmação.</p></header><div className="bank-process-comparison" aria-label="Solicitação comparada ao cadastro"><Record title="Solicitação recebida" values={[content.request.order, content.request.amount, content.request.bankAccount, content.request.contact, content.request.requestedException]} /><Record title="Cadastro homologado" values={[content.record.order, content.record.amount, content.record.bankAccount, content.record.contact, content.record.procedure]} /></div><fieldset className="bank-process-checks"><legend>O que precisa ser conferido?</legend>{content.comparisonOptions.map((option) => <label key={option.id}><input type="checkbox" checked={comparisonIds.includes(option.id)} onChange={() => setComparisonIds((current) => toggleId(current, option.id))} /><span><strong>{option.label}</strong></span></label>)}</fieldset></section>;
}

function Record({ title, values }: { title: string; values: readonly string[] }) {
  const labels = ["Pedido", "Valor", "Conta", "Contato", title === "Solicitação recebida" ? "Exceção" : "Procedimento"];
  return <article><h2>{title}</h2><dl>{values.map((value, index) => <div key={labels[index]}><dt>{labels[index]}</dt><dd>{value}</dd></div>)}</dl></article>;
}

function ContactStep({ contactSourceId, setContactSourceId, headingRef, go }: StepProps & { contactSourceId: BankContactSourceId | ""; setContactSourceId: (id: BankContactSourceId) => void }) {
  return <section className="bank-process-station"><header><span className="section-kicker">Estação 2 · origem do contato</span><h1 ref={headingRef} tabIndex={-1}>Como você confirma a troca de conta?</h1><p>Confirme se a fornecedora pediu mesmo a troca. Use algo que a empresa já tinha antes do pedido.</p></header><fieldset className="bank-process-contact-list"><legend>Escolha uma fonte de contato</legend>{content.contactOptions.map((option) => <label key={option.id} className={contactSourceId === option.id ? "selected" : ""}><input type="radio" name="bank-contact" value={option.id} checked={contactSourceId === option.id} onChange={() => setContactSourceId(option.id)} /><span><strong>{option.label}</strong><small>Origem: {option.source}</small></span></label>)}</fieldset></section>;
}

function ProcessStep({ processIds, setProcessIds, headingRef, go }: StepProps & { processIds: BankProcessCardId[]; setProcessIds: Dispatch<SetStateAction<BankProcessCardId[]>> }) {
  const dragCard = useDragReorder((source, target) => setProcessIds(current => {
    const from = current.indexOf(source as BankProcessCardId), to = current.indexOf(target as BankProcessCardId);
    if (from < 0 || to < 0) return current;
    const next = [...current]; next.splice(to, 0, next.splice(from, 1)[0]); return next;
  }));
  return <section className="bank-process-station"><header><span className="section-kicker">Estação 4 · processo seguro</span><h1 ref={headingRef} tabIndex={-1}>Organize as ações antes de pagar</h1><p>Marque as ações necessárias. Depois coloque na ordem certa com Subir e Descer.</p></header><div className="bank-process-builder"><fieldset className="bank-process-checks"><legend>Quais ações entram no processo?</legend>{content.processCards.map((card) => <label key={card.id}><input type="checkbox" checked={processIds.includes(card.id)} onChange={() => setProcessIds((current) => toggleId(current, card.id))} /><span><strong>{card.label}</strong></span></label>)}</fieldset><section aria-labelledby="bank-order-title"><h2 id="bank-order-title">Ordem das ações incluídas</h2><p>{processIds.length} ações escolhidas.</p>{processIds.length ? <ol>{processIds.map((id, index) => { const card = content.processCards.find((item) => item.id === id)!; return <li key={id} {...dragCard(id)}><span><b>{index + 1}</b><span><strong>{card.label}</strong></span></span><div><button type="button" disabled={index === 0} onClick={() => setProcessIds((current) => move(current, index, -1))} aria-label={`Subir ${card.label}`}>Subir</button><button type="button" disabled={index === processIds.length - 1} onClick={() => setProcessIds((current) => move(current, index, 1))} aria-label={`Descer ${card.label}`}>Descer</button></div></li>; })}</ol> : <p className="empty-state">Marque pelo menos uma ação ao lado.</p>}</section></div></section>;
}

function ReportStep({ reportBlockIds, setReportBlockIds, headingRef, go }: StepProps & { reportBlockIds: BankReportBlockId[]; setReportBlockIds: Dispatch<SetStateAction<BankReportBlockId[]>> }) {
  return <section className="bank-process-station"><header><span className="section-kicker">Estação 5 · o reporte</span><h1 ref={headingRef} tabIndex={-1}>O que você conta para a segurança?</h1><p>Marque o que ajuda a investigar. Cuidado: nem tudo aqui deve ser enviado.</p></header><EvidenceTray items={content.reportBlocks} selectedIds={reportBlockIds} onToggle={id => setReportBlockIds(current => toggleId(current, id))} /></section>;
}
