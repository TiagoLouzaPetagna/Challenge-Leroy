"use client";

import { useState, type ReactNode } from "react";
import { ArrowRight, Check, ChevronDown, CircleHelp, type LucideIcon } from "lucide-react";
import { ActivityShell } from "@/features/activities/ActivityShell";
import { ActivityAnswerReview } from "@/features/activities/primitives/ActivityAnswerReview";
import { ActivityNextStep } from "@/features/activities/primitives/ActivityNextStep";
import { useActivityStageFocus } from "@/features/activities/useActivityStageFocus";
import { usePostSubmitCelebration } from "@/features/activities/usePostSubmitCelebration";
import { Mascot } from "@/features/ui/LearningUI";
import type { AchievementDefinition } from "@/lib/content/achievement-catalog";
import { PHISHING_FOUNDATION_ACTIVITY_ID, PHISHING_FOUNDATION_ACTIVITY_VERSION, PHISHING_FOUNDATION_MECHANIC_ID, PHISHING_FOUNDATION_PACKAGE_ID, type FoundationConfirmationRouteId } from "@/lib/content/activities/account-lock/v2";
import type { MissionResult, PhishingFoundationV2Answer, PhishingFoundationV2Result } from "@/lib/domain/types";
import { FoundationExercise } from "./FoundationExercise";
import styles from "./PhishingFoundationMission.module.css";

type Props = {
  existingResult: MissionResult | PhishingFoundationV2Result | null;
  existingCasePackageId: string | null;
  rewardAlreadyClaimed: boolean;
  claimedPoints: number;
  onComplete: (answer: PhishingFoundationV2Answer) => Promise<PhishingFoundationV2Result>;
  onBackToMissions: () => void;
  onOpenSenderLab: () => void;
  onOpenProfile: () => void;
  getUnlockedAchievementIds: () => Set<string>;
  getNewlyUnlockedAchievements: (beforeIds: Set<string>) => AchievementDefinition[];
};

const STEPS = ["Examinar", "Conectar", "Conferir", "Resolver", "Praticar", "Concluir"];
const BASE = { activityId: PHISHING_FOUNDATION_ACTIVITY_ID, activityVersion: PHISHING_FOUNDATION_ACTIVITY_VERSION, mechanicId: PHISHING_FOUNDATION_MECHANIC_ID, casePackageId: PHISHING_FOUNDATION_PACKAGE_ID } as const;

function Icon({ icon: Component, size = 20 }: { icon: LucideIcon; size?: number }) {
  return <Component size={size} strokeWidth={1.8} aria-hidden="true" />;
}

function Note({ children, icon = CircleHelp }: { children: ReactNode; icon?: LucideIcon }) {
  return <div className={styles.note}><Icon icon={icon} size={19} /><div>{children}</div></div>;
}

export function PhishingFoundationMission({ existingResult, existingCasePackageId, rewardAlreadyClaimed: _rewardAlreadyClaimed, claimedPoints: _claimedPoints, onComplete, onBackToMissions, onOpenSenderLab, onOpenProfile, getUnlockedAchievementIds, getNewlyUnlockedAchievements }: Props) {
  const celebration = usePostSubmitCelebration(
    "O aviso que não podia esperar",
    "var(--learn-lime)",
  );
  const previous = existingCasePackageId === PHISHING_FOUNDATION_PACKAGE_ID && existingResult && "requestImpactPoints" in existingResult ? existingResult : null;
  const [stage, setStage] = useState(previous ? 5 : 0);
  const [answer, setAnswer] = useState<Partial<PhishingFoundationV2Answer>>({ ...BASE, reportDetailIds: [] });
  const [result, setResult] = useState(previous);
  const [routeViewed, setRouteViewed] = useState(false);
  const [transferRoute, setTransferRoute] = useState<FoundationConfirmationRouteId>();
  const [tested, setTested] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const titleRef = useActivityStageFocus(stage, Boolean(celebration.screen));
  function field<K extends keyof PhishingFoundationV2Answer>(key: K, value: PhishingFoundationV2Answer[K] | undefined) { setAnswer(current => ({ ...current, [key]: value })); }
  function move(next: number) { setStage(next); setNotice(""); setError(""); }
  function selectRoute(route: FoundationConfirmationRouteId) { field("confirmationRouteId", route); if (route === "known-official-reference") setRouteViewed(true); }
  const ready = [true, !!answer.protectedAssetId && !!answer.potentialConsequenceId && tested, !!answer.confirmationRouteId, !!answer.finalAssessmentId && !!answer.finalActionId && !!answer.reportDetailIds?.length, !!answer.transferDecisionId][stage];
  const pendingAction = [
    "Leia o e-mail e continue quando terminar.",
    !answer.protectedAssetId ? "Escolha uma peça na coluna 1: o que pode ser afetado." : !answer.potentialConsequenceId ? "Escolha uma peça na coluna 2: o que pode acontecer." : "Clique em Testar ligação e leia a explicação.",
    "Escolha como verificar o aviso no Navegador de trabalho.",
    !answer.finalAssessmentId ? "1. Escolha o que você conclui sobre o e-mail." : !answer.finalActionId ? "2. Escolha o que fazer com o e-mail." : "3. Coloque na pasta uma informação que ajude na investigação.",
    "Escolha o que fazer com o novo e-mail.",
  ][stage];
  async function finish() {
    if (busy) return;
    if (!answer.protectedAssetId || !answer.potentialConsequenceId || !answer.pauseDecisionId || !answer.evaluationId || !answer.confirmationRouteId || !answer.finalAssessmentId || !answer.finalActionId || !answer.reportDetailIds?.length || !answer.transferDecisionId) { setError("Há uma decisão pendente. Volte para revisar o caso."); return; }
    setBusy(true); setError("");
    const beforeIds = getUnlockedAchievementIds();
    try { const evaluated = await onComplete(answer as PhishingFoundationV2Answer); setResult(evaluated); move(5); celebration.begin(getNewlyUnlockedAchievements(beforeIds)); }
    catch { setError("Não foi possível salvar. Suas decisões estão preservadas; tente novamente."); }
    finally { setBusy(false); }
  }
  function restart() { setAnswer({ ...BASE, reportDetailIds: [] }); setResult(null); setRouteViewed(false); setTransferRoute(undefined); setTested(false); celebration.reset(); move(0); }
  const reviewItems = result ? [
    { label: "Pedido e risco", earned: result.requestImpactPoints, total: 20, tip: "Se você informar sua senha na página indicada pelo e-mail, outra pessoa poderá acessar sua conta." },
    { label: "Pausa e análise", earned: result.pauseEvaluationPoints, total: 15, tip: "Antes de clicar, pense no que o e-mail pede e no que pode acontecer. Um visual profissional ou um prazo curto não tornam o pedido confiável." },
    { label: "Verificação fora do e-mail", earned: result.confirmationPoints, total: 25, tip: "Abra o portal da empresa por um favorito que você já usava, sem usar o link do e-mail." },
    { label: "Resposta e evidências", earned: result.responseReportPoints, total: 25, tip: "Avise a equipe de segurança e inclua o e-mail e o resultado da verificação no portal. Não envie senhas nem dados pessoais." },
    { label: "Novo alerta", earned: result.transferPoints, total: 15, tip: "O portal da empresa confirmou que a senha expira amanhã. Nesse caso, altere a senha no próprio portal." },
  ] : [];

  if (celebration.screen) return celebration.screen;

  return <ActivityShell activityId={PHISHING_FOUNDATION_ACTIVITY_ID} className={styles.page}>
    {stage < 5 && <header className={styles.header}><div><span className={styles.eyebrow}><span /> MISSÃO 01 <span className={styles.headerDivider}>/</span> ENGENHARIA SOCIAL</span><h1>O aviso que não podia esperar</h1></div></header>}
    {stage < 5 && <section className={styles.progress} aria-label="Progresso da missão de fundamento"><ol>{STEPS.map((step, index) => <li key={step} aria-current={stage === index ? "step" : undefined} className={stage > index ? styles.completedStep : ""}>{stage > index ? <button type="button" className={styles.stepBack} disabled={busy} onClick={() => move(index)}><span><Icon icon={Check} size={13} /></span><strong>{step}</strong></button> : <><span>{`0${index + 1}`}</span><strong>{step}</strong></>}</li>)}</ol><progress value={stage} max={5} aria-label={`Etapa ${stage + 1} de 6: ${STEPS[stage]}`} /></section>}
    <div className={styles.workspace}>
      {stage < 5 && <FoundationExercise stage={stage} answer={answer} tested={tested} verified={routeViewed} transferRoute={transferRoute} titleRef={titleRef} field={field} onTested={setTested} onRoute={selectRoute} onTransferRoute={route => { setTransferRoute(route); field("transferDecisionId", undefined); }} />}

      {stage === 5 && result && <div className={styles.result}>
        <div className={styles.resultHero}><Mascot pose={result.needsReview ? "explaining" : "celebration"} size="medium" /><div><span className={styles.microLabel}>{result.needsReview ? "PRÁTICA CONCLUÍDA · HÁ O QUE REVISAR" : "CASO CONCLUÍDO"}</span><h3>{result.needsReview ? "Você concluiu a missão. Vamos rever algumas decisões?" : "Você transformou urgência em uma decisão segura."}</h3></div></div>
        <details className={styles.review} open><summary>Rever minhas decisões <span>{result.score}/100 · resultado privado</span><Icon icon={ChevronDown} size={18} /></summary><div><ActivityAnswerReview items={reviewItems.map(item => ({ id: item.label, title: item.label, status: item.earned === item.total ? "correct" : "review", userAnswer: `${item.earned} de ${item.total} pontos`, explanation: item.tip }))} /></div></details>
        <ActivityNextStep area="PhishLab" title="Quem enviou de verdade?" onOpen={onOpenSenderLab} />
        <div className="activity-completion-actions" aria-label="Ações após a conclusão">
                <button type="button" className="activity-completion-button" onClick={restart}>Praticar novamente</button>
                <button type="button" className="activity-completion-button" onClick={onBackToMissions}>Voltar às missões</button>
                <button type="button" className="activity-completion-button" onClick={onOpenProfile}>Meu perfil</button>
              </div>
      </div>}

      {notice && <div className={styles.notice} role="status"><Note>{notice}</Note></div>}
      {error && <div className={styles.error} role="alert">{error}</div>}
      {stage < 5 && <footer className={styles.footer}><div className={styles.nextStep} role="status">{ready ? null : <span>{pendingAction}</span>}</div><button type="button" className={styles.primary} disabled={!ready || busy} onClick={() => { if (stage === 0 && !answer.pauseDecisionId) field("pauseDecisionId", "pause-before-message-action"); if (stage === 4) void finish(); else move(stage + 1); }}>{busy ? "Salvando…" : stage === 4 ? "Concluir missão" : "Continuar"}<Icon icon={ArrowRight} size={18} /></button></footer>}
    </div>
  </ActivityShell>;
}
