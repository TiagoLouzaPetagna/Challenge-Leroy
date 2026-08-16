"use client";

import { useState } from "react";

import { ActivityShell } from "@/features/activities/ActivityShell";
import { ActivityAnswerReview } from "@/features/activities/primitives/ActivityAnswerReview";
import { ActivityError } from "@/features/activities/primitives/ActivityError";
import { useActivityStageFocus } from "@/features/activities/useActivityStageFocus";
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
  "Pedido e impacto",
  "Pare e avalie",
  "Consequência",
  "Revisão",
  "Reconfirme e responda",
  "Transferência",
  "Resultado",
  "Debrief",
];

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
            {option.detail ? <small>{option.detail}</small> : null}
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

function FoundationProgress({ currentStep }: { currentStep: number }) {
  const completedCount = currentStep;
  const previousStep = currentStep > 0 ? STAGES[currentStep - 1] : null;
  const nextStep = currentStep < STAGES.length - 1 ? STAGES[currentStep + 1] : null;

  return (
    <section className="foundation-progress" aria-label="Progresso da missão">
      <header className="foundation-progress-heading">
        <span>Jornada desta missão</span>
        <strong>
          Etapa {currentStep + 1} de {STAGES.length}
        </strong>
      </header>
      <progress
        max={STAGES.length}
        value={currentStep + 1}
        aria-label={`Progresso: etapa ${currentStep + 1} de ${STAGES.length}`}
      />
      <ol aria-label="Etapas da missão de fundamento">
        <li className="complete">
          <span>Concluído</span>
          <strong>{previousStep ?? "Nenhuma etapa ainda"}</strong>
          <small>{completedCount} de {STAGES.length} etapas concluídas</small>
        </li>
        <li className="active" aria-current="step">
          <span>Agora</span>
          <strong>{STAGES[currentStep]}</strong>
          <small>Esta é a etapa que está aberta.</small>
        </li>
        <li>
          <span>A seguir</span>
          <strong>{nextStep ?? "Fim da missão"}</strong>
          <small>
            {nextStep
              ? `${STAGES.length - currentStep - 1} etapas ainda serão percorridas.`
              : "O percurso termina depois deste debrief."}
          </small>
        </li>
      </ol>
    </section>
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
  const [stage, setStage] = useState(existingV2Result ? 7 : 0);
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
      moveTo(7);
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

  const requestImpactComplete =
    requestedActionId && protectedAssetId && potentialConsequenceId;
  const initialDecisionComplete = pauseDecisionId && evaluationId;
  const finalDecisionComplete =
    confirmationRouteId &&
    finalAssessmentId &&
    finalActionId &&
    reportDetailIds.length > 0;
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
            <span className="section-badge">Missão de fundamento · Etapa 01</span>
            <h1>O aviso que não podia esperar</h1>
            <p>
              Aprenda um processo que funciona antes de analisar técnicas mais
              avançadas: entender o pedido, pausar, confirmar fora da mensagem e
              só então responder.
            </p>
          </div>
          <div className="foundation-meta" aria-label="Informações da missão">
            <span>Tempo estimado</span>
            <strong>8–10 minutos</strong>
            <small>100 pontos-base · sem pontuação por velocidade</small>
          </div>
        </header>

        <FoundationProgress currentStep={stage} />

        <div className="foundation-workspace">
          {stage === 0 ? (
            <section className="foundation-opening">
              <div>
                <span className="section-kicker">Seu papel</span>
                <h2 ref={stageTitleRef} tabIndex={-1}>
                  Primeiro entenda o que está em jogo
                </h2>
                <p>{content.role}</p>
                <p>{content.situation}</p>
              </div>
              <div className="foundation-task-card">
                <span className="section-kicker">O que você fará</span>
                <h3>Uma tarefa, em quatro passos</h3>
                <p>{content.task}</p>
                <ol className="pare-mini-list">
                  <li><strong>P</strong><span>Pare antes de agir.</span></li>
                  <li><strong>A</strong><span>Avalie o pedido e a consequência.</span></li>
                  <li><strong>R</strong><span>Reconfirme por uma fonte independente.</span></li>
                  <li><strong>E</strong><span>Escale e responda pelo processo seguro.</span></li>
                </ol>
                <div className="foundation-safety-note">
                  Ambiente fictício: nenhum link abre, nenhum dado é solicitado e
                  nenhum reporte é enviado.
                </div>
                {existingResult && !existingV2Result ? (
                  <p className="foundation-history-note">
                    Sua conclusão da versão anterior foi preservada. Esta nova
                    prática não concede os pontos da atividade outra vez.
                  </p>
                ) : null}
                <button
                  type="button"
                  className="primary-button dark"
                  onClick={() => moveTo(1)}
                >
                  Começar pelo pedido
                </button>
              </div>
            </section>
          ) : null}

          {stage === 1 ? (
            <section className="foundation-stage">
              <header className="foundation-stage-heading">
                <span className="pare-step-badge">Ponto de partida</span>
                <h2 ref={stageTitleRef} tabIndex={-1}>
                  O que a mensagem quer provocar?
                </h2>
                <p>
                  Não decida ainda se é golpe. Primeiro leia o aviso e identifique
                  a ação pedida, o ativo envolvido e a consequência possível.
                </p>
              </header>
              <div className="foundation-message-and-form">
                <article className="foundation-message" aria-label="Mensagem simulada">
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
                  <small>O botão é apenas uma representação e não pode ser aberto.</small>
                </article>
                <div className="foundation-form-stack">
                  <RadioGroup
                    legend="1. Ao ler este aviso de bloqueio, qual ação ele pede que você execute?"
                    name="foundation-request"
                    value={requestedActionId}
                    options={FOUNDATION_REQUESTED_ACTION_OPTIONS}
                    onChange={setRequestedActionId}
                  />
                  <RadioGroup
                    legend="2. Se você seguir esse pedido, qual recurso do trabalho pode ser colocado em risco?"
                    name="foundation-asset"
                    value={protectedAssetId}
                    options={FOUNDATION_ASSET_OPTIONS}
                    onChange={setProtectedAssetId}
                  />
                  <RadioGroup
                    legend="3. Se o botão abrir uma página falsa e você informar seus dados, qual é o principal risco?"
                    name="foundation-consequence"
                    value={potentialConsequenceId}
                    options={FOUNDATION_CONSEQUENCE_OPTIONS}
                    onChange={setPotentialConsequenceId}
                  />
                </div>
              </div>
              <nav className="foundation-nav" aria-label="Navegação da missão">
                <button type="button" className="text-button" onClick={() => moveTo(0)}>
                  ← Voltar ao contexto
                </button>
                <button
                  type="button"
                  className="primary-button dark"
                  disabled={!requestImpactComplete}
                  onClick={() => moveTo(2)}
                >
                  Aplicar PARE
                </button>
              </nav>
            </section>
          ) : null}

          {stage === 2 ? (
            <section className="foundation-stage">
              <header className="foundation-stage-heading">
                <span className="pare-step-badge">P + A</span>
                <h2 ref={stageTitleRef} tabIndex={-1}>Pare e avalie antes do botão</h2>
                <p>
                  Neste caso, o e-mail pede que você use “Confirmar conta” em até
                  30 minutos. Antes de tocar nesse botão, interrompa a ação e
                  relacione o pedido ao que pode ser comprometido. Urgência e
                  aparência são contexto, não veredito.
                </p>
              </header>
              <div className="pare-board" aria-label="Estação PARE">
                <article className="active"><strong>P</strong><h3>Pare</h3><p>Interrompa a ação automática antes de usar o botão.</p></article>
                <article className="active"><strong>A</strong><h3>Avalie</h3><p>Relacione o pedido ao ativo e à consequência.</p></article>
                <article><strong>R</strong><h3>Reconfirme</h3><p>Você escolherá uma fonte fora da mensagem.</p></article>
                <article><strong>E</strong><h3>Escale e responda</h3><p>Você decidirá o tratamento proporcional.</p></article>
              </div>
              <div className="foundation-two-columns">
                <RadioGroup
                  legend="Antes de usar o botão “Confirmar conta”, qual deve ser sua primeira atitude?"
                  name="foundation-pause"
                  value={pauseDecisionId}
                  options={FOUNDATION_PAUSE_OPTIONS}
                  onChange={setPauseDecisionId}
                />
                <RadioGroup
                  legend="Para avaliar este aviso de bloqueio, quais informações você precisa relacionar?"
                  name="foundation-evaluation"
                  value={evaluationId}
                  options={FOUNDATION_EVALUATION_OPTIONS}
                  onChange={setEvaluationId}
                />
              </div>
              <nav className="foundation-nav" aria-label="Navegação da missão">
                <button type="button" className="text-button" onClick={() => moveTo(1)}>← Rever o pedido</button>
                <button type="button" className="primary-button dark" disabled={!initialDecisionComplete} onClick={() => moveTo(3)}>
                  Ver a consequência simulada
                </button>
              </nav>
            </section>
          ) : null}

          {stage === 3 ? (
            <section className="foundation-stage">
              <header className="foundation-stage-heading">
                <span className="pare-step-badge">Consequência inerte</span>
                <h2 ref={stageTitleRef} tabIndex={-1}>O botão levaria a outro destino</h2>
                <p>
                  Esta prévia mostra a consequência sem abrir um site e sem pedir
                  qualquer informação. Você não precisa visitar o destino para se proteger.
                </p>
              </header>
              <div className="foundation-consequence-panel">
                <div>
                  <span>Destino apresentado pelo botão</span>
                  <strong>{content.message.destinationPreview}</strong>
                  <p>Uma tela nesse destino poderia solicitar credencial ou sessão.</p>
                </div>
                <div>
                  <span>Referência conhecida fora da mensagem</span>
                  <strong>{content.officialReference.address}</strong>
                  <p>Ainda não foi consultada. Ela não veio do aviso que está sob análise.</p>
                </div>
              </div>
              <div className="foundation-learning-callout">
                <strong>O ensinamento desta etapa</strong>
                <p>
                  Um link diferente é uma pista. A decisão segura vem de escolher
                  uma referência independente, não de tentar provar quem criou o e-mail.
                </p>
              </div>
              <nav className="foundation-nav" aria-label="Navegação da missão">
                <button type="button" className="text-button" onClick={() => moveTo(2)}>← Rever Pare e Avalie</button>
                <button type="button" className="primary-button dark" onClick={() => moveTo(4)}>Revisar minha cadeia</button>
              </nav>
            </section>
          ) : null}

          {stage === 4 ? (
            <section className="foundation-stage">
              <header className="foundation-stage-heading">
                <span className="pare-step-badge">Revisão livre</span>
                <h2 ref={stageTitleRef} tabIndex={-1}>Confira o raciocínio antes de responder</h2>
                <p>
                  Esta revisão não mostra acertos. Ela garante que você sabe o que
                  escolheu e permite voltar sem perder respostas.
                </p>
              </header>
              <dl className="foundation-review-list">
                <div><dt>Pedido identificado</dt><dd>{optionLabel(FOUNDATION_REQUESTED_ACTION_OPTIONS, requestedActionId)}</dd></div>
                <div><dt>Ativo protegido</dt><dd>{optionLabel(FOUNDATION_ASSET_OPTIONS, protectedAssetId)}</dd></div>
                <div><dt>Consequência possível</dt><dd>{optionLabel(FOUNDATION_CONSEQUENCE_OPTIONS, potentialConsequenceId)}</dd></div>
                <div><dt>Pausa escolhida</dt><dd>{optionLabel(FOUNDATION_PAUSE_OPTIONS, pauseDecisionId)}</dd></div>
                <div><dt>Forma de avaliar</dt><dd>{optionLabel(FOUNDATION_EVALUATION_OPTIONS, evaluationId)}</dd></div>
              </dl>
              <nav className="foundation-nav" aria-label="Navegação da missão">
                <button type="button" className="text-button" onClick={() => moveTo(1)}>← Alterar respostas</button>
                <button type="button" className="primary-button dark" onClick={() => moveTo(5)}>Reconfirmar e responder</button>
              </nav>
            </section>
          ) : null}

          {stage === 5 ? (
            <section className="foundation-stage">
              <header className="foundation-stage-heading">
                <span className="pare-step-badge">R + E</span>
                <h2 ref={stageTitleRef} tabIndex={-1}>Reconfirme fora da mensagem e responda</h2>
                <p>
                  Você está verificando o e-mail que afirma que sua conta será
                  bloqueada em 30 minutos e oferece o botão “Confirmar conta”.
                  Primeiro escolha como consultar o estado da conta sem depender
                  desse e-mail. Depois decida o que é possível concluir e reportar.
                </p>
              </header>
              <div className="foundation-case-reminder">
                <span>Caso em análise</span>
                <strong>O e-mail diz que a conta será bloqueada; isso ainda não foi confirmado.</strong>
                <p>
                  Uma fonte é independente quando você já a conhecia antes de
                  receber o aviso e consegue acessá-la sem usar endereço, botão ou
                  contato fornecido pela própria mensagem.
                </p>
              </div>
              <RadioGroup
                legend="R · Para conferir se sua conta realmente será bloqueada, qual caminho não depende do e-mail recebido?"
                name="foundation-confirmation"
                value={confirmationRouteId}
                options={FOUNDATION_CONFIRMATION_OPTIONS}
                onChange={setConfirmationRouteId}
              />
              {confirmationRouteId === "known-official-reference" ? (
                <div className="foundation-official-status" role="status">
                  <span>{content.officialReference.label}</span>
                  <strong>{content.officialReference.address}</strong>
                  <p>{content.officialReference.serviceStatus}</p>
                </div>
              ) : null}
              <div className="foundation-two-columns">
                <RadioGroup
                  legend="Depois de consultar a Área oficial e ver que não existe bloqueio, o que é possível concluir sobre o e-mail?"
                  name="foundation-assessment"
                  value={finalAssessmentId}
                  options={FOUNDATION_ASSESSMENT_OPTIONS}
                  onChange={setFinalAssessmentId}
                />
                <RadioGroup
                  legend="E · Diante do e-mail suspeito e da conta ativa, qual é a resposta mais segura?"
                  name="foundation-action"
                  value={finalActionId}
                  options={FOUNDATION_FINAL_ACTION_OPTIONS}
                  onChange={setFinalActionId}
                />
              </div>
              <fieldset className="foundation-report-group">
                <legend>Se você reportar este e-mail suspeito, quais informações do caso podem ser incluídas com segurança?</legend>
                <p>
                  Selecione os fatos que ajudam a equipe responsável a investigar.
                  Não inclua senha, código de acesso ou dados pessoais sem relação
                  com o aviso.
                </p>
                {FOUNDATION_REPORT_OPTIONS.map((option) => (
                  <label key={option.id}>
                    <input
                      type="checkbox"
                      checked={reportDetailIds.includes(option.id)}
                      onChange={() => toggleReportDetail(option.id)}
                    />
                    <span>
                      <strong>{option.label}</strong>
                      {"detail" in option ? <small>{option.detail}</small> : null}
                    </span>
                  </label>
                ))}
              </fieldset>
              <nav className="foundation-nav" aria-label="Navegação da missão">
                <button type="button" className="text-button" onClick={() => moveTo(4)}>← Voltar à revisão</button>
                <button type="button" className="primary-button dark" disabled={!finalDecisionComplete} onClick={() => moveTo(6)}>Aplicar em outro alerta</button>
              </nav>
            </section>
          ) : null}

          {stage === 6 ? (
            <section className="foundation-stage">
              <header className="foundation-stage-heading">
                <span className="pare-step-badge">Transferência curta</span>
                <h2 ref={stageTitleRef} tabIndex={-1}>{content.transfer.title}</h2>
                <p>
                  Agora você recebeu outro aviso, mas ele não traz link e a Área
                  oficial confirma que sua senha realmente expira amanhã. Aplique
                  o mesmo processo sem classificar automaticamente todo aviso como
                  golpe.
                </p>
              </header>
              <article className="foundation-message legitimate" aria-label="Alerta legítimo simulado">
                <span>Mensagem fictícia de rotina</span>
                <h3>{content.transfer.subject}</h3>
                <p>De: <strong>{content.transfer.senderName}</strong> &lt;{content.transfer.senderAddress}&gt;</p>
                <p>{content.transfer.body}</p>
              </article>
              <div className="foundation-official-status">
                <span>Estado consultado pela referência conhecida</span>
                <strong>{content.officialReference.address}</strong>
                <p>{content.transfer.officialStatus}</p>
              </div>
              <RadioGroup
                legend="A mensagem diz que a senha expira amanhã e a Área oficial confirma isso. Como você deve agir?"
                name="foundation-transfer"
                value={transferDecisionId}
                options={FOUNDATION_TRANSFER_OPTIONS}
                onChange={setTransferDecisionId}
              />
              <nav className="foundation-nav" aria-label="Navegação da missão">
                <button type="button" className="text-button" onClick={() => moveTo(5)}>← Rever resposta principal</button>
                <button type="button" className="primary-button dark" disabled={!transferDecisionId || isSubmitting} onClick={finishMission}>
                  {isSubmitting ? "Registrando tentativa..." : "Concluir missão"}
                </button>
              </nav>
              <ActivityError className="foundation-error" message={submissionError} />
            </section>
          ) : null}

          {stage === 7 && displayResult ? (
            <section className="foundation-stage">
              <header className={displayResult.needsReview ? "foundation-result review" : "foundation-result success"}>
                <div><span>Resultado privado</span><strong>{displayResult.score}</strong><small>de 100</small></div>
                <div>
                  <span className="section-kicker">{displayResult.needsReview ? "Revisão recomendada" : "Processo concluído"}</span>
                  <h2 ref={stageTitleRef} tabIndex={-1}>{displayResult.needsReview ? "Você já tem um ponto claro para praticar" : "Você respondeu à pressão com processo"}</h2>
                  <p>{displayResult.needsReview ? PHISHING_FOUNDATION_V2_PACKAGE.feedback.review : PHISHING_FOUNDATION_V2_PACKAGE.feedback.success}</p>
                </div>
              </header>
              <div className="foundation-score-grid">
                <article><span>Pedido e impacto</span><strong>{displayResult.requestImpactPoints}/20</strong></article>
                <article><span>Pare e avalie</span><strong>{displayResult.pauseEvaluationPoints}/15</strong></article>
                <article><span>Reconfirme</span><strong>{displayResult.confirmationPoints}/25</strong></article>
                <article><span>Resposta e reporte</span><strong>{displayResult.responseReportPoints}/25</strong></article>
                <article><span>Alerta legítimo</span><strong>{displayResult.transferPoints}/15</strong></article>
              </div>
              <div className="foundation-reward-card">
                <span>Pontos gerais</span>
                <strong>{rewardGrantedInAttempt ? `+${displayResult.potentialReward}` : `${claimedPoints} registrados`}</strong>
                <p>{rewardGrantedInAttempt ? `Base de ${POINT_RULES.mainMission} + bônus de ${bonusPercentage}%.` : "A recompensa desta atividade já havia sido concedida; a repetição atualizou apenas o aprendizado."}</p>
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
                  status: Number(earned) === Number(maximum) ? "correct" as const : "review" as const,
                  userAnswer: `${earned} de ${maximum} pontos`,
                  explanation: String(explanation),
                }))}
              />
              <nav className="foundation-nav" aria-label="Ações do resultado">
                <button type="button" className="primary-button dark" onClick={() => moveTo(8)}>Entender o modelo PARE</button>
                <button type="button" className="text-button" onClick={onOpenProfile}>Ver meu perfil</button>
              </nav>
            </section>
          ) : null}

          {stage === 8 && displayResult ? (
            <section className="foundation-stage foundation-debrief">
              <header className="foundation-stage-heading">
                <span className="pare-step-badge">Debrief</span>
                <h2 ref={stageTitleRef} tabIndex={-1}>{PHISHING_FOUNDATION_V2_PACKAGE.debrief.title}</h2>
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
                <button type="button" className="primary-button dark" onClick={onOpenSenderLab}>Ir para Quem enviou de verdade?</button>
                <button type="button" className="text-button" onClick={onBackToMissions}>Voltar às Missões</button>
                <button type="button" className="text-button" onClick={resetMission}>Refazer missão</button>
              </nav>
            </section>
          ) : null}
        </div>
      </section>
    </ActivityShell>
  );
}
