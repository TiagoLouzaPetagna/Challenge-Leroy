"use client";

import { SectionBanner } from "@/features/ui/SectionBanner";

import { useMemo, useState, type CSSProperties } from "react";

import { ActivityAnswerReview } from "@/features/activities/primitives/ActivityAnswerReview";
import styles from "./SimulationsHub.module.css";

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

const futureScenarios = [
  {
    id: "message-center",
    title: "Central de mensagens",
    summary:
      "Conversas de gestores, colegas e suporte para praticar personificação e confirmação por outro canal.",
    format: "5 conversas conectadas",
    focus: "Identidade e confirmação",
    artwork: "messages",
  },
  {
    id: "multichannel",
    title: "Ataque multicanal",
    summary:
      "Um mesmo incidente se desenvolve por e-mail, mensagem, QR Code e página de confirmação.",
    format: "Caso conectado",
    focus: "E-mail, chat, QR e página",
    artwork: "channels",
  },
] as const;

function WorkdaySceneArtwork() {
  return (
    <svg
      className={styles.workdayArtwork}
      viewBox="0 0 640 440"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M86 63c93-71 272-67 390-7 116 59 154 181 85 272-66 88-227 104-354 67C73 356 5 271 24 180 34 132 54 88 86 63Z" fill="#F4CC61" />
      <circle cx="518" cy="86" r="45" fill="#FF8A70" />
      <circle cx="65" cy="340" r="30" fill="#9EDCE5" />

      <g className={styles.floatingMessage}>
        <rect x="36" y="68" width="155" height="67" rx="20" fill="#FFFDF7" />
        <circle cx="70" cy="101" r="15" fill="#CBBCE8" />
        <path d="M98 91h61M98 106h43" stroke="#173F35" strokeWidth="8" strokeLinecap="round" opacity=".72" />
        <path d="m154 128 21 19-3-27" fill="#FFFDF7" />
      </g>

      <g className={styles.floatingAlert}>
        <rect x="476" y="116" width="127" height="56" rx="18" fill="#173F35" />
        <circle cx="505" cy="144" r="12" fill="#B8EF3A" />
        <path d="M531 136h48M531 150h32" stroke="#FFFDF7" strokeWidth="7" strokeLinecap="round" opacity=".85" />
      </g>

      <path d="M22 384h590" stroke="#173F35" strokeWidth="15" strokeLinecap="round" />
      <path d="M89 383 71 427M536 383l20 44" stroke="#173F35" strokeWidth="13" strokeLinecap="round" />

      <g className={styles.screenGroup}>
        <rect x="105" y="145" width="365" height="225" rx="24" fill="#173F35" />
        <rect x="122" y="162" width="331" height="184" rx="13" fill="#FFFDF7" />
        <circle cx="143" cy="180" r="5" fill="#FF8066" />
        <circle cx="159" cy="180" r="5" fill="#FFD363" />
        <circle cx="175" cy="180" r="5" fill="#41B7AA" />
        <path d="M122 195h331" stroke="#D9DFD2" strokeWidth="4" />

        <g transform="translate(138 213)">
          <rect width="67" height="111" rx="10" fill="#EEEAE0" />
          <rect x="9" y="10" width="49" height="9" rx="4.5" fill="#5D7068" opacity=".55" />
          <rect x="9" y="31" width="49" height="28" rx="7" fill="#FFFDF7" />
          <rect x="9" y="68" width="49" height="32" rx="7" fill="#FFFDF7" />
        </g>
        <g transform="translate(215 213)">
          <rect width="67" height="111" rx="10" fill="#DDF2F1" />
          <rect x="9" y="10" width="44" height="9" rx="4.5" fill="#24796F" opacity=".65" />
          <rect x="9" y="31" width="49" height="43" rx="7" fill="#FFFDF7" />
          <path d="M18 45h29M18 56h20" stroke="#24796F" strokeWidth="5" strokeLinecap="round" opacity=".65" />
        </g>
        <g transform="translate(292 213)">
          <rect width="67" height="111" rx="10" fill="#F2EAF5" />
          <rect x="9" y="10" width="38" height="9" rx="4.5" fill="#6D5D83" opacity=".62" />
          <rect x="9" y="31" width="49" height="51" rx="7" fill="#FFFDF7" />
          <circle cx="21" cy="46" r="6" fill="#CBBCE8" />
          <path d="M32 43h17M32 51h12" stroke="#6D5D83" strokeWidth="4" strokeLinecap="round" opacity=".62" />
        </g>
        <g transform="translate(369 213)">
          <rect width="67" height="111" rx="10" fill="#E5F3C6" />
          <rect x="9" y="10" width="36" height="9" rx="4.5" fill="#4C7614" opacity=".7" />
          <rect x="9" y="31" width="49" height="35" rx="7" fill="#FFFDF7" />
          <path d="m22 47 7 7 15-17" fill="none" stroke="#4C7614" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        <path d="M84 369h405l-29 19H113Z" fill="#245447" />
      </g>

      <g className={styles.phoneGroup}>
        <rect x="488" y="214" width="86" height="158" rx="20" fill="#FFFDF7" stroke="#173F35" strokeWidth="9" />
        <path d="M518 229h26" stroke="#173F35" strokeWidth="6" strokeLinecap="round" />
        <rect x="501" y="254" width="59" height="42" rx="11" fill="#CBBCE8" />
        <rect x="501" y="305" width="45" height="32" rx="11" fill="#9EDCE5" />
        <circle cx="531" cy="354" r="5" fill="#173F35" />
      </g>

      <g>
        <path d="M35 319h60l-8 64H44Z" fill="#FF8066" stroke="#173F35" strokeWidth="7" strokeLinejoin="round" />
        <path d="M95 333h10c18 0 18 31 0 31H91" fill="none" stroke="#173F35" strokeWidth="7" />
        <path d="M53 303c-8-11 9-14 1-26M72 303c-8-11 9-14 1-26" fill="none" stroke="#173F35" strokeWidth="5" strokeLinecap="round" />
      </g>
    </svg>
  );
}

function FutureScenarioArtwork({ kind }: { kind: "messages" | "channels" }) {
  if (kind === "messages") {
    return (
      <svg viewBox="0 0 180 120" aria-hidden="true" focusable="false">
        <rect x="19" y="20" width="102" height="60" rx="17" fill="#FFFDF7" stroke="currentColor" strokeWidth="4" />
        <circle cx="43" cy="49" r="11" fill="#CBBCE8" />
        <path d="M62 42h39M62 55h28" stroke="currentColor" strokeWidth="6" strokeLinecap="round" opacity=".7" />
        <path d="m94 78 23 18-3-25" fill="#FFFDF7" stroke="currentColor" strokeWidth="4" strokeLinejoin="round" />
        <rect x="84" y="57" width="77" height="44" rx="15" fill="#F4CC61" stroke="currentColor" strokeWidth="4" />
        <path d="M103 76h39M103 87h25" stroke="currentColor" strokeWidth="5" strokeLinecap="round" opacity=".68" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 180 120" aria-hidden="true" focusable="false">
      <path d="M45 58h37M101 58h34M90 28v18M90 70v20" stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeDasharray="5 8" />
      <rect x="17" y="39" width="42" height="38" rx="12" fill="#9EDCE5" stroke="currentColor" strokeWidth="4" />
      <path d="m25 49 13 10 13-10M25 68h26" fill="none" stroke="currentColor" strokeWidth="4" strokeLinejoin="round" />
      <rect x="70" y="12" width="40" height="38" rx="12" fill="#CBBCE8" stroke="currentColor" strokeWidth="4" />
      <path d="M80 25h20M80 36h13" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
      <rect x="121" y="39" width="42" height="38" rx="12" fill="#FF8A70" stroke="currentColor" strokeWidth="4" />
      <path d="M133 51h18v14h-18zM137 55h10v6h-10z" fill="#FFFDF7" />
      <rect x="70" y="72" width="40" height="38" rx="12" fill="#B8EF3A" stroke="currentColor" strokeWidth="4" />
      <path d="m82 90 6 6 12-14" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="90" cy="58" r="13" fill="#173F35" />
      <path d="M85 58h10M90 53v10" stroke="#FFFDF7" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

export function SimulationsHub({
  isRecommended,
  latestResult,
  rewardPoints,
  onOpenWorkday,
}: SimulationsHubProps) {
  return (
    <div className="page-stack simulation-page">
      <div className={styles.hub}>
        <SectionBanner variant="simulations" labelledBy="simulations-title">
          <span>Simulações · Prática segura</span>
          <h1 id="simulations-title">Na dúvida,<br />treine sua escolha.</h1>
          <p>Mensagens, pedidos e imprevistos da rotina. Escolha seu cenário e pratique decisões seguras, no seu ritmo.</p>
        </SectionBanner>

        <section className={styles.availableSection} aria-labelledby="available-simulation-title">
        <div className={styles.sectionIntro}>
          <div>
            <h2 id="available-simulation-title">Seu próximo cenário</h2>
          </div>
        </div>

        <article className={styles.featuredScenario} aria-labelledby="workday-title">
          <div className={styles.featuredCopy}>
            <div className={styles.featuredStatusRow}>
              <span className={styles.availableBadge}>
                <span aria-hidden="true">✓</span> Disponível
              </span>
              <span className={styles.recommendationLabel}>
                {isRecommended ? "Recomendado para você" : "Pratique no seu ritmo"}
              </span>
            </div>

            <h2 id="workday-title">Uma manhã comum</h2>
            <p className={styles.featuredSummary}>
              Organize uma entrada de trabalho com mensagens legítimas, suspeitas e
              inconclusivas. Nenhuma pista isolada decide o caso — e o diagnóstico
              aparece somente ao final.
            </p>

            <p className={styles.scenarioMeta}>12 min · Intermediário</p>

            {latestResult ? (
              <aside className={styles.latestResult} aria-label="Último resultado em Uma manhã comum">
                <div>
                  <span>Última tentativa</span>
                  <strong>{latestResult.score}/100</strong>
                </div>
                <p>
                  {rewardPoints} pontos confirmados · {latestResult.falsePositives}{" "}
                  {latestResult.falsePositives === 1 ? "falso positivo" : "falsos positivos"}
                </p>
                <small>Resultado salvo no Meu perfil</small>
              </aside>
            ) : null}

            <div className={styles.actionRow}>
              <button type="button" className={styles.primaryAction} onClick={onOpenWorkday}>
                {latestResult ? "Ver resultado ou refazer" : "Iniciar simulação"}
                <span aria-hidden="true">→</span>
              </button>
            </div>
          </div>

          <div className={styles.featuredArtwork}>
            <WorkdaySceneArtwork />
          </div>
        </article>
        </section>

        <section className={styles.productionSection} aria-labelledby="production-title">
        <div className={styles.sectionIntro}>
          <div>
            <h2 id="production-title">Em produção</h2>
          </div>
        </div>

        <div className={styles.futureGrid}>
          {futureScenarios.map((scenario) => (
            <article
              key={scenario.id}
              className={`${styles.futureScenario} ${
                scenario.artwork === "messages" ? styles.messageScenario : styles.channelScenario
              }`}
              aria-labelledby={`${scenario.id}-title`}
            >
              <div className={styles.futureArtwork}>
                <FutureScenarioArtwork kind={scenario.artwork} />
              </div>
              <div className={styles.futureCopy}>
                <span className={styles.productionBadge}>
                  <span aria-hidden="true">◌</span> Em produção
                </span>
                <h3 id={`${scenario.id}-title`}>{scenario.title}</h3>
                <p>{scenario.summary}</p>
                <dl className={styles.futureMeta}>
                  <div><dt>Formato</dt><dd>{scenario.format}</dd></div>
                  <div><dt>Foco</dt><dd>{scenario.focus}</dd></div>
                </dl>
              </div>
            </article>
          ))}
        </div>
        </section>
      </div>
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
