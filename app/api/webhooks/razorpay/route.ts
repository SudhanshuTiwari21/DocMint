import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import { verifyWebhookSignature } from "@/lib/razorpay";

const WEBHOOK_SECRET = process.env.RAZORPAY_WEBHOOK_SECRET;
const PLAN_YEARLY_ID = process.env.RAZORPAY_PLAN_YEARLY_ID;

type WebhookPayload = {
  event: string;
  payload?: {
    subscription?: {
      id: string;
      status?: string;
      notes?: Record<string, string>;
      plan_id?: string;
      current_start?: number;
      current_end?: number;
    };
  };
};

export async function POST(request: Request) {
  if (!WEBHOOK_SECRET) {
    return NextResponse.json({ error: "Webhook not configured" }, { status: 503 });
  }

  const signature = request.headers.get("x-razorpay-signature");
  if (!signature) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  let rawBody: string;
  try {
    rawBody = await request.text();
  } catch {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }

  if (!verifyWebhookSignature(rawBody, signature, WEBHOOK_SECRET)) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  let data: WebhookPayload;
  try {
    data = JSON.parse(rawBody) as WebhookPayload;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const sub = data.payload?.subscription;
  const event = data.event;

  if (!sub?.id) {
    return NextResponse.json({ ok: true });
  }

  const subscriptionId = sub.id;
  const userId = sub.notes?.user_id;

  if (event === "subscription.cancelled" || event === "subscription.completed") {
    if (userId) {
      await query(
        `UPDATE users SET tier = 'free', subscription_ends_at = NULL, plan_interval = NULL, updated_at = NOW() WHERE id = $1`,
        [userId]
      );
    }
    await query(
      `UPDATE subscriptions SET status = $1, updated_at = NOW() WHERE razorpay_subscription_id = $2`,
      [event === "subscription.cancelled" ? "cancelled" : "completed", subscriptionId]
    );
  } else if (event === "subscription.charged" && sub.current_end) {
    const currentEnd = new Date(sub.current_end * 1000);
    const planInterval = PLAN_YEARLY_ID && sub.plan_id === PLAN_YEARLY_ID ? "yearly" : "monthly";
    await query(
      `UPDATE subscriptions SET status = 'active', current_start = to_timestamp($1), current_end = $2, updated_at = NOW()
       WHERE razorpay_subscription_id = $3`,
      [sub.current_start ?? 0, currentEnd, subscriptionId]
    );
    if (userId) {
      await query(
        `UPDATE users SET tier = 'premium', subscription_ends_at = $1, plan_interval = $2, updated_at = NOW() WHERE id = $3`,
        [currentEnd, planInterval, userId]
      );
    }
  }

  return NextResponse.json({ ok: true });
}
