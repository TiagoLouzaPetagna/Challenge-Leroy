"use client";

import { useEffect, useMemo, useState } from "react";

import { ActivityShell } from "@/features/activities/ActivityShell";
import {
  ActivityAnswerReview,
  type ActivityAnswerReviewItem,
} from "@/features/activities/primitives/ActivityAnswerReview";
import { ActivityError } from "@/features/activities/primitives/ActivityError";
import { ActivityProgress } from "@/features/activities/primitives/ActivityProgress";
import { useActivityStageFocus } from "@/features/activities/useActivityStageFocus";
import {
  findMfaConsoleV2Package,
  MFA_CONSOLE_ACTIVITY_ID,
  MFA_CONSOLE_ACTIVITY_VERSION,
  MFA_CONSOLE_CANONICAL_PACKAGE_ID,
  MFA_CONSOLE_MECHANIC_ID,
  MFA_CONSOLE_V2_PACKAGES,
  type MfaAssociationId,
  type MfaEventActionId,
  type MfaOfficialConsoleActionId,
  type MfaOfficialEntryRouteId,
  type MfaReportDetailId,
  type MfaSupportResponseId,
  type MfaTransferActionId,
} from "@/lib/content/activities/mfa-console/v2";
import { calculatePerformanceBonus, POINT_RULES } from "@/lib/domain/rules";
import type {
  MfaConsoleV2Answer,
  MfaConsoleV2Result,
  MfaConsoleV2Submission,
  MissionResult,
} from "@/lib/domain/types";

const steps = [
  "Abertura",
  "Solicitações",
  "Falso suporte",
  "Área oficial",
  "Reporte",
  "Revisão",
  "Transferência",
  "Resultado",
  "Debrief",
] as const;

const associationOptions: readonly {
  id: MfaAssociationId;
  label: string;
  detail: string;
}[] = [
  {
    id: "active-self-action",
    label: "Corresponde a uma ação que eu iniciei e ainda está aberta",
    detail: "Serviço, finalidade e número do desafio precisam coincidir.",
  },
  {
    id: "ended-self-action",
    label: "Parece relacionado, mas a ação que eu iniciei já terminou",
    detail: "Uma nova solicitação não herda a autorização de um fluxo encerrado.",
  },
  {
    id: "no-self-action",
    label: "Não corresponde a nenhuma ação iniciada por mim",
    detail: "A aparência da notificação não comprova quem iniciou a entrada.",
  },
] as const;

const eventActionOptions: readonly {
  id: MfaEventActionId;
  label: string;
  detail: string;
}[] = [
  {
    id: "approve",
    label: "Aprovar esta solicitação",
    detail: "Só cabe quando a ação própria ainda está ativa e todos os dados coincidem.",
  },
  {
    id: "deny",
    label: "Negar esta solicitação",
    detail: "Impede que esta aprovação seja usada para liberar a entrada.",
  },
  {
    id: "review-official",
    label: "Não responder aqui e revisar pela área oficial",
    detail: "Use uma rota que já existia antes da notificação.",
  },
] as const;

const supportOptions: readonly {
  id: MfaSupportResponseId;
  label: string;
  detail: string;
}[] = [
  {
    id: "end-contact",
    label: "Encerrar o contato sem aprovar nem fornecer código",
    detail: "Depois, a verificação continua pela área oficial conhecida.",
  },
  {
    id: "refuse-and-question",
    label: "Recusar, mas perguntar por que isso seria necessário",
    detail: "Não entrega o fator, porém mantém o atacante em posição de pressionar.",
  },
  {
    id: "share-code",
    label: "Enviar o código para o suposto suporte",
    detail: "O código é um fator de autenticação e não deve ser entregue a outra pessoa.",
  },
  {
    id: "approve-next",
    label: "Aprovar o próximo pedido para encerrar o problema",
    detail: "A aprovação não cancela uma tentativa: ela pode autorizar o acesso.",
  },
] as const;

const routeOptions: readonly {
  id: MfaOfficialEntryRouteId;
  label: string;
  detail: string;
}[] = [
  {
    id: "known-security-area",
    label: "Abrir a área de segurança pela intranet ou aplicativo já conhecido",
    detail: "A rota existia antes do incidente e não foi fornecida pela mensagem.",
  },
  {
    id: "message-link",
    label: "Usar o endereço enviado pelo suposto suporte",
    detail: "O próprio contato suspeito continuaria escolhendo o destino da verificação.",
  },
  {
    id: "first-search-result",
    label: "Pesquisar o serviço e abrir o primeiro resultado",
    detail: "A posição na busca não comprova que o endereço pertence ao serviço.",
  },
] as const;

const consoleActionOptions: readonly {
  id: MfaOfficialConsoleActionId;
  label: string;
  detail: string;
}[] = [
  {
    id: "review-events",
    label: "Revisar os eventos de autenticação",
    detail: "Comparar horário, dispositivo, localização e finalidade.",
  },
  {
    id: "end-unrecognized-sessions",
    label: "Solicitar encerramento das sessões não reconhecidas",
    detail: "Neste protótipo, a ação é apenas simulada e não altera uma conta real.",
  },
  {
    id: "request-account-recovery",
    label: "Iniciar recuperação pelo processo oficial",
    detail: "Necessário quando o caso informa que uma aprovação já aconteceu.",
  },
  {
    id: "keep-everything",
    label: "Manter todas as sessões para não interromper o trabalho",
    detail: "Isso preserva também a sessão que pode ter sido aberta por outra pessoa.",
  },
] as const;

const reportOptions: readonly {
  id: MfaReportDetailId;
  label: string;
  detail: string;
}[] = [
  { id: "event-times", label: "Horários das solicitações", detail: "Ajuda a localizar os eventos sem revelar nenhum segredo." },
  { id: "device-and-location", label: "Dispositivos e localizações exibidos", detail: "Registra os dados observados na área simulada." },
  { id: "support-contact", label: "Canal e horário do contato de suposto suporte", detail: "Preserva o contexto da abordagem para investigação." },
  { id: "actions-taken", label: "O que foi aprovado, negado ou revisado", detail: "Relatar cedo permite uma resposta proporcional e sem culpa." },
  { id: "password-or-code", label: "Senha ou código de autenticação", detail: "Segredos não devem ser incluídos em reportes." },
  { id: "hide-approval", label: "Omitir uma aprovação que aconteceu", detail: "Esconder o fato impede que a equipe avalie a exposição real." },
] as const;

const transferActionOptions: readonly {
  id: MfaTransferActionId;
  label: string;
}[] = [
  { id: "approve", label: "Aprovar porque o pedido parece normal" },
  { id: "deny-and-open-official", label: "Negar e abrir a área oficial por uma rota já conhecida" },
  { id: "reply-with-code", label: "Responder ao contato com o código" },
  { id: "ignore", label: "Ignorar sem revisar nem registrar" },
] as const;

type Props = {
  prerequisitesCompleted: boolean;
  senderLabCompleted: boolean;
  domainLabCompleted: boolean;
  existingResult: MissionResult | MfaConsoleV2Result | null;
  existingSubmission: MfaConsoleV2Submission | null;
  existingCasePackageId: string | null;
  rewardAlreadyClaimed: boolean;
  claimedPoints: number;
  onComplete: (answer: MfaConsoleV2Answer) => Promise<MfaConsoleV2Result>;
  onBackToMissions: () => void;
  onOpenSenderLab: () => void;
  onOpenDomainLab: () => void;
  onOpenRecovery: () => void;
  onOpenProfile: () => void;
};

function optionLabel<T extends string>(
  options: readonly { id: T; label: string }[],
  id: T | undefined,
) {
  return options.find((option) => option.id === id)?.label ?? "Não respondido";
}

export function MfaFatigueMission(props: Props) {
  const {
    prerequisitesCompleted,
    senderLabCompleted,
    domainLabCompleted,
    existingResult,
    existingSubmission,
    existingCasePackageId,
    rewardAlreadyClaimed,
    claimedPoints,
    onComplete,
    onBackToMissions,
    onOpenSenderLab,
    onOpenDomainLab,
    onOpenRecovery,
    onOpenProfile,
  } = props;
  const initialPackageId = existingCasePackageId ?? MFA_CONSOLE_CANONICAL_PACKAGE_ID;
  const [casePackageId, setCasePackageId] = useState(initialPackageId);
  const contentPackage = findMfaConsoleV2Package(casePackageId) ?? MFA_CONSOLE_V2_PACKAGES[0];
  const { content, allowlists } = contentPackage;
  const [stage, setStage] = useState(existingResult ? 7 : 0);
  const [revealedEventCount, setRevealedEventCount] = useState(existingSubmission ? content.events.length : 1);
  const [associationByEventId, setAssociationByEventId] = useState<Record<string, MfaAssociationId>>(() => Object.fromEntries(existingSubmission?.eventInitiationAssociations.map((item) => [item.eventId, item.associationId]) ?? []));
  const [actionByEventId, setActionByEventId] = useState<Record<string, MfaEventActionId>>(() => Object.fromEntries(existingSubmission?.eventActions.map((item) => [item.eventId, item.actionId]) ?? []));
  const [supportResponseIds, setSupportResponseIds] = useState<MfaSupportResponseId[]>(existingSubmission?.supportResponseIds ?? []);
  const [officialEntryRouteId, setOfficialEntryRouteId] = useState<MfaOfficialEntryRouteId | null>(existingSubmission?.officialEntryRouteId ?? null);
  const [officialConsoleActionIds, setOfficialConsoleActionIds] = useState<MfaOfficialConsoleActionId[]>(existingSubmission?.officialConsoleActionIds ?? []);
  const [reportDetailIds, setReportDetailIds] = useState<MfaReportDetailId[]>(existingSubmission?.reportDetailIds ?? []);
  const [transferAssociationId, setTransferAssociationId] = useState<MfaAssociationId | null>(existingSubmission?.transferAssociationId ?? null);
  const [transferActionId, setTransferActionId] = useState<MfaTransferActionId | null>(existingSubmission?.transferActionId ?? null);
  const [displayResult, setDisplayResult] = useState(existingResult);
  const [submittedAnswer, setSubmittedAnswer] = useState<MfaConsoleV2Answer | null>(existingSubmission ? {
    activityId: existingSubmission.activityId,
    activityVersion: existingSubmission.activityVersion,
    casePackageId: existingSubmission.casePackageId,
    mechanicId: existingSubmission.mechanicId,
    eventInitiationAssociations: existingSubmission.eventInitiationAssociations,
    eventActions: existingSubmission.eventActions,
    supportResponseIds: existingSubmission.supportResponseIds,
    officialEntryRouteId: existingSubmission.officialEntryRouteId,
    officialConsoleActionIds: existingSubmission.officialConsoleActionIds,
    reportDetailIds: existingSubmission.reportDetailIds,
    transferAssociationId: existingSubmission.transferAssociationId,
    transferActionId: existingSubmission.transferActionId,
  } : null);
  const [rewardGrantedInAttempt, setRewardGrantedInAttempt] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState("");
  const titleRef = useActivityStageFocus(stage);
  useEffect(() => {
    if (stage !== 7 || !displayResult) return;
    const frame = window.requestAnimationFrame(() => titleRef.current?.focus());
    return () => window.cancelAnimationFrame(frame);
  }, [displayResult, stage, titleRef]);
  const allEventAnswersReady = content.events.every((event) => associationByEventId[event.id] && actionByEventId[event.id]);

  const answerReviewItems = useMemo<ActivityAnswerReviewItem[]>(() => {
    if (!submittedAnswer || !("criticalFailureIds" in (displayResult ?? {}))) {
      if (!displayResult) return [];
      return [{ id: "legacy-result", title: "Tentativa registrada na versão anterior", status: displayResult.needsReview ? "review" : "correct", userAnswer: `${displayResult.score} de 100 pontos`, expectedAnswer: "Refaça para ver a revisão detalhada do novo console", explanation: "A tentativa antiga foi preservada sem inventar respostas que não foram registradas por ela." }];
    }
    const items: ActivityAnswerReviewItem[] = [];
    for (const event of content.events) {
      const association = submittedAnswer.eventInitiationAssociations.find((item) => item.eventId === event.id)?.associationId;
      const action = submittedAnswer.eventActions.find((item) => item.eventId === event.id)?.actionId;
      const correctAssociation = allowlists.correctAssociationByEventId[event.id];
      const correctAction = allowlists.correctActionByEventId[event.id];
      items.push({ id: `${event.id}-association`, title: `${event.timeLabel} · relação com uma ação sua`, status: association === correctAssociation ? "correct" : "review", userAnswer: optionLabel(associationOptions, association), expectedAnswer: optionLabel(associationOptions, correctAssociation), explanation: "A autorização depende de uma ação que você realmente iniciou, ainda ativa, no mesmo serviço e com a mesma finalidade." });
      items.push({ id: `${event.id}-action`, title: `${event.timeLabel} · resposta à solicitação`, status: action === correctAction ? "correct" : "review", userAnswer: optionLabel(eventActionOptions, action), expectedAnswer: optionLabel(eventActionOptions, correctAction), explanation: correctAction === "approve" ? "Este é o caso excepcional em que a solicitação coincide com a sua ação ainda ativa." : "Uma solicitação não iniciada por você deve ser negada ou tratada pela área oficial, nunca aprovada para parar a insistência." });
    }
    const supportSafe = submittedAnswer.supportResponseIds.every((id) => allowlists.safeSupportResponseIds.includes(id)) && submittedAnswer.supportResponseIds.at(-1) === "end-contact";
    items.push({ id: "support", title: "Resposta ao suposto suporte", status: supportSafe ? "correct" : "review", userAnswer: submittedAnswer.supportResponseIds.map((id) => optionLabel(supportOptions, id)).join(" → "), expectedAnswer: optionLabel(supportOptions, "end-contact"), explanation: "Suporte legítimo não precisa que você entregue um código nem aprove uma entrada que não iniciou." });
    items.push({ id: "official-route", title: "Entrada na área de segurança", status: submittedAnswer.officialEntryRouteId === allowlists.correctOfficialEntryRouteId ? "correct" : "review", userAnswer: optionLabel(routeOptions, submittedAnswer.officialEntryRouteId), expectedAnswer: optionLabel(routeOptions, allowlists.correctOfficialEntryRouteId), explanation: "A verificação é independente quando a rota já era conhecida e não foi escolhida pelo contato suspeito." });
    for (const requiredActionId of allowlists.requiredOfficialConsoleActionIds) {
      items.push({ id: `console-${requiredActionId}`, title: optionLabel(consoleActionOptions, requiredActionId), status: submittedAnswer.officialConsoleActionIds.includes(requiredActionId) ? "correct" : "review", userAnswer: submittedAnswer.officialConsoleActionIds.includes(requiredActionId) ? "Selecionada" : "Não selecionada", expectedAnswer: "Selecionar esta medida", explanation: consoleActionOptions.find((option) => option.id === requiredActionId)?.detail ?? "Medida necessária para tratar o caso." });
    }
    const reportSafe = submittedAnswer.reportDetailIds.length === allowlists.safeReportDetailIds.length && allowlists.safeReportDetailIds.every((id) => submittedAnswer.reportDetailIds.includes(id));
    items.push({ id: "report", title: "Conteúdo do reporte", status: reportSafe ? "correct" : "review", userAnswer: submittedAnswer.reportDetailIds.map((id) => optionLabel(reportOptions, id)).join("; "), expectedAnswer: allowlists.safeReportDetailIds.map((id) => optionLabel(reportOptions, id)).join("; "), explanation: "O reporte registra fatos e ações, sem senha, código ou omissão de uma aprovação." });
    items.push({ id: "transfer", title: "Aplicação em uma nova aparência", status: submittedAnswer.transferAssociationId === allowlists.correctTransferAssociationId && submittedAnswer.transferActionId === allowlists.correctTransferActionId ? "correct" : "review", userAnswer: `${optionLabel(associationOptions, submittedAnswer.transferAssociationId)} · ${optionLabel(transferActionOptions, submittedAnswer.transferActionId)}`, expectedAnswer: `${optionLabel(associationOptions, allowlists.correctTransferAssociationId)} · ${optionLabel(transferActionOptions, allowlists.correctTransferActionId)}`, explanation: "A regra continua válida mesmo sem repetição ou ameaça: a solicitação precisa nascer de uma ação sua." });
    return items;
  }, [allowlists, content.events, displayResult, submittedAnswer]);

  if (!prerequisitesCompleted && !existingResult) {
    return (
      <ActivityShell activityId={MFA_CONSOLE_ACTIVITY_ID} className="page-stack mission-page mfa-mission-page">
        <section className="mission-shell mfa-prerequisite-gate">
          <header className="mission-header"><div><span className="section-badge">Confiança sob pressão · Etapa 05</span><h1>Você iniciou este acesso?</h1><p>Antes desta missão, conclua os dois laboratórios que ensinam a verificar identidade e destino.</p></div></header>
          <div className="mfa-prerequisite-content"><h2>Preparação necessária</h2><div className="mfa-prerequisite-list">
            <article className={senderLabCompleted ? "is-complete" : ""}><span>{senderLabCompleted ? "Concluído" : "Pendente"}</span><h3>Quem enviou de verdade?</h3>{!senderLabCompleted ? <button className="text-button" onClick={onOpenSenderLab} type="button">Abrir PhishLab</button> : null}</article>
            <article className={domainLabCompleted ? "is-complete" : ""}><span>{domainLabCompleted ? "Concluído" : "Pendente"}</span><h3>Domínio sob a lupa</h3>{!domainLabCompleted ? <button className="text-button" onClick={onOpenDomainLab} type="button">Abrir PhishLab</button> : null}</article>
          </div><button className="text-button" onClick={onBackToMissions} type="button">← Voltar ao percurso</button></div>
        </section>
      </ActivityShell>
    );
  }

  const toggleConsoleAction = (id: MfaOfficialConsoleActionId) => setOfficialConsoleActionIds((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  const toggleReportDetail = (id: MfaReportDetailId) => setReportDetailIds((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  const resetForPackage = (nextPackageId: string) => {
    const nextPackage = findMfaConsoleV2Package(nextPackageId) ?? MFA_CONSOLE_V2_PACKAGES[0];
    setCasePackageId(nextPackage.casePackageId); setStage(0); setRevealedEventCount(1); setAssociationByEventId({}); setActionByEventId({}); setSupportResponseIds([]); setOfficialEntryRouteId(null); setOfficialConsoleActionIds([]); setReportDetailIds([]); setTransferAssociationId(null); setTransferActionId(null); setDisplayResult(null); setSubmittedAnswer(null); setRewardGrantedInAttempt(false); setSubmissionError("");
  };
  const finish = async () => {
    if (!allEventAnswersReady || supportResponseIds.length === 0 || !officialEntryRouteId || officialConsoleActionIds.length === 0 || reportDetailIds.length === 0 || !transferAssociationId || !transferActionId || isSubmitting) return;
    const answer: MfaConsoleV2Answer = { activityId: MFA_CONSOLE_ACTIVITY_ID, activityVersion: MFA_CONSOLE_ACTIVITY_VERSION, casePackageId: contentPackage.casePackageId, mechanicId: MFA_CONSOLE_MECHANIC_ID, eventInitiationAssociations: content.events.map((event) => ({ eventId: event.id, associationId: associationByEventId[event.id] })), eventActions: content.events.map((event) => ({ eventId: event.id, actionId: actionByEventId[event.id] })), supportResponseIds, officialEntryRouteId, officialConsoleActionIds, reportDetailIds, transferAssociationId, transferActionId };
    setIsSubmitting(true); setSubmissionError("");
    try { const result = await onComplete(answer); setSubmittedAnswer(answer); setDisplayResult(result); setRewardGrantedInAttempt(!rewardAlreadyClaimed); setStage(7); }
    catch { setSubmissionError("Não foi possível registrar a tentativa. Tente novamente."); }
    finally { setIsSubmitting(false); }
  };
  const currentEvent = content.events[Math.min(revealedEventCount - 1, content.events.length - 1)];
  const unsafeApprovalChosen = content.events.some(
    (event) =>
      actionByEventId[event.id] === "approve" &&
      allowlists.correctActionByEventId[event.id] !== "approve",
  );
  const supportNeedsSecondTurn = supportResponseIds.length > 0 && supportResponseIds[0] !== "end-contact";
  const result = displayResult;
  const bonusPoints = result ? result.potentialReward - POINT_RULES.mainMission : 0;
  const bonusPercentage = result ? Math.round(calculatePerformanceBonus(result.score) * 100) : 0;

  return (
    <ActivityShell activityId={MFA_CONSOLE_ACTIVITY_ID} className="page-stack mission-page mfa-mission-page">
      <section className="mission-shell">
        <header className="mission-header"><div><span className="section-badge">Confiança sob pressão · Etapa 05</span><h1>Você iniciou este acesso?</h1><p>Decida quando uma solicitação de autenticação pertence a uma ação sua e trate qualquer interferência por uma área oficial independente.</p></div><div className="mission-meta" aria-label="Informações da missão"><span>Tempo estimado</span><strong>9 minutos</strong><small>{POINT_RULES.mainMission} pontos-base</small></div></header>
        <ActivityProgress steps={steps} currentStep={stage} ariaLabel="Progresso de Você iniciou este acesso" />
        <div className="mission-content" aria-live="polite">
          {stage === 0 ? <div className="mission-briefing"><div className="briefing-copy"><span className="section-kicker">Situação</span><h2 ref={titleRef} tabIndex={-1}>Pedidos de acesso começam a chegar</h2><p>{content.situation}</p>{content.priorExposureNote ? <div className="briefing-callout"><span aria-hidden="true">!</span><p>{content.priorExposureNote}</p></div> : null}<p>Todo o ambiente é fictício. Nenhuma aprovação, sessão, recuperação ou comunicação real será executada.</p></div><div className="briefing-objectives mfa-briefing-context"><span className="section-kicker">O que você fará</span><h3>{content.pathLabel}</h3><p>{content.summary}</p><p><strong>Seu papel:</strong> {content.role}</p><p><strong>O que proteger:</strong> {content.protectedConsequence}</p><button className="primary-button dark" type="button" onClick={() => setStage(1)}>Abrir console simulado</button></div></div> : null}

          {stage === 1 ? <div className="mfa-workspace"><section className="mfa-event-panel" aria-labelledby="mfa-events-title"><span className="simulation-label">Console fictício · nenhum efeito real</span><h2 id="mfa-events-title" ref={titleRef} tabIndex={-1}>Relacione cada pedido ao que você realmente iniciou</h2><p>Primeiro identifique se existe uma ação sua ainda ativa. Depois escolha o que fazer com a solicitação.</p>
            {content.ownActions.length > 0 ? <div className="mfa-request-list">{content.ownActions.map((action) => <article key={action.id}><div><span>{action.timeLabel} · ação registrada por você</span><h3>{action.service}</h3><p>{action.purpose} · desafio {action.challenge}</p></div><strong>{action.status === "active" ? "Ainda ativa" : "Encerrada"}</strong></article>)}</div> : <div className="briefing-callout"><span aria-hidden="true">i</span><p>Você não iniciou nenhuma entrada ou alteração neste período.</p></div>}
            <div className="mfa-request-list">{content.events.slice(0, revealedEventCount).map((event, index) => <article key={event.id} className={index === revealedEventCount - 1 ? "is-critical" : ""}><div><span>{event.timeLabel} · solicitação {index + 1}</span><h3>{event.title}</h3><p>{event.device} · {event.location}</p><p>Serviço: {event.service} · finalidade: {event.purpose} · desafio {event.challenge}</p><small>{event.statusLabel}</small></div><div className="mfa-investigation-panel">
              <fieldset><legend>Este pedido corresponde a qual situação?</legend>{associationOptions.map((option) => <label key={option.id} className="choice-card"><input type="radio" name={`association-${event.id}`} checked={associationByEventId[event.id] === option.id} onChange={() => setAssociationByEventId((current) => ({ ...current, [event.id]: option.id }))} /><span><strong>{option.label}</strong><small>{option.detail}</small></span></label>)}</fieldset>
              <fieldset><legend>O que você faz com esta solicitação?</legend>{eventActionOptions.map((option) => <label key={option.id} className="choice-card"><input type="radio" name={`action-${event.id}`} checked={actionByEventId[event.id] === option.id} onChange={() => setActionByEventId((current) => ({ ...current, [event.id]: option.id }))} /><span><strong>{option.label}</strong><small>{option.detail}</small></span></label>)}</fieldset>
            </div></article>)}</div>
            {revealedEventCount < content.events.length ? <button type="button" className="primary-button dark" disabled={!associationByEventId[currentEvent.id] || !actionByEventId[currentEvent.id]} onClick={() => setRevealedEventCount((count) => count + 1)}>Registrar e mostrar a próxima solicitação</button> : <button type="button" className="primary-button dark" disabled={!allEventAnswersReady} onClick={() => setStage(2)}>Continuar para o contato recebido</button>}
          </section></div> : null}

          {stage === 2 ? <div className="mission-decision-panel"><span className="section-kicker">Contato recebido</span><h2 ref={titleRef} tabIndex={-1}>O suposto suporte tenta orientar sua resposta</h2><p>Este chat surgiu depois das solicitações. Ele não foi aberto por um chamado ou canal que você já conhecia.</p><article className="support-chat-card"><header><strong>{content.supportTurns[0].sender}</strong><span>agora</span></header><p>{unsafeApprovalChosen ? content.supportTurns[0].unsafeBranchMessage : content.supportTurns[0].safeBranchMessage}</p></article>
            <fieldset><legend>Como você responde a este contato?</legend>{supportOptions.map((option) => <label key={option.id} className="choice-card"><input type="radio" name="support-turn-1" checked={supportResponseIds[0] === option.id} onChange={() => setSupportResponseIds([option.id])} /><span><strong>{option.label}</strong><small>{option.detail}</small></span></label>)}</fieldset>
            {supportNeedsSecondTurn ? <><article className="support-chat-card"><header><strong>{content.supportTurns[1].sender}</strong><span>nova pressão</span></header><p>{supportResponseIds[0] === "share-code" || supportResponseIds[0] === "approve-next" ? content.supportTurns[1].unsafeBranchMessage : content.supportTurns[1].safeBranchMessage}</p></article><fieldset><legend>O contato insiste. Qual é sua decisão final?</legend>{supportOptions.map((option) => <label key={option.id} className="choice-card"><input type="radio" name="support-turn-2" checked={supportResponseIds[1] === option.id} onChange={() => setSupportResponseIds((current) => [current[0], option.id])} /><span><strong>{option.label}</strong><small>{option.detail}</small></span></label>)}</fieldset></> : null}
            <div className="mission-actions"><button type="button" className="secondary-button" onClick={() => setStage(1)}>Voltar às solicitações</button><button type="button" className="primary-button dark" disabled={!supportResponseIds[0] || (supportNeedsSecondTurn && !supportResponseIds[1])} onClick={() => setStage(3)}>Sair do chat e localizar a área oficial</button></div>
          </div> : null}

          {stage === 3 ? <div className="mission-decision-panel"><span className="section-kicker">Verificação independente</span><h2 ref={titleRef} tabIndex={-1}>Como você chega à área de segurança?</h2><p>Escolha a origem do endereço. Depois indique as medidas que pediria dentro da área oficial fictícia.</p>
            <fieldset><legend>Qual rota não depende do contato que você está verificando?</legend>{routeOptions.map((option) => <label key={option.id} className="choice-card"><input type="radio" name="official-route" checked={officialEntryRouteId === option.id} onChange={() => setOfficialEntryRouteId(option.id)} /><span><strong>{option.label}</strong><small>{option.detail}</small></span></label>)}</fieldset>
            <section className="mfa-event-panel" aria-label="Área de segurança simulada"><h3>{content.officialArea.title}</h3><p>{content.officialArea.description}</p><div className="mfa-request-list">{content.officialArea.sessions.map((session) => <article key={session.id} className={session.recognized ? "" : "is-critical"}><div><strong>{session.device}</strong><p>{session.location} · {session.lastSeen}</p></div><span>{session.recognized ? "Reconhecida" : "Não reconhecida"}</span></article>)}</div></section>
            <fieldset><legend>Quais medidas você solicita nesta área?</legend>{consoleActionOptions.map((option) => <label key={option.id} className="choice-card"><input type="checkbox" checked={officialConsoleActionIds.includes(option.id)} onChange={() => toggleConsoleAction(option.id)} /><span><strong>{option.label}</strong><small>{option.detail}</small></span></label>)}</fieldset>
            <div className="mission-actions"><button type="button" className="secondary-button" onClick={() => setStage(2)}>Voltar ao contato</button><button type="button" className="primary-button dark" disabled={!officialEntryRouteId || officialConsoleActionIds.length === 0} onClick={() => setStage(4)}>Montar o reporte</button></div>
          </div> : null}

          {stage === 4 ? <div className="mission-decision-panel"><span className="section-kicker">Reporte seguro</span><h2 ref={titleRef} tabIndex={-1}>Quais informações ajudam sem expor segredos?</h2><p>Marque tudo o que deve constar no reporte fictício. O objetivo é registrar o incidente cedo e com fatos suficientes para a equipe agir.</p><fieldset><legend>Informações que você incluiria</legend>{reportOptions.map((option) => <label key={option.id} className="choice-card"><input type="checkbox" checked={reportDetailIds.includes(option.id)} onChange={() => toggleReportDetail(option.id)} /><span><strong>{option.label}</strong><small>{option.detail}</small></span></label>)}</fieldset><div className="mission-actions"><button type="button" className="secondary-button" onClick={() => setStage(3)}>Voltar à área oficial</button><button type="button" className="primary-button dark" disabled={reportDetailIds.length === 0} onClick={() => setStage(5)}>Revisar minhas decisões</button></div></div> : null}

          {stage === 5 ? <div className="mission-decision-panel"><span className="section-kicker">Antes de concluir</span><h2 ref={titleRef} tabIndex={-1}>Revise o processo completo</h2><p>Você ainda pode voltar e alterar qualquer parte. Nenhuma resposta foi avaliada até aqui.</p><div className="mfa-prerequisite-list"><article><span>Solicitações</span><h3>{content.events.length} avaliadas</h3><button type="button" className="text-button" onClick={() => setStage(1)}>Revisar solicitações</button></article><article><span>Contato</span><h3>{supportResponseIds.length} resposta(s)</h3><button type="button" className="text-button" onClick={() => setStage(2)}>Revisar contato</button></article><article><span>Área oficial</span><h3>{officialConsoleActionIds.length} medida(s)</h3><button type="button" className="text-button" onClick={() => setStage(3)}>Revisar área</button></article><article><span>Reporte</span><h3>{reportDetailIds.length} informação(ões)</h3><button type="button" className="text-button" onClick={() => setStage(4)}>Revisar reporte</button></article></div><button type="button" className="primary-button dark" onClick={() => setStage(6)}>Aplicar a regra em um novo pedido</button></div> : null}

          {stage === 6 ? <div className="mission-decision-panel"><span className="section-kicker">Transferência curta</span><h2 ref={titleRef} tabIndex={-1}>{content.transfer.title}</h2><p>{content.transfer.context}</p><article className="mfa-request-list is-critical"><div><span>{content.transfer.event.timeLabel}</span><h3>{content.transfer.event.title}</h3><p>{content.transfer.event.device} · {content.transfer.event.location}</p><small>{content.transfer.event.statusLabel}</small></div></article>
            <fieldset><legend>Este pedido corresponde a qual situação?</legend>{associationOptions.map((option) => <label key={option.id} className="choice-card"><input type="radio" name="transfer-association" checked={transferAssociationId === option.id} onChange={() => setTransferAssociationId(option.id)} /><span><strong>{option.label}</strong><small>{option.detail}</small></span></label>)}</fieldset>
            <fieldset><legend>Qual é sua resposta?</legend>{transferActionOptions.map((option) => <label key={option.id} className="choice-card"><input type="radio" name="transfer-action" checked={transferActionId === option.id} onChange={() => setTransferActionId(option.id)} /><span><strong>{option.label}</strong></span></label>)}</fieldset>
            <ActivityError message={submissionError} /><div className="mission-actions"><button type="button" className="secondary-button" onClick={() => setStage(5)}>Voltar à revisão</button><button type="button" className="primary-button dark" disabled={!transferAssociationId || !transferActionId || isSubmitting} onClick={finish}>{isSubmitting ? "Avaliando…" : "Concluir missão"}</button></div>
          </div> : null}

          {stage === 7 && result ? <div className="mission-result"><div className="result-hero"><div className="score-ring" aria-label={`Pontuação ${result.score} de 100`}><strong>{result.score}</strong><span>/100</span></div><div><span className="section-kicker">Resultado privado</span><h2 ref={titleRef} tabIndex={-1}>{result.needsReview ? "Há decisões importantes para revisar" : "Processo seguro concluído"}</h2><p>A repetição, a aparência do aplicativo e a fala do suporte não substituem uma ação iniciada por você nem uma verificação independente.</p></div></div><div className="reward-card"><span>Recompensa desta atividade</span><strong>+{rewardGrantedInAttempt ? result.potentialReward : claimedPoints} pontos</strong><small>{rewardGrantedInAttempt ? `${POINT_RULES.mainMission} base + ${bonusPoints} de bônus (${bonusPercentage}%)` : rewardAlreadyClaimed ? "A primeira conclusão já concedeu a recompensa; repetições não duplicam pontos." : "Tentativa anterior preservada."}</small></div><ActivityAnswerReview items={answerReviewItems} /><div className="mission-actions"><button type="button" className="primary-button dark" onClick={() => setStage(8)}>Ver debrief</button><button type="button" className="secondary-button" onClick={() => resetForPackage(contentPackage.casePackageId)}>Refazer este caso</button></div></div> : null}

          {stage === 8 ? <div className="mission-decision-panel"><span className="section-kicker">Debrief</span><h2 ref={titleRef} tabIndex={-1}>A pergunta central é “eu iniciei isto?”</h2><p>Uma solicitação só deve ser aprovada quando nasce de uma ação sua ainda ativa e os detalhes exibidos correspondem ao serviço, finalidade e desafio esperados. Se isso não ocorrer, negue e use uma rota oficial que já existia antes da mensagem.</p><p>Se uma aprovação ou código já foi entregue, não esconda o ocorrido: interrompa o contato, revise sessões, inicie a recuperação adequada e reporte rapidamente. O erro não elimina a possibilidade de contenção.</p><div className="mission-actions"><button type="button" className="primary-button dark" onClick={onOpenRecovery}>Continuar para “Cliquei. E agora?”</button><button type="button" className="secondary-button" onClick={() => { const currentIndex = MFA_CONSOLE_V2_PACKAGES.findIndex((item) => item.casePackageId === contentPackage.casePackageId); const next = MFA_CONSOLE_V2_PACKAGES[(currentIndex + 1) % MFA_CONSOLE_V2_PACKAGES.length]; resetForPackage(next.casePackageId); }}>Praticar com outro caso</button><button type="button" className="text-button" onClick={onOpenProfile}>Ver meu perfil</button><button type="button" className="text-button" onClick={onBackToMissions}>Voltar ao percurso</button></div></div> : null}
        </div>
      </section>
    </ActivityShell>
  );
}
