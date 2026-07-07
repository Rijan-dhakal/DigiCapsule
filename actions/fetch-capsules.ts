"use server";

import { capsule, capsuleFiles } from "@/lib/database/schema";
import { db } from "@/lib/db-edge";
import { decrypt } from "@/lib/encryption";
import { getSession } from "@/lib/helper/get-session";
import { and, eq } from "drizzle-orm";

interface GetCapsuleByLinkParams {
  capsuleId: string;
  key: string;
}

export const GetUserCapsulesAction = async () => {
  const session = await getSession();

  if (!session) {
    return {
      success: false,
      message: "You need to be logged in to fetch capsules.",
      session: null,
    };
  }

  try {
    const userCapsules = await db
      .select({
        id: capsule.id,
        status: capsule.status,
        createdAt: capsule.createdAt,
        title: capsule.title,
        category: capsule.category,
        unlockAt: capsule.unlockAt,
        hint: capsule.hint,
        userId: capsule.userId,
        updatedAt: capsule.updatedAt,
        previewImageUrl: capsule.previewImageUrl,
      })
      .from(capsule)
      .where(eq(capsule.userId, session.user.id));

    return {
      success: true,
      data: userCapsules,
      session,
    };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to fetch user capsules.";
    console.error(message);

    return {
      success: false,
      message: "Failed to fetch user capsules",
      session,
    };
  }
};

export const GetCapsuleFromId = async ({
  capsuleId,
}: {
  capsuleId: string;
}) => {
  const session = await getSession();

  if (!session) {
    return {
      success: false,
      message: "You need to be logged in to fetch capsules.",
    };
  }

  try {
    const fetchedCapsule = await db
      .select()
      .from(capsule)
      .where(
        and(eq(capsule.id, capsuleId), eq(capsule.userId, session.user.id)),
      );

    if (fetchedCapsule) {
      fetchedCapsule.forEach((capsuleItem) => {
        if (capsuleItem.content) {
          capsuleItem.content = decrypt(capsuleItem.content);
        }
      });
    }

    return {
      success: true,
      data: fetchedCapsule,
    };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to fetch user capsules.";
    console.log(message);

    return {
      success: false,
      message: "Failed to fetch capsule",
    };
  }
};

export const GetCapsuleFiles = async ({ capsuleId }: { capsuleId: string }) => {
  const session = await getSession();

  if (!session) {
    return {
      success: false,
      message: "You need to be logged in to fetch capsule files.",
    };
  }

  try {
    const fetchedCapsuleFiles = await db
      .select()
      .from(capsuleFiles)
      .where(eq(capsuleFiles.capsuleId, capsuleId));

    return {
      success: true,
      data: fetchedCapsuleFiles,
    };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to fetch capsule files.";
    console.error(message);

    return {
      success: false,
      message: "Failed to fetch capsule files",
    };
  }
};

export const GetCapsuleFilesByLink = async ({
  capsuleId,
  accessKey,
}: {
  capsuleId: string;
  accessKey: string;
}) => {
  try {
    const capsuleData = await db
      .select({ accessKey: capsule.accessKey })
      .from(capsule)
      .where(eq(capsule.id, capsuleId))
      .limit(1);

    if (!capsuleData.length || capsuleData[0].accessKey !== accessKey) {
      return {
        success: false,
        message: "Invalid access key",
      };
    }

    const fetchedCapsuleFiles = await db
      .select()
      .from(capsuleFiles)
      .where(eq(capsuleFiles.capsuleId, capsuleId));

    return {
      success: true,
      data: fetchedCapsuleFiles,
    };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to fetch capsule files.";
    console.error(message);

    return {
      success: false,
      message: "Failed to fetch capsule files",
    };
  }
};

export const GetCapsuleByLink = async ({
  capsuleId,
  key,
}: GetCapsuleByLinkParams) => {
  try {
    const capsuleData = await db
      .select()
      .from(capsule)
      .where(eq(capsule.id, capsuleId));

    if (!capsuleData.length) {
      return { success: false, message: "Not found" };
    }

    const capsuleItem = capsuleData[0];

    if (capsuleItem.accessKey !== key) {
      return { success: false, message: "Invalid access key" };
    }

    if (capsuleItem.content) {
      capsuleItem.content = decrypt(capsuleItem.content);
    }

    return {
      success: true,
      data: capsuleItem,
    };
  } catch {
    return {
      success: false,
      message: "Failed to fetch capsule",
    };
  }
};
