CREATE TABLE `workouts` (
	`id` text PRIMARY KEY NOT NULL,
	`type` text NOT NULL,
	`duration` integer NOT NULL,
	`intensity` text NOT NULL,
	`date` text NOT NULL,
	`notes` text
);
