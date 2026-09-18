"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import "./house-3d-experience.css";

export type House3DMode = "view" | "edit" | "build" | "visitor";

type House3DExperienceProps = {
  mode: House3DMode;
  onModeChange?: (mode: Exclude<House3DMode, "visitor">) => void;
};

export function House3DExperience({
  mode,
  onModeChange,
}: House3DExperienceProps) {
  const frameRef = useRef<HTMLIFrameElement>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const editorMode = mode === "visitor" ? "view" : mode;

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
    function receive(event: MessageEvent) {
      if (event.origin !== window.location.origin || event.source !== frameRef.current?.contentWindow) return;
      if (event.data?.type === "casa-atelie:ready") {
        setStatus("ready");
        sendMode();
      }
      if (event.data?.type === "casa-atelie:error") setStatus("error");
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
  }, [onModeChange, sendMode]);

  return (
    <section className="house-3d-shell" aria-label="Casa digital em 3D">
      {status === "loading" && <div className="house-3d-status" role="status"><span />Preparando sua casa 3D…</div>}
      {status === "error" && <div className="house-3d-status house-3d-status--error" role="alert">Não foi possível abrir a casa 3D. Atualize a página para tentar novamente.</div>}
      <iframe
        ref={frameRef}
        className="house-3d-frame"
        src="/house-3d/?embedded=1&mode=view"
        title={mode === "visitor" ? "Casa 3D vista como visitante" : "Minha casa 3D"}
        onLoad={sendMode}
        allow="fullscreen"
      />
    </section>
  );
}
