import { Pool } from "pg";
import { FAQ_SEED, type FaqEntry } from "./faq-data";

// PostgreSQL access for the site's dynamic data (FAQ content, newsletter
// subscribers). The schema is applied lazily on first use so fresh deploys
// and CI builds need no separate migration step; when no database is
// reachable, reads fall back to the bundled seed content so the site
// stays fully functional.

let pool: Pool | null = null;
let schemaReady: Promise<void> | null = null;

function connectionString(): string | undefined {
  return process.env.POSTGRES_URL ?? process.env.DATABASE_URL;
}

function getPool(): Pool | null {
  const url = connectionString();
  if (!url) return null;
  if (!pool) {
    pool = new Pool({
      connectionString: url,
      max: 5,
      connectionTimeoutMillis: 3000,
      ssl: url.includes("localhost") || url.includes("127.0.0.1") ? undefined : { rejectUnauthorized: false },
    });
  }
  return pool;
}

async function ensureSchema(p: Pool): Promise<void> {
  if (!schemaReady) {
    schemaReady = (async () => {
      await p.query(`
        CREATE TABLE IF NOT EXISTS subscribers (
          id SERIAL PRIMARY KEY,
          email TEXT NOT NULL UNIQUE,
          source TEXT NOT NULL DEFAULT 'site',
          created_at TIMESTAMPTZ NOT NULL DEFAULT now()
        );
        CREATE TABLE IF NOT EXISTS faqs (
          id SERIAL PRIMARY KEY,
          position INT NOT NULL,
          question TEXT NOT NULL,
          answer_html TEXT NOT NULL,
          published BOOLEAN NOT NULL DEFAULT TRUE
        );
      `);
      const { rows } = await p.query("SELECT COUNT(*)::int AS n FROM faqs");
      if (rows[0].n === 0) {
        for (let i = 0; i < FAQ_SEED.length; i++) {
          await p.query(
            "INSERT INTO faqs (position, question, answer_html) VALUES ($1, $2, $3)",
            [i + 1, FAQ_SEED[i].question, FAQ_SEED[i].answerHtml],
          );
        }
      }
    })().catch((err) => {
      schemaReady = null; // allow retry on next request
      throw err;
    });
  }
  return schemaReady;
}

export async function getFaqs(): Promise<FaqEntry[]> {
  const p = getPool();
  if (!p) return FAQ_SEED;
  try {
    await ensureSchema(p);
    const { rows } = await p.query(
      "SELECT question, answer_html FROM faqs WHERE published ORDER BY position ASC",
    );
    if (rows.length === 0) return FAQ_SEED;
    return rows.map((r) => ({ question: r.question, answerHtml: r.answer_html }));
  } catch {
    return FAQ_SEED; // database unreachable — serve bundled content
  }
}

export type SubscribeResult = { ok: true } | { ok: false; error: string };

export async function addSubscriber(email: string, source: string): Promise<SubscribeResult> {
  const p = getPool();
  if (!p) return { ok: false, error: "Subscriptions aren't available right now. Please try again later." };
  try {
    await ensureSchema(p);
    await p.query(
      "INSERT INTO subscribers (email, source) VALUES ($1, $2) ON CONFLICT (email) DO NOTHING",
      [email, source],
    );
    return { ok: true };
  } catch {
    return { ok: false, error: "Subscriptions aren't available right now. Please try again later." };
  }
}
