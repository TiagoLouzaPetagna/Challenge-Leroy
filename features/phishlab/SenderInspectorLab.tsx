"use client";

import { useEffect, useMemo, useState } from "react";

import { ActivityShell } from "@/features/activities/ActivityShell";
import { ActivityAnswerReview } from "@/features/activities/primitives/ActivityAnswerReview";
import { ActivityError } from "@/features/activities/primitives/ActivityError";
import { useActivityStageFocus } from "@/features/activities/useActivityStageFocus";
import {
  IDENTITY_CLAIM_ASSESSMENT_OPTIONS,
  IDENTITY_MAP_MECHANIC_ID,
  IDENTITY_RELATION_OPTIONS,
  IDENTITY_VERDICT_OPTIONS,
  IDENTITY_VERIFICATION_OPTIONS,
  TRUE_SENDER_V2_ACTIVITY_ID,
  TRUE_SENDER_V2_ACTIVITY_VERSION,
  TRUE_SENDER_V2_PACKAGES,
  type IdentityClaimAssessmentId,
  type IdentityRelationId,
  type IdentityVerificationRouteId,
} from "@/lib/content/activities/true-sender/v2";
import { calculatePerformanceBonus, POINT_RULES } from "@/lib/domain/rules";
import type {
  LinkVerdict,
  PhishLabResult,
  TrueSenderV2Answer,
  TrueSenderV2Result,
} from "@/lib/domain/types";

const STAGES = [
  "Abertura",
  "Como ler os campos",
  "Mapa da identidade",
  "Comprovado ou não comprovado",
  "Conclusão e confirmação",
  "Revisão",
  "Transferência",
  "Resultado",
  "Debrief",
] as const;

type SenderInspectorLabProps = {
  existingResult: PhishLabResult | TrueSenderV2Result | null;
  existingCasePackageId: string | null;
  rewardAlreadyClaimed: boolean;
  claimedPoints: number;
  onComplete: (answer: TrueSenderV2Answer) => Promise<TrueSenderV2Result>;
  onBackToHub: () => void;
  onOpenDomainLab: () => void;
  onOpenProfile: () => void;
};

function scrollToTop() {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
}

function ProgressSummary({ currentStep }: { currentStep: number }) {
  const previous = currentStep > 0 ? STAGES[currentStep - 1] : null;
  const next = currentStep < STAGES.length - 1 ? STAGES[currentStep + 1] : null;

  return (
    <section className="identity-progress" aria-label="Progresso do laboratório">
      <header>
        <span>Jornada deste PhishLab</span>
        <strong>Etapa {currentStep + 1} de {STAGES.length}</strong>
      </header>
      <progress
        max={STAGES.length}
        value={currentStep + 1}
        aria-label={`Progresso: etapa ${currentStep + 1} de ${STAGES.length}`}
      />
      <ol>
        <li className="complete">
          <span>Concluído</span>
          <strong>{previous ?? "Nenhuma etapa ainda"}</strong>
          <small>{currentStep} de {STAGES.length} etapas concluídas</small>
        </li>
        <li className="active" aria-current="step">
          <span>Agora</span>
          <strong>{STAGES[currentStep]}</strong>
          <small>Esta é a tarefa aberta neste momento.</small>
        </li>
        <li>
          <span>A seguir</span>
          <strong>{next ?? "Fim do laboratório"}</strong>
          <small>
            {next
              ? `${STAGES.length - currentStep - 1} etapas ainda serão percorridas.`
              : "O percurso termina depois desta explicação."}
          </small>
        </li>
      </ol>
    </section>
  );
}

function ChoiceGroup<T extends string>({
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
    <fieldset className="identity-choice-group">
      <legend>{legend}</legend>
      {options.map((option) => (
        <label key={option.id} className={value === option.id ? "selected" : ""}>
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

function findOptionLabel(
  options: readonly { id: string; label: string }[],
  id: string | null | undefined,
) {
  return options.find((option) => option.id === id)?.label ?? "Não respondido";
}

export function SenderInspectorLab({
  existingResult,
  existingCasePackageId,
  rewardAlreadyClaimed,
  claimedPoints,
  onComplete,
  onBackToHub,
  onOpenDomainLab,
  onOpenProfile,
}: SenderInspectorLabProps) {
  const initialPackageIndex = Math.max(
    0,
    TRUE_SENDER_V2_PACKAGES.findIndex(
      (item) => item.casePackageId === existingCasePackageId,
    ),
  );
  const existingV2Result =
    existingResult && "mapPoints" in existingResult ? existingResult : null;
  const historicalV1Result =
    existingResult && !("mapPoints" in existingResult) ? existingResult : null;
  const [packageIndex, setPackageIndex] = useState(initialPackageIndex);
  const contentPackage = TRUE_SENDER_V2_PACKAGES[packageIndex];
  const content = contentPackage.content;
  const [stage, setStage] = useState(existingV2Result ? 7 : 0);
  const [fieldRelationById, setFieldRelationById] = useState<
    Record<string, IdentityRelationId>
  >({});
  const [claimAssessmentById, setClaimAssessmentById] = useState<
    Record<string, IdentityClaimAssessmentId>
  >({});
  const [inspectedEvidenceIds, setInspectedEvidenceIds] = useState<string[]>([]);
  const [verdictId, setVerdictId] = useState<LinkVerdict | null>(null);
  const [verificationRouteId, setVerificationRouteId] =
    useState<IdentityVerificationRouteId | null>(null);
  const [transferVerdictId, setTransferVerdictId] =
    useState<LinkVerdict | null>(null);
  const [transferVerificationRouteId, setTransferVerificationRouteId] =
    useState<IdentityVerificationRouteId | null>(null);
  const [usedHelpIds, setUsedHelpIds] = useState<string[]>([]);
  const [displayResult, setDisplayResult] = useState<TrueSenderV2Result | null>(
    existingV2Result,
  );
  const [rewardGrantedInAttempt, setRewardGrantedInAttempt] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const stageTitleRef = useActivityStageFocus(stage);

  useEffect(() => {
    if (stage !== 7 || !displayResult) return;

    const frame = window.requestAnimationFrame(() =>
      stageTitleRef.current?.focus(),
    );
    return () => window.cancelAnimationFrame(frame);
  }, [displayResult, stage, stageTitleRef]);

  const allFieldsMapped = content.fields.every(
    (field) => fieldRelationById[field.id],
  );
  const allClaimsAssessed = content.claims.every(
    (claim) => claimAssessmentById[claim.id],
  );
  const relationRows = useMemo(
    () =>
      content.fields.map((field) => ({
        ...field,
        selectedLabel: findOptionLabel(
          IDENTITY_RELATION_OPTIONS,
          fieldRelationById[field.id],
        ),
      })),
    [content.fields, fieldRelationById],
  );
  const answerReviewItems = useMemo(() => {
    if (!displayResult) return [];

    if (Object.keys(fieldRelationById).length === 0) {
      return [
        {
          id: "map",
          title: "Relação entre os campos",
          status: displayResult.mapPoints === 20 ? "correct" as const : "review" as const,
          explanation: `${displayResult.correctlyMappedFields} de ${displayResult.totalMappedFields} campos foram relacionados corretamente.`,
        },
        {
          id: "proof",
          title: "Comprovado ou não comprovado",
          status: displayResult.evidencePoints === 30 ? "correct" as const : "review" as const,
          explanation: `${displayResult.correctClaimAssessments} de ${displayResult.totalClaimAssessments} afirmações foram classificadas corretamente.`,
        },
        {
          id: "conclusion",
          title: "Conclusão e confirmação",
          status: displayResult.conclusionPoints === 25 ? "correct" as const : "review" as const,
          explanation: "A conclusão deve ser proporcional aos fatos e a confirmação precisa usar uma rota independente.",
        },
        {
          id: "transfer",
          title: "Aplicação em outro contexto",
          status: displayResult.transferPoints === 25 ? "correct" as const : "review" as const,
          explanation: "O mesmo processo deve continuar válido quando a aparência do caso muda.",
        },
      ];
    }

    return [
      ...content.fields.map((field) => {
        const selected = fieldRelationById[field.id];
        return {
          id: `field-${field.id}`,
          title: field.label,
          status: selected === field.correctRelationId ? "correct" as const : "review" as const,
          userAnswer: findOptionLabel(IDENTITY_RELATION_OPTIONS, selected),
          expectedAnswer: findOptionLabel(IDENTITY_RELATION_OPTIONS, field.correctRelationId),
          explanation: field.explanation,
        };
      }),
      ...content.claims.map((claim) => {
        const selected = claimAssessmentById[claim.id];
        return {
          id: `claim-${claim.id}`,
          title: claim.text,
          status: selected === claim.correctAssessmentId ? "correct" as const : "review" as const,
          userAnswer: findOptionLabel(IDENTITY_CLAIM_ASSESSMENT_OPTIONS, selected),
          expectedAnswer: findOptionLabel(IDENTITY_CLAIM_ASSESSMENT_OPTIONS, claim.correctAssessmentId),
          explanation:
            claim.correctAssessmentId === "fact"
              ? "A afirmação aparece diretamente nos dados apresentados."
              : "Os dados não bastam para comprovar essa afirmação; ela pode continuar possível sem virar fato.",
        };
      }),
      {
        id: "main-verdict",
        title: "Conclusão sobre a mensagem",
        status: verdictId === content.correctVerdictId ? "correct" as const : "review" as const,
        userAnswer: findOptionLabel(IDENTITY_VERDICT_OPTIONS, verdictId),
        expectedAnswer: findOptionLabel(IDENTITY_VERDICT_OPTIONS, content.correctVerdictId),
        explanation: "A conclusão precisa corresponder ao conjunto de fatos, sem atribuir uma pessoa apenas pelo endereço.",
      },
      {
        id: "main-route",
        title: "Rota de confirmação",
        status: verificationRouteId === content.correctVerificationRouteId ? "correct" as const : "review" as const,
        userAnswer: findOptionLabel(IDENTITY_VERIFICATION_OPTIONS, verificationRouteId),
        expectedAnswer: findOptionLabel(IDENTITY_VERIFICATION_OPTIONS, content.correctVerificationRouteId),
        explanation: "Uma solicitação não pode confirmar a própria identidade ou segurança.",
      },
      {
        id: "transfer-verdict",
        title: "Conclusão no segundo caso",
        status: transferVerdictId === content.transferCase.correctVerdictId ? "correct" as const : "review" as const,
        userAnswer: findOptionLabel(IDENTITY_VERDICT_OPTIONS, transferVerdictId),
        expectedAnswer: findOptionLabel(IDENTITY_VERDICT_OPTIONS, content.transferCase.correctVerdictId),
        explanation: "A mesma regra precisa funcionar em outra aparência ou canal.",
      },
      {
        id: "transfer-route",
        title: "Confirmação no segundo caso",
        status: transferVerificationRouteId === content.transferCase.correctVerificationRouteId ? "correct" as const : "review" as const,
        userAnswer: findOptionLabel(IDENTITY_VERIFICATION_OPTIONS, transferVerificationRouteId),
        expectedAnswer: findOptionLabel(IDENTITY_VERIFICATION_OPTIONS, content.transferCase.correctVerificationRouteId),
        explanation: "A rota segura já existia fora da solicitação analisada.",
      },
    ];
  }, [
    claimAssessmentById,
    content,
    displayResult,
    fieldRelationById,
    transferVerdictId,
    transferVerificationRouteId,
    verdictId,
    verificationRouteId,
  ]);

  const goToStage = (nextStage: number) => {
    setError("");
    setStage(nextStage);
    scrollToTop();
  };

  const mapField = (fieldId: string, relationId: IdentityRelationId) => {
    setFieldRelationById((current) => ({ ...current, [fieldId]: relationId }));
    setInspectedEvidenceIds((current) =>
      current.includes(fieldId) ? current : [...current, fieldId],
    );
  };

  const resetAnswers = (nextPackageIndex = packageIndex) => {
    setPackageIndex(nextPackageIndex);
    setFieldRelationById({});
    setClaimAssessmentById({});
    setInspectedEvidenceIds([]);
    setVerdictId(null);
    setVerificationRouteId(null);
    setTransferVerdictId(null);
    setTransferVerificationRouteId(null);
    setUsedHelpIds([]);
    setDisplayResult(null);
    setRewardGrantedInAttempt(false);
    setIsSubmitting(false);
    setError("");
    setStage(0);
    scrollToTop();
  };

  const finish = async () => {
    if (
      !allFieldsMapped ||
      !allClaimsAssessed ||
      !verdictId ||
      !verificationRouteId ||
      !transferVerdictId ||
      !transferVerificationRouteId
    ) {
      setError("Revise as etapas: ainda existe uma resposta obrigatória em branco.");
      return;
    }

    setIsSubmitting(true);
    setError("");
    const grantsFirstReward = !rewardAlreadyClaimed;
    const answer: TrueSenderV2Answer = {
      activityId: TRUE_SENDER_V2_ACTIVITY_ID,
      activityVersion: TRUE_SENDER_V2_ACTIVITY_VERSION,
      casePackageId: contentPackage.casePackageId,
      mechanicId: IDENTITY_MAP_MECHANIC_ID,
      answerPayload: {
        fieldRelationById,
        claimAssessmentById,
        inspectedEvidenceIds,
        verdictId,
        verificationRouteId,
        transferVerdictId,
        transferVerificationRouteId,
        usedHelpIds,
      },
    };

    try {
      const result = await onComplete(answer);
      setDisplayResult(result);
      setRewardGrantedInAttempt(grantsFirstReward);
      goToStage(7);
    } catch {
      setError(
        "Não foi possível registrar o laboratório. Suas respostas continuam na tela para uma nova tentativa.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const bonusPoints = displayResult
    ? Math.round(
        POINT_RULES.phishLab * calculatePerformanceBonus(displayResult.score),
      )
    : 0;

  return (
    <ActivityShell
      activityId={TRUE_SENDER_V2_ACTIVITY_ID}
      className="page-stack identity-map-page"
    >
      <section className="identity-map-shell">
        <header className="identity-map-hero">
          <div>
            <span className="section-badge">PhishLab · Quem enviou de verdade?</span>
              <h1>Separe o que está comprovado do que ainda não está</h1>
            <p>
              Cada campo da mensagem responde a uma pergunta diferente. Monte o
              mapa antes de decidir o que os dados realmente comprovam.
            </p>
          </div>
          <aside>
            <span>Caso atribuído</span>
            <strong>{content.pathLabel}</strong>
            <small>60 pontos-base · sem cronômetro</small>
          </aside>
        </header>

        <ProgressSummary currentStep={stage} />

        {stage === 0 ? (
          <section className="identity-stage identity-opening">
            <header>
              <span className="section-kicker">Antes de começar</span>
              <h2 ref={stageTitleRef} tabIndex={-1}>Seu papel e sua tarefa</h2>
              <p>
                Este laboratório não pede que você adivinhe quem é o atacante. Ele
                pede que você diga exatamente o que os dados comprovam e onde ainda
                falta confirmação.
              </p>
            </header>
            <div className="identity-context-grid">
              <article><span>Seu papel</span><p>{content.role}</p></article>
              <article><span>O que aconteceu</span><p>{content.situation}</p></article>
              <article><span>Sua tarefa</span><p>{content.task}</p></article>
              <article><span>O que o processo protege</span><p>{content.protectedConsequence}</p></article>
            </div>
            {historicalV1Result ? (
              <p className="identity-history-note">
                Seu resultado anterior de {historicalV1Result.score}/100 continua
                preservado. Esta nova versão não concede a recompensa novamente.
              </p>
            ) : null}
            <div className="identity-nav">
              <button type="button" className="primary-button dark" onClick={() => goToStage(1)}>
                Aprender a ler os campos
              </button>
              <button type="button" className="text-button" onClick={onBackToHub}>
                Voltar às estações
              </button>
            </div>
          </section>
        ) : null}

        {stage === 1 ? (
          <section className="identity-stage">
            <header>
              <span className="section-kicker">Exemplo guiado · não pontuado</span>
              <h2 ref={stageTitleRef} tabIndex={-1}>{content.calibration.title}</h2>
              <p>{content.calibration.body}</p>
            </header>
            <div className="identity-calibration-grid">
              {content.calibration.examples.map((example) => (
                <article key={example.field}>
                  <strong>{example.field}</strong>
                  <p><span>Comprova:</span> {example.proves}</p>
                  <p><span>Não comprova:</span> {example.doesNotProve}</p>
                </article>
              ))}
            </div>
            <div className="identity-learning-callout">
              <strong>A regra que vale para todo o laboratório</strong>
              <p>
                O campo <b>De</b> mostra a conta usada. Ele não comprova, sozinho,
                qual pessoa controla essa conta agora.
              </p>
            </div>
            <div className="identity-nav">
              <button type="button" className="text-button" onClick={() => goToStage(0)}>Voltar</button>
              <button type="button" className="primary-button dark" onClick={() => goToStage(2)}>
                Montar o mapa do caso
              </button>
            </div>
          </section>
        ) : null}

        {stage === 2 ? (
          <section className="identity-stage">
            <header>
              <span className="section-kicker">Caso principal · mapa da identidade</span>
              <h2 ref={stageTitleRef} tabIndex={-1}>O que cada campo desta mensagem informa?</h2>
              <p>
                Leia a mensagem fictícia e, em cada linha, escolha apenas a função
                daquele campo. Todas as relações podem ser feitas por teclado.
              </p>
            </header>
            <article className="identity-message" aria-label="Mensagem fictícia do caso">
              <span>Assunto</span>
              <h3>{content.message.subject}</h3>
              <p>{content.message.body}</p>
              <small>{content.message.note}</small>
            </article>
            <div className="identity-map-grid">
              {content.fields.map((field) => (
                <article key={field.id} className="identity-field-card">
                  <header><span>{field.label}</span><strong>{field.value}</strong></header>
                  <label htmlFor={`${field.id}-relation`}>Este campo informa:</label>
                  <select
                    id={`${field.id}-relation`}
                    value={fieldRelationById[field.id] ?? ""}
                    onChange={(event) => mapField(field.id, event.target.value as IdentityRelationId)}
                  >
                    <option value="" disabled>Escolha a relação</option>
                    {IDENTITY_RELATION_OPTIONS.map((option) => (
                      <option key={option.id} value={option.id}>{option.label}</option>
                    ))}
                  </select>
                  <details
                    onToggle={(event) => {
                      if (event.currentTarget.open) {
                        setInspectedEvidenceIds((current) =>
                          current.includes(field.id) ? current : [...current, field.id],
                        );
                      }
                    }}
                  >
                    <summary>Por que este campo importa?</summary>
                    <p>{field.explanation}</p>
                  </details>
                </article>
              ))}
            </div>
            <aside className="identity-map-summary" aria-label="Mapa textual atual">
              <h3>Mapa que você está construindo</h3>
              <dl>
                {relationRows.map((row) => (
                  <div key={row.id}><dt>{row.label}</dt><dd>{row.selectedLabel}</dd></div>
                ))}
              </dl>
            </aside>
            <div className="identity-nav">
              <button type="button" className="text-button" onClick={() => goToStage(1)}>Voltar</button>
              <button type="button" className="primary-button dark" disabled={!allFieldsMapped} onClick={() => goToStage(3)}>
                Classificar o que está comprovado
              </button>
            </div>
          </section>
        ) : null}

        {stage === 3 ? (
          <section className="identity-stage">
            <header>
              <span className="section-kicker">Caso principal · alcance das evidências</span>
              <h2 ref={stageTitleRef} tabIndex={-1}>O que já sabemos e o que ainda não sabemos?</h2>
              <p>
                Para cada afirmação, indique se ela é mostrada diretamente, se é uma
                comprovada ou se ainda não está comprovada pelos dados disponíveis.
              </p>
            </header>
            <div className="identity-claim-list">
              {content.claims.map((claim, index) => (
                <ChoiceGroup
                  key={claim.id}
                  legend={`${index + 1}. ${claim.text}`}
                  name={`${claim.id}-assessment`}
                  value={claimAssessmentById[claim.id] ?? null}
                  options={IDENTITY_CLAIM_ASSESSMENT_OPTIONS}
                  onChange={(assessmentId) =>
                    setClaimAssessmentById((current) => ({...current, [claim.id]: assessmentId}))
                  }
                />
              ))}
            </div>
            <button
              type="button"
              className="identity-help-button"
              aria-pressed={usedHelpIds.includes("identity-reference")}
              onClick={() =>
                setUsedHelpIds((current) =>
                  current.includes("identity-reference")
                    ? current.filter((id) => id !== "identity-reference")
                    : [...current, "identity-reference"],
                )
              }
            >
              {usedHelpIds.includes("identity-reference")
                ? "Referência aberta: comprovado exige apoio direto; não comprovado marca o limite dos dados."
                : "Abrir referência: comprovado e não comprovado"}
            </button>
            <div className="identity-nav">
              <button type="button" className="text-button" onClick={() => goToStage(2)}>Voltar ao mapa</button>
              <button type="button" className="primary-button dark" disabled={!allClaimsAssessed} onClick={() => goToStage(4)}>
                Decidir e escolher confirmação
              </button>
            </div>
          </section>
        ) : null}

        {stage === 4 ? (
          <section className="identity-stage">
            <header>
              <span className="section-kicker">Caso principal · decisão</span>
              <h2 ref={stageTitleRef} tabIndex={-1}>O conjunto de evidências permite fazer o quê?</h2>
              <p>
                Você não está decidindo se o endereço existe. Está decidindo se a
                identidade e o pedido estão suficientemente confirmados para seguir.
              </p>
            </header>
            <div className="identity-decision-grid">
              <ChoiceGroup
                legend="Como você classifica esta mensagem neste contexto?"
                name="identity-main-verdict"
                value={verdictId}
                options={IDENTITY_VERDICT_OPTIONS}
                onChange={setVerdictId}
              />
              <div>
                <div className="identity-definition">
                  <strong>Confirmação independente</strong>
                  <p>
                    É uma rota que você já conhecia antes da mensagem e que pode abrir
                    sem usar link, endereço ou contato fornecido pela própria solicitação.
                  </p>
                </div>
                <ChoiceGroup
                  legend="Qual rota você usaria para confirmar este pedido?"
                  name="identity-main-route"
                  value={verificationRouteId}
                  options={IDENTITY_VERIFICATION_OPTIONS}
                  onChange={setVerificationRouteId}
                />
              </div>
            </div>
            <div className="identity-nav">
              <button type="button" className="text-button" onClick={() => goToStage(3)}>Voltar</button>
              <button type="button" className="primary-button dark" disabled={!verdictId || !verificationRouteId} onClick={() => goToStage(5)}>
                Revisar resposta principal
              </button>
            </div>
          </section>
        ) : null}

        {stage === 5 ? (
          <section className="identity-stage">
            <header>
              <span className="section-kicker">Revisão antes da conclusão</span>
              <h2 ref={stageTitleRef} tabIndex={-1}>Confira o raciocínio que você montou</h2>
              <p>
                Nada foi enviado. Você ainda pode corrigir o mapa, as afirmações e a
                rota de confirmação antes do exemplo final.
              </p>
            </header>
            <div className="identity-review-grid">
              <article><span>Mapa</span><strong>{Object.keys(fieldRelationById).length}/{content.fields.length} campos relacionados</strong><button type="button" onClick={() => goToStage(2)}>Revisar mapa</button></article>
              <article><span>Comprovação</span><strong>{Object.keys(claimAssessmentById).length}/{content.claims.length} afirmações classificadas</strong><button type="button" onClick={() => goToStage(3)}>Revisar afirmações</button></article>
              <article><span>Conclusão</span><strong>{findOptionLabel(IDENTITY_VERDICT_OPTIONS, verdictId)}</strong><button type="button" onClick={() => goToStage(4)}>Revisar conclusão</button></article>
              <article><span>Confirmação</span><strong>{findOptionLabel(IDENTITY_VERIFICATION_OPTIONS, verificationRouteId)}</strong><button type="button" onClick={() => goToStage(4)}>Revisar rota</button></article>
            </div>
            <div className="identity-nav">
              <button type="button" className="text-button" onClick={() => goToStage(4)}>Voltar</button>
              <button type="button" className="primary-button dark" onClick={() => goToStage(6)}>Aplicar em outro contexto</button>
            </div>
          </section>
        ) : null}

        {stage === 6 ? (
          <section className="identity-stage">
            <header>
              <span className="section-kicker">Transferência curta</span>
              <h2 ref={stageTitleRef} tabIndex={-1}>{content.transferCase.title}</h2>
              <p>{content.transferCase.context}</p>
            </header>
            <dl className="identity-transfer-facts">
              {content.transferCase.fieldSummary.map((field) => (
                <div key={field.label}><dt>{field.label}</dt><dd>{field.value}</dd></div>
              ))}
            </dl>
            <div className="identity-decision-grid">
              <ChoiceGroup legend="Como você classifica este novo caso?" name="identity-transfer-verdict" value={transferVerdictId} options={IDENTITY_VERDICT_OPTIONS} onChange={setTransferVerdictId} />
              <ChoiceGroup legend="Qual rota sustenta sua decisão?" name="identity-transfer-route" value={transferVerificationRouteId} options={IDENTITY_VERIFICATION_OPTIONS} onChange={setTransferVerificationRouteId} />
            </div>
            <ActivityError message={error} className="identity-error" />
            <div className="identity-nav">
              <button type="button" className="text-button" onClick={() => goToStage(5)}>Voltar à revisão</button>
              <button type="button" className="primary-button dark" disabled={!transferVerdictId || !transferVerificationRouteId || isSubmitting} onClick={finish}>
                {isSubmitting ? "Registrando..." : "Concluir laboratório"}
              </button>
            </div>
          </section>
        ) : null}

        {stage === 7 && displayResult ? (
          <section className={`identity-stage identity-result ${displayResult.needsReview ? "review" : "success"}`}>
            <header>
              <span className="section-kicker">Resultado privado</span>
              <h2 ref={stageTitleRef} tabIndex={-1}>{displayResult.score}/100</h2>
              <p>{displayResult.needsReview ? contentPackage.feedback.review : contentPackage.feedback.success}</p>
            </header>
            <div className="identity-score-grid">
              <article><span>Mapa</span><strong>{displayResult.mapPoints}/20</strong><p>{displayResult.correctlyMappedFields}/{displayResult.totalMappedFields} relações corretas.</p></article>
              <article><span>Comprovado ou não</span><strong>{displayResult.evidencePoints}/30</strong><p>{displayResult.correctClaimAssessments}/{displayResult.totalClaimAssessments} classificações corretas.</p></article>
              <article><span>Conclusão e rota</span><strong>{displayResult.conclusionPoints}/25</strong><p>Decisão proporcional e confirmação independente.</p></article>
              <article><span>Transferência</span><strong>{displayResult.transferPoints}/25</strong><p>Aplicação do mesmo processo em outro contexto.</p></article>
              <article className="identity-reward-card"><span>Pontos gerais</span><strong>{rewardGrantedInAttempt ? `+${displayResult.potentialReward}` : `${claimedPoints} registrados`}</strong><p>Base {POINT_RULES.phishLab} + bônus de {bonusPoints}. Repetições não duplicam a recompensa.</p></article>
            </div>
            {displayResult.criticalFailureIds.length > 0 ? (
              <div className="identity-critical-review">
                <strong>Pontos para revisar</strong>
                <ul>
                  {displayResult.criticalFailureIds.includes("human-control") ? <li>Um campo da mensagem foi tratado como prova de quem controla a conta.</li> : null}
                  {displayResult.criticalFailureIds.includes("independent-route") ? <li>A rota escolhida ainda dependia da própria solicitação ou não confirmava o processo.</li> : null}
                  {displayResult.criticalFailureIds.includes("secret-sharing") ? <li>Código temporário é segredo e nunca deve ser usado para validar quem pede esse mesmo código.</li> : null}
                </ul>
              </div>
            ) : null}
            <ActivityAnswerReview items={answerReviewItems} />
            <div className="identity-nav">
              <button type="button" className="primary-button dark" onClick={() => goToStage(8)}>Ver debrief</button>
              <button type="button" className="text-button" onClick={onOpenProfile}>Ver no Meu perfil</button>
            </div>
          </section>
        ) : null}

        {stage === 8 && displayResult ? (
          <section className="identity-stage identity-debrief">
            <header>
              <span className="section-kicker">Debrief</span>
              <h2 ref={stageTitleRef} tabIndex={-1}>{contentPackage.debrief.title}</h2>
              <p>{contentPackage.debrief.body}</p>
            </header>
            <div className="identity-debrief-grid">
              <article><span>Fato</span><p>O From mostra a conta apresentada como origem; o Reply-To mostra o destino da resposta.</p></article>
              <article><span>Hipótese</span><p>Personificação ou conta comprometida podem explicar o caso, mas exigem confirmação.</p></article>
              <article><span>Limite</span><p>A tela comum não prova toda falsificação técnica nem a pessoa que controla a conta.</p></article>
              <article><span>Resposta segura</span><p>Use uma rota conhecida fora da mensagem e nunca compartilhe senha ou código.</p></article>
            </div>
            <aside className="identity-next-panel">
              <div><span>Próxima prática</span><strong>Domínio sob a lupa</strong><p>Agora você vai separar as partes de um endereço e localizar a origem real.</p></div>
              <button type="button" className="primary-button light" onClick={onOpenDomainLab}>Abrir próximo PhishLab</button>
            </aside>
            <div className="identity-nav wrap">
              <button type="button" className="text-button" onClick={() => resetAnswers((packageIndex + 1) % TRUE_SENDER_V2_PACKAGES.length)}>Praticar com outro caso</button>
              <button type="button" className="text-button" onClick={() => resetAnswers(packageIndex)}>Refazer este caso</button>
              <button type="button" className="text-button" onClick={onBackToHub}>Voltar às estações</button>
            </div>
          </section>
        ) : null}
      </section>
    </ActivityShell>
  );
}
