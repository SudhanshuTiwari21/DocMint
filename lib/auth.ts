import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const COOKIE_NAME = "docmint_premium";
const PREMIUM_EXPIRY_DAYS = 30;

function getSecret(): string {
  const secret = process.env.JWT_SECRET;
  if (!secret || secret.length < 32) {
    throw new Error("JWT_SECRET must be set and at least 32 characters");
  }
  return secret;
}

export type PremiumPayload = {
  premium: true;
  iat: number;
  exp: number;
};

export function createPremiumToken(): string {
  const secret = getSecret();
  const now = Math.floor(Date.now() / 1000);
  const exp = now + PREMIUM_EXPIRY_DAYS * 24 * 60 * 60;
  return jwt.sign(
    { premium: true } as PremiumPayload,
    secret,
    { expiresIn: `${PREMIUM_EXPIRY_DAYS}d` }
  );
}

export function verifyPremiumToken(token: string): PremiumPayload | null {
  try {
    const secret = getSecret();
    const payload = jwt.verify(token, secret) as PremiumPayload & { iat?: number; exp?: number };
    if (payload.premium === true) {
      return { premium: true, iat: payload.iat!, exp: payload.exp! };
    }
    return null;
  } catch {
    return null;
  }
}

export async function setPremiumCookie(token: string): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: PREMIUM_EXPIRY_DAYS * 24 * 60 * 60,
    path: "/",
  });
}

export async function getPremiumCookie(): Promise<string | undefined> {
  const cookieStore = await cookies();
  return cookieStore.get(COOKIE_NAME)?.value;
}

export { COOKIE_NAME };
