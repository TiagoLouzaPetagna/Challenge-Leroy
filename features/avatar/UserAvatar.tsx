"use client";

import { useEffect, useState } from "react";

import {
  AVATAR_STORAGE_KEY,
  AVATAR_UPDATED_EVENT,
  parseSavedAvatar,
} from "./avatar-storage";

import styles from "./UserAvatar.module.css";

type UserAvatarProps = {
  fallback: string;
  label: string;
  size?: "compact" | "profile";
  className?: string;
};

export function UserAvatar({
  fallback,
  label,
  size = "compact",
  className = "",
}: UserAvatarProps) {
  const [imageDataUrl, setImageDataUrl] = useState<string | null>(null);

  useEffect(() => {
    const refresh = () => {
      setImageDataUrl(
        parseSavedAvatar(window.localStorage.getItem(AVATAR_STORAGE_KEY))
          ?.imageDataUrl ?? null,
      );
    };
    const onStorage = (event: StorageEvent) => {
      if (event.key === AVATAR_STORAGE_KEY) refresh();
    };

    refresh();
    window.addEventListener("storage", onStorage);
    window.addEventListener(AVATAR_UPDATED_EVENT, refresh);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener(AVATAR_UPDATED_EVENT, refresh);
    };
  }, []);

  return (
    <span
      className={`${styles.root} ${styles[size]} ${className}`.trim()}
      role="img"
      aria-label={label}
    >
      {imageDataUrl ? (
        // The avatar is a generated data URL, so Next image optimization cannot process it.
        // eslint-disable-next-line @next/next/no-img-element
        <img src={imageDataUrl} alt="" aria-hidden="true" />
      ) : (
        <span className={styles.fallback} aria-hidden="true">
          {fallback}
        </span>
      )}
    </span>
  );
}
