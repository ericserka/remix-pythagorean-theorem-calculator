CREATE TABLE `calculation_history` (
	`id` integer PRIMARY KEY NOT NULL,
	`side_a` real NOT NULL,
	`side_b` real NOT NULL,
	`hypotenuse` real NOT NULL,
	`timestamp` text DEFAULT CURRENT_TIMESTAMP
);
