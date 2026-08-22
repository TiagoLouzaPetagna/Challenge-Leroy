"use client";

import { useMemo, useState, type CSSProperties } from "react";

import { ActivityAnswerReview } from "@/features/activities/primitives/ActivityAnswerReview";

import {
  WORKDAY_MESSAGES,
  WORKDAY_SIMULATION_ID,
  WORKDAY_SIMULATION_VERSION,
} from "@/lib/content/simulation-catalog";
import { POINT_RULES } from "@/lib/domain/rules";
import type {
  EvidenceKey,
  SimulationActionKey,
  SimulationAnswer,
  SimulationResult,
  WorkdayTriageV2Result,
} from "@/lib/domain/types";

type SimulationsHubProps = {
  isRecommended: boolean;
  latestResult: SimulationResult | WorkdayTriageV2Result | null;
  rewardPoints: number;
  onOpenWorkday: () => void;
  onBackToOverview: () => void;
};

const packages = [
  {
    id: "workday",
    eyebrow: "Pacote 01",
    statusLabel: "Disponível",
    title: "Uma manhã comum",
    summary:
      "Organize mensagens legítimas, suspeitas e inconclusivas. O diagnóstico aparece somente ao final.",
    format: "Lote misto",
    duration: "12 min",
    difficulty: "Intermediária",
    playable: true,
  },
  {
    id: "message-center",
    eyebrow: "Pacote 02",
    statusLabel: "Em produção",
    title: "Central de mensagens",
    summary:
      "Conversas de gestores, colegas e suporte para praticar personificação e confirmação por outro canal.",
    format: "5 conversas",
    duration: "A confirmar",
    difficulty: "Intermediária",
    playable: false,
  },
  {
    id: "multichannel",
    eyebrow: "Pacote 03",
    statusLabel: "Em produção",
    title: "Ataque multicanal",
    summary:
      "Um mesmo incidente se desenvolve por e-mail, mensagem, QR Code e página de confirmação.",
    format: "Caso conectado",
    duration: "A confirmar",
    difficulty: "Avançada",
    playable: false,
  },
] as const;

export function SimulationsHub({
  isRecommended,
  latestResult,
  rewardPoints,
  onOpenWorkday,
  onBackToOverview,
}: SimulationsHubProps) {
  return (
    <div className="page-stack simulation-page">
      <section className="simulation-hero simulation-hero--compact">
        <div>
          <span className="section-badge">Prática em contexto</span>
          <h1>Simulações</h1>
          <p>
            Pratique decisões em ambientes controlados, sem links ou ações reais.
          </p>
          <div className="simulation-hero-actions">
            <button type="button" className="text-button light" onClick={onBackToOverview}>
              Voltar à visão geral <span aria-hidden="true">→</span>
            </button>
          </div>
        </div>
        <aside className={isRecommended ? "simulation-recommendation active" : "simulation-recommendation"}>
          <span>{isRecommended ? "Prática recomendada" : "Prática opcional"}</span>
          <strong>Uma manhã comum</strong>
          <p>
            {isRecommended
              ? "Aplique em um lote misto a técnica que você acabou de praticar. A recomendação não bloqueia sua jornada."
              : "Uma prática curta para revisar decisões no seu ritmo."}
          </p>
        </aside>
      </section>

      {latestResult ? (
        <section className="simulation-last-result">
          <div>
            <span className="section-kicker">Último pacote</span>
            <h2>{latestResult.score}/100 em Uma manhã comum</h2>
            <p>{rewardPoints} pontos confirmados e {latestResult.falsePositives} falsos positivos.</p>
          </div>
          <span className="simulation-result-status">Resultado salvo no Meu perfil</span>
        </section>
      ) : null}

      <section className="content-section compact">
        <div className="section-heading-row">
          <div>
            <span className="section-kicker">Pacotes</span>
            <h2>Escolha uma simulação</h2>
          </div>
          <p>Uma experiência está disponível; as próximas seguem visíveis no roadmap.</p>
        </div>
        <div className="simulation-package-grid">
          {packages.map((item) => (
            <article key={item.id} className={item.playable ? "is-playable" : "is-future"}>
              <div className="simulation-package-topline">
                <span>{item.eyebrow}</span>
                <strong>{item.statusLabel}</strong>
              </div>
              <h3>{item.title}</h3>
              <p>{item.summary}</p>
              <dl className="simulation-package-meta">
                <div><dt>Formato</dt><dd>{item.format}</dd></div>
                <div><dt>Duração</dt><dd>{item.duration}</dd></div>
                <div><dt>Dificuldade</dt><dd>{item.difficulty}</dd></div>
                <div>
                  <dt>Recompensa</dt>
                  <dd>{item.playable ? `${POINT_RULES.simulation} pontos-base` : "A definir"}</dd>
                </div>
              </dl>
              {item.playable ? (
                <button type="button" onClick={onOpenWorkday}>
                  {latestResult ? "Ver resultado ou refazer" : "Iniciar simulação"}
                </button>
              ) : (
                <span className="simulation-package-planned">
                  Em produção · disponibilidade futura
                </span>
              )}
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

const actionLabels: Record<SimulationActionKey, string> = {
  keep: "Confiar e manter",
  verify: "Verificar por outro canal",
  report: "Reportar como suspeita",
  delete: "Apenas excluir",
};

const evidenceLabels: Record<EvidenceKey, string> = {
  sender: "Remetente",
  link: "Link ou anexo",
  context: "Contexto",
};

type DraftResponse = {
  action?: SimulationActionKey;
  inspectedEvidence: EvidenceKey[];
};

type SimulationPlayerProps = {
  existingResult: SimulationResult | null;
  rewardAlreadyClaimed: boolean;
  claimedPoints: number;
  onComplete: (answer: SimulationAnswer) => Promise<SimulationResult>;
  onBackToHub: () => void;
  onOpenProfile: () => void;
  onOpenPhishLab: () => void;
  onOpenTeamChallenge: () => void;
};

export function WorkdaySimulation({
  existingResult,
  rewardAlreadyClaimed,
  claimedPoints,
  onComplete,
  onBackToHub,
  onOpenProfile,
  onOpenPhishLab,
  onOpenTeamChallenge,
}: SimulationPlayerProps) {
  const [stage, setStage] = useState(existingResult ? 2 : 0);
  const [selectedMessageId, setSelectedMessageId] = useState(
    WORKDAY_MESSAGES[0].id,
  );
  const [responses, setResponses] = useState<Record<string, DraftResponse>>({});
  const [displayResult, setDisplayResult] = useState(existingResult);
  const [rewardGrantedInAttempt, setRewardGrantedInAttempt] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const selectedMessage =
    WORKDAY_MESSAGES.find((message) => message.id === selectedMessageId) ??
    WORKDAY_MESSAGES[0];
  const selectedResponse = responses[selectedMessage.id] ?? {
    inspectedEvidence: [],
  };
  const treatedCount = useMemo(
    () =>
      WORKDAY_MESSAGES.filter((message) => Boolean(responses[message.id]?.action))
        .length,
    [responses],
  );
  const allTreated = treatedCount === WORKDAY_MESSAGES.length;

  const inspectEvidence = (evidence: EvidenceKey) => {
    setResponses((current) => {
      const currentResponse = current[selectedMessage.id] ?? {
        inspectedEvidence: [],
      };
      if (currentResponse.inspectedEvidence.includes(evidence)) return current;
      return {
        ...current,
        [selectedMessage.id]: {
          ...currentResponse,
          inspectedEvidence: [...currentResponse.inspectedEvidence, evidence],
        },
      };
    });
  };

  const chooseAction = (action: SimulationActionKey) => {
    setResponses((current) => ({
      ...current,
      [selectedMessage.id]: {
        action,
        inspectedEvidence:
          current[selectedMessage.id]?.inspectedEvidence ?? [],
      },
    }));
  };

  const finish = async () => {
    if (!allTreated) return;
    setIsSubmitting(true);
    setError("");
    const grantsFirstReward = !rewardAlreadyClaimed;

    try {
      const result = await onComplete({
        activityId: WORKDAY_SIMULATION_ID,
        activityVersion: WORKDAY_SIMULATION_VERSION,
        messageDecisions: WORKDAY_MESSAGES.map((message) => ({
          messageId: message.id,
          action: responses[message.id].action as SimulationActionKey,
          inspectedEvidence: responses[message.id].inspectedEvidence,
        })),
      });
      setDisplayResult(result);
      setRewardGrantedInAttempt(grantsFirstReward);
      setStage(2);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      setError("Não foi possível registrar a Simulação. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const reset = () => {
    setStage(0);
    setSelectedMessageId(WORKDAY_MESSAGES[0].id);
    setResponses({});
    setDisplayResult(null);
    setRewardGrantedInAttempt(false);
    setError("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const bonusPoints = displayResult
    ? displayResult.potentialReward - POINT_RULES.simulation
    : 0;

  return (
    <div className="page-stack simulation-player-page">
      <section className="simulation-player-shell">
        <header className="simulation-player-header">
          <div>
            <span className="section-badge">Simulação · Uma manhã comum</span>
            <h1>Trate toda a caixa de entrada</h1>
            <p>O diagnóstico aparece somente depois das seis decisões.</p>
          </div>
          <div className="simulation-progress-card">
            <span>Mensagens tratadas</span>
            <strong>{stage === 2 ? WORKDAY_MESSAGES.length : treatedCount}/{WORKDAY_MESSAGES.length}</strong>
            <progress max={WORKDAY_MESSAGES.length} value={stage === 2 ? WORKDAY_MESSAGES.length : treatedCount}>
              {treatedCount}/{WORKDAY_MESSAGES.length}
            </progress>
          </div>
        </header>

        {stage === 0 ? (
          <div className="simulation-briefing">
            <div>
              <span className="section-kicker">Antes de começar</span>
              <h2>Nem tudo é phishing — e nem tudo deve ser aceito</h2>
              <p>
                A caixa mistura três mensagens legítimas, duas tentativas de phishing
                e uma solicitação legítima que precisa ser confirmada por outro canal.
              </p>
              <ul>
                <li>Investigue antes de escolher uma ação.</li>
                <li>Você pode revisar qualquer decisão antes de finalizar.</li>
                <li>Não há cronômetro nem feedback durante o pacote.</li>
              </ul>
            </div>
            <aside>
              <span>Recompensa-base</span>
              <strong>{POINT_RULES.simulation} pontos</strong>
              <p>Bônus de até 30% na primeira conclusão.</p>
            </aside>
            <div className="simulation-briefing-actions">
              <button type="button" className="primary-button dark" onClick={() => setStage(1)}>
                Abrir caixa de entrada
              </button>
              <button type="button" className="text-button" onClick={onBackToHub}>
                Voltar aos pacotes
              </button>
            </div>
          </div>
        ) : null}

        {stage === 1 ? (
          <div className="simulation-inbox">
            <aside className="simulation-message-list" aria-label="Mensagens da Simulação">
              <div className="simulation-column-heading">
                <span>Caixa de entrada</span>
                <strong>{WORKDAY_MESSAGES.length} mensagens</strong>
              </div>
              {WORKDAY_MESSAGES.map((message) => {
                const response = responses[message.id];
                return (
                  <button
                    type="button"
                    key={message.id}
                    className={selectedMessage.id === message.id ? "selected" : ""}
                    onClick={() => setSelectedMessageId(message.id)}
                  >
                    <span className={response?.action ? "message-state treated" : "message-state"}>
                      {response?.action ? "Tratada" : "Pendente"}
                    </span>
                    <strong>{message.senderName}</strong>
                    <b>{message.subject}</b>
                    <small>{message.receivedAt}</small>
                    <p>{message.preview}</p>
                  </button>
                );
              })}
            </aside>

            <article className="simulation-message-reader">
              <header>
                <div>
                  <span>De: {selectedMessage.senderName}</span>
                  <strong>{selectedMessage.subject}</strong>
                </div>
                <time>{selectedMessage.receivedAt}</time>
              </header>
              <dl>
                <div><dt>Endereço completo</dt><dd>{selectedMessage.senderAddress}</dd></div>
                <div><dt>{selectedMessage.artifactLabel}</dt><dd>{selectedMessage.artifactValue}</dd></div>
              </dl>
              <p className="simulation-message-body">{selectedMessage.body}</p>
              <div className="simulation-investigation">
                <h3>Ferramentas de investigação</h3>
                <div>
                  {(Object.keys(evidenceLabels) as EvidenceKey[]).map((evidence) => {
                    const inspected = selectedResponse.inspectedEvidence.includes(evidence);
                    return (
                      <button
                        type="button"
                        key={evidence}
                        className={inspected ? "active" : ""}
                        onClick={() => inspectEvidence(evidence)}
                      >
                        <span>{evidenceLabels[evidence]}</span>
                        <small>{inspected ? selectedMessage.evidenceDetails[evidence] : "Investigar"}</small>
                      </button>
                    );
                  })}
                </div>
              </div>
            </article>

            <aside className="simulation-action-panel">
              <span className="section-kicker">Sua ação</span>
              <h2>Como tratar esta mensagem?</h2>
              <div className="simulation-action-list">
                {(Object.keys(actionLabels) as SimulationActionKey[]).map((action) => (
                  <label key={action} className={selectedResponse.action === action ? "selected" : ""}>
                    <input
                      type="radio"
                      name={`action-${selectedMessage.id}`}
                      checked={selectedResponse.action === action}
                      onChange={() => chooseAction(action)}
                    />
                    <span>{actionLabels[action]}</span>
                  </label>
                ))}
              </div>
              <p className="simulation-no-feedback">
                Sua escolha será registrada, mas o resultado só aparece no relatório final.
              </p>
              {error ? <p className="form-error" role="alert">{error}</p> : null}
              <button
                type="button"
                className="primary-button dark"
                disabled={!allTreated || isSubmitting}
                onClick={finish}
              >
                {isSubmitting ? "Registrando..." : allTreated ? "Finalizar pacote" : `Trate mais ${WORKDAY_MESSAGES.length - treatedCount}`}
              </button>
            </aside>
          </div>
        ) : null}

        {stage === 2 && displayResult ? (
          <div className="simulation-result-view">
            <div className="result-hero compact-result">
              <div>
                <span className="section-badge">Pacote concluído</span>
                <h2>{displayResult.score}/100</h2>
                <p>
                  {displayResult.needsReview
                    ? "A prática foi concluída e uma nova revisão opcional foi recomendada."
                    : "A técnica foi aplicada em contexto e a jornada principal voltou ao destaque."}
                </p>
              </div>
              <div className="score-ring" style={{ "--score": displayResult.score } as CSSProperties}>
                <strong>{displayResult.score}</strong>
                <span>desempenho</span>
              </div>
            </div>
            <div className="simulation-result-grid">
              <article><span>Identificação</span><strong>{displayResult.identificationPoints}/30</strong><p>{displayResult.correctIdentifications}/6 mensagens reconhecidas.</p></article>
              <article><span>Ações</span><strong>{displayResult.actionPoints}/30</strong><p>{displayResult.correctActions}/6 respostas ideais.</p></article>
              <article><span>Evidências</span><strong>{displayResult.evidencePoints}/25</strong><p>{displayResult.inspectedMessages}/6 mensagens investigadas.</p></article>
              <article><span>Falsos positivos</span><strong>{displayResult.falsePositivePoints}/15</strong><p>{displayResult.falsePositives} mensagem(ns) legítima(s) reportada(s) ou excluída(s).</p></article>
              <article className="reward-result-card">
                <span>Pontos gerais</span>
                <strong>{rewardGrantedInAttempt ? `+${displayResult.potentialReward}` : `${claimedPoints} registrados`}</strong>
                <p>Base {POINT_RULES.simulation} + bônus de {bonusPoints} pontos. A recompensa é única.</p>
              </article>
            </div>
            <section className="simulation-answer-review">
              <div className="section-heading-row">
                <div><span className="section-kicker">Relatório</span><h2>O que havia na caixa</h2></div>
                <p>O feedback só aparece agora, depois de todas as decisões.</p>
              </div>
              <ActivityAnswerReview
                title="O que você acertou e o que precisa revisar na caixa"
                description="Cada mensagem compara sua triagem com a ação mais adequada. O tipo do item aparece somente agora."
                items={WORKDAY_MESSAGES.map((message) => {
                  const selectedAction = responses[message.id]?.action;
                  return {
                    id: message.id,
                    title: message.subject,
                    status: selectedAction
                      ? selectedAction === message.expectedAction ? "correct" as const : "review" as const
                      : "review" as const,
                    userAnswer: selectedAction ? actionLabels[selectedAction] : "Resposta da tentativa anterior não disponível nesta sessão",
                    expectedAnswer: actionLabels[message.expectedAction],
                    explanation: message.kind === "phishing"
                      ? "O item tinha sinais suficientes para uma resposta de phishing."
                      : message.kind === "verify"
                        ? "Os dados ainda eram inconclusivos e pediam verificação antes de uma ação definitiva."
                        : "Era um item legítimo; tratá-lo como fraude criaria um falso positivo.",
                  };
                })}
              />
            </section>
            <div className={displayResult.needsReview ? "adaptive-next-panel needs-review" : "adaptive-next-panel"}>
              <div>
                <span className="section-kicker inverse">Ciclo adaptativo</span>
                <h2>{displayResult.needsReview ? "Continuar praticando sem bloquear a jornada" : "Revisão concluída"}</h2>
                <p>
                  {displayResult.needsReview
                    ? "O PhishLab ficará recomendado novamente, enquanto a próxima Missão continua disponível."
                    : "A próxima prática recomendada protege uma alteração bancária com confirmação independente."}
                </p>
              </div>
              <button
                type="button"
                className="primary-button light"
                onClick={displayResult.needsReview ? onOpenPhishLab : onOpenTeamChallenge}
              >
                {displayResult.needsReview ? "Reabrir PhishLab" : "Abrir desafio em Equipes"}
              </button>
            </div>
            <div className="result-actions">
              <button type="button" className="text-button" onClick={onOpenProfile}>Ver no Meu perfil</button>
              <button type="button" className="text-button" onClick={reset}>Refazer Simulação</button>
              <button type="button" className="text-button" onClick={onBackToHub}>Voltar aos pacotes</button>
            </div>
          </div>
        ) : null}
      </section>
    </div>
  );
}
