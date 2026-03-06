import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import { sendRenewalReminderEmail } from "@/lib/email";

const CRON_SECRET = process.env.CRON_SECRET;

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");
  const url = new URL(request.url);
  const keyParam = url.searchParams.get("key");
  const authorized = CRON_SECRET && (authHeader === `Bearer ${CRON_SECRET}` || keyParam === CRON_SECRET);
  if (!authorized) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const rows = await query<{
    subscription_id: string;
    user_id: string;
    email: string;
    first_name: string;
    current_end: string;
    razorpay_plan_id: string;
  }[]>(
    `SELECT s.razorpay_subscription_id AS subscription_id, s.user_id, u.email, u.first_name, s.current_end::text, s.razorpay_plan_id
     FROM subscriptions s
     JOIN users u ON u.id = s.user_id
     WHERE s.status = 'active'
       AND s.current_end IS NOT NULL
       AND s.current_end > NOW()
       AND s.current_end <= NOW() + INTERVAL '7 days'
       AND s.renewal_reminder_sent_at IS NULL`
  );

  const planLabel = (planId: string | null) => {
    const yearlyId = process.env.RAZORPAY_PLAN_YEARLY_ID;
    return yearlyId && planId === yearlyId ? "Pro (Yearly)" : "Pro (Monthly)";
  };

  for (const row of rows) {
    try {
      const renewalDate = new Date(row.current_end).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
      await sendRenewalReminderEmail(
        row.email,
        row.first_name,
        renewalDate,
        planLabel(row.razorpay_plan_id)
      );
      await query(
        `UPDATE subscriptions SET renewal_reminder_sent_at = NOW() WHERE razorpay_subscription_id = $1`,
        [row.subscription_id]
      );
    } catch (err) {
      console.error("[cron/renewal-reminders]", row.subscription_id, err);
    }
  }

  return NextResponse.json({ ok: true, sent: rows.length });
}
