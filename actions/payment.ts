"use server";

import { payments, user } from "@/lib/database/schema";
import { db } from "@/lib/db-edge";
import { getSession } from "@/lib/helper/get-session";
import { createHmac } from "crypto";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

interface EsewaPaymentParams {
  transaction_uuid: string;
  amount: number;
  signature: string;
  plan: "basic" | "premium";
}

export const EsewaPayment = async (
  price: number,
  targetPlan: "basic" | "premium",
) => {
  const session = await getSession();
  if (!session) {
    throw new Error("User not authenticated");
  }

  const userId = session.user.id;

  const userRecord = await db
    .select()
    .from(user)
    .where(eq(user.id, userId))
    .limit(1);

  let finalPrice = price;
  if (
    targetPlan === "premium" &&
    userRecord[0] &&
    userRecord[0].currentPlan === "basic"
  ) {
    finalPrice = price - 199;
  }

  const transactionUuid = `TXN-${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
  const productCode = process.env.ESEWA_PRODUCT_CODE!;
  const secretKey = process.env.ESEWA_SECRET_KEY!;

  const message = `total_amount=${finalPrice},transaction_uuid=${transactionUuid},product_code=${productCode}`;

  const signature = createHmac("sha256", secretKey)
    .update(message)
    .digest("base64");

  await CreatePaymentAction({
    amount: finalPrice,
    transaction_uuid: transactionUuid,
    signature: signature,
    plan: targetPlan,
  });

  return {
    amount: finalPrice,
    tax_amount: 0,
    total_amount: finalPrice,
    transaction_uuid: transactionUuid,
    product_code: productCode,
    product_service_charge: 0,
    product_delivery_charge: 0,
    success_url: process.env.ESEWA_SUCCESS_URL!,
    failure_url: process.env.ESEWA_FAILURE_URL!,
    signed_field_names: "total_amount,transaction_uuid,product_code",
    signature,
  };
};

export const VerifyEsewaPayment = async (encodedData: string) => {
  const decodedString = Buffer.from(encodedData, "base64").toString("utf-8");

  const data = JSON.parse(decodedString);

  const paymentRecord = await db
    .select()
    .from(payments)
    .where(eq(payments.transaction_uuid, data.transaction_uuid))
    .limit(1);

  if (!paymentRecord[0]) {
    throw new Error("Payment record not found");
  }

  const payment = paymentRecord[0];

  if (Number(payment.amount) !== Number(data.total_amount)) {
    return false;
  }

  if (data.status !== "COMPLETE") {
    return false;
  }

  const signedFieldNames = String(data.signed_field_names ?? "")
    .split(",")
    .map((field) => field.trim())
    .filter(Boolean);

  if (!signedFieldNames.length) {
    return false;
  }

  const message = signedFieldNames
    .map((fieldName) => {
      const fieldValue = data[fieldName as keyof typeof data];

      if (fieldValue === undefined || fieldValue === null) {
        return null;
      }

      return `${fieldName}=${fieldValue}`;
    })
    .filter((part): part is string => Boolean(part))
    .join(",");

  if (!message) {
    return false;
  }

  const expectedSignature = createHmac("sha256", process.env.ESEWA_SECRET_KEY!)
    .update(message)
    .digest("base64");

  if (expectedSignature === data.signature) {
    const currentPlan = payment.plan;

    await db
      .update(payments)
      .set({ payment_status: "success" })
      .where(eq(payments.transaction_uuid, data.transaction_uuid));

    await db
      .update(user)
      .set({ currentPlan: currentPlan })
      .where(eq(user.id, payment.userId));

    revalidatePath("/settings/upgrade");

    return true;
  } else {
    await db
      .update(payments)
      .set({ payment_status: "failed" })
      .where(eq(payments.transaction_uuid, data.transaction_uuid));
    return false;
  }
};

export const CreatePaymentAction = async ({
  transaction_uuid,
  amount,
  signature,
  plan,
}: EsewaPaymentParams) => {
  try {
    // Get session and userId from the session itself
    const session = await getSession();
    if (!session?.user?.id) {
      throw new Error("User not authenticated");
    }

    const userId = session.user.id;

    await db
      .insert(payments)
      .values({
        userId: userId,
        transaction_uuid: transaction_uuid,
        amount: String(amount),
        signature: signature,
        payment_status: "pending",
        plan: plan ?? "premium",
      })
      .onConflictDoNothing();
  } catch (error) {
    console.error("Error creating payment record:", error);
    throw new Error("Failed to create payment record");
  }
};
