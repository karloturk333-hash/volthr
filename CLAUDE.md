# CLAUDE.md — Volt Web Studio

Next.js 16 + React 19.2 + TypeScript 5.7 agency website for Volt, a solo web studio in Vrbovec, Croatia. Targets micro-entrepreneurs (obrtnici) who need professional sites fast. Design heavily inspired by Crafto ThemeForest web-agency demo.

## Commands

```bash
npm run dev          # Start dev server (Turbopack, localhost:3000)
npm run build        # Production build
npm run lint         # ESLint check
npm run type-check   # TypeScript strict
npx lighthouse http://localhost:3000 --output=html  # Performance audit
```

## Architecture

```
app/                  # Next.js 16 App Router (Turbopack default)
├── layout.tsx        # Root: fonts (Playfair + Outfit), metadata, analytics
├── page.tsx          # Homepage — 13 sections, see below
├── o-nama/           # About page
├── usluge/           # Services detail
├── projekti/         # Portfolio (Sanity-powered)
├── cijene/           # Pricing — ALREADY BUILT, port into shell
├── kontakt/          # Contact form + Leaflet map
├── blog/[slug]/      # Blog (Sanity-powered)
└── api/contact/      # Resend + WhatsApp redirect
components/
├── layout/           # Nav, Footer, SectionWrapper
├── ui/               # Button, Card, Badge, Input
├── sections/         # Hero, Services, Portfolio, CTA, Stats, FAQ
└── animations/       # ScrollReveal, Counter, Marquee, TextSplit
lib/                  # sanity.ts, seo.ts, utils.ts
sanity/schemas/       # blog, project, testimonial
styles/globals.css    # Design tokens as CSS vars
```

## Code Style

- TypeScript strict. No `any`.
- Tailwind CSS 4 utility classes. No custom CSS files except globals.css.
- Named exports everywhere. No default exports except pages.
- Motion 12.x for ALL animations. Import from `motion/react`, NOT `framer-motion`.
- Use `LazyMotion` + `m` components for bundle optimization (4.6KB vs 34KB).
- Remove ALL Tailwind `transition-*` classes from Motion-animated elements (conflicts).
- NEVER use Inter, Roboto, Arial, or system fonts in visible UI.
- All user-facing text in **Croatian**.
- Components: functional only, with explicit prop types.
- Pages with params: ALWAYS use `Promise<>` types and `await` (Next.js 16 breaking change).
- Server Components are default. Only add `"use client"` when actually needed (hooks, browser APIs, event handlers).

## Design System

IMPORTANT: Every color, radius, and font must come from these tokens.

```css
:root {
  --accent: #5AECC8;        /* Volt Mint — CTAs, links, highlights */
  --accent-end: #2DD4A8;    /* Gradient endpoint, hover */
  --surface: #050505;        /* Primary dark bg */
  --text: #F2F2F2;          /* Primary text on dark */
  --frame: #D4DBC4;         /* Sage — section wrapper bg */
  --surface-card: #0E0E0E;  /* Card bg */
  --text-2: #999999;        /* Secondary text */
  --text-3: #555555;        /* Tertiary text */
  --border: rgba(255,255,255,0.05);
  --accent-glow: rgba(90,236,200,0.15);
  --r-sm: 12px; --r-md: 18px; --r-lg: 26px; --r-xl: 36px;
}
```

Fonts: Playfair Display (display/headings) + Outfit (body/UI). Load via Google Fonts with `display=swap`.

## Homepage Section Flow

Build in order. Each is a separate component in `components/sections/`.

| # | Section | Key Details |
|---|---------|-------------|
| 1 | Hero | Large Playfair heading + word rotation ("obrtnike · poduzetnike · trgovce") + CTA + "5★ web studio" badge |
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
| 12 | CTA Panel | Glassmorphism: "Spreman za web koji zarađuje?" + WhatsApp button |
| 13 | Footer | Logo, Vrbovec address, WhatsApp, email, nav links, ©2026 |

## Animation Rules

- Scroll reveals: Motion `m.div` with `fadeUp`, 0.6s ease, `viewport={{ once: true, amount: 0.1 }}`
- Staggered children: 0.05–0.1s delay via `staggerChildren`
- Hero text: word-split animation on mount with `clipPath` reveal
- Marquee: CSS `@keyframes translateX` infinite, 30s, `linear`
- Counters: `useInView` + `animate()` from 0 to target (from `motion/react`)
- Card hover: `translateY(-4px)` + `borderColor: var(--accent)` + subtle shadow
- Page transitions: fade 0.3s via AnimatePresence
- NEVER use `transform: scale()` on cards — only translateY.
- ALWAYS wrap app in `<LazyMotion features={domAnimation}>` for bundle savings.
- Import pattern: `import { m, LazyMotion, domAnimation, AnimatePresence, useScroll, useTransform } from "motion/react"`

## Navigation

- Transparent header over hero → solid `--surface` bg on scroll (`useScroll`)
- Left: Volt logo (bolt-V SVG). Center: nav links. Right: CTA button
- Mobile: hamburger → full-screen overlay with staggered link reveals
- Active link: `--accent` underline offset

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
- **Must be on Next.js 16.1.1+** — 3 security CVEs patched in Dec 2025.
- /cijene page is ALREADY BUILT as standalone HTML. Port preserving exact visuals. Ref: @volt-pricing.html
- EU grant info (ITP + digital vouchers) changes often. Keep banner Sanity-editable.
- WhatsApp is primary contact for obrtnici. Every CTA needs WhatsApp option.
- Playfair Display italic (500) used for accent text — load explicitly.
- NEVER hardcode content strings. Use constants file or Sanity.

## Brand Positioning

Volt fills an underserved gap: 130+ Croatian agencies target SMEs/enterprises at €3K–€20K. Volt targets obrtnici at €699 setup + €79/mo — productized, transparent, fast. Competitive edge: AI-accelerated 7-day delivery, fixed pricing (no quotes), EU grant navigation (ITP digital vouchers up to 85% co-financing, three new digital voucher types planned: AI, cybersecurity, complex solutions).

Voice: direct, specific numbers, Croatian-first, zero jargon.
- ✅ "Gotovo za 7 dana. Ako zakasnimo, 10% popusta po danu."
- ❌ "Kontaktirajte nas za individualnu ponudu."

## Reference Files

- @volt-brand-guidelines.docx — Full brand system (colors, typography, logo usage, spacing)
- @volt-pricing.html — Existing pricing page to port
- @content.ts — ALL Croatian content, SEO meta, JSON-LD schemas. Import from lib/content.ts. NEVER hardcode strings.
- @sanity-skill/SKILL.md — Sanity CMS integration patterns
- Design reference: Crafto ThemeForest demo-web-agency.html
