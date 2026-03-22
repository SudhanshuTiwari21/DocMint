import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { query } from "@/lib/db";
import { getEmbedding } from "@/lib/openai";
import { chatCompletion, type ChatMessage } from "@/lib/openai";
import { queryChunks } from "@/lib/pinecone";
import { checkChatUsage, recordChatUsage, checkIpRateLimit } from "@/lib/chatRateLimit";
import { assistantReplyToPlainText } from "@/lib/assistantPlainText";

const GENERAL_SYSTEM = `You are DocChat, Dockera's assistant. The user is chatting without a PDF attached in this thread.

You can:
- Help with exam preparation (study plans, concepts, practice ideas) for Indian competitive exams and school subjects when asked.
- Answer general questions, clarify topics, and have a helpful conversation.
- Suggest uploading a PDF in DocChat when detailed questions about a specific document would help.

Be accurate, concise, and friendly. If a question needs content from a file you cannot see, say so briefly and suggest they upload the PDF or paste relevant text.

Formatting: plain text only. Do not use Markdown (no **, __, #, markdown bullets, or backticks).`;

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

  let body: { conversationId?: string | null; message?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { conversationId, message } = body;

  if (!message || message.trim().length === 0) {
    return NextResponse.json({ error: "message is required" }, { status: 400 });
  }

  let convoId: string;
  let documentIdForRag: string | null = null;

  if (conversationId) {
    const convoRows = await query<{ id: string; document_id: string | null }[]>(
      `SELECT id, document_id FROM chat_conversations WHERE id = $1 AND user_id = $2`,
      [conversationId, userId]
    );
    if (convoRows.length === 0) {
      return NextResponse.json({ error: "Conversation not found" }, { status: 404 });
    }
    convoId = convoRows[0].id;
    documentIdForRag = convoRows[0].document_id;
  } else {
    // New thread always starts as general chat; attach PDFs later via upload to this conversation.
    const title = message.trim().slice(0, 80);
    const newConvo = await query<{ id: string }[]>(
      `INSERT INTO chat_conversations (user_id, document_id, title)
       VALUES ($1, NULL, $2) RETURNING id`,
      [userId, title]
    );
    convoId = newConvo[0].id;
  }

  let systemPrompt: ChatMessage;

  if (documentIdForRag) {
    const docs = await query<{ namespace: string; user_id: string; filename: string }[]>(
      `SELECT namespace, user_id::text, filename FROM chat_documents WHERE id = $1`,
      [documentIdForRag]
    );
    if (docs.length === 0 || docs[0].user_id !== userId) {
      return NextResponse.json({ error: "Document not found" }, { status: 404 });
    }
    const namespace = docs[0].namespace;
    const docFilename = docs[0].filename ?? "";

    const questionEmbedding = await getEmbedding(message.trim());
    const relevantChunks = await queryChunks(namespace, questionEmbedding, 10);
    const context = relevantChunks.map((c) => c.text).join("\n\n");

    const filenameHint =
      docFilename.trim().length > 0
        ? `\nOriginal filename (optional hint for topic or format): ${docFilename}\n`
        : "";

    systemPrompt = {
      role: "system",
      content: `You are DocChat, Dockera's assistant. The user uploaded a PDF; below is DOCUMENT CONTEXT (machine-retrieved excerpts—not the full file).

How to answer:
- Base every answer on the excerpts. When the excerpts clearly imply something (topic, document kind, entities, dates) via wording, structure, or sections, state it briefly—do not require a literal sentence that labels the document if the content already shows what it is.
- If the excerpts do not contain enough to answer, say you don't have enough in the retrieved text and suggest a more specific question if helpful.
- For broad questions ("what is this about?"), use whatever appears in the excerpts: titles, headings, recurring terms, filename hint, and flow of content.
- Stay neutral: any PDF is allowed (reports, books, forms, legal notices, technical docs, personal files, etc.). Do not assume a specific domain unless the text supports it.
- Be concise and accurate.
- Formatting: reply in plain text only. Do not use Markdown (no **, __, #, bullets with -, numbered lists with markdown, or backticks). Use normal sentences; short line breaks are fine.

${filenameHint}
DOCUMENT CONTEXT:
${context}`,
    };
  } else {
    systemPrompt = {
      role: "system",
      content: GENERAL_SYSTEM,
    };
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

  const messages: ChatMessage[] = [
    systemPrompt,
    ...history,
    { role: "user", content: message.trim() },
  ];

  const result = await chatCompletion(messages, 1024);
  const replyPlain = assistantReplyToPlainText(result.content);

  await query(
    `INSERT INTO chat_messages (conversation_id, role, content, tokens_used)
     VALUES ($1, 'user', $2, 0)`,
    [convoId, message.trim()]
  );
  await query(
    `INSERT INTO chat_messages (conversation_id, role, content, tokens_used)
     VALUES ($1, 'assistant', $2, $3)`,
    [convoId, replyPlain, result.tokensUsed]
  );
  await query(`UPDATE chat_conversations SET updated_at = NOW() WHERE id = $1`, [convoId]);

  await recordChatUsage(userId, result.tokensUsed);

  const updatedUsage = await checkChatUsage(userId, isPremium);

  return NextResponse.json({
    conversationId: convoId,
    message: { role: "assistant", content: replyPlain },
    usage: updatedUsage,
  });
}
