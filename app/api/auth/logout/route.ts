import { expiredSessionCookie, readSessionToken } from "@/lib/auth/http";
import { deleteSession } from "@/lib/auth/repository";

export async function POST(request: Request) {
  try {
    await deleteSession(readSessionToken(request));
  } catch {
    // A expiração do cookie local ainda encerra o acesso neste navegador.
  }

  return new Response(null, {
    status: 204,
    headers: {
      "Cache-Control": "no-store",
      "Set-Cookie": expiredSessionCookie(request),
    },
  });
}
