import { readSessionToken } from "@/lib/auth/http";
import {
  findAccountBySessionToken,
  loadAccountState,
  saveAccountState,
} from "@/lib/auth/repository";
import type { AppState } from "@/lib/domain/types";
import { bindStateToAccount } from "@/lib/state/account-state";
import { isValidState } from "@/lib/state/persistence";

const MAX_STATE_BYTES = 1_000_000;

export async function GET(request: Request) {
  try {
    const account = await findAccountBySessionToken(readSessionToken(request));
    if (!account) return unauthorized();

    const storedState = await loadAccountState(account.id);
    const state = storedState && isValidState(storedState)
      ? bindStateToAccount(storedState, account)
      : null;

    return Response.json(
      { state },
      { status: 200, headers: { "Cache-Control": "no-store" } },
    );
  } catch {
    return unavailable();
  }
}

export async function PUT(request: Request) {
  try {
    const account = await findAccountBySessionToken(readSessionToken(request));
    if (!account) return unauthorized();

    const declaredLength = Number(request.headers.get("content-length") ?? "0");
    if (declaredLength > MAX_STATE_BYTES) {
      return Response.json({ error: "Estado muito grande." }, { status: 413 });
    }

    const rawBody = await request.text();
    if (new TextEncoder().encode(rawBody).byteLength > MAX_STATE_BYTES) {
      return Response.json({ error: "Estado muito grande." }, { status: 413 });
    }

    const payload = JSON.parse(rawBody) as { state?: unknown };
    if (!isValidState(payload.state)) {
      return Response.json(
        { error: "O progresso enviado é inválido." },
        { status: 400, headers: { "Cache-Control": "no-store" } },
      );
    }

    const state = bindStateToAccount(payload.state as AppState, account);
    await saveAccountState(account.id, state);
    return Response.json(
      { savedAt: state.meta.savedAt, revision: state.meta.revision },
      { status: 200, headers: { "Cache-Control": "no-store" } },
    );
  } catch {
    return unavailable();
  }
}

function unauthorized() {
  return Response.json(
    { error: "Sessão necessária." },
    { status: 401, headers: { "Cache-Control": "no-store" } },
  );
}

function unavailable() {
  return Response.json(
    { error: "Não foi possível acessar o progresso da conta." },
    { status: 503, headers: { "Cache-Control": "no-store" } },
  );
}
