# CLAUDE.md — Maghanim marketing website

Operating rules for this repository. Derived from the client brief. Keep this file updated
whenever a decision is agreed.

---

## 1. What this project is

The public marketing website for **Maghanim**, a Shariah-compliant digital commerce platform
for SMEs, based in Dubai, UAE. Bilingual English/Arabic. Marketing only — no product app,
no authenticated area, no dashboard.

---

## 2. Business facts (the ONLY facts that may appear on the site)

- Arabic name: مغانم
- Location: Dubai, United Arab Emirates
- Maghanim is a Shariah-compliant digital commerce platform for SMEs. One platform, one
  contract and one support relationship replace several separate vendors.
- **Maghanim does not operate its own banking or processing infrastructure.** Licensed
  partners provide the regulated services. Maghanim provides the SME relationship, the
  product design and the Shariah governance.
- Four solution pillars:
  1. **Payments & acceptance** — POS terminals, tap-to-phone, online gateway, payment links, wallet acceptance
  2. **Cards & spend** — Islamic cards, virtual cards, corporate expense management, B2B corporate travel payments, supplier payments
  3. **Business management** — Odoo ERP, accounting, payroll, CRM, inventory, HR
  4. **Financing** — Shariah-compliant working capital (status pending client confirmation)
- Partners (names only until logo files arrive): Flocash (technology), Mawarid Finance
  (banking-as-a-service), Arab Financial Services / AFS (payment solutions), Odoo (certified ERP).
- Markets: UAE first, then GCC.
- Target industries: hospitality, retail, healthcare, education, professional services,
  corporate travel, government suppliers.

### Never show
Card scheme logos (Visa, Mastercard, Apple Pay…), unconfirmed partners, client names,
statistics, awards.

---

## 3. Content rules (strict — these are compliance rules, not preferences)

1. **Every visible word lives in `messages/en.json` or `messages/ar.json`.** Nothing is
   hard-coded in components. This includes alt text, aria-labels, button labels, form
   validation messages and metadata.
2. The client supplies all approved copy. Where copy is missing, use a clearly marked
   placeholder in both languages: `"[PLACEHOLDER: hero headline]"` /
   `"[عنصر نائب: العنوان الرئيسي]"`. **Never invent marketing claims, statistics or product promises.**
3. **Never state or imply** that Maghanim:
   - holds a central bank licence
   - issues cards, acquires, or lends on its own balance sheet
   - owns payment infrastructure
   - holds any certification (PCI DSS, ISO, …)
   - has any named customer, transaction volume, market share figure or award
   - is "the world's first" or "leading" anything
4. **Never mention any bank or partner not listed in section 2.**
5. Roadmap items are labelled "Coming soon" / "قريبًا", or omitted.
6. **Never machine-translate English into Arabic.** Arabic copy is written and reviewed by a
   native speaker. Until it arrives, Arabic values are placeholders. The only Arabic strings
   that may be written directly are ones the client supplied: `مغانم`, `العربية`, `قريبًا`.

---

## 4. Stack

| Concern | Choice |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript, strict |
| Styling | Tailwind CSS v4 (CSS-first `@theme`, no `tailwind.config.ts`) |
| i18n | next-intl 4 |
| Animation | Motion 13 (`motion/react`) |
| Fonts | `next/font` — Fraunces (EN headings), Geist Sans (EN body), Noto Kufi Arabic (AR headings), IBM Plex Sans Arabic (AR body) |
| Hosting | Vercel, from a private GitHub repository |

- Use current stable versions. Check the installed package's own types/docs rather than
  relying on memory for APIs.
- **Keep dependencies minimal. Ask the client before adding any library not listed above.**
- No secrets in code. Sensitive values go in Vercel environment variables and are documented
  in `.env.example`.

---

## 5. Bilingual rules

- Locale routes are `/en` and `/ar`. Default is `en`. `/` redirects to `/en`.
- `<html lang>` and `dir` derive from the locale: `ltr` for English, `rtl` for Arabic.
- **The layout genuinely mirrors.** Use logical properties only — `start`/`end`, `ms`/`me`,
  `ps`/`pe`, `text-start`/`text-end`, `border-s`/`border-e`. **Never `left`/`right` for layout.**
- Directional icons (arrows, chevrons, step flows) flip in RTL. **Logos and the coin never flip.**
- The language toggle sits in the header, shows «العربية» on English pages and "English" on
  Arabic pages, keeps the user on the equivalent page, and works on mobile.
- **Never apply letter-spacing to Arabic text** — it breaks Arabic letter joining. Arabic gets
  slightly more generous line-height than English.
- Each locale has its own metadata (title, description, Open Graph) and hreflang alternates.
- Fonts load via `next/font` with no layout shift.

---

## 6. Design tokens

Defined in `src/app/globals.css` under `@theme`. **Use only these colours.**

| Token | Hex | Role |
|---|---|---|
| `--color-emerald` | `#0B3227` | Hero background, footer, dark sections |
| `--color-emerald-mid` | `#145C48` | Hover states, secondary elements on dark |
| `--color-cream` | `#F5F0E8` | Alternating content sections, text on dark |
| `--color-white` | `#FFFFFF` | Alternating content sections, cards |
| `--color-gold` | `#BE973A` | Calligraphy mark, buttons, active nav, icons |
| `--color-gold-light` | `#D4AF5A` | Hover state for gold elements |
| `--color-ink` | `#0B3227` | Headline text on light |
| `--color-body` | `#3A3A3A` | Body text on light |

### Measured contrast — binding constraints

| Combination | Ratio | Verdict |
|---|---|---|
| Gold on emerald | 5.1:1 | AA pass |
| Emerald text on gold button | 5.1:1 | AA pass |
| Cream on emerald | 12.3:1 | AAA pass |
| Body `#3A3A3A` on cream | 10.0:1 | AAA pass |
| **Gold on cream** | **2.4:1** | **FAIL — never use gold for text on light** |
| **Gold-light on cream** | **1.9:1** | **FAIL — never use for text on light** |

On light sections gold is permitted **only** for non-text elements: rules, borders, icon
strokes, button fills, the calligraphy mark as artwork. Active nav and links on light
backgrounds use emerald with a gold underline/marker.

**If any new colour combination fails WCAG AA, tell the client — do not silently change the colour.**

---

## 7. Page rhythm and visual direction

Dark → light → dark sandwich. Hero and footer are emerald. Content sections alternate
cream (with geometric pattern at 12% opacity) and white. On emerald sections the pattern
sits at 8% opacity. The pattern fades at section boundaries with a gradient mask.

**Logo usage**
- On emerald: gold calligraphy mark + white wordmark.
- On light: gold mark + black wordmark.
- **Never recolour, stretch or redraw the calligraphy mark.**
- Never substitute the wordmark with typed text — use the supplied wordmark files.

---

## 8. Coin behaviour (hero)

- `public/brand/coin.png` via `next/image`, responsive.
- Motion: slow continuous vertical float (~8px amplitude, ~6s cycle), gentle tilt oscillation
  (±2°), and a shadow beneath that compresses as the coin rises and expands as it falls.
- Must feel weighty, not bouncy.
- `prefers-reduced-motion`: coin static, fixed shadow.
- **The headline is the LCP element.** The coin must never delay it or cause layout shift.
  Load the coin at lower priority.
- Mobile: coin scales down, sits below the CTA, partially cropped at the viewport bottom.
- Must look intentional at 375 / 768 / 1280 / 1920px, in both LTR and RTL.

---

## 9. Motion rules

- Scroll entrances: fade + 20px rise, children staggered ~100ms, `whileInView` with `once: true`.
- Solution explorer: cross-fade with a subtle slide in the reading direction, ~400ms ease-out.
- 5-step flow: sequential reveal; connector line draws via SVG `stroke-dashoffset`; gold dots
  mark each step; **order reverses in RTL**.
- Hover: buttons scale 1.02 and shift to gold-light; cards lift via box-shadow.
- Pattern parallax on cream sections at 80% page speed. **On mobile, no parallax and no
  `background-attachment: fixed`** (iOS repaint jank) — use a normally scrolling background.
- `prefers-reduced-motion`: instant opacity changes, no transforms.
- **No motion on initial page load except the coin float.** Content in the first viewport
  renders in its final state; `whileInView` applies only below the fold.

---

## 10. Quality bar (a phase is not done until all pass)

- Responsive at 375 / 768 / 1280 / 1920px in both `/en` and `/ar`
- Keyboard navigable, visible focus states, semantic HTML, alt text from message files,
  correct heading order
- Lighthouse ≥ 90 for Performance, Accessibility, Best Practices, SEO — on mobile, both locales
- No hard-coded strings, no console errors, no layout shift from fonts or the coin
- Favicon and app icons generated from the calligraphy mark
- `sitemap.xml` and `robots.txt` covering both locales

---

## 11. Working agreement

- Work in phases. At the end of each phase, stop, say what to check, and wait for approval.
- Present a plan before any multi-file change and wait for approval.
- Commit after each completed step with a clear message.
- When unsure, ask one clear question instead of guessing.
- Anything the client still has to decide is tracked in section 13 below.

### Phases
1. Scaffold, locale routing, placeholder pages, first Vercel deployment ← **current**
2. Design tokens, fonts, header with language toggle and logo, footer with pattern
3. Hero with animated coin
4. "One platform" intro + solution explorer
5. "How it works" 5-step flow + partners section
6. Shariah governance section + contact form + CTA
7. Solutions pages, Governance page, 404, legal placeholders
8. SEO metadata, icons, sitemap, full audit against section 10

---

## 12. Decisions agreed

| Date | Decision |
|---|---|
| 2026-09-12 | Solutions = a `/solutions` hub plus four child pages (`/solutions/payments`, `/cards`, `/business`, `/financing`). Chosen over a single tabbed page for SEO, per-pillar metadata and independent extension. |
| 2026-09-12 | The earlier prototype (single-locale `app/`, hand-written CSS, `DESIGN.md`, `PRODUCT.md`) was deleted. Its colour tokens and fonts are superseded by this file. |
| 2026-09-12 | Client-supplied source imagery moved to `brand-source/` (not served). Web assets live in `public/brand/`. |
| 2026-09-12 | Fonts: Fraunces / Geist Sans / Noto Kufi Arabic / IBM Plex Sans Arabic ("premium & modern", explicitly not generic). |
| 2026-09-12 | Repo stays at `zainahmed0506-sudo/maghanim2.0`; visibility change to private requires the owner's admin rights (current token has WRITE only). |
| 2026-09-12 | Client deploys to Vercel themselves following written step-by-step instructions. |
| 2026-09-12 | `i18n/request.ts` uses `requestLocale` (deprecated in next-intl 4 in favour of `next/root-params`) because `next/root-params` requires Next's `experimental.rootParams` flag. Stable-but-deprecated beats experimental on a client production site. Revisit when root-params ships stable. |

---

## 13. Open questions blocking later phases

| # | Question | Blocks |
|---|---|---|
| 1 | Official legal name (footer copyright, Organization schema) | Phase 2 |
| 2 | Production domain (`metadataBase`, hreflang, canonicals, sitemap) | Phase 8 (placeholder in `.env.example` for now) |
| 3 | **Brand assets with transparency**: coin, calligraphy mark alone, `logo-default`, `wordmark-black`, `wordmark-white`, geometric pattern. What is in `public/brand/` is derived from JPEGs and is provisional. | Phase 2 |
| 4 | Financing pillar — live or "Coming soon"? | Phase 4 |
| 5 | Geometric pattern: repair a seamless tile from the supplied raster, or rebuild as lightweight SVG? (SVG recommended — a few KB, seamless, recolourable.) | Phase 2 |
| 6 | Gold-on-cream fails AA (2.4:1). Confirm emerald + gold underline for links/active nav on light, or supply a darker gold for text. | Phase 2 |
| 7 | The "Issue" step in the 5-step flow implies card issuance, which section 3 forbids. Confirm wording or partner-attribution line. | Phase 5 |
| 8 | Confirmation that Flocash, Mawarid Finance, AFS and Odoo may be named publicly pre-launch. | Phase 5 |
| 9 | Contact form fields, submission destination (Resend?), spam protection approach. | Phase 6 |
| 10 | Social platforms for the footer. | Phase 2 |
| 11 | Governance page content. | Phase 7 |

## 14. Known issues carried forward

**404 shell (Phase 7).** The root layout lives inside the `[locale]` segment, so Next renders
404 responses in its own `<html id="__next_error__">` shell: `lang`/`dir` are not inherited
and the 404 body arrives as React flight data rather than server HTML. The status code is
correct (404) and `src/app/[locale]/not-found.tsx` wraps its content in an element carrying
the right `lang`/`dir`, so the page reads correctly in both languages.

Next 16's `global-not-found` convention is the intended fix. It was tried against 16.3.5 with
`experimental.globalNotFound` and is **not** picked up when the root layout is locale-rooted
(no error, silently ignored), so the flag was reverted rather than shipped non-functioning.
Revisit in Phase 7 — either a later Next release, or a root `app/layout.tsx` that reads the
locale from a proxy-set header (note: that would make every route dynamic and cost the current
22-page static prerender, so it is not a free trade).
