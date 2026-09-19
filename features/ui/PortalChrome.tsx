"use client";

import {
  useEffect,
  type KeyboardEvent,
  type RefObject,
} from "react";

import type { PortalViewKey } from "@/lib/activities/types";

import { PortalIcon, type PortalIconName } from "./PortalIcons";
import styles from "./Shell.module.css";

const PORTAL_NAV_ITEMS: ReadonlyArray<{
  key: PortalViewKey;
  label: string;
  icon: PortalIconName;
}> = [
  { key: "inicio", label: "Visão geral", icon: "home" },
  { key: "missoes", label: "Missões", icon: "missions" },
  { key: "laboratorio", label: "PhishLab", icon: "laboratory" },
  { key: "simulacoes", label: "Simulações", icon: "simulations" },
  { key: "radar", label: "Radar", icon: "radar" },
  { key: "equipes", label: "Equipes", icon: "teams" },
  { key: "arcade", label: "Arcade", icon: "arcade" },
  { key: "perfil", label: "Meu perfil", icon: "profile" },
  { key: "gestao", label: "Painel de gestão", icon: "settings" },
];

export function BrandMark() {
  return (
    <span className={styles.brandMark} aria-hidden="true">
      <svg
        width="36"
        height="36"
        viewBox="0 0 48 48"
        fill="none"
        focusable="false"
      >
        <path
          d="M8 24 24 9l16 15"
          stroke="var(--brand-ink)"
          strokeWidth="3"
          strokeLinejoin="round"
        />
        <path
          d="M12 22v17h24V22"
          fill="var(--brand-lime)"
          stroke="var(--brand-ink)"
          strokeWidth="3"
          strokeLinejoin="round"
        />
        <rect
          x="20"
          y="27"
          width="8"
          height="12"
          fill="var(--brand-white)"
          stroke="var(--brand-ink)"
          strokeWidth="2.5"
        />
      </svg>
    </span>
  );
}

export function PortalTopbar({
  menuOpen,
  onToggleMenu,
  menuButtonRef,
  onAvatarClick,
  onBrandClick,
  learnerName,
  points,
  levelLabel,
  isHydrated,
  inert: isInert = false,
  "data-tour": progressTourTarget = "progress-summary",
}: {
  menuOpen: boolean;
  onToggleMenu: () => void;
  menuButtonRef: RefObject<HTMLButtonElement | null>;
  onAvatarClick: () => void;
  onBrandClick: () => void;
  learnerName: string;
  points: number;
  levelLabel: string;
  isHydrated: boolean;
  inert?: boolean;
  "data-tour"?: string;
}) {
  const initials = learnerName.slice(0, 2).toUpperCase();

  return (
    <header
      className={styles.topbar}
      inert={isInert ? true : undefined}
      aria-hidden={isInert ? "true" : undefined}
    >
      <button
        type="button"
        ref={menuButtonRef}
        className={styles.menuButton}
        onClick={onToggleMenu}
        aria-expanded={menuOpen}
        aria-controls="portal-menu-panel"
      >
        <PortalIcon name="menu" size={18} />
        <span>{menuOpen ? "Fechar" : "Menu"}</span>
      </button>
      <button
        type="button"
        className={styles.brand}
        onClick={onBrandClick}
        aria-label="Ir para a visão geral da Casa Digital Segura"
      >
        <BrandMark />
        <strong aria-hidden="true">Casa Digital Segura</strong>
      </button>
      <div className={styles.spacer} />
      <div
        className={styles.progress}
        aria-live="polite"
        data-tour={progressTourTarget}
      >
        <strong>{isHydrated ? `${points} pontos` : "Carregando"}</strong>
        <span>{levelLabel}</span>
      </div>
      <button
        type="button"
        className={styles.avatar}
        onClick={onAvatarClick}
        aria-label={`Ver perfil de ${learnerName}`}
      >
        {initials}
      </button>
    </header>
  );
}

export function PortalMenuPanel({
  open,
  activeView,
  onNavigate,
  onClose,
  onLogout,
  canAccessManagement = false,
  storeLabel,
  returnFocusRef,
  hideBackdrop = false,
}: {
  open: boolean;
  activeView: PortalViewKey;
  onNavigate: (view: PortalViewKey) => void;
  onClose: () => void;
  onLogout?: () => void | Promise<void>;
  canAccessManagement?: boolean;
  storeLabel: string;
  returnFocusRef: RefObject<HTMLButtonElement | null>;
  hideBackdrop?: boolean;
}) {
  const selectedView = activeView === "missao" ? "missoes" : activeView;
  const visibleItems = PORTAL_NAV_ITEMS.filter(
    (item) => item.key !== "gestao" || canAccessManagement,
  );

  useEffect(() => {
    if (!open) return;
    const panel = document.getElementById("portal-menu-panel");
    panel?.querySelector<HTMLElement>("button")?.focus();
  }, [open]);

  if (!open) return null;

  const closeAndReturnFocus = () => {
    onClose();
    window.requestAnimationFrame(() => returnFocusRef.current?.focus());
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === "Escape") {
      event.preventDefault();
      closeAndReturnFocus();
      return;
    }
    if (event.key !== "Tab") return;
    const controls = event.currentTarget.querySelectorAll<HTMLElement>(
      'button:not([disabled]), [href], [tabindex]:not([tabindex="-1"])',
    );
    if (!controls.length) return;
    const first = controls[0];
    const last = controls[controls.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  return (
    <>
      {!hideBackdrop ? (
        <button
          type="button"
          className={styles.panelBackdrop}
          aria-label="Fechar menu"
          onClick={closeAndReturnFocus}
        />
      ) : null}
      <aside
        id="portal-menu-panel"
        className={styles.panel}
        data-tour="menu-panel"
        aria-label="Menu principal"
        onKeyDown={handleKeyDown}
      >
        <div className={styles.panelHeading}>
          <strong>Menu</strong>
          <button
            type="button"
            className={styles.closeButton}
            onClick={closeAndReturnFocus}
            aria-label="Fechar menu"
          >
            ×
          </button>
        </div>
        <nav aria-label="Navegação principal">
          <ul className={styles.panelNav}>
            {visibleItems.map((item) => {
              const isActive = selectedView === item.key;
              return (
                <li key={item.key}>
                  <button
                    type="button"
                    className={
                      isActive
                        ? `${styles.navItem} ${styles.navItemActive}`
                        : styles.navItem
                    }
                    onClick={() => onNavigate(item.key)}
                    aria-current={isActive ? "page" : undefined}
                    data-tour={
                      item.key === "perfil" ? "profile-navigation" : undefined
                    }
                  >
                    <span
                      className={styles.tile}
                      aria-hidden="true"
                    >
                      <PortalIcon name={item.icon} size={20} />
                    </span>
                    <span>{item.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
        <div className={styles.panelFooter}>
          <span>{storeLabel}</span>
          {onLogout ? (
            <button type="button" onClick={() => void onLogout()}>
              Sair da conta
            </button>
          ) : null}
        </div>
      </aside>
    </>
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
      <button
        type="button"
        className="activity-focus-back"
        onClick={onBack}
        aria-label={`Voltar para ${areaLabel}`}
        title={`Voltar para ${areaLabel}`}
      >
        <PortalIcon name="arrow-left" size={20} />
      </button>
      <div className="activity-focus-context">
        <span>{areaLabel}</span>
        <strong>{contextLabel}</strong>
      </div>
      <div
        className="activity-focus-meta"
        aria-label="Progresso geral do participante"
      >
        <strong>{points} pontos</strong>
        <span>{levelLabel}</span>
      </div>
    </header>
  );
}
