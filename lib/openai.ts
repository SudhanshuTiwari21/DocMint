import OpenAI from "openai";

const EMBEDDING_MODEL = "text-embedding-3-small";
const CHAT_MODEL = "gpt-4o-mini";

let client: OpenAI | null = null;

function getClient(): OpenAI {
  if (!client) {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) throw new Error("OPENAI_API_KEY is not set");
    client = new OpenAI({ apiKey });
  }
  return client;
}

export async function getEmbeddings(texts: string[]): Promise<number[][]> {
  const ai = getClient();
  const res = await ai.embeddings.create({
    model: EMBEDDING_MODEL,
    input: texts,
  });
  return res.data.map((d) => d.embedding);
}

export async function getEmbedding(text: string): Promise<number[]> {
  const [embedding] = await getEmbeddings([text]);
  return embedding;
}

export type ChatMessage = { role: "system" | "user" | "assistant"; content: string };

export type ChatResult = { content: string; tokensUsed: number };

export async function chatCompletion(
  messages: ChatMessage[],
  maxTokens = 1024
): Promise<ChatResult> {
  const ai = getClient();
  const res = await ai.chat.completions.create({
    model: CHAT_MODEL,
    messages,
    max_tokens: maxTokens,
    temperature: 0.4,
  });
  const choice = res.choices[0];
  return {
    content: choice?.message?.content?.trim() ?? "",
    tokensUsed: res.usage?.total_tokens ?? 0,
  };
}
