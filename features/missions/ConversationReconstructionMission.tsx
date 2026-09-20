"use client";

import { useMemo, useState } from "react";
import {
  AlertTriangle,
  ArrowDown,
  ArrowUp,
  Check,
  ChevronDown,
  CornerUpLeft,
  FileCheck,
  Flag,
  Lightbulb,
  Link2,
  PhoneCall,
  Search,
  Send,
  ShieldCheck,
  Truck,
  User,
  XCircle,
  type LucideIcon,
} from "lucide-react";

import { ActivityAnswerReview } from "@/features/activities/primitives/ActivityAnswerReview";
import { ActivityNextStep } from "@/features/activities/primitives/ActivityNextStep";
import {
  Icon,
  LessonShell,
  StageHeading,
  lessonStyles as s,
} from "@/features/activities/lesson/LessonShell";
import { useActivityStageFocus } from "@/features/activities/useActivityStageFocus";
import { usePostSubmitCelebration } from "@/features/activities/usePostSubmitCelebration";
import { Mascot } from "@/features/ui/LearningUI";
import type { AchievementDefinition } from "@/lib/content/achievement-catalog";
import {
  COMPROMISED_CONVERSATION_V2_PACKAGES,
  CONVERSATION_RECONSTRUCTION_ACTIVITY_ID,
  CONVERSATION_RECONSTRUCTION_ACTIVITY_VERSION,
  CONVERSATION_RECONSTRUCTION_MECHANIC_ID,
  type ConversationConclusionId,
  type ConversationConfirmationRouteId,
  type ConversationFinalActionId,
  type ConversationReportDetailId,
  type ConversationTransferDecisionId,
  type EvidenceClassificationId,
} from "@/lib/content/activities/compromised-conversation/v2";
import type {
  ConversationReconstructionV2Answer,
  ConversationReconstructionV2Result,
  MissionResult,
} from "@/lib/domain/types";

const STEPS = ["Ordenar", "Marcar", "Separar", "Decidir", "Responder", "Praticar"] as const;
const LAST_STEP = STEPS.length - 1;

type Props = {
  existingResult: MissionResult | ConversationReconstructionV2Result | null;
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

const CLASSIFICATIONS: readonly {
  id: EvidenceClassificationId;
  label: string;
  icon: LucideIcon;
}[] = [
  { id: "fact", label: "Está escrito", icon: FileCheck },
  { id: "indicator", label: "É um sinal de alerta", icon: AlertTriangle },
  { id: "inference", label: "É suposição minha", icon: Lightbulb },
];

const CONCLUSIONS: readonly { id: ConversationConclusionId; label: string; icon: LucideIcon }[] = [
  { id: "legitimate", label: "O pedido é verdadeiro", icon: Check },
  { id: "malicious-probable", label: "Alguém pode estar usando a conta da Marina", icon: AlertTriangle },
  { id: "inconclusive", label: "Ainda não dá para saber", icon: Search },
];

const ROUTES: readonly {
  id: ConversationConfirmationRouteId;
  label: string;
  detail: string;
  icon: LucideIcon;
}[] = [
  {
    id: "registered-contact",
    label: "Ligar no telefone que já estava salvo",
    detail: "O contato existia antes desta conversa.",
    icon: PhoneCall,
  },
  {
    id: "same-thread",
    label: "Perguntar na própria conversa",
    detail: "Quem mandou o pedido é quem vai responder.",
    icon: CornerUpLeft,
  },
  {
    id: "request-contact",
    label: "Usar o contato que veio no pedido",
    detail: "Foi o próprio pedido que deu esse número.",
    icon: Link2,
  },
  {
    id: "public-search",
    label: "Procurar um telefone na internet",
    detail: "O primeiro resultado pode ser anúncio ou cópia.",
    icon: Search,
  },
];

const ACTIONS: readonly {
  id: ConversationFinalActionId;
  label: string;
  detail: string;
  icon: LucideIcon;
}[] = [
  {
    id: "pause-confirm-report",
    label: "Não enviar e avisar a segurança",
    detail: "Guardar a conversa e contar o que você conferiu.",
    icon: ShieldCheck,
  },
  {
    id: "pause-confirm-normal-process",
    label: "Seguir só depois que entrar no portal",
    detail: "Esperar a mudança ser registrada do jeito de sempre.",
    icon: Check,
  },
  {
    id: "refuse-check-official",
    label: "Recusar e abrir um chamado",
    detail: "Levar o caso pelo sistema que você já conhece.",
    icon: XCircle,
  },
  {
    id: "continue-request",
    label: "Enviar para o novo endereço",
    detail: "Tratar a conversa antiga como autorização.",
    icon: Send,
  },
];

const REPORT_ITEMS: readonly { id: ConversationReportDetailId; label: string }[] = [
  { id: "sender-and-time", label: "Quem pediu, por onde e a que horas" },
  { id: "observed-change", label: "O que mudou no pedido" },
  { id: "verification-result", label: "Como você conferiu e o que ouviu" },
  { id: "preserved-context", label: "O histórico da conversa, guardado" },
  { id: "password-or-code", label: "Sua senha ou código de acesso" },
  { id: "forward-to-team", label: "A conversa inteira repassada para todo mundo" },
];

const TRANSFERS: readonly {
  id: ConversationTransferDecisionId;
  label: string;
  icon: LucideIcon;
}[] = [
  { id: "pause-use-known-route", label: "Confirmar pelo contato salvo da empresa", icon: PhoneCall },
  { id: "continue-familiar-channel", label: "Seguir, porque o nome e o canal são conhecidos", icon: Send },
  { id: "reply-for-confirmation", label: "Perguntar ali mesmo se é verdade", icon: CornerUpLeft },
  { id: "ignore-without-record", label: "Ignorar e não contar para ninguém", icon: XCircle },
];

function labelOf(options: readonly { id: string; label: string }[], id: string | null) {
  return options.find((option) => option.id === id)?.label ?? "Não respondido";
}

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

export function ConversationReconstructionMission({
  existingResult,
  existingCasePackageId,
  rewardAlreadyClaimed: _rewardAlreadyClaimed,
  claimedPoints: _claimedPoints,
  onComplete,
  onBackToMissions,
  onOpenNextActivity,
  onOpenProfile,
  getUnlockedAchievementIds,
  getNewlyUnlockedAchievements,
}: Props) {
  const celebration = usePostSubmitCelebration(
    "A conversa já estava acontecendo",
    "var(--learn-lime)",
  );
  const contentPackage =
    COMPROMISED_CONVERSATION_V2_PACKAGES.find(
      (item) => item.casePackageId === existingCasePackageId,
    ) ?? COMPROMISED_CONVERSATION_V2_PACKAGES[0];
  const content = contentPackage.content;
  const allowlists = contentPackage.allowlists;
  const previous =
    existingResult && "reconstructionPoints" in existingResult ? existingResult : null;

  const [stage, setStage] = useState(0);
  const [result, setResult] = useState<ConversationReconstructionV2Result | null>(previous);
  const [order, setOrder] = useState<string[]>([...content.initialMessageOrder]);
  const [turningPoint, setTurningPoint] = useState<string | null>(null);
  const [classifications, setClassifications] = useState<
    Record<string, EvidenceClassificationId>
  >({});
  const [provisional, setProvisional] = useState<ConversationConclusionId | null>(null);
  const [route, setRoute] = useState<ConversationConfirmationRouteId | null>(null);
  const [finalConclusion, setFinalConclusion] = useState<ConversationConclusionId | null>(null);
  const [action, setAction] = useState<ConversationFinalActionId | null>(null);
  const [reportItems, setReportItems] = useState<ConversationReportDetailId[]>([]);
  const [transfer, setTransfer] = useState<ConversationTransferDecisionId | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const titleRef = useActivityStageFocus(stage, Boolean(celebration.screen));

  const messageById = useMemo(
    () => new Map(content.messages.map((message) => [message.id, message])),
    [content.messages],
  );
  const allClassified = content.evidence.every((item) => classifications[item.id]);

  const pending = [
    null,
    turningPoint ? null : "Toque na mensagem em que o pedido saiu do normal.",
    allClassified ? null : "Falta classificar alguma informação.",
    !provisional ? "Escolha o que você acha até agora." : !route ? "Escolha como confirmar." : null,
    !finalConclusion
      ? "Agora que você confirmou, escolha o que concluiu."
      : !action
        ? "Escolha o que fazer."
        : reportItems.length === 0
          ? "Marque o que você vai contar para a segurança."
          : null,
    transfer ? null : "Escolha o que você faria neste chat.",
  ][stage];

  const reviewItems = useMemo(() => {
    if (!result) return [];
    if (!turningPoint) {
      return [
        {
          id: "order",
          title: "Ordem da conversa",
          status: result.reconstructionPoints === 20 ? ("correct" as const) : ("review" as const),
          explanation: "Reconstruir a ordem mostra o que era rotina e o que fugiu dela.",
        },
        {
          id: "turning",
          title: "Onde o pedido mudou",
          status: result.turningPointPoints === 20 ? ("correct" as const) : ("review" as const),
          explanation: "A virada é onde o combinado deixou de ser seguido.",
        },
        {
          id: "evidence",
          title: "Fato, sinal ou suposição",
          status: result.evidencePoints === 20 ? ("correct" as const) : ("review" as const),
          explanation: `${result.correctEvidenceAssessments} de ${result.totalEvidenceAssessments} classificadas certo.`,
        },
        {
          id: "response",
          title: "Confirmação e resposta",
          status:
            result.confirmationPoints + result.responsePoints === 25
              ? ("correct" as const)
              : ("review" as const),
          explanation: "Conferir por fora e contar o que você viu fecham o caso com segurança.",
        },
      ];
    }
    return [
      {
        id: "order",
        title: "Ordem da conversa",
        status:
          order.join("|") === allowlists.correctMessageOrder.join("|")
            ? ("correct" as const)
            : ("review" as const),
        explanation: "A ordem certa é a do relógio: segunda, terça, quarta.",
      },
      {
        id: "turning",
        title: "Onde o pedido mudou",
        status: allowlists.acceptedTurningPointIds.includes(turningPoint)
          ? ("correct" as const)
          : ("review" as const),
        userAnswer: messageById.get(turningPoint)?.timeLabel ?? "Não respondido",
        expectedAnswer: messageById.get(allowlists.acceptedTurningPointIds[0])?.timeLabel ?? "",
        explanation: "A virada é o pedido de mudar o endereço fora do portal.",
      },
      ...content.evidence.map((item) => ({
        id: item.id,
        title: item.title,
        status:
          classifications[item.id] === allowlists.correctEvidenceClassifications[item.id]
            ? ("correct" as const)
            : ("review" as const),
        userAnswer: labelOf(CLASSIFICATIONS, classifications[item.id] ?? null),
        expectedAnswer: labelOf(
          CLASSIFICATIONS,
          allowlists.correctEvidenceClassifications[item.id],
        ),
        explanation: item.detail,
      })),
      {
        id: "route",
        title: "Como você confirmou",
        status:
          route === allowlists.correctConfirmationRouteId
            ? ("correct" as const)
            : ("review" as const),
        userAnswer: labelOf(ROUTES, route),
        expectedAnswer: labelOf(ROUTES, allowlists.correctConfirmationRouteId),
        explanation: "Um pedido nunca confirma a si mesmo.",
      },
      {
        id: "action",
        title: "O que você fez",
        status:
          action === allowlists.correctFinalActionId ? ("correct" as const) : ("review" as const),
        userAnswer: labelOf(ACTIONS, action),
        expectedAnswer: labelOf(ACTIONS, allowlists.correctFinalActionId),
        explanation: "Parar e avisar protege a entrega e a Marina ao mesmo tempo.",
      },
      {
        id: "report",
        title: "O que você contou",
        status:
          [...reportItems].sort().join("|") ===
          [...allowlists.safeReportDetailIds].sort().join("|")
            ? ("correct" as const)
            : ("review" as const),
        userAnswer: `${reportItems.length} ${reportItems.length === 1 ? "item" : "itens"}`,
        expectedAnswer: "Os quatro itens seguros",
        explanation: "Senha e repasse geral não entram em um reporte.",
      },
      {
        id: "transfer",
        title: "O caso no chat",
        status:
          transfer === allowlists.correctTransferDecisionId
            ? ("correct" as const)
            : ("review" as const),
        userAnswer: labelOf(TRANSFERS, transfer),
        expectedAnswer: labelOf(TRANSFERS, allowlists.correctTransferDecisionId),
        explanation: "Mudou o canal, mas a regra é a mesma.",
      },
    ];
  }, [
    action,
    allowlists,
    classifications,
    content.evidence,
    messageById,
    order,
    reportItems,
    result,
    route,
    transfer,
    turningPoint,
  ]);

  function move(index: number, delta: number) {
    setOrder((current) => {
      const next = [...current];
      const target = index + delta;
      if (target < 0 || target >= next.length) return current;
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
  }

  function toggleReport(id: ConversationReportDetailId) {
    setReportItems((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    );
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
        activityId: CONVERSATION_RECONSTRUCTION_ACTIVITY_ID,
        activityVersion: CONVERSATION_RECONSTRUCTION_ACTIVITY_VERSION,
        casePackageId: contentPackage.casePackageId,
        mechanicId: CONVERSATION_RECONSTRUCTION_MECHANIC_ID,
        orderedArtifactIds: order,
        turningPointArtifactId: turningPoint!,
        evidenceAssessments: content.evidence.map((item) => ({
          evidenceId: item.id,
          classificationId: classifications[item.id],
        })),
        provisionalConclusionId: provisional!,
        finalConclusionId: finalConclusion!,
        confirmationRouteId: route!,
        finalActionId: action!,
        reportDetailIds: reportItems,
        transferDecisionId: transfer!,
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
    setOrder([...content.initialMessageOrder]);
    setTurningPoint(null);
    setClassifications({});
    setProvisional(null);
    setRoute(null);
    setFinalConclusion(null);
    setAction(null);
    setReportItems([]);
    setTransfer(null);
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
            <Mascot pose={result.needsReview ? "explaining" : "celebration"} size="medium" />
            <div>
              <span className={s.microLabel}>
                {result.needsReview ? "CONCLUÍDO · HÁ O QUE REVER" : "CONCLUÍDO"}
              </span>
              <h3>
                {result.needsReview
                  ? "Você chegou ao fim. Vamos rever algumas respostas?"
                  : "Você parou a tempo."}
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

          <ActivityNextStep area="PhishLab" title="Quem enviou de verdade?" onOpen={onOpenNextActivity} />
          <div className="activity-completion-actions" aria-label="Ações após a conclusão">
            <button type="button" className="activity-completion-button" onClick={restart}>
              Praticar novamente
            </button>
            <button type="button" className="activity-completion-button" onClick={onBackToMissions}>
              Voltar às missões
            </button>
            <button type="button" className="activity-completion-button" onClick={onOpenProfile}>
              Meu perfil
            </button>
          </div>
        </div>
      </div>
    );
  }

  const thread = order.map((id) => messageById.get(id)!).filter(Boolean);

  return (
    <LessonShell
      activityId={CONVERSATION_RECONSTRUCTION_ACTIVITY_ID}
      area="MISSÃO 02"
      topic="CONVERSA INVADIDA"
      title="A conversa já estava acontecendo"
      steps={STEPS}
      stage={stage}
      pending={pending}
      nextLabel={stage === LAST_STEP ? "Concluir" : "Continuar"}
      onStageSelect={setStage}
      onNext={advance}
      busy={busy}
      error={error}
    >
      {stage === 0 ? (
        <>
          <StageHeading
            label="O QUE ACONTECEU"
            title="As mensagens chegaram embaralhadas"
            instruction="Coloque a conversa na ordem certa usando as setas. Siga o dia e a hora."
            titleRef={titleRef}
          />
          <div className={s.chat}>
            {thread.map((message, index) => {
              const own = message.sender === "Lucas";
              return (
                <div key={message.id} className={`${s.bubbleRow} ${own ? s.own : ""}`}>
                  <span className={s.bubbleIndex}>{index + 1}</span>
                  <span className={s.avatar}>
                    <Icon icon={own ? User : Truck} size={18} />
                  </span>
                  <div className={s.bubble}>
                    <div className={s.bubbleHead}>
                      <strong>{message.sender}</strong>
                      <span className={s.bubbleTime}>{message.timeLabel}</span>
                    </div>
                    <p className={s.bubbleBody}>{message.body}</p>
                  </div>
                  <div className={s.bubbleOrder}>
                    <button
                      type="button"
                      aria-label={`Mover ${message.timeLabel} para cima`}
                      disabled={index === 0}
                      onClick={() => move(index, -1)}
                    >
                      <Icon icon={ArrowUp} size={17} />
                    </button>
                    <button
                      type="button"
                      aria-label={`Mover ${message.timeLabel} para baixo`}
                      disabled={index === thread.length - 1}
                      onClick={() => move(index, 1)}
                    >
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
            label="A VIRADA"
            title="Em que ponto o pedido saiu do normal?"
            instruction="Toque na mensagem em que alguém pediu algo diferente do combinado."
            titleRef={titleRef}
          />
          <div className={s.chat}>
            {thread.map((message) => {
              const own = message.sender === "Lucas";
              const picked = turningPoint === message.id;
              return (
                <div key={message.id} className={`${s.bubbleRow} ${own ? s.own : ""}`}>
                  <span className={s.avatar}>
                    <Icon icon={own ? User : Truck} size={18} />
                  </span>
                  <button
                    type="button"
                    className={`${s.bubble} ${s.pickable}`}
                    aria-pressed={picked}
                    onClick={() => setTurningPoint(message.id)}
                  >
                    <span className={s.bubbleHead}>
                      <strong>{message.sender}</strong>
                      <span className={s.bubbleTime}>{message.timeLabel}</span>
                    </span>
                    <span className={s.bubbleBody}>{message.body}</span>
                    {picked ? (
                      <span className={s.pickedFlag}>
                        <Icon icon={Flag} size={15} /> Aqui mudou
                      </span>
                    ) : null}
                  </button>
                </div>
              );
            })}
          </div>
        </>
      ) : null}

      {stage === 2 ? (
        <>
          <StageHeading
            label="FATO, SINAL OU SUPOSIÇÃO"
            title="O que você sabe e o que você imagina?"
            instruction="Para cada informação, diga se ela está escrita, se é só um sinal, ou se é suposição sua."
            titleRef={titleRef}
          />
          <div className={s.fieldList}>
            {content.evidence.map((item) => (
              <div key={item.id} className={s.evidenceCard}>
                <div className={s.evidenceHead}>
                  <strong>{item.title}</strong>
                  <span className={s.evidenceSource}>{item.source}</span>
                </div>
                <p className={s.evidenceDetail}>{item.detail}</p>
                <div className={`${s.choices} ${s.choicesRow}`} role="group" aria-label={item.title}>
                  {CLASSIFICATIONS.map((option) => (
                    <button
                      key={option.id}
                      type="button"
                      className={s.choice}
                      aria-pressed={classifications[item.id] === option.id}
                      onClick={() =>
                        setClassifications((current) => ({ ...current, [item.id]: option.id }))
                      }
                    >
                      <Icon icon={option.icon} size={19} />
                      <span>{option.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </>
      ) : null}

      {stage === 3 ? (
        <>
          <StageHeading
            label="ANTES DE CONFIRMAR"
            title="O que você acha até agora?"
            instruction="Você ainda não confirmou nada. Diga o que pensa e como pretende conferir."
            titleRef={titleRef}
          />
          <div className={s.decisionBlock}>
            <h3>
              <span className={s.taskNumber}>1</span> Até aqui, o que você acha?
            </h3>
            <OptionList
              legend="Até aqui, o que você acha?"
              options={CONCLUSIONS}
              value={provisional}
              onChange={setProvisional}
            />
          </div>
          <div className={s.decisionBlock}>
            <h3>
              <span className={s.taskNumber}>2</span> Como você vai confirmar?
            </h3>
            <OptionList
              legend="Como você vai confirmar?"
              options={ROUTES}
              value={route}
              onChange={setRoute}
            />
          </div>
        </>
      ) : null}

      {stage === 4 ? (
        <>
          <StageHeading
            label="DEPOIS DE CONFIRMAR"
            title="Você conferiu. E agora?"
            instruction="Veja o que a confirmação trouxe e decida como responder."
            titleRef={titleRef}
          />
          <div className={s.consequence}>
            <Icon icon={PhoneCall} size={24} />
            <div>
              <strong>{content.consequence.title}</strong>
              <p>{content.consequence.body}</p>
              <small className={s.consequenceSource}>{content.consequence.sourceLabel}</small>
            </div>
          </div>
          <div className={s.decisionBlock}>
            <h3>
              <span className={s.taskNumber}>1</span> Agora, o que você conclui?
            </h3>
            <OptionList
              legend="Agora, o que você conclui?"
              options={CONCLUSIONS}
              value={finalConclusion}
              onChange={setFinalConclusion}
            />
          </div>
          <div className={s.decisionBlock}>
            <h3>
              <span className={s.taskNumber}>2</span> O que você faz?
            </h3>
            <OptionList
              legend="O que você faz?"
              options={ACTIONS}
              value={action}
              onChange={setAction}
            />
          </div>
          <div className={s.decisionBlock}>
            <h3>
              <span className={s.taskNumber}>3</span> O que você conta para a segurança?
            </h3>
            <p className={s.multiHint}>Marque tudo o que ajuda. Cuidado: nem tudo aqui deve ser enviado.</p>
            <div className={s.choices} role="group" aria-label="O que você conta para a segurança?">
              {REPORT_ITEMS.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className={s.choice}
                  aria-pressed={reportItems.includes(item.id)}
                  onClick={() => toggleReport(item.id)}
                >
                  <span className={s.checkMark}>
                    <Icon icon={Check} size={15} />
                  </span>
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        </>
      ) : null}

      {stage === 5 ? (
        <>
          <StageHeading
            label="AGORA NA PRÁTICA"
            title={content.transfer.title}
            instruction={content.transfer.context}
            titleRef={titleRef}
          />
          <div className={s.chat}>
            <div className={s.bubbleRow}>
              <span className={s.avatar}>
                <Icon icon={Truck} size={18} />
              </span>
              <div className={s.bubble}>
                <div className={s.bubbleHead}>
                  <strong>Conta conhecida</strong>
                  <span className={s.bubbleTime}>Chat da empresa</span>
                </div>
                <p className={s.bubbleBody}>{content.transfer.message}</p>
              </div>
            </div>
          </div>
          <div className={s.decisionBlock} style={{ marginTop: 28 }}>
            <h3>
              <span className={s.taskNumber}>1</span> O que você faz?
            </h3>
            <OptionList
              legend="O que você faz?"
              options={TRANSFERS}
              value={transfer}
              onChange={setTransfer}
            />
          </div>
        </>
      ) : null}
    </LessonShell>
  );
}
