import { NextResponse } from "next/server";
import { getPremiumCookie, verifyPremiumToken } from "@/lib/auth";

export async function GET() {
  try {
    const token = await getPremiumCookie();
    if (!token) {
      return NextResponse.json({ premium: false });
    }
    const payload = verifyPremiumToken(token);
    return NextResponse.json({ premium: payload !== null });
  } catch {
    return NextResponse.json({ premium: false });
  }
}
