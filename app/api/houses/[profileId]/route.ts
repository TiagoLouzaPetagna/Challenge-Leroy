import { readSessionToken } from "@/lib/auth/http";
import { findAccountBySessionToken } from "@/lib/auth/repository";
import { findPublicHouse } from "@/lib/house/public-houses";

export async function GET(request: Request, context: { params: Promise<{ profileId: string }> }) {
  try {
    const account = await findAccountBySessionToken(readSessionToken(request));
    if (!account) return Response.json({ error: "Sessão necessária." }, { status: 401 });
    const { profileId } = await context.params;
    const house = await findPublicHouse(profileId);
    if (!house) return Response.json({ error: "Casa não encontrada." }, { status: 404 });
    return Response.json({ house: {
      profileId: house.profileId, nickname: house.nickname, sectorId: house.sectorId,
      sectorName: house.sectorName, avatarUrl: house.avatarUrl, thumbnailUrl: house.thumbnailUrl,
      theme: house.theme, updatedAt: house.updatedAt,
    }, sceneJson: house.sceneJson }, { headers: { "Cache-Control": "no-store" } });
  } catch {
    return Response.json({ error: "Não foi possível abrir a casa." }, { status: 503 });
  }
}
