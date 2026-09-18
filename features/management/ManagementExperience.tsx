"use client";

import { useMemo, useState, type FormEvent } from "react";

import { useAppState } from "@/app/providers";
import { PORTAL_ACTIVITY_REGISTRY } from "@/lib/activities/registry";
import {
  createCustomSectorId,
  CUSTOM_SECTOR_ID,
  findSectorDefinition,
  SECTOR_CATALOG,
} from "@/lib/content/sector-catalog";
import type { ManagementTestUser } from "@/lib/domain/types";

import styles from "./ManagementExperience.module.css";

type ManagementTab = "summary" | "people" | "sectors" | "content";
type UserForm = {
  id?: string;
  name: string;
  employeeId: string;
  sectorChoice: string;
  customSectorName: string;
};

const EMPTY_FORM: UserForm = {
  name: "",
  employeeId: "",
  sectorChoice: SECTOR_CATALOG[0].id,
  customSectorName: "",
};

const MANAGEMENT_TABS: ReadonlyArray<{
  id: ManagementTab;
  label: string;
  description: string;
}> = [
  { id: "summary", label: "Resumo", description: "Situação deste recorte" },
  { id: "people", label: "Pessoas", description: "Usuários fictícios" },
  { id: "sectors", label: "Setores", description: "Distribuição local" },
  { id: "content", label: "Conteúdos", description: "Consulta do catálogo" },
];

const AREA_LABELS = {
  mission: "Missão",
  phishlab: "PhishLab",
  simulation: "Simulação",
  radar: "Radar",
  team: "Equipes",
} as const;

function normalize(value: string) {
  return value.trim().toLocaleLowerCase("pt-BR");
}

export function ManagementAccessDenied({ onBack }: { onBack: () => void }) {
  const { logout } = useAppState();

  return (
    <div className={styles.deniedPage}>
      <section className={styles.deniedHero} aria-labelledby="management-denied-title">
        <div>
          <span className={styles.eyebrow}>Área reservada</span>
          <h1 id="management-denied-title">Painel disponível apenas para administração</h1>
          <p>
            Sua conta está autenticada como funcionário. O painel de gestão só
            pode ser aberto por uma conta com papel de administrador.
          </p>
        </div>
        <aside className={styles.deniedScope}>
          <span>Permissão necessária</span>
          <h2>Conta administradora</h2>
          <p>
            Navegar para outra página não altera sua identidade ou suas
            permissões.
          </p>
        </aside>
      </section>

      <section className={styles.deniedActions}>
        <div>
          <span className={styles.eyebrow}>Troca explícita</span>
          <h2>Entre com outra conta, se necessário</h2>
          <p>
            Encerre esta sessão e use as credenciais de uma conta
            administradora.
          </p>
        </div>
        <div className={styles.actionRow}>
          <button type="button" className={styles.secondaryButton} onClick={onBack}>
            Voltar à visão geral
          </button>
          <button
            type="button"
            className={styles.primaryButton}
            onClick={logout}
          >
            Sair e entrar com outra conta
          </button>
        </div>
      </section>
    </div>
  );
}

export function ManagementExperience() {
  const {
    state,
    account,
    isHydrated,
    localSecurityNotice,
    logout,
    saveManagementTestUser,
    setManagementTestUserStatus,
  } = useAppState();
  const [activeTab, setActiveTab] = useState<ManagementTab>("summary");
  const [query, setQuery] = useState("");
  const [sectorFilter, setSectorFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [form, setForm] = useState<UserForm>(EMPTY_FORM);
  const [formOpen, setFormOpen] = useState(false);
  const [formError, setFormError] = useState("");
  const [feedback, setFeedback] = useState("");

  const users = state.admin.testUsers;
  const activeUsers = users.filter((user) => user.status === "active").length;
  const availableContent = PORTAL_ACTIVITY_REGISTRY.filter(
    (item) => !item.legacy && item.integrationStatus === "available",
  );
  const plannedContent = PORTAL_ACTIVITY_REGISTRY.filter(
    (item) => !item.legacy && item.integrationStatus === "planned",
  );

  const sectors = useMemo(() => {
    const definitions = new Map(
      SECTOR_CATALOG.map((sector) => [sector.id, { ...sector }]),
    );
    users.forEach((user) => {
      if (!definitions.has(user.sectorId)) {
        definitions.set(user.sectorId, { id: user.sectorId, name: user.sectorName });
      }
    });

    return Array.from(definitions.values())
      .map((sector) => ({
        ...sector,
        total: users.filter((user) => user.sectorId === sector.id).length,
        active: users.filter(
          (user) => user.sectorId === sector.id && user.status === "active",
        ).length,
      }))
      .sort((a, b) => b.total - a.total || a.name.localeCompare(b.name, "pt-BR"));
  }, [users]);

  const filteredUsers = useMemo(() => {
    const normalizedQuery = normalize(query);
    return users.filter((user) => {
      const matchesQuery =
        !normalizedQuery ||
        normalize(user.name).includes(normalizedQuery) ||
        normalize(user.employeeId).includes(normalizedQuery);
      const matchesSector = sectorFilter === "all" || user.sectorId === sectorFilter;
      const matchesStatus = statusFilter === "all" || user.status === statusFilter;
      return matchesQuery && matchesSector && matchesStatus;
    });
  }, [query, sectorFilter, statusFilter, users]);

  const resetForm = () => {
    setForm(EMPTY_FORM);
    setFormOpen(false);
    setFormError("");
  };

  const openNewUser = () => {
    setFeedback("");
    setForm(EMPTY_FORM);
    setFormError("");
    setFormOpen(true);
  };

  const openEditUser = (user: ManagementTestUser) => {
    const knownSector = findSectorDefinition(user.sectorId);
    setFeedback("");
    setFormError("");
    setForm({
      id: user.id,
      name: user.name,
      employeeId: user.employeeId,
      sectorChoice: knownSector ? knownSector.id : CUSTOM_SECTOR_ID,
      customSectorName: knownSector ? "" : user.sectorName,
    });
    setFormOpen(true);
  };

  const submitUser = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const knownSector = findSectorDefinition(form.sectorChoice);
    const name = form.name.trim();
    const employeeId = form.employeeId.trim();
    const sectorName = knownSector?.name ?? form.customSectorName.trim();
    const sectorId = knownSector?.id ?? createCustomSectorId(sectorName);

    if (name.length < 2) return setFormError("Informe um nome com pelo menos 2 caracteres.");
    if (employeeId.length < 3) return setFormError("Informe uma matrícula com pelo menos 3 caracteres.");
    if (sectorName.length < 2) return setFormError("Selecione ou informe o setor da pessoa.");

    try {
      saveManagementTestUser({ id: form.id, name, employeeId, sectorId, sectorName });
      setFeedback(
        form.id
          ? `${name} foi atualizado no diretório local.`
          : `${name} foi adicionado como pessoa de teste.`,
      );
      resetForm();
    } catch (error) {
      setFormError(error instanceof Error ? error.message : "Não foi possível salvar a pessoa.");
    }
  };

  const changeStatus = (user: ManagementTestUser) => {
    const nextStatus = user.status === "active" ? "inactive" : "active";
    try {
      setManagementTestUserStatus(user.id, nextStatus);
      setFeedback(
        `${user.name} foi ${nextStatus === "active" ? "ativado" : "desativado"} no diretório local.`,
      );
    } catch (error) {
      setFeedback(error instanceof Error ? error.message : "Não foi possível alterar o status.");
    }
  };

  return (
    <div className={styles.page}>
      <header className={styles.hero} aria-labelledby="management-title">
        <div className={styles.heroCopy}>
          <span className={styles.eyebrow}>Gestão administrativa · acesso por conta</span>
          <h1 id="management-title">Gestão do programa</h1>
          <p>
            Um primeiro bastidor para organizar pessoas de teste por setor e
            consultar o conteúdo já modelado. A identidade e a permissão vêm da
            conta autenticada; convites e cadastro público continuam fora deste recorte.
          </p>
        </div>
        <aside className={styles.adminCard}>
          <span>Conta administradora</span>
          <strong>{account?.name ?? state.demo.administrator.name}</strong>
          <p>{account?.employeeId ?? "Sessão autenticada"} · {account?.sectorName ?? "Administração"}</p>
          <button
            type="button"
            onClick={logout}
          >
            Sair da conta
          </button>
        </aside>
      </header>

      <nav className={styles.tabs} aria-label="Seções da gestão administrativa">
        {MANAGEMENT_TABS.map((tab) => (
          <button
            type="button"
            key={tab.id}
            className={activeTab === tab.id ? styles.activeTab : undefined}
            aria-pressed={activeTab === tab.id}
            onClick={() => setActiveTab(tab.id)}
          >
            <strong>{tab.label}</strong>
            <span>{tab.description}</span>
          </button>
        ))}
      </nav>

      {activeTab === "summary" ? (
        <div className={styles.stack}>
          <section className={styles.metricGrid} aria-label="Resumo da gestão local">
            <article><span>Pessoas de teste</span><strong>{users.length}</strong><small>{activeUsers} ativas neste diretório</small></article>
            <article><span>Setores com pessoas</span><strong>{sectors.filter((sector) => sector.total > 0).length}</strong><small>Organização somente por setor</small></article>
            <article><span>Conteúdos disponíveis</span><strong>{availableContent.length}</strong><small>{plannedContent.length} ainda planejados</small></article>
            <article><span>Alterações registradas</span><strong>{state.admin.auditLog.length}</strong><small>Histórico local do protótipo</small></article>
          </section>

          <section className={styles.summaryGrid}>
            <article className={styles.panel}>
              <span className={styles.eyebrow}>O que funciona agora</span>
              <h2>Diretório demonstrativo por setor</h2>
              <ul>
                <li>Adicionar e editar pessoas fictícias.</li>
                <li>Ativar ou desativar registros locais.</li>
                <li>Filtrar por matrícula, nome, setor e status.</li>
                <li>Consultar setores e conteúdos sem alterar o Arcade.</li>
              </ul>
              <button type="button" className={styles.primaryButton} onClick={() => setActiveTab("people")}>Gerenciar pessoas de teste</button>
            </article>
            <article className={`${styles.panel} ${styles.boundaryPanel}`}>
              <span className={styles.eyebrow}>Limite importante</span>
              <h2>Registro não é conta de acesso</h2>
              <p>
                As pessoas desta lista ainda são registros de validação do programa.
                Contas de acesso são separadas e pré-cadastradas; o fluxo para criar
                novas contas continua para uma etapa posterior.
              </p>
              <p>{localSecurityNotice}</p>
            </article>
          </section>
        </div>
      ) : null}

      {activeTab === "people" ? (
        <section className={styles.panel} aria-labelledby="management-people-title">
          <div className={styles.sectionHeading}>
            <div>
              <span className={styles.eyebrow}>Diretório local</span>
              <h2 id="management-people-title">Pessoas de teste</h2>
              <p>Registros fictícios para validar a organização por setor.</p>
            </div>
            <button type="button" className={styles.primaryButton} onClick={openNewUser}>Adicionar pessoa</button>
          </div>

          <div className={styles.filters}>
            <label><span>Buscar</span><input type="search" value={query} placeholder="Nome ou matrícula" onChange={(event) => setQuery(event.target.value)} /></label>
            <label><span>Setor</span><select value={sectorFilter} onChange={(event) => setSectorFilter(event.target.value)}><option value="all">Todos os setores</option>{sectors.map((sector) => <option key={sector.id} value={sector.id}>{sector.name}</option>)}</select></label>
            <label><span>Status</span><select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}><option value="all">Todos</option><option value="active">Ativos</option><option value="inactive">Inativos</option></select></label>
          </div>

          {feedback ? <p className={styles.feedback} role="status">{feedback}</p> : null}

          {formOpen ? (
            <form className={styles.userForm} onSubmit={submitUser}>
              <div className={styles.formHeading}>
                <div><span className={styles.eyebrow}>{form.id ? "Editar registro" : "Novo registro"}</span><h3>{form.id ? "Atualizar pessoa de teste" : "Adicionar pessoa de teste"}</h3></div>
                <button type="button" className={styles.textButton} onClick={resetForm}>Fechar</button>
              </div>
              <div className={styles.formGrid}>
                <label><span>Nome de exibição</span><input name="testUserName" minLength={2} maxLength={80} value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} /></label>
                <label><span>Matrícula de teste</span><input name="testUserEmployeeId" minLength={3} maxLength={32} value={form.employeeId} onChange={(event) => setForm({ ...form, employeeId: event.target.value })} /></label>
                <label><span>Setor</span><select name="testUserSector" value={form.sectorChoice} onChange={(event) => setForm({ ...form, sectorChoice: event.target.value })}>{SECTOR_CATALOG.map((sector) => <option key={sector.id} value={sector.id}>{sector.name}</option>)}<option value={CUSTOM_SECTOR_ID}>Outro setor</option></select></label>
                {form.sectorChoice === CUSTOM_SECTOR_ID ? <label><span>Nome do outro setor</span><input name="testUserCustomSector" minLength={2} maxLength={80} value={form.customSectorName} onChange={(event) => setForm({ ...form, customSectorName: event.target.value })} /></label> : null}
              </div>
              {formError ? <p className={styles.formError} role="alert">{formError}</p> : null}
              <div className={styles.actionRow}><button type="submit" className={styles.primaryButton} disabled={!isHydrated}>{form.id ? "Salvar alterações" : "Adicionar pessoa"}</button><button type="button" className={styles.secondaryButton} onClick={resetForm}>Cancelar</button></div>
            </form>
          ) : null}

          <div className={styles.tableWrap}>
            <table>
              <thead><tr><th>Pessoa</th><th>Matrícula</th><th>Setor</th><th>Status</th><th><span className={styles.srOnly}>Ações</span></th></tr></thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id}>
                    <td><strong>{user.name}</strong><small>Funcionário fictício</small></td>
                    <td>{user.employeeId}</td><td>{user.sectorName}</td>
                    <td><span className={user.status === "active" ? styles.activeStatus : styles.inactiveStatus}>{user.status === "active" ? "Ativo" : "Inativo"}</span></td>
                    <td><div className={styles.rowActions}><button type="button" onClick={() => openEditUser(user)}>Editar</button><button type="button" onClick={() => changeStatus(user)}>{user.status === "active" ? "Desativar" : "Ativar"}</button></div></td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filteredUsers.length === 0 ? <p className={styles.emptyState}>Nenhuma pessoa corresponde aos filtros.</p> : null}
          </div>
          <p className={styles.tableNote}>Ativar ou desativar muda somente este diretório de demonstração; não concede nem bloqueia acesso real.</p>
        </section>
      ) : null}

      {activeTab === "sectors" ? (
        <section className={styles.panel} aria-labelledby="management-sectors-title">
          <div className={styles.sectionHeading}><div><span className={styles.eyebrow}>Organização atual</span><h2 id="management-sectors-title">Setores</h2><p>Sem unidade, loja, função ou hierarquia adicional neste recorte.</p></div></div>
          <div className={styles.sectorGrid}>{sectors.map((sector) => <article key={sector.id}><span>{sector.total > 0 ? "Em uso" : "Disponível"}</span><h3>{sector.name}</h3><strong>{sector.total} {sector.total === 1 ? "pessoa" : "pessoas"}</strong><small>{sector.active} {sector.active === 1 ? "registro ativo" : "registros ativos"}</small></article>)}</div>
        </section>
      ) : null}

      {activeTab === "content" ? (
        <section className={styles.panel} aria-labelledby="management-content-title">
          <div className={styles.sectionHeading}><div><span className={styles.eyebrow}>Somente leitura</span><h2 id="management-content-title">Conteúdos modelados</h2><p>Consulta do registro atual; edição e publicação ainda não estão disponíveis.</p></div></div>
          <div className={styles.tableWrap}>
            <table>
              <thead><tr><th>Conteúdo</th><th>Área</th><th>Estado</th><th>Versão</th></tr></thead>
              <tbody>{PORTAL_ACTIVITY_REGISTRY.filter((item) => !item.legacy).map((item) => <tr key={item.activityId}><td><strong>{item.title}</strong><small>{item.activityId}</small></td><td>{AREA_LABELS[item.area]}</td><td><span className={item.integrationStatus === "available" ? styles.activeStatus : styles.plannedStatus}>{item.integrationStatus === "available" ? "Disponível" : "Planejado"}</span></td><td>{item.publishedVersion ?? "—"}</td></tr>)}</tbody>
            </table>
          </div>
          <p className={styles.tableNote}>O Arcade permanece fora deste recorte administrativo e não foi alterado.</p>
        </section>
      ) : null}
    </div>
  );
}
