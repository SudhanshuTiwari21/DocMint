import { query } from "@/lib/db";
import crypto from "crypto";

const IP_WINDOW_MS = 60_000;
const IP_MAX_REQUESTS = 60;

export type ChatUsageState = {
  /** Always true — chat has no daily cap; free vs Pro differs only on file uploads (see usage API). */
  allowed: boolean;
  messagesUsed: number;
  /** null = unlimited (chat is free for all signed-in users). */
  messagesLimit: number | null;
  tokensUsed: number;
  /** null = no token cap for chat. */
  tokensLimit: number | null;
};

/**
 * DocChat message limits: none. Free users are limited only by indexed document count (FREE_DOC_LIMIT)
 * enforced in the upload route; Pro gets unlimited uploads + larger files.
 */
export async function checkChatUsage(
  userId: string,
  _isPremium: boolean
): Promise<ChatUsageState> {
  const rows = await query<{ messages_count: number; tokens_used: number }[]>(
    `SELECT messages_count, tokens_used FROM chat_usage
     WHERE user_id = $1 AND usage_date = CURRENT_DATE`,
    [userId]
  );

  const messagesUsed = rows[0]?.messages_count ?? 0;
  const tokensUsed = rows[0]?.tokens_used ?? 0;

  return {
    allowed: true,
    messagesUsed,
    messagesLimit: null,
    tokensUsed,
    tokensLimit: null,
  };
}

export async function recordChatUsage(
  userId: string,
  tokensUsed: number
): Promise<void> {
  await query(
    `INSERT INTO chat_usage (user_id, usage_date, messages_count, tokens_used)
     VALUES ($1, CURRENT_DATE, 1, $2)
     ON CONFLICT (user_id, usage_date)
     DO UPDATE SET messages_count = chat_usage.messages_count + 1,
                   tokens_used = chat_usage.tokens_used + $2`,
    [userId, tokensUsed]
  );
}

function hashIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  const ip = forwarded?.split(",")[0]?.trim() ?? request.headers.get("x-real-ip") ?? "unknown";
  return crypto.createHash("sha256").update(ip).digest("hex");
}

const ipBuckets = new Map<string, { count: number; resetAt: number }>();

export function checkIpRateLimit(request: Request): boolean {
  const ipHash = hashIp(request);
  const now = Date.now();
  const bucket = ipBuckets.get(ipHash);

  if (!bucket || now > bucket.resetAt) {
    ipBuckets.set(ipHash, { count: 1, resetAt: now + IP_WINDOW_MS });
    return true;
  }

  bucket.count += 1;
  return bucket.count <= IP_MAX_REQUESTS;
}

export const FREE_DOC_LIMIT = 3;
export const FREE_MAX_PDF_BYTES = 10 * 1024 * 1024;
export const PRO_MAX_PDF_BYTES = 50 * 1024 * 1024;
