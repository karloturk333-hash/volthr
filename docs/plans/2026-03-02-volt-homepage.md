# Volt Homepage Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Scaffold the Volt Next.js 16 website and build a complete homepage with 13 sections, navigation, and footer.

**Architecture:** Next.js 16 App Router with Turbopack, React 19.2, TypeScript strict mode. All content imported from `lib/content.ts` — zero hardcoded strings. Motion 12.x via `motion/react` for all animations using LazyMotion + `m` components for bundle optimization. Server Components by default; `"use client"` only where hooks/browser APIs are needed.

**Tech Stack:** Next.js 16, React 19.2, TypeScript 5.7, Tailwind CSS 4, Motion 12.x, Lucide React, next/font/google (Playfair Display + Outfit)

---

## Task 1: Project Scaffold

**Files:**
- Create: `package.json`, `tsconfig.json`, `next.config.ts`, `tailwind.config.ts`, `postcss.config.mjs`
- Create: `app/layout.tsx`, `app/page.tsx`, `app/globals.css`
- Move: `content.ts` → `lib/content.ts`

**Step 1: Initialize Next.js 16 project**

Run from the `volthr` directory:

```bash
npx create-next-app@latest . --typescript --tailwind --eslint --app --no-src-dir --turbopack --import-alias "@/*"
```

When prompted, accept defaults. This creates the base scaffold with Tailwind CSS 4, App Router, no src directory.

**Step 2: Install additional dependencies**

```bash
npm install motion lucide-react
```

**Step 3: Move content.ts to lib/**

```bash
mkdir -p lib
mv content.ts lib/content.ts
```

**Step 4: Set up globals.css with design tokens**

Replace `app/globals.css` with Volt design tokens. Must include:

```css
@import "tailwindcss";

:root {
  --accent: #5AECC8;
  --accent-end: #2DD4A8;
  --surface: #050505;
  --text: #F2F2F2;
  --frame: #D4DBC4;
  --surface-card: #0E0E0E;
  --text-2: #999999;
  --text-3: #555555;
  --border: rgba(255, 255, 255, 0.05);
  --accent-glow: rgba(90, 236, 200, 0.15);
  --r-sm: 12px;
  --r-md: 18px;
  --r-lg: 26px;
  --r-xl: 36px;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  background: var(--surface);
  color: var(--text);
}

/* Marquee keyframes */
@keyframes marquee {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

.animate-marquee {
  animation: marquee 30s linear infinite;
}
```

**Step 5: Initialize git repo and commit**

```bash
git init
git add -A
git commit -m "chore: scaffold Next.js 16 project with Tailwind CSS 4 and Motion"
```

---

## Task 2: Root Layout (app/layout.tsx)

**Files:**
- Modify: `app/layout.tsx`

**Step 1: Write the root layout**

```tsx
import type { Metadata } from "next"
import { Playfair_Display, Outfit } from "next/font/google"
import "./globals.css"
import { SEO, SCHEMA_ORG } from "@/lib/content"

const playfair = Playfair_Display({
  subsets: ["latin", "latin-ext"],
  weight: ["500", "700", "900"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
})

const outfit = Outfit({
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-outfit",
  display: "swap",
})

export const metadata: Metadata = {
  title: SEO.home.title,
  description: SEO.home.description,
  keywords: SEO.home.keywords,
  openGraph: {
    title: SEO.home.title,
    description: SEO.home.description,
    type: "website",
    locale: "hr_HR",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="hr" className={`${playfair.variable} ${outfit.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(SCHEMA_ORG.localBusiness),
          }}
        />
      </head>
      <body className="font-outfit antialiased">
        {children}
      </body>
    </html>
  )
}
```

Note: `LazyMotion` wrapper goes in a separate client component to avoid making the root layout a client component. We'll create `components/providers/MotionProvider.tsx`.

**Step 2: Create MotionProvider client component**

```tsx
// components/providers/MotionProvider.tsx
"use client"

import { LazyMotion, domAnimation } from "motion/react"

export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <LazyMotion features={domAnimation}>{children}</LazyMotion>
}
```

**Step 3: Add font-family utility classes to globals.css**

Append to globals.css inside a `@theme` block or as custom utilities:

```css
@theme {
  --font-playfair: var(--font-playfair);
  --font-outfit: var(--font-outfit);
}
```

Or use Tailwind v4 approach with `@utility` or just reference font variables directly in class names.

**Step 4: Update layout.tsx to wrap children in MotionProvider**

Wrap `{children}` with `<MotionProvider>` and also include `<Nav />` and eventual `<Footer />`.

**Step 5: Verify dev server starts**

```bash
npm run dev
```

Expected: Server starts on localhost:3000 with dark background, correct fonts loading.

**Step 6: Commit**

```bash
git add -A
git commit -m "feat: root layout with Playfair+Outfit fonts, Motion provider, JSON-LD"
```

---

## Task 3: Navigation Component

**Files:**
- Create: `components/layout/Nav.tsx`
- Modify: `app/layout.tsx` (add Nav import)

**Step 1: Build Nav.tsx**

Key behaviors:
- `"use client"` — uses `useScroll`, `useMotionValueEvent`, `useState`
- Import `NAV`, `SITE` from `@/lib/content`
- Import `m`, `AnimatePresence` from `motion/react`
- Transparent initially → solid `var(--surface)` bg when scrolled past 50px
- Left: `<Image src="/images/volt-logo-dark-bg.svg" .../>` (or inline SVG)
- Center: `NAV.links` mapped to `<Link>` components
- Right: CTA button with mint gradient
- Mobile (below `lg` breakpoint): hamburger → fullscreen overlay
- Sticky `top-0 z-50`

Mobile overlay:
- Full-screen bg `var(--surface)` with opacity
- Links staggered with `m.div` reveal (y: 20→0, opacity: 0→1, staggerChildren: 0.08)
- Close button (X icon from Lucide)

**Step 2: Add Nav to layout.tsx**

Import and place `<Nav />` inside `<body>` above `{children}`.

**Step 3: Verify navigation renders correctly**

```bash
npm run dev
```

Test: transparent header on load, scroll down → solid bg, mobile hamburger works.

**Step 4: Commit**

```bash
git add components/layout/Nav.tsx app/layout.tsx
git commit -m "feat: responsive nav with scroll-aware transparency and mobile overlay"
```

---

## Task 4: Homepage Hero Section

**Files:**
- Create: `components/sections/Hero.tsx`
- Modify: `app/page.tsx`

**Step 1: Build Hero.tsx**

`"use client"` — needs `useState`, `useEffect`, `AnimatePresence`

Key elements:
- Badge pill: `HERO.badge` with `var(--accent)` border, rounded-full
- Heading: Playfair Display 900, responsive sizing (text-5xl→text-7xl)
  - Static part: `HERO.heading`
  - Rotating word: cycles through `HERO.rotatingWords` every 2.5s with `setInterval`
  - Word swap via `AnimatePresence` + `m.span` with `clipPath` animation:
    - Enter: `clipPath: "inset(0 100% 0 0)"` → `"inset(0 0% 0 0)"`
    - Exit: `clipPath: "inset(0 0% 0 0)"` → `"inset(0 0 0 100%)"`
- Subheading: Outfit 400, `var(--text-2)`, max-w-2xl
- CTAs: primary (gradient bg `var(--accent)` → `var(--accent-end)`, dark text) + secondary (outline/ghost)
- Trust line: `HERO.trust`, small text, `var(--text-3)`
- Full viewport height: `min-h-[calc(100vh-80px)]`, centered with flex

Staggered entrance:
```
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }
const fadeUp = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } } }
```

**Step 2: Wire into page.tsx**

```tsx
// app/page.tsx
import { Hero } from "@/components/sections/Hero"

export default function HomePage() {
  return (
    <main>
      <Hero />
    </main>
  )
}
```

**Step 3: Verify hero renders and animations work**

**Step 4: Commit**

```bash
git add components/sections/Hero.tsx app/page.tsx
git commit -m "feat: hero section with rotating words and staggered entrance"
```

---

## Task 5: Client Logos Marquee

**Files:**
- Create: `components/sections/ClientLogos.tsx`

**Step 1: Build ClientLogos.tsx**

Server Component (no hooks needed — pure CSS animation).

- Import `CLIENT_LOGOS` from content.ts
- Label text above marquee: `CLIENT_LOGOS.label`
- Greyscale placeholder items in a horizontal scroll
- CSS-only marquee using `.animate-marquee` class (defined in globals.css)
- Duplicate the items array (render twice) for seamless infinite loop
- Each placeholder: rounded pill/card with `var(--text-3)` text, `var(--border)` border
- `overflow-hidden` container, items in `flex gap-8`

**Step 2: Add to page.tsx after Hero**

**Step 3: Commit**

```bash
git add components/sections/ClientLogos.tsx app/page.tsx
git commit -m "feat: client logos marquee with CSS animation"
```

---

## Task 6: About Split Section

**Files:**
- Create: `components/sections/AboutSplit.tsx`

**Step 1: Build AboutSplit.tsx**

`"use client"` — needs scroll reveal via `m.div` with `whileInView`.

- Import `ABOUT_SECTION` from content.ts
- Two-column layout (stacks on mobile):
  - Left: placeholder image area (rounded-xl, aspect-[4/5], gray bg with accent gradient overlay)
  - Right: section label (small text, accent color), heading (Playfair), body text, then vision + mission cards
- Scroll reveal: `m.div` with `initial={{ opacity: 0, y: 24 }}` `whileInView={{ opacity: 1, y: 0 }}` `viewport={{ once: true, amount: 0.1 }}` `transition={{ duration: 0.6 }}`
- Max-w-[1100px] mx-auto, py-24

**Step 2: Add to page.tsx**

**Step 3: Commit**

```bash
git add components/sections/AboutSplit.tsx app/page.tsx
git commit -m "feat: about split section with vision/mission cards"
```

---

## Task 7: Services Grid

**Files:**
- Create: `components/sections/ServicesGrid.tsx`

**Step 1: Build ServicesGrid.tsx**

`"use client"` — needs scroll reveal + hover animations.

- Import `SERVICES` from content.ts
- Import icons from `lucide-react` (Phone, Palette, Code, Rocket)
- Section label + heading + subheading
- 4-card grid (2x2 on desktop, 1 col on mobile)
- Each card:
  - Number badge (01–04) in accent color
  - Icon from Lucide
  - Title (Playfair 700)
  - Description (Outfit 400, text-2)
  - Hover: `m.div` with `whileHover={{ y: -4 }}` + border-color → accent
  - Card bg: `var(--surface-card)`, rounded `var(--r-lg)`
- Stagger reveal on scroll

**Step 2: Add to page.tsx**

**Step 3: Commit**

```bash
git add components/sections/ServicesGrid.tsx app/page.tsx
git commit -m "feat: services grid with numbered cards and hover effects"
```

---

## Task 8: Keyword Marquee

**Files:**
- Create: `components/sections/KeywordMarquee.tsx`

**Step 1: Build KeywordMarquee.tsx**

Server Component — CSS-only animation.

- Import `MARQUEE_WORDS` from content.ts
- Full-width band, `py-8`, `var(--surface-card)` bg
- Words separated by `·` dots, large text (text-2xl+), `var(--text-3)`
- Reuse `.animate-marquee` from globals.css
- Duplicate word list for seamless loop

**Step 2: Add to page.tsx**

**Step 3: Commit**

```bash
git add components/sections/KeywordMarquee.tsx app/page.tsx
git commit -m "feat: keyword marquee with infinite CSS scroll"
```

---

## Task 9: Portfolio Grid

**Files:**
- Create: `components/sections/PortfolioGrid.tsx`

**Step 1: Build PortfolioGrid.tsx**

`"use client"` — needs scroll reveal.

- Import `PORTFOLIO` from content.ts
- Section label + heading + subheading
- Empty state: show `PORTFOLIO.emptyState` text with CTA link to /cijene
- Placeholder grid (3 items) with dark cards, hover overlay effect
  - Each card: aspect-[16/10], `var(--surface-card)` bg, rounded `var(--r-lg)`
  - On hover: overlay with "Uskoro" text + arrow icon
- CTA button linking to `/projekti`
- Max-w-[1100px], scroll reveal

**Step 2: Add to page.tsx**

**Step 3: Commit**

```bash
git add components/sections/PortfolioGrid.tsx app/page.tsx
git commit -m "feat: portfolio grid section with placeholder cards"
```

---

## Task 10: Stats Counters

**Files:**
- Create: `components/sections/StatsCounters.tsx`

**Step 1: Build StatsCounters.tsx**

`"use client"` — needs `useInView`, `useMotionValue`, `useTransform`, `animate` from `motion/react`.

- Import `STATS` from content.ts
- 4-column grid (2x2 on mobile, 4 on desktop)
- Each stat:
  - Animated counter: starts at 0, counts up to `item.value` when in view
  - Use `useInView` ref, then `animate(motionValue, target, { duration: 2, ease: "easeOut" })`
  - Use `useTransform` to round the value
  - Display `item.displayValue` if present, otherwise `value + suffix`
  - Label below counter
- Section label from `STATS.label`
- Full-width bg, py-24

Implementation pattern for each counter:
```tsx
function Counter({ value, suffix, displayValue }: { value: number; suffix: string; displayValue?: string }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.5 })
  const motionValue = useMotionValue(0)
  const rounded = useTransform(motionValue, (v) => Math.round(v))
  const [display, setDisplay] = useState("0")

  useEffect(() => {
    if (isInView) {
      if (displayValue) {
        setDisplay(displayValue)
        return
      }
      const controls = animate(motionValue, value, { duration: 2, ease: "easeOut" })
      const unsubscribe = rounded.on("change", (v) => setDisplay(`${v}${suffix}`))
      return () => { controls.stop(); unsubscribe() }
    }
  }, [isInView])

  return <span ref={ref}>{display}</span>
}
```

**Step 2: Add to page.tsx**

**Step 3: Commit**

```bash
git add components/sections/StatsCounters.tsx app/page.tsx
git commit -m "feat: animated stats counters with scroll-triggered counting"
```

---

## Task 11: Testimonials Section

**Files:**
- Create: `components/sections/Testimonials.tsx`

**Step 1: Build Testimonials.tsx**

`"use client"` — needs state for carousel + AnimatePresence.

- Import `TESTIMONIALS` from content.ts
- Section label + heading
- Quote carousel:
  - One testimonial visible at a time
  - AnimatePresence for slide transitions
  - Quote text in large italic Playfair
  - Client name, role, location below
  - Navigation dots or prev/next buttons
  - Auto-advance every 5s with `setInterval`
- Scroll reveal on the section wrapper

**Step 2: Add to page.tsx**

**Step 3: Commit**

```bash
git add components/sections/Testimonials.tsx app/page.tsx
git commit -m "feat: testimonials carousel with auto-advance"
```

---

## Task 12: Pricing Preview

**Files:**
- Create: `components/sections/PricingPreview.tsx`

**Step 1: Build PricingPreview.tsx**

`"use client"` — needs scroll reveal + hover.

- Import `PRICING_PREVIEW` from content.ts
- Section label + heading + subheading
- 3 tier cards in a row (stacks on mobile):
  - Each card: name, price (€ + period), description, feature list with checkmarks
  - "Popular" badge on the popular tier (Profesionalni)
  - Popular card: accent border, slightly scaled or elevated
  - Hover: `y: -4` + border highlight
  - Card bg: `var(--surface-card)`, rounded `var(--r-lg)`
- CTA button to /cijene
- Note text below: `PRICING_PREVIEW.note`
- Maintenance price shown as "+€XX/mj" below main price

**Step 2: Add to page.tsx**

**Step 3: Commit**

```bash
git add components/sections/PricingPreview.tsx app/page.tsx
git commit -m "feat: pricing preview with 3 tier cards"
```

---

## Task 13: EU Grant Banner

**Files:**
- Create: `components/sections/EuGrantBanner.tsx`

**Step 1: Build EuGrantBanner.tsx**

`"use client"` — needs scroll reveal.

- Import `EU_GRANT` from content.ts
- Different bg to stand out: `var(--frame)` (sage) with dark text
- Section label + heading + body
- 3 highlight cards: title, description, intensity percentage badge
- CTA button
- Disclaimer text in small print

**Step 2: Add to page.tsx**

**Step 3: Commit**

```bash
git add components/sections/EuGrantBanner.tsx app/page.tsx
git commit -m "feat: EU grant banner section with funding highlights"
```

---

## Task 14: FAQ Accordion

**Files:**
- Create: `components/sections/FaqAccordion.tsx`

**Step 1: Build FaqAccordion.tsx**

`"use client"` — needs `useState` + `AnimatePresence`.

- Import `FAQ`, `SCHEMA_ORG` from content.ts
- Section label + heading
- Accordion list: each item has question + expandable answer
  - Click question → toggle open/close
  - AnimatePresence with height animation (initial: `height: 0, opacity: 0` → `height: "auto", opacity: 1`)
  - Plus/minus or chevron icon toggle
  - Only one item open at a time (or allow multiple — single is more standard)
- Add FAQPage JSON-LD schema via `<script type="application/ld+json">`
- Max-w-[800px] mx-auto for readability

**Step 2: Add to page.tsx**

**Step 3: Commit**

```bash
git add components/sections/FaqAccordion.tsx app/page.tsx
git commit -m "feat: FAQ accordion with JSON-LD schema and AnimatePresence"
```

---

## Task 15: CTA Panel

**Files:**
- Create: `components/sections/CtaPanel.tsx`

**Step 1: Build CtaPanel.tsx**

`"use client"` — needs scroll reveal.

- Import `CTA_SECTION` from content.ts
- Glassmorphism card: `backdrop-blur-xl`, semi-transparent bg, accent border glow
- Heading: Playfair 700, large
- Subheading: Outfit, `var(--text-2)`
- Two CTA buttons: primary "Pošalji upit" + WhatsApp button (green tinted or accent)
- Trust line below
- Centered text, max-w-[700px]

**Step 2: Add to page.tsx**

**Step 3: Commit**

```bash
git add components/sections/CtaPanel.tsx app/page.tsx
git commit -m "feat: glassmorphism CTA panel with WhatsApp button"
```

---

## Task 16: Footer

**Files:**
- Create: `components/layout/Footer.tsx`
- Modify: `app/layout.tsx` (add Footer import)

**Step 1: Build Footer.tsx**

Server Component — no hooks needed.

- Import `FOOTER`, `SITE` from content.ts
- Dark bg: `var(--surface-card)`
- 4-column grid on desktop:
  1. Volt logo + `FOOTER.description`
  2. Navigation links column (from `FOOTER.columns.navigation`)
  3. Services links column (from `FOOTER.columns.services`)
  4. Contact info: address from `SITE.address`, phone, email, WhatsApp link
- Bottom bar: `SITE.copyright` left, legal links right
- Divider line with `var(--border)`
- py-16 top section, py-6 bottom bar

**Step 2: Add Footer to layout.tsx**

Place after `{children}` in the body.

**Step 3: Commit**

```bash
git add components/layout/Footer.tsx app/layout.tsx
git commit -m "feat: multi-column footer with contact info and legal links"
```

---

## Task 17: Final Assembly & Verification

**Files:**
- Verify: `app/page.tsx` (all 13 sections in order)
- Verify: `app/layout.tsx` (Nav + Footer + MotionProvider)

**Step 1: Ensure page.tsx has all sections in correct order**

```tsx
import { Hero } from "@/components/sections/Hero"
import { ClientLogos } from "@/components/sections/ClientLogos"
import { AboutSplit } from "@/components/sections/AboutSplit"
import { ServicesGrid } from "@/components/sections/ServicesGrid"
import { KeywordMarquee } from "@/components/sections/KeywordMarquee"
import { PortfolioGrid } from "@/components/sections/PortfolioGrid"
import { StatsCounters } from "@/components/sections/StatsCounters"
import { Testimonials } from "@/components/sections/Testimonials"
import { PricingPreview } from "@/components/sections/PricingPreview"
import { EuGrantBanner } from "@/components/sections/EuGrantBanner"
import { FaqAccordion } from "@/components/sections/FaqAccordion"
import { CtaPanel } from "@/components/sections/CtaPanel"

export default function HomePage() {
  return (
    <main>
      <Hero />
      <ClientLogos />
      <AboutSplit />
      <ServicesGrid />
      <KeywordMarquee />
      <PortfolioGrid />
      <StatsCounters />
      <Testimonials />
      <PricingPreview />
      <EuGrantBanner />
      <FaqAccordion />
      <CtaPanel />
    </main>
  )
}
```

**Step 2: Run build to check for errors**

```bash
npm run build
```

Expected: Build succeeds with no TypeScript or import errors.

**Step 3: Run lint**

```bash
npm run lint
```

Expected: No linting errors.

**Step 4: Run type-check**

```bash
npx tsc --noEmit
```

Expected: No type errors.

**Step 5: Visual verification**

```bash
npm run dev
```

Open localhost:3000 and verify:
- Dark background with correct colors
- Playfair headings + Outfit body text
- Nav transparent → solid on scroll
- Hero with rotating words
- All 13 sections render in order
- Scroll animations trigger correctly
- Mobile responsive at all breakpoints
- No console errors

**Step 6: Final commit**

```bash
git add -A
git commit -m "feat: complete homepage with all 13 sections, nav, and footer"
```

---

## Critical Reminders

1. **Import from `motion/react`** — NOT `framer-motion`
2. **Use `m` components** — NOT `motion.div` (LazyMotion requires `m`)
3. **No Tailwind transition classes** on Motion-animated elements
4. **All text from content.ts** — zero hardcoded Croatian strings
5. **Named exports** everywhere except page.tsx default exports
6. **`"use client"` only where needed** — Nav, Hero, Testimonials, FAQ, Stats, etc. Server for ClientLogos, KeywordMarquee, Footer
7. **Fonts**: Playfair Display for headings, Outfit for body. No Inter/Roboto.
8. **CSS vars for all colors/radii** — no hex codes in components
