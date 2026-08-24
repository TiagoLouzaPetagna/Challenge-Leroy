"use client";

import { useState } from "react";

import { ActivityShell } from "@/features/activities/ActivityShell";
import { ActivityAnswerReview } from "@/features/activities/primitives/ActivityAnswerReview";
import { ActivityProgress } from "@/features/activities/primitives/ActivityProgress";
import { useActivityStageFocus } from "@/features/activities/useActivityStageFocus";
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

const steps = [
  "Contexto",
  "Triagem do lote",
  "Revisão",
  "Aplicação em outro caso",
  "Resultado",
  "Resumo final",
] as const;

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
}: WorkdayTriageSimulationProps) {
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
  const stageTitleRef = useActivityStageFocus(stage);

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
    goToStage(0);
  };

  const finish = async () => {
    if (!allFinal || !transferActionId || !transferEvidenceId) return;
    setIsSubmitting(true);
    setError("");
    const grantsFirstReward = !rewardAlreadyClaimed;
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
    } catch {
      setError("Não foi possível registrar esta Simulação. Suas escolhas continuam na tela.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const bonusPoints = displayResult
    ? displayResult.potentialReward - POINT_RULES.simulation
    : 0;

  if (stage === 6 && existingResult && !existingAttempt) {
    return (
      <ActivityShell
        className="page-stack simulation-player-page workday-v2-page"
        activityId={WORKDAY_TRIAGE_ACTIVITY_ID}
      >
        <section className="simulation-player-shell workday-v2-legacy">
          <span className="section-badge">Tentativa preservada · versão 1</span>
          <h1>Sua conclusão anterior continua registrada</h1>
          <p>
            O resultado de {existingResult.score}/100 permanece no histórico. A nova
            triagem usa outro formato e não inventa filas ou decisões que a tentativa
            antiga não registrou.
          </p>
          <div className="mission-navigation">
            <button
              type="button"
              className="primary-button dark"
              onClick={() => choosePackage(WORKDAY_TRIAGE_CANONICAL_PACKAGE_ID)}
            >
              Praticar a nova versão
            </button>
            <button type="button" className="text-button" onClick={onBackToHub}>
              Voltar às Simulações
            </button>
          </div>
        </section>
      </ActivityShell>
    );
  }

  return (
    <ActivityShell
      className="page-stack simulation-player-page workday-v2-page"
      activityId={WORKDAY_TRIAGE_ACTIVITY_ID}
    >
      <section className="simulation-player-shell workday-v2-shell foundation-shell">
        <header className="simulation-player-header workday-v2-header foundation-header">
          <div>
            <span className="section-badge">Simulação · versão 2</span>
            <h1>Uma manhã comum</h1>
            <p>Organize uma rotina mista sem transformar pressa ou aparência em veredito.</p>
          </div>
          <div className="simulation-progress-card">
            <span>Tempo estimado</span>
            <strong>12 minutos</strong>
            <small>{POINT_RULES.simulation} pontos-base · sem cronômetro</small>
          </div>
        </header>

        <ActivityProgress
          steps={steps}
          currentStep={stage}
          className="workday-foundation-progress"
          ariaLabel="Progresso de Uma manhã comum"
        />

        <div className="workday-v2-workspace foundation-workspace" aria-live="polite">
          {stage === 0 ? (
          <div className="workday-v2-opening workday-foundation-opening">
            <div className="workday-opening-copy foundation-opening__copy">
              <span className="section-kicker">O expediente</span>
              <h2 ref={stageTitleRef} tabIndex={-1}>{content.pathLabel}</h2>
              <p>{content.openingContext}</p>
              <div className="foundation-safety-note">
                Ambiente seguro: nenhum item abre links reais e o resultado permanece privado.
              </div>
              <div className="mission-navigation workday-opening-actions">
                <button type="button" className="primary-button learning-button" onClick={() => goToStage(1)}>
                  Começar a triagem <span aria-hidden="true">→</span>
                </button>
                <button type="button" className="text-button" onClick={onBackToHub}>
                  Voltar às Simulações
                </button>
              </div>
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
                <strong>Seu papel</strong>
                <p>Você cuida da entrada de trabalho e precisa manter o fluxo sem liberar uma ação sensível cedo demais.</p>
              </article>
              <article>
                <strong>Sua tarefa</strong>
                <p>{content.task}</p>
              </article>
              <article>
                <strong>O que você protege</strong>
                <p>O trabalho legítimo continua avançando enquanto itens suspeitos ou inconclusivos recebem a verificação necessária.</p>
              </article>
            </div>
            <ul className="workday-opening-principles">
              <li>Você não precisa resolver um item sem informação suficiente.</li>
              <li>Investigar não significa acusar o remetente.</li>
              <li>O diagnóstico aparece somente depois da revisão do lote.</li>
            </ul>
          </div>
        ) : null}

        {stage === 1 ? (
          <div className="workday-v2-stage foundation-stage">
            <div className="decision-heading foundation-stage-heading">
              <span className="section-kicker">Triagem em lote</span>
              <h2 ref={stageTitleRef} tabIndex={-1}>Reduza a entrada sem forçar uma certeza</h2>
              <p>
                Abra um item, consulte as evidências necessárias, escolha a ação e dê
                um destino. Inconclusivos continuam controlados e podem ser revistos.
              </p>
            </div>

            <section className="workday-v2-inbox-overview" aria-labelledby="workday-inbox-title">
              <header>
                <div>
                  <span className="section-kicker">Caixa de entrada</span>
                  <h3 id="workday-inbox-title">Todos os e-mails do lote</h3>
                  <p>Os {content.items.length} itens permanecem aqui. Selecione qualquer linha ou use os botões de anterior e próximo no e-mail aberto.</p>
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
                  <h4 id="workday-evidence-title">Fontes disponíveis</h4>
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
                        <small>{inspected ? entryEvidence.explanation : "A consulta não revela o gabarito; mostra apenas um fato do caso."}</small>
                      </button>
                    );
                  })}
                </div>
              </section>

              <div className="workday-v2-decision">
                <fieldset>
                  <legend>Qual ação é proporcional aos fatos disponíveis?</legend>
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
                <label className="workday-v2-destination">
                  <span>Destino deste item</span>
                  <select
                    value={selectedDraft.queueId}
                    onChange={(event) => updateDraft(selectedItem.id, { queueId: event.target.value as WorkdayDraftQueueId })}
                  >
                    {queueOptions.map((queue) => <option key={queue.id} value={queue.id}>{queue.label}</option>)}
                  </select>
                  <small>Para concluir o lote, todos os itens devem terminar em Resolvidos ou Inconclusivos.</small>
                </label>
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
              <p role="status"><strong>{finalCount} de {content.items.length}</strong> itens possuem destino final.</p>
              <button type="button" className="primary-button dark" disabled={!allFinal} onClick={() => goToStage(2)}>
                {allFinal ? "Revisar o lote" : `Faltam ${content.items.length - finalCount} destinos finais`}
              </button>
            </div>
          </div>
        ) : null}

        {stage === 2 ? (
          <div className="workday-v2-stage foundation-stage">
            <div className="decision-heading foundation-stage-heading">
              <span className="section-kicker">Revisão global</span>
              <h2 ref={stageTitleRef} tabIndex={-1}>Confira o lote antes de concluir</h2>
              <p>O gabarito ainda não aparece. Verifique se nenhum item sensível foi liberado sem confirmação e se uma pendência não recebeu certeza artificial.</p>
            </div>
            <div className="workday-v2-review-list">
              {content.items.map((entry) => (
                <article key={entry.id}>
                  <div><span>{entry.channelLabel}</span><strong>{entry.title}</strong></div>
                  <dl>
                    <div><dt>Fila</dt><dd>{queueLabels[drafts[entry.id].queueId]}</dd></div>
                    <div><dt>Ação</dt><dd>{getActionLabel(drafts[entry.id].actionId)}</dd></div>
                    <div><dt>Fontes consultadas</dt><dd>{drafts[entry.id].inspectedEvidenceIds.length}</dd></div>
                  </dl>
                  <button type="button" className="text-button" onClick={() => { setSelectedItemId(entry.id); goToStage(1); }}>Editar item</button>
                </article>
              ))}
            </div>
            <div className="mission-navigation">
              <button type="button" className="text-button" onClick={() => goToStage(1)}>← Voltar à triagem</button>
              <button type="button" className="primary-button dark" onClick={() => goToStage(3)}>Aplicar em outro canal</button>
            </div>
          </div>
        ) : null}

        {stage === 3 ? (
          <div className="workday-v2-stage workday-v2-transfer foundation-stage">
            <span className="section-kicker">Transferência curta</span>
            <h2 ref={stageTitleRef} tabIndex={-1}>{content.transfer.title}</h2>
            <p>{content.transfer.context}</p>
            <fieldset>
              <legend>Qual ação preserva o processo seguro?</legend>
              {content.transfer.actionOptions.map((option) => (
                <label key={option.id} className={transferActionId === option.id ? "selected" : ""}>
                  <input type="radio" name="workday-transfer-action" checked={transferActionId === option.id} onChange={() => setTransferActionId(option.id)} />
                  <span>{option.label}</span>
                </label>
              ))}
            </fieldset>
            <fieldset>
              <legend>Qual evidência realmente muda a decisão?</legend>
              {content.transfer.evidenceOptions.map((option) => (
                <label key={option.id} className={transferEvidenceId === option.id ? "selected" : ""}>
                  <input type="radio" name="workday-transfer-evidence" checked={transferEvidenceId === option.id} onChange={() => setTransferEvidenceId(option.id)} />
                  <span>{option.label}</span>
                </label>
              ))}
            </fieldset>
            {error ? <p className="form-error" role="alert">{error}</p> : null}
            <div className="mission-navigation">
              <button type="button" className="text-button" onClick={() => goToStage(2)}>← Voltar à revisão</button>
              <button type="button" className="primary-button dark" disabled={!transferActionId || !transferEvidenceId || isSubmitting} onClick={finish}>
                {isSubmitting ? "Avaliando…" : "Concluir Simulação"}
              </button>
            </div>
          </div>
        ) : null}

        {stage === 4 && displayResult ? (
          <div className="workday-v2-stage workday-v2-result foundation-stage">
            <div className={displayResult.needsReview ? "result-summary review" : "result-summary success"}>
              <div className="result-score"><span>Resultado</span><strong>{displayResult.score}</strong><small>de 100</small></div>
              <div>
                <span className="section-kicker">Resultado privado</span>
                <h2 ref={stageTitleRef} tabIndex={-1}>{displayResult.needsReview ? "Algumas decisões merecem nova revisão" : "O lote foi tratado com proporcionalidade"}</h2>
                <p>{contentPackage.feedback[displayResult.needsReview ? "review" : "success"]}</p>
              </div>
            </div>
            <div className="simulation-result-grid">
              <article><span>Triagem</span><strong>{displayResult.triagePoints}/30</strong><p>{displayResult.correctQueues}/{displayResult.totalItems} destinos adequados.</p></article>
              <article><span>Ação</span><strong>{displayResult.actionPoints}/30</strong><p>{displayResult.correctActions}/{displayResult.totalItems} ações proporcionais.</p></article>
              <article><span>Evidências</span><strong>{displayResult.evidencePoints}/25</strong><p>{displayResult.inspectedEvidence}/{displayResult.requiredEvidence} fatos relevantes consultados.</p></article>
              <article><span>Calibração</span><strong>{displayResult.calibrationPoints}/15</strong><p>{displayResult.falsePositives} falso(s) positivo(s).</p></article>
              <article className="reward-result-card"><span>Pontos gerais</span><strong>{rewardGrantedInAttempt ? `+${displayResult.potentialReward}` : `${claimedPoints} registrados`}</strong><p>Base {POINT_RULES.simulation} + bônus de {bonusPoints}. A recompensa é única.</p></article>
            </div>
            <ActivityAnswerReview
              title="O que você acertou e o que precisa revisar no lote"
              description="Cada item mostra seu destino, sua ação e a resposta mais adequada aos fatos do pacote."
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
                    ? "As fontes disponíveis sustentavam o processo normal; conter o item criaria um falso positivo."
                    : kind === "malicious"
                      ? "Os fatos disponíveis justificavam conter a solicitação e avisar a equipe responsável."
                      : "Ainda faltava uma confirmação independente; manter a ação bloqueada era uma decisão operacional válida.",
                };
              })}
            />
            <ActivityAnswerReview
              title="Aplicação em outro canal"
              description="A repetição do pedido não vale como confirmação independente."
              items={[{
                id: "transfer",
                title: content.transfer.title,
                status: transferActionId === allowlists.correctTransferActionId && transferEvidenceId === allowlists.correctTransferEvidenceId ? "correct" : "review",
                userAnswer: `${transferActionId ? actionLabels[transferActionId] : "Sem ação"} · ${content.transfer.evidenceOptions.find((option) => option.id === transferEvidenceId)?.label ?? "Sem evidência"}`,
                expectedAnswer: `${actionLabels[allowlists.correctTransferActionId]} · ${content.transfer.evidenceOptions.find((option) => option.id === allowlists.correctTransferEvidenceId)?.label}`,
                explanation: "O processo precisa de uma fonte obtida fora da solicitação, mesmo quando a mesma narrativa aparece em outro canal.",
              }]}
            />
            <div className="mission-navigation">
              <button type="button" className="primary-button dark" onClick={() => goToStage(5)}>Ver debrief</button>
            </div>
          </div>
        ) : null}

        {stage === 5 && displayResult ? (
          <div className="workday-v2-stage workday-v2-debrief foundation-stage">
            <span className="section-kicker">Debrief</span>
            <h2 ref={stageTitleRef} tabIndex={-1}>{contentPackage.debrief.title}</h2>
            <p>{contentPackage.debrief.body}</p>
            <div className="workday-v2-task"><strong>Leve para a rotina</strong><p>Um item pode ser urgente e legítimo, familiar e perigoso ou simplesmente inconclusivo. A ação correta nasce dos fatos e do processo, não da aparência.</p></div>
            <div className="adaptive-next-panel">
              <div><span className="section-kicker inverse">Próxima atividade</span><h2>Mudança bancária sem atalho</h2><p>Aplique confirmação independente e controle de processo em uma solicitação financeira.</p></div>
              <button type="button" className="primary-button light" onClick={onOpenTeamChallenge}>Abrir atividade de Equipes</button>
            </div>
            <div className="result-actions">
              <button type="button" className="text-button" onClick={onOpenProfile}>Ver no Meu perfil</button>
              <button type="button" className="text-button" onClick={() => choosePackage(contentPackage.casePackageId)}>Refazer este pacote</button>
              <button type="button" className="text-button" onClick={() => {
                const currentIndex = WORKDAY_TRIAGE_V2_PACKAGES.findIndex((entry) => entry.casePackageId === contentPackage.casePackageId);
                choosePackage(WORKDAY_TRIAGE_V2_PACKAGES[(currentIndex + 1) % WORKDAY_TRIAGE_V2_PACKAGES.length].casePackageId);
              }}>Praticar outro pacote</button>
              {displayResult.needsReview ? <button type="button" className="text-button" onClick={onOpenPhishLab}>Revisar no PhishLab</button> : null}
              <button type="button" className="text-button" onClick={onBackToHub}>Voltar às Simulações</button>
            </div>
          </div>
        ) : null}
        </div>
      </section>
    </ActivityShell>
  );
}
