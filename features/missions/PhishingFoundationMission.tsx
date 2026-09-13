"use client";

import { useState, type ReactNode } from "react";
import { ArrowLeft, ArrowRight, Check, ChevronDown, CircleHelp, Clock3, Undo2, type LucideIcon } from "lucide-react";
import { ActivityShell } from "@/features/activities/ActivityShell";
import { ActivityAnswerReview } from "@/features/activities/primitives/ActivityAnswerReview";
import { useActivityStageFocus } from "@/features/activities/useActivityStageFocus";
import { Mascot } from "@/features/ui/LearningUI";
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
};

const STEPS = ["Examinar", "Conectar", "Conferir", "Resolver", "Praticar", "Concluir"];
const TITLES = ["Encontre o pedido no e-mail", "Ligue o pedido ao risco", "Confira se há um bloqueio na sua conta", "Decida o que fazer com este e-mail", "Aplique o que aprendeu", "Sua investigação terminou"];
const INSTRUCTIONS = [
  "Leia o e-mail e observe o que ele pede. Quando terminar, clique em Continuar.",
  "Escolha uma peça de cada coluna. Arraste para a área indicada ou clique na peça. Depois clique em Testar conexão.",
  "O e-mail ameaça bloquear sua conta. Escolha como verificar essa informação no Navegador de trabalho e leia o resultado.",
  "Avalie o e-mail, escolha o que fazer com ele e separe as informações que ajudariam a equipe de segurança a investigar.",
  "Chegou outro e-mail. Leia a mensagem, verifique se o que ela diz é verdade e escolha como agir.",
  "Confira o que aprendeu e o que vale praticar novamente.",
];
const BASE = { activityId: PHISHING_FOUNDATION_ACTIVITY_ID, activityVersion: PHISHING_FOUNDATION_ACTIVITY_VERSION, mechanicId: PHISHING_FOUNDATION_MECHANIC_ID, casePackageId: PHISHING_FOUNDATION_PACKAGE_ID } as const;

function Icon({ icon: Component, size = 20 }: { icon: LucideIcon; size?: number }) {
  return <Component size={size} strokeWidth={1.8} aria-hidden="true" />;
}

function Note({ children, icon = CircleHelp }: { children: ReactNode; icon?: LucideIcon }) {
  return <div className={styles.note}><Icon icon={icon} size={19} /><div>{children}</div></div>;
}

export function PhishingFoundationMission({ existingResult, existingCasePackageId, rewardAlreadyClaimed, claimedPoints, onComplete, onBackToMissions, onOpenSenderLab, onOpenProfile }: Props) {
  const previous = existingCasePackageId === PHISHING_FOUNDATION_PACKAGE_ID && existingResult && "requestImpactPoints" in existingResult ? existingResult : null;
  const [stage, setStage] = useState(previous ? 5 : 0);
  const [answer, setAnswer] = useState<Partial<PhishingFoundationV2Answer>>({ ...BASE, reportDetailIds: [] });
  const [result, setResult] = useState(previous);
  const [routeViewed, setRouteViewed] = useState(false);
  const [transferRoute, setTransferRoute] = useState<FoundationConfirmationRouteId>();
  const [tested, setTested] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [firstReward, setFirstReward] = useState(false);
  const [notice, setNotice] = useState("");
  const titleRef = useActivityStageFocus(stage);
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
    try { const evaluated = await onComplete(answer as PhishingFoundationV2Answer); setResult(evaluated); setFirstReward(!rewardAlreadyClaimed); move(5); }
    catch { setError("Não foi possível salvar. Suas decisões estão preservadas; tente novamente."); }
    finally { setBusy(false); }
  }
  function restart() { setAnswer({ ...BASE, reportDetailIds: [] }); setResult(null); setRouteViewed(false); setTransferRoute(undefined); setTested(false); setFirstReward(false); move(0); }
  const reviewItems = result ? [
    { label: "Pedido e risco", earned: result.requestImpactPoints, total: 20, tip: "Se você informar sua senha na página indicada pelo e-mail, outra pessoa poderá acessar sua conta." },
    { label: "Pausa e análise", earned: result.pauseEvaluationPoints, total: 15, tip: "Antes de clicar, pense no que o e-mail pede e no que pode acontecer. Um visual profissional ou um prazo curto não tornam o pedido confiável." },
    { label: "Verificação fora do e-mail", earned: result.confirmationPoints, total: 25, tip: "Abra o portal da empresa por um favorito que você já usava, sem usar o link do e-mail." },
    { label: "Resposta e evidências", earned: result.responseReportPoints, total: 25, tip: "Avise a equipe de segurança e inclua o e-mail e o resultado da verificação no portal. Não envie senhas nem dados pessoais." },
    { label: "Novo alerta", earned: result.transferPoints, total: 15, tip: "O portal da empresa confirmou que a senha expira amanhã. Nesse caso, altere a senha no próprio portal." },
  ] : [];
  const nextPractice = reviewItems.find(item => item.earned < item.total);

  return <ActivityShell activityId={PHISHING_FOUNDATION_ACTIVITY_ID} className={styles.page}>
    <header className={styles.header}><div><span className={styles.eyebrow}><span /> MISSÃO 01 <span className={styles.headerDivider}>/</span> ENGENHARIA SOCIAL</span><h1>O aviso que não podia esperar</h1></div><span className={styles.pace}><Icon icon={Clock3} size={16} />No seu ritmo</span></header>
    <section className={styles.progress} aria-label="Progresso da missão de fundamento"><ol>{STEPS.map((step, index) => <li key={step} aria-current={stage === index ? "step" : undefined} className={stage > index ? styles.completedStep : ""}><span>{stage > index ? <Icon icon={Check} size={13} /> : `0${index + 1}`}</span><strong>{step}</strong></li>)}</ol><progress value={stage} max={5} aria-label={`Etapa ${stage + 1} de 6: ${STEPS[stage]}`} /></section>
    <div className={styles.workspace}>
      {stage === 5 && <header className={styles.stageHeading}><div><span className={styles.microLabel}>ETAPA {stage + 1} DE 6</span><h2 ref={titleRef} tabIndex={-1}>{stage === 5 && result?.needsReview ? "Veja o que vale revisar" : TITLES[stage]}</h2>{stage === 5 && <p>{INSTRUCTIONS[stage]}</p>}</div></header>}
      {stage < 5 && <FoundationExercise stage={stage} answer={answer} tested={tested} verified={routeViewed} transferRoute={transferRoute} titleRef={titleRef} field={field} onTested={setTested} onRoute={selectRoute} onTransferRoute={route => { setTransferRoute(route); field("transferDecisionId", undefined); }} />}

      {stage === 5 && result && <div className={styles.result}>
        <div className={styles.resultHero}><Mascot pose={result.needsReview ? "explaining" : "celebration"} size="medium" /><div><span className={styles.microLabel}>{result.needsReview ? "PRÁTICA CONCLUÍDA · HÁ O QUE REVISAR" : "CASO CONCLUÍDO"}</span><h3>{result.needsReview ? "Você concluiu a missão. Vamos rever algumas decisões?" : "Você transformou urgência em uma decisão segura."}</h3><p>{nextPractice ? nextPractice.tip : "Você verificou os avisos no portal da empresa e separou as informações necessárias para investigar o e-mail suspeito."}</p></div></div>
        <div className={styles.takeaway}><span>PARE</span><p><strong>Pare</strong> antes de agir. <strong>Avalie</strong> o pedido. <strong>Reconfirme</strong> no portal da empresa. <strong>Escale</strong>: avise a equipe de segurança se houver suspeita.</p></div>
        <details className={styles.review}><summary>Rever minhas decisões <span>{result.score}/100 · resultado privado</span><Icon icon={ChevronDown} size={18} /></summary><div><ActivityAnswerReview items={reviewItems.map(item => ({ id: item.label, title: item.label, status: item.earned === item.total ? "correct" : "review", userAnswer: `${item.earned} de ${item.total} pontos`, explanation: item.tip }))} /><p className={styles.reward}>{firstReward ? `+${result.potentialReward} pontos registrados.` : `${claimedPoints} pontos já registrados para esta missão. Refazer não duplica a recompensa.`}</p></div></details>
        <nav className={styles.resultActions} aria-label="Ações do resultado"><button type="button" className={styles.primary} onClick={result.needsReview ? restart : onOpenSenderLab}>{result.needsReview ? "Praticar novamente" : "Próxima: Quem enviou de verdade?"}<Icon icon={ArrowRight} size={18} /></button><button type="button" className={styles.textButton} onClick={onBackToMissions}>Voltar às missões</button><button type="button" className={styles.textButton} onClick={onOpenProfile}>Meu perfil</button>{!result.needsReview && <button type="button" className={styles.textButton} onClick={restart}><Icon icon={Undo2} size={15} />Refazer missão</button>}</nav>
      </div>}

      {notice && <div className={styles.notice} role="status"><Note>{notice}</Note></div>}
      {error && <div className={styles.error} role="alert">{error}</div>}
      {stage < 5 && <footer className={styles.footer}><button type="button" className={styles.textButton} disabled={busy} onClick={() => stage === 0 ? onBackToMissions() : move(stage - 1)}><Icon icon={ArrowLeft} size={17} />{stage === 0 ? "Missões" : "Voltar"}</button><div className={styles.nextStep} role="status">{ready && <Icon icon={Check} size={18} />}<span>{ready ? "Tudo pronto para continuar." : pendingAction}</span></div><button type="button" className={styles.primary} disabled={!ready || busy} onClick={() => { if (stage === 0 && !answer.pauseDecisionId) field("pauseDecisionId", "pause-before-message-action"); if (stage === 4) void finish(); else move(stage + 1); }}>{busy ? "Salvando…" : stage === 4 ? "Concluir missão" : "Continuar"}<Icon icon={ArrowRight} size={18} /></button></footer>}
    </div>
  </ActivityShell>;
}
