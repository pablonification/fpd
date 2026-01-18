ALTER TABLE "researchers" ALTER COLUMN "role" SET DATA TYPE text;--> statement-breakpoint
DROP TYPE IF EXISTS "public"."researcher_role";
