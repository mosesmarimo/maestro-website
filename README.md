# maestro-website

Marketing and documentation website for **Maestro Studio** — a cross-platform AI agent orchestration platform for multi-agent systems (visual workflow canvas, live agent map, model routing matrix, MRGD reward-guided decoding).

**Production:** https://maestrostudio.dev (Vercel; also https://maestro-website-eight.vercel.app)

## Stack

- **Next.js 16** (App Router, React Server Components) + TypeScript
- **PostgreSQL** (Neon via the Vercel Marketplace) — serves the FAQ content and stores newsletter subscribers; the schema is applied lazily on first use and the site falls back to bundled content if the database is unreachable
- Design system in plain CSS (`src/app/globals.css`); fonts via `next/font` (Fraunces · Instrument Sans · JetBrains Mono)
- Hosted on **Vercel**, custom domain `maestrostudio.dev`

## Structure

```
src/app/
  page.tsx                 Landing: animated hero, pillars, MRGD, feature grid, roadmap, newsletter
  features/page.tsx        Full feature tour with phase labels
  faq/page.tsx             FAQ — served from PostgreSQL (ISR, 5 min) with seed fallback
  how-to/page.tsx          Guides hub
  how-to/[slug]/page.tsx   Six guides (SSG from src/lib/guides.ts)
  actions.ts               subscribe() server action → subscribers table
src/lib/
  db.ts                    pg pool, lazy schema, getFaqs/addSubscriber
  faq-data.ts              FAQ seed + fallback content
  guides.ts                Guide content
src/components/            Nav, Footer, ScorePanel (animated hero), NewsletterForm, RevealEffects
db/schema.sql              Reference schema (subscribers, faqs)
scripts/seed.mjs           Eager schema apply + FAQ seed for fresh databases
public/img/*.svg           Logo + interface previews rendered from the design spec
```

## Develop locally

```bash
npm install
docker compose up -d          # local PostgreSQL (optional — site works without it)
cp .env.example .env.local    # or `vercel env pull` for the Neon database
npm run seed                  # apply schema + seed FAQs (optional; happens lazily too)
npm run dev
```

## Database

`POSTGRES_URL` (or `DATABASE_URL`) selects the database. Production uses Neon, provisioned through the Vercel Marketplace and injected automatically. Tables:

- `faqs` — FAQ entries (seeded from `src/lib/faq-data.ts`, editable in the database thereafter)
- `subscribers` — newsletter emails from the landing-page form (unique, idempotent inserts)

## CI/CD

`.github/workflows/ci.yml`:

- **CI** — every push and PR: `npm ci` → typecheck → production build.
- **CD** — pushes to `main` deploy to production. Two paths:
  1. **Vercel Git integration** (active now): Vercel builds and deploys each push automatically, with preview deployments for PRs.
  2. **Actions-controlled deploy**: add a `VERCEL_TOKEN` repository secret (create at vercel.com/account/tokens) and the workflow's deploy job takes over (`vercel build` + `vercel deploy --prebuilt --prod`). Disable Git deployments in the Vercel project settings if you want Actions to be the only deployer.

## Domain

`maestrostudio.dev` and `www.maestrostudio.dev` are attached to the Vercel project. DNS must point at Vercel (at the current registrar: `A @ 76.76.21.21` and `CNAME www cname.vercel-dns.com`, or switch nameservers to `ns1`/`ns2.vercel-dns.com`).
