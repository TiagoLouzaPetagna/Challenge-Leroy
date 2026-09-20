"use client";
import { useId, useRef, useState, type CSSProperties, type PointerEvent } from "react";

/** Pointer dragging complements the existing move buttons for keyboard and touch. */
export function useDragReorder(onMove: (source: string, target: string) => void) {
  const scope = useId();
  const origin = useRef<{ id: string; x: number; y: number } | null>(null);
  const [offset, setOffset] = useState({ id: "", x: 0, y: 0 });
  const dragging = Math.abs(offset.x) + Math.abs(offset.y) > 6;
  function reset() {
    origin.current = null;
    setOffset({ id: "", x: 0, y: 0 });
  }
  function drop(event: PointerEvent<HTMLElement>) {
    const source = origin.current;
    if (source && dragging) {
      const target = document.elementFromPoint(event.clientX, event.clientY)?.closest("[data-reorder-row]");
      const targetId = target?.getAttribute("data-reorder-row");
      if (target?.getAttribute("data-reorder-scope") === scope && targetId && targetId !== source.id) onMove(source.id, targetId);
    }
    reset();
  }
  return (id: string) => ({
    "data-reorder-row": id,
    "data-reorder-scope": scope,
    style: {
      cursor: dragging ? "grabbing" : "grab",
      userSelect: "none",
      ...(offset.id === id && dragging ? {
        position: "relative", zIndex: 5, pointerEvents: "none",
        transform: `translate(${offset.x}px, ${offset.y}px)`,
        boxShadow: "0 12px 25px #173f3522",
      } : {}),
    } as CSSProperties,
    onPointerDown(event: PointerEvent<HTMLElement>) {
      if (event.button !== 0 || (event.target as HTMLElement).closest("button,select,input,a,label")) return;
      origin.current = { id, x: event.clientX, y: event.clientY };
      event.currentTarget.setPointerCapture(event.pointerId);
    },
    onPointerMove(event: PointerEvent<HTMLElement>) {
      if (origin.current) setOffset({ id: origin.current.id, x: event.clientX - origin.current.x, y: event.clientY - origin.current.y });
    },
    onPointerUp: drop,
    onPointerCancel: reset,
  });
}
