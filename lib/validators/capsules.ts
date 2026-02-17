import { z } from "zod";

export const CapsuleSchema = z
  .object({
    title: z.string().min(1, "Title must be at least 1 characters"),
    category: z
      .string()
      .min(3, "Category must be at least 1 characters")
      .max(30, "Category must be at max 30 characters"),
    content: z.string().min(1, "Content must be at least 1 characters"),
    unlockDate: z.date(),
    unlockTime: z.string(),
    status: z.enum(["locked", "unlocked"]),
    hint: z.string().max(100, "Hint must be at max 100 characters"),
    recipientEmail: z.email(),

    //    Check for file exist also (will be implemented later)
  })
  .superRefine((data, ctx) => {
    const { unlockDate, unlockTime } = data;

    // Extract hours and minutes from time string
    const [hours, minutes] = unlockTime.split(":").map(Number);

    // Combine date + time
    const selectedDateTime = new Date(unlockDate);
    selectedDateTime.setHours(hours, minutes, 0, 0);

    const now = new Date();

    if (selectedDateTime <= now) {
      ctx.addIssue({
        code: "custom",
        message: "Unlock date and time must be in the future",
        path: ["unlockTime"],
      });
    }
  });

export type TCapsuleSchema = z.infer<typeof CapsuleSchema>;
