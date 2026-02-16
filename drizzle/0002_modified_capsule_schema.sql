ALTER TABLE "capsule" ADD COLUMN "isDelivered" boolean DEFAULT false NOT NULL;--> statement-breakpoint
CREATE INDEX "capsule_userId_idx" ON "capsule" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "capsule_unlockAt_idx" ON "capsule" USING btree ("unlock_at");--> statement-breakpoint
CREATE INDEX "capsule_status_idx" ON "capsule" USING btree ("status");--> statement-breakpoint
CREATE INDEX "capsuleFiles_capsuleId_idx" ON "capsule_files" USING btree ("capsule_id");