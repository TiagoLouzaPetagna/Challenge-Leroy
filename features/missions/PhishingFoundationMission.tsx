"use client";

import { useEffect, useState, type ReactNode } from "react";

import { ActivityShell } from "@/features/activities/ActivityShell";
import { ActivityAnswerReview } from "@/features/activities/primitives/ActivityAnswerReview";
import { ActivityError } from "@/features/activities/primitives/ActivityError";
import { useActivityStageFocus } from "@/features/activities/useActivityStageFocus";
import { Mascot } from "@/features/ui/LearningUI";
import {
  FOUNDATION_ASSESSMENT_OPTIONS,
  FOUNDATION_ASSET_OPTIONS,
  FOUNDATION_CONFIRMATION_OPTIONS,
  FOUNDATION_CONSEQUENCE_OPTIONS,
  FOUNDATION_EVALUATION_OPTIONS,
  FOUNDATION_FINAL_ACTION_OPTIONS,
  FOUNDATION_PAUSE_OPTIONS,
  FOUNDATION_REPORT_OPTIONS,
  FOUNDATION_REQUESTED_ACTION_OPTIONS,
  FOUNDATION_TRANSFER_OPTIONS,
  PHISHING_FOUNDATION_ACTIVITY_ID,
  PHISHING_FOUNDATION_ACTIVITY_VERSION,
  PHISHING_FOUNDATION_MECHANIC_ID,
  PHISHING_FOUNDATION_PACKAGE_ID,
  PHISHING_FOUNDATION_V2_PACKAGE,
  type FoundationAssessmentId,
  type FoundationConfirmationRouteId,
  type FoundationConsequenceId,
  type FoundationEvaluationId,
  type FoundationFinalActionId,
  type FoundationPauseDecisionId,
  type FoundationProtectedAssetId,
  type FoundationReportDetailId,
  type FoundationRequestedActionId,
  type FoundationTransferDecisionId,
} from "@/lib/content/activities/account-lock/v2";
import { calculatePerformanceBonus, POINT_RULES } from "@/lib/domain/rules";
import type {
  MissionResult,
  PhishingFoundationV2Answer,
  PhishingFoundationV2Result,
} from "@/lib/domain/types";

const STAGES = [
  "Abertura",
  "Observar a mensagem",
  "Identificar o pedido",
  "Proteger o ativo",
  "Antecipar a consequência",
  "Conhecer PARE",
  "Parar",
  "Visualizar a análise",
  "Avaliar",
  "Ligar ação e consequência",
  "Comparar rotas",
  "Reconfirmar",
  "Consultar o estado oficial",
  "Concluir a avaliação",
  "Escolher a resposta",
  "Preparar o reporte",
  "Receber um novo alerta",
  "Transferir a decisão",
  "Resultado",
  "Debrief",
] as const;

const MACRO_PHASES = [
  { label: "Perceber o pedido", shortLabel: "Perceber", start: 0, end: 4 },
  { label: "Parar e avaliar", shortLabel: "Pausar", start: 5, end: 9 },
  { label: "Reconfirmar", shortLabel: "Reconfirmar", start: 10, end: 12 },
  { label: "Responder", shortLabel: "Responder", start: 13, end: 15 },
  { label: "Transferir", shortLabel: "Transferir", start: 16, end: 17 },
  { label: "Concluir", shortLabel: "Concluir", start: 18, end: 19 },
] as const;

const RESULT_STAGE = 18;
const DEBRIEF_STAGE = 19;

type Props = {
  existingResult: MissionResult | PhishingFoundationV2Result | null;
  existingCasePackageId: string | null;
  rewardAlreadyClaimed: boolean;
  claimedPoints: number;
  onComplete: (
    answer: PhishingFoundationV2Answer,
  ) => Promise<PhishingFoundationV2Result>;
  onBackToMissions: () => void;
  onOpenSenderLab: () => void;
  onOpenProfile: () => void;
};

function RadioGroup<T extends string>({
  legend,
  name,
  value,
  options,
  onChange,
}: {
  legend: string;
  name: string;
  value: T | null;
  options: readonly { id: T; label: string; detail?: string }[];
  onChange: (value: T) => void;
}) {
  return (
    <fieldset className="foundation-choice-group">
      <legend>{legend}</legend>
      {options.map((option) => (
        <label
          key={option.id}
          className={value === option.id ? "selected" : ""}
        >
          <input
            type="radio"
            name={name}
            checked={value === option.id}
            onChange={() => onChange(option.id)}
          />
          <span>
            <strong>{option.label}</strong>
          </span>
        </label>
      ))}
    </fieldset>
  );
}

function optionLabel(
  options: readonly { id: string; label: string }[],
  id: string | null,
) {
  return options.find((option) => option.id === id)?.label ?? "Não respondido";
}

function MissionProgress({ stage }: { stage: number }) {
  const macroIndex = Math.max(
    MACRO_PHASES.findIndex(
      (phase) => stage >= phase.start && stage <= phase.end,
    ),
    0,
  );
  const macro = MACRO_PHASES[macroIndex];

  return (
    <section
      className="foundation-progress"
      aria-label="Progresso da missão de fundamento"
    >
      <div className="foundation-progress-heading">
        <div aria-live="polite">
          <span>Fase {macroIndex + 1} de {MACRO_PHASES.length}</span>
          <strong aria-current="step">{macro.label}</strong>
        </div>
        <b>
          {stage + 1} / {STAGES.length}
        </b>
      </div>
      <progress
        max={STAGES.length}
        value={stage + 1}
        aria-label={`Etapa ${stage + 1} de ${STAGES.length}: ${STAGES[stage]}`}
      />
      <ol className="foundation-progress-phases" aria-label="Fases da missão">
        {MACRO_PHASES.map((phase, index) => (
          <li
            key={phase.label}
            className={
              index < macroIndex
                ? "complete"
                : index === macroIndex
                  ? "active"
                  : ""
            }
            aria-current={index === macroIndex ? "step" : undefined}
          >
            <span aria-hidden="true">{index < macroIndex ? "✓" : index + 1}</span>
            <strong>{phase.shortLabel}</strong>
          </li>
        ))}
      </ol>
    </section>
  );
}

function StageNav({
  backLabel,
  onBack,
  nextLabel,
  onNext,
  disabled = false,
  busy = false,
}: {
  backLabel: string;
  onBack: () => void;
  nextLabel: string;
  onNext: () => void;
  disabled?: boolean;
  busy?: boolean;
}) {
  return (
    <nav className="foundation-nav" aria-label="Navegação da missão">
      <button type="button" className="text-button" onClick={onBack}>
        ← {backLabel}
      </button>
      <button
        type="button"
        className="primary-button dark"
        disabled={disabled || busy}
        onClick={onNext}
      >
        {busy ? "Registrando tentativa..." : nextLabel}
      </button>
    </nav>
  );
}

function MessageCard({
  compact = false,
  children,
}: {
  compact?: boolean;
  children?: ReactNode;
}) {
  const content = PHISHING_FOUNDATION_V2_PACKAGE.content;

  return (
    <article
      className={`foundation-message${compact ? " compact" : ""}`}
      aria-label="Mensagem simulada"
    >
      <span>Mensagem fictícia · {content.message.receivedAt}</span>
      <h3>{content.message.subject}</h3>
      <p>
        De: <strong>{content.message.senderName}</strong>{" "}
        &lt;{content.message.senderAddress}&gt;
      </p>
      {content.message.body.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
      <span className="foundation-fake-button">
        {content.message.buttonLabel}
      </span>
      <small>
        Representação inerte: o botão não abre e nenhum dado é solicitado.
      </small>
      {children}
    </article>
  );
}

export function PhishingFoundationMission({
  existingResult,
  existingCasePackageId,
  rewardAlreadyClaimed,
  claimedPoints,
  onComplete,
  onBackToMissions,
  onOpenSenderLab,
  onOpenProfile,
}: Props) {
  const existingV2Result =
    existingCasePackageId === PHISHING_FOUNDATION_PACKAGE_ID &&
    existingResult &&
    "requestImpactPoints" in existingResult
      ? existingResult
      : null;
  const [stage, setStage] = useState(existingV2Result ? RESULT_STAGE : 0);
  const [requestedActionId, setRequestedActionId] =
    useState<FoundationRequestedActionId | null>(null);
  const [protectedAssetId, setProtectedAssetId] =
    useState<FoundationProtectedAssetId | null>(null);
  const [potentialConsequenceId, setPotentialConsequenceId] =
    useState<FoundationConsequenceId | null>(null);
  const [pauseDecisionId, setPauseDecisionId] =
    useState<FoundationPauseDecisionId | null>(null);
  const [evaluationId, setEvaluationId] =
    useState<FoundationEvaluationId | null>(null);
  const [confirmationRouteId, setConfirmationRouteId] =
    useState<FoundationConfirmationRouteId | null>(null);
  const [finalAssessmentId, setFinalAssessmentId] =
    useState<FoundationAssessmentId | null>(null);
  const [finalActionId, setFinalActionId] =
    useState<FoundationFinalActionId | null>(null);
  const [reportDetailIds, setReportDetailIds] = useState<
    FoundationReportDetailId[]
  >([]);
  const [transferDecisionId, setTransferDecisionId] =
    useState<FoundationTransferDecisionId | null>(null);
  const [displayResult, setDisplayResult] =
    useState<PhishingFoundationV2Result | null>(existingV2Result);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState("");
  const [rewardGrantedInAttempt, setRewardGrantedInAttempt] = useState(false);
  const stageTitleRef = useActivityStageFocus(stage);
  const content = PHISHING_FOUNDATION_V2_PACKAGE.content;

  useEffect(() => {
    let focusFrame = 0;
    const routeFrame = window.requestAnimationFrame(() => {
      focusFrame = window.requestAnimationFrame(() =>
        stageTitleRef.current?.focus(),
      );
    });
    return () => {
      window.cancelAnimationFrame(routeFrame);
      window.cancelAnimationFrame(focusFrame);
    };
  }, [stageTitleRef]);

  const moveTo = (nextStage: number) => {
    setSubmissionError("");
    setStage(nextStage);
  };

  const toggleReportDetail = (id: FoundationReportDetailId) => {
    setReportDetailIds((current) =>
      current.includes(id)
        ? current.filter((detailId) => detailId !== id)
        : [...current, id],
    );
  };

  const finishMission = async () => {
    if (
      !requestedActionId ||
      !protectedAssetId ||
      !potentialConsequenceId ||
      !pauseDecisionId ||
      !evaluationId ||
      !confirmationRouteId ||
      !finalAssessmentId ||
      !finalActionId ||
      reportDetailIds.length === 0 ||
      !transferDecisionId ||
      isSubmitting
    ) {
      setSubmissionError(
        "Complete a decisão do alerta legítimo antes de concluir a missão.",
      );
      return;
    }

    setIsSubmitting(true);
    setSubmissionError("");
    const grantsFirstReward = !rewardAlreadyClaimed;

    try {
      const result = await onComplete({
        activityId: PHISHING_FOUNDATION_ACTIVITY_ID,
        activityVersion: PHISHING_FOUNDATION_ACTIVITY_VERSION,
        casePackageId: PHISHING_FOUNDATION_PACKAGE_ID,
        mechanicId: PHISHING_FOUNDATION_MECHANIC_ID,
        requestedActionId,
        protectedAssetId,
        potentialConsequenceId,
        pauseDecisionId,
        evaluationId,
        confirmationRouteId,
        finalAssessmentId,
        finalActionId,
        reportDetailIds,
        transferDecisionId,
      });
      setDisplayResult(result);
      setRewardGrantedInAttempt(grantsFirstReward);
      moveTo(RESULT_STAGE);
    } catch {
      setSubmissionError(
        "Não foi possível registrar a tentativa. Suas respostas continuam nesta tela; tente novamente.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetMission = () => {
    setRequestedActionId(null);
    setProtectedAssetId(null);
    setPotentialConsequenceId(null);
    setPauseDecisionId(null);
    setEvaluationId(null);
    setConfirmationRouteId(null);
    setFinalAssessmentId(null);
    setFinalActionId(null);
    setReportDetailIds([]);
    setTransferDecisionId(null);
    setDisplayResult(null);
    setSubmissionError("");
    setRewardGrantedInAttempt(false);
    moveTo(0);
  };

  const bonusPercentage = displayResult
    ? Math.round(calculatePerformanceBonus(displayResult.score) * 100)
    : 0;

  return (
    <ActivityShell
      className="page-stack foundation-page"
      activityId={PHISHING_FOUNDATION_ACTIVITY_ID}
    >
      <section className="foundation-shell">
        <header className="foundation-header">
          <div>
            <span className="section-badge">Missão 01 · Fundamento</span>
            <h1>O aviso que não podia esperar</h1>
          </div>
          <div className="foundation-meta" aria-label="Informações da missão">
            <strong>8–10 min</strong>
            <span>100 pontos · sem pressa</span>
          </div>
        </header>

        <MissionProgress stage={stage} />

        <div className="foundation-workspace">
          {stage === 0 ? (
            <section className="foundation-opening">
              <div className="foundation-opening__copy">
                <span className="section-kicker">Uma mensagem acabou de chegar</span>
                <h2 ref={stageTitleRef} tabIndex={-1}>
                  “Sua conta será bloqueada<br />em 30 minutos.”
                </h2>
                <p>{content.situation}</p>
                <div className="foundation-safety-note">
                  Simulação segura: nenhum link abre e nenhum dado é enviado.
                </div>
                {existingResult && !existingV2Result ? (
                  <p className="foundation-history-note">
                    Sua conclusão da versão anterior foi preservada. Esta nova
                    prática não concede os pontos da atividade outra vez.
                  </p>
                ) : null}
                <button
                  type="button"
                  className="primary-button learning-button"
                  onClick={() => moveTo(1)}
                >
                  Observar a mensagem <span aria-hidden="true">→</span>
                </button>
              </div>
              <div className="foundation-opening__visual">
                <span className="foundation-opening__alert" aria-hidden="true">30:00</span>
                <Mascot pose="alert" size="large" />
              </div>
            </section>
          ) : null}

          {stage === 1 ? (
            <section className="foundation-stage">
              <header className="foundation-stage-heading">
                <span className="pare-step-badge">Observe</span>
                <h2 ref={stageTitleRef} tabIndex={-1}>
                  Antes da urgência, veja quem fala
                </h2>
                <p>
                  Leia o aviso como evidência. Nesta tela, você não precisa
                  decidir nem tocar no controle representado.
                </p>
              </header>
              <div className="foundation-observe-layout">
                <MessageCard compact />
                <div className="foundation-sender-diagram" aria-label="Relação entre nome exibido e endereço completo">
                  <span className="foundation-diagram-kicker">Remetente em duas camadas</span>
                  <div className="foundation-sender-diagram__node">
                    <small>Nome exibido</small>
                    <strong>{content.message.senderName}</strong>
                  </div>
                  <svg viewBox="0 0 280 58" role="img" aria-label="O nome exibido conduz ao endereço completo">
                    <path d="M18 29 H246" />
                    <path d="m230 14 18 15-18 15" />
                  </svg>
                  <div className="foundation-sender-diagram__node emphasis">
                    <small>Endereço completo</small>
                    <strong>{content.message.senderAddress}</strong>
                  </div>
                  <p>A aparência apresenta. O endereço ajuda a investigar.</p>
                </div>
              </div>
              <StageNav
                backLabel="Voltar à abertura"
                onBack={() => moveTo(0)}
                nextLabel="Identificar o pedido"
                onNext={() => moveTo(2)}
              />
            </section>
          ) : null}

          {stage === 2 ? (
            <section className="foundation-stage foundation-question-stage">
              <header className="foundation-stage-heading">
                <span className="pare-step-badge">Pedido</span>
                <h2 ref={stageTitleRef} tabIndex={-1}>
                  O que o aviso quer que você faça?
                </h2>
                <p>
                  Identifique a ação solicitada. Isso ainda não classifica a
                  mensagem como legítima ou fraudulenta.
                </p>
              </header>
              <div className="foundation-question-card">
                <RadioGroup
                  legend="Qual ação o aviso tenta provocar?"
                  name="foundation-request"
                  value={requestedActionId}
                  options={FOUNDATION_REQUESTED_ACTION_OPTIONS}
                  onChange={setRequestedActionId}
                />
              </div>
              <StageNav
                backLabel="Rever a mensagem"
                onBack={() => moveTo(1)}
                nextLabel="Nomear o ativo"
                onNext={() => moveTo(3)}
                disabled={!requestedActionId}
              />
            </section>
          ) : null}

          {stage === 3 ? (
            <section className="foundation-stage foundation-question-stage">
              <header className="foundation-stage-heading">
                <span className="pare-step-badge">Ativo</span>
                <h2 ref={stageTitleRef} tabIndex={-1}>
                  O que pode ser afetado?
                </h2>
                <p>
                  Parta da ação que você identificou e pense no recurso de
                  trabalho ligado a ela.
                </p>
              </header>
              <div className="foundation-context-chip">
                <span>Ação identificada</span>
                <strong>
                  {optionLabel(FOUNDATION_REQUESTED_ACTION_OPTIONS, requestedActionId)}
                </strong>
              </div>
              <div className="foundation-question-card">
                <RadioGroup
                  legend="Qual recurso do trabalho pode ser colocado em risco?"
                  name="foundation-asset"
                  value={protectedAssetId}
                  options={FOUNDATION_ASSET_OPTIONS}
                  onChange={setProtectedAssetId}
                />
              </div>
              <StageNav
                backLabel="Alterar o pedido"
                onBack={() => moveTo(2)}
                nextLabel="Antecipar a consequência"
                onNext={() => moveTo(4)}
                disabled={!protectedAssetId}
              />
            </section>
          ) : null}

          {stage === 4 ? (
            <section className="foundation-stage foundation-question-stage">
              <header className="foundation-stage-heading">
                <span className="pare-step-badge">Consequência</span>
                <h2 ref={stageTitleRef} tabIndex={-1}>
                  Se a ação seguir adiante, o que pode acontecer?
                </h2>
                <p>
                  Considere o botão levando a uma página ainda não verificada.
                </p>
              </header>
              <div className="foundation-question-card">
                <RadioGroup
                  legend="Qual é a principal consequência possível?"
                  name="foundation-consequence"
                  value={potentialConsequenceId}
                  options={FOUNDATION_CONSEQUENCE_OPTIONS}
                  onChange={setPotentialConsequenceId}
                />
              </div>
              <StageNav
                backLabel="Alterar o ativo"
                onBack={() => moveTo(3)}
                nextLabel="Conhecer PARE"
                onNext={() => moveTo(5)}
                disabled={!potentialConsequenceId}
              />
            </section>
          ) : null}

          {stage === 5 ? (
            <section className="foundation-stage">
              <header className="foundation-stage-heading">
                <span className="pare-step-badge">PARE</span>
                <h2 ref={stageTitleRef} tabIndex={-1}>
                  Pressão vira processo
                </h2>
                <p>
                  Você já nomeou pedido, ativo e consequência. Agora use quatro
                  movimentos para decidir sem depender da pressa.
                </p>
              </header>
              <div className="pare-board foundation-pare-intro" aria-label="Quatro movimentos do modelo PARE">
                <article className="active"><strong>P</strong><h3>Pare</h3><p>Interrompa a ação automática.</p></article>
                <article><strong>A</strong><h3>Avalie</h3><p>Conecte pedido, ativo e consequência.</p></article>
                <article><strong>R</strong><h3>Reconfirme</h3><p>Use uma fonte fora da mensagem.</p></article>
                <article><strong>E</strong><h3>Escale e responda</h3><p>Trate o caso de forma proporcional.</p></article>
              </div>
              <StageNav
                backLabel="Rever a consequência"
                onBack={() => moveTo(4)}
                nextLabel="Praticar a pausa"
                onNext={() => moveTo(6)}
              />
            </section>
          ) : null}

          {stage === 6 ? (
            <section className="foundation-stage foundation-question-stage">
              <header className="foundation-stage-heading">
                <span className="pare-step-badge">P · Pare</span>
                <h2 ref={stageTitleRef} tabIndex={-1}>
                  Qual pausa protege sua decisão?
                </h2>
                <p>
                  O cronômetro pertence à mensagem. Seu próximo movimento pode
                  interromper a sequência automática.
                </p>
              </header>
              <div className="foundation-question-card">
                <RadioGroup
                  legend="Antes de usar “Confirmar conta”, o que você faz primeiro?"
                  name="foundation-pause"
                  value={pauseDecisionId}
                  options={FOUNDATION_PAUSE_OPTIONS}
                  onChange={setPauseDecisionId}
                />
              </div>
              <StageNav
                backLabel="Rever PARE"
                onBack={() => moveTo(5)}
                nextLabel="Visualizar a análise"
                onNext={() => moveTo(7)}
                disabled={!pauseDecisionId}
              />
            </section>
          ) : null}

          {stage === 7 ? (
            <section className="foundation-stage">
              <header className="foundation-stage-heading">
                <span className="pare-step-badge">A · Avalie</span>
                <h2 ref={stageTitleRef} tabIndex={-1}>
                  Três peças formam uma cadeia
                </h2>
                <p>
                  Avaliar não é contar sinais. É visualizar como a ação pode
                  alcançar algo que você precisa proteger.
                </p>
              </header>
              <div className="foundation-chain" aria-label="Pedido, ativo e consequência ligados">
                <article>
                  <span>1 · Pedido</span>
                  <strong>{optionLabel(FOUNDATION_REQUESTED_ACTION_OPTIONS, requestedActionId)}</strong>
                </article>
                <span className="foundation-chain__arrow" aria-hidden="true">→</span>
                <article>
                  <span>2 · Ativo</span>
                  <strong>{optionLabel(FOUNDATION_ASSET_OPTIONS, protectedAssetId)}</strong>
                </article>
                <span className="foundation-chain__arrow" aria-hidden="true">→</span>
                <article>
                  <span>3 · Consequência</span>
                  <strong>{optionLabel(FOUNDATION_CONSEQUENCE_OPTIONS, potentialConsequenceId)}</strong>
                </article>
              </div>
              <StageNav
                backLabel="Alterar a pausa"
                onBack={() => moveTo(6)}
                nextLabel="Escolher como avaliar"
                onNext={() => moveTo(8)}
              />
            </section>
          ) : null}

          {stage === 8 ? (
            <section className="foundation-stage foundation-question-stage">
              <header className="foundation-stage-heading">
                <span className="pare-step-badge">A · Avalie</span>
                <h2 ref={stageTitleRef} tabIndex={-1}>
                  Como você avalia este aviso?
                </h2>
                <p>
                  Escolha o raciocínio que usaria antes de procurar uma rota de
                  confirmação.
                </p>
              </header>
              <div className="foundation-question-card">
                <RadioGroup
                  legend="Quais informações precisam ser relacionadas?"
                  name="foundation-evaluation"
                  value={evaluationId}
                  options={FOUNDATION_EVALUATION_OPTIONS}
                  onChange={setEvaluationId}
                />
              </div>
              <StageNav
                backLabel="Rever a cadeia"
                onBack={() => moveTo(7)}
                nextLabel="Ver o destino representado"
                onNext={() => moveTo(9)}
                disabled={!evaluationId}
              />
            </section>
          ) : null}

          {stage === 9 ? (
            <section className="foundation-stage">
              <header className="foundation-stage-heading">
                <span className="pare-step-badge">Consequência inerte</span>
                <h2 ref={stageTitleRef} tabIndex={-1}>
                  O botão muda o destino da ação
                </h2>
                <p>
                  A prévia abaixo ensina a transformação sem abrir um site e sem
                  pedir qualquer informação.
                </p>
              </header>
              <div className="foundation-button-route" aria-label="O botão da mensagem aponta para outro destino">
                <div className="foundation-button-route__message">
                  <small>Na mensagem</small>
                  <strong>{content.message.buttonLabel}</strong>
                </div>
                <svg viewBox="0 0 300 92" role="img" aria-label="O botão conduz à prévia de destino">
                  <path d="M18 46 C94 8 182 84 272 46" />
                  <path d="m255 30 19 16-19 16" />
                </svg>
                <div className="foundation-button-route__destination">
                  <small>Destino apresentado</small>
                  <strong>{content.message.destinationPreview}</strong>
                </div>
              </div>
              <div className="foundation-learning-callout">
                <strong>Descoberta</strong>
                <p>
                  O texto do botão descreve uma intenção; a prévia mostra para
                  onde a ação iria. Você não precisa visitar esse destino.
                </p>
              </div>
              <StageNav
                backLabel="Alterar a avaliação"
                onBack={() => moveTo(8)}
                nextLabel="Comparar rotas"
                onNext={() => moveTo(10)}
              />
            </section>
          ) : null}

          {stage === 10 ? (
            <section className="foundation-stage">
              <header className="foundation-stage-heading">
                <span className="pare-step-badge">R · Reconfirme</span>
                <h2 ref={stageTitleRef} tabIndex={-1}>
                  Duas rotas, duas origens
                </h2>
                <p>
                  Uma rota nasce dentro do aviso. A outra já existia antes de a
                  mensagem chegar.
                </p>
              </header>
              <div className="foundation-route-compare" aria-label="Comparação visual entre rota da mensagem e rota conhecida">
                <div className="foundation-route-origin">
                  <span>Você</span>
                </div>
                <svg viewBox="0 0 300 190" aria-hidden="true">
                  <path className="message-path" d="M24 92 C92 92 100 34 170 34 H276" />
                  <path className="known-path" d="M24 98 C92 98 100 156 170 156 H276" />
                  <path className="message-path" d="m258 20 19 14-19 14" />
                  <path className="known-path" d="m258 142 19 14-19 14" />
                </svg>
                <article className="message-route">
                  <span>Rota fornecida pelo aviso</span>
                  <strong>{content.message.destinationPreview}</strong>
                </article>
                <article className="known-route">
                  <span>Referência conhecida</span>
                  <strong>{content.officialReference.address}</strong>
                </article>
              </div>
              <StageNav
                backLabel="Rever o destino"
                onBack={() => moveTo(9)}
                nextLabel="Escolher uma rota"
                onNext={() => moveTo(11)}
              />
            </section>
          ) : null}

          {stage === 11 ? (
            <section className="foundation-stage foundation-question-stage">
              <header className="foundation-stage-heading">
                <span className="pare-step-badge">R · Reconfirme</span>
                <h2 ref={stageTitleRef} tabIndex={-1}>
                  Onde você confere o estado da conta?
                </h2>
                <p>
                  Escolha uma rota para verificar a afirmação de bloqueio.
                </p>
              </header>
              <div className="foundation-question-card">
                <RadioGroup
                  legend="Qual caminho não deve depender do e-mail recebido?"
                  name="foundation-confirmation"
                  value={confirmationRouteId}
                  options={FOUNDATION_CONFIRMATION_OPTIONS}
                  onChange={setConfirmationRouteId}
                />
              </div>
              <StageNav
                backLabel="Rever as rotas"
                onBack={() => moveTo(10)}
                nextLabel="Consultar o estado"
                onNext={() => moveTo(12)}
                disabled={!confirmationRouteId}
              />
            </section>
          ) : null}

          {stage === 12 ? (
            <section className="foundation-stage">
              <header className="foundation-stage-heading">
                <span className="pare-step-badge">Consulta independente</span>
                <h2 ref={stageTitleRef} tabIndex={-1}>
                  A fonte conhecida mostra o estado da conta
                </h2>
                <p>
                  {confirmationRouteId === "known-official-reference"
                    ? "A rota escolhida abriu uma referência que já existia fora do aviso."
                    : "Sua escolha foi registrada. Para observar o contraste, a simulação mostra agora uma referência conhecida fora do aviso."}
                </p>
              </header>
              <div className="foundation-route-reveal">
                <div className="foundation-context-chip">
                  <span>Rota que você escolheu</span>
                  <strong>{optionLabel(FOUNDATION_CONFIRMATION_OPTIONS, confirmationRouteId)}</strong>
                </div>
                <div className="foundation-official-status" role="status">
                  <span>{content.officialReference.label}</span>
                  <strong>{content.officialReference.address}</strong>
                  <p>{content.officialReference.serviceStatus}</p>
                </div>
              </div>
              <StageNav
                backLabel="Alterar a rota"
                onBack={() => moveTo(11)}
                nextLabel="Concluir a avaliação"
                onNext={() => moveTo(13)}
              />
            </section>
          ) : null}

          {stage === 13 ? (
            <section className="foundation-stage foundation-question-stage">
              <header className="foundation-stage-heading">
                <span className="pare-step-badge">Conclusão</span>
                <h2 ref={stageTitleRef} tabIndex={-1}>
                  O que já é possível concluir?
                </h2>
                <p>
                  A conta aparece ativa na referência conhecida e o bloqueio não
                  foi confirmado.
                </p>
              </header>
              <div className="foundation-question-card">
                <RadioGroup
                  legend="Como você avalia o e-mail depois dessa consulta?"
                  name="foundation-assessment"
                  value={finalAssessmentId}
                  options={FOUNDATION_ASSESSMENT_OPTIONS}
                  onChange={setFinalAssessmentId}
                />
              </div>
              <StageNav
                backLabel="Rever o estado oficial"
                onBack={() => moveTo(12)}
                nextLabel="Escolher a resposta"
                onNext={() => moveTo(14)}
                disabled={!finalAssessmentId}
              />
            </section>
          ) : null}

          {stage === 14 ? (
            <section className="foundation-stage foundation-question-stage">
              <header className="foundation-stage-heading">
                <span className="pare-step-badge">E · Responda</span>
                <h2 ref={stageTitleRef} tabIndex={-1}>
                  Qual resposta mantém o trabalho seguro?
                </h2>
                <p>
                  O tratamento pode proteger sua conta e também deixar
                  informações úteis para a equipe responsável.
                </p>
              </header>
              <div className="foundation-question-card">
                <RadioGroup
                  legend="Diante do aviso suspeito e da conta ativa, o que você faz?"
                  name="foundation-action"
                  value={finalActionId}
                  options={FOUNDATION_FINAL_ACTION_OPTIONS}
                  onChange={setFinalActionId}
                />
              </div>
              <StageNav
                backLabel="Alterar a conclusão"
                onBack={() => moveTo(13)}
                nextLabel="Preparar o reporte"
                onNext={() => moveTo(15)}
                disabled={!finalActionId}
              />
            </section>
          ) : null}

          {stage === 15 ? (
            <section className="foundation-stage foundation-question-stage">
              <header className="foundation-stage-heading">
                <span className="pare-step-badge">E · Escale</span>
                <h2 ref={stageTitleRef} tabIndex={-1}>
                  O que pertence ao reporte?
                </h2>
                <p>
                  Selecione os fatos que você enviaria. Segredos e dados sem
                  relação com o caso não são necessários.
                </p>
              </header>
              <div className="foundation-question-card">
                <fieldset className="foundation-report-group">
                  <legend>Quais informações podem ser incluídas com segurança?</legend>
                  {FOUNDATION_REPORT_OPTIONS.map((option) => (
                    <label
                      key={option.id}
                      className={reportDetailIds.includes(option.id) ? "selected" : ""}
                    >
                      <input
                        type="checkbox"
                        checked={reportDetailIds.includes(option.id)}
                        onChange={() => toggleReportDetail(option.id)}
                      />
                      <span><strong>{option.label}</strong></span>
                    </label>
                  ))}
                </fieldset>
              </div>
              <StageNav
                backLabel="Alterar a resposta"
                onBack={() => moveTo(14)}
                nextLabel="Aplicar em outro alerta"
                onNext={() => moveTo(16)}
                disabled={reportDetailIds.length === 0}
              />
            </section>
          ) : null}

          {stage === 16 ? (
            <section className="foundation-stage">
              <header className="foundation-stage-heading">
                <span className="pare-step-badge">Novo cenário</span>
                <h2 ref={stageTitleRef} tabIndex={-1}>
                  {content.transfer.title}
                </h2>
                <p>
                  Este aviso também fala de acesso, mas não traz link. Aplique o
                  processo sem classificar toda urgência como golpe.
                </p>
              </header>
              <article className="foundation-message legitimate foundation-transfer-message" aria-label="Alerta legítimo simulado">
                <span>Mensagem fictícia de rotina</span>
                <h3>{content.transfer.subject}</h3>
                <p>
                  De: <strong>{content.transfer.senderName}</strong>{" "}
                  &lt;{content.transfer.senderAddress}&gt;
                </p>
                <p>{content.transfer.body}</p>
              </article>
              <div className="foundation-official-status">
                <span>Estado consultado pela referência conhecida</span>
                <strong>{content.officialReference.address}</strong>
                <p>{content.transfer.officialStatus}</p>
              </div>
              <StageNav
                backLabel="Rever o reporte"
                onBack={() => moveTo(15)}
                nextLabel="Decidir no novo cenário"
                onNext={() => moveTo(17)}
              />
            </section>
          ) : null}

          {stage === 17 ? (
            <section className="foundation-stage foundation-question-stage">
              <header className="foundation-stage-heading">
                <span className="pare-step-badge">Transferência</span>
                <h2 ref={stageTitleRef} tabIndex={-1}>
                  O processo muda quando o alerta é legítimo?
                </h2>
                <p>
                  A referência conhecida confirma que a senha realmente expira
                  amanhã.
                </p>
              </header>
              <div className="foundation-question-card">
                <RadioGroup
                  legend="Como você deve agir agora?"
                  name="foundation-transfer"
                  value={transferDecisionId}
                  options={FOUNDATION_TRANSFER_OPTIONS}
                  onChange={setTransferDecisionId}
                />
              </div>
              <StageNav
                backLabel="Rever o novo alerta"
                onBack={() => moveTo(16)}
                nextLabel="Concluir missão"
                onNext={finishMission}
                disabled={!transferDecisionId}
                busy={isSubmitting}
              />
              <ActivityError className="foundation-error" message={submissionError} />
            </section>
          ) : null}

          {stage === RESULT_STAGE && displayResult ? (
            <section className="foundation-stage">
              <header className={displayResult.needsReview ? "foundation-result review" : "foundation-result success"}>
                <Mascot
                  pose={displayResult.needsReview ? "explaining" : "celebration"}
                  size="medium"
                />
                <div>
                  <span>Resultado privado</span>
                  <strong>{displayResult.score}</strong>
                  <small>de 100</small>
                </div>
                <div>
                  <span className="section-kicker">
                    {displayResult.needsReview ? "Revisão recomendada" : "Processo concluído"}
                  </span>
                  <h2 ref={stageTitleRef} tabIndex={-1}>
                    {displayResult.needsReview
                      ? "Você já tem um ponto claro para praticar"
                      : "Você respondeu à pressão com processo"}
                  </h2>
                  <p>
                    {displayResult.needsReview
                      ? PHISHING_FOUNDATION_V2_PACKAGE.feedback.review
                      : PHISHING_FOUNDATION_V2_PACKAGE.feedback.success}
                  </p>
                </div>
              </header>

              <details className="foundation-result-details">
                <summary>Ver detalhamento da pontuação e do aprendizado</summary>
                <div className="foundation-score-grid">
                  <article><span>Pedido e impacto</span><strong>{displayResult.requestImpactPoints}/20</strong></article>
                  <article><span>Pare e avalie</span><strong>{displayResult.pauseEvaluationPoints}/15</strong></article>
                  <article><span>Reconfirme</span><strong>{displayResult.confirmationPoints}/25</strong></article>
                  <article><span>Resposta e reporte</span><strong>{displayResult.responseReportPoints}/25</strong></article>
                  <article><span>Alerta legítimo</span><strong>{displayResult.transferPoints}/15</strong></article>
                </div>
                <div className="foundation-reward-card">
                  <span>Pontos gerais</span>
                  <strong>
                    {rewardGrantedInAttempt
                      ? `+${displayResult.potentialReward}`
                      : `${claimedPoints} registrados`}
                  </strong>
                  <p>
                    {rewardGrantedInAttempt
                      ? `Base de ${POINT_RULES.mainMission} + bônus de ${bonusPercentage}%.`
                      : "A recompensa desta atividade já havia sido concedida; a repetição atualizou apenas o aprendizado."}
                  </p>
                </div>
                <ActivityAnswerReview
                  items={[
                    ["request", "Pedido e impacto", displayResult.requestImpactPoints, 20, "Identificar o pedido e o que poderia ser afetado evita agir no automático."],
                    ["pause", "Parar e avaliar", displayResult.pauseEvaluationPoints, 15, "A pressão deve ser interrompida antes de abrir, responder ou fornecer dados."],
                    ["confirm", "Reconfirmar por fonte independente", displayResult.confirmationPoints, 25, "A referência precisa existir fora do próprio aviso que está sendo verificado."],
                    ["response", "Responder e reportar", displayResult.responseReportPoints, 25, "A resposta segura preserva fatos úteis e não compartilha segredos."],
                    ["transfer", "Aplicar a regra a um alerta legítimo", displayResult.transferPoints, 15, "Nem todo alerta urgente é phishing; o processo confirmado controla o falso positivo."],
                  ].map(([id, title, earned, maximum, explanation]) => ({
                    id: String(id),
                    title: String(title),
                    status:
                      Number(earned) === Number(maximum)
                        ? "correct" as const
                        : "review" as const,
                    userAnswer: `${earned} de ${maximum} pontos`,
                    explanation: String(explanation),
                  }))}
                />
              </details>

              <nav className="foundation-nav" aria-label="Ações do resultado">
                <button type="button" className="primary-button dark" onClick={() => moveTo(DEBRIEF_STAGE)}>
                  Entender o modelo PARE
                </button>
                <button type="button" className="text-button" onClick={onOpenProfile}>
                  Ver meu perfil
                </button>
              </nav>
            </section>
          ) : null}

          {stage === DEBRIEF_STAGE && displayResult ? (
            <section className="foundation-stage foundation-debrief">
              <header className="foundation-stage-heading">
                <span className="pare-step-badge">Debrief</span>
                <h2 ref={stageTitleRef} tabIndex={-1}>
                  {PHISHING_FOUNDATION_V2_PACKAGE.debrief.title}
                </h2>
                <p>{PHISHING_FOUNDATION_V2_PACKAGE.debrief.body}</p>
              </header>
              <div className="pare-board complete">
                <article><strong>P</strong><h3>Pare</h3><p>Interrompa a ação pedida antes de usar controles recebidos.</p></article>
                <article><strong>A</strong><h3>Avalie</h3><p>Nomeie pedido, ativo e consequência. Um sinal isolado não é veredito.</p></article>
                <article><strong>R</strong><h3>Reconfirme</h3><p>Use uma referência obtida fora da solicitação.</p></article>
                <article><strong>E</strong><h3>Escale e responda</h3><p>Reporte fatos seguros ou siga o fluxo legítimo confirmado.</p></article>
              </div>
              <div className="foundation-learning-callout">
                <strong>Próximo passo recomendado</strong>
                <p>
                  Em <em>Quem enviou de verdade?</em>, você aprofundará nome exibido,
                  endereço e contexto. Depois, <em>Domínio sob a lupa</em> ensina a
                  ler destinos com precisão.
                </p>
              </div>
              <nav className="foundation-nav" aria-label="Ações finais da missão">
                <button type="button" className="primary-button dark" onClick={onOpenSenderLab}>
                  Ir para Quem enviou de verdade?
                </button>
                <button type="button" className="text-button" onClick={onBackToMissions}>
                  Voltar às Missões
                </button>
                <button type="button" className="text-button" onClick={resetMission}>
                  Refazer missão
                </button>
              </nav>
            </section>
          ) : null}
        </div>
      </section>
    </ActivityShell>
  );
}
