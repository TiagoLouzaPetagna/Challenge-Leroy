import { readSessionToken } from "@/lib/auth/http";
import { findAccountBySessionToken } from "@/lib/auth/repository";
import { getArcadeRewardProgress } from "@/lib/arcade/rewards";

const headers = { "Cache-Control": "no-store" };

export async function GET(request: Request) {
  const account = await findAccountBySessionToken(readSessionToken(request));
  if (!account) return Response.json({ error: "Sessão necessária." }, { status: 401, headers });
  try {
    return Response.json(await getArcadeRewardProgress(account.id), { headers });
  } catch {
    return Response.json({ error: "Conquistas indisponíveis." }, { status: 503, headers });
  }
}
