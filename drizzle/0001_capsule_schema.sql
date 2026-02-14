CREATE TYPE "public"."status" AS ENUM('unlocked', 'locked');--> statement-breakpoint
CREATE TABLE "capsule" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" text NOT NULL,
	"title" text NOT NULL,
	"category" varchar(30) NOT NULL,
	"content" text NOT NULL,
	"unlock_at" timestamp with time zone NOT NULL,
	"status" "status" DEFAULT 'locked' NOT NULL,
	"hint" varchar(100),
	"recipient_email" varchar(100),
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "capsule_files" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"capsule_id" uuid NOT NULL,
	"url" text NOT NULL,
	"public_id" varchar(255) NOT NULL,
	"file_type" varchar(50) NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "capsule" ADD CONSTRAINT "capsule_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "capsule_files" ADD CONSTRAINT "capsule_files_capsule_id_capsule_id_fk" FOREIGN KEY ("capsule_id") REFERENCES "public"."capsule"("id") ON DELETE cascade ON UPDATE no action;