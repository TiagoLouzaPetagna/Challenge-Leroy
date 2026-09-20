import { readSessionToken } from "@/lib/auth/http";
import { findAccountBySessionToken } from "@/lib/auth/repository";
import { getTeamRankings } from "@/lib/teams/rankings-repository";

const NO_STORE = { "Cache-Control": "no-store" };

export async function GET(request: Request) {
  try {
    const account = await findAccountBySessionToken(readSessionToken(request));
    if (!account) return Response.json({ error: "Sessão necessária." }, { status: 401, headers: NO_STORE });
    return Response.json(await getTeamRankings(account), { headers: NO_STORE });
  } catch {
    return Response.json({ error: "Não foi possível carregar os rankings agora." }, { status: 503, headers: NO_STORE });
  }
}
