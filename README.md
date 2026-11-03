# Hostlify — marketing website

The public marketing site for Hostlify (hostel & PG management software). It's built from
`HOSTLIFY_WEBSITE_SPEC.md` and kept separate from the product app (`hostlify-web`).

**Stack:** React 19 · React Router v7 (framework mode, pre-rendered) · Vite 7 · TypeScript · Tailwind CSS v4 · Motion · Radix UI

## Getting started

Requires Node.js 20.19+ (22 recommended, see `.nvmrc`).

```bash
npm install
cp .env.example .env      # optional — sensible defaults are built in
npm run dev               # http://localhost:5173
```

| Script | What it does |
|---|---|
| `npm run dev` | Dev server with hot reload (unoptimised — don't run Lighthouse against it) |
| `npm run build` | Pre-renders every route to static HTML in `build/client`, then runs `scripts/postbuild.mjs` |
| `npm run preview` | Serves the production build at http://localhost:4173, the way a static host would |
| `npm run typecheck` | Generates route types and runs `tsc` |
| `npm run lint` / `lint:fix` | ESLint (TypeScript, React Hooks, jsx-a11y) |
| `npm run format` / `format:check` | Prettier (with Tailwind class sorting) |
| `npm run check` | typecheck + lint + format check — run before every commit/PR |

## Deploying

The output is plain static files in `build/client`. Deploy it exactly as `npm run build` produces it —
`scripts/postbuild.mjs` is part of the build. It writes `sitemap.xml` and `404.html`, inlines the CSS, and
defers the JS bootstrap until after first paint (this is what keeps Lighthouse performance at ~95–100).

- **Vercel:** import the repo. `vercel.json` sets the build command, output directory and security headers.
- **Netlify:** `netlify.toml` and `public/_headers` are included.
- **Cloudflare Pages:** build command `npm run build`, output `build/client`. `public/_headers` is picked up automatically.

Set the environment variables from `.env.example` in the host's dashboard.

## Environment variables

| Variable | Purpose |
|---|---|
| `VITE_SITE_URL` | Canonical base URL, used for meta tags and the sitemap (default `https://hostlify.in`) |
| `VITE_APP_URL` | Product app, used for log in / sign up / discover links |
| `VITE_LEAD_ENDPOINT` | Your own API endpoint for the demo and contact forms (JSON `POST`) |
| `VITE_WEB3FORMS_KEY` | Alternative to the above: a free Web3Forms key that emails each lead to the sales inbox |
| `VITE_CAL_LINK` | Cal.com link (e.g. `hostlify/demo`). The scheduler on `/demo` only shows when this is set |
| `VITE_WHATSAPP_NUMBER` | Sales WhatsApp, country code + number without `+` |

If neither `VITE_LEAD_ENDPOINT` nor `VITE_WEB3FORMS_KEY` is set, forms open a pre-filled email to the sales inbox.
Never put secrets in `VITE_*` variables, because they ship to the browser.

## Launch switches

- `site.features.login` in `src/content/site.ts` — `false` hides every "Log in" entry point (header, mobile menu, footer,
  resident page). Set it to `true` once the app at `VITE_APP_URL` is live.
- `site.contact.phone` / `site.contact.address` — empty, so nothing is shown. Fill them in to publish.

## Where things live

- `src/content/` — **all copy and data**. Edit text here, not in components.
- `src/content/claims.md` — the source of every number and claim on the site.
- `src/styles/globals.css` — design tokens (`@theme`), colour hues and utilities.
- `src/components/` — UI primitives, layout, motion, illustrations, mockups and SEO helpers.
- `src/sections/` — page sections, one folder per page.
- `src/app/routes/` — route modules (each exports `meta`).

## Before launch: business sign-off needed

Items marked **CONFIRM** in `src/content/claims.md`:

1. Plan prices, and the yearly discount (currently a 20% placeholder in `src/content/plans.ts`).
2. Legal pages (`src/content/legal.ts`) are drafts — they need legal review, the legal entity name and address.
3. Whether prices exclude GST (pricing FAQ).
4. The domain (`hostlify.in`) used for canonical URLs and the sitemap.
5. A lead-form backend (`VITE_WEB3FORMS_KEY` or `VITE_LEAD_ENDPOINT`).
