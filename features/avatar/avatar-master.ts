export const MASTER_AVATAR_GRID = {
  width: 64,
  height: 96,
  centerX: 32,
} as const;

export const MASTER_AVATAR_VIEWBOX = "0 0 64 96";

export const MASTER_AVATAR_LAYER_ORDER = [
  "hair-back",
  "body",
  "lower-clothing",
  "shoes",
  "upper-clothing",
  "face",
  "hair-front",
  "glasses",
  "head-accessory",
  "special-accessory",
] as const;

export type MasterAvatarLayer = (typeof MASTER_AVATAR_LAYER_ORDER)[number];

export const DEFAULT_MASTER_AVATAR_LAYERS: Readonly<
  Record<MasterAvatarLayer, string | null>
> = {
  "hair-back": null,
  body: "/avatar/base/body-base.png",
  "lower-clothing": "/avatar/bottoms/base-underwear.png",
  shoes: null,
  "upper-clothing": null,
  face: "/avatar/face/face-01.png",
  "hair-front": null,
  glasses: null,
  "head-accessory": null,
  "special-accessory": null,
};

export const MASTER_AVATAR_ANCHORS = {
  canvas: MASTER_AVATAR_GRID,
  head: { x: 16, y: 9, width: 32, height: 31, centerX: 32 },
  eyes: { leftX: 25, rightX: 36, y: 24, width: 3, height: 7 },
  neck: { x: 28, y: 39, width: 8, height: 5 },
  shoulders: { leftX: 22, rightX: 42, y: 41 },
  arms: { leftX: 14, rightX: 40, y: 42, width: 10, height: 27 },
  torso: { x: 22, y: 41, width: 20, height: 21 },
  waist: { x: 23, y: 59, width: 18, height: 11 },
  legs: { leftX: 25, rightX: 33, y: 68, width: 6, height: 20 },
  feet: { leftX: 23, rightX: 33, y: 84, width: 9, height: 5 },
} as const;

export type MasterAvatarPalette = {
  outline: string;
  outlineSoft: string;
  skin: string;
  skinLight: string;
  skinShadow: string;
  eyes: string;
  eyeLight: string;
  cloth: string;
  clothShadow: string;
  clothLight: string;
};

export const DEFAULT_MASTER_AVATAR_PALETTE: Readonly<MasterAvatarPalette> = {
  outline: "#4A2026",
  outlineSoft: "#71333A",
  skin: "#FFAE7D",
  skinLight: "#FFC190",
  skinShadow: "#E8785D",
  eyes: "#2D1717",
  eyeLight: "#D9D2CC",
  cloth: "#F2F4F5",
  clothShadow: "#C8CED6",
  clothLight: "#FFFFFF",
};
