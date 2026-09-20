CREATE TABLE IF NOT EXISTS `team_protocol_responses` (
  `id` text PRIMARY KEY NOT NULL,
  `account_id` text NOT NULL REFERENCES `accounts`(`id`) ON DELETE CASCADE,
  `sector_id` text NOT NULL,
  `period_id` text NOT NULL,
  `order_json` text NOT NULL,
  `correct` integer NOT NULL,
  `submitted_at` text NOT NULL
);
CREATE UNIQUE INDEX IF NOT EXISTS `idx_team_protocol_account_sector_period` ON `team_protocol_responses` (`account_id`, `sector_id`, `period_id`);
CREATE INDEX IF NOT EXISTS `idx_team_protocol_sector_period` ON `team_protocol_responses` (`sector_id`, `period_id`);
