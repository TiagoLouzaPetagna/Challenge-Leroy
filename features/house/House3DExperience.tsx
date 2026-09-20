"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import "./house-3d-experience.css";

export type House3DMode = "view" | "edit" | "build" | "visitor";

type House3DExperienceProps = {
  mode: House3DMode;
  onModeChange?: (mode: Exclude<House3DMode, "visitor">) => void;
  exportRequestId?: number;
  onExport?: (snapshot: { sceneJson: string; thumbnailUrl: string; theme: string } | null) => void;
  visitorProfileId?: string;
  publishedVisitor?: boolean;
  visitorTheme?: "crafted" | "cyberpunk" | "industrial";
  ownerName?: string;
};

export function House3DExperience({
  mode,
  onModeChange,
  exportRequestId,
  onExport,
  visitorProfileId,
  publishedVisitor,
  visitorTheme,
  ownerName,
}: House3DExperienceProps) {
  const frameRef = useRef<HTMLIFrameElement>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const editorMode = mode === "visitor" ? "view" : mode;
  const visitorQuery = visitorProfileId
    ? `&visitor=${encodeURIComponent(visitorProfileId)}${
        visitorTheme ? `&theme=${encodeURIComponent(visitorTheme)}` : ""
      }${publishedVisitor ? "&published=1" : ""
      }`
    : "";

  const sendMode = useCallback(() => {
    frameRef.current?.contentWindow?.postMessage(
      { type: "casa-digital:set-mode", mode: editorMode },
      window.location.origin,
    );
  }, [editorMode]);

  useEffect(() => {
    sendMode();
  }, [sendMode]);

  useEffect(() => {
    if (!exportRequestId || status !== "ready") return;
    frameRef.current?.contentWindow?.postMessage(
      { type: "casa-digital:export-scene", requestId: exportRequestId },
      window.location.origin,
    );
  }, [exportRequestId, status]);

  useEffect(() => {
    function receive(event: MessageEvent) {
      if (event.origin !== window.location.origin || event.source !== frameRef.current?.contentWindow) return;
      if (event.data?.type === "casa-atelie:ready") {
        setStatus("ready");
        sendMode();
      }
      if (event.data?.type === "casa-atelie:error") setStatus("error");
      if (event.data?.requestId === exportRequestId && event.data?.type === "casa-atelie:export-error") onExport?.(null);
      if (event.data?.requestId === exportRequestId && event.data?.type === "casa-atelie:export-scene") {
        const { sceneJson, thumbnailUrl, theme } = event.data;
        onExport?.(typeof sceneJson === "string" && typeof thumbnailUrl === "string" && typeof theme === "string"
          ? { sceneJson, thumbnailUrl, theme } : null);
      }
      const nextMode = event.data?.mode;
      if (
        event.data?.type === "casa-atelie:mode" &&
        (nextMode === "view" || nextMode === "edit" || nextMode === "build")
      ) {
        onModeChange?.(nextMode);
      }
    }
    window.addEventListener("message", receive);
    return () => window.removeEventListener("message", receive);
  }, [onModeChange, onExport, exportRequestId, sendMode]);

  return (
    <section className="house-3d-shell" aria-label="Casa digital em 3D">
      {status === "loading" && <div className="house-3d-status" role="status"><span />Preparando sua casa 3D…</div>}
      {status === "error" && <div className="house-3d-status house-3d-status--error" role="alert">Não foi possível abrir a casa 3D. Atualize a página para tentar novamente.</div>}
      <iframe
        ref={frameRef}
        className={`house-3d-frame ${status === "ready" ? "is-ready" : ""}`.trim()}
        src={`/house-3d/?embedded=1&mode=view${visitorQuery}`}
        title={
          mode === "visitor"
            ? ownerName
              ? `Casa 3D de ${ownerName}`
              : "Casa 3D vista como visitante"
            : "Minha casa 3D"
        }
        onLoad={sendMode}
        allow="fullscreen"
      />
    </section>
  );
}
