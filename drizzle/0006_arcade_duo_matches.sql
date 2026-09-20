CREATE TABLE IF NOT EXISTS `arcade_duo_matches` (
  `id` text PRIMARY KEY NOT NULL,
  `host_run_id` text NOT NULL UNIQUE REFERENCES `arcade_runs`(`id`) ON DELETE CASCADE,
  `guest_run_id` text NOT NULL UNIQUE REFERENCES `arcade_runs`(`id`) ON DELETE CASCADE
);
CREATE INDEX IF NOT EXISTS `idx_arcade_duo_matches_guest_run` ON `arcade_duo_matches` (`guest_run_id`);
