import { PDFParse } from "pdf-parse";

export type PdfExtractResult = {
  text: string;
  pageCount: number;
};

/**
 * Extract text from a PDF buffer using pdf-parse v2 (PDFParse class API).
 */
export async function extractTextFromPdf(
  buffer: Buffer
): Promise<PdfExtractResult> {
  const parser = new PDFParse({ data: buffer });
  try {
    const textResult = await parser.getText();
    return {
      text: textResult.text,
      pageCount: textResult.total,
    };
  } finally {
    await parser.destroy();
  }
}
