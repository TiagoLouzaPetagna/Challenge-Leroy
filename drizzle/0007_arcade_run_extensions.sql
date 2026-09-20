CREATE TABLE IF NOT EXISTS `arcade_run_extensions` (
  `run_id` text PRIMARY KEY NOT NULL REFERENCES `arcade_runs`(`id`) ON DELETE CASCADE,
  `actual_score` integer NOT NULL,
  `result_json` text NOT NULL
);
