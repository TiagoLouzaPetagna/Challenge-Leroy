"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import {
  ArrowDown,
  ArrowUp,
  Ban,
  BookOpen,
  Check,
  ChevronDown,
  Clock,
  Link2,
  ListOrdered,
  MousePointerClick,
  Search,
  Users,
  Zap,
  type LucideIcon,
} from "lucide-react";

import { ActivityAnswerReview } from "@/features/activities/primitives/ActivityAnswerReview";
import {
  Icon,
  LessonShell,
  Note,
  StageHeading,
  lessonStyles as s,
} from "@/features/activities/lesson/LessonShell";
import { Mascot } from "@/features/ui/LearningUI";
import { ActivityNextStep } from "@/features/activities/primitives/ActivityNextStep";
import { usePostSubmitCelebration } from "@/features/activities/usePostSubmitCelebration";
import {
  findRecoveryBuilderV2Package,
  RECOVERY_ACTION_GROUP_OPTIONS,
  RECOVERY_BUILDER_ACTIVITY_ID,
  RECOVERY_BUILDER_ACTIVITY_VERSION,
  RECOVERY_BUILDER_CANONICAL_PACKAGE_ID,
  RECOVERY_BUILDER_MECHANIC_ID,
  RECOVERY_BUILDER_V2_PACKAGES,
  RECOVERY_OFFICIAL_ROUTE_OPTIONS,
  RECOVERY_REPORT_BLOCK_OPTIONS,
  type RecoveryActionGroupId,
  type RecoveryOfficialRouteId,
  type RecoveryReportBlockId,
} from "@/lib/content/activities/recovery-builder/v2";
import type { AchievementDefinition } from "@/lib/content/achievement-catalog";
import type {
  RecoveryBuilderV2Answer,
  RecoveryBuilderV2Result,
  RecoveryBuilderV2Submission,
  RecoveryMissionResult,
} from "@/lib/domain/types";

type RecoveryMissionProps = {
  existingResult: RecoveryMissionResult | RecoveryBuilderV2Result | null;
  existingSubmission: RecoveryBuilderV2Submission | null;
  existingCasePackageId: string | null;
  rewardAlreadyClaimed: boolean;
  claimedPoints: number;
  onComplete: (
    answer: RecoveryBuilderV2Answer,
  ) => Promise<RecoveryBuilderV2Result>;
  onBackToMissions: () => void;
  onOpenSimulation: () => void;
  onOpenProfile: () => void;
  getUnlockedAchievementIds: () => Set<string>;
  getNewlyUnlockedAchievements: (beforeIds: Set<string>) => AchievementDefinition[];
};

const steps = ["Ordenar", "Marcar", "Plano", "Pedir ajuda", "Praticar"] as const;
const LAST_STEP = steps.length - 1;

const GROUP_ICONS: Record<RecoveryActionGroupId, LucideIcon> = {
  now: Zap,
  next: Users,
  "do-not": Ban,
};

const ROUTE_ICONS: Record<RecoveryOfficialRouteId, LucideIcon> = {
  "known-report-guide": BookOpen,
  "message-contact": Link2,
  "first-search-result": Search,
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

type GroupSelection = RecoveryActionGroupId | "";

function isBuilderResult(
  result: RecoveryMissionResult | RecoveryBuilderV2Result | null,
): result is RecoveryBuilderV2Result {
  return Boolean(result && "casePackageId" in result);
}

function initialTimeline(
  packageId: string,
  existingSubmission: RecoveryBuilderV2Submission | null,
): string[] {
  const contentPackage = findRecoveryBuilderV2Package(packageId);
  if (!contentPackage) return [];
  if (existingSubmission?.casePackageId === packageId) {
    return existingSubmission.timelineFactIds;
  }
  return [...contentPackage.allowlists.timelineFactIds].reverse();
}

function initialGroups(
  actionIds: readonly string[],
  existingSubmission: RecoveryBuilderV2Submission | null,
  packageId: string,
): Record<string, GroupSelection> {
  return Object.fromEntries(
    actionIds.map((actionId) => [
      actionId,
      existingSubmission?.casePackageId === packageId
        ? existingSubmission.actionPlacements.find(
            (placement) => placement.actionId === actionId,
          )?.groupId ?? ""
        : "",
    ]),
  );
}

function initialGroupOrder(
  existingSubmission: RecoveryBuilderV2Submission | null,
  packageId: string,
): Record<RecoveryActionGroupId, string[]> {
  const groups: Record<RecoveryActionGroupId, string[]> = {
    now: [],
    next: [],
    "do-not": [],
  };
  if (existingSubmission?.casePackageId !== packageId) return groups;
  for (const groupId of ["now", "next", "do-not"] as const) {
    groups[groupId] = existingSubmission.actionPlacements
      .filter((placement) => placement.groupId === groupId)
      .sort((left, right) => left.position - right.position)
      .map((placement) => placement.actionId);
  }
  return groups;
}

function moveItem(items: string[], index: number, direction: -1 | 1) {
  const target = index + direction;
  if (target < 0 || target >= items.length) return items;
  const next = [...items];
  [next[index], next[target]] = [next[target], next[index]];
  return next;
}

export function RecoveryMission({
  existingResult,
  existingSubmission,
  existingCasePackageId,
  rewardAlreadyClaimed,
  claimedPoints,
  onComplete,
  onBackToMissions,
  onOpenSimulation,
  onOpenProfile,
  getUnlockedAchievementIds,
  getNewlyUnlockedAchievements,
}: RecoveryMissionProps) {
  const celebration = usePostSubmitCelebration("Cliquei. E agora?", "var(--learn-lime)");
  const initialPackageId =
    existingSubmission?.casePackageId ??
    existingCasePackageId ??
    RECOVERY_BUILDER_CANONICAL_PACKAGE_ID;
  const initialPackage =
    findRecoveryBuilderV2Package(initialPackageId) ??
    RECOVERY_BUILDER_V2_PACKAGES[0];
  const [casePackageId, setCasePackageId] = useState(
    initialPackage.casePackageId,
  );
  const contentPackage =
    findRecoveryBuilderV2Package(casePackageId) ??
    RECOVERY_BUILDER_V2_PACKAGES[0];
  const content = contentPackage.content;
  const allowlists = contentPackage.allowlists;
  const [stage, setStage] = useState(0);
  const [timelineFactIds, setTimelineFactIds] = useState(() =>
    initialTimeline(initialPackage.casePackageId, existingSubmission),
  );
  const [exposureStageId, setExposureStageId] = useState(
    existingSubmission?.casePackageId === initialPackage.casePackageId
      ? existingSubmission.exposureStageId
      : "",
  );
  const [actionGroups, setActionGroups] = useState(() =>
    initialGroups(
      initialPackage.allowlists.actionIds,
      existingSubmission,
      initialPackage.casePackageId,
    ),
  );
  const [groupOrder, setGroupOrder] = useState(() =>
    initialGroupOrder(existingSubmission, initialPackage.casePackageId),
  );
  const [officialRouteActionId, setOfficialRouteActionId] =
    useState<RecoveryOfficialRouteId | "">(
      existingSubmission?.casePackageId === initialPackage.casePackageId
        ? existingSubmission.officialRouteActionId
        : "",
    );
  const [reportBlockIds, setReportBlockIds] = useState<
    RecoveryReportBlockId[]
  >(
    existingSubmission?.casePackageId === initialPackage.casePackageId
      ? existingSubmission.reportBlockIds
      : [],
  );
  const [transferExposureId, setTransferExposureId] = useState(
    existingSubmission?.casePackageId === initialPackage.casePackageId
      ? existingSubmission.transferExposureId
      : "",
  );
  const [transferFirstActionIds, setTransferFirstActionIds] = useState<
    [string, string]
  >(
    existingSubmission?.casePackageId === initialPackage.casePackageId
      ? [
          existingSubmission.transferFirstActionIds[0] ?? "",
          existingSubmission.transferFirstActionIds[1] ?? "",
        ]
      : ["", ""],
  );
  const [displayResult, setDisplayResult] = useState(existingResult);
  const [submittedAnswer, setSubmittedAnswer] =
    useState<RecoveryBuilderV2Answer | null>(
      existingSubmission?.casePackageId === initialPackage.casePackageId
        ? existingSubmission
        : null,
    );
  const [rewardGrantedInAttempt, setRewardGrantedInAttempt] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState("");
  const stageTitleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    stageTitleRef.current?.focus();
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [stage]);

  const actionById = useMemo(
    () => new Map(content.actionCards.map((card) => [card.id, card])),
    [content.actionCards],
  );
  const timelineById = useMemo(
    () => new Map(content.timelineFacts.map((fact) => [fact.id, fact])),
    [content.timelineFacts],
  );
  const assignedCount = Object.values(actionGroups).filter(Boolean).length;
  const allActionsAssigned = assignedCount === content.actionCards.length;

  const goToStage = (nextStage: number) => {
    setSubmissionError("");
    setStage(nextStage);
  };


  const moveTimelineFact = (index: number, direction: -1 | 1) => {
    setTimelineFactIds((current) => moveItem(current, index, direction));
  };

  const assignAction = (actionId: string, groupId: GroupSelection) => {
    const previousGroup = actionGroups[actionId];
    setActionGroups((current) => ({ ...current, [actionId]: groupId }));
    setGroupOrder((current) => {
      const next = {
        now: current.now.filter((id) => id !== actionId),
        next: current.next.filter((id) => id !== actionId),
        "do-not": current["do-not"].filter((id) => id !== actionId),
      };
      if (groupId) next[groupId] = [...next[groupId], actionId];
      return next;
    });
    if (previousGroup && previousGroup === groupId) return;
  };

  const moveGroupAction = (
    groupId: RecoveryActionGroupId,
    index: number,
    direction: -1 | 1,
  ) => {
    setGroupOrder((current) => ({
      ...current,
      [groupId]: moveItem(current[groupId], index, direction),
    }));
  };

  const toggleReportBlock = (blockId: RecoveryReportBlockId) => {
    setReportBlockIds((current) =>
      current.includes(blockId)
        ? current.filter((id) => id !== blockId)
        : [...current, blockId],
    );
  };

  const buildAnswer = (): RecoveryBuilderV2Answer => ({
    activityId: RECOVERY_BUILDER_ACTIVITY_ID,
    activityVersion: RECOVERY_BUILDER_ACTIVITY_VERSION,
    casePackageId: contentPackage.casePackageId,
    mechanicId: RECOVERY_BUILDER_MECHANIC_ID,
    timelineFactIds,
    exposureStageId,
    actionPlacements: (["now", "next", "do-not"] as const).flatMap(
      (groupId) =>
        groupOrder[groupId].map((actionId, position) => ({
          actionId,
          groupId,
          position,
        })),
    ),
    reportBlockIds,
    officialRouteActionId: officialRouteActionId as RecoveryOfficialRouteId,
    transferExposureId,
    transferFirstActionIds,
  });

  const finishMission = async () => {
    if (
      isSubmitting ||
      !exposureStageId ||
      !allActionsAssigned ||
      !officialRouteActionId ||
      reportBlockIds.length === 0 ||
      !transferExposureId ||
      transferFirstActionIds.some((id) => !id) ||
      transferFirstActionIds[0] === transferFirstActionIds[1]
    ) {
      return;
    }
    const answer = buildAnswer();
    setIsSubmitting(true);
    setSubmissionError("");
    const beforeIds = getUnlockedAchievementIds();
    try {
      const result = await onComplete(answer);
      setSubmittedAnswer(answer);
      setDisplayResult(result);
      setRewardGrantedInAttempt(!rewardAlreadyClaimed);
      celebration.begin(getNewlyUnlockedAchievements(beforeIds));
    } catch {
      setSubmissionError(
        "Não foi possível registrar a tentativa. Revise o plano e tente novamente.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForPackage = (nextPackageId: string) => {
    const nextPackage =
      findRecoveryBuilderV2Package(nextPackageId) ??
      RECOVERY_BUILDER_V2_PACKAGES[0];
    setCasePackageId(nextPackage.casePackageId);
    setTimelineFactIds([...nextPackage.allowlists.timelineFactIds].reverse());
    setExposureStageId("");
    setActionGroups(initialGroups(nextPackage.allowlists.actionIds, null, nextPackage.casePackageId));
    setGroupOrder({ now: [], next: [], "do-not": [] });
    setOfficialRouteActionId("");
    setReportBlockIds([]);
    setTransferExposureId("");
    setTransferFirstActionIds(["", ""]);
    setDisplayResult(null);
    setSubmittedAnswer(null);
    setRewardGrantedInAttempt(false);
    setSubmissionError("");
    celebration.reset();
    setStage(0);
  };

  const practiceAnotherCase = () => {
    const currentIndex = RECOVERY_BUILDER_V2_PACKAGES.findIndex(
      (item) => item.casePackageId === contentPackage.casePackageId,
    );
    const nextIndex = (currentIndex + 1) % RECOVERY_BUILDER_V2_PACKAGES.length;
    resetForPackage(RECOVERY_BUILDER_V2_PACKAGES[nextIndex].casePackageId);
  };

  const builderResult = isBuilderResult(displayResult) ? displayResult : null;
  const legacyResult =
    displayResult && !isBuilderResult(displayResult) ? displayResult : null;

  const answerReviewItems = useMemo(() => {
    // Tentativa da versão anterior: só a nota sobreviveu, então a revisão vira um resumo.
    if (!builderResult || !submittedAnswer) {
      return legacyResult
        ? [
            {
              id: "legacy",
              title: "Tentativa anterior",
              status: "review" as const,
              userAnswer: `${legacyResult.score} de 100 pontos`,
              explanation:
                "Esta versão da missão usa outro formato. Refaça para ver a revisão detalhada.",
            },
          ]
        : [];
    }
    const items = [
      {
        id: "timeline",
        title: "Ordem dos fatos",
        status: (submittedAnswer.timelineFactIds.every(
          (id, index) => id === allowlists.correctTimelineFactIds[index],
        ) ? "correct" : "review") as "correct" | "review",
        userAnswer: submittedAnswer.timelineFactIds
          .map((id) => timelineById.get(id)?.title)
          .filter(Boolean)
          .join(" → "),
        expectedAnswer: allowlists.correctTimelineFactIds
          .map((id) => timelineById.get(id)?.title)
          .filter(Boolean)
          .join(" → "),
        explanation:
          "A sequência delimita o que aconteceu antes de escolher a recuperação.",
      },
      {
        id: "exposure",
        title: "Último estágio comprovado",
        status: (submittedAnswer.exposureStageId ===
        allowlists.correctExposureStageId
          ? "correct"
          : "review") as "correct" | "review",
        userAnswer:
          content.exposureOptions.find(
            (option) => option.id === submittedAnswer.exposureStageId,
          )?.label ?? submittedAnswer.exposureStageId,
        expectedAnswer:
          content.exposureOptions.find(
            (option) => option.id === allowlists.correctExposureStageId,
          )?.label ?? allowlists.correctExposureStageId,
        explanation:
          "O reporte deve afirmar somente o estágio sustentado pelos fatos.",
      },
      ...submittedAnswer.actionPlacements.map((placement) => {
        const expectedGroup = allowlists.correctGroupByActionId[placement.actionId];
        const selectedGroup = RECOVERY_ACTION_GROUP_OPTIONS.find(
          (group) => group.id === placement.groupId,
        )?.label;
        const expectedLabel = RECOVERY_ACTION_GROUP_OPTIONS.find(
          (group) => group.id === expectedGroup,
        )?.label;
        return {
          id: `action-${placement.actionId}`,
          title: actionById.get(placement.actionId)?.title ?? placement.actionId,
          status: (placement.groupId === expectedGroup
            ? "correct"
            : "review") as "correct" | "review",
          userAnswer: selectedGroup,
          expectedAnswer: expectedLabel,
          explanation:
            actionById.get(placement.actionId)?.detail ??
            "A posição deve ser proporcional ao estágio confirmado.",
        };
      }),
      {
        id: "official-route",
        title: "Rota usada para pedir orientação",
        status: (submittedAnswer.officialRouteActionId ===
        allowlists.correctOfficialRouteId
          ? "correct"
          : "review") as "correct" | "review",
        userAnswer:
          RECOVERY_OFFICIAL_ROUTE_OPTIONS.find(
            (option) => option.id === submittedAnswer.officialRouteActionId,
          )?.label,
        expectedAnswer:
          RECOVERY_OFFICIAL_ROUTE_OPTIONS.find(
            (option) => option.id === allowlists.correctOfficialRouteId,
          )?.label,
        explanation:
          "A orientação precisa vir de uma referência conhecida fora da mensagem suspeita.",
      },
      {
        id: "report",
        title: "Conteúdo do reporte",
        status: (submittedAnswer.reportBlockIds.every((id) =>
          allowlists.safeReportBlockIds.includes(id),
        ) &&
        allowlists.safeReportBlockIds.every((id) =>
          submittedAnswer.reportBlockIds.includes(id),
        )
          ? "correct"
          : "review") as "correct" | "review",
        userAnswer: submittedAnswer.reportBlockIds
          .map(
            (id) =>
              RECOVERY_REPORT_BLOCK_OPTIONS.find((option) => option.id === id)
                ?.label,
          )
          .filter(Boolean)
          .join("; "),
        expectedAnswer: allowlists.safeReportBlockIds
          .map(
            (id) =>
              RECOVERY_REPORT_BLOCK_OPTIONS.find((option) => option.id === id)
                ?.label,
          )
          .filter(Boolean)
          .join("; "),
        explanation:
          "O reporte reúne fatos úteis, mas nunca senha, código ou conclusão não confirmada.",
      },
      {
        id: "transfer-exposure",
        title: "O que aconteceu no novo contexto",
        status: (submittedAnswer.transferExposureId ===
          allowlists.correctTransferExposureId
          ? "correct"
          : "review") as "correct" | "review",
        userAnswer: content.transfer.exposureOptions.find(
          (option) => option.id === submittedAnswer.transferExposureId,
        )?.label,
        expectedAnswer: content.transfer.exposureOptions.find(
          (option) => option.id === allowlists.correctTransferExposureId,
        )?.label,
        explanation:
          "Primeiro identifique somente o último estágio comprovado no novo caso.",
      },
      {
        id: "transfer-actions",
        title: "Primeiras ações no novo contexto",
        status: (submittedAnswer.transferFirstActionIds.every(
          (id, index) => id === allowlists.correctTransferFirstActionIds[index],
        )
          ? "correct"
          : "review") as "correct" | "review",
        userAnswer: submittedAnswer.transferFirstActionIds
          .map((actionId) => actionById.get(actionId)?.title)
          .filter(Boolean)
          .join(" → "),
        expectedAnswer: allowlists.correctTransferFirstActionIds
          .map((actionId) => actionById.get(actionId)?.title)
          .filter(Boolean)
          .join(" → "),
        explanation:
          "Depois de reconhecer o estágio, interrompa a interação e acione o reporte antes das medidas de recuperação.",
      },
    ];
    return items;
  }, [actionById, allowlists, builderResult, content, legacyResult, submittedAnswer, timelineById]);

  if (celebration.screen) return celebration.screen;

  if (builderResult || legacyResult) {
    const score = builderResult?.score ?? legacyResult!.score;
    const needsReview = builderResult?.needsReview ?? true;
    return (
      <div className={s.page}>
        <div className={s.result}>
          <div className={s.resultHero}>
            <Mascot pose={needsReview ? "explaining" : "celebration"} size="medium" />
            <div>
              <span className={s.microLabel}>
                {needsReview ? "CONCLUÍDO · HÁ O QUE REVER" : "CONCLUÍDO"}
              </span>
              <h3>
                {builderResult
                  ? needsReview
                    ? "Você chegou ao fim. Vamos rever algumas respostas?"
                    : "Você agiu na ordem certa."
                  : "Sua tentativa anterior foi mantida."}
              </h3>
              <p>
                {builderResult
                  ? contentPackage.feedback[needsReview ? "review" : "success"]
                  : "Refazer abre a versão nova. Os pontos que você já ganhou continuam valendo."}
              </p>
            </div>
          </div>
          <details className={s.review} open>
            <summary>
              Rever minhas respostas
              <span>{score}/100 · só você vê</span>
              <Icon icon={ChevronDown} size={18} />
            </summary>
            <ActivityAnswerReview items={answerReviewItems} />
          </details>
          <ActivityNextStep area="Simulações" title="Uma manhã comum" onOpen={onOpenSimulation} />
          <div className="activity-completion-actions" aria-label="Ações após a conclusão">
            <button type="button" className="activity-completion-button" onClick={practiceAnotherCase}>Praticar novamente</button>
            <button type="button" className="activity-completion-button" onClick={onBackToMissions}>Voltar às missões</button>
            <button type="button" className="activity-completion-button" onClick={onOpenProfile}>Meu perfil</button>
          </div>
        </div>
      </div>
    );
  }

  const orderedGroups = (["now", "next"] as const).filter(
    (groupId) => groupOrder[groupId].length > 1,
  );
  const pending = [
    null,
    exposureStageId ? null : "Diga até onde você foi.",
    allActionsAssigned
      ? null
      : `Faltam ${content.actionCards.length - assignedCount} de ${content.actionCards.length} ações.`,
    !officialRouteActionId
      ? "Escolha como pedir ajuda."
      : reportBlockIds.length === 0
        ? "Marque o que você vai contar."
        : null,
    !transferExposureId
      ? "Diga até onde você foi neste caso."
      : transferFirstActionIds.some((id) => !id)
        ? "Escolha as duas primeiras ações."
        : transferFirstActionIds[0] === transferFirstActionIds[1]
          ? "As duas ações precisam ser diferentes."
          : null,
  ][stage];

  function advance() {
    setSubmissionError("");
    if (stage === LAST_STEP) {
      void finishMission();
      return;
    }
    setStage(stage + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <LessonShell
      activityId={RECOVERY_BUILDER_ACTIVITY_ID}
      area="MISSÃO 06"
      topic="DEPOIS DO CLIQUE"
      title="Cliquei. E agora?"
      steps={steps}
      stage={stage}
      pending={pending}
      nextLabel={stage === LAST_STEP ? "Concluir" : "Continuar"}
      onNext={advance}
      onStageSelect={goToStage}
      busy={isSubmitting}
      error={submissionError}
    >
      {stage === 0 ? (
        <>
          <StageHeading
            label="O QUE ACONTECEU"
            title="Os registros chegaram fora de ordem"
            instruction="Coloque na ordem em que aconteceu, usando as setas."
            titleRef={stageTitleRef}
          />
          <div style={{ marginBottom: 24 }}>
            <Note title="O caso">{content.situation}</Note>
          </div>
          <div className={s.chat}>
            {timelineFactIds.map((factId, index) => {
              const fact = timelineById.get(factId);
              if (!fact) return null;
              return (
                <div key={fact.id} className={s.bubbleRow}>
                  <span className={s.bubbleIndex}>{index + 1}</span>
                  <span className={s.avatar}><Icon icon={Clock} size={18} /></span>
                  <div className={s.bubble}>
                    <div className={s.bubbleHead}>
                      <strong>{fact.title}</strong>
                      <span className={s.bubbleTime}>{fact.timeLabel}</span>
                    </div>
                    <p className={s.bubbleBody}>{fact.detail}</p>
                  </div>
                  <div className={s.bubbleOrder}>
                    <button type="button" aria-label={`Mover ${fact.title} para cima`} disabled={index === 0} onClick={() => moveTimelineFact(index, -1)}>
                      <Icon icon={ArrowUp} size={17} />
                    </button>
                    <button type="button" aria-label={`Mover ${fact.title} para baixo`} disabled={index === timelineFactIds.length - 1} onClick={() => moveTimelineFact(index, 1)}>
                      <Icon icon={ArrowDown} size={17} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      ) : null}

      {stage === 1 ? (
        <>
          <StageHeading
            label="ATÉ ONDE VOCÊ FOI"
            title="O que você chegou a fazer de verdade?"
            instruction="Escolha só o que os registros mostram. Nem mais, nem menos."
            titleRef={stageTitleRef}
          />
          <OptionList
            legend="O que você chegou a fazer?"
            options={content.exposureOptions.map((option) => ({
              id: option.id,
              label: option.label,
              icon: MousePointerClick,
            }))}
            value={exposureStageId || null}
            onChange={setExposureStageId}
          />
        </>
      ) : null}

      {stage === 2 ? (
        <>
          <StageHeading
            label="SEU PLANO"
            title="O que fazer com cada ação?"
            instruction="Para cada ação, escolha: dá para fazer agora, é com a equipe, ou nunca."
            titleRef={stageTitleRef}
          />
          <div className={s.fieldList}>
            {content.actionCards.map((card) => (
              <div key={card.id} className={s.evidenceCard}>
                <div className={s.evidenceHead}><strong>{card.title}</strong></div>
                <p className={s.evidenceDetail}>{card.detail}</p>
                <div className={`${s.choices} ${s.choicesRow}`} role="group" aria-label={card.title}>
                  {RECOVERY_ACTION_GROUP_OPTIONS.map((group) => (
                    <button
                      key={group.id}
                      type="button"
                      className={s.choice}
                      aria-pressed={actionGroups[card.id] === group.id}
                      onClick={() => assignAction(card.id, group.id)}
                    >
                      <Icon icon={GROUP_ICONS[group.id]} size={19} />
                      <span>{group.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {orderedGroups.length > 0 ? (
            <div className={s.decisionBlock} style={{ marginTop: 32 }}>
              <h3><Icon icon={ListOrdered} size={20} /> E em que ordem?</h3>
              {orderedGroups.map((groupId) => (
                <div key={groupId} className={s.panel} style={{ marginBottom: 16 }}>
                  <span className={s.panelLabel}>
                    {RECOVERY_ACTION_GROUP_OPTIONS.find((g) => g.id === groupId)?.label.toUpperCase()}
                  </span>
                  <div className={s.sessionList}>
                    {groupOrder[groupId].map((actionId, index) => (
                      <div key={actionId} className={s.sessionRow}>
                        <span className={s.bubbleIndex}>{index + 1}</span>
                        <div><strong>{actionById.get(actionId)?.title}</strong></div>
                        <div className={s.bubbleOrder}>
                          <button type="button" aria-label="Mover para cima" disabled={index === 0} onClick={() => moveGroupAction(groupId, index, -1)}>
                            <Icon icon={ArrowUp} size={16} />
                          </button>
                          <button type="button" aria-label="Mover para baixo" disabled={index === groupOrder[groupId].length - 1} onClick={() => moveGroupAction(groupId, index, 1)}>
                            <Icon icon={ArrowDown} size={16} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : null}
        </>
      ) : null}

      {stage === 3 ? (
        <>
          <StageHeading
            label="PEDIR AJUDA"
            title="Avise a equipe de segurança"
            instruction="Escolha por onde pedir ajuda e o que contar."
            titleRef={stageTitleRef}
          />
          <div className={s.decisionBlock}>
            <h3><span className={s.taskNumber}>1</span> Como você pediria ajuda?</h3>
            <OptionList
              legend="Como você pediria ajuda?"
              options={RECOVERY_OFFICIAL_ROUTE_OPTIONS.map((option) => ({
                id: option.id,
                label: option.label,
                detail: option.detail,
                icon: ROUTE_ICONS[option.id],
              }))}
              value={officialRouteActionId || null}
              onChange={setOfficialRouteActionId}
            />
          </div>
          <div className={s.decisionBlock}>
            <h3><span className={s.taskNumber}>2</span> O que você conta para a equipe?</h3>
            <p className={s.multiHint}>Marque tudo o que ajuda. Cuidado: nem tudo aqui deve ser enviado.</p>
            <div className={s.choices} role="group" aria-label="O que você conta para a equipe">
              {RECOVERY_REPORT_BLOCK_OPTIONS.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  className={s.choice}
                  aria-pressed={reportBlockIds.includes(option.id)}
                  onClick={() => toggleReportBlock(option.id)}
                >
                  <span className={s.checkMark}><Icon icon={Check} size={15} /></span>
                  <span>{option.label}</span>
                </button>
              ))}
            </div>
          </div>
        </>
      ) : null}

      {stage === 4 ? (
        <>
          <StageHeading
            label="AGORA NA PRÁTICA"
            title={content.transfer.title}
            instruction={content.transfer.context}
            titleRef={stageTitleRef}
          />
          <div className={s.decisionBlock}>
            <h3><span className={s.taskNumber}>1</span> Até onde você foi desta vez?</h3>
            <OptionList
              legend="Até onde você foi desta vez?"
              options={content.transfer.exposureOptions.map((option) => ({
                id: option.id,
                label: option.label,
                icon: MousePointerClick,
              }))}
              value={transferExposureId || null}
              onChange={setTransferExposureId}
            />
          </div>
          <div className={s.decisionBlock}>
            <h3><span className={s.taskNumber}>2</span> Quais são as duas primeiras coisas a fazer?</h3>
            <div className={s.fieldList}>
              {[0, 1].map((index) => (
                <div key={index} className={s.field}>
                  <label className={s.fieldAsk} htmlFor={`transfer-action-${index}`}>
                    {index === 0 ? "Primeiro" : "Depois"}
                  </label>
                  <select
                    id={`transfer-action-${index}`}
                    className={s.select}
                    value={transferFirstActionIds[index]}
                    onChange={(event) =>
                      setTransferFirstActionIds((current) => {
                        const next: [string, string] = [...current];
                        next[index] = event.target.value;
                        return next;
                      })
                    }
                  >
                    <option value="">Escolha uma ação</option>
                    {allowlists.transferFirstActionIds.map((actionId) => (
                      <option
                        key={actionId}
                        value={actionId}
                        disabled={transferFirstActionIds[1 - index] === actionId}
                      >
                        {actionById.get(actionId)?.title}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : null}
    </LessonShell>
  );
}
