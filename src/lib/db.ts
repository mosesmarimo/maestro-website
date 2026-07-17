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
    const isLocal = url.includes("localhost") || url.includes("127.0.0.1");
    pool = new Pool({
      connectionString: url,
      max: 5,
      connectionTimeoutMillis: 3000,
      // Verify the server certificate against the system CA bundle for hosted
      // databases (Neon and other managed Postgres present publicly-trusted
      // certs) so the connection is not exposed to man-in-the-middle. Local
      // dev over loopback needs no TLS.
      ssl: isLocal ? undefined : { rejectUnauthorized: true },
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
        CREATE TABLE IF NOT EXISTS support_messages (
          id SERIAL PRIMARY KEY,
          name TEXT NOT NULL,
          email TEXT NOT NULL,
          topic TEXT NOT NULL,
          message TEXT NOT NULL,
          created_at TIMESTAMPTZ NOT NULL DEFAULT now()
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

export async function addSupportMessage(msg: {
  name: string;
  email: string;
  topic: string;
  message: string;
}): Promise<SubscribeResult> {
  const p = getPool();
  if (!p) return { ok: false, error: "The form isn't available right now — email support@maestrostudio.dev instead." };
  try {
    await ensureSchema(p);
    await p.query(
      "INSERT INTO support_messages (name, email, topic, message) VALUES ($1, $2, $3, $4)",
      [msg.name, msg.email, msg.topic, msg.message],
    );
    return { ok: true };
  } catch {
    return { ok: false, error: "The form isn't available right now — email support@maestrostudio.dev instead." };
  }
}

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
