import {
  createSession,
  findAccountForLogin,
  toAuthenticatedAccount,
} from "@/lib/auth/repository";
import { sessionCookie } from "@/lib/auth/http";
import { constantTimeEqual, derivePasswordHash } from "@/lib/auth/password";

const DUMMY_SALT = "71e53b102e7c38a251d5f62aa92058a3";
const DUMMY_HASH =
  "8997f6264d7a53ac702fd1018fe2d9e2d0a960457b3ad2d5ab98cd0099d416e2";

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as {
      employeeId?: unknown;
      password?: unknown;
    };
    const employeeId =
      typeof payload.employeeId === "string" ? payload.employeeId.trim() : "";
    const password = typeof payload.password === "string" ? payload.password : "";

    if (
      employeeId.length < 3 ||
      employeeId.length > 64 ||
      password.length < 8 ||
      password.length > 128
    ) {
      return invalidCredentials();
    }

    const account = await findAccountForLogin(employeeId);
    const derivedHash = await derivePasswordHash(
      password,
      account?.passwordSalt ?? DUMMY_SALT,
      account?.passwordIterations ?? 210_000,
    );
    const passwordMatches = constantTimeEqual(
      derivedHash,
      account?.passwordHash ?? DUMMY_HASH,
    );

    if (!account || account.status !== "active" || !passwordMatches) {
      return invalidCredentials();
    }

    const session = await createSession(account.id);
    return Response.json(
      { account: toAuthenticatedAccount(account) },
      {
        status: 200,
        headers: {
          "Cache-Control": "no-store",
          "Set-Cookie": sessionCookie(session.token, request),
        },
      },
    );
  } catch {
    return Response.json(
      { error: "O serviço de acesso não está disponível neste momento." },
      { status: 503, headers: { "Cache-Control": "no-store" } },
    );
  }
}

function invalidCredentials() {
  return Response.json(
    { error: "Matrícula ou senha inválida." },
    { status: 401, headers: { "Cache-Control": "no-store" } },
  );
}
