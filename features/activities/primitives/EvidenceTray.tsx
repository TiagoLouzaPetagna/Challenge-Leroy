"use client";

import { useId, useRef, useState, type PointerEvent } from "react";
import { FileText, FolderOpen, GripVertical, Plus, X } from "lucide-react";
import styles from "./EvidenceTray.module.css";

type Item<Id extends string> = { id: Id; label: string; detail?: string };

/** Selection is shared by pointer dragging, click, touch and keyboard. */
export function EvidenceTray<Id extends string>({ items, selectedIds, onToggle, title = "Informações para a equipe" }: {
  items: readonly Item<Id>[];
  selectedIds: readonly Id[];
  onToggle: (id: Id) => void;
  title?: string;
}) {
  const trayId = useId();
  const selected = items.filter(item => selectedIds.includes(item.id));
  function toggle(id: Id) {
    onToggle(id);
    requestAnimationFrame(() => document.getElementById(`${trayId}-${id}`)?.focus({ preventScroll: true }));
  }
  return <div className={styles.layout}>
    <div className={styles.source} aria-label="Informações disponíveis">
      {items.filter(item => !selectedIds.includes(item.id)).map(item => <EvidenceCard key={item.id} item={item} target={trayId} onAdd={() => toggle(item.id)} />)}
      {selected.length === items.length && <p className={styles.emptySource}>Todos os cartões estão na pasta. Você pode remover qualquer um.</p>}
    </div>
    <section className={styles.tray} data-evidence-tray={trayId} aria-label={title}>
      <header><FolderOpen size={21} aria-hidden="true" /><h3>{title}</h3><span aria-label={`${selected.length} cartões`}>{selected.length}</span></header>
      {selected.length ? <ul>{selected.map(item => <li key={item.id}><FileText size={18} aria-hidden="true" /><div><strong>{item.label}</strong>{item.detail && <p>{item.detail}</p>}</div><button id={`${trayId}-${item.id}`} type="button" aria-label={`Remover ${item.label}`} onClick={() => toggle(item.id)}><X size={18} aria-hidden="true" /></button></li>)}</ul> : <p className={styles.empty}>Arraste os cartões para cá ou clique neles para adicionar.</p>}
      <span className="sr-only" role="status">{selected.length} cartões na pasta.</span>
    </section>
  </div>;
}

function EvidenceCard<Id extends string>({ item, target, onAdd }: { item: Item<Id>; target: string; onAdd: () => void }) {
  const origin = useRef<{ x: number; y: number } | null>(null);
  const suppressClick = useRef(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const dragging = Math.abs(offset.x) + Math.abs(offset.y) > 6;
  function end(event: PointerEvent<HTMLButtonElement>) {
    if (!origin.current) return;
    if (dragging) {
      suppressClick.current = true;
      if (document.elementFromPoint(event.clientX, event.clientY)?.closest("[data-evidence-tray]")?.getAttribute("data-evidence-tray") === target) onAdd();
    }
    origin.current = null;
    setOffset({ x: 0, y: 0 });
  }
  return <button id={`${target}-${item.id}`} type="button" className={`${styles.card} ${dragging ? styles.dragging : ""}`} aria-label={`Adicionar ${item.label}`}
    style={dragging ? { transform: `translate(${offset.x}px, ${offset.y}px)` } : undefined}
    onPointerDown={event => { if (event.button !== 0) return; suppressClick.current = false; origin.current = { x: event.clientX, y: event.clientY }; event.currentTarget.setPointerCapture(event.pointerId); }}
    onPointerMove={event => { if (origin.current) setOffset({ x: event.clientX - origin.current.x, y: event.clientY - origin.current.y }); }}
    onPointerUp={end} onPointerCancel={() => { origin.current = null; setOffset({ x: 0, y: 0 }); }}
    onClick={() => { if (suppressClick.current) { suppressClick.current = false; return; } onAdd(); }}>
    <FileText size={20} aria-hidden="true" /><span><strong>{item.label}</strong>{item.detail && <small>{item.detail}</small>}</span><span className={styles.affordance}><GripVertical size={16} aria-hidden="true" /><Plus size={15} aria-hidden="true" /></span>
  </button>;
}
