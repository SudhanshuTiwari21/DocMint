import crypto from "crypto";

/**
 * Verifies Razorpay subscription payment signature.
 * Signature is HMAC SHA256 of (subscription_id + "|" + payment_id) with key_secret.
 */
export function verifySubscriptionPaymentSignature(
  subscriptionId: string,
  paymentId: string,
  signature: string,
  keySecret: string
): boolean {
  const body = `${subscriptionId}|${paymentId}`;
  const expected = crypto
    .createHmac("sha256", keySecret)
    .update(body)
    .digest("hex");
  return expected === signature;
}
