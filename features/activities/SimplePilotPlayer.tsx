"use client";

import { useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Check, ClipboardCheck, Link2, Mail, Paperclip, Search } from "lucide-react";
import { ActivityShell } from "./ActivityShell";
import { ActivityNextStep } from "./primitives/ActivityNextStep";
import { ActivityAnswerReview } from "./primitives/ActivityAnswerReview";
import { useActivityStageFocus } from "./useActivityStageFocus";
import { SIMPLE_PILOT_VERSION, type SimplePilotDefinition, type SimplePilotId, type SimplePilotTask } from "@/lib/content/activities/simple-pilots";
import type { SimplePilotAnswer, SimplePilotResult } from "@/lib/domain/types";
import styles from "./SimplePilotPlayer.module.css";

type Props = {
  definition: SimplePilotDefinition & { activityId: SimplePilotId };
  existingResult: SimplePilotResult | null;
  existingAnswers?: [string, string, string, string] | null;
  claimedPoints: number;
  rewardAlreadyClaimed: boolean;
  onComplete: (answer: SimplePilotAnswer) => Promise<SimplePilotResult>;
  onBack: () => void;
  onNext: () => void;
};

function CaseArtifact({ scene }: { scene: SimplePilotDefinition["scene"] }) {
  if (scene === "manager-message") {
    return (
      <div className={styles.messageArtifact} aria-label="Mensagem de solicitação recebida">
        <div className={styles.artifactTop}><span><Mail size={16} /> MENSAGEM INTERNA</span><span>Hoje · 14h20</span></div>
        <div className={styles.sender}><span className={styles.senderAvatar}>R</span><div><strong>Renato · Gestão de Compras</strong><small>Nome exibido na mensagem</small></div></div>
        <p>“Precisamos atualizar o cadastro do fornecedor Aurora até as 16h. Pode deixar a segunda aprovação para amanhã? Eu assumo.”</p>
        <span className={styles.artifactFoot}>Pedido: alterar cadastro de fornecedor</span>
      </div>
    );
  }
  if (scene === "unexpected-attachment") {
    return (
      <div className={styles.attachmentArtifact} aria-label="E-mail com currículo anexado">
        <div className={styles.artifactTop}><span><Mail size={16} /> E-MAIL RECEBIDO</span><span>Hoje · 10h15</span></div>
        <div className={styles.attachmentHead}><span>De</span><strong>Camila · contato externo</strong><span>Assunto</span><strong>Currículo para sua equipe</strong></div>
        <p>“Olá! Disseram que sua equipe está recebendo currículos. Segue o meu para avaliação.”</p>
        <div className={styles.attachmentFile}><Paperclip size={18} /><span><strong>Curriculo-Camila.pdf</strong><small>Anexo recebido · não aberto</small></span></div>
      </div>
    );
  }
  if (scene === "destination-chain") {
    return (
      <div className={styles.chainArtifact} aria-label="Prévia fictícia do percurso de um link">
        <div className={styles.chainTop}><Link2 size={17} /><span>PRÉVIA DO PERCURSO</span></div>
        <ol className={styles.chainSteps}>
          <li><span>Texto do botão</span><strong>Abrir documento da equipe</strong></li>
          <li><span>Endereço intermediário</span><strong>acesso.empresa.example/redir</strong></li>
          <li><span>Destino final</span><strong>arquivos-verificacao.example/entrar</strong></li>
        </ol>
        <p>Portal cadastrado: <strong>documentos.empresa.example</strong></p>
      </div>
    );
  }
  return (
    <div className={styles.domainArtifact} aria-label="Comparação entre o endereço cadastrado e o endereço recebido">
      <div className={styles.domainArtifactTop}><Search size={17} /><span>COMPARE OS ENDEREÇOS</span></div>
      <div className={styles.domainRows}>
        <div><span>Referência cadastrada</span><strong>contas.empresa.example</strong></div>
        <div><span>Endereço do aviso</span><strong>contas.empreza.example</strong></div>
      </div>
      <p>Os endereços são fictícios. Você não precisa abrir nenhum deles.</p>
    </div>
  );
}

function TaskInteraction({ task, value, onChange }: { task: SimplePilotTask; value: string | null; onChange: (id: string) => void }) {
  const [picked, setPicked] = useState<string | null>(null);
  const [dragged, setDragged] = useState<string | null>(null);
  const targetRef = useRef<HTMLButtonElement>(null);
  const dragStartRef = useRef<{ id: string; pointerId: number; x: number; y: number; moved: boolean } | null>(null);
  const suppressClickRef = useRef(false);
  if (task.kind === "choice") {
    return <div className={styles.choiceList} role="group" aria-label={task.prompt}>
      {task.options.map((option) => <button key={option.id} type="button" className={`${styles.choice} ${value === option.id ? styles.chosen : ""}`} aria-pressed={value === option.id} onClick={() => onChange(option.id)}><span className={styles.choiceMark}>{value === option.id ? <Check size={16} /> : null}</span><span>{option.label}</span></button>)}
    </div>;
  }

  const selected = picked ?? dragged;
  const placed = task.options.find((option) => option.id === value);
  const place = (id: string | null) => {
    if (id && task.options.some((option) => option.id === id)) {
      onChange(id);
      setPicked(null);
      setDragged(null);
    }
  };
  return <div className={styles.placeArea}>
    <div className={styles.dragCards} role="group" aria-label="Cartões para colocar no destino">
      {task.options.map((option) => <button key={option.id} type="button" className={`${styles.dragCard} ${selected === option.id ? styles.picked : ""} ${value === option.id ? styles.cardPlaced : ""}`} aria-pressed={selected === option.id || value === option.id} onPointerDown={(event) => { if (event.button !== 0) return; dragStartRef.current = { id: option.id, pointerId: event.pointerId, x: event.clientX, y: event.clientY, moved: false }; event.currentTarget.setPointerCapture(event.pointerId); }} onPointerMove={(event) => { const drag = dragStartRef.current; if (!drag || drag.pointerId !== event.pointerId) return; if (Math.hypot(event.clientX - drag.x, event.clientY - drag.y) > 8) { drag.moved = true; setDragged(option.id); } }} onPointerUp={(event) => { const drag = dragStartRef.current; if (!drag || drag.pointerId !== event.pointerId) return; if (drag.moved) { const rect = targetRef.current?.getBoundingClientRect(); if (rect && event.clientX >= rect.left && event.clientX <= rect.right && event.clientY >= rect.top && event.clientY <= rect.bottom) place(option.id); suppressClickRef.current = true; } dragStartRef.current = null; setDragged(null); }} onPointerCancel={() => { dragStartRef.current = null; setDragged(null); }} onClick={() => { if (suppressClickRef.current) { suppressClickRef.current = false; return; } setPicked(option.id); }}><span className={styles.dragHandle} aria-hidden="true">⠿</span><span><strong>{option.label}</strong>{option.detail ? <small>{option.detail}</small> : null}</span></button>)}
    </div>
    <button ref={targetRef} type="button" className={`${styles.dropTarget} ${placed ? styles.hasCard : ""} ${selected ? styles.targetReady : ""}`} onClick={() => place(selected)} aria-label={`${task.target}. ${placed ? `Cartão colocado: ${placed.label}.` : "Espaço vazio."} ${selected ? "Toque para colocar o cartão selecionado." : "Selecione um cartão para colocar aqui."}`}>
      <span className={styles.targetKicker}><ClipboardCheck size={16} /> {task.target}</span>
      {placed ? <strong>{placed.label}</strong> : <span className={styles.targetEmpty}>Solte um cartão aqui <span>ou selecione acima e toque aqui</span></span>}
    </button>
  </div>;
}

export function SimplePilotPlayer({ definition, existingResult, existingAnswers, claimedPoints, rewardAlreadyClaimed, onComplete, onBack, onNext }: Props) {
  const [step, setStep] = useState(existingResult ? definition.tasks.length : 0);
  const [answerIds, setAnswerIds] = useState<(string | null)[]>(existingAnswers ?? definition.tasks.map(() => null));
  const [result, setResult] = useState(existingResult);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const titleRef = useActivityStageFocus(step, false);
  const task = definition.tasks[step as 0 | 1 | 2 | 3];
  const answer = answerIds[step];

  function setAnswerAt(index: number, id: string) {
    setAnswerIds((current) => current.map((existing, currentIndex) => currentIndex === index ? id : existing));
  }

  function replay() {
    setAnswerIds(definition.tasks.map(() => null));
    setResult(null);
    setError("");
    setStep(0);
  }

  async function advance() {
    if (step < definition.tasks.length - 1) { setError(""); setStep(step + 1); return; }
    if (answerIds.some((id) => !id) || busy) return;
    setBusy(true); setError("");
    try {
      const saved = await onComplete({ activityId: definition.activityId, activityVersion: SIMPLE_PILOT_VERSION, casePackageId: `${definition.activityId}:case-1`, answerIds: answerIds as [string, string, string, string] });
      setResult(saved);
      setStep(definition.tasks.length);
    } catch {
      setError("Não foi possível salvar o resultado. Suas escolhas continuam aqui; tente novamente.");
    } finally { setBusy(false); }
  }

  return <ActivityShell activityId={definition.activityId} className={styles.page}>
    <div className={styles.frame}>
      <header className={styles.header}>
        <span className={styles.eyebrow}>{definition.eyebrow}</span>
        <h1>{definition.title}</h1>
        <p>{definition.summary}</p>
      </header>
      {step < definition.tasks.length ? <>
        <div className={styles.progress} aria-label={`Decisão ${step + 1} de ${definition.tasks.length}`}><span>DECISÃO {step + 1} DE {definition.tasks.length}</span><div>{definition.tasks.map((_, index) => <i key={index} className={index <= step ? styles.progressDone : ""} />)}</div></div>
        <div className={styles.layout}>
          <section className={styles.casePanel} aria-label={definition.caseLabel}>
            <div className={styles.caseHeading}><span>01 / O CASO</span><strong>{definition.caseLabel}</strong></div>
            <p>{definition.caseIntro}</p>
            <CaseArtifact scene={definition.scene} />
          </section>
          <section className={styles.taskPanel} aria-labelledby="simple-pilot-task-title">
            <span className={styles.taskEyebrow}>02 / SUA DECISÃO</span>
            {task.context ? <p className={styles.taskContext}>{task.context}</p> : null}
            <h2 id="simple-pilot-task-title" ref={titleRef} tabIndex={-1}>{task.prompt}</h2>
            {task.hint ? <p className={styles.taskHint}>{task.hint}</p> : null}
            <TaskInteraction key={`${definition.activityId}:${step}`} task={task} value={answer} onChange={(id) => setAnswerAt(step, id)} />
          </section>
        </div>
        {error ? <p className={styles.error} role="alert">{error}</p> : null}
        <footer className={styles.footer}><button type="button" className={styles.back} onClick={step === 0 ? onBack : () => setStep(step - 1)}><ArrowLeft size={17} /> {step === 0 ? "Voltar" : "Decisão anterior"}</button><span className={styles.footerNote}>{answer ? "Escolha registrada" : "Faça sua escolha para continuar"}</span><button type="button" className="primary-button" disabled={!answer || busy} onClick={() => void advance()}>{busy ? "Salvando…" : step === definition.tasks.length - 1 ? "Ver resultado" : "Continuar"}<ArrowRight size={17} /></button></footer>
      </> : result ? <section className={styles.result} aria-labelledby="simple-pilot-result-title">
        <span className={styles.eyebrow}>ATIVIDADE CONCLUÍDA</span>
        <div className={styles.resultHeading}><div><h2 id="simple-pilot-result-title" ref={titleRef} tabIndex={-1}>{definition.feedbackTitle}</h2><p>{definition.feedback}</p></div><div className={styles.score}><strong>{result.score}</strong><span>/ 100</span></div></div>
        <p className={styles.savedNote}>{rewardAlreadyClaimed ? claimedPoints : result.potentialReward} pontos {rewardAlreadyClaimed ? "confirmados na primeira conclusão" : "registrados nesta primeira conclusão"}.</p>
        <details className={styles.review}><summary>Rever minhas decisões</summary><ActivityAnswerReview items={definition.tasks.map((reviewTask, index) => ({ id: `${index}`, title: reviewTask.prompt, status: result.correctAnswers[index] ? "correct" : "review", userAnswer: reviewTask.options.find((option) => option.id === answerIds[index])?.label ?? "Resposta da última tentativa", explanation: result.correctAnswers[index] ? "Você identificou a decisão segura neste passo." : `O caminho seguro era: ${reviewTask.options.find((option) => option.id === reviewTask.correctId)?.label}.` }))} /></details>
        <ActivityNextStep area={definition.nextArea} title={definition.nextTitle} onOpen={onNext} />
        <div className={styles.resultActions}><button type="button" onClick={replay}>Refazer este caso</button><button type="button" onClick={onBack}>Voltar para {definition.area === "mission" ? "Jornada" : "PhishLab"}</button></div>
      </section> : null}
    </div>
  </ActivityShell>;
}
