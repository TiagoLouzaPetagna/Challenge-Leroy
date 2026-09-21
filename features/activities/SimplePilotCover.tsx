import { Check, FileText, Link2, Paperclip, Search } from "lucide-react";
import styles from "./SimplePilotCover.module.css";
import type { SimplePilotCoverKind } from "@/lib/content/activities/simple-pilots";

export function SimplePilotCover({ kind }: { kind: SimplePilotCoverKind }) {
  if (kind === "manager") {
    return (
      <div className={`${styles.cover} ${styles.manager}`} aria-hidden="true">
        <div className={styles.managerPaper}>
          <span className={styles.paperKicker}>Cadastro de fornecedor</span>
          <strong>Alteração solicitada</strong>
          <span className={styles.paperLine} />
          <span className={styles.paperLineShort} />
          <span className={styles.approvalLine}><span>01</span><Check size={14} strokeWidth={3} /> Aprovado</span>
          <span className={styles.approvalPending}><span>02</span> Aguardando</span>
        </div>
        <span className={styles.managerNote}>É urgente!</span>
        <span className={styles.managerClip} />
      </div>
    );
  }

  if (kind === "attachment") {
    return (
      <div className={`${styles.cover} ${styles.attachment}`} aria-hidden="true">
        <div className={styles.attachmentEnvelope}>
          <span className={styles.attachmentEnvelopeTop} />
          <div className={styles.attachmentSheet}>
            <span>ARQUIVO RECEBIDO</span>
            <FileText size={34} strokeWidth={1.8} />
            <i /><i /><i />
          </div>
        </div>
        <span className={styles.attachmentClip}><Paperclip size={27} strokeWidth={2.3} /></span>
      </div>
    );
  }

  if (kind === "chain") {
    return (
      <div className={`${styles.cover} ${styles.chain}`} aria-hidden="true">
        <span className={styles.chainThread} />
        <div className={`${styles.chainCard} ${styles.chainCardFirst}`}><Link2 size={18} /><strong>DOCUMENTO</strong><i /></div>
        <div className={`${styles.chainCard} ${styles.chainCardMiddle}`}><span>01</span><strong>REDIRECIONAR</strong><i /></div>
        <div className={`${styles.chainCard} ${styles.chainCardLast}`}><span>02</span><strong>DESTINO FINAL</strong><i /></div>
      </div>
    );
  }

  return (
    <div className={`${styles.cover} ${styles.lookalike}`} aria-hidden="true">
      <div className={styles.browserTop}><i /><i /><i /><span>comparar endereço</span></div>
      <div className={styles.addressStack}>
        <div className={styles.addressReference}><span>REFERÊNCIA</span><strong>contas.empre<span>s</span>a.example</strong></div>
        <div className={styles.addressReceived}><span>AVISO RECEBIDO</span><strong>contas.empre<span>z</span>a.example</strong></div>
      </div>
      <span className={styles.coverLens}><Search size={31} strokeWidth={2.8} /></span>
    </div>
  );
}
