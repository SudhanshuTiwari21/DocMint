import pdf from "pdf-parse";

export type PdfExtractResult = {
  text: string;
  pageCount: number;
};

/**
 * Extract text from a PDF buffer.
 * Uses pdf-parse v1.x — compatible with Vercel serverless (no DOMMatrix / canvas).
 */
export async function extractTextFromPdf(
  buffer: Buffer
): Promise<PdfExtractResult> {
  const data = await pdf(buffer);
  return {
    text: data.text,
    pageCount: data.numpages,
  };
}
