import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { query } from "@/lib/db";

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const rows = await query<{
    id: string;
    document_id: string;
    title: string;
    filename: string;
    message_count: string;
    created_at: string;
    updated_at: string;
  }[]>(
    `SELECT c.id, c.document_id, c.title, d.filename,
            (SELECT COUNT(*) FROM chat_messages m WHERE m.conversation_id = c.id)::text AS message_count,
            c.created_at::text, c.updated_at::text
     FROM chat_conversations c
     JOIN chat_documents d ON d.id = c.document_id
     WHERE c.user_id = $1
     ORDER BY c.updated_at DESC
     LIMIT 50`,
    [session.sub]
  );

  return NextResponse.json({ conversations: rows });
}
