"use client";

import { useRef, useState, type CSSProperties } from "react";

import { ActivityShell } from "@/features/activities/ActivityShell";
import {
  ActivityAnswerReview,
  type ActivityAnswerReviewItem,
} from "@/features/activities/primitives/ActivityAnswerReview";
import { ActivityError } from "@/features/activities/primitives/ActivityError";
import { ActivityProgress } from "@/features/activities/primitives/ActivityProgress";
import { useActivityStageFocus } from "@/features/activities/useActivityStageFocus";
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
  "Debrief",
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
};

function packageById(casePackageId: string): DomainAnalyzerV2Package {
  return (
    DOMAIN_UNDER_MAGNIFIER_V2_PACKAGES.find(
      (contentPackage) => contentPackage.casePackageId === casePackageId,
    ) ?? DOMAIN_UNDER_MAGNIFIER_V2_PACKAGES[0]
  );
}

function SegmentTable({
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
  return (
    <div className="url-anatomy-table-wrap">
      <table className="url-anatomy-table">
        <caption>
          Atribua uma função a cada trecho. A pontuação e a resposta só aparecem
          depois do envio.
        </caption>
        <thead>
          <tr>
            <th scope="col">Trecho</th>
            <th scope="col">Função atribuída</th>
          </tr>
        </thead>
        <tbody>
          {segments.map((segment, index) => (
            <tr key={segment.id}>
              <th scope="row">
                <span>Trecho {index + 1}</span>
                <code>{segment.value || "(sem subdomínio)"}</code>
              </th>
              <td>
                <label>
                  <span className="sr-only">
                    Função do trecho {segment.value || "sem subdomínio"}
                  </span>
                  <select
                    value={assignments[segment.id] ?? ""}
                    onChange={(event) =>
                      onAssign(
                        segment.id,
                        event.target.value as UrlSegmentRoleId,
                      )
                    }
                  >
                    <option value="">Selecione</option>
                    {roleOptions.map((role) => (
                      <option key={role.id} value={role.id}>
                        {role.label}
                      </option>
                    ))}
                  </select>
                </label>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
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
}: DomainUnderMagnifierLabProps) {
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
  const stageTitleRef = useActivityStageFocus(stage);
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
    setSegmentRoleById((current) => ({ ...current, [segmentId]: roleId }));
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

  return (
    <ActivityShell
      className="page-stack lab-player-page url-anatomy-page"
      activityId={DOMAIN_ANALYZER_V2_ACTIVITY_ID}
    >
      <section className="lab-player-shell url-anatomy-shell">
        <header className="lab-player-header">
          <div>
            <span className="section-badge">PhishLab · versão 2</span>
            <h1>Domínio sob a lupa</h1>
            <p>
              Aprenda a encontrar a origem de um endereço antes de abrir qualquer
              página. Todos os exemplos são fictícios e não funcionam como links.
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
          ariaLabel="Progresso de Domínio sob a lupa"
        />

        <div className="url-anatomy-workspace" aria-live="polite">
          {stage === 0 ? (
            <div className="url-anatomy-opening">
              <div className="url-anatomy-opening__heading">
                <span className="section-kicker">Antes de começar</span>
                <h2 ref={stageTitleRef} tabIndex={-1}>
                  Descubra qual domínio controla a origem do endereço
                </h2>
                <p>
                  Este laboratório atribui um caso por tentativa. Você primeiro verá
                  um exemplo resolvido e depois fará a análise sem marcações prontas.
                </p>
              </div>
              <aside className="url-anatomy-assigned-case">
                <span>Caso atribuído</span>
                <strong>{content.pathLabel}</strong>
                <p>{content.summary}</p>
                <small>Os outros casos ficam disponíveis quando você escolher praticar novamente.</small>
              </aside>
              <div className="url-anatomy-briefing-grid">
                <article><span>Seu papel</span><p>{content.role}</p></article>
                <article><span>O que aconteceu</span><p>{content.situation}</p></article>
                <article><span>Sua tarefa</span><p>{content.task}</p></article>
                <article><span>O que esta análise protege</span><p>{content.protectedConsequence}</p></article>
              </div>
              <div className="lab-player-actions">
                <button
                  type="button"
                  className="primary-button dark"
                  onClick={() => goTo(1)}
                >
                  Aprender a separar o endereço
                </button>
                <button type="button" className="text-button" onClick={onBackToHub}>
                  Voltar às estações
                </button>
              </div>
            </div>
          ) : null}

          {stage === 1 ? (
            <div className="url-anatomy-investigation">
              {!calibrationAcknowledged ? (
                <section className="url-calibration-card">
                  <span className="section-kicker">Calibração curta</span>
                  <h2 ref={stageTitleRef} tabIndex={-1}>
                    {content.calibration.title}
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
                    Aplicar sem marcações prontas
                  </button>
                </section>
              ) : (
                <section>
                  <span className="section-kicker">Caso principal · {content.pathLabel}</span>
                  <h2 ref={calibrationTitleRef} tabIndex={-1}>
                    {content.mainCase.title}
                  </h2>
                  <p>{content.mainCase.context}</p>
                  <p className="url-anatomy-instruction">
                    <strong>Sua tarefa agora:</strong> classifique cada trecho pela
                    função que ele exerce. Ainda não decida se o endereço é seguro;
                    primeiro encontre o domínio registrado.
                  </p>
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
                  <SegmentTable
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
                      Concluir a anatomia e decidir
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
            <div className="url-anatomy-decision">
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
            <div className="url-anatomy-consequence">
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
            <div className="url-anatomy-review">
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
            <div className="url-anatomy-final">
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
            <div className="url-anatomy-transfer">
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
                  <article className="reward-result-card">
                    <span>Pontos gerais</span>
                    <strong>
                      {rewardGrantedInAttempt
                        ? `+${displayResult.potentialReward}`
                        : `${claimedPoints} registrados`}
                    </strong>
                    <p>
                      Base {POINT_RULES.phishLab} + bônus de {bonusPoints}. A versão
                      2 não reabre recompensa anterior.
                    </p>
                  </article>
                </div>
                <ActivityAnswerReview
                  items={answerReviewItems}
                /></>
              ) : (
                <div className="legacy-result-notice">
                  <strong>A tentativa antiga foi preservada sem reinterpretação.</strong>
                  <p>
                    Refazer inicia a versão 2. Os pontos e a conclusão da versão 1
                    continuam válidos e não serão concedidos novamente.
                  </p>
                </div>
              )}
              <div className="result-actions">
                <button
                  type="button"
                  className="primary-button dark"
                  onClick={() => goTo(8)}
                >
                  Ver debrief
                </button>
                <button type="button" className="text-button" onClick={onOpenProfile}>
                  Ver no Meu perfil
                </button>
                <button type="button" className="text-button" onClick={reset}>
                  Refazer laboratório
                </button>
              </div>
            </div>
          ) : null}

          {stage === 8 && displayResult ? (
            <div className="url-anatomy-debrief">
              <span className="section-kicker">Debrief</span>
              <h2 ref={stageTitleRef} tabIndex={-1}>
                {isV2Result
                  ? contentPackage.debrief.title
                  : DOMAIN_UNDER_MAGNIFIER_V1_PACKAGE.debrief.title}
              </h2>
              <p>
                {isV2Result
                  ? contentPackage.debrief.body
                  : DOMAIN_UNDER_MAGNIFIER_V1_PACKAGE.debrief.body}
              </p>
              {isV2Result ? (
                <dl>
                  <div>
                    <dt>Fato observável</dt>
                    <dd>O domínio registrado do caso era {content.mainCase.segments.find((segment) => segment.id === content.mainCase.correctRegisteredDomainSegmentId)?.value}.</dd>
                  </div>
                  <div>
                    <dt>Limite</dt>
                    <dd>A anatomia não prova reputação, propriedade humana atual nem ausência de comprometimento.</dd>
                  </div>
                  <div>
                    <dt>Ação segura</dt>
                    <dd>{content.safeRouteOptions.find((option) => option.id === contentPackage.allowlists.correctSafeRouteId)?.label}.</dd>
                  </div>
                </dl>
              ) : (
                <div className="legacy-result-notice">
                  <strong>Debrief correspondente à versão 1.</strong>
                  <p>A tentativa antiga não recebe segmentos, pacote ou interpretação da versão 2.</p>
                </div>
              )}
              <div className="lab-player-actions">
                <button
                  type="button"
                  className="primary-button dark"
                  onClick={onOpenSimulation}
                >
                  Ver Simulação recomendada
                </button>
                <button type="button" className="text-button" onClick={practiceAnotherCase}>
                  Praticar com outro caso
                </button>
                <button type="button" className="text-button" onClick={onBackToHub}>
                  Voltar ao PhishLab
                </button>
              </div>
            </div>
          ) : null}
        </div>
      </section>
    </ActivityShell>
  );
}
