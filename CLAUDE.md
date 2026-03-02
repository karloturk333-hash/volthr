# Volt Studio — Project Context for Claude

## What this project is
Croatian web studio landing page. Next.js 16 App Router + React 19 + Tailwind CSS 4. Deployed on Vercel at volthr.vercel.app. Language: Croatian (HR). Never change any copy unless explicitly asked.

## Stack
- Framework: Next.js 16 (App Router, Turbopack default)
- Styling: Tailwind CSS 4 utility classes — no inline styles, no CSS modules unless they already exist
- Animations: Motion 12.x — import from `motion/react`, NOT `framer-motion`
- Icons: lucide-react
- Deployment: Vercel (auto-deploy on push to main)
- No backend — static/marketing site
- Dev tooling: Playwright (visual regression via scripts/design-check.js)

## Commands

```bash
npm run dev          # Start dev server (Turbopack, localhost:3000)
npm run build        # Production build
npm run lint         # ESLint (bare `eslint`, no path arg)
npx tsc --noEmit     # Type-check (no npm script defined)
```

## Design system (non-negotiable)
- Background base: #F5F4F0 (warm off-white) — never pure white, never dark
- Text primary: #0D0D0D
- Text secondary: #555550
- Accent: #8B5CF6 (Volt purple) — used on labels, CTAs, accents only
- Dark section: #0D0D0D (CTA footer only)
- Cards: #FFFFFF with border 1px #E8E6E0, rounded-xl
- Zero glassmorphism — no backdrop-blur, no bg-white/10, no frosted glass anywhere
- Zero dark backgrounds except the single CTA footer section

## Typography rules
- Fonts: Space Grotesk (display/headings, `--font-space`) + DM Sans (body/UI, `--font-dm`). Loaded via next/font/google.
- Hero H1: 72-90px, font-black, line-height 1.05
- Section labels: 11px uppercase tracking-widest text-purple-500, always prefixed with ✦
- Body: 16-18px text-[#555550] leading-relaxed
- Stats: 48px+ font-bold text-[#0D0D0D] + 13px label
- Nav links: 14px text-[#333]
- NEVER use Inter, Roboto, Arial, Playfair Display, or system fonts in visible UI.

## Component rules
- Nav: full-width, flat, border-b border-[#E8E6E0], no pill/container wrapper
- Buttons primary: bg-[#0D0D0D] text-white rounded-full — or bg-[#8B5CF6] text-white rounded-full
- Buttons secondary: border border-[#0D0D0D] text-[#0D0D0D] rounded-full bg-transparent
- Cards: bg-white border border-[#E8E6E0] rounded-xl — never add blur or transparency
- Section spacing: py-24 minimum on all top-level sections
- Container: max-w-7xl mx-auto px-6

## Animation rules (Motion 12.x)
- Hero headline: words stagger in, y: 40→0, opacity: 0→1, staggerChildren: 0.08
- Scroll sections: whileInView + viewport={{ once: true, amount: 0.1 }}, y: 28→0 fade in (via lib/animations.ts fadeUp)
- Hero specifically uses y: 40→0 (local override for larger viewport)
- Cards hover: scale 1.02, transition 0.2s
- Accordion: AnimatePresence + height auto
- Stats: count up from 0 on scroll enter
- Logo marquee: CSS infinite scroll, 30s linear
- Never use heavy spring animations — ease or easeOut only
- NEVER use `transform: scale()` on cards beyond 1.02
- Components use `m` (not `motion`) from `motion/react` — lighter weight
- Import pattern: `import { m, AnimatePresence } from "motion/react"` (add useScroll, useMotionValueEvent as needed)
- Shared animation variants live in `lib/animations.ts` — import `fadeUp`, `staggerContainer`, etc. instead of defining inline
- MotionProvider (LazyMotion wrapper) exists at components/providers/MotionProvider.tsx but is NOT fully utilized — components import `m` directly
- Remove ALL Tailwind `transition-*` classes from Motion-animated elements (conflicts)

## File structure conventions
- Components: /components/[ComponentName].tsx or /components/ui/[name].tsx
- Sections: /components/sections/[SectionName].tsx
- Layout: /components/layout/ (Nav, Footer)
- Lib: /lib/ (content.ts, utils.ts, animations.ts)
- Globals: app/globals.css (design tokens as CSS vars)
- Always read the file before editing it

## Architecture

```
app/                  # Next.js 16 App Router (Turbopack default)
├── layout.tsx        # Root: fonts (Space Grotesk + DM Sans), metadata, analytics
├── globals.css       # Design tokens as CSS vars
├── page.tsx          # Homepage — 13 sections, see below
├── o-nama/           # About page (NOT YET BUILT — content ready in lib/content.ts)
├── usluge/           # Services detail (NOT YET BUILT)
├── projekti/         # Portfolio, Sanity-powered (NOT YET BUILT)
├── cijene/           # Pricing (NOT YET BUILT — port from reference/volt-pricing.html)
├── kontakt/          # Contact form + Leaflet map (NOT YET BUILT)
├── blog/[slug]/      # Blog, Sanity-powered (NOT YET BUILT)
└── api/contact/      # Resend + WhatsApp redirect (NOT YET BUILT)
components/
├── layout/           # Nav, Footer
├── ui/               # Currently only LightningBolt.tsx (Button, Card, Badge, Input NOT YET BUILT)
├── sections/         # Hero, Services, Portfolio, CTA, Stats, FAQ
└── providers/        # MotionProvider (LazyMotion wrapper)
lib/                  # content.ts, seo.ts, utils.ts, animations.ts
sanity/schemas/       # blog, project, testimonial
```

## Code Style

- TypeScript strict. No `any`.
- Tailwind CSS 4 utility classes. No custom CSS files except globals.css.
- Named exports everywhere. No default exports except pages.
- All user-facing text in **Croatian**.
- Components: functional only, with explicit prop types.
- Pages with params: ALWAYS use `Promise<>` types and `await` (Next.js 16 breaking change).
- Server Components are default. Only add `"use client"` when actually needed (hooks, browser APIs, event handlers).

## Homepage Section Flow

Build in order. Each is a separate component in `components/sections/`.

| # | Section | Key Details |
|---|---------|-------------|
| 1 | Hero | Large heading + word rotation ("obrtnike · poduzetnike · trgovce") + CTA + badge |
| 2 | Client Logos | Greyscale horizontal marquee. Placeholder text until real clients exist |
| 3 | About Split | Image left (rounded-xl) + vision/mission text right |
| 4 | Services Grid | 4 numbered cards (01–04): Konzultacija, Dizajn, Razvoj, Lansiranje |
| 5 | Keyword Marquee | Infinite scroll: "web dizajn · razvoj · SEO · automatizacija · branding" |
| 6 | Portfolio Grid | Thumbnails + hover overlay. Sanity schema. Placeholders until populated |
| 7 | Stats Counters | Animated on scroll: dana isporuke, projekata, % zadovoljstva |
| 8 | Testimonials | Quote carousel. Sanity schema. Placeholder initially |
| 9 | Pricing Preview | 3 tier cards linking to /cijene |
| 10 | EU Grant Banner | "Do 85% financirano" — ITP digitalizacija + digital vouchers |
| 11 | FAQ Accordion | 6 questions. Schema.org FAQPage JSON-LD |
| 12 | CTA Panel | Dark section (#0D0D0D): "Spreman za web koji zarađuje?" + WhatsApp button |
| 13 | Footer | Logo, Vrbovec address, WhatsApp, email, nav links, ©2026 |

## Navigation

- Flat header, full-width, border-b border-[#E8E6E0] on #F5F4F0 background
- Left: Volt logo. Center: nav links. Right: CTA button
- Mobile: hamburger → full-screen overlay with staggered link reveals
- Active link: purple underline offset

## SEO

- Every page: unique title + description + OG image
- Homepage: LocalBusiness + FAQPage JSON-LD
- Blog: Article schema. Sitemap: next-sitemap auto-generation
- All images: Croatian alt text, lazy-loaded, WebP/AVIF via next/image

## Gotchas

- **Next.js 16 async params**: Every `params`, `searchParams`, `cookies()`, `headers()` is a Promise. ALWAYS await.
- **Turbopack is default**: Some Webpack-only plugins won't work. Check compatibility before adding.
- **Motion + Tailwind conflict**: Remove `transition-*`, `duration-*`, `ease-*` Tailwind classes from any element animated by Motion.
- **"use client" boundary**: Keep it as high as possible. Don't sprinkle on every component.
- **Light background is non-negotiable**: #F5F4F0 everywhere. Never revert to dark theme.
- **Space Grotesk max weight is 700**: `font-black` (900) silently falls back to 700. Use `font-bold` (700) or load weight 800/900 in layout.tsx.
- /cijene page is ALREADY BUILT as standalone HTML. Port preserving exact visuals. Ref: @volt-pricing.html
- EU grant info (ITP + digital vouchers) changes often. Keep banner Sanity-editable.
- WhatsApp is primary contact for obrtnici. Every CTA needs WhatsApp option.
- NEVER hardcode content strings. Use constants file or Sanity. Import from lib/content.ts.
- All content objects in lib/content.ts use `as const` for full TypeScript inference.

## What NOT to do
- Never add glassmorphism (no backdrop-blur, no bg-white/10, no frosted glass)
- Never use dark backgrounds outside the CTA footer section
- Never hardcode colors outside the design system above
- Never change Croatian copy
- Never install dependencies without asking first (exception: motion is pre-approved)
- Never use arbitrary Tailwind values not in this system without asking

## Brand Positioning

Volt fills an underserved gap: 130+ Croatian agencies target SMEs/enterprises at €3K–€20K. Volt targets obrtnici at €699 setup + €79/mo — productized, transparent, fast. Competitive edge: AI-accelerated 7-day delivery, fixed pricing (no quotes), EU grant navigation (ITP digital vouchers up to 85% co-financing, three new digital voucher types planned: AI, cybersecurity, complex solutions).

Voice: direct, specific numbers, Croatian-first, zero jargon.
- ✅ "Gotovo za 7 dana. Ako zakasnimo, 10% popusta po danu."
- ❌ "Kontaktirajte nas za individualnu ponudu."

## Reference Files

- docs/brand-guidelines.md — Brand system (colors, typography, logo usage, spacing)
- reference/demo-web-agency.html — Crafto HTML5 template used as design reference
- @content.ts — ALL Croatian content, SEO meta, JSON-LD schemas. Import from lib/content.ts. NEVER hardcode strings.
- @sanity-skill/SKILL.md — Sanity CMS integration patterns
- scripts/design-check.js — Playwright visual comparison (captures localhost:3000 vs eloqwnt.com reference)
