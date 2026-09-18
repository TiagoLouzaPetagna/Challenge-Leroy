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
import { ActivityProgress } from "@/features/activities/primitives/ActivityProgress";
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
import { POINT_RULES } from "@/lib/domain/rules";
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

type View = "briefing" | "compare" | "contact" | "response" | "process" | "report" | "review" | "result";

const STEPS: readonly { id: View; label: string }[] = [
  { id: "briefing", label: "Contexto" }, { id: "compare", label: "Comparar" },
  { id: "contact", label: "Contato" }, { id: "response", label: "Resposta" },
  { id: "process", label: "Processo" }, { id: "report", label: "Reporte" },
  { id: "review", label: "Revisão" }, { id: "result", label: "Resultado" },
] as const;
const STEP_LABELS = STEPS.map((step) => step.label);

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
  const [view, setView] = useState<View>(existingResult ? "result" : "briefing");
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
  const stepIndex = STEPS.findIndex((step) => step.id === view);
  const selectedContact = content.contactOptions.find((option) => option.id === contactSourceId);
  const outsideProcessIds = content.processCards.map((card) => card.id).filter((id) => !processIds.includes(id));
  const activityProgress = (
    <ActivityProgress
      steps={STEP_LABELS}
      currentStep={stepIndex}
      ariaLabel="Progresso de Mudança bancária sem atalho"
    />
  );

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
    setResult(null); setCountedOnThisAttempt(false); setError(""); celebration.reset(); go("briefing");
  };

  if (celebration.screen) return celebration.screen;

  if (view === "briefing") return (
    <div className="activity-workspace page-stack bank-change-page bank-process-page">
      <button type="button" className="text-button teams-back-button" onClick={onBackToTeams}>← Voltar para Equipes</button>
      {activityProgress}
      <section className="bank-change-briefing bank-process-briefing">
        <div><span className="section-kicker">Estação de processo · caso fictício</span><h1 ref={headingRef} tabIndex={-1}>Mudança bancária sem atalho</h1><p>{content.situation}</p>
          <div className="bank-process-context" aria-label="Seu papel e sua tarefa">
            <article><strong>Seu papel</strong><span>{content.role}</span></article>
            <article><strong>Sua tarefa</strong><span>{content.task}</span></article>
            <article><strong>O que você protege</strong><span>{content.protectedOutcome}</span></article>
          </div>
          {hasLegacyCompletion ? <p className="bank-process-legacy-note">Sua conclusão anterior continua registrada. Esta mecânica pratica o mesmo controle sem conceder a recompensa novamente.</p> : null}
          <button type="button" className="primary-button" onClick={() => go("compare")}>Começar pela comparação</button>
        </div>
        <aside aria-label="Resumo da atividade"><span>Recompensa</span><strong>{POINT_RULES.teamOperation}</strong><p>pontos-base na primeira conclusão lógica, mais bônus de desempenho</p><dl><div><dt>Formato</dt><dd>5 estações</dd></div><div><dt>Tempo</dt><dd>14 min</dd></div><div><dt>Radar</dt><dd>Opcional e pontuado</dd></div></dl></aside>
      </section>
    </div>
  );

  if (view === "result" && result) {
    const checks = [
      { label: "Diferenças e limites do pedido", score: result.comparisonPoints, max: 20 },
      { label: "Origem da confirmação", score: result.contactPoints, max: 25 },
      { label: "Ações que pertencem ao processo", score: result.processClassificationPoints, max: 20 },
      { label: "Relações entre os controles", score: result.processRelationPoints, max: 20 },
      { label: "Conteúdo seguro do reporte", score: result.reportPoints, max: 15 },
    ];
    return <div className="activity-workspace page-stack bank-change-page bank-process-page">
      {activityProgress}
      <section className="bank-change-result-hero"><div><span className="section-kicker">Resultado privado</span><h1 ref={headingRef} tabIndex={-1}>{result.needsReview ? "O processo ainda contém um atalho" : "O processo protegeu a mudança"}</h1><p>Suas escolhas e sua nota ficam privadas. A equipe recebe somente os cinco controles normalizados e as competências cobertas.</p></div><div className="bank-change-result-score" aria-label={`Nota ${result.score} de 100`}><strong>{result.score}</strong><span>/100</span></div></section>
      <section className="bank-change-result-summary" aria-label="Resumo do resultado"><article><span>Controles completos</span><strong>{result.correctDecisions}/5</strong></article><article><span>Indicadores do setor</span><strong>{aggregateAlreadyCounted && !countedOnThisAttempt ? "Sem alteração" : "Atualizados"}</strong><small>uma contribuição para esta atividade</small></article><article><span>Revisão</span><strong>{result.needsReview ? "Recomendada" : "Dispensada"}</strong></article></section>
      <section className="bank-process-result-review"><div className="teams-section-heading"><div><span className="section-kicker">Revisão das respostas</span><h2>O que você acertou e o que precisa revisar</h2></div><span>{result.correctDecisions} de 5 controles completos</span></div>
        <ol>{checks.map((check, index) => { const correct = check.score === check.max; return <li key={check.label} className={correct ? "safe" : "review"}><span>{String(index + 1).padStart(2, "0")}</span><div><small>{correct ? "Acertou" : "Precisa revisar"}</small><h3>{check.label}</h3><p>{check.score} de {check.max} pontos neste controle.</p></div></li>; })}</ol>
        <div className="bank-process-answer-detail"><article><strong>Sua fonte de confirmação</strong><span>{contactLabel(contactSourceId)}</span><small>Esperado: contato homologado no cadastro.</small></article><article><strong>Seu processo</strong><span>{processIds.map((id) => content.processCards.find((card) => card.id === id)?.label).join(" → ") || "Nenhuma ação incluída"}</span><small>O bloqueio vem antes da confirmação; fluxo oficial e segunda aprovação se complementam.</small></article><article><strong>Seu reporte</strong><span>{reportBlockIds.map((id) => content.reportBlocks.find((block) => block.id === id)?.label).join(" · ") || "Nenhum bloco incluído"}</span><small>O esperado contém fatos, contenção e confirmação, sem segredos ou acusação.</small></article></div>
        <div className="activity-completion-actions" aria-label="Ações após a conclusão">
                <button type="button" className="activity-completion-button" onClick={restart}>Praticar novamente</button>
                <button type="button" className="activity-completion-button" onClick={onBackToTeams}>Voltar às equipes</button>
                <button type="button" className="activity-completion-button" onClick={onOpenProfile}>Meu perfil</button>
              </div>
      </section>
    </div>;
  }

  return <div className="activity-workspace page-stack bank-change-page bank-process-page">
    <div className="bank-change-topbar"><button type="button" className="text-button" onClick={onBackToTeams}>← Sair da estação</button></div>
    {activityProgress}
    {view === "compare" ? <CompareStep comparisonIds={comparisonIds} setComparisonIds={setComparisonIds} headingRef={headingRef} go={go} /> : null}
    {view === "contact" ? <ContactStep contactSourceId={contactSourceId} setContactSourceId={setContactSourceId} headingRef={headingRef} go={go} /> : null}
    {view === "response" && selectedContact ? <section className="bank-process-station bank-process-response"><header><span className="section-kicker">Estação 3 · consequência da escolha</span><h1 ref={headingRef} tabIndex={-1}>O que essa fonte permite concluir?</h1><p>Você escolheu <strong>{selectedContact.label}</strong>. Veja abaixo a resposta obtida.</p></header><article role="status"><span>Origem consultada</span><strong>{selectedContact.source}</strong><p>{selectedContact.consequence}</p></article><p className="bank-process-hint">Você pode corrigir a origem agora ou manter sua decisão e revisar tudo antes de concluir.</p><Nav back={() => go("contact")} backLabel="Escolher outra fonte" next={() => go("process")} nextLabel="Montar o processo" /></section> : null}
    {view === "process" ? <ProcessStep processIds={processIds} setProcessIds={setProcessIds} headingRef={headingRef} go={go} /> : null}
    {view === "report" ? <ReportStep reportBlockIds={reportBlockIds} setReportBlockIds={setReportBlockIds} headingRef={headingRef} go={go} /> : null}
    {view === "review" ? <ReviewStep comparisonIds={comparisonIds} contactSourceId={contactSourceId} processIds={processIds} reportBlockIds={reportBlockIds} headingRef={headingRef} go={go} submit={submit} isSubmitting={isSubmitting} error={error} /> : null}
  </div>;
}

type StepProps = { headingRef: RefObject<HTMLHeadingElement | null>; go: (view: View) => void };

function Nav({ back, backLabel, next, nextLabel, disabled = false }: { back: () => void; backLabel: string; next: () => void; nextLabel: string; disabled?: boolean }) {
  return <div className="bank-process-navigation"><button type="button" className="text-button" onClick={back}>{backLabel}</button><button type="button" className="primary-button" disabled={disabled} onClick={next}>{nextLabel}</button></div>;
}

function CompareStep({ comparisonIds, setComparisonIds, headingRef, go }: StepProps & { comparisonIds: BankComparisonId[]; setComparisonIds: Dispatch<SetStateAction<BankComparisonId[]>> }) {
  return <section className="bank-process-station"><header><span className="section-kicker">Estação 1 · comparar registros</span><h1 ref={headingRef} tabIndex={-1}>O que mudou no pedido?</h1><p>Compare a solicitação com o cadastro. Marque os pontos que precisam de confirmação.</p></header><div className="bank-process-comparison" aria-label="Solicitação comparada ao cadastro"><Record title="Solicitação recebida" values={[content.request.order, content.request.amount, content.request.bankAccount, content.request.contact, content.request.requestedException]} /><Record title="Cadastro homologado" values={[content.record.order, content.record.amount, content.record.bankAccount, content.record.contact, content.record.procedure]} /></div><fieldset className="bank-process-checks"><legend>Quais pontos precisam entrar na verificação?</legend>{content.comparisonOptions.map((option) => <label key={option.id}><input type="checkbox" checked={comparisonIds.includes(option.id)} onChange={() => setComparisonIds((current) => toggleId(current, option.id))} /><span><strong>{option.label}</strong></span></label>)}</fieldset><Nav back={() => go("briefing")} backLabel="Voltar ao contexto" next={() => go("contact")} nextLabel="Escolher a confirmação" disabled={comparisonIds.length === 0} /></section>;
}

function Record({ title, values }: { title: string; values: readonly string[] }) {
  const labels = ["Pedido", "Valor", "Conta", "Contato", title === "Solicitação recebida" ? "Exceção" : "Procedimento"];
  return <article><h2>{title}</h2><dl>{values.map((value, index) => <div key={labels[index]}><dt>{labels[index]}</dt><dd>{value}</dd></div>)}</dl></article>;
}

function ContactStep({ contactSourceId, setContactSourceId, headingRef, go }: StepProps & { contactSourceId: BankContactSourceId | ""; setContactSourceId: (id: BankContactSourceId) => void }) {
  return <section className="bank-process-station"><header><span className="section-kicker">Estação 2 · origem do contato</span><h1 ref={headingRef} tabIndex={-1}>Como você confirma a troca de conta?</h1><p>Você precisa confirmar se a fornecedora realmente pediu a nova conta. Uma confirmação independente começa em informação que a empresa já possuía antes deste pedido.</p></header><fieldset className="bank-process-contact-list"><legend>Escolha uma fonte de contato</legend>{content.contactOptions.map((option) => <label key={option.id} className={contactSourceId === option.id ? "selected" : ""}><input type="radio" name="bank-contact" value={option.id} checked={contactSourceId === option.id} onChange={() => setContactSourceId(option.id)} /><span><strong>{option.label}</strong><small>Origem: {option.source}</small></span></label>)}</fieldset><Nav back={() => go("compare")} backLabel="Voltar à comparação" next={() => go("response")} nextLabel="Consultar esta fonte" disabled={!contactSourceId} /></section>;
}

function ProcessStep({ processIds, setProcessIds, headingRef, go }: StepProps & { processIds: BankProcessCardId[]; setProcessIds: Dispatch<SetStateAction<BankProcessCardId[]>> }) {
  const dragCard = useDragReorder((source, target) => setProcessIds(current => {
    const from = current.indexOf(source as BankProcessCardId), to = current.indexOf(target as BankProcessCardId);
    if (from < 0 || to < 0) return current;
    const next = [...current]; next.splice(to, 0, next.splice(from, 1)[0]); return next;
  }));
  return <section className="bank-process-station"><header><span className="section-kicker">Estação 4 · processo seguro</span><h1 ref={headingRef} tabIndex={-1}>Organize as ações antes de pagar</h1><p>Escolha as ações necessárias. Depois arraste as ações escolhidas para colocá-las em ordem, ou use Subir e Descer.</p></header><div className="bank-process-builder"><fieldset className="bank-process-checks"><legend>Classifique as ações</legend>{content.processCards.map((card) => <label key={card.id}><input type="checkbox" checked={processIds.includes(card.id)} onChange={() => setProcessIds((current) => toggleId(current, card.id))} /><span><strong>{card.label}</strong></span></label>)}</fieldset><section aria-labelledby="bank-order-title"><h2 id="bank-order-title">Ordem das ações incluídas</h2><p>{processIds.length} ações no processo.</p>{processIds.length ? <ol>{processIds.map((id, index) => { const card = content.processCards.find((item) => item.id === id)!; return <li key={id} {...dragCard(id)}><span><b>{index + 1}</b><span><strong>{card.label}</strong></span></span><div><button type="button" disabled={index === 0} onClick={() => setProcessIds((current) => move(current, index, -1))} aria-label={`Subir ${card.label}`}>Subir</button><button type="button" disabled={index === processIds.length - 1} onClick={() => setProcessIds((current) => move(current, index, 1))} aria-label={`Descer ${card.label}`}>Descer</button></div></li>; })}</ol> : <p className="empty-state">Marque ao menos uma ação para montar o processo.</p>}</section></div><Nav back={() => go("response")} backLabel="Voltar à resposta" next={() => go("report")} nextLabel="Montar o reporte" disabled={processIds.length === 0} /></section>;
}

function ReportStep({ reportBlockIds, setReportBlockIds, headingRef, go }: StepProps & { reportBlockIds: BankReportBlockId[]; setReportBlockIds: Dispatch<SetStateAction<BankReportBlockId[]>> }) {
  return <section className="bank-process-station"><header><span className="section-kicker">Estação 5 · registro fictício</span><h1 ref={headingRef} tabIndex={-1}>O que você enviaria à equipe de segurança?</h1><p>Arraste para a pasta as informações que ajudam a investigar o pedido. Você também pode clicar nos cartões.</p></header><EvidenceTray items={content.reportBlocks} selectedIds={reportBlockIds} onToggle={id => setReportBlockIds(current => toggleId(current, id))} /><Nav back={() => go("process")} backLabel="Voltar ao processo" next={() => go("review")} nextLabel="Revisar a estação" disabled={reportBlockIds.length === 0} /></section>;
}

function ReviewStep({ comparisonIds, contactSourceId, processIds, reportBlockIds, headingRef, go, submit, isSubmitting, error }: StepProps & { comparisonIds: BankComparisonId[]; contactSourceId: BankContactSourceId | ""; processIds: BankProcessCardId[]; reportBlockIds: BankReportBlockId[]; submit: () => void; isSubmitting: boolean; error: string }) {
  return <section className="bank-process-station bank-process-review"><header><span className="section-kicker">Revisão antes da conclusão</span><h1 ref={headingRef} tabIndex={-1}>Confira o processo que você montou</h1><p>Você ainda pode voltar a qualquer estação. O resultado só será calculado depois de confirmar esta revisão.</p></header><div><ReviewCard label="Comparação" value={`${comparisonIds.length} pontos marcados`} edit={() => go("compare")} /><ReviewCard label="Confirmação" value={contactLabel(contactSourceId)} edit={() => go("contact")} /><ReviewCard label="Processo" value={`${processIds.length} ações incluídas`} edit={() => go("process")} /><ReviewCard label="Reporte" value={`${reportBlockIds.length} blocos incluídos`} edit={() => go("report")} /></div>{error ? <p className="bank-change-error" role="alert">{error}</p> : null}<div className="bank-process-navigation"><button type="button" className="text-button" onClick={() => go("report")}>Voltar ao reporte</button><button type="button" className="primary-button" disabled={isSubmitting} onClick={submit}>{isSubmitting ? "Registrando…" : "Concluir estação"}</button></div></section>;
}

function ReviewCard({ label, value, edit }: { label: string; value: string; edit: () => void }) {
  return <article><span>{label}</span><strong>{value}</strong><button type="button" onClick={edit}>Editar {label.toLowerCase()}</button></article>;
}
