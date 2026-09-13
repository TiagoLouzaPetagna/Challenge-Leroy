"use client";

import { useId, useRef, useState, type PointerEvent } from "react";
import { GripVertical, Link2 } from "lucide-react";
import styles from "./FieldMatcher.module.css";

type Props<Id extends string> = {
  fields: readonly { id: string; label: string; value: string; explanation: string }[];
  options: readonly { id: Id; label: string }[];
  values: Readonly<Record<string, Id>>;
  onMatch: (fieldId: string, value: Id) => void;
  onInspect: (fieldId: string) => void;
};

export function FieldMatcher<Id extends string>({ fields, options, values, onMatch, onInspect }: Props<Id>) {
  const scope = useId();
  const [chosen, setChosen] = useState<Id>();
  const origin = useRef<{ id: Id; x: number; y: number } | null>(null);
  const suppressClick = useRef(false);
  const [offset, setOffset] = useState<{ id?: Id; x: number; y: number }>({ x: 0, y: 0 });
  const dragging = Math.abs(offset.x) + Math.abs(offset.y) > 6;

  function resetDrag() {
    origin.current = null;
    setOffset({ x: 0, y: 0 });
  }

  function drop(event: PointerEvent<HTMLButtonElement>) {
    if (dragging && origin.current) {
      suppressClick.current = true;
      const target = document.elementFromPoint(event.clientX, event.clientY)?.closest("[data-match-field]");
      const fieldId = target?.getAttribute("data-match-field");
      if (target?.getAttribute("data-match-scope") === scope && fieldId) {
        onMatch(fieldId, origin.current.id);
        setChosen(origin.current.id);
      }
    }
    resetDrag();
  }

  return <div className={styles.layout}>
    <section className={styles.labels} aria-label="Etiquetas para associar">
      <h3>1. Escolha uma etiqueta</h3>
      {options.map(option => <button type="button" key={option.id} aria-pressed={chosen === option.id}
        style={dragging && offset.id === option.id ? { position: "relative", zIndex: 5, pointerEvents: "none", transform: 'translate(' + offset.x + 'px,' + offset.y + 'px)', boxShadow: "0 12px 25px #173f3522" } : undefined}
        onPointerDown={event => { if (event.button !== 0) return; suppressClick.current = false; origin.current = { id: option.id, x: event.clientX, y: event.clientY }; event.currentTarget.setPointerCapture(event.pointerId); }}
        onPointerMove={event => { if (origin.current) setOffset({ id: origin.current.id, x: event.clientX - origin.current.x, y: event.clientY - origin.current.y }); }}
        onPointerUp={drop} onPointerCancel={resetDrag}
        onClick={() => { if (suppressClick.current) { suppressClick.current = false; return; } setChosen(option.id); }}>
        <GripVertical size={17} aria-hidden="true" />{option.label}
      </button>)}
    </section>
    <section className={styles.fields} aria-label="Campos da mensagem">
      <h3 className={styles.desktopHeading}>2. Associe a um campo</h3>
      {fields.map(field => <article key={field.id} data-match-field={field.id} data-match-scope={scope}>
        <header><span>{field.label}</span><strong>{field.value}</strong></header>
        <button className={styles.desktopTarget} type="button" disabled={!chosen} aria-label={'Associar etiqueta a ' + field.label} onClick={() => { if (chosen) onMatch(field.id, chosen); }}>
          <Link2 size={17} aria-hidden="true" />{options.find(option => option.id === values[field.id])?.label ?? (chosen ? "Colocar etiqueta aqui" : "Escolha uma etiqueta ao lado")}
        </button>
        <label className={styles.mobileChoice}>
          <span>O que este campo informa?</span>
          <select aria-label={'Associar etiqueta a ' + field.label} value={values[field.id] ?? ""} onChange={event => { const option = options.find(item => item.id === event.target.value); if (option) onMatch(field.id, option.id); }}>
            <option value="" disabled>Escolha uma etiqueta</option>
            {options.map(option => <option key={option.id} value={option.id}>{option.label}</option>)}
          </select>
        </label>
        <details onToggle={event => { if (event.currentTarget.open) onInspect(field.id); }}><summary>Entender este campo</summary><p>{field.explanation}</p></details>
      </article>)}
    </section>
    <span className="sr-only" role="status">{Object.keys(values).length} de {fields.length} campos associados.</span>
  </div>;
}
