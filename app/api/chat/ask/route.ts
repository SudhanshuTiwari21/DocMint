import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { query } from "@/lib/db";
import { getEmbedding } from "@/lib/openai";
import { chatCompletion, type ChatMessage } from "@/lib/openai";
import { queryChunks } from "@/lib/pinecone";
import { checkChatUsage, recordChatUsage, checkIpRateLimit } from "@/lib/chatRateLimit";

export async function POST(request: Request) {
  if (!checkIpRateLimit(request)) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "You must be logged in" }, { status: 401 });
  }

  const userId = session.sub;
  const isPremium = session.tier === "premium";

  const usage = await checkChatUsage(userId, isPremium);
  if (!usage.allowed) {
    return NextResponse.json(
      {
        error: isPremium
          ? "Daily message limit reached. Try again tomorrow."
          : "Daily limit reached. Upgrade to Pro for more messages.",
        usage,
      },
      { status: 429 }
    );
  }

  let body: { documentId?: string; conversationId?: string; message?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { documentId, conversationId, message } = body;
  if (!documentId || !message || message.trim().length === 0) {
    return NextResponse.json({ error: "documentId and message are required" }, { status: 400 });
  }

  const docs = await query<{ namespace: string; user_id: string }[]>(
    `SELECT namespace, user_id::text FROM chat_documents WHERE id = $1`,
    [documentId]
  );
  if (docs.length === 0 || docs[0].user_id !== userId) {
    return NextResponse.json({ error: "Document not found" }, { status: 404 });
  }
  const namespace = docs[0].namespace;

  const questionEmbedding = await getEmbedding(message.trim());

  const relevantChunks = await queryChunks(namespace, questionEmbedding, 5);
  const context = relevantChunks.map((c) => c.text).join("\n\n");

  let convoId = conversationId;
  if (convoId) {
    const convoRows = await query<{ id: string }[]>(
      `SELECT id FROM chat_conversations WHERE id = $1 AND user_id = $2`,
      [convoId, userId]
    );
    if (convoRows.length === 0) {
      return NextResponse.json({ error: "Conversation not found" }, { status: 404 });
    }
  } else {
    const title = message.trim().slice(0, 80);
    const newConvo = await query<{ id: string }[]>(
      `INSERT INTO chat_conversations (user_id, document_id, title)
       VALUES ($1, $2, $3) RETURNING id`,
      [userId, documentId, title]
    );
    convoId = newConvo[0].id;
  }

  const historyRows = await query<{ role: string; content: string }[]>(
    `SELECT role, content FROM chat_messages
     WHERE conversation_id = $1
     ORDER BY created_at DESC LIMIT 10`,
    [convoId]
  );
  const history: ChatMessage[] = historyRows
    .reverse()
    .map((r) => ({ role: r.role as "user" | "assistant", content: r.content }));

  const systemPrompt: ChatMessage = {
    role: "system",
    content: `You are DocChat, an AI assistant that answers questions based on the provided document context. Answer accurately using the context below. If the answer is not in the context, say you don't have enough information from the document. Be concise and helpful. This tool helps students prepare for government exams like SSC, UPSC, banking, and state-level competitive exams.

DOCUMENT CONTEXT:
${context}`,
  };

  const messages: ChatMessage[] = [
    systemPrompt,
    ...history,
    { role: "user", content: message.trim() },
  ];

  const result = await chatCompletion(messages, 1024);

  await query(
    `INSERT INTO chat_messages (conversation_id, role, content, tokens_used)
     VALUES ($1, 'user', $2, 0)`,
    [convoId, message.trim()]
  );
  await query(
    `INSERT INTO chat_messages (conversation_id, role, content, tokens_used)
     VALUES ($1, 'assistant', $2, $3)`,
    [convoId, result.content, result.tokensUsed]
  );
  await query(
    `UPDATE chat_conversations SET updated_at = NOW() WHERE id = $1`,
    [convoId]
  );

  await recordChatUsage(userId, result.tokensUsed);

  const updatedUsage = await checkChatUsage(userId, isPremium);

  return NextResponse.json({
    conversationId: convoId,
    message: { role: "assistant", content: result.content },
    usage: updatedUsage,
  });
}
