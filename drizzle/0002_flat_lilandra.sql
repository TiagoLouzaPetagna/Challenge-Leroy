CREATE TABLE `arcade_runs` (
	`id` text PRIMARY KEY NOT NULL,
	`account_id` text NOT NULL,
	`game_id` text NOT NULL,
	`status` text DEFAULT 'started' NOT NULL,
	`started_at` text NOT NULL,
	`expires_at` text NOT NULL,
	`completed_at` text,
	`duration_seconds` integer,
	`raw_score` integer,
	`classified_messages` integer DEFAULT 0 NOT NULL,
	`phishing_reported` integer DEFAULT 0 NOT NULL,
	`legitimate_completed` integer DEFAULT 0 NOT NULL,
	`phishing_processed` integer DEFAULT 0 NOT NULL,
	`legitimate_discarded` integer DEFAULT 0 NOT NULL,
	`outcomes_json` text,
	`validation_version` integer DEFAULT 1 NOT NULL,
	FOREIGN KEY (`account_id`) REFERENCES `accounts`(`id`) ON UPDATE no action ON DELETE cascade,
	CONSTRAINT "arcade_runs_status_check" CHECK("arcade_runs"."status" IN ('started', 'completed')),
	CONSTRAINT "arcade_runs_score_check" CHECK("arcade_runs"."raw_score" IS NULL OR "arcade_runs"."raw_score" BETWEEN -165 AND 155),
	CONSTRAINT "arcade_runs_counts_check" CHECK("arcade_runs"."classified_messages" BETWEEN 0 AND 12 AND "arcade_runs"."phishing_reported" BETWEEN 0 AND 7 AND "arcade_runs"."legitimate_completed" BETWEEN 0 AND 5 AND "arcade_runs"."phishing_processed" BETWEEN 0 AND 7 AND "arcade_runs"."legitimate_discarded" BETWEEN 0 AND 5)
);
--> statement-breakpoint
CREATE INDEX `idx_arcade_runs_account_game_status` ON `arcade_runs` (`account_id`,`game_id`,`status`);--> statement-breakpoint
CREATE INDEX `idx_arcade_runs_game_score` ON `arcade_runs` (`game_id`,`status`,`raw_score`);--> statement-breakpoint
CREATE INDEX `idx_arcade_runs_expires_at` ON `arcade_runs` (`expires_at`);--> statement-breakpoint
PRAGMA optimize;
