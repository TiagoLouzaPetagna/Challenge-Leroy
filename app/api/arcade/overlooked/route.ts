import {
  completeOverlookedRun,
  getOverlookedLeaderboard,
  OverlookedRunError,
  startOverlookedRun,
} from "@/lib/arcade/repository";
import { OverlookedValidationError } from "@/lib/arcade/overlooked";
import { readSessionToken } from "@/lib/auth/http";
import { findAccountBySessionToken } from "@/lib/auth/repository";

const NO_STORE = { "Cache-Control": "no-store" };

function errorResponse(message: string, status: number) {
  return Response.json({ error: message }, { status, headers: NO_STORE });
}

export async function GET(request: Request) {
  try {
    const account = await findAccountBySessionToken(readSessionToken(request));
    if (!account) return errorResponse("Sessão necessária.", 401);
    return Response.json(await getOverlookedLeaderboard(account), {
      status: 200,
      headers: NO_STORE,
    });
  } catch {
    return errorResponse("Não foi possível carregar o ranking do Overlooked.", 503);
  }
}

export async function POST(request: Request) {
  try {
    const account = await findAccountBySessionToken(readSessionToken(request));
    if (!account) return errorResponse("Sessão necessária.", 401);
    const body = (await request.json()) as Record<string, unknown>;

    if (body.action === "start") {
      return Response.json(await startOverlookedRun(account.id), {
        status: 201,
        headers: NO_STORE,
      });
    }

    if (body.action === "complete") {
      if (typeof body.runId !== "string" || !body.runId) {
        return errorResponse("Identificador da partida ausente.", 400);
      }
      const result = await completeOverlookedRun(account.id, body.runId, {
        durationSeconds: body.durationSeconds,
        outcomes: body.outcomes,
      });
      return Response.json(
        {
          accepted: true,
          result,
          leaderboard: await getOverlookedLeaderboard(account),
        },
        { status: 200, headers: NO_STORE },
      );
    }

    return errorResponse("Ação desconhecida.", 400);
  } catch (error) {
    if (error instanceof OverlookedValidationError) {
      return errorResponse(error.message, 422);
    }
    if (error instanceof OverlookedRunError) {
      return errorResponse(error.message, error.status);
    }
    return errorResponse("Não foi possível registrar a partida.", 503);
  }
}
