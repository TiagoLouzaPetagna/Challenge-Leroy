"use client";

import { useMemo, useState, type CSSProperties } from "react";

import {
  TEAM_ACTION_LABELS,
  TEAM_CHALLENGE_CASES,
} from "@/lib/content/team-challenge-catalog";
import { POINT_RULES } from "@/lib/domain/rules";
import { Mascot } from "@/features/ui/LearningUI";
import type {
  EvidenceKey,
  SectorAggregate,
  SectorMetrics,
  SimulationActionKey,
  TeamAggregateClaim,
  TeamChallengeAnswer,
  TeamChallengeDecision,
  TeamChallengeResult,
  TeamCollectiveHistoryEvent,
} from "@/lib/domain/types";

import { LiveLeaderboard } from "./LiveLeaderboard";
import styles from "./TeamsHub.module.css";

type RankingItem = {
  id: string;
  name: string;
  score: number;
  position: number;
  isCurrent: boolean;
};

type TeamsHubProps = {
  teamName: string;
  metrics: SectorMetrics;
  aggregate: SectorAggregate;
  ranking: RankingItem[];
  goal: {
    title: string;
    description: string;
    targetScore: number;
  };
  history: TeamCollectiveHistoryEvent[];
  contribution: TeamAggregateClaim | null;
  latestResult: {
    score: number;
    correctDecisions: number;
    totalDecisions: number;
  } | null;
  legacyCompleted: boolean;
  rewardPoints: number;
  onOpenChallenge: () => void;
  onOpenLegacyChallenge: () => void;
  onOpenProfile: () => void;
  onBackToOverview: () => void;
};

function formatPercentage(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    maximumFractionDigits: value % 1 === 0 ? 0 : 1,
  }).format(value);
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "short",
    timeZone: "America/Sao_Paulo",
  }).format(new Date(value));
}

function SectorShieldBlueprint({
  score,
  level,
}: {
  score: number;
  level: SectorMetrics["shieldLevel"];
}) {
  const fillStart = `${100 - score}%`;

  return (
    <svg
      className={styles.shieldBlueprint}
      viewBox="0 0 360 300"
      role="img"
      aria-labelledby="sector-shield-title sector-shield-description"
    >
      <title id="sector-shield-title">{`Escudo do setor: ${score} de 100`}</title>
      <desc id="sector-shield-description">
        {`Planta de uma casa protegida por um escudo no nível ${level}.`}
      </desc>
      <defs>
        <pattern id="sector-blueprint-grid" width="18" height="18" patternUnits="userSpaceOnUse">
          <path d="M18 0H0V18" fill="none" stroke="currentColor" strokeOpacity=".09" />
        </pattern>
        <linearGradient id="sector-shield-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset={fillStart} stopColor="#d9e4dc" />
          <stop offset={fillStart} stopColor="var(--brand-lime, #78be20)" />
        </linearGradient>
      </defs>

      <rect width="360" height="300" rx="28" fill="url(#sector-blueprint-grid)" />
      <g className={styles.blueprintHouse} fill="none" stroke="currentColor">
        <path d="M48 146 180 38l132 108" strokeWidth="2" strokeOpacity=".48" />
        <path d="M74 129v126h212V129" strokeWidth="2" strokeOpacity=".28" />
        <path d="M99 255v-66h49v66M223 166h38v38h-38z" strokeWidth="1.5" strokeOpacity=".22" />
        <path d="M36 271h288M58 282h244" strokeWidth="1" strokeOpacity=".16" />
        <path d="M48 137v-20M312 137v-20M48 122h264" strokeWidth="1" strokeDasharray="5 6" strokeOpacity=".2" />
      </g>

      <g className={styles.blueprintShield}>
        <path
          d="M180 80c25 18 47 22 69 27v52c0 46-27 78-69 98-42-20-69-52-69-98v-52c22-5 44-9 69-27Z"
          fill="url(#sector-shield-fill)"
          stroke="currentColor"
          strokeWidth="3"
        />
        <path
          d="M180 94c20 13 37 17 54 21v42c0 35-20 61-54 79-34-18-54-44-54-79v-42c17-4 34-8 54-21Z"
          fill="none"
          stroke="white"
          strokeOpacity=".7"
          strokeWidth="1.5"
        />
        <text
          x="180"
          y="162"
          textAnchor="middle"
          fill="currentColor"
          fontSize="48"
          fontWeight="800"
        >
          {score}
        </text>
        <text
          x="180"
          y="184"
          textAnchor="middle"
          fill="currentColor"
          fillOpacity=".7"
          fontSize="13"
          fontWeight="700"
        >
          DE 100
        </text>
        <text
          x="180"
          y="211"
          textAnchor="middle"
          fill="currentColor"
          fontSize="14"
          fontWeight="800"
        >
          {level.toUpperCase()}
        </text>
      </g>
    </svg>
  );
}

export function TeamsHub({
  teamName,
  metrics,
  aggregate,
  ranking,
  goal,
  history,
  contribution,
  latestResult,
  legacyCompleted,
  rewardPoints,
  onOpenChallenge,
  onOpenLegacyChallenge,
  onOpenProfile,
  onBackToOverview,
}: TeamsHubProps) {
  const currentRanking = ranking.find((item) => item.isCurrent);
  const pointsToGoal = Math.max(goal.targetScore - metrics.score, 0);

  return (
    <div className="page-stack teams-page">
      <div className={styles.page}>
      <header className={styles.hero} aria-labelledby="teams-title">
        <div className={styles.heroCopy}>
          <span className={styles.eyebrow}>Proteção coletiva · {teamName}</span>
          <h1 id="teams-title">Escudo do setor</h1>
          <p className={styles.heroLead}>
            Veja o que já protege a loja — e qual é a próxima decisão que fortalece o conjunto.
          </p>
          <div className={styles.privacyNote} role="note">
            <svg width="19" height="19" viewBox="0 0 24 24" aria-hidden="true">
              <rect x="5" y="10" width="14" height="10" rx="2" fill="none" stroke="currentColor" strokeWidth="1.8" />
              <path d="M8 10V7a4 4 0 0 1 8 0v3" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
            <span>Somente dados agregados. Respostas e erros individuais permanecem privados.</span>
          </div>
          <div className={styles.heroActions}>
            <button type="button" className="primary-button" onClick={onOpenChallenge}>
              {latestResult ? "Ver ou refazer desafio" : "Fortalecer o escudo"}
            </button>
            <button type="button" className="text-button light" onClick={onBackToOverview}>
              Voltar à visão geral
            </button>
          </div>
        </div>

        <div className={styles.heroArtwork}>
          <span className={`${styles.unitNode} ${styles.unitNodeOne}`} aria-hidden="true">047</span>
          <span className={`${styles.unitNode} ${styles.unitNodeTwo}`} aria-hidden="true">CD</span>
          <span className={`${styles.unitNode} ${styles.unitNodeThree}`} aria-hidden="true">+</span>
          <span className={styles.connectionLine} aria-hidden="true" />
          <div className={styles.shieldFrame}>
            <SectorShieldBlueprint score={metrics.score} level={metrics.shieldLevel} />
            <div className={styles.shieldCaption} aria-hidden="true">
              <strong>{metrics.score}<small>/100</small></strong>
              <span>Escudo {metrics.shieldLevel}</span>
            </div>
          </div>
          <Mascot pose="protection" size="large" className={styles.mascot} />
        </div>
      </header>

      <section className={styles.goalBand} aria-labelledby="teams-goal-title">
        <div className={styles.goalHeading}>
          <span>Meta ativa</span>
          <h2 id="teams-goal-title">{goal.title}</h2>
          <p>{goal.description}</p>
        </div>
        <div className={styles.goalJourney}>
          <div className={styles.goalNumbers} id="teams-goal-progress-text">
            <span><strong>{metrics.score}</strong> agora</span>
            <span><strong>{goal.targetScore}</strong> meta</span>
          </div>
          <progress
            value={metrics.score}
            max={goal.targetScore}
            aria-label={`Progresso da meta: ${metrics.score} de ${goal.targetScore}`}
            aria-describedby="teams-goal-progress-text teams-goal-remaining"
          >
            {metrics.score} de {goal.targetScore}
          </progress>
          <strong id="teams-goal-remaining" className={styles.goalRemaining}>
            {pointsToGoal === 0
              ? "Meta alcançada"
              : `${pointsToGoal === 1 ? "Falta" : "Faltam"} ${pointsToGoal} ${pointsToGoal === 1 ? "ponto" : "pontos"}`}
          </strong>
        </div>
      </section>

      <section className={styles.featuredChallenge} aria-labelledby="current-team-challenge-title">
        <div className={styles.challengeArtwork} aria-hidden="true">
          <svg viewBox="0 0 330 240" focusable="false">
            <path className={styles.challengePath} d="M30 194C88 190 79 98 141 103s73 75 159 31" />
            <g className={styles.challengeEnvelope}>
              <rect x="58" y="50" width="142" height="102" rx="18" />
              <path d="m70 68 59 47 59-47" />
              <path d="m70 138 43-38M188 138l-43-38" />
            </g>
            <g className={styles.challengeBank}>
              <path d="M215 78h82M224 78v61m20-61v61m20-61v61m24-61v61M214 139h84" />
              <path d="m211 77 44-30 47 30" />
            </g>
            <circle cx="301" cy="134" r="18" />
            <path d="m293 134 6 6 11-13" />
          </svg>
          <span>Verificar antes de alterar</span>
        </div>
        <div className={styles.challengeCopy}>
          <span className={styles.eyebrowDark}>Próximo desafio coletivo</span>
          <h2 id="current-team-challenge-title">Mudança bancária sem atalho</h2>
          <p>
            Investigue uma troca de conta perto do pagamento. A primeira conclusão válida fortalece apenas o agregado do setor.
          </p>
          <div className={styles.challengeMeta}>
            <span>1 caso · 5 decisões</span>
            <span>11 min</span>
            <span>{POINT_RULES.teamOperation} pontos-base</span>
            <span>{contribution ? "Contribuição registrada" : "Pronto para começar"}</span>
          </div>
          <button type="button" className="primary-button dark" onClick={onOpenChallenge}>
            {latestResult ? "Abrir resultado" : "Começar desafio"}
          </button>
        </div>
      </section>

      <section className={styles.metricsStory} aria-labelledby="teams-score-title">
        <div className={styles.metricsIntro}>
          <span className={styles.eyebrowDark}>Como o escudo ganha força</span>
          <h2 id="teams-score-title">Três indicadores, nenhum ranking individual</h2>
          <p>O cálculo combina participação, precisão e cobertura sem publicar o desempenho de ninguém.</p>
          <span className={styles.scoreFormula}>40% + 40% + 20%</span>
        </div>
        <div className={styles.metricRows}>
          <article
            className={styles.metricRow}
            style={{ "--metric-value": `${metrics.participation}%` } as CSSProperties}
          >
            <div><h3>Participação</h3><span>40% da nota</span></div>
            <strong>{formatPercentage(metrics.participation)}%</strong>
            <div className={styles.metricTrack} aria-hidden="true"><span /></div>
            <p>{aggregate.validParticipants} de {aggregate.eligibleParticipants} participantes elegíveis.</p>
          </article>
          <article
            className={styles.metricRow}
            style={{ "--metric-value": `${metrics.precision}%` } as CSSProperties}
          >
            <div><h3>Precisão</h3><span>40% da nota</span></div>
            <strong>{formatPercentage(metrics.precision)}%</strong>
            <div className={styles.metricTrack} aria-hidden="true"><span /></div>
            <p>{aggregate.correctDecisions} de {aggregate.validDecisions} decisões agregadas.</p>
          </article>
          <article
            className={styles.metricRow}
            style={{ "--metric-value": `${metrics.coverage}%` } as CSSProperties}
          >
            <div><h3>Cobertura</h3><span>20% da nota</span></div>
            <strong>{formatPercentage(metrics.coverage)}%</strong>
            <div className={styles.metricTrack} aria-hidden="true"><span /></div>
            <p>{aggregate.coveredCompetencyIds.length} de {aggregate.requiredCompetencyIds.length} competências cobertas.</p>
          </article>
        </div>
        <p className={styles.metricFootnote}>
          Pontos gerais, tamanho bruto do setor e posições individuais no Arcade não entram nesta fórmula.
        </p>
      </section>

      <section className={styles.previousChallenge} aria-labelledby="previous-team-challenge-title">
        <div className={styles.previousMarker} aria-hidden="true">05</div>
        <div>
          <span className={styles.eyebrowDark}>Prática anterior disponível</span>
          <h2 id="previous-team-challenge-title">Caixa de Entrada Segura</h2>
          <p>Cinco mensagens, tentativas e recompensa preservadas separadamente.</p>
          <div className={styles.challengeMeta}>
            <span>5 mensagens</span>
            <span>8–10 min</span>
            <span>{legacyCompleted ? "Concluído" : "Ainda não realizado"}</span>
          </div>
        </div>
        <button type="button" className="text-button" onClick={onOpenLegacyChallenge}>
          {legacyCompleted ? "Ver resultado anterior" : "Abrir desafio anterior"}
        </button>
      </section>

      <section className={styles.contextGrid} aria-label="Contexto e privacidade do setor">
        <article className={styles.rankingPanel}>
          <header>
            <div>
              <span className={styles.eyebrowDark}>Comparação entre setores</span>
              <h2>Posição agregada da loja</h2>
            </div>
            <strong>{currentRanking ? `${currentRanking.position}º` : "—"}</strong>
          </header>
          <ol aria-label="Classificação agregada dos setores">
            {ranking.map((item) => (
              <li key={item.id} className={item.isCurrent ? styles.currentTeam : undefined}>
                <span>{item.position}</span>
                <strong>{item.name}</strong>
                <small>{item.score} pontos agregados</small>
              </li>
            ))}
          </ol>
          <p>Somente indicadores normalizados por setor aparecem aqui — nunca respostas, notas ou identidades individuais.</p>
        </article>

        <article className={styles.privatePanel}>
          <span className={styles.privateLock} aria-hidden="true">
            <svg viewBox="0 0 24 24"><rect x="5" y="10" width="14" height="10" rx="2" /><path d="M8 10V7a4 4 0 0 1 8 0v3" /></svg>
          </span>
          <span className={styles.eyebrowDark}>Visível somente para você</span>
          <h2>Sua contribuição permanece privada</h2>
          {contribution && latestResult ? (
            <div className={styles.privateResult}>
              <strong>Registrada no agregado</strong>
              <span>{latestResult.correctDecisions} de {latestResult.totalDecisions} decisões corretas</span>
              <span>{rewardPoints} pontos confirmados</span>
              <small>Repetir o desafio não altera novamente o placar.</small>
            </div>
          ) : (
            <div className={styles.privateEmpty}>
              <strong>Ainda sem contribuição neste desafio</strong>
              <p>Seu resultado aparecerá aqui, nunca na comparação coletiva.</p>
            </div>
          )}
          <p className={styles.privateRule}>Outras pessoas não veem suas respostas, sua nota ou quais casos você errou.</p>
        </article>
      </section>

      <section className={styles.historyPanel} aria-labelledby="teams-history-title">
        <div>
          <span className={styles.eyebrowDark}>Histórico coletivo</span>
          <h2 id="teams-history-title">Marcos que fortaleceram o setor</h2>
        </div>
        <ol>
          {[...history].reverse().map((event) => (
            <li key={event.id}>
              <span aria-hidden="true" />
              <div><strong>{event.title}</strong><p>{event.detail}</p></div>
              <time dateTime={event.createdAt}>{formatDate(event.createdAt)}</time>
            </li>
          ))}
        </ol>
      </section>

      <LiveLeaderboard onOpenProfile={onOpenProfile} />
      </div>
    </div>
  );
}

type TeamChallengeProps = {
  existingResult: TeamChallengeResult | null;
  existingDecisions: TeamChallengeDecision[];
  rewardAlreadyClaimed: boolean;
  aggregateAlreadyCounted: boolean;
  claimedPoints: number;
  onComplete: (answer: TeamChallengeAnswer) => Promise<TeamChallengeResult>;
  onBackToTeams: () => void;
  onOpenProfile: () => void;
};

export function TeamChallenge({
  existingResult,
  existingDecisions,
  rewardAlreadyClaimed,
  aggregateAlreadyCounted,
  claimedPoints,
  onComplete,
  onBackToTeams,
  onOpenProfile,
}: TeamChallengeProps) {
  const initialActions = useMemo(
    () =>
      Object.fromEntries(
        existingDecisions.map((decision) => [decision.caseId, decision.action]),
      ) as Record<string, SimulationActionKey>,
    [existingDecisions],
  );
  const initialEvidence = useMemo(
    () =>
      Object.fromEntries(
        existingDecisions.map((decision) => [
          decision.caseId,
          decision.inspectedEvidence,
        ]),
      ) as Record<string, EvidenceKey[]>,
    [existingDecisions],
  );
  const [stage, setStage] = useState<"briefing" | "challenge" | "result">(
    existingResult ? "result" : "briefing",
  );
  const [activeCaseId, setActiveCaseId] = useState(TEAM_CHALLENGE_CASES[0].id);
  const [actions, setActions] = useState<Record<string, SimulationActionKey>>(initialActions);
  const [evidence, setEvidence] = useState<Record<string, EvidenceKey[]>>(initialEvidence);
  const [result, setResult] = useState<TeamChallengeResult | null>(existingResult);
  const [countedOnThisAttempt, setCountedOnThisAttempt] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const activeCase =
    TEAM_CHALLENGE_CASES.find((item) => item.id === activeCaseId) ??
    TEAM_CHALLENGE_CASES[0];
  const answeredCount = TEAM_CHALLENGE_CASES.filter(
    (item) => actions[item.id],
  ).length;
  const allAnswered = answeredCount === TEAM_CHALLENGE_CASES.length;

  const inspectEvidence = (key: EvidenceKey) => {
    setEvidence((current) => ({
      ...current,
      [activeCase.id]: Array.from(
        new Set([...(current[activeCase.id] ?? []), key]),
      ),
    }));
  };

  const submitChallenge = async () => {
    if (!allAnswered || isSubmitting) return;
    setIsSubmitting(true);
    setError("");
    try {
      const nextResult = await onComplete({
        activityId: "team:secure-inbox",
        activityVersion: 1,
        caseDecisions: TEAM_CHALLENGE_CASES.map((item) => ({
          caseId: item.id,
          action: actions[item.id],
          inspectedEvidence: evidence[item.id] ?? [],
        })),
      });
      setResult(nextResult);
      setCountedOnThisAttempt(!aggregateAlreadyCounted);
      setStage("result");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      setError("Não foi possível registrar o desafio agora. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const restart = () => {
    setActions({});
    setEvidence({});
    setResult(null);
    setCountedOnThisAttempt(false);
    setActiveCaseId(TEAM_CHALLENGE_CASES[0].id);
    setStage("briefing");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (stage === "briefing") {
    return (
      <div className="activity-workspace page-stack team-challenge-page">
        <button type="button" className="text-button teams-back-button" onClick={onBackToTeams}>← Voltar para Equipes</button>
        <section className="team-briefing">
          <div>
            <span className="section-kicker">Desafio individual · resultado coletivo</span>
            <h1>Caixa de Entrada Segura</h1>
            <p>
              Você receberá cinco mensagens completas. Investigue o que precisar,
              escolha uma ação para cada uma e revise tudo antes de concluir.
            </p>
            <p>Suas respostas ficam privadas. A primeira conclusão contribui para o placar do setor.</p>
            <button type="button" className="primary-button" onClick={() => setStage("challenge")}>Abrir a caixa de entrada</button>
          </div>
          <aside>
            <span>Recompensa</span>
            <strong>{POINT_RULES.teamOperation}</strong>
            <p>pontos-base na primeira conclusão, mais bônus de desempenho</p>
            <small>8–10 minutos · sem cronômetro</small>
          </aside>
        </section>
      </div>
    );
  }

  if (stage === "result" && result) {
    return (
      <div className="activity-workspace page-stack team-challenge-page">
        <section className="team-result-hero">
          <div>
            <span className="section-kicker">Resultado privado</span>
            <h1>{result.correctDecisions} de {result.totalDecisions} decisões seguras</h1>
            <p>
              Este relatório pertence a você. O setor recebe somente os valores agregados necessários para recalcular o placar.
            </p>
          </div>
          <div className="team-result-score"><strong>{result.score}</strong><span>/100</span></div>
        </section>

        <section className="team-result-summary">
          <article><span>Decisões corretas</span><strong>{result.correctDecisions}/{result.totalDecisions}</strong></article>
          <article><span>Falsos positivos</span><strong>{result.falsePositives}</strong></article>
          <article><span>Pontos gerais</span><strong>{rewardAlreadyClaimed && !countedOnThisAttempt ? claimedPoints : result.potentialReward}</strong><small>{rewardAlreadyClaimed && !countedOnThisAttempt ? "já confirmados" : "confirmados agora"}</small></article>
          <article><span>Agregado do setor</span><strong>{aggregateAlreadyCounted && !countedOnThisAttempt ? "Sem alteração" : "Atualizado"}</strong><small>contribuição única</small></article>
        </section>

        <section className="team-competency-result">
          <div><span className="section-kicker">Competências privadas</span><h2>O que este desafio registrou</h2></div>
          <div>
            {Object.entries(result.competencyScores).map(([id, score]) => (
              <article key={id}><span>{id}</span><strong>{score}/100</strong><div><span style={{ width: `${score}%` }} /></div></article>
            ))}
          </div>
        </section>

        <details className="activity-review-disclosure team-case-review"><summary>Rever minhas decisões</summary>
          <div><span className="section-kicker">Revisão das respostas</span><h2>O que você acertou e o que precisa revisar</h2></div>
          <div className="team-review-list">
            {TEAM_CHALLENGE_CASES.map((item, index) => {
              const selected = actions[item.id];
              const correct = selected === item.expectedAction;
              return (
                <article key={item.id} className={correct ? "correct" : "incorrect"}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <div>
                    <small>{correct ? "Acertou" : "Precisa revisar"}</small>
                    <h3>{item.subject}</h3>
                    <p>Sua ação: <strong>{selected ? TEAM_ACTION_LABELS[selected] : "Não registrada"}</strong> · Ação esperada: <strong>{TEAM_ACTION_LABELS[item.expectedAction]}</strong></p>
                    <p>{item.explanation}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </details>

        <section className="team-result-actions">
          <div><span className="section-kicker">Próximo passo</span><h2>Veja o efeito coletivo sem expor seu resultado</h2></div>
          <div>
            <button type="button" className="primary-button" onClick={onBackToTeams}>Ver placar atualizado</button>
            <button type="button" className="text-button" onClick={onOpenProfile}>Abrir Meu perfil</button>
            <button type="button" className="text-button" onClick={restart}>Refazer para praticar</button>
          </div>
        </section>
      </div>
    );
  }

  const inspected = new Set(evidence[activeCase.id] ?? []);
  return (
    <div className="activity-workspace page-stack team-challenge-page">
      <div className="team-challenge-topbar">
        <button type="button" className="text-button" onClick={onBackToTeams}>← Sair do desafio</button>
        <div><span>{answeredCount} de {TEAM_CHALLENGE_CASES.length} decisões</span><div><span style={{ width: `${(answeredCount / TEAM_CHALLENGE_CASES.length) * 100}%` }} /></div></div>
      </div>

      <section className="team-inbox-shell">
        <aside className="team-case-list" aria-label="Casos do desafio">
          <div><span className="section-kicker">Caixa do setor</span><h1>5 mensagens</h1></div>
          {TEAM_CHALLENGE_CASES.map((item, index) => (
            <button type="button" key={item.id} className={`${item.id === activeCase.id ? "active" : ""} ${actions[item.id] ? "answered" : ""}`} onClick={() => setActiveCaseId(item.id)}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <span><strong>{item.sender}</strong><small>{item.subject}</small></span>
              {actions[item.id] ? <b aria-label="Respondida">✓</b> : null}
            </button>
          ))}
        </aside>

        <div className="team-message-reader">
          <header><span>Mensagem {TEAM_CHALLENGE_CASES.findIndex((item) => item.id === activeCase.id) + 1}</span><h2>{activeCase.subject}</h2><p>{activeCase.preview}</p></header>
          <p className="activity-instruction">Leia a mensagem, consulte os detalhes nos botões abaixo e escolha o que fazer.</p>
          <div className="team-evidence-tools">
            <div>
              <button type="button" className={inspected.has("sender") ? "inspected" : ""} onClick={() => inspectEvidence("sender")}>Remetente</button>
              <button type="button" className={inspected.has("link") ? "inspected" : ""} onClick={() => inspectEvidence("link")}>Destino ou anexo</button>
              <button type="button" className={inspected.has("context") ? "inspected" : ""} onClick={() => inspectEvidence("context")}>Contexto</button>
            </div>
          </div>
          <div className="team-evidence-results">
            {inspected.has("sender") ? <article><span>Remetente</span><strong>{activeCase.sender}</strong><p>{activeCase.address}</p></article> : null}
            {inspected.has("link") ? <article><span>Destino ou anexo</span><p>{activeCase.destination}</p></article> : null}
            {inspected.has("context") ? <article><span>Contexto conhecido</span><p>{activeCase.context}</p></article> : null}
          </div>
          <fieldset className="team-action-fieldset">
            <legend>Qual ação você tomaria?</legend>
            <div>
              {(Object.keys(TEAM_ACTION_LABELS) as SimulationActionKey[]).map((action) => (
                <label key={action} className={actions[activeCase.id] === action ? "selected" : ""}>
                  <input type="radio" name={`action-${activeCase.id}`} value={action} checked={actions[activeCase.id] === action} onChange={() => setActions((current) => ({ ...current, [activeCase.id]: action }))} />
                  <span>{TEAM_ACTION_LABELS[action]}</span>
                </label>
              ))}
            </div>
          </fieldset>
          <div className="team-message-navigation">
            <span>Você pode mudar esta decisão até concluir o desafio.</span>
            {TEAM_CHALLENGE_CASES.findIndex((item) => item.id === activeCase.id) < TEAM_CHALLENGE_CASES.length - 1 ? (
              <button type="button" className="primary-button dark" onClick={() => setActiveCaseId(TEAM_CHALLENGE_CASES[TEAM_CHALLENGE_CASES.findIndex((item) => item.id === activeCase.id) + 1].id)}>Próxima mensagem</button>
            ) : (
              <button type="button" className="primary-button dark" disabled={!allAnswered || isSubmitting} onClick={submitChallenge}>{isSubmitting ? "Registrando..." : "Concluir as cinco decisões"}</button>
            )}
          </div>
          {error ? <p className="team-submit-error" role="alert">{error}</p> : null}
        </div>
      </section>
      {!allAnswered ? <p className="team-completion-hint">Escolha uma ação para cada mensagem antes de concluir.</p> : null}
    </div>
  );
}
