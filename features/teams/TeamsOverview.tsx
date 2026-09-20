"use client";

import { useEffect, useState } from "react";
import { ArrowRight, ClipboardCheck, MailCheck, RefreshCw, ShieldCheck, Trophy } from "lucide-react";

import { SectionBanner } from "@/features/ui/SectionBanner";
import { POINT_RULES } from "@/lib/domain/rules";
import { currentTeamPeriod, getTeamProtocolCase, type TeamProtocolBoard } from "@/lib/teams/protocol";

import { SectorRankings } from "./SectorRankings";
import styles from "./TeamsOverview.module.css";

type Props = {
  teamName: string;
  onOpenProtocol: () => void;
  onOpenBankChange: () => void;
  onOpenInbox: () => void;
  bankChangeClaimedPoints: number | null;
  inboxClaimedPoints: number | null;
};

export function TeamsOverview({ teamName, onOpenProtocol, onOpenBankChange, onOpenInbox, bankChangeClaimedPoints, inboxClaimedPoints }: Props) {
  const [section, setSection] = useState<"activity" | "ranking">("activity");
  const [board, setBoard] = useState<TeamProtocolBoard | null>(null);
  const [error, setError] = useState("");
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/teams/protocol", { credentials: "same-origin", cache: "no-store", signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error("unavailable");
        return response.json() as Promise<TeamProtocolBoard>;
      })
      .then((result) => { setBoard(result); setError(""); })
      .catch((cause) => {
        if (cause instanceof DOMException && cause.name === "AbortError") return;
        setError("O progresso da área não pôde ser carregado.");
      });
    return () => controller.abort();
  }, [refresh]);

  const caseFile = getTeamProtocolCase(board?.sectorId ?? "", board?.periodId ?? currentTeamPeriod().id);
  const participated = Boolean(board?.myOrder);
  return (
    <div className={styles.page}>
      <SectionBanner variant="teams" labelledBy="teams-title">
        <span>SUA ÁREA · {board?.sectorName ?? teamName}</span>
        <h1 id="teams-title">Equipes</h1>
        <p>Participe dos desafios da sua área e acompanhe o ranking entre equipes.</p>
      </SectionBanner>

      <div className={styles.sectionTabs} role="tablist" aria-label="Áreas de Equipes">
        <button type="button" role="tab" id="teams-activity-tab" aria-controls="teams-activity-panel" aria-selected={section === "activity"} className={section === "activity" ? styles.activeTab : ""} onClick={() => setSection("activity")}><ClipboardCheck size={19} aria-hidden="true" /> Atividades</button>
        <button type="button" role="tab" id="teams-ranking-tab" aria-controls="teams-ranking-panel" aria-selected={section === "ranking"} className={section === "ranking" ? styles.activeTab : ""} onClick={() => setSection("ranking")}><Trophy size={19} aria-hidden="true" /> Ranking</button>
      </div>

      {section === "activity" ? <div className={styles.sectionPanel} role="tabpanel" id="teams-activity-panel" aria-labelledby="teams-activity-tab">
      <section className={styles.featured} aria-labelledby="team-current-title">
        <div className={styles.featuredIcon}><ClipboardCheck size={30} strokeWidth={1.7} aria-hidden="true" /></div>
        <div className={styles.featuredCopy}>
          <span className={styles.kicker}>ATIVIDADE DA ÁREA {board ? `· ${board.periodLabel.toUpperCase()}` : ""}</span>
          <h2 id="team-current-title">Desafio da área</h2>
          <p>{caseFile.situation} Monte a sequência de ações que você tomaria.</p>
          <button type="button" className="primary-button" onClick={onOpenProtocol}>
            {participated ? "Rever minha decisão" : "Começar desafio"} <ArrowRight size={18} aria-hidden="true" />
          </button>
        </div>
        <div className={styles.featuredProgress} aria-label={`${board?.participants ?? 0} ${(board?.participants ?? 0) === 1 ? "pessoa participou" : "pessoas participaram"} nesta rodada`}>
          <strong>{board?.participants ?? 0}</strong>
          <span>{(board?.participants ?? 0) === 1 ? "pessoa" : "pessoas"}</span>
        </div>
      </section>

      <section className={styles.protocol} aria-labelledby="team-protocol-title">
        <div className={styles.sectionHeading}>
          <div>
            <span className={styles.kicker}>RESULTADO DA ÁREA</span>
            <h2 id="team-protocol-title">Resultado da área</h2>
          </div>
          <button type="button" className={styles.refresh} onClick={() => setRefresh((value) => value + 1)} aria-label="Atualizar progresso da área">
            <RefreshCw size={16} aria-hidden="true" /> Atualizar
          </button>
        </div>
        <p className={styles.protocolIntro}>Todos analisam o mesmo caso. O painel reúne as participações sem mostrar respostas individuais.</p>
        {error ? <p role="alert" className={styles.error}>{error}</p> : null}
        <div className={styles.stats}>
          <div><strong>{board?.participants ?? 0}</strong><span>{(board?.participants ?? 0) === 1 ? "pessoa analisou" : "pessoas analisaram"} o caso</span></div>
          <div><strong>{board?.safeDecisions ?? "—"}</strong><span>{board?.safeDecisions === null || board === null ? "decisões seguras aparecem após 3 participações" : "decisões seguras"}</span></div>
        </div>
      </section>

      <section className={styles.more} aria-labelledby="team-more-title">
        <div className={styles.sectionHeading}><div><span className={styles.kicker}>MAIS PRÁTICAS</span><h2 id="team-more-title">Continue treinando</h2></div></div>
        <div className={styles.moreGrid}>
          <button type="button" onClick={onOpenBankChange}><ShieldCheck size={24} aria-hidden="true" /><span><strong>Mudança bancária sem atalho</strong><small>Confirme uma alteração antes do pagamento.</small><span className={styles.reward}>{bankChangeClaimedPoints === null ? `${POINT_RULES.teamOperation} pontos-base + bônus` : `${bankChangeClaimedPoints} pontos recebidos`}</span></span><ArrowRight size={18} aria-hidden="true" /></button>
          <button type="button" onClick={onOpenInbox}><MailCheck size={24} aria-hidden="true" /><span><strong>Caixa de Entrada Segura</strong><small>Analise mensagens e escolha como agir.</small><span className={styles.reward}>{inboxClaimedPoints === null ? `${POINT_RULES.teamOperation} pontos-base + bônus` : `${inboxClaimedPoints} pontos recebidos`}</span></span><ArrowRight size={18} aria-hidden="true" /></button>
        </div>
      </section>
      </div> : <div role="tabpanel" id="teams-ranking-panel" aria-labelledby="teams-ranking-tab"><SectorRankings /></div>}
    </div>
  );
}
