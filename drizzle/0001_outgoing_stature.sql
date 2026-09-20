CREATE TABLE `account_progress_summaries` (
	`account_id` text PRIMARY KEY NOT NULL,
	`total_points` integer DEFAULT 0 NOT NULL,
	`completed_activities` integer DEFAULT 0 NOT NULL,
	`completed_curriculum_activities` integer DEFAULT 0 NOT NULL,
	`completed_missions` integer DEFAULT 0 NOT NULL,
	`average_score` integer DEFAULT 0 NOT NULL,
	`leaderboard_participation` integer DEFAULT false NOT NULL,
	`leaderboard_identity` text DEFAULT 'initials' NOT NULL,
	`last_activity_at` text,
	`updated_at` text NOT NULL,
	FOREIGN KEY (`account_id`) REFERENCES `accounts`(`id`) ON UPDATE no action ON DELETE cascade,
	CONSTRAINT "progress_summaries_identity_check" CHECK("account_progress_summaries"."leaderboard_identity" IN ('initials', 'displayName', 'anonymous')),
	CONSTRAINT "progress_summaries_nonnegative_check" CHECK("account_progress_summaries"."total_points" >= 0 AND "account_progress_summaries"."completed_activities" >= 0 AND "account_progress_summaries"."completed_curriculum_activities" >= 0 AND "account_progress_summaries"."completed_missions" >= 0 AND "account_progress_summaries"."average_score" >= 0)
);
--> statement-breakpoint
CREATE INDEX `idx_progress_summaries_points` ON `account_progress_summaries` (`leaderboard_participation`,`total_points`);--> statement-breakpoint
CREATE INDEX `idx_progress_summaries_updated_at` ON `account_progress_summaries` (`updated_at`);--> statement-breakpoint
PRAGMA optimize;
