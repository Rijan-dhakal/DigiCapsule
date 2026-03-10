import { z } from "zod";

export const CapsuleSchema = z.object({
  title: z.string().min(1, "Title must be at least 1 character"),
  category: z
    .string()
    .min(3, "Category must be at least 3 characters")
    .max(30, "Category must be at most 30 characters"),
  content: z
    .string()
    .min(1, "Content must be at least 1 character")
    .max(10000, "Message is too long"),
  unlockAt: z
    .date({
      error: "Unlock date is required",
    })
    .refine((date) => date > new Date(), {
      message: "Unlock time must be in the future",
    }),
  hint: z.string().max(100, "Hint must be at most 100 characters").optional(),
  recipientEmail: z.email("Invalid Email"),
  capsulePassword: z
    .string()
    .min(4, "Password must be at least 4 characters")
    .max(16, "Password must be less than 16 characters"),
  files: z.array(z.instanceof(File)).optional(),
});

export type TCapsuleSchema = z.infer<typeof CapsuleSchema>;
