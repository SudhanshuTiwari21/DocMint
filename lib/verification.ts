import jwt from "jsonwebtoken";

const VERIFICATION_EXPIRY_HOURS = 24;

function getSecret(): string {
  const secret = process.env.JWT_SECRET;
  if (!secret || secret.length < 32) {
    throw new Error("JWT_SECRET must be set and at least 32 characters");
  }
  return secret;
}

export type VerificationPayload = {
  email: string;
  purpose: "verify-email";
  iat: number;
  exp: number;
};

export function createVerificationToken(email: string): string {
  return jwt.sign(
    { email: email.toLowerCase(), purpose: "verify-email" } as VerificationPayload,
    getSecret(),
    { expiresIn: `${VERIFICATION_EXPIRY_HOURS}h` }
  );
}

export function verifyVerificationToken(token: string): VerificationPayload | null {
  try {
    const decoded = jwt.verify(token, getSecret()) as VerificationPayload;
    if (decoded.purpose === "verify-email" && decoded.email) {
      return decoded;
    }
    return null;
  } catch {
    return null;
  }
}
