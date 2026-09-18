"use client";

import { useParams, useRouter } from "next/navigation";
import { Eye, Gamepad2 } from "lucide-react";

import { PortalIcon } from "@/features/ui/PortalIcons";
import { findArcadePublicProfileById } from "@/lib/content/arcade-public-profiles";
import { House3DExperience } from "./House3DExperience";
import styles from "./HouseVisitorPage.module.css";
import "./house-experience.css";

export function HouseVisitorPage() {
  const router = useRouter();
  const params = useParams<{ profileId: string }>();
  const profileId = Array.isArray(params.profileId)
    ? params.profileId[0]
    : params.profileId;
  const profile = findArcadePublicProfileById(profileId);

  if (!profile) {
    return (
      <main className={styles.notFound}>
        <Gamepad2 size={34} aria-hidden="true" />
        <span>Perfil do Arcade</span>
        <h1>Esta casa não está disponível.</h1>
        <p>Volte ao pódio para escolher um dos jogadores exibidos.</p>
        <button type="button" onClick={() => router.push("/arcade/overlooked#arcade-ranking")}>
          Voltar ao ranking
        </button>
      </main>
    );
  }

  return (
    <div className={`house-page house-page--visitor ${styles.page}`}>
      <a className="skip-link" href="#visitor-house-room">
        Pular para a casa
      </a>

      <header className={`house-focus-bar ${styles.header}`} aria-label="Perfil visual do jogador">
        <button
          type="button"
          className="house-focus-back"
          onClick={() => router.push("/arcade/overlooked#arcade-ranking")}
        >
          <PortalIcon name="arrow-left" size={17} />
          <span>Voltar ao ranking</span>
        </button>

        <div className={styles.player}>
          <span className={styles.avatar} aria-hidden="true">
            {/* Avatar exportado pelo criador pixel art do projeto. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={profile.avatarUrl} alt="" />
          </span>
          <div className="house-focus-context">
            <span>Casa de {profile.nickname}</span>
            <strong>{profile.houseLabel}</strong>
          </div>
        </div>

        <div className={styles.publicBadge}>
          <Eye size={16} strokeWidth={2.1} aria-hidden="true" />
          <span><strong>Perfil público</strong>{profile.sectorName}</span>
        </div>
      </header>

      <div id="visitor-house-room" tabIndex={-1}>
        <House3DExperience
          mode="visitor"
          visitorProfileId={profile.profileId}
          visitorTheme={profile.houseTheme}
          ownerName={profile.nickname}
        />
      </div>
    </div>
  );
}
