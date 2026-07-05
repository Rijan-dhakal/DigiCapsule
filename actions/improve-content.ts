import { requirePremium } from "@/lib/helper/requiredPremium";

export const improveContent = async (content: string) => {
  if (!content || content.trim() === "") {
    return {
      success: false,
      message: "Content is empty. Please provide valid content to improve.",
    };
  }

  try {
    const planInfo = await requirePremium();

    if (!planInfo.success) {
      return {
        success: false,
        message: planInfo.message,
      };
    }

    if (planInfo.plan !== "premium") {
      return {
        success: false,
        message: "You need a premium plan to use this feature.",
      };
    }
  } catch (e) {
    console.error("Failed to improve content:", e);
    return {
      success: false,
      message: "An error occurred. Please try again.",
    };
  }
};
