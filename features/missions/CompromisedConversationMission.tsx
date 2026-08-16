"use client";

import { useState } from "react";

import {
  calculatePerformanceBonus,
  COMPROMISED_CONVERSATION_MISSION_ID,
  COMPROMISED_CONVERSATION_MISSION_VERSION,
  POINT_RULES,
} from "@/lib/domain/rules";
import type {
  DecisionKey,
  EvidenceKey,
  MissionAnswer,
  MissionResult,
  ReasonKey,
} from "@/lib/domain/types";

type CompromisedConversationMissionProps = {
  existingResult: MissionResult | null;
  rewardAlreadyClaimed: boolean;
  claimedPoints: number;
  onComplete: (answer: MissionAnswer) => Promise<MissionResult>;
  onBackToMissions: () => void;
  onOpenSenderLab: () => void;
  onOpenProfile: () => void;
};

const steps = ["Briefing", "Investigar", "Decidir", "Resultado"] as const;

const conversation = [
  {
    id: "previous-one",
    label: "Mensagem anterior · 3 dias atrás",
    sender: "Marina Lopes · Lumen Suprimentos",
    address: "marina.lopes@lumen-suprimentos.example",
    body:
      "Olá, Lucas. A relação final dos materiais já está no portal habitual da Lumen. Assim que você revisar, seguimos com a entrega de quinta-feira.",
    suspicious: false,
  },
  {
    id: "previous-two",
    label: "Sua resposta · 2 dias atrás",
    sender: "Lucas",
    address: "lucas@casa-digital.example",
    body:
      "Obrigado, Marina. Consultei pelo portal que usamos normalmente e os itens estão corretos. Pode manter a entrega combinada.",
    suspicious: false,
  },
  {
    id: "latest",
    label: "Nova mensagem · agora",
    sender: "Marina Lopes · Lumen Suprimentos",
    address: "marina.lopes@lumen-suprimentos.example",
    body:
      "Lucas, preciso de uma ajuda rápida: o arquivo anterior expirou e estou em deslocamento. Abra a cópia no novo acesso abaixo e entre com sua conta corporativa nos próximos 20 minutos para não perdermos a entrega.",
    destination: "https://lumen.documentos-seguros.example/revisao",
    suspicious: true,
  },
] as const;

const evidenceDetails: Record<
  EvidenceKey,
  { label: string; title: string; detail: string }
> = {
  sender: {
    label: "Examinar remetente",
    title: "O endereço é verdadeiro",
    detail:
      "A mensagem saiu da conta usada anteriormente. Isso reduz a chance de personificação simples, mas não descarta que a conta tenha sido comprometida.",
  },
  link: {
    label: "Examinar destino",
    title: "O destino mudou",
    detail:
      "O novo endereço termina em documentos-seguros.example, e não no domínio conhecido lumen-suprimentos.example nem no portal já utilizado.",
  },
  context: {
    label: "Comparar contexto",
    title: "O processo mudou sob pressão",
    detail:
      "A conversa anterior dizia que a revisão já estava concluída. A nova mensagem muda o portal, pede autenticação e cria um prazo de 20 minutos.",
  },
};

const decisionOptions: ReadonlyArray<{
  id: DecisionKey;
  title: string;
  detail: string;
}> = [
  {
    id: "reportar",
    title: "Interromper, reconfirmar e reportar",
    detail:
      "Usar um contato conhecido da Lumen, confirmar fora da conversa e avisar o canal oficial sobre a possível conta comprometida.",
  },
  {
    id: "verificar",
    title: "Confirmar por outro canal conhecido",
    detail:
      "Não abrir o endereço e procurar a Marina pelo telefone ou cadastro já utilizado, sem usar dados fornecidos nesta mensagem.",
  },
  {
    id: "excluir",
    title: "Excluir e seguir o trabalho",
    detail:
      "Evitar a interação, mas não confirmar o pedido nem alertar outras pessoas sobre a possível conta comprometida.",
  },
  {
    id: "abrir",
    title: "Abrir o novo acesso",
    detail:
      "Confiar no histórico da conversa e autenticar no endereço enviado para não atrasar a entrega.",
  },
];

const reasonOptions: ReadonlyArray<{ id: ReasonKey; label: string }> = [
  {
    id: "domain",
    label:
      "O endereço do remetente é conhecido, mas uma conta verdadeira também pode estar sob controle de um atacante.",
  },
  {
    id: "urgency",
    label: "O prazo curto tenta reduzir o tempo disponível para confirmar o pedido.",
  },
  {
    id: "destination",
    label: "O novo destino não pertence ao portal ou ao domínio usado anteriormente.",
  },
  {
    id: "visual",
    label: "O nome conhecido e a conversa antiga são suficientes para confiar.",
  },
];

function consequenceFor(decision: DecisionKey): string {
  if (decision === "reportar") {
    return "Você interrompeu o pedido, preservou o processo e ajudou a proteger outras pessoas que também podem receber mensagens da conta comprometida.";
  }
  if (decision === "verificar") {
    return "Você evitou o novo destino e escolheu uma confirmação independente. Se o contato negar o pedido, o próximo passo é reportar a possível conta comprometida.";
  }
  if (decision === "excluir") {
    return "Você evitou a interação, mas a conta pode continuar enviando pedidos para outras pessoas. Confirmar e reportar amplia a proteção coletiva.";
  }
  return "Em uma situação real, abrir o novo destino e autenticar poderia expor credenciais. O comportamento seguro seria interromper, reportar e seguir a orientação de recuperação.";
}

export function CompromisedConversationMission({
  existingResult,
  rewardAlreadyClaimed,
  claimedPoints,
  onComplete,
  onBackToMissions,
  onOpenSenderLab,
  onOpenProfile,
}: CompromisedConversationMissionProps) {
  const [stage, setStage] = useState(existingResult ? 3 : 0);
  const [inspectedEvidence, setInspectedEvidence] = useState<EvidenceKey[]>([]);
  const [decision, setDecision] = useState<DecisionKey | null>(null);
  const [selectedReasons, setSelectedReasons] = useState<ReasonKey[]>([]);
  const [displayResult, setDisplayResult] = useState<MissionResult | null>(
    existingResult,
  );
  const [rewardGrantedInAttempt, setRewardGrantedInAttempt] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState("");

  const inspectEvidence = (key: EvidenceKey) => {
    setInspectedEvidence((current) =>
      current.includes(key) ? current : [...current, key],
    );
  };

  const toggleReason = (reasonId: ReasonKey) => {
    setSelectedReasons((current) =>
      current.includes(reasonId)
        ? current.filter((item) => item !== reasonId)
        : [...current, reasonId],
    );
  };

  const finishMission = async () => {
    if (!decision || selectedReasons.length === 0 || isSubmitting) return;

    setIsSubmitting(true);
    setSubmissionError("");
    const grantsFirstReward = !rewardAlreadyClaimed;

    try {
      const result = await onComplete({
        activityId: COMPROMISED_CONVERSATION_MISSION_ID,
        activityVersion: COMPROMISED_CONVERSATION_MISSION_VERSION,
        decision,
        inspectedEvidence,
        selectedReasonIds: selectedReasons,
      });
      setDisplayResult(result);
      setRewardGrantedInAttempt(grantsFirstReward);
      setStage(3);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      setSubmissionError(
        "Não foi possível registrar a tentativa. Tente novamente.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const reset = () => {
    setStage(0);
    setInspectedEvidence([]);
    setDecision(null);
    setSelectedReasons([]);
    setDisplayResult(null);
    setRewardGrantedInAttempt(false);
    setSubmissionError("");
    setIsSubmitting(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const bonusPoints = displayResult
    ? displayResult.potentialReward - POINT_RULES.mainMission
    : 0;
  const bonusPercentage = displayResult
    ? Math.round(calculatePerformanceBonus(displayResult.score) * 100)
    : 0;

  return (
    <div className="page-stack mission-page compromised-mission-page">
      <section className="mission-shell">
        <header className="mission-header">
          <div>
            <span className="section-badge">Confiança sob pressão · Etapa 01</span>
            <h1>A conversa já estava acontecendo</h1>
            <p>
              O endereço e o histórico são verdadeiros. Descubra por que isso ainda
              não torna seguro o novo pedido.
            </p>
          </div>
          <div className="mission-meta" aria-label="Informações da missão">
            <span>Tempo estimado</span>
            <strong>9 minutos</strong>
            <small>{POINT_RULES.mainMission} pontos-base</small>
          </div>
        </header>

        <ol className="mission-stepper" aria-label="Etapas da missão">
          {steps.map((step, index) => (
            <li
              key={step}
              className={index === stage ? "active" : index < stage ? "complete" : ""}
              aria-current={index === stage ? "step" : undefined}
            >
              <span>{index < stage ? "✓" : index + 1}</span>
              <strong>{step}</strong>
            </li>
          ))}
        </ol>

        <div className="mission-content" aria-live="polite">
          {stage === 0 ? (
            <div className="mission-briefing">
              <div className="briefing-copy">
                <span className="section-kicker">Seu papel</span>
                <h2>Investigue a mudança, não apenas a aparência</h2>
                <p>
                  Você acompanha uma entrega com Marina, de um fornecedor conhecido.
                  Depois de mensagens normais, a mesma conta envia um pedido urgente
                  para usar outro portal e entrar com a conta corporativa.
                </p>
                <div className="briefing-callout">
                  <span aria-hidden="true">!</span>
                  <p>
                    Todos os nomes, endereços e domínios são fictícios. Nenhum link
                    será aberto e nenhuma credencial será solicitada.
                  </p>
                </div>
              </div>
              <div className="briefing-objectives">
                <span className="section-kicker">Objetivos avaliados</span>
                <ul>
                  <li><span>01</span> Separar conta legítima de pedido seguro</li>
                  <li><span>02</span> Comparar processo, destino e urgência</li>
                  <li><span>03</span> Reconfirmar por um caminho independente</li>
                </ul>
                <button
                  type="button"
                  className="primary-button dark"
                  onClick={() => setStage(1)}
                >
                  Abrir conversa simulada
                </button>
              </div>
            </div>
          ) : null}

          {stage === 1 ? (
            <div className="compromised-workspace">
              <section className="conversation-panel" aria-labelledby="conversation-title">
                <div className="conversation-panel__heading">
                  <div>
                    <span className="simulation-label">Ambiente seguro · thread fictícia</span>
                    <h2 id="conversation-title">Entrega de materiais — confirmação final</h2>
                  </div>
                  <span>3 mensagens</span>
                </div>
                <ol className="conversation-thread">
                  {conversation.map((message) => (
                    <li key={message.id} className={message.suspicious ? "is-latest" : ""}>
                      <span>{message.label}</span>
                      <strong>{message.sender}</strong>
                      <small>&lt;{message.address}&gt;</small>
                      <p>{message.body}</p>
                      {"destination" in message ? (
                        <code>{message.destination}</code>
                      ) : null}
                    </li>
                  ))}
                </ol>
              </section>

              <aside className="conversation-investigation">
                <span className="section-kicker">Ferramentas de investigação</span>
                <h2>O que merece confirmação?</h2>
                <p>
                  Examine os três aspectos. O objetivo não é procurar um erro
                  grosseiro, mas entender o que mudou.
                </p>
                <div className="evidence-buttons conversation-evidence-buttons">
                  {(Object.keys(evidenceDetails) as EvidenceKey[]).map((key) => (
                    <button
                      type="button"
                      key={key}
                      className={inspectedEvidence.includes(key) ? "inspected" : ""}
                      onClick={() => inspectEvidence(key)}
                      aria-pressed={inspectedEvidence.includes(key)}
                    >
                      {inspectedEvidence.includes(key) ? "✓ " : ""}
                      {evidenceDetails[key].label}
                    </button>
                  ))}
                </div>
                <div className="conversation-findings" aria-live="polite">
                  {inspectedEvidence.map((key) => (
                    <div key={key}>
                      <strong>{evidenceDetails[key].title}</strong>
                      <p>{evidenceDetails[key].detail}</p>
                    </div>
                  ))}
                </div>
                <div className="mission-navigation">
                  <button type="button" className="text-button" onClick={() => setStage(0)}>
                    ← Voltar
                  </button>
                  <button
                    type="button"
                    className="primary-button dark"
                    disabled={inspectedEvidence.length < 2}
                    onClick={() => setStage(2)}
                  >
                    Tomar uma decisão
                  </button>
                </div>
                {inspectedEvidence.length < 2 ? (
                  <p className="mission-hint">
                    Faça pelo menos duas verificações para avançar.
                  </p>
                ) : null}
              </aside>
            </div>
          ) : null}

          {stage === 2 ? (
            <div className="decision-stage">
              <div className="decision-heading">
                <span className="section-kicker">Sua resposta</span>
                <h2>Como você trataria o novo pedido?</h2>
                <p>
                  Escolha a ação principal e indique quais evidências sustentam sua
                  decisão. Responder na própria conversa não confirma quem a controla.
                </p>
              </div>
              <fieldset className="decision-options">
                <legend>Ação principal</legend>
                {decisionOptions.map((option) => (
                  <label key={option.id} className={decision === option.id ? "selected" : ""}>
                    <input
                      type="radio"
                      name="compromised-conversation-decision"
                      checked={decision === option.id}
                      onChange={() => setDecision(option.id)}
                    />
                    <span>
                      <strong>{option.title}</strong>
                      <small>{option.detail}</small>
                    </span>
                  </label>
                ))}
              </fieldset>
              <fieldset className="reason-options">
                <legend>Quais evidências influenciaram sua decisão?</legend>
                {reasonOptions.map((reason) => (
                  <label key={reason.id}>
                    <input
                      type="checkbox"
                      checked={selectedReasons.includes(reason.id)}
                      onChange={() => toggleReason(reason.id)}
                    />
                    <span>{reason.label}</span>
                  </label>
                ))}
              </fieldset>
              {submissionError ? (
                <p className="form-error" role="alert">{submissionError}</p>
              ) : null}
              <div className="mission-navigation">
                <button type="button" className="text-button" onClick={() => setStage(1)}>
                  ← Rever conversa
                </button>
                <button
                  type="button"
                  className="primary-button dark"
                  disabled={!decision || selectedReasons.length === 0 || isSubmitting}
                  onClick={finishMission}
                >
                  {isSubmitting ? "Registrando..." : "Concluir Missão"}
                </button>
              </div>
            </div>
          ) : null}

          {stage === 3 && displayResult ? (
            <div className="mission-result">
              <div className={displayResult.needsReview ? "result-summary review" : "result-summary success"}>
                <div className="result-score">
                  <span>Resultado</span>
                  <strong>{displayResult.score}</strong>
                  <small>de 100</small>
                </div>
                <div>
                  <span className="section-kicker">
                    {displayResult.needsReview ? "Revisão recomendada" : "Resposta segura"}
                  </span>
                  <h2>{consequenceFor(displayResult.decision)}</h2>
                  <p>
                    O endereço correto mostra qual conta enviou a mensagem; somente
                    uma confirmação independente ajuda a saber quem controla a conta
                    e se o pedido é legítimo.
                  </p>
                </div>
              </div>

              <div className="result-grid">
                <article>
                  <span>Investigação</span>
                  <strong>{displayResult.inspected}/3 verificações</strong>
                  <p>Remetente, destino e contexto estavam disponíveis.</p>
                </article>
                <article>
                  <span>Justificativa</span>
                  <strong>{displayResult.correctReasons}/3 evidências</strong>
                  <p>A familiaridade visual não conta como prova.</p>
                </article>
                <article>
                  <span>Pontos gerais</span>
                  <strong>
                    {rewardGrantedInAttempt
                      ? `+${displayResult.potentialReward}`
                      : `${claimedPoints} registrados`}
                  </strong>
                  <p>
                    Base {POINT_RULES.mainMission} + bônus de {bonusPercentage}% ({bonusPoints}
                    pontos). Repetições não duplicam a recompensa.
                  </p>
                </article>
              </div>

              <div className="learning-debrief">
                <span className="section-kicker">Raciocínio principal</span>
                <h2>Pare → Analise → Reconfirme → Encaminhe</h2>
                <p>
                  Uma conta comprometida preserva nome, endereço e histórico. Compare
                  o pedido com o processo esperado, não reutilize o destino recebido e
                  confirme por um contato conhecido fora da conversa. Se houver
                  divergência, reporte rapidamente e preserve as evidências.
                </p>
              </div>

              <div className="adaptive-next-panel">
                <div>
                  <span className="section-kicker inverse">Próxima atividade</span>
                  <h2>Quem enviou de verdade?</h2>
                  <p>
                    Compare nome exibido, endereço completo, Reply-To e contexto em
                    dois casos diferentes.
                  </p>
                </div>
                <button type="button" className="primary-button light" onClick={onOpenSenderLab}>
                  Abrir PhishLab
                </button>
              </div>

              <div className="result-actions">
                <button type="button" className="text-button" onClick={onOpenProfile}>
                  Ver no Meu perfil
                </button>
                <button type="button" className="text-button" onClick={reset}>
                  Refazer Missão
                </button>
                <button type="button" className="text-button" onClick={onBackToMissions}>
                  Voltar ao percurso
                </button>
              </div>
            </div>
          ) : null}
        </div>
      </section>

      <section className="mission-connection">
        <span className="section-kicker">Comportamento seguro</span>
        <p>
          Confirmar por outro canal significa usar um número, aplicativo, portal ou
          contato já conhecido — nunca um caminho fornecido pelo próprio pedido.
        </p>
      </section>
    </div>
  );
}
