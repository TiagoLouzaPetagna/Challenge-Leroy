'use client';

/* eslint-disable @next/next/no-img-element -- pixel-art sprites need exact native sizing and nearest-neighbor rendering. */

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { PortalIcon } from '@/features/ui/PortalIcons';
import './house-experience.css';

export type HouseMode = 'edit' | 'view' | 'visitor';

type HouseExperienceProps = {
  mode: HouseMode;
};

const TABLETOP_U_MIN = 0.17;
const TABLETOP_U_MAX = 0.92;
const TABLETOP_V_MIN = 0.17;
const TABLETOP_V_MAX = 0.92;
const TABLETOP_HIT_TOLERANCE = 0.025;
const WALL_U_MIN = 0.23;
const WALL_U_MAX = 0.77;
const WALL_V_MIN = 0.28;
const WALL_V_MAX = 0.72;
const WALL_HIT_TOLERANCE = 0.06;
const SHELF_SURFACE_INSET = 0.1;
const SHELF_SURFACE_HIT_TOLERANCE = 0.05;
const FURNITURE_SURFACE_U_MIN = 0.2;
const FURNITURE_SURFACE_U_MAX = 0.87;
const FURNITURE_SURFACE_V_MIN = 0.2;
const FURNITURE_SURFACE_V_MAX = 0.8;
const FURNITURE_SURFACE_HIT_TOLERANCE = 0.06;
const SHELF_SPRITE_ASPECT = 955 / 1299;
const SHIELD_SPRITE_ASPECT = 1199 / 1312;
const MIN_ZOOM = 0.74;
const MAX_ZOOM = 1.08;
const ZOOM_STEP = 0.07;
const ACHIEVEMENT_FRAME_DURATION = 125;
const ACHIEVEMENT_LOOP_PAUSE = 1500;
const ACHIEVEMENT_FRAMES = Array.from(
  { length: 11 },
  (_, index) => `/house/achievement-grave/frame-${index}.png`,
);

type GridPosition = { x: number; y: number };
type WallSide = 'left' | 'right';
type ShelfPlacement = { wall: WallSide; u: number; v: number };
type ShieldPlacement = ShelfPlacement;
type JapaneseSurfaceFurnitureId =
  | 'jp-low-table'
  | 'jp-open-shelf'
  | 'jp-cabinet'
  | 'jp-desk';
type TrophyPlacement =
  | { surface: 'floor'; position: GridPosition }
  | { surface: 'table'; u: number; v: number }
  | { surface: 'shelf'; u: number; v: number }
  | { surface: 'furniture'; furnitureId: JapaneseSurfaceFurnitureId; u: number; v: number };
type TrophyId = 'trophy' | 'trophy-phishing' | 'trophy-attachment';
type AchievementItemId = TrophyId | 'achievement' | 'shield';
type TrophyDefinition = {
  id: TrophyId;
  label: string;
  src: string;
  aspect: number;
  widthScale: number;
};
type TrophyPlacements = Record<TrophyId, TrophyPlacement | null>;
type TrophySpriteUrls = Record<TrophyId, string>;
type AchievementSummary = {
  name: string;
  description: string;
};
type AchievementTooltipState = {
  id: AchievementItemId;
  left: number;
  top: number;
  placement: 'above' | 'below';
};
type InventoryFilter = 'furniture' | 'achievement' | 'wall';
type WallGeometry = {
  outerX: number;
  outerTopY: number;
  outerBottomY: number;
  innerX: number;
  innerTopY: number;
  innerBottomY: number;
};
type CollisionRect = {
  left: number;
  top: number;
  right: number;
  bottom: number;
  width: number;
  height: number;
};
type JapaneseFurnitureId =
  | 'jp-sofa'
  | 'jp-armchair'
  | 'jp-low-table'
  | 'jp-open-shelf'
  | 'jp-cabinet'
  | 'jp-desk';
type DragItem = 'table' | 'shelf' | 'shield' | 'achievement' | TrophyId | JapaneseFurnitureId;
type JapaneseFurnitureDefinition = {
  id: JapaneseFurnitureId;
  label: string;
  src: string;
  widthPercent: number;
  aspect: number;
  gridRadiusX: number;
  gridRadiusY: number;
  gridOffsetX: number;
  gridOffsetY: number;
  interactionClipPath?: string;
  surface?: {
    originX: number;
    originY: number;
    uX: number;
    uY: number;
    vX: number;
    vY: number;
    trophyWidth: number;
    hitTolerance?: number;
  };
};
type JapaneseFurniturePlacements = Record<JapaneseFurnitureId, GridPosition | null>;
type RoomKey = 'claro' | 'salvia' | 'amplo' | 'japones';
type RoomStyleKey = 'contemporaneo' | 'japones';
type RoomColorKey = 'original' | 'salvia' | 'jardim';
type RoomDefinition = {
  label: string;
  src: string;
  alt: string;
  width: number;
  height: number;
  originX: number;
  originY: number;
  gridHalfWidth: number;
  gridHalfHeight: number;
  tableGridMin: number;
  tableGridMax: number;
  trophyGridMin: number;
  trophyGridMax: number;
  floorClip: string;
  walls: Record<WallSide, WallGeometry>;
};

const ROOM_STYLES: Record<RoomStyleKey, {
  label: string;
  roomKey: RoomKey;
  swatchWall: string;
  swatchFloor: string;
}> = {
  contemporaneo: {
    label: 'Cômodo contemporâneo',
    roomKey: 'amplo',
    swatchWall: '#fffdf8',
    swatchFloor: '#d98b34',
  },
  japones: {
    label: 'Cômodo japonês',
    roomKey: 'japones',
    swatchWall: '#f2eadc',
    swatchFloor: '#dccc9e',
  },
};

const ROOM_COLORS: Record<RoomColorKey, {
  label: string;
  wallColor: string;
  floorColor: string;
  wallBlend: 'normal' | 'multiply' | 'color';
  floorBlend: 'normal' | 'multiply' | 'color';
  swatchWall: string;
  swatchFloor: string;
}> = {
  original: {
    label: 'Cores originais',
    wallColor: 'transparent',
    floorColor: 'transparent',
    wallBlend: 'normal',
    floorBlend: 'normal',
    swatchWall: '#fffdf8',
    swatchFloor: '#d9c894',
  },
  salvia: {
    label: 'Verde-sálvia',
    wallColor: 'rgb(112 150 119 / 42%)',
    floorColor: 'rgb(229 218 183 / 10%)',
    wallBlend: 'multiply',
    floorBlend: 'color',
    swatchWall: '#91ad96',
    swatchFloor: '#d6a56c',
  },
  jardim: {
    label: 'Verde-jardim',
    wallColor: 'rgb(64 111 82 / 48%)',
    floorColor: 'rgb(91 62 38 / 18%)',
    wallBlend: 'multiply',
    floorBlend: 'multiply',
    swatchWall: '#4d765e',
    swatchFloor: '#a96935',
  },
};

const ROOMS: Record<RoomKey, RoomDefinition> = {
  claro: {
    label: 'Claro',
    src: '/house/room-clear-planks-v3-source.png',
    alt: 'Cômodo isométrico vazio com paredes claras e piso de madeira',
    width: 1254,
    height: 1254,
    originX: 627,
    originY: 471,
    gridHalfWidth: 29,
    gridHalfHeight: 16,
    tableGridMin: 6,
    tableGridMax: 19,
    trophyGridMin: 3,
    trophyGridMax: 22,
    floorClip: 'polygon(50% 37.6%, 96.2% 64.8%, 50% 98.7%, 3.8% 64.8%)',
    walls: {
      left: { outerX: 3.9, outerTopY: 29.7, outerBottomY: 64.8, innerX: 50, innerTopY: 0.6, innerBottomY: 37.6 },
      right: { outerX: 96.1, outerTopY: 29.7, outerBottomY: 64.8, innerX: 50, innerTopY: 0.6, innerBottomY: 37.6 },
    },
  },
  salvia: {
    label: 'Sálvia',
    src: '/house/room-sage-v2.png',
    alt: 'Cômodo isométrico vazio com paredes verde-sálvia e piso de nogueira',
    width: 1268,
    height: 1241,
    originX: 634,
    originY: 475,
    gridHalfWidth: 28,
    gridHalfHeight: 16,
    tableGridMin: 6,
    tableGridMax: 19,
    trophyGridMin: 3,
    trophyGridMax: 22,
    floorClip: 'polygon(50% 38.3%, 96.4% 65%, 50% 99.1%, 3.6% 65%)',
    walls: {
      left: { outerX: 3.6, outerTopY: 29.9, outerBottomY: 64.2, innerX: 50, innerTopY: 1.2, innerBottomY: 38.3 },
      right: { outerX: 96.4, outerTopY: 29.9, outerBottomY: 64.2, innerX: 50, innerTopY: 1.2, innerBottomY: 38.3 },
    },
  },
  amplo: {
    label: 'Amplo',
    src: '/house/room-large.png',
    alt: 'Cômodo isométrico amplo com paredes claras e piso de madeira',
    width: 1254,
    height: 1254,
    originX: 627,
    originY: 388,
    gridHalfWidth: 29,
    gridHalfHeight: 16,
    tableGridMin: 6,
    tableGridMax: 23,
    trophyGridMin: 3,
    trophyGridMax: 26,
    floorClip: 'polygon(50% 30.9%, 98.1% 60.1%, 50% 97.5%, 1.9% 60.1%)',
    walls: {
      left: { outerX: 2, outerTopY: 33.8, outerBottomY: 60.1, innerX: 50, innerTopY: 2.9, innerBottomY: 30.9 },
      right: { outerX: 98, outerTopY: 33.8, outerBottomY: 60.1, innerX: 50, innerTopY: 2.9, innerBottomY: 30.9 },
    },
  },
  japones: {
    label: 'Japonês',
    src: '/house/room-japanese.png',
    alt: 'Cômodo isométrico japonês vazio com tatames e detalhes de madeira',
    width: 1254,
    height: 1254,
    originX: 627,
    originY: 474,
    gridHalfWidth: 29,
    gridHalfHeight: 16,
    tableGridMin: 6,
    tableGridMax: 19,
    trophyGridMin: 3,
    trophyGridMax: 22,
    floorClip: 'polygon(50% 37.8%, 98% 64.8%, 50% 98.4%, 2% 64.8%)',
    walls: {
      left: { outerX: 2.4, outerTopY: 30.2, outerBottomY: 64.4, innerX: 50, innerTopY: 0.5, innerBottomY: 37.8 },
      right: { outerX: 97.6, outerTopY: 30.2, outerBottomY: 64.4, innerX: 50, innerTopY: 0.5, innerBottomY: 37.8 },
    },
  },
};

const START_POSITION: GridPosition = { x: 12, y: 12 };
const START_ACHIEVEMENT_POSITION: GridPosition = { x: 14, y: 14 };
const START_TABLETOP: TrophyPlacement = { surface: 'table', u: 0.5, v: 0.5 };
const START_SHELF_SURFACE: TrophyPlacement = { surface: 'shelf', u: 0.5, v: 0.5 };
const START_SHELF: ShelfPlacement = { wall: 'left', u: 0.5, v: 0.52 };
const START_SHIELD: ShieldPlacement = { wall: 'left', u: 0.37, v: 0.36 };

const TROPHIES: TrophyDefinition[] = [
  {
    id: 'trophy', label: 'Troféu', src: '/house/trophy-pixel.png',
    aspect: 1015 / 748, widthScale: 1,
  },
  {
    id: 'trophy-phishing', label: 'Troféu contra phishing', src: '/house/trophy-phishing.png',
    aspect: 1161 / 813, widthScale: 1,
  },
  {
    id: 'trophy-attachment', label: 'Troféu de anexo suspeito', src: '/house/trophy-attachment.png',
    aspect: 1161 / 891, widthScale: 1,
  },
];
const TROPHY_IDS = TROPHIES.map(({ id }) => id);

const ACHIEVEMENT_SUMMARIES: Record<AchievementItemId, AchievementSummary> = {
  trophy: {
    name: 'Troféu Guardião Digital',
    description: 'Conclua todos os desafios básicos de segurança digital sem utilizar dicas.',
  },
  'trophy-phishing': {
    name: 'Troféu Não Morda a Isca',
    description: 'Identifique corretamente todas as tentativas de phishing em uma única missão.',
  },
  'trophy-attachment': {
    name: 'Troféu Anexo Sob Controle',
    description: 'Bloqueie todos os anexos maliciosos antes que qualquer arquivo seja aberto.',
  },
  achievement: {
    name: 'Lápide Aqui Jaz a Senha Fraca',
    description: 'Substitua todas as senhas fracas e conclua o desafio sem reutilizar nenhuma delas.',
  },
  shield: {
    name: 'Escudo Sentinela MFA',
    description: 'Ative a autenticação multifator em todas as contas protegidas durante a missão.',
  },
};

function emptyTrophyPlacements(): TrophyPlacements {
  return {
    trophy: null,
    'trophy-phishing': null,
    'trophy-attachment': null,
  };
}

function initialTrophySpriteUrls(): TrophySpriteUrls {
  return Object.fromEntries(TROPHIES.map(({ id, src }) => [id, src])) as TrophySpriteUrls;
}

function isTrophyId(value: string): value is TrophyId {
  return TROPHY_IDS.includes(value as TrophyId);
}

function trophyDefinition(id: TrophyId) {
  return TROPHIES.find((trophy) => trophy.id === id) as TrophyDefinition;
}

const JAPANESE_FURNITURE: JapaneseFurnitureDefinition[] = [
  {
    id: 'jp-sofa', label: 'Sofá japonês', src: '/house/jp-sofa.png', widthPercent: 0.33,
    aspect: 439 / 587,
    gridRadiusX: 4.7, gridRadiusY: 2.3, gridOffsetX: -1, gridOffsetY: -0.8,
  },
  {
    id: 'jp-armchair', label: 'Poltrona japonesa', src: '/house/jp-armchair.png', widthPercent: 0.18,
    aspect: 335 / 311,
    gridRadiusX: 1.9, gridRadiusY: 1.9, gridOffsetX: -0.5, gridOffsetY: -0.5,
  },
  {
    id: 'jp-low-table', label: 'Mesa baixa', src: '/house/jp-low-table.png', widthPercent: 0.23,
    aspect: 304 / 428,
    gridRadiusX: 3.2, gridRadiusY: 2.4, gridOffsetX: -0.9, gridOffsetY: -0.9,
    surface: {
      originX: 39.5, originY: 2, uX: 58, uY: 47, vX: -38, vY: 35,
      trophyWidth: 0.064 / 0.23,
    },
  },
  {
    id: 'jp-open-shelf', label: 'Estante aberta', src: '/house/jp-open-shelf.png', widthPercent: 0.29,
    aspect: 421 / 507,
    gridRadiusX: 4.2, gridRadiusY: 2.1, gridOffsetX: -1.2, gridOffsetY: -0.7,
    interactionClipPath: 'polygon(19% 1%, 99% 56%, 99% 86%, 82% 99%, 77% 96%, 4% 49%, 1% 39%, 1% 14%)',
    surface: {
      originX: 19, originY: 1, uX: 79, uY: 55, vX: -17, vY: 13,
      trophyWidth: 0.064 / 0.29,
      hitTolerance: 0.015,
    },
  },
  {
    id: 'jp-cabinet', label: 'Armário japonês', src: '/house/jp-cabinet.png', widthPercent: 0.22,
    aspect: 364 / 378,
    gridRadiusX: 3.2, gridRadiusY: 1.6, gridOffsetX: -0.5, gridOffsetY: -0.5,
    surface: {
      originX: 25, originY: 1, uX: 73, uY: 44, vX: -23, vY: 15,
      trophyWidth: 0.064 / 0.22,
    },
  },
  {
    id: 'jp-desk', label: 'Mesa japonesa', src: '/house/jp-desk.png', widthPercent: 0.25,
    aspect: 406 / 436,
    gridRadiusX: 3.3, gridRadiusY: 2.2, gridOffsetX: -0.9, gridOffsetY: -0.9,
    surface: {
      originX: 22, originY: 1, uX: 76, uY: 48, vX: -20, vY: 23,
      trophyWidth: 0.064 / 0.25,
    },
  },
];

const JAPANESE_FURNITURE_IDS = JAPANESE_FURNITURE.map(({ id }) => id);
const TABLE_GRID_FOOTPRINT = { radiusX: 2.8, radiusY: 2.8 };
const TROPHY_GRID_FOOTPRINT = { radiusX: 0.45, radiusY: 0.45 };
const ACHIEVEMENT_GRID_FOOTPRINT = { radiusX: 1.45, radiusY: 1.45 };

function emptyJapaneseFurniturePlacements(): JapaneseFurniturePlacements {
  return {
    'jp-sofa': null,
    'jp-armchair': null,
    'jp-low-table': null,
    'jp-open-shelf': null,
    'jp-cabinet': null,
    'jp-desk': null,
  };
}

function isJapaneseFurnitureId(value: string): value is JapaneseFurnitureId {
  return JAPANESE_FURNITURE_IDS.includes(value as JapaneseFurnitureId);
}

function japaneseFurnitureDefinition(id: JapaneseFurnitureId) {
  return JAPANESE_FURNITURE.find((item) => item.id === id) as JapaneseFurnitureDefinition;
}

function gridFootprintsOverlap(
  firstPosition: GridPosition,
  firstFootprint: { radiusX: number; radiusY: number },
  secondPosition: GridPosition,
  secondFootprint: { radiusX: number; radiusY: number },
) {
  const clearance = 0.3;
  return (
    Math.abs(firstPosition.x - secondPosition.x) <
      firstFootprint.radiusX + secondFootprint.radiusX - clearance &&
    Math.abs(firstPosition.y - secondPosition.y) <
      firstFootprint.radiusY + secondFootprint.radiusY - clearance
  );
}

function japaneseFurnitureCollisionPosition(
  position: GridPosition,
  definition: JapaneseFurnitureDefinition,
) {
  return {
    x: position.x + definition.gridOffsetX,
    y: position.y + definition.gridOffsetY,
  };
}

function isJapaneseSurfaceFurnitureId(value: string): value is JapaneseSurfaceFurnitureId {
  return isJapaneseFurnitureId(value) && Boolean(japaneseFurnitureDefinition(value).surface);
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function pointInsideRect(clientX: number, clientY: number, rect: DOMRect) {
  return clientX >= rect.left && clientX <= rect.right &&
    clientY >= rect.top && clientY <= rect.bottom;
}

function gridToScreen(position: GridPosition, room: RoomDefinition) {
  return {
    left: ((room.originX + (position.x - position.y) * room.gridHalfWidth) / room.width) * 100,
    top: ((room.originY + (position.x + position.y) * room.gridHalfHeight) / room.height) * 100,
  };
}

function screenToGrid(clientX: number, clientY: number, rect: DOMRect, room: RoomDefinition) {
  const px = ((clientX - rect.left) / rect.width) * room.width;
  const py = ((clientY - rect.top) / rect.height) * room.height;
  const dx = px - room.originX;
  const dy = py - room.originY;

  return {
    x: Math.round((dx / room.gridHalfWidth + dy / room.gridHalfHeight) / 2),
    y: Math.round((dy / room.gridHalfHeight - dx / room.gridHalfWidth) / 2),
  };
}

function isValidTablePosition(position: GridPosition | null, room: RoomDefinition) {
  if (!position) return false;
  return position.x >= room.tableGridMin && position.x <= room.tableGridMax &&
    position.y >= room.tableGridMin && position.y <= room.tableGridMax;
}

function japaneseFurniturePositionBounds(
  room: RoomDefinition,
  definition: JapaneseFurnitureDefinition,
) {
  const floorMinimum = room.trophyGridMin - 0.5;
  const floorMaximum = room.trophyGridMax + 0.5;
  return {
    minX: Math.ceil(floorMinimum - definition.gridOffsetX + definition.gridRadiusX),
    maxX: Math.floor(floorMaximum - definition.gridOffsetX - definition.gridRadiusX),
    minY: Math.ceil(floorMinimum - definition.gridOffsetY + definition.gridRadiusY),
    maxY: Math.floor(floorMaximum - definition.gridOffsetY - definition.gridRadiusY),
  };
}

function clampJapaneseFurniturePosition(
  position: GridPosition,
  room: RoomDefinition,
  id: JapaneseFurnitureId,
) {
  const bounds = japaneseFurniturePositionBounds(room, japaneseFurnitureDefinition(id));
  return {
    x: clamp(position.x, bounds.minX, bounds.maxX),
    y: clamp(position.y, bounds.minY, bounds.maxY),
  };
}

function isValidJapaneseFurniturePosition(
  position: GridPosition | null,
  room: RoomDefinition,
  id: JapaneseFurnitureId,
) {
  if (!position) return false;
  const bounds = japaneseFurniturePositionBounds(room, japaneseFurnitureDefinition(id));
  return position.x >= bounds.minX && position.x <= bounds.maxX &&
    position.y >= bounds.minY && position.y <= bounds.maxY;
}

function isValidTrophyFloorPosition(position: GridPosition, room: RoomDefinition) {
  return position.x >= room.trophyGridMin && position.x <= room.trophyGridMax &&
    position.y >= room.trophyGridMin && position.y <= room.trophyGridMax;
}

function isValidAchievementPosition(position: GridPosition, room: RoomDefinition) {
  const inset = 1;
  return position.x >= room.trophyGridMin + inset &&
    position.x <= room.trophyGridMax - inset &&
    position.y >= room.trophyGridMin + inset &&
    position.y <= room.trophyGridMax - inset;
}

function isTrophyPlacement(value: unknown, room: RoomDefinition): value is TrophyPlacement {
  if (!value || typeof value !== 'object') return false;
  const placement = value as TrophyPlacement;
  if (placement.surface === 'floor') {
    return isValidTrophyFloorPosition(placement.position, room);
  }
  if (placement.surface === 'table') {
    return Number.isFinite(placement.u) && Number.isFinite(placement.v) &&
      placement.u >= TABLETOP_U_MIN &&
      placement.u <= TABLETOP_U_MAX &&
      placement.v >= TABLETOP_V_MIN &&
      placement.v <= TABLETOP_V_MAX;
  }
  if (placement.surface === 'shelf') {
    return Number.isFinite(placement.u) && Number.isFinite(placement.v) &&
      placement.u >= SHELF_SURFACE_INSET &&
      placement.u <= 1 - SHELF_SURFACE_INSET &&
      placement.v >= SHELF_SURFACE_INSET &&
      placement.v <= 1 - SHELF_SURFACE_INSET;
  }
  return placement.surface === 'furniture' &&
    isJapaneseSurfaceFurnitureId(placement.furnitureId) &&
    Number.isFinite(placement.u) && Number.isFinite(placement.v) &&
    placement.u >= FURNITURE_SURFACE_U_MIN &&
    placement.u <= FURNITURE_SURFACE_U_MAX &&
    placement.v >= FURNITURE_SURFACE_V_MIN &&
    placement.v <= FURNITURE_SURFACE_V_MAX;
}

function pointerToTabletop(clientX: number, clientY: number, tableRect: DOMRect): TrophyPlacement | null {
  const x = (clientX - tableRect.left) / tableRect.width;
  const y = (clientY - tableRect.top) / tableRect.height;
  const difference = (x - 0.5) / 0.48;
  const sum = (y - 0.015) / 0.28;
  const u = (difference + sum) / 2;
  const v = (sum - difference) / 2;

  if (u < -TABLETOP_HIT_TOLERANCE || u > 1 + TABLETOP_HIT_TOLERANCE ||
      v < -TABLETOP_HIT_TOLERANCE || v > 1 + TABLETOP_HIT_TOLERANCE) {
    return null;
  }

  return {
    surface: 'table',
    u: clamp(u, TABLETOP_U_MIN, TABLETOP_U_MAX),
    v: clamp(v, TABLETOP_V_MIN, TABLETOP_V_MAX),
  };
}

function tabletopToSpritePosition(placement: Extract<TrophyPlacement, { surface: 'table' }>) {
  return {
    left: 50 + (placement.u - placement.v) * 48,
    top: 1.5 + (placement.u + placement.v) * 28,
  };
}

function pointerToJapaneseFurnitureSurface(
  clientX: number,
  clientY: number,
  furnitureRect: DOMRect,
  furnitureId: JapaneseSurfaceFurnitureId,
): TrophyPlacement | null {
  const surface = japaneseFurnitureDefinition(furnitureId).surface;
  if (!surface) return null;
  const x = ((clientX - furnitureRect.left) / furnitureRect.width) * 100;
  const y = ((clientY - furnitureRect.top) / furnitureRect.height) * 100;
  const dx = x - surface.originX;
  const dy = y - surface.originY;
  const determinant = surface.uX * surface.vY - surface.vX * surface.uY;
  const u = (dx * surface.vY - dy * surface.vX) / determinant;
  const v = (dy * surface.uX - dx * surface.uY) / determinant;
  const hitTolerance = surface.hitTolerance ?? FURNITURE_SURFACE_HIT_TOLERANCE;

  if (
    u < -hitTolerance ||
    u > 1 + hitTolerance ||
    v < -hitTolerance ||
    v > 1 + hitTolerance
  ) return null;

  return {
    surface: 'furniture',
    furnitureId,
    u: clamp(u, FURNITURE_SURFACE_U_MIN, FURNITURE_SURFACE_U_MAX),
    v: clamp(v, FURNITURE_SURFACE_V_MIN, FURNITURE_SURFACE_V_MAX),
  };
}

function japaneseFurnitureSurfaceToSpritePosition(
  placement: Extract<TrophyPlacement, { surface: 'furniture' }>,
) {
  const surface = japaneseFurnitureDefinition(placement.furnitureId).surface;
  if (!surface) return { left: 50, top: 50 };
  return {
    left: surface.originX + placement.u * surface.uX + placement.v * surface.vX,
    top: surface.originY + placement.u * surface.uY + placement.v * surface.vY,
  };
}

function japaneseFurnitureSurfaceClipPath(definition: JapaneseFurnitureDefinition) {
  const surface = definition.surface;
  if (!surface) return undefined;
  const rightX = surface.originX + surface.uX;
  const rightY = surface.originY + surface.uY;
  const frontX = rightX + surface.vX;
  const frontY = rightY + surface.vY;
  const leftX = surface.originX + surface.vX;
  const leftY = surface.originY + surface.vY;
  return `polygon(${surface.originX}% ${surface.originY}%, ${rightX}% ${rightY}%, ${
    frontX
  }% ${frontY}%, ${leftX}% ${leftY}%)`;
}

function pointerToShelfSurface(
  clientX: number,
  clientY: number,
  shelfRect: DOMRect,
  wall: WallSide,
): TrophyPlacement | null {
  let x = (clientX - shelfRect.left) / shelfRect.width;
  const y = (clientY - shelfRect.top) / shelfRect.height;
  if (wall === 'right') x = 1 - x;

  const dx = x - 0.04;
  const dy = y - 0.66;
  const determinant = 0.19314;
  const u = (dx * 0.13 - dy * 0.17) / determinant;
  const v = (dy * 0.773 + dx * 0.545) / determinant;

  if (
    u < -SHELF_SURFACE_HIT_TOLERANCE ||
    u > 1 + SHELF_SURFACE_HIT_TOLERANCE ||
    v < -SHELF_SURFACE_HIT_TOLERANCE ||
    v > 1 + SHELF_SURFACE_HIT_TOLERANCE
  ) {
    return null;
  }

  return {
    surface: 'shelf',
    u: clamp(u, SHELF_SURFACE_INSET, 1 - SHELF_SURFACE_INSET),
    v: clamp(v, SHELF_SURFACE_INSET, 1 - SHELF_SURFACE_INSET),
  };
}

function shelfSurfaceToSpritePosition(
  placement: Extract<TrophyPlacement, { surface: 'shelf' }>,
  wall: WallSide,
) {
  const left = 4 + placement.u * 77.3 + placement.v * 17;
  return {
    left: wall === 'right' ? 100 - left : left,
    top: 66 - placement.u * 54.5 + placement.v * 13,
  };
}

function lerp(start: number, end: number, amount: number) {
  return start + (end - start) * amount;
}

function wallToScreen(placement: ShelfPlacement, room: RoomDefinition) {
  const wall = room.walls[placement.wall];
  const left = lerp(wall.outerX, wall.innerX, placement.u);
  const topEdge = lerp(wall.outerTopY, wall.innerTopY, placement.u);
  const bottomEdge = lerp(wall.outerBottomY, wall.innerBottomY, placement.u);
  return { left, top: lerp(topEdge, bottomEdge, placement.v) };
}

function wallClipPath(side: WallSide, room: RoomDefinition) {
  const wall = room.walls[side];
  return `polygon(${wall.innerX}% ${wall.innerTopY}%, ${wall.outerX}% ${wall.outerTopY}%, ${
    wall.outerX
  }% ${wall.outerBottomY}%, ${wall.innerX}% ${wall.innerBottomY}%)`;
}

function wallInteriorClip(side: WallSide, room: RoomDefinition) {
  const wall = room.walls[side];
  const outerInset = side === 'left' ? wall.outerX + 1.1 : wall.outerX - 1.1;
  return `polygon(${wall.innerX}% ${wall.innerTopY + 1.5}%, ${outerInset}% ${
    wall.outerTopY + 1.1
  }%, ${outerInset}% ${wall.outerBottomY - 1.5}%, ${wall.innerX}% ${wall.innerBottomY - 0.9}%)`;
}

function pointerToWall(
  clientX: number,
  clientY: number,
  stageRect: DOMRect,
  room: RoomDefinition,
): ShelfPlacement | null {
  const x = ((clientX - stageRect.left) / stageRect.width) * 100;
  const y = ((clientY - stageRect.top) / stageRect.height) * 100;

  for (const side of ['left', 'right'] as WallSide[]) {
    const wall = room.walls[side];
    const u = (x - wall.outerX) / (wall.innerX - wall.outerX);
    const topEdge = lerp(wall.outerTopY, wall.innerTopY, u);
    const bottomEdge = lerp(wall.outerBottomY, wall.innerBottomY, u);
    const v = (y - topEdge) / (bottomEdge - topEdge);
    if (
      u >= WALL_U_MIN - WALL_HIT_TOLERANCE &&
      u <= WALL_U_MAX + WALL_HIT_TOLERANCE &&
      v >= WALL_V_MIN - WALL_HIT_TOLERANCE &&
      v <= WALL_V_MAX + WALL_HIT_TOLERANCE
    ) {
      return {
        wall: side,
        u: clamp(u, WALL_U_MIN, WALL_U_MAX),
        v: clamp(v, WALL_V_MIN, WALL_V_MAX),
      };
    }
  }
  return null;
}

function isShelfPlacement(value: unknown): value is ShelfPlacement {
  if (!value || typeof value !== 'object') return false;
  const placement = value as ShelfPlacement;
  return (
    (placement.wall === 'left' || placement.wall === 'right') &&
    Number.isFinite(placement.u) &&
    Number.isFinite(placement.v) &&
    placement.u >= WALL_U_MIN &&
    placement.u <= WALL_U_MAX &&
    placement.v >= WALL_V_MIN &&
    placement.v <= WALL_V_MAX
  );
}

function makeCollisionRect(left: number, top: number, width: number, height: number) {
  return { left, top, right: left + width, bottom: top + height, width, height };
}

function collisionRectsOverlap(first: CollisionRect, second: CollisionRect, gap = 3) {
  return (
    first.left < second.right + gap &&
    first.right > second.left - gap &&
    first.top < second.bottom + gap &&
    first.bottom > second.top - gap
  );
}

function shelfPlacementRect(
  placement: ShelfPlacement,
  room: RoomDefinition,
  stageRect: DOMRect,
) {
  const screen = wallToScreen(placement, room);
  const width = stageRect.width * (window.innerWidth <= 560 ? 0.2 : 0.18);
  const height = width * SHELF_SPRITE_ASPECT;
  const centerX = stageRect.left + (screen.left / 100) * stageRect.width;
  const centerY = stageRect.top + (screen.top / 100) * stageRect.height;
  return makeCollisionRect(centerX - width / 2, centerY - height / 2, width, height);
}

function shieldPlacementRect(
  placement: ShieldPlacement,
  room: RoomDefinition,
  stageRect: DOMRect,
) {
  const screen = wallToScreen(placement, room);
  const width = stageRect.width * (window.innerWidth <= 560 ? 0.12 : 0.11);
  const height = width * SHIELD_SPRITE_ASPECT;
  const centerX = stageRect.left + (screen.left / 100) * stageRect.width;
  const centerY = stageRect.top + (screen.top / 100) * stageRect.height;
  return makeCollisionRect(centerX - width / 2, centerY - height / 2, width, height);
}

function trophyPlacementRect(
  trophyId: TrophyId,
  placement: TrophyPlacement,
  room: RoomDefinition,
  stageRect: DOMRect,
  tableRect: DOMRect | CollisionRect | null,
  shelfRect: DOMRect | CollisionRect | null,
  shelfPlacement: ShelfPlacement | null,
  furnitureRect: DOMRect | CollisionRect | null = null,
): CollisionRect | null {
  const trophy = trophyDefinition(trophyId);
  let width: number;
  let anchorX: number;
  let anchorY: number;

  if (placement.surface === 'floor') {
    const screen = gridToScreen(placement.position, room);
    width = stageRect.width * (window.innerWidth <= 560 ? 0.071 : 0.064) * trophy.widthScale;
    anchorX = stageRect.left + (screen.left / 100) * stageRect.width;
    anchorY = stageRect.top + (screen.top / 100) * stageRect.height;
  } else if (placement.surface === 'table') {
    if (!tableRect) return null;
    const local = tabletopToSpritePosition(placement);
    width = tableRect.width * 0.24 * trophy.widthScale;
    anchorX = tableRect.left + (local.left / 100) * tableRect.width;
    anchorY = tableRect.top + (local.top / 100) * tableRect.height;
  } else if (placement.surface === 'shelf') {
    if (!shelfRect || !shelfPlacement) return null;
    const local = shelfSurfaceToSpritePosition(placement, shelfPlacement.wall);
    width = shelfRect.width * 0.28 * trophy.widthScale;
    anchorX = shelfRect.left + (local.left / 100) * shelfRect.width;
    anchorY = shelfRect.top + (local.top / 100) * shelfRect.height;
  } else {
    if (!furnitureRect) return null;
    const definition = japaneseFurnitureDefinition(placement.furnitureId);
    if (!definition.surface) return null;
    const local = japaneseFurnitureSurfaceToSpritePosition(placement);
    width = furnitureRect.width * definition.surface.trophyWidth * trophy.widthScale;
    anchorX = furnitureRect.left + (local.left / 100) * furnitureRect.width;
    anchorY = furnitureRect.top + (local.top / 100) * furnitureRect.height;
  }

  const height = width * trophy.aspect;
  return makeCollisionRect(anchorX - width / 2, anchorY - height * 0.94, width, height);
}

async function cropTransparentSprite(source: string, hardAlpha = false) {
  const image = new Image();
  image.decoding = 'async';
  image.src = source;
  await image.decode();

  const canvas = document.createElement('canvas');
  canvas.width = image.naturalWidth;
  canvas.height = image.naturalHeight;
  const context = canvas.getContext('2d', { willReadFrequently: true });
  if (!context) return source;

  context.drawImage(image, 0, 0);
  const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
  const { data } = imageData;
  if (hardAlpha) {
    for (let offset = 3; offset < data.length; offset += 4) {
      data[offset] = data[offset] >= 200 ? 255 : 0;
    }
    context.putImageData(imageData, 0, 0);
  }
  let minX = canvas.width;
  let minY = canvas.height;
  let maxX = 0;
  let maxY = 0;

  for (let y = 0; y < canvas.height; y += 1) {
    for (let x = 0; x < canvas.width; x += 1) {
      const offset = (y * canvas.width + x) * 4;
      if (data[offset + 3] < 8) continue;
      minX = Math.min(minX, x);
      minY = Math.min(minY, y);
      maxX = Math.max(maxX, x);
      maxY = Math.max(maxY, y);
    }
  }

  if (minX > maxX || minY > maxY) return source;
  const padding = 8;
  const cropX = Math.max(0, minX - padding);
  const cropY = Math.max(0, minY - padding);
  const cropWidth = Math.min(canvas.width - cropX, maxX - minX + padding * 2);
  const cropHeight = Math.min(canvas.height - cropY, maxY - minY + padding * 2);
  const output = document.createElement('canvas');
  output.width = cropWidth;
  output.height = cropHeight;
  output.getContext('2d')?.drawImage(
    canvas, cropX, cropY, cropWidth, cropHeight, 0, 0, cropWidth, cropHeight,
  );
  return output.toDataURL('image/png');
}

function AnimatedAchievementSprite() {
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    ACHIEVEMENT_FRAMES.forEach((src) => {
      const image = new Image();
      image.src = src;
    });
  }, []);

  useEffect(() => {
    const delay = frame === ACHIEVEMENT_FRAMES.length - 1
      ? ACHIEVEMENT_LOOP_PAUSE
      : ACHIEVEMENT_FRAME_DURATION;
    const timeout = window.setTimeout(() => {
      setFrame((current) => (current + 1) % ACHIEVEMENT_FRAMES.length);
    }, delay);
    return () => window.clearTimeout(timeout);
  }, [frame]);

  return <img src={ACHIEVEMENT_FRAMES[frame]} alt="" draggable={false} />;
}

export function HouseExperience({ mode }: HouseExperienceProps) {
  const canEdit = mode === 'edit';
  const viewportRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const inventoryRef = useRef<HTMLElement>(null);
  const returnDropzoneRef = useRef<HTMLDivElement>(null);
  const tableObjectRef = useRef<HTMLDivElement>(null);
  const shelfObjectRef = useRef<HTMLDivElement>(null);
  const shieldObjectRef = useRef<HTMLDivElement>(null);
  const trophyObjectRefs = useRef<Partial<Record<TrophyId, HTMLButtonElement | null>>>({});
  const japaneseFurnitureObjectRefs = useRef<Partial<Record<JapaneseFurnitureId, HTMLDivElement | null>>>({});
  const tableDragOriginRef = useRef<GridPosition | null>(null);
  const tablePreviewRef = useRef<GridPosition | null>(null);
  const achievementDragOriginRef = useRef<GridPosition | null>(null);
  const achievementPreviewRef = useRef<GridPosition | null>(null);
  const trophyDragOriginRef = useRef<TrophyPlacement | null>(null);
  const trophyPreviewRef = useRef<TrophyPlacement | null>(null);
  const shelfDragOriginRef = useRef<ShelfPlacement | null>(null);
  const shelfPreviewRef = useRef<ShelfPlacement | null>(null);
  const shieldDragOriginRef = useRef<ShieldPlacement | null>(null);
  const shieldPreviewRef = useRef<ShieldPlacement | null>(null);
  const japaneseFurnitureDragOriginsRef = useRef<JapaneseFurniturePlacements>(emptyJapaneseFurniturePlacements());
  const japaneseFurniturePreviewsRef = useRef<JapaneseFurniturePlacements>(emptyJapaneseFurniturePlacements());
  const validRef = useRef(false);
  const panOriginRef = useRef({ clientX: 0, clientY: 0, panX: 0, panY: 0 });
  const returningItemRef = useRef(false);
  const returnTargetVisibleRef = useRef(false);
  const inventoryOpenBeforeDragRef = useRef(false);

  const [tableSpriteUrl, setTableSpriteUrl] = useState('/house/table-clean-source.png');
  const [trophySpriteUrls, setTrophySpriteUrls] = useState<TrophySpriteUrls>(initialTrophySpriteUrls);
  const [shelfSpriteUrl, setShelfSpriteUrl] = useState('/house/wall-shelf-single.png');
  const [shieldSpriteUrl, setShieldSpriteUrl] = useState('/house/mfa-wall-shield.png');
  const [leftShieldSpriteUrl, setLeftShieldSpriteUrl] = useState('/house/mfa-wall-shield-left.png');
  const [position, setPosition] = useState<GridPosition | null>(null);
  const [tablePreview, setTablePreview] = useState<GridPosition | null>(null);
  const [achievementPosition, setAchievementPosition] = useState<GridPosition | null>(null);
  const [achievementPreview, setAchievementPreview] = useState<GridPosition | null>(null);
  const [trophyPlacements, setTrophyPlacements] = useState<TrophyPlacements>(emptyTrophyPlacements);
  const [trophyPreview, setTrophyPreview] = useState<TrophyPlacement | null>(null);
  const [shelfPlacement, setShelfPlacement] = useState<ShelfPlacement | null>(null);
  const [shelfPreview, setShelfPreview] = useState<ShelfPlacement | null>(null);
  const [shieldPlacement, setShieldPlacement] = useState<ShieldPlacement | null>(null);
  const [shieldPreview, setShieldPreview] = useState<ShieldPlacement | null>(null);
  const [japaneseFurniturePlacements, setJapaneseFurniturePlacements] =
    useState<JapaneseFurniturePlacements>(emptyJapaneseFurniturePlacements);
  const [japaneseFurniturePreviews, setJapaneseFurniturePreviews] =
    useState<JapaneseFurniturePlacements>(emptyJapaneseFurniturePlacements);
  const [draggingItem, setDraggingItem] = useState<DragItem | null>(null);
  const [valid, setValid] = useState(false);
  const [, setBlockedByCollision] = useState(false);
  const [inventoryOpen, setInventoryOpen] = useState(false);
  const [inventoryFilter, setInventoryFilter] = useState<InventoryFilter>('furniture');
  const [returningItem, setReturningItem] = useState(false);
  const [returnTargetVisible, setReturnTargetVisible] = useState(false);
  const [returnTargetActive, setReturnTargetActive] = useState(false);
  const [achievementTooltip, setAchievementTooltip] =
    useState<AchievementTooltipState | null>(null);
  const [roomStyleKey, setRoomStyleKey] = useState<RoomStyleKey>('contemporaneo');
  const [stylePickerOpen, setStylePickerOpen] = useState(false);
  const [roomColorKey, setRoomColorKey] = useState<RoomColorKey>('original');
  const [colorPickerOpen, setColorPickerOpen] = useState(false);
  const [panX, setPanX] = useState(0);
  const [panY, setPanY] = useState(0);
  const [zoom, setZoom] = useState(0.88);
  const [panning, setPanning] = useState(false);
  const roomStyle = ROOM_STYLES[roomStyleKey];
  const roomColor = ROOM_COLORS[roomColorKey];
  const roomKey = roomStyle.roomKey;
  const room = ROOMS[roomKey];
  const dragging = draggingItem !== null;
  const tableDragging = draggingItem === 'table';
  const achievementDragging = draggingItem === 'achievement';
  const draggingTrophyId = draggingItem && isTrophyId(draggingItem) ? draggingItem : null;
  const trophyDragging = draggingTrophyId !== null;
  const shelfDragging = draggingItem === 'shelf';
  const shieldDragging = draggingItem === 'shield';
  const showFurniture = inventoryFilter === 'furniture';
  const showAchievements = inventoryFilter === 'achievement';
  const showWallItems = inventoryFilter === 'wall';
  const hasFurnitureInInventory = (!position && !tableDragging) ||
    JAPANESE_FURNITURE.some(({ id }) =>
      !japaneseFurniturePlacements[id] && draggingItem !== id,
    );
  const hasAchievementInInventory =
    (!achievementPosition && !achievementDragging) ||
    TROPHIES.some(({ id }) => !trophyPlacements[id] && draggingTrophyId !== id);
  const hasWallItemInInventory =
    (!shelfPlacement && !shelfDragging) || (!shieldPlacement && !shieldDragging);
  const currentInventoryIsEmpty =
    (showFurniture && !hasFurnitureInInventory) ||
    (showAchievements && !hasAchievementInInventory) ||
    (showWallItems && !hasWallItemInInventory);

  const updateTrophyPlacements = useCallback((
    updater: (current: TrophyPlacements) => TrophyPlacements,
  ) => {
    setTrophyPlacements((current) => {
      const next = updater(current);
      window.localStorage.setItem('casa-digital-segura:house:trophy-placements', JSON.stringify(next));
      return next;
    });
  }, []);

  const setTrophyPlacementFor = useCallback((
    id: TrophyId,
    placement: TrophyPlacement | null,
  ) => {
    updateTrophyPlacements((current) => ({ ...current, [id]: placement }));
  }, [updateTrophyPlacements]);

  const clearTrophiesFrom = useCallback((
    predicate: (placement: TrophyPlacement) => boolean,
  ) => {
    updateTrophyPlacements((current) => {
      const next = { ...current };
      for (const id of TROPHY_IDS) {
        if (next[id] && predicate(next[id])) next[id] = null;
      }
      return next;
    });
  }, [updateTrophyPlacements]);

  const showAchievementTooltip = useCallback((
    id: AchievementItemId,
    target: HTMLElement,
  ) => {
    const rect = target.getBoundingClientRect();
    const cardWidth = Math.min(320, Math.max(240, window.innerWidth - 24));
    const halfCardWidth = cardWidth / 2;
    const placement = rect.top < 190 ? 'below' : 'above';
    setAchievementTooltip({
      id,
      left: clamp(
        rect.left + rect.width / 2,
        halfCardWidth + 12,
        window.innerWidth - halfCardWidth - 12,
      ),
      top: placement === 'above' ? rect.top - 12 : rect.bottom + 12,
      placement,
    });
  }, []);

  const hideAchievementTooltip = useCallback((id: AchievementItemId) => {
    setAchievementTooltip((current) => current?.id === id ? null : current);
  }, []);

  const achievementTooltipProps = (
    id: AchievementItemId,
  ): React.ButtonHTMLAttributes<HTMLButtonElement> => ({
    'aria-describedby': achievementTooltip?.id === id ? 'achievement-tooltip' : undefined,
    onMouseEnter: (event) => showAchievementTooltip(id, event.currentTarget),
    onMouseLeave: () => hideAchievementTooltip(id),
    onFocus: (event) => showAchievementTooltip(id, event.currentTarget),
    onBlur: () => hideAchievementTooltip(id),
  });

  const clampRoomPan = useCallback((nextX: number, nextY: number, nextZoom: number) => {
    const viewportWidth = viewportRef.current?.clientWidth ?? 0;
    const viewportHeight = viewportRef.current?.clientHeight ?? 0;
    const stageWidth = stageRef.current?.offsetWidth ?? 0;
    const stageHeight = stageRef.current?.offsetHeight ?? 0;
    const scaledWidth = stageWidth * nextZoom;
    const scaledHeight = stageHeight * nextZoom;
    const maximumX = Math.max(90, Math.max(0, (scaledWidth - viewportWidth) / 2) + viewportWidth * 0.34);
    const maximumY = Math.max(70, Math.max(0, (scaledHeight - viewportHeight) / 2) + viewportHeight * 0.28);
    return {
      x: clamp(nextX, -maximumX, maximumX),
      y: clamp(nextY, -maximumY, maximumY),
    };
  }, []);

  useEffect(() => {
    if (!panning) return;

    const handleMove = (event: PointerEvent) => {
      event.preventDefault();
      const distanceX = event.clientX - panOriginRef.current.clientX;
      const distanceY = event.clientY - panOriginRef.current.clientY;
      const next = clampRoomPan(
        panOriginRef.current.panX + distanceX,
        panOriginRef.current.panY + distanceY,
        zoom,
      );
      setPanX(next.x);
      setPanY(next.y);
    };
    const handleEnd = () => setPanning(false);

    window.addEventListener('pointermove', handleMove, { passive: false });
    window.addEventListener('pointerup', handleEnd, { once: true });
    window.addEventListener('pointercancel', handleEnd, { once: true });
    return () => {
      window.removeEventListener('pointermove', handleMove);
      window.removeEventListener('pointerup', handleEnd);
      window.removeEventListener('pointercancel', handleEnd);
    };
  }, [clampRoomPan, panning, zoom]);

  useEffect(() => {
    const keepCameraInBounds = () => {
      const next = clampRoomPan(panX, panY, zoom);
      setPanX(next.x);
      setPanY(next.y);
    };
    const frame = window.requestAnimationFrame(keepCameraInBounds);
    window.addEventListener('resize', keepCameraInBounds);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener('resize', keepCameraInBounds);
    };
  }, [clampRoomPan, panX, panY, zoom]);

  useEffect(() => {
    Promise.all([
      cropTransparentSprite('/house/table-clean-source.png'),
      cropTransparentSprite('/house/wall-shelf-single.png', true),
      cropTransparentSprite('/house/mfa-wall-shield.png', true),
      cropTransparentSprite('/house/mfa-wall-shield-left.png', true),
      ...TROPHIES.map(({ src }) => cropTransparentSprite(src)),
    ]).then(([tableUrl, shelfUrl, shieldUrl, leftShieldUrl, ...croppedTrophies]) => {
      setTableSpriteUrl(tableUrl);
      setShelfSpriteUrl(shelfUrl);
      setShieldSpriteUrl(shieldUrl);
      setLeftShieldSpriteUrl(leftShieldUrl);
      setTrophySpriteUrls(Object.fromEntries(
        TROPHIES.map(({ id }, index) => [id, croppedTrophies[index]]),
      ) as TrophySpriteUrls);
    }).catch(() => undefined);
  }, []);

  /* eslint-disable react-hooks/set-state-in-effect -- restore the saved scene after client hydration. */
  useEffect(() => {
    const savedStyle = window.localStorage.getItem('casa-digital-segura:house:visual-style') as RoomStyleKey | null;
    const loadedStyle = savedStyle && savedStyle in ROOM_STYLES ? savedStyle : 'contemporaneo';
    const loadedRoom = ROOMS[ROOM_STYLES[loadedStyle].roomKey];
    setRoomStyleKey(loadedStyle);
    window.localStorage.setItem('casa-digital-segura:house:selected-room', ROOM_STYLES[loadedStyle].roomKey);
    const savedColor = window.localStorage.getItem('casa-digital-segura:house:color-style') as RoomColorKey | null;
    if (savedColor && savedColor in ROOM_COLORS) setRoomColorKey(savedColor);

    let loadedTable: GridPosition | null = null;
    const savedTable = window.localStorage.getItem('casa-digital-segura:house:table-position');
    if (savedTable) {
      try {
        const parsed = JSON.parse(savedTable) as GridPosition;
        if (isValidTablePosition(parsed, loadedRoom)) {
          loadedTable = parsed;
          setPosition(parsed);
        } else window.localStorage.removeItem('casa-digital-segura:house:table-position');
      } catch {
        window.localStorage.removeItem('casa-digital-segura:house:table-position');
      }
    }

    const savedAchievement = window.localStorage.getItem('casa-digital-segura:house:achievement-position');
    if (savedAchievement) {
      try {
        const parsed = JSON.parse(savedAchievement) as GridPosition;
        if (isValidAchievementPosition(parsed, loadedRoom)) {
          setAchievementPosition(parsed);
        } else window.localStorage.removeItem('casa-digital-segura:house:achievement-position');
      } catch {
        window.localStorage.removeItem('casa-digital-segura:house:achievement-position');
      }
    }

    let loadedShelf: ShelfPlacement | null = null;
    const savedShelf = window.localStorage.getItem('casa-digital-segura:house:shelf-placement');
    if (savedShelf) {
      try {
        const parsed = JSON.parse(savedShelf) as ShelfPlacement;
        if (isShelfPlacement(parsed)) {
          loadedShelf = parsed;
          setShelfPlacement(parsed);
        }
        else window.localStorage.removeItem('casa-digital-segura:house:shelf-placement');
      } catch {
        window.localStorage.removeItem('casa-digital-segura:house:shelf-placement');
      }
    }

    const savedShield = window.localStorage.getItem('casa-digital-segura:house:mfa-shield-placement');
    if (savedShield) {
      try {
        const parsed = JSON.parse(savedShield) as ShieldPlacement;
        if (isShelfPlacement(parsed)) setShieldPlacement(parsed);
        else window.localStorage.removeItem('casa-digital-segura:house:mfa-shield-placement');
      } catch {
        window.localStorage.removeItem('casa-digital-segura:house:mfa-shield-placement');
      }
    }

    let loadedJapaneseFurniture = emptyJapaneseFurniturePlacements();
    const savedJapaneseFurniture = window.localStorage.getItem('casa-digital-segura:house:japanese-furniture');
    if (savedJapaneseFurniture) {
      try {
        const parsed = JSON.parse(savedJapaneseFurniture) as Partial<JapaneseFurniturePlacements>;
        const restored = emptyJapaneseFurniturePlacements();
        for (const id of JAPANESE_FURNITURE_IDS) {
          const placement = parsed[id];
          if (placement && Number.isFinite(placement.x) && Number.isFinite(placement.y)) {
            restored[id] = clampJapaneseFurniturePosition(placement, loadedRoom, id);
          }
        }
        loadedJapaneseFurniture = restored;
        setJapaneseFurniturePlacements(restored);
        window.localStorage.setItem('casa-digital-segura:house:japanese-furniture', JSON.stringify(restored));
      } catch {
        window.localStorage.removeItem('casa-digital-segura:house:japanese-furniture');
      }
    }

    const restoredTrophies = emptyTrophyPlacements();
    const restoreTrophy = (id: TrophyId, placement: TrophyPlacement) => {
      const hasRequiredSurface =
        (placement.surface !== 'table' || loadedTable) &&
        (placement.surface !== 'shelf' || loadedShelf) &&
        (placement.surface !== 'furniture' || loadedJapaneseFurniture[placement.furnitureId]);
      if (isTrophyPlacement(placement, loadedRoom) && hasRequiredSurface) {
        restoredTrophies[id] = placement;
      }
    };
    const savedTrophies = window.localStorage.getItem('casa-digital-segura:house:trophy-placements');
    if (savedTrophies) {
      try {
        const parsed = JSON.parse(savedTrophies) as Partial<TrophyPlacements>;
        for (const id of TROPHY_IDS) {
          const placement = parsed[id];
          if (placement) restoreTrophy(id, placement);
        }
      } catch {
        window.localStorage.removeItem('casa-digital-segura:house:trophy-placements');
      }
    } else {
      const legacyTrophy = window.localStorage.getItem('casa-digital-segura:house:trophy-placement');
      if (legacyTrophy) {
        try {
          restoreTrophy('trophy', JSON.parse(legacyTrophy) as TrophyPlacement);
        } catch {
          window.localStorage.removeItem('casa-digital-segura:house:trophy-placement');
        }
      }
    }
    setTrophyPlacements(restoredTrophies);
    window.localStorage.setItem('casa-digital-segura:house:trophy-placements', JSON.stringify(restoredTrophies));
    window.localStorage.removeItem('casa-digital-segura:house:trophy-placement');
  }, []);
  /* eslint-enable react-hooks/set-state-in-effect */

  const collidesForTable = useCallback((next: GridPosition) => {
    for (const definition of JAPANESE_FURNITURE) {
      const placement = japaneseFurniturePlacements[definition.id];
      if (!placement) continue;
      if (gridFootprintsOverlap(
        next,
        TABLE_GRID_FOOTPRINT,
        japaneseFurnitureCollisionPosition(placement, definition),
        { radiusX: definition.gridRadiusX, radiusY: definition.gridRadiusY },
      )) return true;
    }
    if (
      achievementPosition &&
      gridFootprintsOverlap(
        next,
        TABLE_GRID_FOOTPRINT,
        achievementPosition,
        ACHIEVEMENT_GRID_FOOTPRINT,
      )
    ) return true;
    for (const id of TROPHY_IDS) {
      const placement = trophyPlacements[id];
      if (placement?.surface === 'floor' && gridFootprintsOverlap(
        next,
        TABLE_GRID_FOOTPRINT,
        placement.position,
        TROPHY_GRID_FOOTPRINT,
      )) return true;
    }
    return false;
  }, [achievementPosition, japaneseFurniturePlacements, trophyPlacements]);

  const collidesForShelf = useCallback((next: ShelfPlacement) => {
    const stageRect = stageRef.current?.getBoundingClientRect();
    if (!stageRect) return false;
    const nextRect = shelfPlacementRect(next, room, stageRect);
    const shieldRect = shieldObjectRef.current?.getBoundingClientRect();
    if (shieldRect && collisionRectsOverlap(nextRect, shieldRect)) return true;

    const movingTrophyRects: CollisionRect[] = [];
    for (const id of TROPHY_IDS) {
      const placement = trophyPlacements[id];
      if (!placement) continue;
      const trophyRect = trophyObjectRefs.current[id]?.getBoundingClientRect();
      if (placement.surface !== 'shelf') {
        if (trophyRect && collisionRectsOverlap(nextRect, trophyRect)) return true;
        continue;
      }
      const movingRect = trophyPlacementRect(id, placement, room, stageRect, null, nextRect, next);
      if (!movingRect) continue;
      if (shieldRect && collisionRectsOverlap(movingRect, shieldRect)) return true;
      movingTrophyRects.push(movingRect);
    }
    for (const movingRect of movingTrophyRects) {
      for (const id of TROPHY_IDS) {
        if (trophyPlacements[id]?.surface === 'shelf') continue;
        const trophyRect = trophyObjectRefs.current[id]?.getBoundingClientRect();
        if (trophyRect && collisionRectsOverlap(movingRect, trophyRect)) return true;
      }
    }
    return false;
  }, [room, trophyPlacements]);

  const collidesForShield = useCallback((next: ShieldPlacement) => {
    const stageRect = stageRef.current?.getBoundingClientRect();
    if (!stageRect) return false;
    const nextRect = shieldPlacementRect(next, room, stageRect);
    const shelfRect = shelfObjectRef.current?.getBoundingClientRect();
    if (shelfRect && collisionRectsOverlap(nextRect, shelfRect)) return true;
    for (const id of TROPHY_IDS) {
      const trophyRect = trophyObjectRefs.current[id]?.getBoundingClientRect();
      if (trophyRect && collisionRectsOverlap(nextRect, trophyRect)) return true;
    }
    return false;
  }, [room]);

  const collidesForTrophy = useCallback((trophyId: TrophyId, next: TrophyPlacement) => {
    const stageRect = stageRef.current?.getBoundingClientRect();
    if (!stageRect) return false;
    const tableRect = tableObjectRef.current?.getBoundingClientRect() ?? null;
    const shelfRect = shelfObjectRef.current?.getBoundingClientRect() ?? null;
    const shieldRect = shieldObjectRef.current?.getBoundingClientRect() ?? null;
    const furnitureRect = next.surface === 'furniture'
      ? japaneseFurnitureObjectRefs.current[next.furnitureId]?.getBoundingClientRect() ?? null
      : null;
    const nextRect = trophyPlacementRect(
      trophyId,
      next,
      room,
      stageRect,
      tableRect,
      shelfRect,
      shelfPlacement,
      furnitureRect,
    );
    if (!nextRect) return false;
    if (next.surface === 'floor') {
      if (
        achievementPosition &&
        gridFootprintsOverlap(
          next.position,
          TROPHY_GRID_FOOTPRINT,
          achievementPosition,
          ACHIEVEMENT_GRID_FOOTPRINT,
        )
      ) return true;
      if (
        position &&
        gridFootprintsOverlap(
          next.position,
          TROPHY_GRID_FOOTPRINT,
          position,
          TABLE_GRID_FOOTPRINT,
        )
      ) return true;
      for (const definition of JAPANESE_FURNITURE) {
        const placement = japaneseFurniturePlacements[definition.id];
        if (!placement) continue;
        if (gridFootprintsOverlap(
          next.position,
          TROPHY_GRID_FOOTPRINT,
          japaneseFurnitureCollisionPosition(placement, definition),
          { radiusX: definition.gridRadiusX, radiusY: definition.gridRadiusY },
        )) return true;
      }
      for (const otherId of TROPHY_IDS) {
        if (otherId === trophyId) continue;
        const otherPlacement = trophyPlacements[otherId];
        if (otherPlacement?.surface === 'floor' && gridFootprintsOverlap(
          next.position,
          TROPHY_GRID_FOOTPRINT,
          otherPlacement.position,
          TROPHY_GRID_FOOTPRINT,
        )) return true;
      }
    } else if (
      next.surface === 'shelf' &&
      tableRect &&
      collisionRectsOverlap(nextRect, tableRect)
    ) {
      return true;
    }
    if (next.surface !== 'shelf' && shelfRect && collisionRectsOverlap(nextRect, shelfRect)) {
      return true;
    }
    if (shieldRect && collisionRectsOverlap(nextRect, shieldRect)) return true;
    for (const otherId of TROPHY_IDS) {
      if (otherId === trophyId) continue;
      const otherRect = trophyObjectRefs.current[otherId]?.getBoundingClientRect();
      if (otherRect && collisionRectsOverlap(nextRect, otherRect)) return true;
    }
    return false;
  }, [achievementPosition, japaneseFurniturePlacements, position, room, shelfPlacement, trophyPlacements]);

  const collidesForJapaneseFurniture = useCallback((
    id: JapaneseFurnitureId,
    next: GridPosition,
  ) => {
    const definition = japaneseFurnitureDefinition(id);
    const footprint = { radiusX: definition.gridRadiusX, radiusY: definition.gridRadiusY };
    const collisionPosition = japaneseFurnitureCollisionPosition(next, definition);
    if (
      achievementPosition &&
      gridFootprintsOverlap(
        collisionPosition,
        footprint,
        achievementPosition,
        ACHIEVEMENT_GRID_FOOTPRINT,
      )
    ) return true;
    if (
      position &&
      gridFootprintsOverlap(collisionPosition, footprint, position, TABLE_GRID_FOOTPRINT)
    ) return true;
    for (const trophyId of TROPHY_IDS) {
      const trophyPlacement = trophyPlacements[trophyId];
      if (trophyPlacement?.surface === 'floor' && gridFootprintsOverlap(
        collisionPosition,
        footprint,
        trophyPlacement.position,
        TROPHY_GRID_FOOTPRINT,
      )) return true;
    }
    for (const otherDefinition of JAPANESE_FURNITURE) {
      if (otherDefinition.id === id) continue;
      const placement = japaneseFurniturePlacements[otherDefinition.id];
      if (!placement) continue;
      if (gridFootprintsOverlap(
        collisionPosition,
        footprint,
        japaneseFurnitureCollisionPosition(placement, otherDefinition),
        { radiusX: otherDefinition.gridRadiusX, radiusY: otherDefinition.gridRadiusY },
      )) return true;
    }
    return false;
  }, [achievementPosition, japaneseFurniturePlacements, position, trophyPlacements]);

  const collidesForAchievement = useCallback((next: GridPosition) => {
    if (
      position &&
      gridFootprintsOverlap(next, ACHIEVEMENT_GRID_FOOTPRINT, position, TABLE_GRID_FOOTPRINT)
    ) return true;
    for (const trophyId of TROPHY_IDS) {
      const trophyPlacement = trophyPlacements[trophyId];
      if (trophyPlacement?.surface === 'floor' && gridFootprintsOverlap(
        next,
        ACHIEVEMENT_GRID_FOOTPRINT,
        trophyPlacement.position,
        TROPHY_GRID_FOOTPRINT,
      )) return true;
    }
    for (const definition of JAPANESE_FURNITURE) {
      const placement = japaneseFurniturePlacements[definition.id];
      if (!placement) continue;
      if (gridFootprintsOverlap(
        next,
        ACHIEVEMENT_GRID_FOOTPRINT,
        japaneseFurnitureCollisionPosition(placement, definition),
        { radiusX: definition.gridRadiusX, radiusY: definition.gridRadiusY },
      )) return true;
    }
    return false;
  }, [japaneseFurniturePlacements, position, trophyPlacements]);

  const updatePointer = useCallback((clientX: number, clientY: number, item: DragItem) => {
    const stageRect = stageRef.current?.getBoundingClientRect();
    if (!stageRect) return;
    setBlockedByCollision(false);
    const insideStage = clientX >= stageRect.left && clientX <= stageRect.right &&
      clientY >= stageRect.top && clientY <= stageRect.bottom;

    if (item === 'table') {
      const next = screenToGrid(clientX, clientY, stageRect, room);
      const collision = insideStage && isValidTablePosition(next, room) && collidesForTable(next);
      const nextValid = insideStage && isValidTablePosition(next, room) && !collision;
      tablePreviewRef.current = next;
      validRef.current = nextValid;
      setTablePreview(next);
      setValid(nextValid);
      setBlockedByCollision(collision);
      return;
    }

    if (item === 'achievement') {
      const next = screenToGrid(clientX, clientY, stageRect, room);
      const collision = insideStage && isValidAchievementPosition(next, room) &&
        collidesForAchievement(next);
      const nextValid = insideStage && isValidAchievementPosition(next, room) && !collision;
      achievementPreviewRef.current = next;
      validRef.current = nextValid;
      setAchievementPreview(next);
      setValid(nextValid);
      setBlockedByCollision(collision);
      return;
    }

    if (isJapaneseFurnitureId(item)) {
      const next = screenToGrid(clientX, clientY, stageRect, room);
      const collision = insideStage && isValidJapaneseFurniturePosition(next, room, item) &&
        collidesForJapaneseFurniture(item, next);
      const nextValid = insideStage && isValidJapaneseFurniturePosition(next, room, item) && !collision;
      japaneseFurniturePreviewsRef.current[item] = next;
      validRef.current = nextValid;
      setJapaneseFurniturePreviews((current) => ({ ...current, [item]: next }));
      setValid(nextValid);
      setBlockedByCollision(collision);
      return;
    }

    if (item === 'shelf' || item === 'shield') {
      const next = insideStage ? pointerToWall(clientX, clientY, stageRect, room) : null;
      const collision = next
        ? item === 'shelf' ? collidesForShelf(next) : collidesForShield(next)
        : false;
      const nextValid = Boolean(next) && !collision;
      validRef.current = nextValid;
      setValid(nextValid);
      setBlockedByCollision(collision);
      if (next) {
        if (item === 'shelf') {
          shelfPreviewRef.current = next;
          setShelfPreview(next);
        } else {
          shieldPreviewRef.current = next;
          setShieldPreview(next);
        }
      }
      return;
    }

    if (!isTrophyId(item)) return;

    const shelfSurfacePlacement = shelfPlacement && insideStage && shelfObjectRef.current
      ? pointerToShelfSurface(
          clientX,
          clientY,
          shelfObjectRef.current.getBoundingClientRect(),
          shelfPlacement.wall,
        )
      : null;

    if (shelfSurfacePlacement) {
      const collision = collidesForTrophy(item, shelfSurfacePlacement);
      trophyPreviewRef.current = shelfSurfacePlacement;
      validRef.current = !collision;
      setTrophyPreview(shelfSurfacePlacement);
      setValid(!collision);
      setBlockedByCollision(collision);
      return;
    }

    const tabletopPlacement = position && insideStage && tableObjectRef.current
      ? pointerToTabletop(clientX, clientY, tableObjectRef.current.getBoundingClientRect())
      : null;

    if (tabletopPlacement) {
      const collision = collidesForTrophy(item, tabletopPlacement);
      trophyPreviewRef.current = tabletopPlacement;
      validRef.current = !collision;
      setTrophyPreview(tabletopPlacement);
      setValid(!collision);
      setBlockedByCollision(collision);
      return;
    }

    let japaneseSurfacePlacement: TrophyPlacement | null = null;
    if (insideStage) {
      for (const definition of JAPANESE_FURNITURE) {
        if (!definition.surface || !isJapaneseSurfaceFurnitureId(definition.id)) continue;
        if (!japaneseFurniturePlacements[definition.id]) continue;
        const furnitureRect = japaneseFurnitureObjectRefs.current[definition.id]
          ?.getBoundingClientRect();
        if (!furnitureRect) continue;
        japaneseSurfacePlacement = pointerToJapaneseFurnitureSurface(
          clientX,
          clientY,
          furnitureRect,
          definition.id,
        );
        if (japaneseSurfacePlacement) break;
      }
    }

    if (japaneseSurfacePlacement) {
      const collision = collidesForTrophy(item, japaneseSurfacePlacement);
      trophyPreviewRef.current = japaneseSurfacePlacement;
      validRef.current = !collision;
      setTrophyPreview(japaneseSurfacePlacement);
      setValid(!collision);
      setBlockedByCollision(collision);
      return;
    }

    const floorPosition = screenToGrid(clientX, clientY, stageRect, room);
    const floorPlacement: TrophyPlacement = { surface: 'floor', position: floorPosition };
    const collision = insideStage && isValidTrophyFloorPosition(floorPosition, room) &&
      collidesForTrophy(item, floorPlacement);
    const nextValid = insideStage && isValidTrophyFloorPosition(floorPosition, room) && !collision;
    trophyPreviewRef.current = floorPlacement;
    validRef.current = nextValid;
    setTrophyPreview(floorPlacement);
    setValid(nextValid);
    setBlockedByCollision(collision);
  }, [collidesForAchievement, collidesForJapaneseFurniture, collidesForShelf, collidesForShield, collidesForTable, collidesForTrophy, japaneseFurniturePlacements, position, room, shelfPlacement]);

  useEffect(() => {
    if (!draggingItem) return;

    const handleMove = (event: PointerEvent) => {
      event.preventDefault();
      const stageRect = stageRef.current?.getBoundingClientRect();
      if (
        returningItemRef.current &&
        stageRect &&
        !pointInsideRect(event.clientX, event.clientY, stageRect)
      ) {
        returnTargetVisibleRef.current = true;
        setReturnTargetVisible(true);
      }
      const returnTargetRect = returnDropzoneRef.current?.getBoundingClientRect();
      setReturnTargetActive(Boolean(
        returningItemRef.current && returnTargetVisibleRef.current && returnTargetRect &&
        pointInsideRect(event.clientX, event.clientY, returnTargetRect),
      ));
      updatePointer(event.clientX, event.clientY, draggingItem);
    };

    const handleEnd = (event: PointerEvent) => {
      const returnTargetRect = returnDropzoneRef.current?.getBoundingClientRect();
      const returnedToInventory = Boolean(
        returningItemRef.current && returnTargetVisibleRef.current && returnTargetRect &&
        pointInsideRect(event.clientX, event.clientY, returnTargetRect),
      );

      if (returnedToInventory) {
        if (draggingItem === 'table') {
          setPosition(null);
          window.localStorage.removeItem('casa-digital-segura:house:table-position');
          clearTrophiesFrom((placement) => placement.surface === 'table');
        } else if (draggingItem === 'achievement') {
          setAchievementPosition(null);
          window.localStorage.removeItem('casa-digital-segura:house:achievement-position');
        } else if (isTrophyId(draggingItem)) {
          setTrophyPlacementFor(draggingItem, null);
        } else if (draggingItem === 'shelf') {
          setShelfPlacement(null);
          window.localStorage.removeItem('casa-digital-segura:house:shelf-placement');
          clearTrophiesFrom((placement) => placement.surface === 'shelf');
        } else if (isJapaneseFurnitureId(draggingItem)) {
          setJapaneseFurniturePlacements((current) => {
            const next = { ...current, [draggingItem]: null };
            window.localStorage.setItem('casa-digital-segura:house:japanese-furniture', JSON.stringify(next));
            return next;
          });
          clearTrophiesFrom((placement) =>
            placement.surface === 'furniture' && placement.furnitureId === draggingItem);
        } else {
          setShieldPlacement(null);
          window.localStorage.removeItem('casa-digital-segura:house:mfa-shield-placement');
        }
      } else if (draggingItem === 'table') {
        const nextPosition = validRef.current ? tablePreviewRef.current : tableDragOriginRef.current;
        setPosition(nextPosition);
        if (nextPosition) {
          window.localStorage.setItem('casa-digital-segura:house:table-position', JSON.stringify(nextPosition));
        } else window.localStorage.removeItem('casa-digital-segura:house:table-position');
      } else if (draggingItem === 'achievement') {
        const nextPosition = validRef.current
          ? achievementPreviewRef.current
          : achievementDragOriginRef.current;
        setAchievementPosition(nextPosition);
        if (nextPosition) {
          window.localStorage.setItem('casa-digital-segura:house:achievement-position', JSON.stringify(nextPosition));
        } else window.localStorage.removeItem('casa-digital-segura:house:achievement-position');
      } else if (isTrophyId(draggingItem)) {
        const nextPlacement = validRef.current ? trophyPreviewRef.current : trophyDragOriginRef.current;
        setTrophyPlacementFor(draggingItem, nextPlacement);
      } else if (draggingItem === 'shelf') {
        const nextPlacement = validRef.current ? shelfPreviewRef.current : shelfDragOriginRef.current;
        setShelfPlacement(nextPlacement);
        if (nextPlacement) {
          window.localStorage.setItem('casa-digital-segura:house:shelf-placement', JSON.stringify(nextPlacement));
        } else window.localStorage.removeItem('casa-digital-segura:house:shelf-placement');
      } else if (isJapaneseFurnitureId(draggingItem)) {
        const id = draggingItem;
        const nextPosition = validRef.current
          ? japaneseFurniturePreviewsRef.current[id]
          : japaneseFurnitureDragOriginsRef.current[id];
        setJapaneseFurniturePlacements((current) => {
          const next = { ...current, [id]: nextPosition };
          window.localStorage.setItem('casa-digital-segura:house:japanese-furniture', JSON.stringify(next));
          return next;
        });
      } else {
        const nextPlacement = validRef.current ? shieldPreviewRef.current : shieldDragOriginRef.current;
        setShieldPlacement(nextPlacement);
        if (nextPlacement) {
          window.localStorage.setItem('casa-digital-segura:house:mfa-shield-placement', JSON.stringify(nextPlacement));
        } else window.localStorage.removeItem('casa-digital-segura:house:mfa-shield-placement');
      }

      setTablePreview(null);
      setAchievementPreview(null);
      setTrophyPreview(null);
      setShelfPreview(null);
      setShieldPreview(null);
      setJapaneseFurniturePreviews(emptyJapaneseFurniturePlacements());
      japaneseFurniturePreviewsRef.current = emptyJapaneseFurniturePlacements();
      setDraggingItem(null);
      setValid(false);
      setBlockedByCollision(false);
      setReturnTargetActive(false);
      setReturnTargetVisible(false);
      setReturningItem(false);
      returningItemRef.current = false;
      returnTargetVisibleRef.current = false;
      setInventoryOpen(inventoryOpenBeforeDragRef.current);
    };

    window.addEventListener('pointermove', handleMove, { passive: false });
    window.addEventListener('pointerup', handleEnd, { once: true });
    window.addEventListener('pointercancel', handleEnd, { once: true });
    return () => {
      window.removeEventListener('pointermove', handleMove);
      window.removeEventListener('pointerup', handleEnd);
      window.removeEventListener('pointercancel', handleEnd);
    };
  }, [clearTrophiesFrom, draggingItem, setTrophyPlacementFor, updatePointer]);

  const prepareItemDrag = (fromInventory: boolean) => {
    setAchievementTooltip(null);
    inventoryOpenBeforeDragRef.current = inventoryOpen;
    returningItemRef.current = !fromInventory;
    returnTargetVisibleRef.current = false;
    setReturningItem(!fromInventory);
    setReturnTargetVisible(false);
    setReturnTargetActive(false);
    if (!fromInventory) {
      setInventoryOpen(false);
    }
  };

  const beginTableDrag = (event: React.PointerEvent, fromInventory = false) => {
    event.preventDefault();
    event.stopPropagation();
    prepareItemDrag(fromInventory);
    tableDragOriginRef.current = fromInventory ? null : position;
    tablePreviewRef.current = fromInventory ? START_POSITION : position;
    validRef.current = true;
    setTablePreview(fromInventory ? START_POSITION : position);
    setDraggingItem('table');
    setValid(true);
    setBlockedByCollision(false);
    updatePointer(event.clientX, event.clientY, 'table');
  };

  const beginAchievementDrag = (event: React.PointerEvent, fromInventory = false) => {
    event.preventDefault();
    event.stopPropagation();
    prepareItemDrag(fromInventory);
    const initialPosition = fromInventory ? START_ACHIEVEMENT_POSITION : achievementPosition;
    achievementDragOriginRef.current = fromInventory ? null : achievementPosition;
    achievementPreviewRef.current = initialPosition;
    validRef.current = true;
    setAchievementPreview(initialPosition);
    setDraggingItem('achievement');
    setValid(true);
    setBlockedByCollision(false);
    updatePointer(event.clientX, event.clientY, 'achievement');
  };

  const beginTrophyDrag = (
    event: React.PointerEvent,
    id: TrophyId,
    fromInventory = false,
  ) => {
    event.preventDefault();
    event.stopPropagation();
    prepareItemDrag(fromInventory);
    const firstFurnitureSurface = JAPANESE_FURNITURE.find((definition) =>
      definition.surface && japaneseFurniturePlacements[definition.id]);
    const initialPlacement = fromInventory
      ? position
        ? START_TABLETOP
        : shelfPlacement
          ? START_SHELF_SURFACE
          : firstFurnitureSurface && isJapaneseSurfaceFurnitureId(firstFurnitureSurface.id)
            ? {
                surface: 'furniture' as const,
                furnitureId: firstFurnitureSurface.id,
                u: 0.5,
                v: 0.5,
              }
            : { surface: 'floor' as const, position: START_POSITION }
      : trophyPlacements[id];
    trophyDragOriginRef.current = fromInventory ? null : trophyPlacements[id];
    trophyPreviewRef.current = initialPlacement;
    validRef.current = true;
    setTrophyPreview(initialPlacement);
    setDraggingItem(id);
    setValid(true);
    setBlockedByCollision(false);
    updatePointer(event.clientX, event.clientY, id);
  };

  const beginShelfDrag = (event: React.PointerEvent, fromInventory = false) => {
    event.preventDefault();
    event.stopPropagation();
    prepareItemDrag(fromInventory);
    const initialPlacement = fromInventory ? START_SHELF : shelfPlacement;
    shelfDragOriginRef.current = fromInventory ? null : shelfPlacement;
    shelfPreviewRef.current = initialPlacement;
    validRef.current = true;
    setShelfPreview(initialPlacement);
    setDraggingItem('shelf');
    setValid(true);
    setBlockedByCollision(false);
    updatePointer(event.clientX, event.clientY, 'shelf');
  };

  const beginShieldDrag = (event: React.PointerEvent, fromInventory = false) => {
    event.preventDefault();
    event.stopPropagation();
    prepareItemDrag(fromInventory);
    const initialPlacement = fromInventory ? START_SHIELD : shieldPlacement;
    shieldDragOriginRef.current = fromInventory ? null : shieldPlacement;
    shieldPreviewRef.current = initialPlacement;
    validRef.current = true;
    setShieldPreview(initialPlacement);
    setDraggingItem('shield');
    setValid(true);
    setBlockedByCollision(false);
    updatePointer(event.clientX, event.clientY, 'shield');
  };

  const beginJapaneseFurnitureDrag = (
    event: React.PointerEvent,
    id: JapaneseFurnitureId,
    fromInventory = false,
  ) => {
    event.preventDefault();
    event.stopPropagation();
    prepareItemDrag(fromInventory);
    const initialPosition = fromInventory ? START_POSITION : japaneseFurniturePlacements[id];
    japaneseFurnitureDragOriginsRef.current[id] = fromInventory
      ? null
      : japaneseFurniturePlacements[id];
    japaneseFurniturePreviewsRef.current[id] = initialPosition;
    setJapaneseFurniturePreviews((current) => ({ ...current, [id]: initialPosition }));
    validRef.current = true;
    setDraggingItem(id);
    setValid(true);
    setBlockedByCollision(false);
    updatePointer(event.clientX, event.clientY, id);
  };

  const placeTableFromKeyboard = () => {
    if (collidesForTable(START_POSITION)) return;
    setPosition(START_POSITION);
    window.localStorage.setItem('casa-digital-segura:house:table-position', JSON.stringify(START_POSITION));
  };

  const placeAchievementFromKeyboard = () => {
    const center = Math.round((room.trophyGridMin + room.trophyGridMax) / 2);
    const candidates: GridPosition[] = [];
    for (let x = room.trophyGridMin + 1; x <= room.trophyGridMax - 1; x += 1) {
      for (let y = room.trophyGridMin + 1; y <= room.trophyGridMax - 1; y += 1) {
        candidates.push({ x, y });
      }
    }
    candidates.sort((first, second) =>
      Math.abs(first.x - center) + Math.abs(first.y - center) -
      Math.abs(second.x - center) - Math.abs(second.y - center));
    const nextPosition = candidates.find((candidate) => !collidesForAchievement(candidate));
    if (!nextPosition) return;
    setAchievementPosition(nextPosition);
    window.localStorage.setItem('casa-digital-segura:house:achievement-position', JSON.stringify(nextPosition));
  };

  const placeTrophyFromKeyboard = (id: TrophyId) => {
    const surfacePoints = [
      { u: 0.5, v: 0.5 },
      { u: 0.32, v: 0.32 },
      { u: 0.68, v: 0.32 },
      { u: 0.32, v: 0.68 },
      { u: 0.68, v: 0.68 },
    ];
    const candidates: TrophyPlacement[] = [];

    if (position) {
      for (const point of surfacePoints) {
        candidates.push({ surface: 'table', ...point });
      }
    }
    if (shelfPlacement) {
      for (const point of surfacePoints) {
        candidates.push({ surface: 'shelf', ...point });
      }
    }
    for (const definition of JAPANESE_FURNITURE) {
      if (!definition.surface || !japaneseFurniturePlacements[definition.id] ||
        !isJapaneseSurfaceFurnitureId(definition.id)) continue;
      for (const point of surfacePoints) {
        candidates.push({ surface: 'furniture', furnitureId: definition.id, ...point });
      }
    }

    const center = Math.round((room.trophyGridMin + room.trophyGridMax) / 2);
    const floorCandidates: GridPosition[] = [];
    for (let x = room.trophyGridMin; x <= room.trophyGridMax; x += 1) {
      for (let y = room.trophyGridMin; y <= room.trophyGridMax; y += 1) {
        floorCandidates.push({ x, y });
      }
    }
    floorCandidates.sort((first, second) =>
      Math.abs(first.x - center) + Math.abs(first.y - center) -
      Math.abs(second.x - center) - Math.abs(second.y - center));
    candidates.push(...floorCandidates.map((floorPosition) => ({
      surface: 'floor' as const,
      position: floorPosition,
    })));

    const placement = candidates.find((candidate) =>
      (candidate.surface !== 'floor' || isValidTrophyFloorPosition(candidate.position, room)) &&
      !collidesForTrophy(id, candidate));
    if (!placement) return;
    setTrophyPlacementFor(id, placement);
  };

  const placeShelfFromKeyboard = () => {
    if (collidesForShelf(START_SHELF)) return;
    setShelfPlacement(START_SHELF);
    window.localStorage.setItem('casa-digital-segura:house:shelf-placement', JSON.stringify(START_SHELF));
  };

  const placeShieldFromKeyboard = () => {
    if (collidesForShield(START_SHIELD)) return;
    setShieldPlacement(START_SHIELD);
    window.localStorage.setItem('casa-digital-segura:house:mfa-shield-placement', JSON.stringify(START_SHIELD));
  };

  const placeJapaneseFurnitureFromKeyboard = (id: JapaneseFurnitureId) => {
    const center = Math.round((room.tableGridMin + room.tableGridMax) / 2);
    const candidates: GridPosition[] = [{ x: center, y: center }];
    for (let distance = 1; distance <= room.tableGridMax - room.tableGridMin; distance += 1) {
      candidates.push(
        { x: center - distance, y: center },
        { x: center + distance, y: center },
        { x: center, y: center - distance },
        { x: center, y: center + distance },
      );
    }
    const nextPosition = candidates.find((candidate) =>
      isValidJapaneseFurniturePosition(candidate, room, id) &&
      !collidesForJapaneseFurniture(id, candidate));
    if (!nextPosition) return;
    setJapaneseFurniturePlacements((current) => {
      const next = { ...current, [id]: nextPosition };
      window.localStorage.setItem('casa-digital-segura:house:japanese-furniture', JSON.stringify(next));
      return next;
    });
  };

  const resetTrophy = (id: TrophyId) => {
    setTrophyPlacementFor(id, null);
    setTrophyPreview(null);
  };

  const resetAchievement = () => {
    setAchievementPosition(null);
    setAchievementPreview(null);
    window.localStorage.removeItem('casa-digital-segura:house:achievement-position');
  };

  const resetShelf = () => {
    setShelfPlacement(null);
    setShelfPreview(null);
    window.localStorage.removeItem('casa-digital-segura:house:shelf-placement');
    clearTrophiesFrom((placement) => placement.surface === 'shelf');
  };

  const resetShield = () => {
    setShieldPlacement(null);
    setShieldPreview(null);
    window.localStorage.removeItem('casa-digital-segura:house:mfa-shield-placement');
  };

  const resetJapaneseFurniture = (id: JapaneseFurnitureId) => {
    setJapaneseFurniturePlacements((current) => {
      const next = { ...current, [id]: null };
      window.localStorage.setItem('casa-digital-segura:house:japanese-furniture', JSON.stringify(next));
      return next;
    });
    setJapaneseFurniturePreviews((current) => ({ ...current, [id]: null }));
    clearTrophiesFrom((placement) =>
      placement.surface === 'furniture' && placement.furnitureId === id);
  };

  const resetTable = () => {
    setPosition(null);
    setTablePreview(null);
    window.localStorage.removeItem('casa-digital-segura:house:table-position');
    clearTrophiesFrom((placement) => placement.surface === 'table');
  };

  const moveTableWithKeyboard = (event: React.KeyboardEvent) => {
    if (!position) return;
    let next = { ...position };
    if (event.key === 'ArrowUp') next = { x: position.x - 1, y: position.y - 1 };
    else if (event.key === 'ArrowDown') next = { x: position.x + 1, y: position.y + 1 };
    else if (event.key === 'ArrowLeft') next = { x: position.x - 1, y: position.y + 1 };
    else if (event.key === 'ArrowRight') next = { x: position.x + 1, y: position.y - 1 };
    else if (event.key === 'Escape' || event.key === 'Delete') {
      resetTable();
      return;
    } else return;

    event.preventDefault();
    next.x = clamp(next.x, room.tableGridMin, room.tableGridMax);
    next.y = clamp(next.y, room.tableGridMin, room.tableGridMax);
    if (collidesForTable(next)) return;
    setPosition(next);
    window.localStorage.setItem('casa-digital-segura:house:table-position', JSON.stringify(next));
  };

  const moveAchievementWithKeyboard = (event: React.KeyboardEvent) => {
    if (!achievementPosition) return;
    let next = { ...achievementPosition };
    if (event.key === 'ArrowUp') {
      next = { x: achievementPosition.x - 1, y: achievementPosition.y - 1 };
    } else if (event.key === 'ArrowDown') {
      next = { x: achievementPosition.x + 1, y: achievementPosition.y + 1 };
    } else if (event.key === 'ArrowLeft') {
      next = { x: achievementPosition.x - 1, y: achievementPosition.y + 1 };
    } else if (event.key === 'ArrowRight') {
      next = { x: achievementPosition.x + 1, y: achievementPosition.y - 1 };
    } else if (event.key === 'Escape' || event.key === 'Delete') {
      resetAchievement();
      return;
    } else return;

    event.preventDefault();
    next.x = clamp(next.x, room.trophyGridMin + 1, room.trophyGridMax - 1);
    next.y = clamp(next.y, room.trophyGridMin + 1, room.trophyGridMax - 1);
    if (collidesForAchievement(next)) return;
    setAchievementPosition(next);
    window.localStorage.setItem('casa-digital-segura:house:achievement-position', JSON.stringify(next));
  };

  const moveTrophyWithKeyboard = (event: React.KeyboardEvent, id: TrophyId) => {
    const trophyPlacement = trophyPlacements[id];
    if (!trophyPlacement) return;
    if (event.key === 'Escape' || event.key === 'Delete') {
      resetTrophy(id);
      return;
    }

    let next: TrophyPlacement;
    if (trophyPlacement.surface === 'table') {
      let { u, v } = trophyPlacement;
      if (event.key === 'ArrowUp') { u -= 0.06; v -= 0.06; }
      else if (event.key === 'ArrowDown') { u += 0.06; v += 0.06; }
      else if (event.key === 'ArrowLeft') { u -= 0.06; v += 0.06; }
      else if (event.key === 'ArrowRight') { u += 0.06; v -= 0.06; }
      else return;
      next = {
        surface: 'table',
        u: clamp(u, TABLETOP_U_MIN, TABLETOP_U_MAX),
        v: clamp(v, TABLETOP_V_MIN, TABLETOP_V_MAX),
      };
    } else if (trophyPlacement.surface === 'shelf') {
      let { u, v } = trophyPlacement;
      if (event.key === 'ArrowUp') v -= 0.06;
      else if (event.key === 'ArrowDown') v += 0.06;
      else if (event.key === 'ArrowLeft') {
        u += shelfPlacement?.wall === 'right' ? 0.06 : -0.06;
      } else if (event.key === 'ArrowRight') {
        u += shelfPlacement?.wall === 'right' ? -0.06 : 0.06;
      } else return;
      next = {
        surface: 'shelf',
        u: clamp(u, SHELF_SURFACE_INSET, 1 - SHELF_SURFACE_INSET),
        v: clamp(v, SHELF_SURFACE_INSET, 1 - SHELF_SURFACE_INSET),
      };
    } else if (trophyPlacement.surface === 'furniture') {
      let { u, v } = trophyPlacement;
      if (event.key === 'ArrowUp') { u -= 0.06; v -= 0.06; }
      else if (event.key === 'ArrowDown') { u += 0.06; v += 0.06; }
      else if (event.key === 'ArrowLeft') { u -= 0.06; v += 0.06; }
      else if (event.key === 'ArrowRight') { u += 0.06; v -= 0.06; }
      else return;
      next = {
        surface: 'furniture',
        furnitureId: trophyPlacement.furnitureId,
        u: clamp(u, FURNITURE_SURFACE_U_MIN, FURNITURE_SURFACE_U_MAX),
        v: clamp(v, FURNITURE_SURFACE_V_MIN, FURNITURE_SURFACE_V_MAX),
      };
    } else {
      let floorPosition = { ...trophyPlacement.position };
      if (event.key === 'ArrowUp') floorPosition = { x: floorPosition.x - 1, y: floorPosition.y - 1 };
      else if (event.key === 'ArrowDown') floorPosition = { x: floorPosition.x + 1, y: floorPosition.y + 1 };
      else if (event.key === 'ArrowLeft') floorPosition = { x: floorPosition.x - 1, y: floorPosition.y + 1 };
      else if (event.key === 'ArrowRight') floorPosition = { x: floorPosition.x + 1, y: floorPosition.y - 1 };
      else return;
      next = {
        surface: 'floor',
        position: {
          x: clamp(floorPosition.x, room.trophyGridMin, room.trophyGridMax),
          y: clamp(floorPosition.y, room.trophyGridMin, room.trophyGridMax),
        },
      };
    }

    event.preventDefault();
    if (collidesForTrophy(id, next)) return;
    setTrophyPlacementFor(id, next);
  };

  const moveShelfWithKeyboard = (event: React.KeyboardEvent) => {
    if (!shelfPlacement) return;
    if (event.key === 'Escape' || event.key === 'Delete') {
      resetShelf();
      return;
    }

    let { u, v } = shelfPlacement;
    if (event.key === 'ArrowUp') v -= 0.06;
    else if (event.key === 'ArrowDown') v += 0.06;
    else if (event.key === 'ArrowLeft') u += shelfPlacement.wall === 'right' ? 0.06 : -0.06;
    else if (event.key === 'ArrowRight') u += shelfPlacement.wall === 'right' ? -0.06 : 0.06;
    else return;

    event.preventDefault();
    const next: ShelfPlacement = {
      wall: shelfPlacement.wall,
      u: clamp(u, WALL_U_MIN, WALL_U_MAX),
      v: clamp(v, WALL_V_MIN, WALL_V_MAX),
    };
    if (collidesForShelf(next)) return;
    setShelfPlacement(next);
    window.localStorage.setItem('casa-digital-segura:house:shelf-placement', JSON.stringify(next));
  };

  const moveShieldWithKeyboard = (event: React.KeyboardEvent) => {
    if (!shieldPlacement) return;
    if (event.key === 'Escape' || event.key === 'Delete') {
      resetShield();
      return;
    }

    let { u, v } = shieldPlacement;
    if (event.key === 'ArrowUp') v -= 0.06;
    else if (event.key === 'ArrowDown') v += 0.06;
    else if (event.key === 'ArrowLeft') u += shieldPlacement.wall === 'right' ? 0.06 : -0.06;
    else if (event.key === 'ArrowRight') u += shieldPlacement.wall === 'right' ? -0.06 : 0.06;
    else return;

    event.preventDefault();
    const next: ShieldPlacement = {
      wall: shieldPlacement.wall,
      u: clamp(u, WALL_U_MIN, WALL_U_MAX),
      v: clamp(v, WALL_V_MIN, WALL_V_MAX),
    };
    if (collidesForShield(next)) return;
    setShieldPlacement(next);
    window.localStorage.setItem('casa-digital-segura:house:mfa-shield-placement', JSON.stringify(next));
  };

  const moveJapaneseFurnitureWithKeyboard = (
    event: React.KeyboardEvent,
    id: JapaneseFurnitureId,
  ) => {
    const placement = japaneseFurniturePlacements[id];
    if (!placement) return;
    if (event.key === 'Escape' || event.key === 'Delete') {
      resetJapaneseFurniture(id);
      return;
    }

    let next = { ...placement };
    if (event.key === 'ArrowUp') next = { x: placement.x - 1, y: placement.y - 1 };
    else if (event.key === 'ArrowDown') next = { x: placement.x + 1, y: placement.y + 1 };
    else if (event.key === 'ArrowLeft') next = { x: placement.x - 1, y: placement.y + 1 };
    else if (event.key === 'ArrowRight') next = { x: placement.x + 1, y: placement.y - 1 };
    else return;

    event.preventDefault();
    next = clampJapaneseFurniturePosition(next, room, id);
    if (collidesForJapaneseFurniture(id, next)) return;
    setJapaneseFurniturePlacements((current) => {
      const updated = { ...current, [id]: next };
      window.localStorage.setItem('casa-digital-segura:house:japanese-furniture', JSON.stringify(updated));
      return updated;
    });
  };

  const tableDisplayPosition = tableDragging ? tablePreview : position;
  const tableScreenPosition = useMemo(
    () => tableDisplayPosition ? gridToScreen(tableDisplayPosition, room) : null,
    [tableDisplayPosition, room],
  );
  const achievementDisplayPosition = achievementDragging
    ? achievementPreview
    : achievementPosition;
  const achievementScreenPosition = useMemo(
    () => achievementDisplayPosition ? gridToScreen(achievementDisplayPosition, room) : null,
    [achievementDisplayPosition, room],
  );
  const displayedTrophyPlacements: TrophyPlacements = { ...trophyPlacements };
  if (draggingTrophyId) displayedTrophyPlacements[draggingTrophyId] = trophyPreview;
  const shelfDisplayPlacement = shelfDragging ? shelfPreview : shelfPlacement;
  const shelfScreenPosition = useMemo(
    () => shelfDisplayPlacement ? wallToScreen(shelfDisplayPlacement, room) : null,
    [room, shelfDisplayPlacement],
  );
  const shieldDisplayPlacement = shieldDragging ? shieldPreview : shieldPlacement;
  const shieldScreenPosition = useMemo(
    () => shieldDisplayPlacement ? wallToScreen(shieldDisplayPlacement, room) : null,
    [room, shieldDisplayPlacement],
  );

  const beginRoomPan = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.button !== 0 || dragging || (event.target as Element).closest('button')) return;
    event.preventDefault();
    setAchievementTooltip(null);
    panOriginRef.current = {
      clientX: event.clientX,
      clientY: event.clientY,
      panX,
      panY,
    };
    setPanning(true);
  };

  const changeZoom = useCallback((direction: 1 | -1) => {
    setZoom((currentZoom) => {
      const nextZoom = clamp(
        Math.round((currentZoom + direction * ZOOM_STEP) * 100) / 100,
        MIN_ZOOM,
        MAX_ZOOM,
      );
      const nextPan = clampRoomPan(panX, panY, nextZoom);
      setPanX(nextPan.x);
      setPanY(nextPan.y);
      return nextZoom;
    });
  }, [clampRoomPan, panX, panY]);

  const zoomWithWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    if (dragging || Math.abs(event.deltaY) < 2) return;
    event.preventDefault();
    changeZoom(event.deltaY < 0 ? 1 : -1);
  };

  const recenterCamera = () => {
    setPanX(0);
    setPanY(0);
    setZoom(0.88);
  };

  const selectRoomStyle = (nextStyle: RoomStyleKey) => {
    const nextRoom = ROOMS[ROOM_STYLES[nextStyle].roomKey];
    if (position) {
      const nextPosition = {
        x: clamp(position.x, nextRoom.tableGridMin, nextRoom.tableGridMax),
        y: clamp(position.y, nextRoom.tableGridMin, nextRoom.tableGridMax),
      };
      setPosition(nextPosition);
      window.localStorage.setItem('casa-digital-segura:house:table-position', JSON.stringify(nextPosition));
    }
    if (achievementPosition) {
      const nextPosition = {
        x: clamp(
          achievementPosition.x,
          nextRoom.trophyGridMin + 1,
          nextRoom.trophyGridMax - 1,
        ),
        y: clamp(
          achievementPosition.y,
          nextRoom.trophyGridMin + 1,
          nextRoom.trophyGridMax - 1,
        ),
      };
      setAchievementPosition(nextPosition);
      window.localStorage.setItem('casa-digital-segura:house:achievement-position', JSON.stringify(nextPosition));
    }
    updateTrophyPlacements((current) => {
      const next = { ...current };
      for (const id of TROPHY_IDS) {
        const placement = current[id];
        if (placement?.surface !== 'floor') continue;
        next[id] = {
          surface: 'floor',
          position: {
            x: clamp(placement.position.x, nextRoom.trophyGridMin, nextRoom.trophyGridMax),
            y: clamp(placement.position.y, nextRoom.trophyGridMin, nextRoom.trophyGridMax),
          },
        };
      }
      return next;
    });
    setJapaneseFurniturePlacements((current) => {
      const next = { ...current };
      for (const id of JAPANESE_FURNITURE_IDS) {
        const placement = current[id];
        if (!placement) continue;
        next[id] = clampJapaneseFurniturePosition(placement, nextRoom, id);
      }
      window.localStorage.setItem('casa-digital-segura:house:japanese-furniture', JSON.stringify(next));
      return next;
    });
    setRoomStyleKey(nextStyle);
    setStylePickerOpen(false);
    setColorPickerOpen(false);
    window.localStorage.setItem('casa-digital-segura:house:visual-style', nextStyle);
    window.localStorage.setItem('casa-digital-segura:house:selected-room', ROOM_STYLES[nextStyle].roomKey);
  };

  const selectRoomColor = (nextColor: RoomColorKey) => {
    setRoomColorKey(nextColor);
    setColorPickerOpen(false);
    window.localStorage.setItem('casa-digital-segura:house:color-style', nextColor);
  };

  const displayedAchievementSummary = achievementTooltip
    ? ACHIEVEMENT_SUMMARIES[achievementTooltip.id]
    : null;

  return (
    <main className={`app-shell house-engine house-mode-${mode}`}>
      <section
        className={`experience ${inventoryOpen ? 'inventory-open' : 'inventory-closed'} ${
          returningItem ? 'is-returning-item' : ''
        } ${returnTargetVisible ? 'return-target-visible' : ''}`}
        aria-label="Cômodo interativo"
      >
        <div
          ref={viewportRef}
          className={`room-viewport ${panning ? 'panning' : ''}`}
          onPointerDown={beginRoomPan}
          onWheel={zoomWithWheel}
        >
          <div
            ref={stageRef}
            className={`room-stage ${dragging ? 'is-dragging' : ''}`}
            style={{
              aspectRatio: `${room.width} / ${room.height}`,
              transform: `translate(${panX}px, ${panY}px) scale(${zoom})`,
            }}
          >
          <img
            className="room-image"
            src={room.src}
            alt={room.alt}
            draggable={false}
          />

          {(['left', 'right'] as WallSide[]).map((side) => (
            <div
              key={`color-${side}`}
              className={`room-style-layer wall ${side}`}
              aria-hidden="true"
              style={{
                clipPath: wallInteriorClip(side, room),
                background: roomColor.wallColor,
                mixBlendMode: roomColor.wallBlend,
              }}
            />
          ))}

          <div
            className="room-style-layer floor"
            aria-hidden="true"
            style={{
              clipPath: room.floorClip,
              background: roomColor.floorColor,
              mixBlendMode: roomColor.floorBlend,
            }}
          />

          {(['left', 'right'] as WallSide[]).map((side) => (
            <div
              key={side}
               className={`wall-feedback ${side} ${shelfDragging || shieldDragging ? 'visible' : ''} ${
                 valid && (shelfPreview?.wall === side || shieldPreview?.wall === side) ? 'active' : ''
               } ${(shelfDragging || shieldDragging) && !valid ? 'invalid' : ''}`}
              aria-hidden="true"
              style={{ clipPath: wallClipPath(side, room) }}
            />
          ))}

          <div
            className={`floor-feedback ${
              tableDragging || achievementDragging ||
              (trophyDragging && trophyPreview?.surface === 'floor') ? 'visible' : ''
            } ${
              valid ? 'accepts' : 'rejects'
            }`}
            aria-hidden="true"
            style={{ clipPath: room.floorClip }}
          />

          {shieldScreenPosition && shieldDisplayPlacement && (
            <div
              ref={shieldObjectRef}
              className={`shield-object ${shieldDisplayPlacement.wall} ${
                shieldDragging ? 'dragging' : ''
              } ${shieldDragging && !valid ? 'invalid' : ''}`}
              style={{ left: `${shieldScreenPosition.left}%`, top: `${shieldScreenPosition.top}%` }}
            >
              <button
                className="shield-sprite"
                type="button"
                {...achievementTooltipProps('shield')}
                aria-label="Escudo MFA. Arraste para mover entre as paredes; use as setas para ajustar; Delete para devolver à caixa."
                onPointerDown={canEdit ? (event) => beginShieldDrag(event) : undefined}
                onKeyDown={canEdit ? moveShieldWithKeyboard : undefined}
              >
                <img
                  src={shieldDisplayPlacement.wall === 'left' ? leftShieldSpriteUrl : shieldSpriteUrl}
                  alt=""
                  draggable={false}
                />
              </button>
            </div>
          )}

          {shelfScreenPosition && shelfDisplayPlacement && (
            <div
              ref={shelfObjectRef}
              className={`shelf-object ${shelfDisplayPlacement.wall} ${
                shelfDragging ? 'dragging' : ''
              } ${shelfDragging && !valid ? 'invalid' : ''}`}
              style={{ left: `${shelfScreenPosition.left}%`, top: `${shelfScreenPosition.top}%` }}
            >
              <button
                className="shelf-sprite"
                type="button"
                tabIndex={canEdit ? 0 : -1}
                aria-label="Prateleira suspensa. Arraste para mover entre as paredes; use as setas para ajustar; Delete para devolver à caixa."
                onPointerDown={canEdit ? (event) => beginShelfDrag(event) : undefined}
                onKeyDown={canEdit ? moveShelfWithKeyboard : undefined}
              >
                <img src={shelfSpriteUrl} alt="" draggable={false} />
              </button>

              <div
                className={`shelf-surface-feedback ${trophyDragging ? 'visible' : ''} ${
                  valid && trophyPreview?.surface === 'shelf' ? 'active' : ''
                }`}
                aria-hidden="true"
              />

              {TROPHIES.map((trophy) => {
                const placement = displayedTrophyPlacements[trophy.id];
                if (placement?.surface !== 'shelf') return null;
                const trophyPosition = shelfSurfaceToSpritePosition(
                  placement,
                  shelfDisplayPlacement.wall,
                );
                const itemDragging = draggingTrophyId === trophy.id;
                return (
                  <button
                    key={trophy.id}
                    ref={(node) => { trophyObjectRefs.current[trophy.id] = node; }}
                    className={`trophy-sprite on-shelf ${itemDragging ? 'dragging' : ''} ${
                      itemDragging && !valid ? 'invalid' : ''
                    }`}
                    type="button"
                    {...achievementTooltipProps(trophy.id)}
                    aria-label={`${trophy.label}. Arraste para o piso, mesa ou outro ponto da prateleira; use as setas para ajustar; Delete para devolver à caixa.`}
                    onPointerDown={canEdit ? (event) => beginTrophyDrag(event, trophy.id) : undefined}
                    onKeyDown={canEdit ? (event) => moveTrophyWithKeyboard(event, trophy.id) : undefined}
                    style={{
                      left: `${trophyPosition.left}%`,
                      top: `${trophyPosition.top}%`,
                      width: `${28 * trophy.widthScale}%`,
                    }}
                  >
                    <img src={trophySpriteUrls[trophy.id]} alt="" draggable={false} />
                  </button>
                );
              })}
            </div>
          )}

          {tableScreenPosition && (
            <div
              ref={tableObjectRef}
              className={`table-object ${tableDragging ? 'dragging' : ''} ${
                tableDragging && !valid ? 'invalid' : ''
              }`}
              style={{
                left: `${tableScreenPosition.left}%`,
                top: `${tableScreenPosition.top}%`,
                zIndex: 100 + Math.round(tableScreenPosition.top * 10),
              }}
            >
              <button
                className="table-sprite"
                type="button"
                tabIndex={canEdit ? 0 : -1}
                aria-label="Mesa quadrada. Arraste para mover; use as setas para ajustar; Delete para devolver à caixa."
                onPointerDown={canEdit ? (event) => beginTableDrag(event) : undefined}
                onKeyDown={canEdit ? moveTableWithKeyboard : undefined}
              >
                <img src={tableSpriteUrl} alt="" draggable={false} />
              </button>

              <div
                className={`tabletop-feedback ${trophyDragging ? 'visible' : ''} ${
                  valid && trophyPreview?.surface === 'table' ? 'active' : ''
                }`}
                aria-hidden="true"
              />

              {TROPHIES.map((trophy) => {
                const placement = displayedTrophyPlacements[trophy.id];
                if (placement?.surface !== 'table') return null;
                const trophyPosition = tabletopToSpritePosition(placement);
                const itemDragging = draggingTrophyId === trophy.id;
                return (
                  <button
                    key={trophy.id}
                    ref={(node) => { trophyObjectRefs.current[trophy.id] = node; }}
                    className={`trophy-sprite on-table ${itemDragging ? 'dragging' : ''} ${
                      itemDragging && !valid ? 'invalid' : ''
                    }`}
                    type="button"
                    {...achievementTooltipProps(trophy.id)}
                    aria-label={`${trophy.label}. Arraste para o piso, prateleira ou outro ponto do tampo; use as setas para ajustar; Delete para devolver à caixa.`}
                    onPointerDown={canEdit ? (event) => beginTrophyDrag(event, trophy.id) : undefined}
                    onKeyDown={canEdit ? (event) => moveTrophyWithKeyboard(event, trophy.id) : undefined}
                    style={{
                      left: `${trophyPosition.left}%`,
                      top: `${trophyPosition.top}%`,
                      width: `${24 * trophy.widthScale}%`,
                    }}
                  >
                    <img src={trophySpriteUrls[trophy.id]} alt="" draggable={false} />
                  </button>
                );
              })}
            </div>
          )}

          {TROPHIES.map((trophy) => {
            const placement = displayedTrophyPlacements[trophy.id];
            if (placement?.surface !== 'floor') return null;
            const trophyPosition = gridToScreen(placement.position, room);
            const itemDragging = draggingTrophyId === trophy.id;
            return (
              <button
                key={trophy.id}
                ref={(node) => { trophyObjectRefs.current[trophy.id] = node; }}
                className={`trophy-sprite on-floor ${itemDragging ? 'dragging' : ''} ${
                  itemDragging && !valid ? 'invalid' : ''
                }`}
                type="button"
                {...achievementTooltipProps(trophy.id)}
                aria-label={`${trophy.label}. Arraste para o piso, sobre a mesa ou sobre a prateleira; use as setas para ajustar; Delete para devolver à caixa.`}
                onPointerDown={canEdit ? (event) => beginTrophyDrag(event, trophy.id) : undefined}
                onKeyDown={canEdit ? (event) => moveTrophyWithKeyboard(event, trophy.id) : undefined}
                style={{
                  left: `${trophyPosition.left}%`,
                  top: `${trophyPosition.top}%`,
                  width: `${6.4 * trophy.widthScale}%`,
                  zIndex: 100 + Math.round(trophyPosition.top * 10),
                }}
              >
                <img src={trophySpriteUrls[trophy.id]} alt="" draggable={false} />
              </button>
            );
          })}

          {achievementScreenPosition && (
            <div
              className={`achievement-object ${achievementDragging ? 'dragging' : ''} ${
                achievementDragging && !valid ? 'invalid' : ''
              }`}
              style={{
                left: `${achievementScreenPosition.left}%`,
                top: `${achievementScreenPosition.top}%`,
                zIndex: 100 + Math.round(achievementScreenPosition.top * 10),
              }}
            >
              <button
                className="achievement-sprite"
                type="button"
                {...achievementTooltipProps('achievement')}
                aria-label="Lápide de achievements. Arraste para mover somente pelo chão; use as setas para ajustar; Delete para devolver à caixa."
                onPointerDown={canEdit ? (event) => beginAchievementDrag(event) : undefined}
                onKeyDown={canEdit ? moveAchievementWithKeyboard : undefined}
              >
                <AnimatedAchievementSprite />
              </button>
            </div>
          )}

          {JAPANESE_FURNITURE.map((definition) => {
            const itemDragging = draggingItem === definition.id;
            const displayPosition = itemDragging
              ? japaneseFurniturePreviews[definition.id]
              : japaneseFurniturePlacements[definition.id];
            if (!displayPosition) return null;
            const screenPosition = gridToScreen(displayPosition, room);
            return (
              <div
                key={definition.id}
                ref={(node) => { japaneseFurnitureObjectRefs.current[definition.id] = node; }}
                className={`japanese-furniture-object ${itemDragging ? 'dragging' : ''} ${
                  itemDragging && !valid ? 'invalid' : ''
                }`}
                style={{
                  left: `${screenPosition.left}%`,
                  top: `${screenPosition.top}%`,
                  width: `${definition.widthPercent * 100}%`,
                  zIndex: 100 + Math.round(screenPosition.top * 10),
                }}
              >
                <button
                  className="japanese-furniture-sprite"
                  type="button"
                  tabIndex={canEdit ? 0 : -1}
                  aria-label={`${definition.label}. Arraste para mover; use as setas para ajustar; Delete para devolver à caixa.`}
                  onPointerDown={canEdit ? (event) => beginJapaneseFurnitureDrag(event, definition.id) : undefined}
                  onKeyDown={canEdit ? (event) => moveJapaneseFurnitureWithKeyboard(event, definition.id) : undefined}
                  style={{ clipPath: definition.interactionClipPath }}
                >
                  <img src={definition.src} alt="" draggable={false} />
                </button>

                {definition.surface && (
                  <div
                    className={`japanese-furniture-surface-feedback ${
                      trophyDragging ? 'visible' : ''
                    } ${
                      valid && trophyPreview?.surface === 'furniture' &&
                      trophyPreview.furnitureId === definition.id ? 'active' : ''
                    } ${
                      !valid && trophyPreview?.surface === 'furniture' &&
                      trophyPreview.furnitureId === definition.id ? 'invalid' : ''
                    }`}
                    style={{ clipPath: japaneseFurnitureSurfaceClipPath(definition) }}
                    aria-hidden="true"
                  />
                )}

                {definition.surface && TROPHIES.map((trophy) => {
                  const placement = displayedTrophyPlacements[trophy.id];
                  if (placement?.surface !== 'furniture' ||
                    placement.furnitureId !== definition.id) return null;
                  const trophyPosition = japaneseFurnitureSurfaceToSpritePosition(placement);
                  const itemDragging = draggingTrophyId === trophy.id;
                  return (
                    <button
                      key={trophy.id}
                      ref={(node) => { trophyObjectRefs.current[trophy.id] = node; }}
                      className={`trophy-sprite on-japanese-furniture ${
                        itemDragging ? 'dragging' : ''
                      } ${itemDragging && !valid ? 'invalid' : ''}`}
                      type="button"
                      {...achievementTooltipProps(trophy.id)}
                      aria-label={`${trophy.label} sobre ${definition.label.toLowerCase()}. Arraste para o piso ou para outra superfície; use as setas para ajustar; Delete para devolver à caixa.`}
                      onPointerDown={canEdit ? (event) => beginTrophyDrag(event, trophy.id) : undefined}
                      onKeyDown={canEdit ? (event) => moveTrophyWithKeyboard(event, trophy.id) : undefined}
                      style={{
                        left: `${trophyPosition.left}%`,
                        top: `${trophyPosition.top}%`,
                        width: `${definition.surface.trophyWidth * 100 * trophy.widthScale}%`,
                      }}
                    >
                      <img src={trophySpriteUrls[trophy.id]} alt="" draggable={false} />
                    </button>
                  );
                })}
              </div>
            );
          })}

          </div>
        </div>

        <div className="house-edit-tools" aria-label="Ferramentas de edição do cômodo">
        <div className={`room-style-control ${stylePickerOpen ? 'open' : ''}`}>
          <button
            className="room-style-toggle"
            type="button"
            aria-label="Mudar estilo completo do cômodo"
            aria-controls="room-style-options"
            aria-expanded={stylePickerOpen}
            disabled={dragging}
            onClick={() => {
              setColorPickerOpen(false);
              setStylePickerOpen((current) => !current);
            }}
          >
            <PortalIcon className="house-tool-icon" name="home" size={21} />
            <span className="house-tool-label">Cômodo</span>
          </button>

          <div
            id="room-style-options"
            className="room-style-options"
            aria-hidden={!stylePickerOpen}
          >
            {(Object.keys(ROOM_STYLES) as RoomStyleKey[]).map((styleKey) => {
              const option = ROOM_STYLES[styleKey];
              return (
                <button
                  key={styleKey}
                  className="room-style-option"
                  type="button"
                  aria-label={option.label}
                  aria-pressed={roomStyleKey === styleKey}
                  title={option.label}
                  onClick={() => selectRoomStyle(styleKey)}
                  style={{
                    background: `linear-gradient(145deg, ${option.swatchWall} 0 52%, ${
                      option.swatchFloor
                    } 52% 100%)`,
                  }}
                />
              );
            })}
          </div>
        </div>

        <div className={`room-color-control ${colorPickerOpen ? 'open' : ''}`}>
          <button
            className="room-color-toggle"
            type="button"
            aria-label="Mudar cores do cômodo"
            aria-controls="room-color-options"
            aria-expanded={colorPickerOpen}
            disabled={dragging}
            onClick={() => {
              setStylePickerOpen(false);
              setColorPickerOpen((current) => !current);
            }}
          >
            <PortalIcon className="house-tool-icon" name="palette" size={21} />
            <span className="house-tool-label">Cores</span>
          </button>

          <div
            id="room-color-options"
            className="room-color-options"
            aria-hidden={!colorPickerOpen}
          >
            {(Object.keys(ROOM_COLORS) as RoomColorKey[]).map((colorKey) => {
              const option = ROOM_COLORS[colorKey];
              return (
                <button
                  key={colorKey}
                  className="room-color-option"
                  type="button"
                  aria-label={option.label}
                  aria-pressed={roomColorKey === colorKey}
                  title={option.label}
                  onClick={() => selectRoomColor(colorKey)}
                  style={{
                    background: `linear-gradient(145deg, ${option.swatchWall} 0 52%, ${
                      option.swatchFloor
                    } 52% 100%)`,
                  }}
                />
              );
            })}
          </div>
        </div>
        </div>

        <div className="zoom-controls" aria-label="Controles de zoom">
          <button
            type="button"
            aria-label="Diminuir zoom"
            onClick={() => changeZoom(-1)}
            disabled={zoom <= MIN_ZOOM}
          >
            <PortalIcon name="zoom-out" size={18} />
          </button>
          <span className="zoom-value" aria-live="polite">{Math.round(zoom * 100)}%</span>
          <button
            type="button"
            aria-label="Aumentar zoom"
            onClick={() => changeZoom(1)}
            disabled={zoom >= MAX_ZOOM}
          >
            <PortalIcon name="zoom-in" size={18} />
          </button>
          <button
            type="button"
            aria-label="Centralizar cômodo"
            onClick={recenterCamera}
            disabled={panX === 0 && panY === 0 && zoom === 0.88}
          >
            <PortalIcon name="focus" size={18} />
          </button>
        </div>

        <aside
          ref={inventoryRef}
          id="inventory-drawer"
          className="inventory"
          aria-label="Objetos disponíveis"
          aria-hidden={!inventoryOpen}
        >
          <div className="inventory-header">
            <div>
              <span>Organize seu espaço</span>
              <strong>Caixa da casa</strong>
              <p>Arraste um objeto para o cômodo ou devolva-o para esta caixa.</p>
            </div>
            <div className="inventory-filters" role="tablist" aria-label="Categorias da caixa">
              <button
                type="button"
                role="tab"
                aria-selected={inventoryFilter === 'furniture'}
                onClick={() => setInventoryFilter('furniture')}
              >
                Móveis
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={inventoryFilter === 'achievement'}
                onClick={() => setInventoryFilter('achievement')}
              >
                Conquistas
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={inventoryFilter === 'wall'}
                onClick={() => setInventoryFilter('wall')}
              >
                Parede
              </button>
            </div>
          </div>
          <div className="inventory-list">
            {showFurniture && <>
            {!position && !tableDragging ? (
              <button
                className="inventory-item"
                type="button"
                onPointerDown={(event) => beginTableDrag(event, true)}
                onKeyDown={(event) => {
                  if (event.key !== 'Enter' && event.key !== ' ') return;
                  event.preventDefault();
                  placeTableFromKeyboard();
                }}
                aria-label="Arrastar mesa quadrada para o cômodo"
              >
                <span className="inventory-preview">
                  <img src={tableSpriteUrl} alt="" draggable={false} />
                </span>
                <span>
                  <strong>Mesa quadrada</strong>
                </span>
              </button>
            ) : (
              <div className="placed-slot">
                <span aria-hidden="true"><PortalIcon name="check" size={13} /></span>
                Mesa no cômodo
              </div>
            )}
            </>}

            {showAchievements && <>
            {TROPHIES.map((trophy) => {
              const placement = trophyPlacements[trophy.id];
              const itemDragging = draggingTrophyId === trophy.id;
              return !placement && !itemDragging ? (
                <button
                  key={trophy.id}
                  className="inventory-item"
                  type="button"
                  {...achievementTooltipProps(trophy.id)}
                  onPointerDown={(event) => beginTrophyDrag(event, trophy.id, true)}
                  onKeyDown={(event) => {
                    if (event.key !== 'Enter' && event.key !== ' ') return;
                    event.preventDefault();
                    placeTrophyFromKeyboard(trophy.id);
                  }}
                  aria-label={`Arrastar ${trophy.label.toLowerCase()} para o cômodo`}
                >
                  <span className="inventory-preview trophy-preview">
                    <img src={trophySpriteUrls[trophy.id]} alt="" draggable={false} />
                  </span>
                  <span>
                    <strong>{trophy.label}</strong>
                  </span>
                </button>
              ) : (
                <div className="placed-slot" key={trophy.id}>
                  <span aria-hidden="true"><PortalIcon name="check" size={13} /></span>
                  {trophy.label} {placement?.surface === 'table'
                    ? 'sobre a mesa'
                    : placement?.surface === 'shelf'
                      ? 'sobre a prateleira'
                      : placement?.surface === 'furniture'
                        ? `sobre ${japaneseFurnitureDefinition(placement.furnitureId).label.toLowerCase()}`
                        : 'no cômodo'}
                </div>
              );
            })}

            {!achievementPosition && !achievementDragging ? (
              <button
                className="inventory-item"
                type="button"
                {...achievementTooltipProps('achievement')}
                onPointerDown={(event) => beginAchievementDrag(event, true)}
                onKeyDown={(event) => {
                  if (event.key !== 'Enter' && event.key !== ' ') return;
                  event.preventDefault();
                  placeAchievementFromKeyboard();
                }}
                aria-label="Arrastar lápide de achievements para o chão"
              >
                <span className="inventory-preview achievement-preview">
                  <AnimatedAchievementSprite />
                </span>
                <span>
                  <strong>Lápide de achievements</strong>
                </span>
              </button>
            ) : (
              <div className="placed-slot">
                <span aria-hidden="true"><PortalIcon name="check" size={13} /></span>
                Lápide no cômodo
              </div>
            )}
            </>}

            {showWallItems && <>
            {!shelfPlacement && !shelfDragging ? (
              <button
                className="inventory-item"
                type="button"
                onPointerDown={(event) => beginShelfDrag(event, true)}
                onKeyDown={(event) => {
                  if (event.key !== 'Enter' && event.key !== ' ') return;
                  event.preventDefault();
                  placeShelfFromKeyboard();
                }}
                aria-label="Arrastar prateleira suspensa para uma parede"
              >
                <span className="inventory-preview shelf-preview">
                  <img src={shelfSpriteUrl} alt="" draggable={false} />
                </span>
                <span>
                  <strong>Prateleira suspensa</strong>
                </span>
              </button>
            ) : (
              <div className="placed-slot">
                <span aria-hidden="true"><PortalIcon name="check" size={13} /></span>
                Prateleira na parede {shelfPlacement?.wall === 'right' ? 'direita' : 'esquerda'}
              </div>
            )}

            {!shieldPlacement && !shieldDragging ? (
              <button
                className="inventory-item"
                type="button"
                {...achievementTooltipProps('shield')}
                onPointerDown={(event) => beginShieldDrag(event, true)}
                onKeyDown={(event) => {
                  if (event.key !== 'Enter' && event.key !== ' ') return;
                  event.preventDefault();
                  placeShieldFromKeyboard();
                }}
                aria-label="Arrastar escudo MFA para uma parede"
              >
                <span className="inventory-preview shield-preview">
                  <img src={shieldSpriteUrl} alt="" draggable={false} />
                </span>
                <span>
                  <strong>Escudo MFA</strong>
                </span>
              </button>
            ) : (
              <div className="placed-slot">
                <span aria-hidden="true"><PortalIcon name="check" size={13} /></span>
                Escudo na parede {shieldPlacement?.wall === 'right' ? 'direita' : 'esquerda'}
              </div>
            )}
            </>}

            {showFurniture && <>
            {JAPANESE_FURNITURE.map((definition) => {
              const itemDragging = draggingItem === definition.id;
              const placement = japaneseFurniturePlacements[definition.id];
              return !placement && !itemDragging ? (
                <button
                  key={definition.id}
                  className="inventory-item"
                  type="button"
                  onPointerDown={(event) =>
                    beginJapaneseFurnitureDrag(event, definition.id, true)}
                  onKeyDown={(event) => {
                    if (event.key !== 'Enter' && event.key !== ' ') return;
                    event.preventDefault();
                    placeJapaneseFurnitureFromKeyboard(definition.id);
                  }}
                  aria-label={`Arrastar ${definition.label.toLowerCase()} para o cômodo`}
                >
                  <span className="inventory-preview japanese-furniture-preview">
                    <img src={definition.src} alt="" draggable={false} />
                  </span>
                  <span>
                    <strong>{definition.label}</strong>
                  </span>
                </button>
              ) : (
                <div className="placed-slot" key={definition.id}>
                  <span aria-hidden="true"><PortalIcon name="check" size={13} /></span>
                  {definition.label} no cômodo
                </div>
              );
            })}
            </>}
            {currentInventoryIsEmpty && (
              <div className="inventory-empty">
                <span aria-hidden="true"><PortalIcon name="check" size={14} /></span>
                <strong>Esta parte da caixa está vazia</strong>
                <p>Todos esses objetos já estão no cômodo.</p>
              </div>
            )}
          </div>
        </aside>

        {returningItem && (
          <div
            ref={returnDropzoneRef}
            className={`return-dropzone ${returnTargetActive ? 'return-target-active' : ''}`}
            aria-hidden={!returnTargetVisible}
            aria-label="Devolver objeto à caixa"
          >
            <PortalIcon name="undo" size={19} />
            <span>Devolver à caixa</span>
          </div>
        )}

        {achievementTooltip && displayedAchievementSummary && (
          <div
            id="achievement-tooltip"
            className={`achievement-tooltip ${achievementTooltip.placement}`}
            role="tooltip"
            style={{ left: achievementTooltip.left, top: achievementTooltip.top }}
          >
            <span className="achievement-tooltip-label">Conquista</span>
            <strong>{displayedAchievementSummary.name}</strong>
            <p>
              <span>Como desbloquear</span>
              {displayedAchievementSummary.description}
            </p>
          </div>
        )}

        <button
          className="inventory-toggle"
          type="button"
          aria-label={inventoryOpen ? 'Recolher objetos' : 'Mostrar objetos'}
          aria-controls="inventory-drawer"
          aria-expanded={inventoryOpen}
          disabled={dragging}
          onClick={() => {
            setAchievementTooltip(null);
            setInventoryOpen((current) => !current);
          }}
        >
          <span className="inventory-toggle-icon" aria-hidden="true">
            <PortalIcon name="box" size={20} />
          </span>
          <span className="inventory-toggle-label">Caixa da casa</span>
          <span className="inventory-toggle-arrow" aria-hidden="true">
            <PortalIcon name={inventoryOpen ? 'chevron-down' : 'chevron-up'} size={17} />
          </span>
        </button>
      </section>
    </main>
  );
}
