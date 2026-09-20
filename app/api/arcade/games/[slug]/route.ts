import { readSessionToken } from "@/lib/auth/http";
import { findAccountBySessionToken } from "@/lib/auth/repository";
import {
  completeGameResult, GameResultError, getGameLeaderboard, isGameSlug, startGameResult,
} from "@/lib/arcade/game-results";

const headers = { "Cache-Control": "no-store" };
const error = (message: string, status: number) => Response.json({ error: message }, { status, headers });

export async function GET(request: Request, context: { params: Promise<{ slug: string }> }) {
  const { slug } = await context.params;
  if (!isGameSlug(slug)) return error("Jogo não encontrado.", 404);
  const account = await findAccountBySessionToken(readSessionToken(request));
  if (!account) return error("Sessão necessária.", 401);
  try { return Response.json(await getGameLeaderboard(account, slug), { headers }); }
  catch { return error("Ranking indisponível.", 503); }
}

export async function POST(request: Request, context: { params: Promise<{ slug: string }> }) {
  const { slug } = await context.params;
  if (!isGameSlug(slug)) return error("Jogo não encontrado.", 404);
  const account = await findAccountBySessionToken(readSessionToken(request));
  if (!account) return error("Sessão necessária.", 401);
  try {
    const body = await request.json() as Record<string, unknown>;
    if (body.action === "start") {
      return Response.json(await startGameResult(account.id, slug), { status: 201, headers });
    }
    if (body.action === "complete") {
      const result = await completeGameResult(account.id, slug, body.runId, body.score, body.trackId);
      return Response.json({ result, leaderboard: await getGameLeaderboard(account, slug) }, { headers });
    }
    return error("Ação desconhecida.", 400);
  } catch (cause) {
    if (cause instanceof GameResultError) return error(cause.message, cause.status);
    return error("Não foi possível registrar a partida.", 503);
  }
}
