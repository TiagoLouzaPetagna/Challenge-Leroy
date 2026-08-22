"use client";

import { useEffect, useRef } from "react";

import type { PortalViewKey } from "@/lib/activities/types";

import { PortalIcon, type PortalIconName } from "./PortalIcons";

type PortalNavGroup =
  | "aprender"
  | "praticar"
  | "explorar"
  | "conta"
  | "projeto";

const PORTAL_NAV_ITEMS: ReadonlyArray<{
  key: PortalViewKey;
  label: string;
  icon: PortalIconName;
  group: PortalNavGroup;
}> = [
  { key: "inicio", label: "Visão geral", icon: "home", group: "aprender" },
  { key: "missoes", label: "Missões", icon: "missions", group: "aprender" },
  {
    key: "simulacoes",
    label: "Simulações",
    icon: "simulations",
    group: "praticar",
  },
  {
    key: "laboratorio",
    label: "PhishLab",
    icon: "laboratory",
    group: "praticar",
  },
  { key: "arcade", label: "Arcade", icon: "arcade", group: "praticar" },
  { key: "radar", label: "Radar", icon: "radar", group: "explorar" },
  { key: "equipes", label: "Equipes", icon: "teams", group: "explorar" },
  { key: "perfil", label: "Meu perfil", icon: "profile", group: "conta" },
  {
    key: "gestao",
    label: "Painel de gestão",
    icon: "settings",
    group: "projeto",
  },
];

const PORTAL_NAV_GROUPS: ReadonlyArray<{
  id: PortalNavGroup;
  label: string;
}> = [
  { id: "aprender", label: "Aprender" },
  { id: "praticar", label: "Praticar" },
  { id: "explorar", label: "Explorar e colaborar" },
  { id: "conta", label: "Conta" },
  { id: "projeto", label: "Projeto" },
];

export function BrandMark() {
  return (
    <span className="portal-brand-mark" aria-hidden="true">
      <svg
        width="36"
        height="36"
        viewBox="0 0 48 48"
        fill="none"
        focusable="false"
      >
        <path
          d="M5 22.5 24 6l19 16.5v19a2.5 2.5 0 0 1-2.5 2.5h-33A2.5 2.5 0 0 1 5 41.5v-19Z"
          fill="var(--brand-lime, #78be20)"
        />
        <path
          d="M24 16.5c4 3 7.2 3.5 10.5 4.2v7.2c0 6.3-4.2 10.5-10.5 13.1-6.3-2.6-10.5-6.8-10.5-13.1v-7.2c3.3-.7 6.5-1.2 10.5-4.2Z"
          fill="var(--brand-forest, #173f35)"
        />
        <path
          d="m19.5 28 3 3 6.5-7"
          stroke="white"
          strokeWidth="2.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

export function PortalSidebar({
  activeView,
  onNavigate,
  "data-learning-tour": learningTourTarget = "learning-navigation",
  "data-profile-tour": profileTourTarget = "profile-navigation",
}: {
  activeView: PortalViewKey;
  onNavigate: (view: PortalViewKey) => void;
  "data-learning-tour"?: string;
  "data-profile-tour"?: string;
}) {
  const selectedView = activeView === "missao" ? "missoes" : activeView;
  const navigationRef = useRef<HTMLElement>(null);
  const activeItemRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const navigation = navigationRef.current;
    const activeItem = activeItemRef.current;
    if (!navigation || !activeItem || !window.matchMedia("(max-width: 900px)").matches) {
      return;
    }

    const navigationRect = navigation.getBoundingClientRect();
    const activeItemRect = activeItem.getBoundingClientRect();
    const centeredLeft =
      navigation.scrollLeft +
      activeItemRect.left -
      navigationRect.left -
      (navigation.clientWidth - activeItemRect.width) / 2;

    navigation.scrollTo({ left: Math.max(0, centeredLeft), behavior: "auto" });
  }, [selectedView]);

  return (
    <aside className="sidebar portal-sidebar">
      <div className="brand-lockup portal-brand-lockup">
        <BrandMark />
        <div>
          <strong>Casa Digital</strong>
          <span>aprenda a se proteger</span>
        </div>
      </div>

      <div className="prototype-tag">Protótipo funcional</div>

      <nav ref={navigationRef} aria-label="Navegação principal">
        {PORTAL_NAV_GROUPS.map((group) => (
          <div
            className="nav-group portal-nav-group"
            key={group.id}
            data-tour={group.id === "aprender" ? learningTourTarget : undefined}
          >
            <p>{group.label}</p>
            {PORTAL_NAV_ITEMS.filter((item) => item.group === group.id).map(
              (item) => (
                <button
                  type="button"
                  key={item.key}
                  ref={selectedView === item.key ? activeItemRef : undefined}
                  className={
                    selectedView === item.key ? "nav-item active" : "nav-item"
                  }
                  onClick={() => onNavigate(item.key)}
                  aria-current={selectedView === item.key ? "page" : undefined}
                  data-tour={
                    item.key === "perfil" ? profileTourTarget : undefined
                  }
                >
                  <span className="nav-icon" aria-hidden="true">
                    <PortalIcon name={item.icon} size={18} />
                  </span>
                  <span>{item.label}</span>
                </button>
              ),
            )}
          </div>
        ))}
      </nav>

      <div className="sidebar-note">
        <span className="sidebar-note-kicker">Conceito para Leroy Merlin</span>
        <strong>Aprender também protege.</strong>
      </div>
    </aside>
  );
}

export function PortalTopbar({
  learnerName,
  points,
  levelLabel,
  isHydrated,
  "data-tour": progressTourTarget = "progress-summary",
}: {
  learnerName: string;
  points: number;
  levelLabel: string;
  isHydrated: boolean;
  "data-tour"?: string;
}) {
  const initials = learnerName.slice(0, 2).toUpperCase();

  return (
    <header className="topbar portal-topbar">
      <div className="portal-topbar-welcome">
        <span className="topbar-kicker">Seu espaço de aprendizagem</span>
        <strong>Olá, {learnerName}</strong>
      </div>
      <div className="topbar-actions">
        <div
          className="topbar-progress"
          aria-live="polite"
          data-tour={progressTourTarget}
        >
          <strong>{isHydrated ? `${points} pontos` : "Carregando progresso"}</strong>
          <span>{levelLabel}</span>
        </div>
        <div className="avatar" aria-label="Perfil demonstrativo do funcionário">
          {initials}
        </div>
      </div>
    </header>
  );
}

export function ActivityFocusBar({
  contextLabel,
  areaLabel,
  points,
  levelLabel,
  onBack,
}: {
  contextLabel: string;
  areaLabel: string;
  points: number;
  levelLabel: string;
  onBack: () => void;
}) {
  return (
    <header className="activity-focus-bar" aria-label="Modo foco da atividade">
      <button type="button" className="activity-focus-back" onClick={onBack}>
        <PortalIcon name="arrow-left" size={18} />
        <span>Missões</span>
      </button>
      <div className="activity-focus-context">
        <span>{areaLabel}</span>
        <strong>{contextLabel}</strong>
      </div>
      <div className="activity-focus-meta" aria-label="Progresso geral do participante">
        <strong>{points} pontos</strong>
        <span>{levelLabel}</span>
      </div>
    </header>
  );
}
