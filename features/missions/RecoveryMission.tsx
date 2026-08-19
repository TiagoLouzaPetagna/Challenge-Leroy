"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import { ActivityAnswerReview } from "@/features/activities/primitives/ActivityAnswerReview";
import { ActivityProgress } from "@/features/activities/primitives/ActivityProgress";
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
import {
  calculatePerformanceBonus,
  POINT_RULES,
} from "@/lib/domain/rules";
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
};

const steps = [
  "Contexto",
  "Reconstruir",
  "Organizar ações",
  "Entender o efeito",
  "Revisar o plano",
  "Montar o reporte",
  "Aplicar em outro caso",
  "Resultado",
  "Resumo final",
] as const;

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
}: RecoveryMissionProps) {
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
  const hasExistingResult = Boolean(existingResult);
  const [stage, setStage] = useState(hasExistingResult ? 7 : 0);
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
  const timelineCorrect = timelineFactIds.every(
    (factId, index) => factId === allowlists.correctTimelineFactIds[index],
  );

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
    try {
      const result = await onComplete(answer);
      setSubmittedAnswer(answer);
      setDisplayResult(result);
      setRewardGrantedInAttempt(!rewardAlreadyClaimed);
      goToStage(7);
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
  const bonusPercentage = builderResult
    ? Math.round(calculatePerformanceBonus(builderResult.score) * 100)
    : 0;
  const bonusPoints = builderResult
    ? builderResult.potentialReward - POINT_RULES.mainMission
    : 0;

  const answerReviewItems = useMemo(() => {
    if (!builderResult || !submittedAnswer) return [];
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
  }, [actionById, allowlists, builderResult, content, submittedAnswer, timelineById]);

  return (
    <div className="page-stack mission-page recovery-mission-page recovery-builder-page">
      <section className="mission-shell">
        <header className="mission-header">
          <div>
            <span className="section-badge">Jornada principal · Resposta ao incidente</span>
            <h1 tabIndex={-1} ref={stage === 0 ? stageTitleRef : undefined}>
              Cliquei. E agora?
            </h1>
            <p>
              Reconstrua o que aconteceu, organize uma resposta proporcional e
              prepare um reporte factual. A atividade não pune o clique: ela ensina
              o que fazer depois.
            </p>
          </div>
          <div className="mission-meta" aria-label="Informações da missão">
            <span>Tempo estimado</span>
            <strong>12 minutos</strong>
            <small>{POINT_RULES.mainMission} pontos-base</small>
          </div>
        </header>

        <ActivityProgress
          steps={steps}
          currentStep={stage}
          ariaLabel="Progresso de Cliquei. E agora?"
        />

        <div className="mission-content">
          {stage === 0 ? (
            <div className="recovery-briefing recovery-builder-opening">
              <div className="recovery-briefing__copy">
                <span className="section-kicker">O caso</span>
                <h2 tabIndex={-1} ref={stageTitleRef}>{content.role}</h2>
                <p><strong>O que aconteceu:</strong> {content.situation}</p>
                <div className="recovery-no-blame-note">
                  <strong>Sua tarefa</strong>
                  <p>{content.task}</p>
                  <strong>O que você protege</strong>
                  <p>{content.protectedConsequence}</p>
                </div>
                <button
                  type="button"
                  className="primary-button dark"
                  onClick={() => goToStage(1)}
                >
                  Reconstruir o ocorrido
                </button>
              </div>
              <aside className="recovery-principles">
                <span className="section-kicker">O que importa agora</span>
                <ol>
                  <li><span>01</span><div><strong>Precisão</strong><p>Dizer até onde a interação realmente chegou.</p></div></li>
                  <li><span>02</span><div><strong>Interrupção</strong><p>Não retomar o conteúdo suspeito por conta própria.</p></div></li>
                  <li><span>03</span><div><strong>Reporte cedo</strong><p>Preservar fatos e pedir orientação no canal conhecido.</p></div></li>
                </ol>
                <small>Nenhuma ação desta demonstração envia reporte, altera conta ou opera um dispositivo real.</small>
              </aside>
            </div>
          ) : null}

          {stage === 1 ? (
            <div className="recovery-builder-stage">
              <div className="decision-heading">
                <span className="section-kicker">Reconstrução</span>
                <h2 tabIndex={-1} ref={stageTitleRef}>Coloque os fatos na ordem em que ocorreram</h2>
                <p>Use os horários e a descrição de cada registro. Depois, indique o último estágio que os fatos realmente comprovam.</p>
              </div>
              <ol className="recovery-timeline-builder">
                {timelineFactIds.map((factId, index) => {
                  const fact = timelineById.get(factId);
                  if (!fact) return null;
                  return (
                    <li key={fact.id}>
                      <span className="recovery-timeline-builder__position">{index + 1}</span>
                      <div><span>{fact.timeLabel}</span><strong>{fact.title}</strong><p>{fact.detail}</p></div>
                      <div className="recovery-timeline-builder__buttons">
                        <button type="button" disabled={index === 0} onClick={() => moveTimelineFact(index, -1)} aria-label={`Mover ${fact.title} para cima`}>↑</button>
                        <button type="button" disabled={index === timelineFactIds.length - 1} onClick={() => moveTimelineFact(index, 1)} aria-label={`Mover ${fact.title} para baixo`}>↓</button>
                      </div>
                    </li>
                  );
                })}
              </ol>
              <fieldset className="recovery-exposure-options">
                <legend>Até onde a interação chegou, segundo estes fatos?</legend>
                <p>Escolha o último estágio comprovado — não o pior resultado possível.</p>
                {content.exposureOptions.map((option) => (
                  <label key={option.id} className={exposureStageId === option.id ? "selected" : ""}>
                    <input type="radio" name="recovery-exposure" checked={exposureStageId === option.id} onChange={() => setExposureStageId(option.id)} />
                    <span><strong>{option.label}</strong><small>{option.detail}</small></span>
                  </label>
                ))}
              </fieldset>
              <div className="mission-navigation">
                <button type="button" className="text-button" onClick={() => goToStage(0)}>← Rever contexto</button>
                <button type="button" className="primary-button dark" disabled={!exposureStageId} onClick={() => goToStage(2)}>Organizar as ações</button>
              </div>
            </div>
          ) : null}

          {stage === 2 ? (
            <div className="recovery-builder-stage">
              <div className="decision-heading">
                <span className="section-kicker">Montador de resposta</span>
                <h2 tabIndex={-1} ref={stageTitleRef}>Classifique as ações deste caso</h2>
                <p>Decida quais ações podem começar imediatamente, quais dependem da orientação da equipe responsável e quais aumentariam o risco.</p>
              </div>
              <aside className="recovery-case-reminder" aria-label="Contexto deste exercício">
                <span>Contexto deste exercício</span>
                <strong>{content.situation}</strong>
                <p>Você registrou como último estágio: <b>{content.exposureOptions.find((option) => option.id === exposureStageId)?.label}</b>. Classifique os cartões considerando somente esses fatos.</p>
              </aside>
              <div className="recovery-group-guide" aria-label="Como usar as três categorias">
                {RECOVERY_ACTION_GROUP_OPTIONS.map((group) => (
                  <article key={group.id}>
                    <strong>{group.label}</strong>
                    <p>{group.description}</p>
                  </article>
                ))}
              </div>
              <div className="recovery-action-tray">
                {content.actionCards.map((card) => (
                  <article key={card.id}>
                    <div><strong>{card.title}</strong><p>{card.detail}</p></div>
                    <label>
                      <span>Classificar como</span>
                      <select aria-label={`Classificar ${card.title} como`} value={actionGroups[card.id] ?? ""} onChange={(event) => assignAction(card.id, event.target.value as GroupSelection)}>
                        <option value="">Escolha uma categoria</option>
                        {RECOVERY_ACTION_GROUP_OPTIONS.map((group) => <option key={group.id} value={group.id}>{group.label}</option>)}
                      </select>
                    </label>
                  </article>
                ))}
              </div>
              <div className="recovery-action-groups">
                {RECOVERY_ACTION_GROUP_OPTIONS.map((group) => (
                  <section key={group.id}>
                    <header><strong>{group.label}</strong><p>{group.description}</p></header>
                    {groupOrder[group.id].length ? (
                      <ol>
                        {groupOrder[group.id].map((actionId, index) => (
                          <li key={actionId}>
                            <span>{index + 1}</span>
                            <strong>{actionById.get(actionId)?.title}</strong>
                            <div>
                              <button type="button" disabled={index === 0} onClick={() => moveGroupAction(group.id, index, -1)} aria-label={`Mover ${actionById.get(actionId)?.title} para cima`}>↑</button>
                              <button type="button" disabled={index === groupOrder[group.id].length - 1} onClick={() => moveGroupAction(group.id, index, 1)} aria-label={`Mover ${actionById.get(actionId)?.title} para baixo`}>↓</button>
                            </div>
                          </li>
                        ))}
                      </ol>
                    ) : <p className="recovery-action-groups__empty">Nenhuma ação colocada aqui.</p>}
                  </section>
                ))}
              </div>
              <p className="recovery-builder-count" role="status">{assignedCount} de {content.actionCards.length} ações organizadas.</p>
              <div className="mission-navigation">
                <button type="button" className="text-button" onClick={() => goToStage(1)}>← Rever os fatos</button>
                <button type="button" className="primary-button dark" disabled={!allActionsAssigned} onClick={() => goToStage(3)}>Entender o efeito do plano</button>
              </div>
            </div>
          ) : null}

          {stage === 3 ? (
            <div className="recovery-builder-stage recovery-consequence-stage">
              <span className="section-kicker">Por que a ordem importa</span>
              <h2 tabIndex={-1} ref={stageTitleRef}>Interromper e relatar vêm antes de investigar por conta própria</h2>
              <p>{content.consequence}</p>
              <div className="recovery-consequence-card"><strong>O que este plano protege</strong><p>{content.protectedConsequence}</p></div>
              <div className="mission-navigation">
                <button type="button" className="text-button" onClick={() => goToStage(2)}>← Ajustar ações</button>
                <button type="button" className="primary-button dark" onClick={() => goToStage(4)}>Revisar meu plano</button>
              </div>
            </div>
          ) : null}

          {stage === 4 ? (
            <div className="recovery-builder-stage">
              <div className="decision-heading">
                <span className="section-kicker">Revisão antes do envio</span>
                <h2 tabIndex={-1} ref={stageTitleRef}>Confira o que você registrou e organizou</h2>
                <p>Esta revisão ainda não mostra o gabarito. Volte se quiser ajustar algo antes de montar o reporte.</p>
              </div>
              <div className="recovery-plan-review">
                <article><span>Último estágio indicado</span><strong>{content.exposureOptions.find((option) => option.id === exposureStageId)?.label}</strong><p>{timelineCorrect ? "Os fatos também estão em ordem cronológica." : "A ordem dos fatos merece uma nova conferência."}</p></article>
                {RECOVERY_ACTION_GROUP_OPTIONS.map((group) => (
                  <article key={group.id}><span>{group.label}</span><strong>{groupOrder[group.id].length} ações</strong><ol>{groupOrder[group.id].map((id) => <li key={id}>{actionById.get(id)?.title}</li>)}</ol></article>
                ))}
              </div>
              <div className="mission-navigation">
                <button type="button" className="text-button" onClick={() => goToStage(2)}>← Ajustar o plano</button>
                <button type="button" className="primary-button dark" onClick={() => goToStage(5)}>Montar o reporte</button>
              </div>
            </div>
          ) : null}

          {stage === 5 ? (
            <div className="recovery-builder-stage">
              <div className="decision-heading">
                <span className="section-kicker">Reporte simulado</span>
                <h2 tabIndex={-1} ref={stageTitleRef}>Escolha onde buscar orientação e quais fatos informar</h2>
                <p>A referência segura existe antes deste incidente e fora da mensagem suspeita. O reporte deve conter fatos úteis, nunca senhas, códigos ou conclusões não comprovadas.</p>
              </div>
              <fieldset className="recovery-route-options">
                <legend>Qual caminho você usaria para abrir a orientação oficial?</legend>
                {RECOVERY_OFFICIAL_ROUTE_OPTIONS.map((option) => (
                  <label key={option.id} className={officialRouteActionId === option.id ? "selected" : ""}>
                    <input type="radio" name="official-route" checked={officialRouteActionId === option.id} onChange={() => setOfficialRouteActionId(option.id)} />
                    <span><strong>{option.label}</strong><small>{option.detail}</small></span>
                  </label>
                ))}
              </fieldset>
              <fieldset className="recovery-report-builder">
                <legend>Quais informações devem entrar no reporte?</legend>
                <p>Selecione tudo o que ajuda a equipe responsável a entender o ocorrido.</p>
                {RECOVERY_REPORT_BLOCK_OPTIONS.map((option) => (
                  <label key={option.id} className={reportBlockIds.includes(option.id) ? "selected" : ""}>
                    <input type="checkbox" checked={reportBlockIds.includes(option.id)} onChange={() => toggleReportBlock(option.id)} />
                    <span>{option.label}</span>
                  </label>
                ))}
              </fieldset>
              <div className="recovery-channel-notice" role="note"><strong>Demonstração local</strong><p>Nenhuma escolha envia dados, abre chamado ou executa recuperação real.</p></div>
              <div className="mission-navigation">
                <button type="button" className="text-button" onClick={() => goToStage(4)}>← Rever o plano</button>
                <button type="button" className="primary-button dark" disabled={!officialRouteActionId || reportBlockIds.length === 0} onClick={() => goToStage(6)}>Aplicar em outro contexto</button>
              </div>
            </div>
          ) : null}

          {stage === 6 ? (
            <div className="recovery-builder-stage">
              <div className="decision-heading">
                <span className="section-kicker">Transferência curta</span>
                <h2 tabIndex={-1} ref={stageTitleRef}>{content.transfer.title}</h2>
                <p>{content.transfer.context}</p>
              </div>
              <fieldset className="recovery-exposure-options">
                <legend>Qual é o último estágio comprovado neste novo caso?</legend>
                {content.transfer.exposureOptions.map((option) => (
                  <label key={option.id} className={transferExposureId === option.id ? "selected" : ""}>
                    <input type="radio" name="transfer-exposure" checked={transferExposureId === option.id} onChange={() => setTransferExposureId(option.id)} />
                    <span><strong>{option.label}</strong><small>{option.detail}</small></span>
                  </label>
                ))}
              </fieldset>
              <fieldset className="recovery-transfer-order">
                <legend>Quais devem ser as duas primeiras ações, nesta ordem?</legend>
                {[0, 1].map((index) => (
                  <label key={index}><span>{index + 1}ª ação</span><select value={transferFirstActionIds[index]} onChange={(event) => setTransferFirstActionIds((current) => { const next: [string, string] = [...current]; next[index] = event.target.value; return next; })}><option value="">Escolha uma ação</option>{allowlists.transferFirstActionIds.map((actionId) => <option key={actionId} value={actionId} disabled={transferFirstActionIds[1 - index] === actionId}>{actionById.get(actionId)?.title}</option>)}</select></label>
                ))}
              </fieldset>
              {submissionError ? <p className="form-error" role="alert">{submissionError}</p> : null}
              <div className="mission-navigation">
                <button type="button" className="text-button" onClick={() => goToStage(5)}>← Rever o reporte</button>
                <button type="button" className="primary-button dark" disabled={!transferExposureId || transferFirstActionIds.some((id) => !id) || transferFirstActionIds[0] === transferFirstActionIds[1] || isSubmitting} onClick={finishMission}>{isSubmitting ? "Registrando..." : "Concluir atividade"}</button>
              </div>
            </div>
          ) : null}

          {stage === 7 && legacyResult ? (
            <div className="mission-result recovery-result">
              <div className="result-summary review">
                <div className="result-score"><span>Resultado anterior</span><strong>{legacyResult.score}</strong><small>de 100</small></div>
                <div><span className="section-kicker">Tentativa preservada</span><h2 tabIndex={-1} ref={stageTitleRef}>Sua conclusão da versão anterior continua registrada</h2><p>O novo montador usa outro contrato e não reinterpreta suas respostas antigas.</p></div>
              </div>
              <div className="result-actions">
                <button type="button" className="primary-button dark" onClick={() => resetForPackage(RECOVERY_BUILDER_CANONICAL_PACKAGE_ID)}>Praticar a nova versão</button>
                <button type="button" className="text-button" onClick={onBackToMissions}>Voltar ao percurso</button>
              </div>
            </div>
          ) : null}

          {stage === 7 && builderResult ? (
            <div className="mission-result recovery-result">
              <div className={builderResult.needsReview ? "result-summary review" : "result-summary success"}>
                <div className="result-score"><span>Resultado</span><strong>{builderResult.score}</strong><small>de 100</small></div>
                <div><span className="section-kicker">{builderResult.needsReview ? "Revisão recomendada" : "Resposta proporcional"}</span><h2 tabIndex={-1} ref={stageTitleRef}>{builderResult.needsReview ? "Algumas escolhas podem ampliar o risco ou reduzir a precisão do reporte." : "Você interrompeu o risco, preservou os fatos e organizou a recuperação."}</h2><p>{contentPackage.feedback[builderResult.needsReview ? "review" : "success"]}</p></div>
              </div>
              <div className="result-grid recovery-result-grid">
                <article><span>Fatos e exposição</span><strong>{builderResult.exposurePoints}/20</strong><p>Ordem dos fatos e último estágio comprovado.</p></article>
                <article><span>Organização das ações</span><strong>{builderResult.classificationPoints + builderResult.precedencePoints + builderResult.proportionalityPoints}/60</strong><p>{builderResult.correctPlacements}/{builderResult.totalPlacements} ações no grupo correto.</p></article>
                <article><span>Reporte e transferência</span><strong>{builderResult.reportPoints}/20</strong><p>{builderResult.safeReportBlocks} blocos seguros selecionados.</p></article>
                <article className="reward-result-card"><span>Pontos gerais</span><strong>{rewardGrantedInAttempt ? `+${builderResult.potentialReward}` : `${claimedPoints} registrados`}</strong><p>Base {POINT_RULES.mainMission} + bônus de {bonusPercentage}% ({bonusPoints} pontos).</p></article>
              </div>
              <ActivityAnswerReview items={answerReviewItems} />
              <div className="mission-navigation"><button type="button" className="primary-button dark" onClick={() => goToStage(8)}>Ver resumo final</button></div>
            </div>
          ) : null}

          {stage === 8 && builderResult ? (
            <div className="recovery-builder-stage recovery-builder-debrief">
              <span className="section-kicker">Resumo final</span>
              <h2 tabIndex={-1} ref={stageTitleRef}>{contentPackage.debrief.title}</h2>
              <p>{contentPackage.debrief.body}</p>
              <div className="recovery-consequence-card"><strong>Leve para o trabalho real</strong><p>Interrompa a interação, registre o último fato comprovado, preserve o contexto e peça orientação pelo procedimento oficial da organização. Reportar cedo não exige ter certeza de que houve comprometimento.</p></div>
              <div className="adaptive-next-panel"><div><span className="section-kicker inverse">Próxima atividade da jornada</span><h2>Uma manhã comum</h2><p>Use investigação, decisão e reporte em uma fila com situações legítimas, maliciosas e inconclusivas.</p></div><button type="button" className="primary-button light" onClick={onOpenSimulation}>Abrir Simulação</button></div>
              <div className="result-actions">
                <button type="button" className="text-button" onClick={onOpenProfile}>Ver no Meu perfil</button>
                <button type="button" className="text-button" onClick={() => resetForPackage(contentPackage.casePackageId)}>Refazer este caso</button>
                <button type="button" className="text-button" onClick={practiceAnotherCase}>Praticar outro caso</button>
                <button type="button" className="text-button" onClick={onBackToMissions}>Voltar ao percurso</button>
              </div>
            </div>
          ) : null}
        </div>
      </section>

      <section className="mission-connection">
        <span className="section-kicker">Ideia principal</span>
        <p>Você não precisa provar que uma conta foi invadida antes de pedir ajuda. Informe o que realmente aconteceu, não reabra o risco e siga a recuperação oficial.</p>
      </section>
    </div>
  );
}
