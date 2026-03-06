import { NextResponse } from "next/server";
import { getPremiumCookie, verifyPremiumToken, getSession } from "@/lib/auth";
import { query } from "@/lib/db";

export async function GET() {
  try {
    const session = await getSession();
    const userId = session?.sub ?? null;
    if (session?.tier === "premium" && userId) {
      const rows = await query<{ subscription_ends_at: Date | null }[]>(
        `SELECT subscription_ends_at FROM users WHERE id = $1`,
        [userId]
      );
      const endsAt = rows[0]?.subscription_ends_at ?? null;
      const stillPremium = endsAt === null || new Date(endsAt) > new Date();
      if (stillPremium) {
        return NextResponse.json({ premium: true, userId });
      }
    }
    const token = await getPremiumCookie();
    if (!token) {
      return NextResponse.json({ premium: false, userId });
    }
    const payload = verifyPremiumToken(token);
    return NextResponse.json({ premium: payload !== null, userId });
  } catch {
    return NextResponse.json({ premium: false, userId: null });
  }
}
