import crypto from "crypto";
import { query } from "./db";

const OTP_EXPIRY_MINUTES = 10;

function hashOtp(otp: string): string {
  const secret = process.env.JWT_SECRET ?? "fallback";
  return crypto.createHash("sha256").update(otp + secret).digest("hex");
}

function generateOtp(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export function createOtp(): string {
  return generateOtp();
}

export async function storeOtp(email: string, otp: string, purpose = "login"): Promise<void> {
  const normalizedEmail = email.toLowerCase();
  await query(`DELETE FROM otp_tokens WHERE email = $1 AND purpose = $2`, [normalizedEmail, purpose]);
  const otpHash = hashOtp(otp);
  const expiresAt = new Date(Date.now() + OTP_EXPIRY_MINUTES * 60 * 1000);
  await query(
    `INSERT INTO otp_tokens (email, otp_hash, purpose, expires_at) VALUES ($1, $2, $3, $4)`,
    [normalizedEmail, otpHash, purpose, expiresAt]
  );
}

export async function verifyAndDeleteOtp(email: string, otp: string, purpose = "login"): Promise<boolean> {
  const otpHash = hashOtp(otp);
  const rows = await query<{ id: number }[]>(
    `SELECT id FROM otp_tokens WHERE email = $1 AND otp_hash = $2 AND purpose = $3 AND expires_at > NOW()`,
    [email.toLowerCase(), otpHash, purpose]
  );
  if (rows.length === 0) return false;
  await query(`DELETE FROM otp_tokens WHERE id = $1`, [rows[0].id]);
  return true;
}
