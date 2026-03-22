import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { query } from "@/lib/db";

export async function GET(request: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const url = new URL(request.url);
  const conversationId = url.searchParams.get("conversationId");
  if (!conversationId) {
    return NextResponse.json({ error: "conversationId is required" }, { status: 400 });
  }

  const convo = await query<{ id: string }[]>(
    `SELECT id FROM chat_conversations WHERE id = $1 AND user_id = $2`,
    [conversationId, session.sub]
  );
  if (convo.length === 0) {
    return NextResponse.json({ error: "Conversation not found" }, { status: 404 });
  }

  const rows = await query<{
    id: string;
    role: string;
    content: string;
    attachment_filename: string | null;
    created_at: string;
  }[]>(
    `SELECT id, role, content, attachment_filename, created_at::text
     FROM chat_messages
     WHERE conversation_id = $1
     ORDER BY created_at ASC`,
    [conversationId]
  );

  return NextResponse.json({ messages: rows });
}
