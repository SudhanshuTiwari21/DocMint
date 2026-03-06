import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import { verifyVerificationToken } from "@/lib/verification";
import { createSessionToken, setSessionCookie } from "@/lib/auth";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://dockera.in";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("token");

  if (!token) {
    return Response.redirect(`${SITE_URL}/login?error=missing-token`);
  }

  const payload = verifyVerificationToken(token);
  if (!payload || payload.purpose !== "verify-email") {
    return Response.redirect(`${SITE_URL}/login?error=invalid-token`);
  }

  try {
    const rows = await query<{ id: string; email: string; tier: string }[]>(
      `UPDATE users SET email_verified_at = NOW(), updated_at = NOW()
       WHERE email = $1
       RETURNING id, email, tier`,
      [payload.email]
    );

    if (rows.length === 0) {
      return Response.redirect(`${SITE_URL}/login?error=user-not-found`);
    }

    const user = rows[0];
    const sessionToken = createSessionToken({ id: user.id, email: user.email, tier: user.tier });
    await setSessionCookie(sessionToken);

    return Response.redirect(`${SITE_URL}/?verified=1`);
  } catch (err) {
    console.error("[verify-email]", err);
    return Response.redirect(`${SITE_URL}/login?error=server-error`);
  }
}
