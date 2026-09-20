"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowUpRight, House, MapPinned, UsersRound } from "lucide-react";

import { ARCADE_PUBLIC_PROFILES } from "@/lib/content/arcade-public-profiles";
import type { PublicHouse } from "@/lib/house/public-houses";
import styles from "./HouseGalleryPage.module.css";

type GalleryHouse = PublicHouse & { model?: boolean; characterUrl?: string };

const modelHouses: GalleryHouse[] = ARCADE_PUBLIC_PROFILES.map((profile) => ({
  profileId: profile.profileId,
  nickname: profile.nickname,
  sectorId: "",
  sectorName: profile.sectorName,
  avatarUrl: profile.avatarUrl,
  characterUrl: profile.animatedAvatarUrl,
  thumbnailUrl: null,
  theme: profile.houseTheme,
  updatedAt: "",
  model: true,
}));

export function HouseGalleryPage() {
  const router = useRouter();
  const [houses, setHouses] = useState<PublicHouse[]>([]);
  const [mine, setMine] = useState<PublicHouse | null>(null);
  const [sectorId, setSectorId] = useState("");
  const [sectorName, setSectorName] = useState("");
  const [filter, setFilter] = useState<"all" | "sector">("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/houses", { cache: "no-store" })
      .then(async (response) => {
        if (response.status === 401) { router.replace("/login?returnTo=%2Fcasas"); throw new Error("Abra sua conta para visitar as casas."); }
        if (!response.ok) throw new Error("Não foi possível carregar as casas publicadas.");
        return response.json();
      })
      .then((data) => { setHouses(data.houses ?? []); setMine(data.mine ?? null); setSectorId(data.sectorId ?? ""); setSectorName(data.sectorName ?? ""); })
      .catch((reason) => setError(reason.message))
      .finally(() => setLoading(false));
  }, [router]);

  const visible = useMemo<GalleryHouse[]>(() => {
    const real = filter === "sector" ? houses.filter((house) => house.sectorId === sectorId) : houses;
    const models = filter === "sector" ? modelHouses.filter((house) => house.sectorName === sectorName) : modelHouses;
    return [...real, ...models];
  }, [filter, houses, sectorName, sectorId]);

  return (
    <main className={styles.page}>
      <header className={styles.topbar}>
        <button type="button" className={styles.back} onClick={() => router.push("/perfil")}><ArrowLeft size={18} /> Meu perfil</button>
        <span className={styles.brand}><House size={19} /> Casa Digital Segura</span>
      </header>

      <div className={styles.content}>
        <section className={styles.hero}>
          <div className={styles.heroCopy}>
            <span className={styles.eyebrow}><MapPinned size={17} /> Vizinhança digital</span>
            <h1>Uma casa para cada história.</h1>
            <p>Explore os espaços que outras pessoas criaram. Entre, olhe ao redor e volte quando quiser.</p>
            <div className={styles.heroActions}>
              <button type="button" className={styles.primary} onClick={() => router.push("/casa")}>Entrar na minha casa <ArrowUpRight size={17} /></button>
              <span>{mine ? "Sua casa está aberta para visitas" : "Sua casa só aparece aqui se você a publicar"}</span>
            </div>
          </div>
          <div className={styles.heroArt} aria-hidden="true">
            <div className={styles.heroHalo} />
            <House size={134} strokeWidth={1.05} />
            <span className={styles.heroArtGround} />
            <span className={styles.heroArtSpark}>✦</span>
          </div>
        </section>

        <section className={styles.listing} aria-labelledby="houses-title">
          <div className={styles.listingHeader}>
            <div><span className={styles.eyebrow}><UsersRound size={16} /> Comunidade</span><h2 id="houses-title">Casas para visitar</h2></div>
            <div className={styles.filters} role="group" aria-label="Filtrar casas">
              <button type="button" aria-pressed={filter === "all"} onClick={() => setFilter("all")}>Todas</button>
              <button type="button" aria-pressed={filter === "sector"} onClick={() => setFilter("sector")}>Meu setor</button>
            </div>
          </div>
          {error && <p className={styles.notice} role="status">{error}</p>}
          {loading ? <p className={styles.notice} role="status">Preparando as casas…</p> : visible.length === 0 ? (
            <div className={styles.empty}><House size={30} /><strong>Nenhuma casa deste setor ainda.</strong><p>Você pode explorar todas as casas ou publicar a sua para abrir a vizinhança.</p></div>
          ) : (
            <div className={styles.grid}>
              {visible.map((house) => (
                <button type="button" className={`${styles.card} ${styles[house.theme]}`} key={house.profileId} onClick={() => router.push(`/casa/${house.profileId}`)}>
                  <span className={styles.preview}>
                    {house.thumbnailUrl ? <img className={styles.thumbnail} src={house.thumbnailUrl} alt="" /> : house.characterUrl ? <><House size={120} strokeWidth={.9} className={styles.backdropHouse} aria-hidden="true" /><img className={styles.character} src={house.characterUrl} alt="" /></> : <House size={76} strokeWidth={1.1} aria-hidden="true" />}
                    {house.model && <span className={styles.modelTag}>Casa modelo</span>}
                  </span>
                  <span className={styles.cardFooter}>
                    <span className={styles.avatar}>{house.avatarUrl ? <img src={house.avatarUrl} alt="" /> : <House size={19} aria-hidden="true" />}</span>
                    <span className={styles.cardCopy}><strong>{house.nickname}</strong><small>{house.sectorName}</small></span>
                    <ArrowUpRight size={19} className={styles.cardArrow} aria-hidden="true" />
                  </span>
                </button>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
