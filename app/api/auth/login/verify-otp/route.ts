import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import { verifyAndDeleteOtp } from "@/lib/otp";
import { createSessionToken, setSessionCookie } from "@/lib/auth";

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.length <= 255;
}

function validateOtp(otp: string): boolean {
  return /^\d{6}$/.test(otp);
}

export async function POST(request: Request) {
  let body: { email?: string; otp?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const email = String(body.email ?? "").trim().toLowerCase();
  const otp = String(body.otp ?? "").trim();

  if (!validateEmail(email)) {
    return NextResponse.json({ error: "Valid email is required" }, { status: 400 });
  }
  if (!validateOtp(otp)) {
    return NextResponse.json({ error: "Valid 6-digit OTP is required" }, { status: 400 });
  }

  const valid = await verifyAndDeleteOtp(email, otp, "login");
  if (!valid) {
    return NextResponse.json({ error: "Invalid or expired OTP" }, { status: 400 });
  }

  const rows = await query<{ id: string; email: string; tier: string }[]>(
    `SELECT id, email, tier FROM users WHERE email = $1`,
    [email]
  );
  if (rows.length === 0) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const user = rows[0];
  const sessionToken = createSessionToken({ id: user.id, email: user.email, tier: user.tier });
  await setSessionCookie(sessionToken);

  return NextResponse.json({ success: true });
}
