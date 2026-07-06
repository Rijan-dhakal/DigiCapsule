import { GetCurrentPlan } from "@/actions/user-details";

export async function requirePremium() {
  const plan = await GetCurrentPlan();

  if (!plan.success) {
    return {
      success: false,
      message: "Failed to fetch current plan. Try again later.",
    };
  }

  if (plan.data !== "premium") {
    return {
      success: false,
      message: "You need a premium plan to access this feature.",
    };
  }

  return {
    success: true,
    plan: plan.data,
    userId: plan.userId,
  };
}
