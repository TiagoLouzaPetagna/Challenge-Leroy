UPDATE `accounts`
SET `password_hash` = 'bbc29f7c42f558055551288fd864dbeae3217d9450d338170111a73e343f9b1f',
    `password_iterations` = 100000,
    `updated_at` = CURRENT_TIMESTAMP
WHERE `id` = 'account:marina-admin';
--> statement-breakpoint
UPDATE `accounts`
SET `password_hash` = '45994c8d8333396012eaaa9d44a63b14537b484a25dc1e3702172f2192d1ad98',
    `password_iterations` = 100000,
    `updated_at` = CURRENT_TIMESTAMP
WHERE `id` = 'account:lucas-learner';
--> statement-breakpoint
UPDATE `accounts`
SET `password_hash` = 'f64a8123062a39c51421439c40dfeb2d6016c30b8500172c280ac4b1b0013569',
    `password_iterations` = 100000,
    `updated_at` = CURRENT_TIMESTAMP
WHERE `id` = 'account:ana-learner';
