import { Pool } from "pg";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error(
    "DATABASE_URL is not set. Add your PostgreSQL connection string in Vercel: Project Settings → Environment Variables."
  );
}

const parsed = new URL(connectionString.replace(/^postgresql:\/\//i, "https://"));
const host = parsed.hostname || "";
if (host === "base" || host === "localhost" || host === "host.docker.internal") {
  throw new Error(
    `DATABASE_URL has invalid host "${host}". Use your real Neon host, e.g. ep-xxxxx-pooler.xxx.aws.neon.tech. Check Vercel env vars and re-paste the full URL from Neon.`
  );
}

const pool = new Pool({
  connectionString,
  ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: true } : false,
  max: 10,
  idleTimeoutMillis: 30000,
});

export async function query<T = unknown>(text: string, params?: unknown[]): Promise<T> {
  const client = await pool.connect();
  try {
    const res = await client.query(text, params);
    return res.rows as T;
  } finally {
    client.release();
  }
}

export { pool };
