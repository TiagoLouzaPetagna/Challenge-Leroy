import { readSessionToken } from "@/lib/auth/http";
import { findAccountBySessionToken } from "@/lib/auth/repository";
import { getTeamProtocolBoard, submitTeamProtocol, TeamProtocolInputError } from "@/lib/teams/protocol-repository";

const NO_STORE = { "Cache-Control": "no-store" };

function errorResponse(message: string, status: number) {
  return Response.json({ error: message }, { status, headers: NO_STORE });
}

export async function GET(request: Request) {
  try {
    const account = await findAccountBySessionToken(readSessionToken(request));
    if (!account) return errorResponse("Sessão necessária.", 401);
    return Response.json(await getTeamProtocolBoard(account), { headers: NO_STORE });
  } catch {
    return errorResponse("Não foi possível carregar o desafio do setor.", 503);
  }
}

export async function POST(request: Request) {
  try {
    const origin = request.headers.get("origin");
    if (origin && origin !== new URL(request.url).origin) return errorResponse("Origem inválida.", 403);
    const account = await findAccountBySessionToken(readSessionToken(request));
    if (!account) return errorResponse("Sessão necessária.", 401);
    if (Number(request.headers.get("content-length")) > 1_000) return errorResponse("Resposta muito grande.", 413);
    const raw = await request.text();
    if (raw.length > 1_000) return errorResponse("Resposta muito grande.", 413);
    const body = JSON.parse(raw) as { order?: unknown };
    return Response.json(await submitTeamProtocol(account, body.order), { headers: NO_STORE });
  } catch (error) {
    if (error instanceof TeamProtocolInputError) return errorResponse(error.message, 400);
    if (error instanceof SyntaxError) return errorResponse("Resposta inválida.", 400);
    return errorResponse("Não foi possível salvar sua decisão.", 503);
  }
}
