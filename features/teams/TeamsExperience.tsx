"use client";

import { useMemo, useState } from "react";

import {
  TEAM_ACTION_LABELS,
  TEAM_CHALLENGE_CASES,
} from "@/lib/content/team-challenge-catalog";
import { POINT_RULES } from "@/lib/domain/rules";
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
      className="teams-shield-blueprint"
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
      <g className="teams-blueprint-house" fill="none" stroke="currentColor">
        <path d="M48 146 180 38l132 108" strokeWidth="2" strokeOpacity=".48" />
        <path d="M74 129v126h212V129" strokeWidth="2" strokeOpacity=".28" />
        <path d="M99 255v-66h49v66M223 166h38v38h-38z" strokeWidth="1.5" strokeOpacity=".22" />
        <path d="M36 271h288M58 282h244" strokeWidth="1" strokeOpacity=".16" />
        <path d="M48 137v-20M312 137v-20M48 122h264" strokeWidth="1" strokeDasharray="5 6" strokeOpacity=".2" />
      </g>

      <g className="teams-blueprint-shield">
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
  onBackToOverview,
}: TeamsHubProps) {
  const currentRanking = ranking.find((item) => item.isCurrent);
  const pointsToGoal = Math.max(goal.targetScore - metrics.score, 0);

  return (
    <div className="page-stack teams-page">
      <section className="teams-hero teams-hero--shield-first">
        <div className="teams-hero-copy">
          <span className="section-kicker">Proteção coletiva</span>
          <h1>Escudo do setor</h1>
          <p>
            O escudo mostra quanto o setor já transformou prática em proteção.
            Participação, precisão e cobertura fortalecem a mesma casa digital.
          </p>
          <div className="teams-aggregate-privacy" role="note">
            <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
              <rect x="5" y="10" width="14" height="10" rx="2" fill="none" stroke="currentColor" strokeWidth="1.8" />
              <path d="M8 10V7a4 4 0 0 1 8 0v3" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
            <span>
              O setor recebe somente dados agregados. Respostas, erros e notas
              individuais continuam privados.
            </span>
          </div>
          <div className="teams-hero-actions">
            <button type="button" className="primary-button" onClick={onOpenChallenge}>
              {latestResult ? "Ver ou refazer desafio" : "Fortalecer o escudo"}
            </button>
            <button type="button" className="text-button light" onClick={onBackToOverview}>
              Voltar à visão geral
            </button>
          </div>
        </div>
        <div className="teams-shield-card teams-shield-card--blueprint">
          <SectorShieldBlueprint score={metrics.score} level={metrics.shieldLevel} />
          <div className="teams-shield-caption">
            <strong>{metrics.score}/100</strong>
            <span>Escudo {metrics.shieldLevel}</span>
            <small>{teamName}</small>
          </div>
        </div>
      </section>

      <section className="teams-goal-panel teams-goal-panel--active" aria-labelledby="teams-goal-title">
        <div>
          <span className="section-kicker">Meta ativa</span>
          <h2 id="teams-goal-title">{goal.title}</h2>
          <p>{goal.description}</p>
        </div>
        <div className="teams-goal-progress">
          <progress
            value={metrics.score}
            max={goal.targetScore}
            aria-label={`Progresso da meta: ${metrics.score} de ${goal.targetScore}`}
            aria-describedby="teams-goal-progress-text"
          >
            {metrics.score} de {goal.targetScore}
          </progress>
          <p id="teams-goal-progress-text">
            <strong>{metrics.score}/{goal.targetScore}</strong>
            <span>
              {pointsToGoal === 0
                ? "Meta alcançada"
                : `${pointsToGoal === 1 ? "Falta" : "Faltam"} ${pointsToGoal} ${pointsToGoal === 1 ? "ponto" : "pontos"}`}
            </span>
          </p>
        </div>
      </section>

      <section className="teams-challenge-card teams-challenge-card--featured" aria-labelledby="current-team-challenge-title">
        <div className="teams-challenge-marker" aria-hidden="true">01</div>
        <div>
          <span className="section-kicker">Desafio atual · fortalece o escudo</span>
          <h2 id="current-team-challenge-title">Mudança bancária sem atalho</h2>
          <p>
            Resolva um caso completo de troca de conta perto do pagamento. Só a
            primeira conclusão atualiza o agregado; seu relatório permanece privado.
          </p>
          <div className="teams-challenge-meta">
            <span>1 caso · 5 decisões</span>
            <span>11 min</span>
            <span>{POINT_RULES.teamOperation} pontos-base</span>
            <span>{contribution ? "Contribuição registrada" : "Pronto para começar"}</span>
          </div>
        </div>
        <button type="button" className="primary-button dark" onClick={onOpenChallenge}>
          {latestResult ? "Abrir resultado" : "Começar desafio"}
        </button>
      </section>

      <section className="teams-metrics-section" aria-labelledby="teams-score-title">
        <div className="teams-section-heading">
          <div>
            <span className="section-kicker">Como o placar é calculado</span>
            <h2 id="teams-score-title">Três indicadores, nenhum ranking individual</h2>
          </div>
          <span className="teams-score-formula">40% + 40% + 20%</span>
        </div>
        <div className="teams-metric-grid">
          <article className="teams-metric-card teams-metric-card--participation">
            <header>
              <h3>Participação</h3>
              <span className="teams-metric-weight">40% da nota</span>
            </header>
            <strong>{formatPercentage(metrics.participation)}%</strong>
            <p>{aggregate.validParticipants} de {aggregate.eligibleParticipants} participantes elegíveis.</p>
          </article>
          <article className="teams-metric-card teams-metric-card--precision">
            <header>
              <h3>Precisão</h3>
              <span className="teams-metric-weight">40% da nota</span>
            </header>
            <strong>{formatPercentage(metrics.precision)}%</strong>
            <p>{aggregate.correctDecisions} de {aggregate.validDecisions} decisões agregadas.</p>
          </article>
          <article className="teams-metric-card teams-metric-card--coverage">
            <header>
              <h3>Cobertura</h3>
              <span className="teams-metric-weight">20% da nota</span>
            </header>
            <strong>{formatPercentage(metrics.coverage)}%</strong>
            <p>{aggregate.coveredCompetencyIds.length} de {aggregate.requiredCompetencyIds.length} competências cobertas.</p>
          </article>
        </div>
        <p className="teams-metric-note">
          Pontos gerais, tamanho bruto do setor e posições individuais no Arcade não entram nesta fórmula.
        </p>
      </section>

      <section className="teams-challenge-card teams-challenge-card--legacy">
        <div className="teams-challenge-marker" aria-hidden="true">05</div>
        <div>
          <span className="section-kicker">Desafio anterior disponível</span>
          <h2>Caixa de Entrada Segura</h2>
          <p>
            O desafio de cinco mensagens continua acessível, com tentativas,
            recompensa e contribuição preservadas separadamente.
          </p>
          <div className="teams-challenge-meta">
            <span>5 mensagens</span>
            <span>8–10 min</span>
            <span>{legacyCompleted ? "Concluído" : "Ainda não realizado"}</span>
          </div>
        </div>
        <button type="button" className="text-button" onClick={onOpenLegacyChallenge}>
          {legacyCompleted ? "Ver resultado anterior" : "Abrir desafio anterior"}
        </button>
      </section>

      <section className="teams-detail-grid">
        <article className="teams-ranking-panel">
          <div className="teams-section-heading compact">
            <div>
              <span className="section-kicker">Contexto coletivo</span>
              <h2>Seu setor no ranking normalizado</h2>
            </div>
            <span>{currentRanking ? `${currentRanking.position}º lugar` : "—"}</span>
          </div>
          <div className="teams-current-ranking">
            <span>Seu setor</span>
            <strong>{currentRanking ? `${currentRanking.position}º` : "—"}</strong>
            <small>{currentRanking ? `${currentRanking.score} pontos agregados` : "Posição indisponível"}</small>
          </div>
          <ol
            className="teams-ranking-list"
            aria-label="Classificação agregada dos setores"
          >
            {ranking.map((item) => (
              <li key={item.id} className={item.isCurrent ? "current" : ""}>
                <span>{item.position}</span>
                <strong>{item.name}</strong>
                <small>{item.score} pontos agregados</small>
              </li>
            ))}
          </ol>
          <p>
            A comparação usa somente indicadores normalizados por setor. Nenhuma
            resposta, nota ou identidade individual aparece na classificação.
          </p>
        </article>

        <article className="teams-private-panel">
          <span className="section-kicker">Visível somente para você</span>
          <h2>Sua contribuição privada</h2>
          {contribution && latestResult ? (
            <div className="teams-private-result">
              <strong>Registrada no agregado</strong>
              <span>{latestResult.correctDecisions} de {latestResult.totalDecisions} decisões corretas</span>
              <span>{rewardPoints} pontos confirmados</span>
              <small>Repetir o desafio não altera novamente o placar.</small>
            </div>
          ) : (
            <div className="teams-private-empty">
              <strong>Ainda sem contribuição neste desafio</strong>
              <p>Seu resultado aparecerá aqui, nunca no ranking coletivo.</p>
            </div>
          )}
          <div className="teams-privacy-rule">
            <span aria-hidden="true">Privado</span>
            <p>Outras pessoas não veem suas respostas, sua nota ou quais casos você errou.</p>
          </div>
        </article>
      </section>

      <section className="teams-history-panel">
        <div>
          <span className="section-kicker">Histórico coletivo</span>
          <h2>Marcos do setor</h2>
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
      <div className="page-stack team-challenge-page">
        <button type="button" className="text-button teams-back-button" onClick={onBackToTeams}>← Voltar para Equipes</button>
        <section className="team-briefing">
          <div>
            <span className="section-kicker">Desafio individual · resultado coletivo</span>
            <h1>Caixa de Entrada Segura</h1>
            <p>
              Você receberá cinco mensagens completas. Investigue o que precisar,
              escolha uma ação para cada uma e revise tudo antes de concluir.
            </p>
            <div className="team-briefing-rules">
              <article><strong>Privado</strong><span>Suas respostas e explicações são visíveis somente para você.</span></article>
              <article><strong>Sem pistas antecipadas</strong><span>O feedback aparece apenas depois das cinco decisões.</span></article>
              <article><strong>Contribuição única</strong><span>Só a primeira conclusão válida altera o placar do setor.</span></article>
            </div>
            <button type="button" className="primary-button" onClick={() => setStage("challenge")}>Começar os cinco casos</button>
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
      <div className="page-stack team-challenge-page">
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

        <section className="team-case-review">
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
        </section>

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
    <div className="page-stack team-challenge-page">
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
          <div className="team-evidence-tools">
            <span>Investigue antes de decidir</span>
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
            {!inspected.size ? <p>Escolha uma evidência para revelar os detalhes do caso.</p> : null}
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
      {!allAnswered ? <p className="team-completion-hint">Responda às cinco mensagens para liberar a conclusão. Nenhum feedback será mostrado antes disso.</p> : null}
    </div>
  );
}
