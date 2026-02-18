import { NextResponse } from "next/server";
import { verifySubscriptionPaymentSignature } from "@/lib/razorpay";
import { createPremiumToken, setPremiumCookie } from "@/lib/auth";

export async function POST(request: Request) {
  const keySecret = process.env.RAZORPAY_KEY_SECRET;
  const jwtSecret = process.env.JWT_SECRET;

  if (!keySecret || !jwtSecret) {
    return NextResponse.json(
      { error: "Server configuration error" },
      { status: 503 }
    );
  }

  let body: {
    razorpay_subscription_id?: string;
    razorpay_payment_id?: string;
    razorpay_signature?: string;
  };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }

  const {
    razorpay_subscription_id: subscriptionId,
    razorpay_payment_id: paymentId,
    razorpay_signature: signature,
  } = body;

  if (!subscriptionId || !paymentId || !signature) {
    return NextResponse.json(
      { error: "Missing payment verification data" },
      { status: 400 }
    );
  }

  const isValid = verifySubscriptionPaymentSignature(
    subscriptionId,
    paymentId,
    signature,
    keySecret
  );

  if (!isValid) {
    return NextResponse.json(
      { error: "Invalid payment signature" },
      { status: 400 }
    );
  }

  try {
    const token = createPremiumToken();
    await setPremiumCookie(token);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[verify-payment]", err);
    return NextResponse.json(
      { error: "Failed to activate premium" },
      { status: 500 }
    );
  }
}
