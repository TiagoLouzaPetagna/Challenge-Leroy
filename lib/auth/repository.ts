import { and, eq, gt, lt } from "drizzle-orm";

import { getD1Binding, getDb } from "@/db";
import {
  accountProgressSummaries,
  accounts,
  accountStates,
  authSessions,
} from "@/db/schema";
import type { AppState } from "@/lib/domain/types";
import { DEMO_OVERLOOKED_LEADERBOARD } from "@/lib/content/overlooked-demo-leaderboard";
import { calculateAuthoritativeProgressSummary } from "@/lib/leaderboard/projection";

import { SESSION_DURATION_SECONDS } from "./constants";
import { bytesToHex } from "./password";
import type { AuthenticatedAccount } from "./types";

export { AUTH_COOKIE_NAME, SESSION_DURATION_SECONDS } from "./constants";

const AUTH_SCHEMA_STATEMENTS = [
  `CREATE TABLE IF NOT EXISTS accounts (
    id TEXT PRIMARY KEY NOT NULL,
    employee_id TEXT NOT NULL,
    name TEXT NOT NULL,
    role TEXT NOT NULL CHECK (role IN ('administrator', 'learner')),
    sector_id TEXT NOT NULL,
    sector_name TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
    password_salt TEXT NOT NULL,
    password_hash TEXT NOT NULL,
    password_iterations INTEGER NOT NULL,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    last_login_at TEXT
  )`,
  "CREATE UNIQUE INDEX IF NOT EXISTS idx_accounts_employee_id ON accounts(employee_id)",
  "CREATE INDEX IF NOT EXISTS idx_accounts_role_status ON accounts(role, status)",
  `CREATE TABLE IF NOT EXISTS auth_sessions (
    token_hash TEXT PRIMARY KEY NOT NULL,
    account_id TEXT NOT NULL REFERENCES accounts(id) ON DELETE CASCADE,
    created_at TEXT NOT NULL,
    expires_at TEXT NOT NULL
  )`,
  "CREATE INDEX IF NOT EXISTS idx_auth_sessions_account_id ON auth_sessions(account_id)",
  "CREATE INDEX IF NOT EXISTS idx_auth_sessions_expires_at ON auth_sessions(expires_at)",
  `CREATE TABLE IF NOT EXISTS account_states (
    account_id TEXT PRIMARY KEY NOT NULL REFERENCES accounts(id) ON DELETE CASCADE,
    schema_version INTEGER NOT NULL,
    revision INTEGER NOT NULL,
    state_json TEXT NOT NULL,
    updated_at TEXT NOT NULL
  )`,
  "CREATE INDEX IF NOT EXISTS idx_account_states_updated_at ON account_states(updated_at)",
  `CREATE TABLE IF NOT EXISTS account_progress_summaries (
    account_id TEXT PRIMARY KEY NOT NULL REFERENCES accounts(id) ON DELETE CASCADE,
    total_points INTEGER NOT NULL DEFAULT 0,
    completed_activities INTEGER NOT NULL DEFAULT 0,
    completed_curriculum_activities INTEGER NOT NULL DEFAULT 0,
    completed_missions INTEGER NOT NULL DEFAULT 0,
    average_score INTEGER NOT NULL DEFAULT 0,
    leaderboard_participation INTEGER NOT NULL DEFAULT 0,
    leaderboard_identity TEXT NOT NULL DEFAULT 'initials' CHECK (leaderboard_identity IN ('initials', 'displayName', 'anonymous')),
    last_activity_at TEXT,
    updated_at TEXT NOT NULL,
    CONSTRAINT progress_summaries_nonnegative_check CHECK (
      total_points >= 0 AND completed_activities >= 0 AND
      completed_curriculum_activities >= 0 AND completed_missions >= 0 AND
      average_score >= 0
    )
  )`,
  "CREATE INDEX IF NOT EXISTS idx_progress_summaries_points ON account_progress_summaries(leaderboard_participation, total_points)",
  "CREATE INDEX IF NOT EXISTS idx_progress_summaries_updated_at ON account_progress_summaries(updated_at)",
  `CREATE TABLE IF NOT EXISTS arcade_runs (
    id TEXT PRIMARY KEY NOT NULL,
    account_id TEXT NOT NULL REFERENCES accounts(id) ON DELETE CASCADE,
    game_id TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'started' CHECK (status IN ('started', 'completed')),
    started_at TEXT NOT NULL,
    expires_at TEXT NOT NULL,
    completed_at TEXT,
    duration_seconds INTEGER,
    raw_score INTEGER CHECK (raw_score IS NULL OR raw_score BETWEEN -165 AND 155),
    classified_messages INTEGER NOT NULL DEFAULT 0 CHECK (classified_messages BETWEEN 0 AND 12),
    phishing_reported INTEGER NOT NULL DEFAULT 0 CHECK (phishing_reported BETWEEN 0 AND 7),
    legitimate_completed INTEGER NOT NULL DEFAULT 0 CHECK (legitimate_completed BETWEEN 0 AND 5),
    phishing_processed INTEGER NOT NULL DEFAULT 0 CHECK (phishing_processed BETWEEN 0 AND 7),
    legitimate_discarded INTEGER NOT NULL DEFAULT 0 CHECK (legitimate_discarded BETWEEN 0 AND 5),
    outcomes_json TEXT,
    validation_version INTEGER NOT NULL DEFAULT 1
  )`,
  "CREATE INDEX IF NOT EXISTS idx_arcade_runs_account_game_status ON arcade_runs(account_id, game_id, status)",
  "CREATE INDEX IF NOT EXISTS idx_arcade_runs_game_score ON arcade_runs(game_id, status, raw_score)",
  "CREATE INDEX IF NOT EXISTS idx_arcade_runs_expires_at ON arcade_runs(expires_at)",
  "PRAGMA optimize",
] as const;

const SEED_ACCOUNTS = [
  {
    id: "account:marina-admin",
    employeeId: "ADMIN-0001",
    name: "Marina Alves",
    role: "administrator" as const,
    sectorId: "administracao",
    sectorName: "Administração",
    passwordSalt: "f4adb627c2d31eedf35bb44e6f78fdf3",
    passwordHash:
      "bbc29f7c42f558055551288fd864dbeae3217d9450d338170111a73e343f9b1f",
    passwordIterations: 100_000,
  },
  {
    id: "account:lucas-learner",
    employeeId: "FUNC-0001",
    name: "Lucas",
    role: "learner" as const,
    sectorId: "casa-decoracao",
    sectorName: "Casa & Decoração",
    passwordSalt: "3151b07852555901cf35d48e3e9a4a37",
    passwordHash:
      "45994c8d8333396012eaaa9d44a63b14537b484a25dc1e3702172f2192d1ad98",
    passwordIterations: 100_000,
  },
  {
    id: "account:ana-learner",
    employeeId: "FUNC-0002",
    name: "Ana Costa",
    role: "learner" as const,
    sectorId: "tecnologia",
    sectorName: "Tecnologia",
    passwordSalt: "824f683a215ec021c2938c3aa8c7a4ce",
    passwordHash:
      "f64a8123062a39c51421439c40dfeb2d6016c30b8500172c280ac4b1b0013569",
    passwordIterations: 100_000,
  },
] as const;

let storageInitialization: Promise<void> | null = null;

export function normalizeEmployeeId(value: string): string {
  return value.trim().toLocaleUpperCase("pt-BR");
}

export async function ensureAuthStorage(): Promise<void> {
  storageInitialization ??= initializeAuthStorage().catch((error) => {
    storageInitialization = null;
    throw error;
  });
  return storageInitialization;
}

async function initializeAuthStorage(): Promise<void> {
  const d1 = getD1Binding();
  await d1.batch(
    AUTH_SCHEMA_STATEMENTS.map((statement) => d1.prepare(statement)),
  );

  await d1.batch(
    SEED_ACCOUNTS.map((account) =>
      d1
        .prepare(
          `INSERT OR IGNORE INTO accounts (
            id, employee_id, name, role, sector_id, sector_name, status,
            password_salt, password_hash, password_iterations, created_at, updated_at
          ) VALUES (?, ?, ?, ?, ?, ?, 'active', ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)`,
        )
        .bind(
          account.id,
          account.employeeId,
          account.name,
          account.role,
          account.sectorId,
          account.sectorName,
          account.passwordSalt,
          account.passwordHash,
          account.passwordIterations,
        ),
      ),
  );

  const demoLeaderboardUpdatedAt = new Date().toISOString();
  await d1.batch([
    ...DEMO_OVERLOOKED_LEADERBOARD.map((entry) =>
      d1
        .prepare(
          `INSERT INTO account_progress_summaries (
            account_id, total_points, completed_activities,
            completed_curriculum_activities, completed_missions, average_score,
            leaderboard_participation, leaderboard_identity, updated_at
          ) VALUES (?, 0, 0, 0, 0, 0, 1, 'displayName', ?)
          ON CONFLICT(account_id) DO UPDATE SET
            leaderboard_participation = 1,
            leaderboard_identity = 'displayName'`,
        )
        .bind(entry.accountId, demoLeaderboardUpdatedAt),
    ),
    ...DEMO_OVERLOOKED_LEADERBOARD.map((entry) =>
      d1
        .prepare(
          `INSERT INTO arcade_runs (
            id, account_id, game_id, status, started_at, expires_at, completed_at,
            duration_seconds, raw_score, classified_messages, phishing_reported,
            legitimate_completed, phishing_processed, legitimate_discarded,
            outcomes_json, validation_version
          ) VALUES (?, ?, 'arcade:overlooked', 'completed', ?, ?, ?, 300, ?, ?, ?, ?, ?, ?, ?, 1)
          ON CONFLICT(id) DO UPDATE SET
            raw_score = excluded.raw_score,
            classified_messages = excluded.classified_messages,
            phishing_reported = excluded.phishing_reported,
            legitimate_completed = excluded.legitimate_completed,
            phishing_processed = excluded.phishing_processed,
            legitimate_discarded = excluded.legitimate_discarded,
            outcomes_json = excluded.outcomes_json`,
        )
        .bind(
          entry.id,
          entry.accountId,
          new Date(new Date(entry.completedAt).getTime() - 300_000).toISOString(),
          new Date(new Date(entry.completedAt).getTime() + 900_000).toISOString(),
          entry.completedAt,
          entry.score,
          entry.classifiedMessages,
          entry.phishingReported,
          entry.legitimateCompleted,
          entry.phishingProcessed,
          entry.legitimateDiscarded,
          JSON.stringify(entry.outcomes),
        ),
    ),
  ]);
}

export async function findAccountForLogin(employeeId: string) {
  await ensureAuthStorage();
  const db = getDb();
  const [account] = await db
    .select()
    .from(accounts)
    .where(eq(accounts.employeeId, normalizeEmployeeId(employeeId)))
    .limit(1);
  return account ?? null;
}

export function toAuthenticatedAccount(
  account: typeof accounts.$inferSelect,
): AuthenticatedAccount {
  return {
    id: account.id,
    employeeId: account.employeeId,
    name: account.name,
    role: account.role,
    sectorId: account.sectorId,
    sectorName: account.sectorName,
  };
}

async function sha256(value: string): Promise<string> {
  const digest = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(value),
  );
  return bytesToHex(new Uint8Array(digest));
}

export async function createSession(accountId: string) {
  await ensureAuthStorage();
  const tokenBytes = crypto.getRandomValues(new Uint8Array(32));
  const token = bytesToHex(tokenBytes);
  const tokenHash = await sha256(token);
  const createdAt = new Date();
  const expiresAt = new Date(
    createdAt.getTime() + SESSION_DURATION_SECONDS * 1000,
  );
  const db = getDb();

  await db.delete(authSessions).where(lt(authSessions.expiresAt, createdAt.toISOString()));
  await db.insert(authSessions).values({
    tokenHash,
    accountId,
    createdAt: createdAt.toISOString(),
    expiresAt: expiresAt.toISOString(),
  });
  await db
    .update(accounts)
    .set({ lastLoginAt: createdAt.toISOString(), updatedAt: createdAt.toISOString() })
    .where(eq(accounts.id, accountId));

  return { token, expiresAt };
}

export async function findAccountBySessionToken(
  token: string | null,
): Promise<AuthenticatedAccount | null> {
  if (!token) return null;
  await ensureAuthStorage();
  const tokenHash = await sha256(token);
  const now = new Date().toISOString();
  const db = getDb();
  const rows = await db
    .select({ account: accounts })
    .from(authSessions)
    .innerJoin(accounts, eq(authSessions.accountId, accounts.id))
    .where(
      and(
        eq(authSessions.tokenHash, tokenHash),
        gt(authSessions.expiresAt, now),
        eq(accounts.status, "active"),
      ),
    )
    .limit(1);

  return rows[0] ? toAuthenticatedAccount(rows[0].account) : null;
}

export async function deleteSession(token: string | null): Promise<void> {
  if (!token) return;
  await ensureAuthStorage();
  const tokenHash = await sha256(token);
  await getDb().delete(authSessions).where(eq(authSessions.tokenHash, tokenHash));
}

export async function loadAccountState(accountId: string): Promise<AppState | null> {
  await ensureAuthStorage();
  const [record] = await getDb()
    .select()
    .from(accountStates)
    .where(eq(accountStates.accountId, accountId))
    .limit(1);
  if (!record) return null;

  try {
    return JSON.parse(record.stateJson) as AppState;
  } catch {
    return null;
  }
}

export async function saveAccountState(
  accountId: string,
  state: AppState,
): Promise<void> {
  await ensureAuthStorage();
  const updatedAt = new Date().toISOString();
  const db = getDb();
  await db
    .insert(accountStates)
    .values({
      accountId,
      schemaVersion: state.meta.schemaVersion,
      revision: state.meta.revision,
      stateJson: JSON.stringify(state),
      updatedAt,
    })
    .onConflictDoUpdate({
      target: accountStates.accountId,
      set: {
        schemaVersion: state.meta.schemaVersion,
        revision: state.meta.revision,
        stateJson: JSON.stringify(state),
        updatedAt,
      },
    });
  await saveAccountProgressSummary(accountId, state, updatedAt);
}

export async function saveAccountProgressSummary(
  accountId: string,
  state: AppState,
  updatedAt = new Date().toISOString(),
): Promise<void> {
  await ensureAuthStorage();
  const summary = calculateAuthoritativeProgressSummary(state);
  await getDb()
    .insert(accountProgressSummaries)
    .values({ accountId, ...summary, updatedAt })
    .onConflictDoUpdate({
      target: accountProgressSummaries.accountId,
      set: { ...summary, updatedAt },
    });
}
