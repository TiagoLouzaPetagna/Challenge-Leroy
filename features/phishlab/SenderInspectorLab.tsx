"use client";

import { useMemo, useState } from "react";
import { Check, ChevronDown } from "lucide-react";

import { ActivityAnswerReview } from "@/features/activities/primitives/ActivityAnswerReview";
import { ActivityNextStep } from "@/features/activities/primitives/ActivityNextStep";
import {
  EmailCard,
  Icon,
  LessonShell,
  Note,
  StageHeading,
  lessonStyles as s,
} from "@/features/activities/lesson/LessonShell";
import { useActivityStageFocus } from "@/features/activities/useActivityStageFocus";
import { usePostSubmitCelebration } from "@/features/activities/usePostSubmitCelebration";
import { Mascot } from "@/features/ui/LearningUI";
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
import type { AchievementDefinition } from "@/lib/content/achievement-catalog";
import type {
  LinkVerdict,
  PhishLabResult,
  TrueSenderV2Answer,
  TrueSenderV2Result,
} from "@/lib/domain/types";

const STEPS = ["Ler", "Entender", "Separar", "Decidir", "Praticar"] as const;
const LAST_STEP = STEPS.length - 1;

type Props = {
  existingResult: PhishLabResult | TrueSenderV2Result | null;
  existingCasePackageId: string | null;
  rewardAlreadyClaimed: boolean;
  claimedPoints: number;
  onComplete: (answer: TrueSenderV2Answer) => Promise<TrueSenderV2Result>;
  onBackToHub: () => void;
  onOpenDomainLab: () => void;
  onOpenProfile: () => void;
  getUnlockedAchievementIds: () => Set<string>;
  getNewlyUnlockedAchievements: (beforeIds: Set<string>) => AchievementDefinition[];
};

function label(options: readonly { id: string; label: string }[], id: string | null) {
  return options.find((option) => option.id === id)?.label ?? "Não respondido";
}

function Choices<T extends string>({
  legend,
  options,
  value,
  onChange,
  row = false,
}: {
  legend: string;
  options: readonly { id: T; label: string; detail?: string }[];
  value: T | null;
  onChange: (value: T) => void;
  row?: boolean;
}) {
  return (
    <div className={`${s.choices} ${row ? s.choicesRow : ""}`} role="group" aria-label={legend}>
      {options.map((option) => (
        <button
          key={option.id}
          type="button"
          className={s.choice}
          aria-pressed={value === option.id}
          onClick={() => onChange(option.id)}
        >
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

export function SenderInspectorLab({
  existingResult,
  existingCasePackageId,
  rewardAlreadyClaimed: _rewardAlreadyClaimed,
  claimedPoints: _claimedPoints,
  onComplete,
  onBackToHub,
  onOpenDomainLab,
  onOpenProfile,
  getUnlockedAchievementIds,
  getNewlyUnlockedAchievements,
}: Props) {
  const celebration = usePostSubmitCelebration("Quem enviou de verdade?", "var(--learn-teal)");
  const packageIndex = Math.max(
    0,
    TRUE_SENDER_V2_PACKAGES.findIndex((item) => item.casePackageId === existingCasePackageId),
  );
  const contentPackage = TRUE_SENDER_V2_PACKAGES[packageIndex];
  const content = contentPackage.content;
  const previous = existingResult && "mapPoints" in existingResult ? existingResult : null;

  const [stage, setStage] = useState(0);
  const [result, setResult] = useState<TrueSenderV2Result | null>(previous);
  const [relations, setRelations] = useState<Record<string, IdentityRelationId>>({});
  const [assessments, setAssessments] = useState<Record<string, IdentityClaimAssessmentId>>({});
  const [inspected, setInspected] = useState<string[]>([]);
  const [verdict, setVerdict] = useState<LinkVerdict | null>(null);
  const [route, setRoute] = useState<IdentityVerificationRouteId | null>(null);
  const [transferVerdict, setTransferVerdict] = useState<LinkVerdict | null>(null);
  const [transferRoute, setTransferRoute] = useState<IdentityVerificationRouteId | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const titleRef = useActivityStageFocus(stage, Boolean(celebration.screen));

  const allRelations = content.fields.every((field) => relations[field.id]);
  const allAssessments = content.claims.every((claim) => assessments[claim.id]);

  const pending = [
    null,
    allRelations ? null : "Escolha o que cada campo informa. Faltam alguns.",
    allAssessments ? null : "Diga se cada frase dá para ver no e-mail ou não.",
    !verdict ? "Escolha o que você faria com este e-mail." : !route ? "Escolha como confirmar." : null,
    !transferVerdict
      ? "Escolha o que você faria com o novo e-mail."
      : !transferRoute
        ? "Escolha como confirmar."
        : null,
  ][stage];

  const reviewItems = useMemo(() => {
    if (!result) return [];
    // Ao reabrir a atividade (ou após o remount da conclusão) só o resultado sobrevive,
    // então a revisão cai para o resumo por bloco de pontos.
    if (Object.keys(relations).length === 0) {
      return [
        {
          id: "map",
          title: "O que cada campo informa",
          status: result.mapPoints === 20 ? ("correct" as const) : ("review" as const),
          explanation: `${result.correctlyMappedFields} de ${result.totalMappedFields} campos certos.`,
        },
        {
          id: "proof",
          title: "Fato ou suposição",
          status: result.evidencePoints === 30 ? ("correct" as const) : ("review" as const),
          explanation: `${result.correctClaimAssessments} de ${result.totalClaimAssessments} frases classificadas certo.`,
        },
        {
          id: "conclusion",
          title: "Decisão e confirmação",
          status: result.conclusionPoints === 25 ? ("correct" as const) : ("review" as const),
          explanation: "A decisão precisa caber nos fatos, e a confirmação vir de fora do e-mail.",
        },
        {
          id: "transfer",
          title: "O segundo e-mail",
          status: result.transferPoints === 25 ? ("correct" as const) : ("review" as const),
          explanation: "A mesma regra precisa valer quando a aparência muda.",
        },
      ];
    }
    return [
      ...content.fields.map((field) => ({
        id: field.id,
        title: field.label,
        status: relations[field.id] === field.correctRelationId ? ("correct" as const) : ("review" as const),
        userAnswer: label(IDENTITY_RELATION_OPTIONS, relations[field.id] ?? null),
        expectedAnswer: label(IDENTITY_RELATION_OPTIONS, field.correctRelationId),
        explanation: field.explanation,
      })),
      ...content.claims.map((claim) => ({
        id: claim.id,
        title: claim.text,
        status: assessments[claim.id] === claim.correctAssessmentId ? ("correct" as const) : ("review" as const),
        userAnswer: label(IDENTITY_CLAIM_ASSESSMENT_OPTIONS, assessments[claim.id] ?? null),
        expectedAnswer: label(IDENTITY_CLAIM_ASSESSMENT_OPTIONS, claim.correctAssessmentId),
        explanation:
          claim.correctAssessmentId === "fact"
            ? "Está escrito no e-mail — é um fato observável."
            : "Pode ser verdade, mas o e-mail não prova. Trate como suposição.",
      })),
      {
        id: "verdict",
        title: "O que fazer com o e-mail",
        status: verdict === content.correctVerdictId ? ("correct" as const) : ("review" as const),
        userAnswer: label(IDENTITY_VERDICT_OPTIONS, verdict),
        expectedAnswer: label(IDENTITY_VERDICT_OPTIONS, content.correctVerdictId),
        explanation: "A decisão precisa caber nos fatos, não na aparência do e-mail.",
      },
      {
        id: "route",
        title: "Como confirmar",
        status: route === content.correctVerificationRouteId ? ("correct" as const) : ("review" as const),
        userAnswer: label(IDENTITY_VERIFICATION_OPTIONS, route),
        expectedAnswer: label(IDENTITY_VERIFICATION_OPTIONS, content.correctVerificationRouteId),
        explanation: "Um pedido nunca pode confirmar a si mesmo.",
      },
      {
        id: "transfer-verdict",
        title: "O novo e-mail",
        status:
          transferVerdict === content.transferCase.correctVerdictId ? ("correct" as const) : ("review" as const),
        userAnswer: label(IDENTITY_VERDICT_OPTIONS, transferVerdict),
        expectedAnswer: label(IDENTITY_VERDICT_OPTIONS, content.transferCase.correctVerdictId),
        explanation: "A mesma regra vale quando a aparência muda.",
      },
      {
        id: "transfer-route",
        title: "Como confirmar o novo e-mail",
        status:
          transferRoute === content.transferCase.correctVerificationRouteId
            ? ("correct" as const)
            : ("review" as const),
        userAnswer: label(IDENTITY_VERIFICATION_OPTIONS, transferRoute),
        expectedAnswer: label(IDENTITY_VERIFICATION_OPTIONS, content.transferCase.correctVerificationRouteId),
        explanation: "O caminho seguro já existia antes do e-mail chegar.",
      },
    ];
  }, [assessments, content, relations, result, route, transferRoute, transferVerdict, verdict]);

  function setRelation(fieldId: string, relationId: IdentityRelationId) {
    setRelations((current) => ({ ...current, [fieldId]: relationId }));
    setInspected((current) => (current.includes(fieldId) ? current : [...current, fieldId]));
  }

  async function advance() {
    setError("");
    if (stage < LAST_STEP) {
      setStage(stage + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    if (busy) return;
    setBusy(true);
    const beforeIds = getUnlockedAchievementIds();
    try {
      const evaluated = await onComplete({
        activityId: TRUE_SENDER_V2_ACTIVITY_ID,
        activityVersion: TRUE_SENDER_V2_ACTIVITY_VERSION,
        casePackageId: contentPackage.casePackageId,
        mechanicId: IDENTITY_MAP_MECHANIC_ID,
        answerPayload: {
          fieldRelationById: relations,
          claimAssessmentById: assessments,
          inspectedEvidenceIds: inspected,
          verdictId: verdict!,
          verificationRouteId: route!,
          transferVerdictId: transferVerdict!,
          transferVerificationRouteId: transferRoute!,
          usedHelpIds: [],
        },
      });
      setResult(evaluated);
      celebration.begin(getNewlyUnlockedAchievements(beforeIds));
    } catch {
      setError("Não foi possível salvar. Suas respostas continuam aqui; tente de novo.");
    } finally {
      setBusy(false);
    }
  }

  function restart() {
    setRelations({});
    setAssessments({});
    setInspected([]);
    setVerdict(null);
    setRoute(null);
    setTransferVerdict(null);
    setTransferRoute(null);
    setResult(null);
    setError("");
    setStage(0);
    celebration.reset();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  if (celebration.screen) return celebration.screen;

  if (result) {
    return (
      <div className={s.page}>
        <div className={s.result}>
          <div className={s.resultHero}>
            <Mascot pose="celebration" size="medium" />
            <div>
              <span className={s.microLabel}>
                {result.needsReview ? "CONCLUÍDO · HÁ O QUE REVER" : "CONCLUÍDO"}
              </span>
              <h3>
                {result.needsReview
                  ? "Você chegou ao fim. Vamos rever algumas respostas?"
                  : "Você viu o que o e-mail escondia."}
              </h3>
              <p>
                {result.needsReview ? contentPackage.feedback.review : contentPackage.feedback.success}
              </p>
            </div>
          </div>

          <details className={s.review} open>
            <summary>
              Rever minhas respostas
              <span>{result.score}/100 · só você vê</span>
              <Icon icon={ChevronDown} size={18} />
            </summary>
            <ActivityAnswerReview items={reviewItems} />
          </details>

          <ActivityNextStep area="PhishLab" title="Domínio sob a lupa" onOpen={onOpenDomainLab} />
          <div className="activity-completion-actions" aria-label="Ações após a conclusão">
            <button type="button" className="activity-completion-button" onClick={restart}>
              Praticar novamente
            </button>
            <button type="button" className="activity-completion-button" onClick={onBackToHub}>
              Voltar ao PhishLab
            </button>
            <button type="button" className="activity-completion-button" onClick={onOpenProfile}>
              Meu perfil
            </button>
          </div>
        </div>
      </div>
    );
  }

  const nextLabel = stage === LAST_STEP ? "Concluir" : "Continuar";

  return (
    <LessonShell
      activityId={TRUE_SENDER_V2_ACTIVITY_ID}
      area="PHISHLAB"
      topic="QUEM ENVIOU DE VERDADE?"
      title="Quem enviou de verdade?"
      steps={STEPS}
      stage={stage}
      pending={pending}
      nextLabel={nextLabel}
      onStageSelect={setStage}
      onNext={advance}
      busy={busy}
      error={error}
    >
      {stage === 0 ? (
        <>
          <StageHeading
            label="O QUE ACONTECEU"
            title="Chegou um e-mail pedindo seu código"
            instruction="Leia o e-mail com calma. Repare no endereço de quem enviou e para onde iria sua resposta."
            titleRef={titleRef}
          />
          <EmailCard
            subject={content.message.subject}
            senderName={content.fields[0].value}
            from={content.fields[1].value}
            replyTo={content.fields[2].value}
            body={content.message.body}
            note={content.message.note}
          />
          <div style={{ marginTop: 24 }}>
            <Note title="Uma coisa que você já sabe">{content.fields[4].value}</Note>
          </div>
        </>
      ) : null}

      {stage === 1 ? (
        <>
          <StageHeading
            label="CAMPO POR CAMPO"
            title="O que cada parte do e-mail te diz?"
            instruction="Para cada campo, escolha a opção que descreve o que ele informa."
            titleRef={titleRef}
          />
          <div className={s.fieldList}>
            {content.fields.map((field) => (
              <div key={field.id} className={s.field}>
                <span className={s.fieldLabel}>{field.label}</span>
                <strong className={s.fieldValue}>{field.value}</strong>
                <label className={s.fieldAsk} htmlFor={`relation-${field.id}`}>
                  O que isto me diz?
                </label>
                <select
                  id={`relation-${field.id}`}
                  className={s.select}
                  value={relations[field.id] ?? ""}
                  onChange={(event) => setRelation(field.id, event.target.value as IdentityRelationId)}
                >
                  <option value="" disabled>
                    Escolha uma opção
                  </option>
                  {IDENTITY_RELATION_OPTIONS.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>
        </>
      ) : null}

      {stage === 2 ? (
        <>
          <StageHeading
            label="FATO OU SUPOSIÇÃO"
            title="O que dá para afirmar de verdade?"
            instruction="Algumas frases estão escritas no e-mail. Outras você só está supondo. Separe as duas."
            titleRef={titleRef}
          />
          <div className={s.fieldList}>
            {content.claims.map((claim, index) => (
              <div key={claim.id} className={s.claim}>
                <span className={s.claimText}>
                  <span className={s.claimIndex}>{index + 1}.</span>
                  {claim.text}
                </span>
                <Choices
                  legend={claim.text}
                  options={IDENTITY_CLAIM_ASSESSMENT_OPTIONS}
                  value={assessments[claim.id] ?? null}
                  onChange={(value) => setAssessments((current) => ({ ...current, [claim.id]: value }))}
                  row
                />
              </div>
            ))}
          </div>
        </>
      ) : null}

      {stage === 3 ? (
        <>
          <StageHeading
            label="SUA DECISÃO"
            title="E agora, o que você faz?"
            instruction="Escolha o que fazer com o e-mail e como você confirmaria se ele é verdadeiro."
            titleRef={titleRef}
          />
          <div className={s.decisionBlock}>
            <h3>
              <span className={s.taskNumber}>1</span> O que você faz com este e-mail?
            </h3>
            <Choices
              legend="O que você faz com este e-mail?"
              options={IDENTITY_VERDICT_OPTIONS}
              value={verdict}
              onChange={setVerdict}
            />
          </div>
          <div className={s.decisionBlock}>
            <h3>
              <span className={s.taskNumber}>2</span> Como você confirmaria?
            </h3>
            <Choices
              legend="Como você confirmaria?"
              options={IDENTITY_VERIFICATION_OPTIONS}
              value={route}
              onChange={setRoute}
            />
          </div>
        </>
      ) : null}

      {stage === 4 ? (
        <>
          <StageHeading
            label="AGORA NA PRÁTICA"
            title={content.transferCase.title}
            instruction={content.transferCase.context}
            titleRef={titleRef}
          />
          <dl className={s.factList}>
            {content.transferCase.fieldSummary.map((field) => (
              <div key={field.label}>
                <dt>{field.label}</dt>
                <dd>{field.value}</dd>
              </div>
            ))}
          </dl>
          <div className={s.decisionBlock}>
            <h3>
              <span className={s.taskNumber}>1</span> O que você faz com este?
            </h3>
            <Choices
              legend="O que você faz com este e-mail?"
              options={IDENTITY_VERDICT_OPTIONS}
              value={transferVerdict}
              onChange={setTransferVerdict}
            />
          </div>
          <div className={s.decisionBlock}>
            <h3>
              <span className={s.taskNumber}>2</span> Como você confirmaria?
            </h3>
            <Choices
              legend="Como você confirmaria?"
              options={IDENTITY_VERIFICATION_OPTIONS}
              value={transferRoute}
              onChange={setTransferRoute}
            />
          </div>
        </>
      ) : null}
    </LessonShell>
  );
}
