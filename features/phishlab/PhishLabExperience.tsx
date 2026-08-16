"use client";

import { useState, type CSSProperties } from "react";

import {
  PHISHLAB_ACTIVITY_ID,
  PHISHLAB_ACTIVITY_VERSION,
  POINT_RULES,
  SENDER_INSPECTOR_ACTIVITY_ID,
} from "@/lib/domain/rules";
import {
  DOMAIN_UNDER_MAGNIFIER_V1_PACKAGE,
  type DomainAnalyzerToolKey,
} from "@/lib/content/activities/domain-under-magnifier/v1";
import type {
  LinkEvidenceKey,
  LinkToolKey,
  LinkVerdict,
  DomainAnalyzerV2Result,
  PhishLabAnswer,
  PhishLabResult,
  TrueSenderV2Result,
} from "@/lib/domain/types";

type PhishLabHubProps = {
  recommendedActivityId: string | null;
  domainResult: PhishLabResult | DomainAnalyzerV2Result | null;
  domainRewardPoints: number;
  senderResult: PhishLabResult | TrueSenderV2Result | null;
  senderRewardPoints: number;
  onOpenAnalyzer: () => void;
  onOpenSenderInspector: () => void;
  onBackToOverview: () => void;
};

const stations = [
  {
    id: "sender-inspector",
    eyebrow: "Estação 01 · Disponível",
    title: "Quem enviou de verdade?",
    summary:
      "Compare nome exibido, endereço completo, Reply-To e contexto antes de confiar na identidade de quem escreveu.",
    meta: "Mapa de identidade · 9 min · Confirmar",
    target: "sender",
    playable: true,
  },
  {
    id: "link-analyzer",
    eyebrow: "Estação 02 · Disponível",
    title: "Domínio sob a lupa",
    summary:
      "Separe um endereço em partes, identifique o domínio registrado e confirme a técnica em um novo exemplo.",
    meta: "2 casos · 8 min · Investigar",
    target: "domain",
    playable: true,
  },
  {
    id: "mirror-page",
    eyebrow: "Estação 03 · Em produção",
    title: "Espelho de Página",
    summary:
      "Compare uma página fictícia legítima com uma imitação e descubra por que a aparência não comprova identidade.",
    meta: "Comparação visual · Verificar",
    target: null,
    playable: false,
  },
  {
    id: "incident-line",
    eyebrow: "Estação 04 · Em produção",
    title: "Linha do Incidente",
    summary:
      "Organize acontecimentos depois de uma interação e pratique a ordem correta de contenção e reporte.",
    meta: "Resposta ao incidente · Recuperar",
    target: null,
    playable: false,
  },
] as const;

export function PhishLabHub({
  recommendedActivityId,
  domainResult,
  domainRewardPoints,
  senderResult,
  senderRewardPoints,
  onOpenAnalyzer,
  onOpenSenderInspector,
  onBackToOverview,
}: PhishLabHubProps) {
  const recommendedTitle =
    recommendedActivityId === SENDER_INSPECTOR_ACTIVITY_ID
      ? "Confirmar quem está por trás do pedido"
      : recommendedActivityId === PHISHLAB_ACTIVITY_ID
        ? "Analisar o domínio antes de confiar"
        : "Escolha a investigação que quer praticar";
  const isRecommended = Boolean(recommendedActivityId);

  return (
    <div className="page-stack lab-page">
      <section className="lab-hero">
        <div>
          <span className="section-badge">Laboratório de investigação</span>
          <h1>PhishLab</h1>
          <p>
            Examine um artefato por vez, use ferramentas de análise e confirme o
            raciocínio em um exemplo diferente.
          </p>
          <div className="lab-hero-actions">
            <button
              type="button"
              className="primary-button dark"
              onClick={onOpenSenderInspector}
            >
              {senderResult
                ? "Reabrir Quem enviou de verdade?"
                : "Abrir Quem enviou de verdade?"}
            </button>
            <button type="button" className="text-button light" onClick={onBackToOverview}>
              Voltar à visão geral <span aria-hidden="true">→</span>
            </button>
          </div>
        </div>
        <aside className={isRecommended ? "lab-recommendation active" : "lab-recommendation"}>
          <span>{isRecommended ? "Reforço recomendado" : "Prática opcional"}</span>
          <strong>{recommendedTitle}</strong>
          <p>
            {isRecommended
              ? "Esta estação foi indicada por uma dificuldade recente, mas não bloqueia a próxima Missão."
              : "Você pode praticar livremente sem alterar o avanço da jornada principal."}
          </p>
        </aside>
      </section>

      {senderResult || domainResult ? (
        <div className="lab-last-results" aria-label="Resultados do PhishLab">
          {senderResult ? (
            <section className="lab-last-result">
              <div>
                <span className="section-kicker">Resultado registrado</span>
                <h2>{senderResult.score}/100 em Quem enviou de verdade?</h2>
                <p>
                  {senderRewardPoints} pontos confirmados. O melhor resultado e as
                  evidências permanecem no Meu perfil.
                </p>
              </div>
              <button
                type="button"
                className="text-button"
                onClick={onOpenSenderInspector}
              >
                Ver resultado ou refazer <span aria-hidden="true">→</span>
              </button>
            </section>
          ) : null}
          {domainResult ? (
            <section className="lab-last-result">
              <div>
                <span className="section-kicker">Resultado registrado</span>
                <h2>{domainResult.score}/100 em Domínio sob a lupa</h2>
                <p>
                  {domainRewardPoints} pontos confirmados. O melhor resultado e as
                  evidências permanecem no Meu perfil.
                </p>
              </div>
              <button type="button" className="text-button" onClick={onOpenAnalyzer}>
                Ver resultado ou refazer <span aria-hidden="true">→</span>
              </button>
            </section>
          ) : null}
        </div>
      ) : null}

      <section className="content-section compact">
        <div className="section-heading-row">
          <div>
            <span className="section-kicker">Estações</span>
            <h2>Escolha o que investigar</h2>
          </div>
          <p>
            Duas estações estão jogáveis neste recorte. As demais permanecem
            visíveis para mostrar a expansão planejada.
          </p>
        </div>
        <div className="lab-station-grid">
          {stations.map((station) => (
            <article key={station.id} className={station.playable ? "is-playable" : "is-future"}>
              <span>{station.eyebrow}</span>
              <h3>{station.title}</h3>
              <p>{station.summary}</p>
              <small>{station.meta}</small>
              <button
                type="button"
                disabled={!station.playable}
                onClick={
                  station.target === "sender"
                    ? onOpenSenderInspector
                    : station.target === "domain"
                      ? onOpenAnalyzer
                      : undefined
                }
              >
                {station.playable ? "Abrir estação" : "Conteúdo futuro"}
              </button>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

const domainAnalyzerContent = DOMAIN_UNDER_MAGNIFIER_V1_PACKAGE.content;
const toolContent = domainAnalyzerContent.tools;
const evidenceOptions = domainAnalyzerContent.evidenceOptions;

const verdictLabels: Record<LinkVerdict, string> = {
  legitimate: "Legítimo",
  suspicious: "Suspeito",
  inconclusive: "Inconclusivo",
};

type LinkAnalyzerProps = {
  existingResult: PhishLabResult | null;
  rewardAlreadyClaimed: boolean;
  claimedPoints: number;
  onComplete: (answer: PhishLabAnswer) => Promise<PhishLabResult>;
  onBackToHub: () => void;
  onOpenSimulation: () => void;
  onOpenProfile: () => void;
};

export function LinkAnalyzer({
  existingResult,
  rewardAlreadyClaimed,
  claimedPoints,
  onComplete,
  onBackToHub,
  onOpenSimulation,
  onOpenProfile,
}: LinkAnalyzerProps) {
  const [stage, setStage] = useState(existingResult ? 3 : 0);
  const [usedTools, setUsedTools] = useState<LinkToolKey[]>([]);
  const [usedHint, setUsedHint] = useState(false);
  const [guidedVerdict, setGuidedVerdict] = useState<LinkVerdict | null>(null);
  const [independentVerdict, setIndependentVerdict] =
    useState<LinkVerdict | null>(null);
  const [independentEvidence, setIndependentEvidence] = useState<
    LinkEvidenceKey[]
  >([]);
  const [displayResult, setDisplayResult] = useState(existingResult);
  const [rewardGrantedInAttempt, setRewardGrantedInAttempt] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const inspectTool = (tool: LinkToolKey) => {
    setUsedTools((current) =>
      current.includes(tool) ? current : [...current, tool],
    );
  };

  const toggleEvidence = (evidence: LinkEvidenceKey) => {
    setIndependentEvidence((current) =>
      current.includes(evidence)
        ? current.filter((item) => item !== evidence)
        : [...current, evidence],
    );
  };

  const finish = async () => {
    if (!guidedVerdict || !independentVerdict || independentEvidence.length === 0) {
      return;
    }
    setIsSubmitting(true);
    setError("");
    const grantsFirstReward = !rewardAlreadyClaimed;

    try {
      const result = await onComplete({
        activityId: PHISHLAB_ACTIVITY_ID,
        activityVersion: PHISHLAB_ACTIVITY_VERSION,
        usedTools,
        usedHint,
        guidedVerdict,
        independentVerdict,
        independentEvidence,
      });
      setDisplayResult(result);
      setRewardGrantedInAttempt(grantsFirstReward);
      setStage(3);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      setError("Não foi possível registrar o laboratório. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const reset = () => {
    setStage(0);
    setUsedTools([]);
    setUsedHint(false);
    setGuidedVerdict(null);
    setIndependentVerdict(null);
    setIndependentEvidence([]);
    setDisplayResult(null);
    setRewardGrantedInAttempt(false);
    setError("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const bonusPoints = displayResult
    ? displayResult.potentialReward - POINT_RULES.phishLab
    : 0;

  return (
    <div className="page-stack lab-player-page">
      <section className="lab-player-shell">
        <header className="lab-player-header">
          <div>
            <span className="section-badge">PhishLab · Domínio sob a lupa</span>
            <h1>Encontre o domínio real</h1>
            <p>Dois exemplos fictícios e seguros, sem abrir nenhum endereço.</p>
          </div>
          <div className="lab-stage-indicator" aria-label={`Etapa ${Math.min(stage + 1, 4)} de 4`}>
            {[0, 1, 2, 3].map((item) => (
              <span key={item} className={stage >= item ? "active" : ""} />
            ))}
          </div>
        </header>

        {stage === 0 ? (
          <div className="lab-briefing">
            <div>
              <span className="section-kicker">Como funciona</span>
              <h2>Primeiro com apoio, depois sem pistas</h2>
              <p>
                No primeiro caso, você escolhe ferramentas para desmontar o endereço.
                No segundo, precisa aplicar sozinho a mesma técnica.
              </p>
              <ul>
                <li>Não existe limite de tempo.</li>
                <li>HTTPS não comprova a identidade do site.</li>
                <li>A nota não interfere na próxima Missão.</li>
              </ul>
            </div>
            <aside>
              <span>Recompensa-base</span>
              <strong>{POINT_RULES.phishLab} pontos</strong>
              <p>Bônus de até 30% na primeira conclusão.</p>
            </aside>
            <div className="lab-player-actions">
              <button type="button" className="primary-button dark" onClick={() => setStage(1)}>
                Começar caso guiado
              </button>
              <button type="button" className="text-button" onClick={onBackToHub}>
                Voltar às estações
              </button>
            </div>
          </div>
        ) : null}

        {stage === 1 ? (
          <div className="link-case-grid">
            <section className="link-artifact-card">
              <span className="section-kicker">Caso 1 · Guiado</span>
              <h2>{domainAnalyzerContent.guidedCase.title}</h2>
              <p className="safe-url">{domainAnalyzerContent.guidedCase.url}</p>
              <p>{domainAnalyzerContent.guidedCase.context}</p>
              <div className="link-tool-grid">
                {(Object.keys(toolContent) as DomainAnalyzerToolKey[]).map((tool) => (
                  <button
                    type="button"
                    key={tool}
                    className={usedTools.includes(tool) ? "active" : ""}
                    onClick={() => inspectTool(tool)}
                  >
                    <span>{toolContent[tool].label}</span>
                    <small>{usedTools.includes(tool) ? toolContent[tool].value : "Analisar"}</small>
                  </button>
                ))}
              </div>
              <button type="button" className="hint-button" onClick={() => setUsedHint(true)}>
                {usedHint ? "Pista: leia o endereço da direita para a esquerda." : "Solicitar uma pista opcional"}
              </button>
            </section>
            <aside className="link-conclusion-card">
              <span className="section-kicker">Sua conclusão</span>
              <h2>Você confiaria neste endereço?</h2>
              <div className="choice-stack">
                {(Object.keys(verdictLabels) as LinkVerdict[]).map((verdict) => (
                  <label key={verdict} className={guidedVerdict === verdict ? "selected" : ""}>
                    <input
                      type="radio"
                      name="guided-verdict"
                      checked={guidedVerdict === verdict}
                      onChange={() => setGuidedVerdict(verdict)}
                    />
                    <span>{verdictLabels[verdict]}</span>
                  </label>
                ))}
              </div>
              <button
                type="button"
                className="primary-button dark"
                disabled={!guidedVerdict}
                onClick={() => {
                  setStage(2);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              >
                Confirmar e abrir novo exemplo
              </button>
            </aside>
          </div>
        ) : null}

        {stage === 2 ? (
          <div className="independent-case">
            <div className="independent-case-heading">
              <span className="section-kicker">Caso 2 · Independente</span>
              <h2>{domainAnalyzerContent.independentCase.title}</h2>
              <p className="safe-url">{domainAnalyzerContent.independentCase.url}</p>
              <p>Contexto: {domainAnalyzerContent.independentCase.context}</p>
            </div>
            <div className="independent-columns">
              <section>
                <h3>Quais evidências sustentam sua decisão?</h3>
                <div className="evidence-choice-list">
                  {evidenceOptions.map((evidence) => (
                    <label
                      key={evidence.id}
                      className={independentEvidence.includes(evidence.id) ? "selected" : ""}
                    >
                      <input
                        type="checkbox"
                        checked={independentEvidence.includes(evidence.id)}
                        onChange={() => toggleEvidence(evidence.id)}
                      />
                      <span>{evidence.label}</span>
                    </label>
                  ))}
                </div>
              </section>
              <aside>
                <h3>Qual é sua conclusão?</h3>
                <div className="choice-stack">
                  {(Object.keys(verdictLabels) as LinkVerdict[]).map((verdict) => (
                    <label key={verdict} className={independentVerdict === verdict ? "selected" : ""}>
                      <input
                        type="radio"
                        name="independent-verdict"
                        checked={independentVerdict === verdict}
                        onChange={() => setIndependentVerdict(verdict)}
                      />
                      <span>{verdictLabels[verdict]}</span>
                    </label>
                  ))}
                </div>
                {error ? <p className="form-error" role="alert">{error}</p> : null}
                <button
                  type="button"
                  className="primary-button dark"
                  disabled={!independentVerdict || independentEvidence.length === 0 || isSubmitting}
                  onClick={finish}
                >
                  {isSubmitting ? "Registrando..." : "Concluir estação"}
                </button>
              </aside>
            </div>
          </div>
        ) : null}

        {stage === 3 && displayResult ? (
          <div className="lab-result-view">
            <div className="result-hero compact-result">
              <div>
                <span className="section-badge">Estação concluída</span>
                <h2>{displayResult.score}/100</h2>
                <p>
                  Você concluiu o exemplo guiado e aplicou a técnica em um endereço diferente.
                </p>
              </div>
              <div className="score-ring" style={{ "--score": displayResult.score } as CSSProperties}>
                <strong>{displayResult.score}</strong>
                <span>desempenho</span>
              </div>
            </div>
            <div className="lab-result-grid">
              <article><span>Evidências</span><strong>{displayResult.evidencePoints}/30</strong><p>Qualidade dos sinais selecionados.</p></article>
              <article><span>Conclusão guiada</span><strong>{displayResult.conclusionPoints}/25</strong><p>Leitura correta do primeiro endereço.</p></article>
              <article><span>Ferramentas</span><strong>{displayResult.toolsPoints}/20</strong><p>{displayResult.usedTools}/4 ferramentas utilizadas.</p></article>
              <article><span>Caso independente</span><strong>{displayResult.independentPoints}/25</strong><p>Aplicação sem ajuda.</p></article>
              <article className="reward-result-card">
                <span>Pontos gerais</span>
                <strong>{rewardGrantedInAttempt ? `+${displayResult.potentialReward}` : `${claimedPoints} registrados`}</strong>
                <p>Base {POINT_RULES.phishLab} + bônus de {bonusPoints} pontos. Repetições não duplicam a recompensa.</p>
              </article>
            </div>
            <div className="learning-debrief">
              <span className="section-kicker">Raciocínio principal</span>
              <h2>{DOMAIN_UNDER_MAGNIFIER_V1_PACKAGE.debrief.title}</h2>
              <p>{DOMAIN_UNDER_MAGNIFIER_V1_PACKAGE.debrief.body}</p>
            </div>
            <div className="adaptive-next-panel">
              <div>
                <span className="section-kicker inverse">Próxima prática</span>
                <h2>Aplicar a técnica em uma caixa completa</h2>
                <p>Uma manhã comum mistura mensagens legítimas, phishing e pedidos que exigem verificação.</p>
              </div>
              <button type="button" className="primary-button light" onClick={onOpenSimulation}>
                Ver Simulação recomendada
              </button>
            </div>
            <div className="result-actions">
              <button type="button" className="text-button" onClick={onOpenProfile}>Ver no Meu perfil</button>
              <button type="button" className="text-button" onClick={reset}>Refazer laboratório</button>
              <button type="button" className="text-button" onClick={onBackToHub}>Voltar às estações</button>
            </div>
          </div>
        ) : null}
      </section>
    </div>
  );
}
