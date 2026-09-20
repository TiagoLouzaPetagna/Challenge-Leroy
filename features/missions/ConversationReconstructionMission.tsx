"use client";

import { useState } from "react";

import { EvidenceTray } from "@/features/activities/primitives/EvidenceTray";
import { useDragReorder } from "@/features/activities/useDragReorder";
import { ActivityShell } from "@/features/activities/ActivityShell";
import {
  ActivityAnswerReview,
  type ActivityAnswerReviewItem,
} from "@/features/activities/primitives/ActivityAnswerReview";
import { ActivityError } from "@/features/activities/primitives/ActivityError";
import { ActivityNextStep } from "@/features/activities/primitives/ActivityNextStep";
import { ActivityProgress } from "@/features/activities/primitives/ActivityProgress";
import { useActivityStageFocus } from "@/features/activities/useActivityStageFocus";
import { usePostSubmitCelebration } from "@/features/activities/usePostSubmitCelebration";
import {
  COMPROMISED_CONVERSATION_V2_PACKAGES,
  CONVERSATION_RECONSTRUCTION_ACTIVITY_ID,
  CONVERSATION_RECONSTRUCTION_ACTIVITY_VERSION,
  CONVERSATION_RECONSTRUCTION_MECHANIC_ID,
  type ConversationConclusionId,
  type ConversationConfirmationRouteId,
  type ConversationFinalActionId,
  type ConversationReconstructionPackage,
  type ConversationReportDetailId,
  type ConversationTransferDecisionId,
  type EvidenceClassificationId,
} from "@/lib/content/activities/compromised-conversation/v2";
import type { AchievementDefinition } from "@/lib/content/achievement-catalog";
import { POINT_RULES } from "@/lib/domain/rules";
import type {
  ConversationEvidenceAssessment,
  ConversationReconstructionV2Answer,
  ConversationReconstructionV2Result,
  MissionResult,
} from "@/lib/domain/types";

const steps = [
  "Abertura",
  "Investigar",
  "Decidir",
  "Consequência",
  "Revisar",
  "Confirmar",
  "Transferir",
  "Resultado",
  "O que levar para o trabalho",
] as const;

const classificationOptions: readonly {
  id: EvidenceClassificationId;
  label: string;
  detail: string;
}[] = [
  {
    id: "fact",
    label: "Fato",
    detail: "Está diretamente presente nas mensagens ou informações exibidas no caso.",
  },
  {
    id: "indicator",
    label: "Indício",
    detail: "Merece atenção, mas não resolve o caso isoladamente.",
  },
  {
    id: "inference",
    label: "Inferência",
    detail: "É uma hipótese construída a partir dos fatos e indícios.",
  },
] as const;

const conclusionOptions: readonly {
  id: ConversationConclusionId;
  label: string;
}[] = [
  { id: "legitimate", label: "O pedido foi confirmado" },
  { id: "malicious-probable", label: "Há suspeita de uso indevido da conta" },
  { id: "inconclusive", label: "Ainda não tenho informação suficiente" },
] as const;

const confirmationOptions: readonly {
  id: ConversationConfirmationRouteId;
  label: string;
  detail: string;
}[] = [
  {
    id: "registered-contact",
    label: "Abrir o diretório, portal ou chamado que a empresa já usava",
    detail:
      "Localizar ali o contato ou registro que existia antes desta conversa e confirmar por ele.",
  },
  {
    id: "same-thread",
    label: "Responder nesta mesma conversa perguntando se o pedido é verdadeiro",
    detail:
      "A resposta viria da mesma conta que fez o pedido e não confirmaria quem está usando essa conta.",
  },
  {
    id: "request-contact",
    label: "Usar o telefone ou endereço enviado junto com o pedido",
    detail:
      "Esse contato foi fornecido pela própria solicitação que está sendo verificada.",
  },
  {
    id: "public-search",
    label: "Pesquisar na internet e usar o primeiro contato encontrado",
    detail:
      "O primeiro resultado pode ser anúncio, cópia ou informação desatualizada; sua origem ainda não foi validada.",
  },
] as const;

const transferOptions: readonly {
  id: ConversationTransferDecisionId;
  label: string;
}[] = [
  {
    id: "pause-use-known-route",
    label:
      "Confirmar pelo contato salvo da empresa",
  },
  {
    id: "continue-familiar-channel",
    label: "Continuar porque nome, assunto e canal parecem familiares",
  },
  {
    id: "reply-for-confirmation",
    label: "Pedir confirmação no próprio canal antes de continuar",
  },
  {
    id: "ignore-without-record",
    label: "Ignorar sem preservar nem encaminhar o caso",
  },
] as const;

type PreviousResult = MissionResult | ConversationReconstructionV2Result;

type ConversationReconstructionMissionProps = {
  existingResult: PreviousResult | null;
  existingCasePackageId: string | null;
  rewardAlreadyClaimed: boolean;
  claimedPoints: number;
  onComplete: (
    answer: ConversationReconstructionV2Answer,
  ) => Promise<ConversationReconstructionV2Result>;
  onBackToMissions: () => void;
  onOpenNextActivity: () => void;
  onOpenProfile: () => void;
  getUnlockedAchievementIds: () => Set<string>;
  getNewlyUnlockedAchievements: (beforeIds: Set<string>) => AchievementDefinition[];
};

function packageById(casePackageId: string): ConversationReconstructionPackage {
  return (
    COMPROMISED_CONVERSATION_V2_PACKAGES.find(
      (contentPackage) => contentPackage.casePackageId === casePackageId,
    ) ?? COMPROMISED_CONVERSATION_V2_PACKAGES[0]
  );
}

function moveItem(items: readonly string[], from: number, to: number): string[] {
  if (from === to || to < 0 || to >= items.length) return [...items];
  const next = [...items];
  const [item] = next.splice(from, 1);
  next.splice(to, 0, item);
  return next;
}

function conclusionLabel(id: ConversationConclusionId | "") {
  return conclusionOptions.find((option) => option.id === id)?.label ?? "Não definida";
}

function listLabels(labels: readonly string[]) {
  return labels.length > 0 ? labels.join("; ") : "Nenhuma";
}

export function ConversationReconstructionMission({
  existingResult,
  existingCasePackageId,
  rewardAlreadyClaimed,
  claimedPoints,
  onComplete,
  onBackToMissions,
  onOpenNextActivity,
  onOpenProfile,
  getUnlockedAchievementIds,
  getNewlyUnlockedAchievements,
}: ConversationReconstructionMissionProps) {
  const celebration = usePostSubmitCelebration(
    "A conversa já estava acontecendo",
    "var(--learn-lime)",
  );
  const initialPackage = packageById(
    existingCasePackageId ??
      COMPROMISED_CONVERSATION_V2_PACKAGES[0].casePackageId,
  );
  const [stage, setStage] = useState(existingResult ? 7 : 0);
  const [casePackageId, setCasePackageId] = useState(
    initialPackage.casePackageId,
  );
  const [orderedArtifactIds, setOrderedArtifactIds] = useState<string[]>([
    ...initialPackage.content.initialMessageOrder,
  ]);
  const [turningPointArtifactId, setTurningPointArtifactId] = useState("");
  const [evidenceAssessments, setEvidenceAssessments] = useState<
    ConversationEvidenceAssessment[]
  >([]);
  const [provisionalConclusionId, setProvisionalConclusionId] =
    useState<ConversationConclusionId | "">("");
  const [finalConclusionId, setFinalConclusionId] =
    useState<ConversationConclusionId | "">("");
  const [confirmationRouteId, setConfirmationRouteId] =
    useState<ConversationConfirmationRouteId | "">("");
  const [finalActionId, setFinalActionId] =
    useState<ConversationFinalActionId | "">("");
  const [reportDetailIds, setReportDetailIds] = useState<
    ConversationReportDetailId[]
  >([]);
  const [transferDecisionId, setTransferDecisionId] =
    useState<ConversationTransferDecisionId | "">("");
  const [displayResult, setDisplayResult] = useState<PreviousResult | null>(
    existingResult,
  );
  const [rewardGrantedInAttempt, setRewardGrantedInAttempt] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [announcement, setAnnouncement] = useState("");
  const stageTitleRef = useActivityStageFocus(stage, Boolean(celebration.screen));
  const contentPackage = packageById(casePackageId);
  const { content, allowlists } = contentPackage;
  const isV2Result = Boolean(
    displayResult && "reconstructionPoints" in displayResult,
  );
  const assessmentsComplete =
    evidenceAssessments.length >= 3 &&
    evidenceAssessments.every((assessment) => assessment.classificationId);
  const confirmationComplete = Boolean(
    finalConclusionId &&
      confirmationRouteId &&
      finalActionId &&
      (allowlists.requiresIncidentReport ? reportDetailIds.length > 0 : true),
  );

  const goTo = (nextStage: number) => {
    setError("");
    setStage(nextStage);
    window.scrollTo({ top: 0, behavior: "auto" });
  };

  const selectPackage = (nextPackageId: string) => {
    const nextPackage = packageById(nextPackageId);
    setCasePackageId(nextPackage.casePackageId);
    setOrderedArtifactIds([...nextPackage.content.initialMessageOrder]);
    setTurningPointArtifactId("");
    setEvidenceAssessments([]);
    setProvisionalConclusionId("");
    setFinalConclusionId("");
    setConfirmationRouteId("");
    setFinalActionId("");
    setReportDetailIds([]);
    setTransferDecisionId("");
    setAnnouncement("");
  };

  const moveMessage = (artifactId: string, nextIndex: number) => {
    setOrderedArtifactIds((current) => {
      const currentIndex = current.indexOf(artifactId);
      const next = moveItem(current, currentIndex, nextIndex);
      setAnnouncement(
        `${content.messages.find((message) => message.id === artifactId)?.timeLabel ?? "Mensagem"} movida para a posição ${nextIndex + 1} de ${current.length}.`,
      );
      return next;
    });
  };

  const dragMessage = useDragReorder((source, target) => moveMessage(source, orderedArtifactIds.indexOf(target)));

  const toggleEvidence = (evidenceId: string) => {
    setEvidenceAssessments((current) =>
      current.some((assessment) => assessment.evidenceId === evidenceId)
        ? current.filter((assessment) => assessment.evidenceId !== evidenceId)
        : [...current, { evidenceId, classificationId: "fact" }],
    );
  };

  const classifyEvidence = (
    evidenceId: string,
    classificationId: EvidenceClassificationId,
  ) => {
    setEvidenceAssessments((current) =>
      current.map((assessment) =>
        assessment.evidenceId === evidenceId
          ? { ...assessment, classificationId }
          : assessment,
      ),
    );
  };

  const toggleReportDetail = (detailId: ConversationReportDetailId) => {
    setReportDetailIds((current) =>
      current.includes(detailId)
        ? current.filter((item) => item !== detailId)
        : [...current, detailId],
    );
  };

  const finish = async () => {
    if (
      !assessmentsComplete ||
      !turningPointArtifactId ||
      !provisionalConclusionId ||
      !confirmationComplete ||
      !transferDecisionId ||
      isSubmitting
    ) {
      setError("Complete a reconstrução, as decisões e a transferência antes de enviar.");
      return;
    }

    setIsSubmitting(true);
    setError("");
    const grantsFirstReward = !rewardAlreadyClaimed;
    const beforeIds = getUnlockedAchievementIds();

    try {
      const result = await onComplete({
        activityId: CONVERSATION_RECONSTRUCTION_ACTIVITY_ID,
        activityVersion: CONVERSATION_RECONSTRUCTION_ACTIVITY_VERSION,
        casePackageId,
        mechanicId: CONVERSATION_RECONSTRUCTION_MECHANIC_ID,
        orderedArtifactIds,
        turningPointArtifactId,
        evidenceAssessments,
        provisionalConclusionId: provisionalConclusionId as ConversationConclusionId,
        finalConclusionId: finalConclusionId as ConversationConclusionId,
        confirmationRouteId:
          confirmationRouteId as ConversationConfirmationRouteId,
        finalActionId: finalActionId as ConversationFinalActionId,
        reportDetailIds,
        transferDecisionId:
          transferDecisionId as ConversationTransferDecisionId,
      });
      setDisplayResult(result);
      setRewardGrantedInAttempt(grantsFirstReward);
      goTo(7);
      celebration.begin(getNewlyUnlockedAchievements(beforeIds));
    } catch {
      setError("Não foi possível registrar a tentativa. Revise as respostas e tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const reset = () => {
    selectPackage(casePackageId);
    setDisplayResult(null);
    setRewardGrantedInAttempt(false);
    setError("");
    celebration.reset();
    goTo(0);
  };

  const practiceAnotherCase = () => {
    const currentIndex = COMPROMISED_CONVERSATION_V2_PACKAGES.findIndex(
      (candidate) => candidate.casePackageId === casePackageId,
    );
    const nextPackage =
      COMPROMISED_CONVERSATION_V2_PACKAGES[
        (currentIndex + 1) % COMPROMISED_CONVERSATION_V2_PACKAGES.length
      ];
    selectPackage(nextPackage.casePackageId);
    setDisplayResult(null);
    setRewardGrantedInAttempt(false);
    setError("");
    celebration.reset();
    goTo(0);
  };

  const hasCurrentAttemptAnswers = Boolean(
    orderedArtifactIds.length === content.messages.length &&
      turningPointArtifactId &&
      assessmentsComplete &&
      provisionalConclusionId &&
      finalConclusionId &&
      confirmationRouteId &&
      finalActionId &&
      transferDecisionId,
  );
  const messageLabel = (artifactId: string) => {
    const message = content.messages.find((item) => item.id === artifactId);
    return message ? `${message.timeLabel} — ${message.body}` : "Mensagem não encontrada";
  };
  const answerReviewItems: ActivityAnswerReviewItem[] =
    displayResult && isV2Result && hasCurrentAttemptAnswers
      ? [
          {
            id: "reconstruction",
            title: "Ordem da conversa",
            status:
              orderedArtifactIds.join("|") ===
              allowlists.correctMessageOrder.join("|")
                ? "correct"
                : "review",
            userAnswer: orderedArtifactIds
              .map((artifactId) =>
                content.messages.find((message) => message.id === artifactId)
                  ?.timeLabel,
              )
              .filter(Boolean)
              .join(" → "),
            expectedAnswer: allowlists.correctMessageOrder
              .map((artifactId) =>
                content.messages.find((message) => message.id === artifactId)
                  ?.timeLabel,
              )
              .filter(Boolean)
              .join(" → "),
            explanation:
              "A ordem permite comparar a rotina anterior com o pedido que mudou o processo.",
          },
          {
            id: "turning-point",
            title: "Mensagem em que o processo mudou",
            status: allowlists.acceptedTurningPointIds.includes(
              turningPointArtifactId,
            )
              ? "correct"
              : "review",
            userAnswer: messageLabel(turningPointArtifactId),
            expectedAnswer: listLabels(
              allowlists.acceptedTurningPointIds.map(messageLabel),
            ),
            explanation:
              "O ponto de mudança é o primeiro pedido que altera destino, escopo ou procedimento relevante.",
          },
          ...content.evidence.map((evidence) => {
            const selected = evidenceAssessments.find(
              (assessment) => assessment.evidenceId === evidence.id,
            );
            const expected =
              allowlists.correctEvidenceClassifications[evidence.id];
            return {
              id: `evidence-${evidence.id}`,
              title: `Evidência: ${evidence.title}`,
              status:
                selected?.classificationId === expected ? "correct" : "review",
              userAnswer: selected
                ? classificationOptions.find(
                    (option) => option.id === selected.classificationId,
                  )?.label ?? "Classificação não encontrada"
                : "Não foi presa ao painel",
              expectedAnswer:
                classificationOptions.find((option) => option.id === expected)
                  ?.label ?? "Classificação não encontrada",
              explanation: evidence.detail,
            } satisfies ActivityAnswerReviewItem;
          }),
          {
            id: "provisional-conclusion",
            title: "Conclusão antes de consultar o contato ou sistema conhecido",
            status: allowlists.correctProvisionalConclusionIds.includes(
              provisionalConclusionId as ConversationConclusionId,
            )
              ? "correct"
              : "review",
            userAnswer: conclusionLabel(provisionalConclusionId),
            expectedAnswer: listLabels(
              allowlists.correctProvisionalConclusionIds.map(conclusionLabel),
            ),
            explanation:
              "Antes de verificar pelo diretório, portal ou contato já conhecido, a conclusão deve respeitar o que ainda não está comprovado.",
          },
          {
            id: "confirmation-route",
            title: "Como o pedido foi verificado",
            status:
              confirmationRouteId === allowlists.correctConfirmationRouteId
                ? "correct"
                : "review",
            userAnswer:
              confirmationOptions.find(
                (option) => option.id === confirmationRouteId,
              )?.label ?? "Não definida",
            expectedAnswer:
              confirmationOptions.find(
                (option) => option.id === allowlists.correctConfirmationRouteId,
              )?.label ?? "Rota não encontrada",
            explanation:
              "A confirmação precisa começar em um contato ou sistema que já existia antes do pedido investigado.",
          },
          {
            id: "final-conclusion",
            title: "O que você conclui depois de verificar?",
            status:
              finalConclusionId === allowlists.correctFinalConclusionId
                ? "correct"
                : "review",
            userAnswer: conclusionLabel(finalConclusionId),
            expectedAnswer: conclusionLabel(allowlists.correctFinalConclusionId),
            explanation:
              "A nova informação permite atualizar a hipótese inicial sem reescrever o que era conhecido antes.",
          },
          {
            id: "final-action",
            title: "Ação final",
            status:
              finalActionId === allowlists.correctFinalActionId
                ? "correct"
                : "review",
            userAnswer:
              content.finalActionOptions.find(
                (option) => option.id === finalActionId,
              )?.label ?? "Não definida",
            expectedAnswer:
              content.finalActionOptions.find(
                (option) => option.id === allowlists.correctFinalActionId,
              )?.label ?? "Ação não encontrada",
            explanation:
              "A resposta deve ser proporcional ao que a consulta ao contato ou sistema conhecido demonstrou.",
          },
          {
            id: "report",
            title: "Conteúdo do reporte fictício",
            status: allowlists.requiresIncidentReport
              ? reportDetailIds.length === allowlists.safeReportDetailIds.length &&
                reportDetailIds.every((id) =>
                  allowlists.safeReportDetailIds.includes(id),
                )
                ? "correct"
                : "review"
              : reportDetailIds.length === 0
                ? "correct"
                : "review",
            userAnswer: listLabels(
              reportDetailIds.map(
                (id) =>
                  content.reportDetailOptions.find((option) => option.id === id)
                    ?.label ?? id,
              ),
            ),
            expectedAnswer: allowlists.requiresIncidentReport
              ? listLabels(
                  allowlists.safeReportDetailIds.map(
                    (id) =>
                      content.reportDetailOptions.find(
                        (option) => option.id === id,
                      )?.label ?? id,
                  ),
                )
              : "Nenhum reporte de segurança; seguir o processo normal",
            explanation:
              "O reporte registra fatos úteis e evita segredos, acusações ou detalhes desnecessários.",
          },
          {
            id: "transfer",
            title: "Aplicação em outro canal",
            status:
              transferDecisionId === allowlists.correctTransferDecisionId
                ? "correct"
                : "review",
            userAnswer:
              transferOptions.find(
                (option) => option.id === transferDecisionId,
              )?.label ?? "Não definida",
            expectedAnswer:
              transferOptions.find(
                (option) => option.id === allowlists.correctTransferDecisionId,
              )?.label ?? "Decisão não encontrada",
            explanation:
              "Mudar de canal não muda a regra: um contato indicado pelo próprio pedido não confirma que o pedido é verdadeiro.",
          },
        ]
      : displayResult && isV2Result
        ? [
            ["reconstruction", "Ordem da conversa", (displayResult as ConversationReconstructionV2Result).reconstructionPoints, 20, "A sequência correta permite perceber quando o contexto mudou."],
            ["turning-point", "Ponto de mudança", (displayResult as ConversationReconstructionV2Result).turningPointPoints, 20, "O ponto de mudança separa a rotina conhecida do novo pedido."],
            ["evidence", "Evidências fixadas", (displayResult as ConversationReconstructionV2Result).evidencePoints, 20, "As evidências precisam sustentar a decisão sem transformar suspeita em certeza."],
            ["calibration", "Conclusão proporcional", (displayResult as ConversationReconstructionV2Result).calibrationPoints, 15, "A conta pode ser verdadeira e o controle atual continuar não comprovado."],
            ["confirmation", "Verificação fora da conversa", (displayResult as ConversationReconstructionV2Result).confirmationPoints, 15, "A verificação deve começar em um contato ou sistema conhecido antes do pedido."],
            ["response", "Resposta e reporte", (displayResult as ConversationReconstructionV2Result).responsePoints, 10, "A resposta segura bloqueia a mudança e relata fatos úteis."],
          ].map(([id, title, earned, maximum, explanation]) => ({
            id: String(id),
            title: String(title),
            status:
              Number(earned) === Number(maximum) ? "correct" : "review",
            userAnswer: `${earned} de ${maximum} pontos`,
            explanation: String(explanation),
          }))
        : [];

  if (celebration.screen) return celebration.screen;

  return (
    <ActivityShell
      className="activity-workspace page-stack conversation-reconstruction-page"
      activityId={CONVERSATION_RECONSTRUCTION_ACTIVITY_ID}
    >
      <section className="mission-shell conversation-reconstruction-shell">
        <header className={`mission-header ${stage > 0 ? "activity-context-summary" : ""}`}>
          <div>
            <span className="section-badge">Missão · versão 2</span>
            <h1>A conversa já estava acontecendo</h1>
            <p>
              Reconstrua a conversa, localize a ruptura e confirme sem transformar
              familiaridade em prova.
            </p>
          </div>
          <div className="mission-meta" aria-label="Informações da missão">
            <span>Tempo estimado</span>
            <strong>9 a 12 minutos</strong>
            <small>{POINT_RULES.mainMission} pontos-base · sem cronômetro</small>
          </div>
        </header>

        <ActivityProgress
          steps={steps}
          currentStep={stage}
          ariaLabel="Progresso de A conversa já estava acontecendo"
        />
        <p className="sr-only" role="status" aria-live="polite">
          {announcement}
        </p>

        <div className="conversation-reconstruction-workspace">
          {stage === 0 ? (
            <div className="conversation-opening">
              <div className="conversation-opening__heading">
                <span className="section-kicker">Antes de começar</span>
                <h2 ref={stageTitleRef} tabIndex={-1}>
                  O que mudou nesta conversa?
                </h2>
                <p>
                  Organize as mensagens e encontre o pedido que mudou o rumo da conversa.
                </p>

              </div>
              <aside className="conversation-assigned-case">
                <span>Caso atribuído</span>
                <strong>{content.pathLabel}</strong>
                <p>{content.summary}</p>

              </aside>
              <div className="conversation-briefing-grid">
                <article>
                  <span>Seu papel</span>
                  <p>{content.role}</p>
                </article>
                <article>
                  <span>O que aconteceu</span>
                  <p>{content.caseContext}</p>
                </article>
                <article>
                  <span>Sua tarefa</span>
                  <p>
                    Organize as mensagens, adicione ao painel três informações importantes e marque onde o pedido mudou.
                  </p>
                </article>

              </div>
              <div className="mission-navigation">
                <button type="button" className="primary-button dark" onClick={() => goTo(1)}>
                  Iniciar reconstrução
                </button>
                <button type="button" className="text-button" onClick={onBackToMissions}>
                  Voltar ao percurso
                </button>
              </div>
            </div>
          ) : null}

          {stage === 1 ? (
            <div className="conversation-investigation-stage">
              <span className="section-kicker">Investigação · {content.pathLabel}</span>
              <h2 ref={stageTitleRef} tabIndex={-1}>
                O que mudou nesta conversa?
              </h2>
              <p className="conversation-stage-instruction">
                Arraste as mensagens para colocá-las em ordem, ou use as setas. Depois adicione ao painel três informações que ajudem a explicar o caso.
              </p>
              <div className="conversation-investigation-grid">
                <section aria-labelledby="timeline-title">
                  <h3 id="timeline-title">Linha da conversa</h3>
                  <ol className="conversation-timeline-sortable">
                    {orderedArtifactIds.map((artifactId, index) => {
                      const message = content.messages.find((item) => item.id === artifactId);
                      if (!message) return null;
                      return (
                        <li key={message.id} data-artifact-id={message.id} {...dragMessage(message.id)}>
                          <div className="conversation-position" aria-label={`Posição ${index + 1}`}>
                            {index + 1}
                          </div>
                          <div className="conversation-message-copy">
                            <span>{message.timeLabel}</span>
                            <strong>{message.sender}</strong>
                            <small>&lt;{message.address}&gt;</small>
                            <p>{message.body}</p>
                          </div>
                          <div className="conversation-move-controls">
                            <button
                              type="button"
                              disabled={index === 0}
                              onClick={() => moveMessage(message.id, index - 1)}
                              aria-label={`Mover mensagem de ${message.timeLabel} para cima`}
                            >
                              ↑
                            </button>
                            <button
                              type="button"
                              disabled={index === orderedArtifactIds.length - 1}
                              onClick={() => moveMessage(message.id, index + 1)}
                              aria-label={`Mover mensagem de ${message.timeLabel} para baixo`}
                            >
                              ↓
                            </button>
                            <label>
                              <span className="sr-only">Posição da mensagem de {message.timeLabel}</span>
                              <select
                                value={index + 1}
                                onChange={(event) =>
                                  moveMessage(message.id, Number(event.target.value) - 1)
                                }
                              >
                                {orderedArtifactIds.map((_, position) => (
                                  <option key={position} value={position + 1}>
                                    Posição {position + 1}
                                  </option>
                                ))}
                              </select>
                            </label>
                          </div>
                        </li>
                      );
                    })}
                  </ol>
                </section>

                <aside className="conversation-evidence-board" aria-labelledby="evidence-board-title">
                  <h3 id="evidence-board-title">Painel de evidências</h3>
                  <p>Adicione os trechos que ajudam a explicar o pedido e indique o que cada um comprova.</p>
                  {content.evidence.map((evidence) => {
                    const assessment = evidenceAssessments.find(
                      (item) => item.evidenceId === evidence.id,
                    );
                    return (
                      <article key={evidence.id} className={assessment ? "pinned" : ""}>
                        <span>{evidence.source}</span>
                        <strong>{evidence.title}</strong>
                        <p>{evidence.detail}</p>
                        <button
                          type="button"
                          aria-pressed={Boolean(assessment)}
                          onClick={() => toggleEvidence(evidence.id)}
                        >
                          {assessment ? "Remover do painel" : "Adicionar ao painel"}
                        </button>
                        {assessment ? (
                          <label>
                            <span>Classificação</span>
                            <select
                              value={assessment.classificationId}
                              onChange={(event) =>
                                classifyEvidence(
                                  evidence.id,
                                  event.target.value as EvidenceClassificationId,
                                )
                              }
                            >
                              {classificationOptions.map((option) => (
                                <option key={option.id} value={option.id}>
                                  {option.label}
                                </option>
                              ))}
                            </select>
                          </label>
                        ) : null}
                      </article>
                    );
                  })}
                  <p className="mission-hint">
                    {evidenceAssessments.length}/5 evidências presas · mínimo 3
                  </p>
                </aside>
              </div>
              <div className="classification-reference" aria-label="Referência de classificação">
                {classificationOptions.map((option) => (
                  <p key={option.id}>
                    <strong>{option.label}:</strong> {option.detail}
                  </p>
                ))}
              </div>
              <div className="mission-navigation">
                <button type="button" className="text-button" onClick={() => goTo(0)}>
                  ← Voltar ao contexto do caso
                </button>
                <button
                  type="button"
                  className="primary-button dark"
                  disabled={!assessmentsComplete}
                  onClick={() => goTo(2)}
                >
                  Marcar a mudança
                </button>
              </div>
            </div>
          ) : null}

          {stage === 2 ? (
            <div className="conversation-decision-stage">
              <span className="section-kicker">Decisão inicial</span>
              <h2 ref={stageTitleRef} tabIndex={-1}>
                Em qual mensagem o comportamento ou processo mudou?
              </h2>
              <p className="conversation-stage-instruction">
                Compare o pedido novo com as mensagens anteriores. Marque a
                primeira mensagem que altera destino, escopo ou procedimento e,
                em seguida, registre apenas o que é possível concluir antes de
                verificar por um contato ou sistema já conhecido.
              </p>
              <fieldset className="conversation-turning-points">
                <legend>Ponto de mudança</legend>
                {orderedArtifactIds.map((artifactId, index) => {
                  const message = content.messages.find((item) => item.id === artifactId);
                  if (!message) return null;
                  return (
                    <label
                      key={message.id}
                      className={turningPointArtifactId === message.id ? "selected" : ""}
                    >
                      <input
                        type="radio"
                        name="turning-point"
                        checked={turningPointArtifactId === message.id}
                        onChange={() => setTurningPointArtifactId(message.id)}
                      />
                      <span>
                        <strong>{index + 1}. {message.timeLabel}</strong>
                        <small>{message.body}</small>
                      </span>
                    </label>
                  );
                })}
              </fieldset>
              <fieldset className="conversation-choice-group">
                <legend>
                  O que é possível concluir antes de consultar um contato ou
                  sistema que já era conhecido?
                </legend>
                {conclusionOptions.map((option) => (
                  <label key={option.id} className={provisionalConclusionId === option.id ? "selected" : ""}>
                    <input
                      type="radio"
                      name="provisional-conclusion"
                      checked={provisionalConclusionId === option.id}
                      onChange={() => setProvisionalConclusionId(option.id)}
                    />
                    <span>{option.label}</span>
                  </label>
                ))}
              </fieldset>
              <div className="mission-navigation">
                <button type="button" className="text-button" onClick={() => goTo(1)}>
                  ← Rever reconstrução
                </button>
                <button
                  type="button"
                  className="primary-button dark"
                  disabled={!turningPointArtifactId || !provisionalConclusionId}
                  onClick={() => goTo(3)}
                >
                  Verificar pelo contato ou sistema já conhecido
                </button>
              </div>
            </div>
          ) : null}

          {stage === 3 ? (
            <div className="conversation-consequence-stage">
              <span className="section-kicker">Nova informação</span>
              <h2 ref={stageTitleRef} tabIndex={-1}>{content.consequence.title}</h2>
              <p>{content.consequence.body}</p>
              <div className="conversation-source-card">
                <span>Origem da informação</span>
                <strong>{content.consequence.sourceLabel}</strong>
                <p>
                  Esta informação veio de uma referência já conhecida fora da
                  conversa. A resposta é parte da simulação e não representa contato real.
                </p>
              </div>
              <div className="mission-navigation">
                <button type="button" className="text-button" onClick={() => goTo(2)}>
                  ← Rever hipótese inicial
                </button>
                <button type="button" className="primary-button dark" onClick={() => goTo(4)}>
                  Revisar com a nova informação
                </button>
              </div>
            </div>
          ) : null}

          {stage === 4 ? (
            <div className="conversation-review-stage">
              <span className="section-kicker">Revisão livre</span>
              <h2 ref={stageTitleRef} tabIndex={-1}>
                Confira o caminho antes da decisão final
              </h2>
              <div className="conversation-review-grid">
                <article>
                  <span>Reconstrução</span>
                  <strong>{orderedArtifactIds.length} mensagens ordenadas</strong>
                  <p>Você pode voltar e alterar posições sem perder pontos.</p>
                  <button type="button" className="text-button" onClick={() => goTo(1)}>
                    Rever linha e evidências
                  </button>
                </article>
                <article>
                  <span>Ponto marcado</span>
                  <strong>
                    {content.messages.find((message) => message.id === turningPointArtifactId)?.timeLabel}
                  </strong>
                  <p>{evidenceAssessments.length} evidências classificadas.</p>
                  <button type="button" className="text-button" onClick={() => goTo(2)}>
                    Rever ponto e hipótese
                  </button>
                </article>
                <article>
                  <span>Hipótese inicial</span>
                  <strong>{conclusionLabel(provisionalConclusionId)}</strong>
                  <p>
                    Agora ela será comparada com a informação obtida pelo contato
                    ou sistema que já existia antes desta conversa.
                  </p>
                </article>
              </div>
              <div className="mission-navigation">
                <button type="button" className="text-button" onClick={() => goTo(3)}>
                  ← Rever nova informação
                </button>
                <button type="button" className="primary-button dark" onClick={() => goTo(5)}>
                  Montar resposta final
                </button>
              </div>
            </div>
          ) : null}

          {stage === 5 ? (
            <div className="conversation-confirm-stage">
              <span className="section-kicker">Decisão final</span>
              <h2 ref={stageTitleRef} tabIndex={-1}>
                Confirme se a mudança realmente foi pedida e escolha como responder
              </h2>
              <p className="conversation-stage-instruction">
                <strong>O que você está confirmando:</strong> se a pessoa ou área
                conhecida realmente pediu esta mudança. Para isso, comece por um
                contato ou sistema que a empresa já utilizava antes da conversa;
                não use um telefone, link ou endereço fornecido no próprio pedido.
              </p>
              <div className="conversation-final-grid">
                <fieldset className="conversation-choice-group">
                  <legend>
                    Qual opção verifica o pedido usando uma referência que já
                    existia antes desta conversa?
                  </legend>
                  {confirmationOptions.map((option) => (
                    <label key={option.id} className={confirmationRouteId === option.id ? "selected" : ""}>
                      <input
                        type="radio"
                        name="confirmation-route"
                        checked={confirmationRouteId === option.id}
                        onChange={() => setConfirmationRouteId(option.id)}
                      />
                      <span>
                        <strong>{option.label}</strong>
                        <small>{option.detail}</small>
                      </span>
                    </label>
                  ))}
                </fieldset>
                <fieldset className="conversation-choice-group">
                  <legend>O que você conclui depois de verificar?</legend>
                  {conclusionOptions.map((option) => (
                    <label key={option.id} className={finalConclusionId === option.id ? "selected" : ""}>
                      <input
                        type="radio"
                        name="final-conclusion"
                        checked={finalConclusionId === option.id}
                        onChange={() => setFinalConclusionId(option.id)}
                      />
                      <span>{option.label}</span>
                    </label>
                  ))}
                </fieldset>
                <fieldset className="conversation-choice-group conversation-actions">
                  <legend>O que você faz agora?</legend>
                  {content.finalActionOptions.map((option) => (
                    <label key={option.id} className={finalActionId === option.id ? "selected" : ""}>
                      <input
                        type="radio"
                        name="final-action"
                        checked={finalActionId === option.id}
                        onChange={() => setFinalActionId(option.id)}
                      />
                      <span>
                        <strong>{option.label}</strong>
                        <small>{option.detail}</small>
                      </span>
                    </label>
                  ))}
                </fieldset>
              </div>
              {allowlists.requiresIncidentReport ? (
                <EvidenceTray items={content.reportDetailOptions} selectedIds={reportDetailIds} onToggle={toggleReportDetail} />
              ) : (
                <div className="conversation-no-report">
                  <strong>Nenhum incidente foi confirmado.</strong>
                  <p>Registre a mudança pelo processo comum; não abra um reporte de segurança sem necessidade.</p>
                </div>
              )}
              <div className="mission-navigation">
                <button type="button" className="text-button" onClick={() => goTo(4)}>
                  ← Voltar à revisão
                </button>
                <button
                  type="button"
                  className="primary-button dark"
                  disabled={!confirmationComplete}
                  onClick={() => goTo(6)}
                >
                  Aplicar em outro canal
                </button>
              </div>
            </div>
          ) : null}

          {stage === 6 ? (
            <div className="conversation-transfer-stage">
              <span className="section-kicker">Transferência curta</span>
              <h2 ref={stageTitleRef} tabIndex={-1}>{content.transfer.title}</h2>
              <p>{content.transfer.context}</p>
              <p className="conversation-stage-instruction">
                O canal mudou, mas a pergunta é a mesma: como confirmar sem usar
                o próprio pedido como prova de que ele é verdadeiro?
              </p>
              <blockquote>{content.transfer.message}</blockquote>
              <fieldset className="conversation-choice-group">
                <legend>
                  Qual ação verifica este novo pedido sem confiar apenas na conta
                  que enviou a mensagem?
                </legend>
                {transferOptions.map((option) => (
                  <label key={option.id} className={transferDecisionId === option.id ? "selected" : ""}>
                    <input
                      type="radio"
                      name="transfer-decision"
                      checked={transferDecisionId === option.id}
                      onChange={() => setTransferDecisionId(option.id)}
                    />
                    <span>{option.label}</span>
                  </label>
                ))}
              </fieldset>
              <ActivityError message={error} />
              <div className="mission-navigation">
                <button type="button" className="text-button" onClick={() => goTo(5)}>
                  ← Rever resposta final
                </button>
                <button
                  type="button"
                  className="primary-button dark"
                  disabled={!transferDecisionId || isSubmitting}
                  onClick={finish}
                >
                  {isSubmitting ? "Registrando..." : "Concluir Missão"}
                </button>
              </div>
            </div>
          ) : null}

          {stage === 7 && displayResult ? (
            <div className="conversation-result-stage">
              <span className="section-kicker">
                {isV2Result ? "Resultado privado" : "Resultado histórico · versão 1"}
              </span>
              <h2 ref={stageTitleRef} tabIndex={-1}>
                {displayResult.needsReview ? "Revisão recomendada" : "Processo seguro aplicado"}
              </h2>
              <div className={displayResult.needsReview ? "result-summary review" : "result-summary success"}>
                <div className="result-score">
                  <span>Resultado</span>
                  <strong>{displayResult.score}</strong>
                  <small>de 100</small>
                </div>
                <div>
                  <h3>
                    {isV2Result
                      ? contentPackage.feedback[displayResult.needsReview ? "review" : "success"]
                      : "Esta tentativa permanece avaliada pelas regras originais."}
                  </h3>
                  <p>
                    {isV2Result
                      ? "Revise abaixo as decisões que merecem mais atenção."
                      : "A versão 1 não recebe artificialmente a reconstrução, os pacotes ou a avaliação da versão 2."}
                  </p>
                </div>
              </div>

              {isV2Result ? (
                <><div className="conversation-score-grid">
                  <article><span>Reconstrução</span><strong>{(displayResult as ConversationReconstructionV2Result).reconstructionPoints}/20</strong></article>
                  <article><span>Ponto de mudança</span><strong>{(displayResult as ConversationReconstructionV2Result).turningPointPoints}/20</strong></article>
                  <article><span>Evidências</span><strong>{(displayResult as ConversationReconstructionV2Result).evidencePoints}/20</strong></article>
                  <article><span>Calibração</span><strong>{(displayResult as ConversationReconstructionV2Result).calibrationPoints}/15</strong></article>
                  <article><span>Confirmação</span><strong>{(displayResult as ConversationReconstructionV2Result).confirmationPoints}/15</strong></article>
                  <article><span>Resposta</span><strong>{(displayResult as ConversationReconstructionV2Result).responsePoints}/10</strong></article>
                </div>
                <details className="activity-review-disclosure"><summary>Rever minhas decisões</summary><ActivityAnswerReview items={answerReviewItems} /></details></>
              ) : null}

              <div className="result-grid">
                <article>
                  <span>Privacidade</span>
                  <strong>Resposta individual</strong>
                  <p>Equipe e gestão não recebem ordem, evidências ou conclusão nominal.</p>
                </article>
              </div>
              <ActivityNextStep area="Missões" title="Você iniciou este acesso?" onOpen={onOpenNextActivity} />
              <div className="activity-completion-actions" aria-label="Ações após a conclusão">
                <button type="button" className="activity-completion-button" onClick={reset}>Praticar novamente</button>
                <button type="button" className="activity-completion-button" onClick={onBackToMissions}>Voltar às missões</button>
                <button type="button" className="activity-completion-button" onClick={onOpenProfile}>Meu perfil</button>
              </div>
            </div>
          ) : null}

        </div>
      </section>

      <section className="mission-connection">
        <span className="section-kicker">Comportamento seguro</span>
        <p>
          Uma conversa pode ser verdadeira e ainda conter um pedido não autorizado.
          Confirmar por um contato ou sistema já conhecido resolve a incerteza sem
          depender de adivinhação.
        </p>
      </section>
    </ActivityShell>
  );
}
