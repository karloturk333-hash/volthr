# Usluge Page Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build the `/usluge` (Services) route — editorial scrolling chapters with giant decorative number backdrops, stock photos, feature lists, and anchor navigation.

**Architecture:** Server Component page at `app/usluge/page.tsx`. Two new `"use client"` section components (`ServicesHero`, `ServicesChapters`) plus the existing `CtaPanel`. All content from `lib/content.ts → SERVICES_PAGE`. Post-build Playwright visual review pass.

**Tech Stack:** Next.js 16 App Router, React 19, Tailwind CSS 4, Motion 12 (`motion/react`), lucide-react (`Check`), TypeScript strict

---

## Reference files (read before starting)

- `lib/content.ts` — `SERVICES_PAGE` (hero + 5 services with slug, title, headline, description, features), `SEO.services`
- `lib/animations.ts` — `fadeUp`, `staggerContainer`, `staggerContainerSlow`, `heroWord`, `heroStagger`, `slideFromLeft`, `slideFromRight`
- `docs/plans/2026-03-02-usluge-design.md` — approved design spec with all exact values
- `components/sections/AboutHero.tsx` — pattern for hero word-stagger
- `components/sections/AboutStory.tsx` — pattern for 2-col slide animations
- `components/sections/CtaPanel.tsx` — reuse unchanged
- `app/globals.css` — `.section-label` utility

## Design constraints (non-negotiable)

- Alternating section backgrounds: `#F5F4F0` (even index) and `#FFFFFF` (odd index)
- Giant number: `clamp(160px, 18vw, 260px)` Space Grotesk Black, color `#EBEBEA`, absolute positioned, clipped by `overflow-hidden`
- No dark backgrounds except CtaPanel
- No `transition-*` / `duration-*` Tailwind on Motion-animated elements
- `import { m } from "motion/react"` — never framer-motion
- Named exports only; default export only for `page.tsx`
- `"use client"` on `ServicesHero` and `ServicesChapters`

---

## Task 1: Page shell

**Files:**
- Create: `app/usluge/page.tsx`

**Step 1: Confirm SEO path**

Read `lib/content.ts` and find `SEO.services`. Should be:
```typescript
SEO.services.title
SEO.services.description
```

**Step 2: Create the page**

```tsx
import type { Metadata } from "next"
import { SEO } from "@/lib/content"

export const metadata: Metadata = {
  title: SEO.services.title,
  description: SEO.services.description,
}

export default function UslugePage() {
  return (
    <main>
      <p>Usluge</p>
    </main>
  )
}
```

**Step 3: Type-check**

```bash
npx tsc --noEmit
```

Expected: 0 errors.

**Step 4: Commit**

```bash
git add app/usluge/page.tsx
git commit -m "feat: add /usluge route shell"
```

---

## Task 2: ServicesHero component

**Files:**
- Create: `components/sections/ServicesHero.tsx`

**Step 1: Create the component**

```tsx
"use client"

import { m } from "motion/react"
import Link from "next/link"
import { SERVICES_PAGE } from "@/lib/content"
import { heroStagger, heroWord, fadeUp } from "@/lib/animations"

export function ServicesHero() {
  const words = SERVICES_PAGE.hero.heading.split(" ")

  return (
    <section className="bg-[#F5F4F0] px-6 py-32 md:py-40">
      <div className="mx-auto max-w-3xl text-center">

        {/* Label + rule */}
        <m.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mb-6 flex flex-col items-center gap-3"
        >
          <span className="section-label">{SERVICES_PAGE.hero.label}</span>
          <div className="h-px w-12 bg-[#8B5CF6]" />
        </m.div>

        {/* H1 — word stagger */}
        <m.h1
          className="font-space text-4xl font-bold leading-[1.08] text-[#0D0D0D] md:text-5xl lg:text-6xl"
          variants={heroStagger}
          initial="hidden"
          animate="visible"
        >
          {words.map((word, i) => (
            <m.span
              key={i}
              variants={heroWord}
              className="mr-[0.25em] inline-block last:mr-0"
            >
              {word}
            </m.span>
          ))}
        </m.h1>

        {/* Subheading */}
        <m.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 text-base leading-relaxed text-[#555550] md:text-lg"
        >
          {SERVICES_PAGE.hero.subheading}
        </m.p>

        {/* Anchor nav strip */}
        <m.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 flex flex-wrap justify-center gap-x-6 gap-y-3"
        >
          {SERVICES_PAGE.services.map((service, i) => (
            <a
              key={service.slug}
              href={`#${service.slug}`}
              className="font-mono text-[11px] uppercase tracking-widest text-[#888880] hover:text-[#8B5CF6]"
              style={{ transition: "color 0.2s ease" }}
            >
              <span className="text-[#8B5CF6]">{String(i + 1).padStart(2, "0")}</span>
              {" "}
              {service.title}
            </a>
          ))}
        </m.div>

      </div>
    </section>
  )
}
```

**Step 2: Wire into page**

```tsx
// app/usluge/page.tsx
import { ServicesHero } from "@/components/sections/ServicesHero"

export default function UslugePage() {
  return (
    <main>
      <ServicesHero />
    </main>
  )
}
```

**Step 3: Type-check + lint**

```bash
npx tsc --noEmit && npx eslint app/usluge/ components/sections/ServicesHero.tsx
```

**Step 4: Commit**

```bash
git add components/sections/ServicesHero.tsx app/usluge/page.tsx
git commit -m "feat: add ServicesHero with word stagger + anchor nav"
```

---

## Task 3: ServicesChapters component

**Files:**
- Create: `components/sections/ServicesChapters.tsx`

**Step 1: Define stock photo map**

Each service slug maps to an Unsplash photo. These are hardcoded since they're design assets, not content:

```typescript
const servicePhotos: Record<string, string> = {
  "dizajn":    "https://images.unsplash.com/photo-1558655146-d09347e92766?w=800&auto=format&fit=crop&q=80",
  "razvoj":    "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&auto=format&fit=crop&q=80",
  "seo":       "https://images.unsplash.com/photo-1562577309-4932fdd64cd1?w=800&auto=format&fit=crop&q=80",
  "web-shop":  "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&auto=format&fit=crop&q=80",
  "odrzavanje":"https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=80",
}
```

**Step 2: Create the component**

```tsx
"use client"

import { m } from "motion/react"
import Link from "next/link"
import { Check } from "lucide-react"
import { SERVICES_PAGE } from "@/lib/content"
import {
  fadeUp,
  staggerContainer,
  staggerContainerSlow,
  slideFromLeft,
  slideFromRight,
} from "@/lib/animations"

const servicePhotos: Record<string, string> = {
  "dizajn":     "https://images.unsplash.com/photo-1558655146-d09347e92766?w=800&auto=format&fit=crop&q=80",
  "razvoj":     "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&auto=format&fit=crop&q=80",
  "seo":        "https://images.unsplash.com/photo-1562577309-4932fdd64cd1?w=800&auto=format&fit=crop&q=80",
  "web-shop":   "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&auto=format&fit=crop&q=80",
  "odrzavanje": "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=80",
}

export function ServicesChapters() {
  return (
    <>
      {SERVICES_PAGE.services.map((service, i) => {
        const isEven = i % 2 === 0
        const bg = isEven ? "bg-[#F5F4F0]" : "bg-white"
        const textVariant = isEven ? slideFromLeft : slideFromRight
        const visualVariant = isEven ? slideFromRight : slideFromLeft
        const photoUrl = servicePhotos[service.slug]

        return (
          <section
            key={service.slug}
            id={service.slug}
            className={`relative overflow-hidden px-6 py-28 md:px-12 md:py-36 ${bg}`}
          >
            {/* Giant decorative number */}
            <span
              className={[
                "pointer-events-none absolute top-0 select-none font-space font-black leading-none text-[#EBEBEA]",
                isEven ? "-right-4 -translate-y-1/4" : "-left-4 -translate-y-1/4",
              ].join(" ")}
              style={{ fontSize: "clamp(160px, 18vw, 260px)" }}
              aria-hidden="true"
            >
              {String(i + 1).padStart(2, "0")}
            </span>

            {/* Content grid */}
            <m.div
              className="relative mx-auto max-w-7xl"
              variants={staggerContainerSlow}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
            >
              <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-20">

                {/* Text column */}
                <m.div
                  variants={textVariant}
                  className={isEven ? "" : "lg:order-2"}
                >
                  <span className="section-label mb-3 block">{service.title}</span>
                  <h2 className="font-space text-3xl font-bold leading-tight text-[#0D0D0D] md:text-4xl lg:text-5xl">
                    {service.headline}
                  </h2>
                  <p className="mt-6 text-base leading-relaxed text-[#555550] md:text-lg">
                    {service.description}
                  </p>
                  <Link
                    href="/kontakt"
                    className="mt-8 inline-block rounded-full bg-[#0D0D0D] px-8 py-3 font-dm text-sm font-semibold text-white hover:opacity-90"
                    style={{ transition: "opacity 0.2s ease" }}
                  >
                    Zatraži konzultaciju
                  </Link>
                </m.div>

                {/* Visual column */}
                <m.div
                  variants={visualVariant}
                  className={isEven ? "" : "lg:order-1"}
                >
                  {/* Stock photo */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={photoUrl}
                    alt={service.title}
                    className="aspect-[16/10] w-full rounded-2xl border border-[#E8E6E0] object-cover"
                  />

                  {/* Feature list */}
                  <m.ul
                    className="mt-6 flex flex-col gap-3"
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                  >
                    {service.features.map((feature) => (
                      <m.li
                        key={feature}
                        variants={fadeUp}
                        className="flex items-start gap-3"
                      >
                        <Check
                          size={16}
                          className="mt-0.5 shrink-0 text-[#8B5CF6]"
                        />
                        <span className="text-sm text-[#555550]">{feature}</span>
                      </m.li>
                    ))}
                  </m.ul>
                </m.div>

              </div>
            </m.div>
          </section>
        )
      })}
    </>
  )
}
```

**Step 3: Wire into page**

```tsx
// app/usluge/page.tsx — complete version
import type { Metadata } from "next"
import { SEO } from "@/lib/content"
import { ServicesHero } from "@/components/sections/ServicesHero"
import { ServicesChapters } from "@/components/sections/ServicesChapters"
import { CtaPanel } from "@/components/sections/CtaPanel"

export const metadata: Metadata = {
  title: SEO.services.title,
  description: SEO.services.description,
}

export default function UslugePage() {
  return (
    <main>
      <ServicesHero />
      <ServicesChapters />
      <CtaPanel />
    </main>
  )
}
```

**Step 4: Type-check + lint new files only**

```bash
npx tsc --noEmit && npx eslint app/usluge/ components/sections/ServicesHero.tsx components/sections/ServicesChapters.tsx
```

Expected: 0 errors, 0 warnings.

**Step 5: Commit**

```bash
git add components/sections/ServicesChapters.tsx app/usluge/page.tsx
git commit -m "feat: add ServicesChapters — editorial chapters with giant number backdrops"
```

---

## Task 4: Playwright visual review + refinements

**Step 1: Start dev server if not running**

```bash
npm run dev
```

Navigate to `http://localhost:3000/usluge` (or whatever port is active).

**Step 2: Take Playwright screenshot**

Use the Playwright MCP tool or run:
```bash
node scripts/design-check.js
```

Or use mcp__playwright__browser_navigate + mcp__playwright__browser_take_screenshot to capture the page.

**Step 3: Review checklist**

Check these visually:
- [ ] Hero: words stagger in, anchor links render correctly below subheading
- [ ] Each chapter: giant number is visible but subtle (not overwhelming)
- [ ] Alternating bg: F5F4F0 / white rhythm is clear
- [ ] Text + visual columns align well, columns swap on even/odd
- [ ] Stock photos load (check network tab if not)
- [ ] Feature lists render with purple check marks
- [ ] CTA buttons present in each chapter
- [ ] Mobile: stacks to single column cleanly
- [ ] No overflow / horizontal scroll

**Step 4: Apply refinements**

Common adjustments after visual review:
- Giant number too large/small → adjust `clamp()` values
- Number overlaps content → increase `py-` values or adjust `translate`
- Photo feels too tall → change `aspect-[16/10]` to `aspect-[3/2]`
- Chapter spacing feels uneven → adjust `py-28 md:py-36`

**Step 5: Final commit after refinements**

```bash
git add -p  # stage only changed files
git commit -m "design: visual polish pass on /usluge after Playwright review"
```

---

## Verification checklist

- [ ] `npx tsc --noEmit` — 0 errors
- [ ] `npx eslint app/usluge/ components/sections/ServicesHero.tsx components/sections/ServicesChapters.tsx` — 0 errors
- [ ] Route `/usluge` loads without console errors
- [ ] Hero words stagger on load
- [ ] Anchor links (`#dizajn`, `#razvoj`, etc.) scroll to correct sections
- [ ] 5 chapters render, alternating F5F4F0 / white backgrounds
- [ ] Giant numbers visible and clipped at section edges
- [ ] Stock photos load
- [ ] Feature lists render with Check icons
- [ ] CtaPanel renders at bottom
- [ ] Responsive: all sections stack to single column on mobile
