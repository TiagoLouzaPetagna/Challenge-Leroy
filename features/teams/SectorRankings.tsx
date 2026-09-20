"use client";

import { useEffect, useState } from "react";
import {
  BriefcaseBusiness,
  Boxes,
  Building2,
  Cpu,
  Headset,
  Handshake,
  Landmark,
  Megaphone,
  Package,
  Phone,
  Shield,
  Store,
  Truck,
  Trophy,
  Users,
  Warehouse,
  Wrench,
} from "lucide-react";

import type { SectorRankingEntry, TeamRankingsResponse } from "@/lib/teams/rankings";

import styles from "./SectorRankings.module.css";

type RankingTab = "participation" | "points";
type EmblemIcon = typeof Shield;

const emblemIcons: Record<string, EmblemIcon> = {
  "centro-distribuicao": Warehouse,
  "loja-atendimento": Headset,
  "loja-comercio": Store,
  "loja-gestao": BriefcaseBusiness,
  "loja-logistica": Truck,
  "loja-novos-negocios": Handshake,
  "loja-servicos": Wrench,
  "matriz-cadeia-suprimentos": Boxes,
  "matriz-expansao": Building2,
  "matriz-experiencia-atendimento-clientes": Headset,
  "matriz-marketing": Megaphone,
  "matriz-novos-negocios": Handshake,
  "matriz-oferta-produto": Package,
  "matriz-performance-economico-financeira": Landmark,
  "matriz-recursos-humanos": Users,
  "matriz-tecnologia": Cpu,
  plataforma: Boxes,
  televendas: Phone,
};

const numberFormat = new Intl.NumberFormat("pt-BR", { maximumFractionDigits: 1 });

function SectorEmblem({ entry }: { entry: SectorRankingEntry }) {
  const Icon = emblemIcons[entry.sectorId] ?? Shield;
  return (
    <span className={styles.emblem} aria-hidden="true">
      <Icon size={32} strokeWidth={1.8} />
    </span>
  );
}

function Metric({ entry, tab }: { entry: SectorRankingEntry; tab: RankingTab }) {
  return tab === "participation" ? (
    <>
      <strong>{numberFormat.format(entry.participationRate)}%</strong>
      <span>{entry.participants} de {entry.eligibleMembers} {entry.eligibleMembers === 1 ? "pessoa" : "pessoas"}</span>
    </>
  ) : (
    <>
      <strong>{numberFormat.format(entry.averagePoints)}</strong>
      <span>pontos por pessoa</span>
    </>
  );
}

export function SectorRankings() {
  const [ranking, setRanking] = useState<TeamRankingsResponse | null>(null);
  const [tab, setTab] = useState<RankingTab>("participation");
  const [error, setError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/teams/rankings", { credentials: "same-origin", cache: "no-store", signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error("unavailable");
        return response.json() as Promise<TeamRankingsResponse>;
      })
      .then((result) => { setRanking(result); setError(false); })
      .catch((cause) => {
        if (cause instanceof DOMException && cause.name === "AbortError") return;
        setError(true);
      });
    return () => controller.abort();
  }, []);

  const entries = ranking?.[tab] ?? [];
  const podium = entries.slice(0, 3);
  const description = tab === "participation"
    ? `Quem mais participou do desafio da área ${ranking ? `em ${ranking.periodLabel}` : "neste mês"}. Cada pessoa conta uma vez.`
    : "Média dos pontos gerais de todas as pessoas ativas da área, inclusive quem ainda não pontuou.";

  return (
    <section className={styles.section} aria-labelledby="sector-ranking-title">
      <div className={styles.heading}>
        <div>
          <span className={styles.kicker}>ENTRE ÁREAS</span>
          <h2 id="sector-ranking-title">Top 3 das áreas</h2>
          <p>Compare as áreas de trabalho por participação ou pela média de pontos.</p>
        </div>
        <Trophy size={29} strokeWidth={1.7} className={styles.trophy} aria-hidden="true" />
      </div>

      <div className={styles.tabs} role="tablist" aria-label="Tipo de ranking">
        <button type="button" role="tab" id="sector-participation-tab" aria-controls="sector-ranking-panel" aria-selected={tab === "participation"} className={tab === "participation" ? styles.selected : ""} onClick={() => setTab("participation")}>Participação</button>
        <button type="button" role="tab" id="sector-points-tab" aria-controls="sector-ranking-panel" aria-selected={tab === "points"} className={tab === "points" ? styles.selected : ""} onClick={() => setTab("points")}>Média de pontos</button>
      </div>

      <div className={styles.panel} role="tabpanel" id="sector-ranking-panel" aria-labelledby={tab === "participation" ? "sector-participation-tab" : "sector-points-tab"}>
        <p className={styles.description}>{description}</p>
        {error ? <p className={styles.feedback} role="alert">Os rankings não puderam ser carregados agora.</p> : null}
        {!error && !ranking ? <p className={styles.feedback} role="status">Carregando rankings…</p> : null}
        {ranking && entries.length === 0 ? <p className={styles.feedback}>As áreas aparecem aqui quando há contas ativas.</p> : null}
        {ranking && podium.length > 0 ? (
          <div className={styles.podium} aria-label="Até três primeiras áreas">
            {podium.map((entry) => (
              <article className={`${styles.card} ${entry.position === 1 ? styles.first : entry.position === 2 ? styles.second : styles.third} ${entry.isCurrent ? styles.current : ""}`} key={entry.sectorId}>
                <span className={styles.place}>{entry.position}º lugar</span>
                <SectorEmblem entry={entry} />
                <h3>{entry.sectorName}</h3>
                {entry.isCurrent ? <span className={styles.yourSector}>Sua área</span> : null}
                <div className={styles.metric}><Metric entry={entry} tab={tab} /></div>
              </article>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
