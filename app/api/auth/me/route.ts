import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { query } from "@/lib/db";

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ user: null }, { status: 200 });
  }

  const rows = await query<{ id: string; email: string; first_name: string; last_name: string; tier: string }[]>(
    `SELECT id, email, first_name, last_name, tier FROM users WHERE id = $1`,
    [session.sub]
  );

  if (rows.length === 0) {
    return NextResponse.json({ user: null }, { status: 200 });
  }

  return NextResponse.json({
    user: {
      id: rows[0].id,
      email: rows[0].email,
      firstName: rows[0].first_name,
      lastName: rows[0].last_name,
      tier: rows[0].tier,
    },
  });
}
