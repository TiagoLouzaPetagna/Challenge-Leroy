"use client";

import { useEffect, useRef, type KeyboardEvent } from "react";

type ReportGuideDialogProps = {
  onClose: () => void;
};

export function ReportGuideDialog({ onClose }: ReportGuideDialogProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    headingRef.current?.focus();
  }, []);

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Escape") {
      event.preventDefault();
      onClose();
      return;
    }

    if (event.key !== "Tab") return;
    const controls = rootRef.current?.querySelectorAll<HTMLElement>(
      'button:not([disabled]), [href], [tabindex]:not([tabindex="-1"])',
    );
    if (!controls?.length) return;
    const first = controls[0];
    const last = controls[controls.length - 1];
    if (
      event.shiftKey &&
      (document.activeElement === first || document.activeElement === headingRef.current)
    ) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  return (
    <div
      ref={rootRef}
      className="report-guide-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="report-guide-title"
      aria-describedby="report-guide-summary"
      onKeyDown={handleKeyDown}
    >
      <section className="report-guide-dialog">
        <header>
          <div>
            <span className="section-kicker">Orientação permanente</span>
            <h2 id="report-guide-title" ref={headingRef} tabIndex={-1}>
              Como agir diante de algo suspeito
            </h2>
          </div>
          <button type="button" onClick={onClose} aria-label="Fechar Como reportar">
            ×
          </button>
        </header>

        <p id="report-guide-summary" className="report-guide-summary">
          Os exemplos do treinamento são fictícios. Para uma situação real,
          interrompa a interação e siga o procedimento oficial da organização.
        </p>

        <div className="report-guide-alert" role="note">
          <strong>Canal oficial ainda não configurado nesta demonstração.</strong>
          <p>Nenhum formulário, mensagem ou reporte real será enviado por este portal.</p>
        </div>

        <div className="report-guide-grid">
          <article>
            <span>01</span>
            <h3>Antes de interagir</h3>
            <ul>
              <li>Não abra links, anexos ou QR Codes inesperados.</li>
              <li>Confirme o pedido por um canal habitual e conhecido.</li>
              <li>Preserve a mensagem para que ela possa ser analisada.</li>
            </ul>
          </article>
          <article>
            <span>02</span>
            <h3>Se você já clicou ou informou algo</h3>
            <ul>
              <li>Pare a interação e não insira novos dados.</li>
              <li>Registre o que aconteceu e em qual horário.</li>
              <li>Procure imediatamente o canal oficial da organização.</li>
            </ul>
          </article>
          <article>
            <span>03</span>
            <h3>O que ajuda no reporte</h3>
            <ul>
              <li>Canal, remetente, assunto e horário do recebimento.</li>
              <li>Destino aparente e ações que você já realizou.</li>
              <li>Nunca inclua senhas, códigos ou outros dados secretos.</li>
            </ul>
          </article>
        </div>

        <div className="report-guide-footnote">
          <p>
            Evite encaminhar a mensagem suspeita para colegas e não apague
            evidências antes de receber a orientação oficial.
          </p>
          <button type="button" className="primary-button dark" onClick={onClose}>
            Entendi
          </button>
        </div>
      </section>
    </div>
  );
}
