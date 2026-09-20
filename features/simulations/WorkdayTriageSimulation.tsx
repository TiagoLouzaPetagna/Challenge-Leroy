"use client";

import { useState } from "react";

import { ActivityAnswerReview } from "@/features/activities/primitives/ActivityAnswerReview";
import { ActivityNextStep } from "@/features/activities/primitives/ActivityNextStep";
import {
  LessonShell,
  lessonStyles as s,
} from "@/features/activities/lesson/LessonShell";
import { Mascot } from "@/features/ui/LearningUI";
import { useActivityStageFocus } from "@/features/activities/useActivityStageFocus";
import { usePostSubmitCelebration } from "@/features/activities/usePostSubmitCelebration";
import {
  findWorkdayTriageV2Package,
  WORKDAY_ACTION_OPTIONS,
  WORKDAY_TRIAGE_ACTIVITY_ID,
  WORKDAY_TRIAGE_ACTIVITY_VERSION,
  WORKDAY_TRIAGE_CANONICAL_PACKAGE_ID,
  WORKDAY_TRIAGE_MECHANIC_ID,
  WORKDAY_TRIAGE_V2_PACKAGES,
  type WorkdayActionId,
  type WorkdayDraftQueueId,
} from "@/lib/content/activities/workday-triage/v2";
import type { AchievementDefinition } from "@/lib/content/achievement-catalog";
import { POINT_RULES } from "@/lib/domain/rules";
import type {
  SimulationResult,
  WorkdayTriageV2Answer,
  WorkdayTriageV2Attempt,
  WorkdayTriageV2Result,
} from "@/lib/domain/types";

type ItemDraft = {
  queueId: WorkdayDraftQueueId;
  actionId?: WorkdayActionId;
  inspectedEvidenceIds: string[];
};

type WorkdayTriageSimulationProps = {
  existingResult: SimulationResult | WorkdayTriageV2Result | null;
  existingAttempt: WorkdayTriageV2Attempt | null;
  rewardAlreadyClaimed: boolean;
  claimedPoints: number;
  onComplete: (answer: WorkdayTriageV2Answer) => Promise<WorkdayTriageV2Result>;
  onBackToHub: () => void;
  onOpenProfile: () => void;
  onOpenPhishLab: () => void;
  onOpenTeamChallenge: () => void;
  getUnlockedAchievementIds: () => Set<string>;
  getNewlyUnlockedAchievements: (beforeIds: Set<string>) => AchievementDefinition[];
};

const queueOptions: readonly {
  id: WorkdayDraftQueueId;
  label: string;
  description: string;
}[] = [
  {
    id: "inbox",
    label: "Entrada",
    description: "Ainda não recebeu uma decisão de triagem.",
  },
  {
    id: "investigate",
    label: "Investigar",
    description: "Precisa de evidências antes de receber um destino final.",
  },
  {
    id: "inconclusive",
    label: "Inconclusivos",
    description: "A ação sensível continua bloqueada enquanto falta confirmação.",
  },
  {
    id: "resolved",
    label: "Resolvidos",
    description: "Há base suficiente para prosseguir ou conter o item.",
  },
];

const queueLabels = Object.fromEntries(
  queueOptions.map((queue) => [queue.id, queue.label]),
) as Record<WorkdayDraftQueueId, string>;

const actionLabels = Object.fromEntries(
  WORKDAY_ACTION_OPTIONS.map((action) => [action.id, action.label]),
) as Record<WorkdayActionId, string>;

const steps = ["Começar", "Triar", "Revisar", "Praticar"] as const;
const LAST_STEP = steps.length - 1;

function getActionLabel(actionId: WorkdayActionId | undefined) {
  return actionId ? actionLabels[actionId] : "Sem ação";
}

function emptyDrafts(itemIds: readonly string[]): Record<string, ItemDraft> {
  return Object.fromEntries(
    itemIds.map((itemId) => [
      itemId,
      { queueId: "inbox", inspectedEvidenceIds: [] },
    ]),
  );
}

function attemptDrafts(
  attempt: WorkdayTriageV2Attempt,
): Record<string, ItemDraft> {
  return Object.fromEntries(
    attempt.itemDecisions.map((decision) => [
      decision.itemId,
      {
        queueId: decision.queueId,
        actionId: decision.actionId,
        inspectedEvidenceIds: [...decision.inspectedEvidenceIds],
      },
    ]),
  );
}

export function WorkdayTriageSimulation({
  existingResult,
  existingAttempt,
  rewardAlreadyClaimed,
  claimedPoints,
  onComplete,
  onBackToHub,
  onOpenProfile,
  onOpenPhishLab,
  onOpenTeamChallenge,
  getUnlockedAchievementIds,
  getNewlyUnlockedAchievements,
}: WorkdayTriageSimulationProps) {
  const celebration = usePostSubmitCelebration("Uma manhã comum", "var(--learn-coral)");
  const initialPackageId =
    existingAttempt?.casePackageId ?? WORKDAY_TRIAGE_CANONICAL_PACKAGE_ID;
  const [casePackageId, setCasePackageId] = useState(initialPackageId);
  const contentPackage =
    findWorkdayTriageV2Package(casePackageId) ?? WORKDAY_TRIAGE_V2_PACKAGES[0];
  const { content, allowlists } = contentPackage;
  const [stage, setStage] = useState(
    existingAttempt ? 4 : existingResult ? 6 : 0,
  );
  const [selectedItemId, setSelectedItemId] = useState(content.items[0].id);
  const [drafts, setDrafts] = useState<Record<string, ItemDraft>>(
    existingAttempt
      ? attemptDrafts(existingAttempt)
      : emptyDrafts(content.items.map((item) => item.id)),
  );
  const [transferActionId, setTransferActionId] = useState<WorkdayActionId | "">(
    existingAttempt?.transferActionId ?? "",
  );
  const [transferEvidenceId, setTransferEvidenceId] = useState(
    existingAttempt?.transferEvidenceId ?? "",
  );
  const [displayResult, setDisplayResult] = useState<WorkdayTriageV2Result | null>(
    existingAttempt?.result ?? null,
  );
  const [rewardGrantedInAttempt, setRewardGrantedInAttempt] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const stageTitleRef = useActivityStageFocus(stage, Boolean(celebration.screen));

  const selectedItem =
    content.items.find((item) => item.id === selectedItemId) ?? content.items[0];
  const selectedItemIndex = content.items.findIndex(
    (item) => item.id === selectedItem.id,
  );
  const selectedDraft = drafts[selectedItem.id];
  const finalCount = content.items.filter((item) =>
    ["resolved", "inconclusive"].includes(drafts[item.id]?.queueId),
  ).length;
  const allFinal = content.items.every((item) => {
    const draft = drafts[item.id];
    return (
      (draft?.queueId === "resolved" || draft?.queueId === "inconclusive") &&
      Boolean(draft.actionId)
    );
  });

  const goToStage = (nextStage: number) => {
    setStage(nextStage);
    window.scrollTo({ top: 0, behavior: "auto" });
  };

  const updateDraft = (itemId: string, patch: Partial<ItemDraft>) => {
    setDrafts((current) => ({
      ...current,
      [itemId]: {
        ...current[itemId],
        ...patch,
      },
    }));
  };

  const inspectEvidence = (evidenceId: string) => {
    const currentIds = selectedDraft.inspectedEvidenceIds;
    if (currentIds.includes(evidenceId)) return;
    updateDraft(selectedItem.id, {
      queueId:
        selectedDraft.queueId === "inbox"
          ? "investigate"
          : selectedDraft.queueId,
      inspectedEvidenceIds: [...currentIds, evidenceId],
    });
  };

  const choosePackage = (nextPackageId: string) => {
    const nextPackage =
      findWorkdayTriageV2Package(nextPackageId) ?? WORKDAY_TRIAGE_V2_PACKAGES[0];
    setCasePackageId(nextPackage.casePackageId);
    setSelectedItemId(nextPackage.content.items[0].id);
    setDrafts(
      emptyDrafts(nextPackage.content.items.map((item) => item.id)),
    );
    setTransferActionId("");
    setTransferEvidenceId("");
    setDisplayResult(null);
    setRewardGrantedInAttempt(false);
    setError("");
    celebration.reset();
    goToStage(0);
  };

  const finish = async () => {
    if (!allFinal || !transferActionId || !transferEvidenceId) return;
    setIsSubmitting(true);
    setError("");
    const grantsFirstReward = !rewardAlreadyClaimed;
    const beforeIds = getUnlockedAchievementIds();
    try {
      const result = await onComplete({
        activityId: WORKDAY_TRIAGE_ACTIVITY_ID,
        activityVersion: WORKDAY_TRIAGE_ACTIVITY_VERSION,
        casePackageId: contentPackage.casePackageId,
        mechanicId: WORKDAY_TRIAGE_MECHANIC_ID,
        itemDecisions: content.items.map((item) => ({
          itemId: item.id,
          queueId: drafts[item.id].queueId as "resolved" | "inconclusive",
          actionId: drafts[item.id].actionId as WorkdayActionId,
          inspectedEvidenceIds: drafts[item.id].inspectedEvidenceIds,
        })),
        transferActionId,
        transferEvidenceId,
      });
      setDisplayResult(result);
      setRewardGrantedInAttempt(grantsFirstReward);
      goToStage(4);
      celebration.begin(getNewlyUnlockedAchievements(beforeIds));
    } catch {
      setError("Não foi possível registrar esta Simulação. Suas escolhas continuam na tela.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (celebration.screen) return celebration.screen;

  if (stage === 6 && existingResult && !existingAttempt) {
    return (
      <div className={s.page}>
        <div className={s.result}>
          <div className={s.resultHero}>
            <Mascot pose="explaining" size="medium" />
            <div>
              <span className={s.microLabel}>TENTATIVA ANTERIOR</span>
              <h3>Sua tentativa anterior foi mantida</h3>
              <p>
                Seu resultado de {existingResult.score}/100 continua valendo. Esta
                versão da simulação usa outro formato.
              </p>
            </div>
          </div>
          <div className="activity-completion-actions" aria-label="Ações">
            <button type="button" className="activity-completion-button" onClick={() => choosePackage(WORKDAY_TRIAGE_CANONICAL_PACKAGE_ID)}>Praticar a nova versão</button>
            <button type="button" className="activity-completion-button" onClick={onBackToHub}>Voltar às Simulações</button>
          </div>
        </div>
      </div>
    );
  }

  if (displayResult && stage === 4) {
    return (
      <div className={s.page}>
        <div className={s.result}>
          <div className={s.resultHero}>
            <Mascot pose={displayResult.needsReview ? "explaining" : "celebration"} size="medium" />
            <div>
              <span className={s.microLabel}>
                {displayResult.needsReview ? "CONCLUÍDO · HÁ O QUE REVER" : "CONCLUÍDO"}
              </span>
              <h3 ref={stageTitleRef} tabIndex={-1}>
                {displayResult.needsReview
                  ? "Você chegou ao fim. Vamos rever algumas respostas?"
                  : "Você tratou cada mensagem na medida certa."}
              </h3>
              <p>{contentPackage.feedback[displayResult.needsReview ? "review" : "success"]}</p>
            </div>
          </div>
          <div className="simulation-result-grid">
            <article><span>Onde foi parar</span><strong>{displayResult.triagePoints}/30</strong><p>{displayResult.correctQueues} de {displayResult.totalItems} no lugar certo.</p></article>
            <article><span>O que você fez</span><strong>{displayResult.actionPoints}/30</strong><p>{displayResult.correctActions} de {displayResult.totalItems} na medida certa.</p></article>
            <article><span>O que conferiu</span><strong>{displayResult.evidencePoints}/25</strong><p>{displayResult.inspectedEvidence} de {displayResult.requiredEvidence} informações importantes.</p></article>
            <article><span>Falsos alarmes</span><strong>{displayResult.calibrationPoints}/15</strong><p>{displayResult.falsePositives} mensagem(ns) barrada(s) à toa.</p></article>
          </div>
          <ActivityAnswerReview
            title="E-mail por e-mail"
            items={content.items.map((entry) => {
              const draft = drafts[entry.id];
              const expectedQueue = allowlists.correctQueueByItemId[entry.id];
              const expectedAction = allowlists.correctActionByItemId[entry.id];
              const correct = draft.queueId === expectedQueue && draft.actionId === expectedAction;
              const kind = allowlists.kindByItemId[entry.id];
              return {
                id: entry.id,
                title: entry.title,
                status: correct ? "correct" as const : "review" as const,
                userAnswer: `${queueLabels[draft.queueId]} · ${draft.actionId ? actionLabels[draft.actionId] : "Sem ação"}`,
                expectedAnswer: `${queueLabels[expectedQueue]} · ${actionLabels[expectedAction]}`,
                explanation: kind === "legitimate"
                  ? "Este era de verdade. Barrar teria travado o trabalho de alguém à toa."
                  : kind === "malicious"
                    ? "Este era golpe. O certo era barrar e avisar a equipe."
                    : "Faltava conferir algo por fora. Segurar até confirmar era a escolha certa.",
              };
            })}
          />
          <ActivityAnswerReview
            title="O caso do fim"
            items={[{
              id: "transfer",
              title: content.transfer.title,
              status: transferActionId === allowlists.correctTransferActionId && transferEvidenceId === allowlists.correctTransferEvidenceId ? "correct" : "review",
              userAnswer: `${transferActionId ? actionLabels[transferActionId] : "Sem ação"} · ${content.transfer.evidenceOptions.find((option) => option.id === transferEvidenceId)?.label ?? "Sem evidência"}`,
              expectedAnswer: `${actionLabels[allowlists.correctTransferActionId]} · ${content.transfer.evidenceOptions.find((option) => option.id === allowlists.correctTransferEvidenceId)?.label}`,
              explanation: "Mudou o canal, mas a regra é a mesma: confirmar por fora do próprio pedido.",
            }]}
          />
          <ActivityNextStep area="Equipes" title="Mudança bancária sem atalho" onOpen={onOpenTeamChallenge} />
          <div className="activity-completion-actions" aria-label="Ações após a conclusão">
              <button type="button" className="activity-completion-button" onClick={() => choosePackage(contentPackage.casePackageId)}>Praticar novamente</button>
              <button type="button" className="activity-completion-button" onClick={onBackToHub}>Voltar às Simulações</button>
              <button type="button" className="activity-completion-button" onClick={onOpenProfile}>Meu perfil</button>
            </div>
        </div>
      </div>
    );
  }

  const pending = [
    null,
    allFinal ? null : `Faltam ${content.items.length - finalCount} de ${content.items.length} e-mails.`,
    null,
    !transferActionId
      ? "Escolha o que fazer neste caso."
      : !transferEvidenceId
        ? "Escolha o que muda a decisão."
        : null,
  ][stage];

  function advance() {
    if (stage === LAST_STEP) {
      void finish();
      return;
    }
    goToStage(stage + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <LessonShell
      activityId={WORKDAY_TRIAGE_ACTIVITY_ID}
      area="SIMULAÇÃO"
      topic="UMA MANHÃ COMUM"
      title="Uma manhã comum"
      steps={steps}
      stage={stage}
      pending={pending}
      nextLabel={stage === LAST_STEP ? "Concluir" : "Continuar"}
      onNext={advance}
      onStageSelect={goToStage}
      pageClassName="activity-workspace workday-v2-page"
      busy={isSubmitting}
      error={error}
    >
      <div className="workday-v2-shell">
        <div className="workday-v2-workspace foundation-workspace" aria-live="polite">
          {stage === 0 ? (
          <div className="workday-v2-opening workday-foundation-opening">
            <div className="workday-opening-copy foundation-opening__copy">
              <span className={s.microLabel}>O EXPEDIENTE</span>
              <h2 ref={stageTitleRef} tabIndex={-1}>{content.pathLabel}</h2>
              <p>{content.openingContext}</p>

            </div>
            <div className="workday-opening-visual" aria-label={`Pacote com ${content.items.length} itens de trabalho`}>
              <div className="workday-opening-inbox" aria-hidden="true">
                <header>
                  <span>Caixa de entrada</span>
                  <strong>{content.items.length}</strong>
                </header>
                <div className="workday-opening-inbox__filters">
                  <span>Entrada</span><span>Investigar</span><span>Resolvidos</span>
                </div>
                <div className="workday-opening-inbox__messages">
                  <article><i>08:12</i><strong>Reunião confirmada</strong><small>Calendário</small></article>
                  <article><i>08:19</i><strong>Conta bloqueada</strong><small>E-mail</small></article>
                  <article><i>08:31</i><strong>Pagamento hoje</strong><small>Tarefa</small></article>
                </div>
              </div>
              <aside>
                <span>Pacote atribuído</span>
                <strong>{content.items.length} itens de trabalho</strong>
                <p>E-mail, chat, calendário, avisos e tarefas aparecem juntos.</p>
                <small>Sem cronômetro · {POINT_RULES.simulation} pontos-base</small>
              </aside>
            </div>
            <div className="workday-v2-context-grid">

              <article>
                <strong>Sua tarefa</strong>
                <p>{content.task}</p>
              </article>

            </div>

          </div>
        ) : null}

        {stage === 1 ? (
          <div className="workday-v2-stage foundation-stage">
            <div className="decision-heading">
              <span className={s.microLabel}>SUA CAIXA DE ENTRADA</span>
              <h2 ref={stageTitleRef} tabIndex={-1}>Responda um e-mail de cada vez</h2>
              <p>Abra o e-mail, veja as informações e escolha o que fazer com ele.</p>
            </div>

            <section className="workday-v2-inbox-overview" aria-labelledby="workday-inbox-title">
              <header>
                <div>
                  <span className="section-kicker">Caixa de entrada</span>
                  <h3 id="workday-inbox-title">E-mails recebidos</h3>
                  <p>Clique em um e-mail para abrir.</p>
                </div>
                <strong>{finalCount} de {content.items.length} respondidos</strong>
              </header>
              <div className="workday-v2-board" aria-label="Todos os e-mails da triagem">
                {content.items.map((entry, index) => {
                  const entryDraft = drafts[entry.id];
                  const hasFinalDestination = entryDraft.queueId === "resolved" || entryDraft.queueId === "inconclusive";
                  return (
                    <button
                      type="button"
                      key={entry.id}
                      className={selectedItem.id === entry.id ? "selected" : ""}
                      onClick={() => setSelectedItemId(entry.id)}
                      aria-pressed={selectedItem.id === entry.id}
                    >
                      <span className="workday-v2-inbox-index">{index + 1}</span>
                      <span className="workday-v2-inbox-sender">{entry.senderLabel}</span>
                      <strong>{entry.title}</strong>
                      <small>{entry.preview}</small>
                      <time>{entry.receivedAt}</time>
                      <em className={hasFinalDestination && entryDraft.actionId ? "answered" : "pending"}>
                        {hasFinalDestination && entryDraft.actionId ? queueLabels[entryDraft.queueId] : "A responder"}
                      </em>
                    </button>
                  );
                })}
              </div>
            </section>

            <article className="workday-v2-reader">
              <div className="workday-v2-mail-toolbar">
                <span>Caixa de entrada</span>
                <strong>E-mail {selectedItemIndex + 1} de {content.items.length}</strong>
              </div>
              <header>
                <div>
                  <span>{selectedItem.channelLabel} · recebido às {selectedItem.receivedAt}</span>
                  <h3>{selectedItem.title}</h3>
                  <p><b>De:</b> {selectedItem.senderLabel}</p>
                </div>
                <strong>{selectedItem.impactLabel}</strong>
              </header>
              <dl className="workday-v2-mail-meta">
                <div><dt>Origem exibida</dt><dd>{selectedItem.sourceLabel}</dd></div>
                <div><dt>Prévia</dt><dd>{selectedItem.preview}</dd></div>
              </dl>
              <div className="workday-v2-mail-content">
                <p className="workday-v2-body">{selectedItem.body}</p>
              </div>

              <section className="workday-v2-evidence" aria-labelledby="workday-evidence-title">
                <div>
                  <h4 id="workday-evidence-title">O que você pode verificar</h4>
                  <p>Abra somente o que ajuda a confirmar o contexto deste item.</p>
                </div>
                <div>
                  {selectedItem.evidence.map((entryEvidence) => {
                    const inspected = selectedDraft.inspectedEvidenceIds.includes(entryEvidence.id);
                    return (
                      <button
                        type="button"
                        key={entryEvidence.id}
                        className={inspected ? "inspected" : ""}
                        onClick={() => inspectEvidence(entryEvidence.id)}
                        aria-pressed={inspected}
                      >
                        <span>{entryEvidence.label}</span>
                        <strong>{inspected ? entryEvidence.value : "Consultar fonte"}</strong>
                        <small>{inspected ? entryEvidence.explanation : "Clique para ver a informação."}</small>
                      </button>
                    );
                  })}
                </div>
              </section>

              <div className="workday-v2-decision">
                <fieldset>
                  <legend>O que você faz com este e-mail?</legend>
                  {WORKDAY_ACTION_OPTIONS.map((action) => (
                    <label key={action.id} className={selectedDraft.actionId === action.id ? "selected" : ""}>
                      <input
                        type="radio"
                        name={`workday-action-${selectedItem.id}`}
                        checked={selectedDraft.actionId === action.id}
                        onChange={() => updateDraft(selectedItem.id, { actionId: action.id })}
                      />
                      <span>{action.label}</span>
                    </label>
                  ))}
                </fieldset>
                <fieldset className="workday-v2-destination activity-folder-actions">
                  <legend>Em qual pasta este e-mail fica?</legend>
                  <div>{queueOptions.map(queue => <button type="button" key={queue.id} aria-pressed={selectedDraft.queueId === queue.id} onClick={() => updateDraft(selectedItem.id, { queueId: queue.id })}>{queue.label}</button>)}</div>
                  <p>Use Resolvidos quando a decisão estiver tomada ou Inconclusivos quando faltar confirmação.</p>
                </fieldset>
              </div>

              <nav className="workday-v2-mail-navigation" aria-label="Navegação entre e-mails">
                <button
                  type="button"
                  className="text-button"
                  disabled={selectedItemIndex === 0}
                  onClick={() => setSelectedItemId(content.items[selectedItemIndex - 1].id)}
                >
                  ← E-mail anterior
                </button>
                <p>
                  <strong>{selectedItemIndex + 1} de {content.items.length}</strong>
                  <span>{selectedDraft.actionId && (selectedDraft.queueId === "resolved" || selectedDraft.queueId === "inconclusive") ? queueLabels[selectedDraft.queueId] : "Ainda sem resposta"}</span>
                </p>
                <button
                  type="button"
                  className="text-button"
                  disabled={selectedItemIndex === content.items.length - 1}
                  onClick={() => setSelectedItemId(content.items[selectedItemIndex + 1].id)}
                >
                  Próximo e-mail →
                </button>
              </nav>
            </article>

            <div className="workday-v2-footer">
              <p role="status"><strong>{finalCount} de {content.items.length}</strong> e-mails respondidos.</p>
            </div>
          </div>
        ) : null}

        {stage === 2 ? (
          <div className="workday-v2-stage foundation-stage">
            <div className="decision-heading">
              <span className={s.microLabel}>REVISÃO</span>
              <h2 ref={stageTitleRef} tabIndex={-1}>Confira antes de concluir</h2>
              <p>Dá para voltar e mudar qualquer resposta. Sua nota aparece só no fim.</p>
            </div>
            <div className="workday-v2-review-list">
              {content.items.map((entry) => (
                <article key={entry.id}>
                  <div><span>{entry.channelLabel}</span><strong>{entry.title}</strong></div>
                  <dl>
                    <div><dt>Onde foi parar</dt><dd>{queueLabels[drafts[entry.id].queueId]}</dd></div>
                    <div><dt>O que você fez</dt><dd>{getActionLabel(drafts[entry.id].actionId)}</dd></div>
                    <div><dt>O que você conferiu</dt><dd>{drafts[entry.id].inspectedEvidenceIds.length}</dd></div>
                  </dl>
                  <button type="button" className="text-button" onClick={() => { setSelectedItemId(entry.id); goToStage(1); }}>Mudar</button>
                </article>
              ))}
            </div>
          </div>
        ) : null}

        {stage === 3 ? (
          <div className="workday-v2-stage workday-v2-transfer foundation-stage">
            <span className={s.microLabel}>AGORA NA PRÁTICA</span>
            <h2 ref={stageTitleRef} tabIndex={-1}>{content.transfer.title}</h2>
            <p>{content.transfer.context}</p>
            <fieldset>
              <legend>O que você faz?</legend>
              {content.transfer.actionOptions.map((option) => (
                <label key={option.id} className={transferActionId === option.id ? "selected" : ""}>
                  <input type="radio" name="workday-transfer-action" checked={transferActionId === option.id} onChange={() => setTransferActionId(option.id)} />
                  <span>{option.label}</span>
                </label>
              ))}
            </fieldset>
            <fieldset>
              <legend>O que realmente muda a decisão?</legend>
              {content.transfer.evidenceOptions.map((option) => (
                <label key={option.id} className={transferEvidenceId === option.id ? "selected" : ""}>
                  <input type="radio" name="workday-transfer-evidence" checked={transferEvidenceId === option.id} onChange={() => setTransferEvidenceId(option.id)} />
                  <span>{option.label}</span>
                </label>
              ))}
            </fieldset>
          </div>
        ) : null}

        </div>
      </div>
    </LessonShell>
  );
}
