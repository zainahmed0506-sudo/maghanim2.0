# Maghanim

Bilingual (English/Arabic) marketing website for Maghanim, Dubai.

**Project rules live in [CLAUDE.md](CLAUDE.md)** — content and compliance rules, bilingual
requirements, design tokens and the quality bar. Read it before changing anything.

## Local development

```sh
npm install
npm run dev      # http://localhost:3000 → redirects to /en
```

## Commands

| Command | Purpose |
|---|---|
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run check` | RTL safety + message-key parity + typecheck + lint |
| `npm run lint` | ESLint only |
| `npm run typecheck` | TypeScript only |

`npm run check` fails the build if a physical direction utility (`ml-`, `pr-`, `text-left`, …)
reaches the source, or if `messages/en.json` and `messages/ar.json` drift apart. Both would
break the Arabic layout silently.

## Structure

```
messages/          en.json / ar.json — every visible string
src/i18n/          routing, navigation, per-request config
src/app/[locale]/  all pages; the locale layout owns <html lang dir>
src/lib/           metadata helpers, solution-pillar config
public/brand/      web-served brand assets
brand-source/      client-supplied originals (not served)
scripts/           repo checks
```

## Environment

Copy `.env.example` to `.env.local` for local work. Production values are set in Vercel.
No secrets are committed.
