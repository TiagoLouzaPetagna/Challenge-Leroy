import { readSessionToken } from "@/lib/auth/http";
import { findAccountBySessionToken } from "@/lib/auth/repository";
import { getLeaderboard } from "@/lib/leaderboard/repository";

export async function GET(request: Request) {
  try {
    const account = await findAccountBySessionToken(readSessionToken(request));
    if (!account) {
      return Response.json(
        { error: "Sessão necessária." },
        { status: 401, headers: { "Cache-Control": "no-store" } },
      );
    }

    return Response.json(await getLeaderboard(account), {
      status: 200,
      headers: { "Cache-Control": "no-store" },
    });
  } catch {
    return Response.json(
      { error: "Não foi possível atualizar a classificação agora." },
      { status: 503, headers: { "Cache-Control": "no-store" } },
    );
  }
}
