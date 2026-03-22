import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { query } from "@/lib/db";
import { checkChatUsage, FREE_DOC_LIMIT } from "@/lib/chatRateLimit";

/**
 * GET — full DocChat usage + document upload limits for the sidebar.
 * Premium: documentsLimit is null (unlimited uploads).
 */
export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = session.sub;
  const isPremium = session.tier === "premium";

  const usage = await checkChatUsage(userId, isPremium);

  const rows = await query<{ count: string }[]>(
    `SELECT COUNT(*)::text AS count FROM chat_documents WHERE user_id = $1`,
    [userId]
  );
  const documentsUploaded = parseInt(rows[0]?.count ?? "0", 10) || 0;
  const documentsLimit = isPremium ? null : FREE_DOC_LIMIT;

  return NextResponse.json({
    ...usage,
    isPremium,
    documentsUploaded,
    documentsLimit,
  });
}
