import { redis } from "../redis";

export async function canUseAI(userId: string) {
  const today = new Date().toISOString().split("T")[0];

  const key = `ai_usage:${userId}:${today}`;

  const usageCount = await redis.get<number>(key);

  if (usageCount && usageCount >= 2) {
    return {
      success: false,
      remaining: 0,
    };
  }

  if (!usageCount) {
    await redis.set(key, 1, {
      ex: 60 * 60 * 24,
    });
  } else {
    await redis.incr(key);
  }

  return {
    success: true,
    remaining: 1 - (usageCount ?? 0),
  };
}
