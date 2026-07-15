-- Reference schema. The app applies this automatically on first use
-- (see src/lib/db.ts ensureSchema) and seeds faqs from src/lib/faq-data.ts.

CREATE TABLE IF NOT EXISTS subscribers (
  id          SERIAL PRIMARY KEY,
  email       TEXT NOT NULL UNIQUE,
  source      TEXT NOT NULL DEFAULT 'site',
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS faqs (
  id          SERIAL PRIMARY KEY,
  position    INT NOT NULL,
  question    TEXT NOT NULL,
  answer_html TEXT NOT NULL,
  published   BOOLEAN NOT NULL DEFAULT TRUE
);
