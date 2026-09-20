"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { useAppState } from "@/app/providers";
import { PortalIcon } from "@/features/ui/PortalIcons";
import { selectTotalPoints } from "@/lib/state/selectors";
import { AVATAR_STORAGE_KEY, parseSavedAvatar } from "@/features/avatar/avatar-storage";
import type { PublicHouse } from "@/lib/house/public-houses";
import {
  House3DExperience,
  type House3DMode,
} from "./House3DExperience";
import "./house-experience.css";

export function HousePage() {
  const router = useRouter();
  const { state, isHydrated } = useAppState();
  const [mode, setMode] = useState<House3DMode>("view");
  const [publication, setPublication] = useState<PublicHouse | null>(null);
  const [publishOpen, setPublishOpen] = useState(false);
  const [nickname, setNickname] = useState("");
  const [exportRequestId, setExportRequestId] = useState(0);
  const [busy, setBusy] = useState(false);
  const [feedback, setFeedback] = useState("");

  const learnerName = state.demo.learner.name;
  const points = selectTotalPoints(state);
  const isVisitorPreview = mode === "visitor";
  const isBuilding = mode === "build";

  useEffect(() => {
    let active = true;
    fetch("/api/houses", { cache: "no-store" }).then((response) => response.ok ? response.json() : null)
      .then((data) => {
        if (!active) return;
        const mine = data?.mine as PublicHouse | null | undefined;
        setPublication(mine ?? null);
        setNickname(mine?.nickname ?? learnerName.split(" ")[0] ?? "");
      }).catch(() => {});
    return () => { active = false; };
  }, [learnerName]);

  useEffect(() => {
    if (!publishOpen) return;
    document.getElementById("house-nickname")?.focus();
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !busy) setPublishOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [publishOpen, busy]);

  const publishSnapshot = useCallback(async (snapshot: { sceneJson: string; thumbnailUrl: string; theme: string } | null) => {
    if (!snapshot) { setBusy(false); setFeedback("Não foi possível preparar a casa. Aguarde o 3D carregar e tente novamente."); return; }
    try {
      const avatarUrl = parseSavedAvatar(window.localStorage.getItem(AVATAR_STORAGE_KEY))?.imageDataUrl ?? null;
      const response = await fetch("/api/houses", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...snapshot, nickname: nickname.trim(), avatarUrl }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Não foi possível publicar a casa.");
      setPublication(result.house);
      setPublishOpen(false);
      setFeedback("Casa publicada na vizinhança. As mudanças futuras só aparecerão após você atualizar a publicação.");
    } catch (error) {
      setFeedback(error instanceof Error ? error.message : "Não foi possível publicar a casa.");
    } finally { setBusy(false); }
  }, [nickname]);

  const removePublication = async () => {
    setBusy(true);
    setFeedback("");
    try {
      const response = await fetch("/api/houses", { method: "DELETE" });
      if (!response.ok) throw new Error();
      setPublication(null);
      setPublishOpen(false);
      setFeedback("Sua casa foi retirada da vizinhança.");
    } catch { setFeedback("Não foi possível retirar a casa agora."); }
    finally { setBusy(false); }
  };

  return (
    <div className={`house-page house-page--${mode}`}>
      <a className="skip-link" href="#house-room">
        Pular para o cômodo
      </a>

      <header className="house-focus-bar" aria-label="Controles da casa">
        <button
          type="button"
          className="house-focus-back"
          onClick={() => router.push("/perfil")}
        >
          <PortalIcon name="arrow-left" size={17} />
          <span>Meu perfil</span>
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
                className="house-action house-action--quiet house-action--explore"
                aria-label="Explorar casas"
                onClick={() => router.push("/casas")}
              >
                <PortalIcon name="home" size={16} />
                <span>Explorar casas</span>
              </button>
              <button
                type="button"
                className="house-action house-action--quiet house-action--publish"
                aria-label={publication ? "Atualizar publicação da casa" : "Publicar casa"}
                onClick={() => { setFeedback(""); setPublishOpen(true); }}
              >
                <PortalIcon name="eye" size={16} />
                <span>{publication ? "Atualizar publicação" : "Publicar casa"}</span>
              </button>
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
          exportRequestId={exportRequestId}
          onExport={publishSnapshot}
        />
      </div>
      {feedback && <div className="house-publish-feedback" role="status">{feedback}<button type="button" aria-label="Fechar aviso" onClick={() => setFeedback("")}>×</button></div>}
      {publishOpen && (
        <div className="house-publish-overlay" onMouseDown={(event) => { if (event.target === event.currentTarget && !busy) setPublishOpen(false); }}>
          <section className="house-publish-dialog" role="dialog" aria-modal="true" aria-labelledby="publish-house-title">
            <span className="house-publish-eyebrow">Sua casa na vizinhança</span>
            <h2 id="publish-house-title">{publication ? "Atualizar sua casa pública" : "Receber visitas na sua casa?"}</h2>
            <p>Outras pessoas poderão ver sua casa 3D, apelido, avatar e setor. Seu progresso e suas respostas continuam privados.</p>
            <label htmlFor="house-nickname">Apelido exibido</label>
            <input id="house-nickname" maxLength={28} minLength={2} value={nickname} onChange={(event) => setNickname(event.target.value)} />
            <div className="house-publish-dialog-actions">
              <button type="button" className="house-action house-action--quiet" disabled={busy} onClick={() => setPublishOpen(false)}>Cancelar</button>
              <button type="button" className="house-action house-action--primary" disabled={busy || nickname.trim().length < 2} onClick={() => { setBusy(true); setExportRequestId((id) => id + 1); }}>{busy ? "Preparando…" : publication ? "Atualizar casa" : "Publicar casa"}</button>
            </div>
            {publication && <button type="button" className="house-publish-remove" disabled={busy} onClick={removePublication}>Retirar minha casa da vizinhança</button>}
          </section>
        </div>
      )}
    </div>
  );
}
