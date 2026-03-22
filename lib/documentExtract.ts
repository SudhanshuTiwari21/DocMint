import mammoth from "mammoth";
import { extractTextFromPdf } from "@/lib/pdfExtract";

export type DocumentExtractResult = {
  text: string;
  pageCount: number;
};

/**
 * Extract plain text from supported uploads for DocChat (RAG indexing).
 * PDF via pdf-parse; Word 2007+ (.docx) via mammoth. Legacy .doc is not supported.
 */
export async function extractTextFromUploadedDocument(
  buffer: Buffer,
  filename: string
): Promise<DocumentExtractResult> {
  const lower = filename.toLowerCase();

  if (lower.endsWith(".pdf")) {
    return extractTextFromPdf(buffer);
  }

  if (lower.endsWith(".docx")) {
    const result = await mammoth.extractRawText({ buffer });
    const text = result.value ?? "";
    const pageCount = Math.max(1, Math.ceil(text.length / 3000));
    return { text, pageCount };
  }

  if (lower.endsWith(".doc")) {
    throw new Error(
      "Legacy .doc format is not supported. Please save as .docx or export to PDF and upload again."
    );
  }

  throw new Error("Unsupported file type");
}

export function isAllowedChatUploadFilename(filename: string): boolean {
  const lower = filename.toLowerCase();
  return lower.endsWith(".pdf") || lower.endsWith(".docx");
}
