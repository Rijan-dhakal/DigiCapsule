import { z } from "zod";

export const capsuleSchema = z.object({
  title: z.string().min(1, "Title must be at least 1 characters"),
  category: z
    .string()
    .min(3, "Category must be at least 1 characters")
    .max(30, "Category must be at max 30 characters"),
  content: z.string().min(1, "Content must be at least 1 characters"),
  unlockAt: z.iso.datetime(),
  status: z.enum(["locked", "unlocked"]),
  hint: z.string().max(100, "Hint must be at max 100 characters"),
  recipientEmail: z.email(),

  //    Check for file exist also (will be implemented later)
});

export type TCapsuleSchema = z.infer<typeof capsuleSchema>;
