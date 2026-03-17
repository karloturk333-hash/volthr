# Volt — Project Context for Claude

## What this project is
Croatian digital agency marketing site for obrtnici (craftsmen). Next.js 16 App Router + React 19 + Tailwind CSS 4. Deployed on Vercel at volthr.vercel.app. Language: Croatian (HR).

**Pure marketing site** — no backend, no auth, no admin. All CTAs point to WhatsApp. Only API: contact form via Resend.

**Business model:** Web stranica od €500 uz potporu Zagrebačke županije (75% povrat). One-time website packages (€399/€799/€1,299). Monthly maintenance (€49/€99/€199). Grant deadline: 3. travnja 2026.

**Grant toggle:** `lib/grant.ts` — `isGrantActive()` auto-switches layout after April 3, 2026. During grant: grant hero + one-time packages + process steps. After: post-grant banner + one-time packages only.

## Stack
- Framework: Next.js 16 (App Router, Turbopack)
- Styling: Tailwind CSS 4 — no inline styles, no CSS modules
- Animations: Motion 12.x — `import { m } from "motion/react"`, NOT `framer-motion`
- Icons: lucide-react
- UI primitives: shadcn/ui (bento-grid, glowing-effect, rainbow-button, shimmer-button, text-reveal, plus standard components)
- CMS: Sanity (blog + portfolio). Graceful fallback when env vars missing.
- Email: Resend — contact form only
- Deployment: Vercel (auto-deploy on push to main)

## Commands
```bash
npm run dev          # Dev server (Turbopack, localhost:3000)
npm run build        # Production build
npm run lint         # ESLint
npx tsc --noEmit     # Type-check
```

## Design system (non-negotiable)
- Background: #F5F4F0 (warm off-white) — never pure white, never dark
- Text primary: #0D0D0D
- Text secondary: #555550, muted: #888880
- Accent: #8B5CF6 (Volt purple)
- Grant/success: #15803D (green)
- Urgency: #DC2626 on #FEF2F2 (red badge)
- Dark section: #0D0D0D (CTA footer only)
- Cards: bg-white border border-[#E8E6E0] rounded-xl
- Zero glassmorphism, zero dark backgrounds except CTA footer

## Typography
- Fonts: Space Grotesk (`font-space`, headings) + DM Sans (`font-dm`, body). Loaded via next/font/google.
- Section labels: 11px uppercase tracking-widest text-[#8B5CF6], prefixed with ✦
- Body: 16-18px text-[#555550] leading-relaxed
- Space Grotesk max weight is 700 — `font-black` silently falls back

## Architecture

```
app/(marketing)/
├── page.tsx              # Homepage — 10 sections
├── cijene/page.tsx       # Pricing — grant-toggled layout
├── projekti/page.tsx     # Portfolio grid
├── projekti/[slug]/      # Case study pages (pub-cubismo)
├── o-nama/page.tsx       # About
├── usluge/page.tsx       # Services (ServicesHero, ServicesChapters, CtaPanel)
├── kontakt/page.tsx      # Contact form (Resend) + Leaflet map
├── blog/page.tsx         # Blog index (Sanity)
├── blog/[slug]/page.tsx  # Blog post (Sanity PortableText)
├── privatnost/page.tsx   # Privacy policy
└── uvjeti/page.tsx       # Terms of service
app/api/contact/route.ts  # POST: rate-limited, validates, sends via Resend
components/
├── layout/               # Nav, Footer
├── sections/             # All page sections (see flows below)
├── ui/                   # shadcn/ui + custom (bento-grid, glowing-effect, etc.)
├── providers/            # MotionProvider
└── CookieConsent.tsx     # GDPR banner
lib/
├── content.ts            # ALL Croatian copy. NEVER hardcode strings.
├── grant.ts              # isGrantActive() — date-based grant toggle
├── utils.ts              # cn() + safeJsonLd()
├── animations.ts         # fadeUp, staggerContainer, heroStagger, projectCard
└── sanity/               # client, image, queries, types, fallback
```

## Homepage Section Flow (`app/(marketing)/page.tsx`)

| # | Component | Key Details |
|---|-----------|-------------|
| 1 | `Hero` (static) | H1 + grant badge + WhatsApp/€500/about CTAs |
| 2 | `GrantHero` (dynamic) | "Vaša web stranica za €500" — countdown, price breakdown, 3-step flow |
| 3 | `AboutSplit` (static) | Image + vision/mission text |
| 4 | `ServicesGrid` (dynamic) | Bento grid, 4 service cards, glowing hover |
| 5 | `StatsCounters` (dynamic) | Animated count-up stats |
| 6 | `PortfolioGrid` (dynamic) | Project cards (Pub Cubismo, Villa Aurea, Nema Fleka) |
| 7 | `WhyUs` (dynamic) | 3 value prop cards |
| 8 | `Testimonials` (dynamic) | Quote carousel |
| 9 | `PricingPreview` (dynamic) | Grant package card (primary) + €49/€99/€199 maintenance (secondary) |
| 10 | `FaqAccordion` (dynamic) | 6 grant-specific Q&As + FAQPage JSON-LD |
| 11 | `CtaPanel` (dynamic) | Dark #0D0D0D footer + WhatsApp CTA |

## /cijene Page Flow (grant-toggled)

**During grant** (`isGrantActive() === true`):
1. `GrantPackageHero` — €2,000/€500 featured card with price breakdown
2. `OneTimePackages` — Brzi Start €399 / Digitalna Prisutnost €799 / Kompletni Paket €1,299
3. `GrantProcess` — 4-step timeline
4. `MaintenanceTiers` — Održavanje €49 / Rast €99 / Partner €199
5. `FaqAccordion` + `CtaPanel`

**After grant** (`isGrantActive() === false`):
1. `PostGrantBanner` — notification signup
2. `OneTimePackages` — same 3 cards (now primary)
3. `MaintenanceTiers` — same
4. `FaqAccordion` + `CtaPanel`

## Pricing Structure

**One-time packages:** Brzi Start €399 (3 pages, 5 days) / Digitalna Prisutnost €799 (5 pages, 7 days) / Kompletni Paket €1,299 (full branding, 10 days)

**Grant package:** €2,000 total → €500 net (75% reimbursement from Zagrebačka županija). Deadline: 3. travnja 2026.

**Monthly maintenance:** Održavanje €49/mj / Rast €99/mj (popular) / Partner €199/mj

## Portfolio & Case Studies

3 fallback projects in `lib/sanity/fallback.ts`: Pub Cubismo (order 0, has case study), Villa Aurea (order 1), Nema Fleka (order 2).

Case study page at `/projekti/[slug]` — registered in a static `CASE_STUDIES` map. Pub Cubismo includes 3D flipping business card viewer (CSS perspective, real PNG images).

## Content System

ALL user-facing text lives in `lib/content.ts` as `as const` exports. Key exports:
- `SITE`, `NAV`, `HERO`, `EU_GRANT` — site-wide
- `GRANT_HERO`, `GRANT_PROCESS`, `POST_GRANT_BANNER` — grant sections
- `ONE_TIME_PACKAGES`, `MAINTENANCE_TIERS` — pricing tiers
- `PRICING_PREVIEW`, `PRICING_PAGE` — pricing page content
- `FAQ`, `CTA_SECTION`, `FOOTER` — shared sections
- `SEO`, `SCHEMA_ORG` — metadata + structured data
- `PUB_CUBISMO` — case study content

## Environment Variables
```env
RESEND_API_KEY=                       # Contact form
NEXT_PUBLIC_SANITY_PROJECT_ID=        # Sanity CMS (optional)
NEXT_PUBLIC_SANITY_DATASET=           # Sanity dataset
SANITY_REVALIDATE_SECRET=             # ISR webhook
NEXT_PUBLIC_GA_MEASUREMENT_ID=        # Google Analytics (GDPR-gated)
```

## Animation Rules
- Import `m` from `motion/react` (not `motion`)
- Shared variants in `lib/animations.ts`: `fadeUp`, `staggerContainer`, `heroStagger`, `heroWord`, `projectCard`
- All sections: `initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }}`
- Remove Tailwind `transition-*` classes from Motion-animated elements
- Never heavy spring animations — ease or easeOut only

## Code Style
- TypeScript strict. No `any`.
- Named exports everywhere. Default exports only for pages.
- All text in Croatian. Never hardcode strings — import from `lib/content.ts`.
- Pages with params: `Promise<>` types + `await` (Next.js 16).
- Server Components default. `"use client"` only when needed.

## Gotchas
- **Next.js 16 async params**: Always `await params`, `cookies()`, `headers()`.
- **Motion + Tailwind conflict**: No `transition-*` on Motion elements.
- **Space Grotesk max weight 700**: `font-black` silently falls back.
- **Light background non-negotiable**: #F5F4F0 everywhere.
- **WhatsApp pre-fill**: All WhatsApp links include grant-specific pre-filled message.
- **Grant toggle**: `lib/grant.ts` — date check, no env var needed.

## What NOT to do
- Never add glassmorphism, dark backgrounds (except CTA footer), or pure white bg
- Never hardcode colors or content strings
- Never install deps without asking (motion pre-approved)
- Never add auth, login, admin, dashboards, or backend beyond contact API
- Never change Croatian copy without explicit request
