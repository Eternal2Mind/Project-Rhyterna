# ETERAEON — Project-Rhyterna

Personal site for ETERAEON, built with [Astro](https://astro.build/) as a
static, bilingual (EN / TR) site and deployed on Cloudflare Pages.

## Develop

Requires Node 18+.

```bash
npm install      # once
npm run dev      # local dev server (http://localhost:4321)
npm run build    # production build → dist/
npm run preview  # preview the production build locally
```

## Structure

- `src/pages/` — routes: `/` (language redirect), `/en/`, `/tr/`
- `src/layouts/BaseLayout.astro` — shared page shell (head, chrome, scripts)
- `src/components/` — reusable UI (logo, nav, feedback form, social cards…)
- `src/i18n/{en,tr}.ts` — all interface text, per language (single source)
- `src/config/site.ts` — Turnstile site key, feedback worker URL, version
- `src/styles/style.css` — global styles (colour palette in `:root`)
- `src/scripts/main.ts` — interactivity (cursor, nav, feedback form…)
- `src/content/` — future `devlog` / `lex-rhyterna` Markdown content
- `public/` — static assets + `_headers` (CSP), copied as-is into `dist/`

## Deploy (Cloudflare Pages)

- **Build command:** `npm run build`
- **Build output directory:** `dist`
- **Node version:** 18+

The version shown in the footer comes from the `version` field in
`package.json` — bump it there on each release.
