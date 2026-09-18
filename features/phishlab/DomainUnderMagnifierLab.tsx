"use client";

import {
  useRef,
  useState,
  type CSSProperties,
  type DragEvent,
  type PointerEvent,
} from "react";

import { ActivityShell } from "@/features/activities/ActivityShell";
import {
  ActivityAnswerReview,
  type ActivityAnswerReviewItem,
} from "@/features/activities/primitives/ActivityAnswerReview";
import { ActivityError } from "@/features/activities/primitives/ActivityError";
import { ActivityProgress } from "@/features/activities/primitives/ActivityProgress";
import { useActivityStageFocus } from "@/features/activities/useActivityStageFocus";
import { usePostSubmitCelebration } from "@/features/activities/usePostSubmitCelebration";
import {
  DOMAIN_ANALYZER_V2_ACTIVITY_ID,
  DOMAIN_ANALYZER_V2_ACTIVITY_VERSION,
  DOMAIN_UNDER_MAGNIFIER_V2_PACKAGES,
  URL_ANATOMY_MECHANIC_ID,
  type DomainAnalyzerSafeRouteId,
  type DomainAnalyzerSegment,
  type DomainAnalyzerV2Package,
  type UrlSegmentRoleId,
} from "@/lib/content/activities/domain-under-magnifier/v2";
import type { AchievementDefinition } from "@/lib/content/achievement-catalog";
import { DOMAIN_UNDER_MAGNIFIER_V1_PACKAGE } from "@/lib/content/activities/domain-under-magnifier/v1";
import { POINT_RULES } from "@/lib/domain/rules";
import type {
  DomainAnalyzerV2Answer,
  DomainAnalyzerV2Result,
  LinkVerdict,
  PhishLabResult,
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

type PreviousResult = PhishLabResult | DomainAnalyzerV2Result;

type DomainUnderMagnifierLabProps = {
  existingResult: PreviousResult | null;
  existingCasePackageId: string | null;
  rewardAlreadyClaimed: boolean;
  claimedPoints: number;
  onComplete: (
    answer: DomainAnalyzerV2Answer,
  ) => Promise<DomainAnalyzerV2Result>;
  onBackToHub: () => void;
  onOpenSimulation: () => void;
  onOpenProfile: () => void;
  getUnlockedAchievementIds: () => Set<string>;
  getNewlyUnlockedAchievements: (beforeIds: Set<string>) => AchievementDefinition[];
};

function packageById(casePackageId: string): DomainAnalyzerV2Package {
  return (
    DOMAIN_UNDER_MAGNIFIER_V2_PACKAGES.find(
      (contentPackage) => contentPackage.casePackageId === casePackageId,
    ) ?? DOMAIN_UNDER_MAGNIFIER_V2_PACKAGES[0]
  );
}

function SegmentDragBoard({
  segments,
  assignments,
  roleOptions,
  onAssign,
}: {
  segments: readonly DomainAnalyzerSegment[];
  assignments: Readonly<Record<string, UrlSegmentRoleId>>;
  roleOptions: DomainAnalyzerV2Package["content"]["roleOptions"];
  onAssign: (segmentId: string, roleId: UrlSegmentRoleId) => void;
}) {
  const [heldRoleId, setHeldRoleId] = useState<UrlSegmentRoleId | null>(null);
  const [dragOverSegmentId, setDragOverSegmentId] = useState<string | null>(null);
  const [announcement, setAnnouncement] = useState(
    "Arraste uma função até o trecho correspondente.",
  );
  const pointerStartRef = useRef<{
    pointerId: number;
    roleId: UrlSegmentRoleId;
    x: number;
    y: number;
  } | null>(null);
  const pointerMovedRef = useRef(false);
  const suppressClickRef = useRef(false);

  const roleLabel = (roleId: UrlSegmentRoleId) =>
    roleOptions.find((role) => role.id === roleId)?.label ?? "Função";

  const placeRole = (segmentId: string, roleId: UrlSegmentRoleId) => {
    onAssign(segmentId, roleId);
    const segment = segments.find((candidate) => candidate.id === segmentId);
    setHeldRoleId(null);
    setDragOverSegmentId(null);
    setAnnouncement(
      `${roleLabel(roleId)} foi colocado em ${segment?.value || "sem subdomínio"}.`,
    );
  };

  const roleFromDrag = (event: DragEvent<HTMLElement>) =>
    (event.dataTransfer.getData("application/x-url-role") ||
      event.dataTransfer.getData("text/plain")) as UrlSegmentRoleId;

  const segmentUnderPointer = (clientX: number, clientY: number) =>
    document
      .elementFromPoint(clientX, clientY)
      ?.closest<HTMLElement>("[data-url-drop-segment]")
      ?.dataset.urlDropSegment ?? null;

  const beginTouchDrag = (
    event: PointerEvent<HTMLButtonElement>,
    roleId: UrlSegmentRoleId,
  ) => {
    if (event.pointerType === "mouse") return;
    pointerStartRef.current = {
      pointerId: event.pointerId,
      roleId,
      x: event.clientX,
      y: event.clientY,
    };
    pointerMovedRef.current = false;
    event.currentTarget.setPointerCapture(event.pointerId);
    setHeldRoleId(roleId);
  };

  const moveTouchDrag = (event: PointerEvent<HTMLButtonElement>) => {
    const start = pointerStartRef.current;
    if (!start || start.pointerId !== event.pointerId) return;
    if (Math.hypot(event.clientX - start.x, event.clientY - start.y) > 8) {
      pointerMovedRef.current = true;
    }
    if (!pointerMovedRef.current) return;
    event.preventDefault();
    setDragOverSegmentId(segmentUnderPointer(event.clientX, event.clientY));
  };

  const finishTouchDrag = (event: PointerEvent<HTMLButtonElement>) => {
    const start = pointerStartRef.current;
    if (!start || start.pointerId !== event.pointerId) return;
    const segmentId = segmentUnderPointer(event.clientX, event.clientY);
    if (pointerMovedRef.current) {
      suppressClickRef.current = true;
      if (segmentId) placeRole(segmentId, start.roleId);
      else {
        setHeldRoleId(null);
        setDragOverSegmentId(null);
        setAnnouncement("A função voltou para a bandeja. Tente arrastá-la até um trecho.");
      }
    }
    pointerStartRef.current = null;
    pointerMovedRef.current = false;
  };

  return (
    <div className="url-drag-board" aria-describedby="url-drag-instructions">
      <div className="url-drag-board__heading">
        <div>
          <span className="pare-step-badge">Arraste e solte</span>
          <h3>Encaixe as partes do endereço</h3>
        </div>
        <p id="url-drag-instructions">
          Arraste cada função até o trecho correspondente. No teclado ou no toque,
          escolha uma função e depois escolha o destino.
        </p>
      </div>

      <section className="url-role-palette" aria-label="Funções disponíveis">
        <span>Funções para posicionar</span>
        <div>
          {roleOptions.map((role) => {
            const assignedSegment = segments.find(
              (segment) => assignments[segment.id] === role.id,
            );
            const isHeld = heldRoleId === role.id;
            return (
              <button
                key={role.id}
                type="button"
                draggable
                className={`${isHeld ? "is-held" : ""} ${assignedSegment ? "is-assigned" : ""}`.trim()}
                aria-pressed={isHeld}
                onClick={() => {
                  if (suppressClickRef.current) {
                    suppressClickRef.current = false;
                    return;
                  }
                  setHeldRoleId((current) => (current === role.id ? null : role.id));
                  setAnnouncement(
                    isHeld
                      ? `${role.label} voltou para a bandeja.`
                      : `${role.label} selecionado. Agora escolha um trecho.`,
                  );
                }}
                onDragStart={(event) => {
                  event.dataTransfer.effectAllowed = "move";
                  event.dataTransfer.setData("application/x-url-role", role.id);
                  event.dataTransfer.setData("text/plain", role.id);
                  setHeldRoleId(role.id);
                  setAnnouncement(`${role.label} em movimento.`);
                }}
                onDragEnd={() => {
                  setHeldRoleId(null);
                  setDragOverSegmentId(null);
                }}
                onPointerDown={(event) => beginTouchDrag(event, role.id)}
                onPointerMove={moveTouchDrag}
                onPointerUp={finishTouchDrag}
                onPointerCancel={() => {
                  pointerStartRef.current = null;
                  pointerMovedRef.current = false;
                  setHeldRoleId(null);
                  setDragOverSegmentId(null);
                }}
              >
                <span aria-hidden="true">⋮⋮</span>
                <strong>{role.label}</strong>
                <small>
                  {assignedSegment
                    ? `Em ${assignedSegment.value || "sem subdomínio"}`
                    : "Disponível"}
                </small>
              </button>
            );
          })}
        </div>
      </section>

      <section className="url-segment-drop-grid" aria-label="Trechos do endereço">
        {segments.map((segment, index) => {
          const assignedRoleId = assignments[segment.id];
          const isOver = dragOverSegmentId === segment.id;
          return (
            <button
              key={segment.id}
              type="button"
              data-url-drop-segment={segment.id}
              className={`${assignedRoleId ? "has-role" : ""} ${isOver ? "is-over" : ""}`.trim()}
              onClick={() => {
                if (heldRoleId) placeRole(segment.id, heldRoleId);
              }}
              onDragEnter={(event) => {
                event.preventDefault();
                setDragOverSegmentId(segment.id);
              }}
              onDragOver={(event) => {
                event.preventDefault();
                event.dataTransfer.dropEffect = "move";
              }}
              onDragLeave={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
                  setDragOverSegmentId(null);
                }
              }}
              onDrop={(event) => {
                event.preventDefault();
                const roleId = roleFromDrag(event);
                if (roleOptions.some((role) => role.id === roleId)) {
                  placeRole(segment.id, roleId);
                }
              }}
              aria-label={`Trecho ${index + 1}, ${segment.value || "sem subdomínio"}. ${
                assignedRoleId
                  ? `Função ${roleLabel(assignedRoleId)} atribuída.`
                  : "Sem função atribuída."
              }`}
            >
              <span>Trecho {String(index + 1).padStart(2, "0")}</span>
              <code>{segment.value || "(sem subdomínio)"}</code>
              <strong>
                {assignedRoleId ? roleLabel(assignedRoleId) : "Solte uma função aqui"}
              </strong>
            </button>
          );
        })}
      </section>
      <p className="sr-only" role="status" aria-live="polite">{announcement}</p>
    </div>
  );
}

function SegmentChoice({
  legend,
  segments,
  value,
  onChange,
}: {
  legend: string;
  segments: readonly DomainAnalyzerSegment[];
  value: string;
  onChange: (segmentId: string) => void;
}) {
  return (
    <fieldset className="url-anatomy-choice-group">
      <legend>{legend}</legend>
      {segments.map((segment, index) => (
        <label key={segment.id} className={value === segment.id ? "selected" : ""}>
          <input
            type="radio"
            name={legend}
            checked={value === segment.id}
            onChange={() => onChange(segment.id)}
          />
          <span>
            <strong>Trecho {index + 1}</strong>
            <code>{segment.value || "(sem subdomínio)"}</code>
          </span>
        </label>
      ))}
    </fieldset>
  );
}

function VerdictChoice({
  legend,
  options,
  value,
  onChange,
}: {
  legend: string;
  options: DomainAnalyzerV2Package["content"]["verdictOptions"];
  value: LinkVerdict | "";
  onChange: (verdictId: LinkVerdict) => void;
}) {
  return (
    <fieldset className="url-anatomy-choice-group">
      <legend>{legend}</legend>
      {options.map((option) => (
        <label key={option.id} className={value === option.id ? "selected" : ""}>
          <input
            type="radio"
            name={legend}
            checked={value === option.id}
            onChange={() => onChange(option.id)}
          />
          <span>{option.label}</span>
        </label>
      ))}
    </fieldset>
  );
}

export function DomainUnderMagnifierLab({
  existingResult,
  existingCasePackageId,
  rewardAlreadyClaimed,
  claimedPoints,
  onComplete,
  onBackToHub,
  onOpenSimulation,
  onOpenProfile,
  getUnlockedAchievementIds,
  getNewlyUnlockedAchievements,
}: DomainUnderMagnifierLabProps) {
  const celebration = usePostSubmitCelebration(
    "Domínio sob a lupa",
    "var(--learn-teal)",
  );
  const [stage, setStage] = useState(existingResult ? 7 : 0);
  const [casePackageId, setCasePackageId] = useState(
    packageById(
      existingCasePackageId ??
        DOMAIN_UNDER_MAGNIFIER_V2_PACKAGES[0].casePackageId,
    ).casePackageId,
  );
  const [calibrationAcknowledged, setCalibrationAcknowledged] = useState(false);
  const [segmentRoleById, setSegmentRoleById] = useState<
    Record<string, UrlSegmentRoleId>
  >({});
  const [registeredDomainSelectionId, setRegisteredDomainSelectionId] =
    useState("");
  const [verdictId, setVerdictId] = useState<LinkVerdict | "">("");
  const [safeRouteId, setSafeRouteId] =
    useState<DomainAnalyzerSafeRouteId | "">("");
  const [transferRegisteredDomainSelectionId, setTransferDomainId] =
    useState("");
  const [transferVerdictId, setTransferVerdictId] =
    useState<LinkVerdict | "">("");
  const [usedHelpIds, setUsedHelpIds] = useState<string[]>([]);
  const [displayResult, setDisplayResult] = useState<PreviousResult | null>(
    existingResult,
  );
  const [rewardGrantedInAttempt, setRewardGrantedInAttempt] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const stageTitleRef = useActivityStageFocus(stage, Boolean(celebration.screen));
  const calibrationTitleRef = useRef<HTMLHeadingElement>(null);
  const contentPackage = packageById(casePackageId);
  const { content } = contentPackage;
  const mainAssignmentsComplete = content.mainCase.segments.every(
    (segment) => Boolean(segmentRoleById[segment.id]),
  );
  const mainDecisionComplete = Boolean(
    registeredDomainSelectionId && verdictId && safeRouteId,
  );
  const transferComplete = Boolean(
    transferRegisteredDomainSelectionId && transferVerdictId,
  );
  const isV2Result = Boolean(
    displayResult && "anatomyPoints" in displayResult,
  );

  const goTo = (nextStage: number) => {
    setStage(nextStage);
    window.scrollTo({ top: 0, behavior: "auto" });
  };

  const selectPackage = (nextPackageId: string) => {
    setCasePackageId(nextPackageId);
    setCalibrationAcknowledged(false);
    setSegmentRoleById({});
    setRegisteredDomainSelectionId("");
    setVerdictId("");
    setSafeRouteId("");
    setTransferDomainId("");
    setTransferVerdictId("");
    setUsedHelpIds([]);
  };

  const assignRole = (segmentId: string, roleId: UrlSegmentRoleId) => {
    setSegmentRoleById((current) => {
      const next = Object.fromEntries(
        Object.entries(current).filter(
          ([currentSegmentId, currentRoleId]) =>
            currentSegmentId === segmentId || currentRoleId !== roleId,
        ),
      ) as Record<string, UrlSegmentRoleId>;
      next[segmentId] = roleId;
      return next;
    });
  };

  const openRoleReference = () => {
    setUsedHelpIds((current) =>
      current.includes("role-reference")
        ? current
        : [...current, "role-reference"],
    );
  };

  const finish = async () => {
    if (!mainAssignmentsComplete || !mainDecisionComplete || !transferComplete) {
      setError("Complete a análise principal e a transferência antes de enviar.");
      return;
    }

    setIsSubmitting(true);
    setError("");
    const grantsFirstReward = !rewardAlreadyClaimed;
    const beforeIds = getUnlockedAchievementIds();

    try {
      const result = await onComplete({
        activityId: DOMAIN_ANALYZER_V2_ACTIVITY_ID,
        activityVersion: DOMAIN_ANALYZER_V2_ACTIVITY_VERSION,
        casePackageId,
        mechanicId: URL_ANATOMY_MECHANIC_ID,
        answerPayload: {
          segmentRoleById,
          registeredDomainSelectionId,
          inspectedSegmentIds: Object.keys(segmentRoleById),
          verdictId: verdictId as LinkVerdict,
          safeRouteId,
          transferRegisteredDomainSelectionId,
          transferVerdictId: transferVerdictId as LinkVerdict,
          usedHelpIds,
        },
      });
      setDisplayResult(result);
      setRewardGrantedInAttempt(grantsFirstReward);
      goTo(7);
      celebration.begin(getNewlyUnlockedAchievements(beforeIds));
    } catch {
      setError("Não foi possível registrar o laboratório. Revise e tente novamente.");
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
    const currentIndex = DOMAIN_UNDER_MAGNIFIER_V2_PACKAGES.findIndex(
      (candidate) => candidate.casePackageId === casePackageId,
    );
    const nextPackage =
      DOMAIN_UNDER_MAGNIFIER_V2_PACKAGES[
        (currentIndex + 1) % DOMAIN_UNDER_MAGNIFIER_V2_PACKAGES.length
      ];
    selectPackage(nextPackage.casePackageId);
    setDisplayResult(null);
    setRewardGrantedInAttempt(false);
    setError("");
    celebration.reset();
    goTo(0);
  };

  const bonusPoints =
    displayResult && rewardGrantedInAttempt
      ? displayResult.potentialReward - POINT_RULES.phishLab
      : 0;
  const hasCurrentAttemptAnswers =
    Object.keys(segmentRoleById).length === content.mainCase.segments.length &&
    Boolean(
      registeredDomainSelectionId &&
        verdictId &&
        safeRouteId &&
        transferRegisteredDomainSelectionId &&
        transferVerdictId,
    );
  const answerReviewItems: ActivityAnswerReviewItem[] =
    displayResult && isV2Result && hasCurrentAttemptAnswers
      ? [
          ...content.mainCase.segments.map((segment, index) => {
            const selectedRoleId = segmentRoleById[segment.id];
            return {
              id: `segment-${segment.id}`,
              title: `Trecho ${index + 1}: ${segment.value || "sem subdomínio"}`,
              status:
                selectedRoleId === segment.roleId
                  ? ("correct" as const)
                  : ("review" as const),
              userAnswer:
                content.roleOptions.find((role) => role.id === selectedRoleId)
                  ?.label ?? "Não respondido",
              expectedAnswer:
                content.roleOptions.find((role) => role.id === segment.roleId)
                  ?.label ?? "Função não encontrada",
              explanation:
                segment.roleId === "registeredDomain"
                  ? "Este é o trecho que define a origem controlada pelo responsável pelo domínio."
                  : "Este trecho ajuda a interpretar o endereço, mas não substitui o domínio registrado.",
            };
          }),
          {
            id: "registered-domain",
            title: "Domínio registrado do caso principal",
            status:
              registeredDomainSelectionId ===
              content.mainCase.correctRegisteredDomainSegmentId
                ? "correct"
                : "review",
            userAnswer:
              content.mainCase.segments.find(
                (segment) => segment.id === registeredDomainSelectionId,
              )?.value ?? "Não respondido",
            expectedAnswer:
              content.mainCase.segments.find(
                (segment) =>
                  segment.id ===
                  content.mainCase.correctRegisteredDomainSegmentId,
              )?.value ?? "Domínio não encontrado",
            explanation:
              "Marca, caminho e parâmetro podem parecer familiares; quem define a origem é o domínio registrado.",
          },
          {
            id: "main-verdict",
            title: "Conclusão sobre o caso principal",
            status:
              verdictId === content.mainCase.correctVerdictId
                ? "correct"
                : "review",
            userAnswer:
              content.verdictOptions.find((option) => option.id === verdictId)
                ?.label ?? "Não respondido",
            expectedAnswer:
              content.verdictOptions.find(
                (option) => option.id === content.mainCase.correctVerdictId,
              )?.label ?? "Conclusão não encontrada",
            explanation:
              "A conclusão combina a origem encontrada com o contexto em que o endereço foi recebido.",
          },
          {
            id: "safe-route",
            title: "Rota para continuar o processo",
            status:
              safeRouteId === contentPackage.allowlists.correctSafeRouteId
                ? "correct"
                : "review",
            userAnswer:
              content.safeRouteOptions.find((option) => option.id === safeRouteId)
                ?.label ?? "Não respondido",
            expectedAnswer:
              content.safeRouteOptions.find(
                (option) =>
                  option.id === contentPackage.allowlists.correctSafeRouteId,
              )?.label ?? "Rota não encontrada",
            explanation:
              "A rota segura não usa o próprio endereço analisado para confirmar a origem dele.",
          },
          {
            id: "transfer-domain",
            title: "Domínio registrado do segundo endereço",
            status:
              transferRegisteredDomainSelectionId ===
              content.transferCase.correctRegisteredDomainSegmentId
                ? "correct"
                : "review",
            userAnswer:
              content.transferCase.segments.find(
                (segment) =>
                  segment.id === transferRegisteredDomainSelectionId,
              )?.value ?? "Não respondido",
            expectedAnswer:
              content.transferCase.segments.find(
                (segment) =>
                  segment.id ===
                  content.transferCase.correctRegisteredDomainSegmentId,
              )?.value ?? "Domínio não encontrado",
            explanation:
              "A origem precisa ser localizada novamente quando a aparência ou o contexto mudam.",
          },
          {
            id: "transfer-verdict",
            title: "Conclusão sobre o segundo endereço",
            status:
              transferVerdictId === content.transferCase.correctVerdictId
                ? "correct"
                : "review",
            userAnswer:
              content.verdictOptions.find(
                (option) => option.id === transferVerdictId,
              )?.label ?? "Não respondido",
            expectedAnswer:
              content.verdictOptions.find(
                (option) =>
                  option.id === content.transferCase.correctVerdictId,
              )?.label ?? "Conclusão não encontrada",
            explanation:
              "O mesmo método deve funcionar em um endereço diferente, inclusive para reconhecer um caso legítimo.",
          },
        ]
      : displayResult && isV2Result
        ? [
            ["anatomy", "Anatomia do endereço", (displayResult as DomainAnalyzerV2Result).anatomyPoints, 30, "Protocolo, subdomínio, domínio registrado, caminho e parâmetro têm funções diferentes."],
            ["conclusion", "Domínio e conclusão", (displayResult as DomainAnalyzerV2Result).domainConclusionPoints, 25, "A decisão deve se apoiar no domínio registrado e no contexto."],
            ["route", "Rota segura", (displayResult as DomainAnalyzerV2Result).safeRoutePoints, 20, "A rota segura é obtida fora do endereço investigado."],
            ["transfer", "Aplicação em outro endereço", (displayResult as DomainAnalyzerV2Result).transferPoints, 25, "A leitura precisa funcionar também quando a aparência muda."],
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
      className="activity-workspace page-stack lab-player-page url-anatomy-page"
      activityId={DOMAIN_ANALYZER_V2_ACTIVITY_ID}
    >
      <section className="lab-player-shell url-anatomy-shell foundation-shell">
        <header className="lab-player-header foundation-header">
          <div>
            <span className="section-badge">PhishLab</span>
            <h1>Domínio sob a lupa</h1>
            <p>
              Separe as partes de um endereço e descubra qual delas identifica o site.
            </p>
          </div>
          <div className="lab-player-meta">
            <span>Tempo estimado</span>
            <strong>8 a 10 minutos</strong>
            <small>60 pontos-base · sem cronômetro</small>
          </div>
        </header>

        <ActivityProgress
          steps={steps}
          currentStep={stage}
          className="url-foundation-progress"
          ariaLabel="Progresso de Domínio sob a lupa"
        />

        <div className="url-anatomy-workspace foundation-workspace" aria-live="polite">
          {stage === 0 ? (
            <div className="url-anatomy-opening domain-foundation-opening">
              <div className="url-anatomy-opening__heading foundation-opening__copy">
                <span className="section-kicker">Antes de começar</span>
                <h2 ref={stageTitleRef} tabIndex={-1}>
                  Qual parte identifica o site?
                </h2>
                <p>
                  Veja um exemplo e depois encaixe as partes do endereço nas categorias correspondentes.
                </p>

                <div className="lab-player-actions domain-opening-actions">
                  <button
                    type="button"
                    className="primary-button learning-button"
                    onClick={() => goTo(1)}
                  >
                    Aprender a separar o endereço <span aria-hidden="true">→</span>
                  </button>
                  <button type="button" className="text-button" onClick={onBackToHub}>
                    Voltar às estações
                  </button>
                </div>
              </div>
              <div className="domain-opening-visual">
                <div className="domain-opening-browser" aria-hidden="true">
                  <div><span /><span /><span /></div>
                  <p>
                    <span>https://</span>
                    <b>leroymerlin.conta.</b>
                    <strong>seguranca-contas.example</strong>
                    <em>/confirmar</em>
                  </p>
                  <small>Qual trecho controla a origem?</small>
                </div>
                <aside className="url-anatomy-assigned-case">
                  <span>Seu caso</span>
                  <strong>{content.pathLabel}</strong>
                  <p>{content.summary}</p>
                  
                </aside>
              </div>
              <div className="url-anatomy-briefing-grid">
                
                <article><span>O que aconteceu</span><p>{content.situation}</p></article>
                <article><span>Sua tarefa</span><p>{content.task}</p></article>
                
              </div>
            </div>
          ) : null}

          {stage === 1 ? (
            <div className="url-anatomy-investigation foundation-stage">
              {!calibrationAcknowledged ? (
                <section className="url-calibration-card">
                  <span className="section-kicker">Veja um exemplo</span>
                  <h2 ref={stageTitleRef} tabIndex={-1}>
                    Um endereço, cinco partes
                  </h2>
                  <p>{content.calibration.context}</p>
                  <p className="safe-url">{content.calibration.url}</p>
                  <ol className="calibration-segments">
                    {content.calibration.segments.map((segment) => (
                      <li key={segment.id}>
                        <code>{segment.value}</code>
                        <strong>
                          {
                            content.roleOptions.find(
                              (role) => role.id === segment.roleId,
                            )?.label
                          }
                        </strong>
                      </li>
                    ))}
                  </ol>
                  <button
                    type="button"
                    className="primary-button dark"
                    onClick={() => {
                      setCalibrationAcknowledged(true);
                      window.requestAnimationFrame(() =>
                        calibrationTitleRef.current?.focus(),
                      );
                    }}
                  >
                    Montar o endereço do caso
                  </button>
                </section>
              ) : (
                <section>
                  <span className="section-kicker">Caso principal · {content.pathLabel}</span>
                  <h2 ref={calibrationTitleRef} tabIndex={-1}>
                    {content.mainCase.title}
                  </h2>
                  <p>{content.mainCase.context}</p>

                  <div className="url-reference-row">
                    <p className="safe-url">{content.mainCase.url}</p>
                    <p>
                      Origem esperada no processo: <strong>{content.mainCase.expectedOrigin}</strong>
                    </p>
                  </div>
                  <button
                    type="button"
                    className="hint-button"
                    aria-pressed={usedHelpIds.includes("role-reference")}
                    onClick={openRoleReference}
                  >
                    {usedHelpIds.includes("role-reference")
                      ? "Referência aberta: protocolo inicia; caminho e parâmetro vêm depois do domínio."
                      : "Abrir referência das funções"}
                  </button>
                  <SegmentDragBoard
                    segments={content.mainCase.segments}
                    assignments={segmentRoleById}
                    roleOptions={content.roleOptions}
                    onAssign={assignRole}
                  />
                  <div className="lab-player-actions">
                    <button
                      type="button"
                      className="primary-button dark"
                      disabled={!mainAssignmentsComplete}
                      onClick={() => goTo(2)}
                    >
                      Analisar o endereço montado
                    </button>
                    <button type="button" className="text-button" onClick={() => goTo(0)}>
                      Voltar ao contexto do caso
                    </button>
                  </div>
                </section>
              )}
            </div>
          ) : null}

          {stage === 2 ? (
            <div className="url-anatomy-decision foundation-stage">
              <span className="section-kicker">Decisão inicial</span>
              <h2 ref={stageTitleRef} tabIndex={-1}>
                O que a estrutura permite concluir?
              </h2>
              <p className="safe-url">{content.mainCase.url}</p>
              <div className="url-decision-grid">
                <SegmentChoice
                  legend="Neste endereço, qual trecho é o domínio registrado que controla a origem?"
                  segments={content.mainCase.segments}
                  value={registeredDomainSelectionId}
                  onChange={setRegisteredDomainSelectionId}
                />
                <VerdictChoice
                  legend={`Considerando o aviso recebido e a origem esperada ${content.mainCase.expectedOrigin}, qual é a conclusão mais segura?`}
                  options={content.verdictOptions}
                  value={verdictId}
                  onChange={setVerdictId}
                />
                <fieldset className="url-anatomy-choice-group">
                  <legend>Depois de analisar este endereço, por onde você continuaria o processo?</legend>
                  {content.safeRouteOptions.map((option) => (
                    <label
                      key={option.id}
                      className={safeRouteId === option.id ? "selected" : ""}
                    >
                      <input
                        type="radio"
                        name="safe-route"
                        checked={safeRouteId === option.id}
                        onChange={() => setSafeRouteId(option.id)}
                      />
                      <span>{option.label}</span>
                    </label>
                  ))}
                </fieldset>
              </div>
              <div className="lab-player-actions">
                <button
                  type="button"
                  className="primary-button dark"
                  disabled={!mainDecisionComplete}
                  onClick={() => goTo(3)}
                >
                  Ver consequência simulada
                </button>
                <button type="button" className="text-button" onClick={() => goTo(1)}>
                  Rever anatomia
                </button>
              </div>
            </div>
          ) : null}

          {stage === 3 ? (
            <div className="url-anatomy-consequence foundation-stage">
              <span className="section-kicker">Consequência cenográfica</span>
              <h2 ref={stageTitleRef} tabIndex={-1}>
                Sua escolha definiria por onde o processo continuaria
              </h2>
              <p>
                {safeRouteId === "analyzed-address"
                  ? "Você continuaria pelo mesmo endereço cuja origem está tentando confirmar. Isso faria o endereço servir como prova de si mesmo. A simulação não abre a página e permite revisar a decisão."
                  : "Você continuaria por uma referência que já existia fora do endereço analisado. Assim, a solicitação não confirma a si mesma. Nenhum acesso real foi executado."}
              </p>
              <p>
                Este quadro explica o efeito da rota, mas ainda não revela se a
                anatomia ou o veredito estão corretos.
              </p>
              <button
                type="button"
                className="primary-button dark"
                onClick={() => goTo(4)}
              >
                Revisar antes de confirmar
              </button>
            </div>
          ) : null}

          {stage === 4 ? (
            <div className="url-anatomy-review foundation-stage">
              <span className="section-kicker">Revisão editável</span>
              <h2 ref={stageTitleRef} tabIndex={-1}>
                Confira a anatomia, a origem e a rota
              </h2>
              <dl>
                <div>
                  <dt>Trechos classificados</dt>
                  <dd>{Object.keys(segmentRoleById).length}/{content.mainCase.segments.length}</dd>
                </div>
                <div>
                  <dt>Domínio selecionado</dt>
                  <dd>
                    {content.mainCase.segments.find(
                      (segment) => segment.id === registeredDomainSelectionId,
                    )?.value ?? "Não selecionado"}
                  </dd>
                </div>
                <div>
                  <dt>Conclusão</dt>
                  <dd>
                    {content.verdictOptions.find((option) => option.id === verdictId)?.label}
                  </dd>
                </div>
                <div>
                  <dt>Rota</dt>
                  <dd>
                    {content.safeRouteOptions.find((option) => option.id === safeRouteId)?.label}
                  </dd>
                </div>
              </dl>
              <div className="lab-player-actions">
                <button type="button" className="text-button" onClick={() => goTo(1)}>
                  Editar anatomia
                </button>
                <button type="button" className="text-button" onClick={() => goTo(2)}>
                  Editar decisão
                </button>
                <button
                  type="button"
                  className="primary-button dark"
                  onClick={() => goTo(5)}
                >
                  Ir à confirmação final
                </button>
              </div>
            </div>
          ) : null}

          {stage === 5 ? (
            <div className="url-anatomy-final foundation-stage">
              <span className="section-kicker">Decisão final</span>
              <h2 ref={stageTitleRef} tabIndex={-1}>
                Confirme o caso principal antes da transferência
              </h2>
              <p>
                Depois desta confirmação, você aplicará o mesmo raciocínio a uma
                mudança curta. A nota continua oculta até o envio final.
              </p>
              <div className="lab-player-actions">
                <button
                  type="button"
                  className="primary-button dark"
                  onClick={() => goTo(6)}
                >
                  Confirmar e abrir transferência
                </button>
                <button type="button" className="text-button" onClick={() => goTo(4)}>
                  Voltar à revisão
                </button>
              </div>
            </div>
          ) : null}

          {stage === 6 ? (
            <div className="url-anatomy-transfer foundation-stage">
              <span className="section-kicker">Transferência curta</span>
              <h2 ref={stageTitleRef} tabIndex={-1}>
                {content.transferCase.title}
              </h2>
              <p>{content.transferCase.context}</p>
              <p className="url-anatomy-instruction">
                Agora a aparência mudou. Verifique novamente qual domínio controla a
                origem e se essa mudança altera a conclusão.
              </p>
              <p className="safe-url">{content.transferCase.url}</p>
              <div className="url-decision-grid two-columns">
                <SegmentChoice
                  legend="No novo endereço, qual trecho é o domínio registrado que controla a origem?"
                  segments={content.transferCase.segments}
                  value={transferRegisteredDomainSelectionId}
                  onChange={setTransferDomainId}
                />
                <VerdictChoice
                  legend="Comparando este novo domínio com o contexto informado, qual é a conclusão?"
                  options={content.verdictOptions}
                  value={transferVerdictId}
                  onChange={setTransferVerdictId}
                />
              </div>
              <ActivityError className="form-error" message={error} />
              <div className="lab-player-actions">
                <button
                  type="button"
                  className="primary-button dark"
                  disabled={!transferComplete || isSubmitting}
                  onClick={finish}
                >
                  {isSubmitting ? "Registrando tentativa..." : "Enviar análise completa"}
                </button>
                <button type="button" className="text-button" onClick={() => goTo(4)}>
                  Voltar à revisão principal
                </button>
              </div>
            </div>
          ) : null}

          {stage === 7 && displayResult ? (
            <div className="lab-result-view">
              <div className="result-hero compact-result">
                <div>
                  <span className="section-badge">
                    {isV2Result ? "Anatomia concluída" : "Resultado histórico v1"}
                  </span>
                  <h2 ref={stageTitleRef} tabIndex={-1}>
                    {displayResult.score}/100
                  </h2>
                  <p>
                    {displayResult.needsReview
                      ? "A atividade foi concluída e recomenda uma nova tentativa guiada."
                      : "Você localizou a origem e aplicou a técnica em uma estrutura diferente."}
                  </p>
                </div>
                <div
                  className="score-ring"
                  style={{ "--score": displayResult.score } as CSSProperties}
                >
                  <strong>{displayResult.score}</strong>
                  <span>desempenho</span>
                </div>
              </div>
              {isV2Result ? (
                <><div className="lab-result-grid">
                  <article>
                    <span>Anatomia</span>
                    <strong>{(displayResult as DomainAnalyzerV2Result).anatomyPoints}/30</strong>
                    <p>Função atribuída aos cinco trechos.</p>
                  </article>
                  <article>
                    <span>Origem e conclusão</span>
                    <strong>{(displayResult as DomainAnalyzerV2Result).domainConclusionPoints}/25</strong>
                    <p>Domínio registrado e veredito proporcional.</p>
                  </article>
                  <article>
                    <span>Rota própria</span>
                    <strong>{(displayResult as DomainAnalyzerV2Result).safeRoutePoints}/20</strong>
                    <p>Resposta sem usar o endereço como prova.</p>
                  </article>
                  <article>
                    <span>Transferência</span>
                    <strong>{(displayResult as DomainAnalyzerV2Result).transferPoints}/25</strong>
                    <p>Aplicação em outra aparência.</p>
                  </article>
                </div>
                <details className="activity-review-disclosure"><summary>Rever minhas decisões</summary><ActivityAnswerReview items={answerReviewItems} /></details></>
              ) : (
                <div className="legacy-result-notice">
                  <strong>A tentativa antiga foi preservada sem reinterpretação.</strong>
                  <p>
                    Refazer inicia a versão 2. Os pontos e a conclusão da versão 1
                    continuam válidos e não serão concedidos novamente.
                  </p>
                </div>
              )}
              <div className="activity-completion-actions" aria-label="Ações após a conclusão">
                <button type="button" className="activity-completion-button" onClick={practiceAnotherCase}>Praticar novamente</button>
                <button type="button" className="activity-completion-button" onClick={onBackToHub}>Voltar ao PhishLab</button>
                <button type="button" className="activity-completion-button" onClick={onOpenProfile}>Meu perfil</button>
              </div>
            </div>
          ) : null}

        </div>
      </section>
    </ActivityShell>
  );
}
