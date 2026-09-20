"use client";

import { useEffect, useMemo, useState } from "react";

import {
  AlertTriangle,
  Building2,
  Check,
  ChevronDown,
  CircleSlash,
  CornerUpLeft,
  Hash,
  Headset,
  KeyRound,
  Laptop,
  Link2,
  LogIn,
  MapPin,
  Search,
  ShieldCheck,
  ShieldQuestion,
  Smartphone,
  Target,
  XCircle,
  type LucideIcon,
} from "lucide-react";

import { ActivityShell } from "@/features/activities/ActivityShell";
import {
  Icon,
  LessonShell,
  Note,
  StageHeading,
  lessonStyles as s,
} from "@/features/activities/lesson/LessonShell";
import { Mascot } from "@/features/ui/LearningUI";
import {
  ActivityAnswerReview,
  type ActivityAnswerReviewItem,
} from "@/features/activities/primitives/ActivityAnswerReview";
import { ActivityNextStep } from "@/features/activities/primitives/ActivityNextStep";
import { useActivityStageFocus } from "@/features/activities/useActivityStageFocus";
import { usePostSubmitCelebration } from "@/features/activities/usePostSubmitCelebration";
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
import type { AchievementDefinition } from "@/lib/content/achievement-catalog";
import type {
  MfaConsoleV2Answer,
  MfaConsoleV2Result,
  MfaConsoleV2Submission,
  MissionResult,
} from "@/lib/domain/types";

const steps = ["Pedidos", "Mensagem", "Conta", "Reporte", "Praticar"] as const;
const LAST_STEP = steps.length - 1;

const associationOptions: readonly {
  id: MfaAssociationId;
  label: string;
  detail: string;
  icon: LucideIcon;
}[] = [
  {
    id: "active-self-action",
    label: "Eu iniciei este acesso e ainda estou entrando",
    detail: "O serviço, o motivo e o número batem com o que você está fazendo.",
    icon: LogIn,
  },
  {
    id: "ended-self-action",
    label: "Meu acesso anterior já terminou",
    detail: "Um acesso que já acabou não autoriza um pedido novo.",
    icon: CircleSlash,
  },
  {
    id: "no-self-action",
    label: "Não iniciei este acesso",
    detail: "A cara da notificação não diz quem pediu o acesso.",
    icon: AlertTriangle,
  },
] as const;

const eventActionOptions: readonly {
  id: MfaEventActionId;
  label: string;
  detail: string;
  icon: LucideIcon;
}[] = [
  {
    id: "approve",
    label: "Aprovar acesso",
    detail: "Só quando foi você mesmo, agora, e tudo bate.",
    icon: Check,
  },
  {
    id: "deny",
    label: "Negar acesso",
    detail: "Bloqueia a entrada de quem está pedindo.",
    icon: XCircle,
  },
  {
    id: "review-official",
    label: "Conferir no aplicativo da empresa",
    detail: "Entrar pelo caminho que você já usava antes.",
    icon: Smartphone,
  },
] as const;

const supportOptions: readonly {
  id: MfaSupportResponseId;
  label: string;
  detail: string;
  icon: LucideIcon;
}[] = [
  {
    id: "end-contact",
    label: "Encerrar conversa",
    detail: "Depois você confere sozinho, pelo app da empresa.",
    icon: ShieldCheck,
  },
  {
    id: "refuse-and-question",
    label: "Recusar e pedir uma explicação",
    detail: "Não entrega o código, mas deixa a pessoa continuar te pressionando.",
    icon: CornerUpLeft,
  },
  {
    id: "share-code",
    label: "Enviar o código",
    detail: "O código é sua chave. Nunca se manda para ninguém.",
    icon: KeyRound,
  },
  {
    id: "approve-next",
    label: "Aprovar o próximo pedido",
    detail: "Aprovar não faz o pedido sumir. Faz a pessoa entrar.",
    icon: Check,
  },
] as const;

const routeOptions: readonly {
  id: MfaOfficialEntryRouteId;
  label: string;
  detail: string;
  icon: LucideIcon;
}[] = [
  {
    id: "known-security-area",
    label: "Abrir o aplicativo da empresa",
    detail: "Esse caminho já existia antes da mensagem chegar.",
    icon: Smartphone,
  },
  {
    id: "message-link",
    label: "Abrir o link recebido no chat",
    detail: "Quem mandou o link escolhe onde você vai parar.",
    icon: Link2,
  },
  {
    id: "first-search-result",
    label: "Abrir o primeiro resultado da busca",
    detail: "Aparecer primeiro no Google não prova que o site é o certo.",
    icon: Search,
  },
] as const;

const consoleActionOptions: readonly {
  id: MfaOfficialConsoleActionId;
  label: string;
  detail: string;
}[] = [
  {
    id: "review-events",
    label: "Ver os acessos recentes",
    detail: "Conferir horário, aparelho e lugar de cada acesso.",
  },
  {
    id: "end-unrecognized-sessions",
    label: "Desconectar quem você não reconhece",
    detail: "Tira da conta os aparelhos estranhos.",
  },
  {
    id: "request-account-recovery",
    label: "Iniciar a recuperação da conta",
    detail: "Necessário quando alguma aprovação já passou.",
  },
  {
    id: "keep-everything",
    label: "Deixar tudo como está",
    detail: "Deixa conectado também quem entrou sem você saber.",
  },
] as const;

const reportOptions: readonly {
  id: MfaReportDetailId;
  label: string;
  detail: string;
}[] = [
  { id: "event-times", label: "A que horas os pedidos chegaram", detail: "Ajuda a achar os pedidos, sem revelar segredo." },
  { id: "device-and-location", label: "Os aparelhos e lugares que apareceram", detail: "É o que estava escrito na tela." },
  { id: "support-contact", label: "Por onde e quando o falso suporte falou", detail: "Mostra como a abordagem começou." },
  { id: "actions-taken", label: "O que você aprovou, negou ou conferiu", detail: "Contar logo ajuda, e ninguém vai te culpar." },
  { id: "password-or-code", label: "Sua senha ou código", detail: "Isso nunca entra em um reporte." },
  { id: "hide-approval", label: "Esconder uma aprovação que aconteceu", detail: "Esconder impede a equipe de medir o estrago." },
] as const;

const transferActionOptions: readonly {
  id: MfaTransferActionId;
  label: string;
  icon: LucideIcon;
}[] = [
  { id: "approve", label: "Aprovar, porque o pedido parece normal", icon: Check },
  { id: "deny-and-open-official", label: "Negar e conferir pelo app da empresa", icon: ShieldCheck },
  { id: "reply-with-code", label: "Mandar o código para a pessoa", icon: KeyRound },
  { id: "ignore", label: "Ignorar e não contar para ninguém", icon: CircleSlash },
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
  getUnlockedAchievementIds: () => Set<string>;
  getNewlyUnlockedAchievements: (beforeIds: Set<string>) => AchievementDefinition[];
};

function OptionList<T extends string>({
  legend,
  options,
  value,
  onChange,
}: {
  legend: string;
  options: readonly { id: T; label: string; detail?: string; icon?: LucideIcon }[];
  value: T | null;
  onChange: (value: T) => void;
}) {
  return (
    <div className={s.choices} role="group" aria-label={legend}>
      {options.map((option) => (
        <button
          key={option.id}
          type="button"
          className={s.choice}
          aria-pressed={value === option.id}
          onClick={() => onChange(option.id)}
        >
          {option.icon ? <Icon icon={option.icon} size={20} /> : null}
          <span>
            {option.label}
            {option.detail ? <small>{option.detail}</small> : null}
          </span>
          {value === option.id ? (
            <span className={s.choiceMark}>
              <Icon icon={Check} size={18} />
            </span>
          ) : null}
        </button>
      ))}
    </div>
  );
}

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
    getUnlockedAchievementIds,
    getNewlyUnlockedAchievements,
  } = props;
  const celebration = usePostSubmitCelebration("Você iniciou este acesso?", "var(--learn-lime)");
  const initialPackageId = existingCasePackageId ?? MFA_CONSOLE_CANONICAL_PACKAGE_ID;
  const [casePackageId, setCasePackageId] = useState(initialPackageId);
  const contentPackage = findMfaConsoleV2Package(casePackageId) ?? MFA_CONSOLE_V2_PACKAGES[0];
  const { content, allowlists } = contentPackage;
  const [stage, setStage] = useState(0);
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
  const titleRef = useActivityStageFocus(stage, Boolean(celebration.screen));
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
      <ActivityShell activityId={MFA_CONSOLE_ACTIVITY_ID} className={s.page}>
        <header className={s.header}>
          <span className={s.eyebrow}>
            <span />
            MISSÃO 05
            <span className={s.eyebrowDivider}>/</span>
            PEDIDOS DE ACESSO
          </span>
          <h1>Você iniciou este acesso?</h1>
        </header>
        <div className={s.workspace}>
          <StageHeading
            label="ANTES DE COMEÇAR"
            title="Faltam dois laboratórios"
            instruction="Esta missão usa o que você aprende neles. Conclua os dois e volte."
          />
          <div className={s.sessionList}>
            <div className={`${s.sessionRow} ${senderLabCompleted ? "" : s.alert}`}>
              <Icon icon={senderLabCompleted ? Check : AlertTriangle} size={20} />
              <div>
                <strong>Quem enviou de verdade?</strong>
                <small>{senderLabCompleted ? "Concluído" : "Ainda não foi feito"}</small>
              </div>
              {senderLabCompleted ? null : (
                <button type="button" className={s.choice} onClick={onOpenSenderLab}>Abrir</button>
              )}
            </div>
            <div className={`${s.sessionRow} ${domainLabCompleted ? "" : s.alert}`}>
              <Icon icon={domainLabCompleted ? Check : AlertTriangle} size={20} />
              <div>
                <strong>Domínio sob a lupa</strong>
                <small>{domainLabCompleted ? "Concluído" : "Ainda não foi feito"}</small>
              </div>
              {domainLabCompleted ? null : (
                <button type="button" className={s.choice} onClick={onOpenDomainLab}>Abrir</button>
              )}
            </div>
          </div>
        </div>
      </ActivityShell>
    );
  }

  const toggleConsoleAction = (id: MfaOfficialConsoleActionId) => setOfficialConsoleActionIds((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  const toggleReportDetail = (id: MfaReportDetailId) => setReportDetailIds((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  const resetForPackage = (nextPackageId: string) => {
    const nextPackage = findMfaConsoleV2Package(nextPackageId) ?? MFA_CONSOLE_V2_PACKAGES[0];
    setCasePackageId(nextPackage.casePackageId); setStage(0); setRevealedEventCount(1); setAssociationByEventId({}); setActionByEventId({}); setSupportResponseIds([]); setOfficialEntryRouteId(null); setOfficialConsoleActionIds([]); setReportDetailIds([]); setTransferAssociationId(null); setTransferActionId(null); setDisplayResult(null); setSubmittedAnswer(null); setRewardGrantedInAttempt(false); setSubmissionError("");
    celebration.reset();
  };
  const finish = async () => {
    if (!allEventAnswersReady || supportResponseIds.length === 0 || !officialEntryRouteId || officialConsoleActionIds.length === 0 || reportDetailIds.length === 0 || !transferAssociationId || !transferActionId || isSubmitting) return;
    const answer: MfaConsoleV2Answer = { activityId: MFA_CONSOLE_ACTIVITY_ID, activityVersion: MFA_CONSOLE_ACTIVITY_VERSION, casePackageId: contentPackage.casePackageId, mechanicId: MFA_CONSOLE_MECHANIC_ID, eventInitiationAssociations: content.events.map((event) => ({ eventId: event.id, associationId: associationByEventId[event.id] })), eventActions: content.events.map((event) => ({ eventId: event.id, actionId: actionByEventId[event.id] })), supportResponseIds, officialEntryRouteId, officialConsoleActionIds, reportDetailIds, transferAssociationId, transferActionId };
    setIsSubmitting(true); setSubmissionError("");
    const beforeIds = getUnlockedAchievementIds();
    try { const result = await onComplete(answer); setSubmittedAnswer(answer); setDisplayResult(result); setRewardGrantedInAttempt(!rewardAlreadyClaimed); celebration.begin(getNewlyUnlockedAchievements(beforeIds)); }
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

  if (celebration.screen) return celebration.screen;

  if (result) {
    return (
      <div className={s.page}>
        <div className={s.result}>
          <div className={s.resultHero}>
            <Mascot pose={result.needsReview ? "explaining" : "celebration"} size="medium" />
            <div>
              <span className={s.microLabel}>
                {result.needsReview ? "CONCLUÍDO · HÁ O QUE REVER" : "CONCLUÍDO"}
              </span>
              <h3>
                {result.needsReview
                  ? "Você chegou ao fim. Vamos rever algumas respostas?"
                  : "Você não aprovou o que não era seu."}
              </h3>
              <p>
                Insistência, tela bonita e alguém dizendo que é do suporte não valem como
                autorização. Só vale um acesso que você mesmo começou.
              </p>
            </div>
          </div>
          <details className={s.review} open>
            <summary>
              Rever minhas respostas
              <span>{result.score}/100 · só você vê</span>
              <Icon icon={ChevronDown} size={18} />
            </summary>
            <ActivityAnswerReview items={answerReviewItems} />
          </details>
          <ActivityNextStep area="Missões" title="Cliquei. E agora?" onOpen={onOpenRecovery} />
          <div className="activity-completion-actions" aria-label="Ações após a conclusão">
            <button type="button" className="activity-completion-button" onClick={() => resetForPackage(contentPackage.casePackageId)}>Praticar novamente</button>
            <button type="button" className="activity-completion-button" onClick={onBackToMissions}>Voltar às missões</button>
            <button type="button" className="activity-completion-button" onClick={onOpenProfile}>Meu perfil</button>
          </div>
        </div>
      </div>
    );
  }

  const lastEventReached = revealedEventCount >= content.events.length;
  const pending = [
    !associationByEventId[currentEvent.id] || !actionByEventId[currentEvent.id]
      ? "Responda as duas perguntas deste pedido."
      : lastEventReached && !allEventAnswersReady
        ? "Ainda falta responder algum pedido."
        : null,
    !supportResponseIds[0]
      ? "Escolha como responder a mensagem."
      : supportNeedsSecondTurn && !supportResponseIds[1]
        ? "A pessoa insistiu. Escolha sua resposta final."
        : null,
    officialEntryRouteId !== allowlists.correctOfficialEntryRouteId
      ? "Escolha um caminho que já existia antes da mensagem."
      : officialConsoleActionIds.length === 0
        ? "Escolha o que fazer na sua conta."
        : null,
    reportDetailIds.length === 0 ? "Marque o que você vai contar para a segurança." : null,
    !transferAssociationId
      ? "Diga se foi você quem pediu este acesso."
      : !transferActionId
        ? "Escolha sua resposta."
        : null,
  ][stage];

  function advance() {
    // A primeira etapa mostra um pedido por vez antes de liberar a próxima.
    if (stage === 0 && !lastEventReached) {
      setRevealedEventCount((count) => count + 1);
      return;
    }
    if (stage === LAST_STEP) {
      void finish();
      return;
    }
    setStage(stage + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <LessonShell
      activityId={MFA_CONSOLE_ACTIVITY_ID}
      area="MISSÃO 05"
      topic="PEDIDOS DE ACESSO"
      title="Você iniciou este acesso?"
      steps={steps}
      stage={stage}
      pending={pending}
      nextLabel={
        stage === 0 && !lastEventReached
          ? "Próximo pedido"
          : stage === LAST_STEP
            ? "Concluir"
            : "Continuar"
      }
      onNext={advance}
      onStageSelect={setStage}
      busy={isSubmitting}
      error={submissionError}
    >
      {stage === 0 ? (
        <>
          <StageHeading
            label="O QUE ESTÁ ACONTECENDO"
            title="Começaram a chegar pedidos de acesso"
            instruction="Para cada pedido, diga se foi você que começou e escolha o que fazer."
            titleRef={titleRef}
          />
          <div style={{ marginBottom: 24 }}>
            <Note title="A situação">{content.situation}</Note>
          </div>
          {content.priorExposureNote ? (
            <div style={{ marginBottom: 24 }}>
              <Note title="Atenção">{content.priorExposureNote}</Note>
            </div>
          ) : null}

          <div className={s.panel}>
            <span className={s.panelLabel}>O QUE VOCÊ ESTÁ FAZENDO AGORA</span>
            {content.ownActions.length > 0 ? (
              <div className={s.sessionList}>
                {content.ownActions.map((action) => (
                  <div key={action.id} className={s.sessionRow}>
                    <Icon icon={action.status === "active" ? LogIn : CircleSlash} size={20} />
                    <div>
                      <strong>{action.service}</strong>
                      <small>{action.timeLabel} · {action.purpose} · número {action.challenge}</small>
                    </div>
                    <span className={s.requestStatus}>
                      {action.status === "active" ? "Ainda ativo" : "Já terminou"}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className={s.sessionRow}>
                <Icon icon={CircleSlash} size={20} />
                <div>
                  <strong>Nada</strong>
                  <small>Você não começou nenhum acesso neste período.</small>
                </div>
              </div>
            )}
          </div>

          {content.events.slice(revealedEventCount - 1, revealedEventCount).map((event) => (
            <div key={event.id} style={{ marginTop: 24 }}>
              <span className={s.requestCounter}>
                PEDIDO {revealedEventCount} DE {content.events.length} · {event.timeLabel}
              </span>
              <div className={`${s.requestCard} ${s.alert}`}>
                <span className={s.requestIcon}>
                  <Icon icon={ShieldQuestion} size={22} />
                </span>
                <div className={s.requestBody}>
                  <strong>{event.title}</strong>
                  <div className={s.requestFacts}>
                    <span><Icon icon={Laptop} size={15} />{event.device}</span>
                    <span><Icon icon={MapPin} size={15} />{event.location}</span>
                    <span><Icon icon={Hash} size={15} />número {event.challenge}</span>
                  </div>
                  <div className={s.requestFacts}>
                    <span><Icon icon={Building2} size={15} />{event.service}</span>
                    <span><Icon icon={Target} size={15} />{event.purpose}</span>
                  </div>
                </div>
                <span className={`${s.requestStatus} ${s.warn}`}>{event.statusLabel}</span>
              </div>

              <div className={s.decisionBlock} style={{ marginTop: 24 }}>
                <h3><span className={s.taskNumber}>1</span> Foi você que começou este acesso?</h3>
                <OptionList
                  legend="Foi você que começou este acesso?"
                  options={associationOptions}
                  value={associationByEventId[event.id] ?? null}
                  onChange={(id) => setAssociationByEventId((current) => ({ ...current, [event.id]: id }))}
                />
              </div>
              <div className={s.decisionBlock}>
                <h3><span className={s.taskNumber}>2</span> O que você faz com ele?</h3>
                <OptionList
                  legend="O que você faz com ele?"
                  options={eventActionOptions}
                  value={actionByEventId[event.id] ?? null}
                  onChange={(id) => setActionByEventId((current) => ({ ...current, [event.id]: id }))}
                />
              </div>
            </div>
          ))}
        </>
      ) : null}

      {stage === 1 ? (
        <>
          <StageHeading
            label="A MENSAGEM"
            title="Chegou uma mensagem do suporte"
            instruction="Este chat apareceu depois dos pedidos. Você não abriu chamado nenhum."
            titleRef={titleRef}
          />
          <div className={s.chat}>
            <div className={s.bubbleRow}>
              <span className={s.avatar}><Icon icon={Headset} size={18} /></span>
              <div className={s.bubble}>
                <div className={s.bubbleHead}>
                  <strong>{content.supportTurns[0].sender}</strong>
                  <span className={s.bubbleTime}>agora</span>
                </div>
                <p className={s.bubbleBody}>
                  {unsafeApprovalChosen
                    ? content.supportTurns[0].unsafeBranchMessage
                    : content.supportTurns[0].safeBranchMessage}
                </p>
              </div>
            </div>
          </div>
          <div className={s.decisionBlock} style={{ marginTop: 24 }}>
            <h3><span className={s.taskNumber}>1</span> Como você responde?</h3>
            <OptionList
              legend="Como você responde?"
              options={supportOptions}
              value={supportResponseIds[0] ?? null}
              onChange={(id) => setSupportResponseIds([id])}
            />
          </div>
          {supportNeedsSecondTurn ? (
            <>
              <div className={s.chat} style={{ marginTop: 28 }}>
                <div className={s.bubbleRow}>
                  <span className={s.avatar}><Icon icon={Headset} size={18} /></span>
                  <div className={s.bubble}>
                    <div className={s.bubbleHead}>
                      <strong>{content.supportTurns[1].sender}</strong>
                      <span className={s.bubbleTime}>insistindo</span>
                    </div>
                    <p className={s.bubbleBody}>
                      {supportResponseIds[0] === "share-code" || supportResponseIds[0] === "approve-next"
                        ? content.supportTurns[1].unsafeBranchMessage
                        : content.supportTurns[1].safeBranchMessage}
                    </p>
                  </div>
                </div>
              </div>
              <div className={s.decisionBlock} style={{ marginTop: 24 }}>
                <h3><span className={s.taskNumber}>2</span> A pessoa insistiu. E agora?</h3>
                <OptionList
                  legend="A pessoa insistiu. E agora?"
                  options={supportOptions}
                  value={supportResponseIds[1] ?? null}
                  onChange={(id) => setSupportResponseIds((current) => [current[0], id])}
                />
              </div>
            </>
          ) : null}
        </>
      ) : null}

      {stage === 2 ? (
        <>
          <StageHeading
            label="SUA CONTA"
            title="Vá conferir a sua conta"
            instruction="Escolha como entrar. Depois veja quem está conectado e decida o que fazer."
            titleRef={titleRef}
          />
          <div className={s.decisionBlock}>
            <h3><span className={s.taskNumber}>1</span> Como você abriria sua conta?</h3>
            <OptionList
              legend="Como você abriria sua conta?"
              options={routeOptions}
              value={officialEntryRouteId}
              onChange={setOfficialEntryRouteId}
            />
          </div>
          {officialEntryRouteId === allowlists.correctOfficialEntryRouteId ? (
            <>
              <div className={s.panel} style={{ marginTop: 28 }}>
                <span className={s.panelLabel}>QUEM ESTÁ CONECTADO NA SUA CONTA</span>
                <div className={s.sessionList}>
                  {content.officialArea.sessions.map((session) => (
                    <div
                      key={session.id}
                      className={`${s.sessionRow} ${session.recognized ? "" : s.alert}`}
                    >
                      <Icon icon={session.recognized ? Laptop : AlertTriangle} size={20} />
                      <div>
                        <strong>{session.device}</strong>
                        <small>{session.location} · {session.lastSeen}</small>
                      </div>
                      <span className={`${s.requestStatus} ${session.recognized ? "" : s.warn}`}>
                        {session.recognized ? "Você reconhece" : "Você não reconhece"}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <div className={s.decisionBlock} style={{ marginTop: 28 }}>
                <h3><span className={s.taskNumber}>2</span> O que você faz aqui?</h3>
                <p className={s.multiHint}>Pode marcar mais de uma.</p>
                <div className={s.choices} role="group" aria-label="O que você faz aqui?">
                  {consoleActionOptions.map((option) => (
                    <button
                      key={option.id}
                      type="button"
                      className={s.choice}
                      aria-pressed={officialConsoleActionIds.includes(option.id)}
                      onClick={() => toggleConsoleAction(option.id)}
                    >
                      <span className={s.checkMark}><Icon icon={Check} size={15} /></span>
                      <span>{option.label}<small>{option.detail}</small></span>
                    </button>
                  ))}
                </div>
              </div>
            </>
          ) : officialEntryRouteId ? (
            <div style={{ marginTop: 24 }}>
              <Note title="Esse caminho não serve">
                Ele não garante que você chegou mesmo na empresa. Escolha o aplicativo da empresa.
              </Note>
            </div>
          ) : null}
        </>
      ) : null}

      {stage === 3 ? (
        <>
          <StageHeading
            label="O REPORTE"
            title="O que contar para a segurança"
            instruction="Marque tudo o que ajuda. Cuidado: nem tudo aqui deve ser enviado."
            titleRef={titleRef}
          />
          <div className={s.choices} role="group" aria-label="O que contar para a segurança">
            {reportOptions.map((option) => (
              <button
                key={option.id}
                type="button"
                className={s.choice}
                aria-pressed={reportDetailIds.includes(option.id)}
                onClick={() => toggleReportDetail(option.id)}
              >
                <span className={s.checkMark}><Icon icon={Check} size={15} /></span>
                <span>{option.label}<small>{option.detail}</small></span>
              </button>
            ))}
          </div>
        </>
      ) : null}

      {stage === 4 ? (
        <>
          <StageHeading
            label="AGORA NA PRÁTICA"
            title={content.transfer.title}
            instruction={content.transfer.context}
            titleRef={titleRef}
          />
          <div className={`${s.requestCard} ${s.alert}`}>
            <span className={s.requestIcon}><Icon icon={ShieldQuestion} size={22} /></span>
            <div className={s.requestBody}>
              <strong>{content.transfer.event.title}</strong>
              <div className={s.requestFacts}>
                <span><Icon icon={Laptop} size={15} />{content.transfer.event.device}</span>
                <span><Icon icon={MapPin} size={15} />{content.transfer.event.location}</span>
              </div>
            </div>
            <span className={`${s.requestStatus} ${s.warn}`}>{content.transfer.event.statusLabel}</span>
          </div>
          <div className={s.decisionBlock} style={{ marginTop: 28 }}>
            <h3><span className={s.taskNumber}>1</span> Foi você que começou este acesso?</h3>
            <OptionList
              legend="Foi você que começou este acesso?"
              options={associationOptions}
              value={transferAssociationId}
              onChange={setTransferAssociationId}
            />
          </div>
          <div className={s.decisionBlock}>
            <h3><span className={s.taskNumber}>2</span> O que você faz?</h3>
            <OptionList
              legend="O que você faz?"
              options={transferActionOptions}
              value={transferActionId}
              onChange={setTransferActionId}
            />
          </div>
        </>
      ) : null}
    </LessonShell>
  );
}
