export const MASTER_AVATAR_VIEWBOX = "0 0 320 520";

export const MASTER_AVATAR_LAYER_ORDER = [
  "hair-back",
  "body",
  "lower-clothing",
  "shoes",
  "upper-clothing",
  "head",
  "eyes",
  "eyebrows",
  "mouth",
  "hair-front",
  "glasses",
  "head-accessory",
  "special-accessory",
] as const;

export type MasterAvatarLayer = (typeof MASTER_AVATAR_LAYER_ORDER)[number];

export const MASTER_AVATAR_ANCHORS = {
  canvas: { width: 320, height: 520, centerX: 160 },
  head: { x: 92, y: 32, width: 136, height: 155, centerX: 160 },
  ears: { leftX: 82, rightX: 208, y: 101, width: 30, height: 43 },
  eyes: { leftX: 136, rightX: 184, y: 111, radius: 8 },
  eyebrows: { leftX: 124, rightX: 172, y: 91, width: 24 },
  mouth: { x: 136, y: 137, width: 48, height: 34 },
  neck: { x: 135, y: 172, width: 50, height: 60 },
  shoulders: { leftX: 95, rightX: 225, y: 190 },
  arms: { leftX: 70, rightX: 212, y: 216, width: 38, height: 174 },
  hands: { leftX: 89, rightX: 231, y: 389, radius: 25 },
  torso: { x: 102, y: 180, width: 116, height: 162 },
  waist: { x: 112, y: 333, width: 96, height: 36 },
  legs: { leftX: 112, rightX: 165, y: 357, width: 43, height: 108 },
  feet: { leftX: 96, rightX: 164, y: 451, width: 60, height: 37 },
} as const;

export type MasterAvatarPalette = {
  skin: string;
  skinDetail: string;
  eyes: string;
  eyebrows: string;
  mouth: string;
  shirt: string;
  shirtDetail: string;
  pants: string;
  shoes: string;
  shoeSole: string;
};

export const DEFAULT_MASTER_AVATAR_PALETTE: Readonly<MasterAvatarPalette> = {
  skin: "#E4A077",
  skinDetail: "#D98D68",
  eyes: "#173F35",
  eyebrows: "#81523E",
  mouth: "#FFFFFF",
  shirt: "#F7F7F2",
  shirtDetail: "#DDE1DA",
  pants: "#324A43",
  shoes: "#A56F5B",
  shoeSole: "#714A3D",
};
