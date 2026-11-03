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

## Deploying (Cloudflare)

Live: **https://hostlify-site.charank-freelance.workers.dev** (Cloudflare Workers static assets — Cloudflare's current
platform for static sites; Pages now delegates to it).

The output is plain static files in `build/client`. `scripts/postbuild.mjs` is part of the build: it writes
`sitemap.xml` and `404.html`, inlines the CSS, defers the JS bootstrap until after first paint (keeps Lighthouse
performance at ~95–100), and flattens `about/index.html` → `about.html` so `/about` is served without a redirect.

```bash
npx wrangler login          # once per machine — authorise the Cloudflare account
npm run preview:cf          # local preview with Cloudflare's routing, headers and redirects (http://localhost:8788)
npm run deploy              # build + deploy to production
npm run deploy:preview      # build + upload a preview version (not live)
```

- `wrangler.toml` configures the assets (`not_found_handling = "404-page"`, `html_handling = "drop-trailing-slash"`).
- `worker/index.js` runs **only** for `/hero/*` and adds HTTP Range support, which Safari needs to play the hero video.
- `public/_headers` (security headers, immutable asset caching) and `public/_redirects` (`/demo` → `/contact`) are applied by Cloudflare.
- Custom domain: Cloudflare dashboard → Workers & Pages → hostlify-site → Settings → Domains & Routes → Add custom domain
  (the domain must be on the same Cloudflare account). Set `VITE_SITE_URL` if it differs from `https://hostlify.in`, then redeploy.
- `vercel.json` and `netlify.toml` are included too if you ever switch hosts.

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
- `site.features.residentApp` — `false` hides resident sign-up, "Find a hostel near me" and the hostel search
  (replaced by a "launching soon" note). Set it to `true` once the resident app is live.
- `/demo` is retired until a scheduler exists: all "Book a demo" buttons go to `/contact`. See `src/app/routes.ts` to restore.
- `site.contact.phone` / `site.contact.address` — empty, so nothing is shown. Fill them in to publish.

## Where things live

- `src/content/` — **all copy and data**. Edit text here, not in components.
- `src/content/claims.md` — the source of every number and claim on the site.
- `src/styles/globals.css` — design tokens (`@theme`), colour hues and utilities.
- `src/components/` — UI primitives, layout, motion, illustrations, mockups and SEO helpers.
- `src/sections/` — page sections, one folder per page.
- `src/app/routes/` — route modules (each exports `meta`).

## Before launch: still open

Tracked in `src/content/claims.md`:

1. Domain `hostlify.in` — purchased, pending activation. Connect it in Cloudflare once it is active.
2. Legal pages (`src/content/legal.ts`) stay as drafts until the app is built — then add the legal entity name and address (Razorpay checks these).
3. When the apps go live: flip `site.features.login` and `site.features.residentApp`.
