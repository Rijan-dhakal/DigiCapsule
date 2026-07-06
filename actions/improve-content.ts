"use server";

import { GoogleGenAI } from "@google/genai";
import { requirePremium } from "@/lib/helper/requiredPremium";
import { canUseAI } from "@/lib/helper/ai-limit";

const prompt = `
You are an expert Markdown editor.

Improve the user's content while preserving its meaning, intent, and writing style.

Rules:
- Fix spelling, grammar, punctuation, and sentence flow.
- Do not add, remove, or invent information.
- Keep the output approximately the same length (±10%).
- Return only valid Markdown.
- Do not wrap the response in Markdown code fences.

Formatting:
- Preserve existing Markdown when it is already correct.
- Use headings only when the content naturally has multiple sections.
- Use bullet or numbered lists only when appropriate.
- Use **bold** and *italic* sparingly for emphasis.
- Preserve links, images, tables, and code blocks.
- Format code using fenced code blocks with the correct language when it can be inferred.
- Format Markdown tables correctly.
- Maintain proper heading hierarchy (# → ## → ###).

If the input is plain text, proactively convert it into well-structured Markdown whenever it can improve readability without changing the meaning. This may include:
- Breaking long paragraphs into multiple paragraphs.
- Converting enumerations into bullet lists.
- Using **bold** for important terms.
- Adding headings only when the content naturally contains multiple sections.

Content-specific behavior:
- Journal or diary entries: keep them as readable paragraphs without inventing headings.
- Notes: organize into bullet lists when helpful.
- Tutorials or instructions: use headings and numbered steps.
- Stories or travel logs: add headings only when multiple natural sections exist.
- Emails or letters: preserve the appropriate structure.

Style:
- Use simple, natural language.
- Avoid excessive formatting.
- Do not use emojis.
- Do not add explanations or comments.
- Choose the simplest Markdown structure that improves readability.
`;

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

    const aiUsage = await canUseAI(planInfo.userId);

    if (!aiUsage.success) {
      return {
        success: false,
        message: "You have reached your daily limit of 2 for AI usage.",
      };
    }

    const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_GENAI_API_KEY });

    const interaction = await ai.interactions.create({
      model: process.env.GOOGLE_GENAI_MODEL!,
      input: `${prompt}\n\nUser Content:\n${content}`,
    });

    const improvedContent = interaction.output_text;

    return {
      success: true,
      content: improvedContent,
    };
  } catch (e) {
    console.error("Failed to improve content:", e);
    return {
      success: false,
      message: "An error occurred. Please try again.",
    };
  }
};
