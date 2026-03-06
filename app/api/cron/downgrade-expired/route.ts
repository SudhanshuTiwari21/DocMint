import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import { sendSubscriptionEndedEmail } from "@/lib/email";

const CRON_SECRET = process.env.CRON_SECRET;

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");
  const url = new URL(request.url);
  const keyParam = url.searchParams.get("key");
  const authorized = CRON_SECRET && (authHeader === `Bearer ${CRON_SECRET}` || keyParam === CRON_SECRET);
  if (!authorized) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const rows = await query<{ user_id: string; email: string; first_name: string }[]>(
    `SELECT id AS user_id, email, first_name FROM users
     WHERE tier = 'premium'
       AND subscription_ends_at IS NOT NULL
       AND subscription_ends_at < NOW()`
  );

  for (const row of rows) {
    try {
      await query(
        `UPDATE users SET tier = 'free', subscription_ends_at = NULL, plan_interval = NULL, updated_at = NOW() WHERE id = $1`,
        [row.user_id]
      );
      await sendSubscriptionEndedEmail(row.email, row.first_name);
    } catch (err) {
      console.error("[cron/downgrade-expired]", row.user_id, err);
    }
  }

  return NextResponse.json({ ok: true, downgraded: rows.length });
}
