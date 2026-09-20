import { readSessionToken } from "@/lib/auth/http";
import { findAccountBySessionToken } from "@/lib/auth/repository";
import { findOwnPublicHouse, listPublicHouses, publishHouse, unpublishHouse } from "@/lib/house/public-houses";

const headers = { "Cache-Control": "no-store" };

export async function GET(request: Request) {
  try {
    const account = await findAccountBySessionToken(readSessionToken(request));
    if (!account) return Response.json({ error: "Sessão necessária." }, { status: 401, headers });
    const [houses, mine] = await Promise.all([listPublicHouses(), findOwnPublicHouse(account.id)]);
    return Response.json({ houses, mine, sectorId: account.sectorId, sectorName: account.sectorName }, { headers });
  } catch {
    return Response.json({ error: "Não foi possível carregar as casas." }, { status: 503, headers });
  }
}

export async function POST(request: Request) {
  try {
    const account = await findAccountBySessionToken(readSessionToken(request));
    if (!account) return Response.json({ error: "Sessão necessária." }, { status: 401, headers });
    const payload: unknown = await request.json();
    if (!payload || typeof payload !== "object" || Array.isArray(payload)) return Response.json({ error: "Dados inválidos." }, { status: 400, headers });
    return Response.json({ house: await publishHouse(account, payload as Record<string, unknown>) }, { headers });
  } catch (error) {
    const message = error instanceof Error && !/database|binding/i.test(error.message) ? error.message : "Não foi possível publicar a casa.";
    return Response.json({ error: message }, { status: 400, headers });
  }
}

export async function DELETE(request: Request) {
  try {
    const account = await findAccountBySessionToken(readSessionToken(request));
    if (!account) return Response.json({ error: "Sessão necessária." }, { status: 401, headers });
    await unpublishHouse(account.id);
    return Response.json({ ok: true }, { headers });
  } catch {
    return Response.json({ error: "Não foi possível retirar a casa da galeria." }, { status: 503, headers });
  }
}
