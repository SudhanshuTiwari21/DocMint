import { query } from "./db";

const MAX_OTP_PER_HOUR = 5;
const MAX_SIGNUP_PER_HOUR = 5;

export async function checkOtpRateLimit(email: string, purpose: string): Promise<boolean> {
  const rows = await query<{ count: string }[]>(
    `SELECT COUNT(*) as count FROM otp_attempts WHERE email = $1 AND purpose = $2 AND created_at > NOW() - INTERVAL '1 hour'`,
    [email.toLowerCase(), purpose]
  );
  const count = Number(rows?.[0]?.count ?? 0);
  return count < MAX_OTP_PER_HOUR;
}

export async function recordOtpAttempt(email: string, purpose: string): Promise<void> {
  await query(
    `INSERT INTO otp_attempts (email, purpose) VALUES ($1, $2)`,
    [email.toLowerCase(), purpose]
  );
}

export async function checkSignupRateLimit(email: string): Promise<boolean> {
  const rows = await query<{ count: string }[]>(
    `SELECT COUNT(*) as count FROM otp_attempts WHERE email = $1 AND purpose = 'signup' AND created_at > NOW() - INTERVAL '1 hour'`,
    [email.toLowerCase()]
  );
  const count = Number(rows?.[0]?.count ?? 0);
  return count < MAX_SIGNUP_PER_HOUR;
}
