"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Eye, House } from "lucide-react";

import { PortalIcon } from "@/features/ui/PortalIcons";
import { findArcadePublicProfileById } from "@/lib/content/arcade-public-profiles";
import type { PublicHouse } from "@/lib/house/public-houses";
import { House3DExperience } from "./House3DExperience";
import styles from "./HouseVisitorPage.module.css";
import "./house-experience.css";

export function HouseVisitorPage() {
  const router = useRouter();
  const params = useParams<{ profileId: string }>();
  const profileId = Array.isArray(params.profileId)
    ? params.profileId[0]
    : params.profileId;
  const model = findArcadePublicProfileById(profileId);
  const [published, setPublished] = useState<PublicHouse | null>(null);
  const [loading, setLoading] = useState(!model);
  useEffect(() => {
    if (model) return;
    let active = true;
    fetch(`/api/houses/${encodeURIComponent(profileId)}`, { cache: "no-store" })
      .then((response) => response.ok ? response.json() : null)
      .then((data) => { if (active) setPublished(data?.house ?? null); })
      .catch(() => {})
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [model, profileId]);
  const profile = model ?? published;

  if (loading) return <main className={styles.notFound}><House size={34} aria-hidden="true" /><p>Preparando a visita…</p></main>;

  if (!profile) {
    return (
      <main className={styles.notFound}>
        <House size={34} aria-hidden="true" />
        <span>Vizinhança digital</span>
        <h1>Esta casa não está disponível.</h1>
        <p>Volte à vizinhança para escolher outra casa.</p>
        <button type="button" onClick={() => router.push("/casas")}>
          Explorar casas
        </button>
      </main>
    );
  }

  return (
    <div className={`house-page house-page--visitor ${styles.page}`}>
      <a className="skip-link" href="#visitor-house-room">
        Pular para a casa
      </a>

      <header className={`house-focus-bar ${styles.header}`} aria-label="Perfil visual do visitante">
        <button
          type="button"
          className="house-focus-back"
          onClick={() => router.push("/casas")}
        >
          <PortalIcon name="arrow-left" size={17} />
          <span>Explorar casas</span>
        </button>

        <div className={styles.player}>
          {profile.avatarUrl && <span className={styles.avatar} aria-hidden="true"><img src={profile.avatarUrl} alt="" /></span>}
          <div className="house-focus-context">
            <span>Casa de {profile.nickname}</span>
            <strong>{model ? model.houseLabel : "Casa compartilhada"}</strong>
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
          publishedVisitor={!model}
          visitorTheme={model ? model.houseTheme : published?.theme}
          ownerName={profile.nickname}
        />
      </div>
    </div>
  );
}
