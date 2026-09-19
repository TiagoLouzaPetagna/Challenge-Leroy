export const AVATAR_STORAGE_KEY = "casa-digital:avatar:v1";
export const AVATAR_UPDATED_EVENT = "casa-digital:avatar-updated";

export type SavedAvatar = {
  version: 1;
  config: Record<string, string>;
  imageDataUrl: string;
  updatedAt: string;
};

export function parseSavedAvatar(value: string | null): SavedAvatar | null {
  if (!value) return null;

  try {
    const parsed = JSON.parse(value) as Partial<SavedAvatar>;
    if (
      parsed.version !== 1 ||
      !parsed.config ||
      typeof parsed.config !== "object" ||
      typeof parsed.imageDataUrl !== "string" ||
      !parsed.imageDataUrl.startsWith("data:image/png;base64,") ||
      typeof parsed.updatedAt !== "string"
    ) {
      return null;
    }

    return parsed as SavedAvatar;
  } catch {
    return null;
  }
}
