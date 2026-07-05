"use server";

import { user } from "@/lib/database/schema";
import { db } from "@/lib/db-edge";
import { getSession } from "@/lib/helper/get-session";
import { eq } from "drizzle-orm";

export const GetCurrentPlan = async () => {
  try {
    const session = await getSession();

    if (!session) {
      return {
        success: false,
        message: "Unauthorized",
      };
    }

    const plan = await db
      .select({
        currentPlan: user.currentPlan,
      })
      .from(user)
      .where(eq(user.id, session.user.id));

    return {
      success: true,
      data: plan[0].currentPlan,
    };
  } catch {
    return {
      success: false,
      message: "Failed to fetch current plan",
    };
  }
};

export const GetCurrentPlanFromId = async (userId: string) => {
  try {
    const plan = await db
      .select({
        currentPlan: user.currentPlan,
      })
      .from(user)
      .where(eq(user.id, userId));

    return {
      success: true,
      data: plan[0].currentPlan,
    };
  } catch {
    return {
      success: false,
      message: "Failed to fetch current plan",
    };
  }
};

export const GetCapsuleLimitInfo = async () => {
  try {
    const session = await getSession();

    if (!session) {
      return {
        success: false,
        message: "You need to be logged in to check quota.",
      };
    }

    const userData = await db
      .select({
        capsulesCount: user.capsulesCount,
        currentPlan: user.currentPlan,
      })
      .from(user)
      .where(eq(user.id, session.user.id));

    const { capsulesCount, currentPlan } = userData[0];

    const planLimits = {
      free: 4,
      basic: 8,
      premium: 12,
    };

    if (capsulesCount >= planLimits[currentPlan]) {
      return {
        success: false,
        message: `You have reached your ${currentPlan} plan limit of ${planLimits[currentPlan]} capsules. Upgrade your plan to create more.`,
      };
    }

    return {
      success: true,
      message: "You have available quota to create more capsules.",
    };
  } catch {
    return {
      success: false,
      message: "Failed to check quota",
    };
  }
};
