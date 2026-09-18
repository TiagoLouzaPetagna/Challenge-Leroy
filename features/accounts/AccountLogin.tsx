"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { useAppState } from "@/app/providers";
import { safeReturnPath } from "@/lib/auth/http";
import { BrandMark } from "@/features/ui/PortalChrome";

import styles from "./AccountLogin.module.css";

export function AccountLogin() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { account, isAuthLoading, authenticationError } = useAppState();
  const [employeeId, setEmployeeId] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const returnTo = safeReturnPath(searchParams.get("returnTo"));

  useEffect(() => {
    if (!isAuthLoading && account) router.replace(returnTo);
  }, [account, isAuthLoading, returnTo, router]);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ employeeId, password }),
      });
      const payload = (await response.json()) as { error?: string };
      if (!response.ok) {
        setError(payload.error ?? "Não foi possível entrar.");
        return;
      }

      window.location.assign(returnTo);
    } catch {
      setError("Não foi possível conectar ao serviço de acesso.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className={styles.page}>
      <section className={styles.story} aria-labelledby="login-story-title">
        <div className={styles.brand}>
          <BrandMark />
          <div>
            <strong>Casa Digital</strong>
            <span>Leroy Merlin</span>
          </div>
        </div>

        <div className={styles.storyCopy}>
          <span className={styles.eyebrow}>Aprendizado que acompanha você</span>
          <h1 id="login-story-title">Segurança se constrói em equipe.</h1>
          <p>
            Entre com sua conta para continuar suas missões, acompanhar o
            progresso do seu setor e acessar apenas as áreas permitidas para o
            seu perfil.
          </p>
        </div>

        <dl className={styles.principles}>
          <div><dt>Identidade única</dt><dd>A conta não muda quando você navega.</dd></div>
          <div><dt>Progresso individual</dt><dd>Resultados ficam associados à sua sessão.</dd></div>
          <div><dt>Acesso por papel</dt><dd>Gestão somente para administradores.</dd></div>
        </dl>
      </section>

      <section className={styles.access} aria-labelledby="login-title">
        <div className={styles.card}>
          <span className={styles.eyebrow}>Acesso à plataforma</span>
          <h2 id="login-title">Boas-vindas</h2>
          <p className={styles.intro}>
            Use a matrícula e a senha da conta previamente cadastrada.
          </p>

          <form className={styles.form} onSubmit={submit}>
            <label>
              Matrícula
              <input
                name="employeeId"
                autoComplete="username"
                value={employeeId}
                onChange={(event) => setEmployeeId(event.target.value)}
                minLength={3}
                maxLength={64}
                required
              />
            </label>
            <label>
              Senha
              <input
                name="password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                minLength={8}
                maxLength={128}
                required
              />
            </label>
            {error || authenticationError ? (
              <p className={styles.error} role="alert">
                {error || authenticationError}
              </p>
            ) : null}
            <button type="submit" disabled={submitting || isAuthLoading}>
              {submitting ? "Entrando…" : "Entrar"}
            </button>
          </form>

          <p className={styles.securityNote}>
            Não há cadastro público neste momento. Novas contas serão inseridas
            somente pelo fluxo administrativo definido para o projeto.
          </p>
        </div>
      </section>
    </main>
  );
}
