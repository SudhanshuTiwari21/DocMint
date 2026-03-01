import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const COOKIE_NAME = "docera_premium";
const SESSION_COOKIE = "dockera_session";
const PREMIUM_EXPIRY_DAYS = 30;
const SESSION_EXPIRY_DAYS = 7;

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

export type SessionPayload = {
  sub: string; // user id
  email: string;
  tier: string;
  iat: number;
  exp: number;
};

// --- Premium cookie (backward compatibility) ---
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

// --- Session (user auth) ---
export function createSessionToken(user: { id: string; email: string; tier: string }): string {
  return jwt.sign(
    { sub: user.id, email: user.email, tier: user.tier } as SessionPayload,
    getSecret(),
    { expiresIn: `${SESSION_EXPIRY_DAYS}d` }
  );
}

export function verifySessionToken(token: string): SessionPayload | null {
  try {
    const decoded = jwt.verify(token, getSecret()) as SessionPayload & { iat?: number; exp?: number };
    return { sub: decoded.sub, email: decoded.email, tier: decoded.tier, iat: decoded.iat!, exp: decoded.exp! };
  } catch {
    return null;
  }
}

export async function setSessionCookie(token: string): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: SESSION_EXPIRY_DAYS * 24 * 60 * 60,
    path: "/",
  });
}

export async function getSessionCookie(): Promise<string | undefined> {
  const cookieStore = await cookies();
  return cookieStore.get(SESSION_COOKIE)?.value;
}

export async function clearSessionCookie(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
}

export async function getSession(): Promise<SessionPayload | null> {
  const token = await getSessionCookie();
  if (!token) return null;
  return verifySessionToken(token);
}

export { COOKIE_NAME, SESSION_COOKIE };
