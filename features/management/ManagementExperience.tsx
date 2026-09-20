"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState, type RefObject } from "react";
import { ArrowRight, BookOpen, Check, ChevronRight, RefreshCw, Search, UsersRound, X } from "lucide-react";

import { useAppState } from "@/app/providers";
import { PORTAL_ACTIVITY_REGISTRY } from "@/lib/activities/registry";
import type { ManagementPerson } from "@/lib/management/overview";

import styles from "./ManagementExperience.module.css";

type View = "overview" | "sectors" | "content";
type Overview = { people: ManagementPerson[]; generatedAt: string };
type SortOrder = "progress" | "recent" | "points" | "name";

const areaLabels = { mission: "Missão", phishlab: "PhishLab", simulation: "Simulação", radar: "Radar", team: "Equipes" } as const;

function formatDate(value: string | null) {
  if (!value) return "Sem atividade";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "Sem atividade" : new Intl.DateTimeFormat("pt-BR", { day: "2-digit", month: "short", year: "numeric" }).format(date);
}

function formatRefresh(value: string | null) {
  if (!value) return "";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "" : new Intl.DateTimeFormat("pt-BR", { hour: "2-digit", minute: "2-digit" }).format(date);
}

function percentage(completed: number, total: number) {
  return total ? Math.round((completed / total) * 100) : 0;
}

export function ManagementAccessDenied({ onBack }: { onBack: () => void }) {
  const { logout } = useAppState();
  return <div className={styles.deniedPage}>
    <section className={styles.deniedHero} aria-labelledby="management-denied-title">
      <div><span className={styles.eyebrow}>Área reservada</span><h1 id="management-denied-title">Painel disponível apenas para administração</h1><p>Entre com uma conta administradora para acompanhar o progresso dos funcionários.</p></div>
      <aside className={styles.deniedScope}><span>Permissão necessária</span><h2>Conta administradora</h2><p>O acesso a esta página depende da sua conta.</p></aside>
    </section>
    <section className={styles.deniedActions}><div><h2>Quer usar outra conta?</h2><p>Saia e entre com as credenciais de administração.</p></div><div className={styles.deniedActionsButtons}><button type="button" onClick={onBack}>Voltar</button><button type="button" onClick={logout}>Sair da conta</button></div></section>
  </div>;
}

function PersonDrawer({ person, onClose, closeRef }: { person: ManagementPerson; onClose: () => void; closeRef: RefObject<HTMLButtonElement | null> }) {
  const nextId = person.journey.steps.find((step) => !step.completed)?.id;
  return <div className={styles.drawerLayer}>
    <button type="button" className={styles.drawerBackdrop} aria-label="Fechar detalhes" onClick={onClose} />
    <aside className={styles.drawer} role="dialog" aria-modal="true" aria-labelledby="person-drawer-title" onKeyDown={(event) => {
      if (event.key === "Escape") onClose();
      if (event.key === "Tab") { event.preventDefault(); closeRef.current?.focus(); }
    }}>
      <div className={styles.drawerHead}><span className={styles.eyebrow}>Jornada individual</span><button ref={closeRef} type="button" className={styles.iconButton} aria-label="Fechar detalhes" onClick={onClose}><X size={20} /></button></div>
      <h2 id="person-drawer-title">{person.name}</h2>
      <p className={styles.drawerMeta}>{person.sectorName} <span aria-hidden="true">·</span> {person.employeeId}</p>
      <div className={styles.drawerProgress}><div><strong>{person.journey.completed} de {person.journey.total}</strong><span>etapas concluídas</span></div><span>{percentage(person.journey.completed, person.journey.total)}%</span><div className={styles.progressTrack}><span style={{ width: `${percentage(person.journey.completed, person.journey.total)}%` }} /></div></div>
      <div className={styles.drawerFacts}><div><span>Pontos</span><strong>{person.totalPoints.toLocaleString("pt-BR")}</strong></div><div><span>Atividades</span><strong>{person.completedActivities}</strong></div><div><span>Última atividade</span><strong>{formatDate(person.lastActivityAt)}</strong></div></div>
      <h3>Percurso</h3>
      <ol className={styles.drawerSteps}>{person.journey.steps.map((step, index) => <li key={step.id} className={step.completed ? styles.stepDone : step.id === nextId ? styles.stepNext : undefined}><span className={styles.stepNumber}>{step.completed ? <Check size={15} strokeWidth={3} /> : String(index + 1).padStart(2, "0")}</span><span className={styles.stepText}><strong>{step.title}</strong><small>{step.completed ? "Concluída" : step.id === nextId ? "Próxima atividade" : "Pendente"}</small></span></li>)}</ol>
      <p className={styles.drawerFoot}>Último acesso: {person.lastLoginAt ? formatDate(person.lastLoginAt) : "ainda não registrado"}.</p>
    </aside>
  </div>;
}

export function ManagementExperience() {
  const { account, logout } = useAppState();
  const [view, setView] = useState<View>("overview");
  const [overview, setOverview] = useState<Overview | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [sectorFilter, setSectorFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState<SortOrder>("progress");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [scrollToPeople, setScrollToPeople] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/management/overview", { cache: "no-store", credentials: "same-origin" });
      const data = await response.json() as Overview & { error?: string };
      if (!response.ok) throw new Error(data.error ?? "Não foi possível carregar o painel.");
      setOverview(data);
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Não foi possível carregar o painel.");
    } finally { setLoading(false); }
  }, []);
  useEffect(() => {
    const timer = window.setTimeout(() => { void refresh(); }, 0);
    return () => window.clearTimeout(timer);
  }, [refresh]);
  useEffect(() => {
    if (!selectedId) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => { document.body.style.overflow = previousOverflow; triggerRef.current?.focus(); };
  }, [selectedId]);
  useEffect(() => {
    if (view !== "overview" || !scrollToPeople) return;
    const frame = requestAnimationFrame(() => {
      document.getElementById("management-people-title")?.scrollIntoView({ behavior: "smooth", block: "start" });
      setScrollToPeople(false);
    });
    return () => cancelAnimationFrame(frame);
  }, [view, scrollToPeople]);

  const people = useMemo(() => overview?.people ?? [], [overview]);
  const selected = people.find((person) => person.id === selectedId) ?? null;
  const sectors = useMemo(() => {
    const map = new Map<string, { id: string; name: string; people: ManagementPerson[] }>();
    for (const person of people) {
      if (!map.has(person.sectorId)) map.set(person.sectorId, { id: person.sectorId, name: person.sectorName, people: [] });
      map.get(person.sectorId)!.people.push(person);
    }
    return [...map.values()].sort((a, b) => b.people.length - a.people.length || a.name.localeCompare(b.name, "pt-BR"));
  }, [people]);
  const filtered = useMemo(() => people.filter((person) =>
    (!query || `${person.name} ${person.employeeId}`.toLocaleLowerCase("pt-BR").includes(query.trim().toLocaleLowerCase("pt-BR"))) &&
    (sectorFilter === "all" || person.sectorId === sectorFilter) &&
    (statusFilter === "all" || person.status === statusFilter)).sort((a, b) => {
      if (sortOrder === "progress") return a.journey.completed - b.journey.completed || a.name.localeCompare(b.name, "pt-BR");
      if (sortOrder === "points") return b.totalPoints - a.totalPoints || a.name.localeCompare(b.name, "pt-BR");
      if (sortOrder === "recent") return (b.lastActivityAt ?? "").localeCompare(a.lastActivityAt ?? "") || a.name.localeCompare(b.name, "pt-BR");
      return a.name.localeCompare(b.name, "pt-BR");
    }), [people, query, sectorFilter, statusFilter, sortOrder]);

  const notStarted = people.filter((person) => person.journey.completed === 0).length;
  const finished = people.filter((person) => person.journey.total > 0 && person.journey.completed === person.journey.total).length;
  const inProgress = people.length - notStarted - finished;
  const distribution = [
    { label: "0 etapas", hint: "Antes da primeira conclusão", count: notStarted },
    { label: "1–3 etapas", hint: "Primeiros passos", count: people.filter((person) => person.journey.completed >= 1 && person.journey.completed <= 3).length },
    { label: "4–7 etapas", hint: "Reta final", count: people.filter((person) => person.journey.completed >= 4 && person.journey.completed < person.journey.total).length },
    { label: "8 etapas", hint: "Jornada concluída", count: finished },
  ];

  const openPerson = (person: ManagementPerson, button: HTMLButtonElement) => { triggerRef.current = button; setSelectedId(person.id); };
  const content = PORTAL_ACTIVITY_REGISTRY.filter((item) => !item.legacy);

  return <div className={styles.page}>
    <header className={styles.header}>
      <div className={styles.headerText}><span className={styles.eyebrow}>Painel de gestão</span><h1 id="management-title">Acompanhe a jornada.</h1><p>Veja a evolução da equipe e descubra onde cada pessoa está.</p></div>
      <Image className={styles.headerMascot} src="/mascot/leroyzin/support.png" alt="" width={180} height={180} unoptimized />
      <div className={styles.headerTools}><span>{account?.name} · {account?.sectorName}</span><button type="button" onClick={logout}>Sair</button></div>
    </header>

    <div className={styles.navigation}><nav className={styles.tabs} aria-label="Visões da gestão"><button type="button" className={view === "overview" ? styles.activeTab : undefined} aria-pressed={view === "overview"} onClick={() => setView("overview")}>Visão geral</button><button type="button" className={view === "sectors" ? styles.activeTab : undefined} aria-pressed={view === "sectors"} onClick={() => setView("sectors")}>Áreas de trabalho</button></nav><button type="button" className={styles.catalogLink} onClick={() => setView(view === "content" ? "overview" : "content")} aria-pressed={view === "content"}><BookOpen size={16} /> {view === "content" ? "Voltar à visão geral" : "Consultar conteúdos"}</button></div>
    <div className={styles.dataStatus} role="status"><span>{loading ? "Atualizando dados…" : error ? error : `Dados atualizados às ${formatRefresh(overview?.generatedAt ?? null)}`}</span><button type="button" onClick={() => void refresh()} disabled={loading}><RefreshCw size={15} /> Atualizar</button></div>

    {view === "overview" && <>
      <section className={styles.metricGrid} aria-label="Situação da jornada principal">
        <article><span>Ainda não começaram</span><strong>{notStarted}</strong><small>de {people.length} funcionários</small></article>
        <article><span>Em andamento</span><strong>{inProgress}</strong><small>com etapas da trilha concluídas</small></article>
        <article><span>Concluíram</span><strong>{finished}</strong><small>todas as etapas publicadas</small></article>
      </section>

      <section className={styles.journeyPanel} aria-labelledby="management-journey-title"><div className={styles.journeyHeading}><div><span className={styles.eyebrow}>Jornada principal</span><h2 id="management-journey-title">Onde as pessoas estão na trilha</h2><p>Distribuição pelas oito etapas publicadas.</p></div><span className={styles.journeyTotal}><UsersRound size={17} /> {people.length} pessoas</span></div>
        <div className={styles.journeyBands}>{distribution.map((band, index) => <div className={styles.journeyBand} key={band.label}><span className={styles.bandNode}>{String(index + 1).padStart(2, "0")}</span><strong>{band.count}</strong><span className={styles.bandLabel}>{band.label}</span><small>{band.hint}</small><div className={styles.bandTrack}><span style={{ width: `${percentage(band.count, people.length)}%` }} /></div></div>)}</div>
        {people.length === 0 && !loading && !error && <p className={styles.emptyHint}>Quando houver funcionários cadastrados, a evolução aparecerá aqui.</p>}
      </section>

      <section className={styles.peoplePanel} aria-labelledby="management-people-title"><div className={styles.peopleHeading}><div><span className={styles.eyebrow}>Acompanhamento individual</span><h2 id="management-people-title">Funcionários</h2><p>Encontre uma pessoa e abra a jornada completa.</p></div><span className={styles.countLabel}>{filtered.length} {filtered.length === 1 ? "pessoa" : "pessoas"}</span></div>
        <div className={styles.filters}>
          <label className={styles.searchField}><span className={styles.srOnly}>Buscar por nome ou matrícula</span><Search size={18} /><input type="search" value={query} placeholder="Buscar nome ou matrícula" onChange={(event) => setQuery(event.target.value)} /></label>
          <label><span className={styles.srOnly}>Área de trabalho</span><select value={sectorFilter} onChange={(event) => setSectorFilter(event.target.value)}><option value="all">Todas as áreas</option>{sectors.map((sector) => <option key={sector.id} value={sector.id}>{sector.name}</option>)}</select></label>
          <label><span className={styles.srOnly}>Status da conta</span><select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}><option value="all">Todos os status</option><option value="active">Ativos</option><option value="inactive">Inativos</option></select></label>
          <label><span className={styles.srOnly}>Ordenar funcionários</span><select value={sortOrder} onChange={(event) => setSortOrder(event.target.value as SortOrder)}><option value="progress">Menos etapas primeiro</option><option value="recent">Atividade recente</option><option value="points">Mais pontos</option><option value="name">Nome A–Z</option></select></label>
        </div>
        <div className={styles.tableWrap}><table><thead><tr><th>Pessoa</th><th>Jornada</th><th>Próxima atividade</th><th>Última atividade</th><th>Pontos</th><th><span className={styles.srOnly}>Detalhes</span></th></tr></thead><tbody>{filtered.map((person) => <tr key={person.id}><td><strong>{person.name}</strong><small>{person.sectorName} · {person.status === "active" ? "Ativo" : "Inativo"}</small></td><td><span className={styles.cellProgress}><strong>{person.journey.completed}/{person.journey.total}</strong><span className={styles.progressTrack}><span style={{ width: `${percentage(person.journey.completed, person.journey.total)}%` }} /></span></span></td><td>{person.journey.nextTitle ?? "Jornada concluída"}</td><td>{formatDate(person.lastActivityAt)}</td><td className={styles.pointsCell}>{person.totalPoints.toLocaleString("pt-BR")}</td><td><button type="button" className={styles.detailButton} onClick={(event) => openPerson(person, event.currentTarget)} aria-label={`Ver jornada de ${person.name}`}>Detalhes <ChevronRight size={16} /></button></td></tr>)}</tbody></table>{!loading && !error && filtered.length === 0 && <p className={styles.emptyState}>{people.length === 0 ? "Ainda não há funcionários cadastrados." : "Nenhuma pessoa corresponde aos filtros."}</p>}</div>
      </section>
    </>}

    {view === "sectors" && <section className={styles.peoplePanel} aria-labelledby="management-sectors-title"><div className={styles.peopleHeading}><div><span className={styles.eyebrow}>Visão por área</span><h2 id="management-sectors-title">Participação dos setores</h2><p>Compare o avanço médio sem depender do tamanho da equipe.</p></div></div><div className={styles.sectorList}>{sectors.map((sector) => { const participants = sector.people.filter((person) => person.completedActivities > 0).length; const averageProgress = sector.people.length ? Math.round(sector.people.reduce((total, person) => total + percentage(person.journey.completed, person.journey.total), 0) / sector.people.length) : 0; const averagePoints = sector.people.length ? Math.round(sector.people.reduce((total, person) => total + person.totalPoints, 0) / sector.people.length) : 0; return <article key={sector.id} className={styles.sectorRow}><div><span className={styles.sectorMark}><UsersRound size={21} /></span><div><h3>{sector.name}</h3><p>{sector.people.length} {sector.people.length === 1 ? "pessoa" : "pessoas"} · {participants} com atividade concluída</p></div></div><div className={styles.sectorMeasure}><strong>{averageProgress}%</strong><span>avanço médio na trilha</span><div className={styles.progressTrack}><span style={{ width: `${averageProgress}%` }} /></div></div><span className={styles.sectorPoints}>{averagePoints.toLocaleString("pt-BR")} <small>pontos por pessoa</small></span><button type="button" onClick={() => { setSectorFilter(sector.id); setView("overview"); setScrollToPeople(true); }}>Ver pessoas <ArrowRight size={16} /></button></article>; })}{!loading && !error && sectors.length === 0 && <p className={styles.emptyState}>Ainda não há áreas com funcionários cadastrados.</p>}</div></section>}

    {view === "content" && <section className={styles.peoplePanel} aria-labelledby="management-content-title"><div className={styles.peopleHeading}><div><span className={styles.eyebrow}>Consulta</span><h2 id="management-content-title">Conteúdos da jornada</h2><p>Atividades publicadas e planejadas. Esta área é somente leitura.</p></div></div><div className={styles.contentList}>{content.map((item) => <div key={item.activityId}><span>{areaLabels[item.area]}</span><strong>{item.title}</strong><small>{item.integrationStatus === "available" ? "Disponível" : "Planejado"}</small></div>)}</div></section>}

    {selected && <PersonDrawer person={selected} onClose={() => setSelectedId(null)} closeRef={closeRef} />}
  </div>;
}
