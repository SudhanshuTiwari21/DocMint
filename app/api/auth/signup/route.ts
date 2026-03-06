import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import { sendVerificationEmail, getVerificationLink } from "@/lib/email";
import { createVerificationToken } from "@/lib/verification";
import { checkSignupRateLimit, recordOtpAttempt } from "@/lib/rateLimit";

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.length <= 255;
}

function validateName(name: string, maxLen: number): boolean {
  return typeof name === "string" && name.trim().length >= 1 && name.trim().length <= maxLen;
}

export async function POST(request: Request) {
  let body: { firstName?: string; lastName?: string; email?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const firstName = String(body.firstName ?? "").trim();
  const lastName = String(body.lastName ?? "").trim();
  const email = String(body.email ?? "").trim().toLowerCase();

  if (!validateName(firstName, 100) || !validateName(lastName, 100)) {
    return NextResponse.json(
      { error: "First name and last name are required (max 100 characters each)" },
      { status: 400 }
    );
  }
  if (!validateEmail(email)) {
    return NextResponse.json({ error: "Valid email is required" }, { status: 400 });
  }

  const canProceed = await checkSignupRateLimit(email);
  if (!canProceed) {
    return NextResponse.json(
      { error: "Too many signup attempts. Please try again later." },
      { status: 429 }
    );
  }

  try {
    const existing = await query<{ email_verified_at: string | null }[]>(
      `SELECT email_verified_at FROM users WHERE email = $1`,
      [email]
    );

    if (existing.length > 0) {
      if (existing[0].email_verified_at != null) {
        return NextResponse.json(
          { error: "You have already signed up. Please log in." },
          { status: 409 }
        );
      }
      await query(
        `UPDATE users SET first_name = $1, last_name = $2, updated_at = NOW() WHERE email = $3`,
        [firstName, lastName, email]
      );
    } else {
      await query(
        `INSERT INTO users (email, first_name, last_name, email_verified_at, tier)
         VALUES ($1, $2, $3, NULL, 'free')`,
        [email, firstName, lastName]
      );
    }

    const token = createVerificationToken(email);
    const link = getVerificationLink(token);
    await sendVerificationEmail(email, link);

    await recordOtpAttempt(email, "signup");

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[signup]", err);
    return NextResponse.json({ error: "Failed to sign up" }, { status: 500 });
  }
}
