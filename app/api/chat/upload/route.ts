import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { query } from "@/lib/db";
import {
  extractTextFromUploadedDocument,
  isAllowedChatUploadFilename,
} from "@/lib/documentExtract";
import { chunkText } from "@/lib/chunker";
import { getEmbeddings } from "@/lib/openai";
import { upsertChunks, type ChunkVector } from "@/lib/pinecone";
import {
  checkIpRateLimit,
  FREE_DOC_LIMIT,
  FREE_MAX_PDF_BYTES,
  PRO_MAX_PDF_BYTES,
} from "@/lib/chatRateLimit";

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

  if (!isPremium) {
    const docs = await query<{ count: string }[]>(
      `SELECT COUNT(*)::text AS count FROM chat_documents WHERE user_id = $1`,
      [userId]
    );
    if (Number(docs[0]?.count ?? 0) >= FREE_DOC_LIMIT) {
      return NextResponse.json(
        { error: `Free users can upload up to ${FREE_DOC_LIMIT} documents. Upgrade to Pro for unlimited.` },
        { status: 403 }
      );
    }
  }

  const formData = await request.formData();
  const file = formData.get("file");
  if (!file || !(file instanceof File)) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  if (!isAllowedChatUploadFilename(file.name)) {
    return NextResponse.json(
      {
        error:
          "Upload a PDF or Word document (.docx). Legacy .doc files are not supported—save as .docx or PDF first.",
      },
      { status: 400 }
    );
  }

  const maxBytes = isPremium ? PRO_MAX_PDF_BYTES : FREE_MAX_PDF_BYTES;
  if (file.size > maxBytes) {
    const maxMb = Math.round(maxBytes / (1024 * 1024));
    return NextResponse.json({ error: `File too large. Maximum ${maxMb} MB.` }, { status: 400 });
  }

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  let text: string;
  let pageCount: number;
  try {
    const result = await extractTextFromUploadedDocument(buffer, file.name);
    text = result.text;
    pageCount = result.pageCount;
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Could not read file";
    return NextResponse.json({ error: msg }, { status: 400 });
  }

  if (text.trim().length < 50) {
    return NextResponse.json(
      {
        error:
          "Too little extractable text. For PDFs, the file may be scanned or image-based. For Word, try a file with selectable text.",
      },
      { status: 400 }
    );
  }

  const chunks = chunkText(text, 500, 50);
  if (chunks.length === 0) {
    return NextResponse.json(
      { error: "No text chunks could be created from this file" },
      { status: 400 }
    );
  }

  const rows = await query<{ id: string }[]>(
    `INSERT INTO chat_documents (user_id, filename, namespace, chunk_count, page_count)
     VALUES ($1, $2, '', $3, $4) RETURNING id`,
    [userId, file.name, chunks.length, pageCount]
  );
  const documentId = rows[0].id;
  const namespace = `doc_${documentId}`;

  await query(
    `UPDATE chat_documents SET namespace = $1 WHERE id = $2`,
    [namespace, documentId]
  );

  const batchSize = 50;
  for (let i = 0; i < chunks.length; i += batchSize) {
    const batch = chunks.slice(i, i + batchSize);
    const embeddings = await getEmbeddings(batch);
    const vectors: ChunkVector[] = batch.map((chunkText, j) => ({
      id: `${documentId}_${i + j}`,
      values: embeddings[j],
      metadata: { text: chunkText, chunkIndex: i + j },
    }));
    await upsertChunks(namespace, vectors);
  }

  return NextResponse.json({
    documentId,
    filename: file.name,
    chunkCount: chunks.length,
    pageCount,
  });
}
