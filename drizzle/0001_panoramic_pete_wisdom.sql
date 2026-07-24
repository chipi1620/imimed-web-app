CREATE TABLE `content_items` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`kind` text NOT NULL,
	`slug` text NOT NULL,
	`title` text NOT NULL,
	`summary` text DEFAULT '' NOT NULL,
	`status` text DEFAULT 'borrador' NOT NULL,
	`featured` integer DEFAULT false NOT NULL,
	`payload` text NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `content_items_slug_unique` ON `content_items` (`slug`);--> statement-breakpoint
ALTER TABLE `requests` ADD `role` text;--> statement-breakpoint
ALTER TABLE `requests` ADD `urgency` text;--> statement-breakpoint
ALTER TABLE `requests` ADD `equipment` text;--> statement-breakpoint
ALTER TABLE `requests` ADD `started_at` text;--> statement-breakpoint
ALTER TABLE `requests` ADD `quantity` integer;--> statement-breakpoint
ALTER TABLE `requests` ADD `operation` text;--> statement-breakpoint
ALTER TABLE `requests` ADD `condition` text;--> statement-breakpoint
ALTER TABLE `requests` ADD `estimated_date` text;--> statement-breakpoint
ALTER TABLE `requests` ADD `clinical_need` text;--> statement-breakpoint
ALTER TABLE `requests` ADD `accessories` text;--> statement-breakpoint
ALTER TABLE `requests` ADD `installation_required` integer DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE `requests` ADD `training_required` integer DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE `requests` ADD `maintenance_required` integer DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE `requests` ADD `context` text;