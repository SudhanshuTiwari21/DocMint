import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { query } from "@/lib/db";
import { deleteNamespace } from "@/lib/pinecone";

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const rows = await query<{
    id: string;
    filename: string;
    chunk_count: number;
    page_count: number;
    created_at: string;
  }[]>(
    `SELECT id, filename, chunk_count, page_count, created_at::text
     FROM chat_documents
     WHERE user_id = $1
     ORDER BY created_at DESC`,
    [session.sub]
  );

  return NextResponse.json({ documents: rows });
}

export async function DELETE(request: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const url = new URL(request.url);
  const documentId = url.searchParams.get("id");
  if (!documentId) {
    return NextResponse.json({ error: "Document id is required" }, { status: 400 });
  }

  const docs = await query<{ namespace: string }[]>(
    `SELECT namespace FROM chat_documents WHERE id = $1 AND user_id = $2`,
    [documentId, session.sub]
  );
  if (docs.length === 0) {
    return NextResponse.json({ error: "Document not found" }, { status: 404 });
  }

  await query(
    `UPDATE chat_conversations SET document_id = NULL, updated_at = NOW()
     WHERE document_id = $1 AND user_id = $2`,
    [documentId, session.sub]
  );

  try {
    await deleteNamespace(docs[0].namespace);
  } catch (err) {
    console.error("[chat/documents] delete namespace", err);
  }

  await query(
    `DELETE FROM chat_documents WHERE id = $1 AND user_id = $2`,
    [documentId, session.sub]
  );

  return NextResponse.json({ ok: true });
}
