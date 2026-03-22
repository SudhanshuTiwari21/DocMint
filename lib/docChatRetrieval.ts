import { getEmbedding } from "@/lib/openai";
import { queryChunks, type QueryResult } from "@/lib/pinecone";

/**
 * Second embedding query pulls more "resume-like" chunks when the user's question
 * uses words that don't overlap the document (e.g. "50 LPA", "placement") — pure
 * semantic search would miss skills/experience sections.
 */
const RETRIEVAL_BOOSTER =
  "skills experience work education projects achievements certifications responsibilities roles years";

const MAX_CONTEXT_CHARS = 14_000;

/**
 * Merges two vector searches (user question + boosted query), dedupes by chunk id,
 * and caps total size for the model context window.
 */
export async function buildMergedDocumentContext(
  namespace: string,
  userQuery: string
): Promise<string> {
  const q = userQuery.trim() || "document summary overview";
  const [embUser, embBoosted] = await Promise.all([
    getEmbedding(q),
    getEmbedding(`${q} ${RETRIEVAL_BOOSTER}`),
  ]);

  const [primary, secondary] = await Promise.all([
    queryChunks(namespace, embUser, 14),
    queryChunks(namespace, embBoosted, 14),
  ]);

  const byId = new Map<string, QueryResult>();
  const order: string[] = [];

  function addAll(rows: QueryResult[]) {
    for (const r of rows) {
      if (!r.text.trim()) continue;
      if (!byId.has(r.id)) {
        byId.set(r.id, r);
        order.push(r.id);
      }
    }
  }

  addAll(primary);
  addAll(secondary);

  let out = "";
  for (const id of order) {
    const t = byId.get(id)!.text;
    const next = out ? `${out}\n\n${t}` : t;
    if (next.length > MAX_CONTEXT_CHARS) break;
    out = next;
  }

  return out;
}
