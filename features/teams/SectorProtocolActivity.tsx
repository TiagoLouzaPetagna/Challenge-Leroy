"use client";

import { useEffect, useState, type DragEvent } from "react";
import { ArrowDown, CheckCircle2, GripVertical, Mail, RotateCcw, ShieldCheck } from "lucide-react";

import {
  currentTeamPeriod,
  getTeamProtocolCase,
  isSafeProtocolOrder,
  SAFE_PROTOCOL_ORDER,
  type ProtocolActionId,
  type TeamProtocolBoard,
} from "@/lib/teams/protocol";

import styles from "./SectorProtocolActivity.module.css";

type Props = { teamName: string };

export function SectorProtocolActivity({ teamName }: Props) {
  const [board, setBoard] = useState<TeamProtocolBoard | null>(null);
  const [order, setOrder] = useState<ProtocolActionId[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [reload, setReload] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/teams/protocol", { credentials: "same-origin", cache: "no-store", signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error("unavailable");
        return response.json() as Promise<TeamProtocolBoard>;
      })
      .then((result) => {
        setBoard(result);
        setOrder(result.myOrder ?? []);
        setSubmitted(Boolean(result.myOrder));
        setError("");
      })
      .catch((cause) => {
        if (cause instanceof DOMException && cause.name === "AbortError") return;
        setError("Não foi possível abrir a rodada. Tente novamente.");
      })
      .finally(() => { if (!controller.signal.aborted) setLoading(false); });
    return () => controller.abort();
  }, [reload]);

  const caseFile = getTeamProtocolCase(board?.sectorId ?? "", board?.periodId ?? currentTeamPeriod().id);
  const orderedActions = order.map((id) => caseFile.actions.find((action) => action.id === id)).filter((action) => action !== undefined);
  const availableActions = caseFile.actions.filter((action) => !order.includes(action.id));
  const correct = submitted && isSafeProtocolOrder(order);

  function addAction(id: ProtocolActionId, index = order.length) {
    setOrder((current) => {
      const without = current.filter((item) => item !== id);
      const insertion = Math.min(index, without.length);
      return [...without.slice(0, insertion), id, ...without.slice(insertion)].slice(0, 3);
    });
    setSubmitted(false);
    setError("");
  }

  function removeAction(id: ProtocolActionId) {
    setOrder((current) => current.filter((item) => item !== id));
    setSubmitted(false);
  }

  function dropAction(event: DragEvent<HTMLButtonElement>, index: number) {
    event.preventDefault();
    const id = event.dataTransfer.getData("text/plain");
    if (caseFile.actions.some((action) => action.id === id)) addAction(id as ProtocolActionId, index);
  }

  async function submit() {
    if (order.length !== 3 || saving) return;
    setSaving(true);
    setError("");
    try {
      const response = await fetch("/api/teams/protocol", {
        method: "POST",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ order }),
      });
      if (!response.ok) throw new Error("unavailable");
      const result = (await response.json()) as TeamProtocolBoard;
      setBoard(result);
      setSubmitted(true);
    } catch {
      setError("Sua decisão não pôde ser salva. Tente novamente.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className={styles.page}>
      <header className={styles.hero}>
        <div>
          <span className={styles.kicker}>DESAFIO DA ÁREA · {board?.sectorName ?? teamName} {board ? `· ${board.periodLabel}` : ""}</span>
          <h1>Monte a rota segura</h1>
          <p>Leia o pedido e escolha a ordem das ações. Uma das quatro opções deve ficar de fora.</p>
        </div>
        <ShieldCheck size={66} strokeWidth={1.3} aria-hidden="true" />
      </header>

      {error ? <div className={styles.error} role="alert">{error}{!board ? <button type="button" onClick={() => { setLoading(true); setReload((value) => value + 1); }}>Tentar novamente</button> : null}</div> : null}

      <div className={styles.workspace}>
        <section className={styles.message} aria-labelledby="protocol-message-title">
          <div className={styles.messageTop}><Mail size={21} aria-hidden="true" /><span>Mensagem recebida</span></div>
          <div className={styles.messageHeader}>
            <span>DE</span><strong>{caseFile.from}</strong>
            <span>ASSUNTO</span><h2 id="protocol-message-title">{caseFile.subject}</h2>
          </div>
          <p>{caseFile.message}</p>
          <div className={styles.context}><strong>O que você já tem</strong><span>Você pode consultar {caseFile.reference} e usar um contato registrado antes dessa mensagem.</span></div>
        </section>

        <section className={styles.route} aria-labelledby="protocol-route-title">
          <div className={styles.routeHeader}>
            <span className={styles.sectionKicker}>SUA DECISÃO</span>
            <h2 id="protocol-route-title">O que vem primeiro?</h2>
            <p>Toque nas ações abaixo para preencher a sequência. Você também pode arrastá-las.</p>
          </div>
          <div className={styles.slots}>
            {[0, 1, 2].map((index) => {
              const action = orderedActions[index];
              return (
                <button
                  type="button"
                  key={index}
                  className={`${styles.slot} ${action ? styles.slotFilled : ""}`}
                  onClick={() => action && removeAction(action.id)}
                  draggable={Boolean(action)}
                  onDragStart={(event) => { if (action) event.dataTransfer.setData("text/plain", action.id); }}
                  onDragOver={(event) => event.preventDefault()}
                  onDrop={(event) => dropAction(event, index)}
                  aria-label={action ? `Passo ${index + 1}: ${action.label}. Arraste para mudar a ordem ou clique para remover.` : `Passo ${index + 1}: vazio. Arraste uma ação aqui.`}
                >
                  <span className={styles.slotNumber}>{index + 1}</span>
                  <span>{action ? action.label : index === order.length ? "Escolha a próxima ação" : "Aguardando ação"}</span>
                  {index < 2 ? <ArrowDown className={styles.slotArrow} size={16} aria-hidden="true" /> : null}
                </button>
              );
            })}
          </div>
        </section>
      </div>

      <section className={styles.actionSection} aria-labelledby="protocol-actions-title">
        <div className={styles.actionHeading}>
          <div><span className={styles.sectionKicker}>QUATRO POSSIBILIDADES</span><h2 id="protocol-actions-title">Escolha três ações</h2></div>
          {order.length > 0 ? <button type="button" className={styles.clear} onClick={() => { setOrder([]); setSubmitted(false); }}><RotateCcw size={16} aria-hidden="true" /> Recomeçar</button> : null}
        </div>
        <div className={styles.actions}>
          {availableActions.map((action) => (
            <button
              type="button"
              key={action.id}
              className={styles.action}
              disabled={order.length === 3 || loading}
              draggable={order.length < 3}
              onDragStart={(event) => event.dataTransfer.setData("text/plain", action.id)}
              onClick={() => addAction(action.id)}
            >
              <GripVertical size={18} aria-hidden="true" />
              <span>{action.label}</span>
              <span className={styles.addMark} aria-hidden="true">+</span>
            </button>
          ))}
        </div>
        <div className={styles.footer}>
          <button type="button" className="primary-button" disabled={loading || saving || order.length !== 3} onClick={() => void submit()}>{saving ? "Conferindo…" : submitted ? "Conferir nova ordem" : "Conferir minha decisão"}</button>
          <span>{order.length} de 3 ações escolhidas</span>
        </div>
      </section>

      {submitted ? (
        <section className={`${styles.result} ${correct ? styles.resultCorrect : ""}`} aria-live="polite" aria-labelledby="protocol-result-title">
          <div className={styles.resultTitle}><CheckCircle2 size={26} aria-hidden="true" /><div><span className={styles.sectionKicker}>RESULTADO</span><h2 id="protocol-result-title">{correct ? "Rota segura montada" : "Revise a ordem antes de agir"}</h2></div></div>
          <p>{correct
            ? "Você pausou o pedido, verificou por fora da mensagem e reservou o reporte para uma divergência."
            : order.includes("shortcut")
              ? "O telefone, link ou anexo da mensagem não confirma a identidade de quem pediu."
              : "A ordem importa: pause o pedido antes de conferir pelo canal conhecido; reporte se encontrar divergência."}</p>
          <div className={styles.safeRoute}>
            <strong>Sequência segura</strong>
            <ol>{SAFE_PROTOCOL_ORDER.map((id) => <li key={id}>{caseFile.actions.find((action) => action.id === id)?.label}</li>)}</ol>
          </div>
          <p className={styles.groupNote}>{board?.participants ?? 0} {(board?.participants ?? 0) === 1 ? "pessoa participou" : "pessoas participaram"} nesta rodada. O resultado da área fica na página de Equipes; respostas individuais não são exibidas.</p>
        </section>
      ) : null}
    </div>
  );
}
