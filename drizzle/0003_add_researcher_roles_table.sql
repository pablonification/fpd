-- Create researcher_roles table
CREATE TABLE IF NOT EXISTS "researcher_roles" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"order" integer DEFAULT 999 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "researcher_roles_name_unique" UNIQUE("name")
);
--> statement-breakpoint

-- Insert initial roles with hierarchy order
INSERT INTO "researcher_roles" ("name", "order", "created_at", "updated_at") VALUES
('Principal Investigator', 1, now(), now()),
('Master''s Student', 2, now(), now()),
('Undergraduate Student', 3, now(), now()),
('Alumni Researcher', 4, now(), now()),
('Collaborator', 5, now(), now())
ON CONFLICT ("name") DO NOTHING;
