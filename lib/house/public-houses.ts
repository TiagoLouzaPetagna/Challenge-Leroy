import { getD1Binding } from "@/db";
import type { AuthenticatedAccount } from "@/lib/auth/types";

export type PublicHouse = {
  profileId: string;
  nickname: string;
  sectorId: string;
  sectorName: string;
  avatarUrl: string | null;
  thumbnailUrl: string | null;
  theme: "crafted" | "cyberpunk" | "industrial";
  updatedAt: string;
};

type HouseRow = PublicHouse & { accountId: string; sceneJson: string };
let storageReady: Promise<void> | null = null;

async function ensureStorage() {
  storageReady ??= getD1Binding().batch([
    getD1Binding().prepare(`CREATE TABLE IF NOT EXISTS public_houses (
      account_id TEXT PRIMARY KEY NOT NULL REFERENCES accounts(id) ON DELETE CASCADE,
      profile_id TEXT UNIQUE NOT NULL,
      nickname TEXT NOT NULL,
      sector_id TEXT NOT NULL,
      sector_name TEXT NOT NULL,
      avatar_url TEXT,
      thumbnail_url TEXT,
      theme TEXT NOT NULL,
      scene_json TEXT NOT NULL,
      updated_at TEXT NOT NULL
    )`),
    getD1Binding().prepare("CREATE INDEX IF NOT EXISTS idx_public_houses_sector ON public_houses(sector_id, updated_at)"),
  ]).then(() => undefined).catch((error) => { storageReady = null; throw error; });
  await storageReady;
}

function fromRow(row: Record<string, unknown>): HouseRow {
  return {
    accountId: String(row.account_id), profileId: String(row.profile_id),
    nickname: String(row.nickname), sectorId: String(row.sector_id),
    sectorName: String(row.sector_name), avatarUrl: row.avatar_url ? String(row.avatar_url) : null,
    thumbnailUrl: row.thumbnail_url ? String(row.thumbnail_url) : null,
    theme: row.theme === "cyberpunk" || row.theme === "industrial" ? row.theme : "crafted",
    sceneJson: String(row.scene_json), updatedAt: String(row.updated_at),
  };
}

function publicFields(row: HouseRow): PublicHouse {
  const { profileId, nickname, sectorId, sectorName, avatarUrl, thumbnailUrl, theme, updatedAt } = row;
  return { profileId, nickname, sectorId, sectorName, avatarUrl, thumbnailUrl, theme, updatedAt };
}

export async function listPublicHouses() {
  await ensureStorage();
  const result = await getD1Binding().prepare("SELECT * FROM public_houses ORDER BY updated_at DESC LIMIT 100").all();
  return (result.results ?? []).map((row) => publicFields(fromRow(row)));
}

export async function findPublicHouse(profileId: string) {
  await ensureStorage();
  const row = await getD1Binding().prepare("SELECT * FROM public_houses WHERE profile_id = ? LIMIT 1").bind(profileId).first();
  return row ? fromRow(row) : null;
}

export async function findOwnPublicHouse(accountId: string) {
  await ensureStorage();
  const row = await getD1Binding().prepare("SELECT * FROM public_houses WHERE account_id = ? LIMIT 1").bind(accountId).first();
  return row ? publicFields(fromRow(row)) : null;
}

function safeImage(value: unknown, maxLength: number) {
  return typeof value === "string" && value.length <= maxLength && /^data:image\/(png|webp);base64,[A-Za-z0-9+/=]+$/.test(value)
    ? value : null;
}

function validateScene(value: unknown): string {
  if (typeof value !== "string" || value.length > 300_000) throw new Error("A casa ficou grande demais para publicar.");
  let saved: Record<string, unknown>;
  try { saved = JSON.parse(value); } catch { throw new Error("Não foi possível ler a casa salva."); }
  if (saved.format !== "casa-atelie-3d" || ![4, 5].includes(Number(saved.version))) throw new Error("Formato da casa não reconhecido.");
  const scene = saved.scene as Record<string, unknown> | undefined;
  if (!scene || !Array.isArray(scene.cells) || !Array.isArray(scene.items) || !Array.isArray(scene.rooms)) throw new Error("A casa está incompleta.");
  if (scene.cells.length > 500 || scene.items.length > 300 || scene.rooms.length > 50) throw new Error("A casa excede o limite de publicação.");
  return value;
}

export async function publishHouse(account: AuthenticatedAccount, payload: Record<string, unknown>) {
  const sceneJson = validateScene(payload.sceneJson);
  const nickname = typeof payload.nickname === "string" ? payload.nickname.trim().slice(0, 28) : "";
  if (nickname.length < 2) throw new Error("Escolha um apelido com pelo menos 2 caracteres.");
  const theme = payload.theme === "cyberpunk" || payload.theme === "industrial" ? payload.theme : "crafted";
  const avatarUrl = safeImage(payload.avatarUrl, 150_000);
  const thumbnailUrl = safeImage(payload.thumbnailUrl, 180_000);
  await ensureStorage();
  const db = getD1Binding();
  const existing = await findOwnPublicHouse(account.id);
  const profileId = existing?.profileId ?? `casa-${crypto.randomUUID().slice(0, 12)}`;
  const now = new Date().toISOString();
  await db.prepare(`INSERT INTO public_houses (account_id, profile_id, nickname, sector_id, sector_name, avatar_url, thumbnail_url, theme, scene_json, updated_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT(account_id) DO UPDATE SET nickname=excluded.nickname, sector_id=excluded.sector_id,
      sector_name=excluded.sector_name, avatar_url=excluded.avatar_url, thumbnail_url=excluded.thumbnail_url,
      theme=excluded.theme, scene_json=excluded.scene_json, updated_at=excluded.updated_at`)
    .bind(account.id, profileId, nickname, account.sectorId, account.sectorName, avatarUrl, thumbnailUrl, theme, sceneJson, now).run();
  return { profileId, nickname, sectorId: account.sectorId, sectorName: account.sectorName, avatarUrl, thumbnailUrl, theme, updatedAt: now } satisfies PublicHouse;
}

export async function unpublishHouse(accountId: string) {
  await ensureStorage();
  await getD1Binding().prepare("DELETE FROM public_houses WHERE account_id = ?").bind(accountId).run();
}
