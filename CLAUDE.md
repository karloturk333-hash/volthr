# Volt Studio — Project Context for Claude

## What this project is
Croatian digital agency marketing site. Next.js 16 App Router + React 19 + Tailwind CSS 4. Deployed on Vercel at volthr.vercel.app. Language: Croatian (HR). Never change any copy unless explicitly asked.

**Pure marketing site** — public-facing agency pages only. All CTAs point to WhatsApp — no accounts, no login, no dashboard.

**Business model:** Agency for Croatian obrtnici. Clients contact via WhatsApp. Fixed monthly retainers. EU grant navigation included.

## Stack
- Framework: Next.js 16 (App Router, Turbopack default)
- Styling: Tailwind CSS 4 utility classes — no inline styles, no CSS modules unless they already exist
- Animations: Motion 12.x — import from `motion/react`, NOT `framer-motion`
- Icons: lucide-react
- UI primitives: shadcn/ui (avatar, badge, button, card, dropdown-menu, input, label, separator, tabs, textarea)
- Deployment: Vercel (auto-deploy on push to main)
- CMS: Sanity (next-sanity + @sanity/client + @sanity/image-url) — blog posts, portfolio projects. Graceful fallback when env vars missing.
- Email: Resend (`resend`) — contact form only
- Dev tooling: Playwright (visual regression)

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
- Logo marquee: CSS infinite scroll, 30s linear (ClientLogos currently hidden from homepage)
- Aurora background: global ambient effect in layout.tsx, fades across top half of every page
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
app/                          # Next.js 16 App Router (Turbopack default)
├── layout.tsx                # Root: fonts (Space Grotesk + DM Sans), metadata, analytics, aurora bg
├── globals.css               # Design tokens as CSS vars
├── (marketing)/
│   ├── page.tsx              # Homepage — 11 sections (see Homepage Section Flow)
│   ├── o-nama/page.tsx       # About page — AboutHero, AboutStory, AboutValues, AboutProcess, CtaPanel
│   ├── usluge/page.tsx       # Services — ServicesHero, ServicesChapters, CtaPanel
│   ├── cijene/page.tsx       # Pricing — PricingHero, PricingTiers, EuGrantBanner, FaqAccordion, CtaPanel
│   ├── kontakt/page.tsx      # Contact form (Resend) + Leaflet map
│   ├── projekti/page.tsx     # Portfolio grid — fetches from Sanity with hardcoded fallback
│   ├── blog/page.tsx         # Blog index — Sanity-powered, graceful empty state
│   ├── blog/[slug]/page.tsx  # Blog post — Sanity PortableText + Article JSON-LD
│   ├── privatnost/page.tsx   # Privacy policy — renders from lib/content.ts
│   └── uvjeti/page.tsx       # Terms of service — renders from lib/content.ts
├── api/
│   └── contact/route.ts      # POST: rate-limited (5/hr), validates, sends via Resend
├── sitemap.ts                # Static routes + dynamic blog slugs from Sanity
├── robots.ts                 # Robots.txt
└── icon.svg                  # Favicon
components/
├── layout/                   # Nav, Footer
├── ui/                       # shadcn/ui primitives + custom (BrowserMockup, Counter, LightningBolt, aurora-background, bento-grid, glowing-effect, rainbow-button, shimmer-button, text-reveal, portableTextComponents)
├── sections/                 # All section components (see Homepage Section Flow + sub-page sections)
├── providers/                # MotionProvider (LazyMotion wrapper)
└── CookieConsent.tsx         # GDPR banner gating Google Analytics
lib/
├── content.ts                # ALL Croatian copy, SEO meta, JSON-LD schemas. NEVER hardcode strings.
├── utils.ts                  # cn() (Tailwind merge) + safeJsonLd() (XSS-safe JSON-LD)
├── animations.ts             # Motion variant presets: fadeUp, heroStagger, heroWord, staggerContainer, projectCard
└── sanity/                   # client.ts, image.ts, queries.ts, types.ts, fallback.ts, index.ts
sanity/schemas/               # project, testimonial, euGrant (reference for Sanity Studio)
```

## Environment Variables

```env
# .env.local
RESEND_API_KEY=                       # Email delivery for contact form
NEXT_PUBLIC_SANITY_PROJECT_ID=        # Sanity CMS (optional — site works without it)
NEXT_PUBLIC_SANITY_DATASET=           # Sanity dataset
SANITY_REVALIDATE_SECRET=             # ISR webhook
NEXT_PUBLIC_GA_MEASUREMENT_ID=        # Google Analytics (GDPR-gated)
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

Each is a separate component in `components/sections/`. This is the actual render order in `app/(marketing)/page.tsx`:

| # | Section | Component | Key Details |
|---|---------|-----------|-------------|
| 1 | Hero | `Hero` (static import) | Large heading + CTA buttons (WhatsApp + /cijene + /o-nama) + trust line |
| 2 | About Split | `AboutSplit` (static import) | Image left (rounded-xl) + vision/mission text right |
| 3 | Services Grid | `ServicesGrid` (dynamic) | Bento grid with glowing hover effect — 4 service cards |
| 4 | Stats Counters | `StatsCounters` (dynamic) | Animated count-up: 7 days, 50+ objava, 0 tvojih sati, €0 skrivenih |
| 5 | Portfolio Grid | `PortfolioGrid` (dynamic) | Sanity-powered project cards (Villa Aurea, Nema Fleka) with fallback; links to /projekti |
| 6 | Why Us | `WhyUs` (dynamic) | 3 value proposition cards |
| 7 | Testimonials | `Testimonials` (dynamic) | Quote carousel (placeholder testimonials) |
| 8 | EU Grant Banner | `EuGrantBanner` (dynamic) | "Do 85% financirano" — digital voucher info |
| 9 | Pricing Preview | `PricingPreview` (dynamic) | Starter €149, Standard €299, Premium €499 — linking to /cijene |
| 10 | FAQ Accordion | `FaqAccordion` (dynamic) | 6 questions + Schema.org FAQPage JSON-LD |
| 11 | CTA Panel | `CtaPanel` (dynamic) | Dark section (#0D0D0D) + WhatsApp button + trust text |
| — | Footer | `Footer` (in layout) | Logo, Vrbovec address, WhatsApp, email, nav links, ©2026 |

**Removed from homepage:** ClientLogos (placeholder "Vaš logo ovdje" hurt credibility — component kept at `components/sections/ClientLogos.tsx` for when real logos exist).

## Navigation

- Flat header, full-width, border-b border-[#E8E6E0] on #F5F4F0 background
- Left: Volt logo. Center: nav links. Right: CTA button
- Mobile: hamburger → full-screen overlay with staggered link reveals
- Active link: purple underline offset

## SEO

- Every page: unique title + description + OG image
- Homepage: LocalBusiness + FAQPage JSON-LD
- Blog: Article JSON-LD (Sanity-powered, fully built)
- Sitemap: `app/sitemap.ts` — static routes + dynamic blog slugs from Sanity
- All images: Croatian alt text, lazy-loaded, WebP/AVIF via next/image

## Gotchas

- **Next.js 16 async params**: Every `params`, `searchParams`, `cookies()`, `headers()` is a Promise. ALWAYS await.
- **Turbopack is default**: Some Webpack-only plugins won't work. Check compatibility before adding.
- **Motion + Tailwind conflict**: Remove `transition-*`, `duration-*`, `ease-*` Tailwind classes from any element animated by Motion.
- **"use client" boundary**: Keep it as high as possible. Don't sprinkle on every component.
- **Light background is non-negotiable**: #F5F4F0 everywhere. Never revert to dark theme.
- **Space Grotesk max weight is 700**: `font-black` (900) silently falls back to 700. Use `font-bold` (700) or load weight 800/900 in layout.tsx.
- **Resend test domain**: Contact form sends from `onboarding@resend.dev`. Needs production domain setup.
- EU grant info (ITP + digital vouchers) changes often. Keep banner Sanity-editable.
- WhatsApp is primary contact for obrtnici. Every CTA points to WhatsApp.
- NEVER hardcode content strings. Use constants file or Sanity. Import from lib/content.ts.
- All content objects in lib/content.ts use `as const` for full TypeScript inference.

## What NOT to do
- Never add glassmorphism (no backdrop-blur, no bg-white/10, no frosted glass)
- Never use dark backgrounds outside the CTA footer section
- Never hardcode colors outside the design system above
- Never change Croatian copy
- Never install dependencies without asking first (exception: motion is pre-approved)
- Never use arbitrary Tailwind values not in this system without asking
- Never add auth, login, admin panels, dashboards, or any backend beyond the contact form API route

## Brand Positioning

Volt is a digital presence agency for Croatian obrtnici. The client contacts via WhatsApp — no accounts, no dashboards.

Monthly retainers: Starter €149/mj (8 posts + GBP), Standard €299/mj (16 posts + web), Premium €499/mj (30 posts + Stories + Google Ads). Setup fee €199 (free for Premium).

Competitive edge: AI-powered content at agency quality, fixed pricing (no quotes), WhatsApp-first workflow, EU grant navigation.

Voice: direct, specific numbers, Croatian-first, zero jargon.
- ✅ "Gotovo za 7 dana. Ako zakasnimo, 10% popusta po danu."
- ❌ "Kontaktirajte nas za individualnu ponudu."

## Reference Files

- docs/brand-guidelines.md — Brand system (colors, typography, logo usage, spacing)
- reference/demo-web-agency.html — Crafto HTML5 template used as design reference
- @content.ts — ALL Croatian content, SEO meta, JSON-LD schemas. Import from lib/content.ts. NEVER hardcode strings.
- @sanity-skill/SKILL.md — Sanity CMS integration patterns
