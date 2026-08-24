import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { AUTH_COOKIE_NAME } from "./constants";
import { findAccountBySessionToken } from "./repository";

export async function requireAuthenticatedAccount(returnTo: string) {
  const cookieStore = await cookies();
  const account = await findAccountBySessionToken(
    cookieStore.get(AUTH_COOKIE_NAME)?.value ?? null,
  );
  if (!account) {
    redirect(`/login?returnTo=${encodeURIComponent(returnTo)}`);
  }
  return account;
}

export async function requireAdministrator(returnTo: string) {
  const account = await requireAuthenticatedAccount(returnTo);
  if (account.role !== "administrator") redirect("/?acesso=gestao-negado");
  return account;
}
