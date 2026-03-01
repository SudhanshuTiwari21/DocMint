import { NextResponse } from "next/server";
import { verifySubscriptionPaymentSignature } from "@/lib/razorpay";
import { fetchSubscription } from "@/lib/razorpay";
import { query } from "@/lib/db";
import {
  createSessionToken,
  setSessionCookie,
  createPremiumToken,
  setPremiumCookie,
} from "@/lib/auth";

const keySecret = process.env.RAZORPAY_KEY_SECRET;

export async function POST(request: Request) {
  if (!keySecret) {
    return NextResponse.json({ error: "Server configuration error" }, { status: 503 });
  }

  let body: {
    razorpay_subscription_id?: string;
    razorpay_payment_id?: string;
    razorpay_signature?: string;
  };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const {
    razorpay_subscription_id: subscriptionId,
    razorpay_payment_id: paymentId,
    razorpay_signature: signature,
  } = body;

  if (!subscriptionId || !paymentId || !signature) {
    return NextResponse.json({ error: "Missing payment verification data" }, { status: 400 });
  }

  const isValid = verifySubscriptionPaymentSignature(
    subscriptionId,
    paymentId,
    signature,
    keySecret
  );
  if (!isValid) {
    return NextResponse.json({ error: "Invalid payment signature" }, { status: 400 });
  }

  const subscription = await fetchSubscription(subscriptionId);
  if (!subscription?.notes?.user_id) {
    return NextResponse.json({ error: "Could not verify subscription owner" }, { status: 400 });
  }

  const userId = subscription.notes.user_id;

  try {
    await query(
      `UPDATE users SET tier = 'premium', updated_at = NOW() WHERE id = $1`,
      [userId]
    );
    await query(
      `UPDATE subscriptions SET status = 'active', updated_at = NOW()
       WHERE razorpay_subscription_id = $1`,
      [subscriptionId]
    );
  } catch (err) {
    console.error("[subscription/verify]", err);
    return NextResponse.json({ error: "Failed to activate premium" }, { status: 500 });
  }

  const rows = await query<{ id: string; email: string; tier: string }[]>(
    `SELECT id, email, tier FROM users WHERE id = $1`,
    [userId]
  );
  if (rows.length === 0) {
    return NextResponse.json({ error: "User not found" }, { status: 500 });
  }

  const user = rows[0];
  const sessionToken = createSessionToken({ id: user.id, email: user.email, tier: "premium" });
  await setSessionCookie(sessionToken);
  const premiumToken = createPremiumToken();
  await setPremiumCookie(premiumToken);

  return NextResponse.json({ success: true });
}
