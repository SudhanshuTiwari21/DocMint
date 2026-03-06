import crypto from "crypto";
import Razorpay from "razorpay";

const CURRENCY = "INR";
const PLAN_MONTHLY_AMOUNT_PAISE = 9900; // ₹99
const PLAN_YEARLY_AMOUNT_PAISE = 99000; // ₹990 (save 2 months)

export function getRazorpayInstance(): Razorpay {
  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;
  if (!keyId || !keySecret) throw new Error("Razorpay is not configured");
  return new Razorpay({ key_id: keyId, key_secret: keySecret });
}

export async function createPlan(interval: "monthly" | "yearly"): Promise<string> {
  const instance = getRazorpayInstance();
  const isYearly = interval === "yearly";
  const plan = await instance.plans.create({
    period: isYearly ? "yearly" : "monthly",
    interval: 1,
    item: {
      name: "Dockera Premium",
      amount: isYearly ? PLAN_YEARLY_AMOUNT_PAISE : PLAN_MONTHLY_AMOUNT_PAISE,
      currency: CURRENCY,
      description: isYearly
        ? "Premium access - Unlimited document processing (billed annually)"
        : "Premium access - Unlimited document processing (monthly)",
    },
  });
  return plan.id;
}

export async function createSubscription(planId: string, userId: string): Promise<string> {
  const instance = getRazorpayInstance();
  const subscription = await instance.subscriptions.create({
    plan_id: planId,
    quantity: 1,
    total_count: 12,
    notes: { user_id: userId },
  });
  return subscription.id;
}

export type SubscriptionDetails = {
  notes?: Record<string, string>;
  plan_id?: string;
  current_start?: number;
  current_end?: number;
  status?: string;
};

export async function fetchSubscription(subscriptionId: string): Promise<SubscriptionDetails | null> {
  try {
    const instance = getRazorpayInstance();
    const subscription = await instance.subscriptions.fetch(subscriptionId);
    return subscription as unknown as SubscriptionDetails;
  } catch {
    return null;
  }
}

/** Verify Razorpay webhook signature. Use raw request body (e.g. await request.text()). */
export function verifyWebhookSignature(rawBody: string, signature: string, webhookSecret: string): boolean {
  const expected = crypto.createHmac("sha256", webhookSecret).update(rawBody).digest("hex");
  return expected === signature;
}

/**
 * Verifies Razorpay subscription payment signature.
 * Per Razorpay docs: HMAC SHA256 of (razorpay_payment_id + "|" + subscription_id) with key_secret.
 * https://razorpay.com/docs/payments/subscriptions/integration-guide/#payment-verification
 */
export function verifySubscriptionPaymentSignature(
  subscriptionId: string,
  paymentId: string,
  signature: string,
  keySecret: string
): boolean {
  const body = `${paymentId}|${subscriptionId}`;
  const expected = crypto
    .createHmac("sha256", keySecret)
    .update(body)
    .digest("hex");
  return expected === signature;
}
