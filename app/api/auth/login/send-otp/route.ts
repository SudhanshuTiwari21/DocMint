import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import { sendOtpEmail } from "@/lib/email";
import { createOtp, storeOtp } from "@/lib/otp";
import { checkOtpRateLimit, recordOtpAttempt } from "@/lib/rateLimit";

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.length <= 255;
}

export async function POST(request: Request) {
  let body: { email?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const email = String(body.email ?? "").trim().toLowerCase();
  if (!validateEmail(email)) {
    return NextResponse.json({ error: "Valid email is required" }, { status: 400 });
  }

  const canProceed = await checkOtpRateLimit(email, "login");
  if (!canProceed) {
    return NextResponse.json(
      { error: "Too many OTP requests. Please try again in an hour." },
      { status: 429 }
    );
  }

  const rows = await query<{ id: string; email_verified_at: string | null }[]>(
    `SELECT id, email_verified_at FROM users WHERE email = $1`,
    [email]
  );
  if (rows.length === 0) {
    return NextResponse.json({ error: "No account found with this email. Please sign up first." }, { status: 404 });
  }
  if (rows[0].email_verified_at == null) {
    return NextResponse.json(
      { error: "Please verify your email first. Check your inbox for the verification link." },
      { status: 403 }
    );
  }

  try {
    const otp = createOtp();
    await storeOtp(email, otp, "login");
    await sendOtpEmail(email, otp);
    await recordOtpAttempt(email, "login");

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[send-otp]", err);
    return NextResponse.json({ error: "Failed to send OTP" }, { status: 500 });
  }
}
