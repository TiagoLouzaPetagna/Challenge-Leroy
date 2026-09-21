"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import {
  AVATAR_STORAGE_KEY,
  AVATAR_UPDATED_EVENT,
  type SavedAvatar,
} from "@/features/avatar/avatar-storage";
import { BrandMark } from "@/features/ui/PortalChrome";
import { PortalIcon } from "@/features/ui/PortalIcons";

import styles from "./AvatarCreatorPage.module.css";

type CreatorState = "loading" | "ready" | "saved" | "error";

export default function AvatarCreatorPage() {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const readyObserverRef = useRef<MutationObserver | null>(null);
  const [creatorState, setCreatorState] = useState<CreatorState>("loading");

  useEffect(() => {
    const receiveMessage = (event: MessageEvent) => {
      if (
        event.origin !== window.location.origin ||
        event.source !== iframeRef.current?.contentWindow
      ) {
        return;
      }

      if (event.data?.type === "casa-digital:avatar-ready") {
        setCreatorState("ready");
        return;
      }

      if (event.data?.type === "casa-digital:avatar-error") {
        setCreatorState("error");
        return;
      }

      if (event.data?.type === "casa-digital:avatar-saved") {
        const avatar = event.data.payload as SavedAvatar;
        if (
          avatar?.version !== 1 ||
          typeof avatar.imageDataUrl !== "string" ||
          !avatar.imageDataUrl.startsWith("data:image/png;base64,")
        ) {
          return;
        }

        window.localStorage.setItem(AVATAR_STORAGE_KEY, JSON.stringify(avatar));
        window.dispatchEvent(new Event(AVATAR_UPDATED_EVENT));
        setCreatorState("saved");
      }
    };

    window.addEventListener("message", receiveMessage);
    iframeRef.current?.contentWindow?.postMessage(
      { type: "casa-digital:avatar-state-request" },
      window.location.origin,
    );
    return () => {
      window.removeEventListener("message", receiveMessage);
      readyObserverRef.current?.disconnect();
    };
  }, []);

  const statusLabel =
    creatorState === "loading"
      ? "Carregando peças"
      : creatorState === "saved"
        ? "Salvo no perfil"
        : creatorState === "error"
          ? "Editor indisponível"
          : "Editor pronto";

  return (
    <main className={styles.page}>
      <header className={styles.topbar}>
        <div className={styles.brand}>
          <BrandMark />
          <div>
            <strong>Casa Digital</strong>
            <span>Meu personagem</span>
          </div>
        </div>

        <div className={styles.actions}>
          <span
            className={`${styles.status} ${creatorState === "error" ? styles.error : ""}`.trim()}
            role="status"
          >
            <i aria-hidden="true" />
            {statusLabel}
          </span>
          <Link className={styles.backLink} href="/perfil">
            <PortalIcon name="arrow-left" size={17} />
            Voltar ao perfil
          </Link>
        </div>
      </header>

      <section className={styles.editor} aria-label="Criador de personagem">
        {creatorState === "loading" ? (
          <div className={styles.loading} role="status">
            <span aria-hidden="true" />
            Preparando seu guarda-roupa…
          </div>
        ) : null}
        {creatorState === "error" ? (
          <div className={styles.errorCard} role="alert">
            <strong>Não foi possível abrir o criador.</strong>
            <p>Recarregue a página para tentar novamente.</p>
          </div>
        ) : null}
        <iframe
          ref={iframeRef}
          src="/avatar-creator/?embedded=1"
          title="Criador do meu personagem"
          className={styles.frame}
          onLoad={() => {
            if (creatorState === "error") setCreatorState("loading");
            iframeRef.current?.contentWindow?.postMessage(
              { type: "casa-digital:avatar-state-request" },
              window.location.origin,
            );

            readyObserverRef.current?.disconnect();
            const frameDocument = iframeRef.current?.contentDocument;
            if (!frameDocument) return;

            const checkEditor = () => {
              if (frameDocument.getElementById("status")?.classList.contains("error")) {
                setCreatorState("error");
                readyObserverRef.current?.disconnect();
              } else if ((frameDocument.getElementById("save") as HTMLButtonElement | null)?.disabled === false) {
                setCreatorState("ready");
                readyObserverRef.current?.disconnect();
              }
            };

            readyObserverRef.current = new MutationObserver(checkEditor);
            readyObserverRef.current.observe(frameDocument.documentElement, {
              attributes: true,
              childList: true,
              subtree: true,
            });
            checkEditor();
          }}
        />
      </section>
    </main>
  );
}
