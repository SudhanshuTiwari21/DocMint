// eslint-disable-next-line @typescript-eslint/no-require-imports
const pdf = require("pdf-parse") as (buffer: Buffer) => Promise<{ text: string; numpages: number }>;

export type PdfExtractResult = {
  text: string;
  pageCount: number;
};

export async function extractTextFromPdf(
  buffer: Buffer
): Promise<PdfExtractResult> {
  const data = await pdf(buffer);
  return {
    text: data.text,
    pageCount: data.numpages,
  };
}
