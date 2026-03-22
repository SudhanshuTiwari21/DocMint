import { Pinecone } from "@pinecone-database/pinecone";

let client: Pinecone | null = null;

function getClient(): Pinecone {
  if (!client) {
    const apiKey = process.env.PINECONE_API_KEY;
    if (!apiKey) throw new Error("PINECONE_API_KEY is not set");
    client = new Pinecone({ apiKey });
  }
  return client;
}

function getIndex() {
  const indexName = process.env.PINECONE_INDEX;
  if (!indexName) throw new Error("PINECONE_INDEX is not set");
  return getClient().index(indexName);
}

export type ChunkVector = {
  id: string;
  values: number[];
  metadata: { text: string; chunkIndex: number };
};

export async function upsertChunks(
  namespace: string,
  chunks: ChunkVector[]
): Promise<void> {
  const index = getIndex().namespace(namespace);
  const batchSize = 100;
  for (let i = 0; i < chunks.length; i += batchSize) {
    const batch = chunks.slice(i, i + batchSize);
    await index.upsert({ records: batch });
  }
}

export type QueryResult = {
  id: string;
  text: string;
  score: number;
};

export async function queryChunks(
  namespace: string,
  embedding: number[],
  topK = 5
): Promise<QueryResult[]> {
  const index = getIndex().namespace(namespace);
  const res = await index.query({
    vector: embedding,
    topK,
    includeMetadata: true,
  });
  return (res.matches ?? []).map((m) => ({
    id: m.id,
    text: (m.metadata as { text: string })?.text ?? "",
    score: m.score ?? 0,
  }));
}

export async function deleteNamespace(namespace: string): Promise<void> {
  const index = getIndex().namespace(namespace);
  await index.deleteAll();
}
