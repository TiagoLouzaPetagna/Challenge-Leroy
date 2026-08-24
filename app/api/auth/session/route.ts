import { readSessionToken } from "@/lib/auth/http";
import { findAccountBySessionToken } from "@/lib/auth/repository";

export async function GET(request: Request) {
  try {
    const account = await findAccountBySessionToken(readSessionToken(request));
    return Response.json(
      { account },
      {
        status: account ? 200 : 401,
        headers: { "Cache-Control": "no-store" },
      },
    );
  } catch {
    return Response.json(
      { account: null, error: "Não foi possível validar a sessão." },
      { status: 503, headers: { "Cache-Control": "no-store" } },
    );
  }
}
