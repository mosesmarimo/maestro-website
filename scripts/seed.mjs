// One-shot schema apply + FAQ seed. The app also does this lazily at runtime
// (src/lib/db.ts); this script exists for provisioning fresh databases eagerly:
//   node --env-file=.env.local scripts/seed.mjs
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import pg from "pg";

const here = dirname(fileURLToPath(import.meta.url));
const { FAQ_SEED } = await import(join(here, "../src/lib/faq-data.ts"));

const url = process.env.POSTGRES_URL ?? process.env.DATABASE_URL;
if (!url) {
  console.error("POSTGRES_URL (or DATABASE_URL) is not set.");
  process.exit(1);
}

const pool = new pg.Pool({
  connectionString: url,
  ssl: url.includes("localhost") || url.includes("127.0.0.1") ? undefined : { rejectUnauthorized: false },
});

const schema = readFileSync(join(here, "../db/schema.sql"), "utf8");
await pool.query(schema);

const { rows } = await pool.query("SELECT COUNT(*)::int AS n FROM faqs");
if (rows[0].n === 0) {
  for (let i = 0; i < FAQ_SEED.length; i++) {
    await pool.query("INSERT INTO faqs (position, question, answer_html) VALUES ($1, $2, $3)", [
      i + 1,
      FAQ_SEED[i].question,
      FAQ_SEED[i].answerHtml,
    ]);
  }
  console.log(`Seeded ${FAQ_SEED.length} FAQ entries.`);
} else {
  console.log(`faqs already has ${rows[0].n} rows — seed skipped.`);
}
await pool.end();
console.log("Schema applied. Database ready.");
