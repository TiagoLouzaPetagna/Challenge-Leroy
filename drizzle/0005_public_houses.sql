CREATE TABLE IF NOT EXISTS `public_houses` (
  `account_id` text PRIMARY KEY NOT NULL REFERENCES `accounts`(`id`) ON DELETE CASCADE,
  `profile_id` text UNIQUE NOT NULL,
  `nickname` text NOT NULL,
  `sector_id` text NOT NULL,
  `sector_name` text NOT NULL,
  `avatar_url` text,
  `thumbnail_url` text,
  `theme` text NOT NULL,
  `scene_json` text NOT NULL,
  `updated_at` text NOT NULL
);
CREATE INDEX IF NOT EXISTS `idx_public_houses_sector` ON `public_houses` (`sector_id`, `updated_at`);
