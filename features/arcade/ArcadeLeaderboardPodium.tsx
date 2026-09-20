"use client";

import Link from "next/link";
import { House } from "lucide-react";

import type { OverlookedDuoLeaderboardEntry, OverlookedLeaderboardEntry } from "@/lib/arcade/overlooked";

import styles from "./ArcadeLeaderboardPodium.module.css";

type ArcadeLeaderboardPodiumProps = {
  entries: OverlookedLeaderboardEntry[];
  duoEntries?: OverlookedDuoLeaderboardEntry[];
  gameTitle?: string;
  scoreUnit?: string;
  singularScoreUnit?: string;
};

function Avatar({ entry }: { entry: Pick<OverlookedLeaderboardEntry, "nickname" | "animatedAvatarUrl" | "avatarUrl" | "profileId"> }) {
  const content = (
    <>
      {/* Presets exported by the project's avatar creator must keep hard pixel edges. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className={styles.animatedAvatar} src={entry.animatedAvatarUrl} alt="" aria-hidden="true" />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className={styles.staticAvatar} src={entry.avatarUrl} alt="" aria-hidden="true" />
      {entry.profileId ? <span className={styles.visitHint}><House size={14} strokeWidth={2.2} /> Visitar casa</span> : null}
    </>
  );

  if (!entry.profileId) {
    return <span className={styles.avatar}>{content}</span>;
  }

  return (
    <Link
      className={`${styles.avatar} ${styles.avatarLink}`}
      href={`/casa/${entry.profileId}`}
      aria-label={`Visitar a casa 3D de ${entry.nickname}`}
    >
      {content}
    </Link>
  );
}

export function ArcadeLeaderboardPodium({ entries, duoEntries, gameTitle = "Office Defenders", scoreUnit = "pts", singularScoreUnit }: ArcadeLeaderboardPodiumProps) {
  const isDuo = duoEntries !== undefined;
  return (
    <div className={`${styles.stage} ${isDuo ? styles.duoStage : ""}`}>
      <div className={styles.artboard}>
        {/* This is the podium itself: a single transparent raster sprite, not CSS geometry. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className={styles.podiumSprite}
          src="/arcade/podium/podium-pixel-art.png"
          alt=""
          aria-hidden="true"
        />

        <ol className={styles.competitors} aria-label={`Três melhores ${isDuo ? "duplas" : "jogadores"} de ${gameTitle}`}>
          {isDuo ? duoEntries.slice(0, 3).map((entry) => (
            <li key={`${entry.position}:${entry.players.map((player) => player.nickname).join(":")}`}
              className={`${styles.card} ${styles.duoCard} ${entry.isCurrent ? styles.current : ""}`}
              data-position={entry.position}>
              <div className={styles.duoAvatars}>
                {entry.players.map((player, index) => <Avatar key={index} entry={player} />)}
              </div>
              <div className={`${styles.identity} ${styles.duoIdentity}`}>
                <strong>{entry.players[0].nickname} <span aria-hidden="true">&</span> {entry.players[1].nickname}</strong>
                <span>{entry.score} {entry.score === 1 && singularScoreUnit ? singularScoreUnit : scoreUnit}</span>
                {entry.isCurrent ? <em>Sua dupla</em> : null}
              </div>
            </li>
          )) : entries.slice(0, 3).map((entry) => {
            return (
              <li
                key={`${entry.position}:${entry.nickname}`}
                className={`${styles.card} ${entry.isCurrent ? styles.current : ""}`}
                data-position={entry.position}
              >
                <Avatar entry={entry} />

                <div className={styles.identity}>
                  <strong>{entry.nickname}</strong>
                  <span>{entry.score} {entry.score === 1 && singularScoreUnit ? singularScoreUnit : scoreUnit}</span>
                  {entry.isCurrent ? <em>Você</em> : null}
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
