"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";

import { useAppState } from "@/app/providers";
import {
  createCustomSectorId,
  CUSTOM_SECTOR_ID,
  findSectorDefinition,
  SECTOR_CATALOG,
} from "@/lib/content/sector-catalog";
import type { LearnerPreferences } from "@/lib/domain/types";
import { BrandMark } from "@/features/ui/PortalChrome";

import styles from "./AccountRegistration.module.css";

type RegistrationForm = {
  name: string;
  employeeId: string;
  sectorChoice: string;
  customSectorName: string;
  leaderboardParticipation: boolean;
  leaderboardIdentity: LearnerPreferences["leaderboardIdentity"];
};

function createFormFromState({
  name,
  employeeId,
  sectorId,
  sectorName,
  leaderboardParticipation,
  leaderboardIdentity,
}: {
  name: string;
  employeeId: string;
  sectorId: string;
  sectorName: string;
  leaderboardParticipation: boolean;
  leaderboardIdentity: LearnerPreferences["leaderboardIdentity"];
}): RegistrationForm {
  const knownSector = findSectorDefinition(sectorId);

  return {
    name,
    employeeId,
    sectorChoice: knownSector ? knownSector.id : CUSTOM_SECTOR_ID,
    customSectorName: knownSector ? "" : sectorName,
    leaderboardParticipation,
    leaderboardIdentity,
  };
}

export function AccountRegistration() {
  const router = useRouter();
  const {
    state,
    isHydrated,
    localSecurityNotice,
    registerLearnerProfile,
  } = useAppState();
  const sourceKey = [
    state.demo.learner.id,
    state.demo.learner.name,
    state.teams.id,
    state.teams.name,
    state.preferences.leaderboardParticipation,
    state.preferences.leaderboardIdentity,
  ].join(":");
  const sourceForm = createFormFromState({
    name: state.demo.learner.name,
    employeeId: state.demo.learner.id,
    sectorId: state.teams.id,
    sectorName: state.teams.name,
    leaderboardParticipation: state.preferences.leaderboardParticipation,
    leaderboardIdentity: state.preferences.leaderboardIdentity,
  });
  const [draftState, setDraftState] = useState({
    sourceKey,
    value: sourceForm,
  });
  const [error, setError] = useState("");
  const [completedProfile, setCompletedProfile] = useState<{
    name: string;
    sectorName: string;
  } | null>(null);
  const form = draftState.sourceKey === sourceKey ? draftState.value : sourceForm;

  const update = <Key extends keyof RegistrationForm>(
    key: Key,
    value: RegistrationForm[Key],
  ) => {
    setDraftState({ sourceKey, value: { ...form, [key]: value } });
    setError("");
    setCompletedProfile(null);
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const name = form.name.trim();
    const employeeId = form.employeeId.trim();
    const selectedSector = findSectorDefinition(form.sectorChoice);
    const sectorName = selectedSector?.name ?? form.customSectorName.trim();
    const sectorId = selectedSector?.id ?? createCustomSectorId(sectorName);

    if (name.length < 2) {
      setError("Informe um nome com pelo menos 2 caracteres.");
      return;
    }

    if (employeeId.length < 3) {
      setError("Informe uma matrícula ou identificador com pelo menos 3 caracteres.");
      return;
    }

    if (sectorName.length < 2) {
      setError("Selecione ou informe a área em que a pessoa trabalha.");
      return;
    }

    registerLearnerProfile({
      name,
      employeeId,
      sectorId,
      sectorName,
      leaderboardParticipation: form.leaderboardParticipation,
      leaderboardIdentity: form.leaderboardIdentity,
    });
    setCompletedProfile({ name, sectorName });
  };

  return (
    <main className={styles.page}>
      <div className={styles.shell}>
        <div className={styles.brand}>
          <BrandMark />
          <div>
            <strong>Casa Digital</strong>
            <span>acesso demonstrativo</span>
          </div>
        </div>

        <div className={styles.grid}>
          <section className={styles.intro} aria-labelledby="registration-title">
            <span className={styles.eyebrow}>P1 · Conta por área</span>
            <h1 id="registration-title">Seu acesso começa pela área de trabalho.</h1>
            <p>
              Este fluxo substitui a identidade fictícia no navegador sem pedir
              unidade, loja, senha ou credencial corporativa real.
            </p>

            <div className={styles.principles}>
              <div>
                <span>01</span>
                <p>
                  <strong>Uma identidade local</strong>
                  <small>Nome e identificador acompanham o progresso desta demonstração.</small>
                </p>
              </div>
              <div>
                <span>02</span>
                <p>
                  <strong>Somente área de trabalho</strong>
                  <small>Nenhum vínculo com unidade é solicitado ou inferido.</small>
                </p>
              </div>
              <div>
                <span>03</span>
                <p>
                  <strong>Privacidade preparada</strong>
                  <small>Rankings individuais continuam inativos até uma fase futura.</small>
                </p>
              </div>
            </div>
          </section>

          {completedProfile ? (
            <section className={styles.success} aria-live="polite">
              <span>Dados atualizados</span>
              <h2>{completedProfile.name}</h2>
              <p>
                O perfil agora está vinculado à área {completedProfile.sectorName}.
                O progresso anterior foi preservado e nenhum dado foi enviado para
                a Leroy Merlin.
              </p>
              <button
                type="button"
                className={styles.primary}
                onClick={() => router.push("/perfil")}
              >
                Abrir meu perfil
              </button>
            </section>
          ) : (
            <form className={styles.form} onSubmit={submit}>
              <header>
                <h2>Dados do funcionário</h2>
                <p>
                  Lista e validação demonstrativas. O diretório corporativo real
                  será conectado somente após alinhamento com a empresa.
                </p>
              </header>

              <label className={styles.field}>
                <span>Nome de exibição</span>
                <input
                  name="displayName"
                  type="text"
                  minLength={2}
                  maxLength={80}
                  autoComplete="name"
                  value={form.name}
                  onChange={(event) => update("name", event.target.value)}
                />
                <small>Usado na saudação e no perfil privado.</small>
              </label>

              <label className={styles.field}>
                <span>Matrícula ou identificador interno</span>
                <input
                  name="employeeId"
                  type="text"
                  minLength={3}
                  maxLength={32}
                  autoComplete="off"
                  value={form.employeeId}
                  onChange={(event) => update("employeeId", event.target.value)}
                />
                <small>Nesta fase, o identificador não é consultado em um sistema corporativo.</small>
              </label>

              <label className={styles.field}>
                <span>Área de trabalho</span>
                <select
                  name="sector"
                  value={form.sectorChoice}
                  onChange={(event) => update("sectorChoice", event.target.value)}
                >
                  {SECTOR_CATALOG.map((sector) => (
                    <option value={sector.id} key={sector.id}>
                      {sector.name}
                    </option>
                  ))}
                  <option value={CUSTOM_SECTOR_ID}>Outra área</option>
                </select>
                <small>Não é necessário informar loja ou unidade.</small>
              </label>

              {form.sectorChoice === CUSTOM_SECTOR_ID ? (
                <label className={styles.field}>
                  <span>Nome da outra área</span>
                  <input
                    name="customSector"
                    type="text"
                    minLength={2}
                    maxLength={80}
                    value={form.customSectorName}
                    onChange={(event) =>
                      update("customSectorName", event.target.value)
                    }
                  />
                  <small>Use um nome curto e reconhecível pela equipe.</small>
                </label>
              ) : null}

              <fieldset className={styles.ranking}>
                <legend>Preferência para rankings futuros</legend>
                <label className={styles.choice}>
                  <input
                    type="checkbox"
                    checked={form.leaderboardParticipation}
                    onChange={(event) =>
                      update("leaderboardParticipation", event.target.checked)
                    }
                  />
                  <span>
                    <strong>Quero participar quando rankings individuais forem ativados</strong>
                    <small>Desativado por padrão e sem efeito no P1.</small>
                  </span>
                </label>

                <div
                  className={styles.identityOptions}
                  aria-disabled={!form.leaderboardParticipation}
                >
                  {[
                    ["initials", "Iniciais"],
                    ["displayName", "Nome de exibição"],
                    ["anonymous", "Anônimo"],
                  ].map(([value, label]) => (
                    <label key={value}>
                      <input
                        type="radio"
                        name="leaderboardIdentity"
                        value={value}
                        disabled={!form.leaderboardParticipation}
                        checked={form.leaderboardIdentity === value}
                        onChange={() =>
                          update(
                            "leaderboardIdentity",
                            value as LearnerPreferences["leaderboardIdentity"],
                          )
                        }
                      />
                      {label}
                    </label>
                  ))}
                </div>
                <p className={styles.rankingNote}>
                  O ranking coletivo de áreas continua agregado. Erros, notas e
                  respostas individuais nunca aparecem nele.
                </p>
              </fieldset>

              {error ? (
                <p className={styles.error} role="alert">
                  {error}
                </p>
              ) : null}

              <div className={styles.actions}>
                <button
                  type="submit"
                  className={styles.primary}
                  disabled={!isHydrated}
                >
                  {isHydrated ? "Salvar dados de acesso" : "Carregando dados"}
                </button>
                <button
                  type="button"
                  className={styles.secondary}
                  onClick={() => router.push("/perfil")}
                >
                  Voltar ao perfil
                </button>
              </div>

              <p className={styles.localNotice}>{localSecurityNotice}</p>
            </form>
          )}
        </div>
      </div>
    </main>
  );
}
