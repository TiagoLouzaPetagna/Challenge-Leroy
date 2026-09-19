"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { useAppState } from "@/app/providers";
import { PortalIcon } from "@/features/ui/PortalIcons";
import { selectTotalPoints } from "@/lib/state/selectors";
import {
  House3DExperience,
  type House3DMode,
} from "./House3DExperience";
import "./house-experience.css";

export function HousePage() {
  const router = useRouter();
  const { state, isHydrated } = useAppState();
  const [mode, setMode] = useState<House3DMode>("view");

  const learnerName = state.demo.learner.name;
  const points = selectTotalPoints(state);
  const isVisitorPreview = mode === "visitor";
  const isBuilding = mode === "build";

  return (
    <div className={`house-page house-page--${mode}`}>
      <a className="skip-link" href="#house-room">
        Pular para o cômodo
      </a>

      <header className="house-focus-bar" aria-label="Controles da casa">
        <button
          type="button"
          className="house-focus-back"
          onClick={() => router.push("/")}
        >
          <PortalIcon name="arrow-left" size={17} />
          <span>Visão geral</span>
        </button>

        <div className="house-focus-context">
          <span>Casa</span>
          <strong>
            {isVisitorPreview
              ? `Casa de ${learnerName}`
              : isBuilding
                ? "Construindo minha casa"
              : mode === "edit"
                ? "Editando minha casa"
                : "Minha casa"}
          </strong>
        </div>

        <div className="house-focus-actions">
          {mode === "edit" ? (
            <>
              <button
                type="button"
                className="house-action house-action--quiet house-action--build"
                onClick={() => setMode("build")}
              >
                <PortalIcon name="settings" size={16} />
                <span>Construir cômodos</span>
              </button>
              <button
                type="button"
                className="house-action house-action--primary house-action--complete"
                onClick={() => setMode("view")}
              >
                <PortalIcon name="check" size={16} />
                Concluir edição
              </button>
            </>
          ) : isBuilding ? (
            <>
              <button
                type="button"
                className="house-action house-action--quiet house-action--decorate"
                onClick={() => setMode("edit")}
              >
                <PortalIcon name="arrow-left" size={16} />
                Voltar a decorar
              </button>
              <button
                type="button"
                className="house-action house-action--primary house-action--complete"
                onClick={() => setMode("view")}
              >
                <PortalIcon name="check" size={16} />
                Concluir edição
              </button>
            </>
          ) : mode === "visitor" ? (
            <button
              type="button"
              className="house-action house-action--quiet house-action--exit"
              onClick={() => setMode("view")}
            >
              <PortalIcon name="arrow-left" size={16} />
              Sair da prévia
            </button>
          ) : (
            <>
              <span className="house-points">
                <PortalIcon name="sparkles" size={14} />
                {isHydrated ? `${points} pontos` : "Carregando"}
              </span>
              <button
                type="button"
                className="house-action house-action--quiet house-action--preview"
                onClick={() => setMode("visitor")}
              >
                <PortalIcon name="eye" size={16} />
                Ver como visitante
              </button>
              <button
                type="button"
                className="house-action house-action--primary house-action--edit"
                onClick={() => setMode("edit")}
              >
                <PortalIcon name="edit" size={16} />
                Editar casa
              </button>
            </>
          )}
        </div>
      </header>

      <div id="house-room" tabIndex={-1}>
        <House3DExperience
          mode={mode}
          onModeChange={(nextMode) => setMode(nextMode)}
        />
      </div>
    </div>
  );
}
