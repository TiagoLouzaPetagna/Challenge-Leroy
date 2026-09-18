export type ArcadePublicProfile = {
  accountId: string;
  profileId: string;
  nickname: string;
  displayName: string;
  sectorName: string;
  avatarUrl: string;
  animatedAvatarUrl: string;
  houseTheme: "crafted" | "cyberpunk" | "industrial";
  houseLabel: string;
};

export const ARCADE_PUBLIC_PROFILES: readonly ArcadePublicProfile[] = [
  {
    accountId: "account:lucas-learner",
    profileId: "luk-casa",
    nickname: "LukCasa",
    displayName: "Lucas",
    sectorName: "Casa & Decoração",
    avatarUrl: "/arcade/avatars/luk-casa.png",
    animatedAvatarUrl: "/arcade/avatars/luk-casa-animated.webp",
    houseTheme: "crafted",
    houseLabel: "Ateliê tranquilo",
  },
  {
    accountId: "account:marina-admin",
    profileId: "mari-shield",
    nickname: "MariShield",
    displayName: "Marina Alves",
    sectorName: "Administração",
    avatarUrl: "/arcade/avatars/mari-shield.png",
    animatedAvatarUrl: "/arcade/avatars/mari-shield-animated.webp",
    houseTheme: "cyberpunk",
    houseLabel: "Base neon",
  },
  {
    accountId: "account:ana-learner",
    profileId: "nana-tech",
    nickname: "NanaTech",
    displayName: "Ana Costa",
    sectorName: "Tecnologia",
    avatarUrl: "/arcade/avatars/nana-tech.png",
    animatedAvatarUrl: "/arcade/avatars/nana-tech-animated.webp",
    houseTheme: "industrial",
    houseLabel: "Loft de investigação",
  },
] as const;

export function findArcadePublicProfileByAccountId(accountId: string) {
  return ARCADE_PUBLIC_PROFILES.find((profile) => profile.accountId === accountId) ?? null;
}

export function findArcadePublicProfileById(profileId: string) {
  return ARCADE_PUBLIC_PROFILES.find((profile) => profile.profileId === profileId) ?? null;
}
