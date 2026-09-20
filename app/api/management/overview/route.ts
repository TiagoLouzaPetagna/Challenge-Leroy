import { readSessionToken } from "@/lib/auth/http";
import { findAccountBySessionToken } from "@/lib/auth/repository";
import { getManagementPeople } from "@/lib/management/overview";

const headers = { "Cache-Control": "no-store" };

export async function GET(request: Request) {
  try {
    const account = await findAccountBySessionToken(readSessionToken(request));
    if (!account) return Response.json({ error: "Sessão necessária." }, { status: 401, headers });
    if (account.role !== "administrator") {
      return Response.json({ error: "Acesso reservado à administração." }, { status: 403, headers });
    }
    return Response.json({ people: await getManagementPeople(), generatedAt: new Date().toISOString() }, { headers });
  } catch {
    return Response.json({ error: "Não foi possível carregar o painel de gestão." }, { status: 503, headers });
  }
}
