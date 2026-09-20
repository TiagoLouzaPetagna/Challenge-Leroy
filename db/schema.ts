import { sql } from "drizzle-orm";
import {
  check,
  index,
  integer,
  sqliteTable,
  text,
  uniqueIndex,
} from "drizzle-orm/sqlite-core";

export const accounts = sqliteTable(
  "accounts",
  {
    id: text("id").primaryKey(),
    employeeId: text("employee_id").notNull(),
    name: text("name").notNull(),
    role: text("role", { enum: ["administrator", "learner"] }).notNull(),
    sectorId: text("sector_id").notNull(),
    sectorName: text("sector_name").notNull(),
    status: text("status", { enum: ["active", "inactive"] })
      .notNull()
      .default("active"),
    passwordSalt: text("password_salt").notNull(),
    passwordHash: text("password_hash").notNull(),
    passwordIterations: integer("password_iterations").notNull(),
    createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
    updatedAt: text("updated_at").notNull().default(sql`CURRENT_TIMESTAMP`),
    lastLoginAt: text("last_login_at"),
  },
  (table) => [
    uniqueIndex("idx_accounts_employee_id").on(table.employeeId),
    index("idx_accounts_role_status").on(table.role, table.status),
    check(
      "accounts_role_check",
      sql`${table.role} IN ('administrator', 'learner')`,
    ),
    check(
      "accounts_status_check",
      sql`${table.status} IN ('active', 'inactive')`,
    ),
  ],
);

export const authSessions = sqliteTable(
  "auth_sessions",
  {
    tokenHash: text("token_hash").primaryKey(),
    accountId: text("account_id")
      .notNull()
      .references(() => accounts.id, { onDelete: "cascade" }),
    createdAt: text("created_at").notNull(),
    expiresAt: text("expires_at").notNull(),
  },
  (table) => [
    index("idx_auth_sessions_account_id").on(table.accountId),
    index("idx_auth_sessions_expires_at").on(table.expiresAt),
  ],
);

export const accountStates = sqliteTable(
  "account_states",
  {
    accountId: text("account_id")
      .primaryKey()
      .references(() => accounts.id, { onDelete: "cascade" }),
    schemaVersion: integer("schema_version").notNull(),
    revision: integer("revision").notNull(),
    stateJson: text("state_json").notNull(),
    updatedAt: text("updated_at").notNull(),
  },
  (table) => [index("idx_account_states_updated_at").on(table.updatedAt)],
);

export const accountProgressSummaries = sqliteTable(
  "account_progress_summaries",
  {
    accountId: text("account_id")
      .primaryKey()
      .references(() => accounts.id, { onDelete: "cascade" }),
    totalPoints: integer("total_points").notNull().default(0),
    completedActivities: integer("completed_activities").notNull().default(0),
    completedCurriculumActivities: integer("completed_curriculum_activities")
      .notNull()
      .default(0),
    completedMissions: integer("completed_missions").notNull().default(0),
    averageScore: integer("average_score").notNull().default(0),
    leaderboardParticipation: integer("leaderboard_participation", {
      mode: "boolean",
    })
      .notNull()
      .default(false),
    leaderboardIdentity: text("leaderboard_identity", {
      enum: ["initials", "displayName", "anonymous"],
    })
      .notNull()
      .default("initials"),
    lastActivityAt: text("last_activity_at"),
    updatedAt: text("updated_at").notNull(),
  },
  (table) => [
    index("idx_progress_summaries_points").on(
      table.leaderboardParticipation,
      table.totalPoints,
    ),
    index("idx_progress_summaries_updated_at").on(table.updatedAt),
    check(
      "progress_summaries_identity_check",
      sql`${table.leaderboardIdentity} IN ('initials', 'displayName', 'anonymous')`,
    ),
    check(
      "progress_summaries_nonnegative_check",
      sql`${table.totalPoints} >= 0 AND ${table.completedActivities} >= 0 AND ${table.completedCurriculumActivities} >= 0 AND ${table.completedMissions} >= 0 AND ${table.averageScore} >= 0`,
    ),
  ],
);

export const arcadeRuns = sqliteTable(
  "arcade_runs",
  {
    id: text("id").primaryKey(),
    accountId: text("account_id")
      .notNull()
      .references(() => accounts.id, { onDelete: "cascade" }),
    gameId: text("game_id").notNull(),
    status: text("status", { enum: ["started", "completed"] })
      .notNull()
      .default("started"),
    startedAt: text("started_at").notNull(),
    expiresAt: text("expires_at").notNull(),
    completedAt: text("completed_at"),
    durationSeconds: integer("duration_seconds"),
    rawScore: integer("raw_score"),
    classifiedMessages: integer("classified_messages").notNull().default(0),
    phishingReported: integer("phishing_reported").notNull().default(0),
    legitimateCompleted: integer("legitimate_completed").notNull().default(0),
    phishingProcessed: integer("phishing_processed").notNull().default(0),
    legitimateDiscarded: integer("legitimate_discarded").notNull().default(0),
    outcomesJson: text("outcomes_json"),
    validationVersion: integer("validation_version").notNull().default(1),
  },
  (table) => [
    index("idx_arcade_runs_account_game_status").on(
      table.accountId,
      table.gameId,
      table.status,
    ),
    index("idx_arcade_runs_game_score").on(
      table.gameId,
      table.status,
      table.rawScore,
    ),
    index("idx_arcade_runs_expires_at").on(table.expiresAt),
    check(
      "arcade_runs_status_check",
      sql`${table.status} IN ('started', 'completed')`,
    ),
    check(
      "arcade_runs_score_check",
      sql`${table.rawScore} IS NULL OR ${table.rawScore} BETWEEN -165 AND 155`,
    ),
    check(
      "arcade_runs_counts_check",
      sql`${table.classifiedMessages} BETWEEN 0 AND 12 AND ${table.phishingReported} BETWEEN 0 AND 7 AND ${table.legitimateCompleted} BETWEEN 0 AND 5 AND ${table.phishingProcessed} BETWEEN 0 AND 7 AND ${table.legitimateDiscarded} BETWEEN 0 AND 5`,
    ),
  ],
);

export const teamProtocolResponses = sqliteTable(
  "team_protocol_responses",
  {
    id: text("id").primaryKey(),
    accountId: text("account_id")
      .notNull()
      .references(() => accounts.id, { onDelete: "cascade" }),
    sectorId: text("sector_id").notNull(),
    periodId: text("period_id").notNull(),
    orderJson: text("order_json").notNull(),
    correct: integer("correct", { mode: "boolean" }).notNull(),
    submittedAt: text("submitted_at").notNull(),
  },
  (table) => [
    uniqueIndex("idx_team_protocol_account_sector_period").on(
      table.accountId, table.sectorId, table.periodId,
    ),
    index("idx_team_protocol_sector_period").on(table.sectorId, table.periodId),
  ],
);
