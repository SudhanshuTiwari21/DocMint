/**
 * Splits text into overlapping chunks for embedding.
 * Each chunk has at most `chunkSize` characters with `overlap` characters shared
 * between consecutive chunks to preserve context across boundaries.
 */
export function chunkText(
  text: string,
  chunkSize = 500,
  overlap = 50
): string[] {
  const cleaned = text.replace(/\s+/g, " ").trim();
  if (cleaned.length === 0) return [];
  if (cleaned.length <= chunkSize) return [cleaned];

  const chunks: string[] = [];
  let start = 0;
  while (start < cleaned.length) {
    const end = Math.min(start + chunkSize, cleaned.length);
    chunks.push(cleaned.slice(start, end).trim());
    if (end >= cleaned.length) break;
    start += chunkSize - overlap;
  }
  return chunks.filter((c) => c.length > 0);
}
