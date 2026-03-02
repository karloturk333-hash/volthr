# O Nama Page Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build the `/o-nama` (About Us) route — 5 sections: hero, founder story with stock portrait, values 4-card grid, 5-step horizontal process timeline, and dark CTA panel.

**Architecture:** Server Component page at `app/o-nama/page.tsx` imports 4 new `"use client"` section components (motion animations) plus the existing `CtaPanel`. All content from `lib/content.ts → ABOUT_PAGE`. No new dependencies.

**Tech Stack:** Next.js 16 App Router, React 19, Tailwind CSS 4, Motion 12 (`motion/react`), TypeScript strict

---

## Reference files (read before starting)

- `lib/content.ts` — `ABOUT_PAGE`, `SEO` exports (all copy lives here)
- `lib/animations.ts` — `fadeUp`, `staggerContainer`, `staggerContainerSlow`, `heroWord`, `heroStagger`, `slideFromLeft`, `slideFromRight`
- `components/sections/AboutSplit.tsx` — pattern for 2-col layout + Counter
- `components/sections/CtaPanel.tsx` — reuse unchanged
- `app/globals.css` — `.section-label` class (auto-adds ✦ prefix)
- `docs/plans/2026-03-02-o-nama-design.md` — approved design spec

## Design constraints (non-negotiable)

- Background `#F5F4F0` on all sections except CtaPanel
- No `transition-*` / `duration-*` Tailwind classes on Motion-animated elements
- Import Motion as `import { m, AnimatePresence } from "motion/react"` — NOT framer-motion
- All Motion-using components need `"use client"`
- Named exports only (no default exports except `page.tsx`)
- `whileInView` + `viewport={{ once: true, amount: 0.1 }}` on all scroll sections
- All copy is Croatian — never change it

---

## Task 1: Page shell

**Files:**
- Create: `app/o-nama/page.tsx`

**Step 1: Create the page with just metadata and a placeholder**

```tsx
import type { Metadata } from "next"
import { SEO } from "@/lib/content"

export const metadata: Metadata = {
  title: SEO.pages.about.title,
  description: SEO.pages.about.description,
}

export default function ONamaPage() {
  return (
    <main>
      <p>O nama</p>
    </main>
  )
}
```

**Step 2: Check it compiles**

```bash
npx tsc --noEmit
npm run lint
```

Expected: 0 errors. If `SEO.pages.about` path differs, read `lib/content.ts` and adjust.

**Step 3: Verify in browser**

Navigate to `http://localhost:300x/o-nama` — should render "O nama" text.

**Step 4: Commit**

```bash
git add app/o-nama/page.tsx
git commit -m "feat: add /o-nama route shell"
```

---

## Task 2: AboutHero component

**Files:**
- Create: `components/sections/AboutHero.tsx`

**Step 1: Create the component**

```tsx
"use client"

import { m } from "motion/react"
import { ABOUT_PAGE } from "@/lib/content"
import { heroStagger, heroWord } from "@/lib/animations"

export function AboutHero() {
  const words = ABOUT_PAGE.hero.heading.split(" ")

  return (
    <section className="bg-[#F5F4F0] px-6 py-32 md:py-40">
      <div className="mx-auto max-w-3xl text-center">

        {/* Label */}
        <m.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mb-6 flex flex-col items-center gap-3"
        >
          <span className="section-label">{ABOUT_PAGE.hero.label}</span>
          <div className="h-px w-12 bg-[#8B5CF6]" />
        </m.div>

        {/* Heading — word stagger */}
        <m.h1
          className="font-space text-4xl font-bold leading-[1.05] text-[#0D0D0D] md:text-5xl lg:text-6xl"
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

      </div>
    </section>
  )
}
```

**Step 2: Wire into page**

```tsx
// app/o-nama/page.tsx
import { AboutHero } from "@/components/sections/AboutHero"

export default function ONamaPage() {
  return (
    <main>
      <AboutHero />
    </main>
  )
}
```

**Step 3: Type-check + lint**

```bash
npx tsc --noEmit && npm run lint
```

**Step 4: Visual check**

- Words should stagger in on load
- Centered text, warm white background
- Purple `2px` rule under label

**Step 5: Commit**

```bash
git add components/sections/AboutHero.tsx app/o-nama/page.tsx
git commit -m "feat: add AboutHero section"
```

---

## Task 3: AboutStory component

**Files:**
- Create: `components/sections/AboutStory.tsx`

**Step 1: Create the component**

```tsx
"use client"

import { m } from "motion/react"
import { ABOUT_PAGE } from "@/lib/content"
import { slideFromLeft, slideFromRight } from "@/lib/animations"

export function AboutStory() {
  return (
    <section className="bg-[#F5F4F0] px-6 py-24 md:px-12 md:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">

          {/* Left — text */}
          <m.div
            variants={slideFromLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            <span className="section-label mb-4 block">{ABOUT_PAGE.story.label ?? "Zašto Volt?"}</span>
            <h2 className="font-space text-3xl font-bold text-[#0D0D0D] md:text-4xl lg:text-5xl">
              {ABOUT_PAGE.story.heading}
            </h2>
            <div className="mt-6 flex flex-col gap-4">
              {ABOUT_PAGE.story.paragraphs.map((p, i) => (
                <p key={i} className="text-base leading-relaxed text-[#555550] md:text-lg">
                  {p}
                </p>
              ))}
            </div>
          </m.div>

          {/* Right — portrait */}
          <m.div
            variants={slideFromRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="relative"
          >
            {/* Decorative accent */}
            <span className="absolute right-4 top-4 z-10 text-2xl text-[#8B5CF6] opacity-70">✦</span>

            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?w=800&auto=format&fit=crop&q=80"
              alt="Developer at work"
              className="aspect-[4/5] w-full rounded-2xl border border-[#E8E6E0] object-cover"
            />
          </m.div>

        </div>
      </div>
    </section>
  )
}
```

> **Note on content.ts:** If `ABOUT_PAGE.story` doesn't have a `label` field, use the literal string `"Zašto Volt?"` directly (remove the `??` fallback). Read `lib/content.ts` to confirm the shape.

**Step 2: Add to page**

```tsx
import { AboutHero } from "@/components/sections/AboutHero"
import { AboutStory } from "@/components/sections/AboutStory"

export default function ONamaPage() {
  return (
    <main>
      <AboutHero />
      <AboutStory />
    </main>
  )
}
```

**Step 3: Type-check + lint**

```bash
npx tsc --noEmit && npm run lint
```

**Step 4: Visual check**

- Text slides in from left, image from right on scroll
- Portrait `aspect-[4/5]`, rounded, with border
- ✦ dot top-right of image
- No layout shift on mobile (stacks to single column)

**Step 5: Commit**

```bash
git add components/sections/AboutStory.tsx app/o-nama/page.tsx
git commit -m "feat: add AboutStory section with stock portrait"
```

---

## Task 4: AboutValues component

**Files:**
- Create: `components/sections/AboutValues.tsx`

**Step 1: Create the component**

```tsx
"use client"

import { m } from "motion/react"
import { ABOUT_PAGE } from "@/lib/content"
import { fadeUp, staggerContainer } from "@/lib/animations"

export function AboutValues() {
  return (
    <section className="bg-[#F5F4F0] px-6 py-24 md:px-12 md:py-32">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <m.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="mb-12"
        >
          <span className="section-label mb-3 block">{ABOUT_PAGE.values.label ?? "Vrijednosti"}</span>
          <h2 className="font-space text-3xl font-bold text-[#0D0D0D] md:text-4xl">
            {ABOUT_PAGE.values.heading}
          </h2>
        </m.div>

        {/* Cards */}
        <m.div
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-4"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {ABOUT_PAGE.values.items.map((item, i) => (
            <m.div
              key={item.title}
              variants={fadeUp}
              whileHover={{ scale: 1.02 }}
              className="flex flex-col rounded-xl border border-[#E8E6E0] bg-white p-8"
            >
              <span className="font-mono text-xs text-[#999994]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 font-space text-lg font-bold text-[#0D0D0D]">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[#555550]">
                {item.description}
              </p>
            </m.div>
          ))}
        </m.div>

      </div>
    </section>
  )
}
```

> **Note:** If `ABOUT_PAGE.values` doesn't have a `label` field, remove `{ABOUT_PAGE.values.label ?? "Vrijednosti"}` and use the literal string directly.

**Step 2: Add to page**

```tsx
import { AboutValues } from "@/components/sections/AboutValues"
// ... add <AboutValues /> after <AboutStory />
```

**Step 3: Type-check + lint**

```bash
npx tsc --noEmit && npm run lint
```

**Step 4: Visual check**

- 4 cards in row on lg, 2×2 on md, single column on mobile
- Cards have numbered index (01–04), bold title, body text
- Hover: subtle 1.02 scale
- Stagger in from bottom on scroll

**Step 5: Commit**

```bash
git add components/sections/AboutValues.tsx app/o-nama/page.tsx
git commit -m "feat: add AboutValues 4-card section"
```

---

## Task 5: AboutProcess component

**Files:**
- Create: `components/sections/AboutProcess.tsx`

**Step 1: Create the component**

```tsx
"use client"

import { m } from "motion/react"
import { ABOUT_PAGE } from "@/lib/content"
import { fadeUp, staggerContainerSlow } from "@/lib/animations"

export function AboutProcess() {
  return (
    <section className="bg-[#F5F4F0] px-6 py-24 md:px-12 md:py-32">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <m.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="mb-16"
        >
          <span className="section-label mb-3 block">{ABOUT_PAGE.process.label ?? "Kako radimo"}</span>
          <h2 className="font-space text-3xl font-bold text-[#0D0D0D] md:text-4xl">
            {ABOUT_PAGE.process.heading}
          </h2>
        </m.div>

        {/* Desktop: horizontal timeline */}
        <m.div
          className="hidden lg:flex lg:items-start lg:gap-0"
          variants={staggerContainerSlow}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {ABOUT_PAGE.process.steps.map((step, i) => (
            <m.div
              key={step.day}
              variants={fadeUp}
              className="relative flex flex-1 flex-col items-center px-4 text-center"
            >
              {/* Connecting line — left half (hidden on first) */}
              {i > 0 && (
                <div className="absolute left-0 top-[22px] h-px w-1/2 bg-[#E8E6E0]" />
              )}
              {/* Connecting line — right half (hidden on last) */}
              {i < ABOUT_PAGE.process.steps.length - 1 && (
                <div className="absolute right-0 top-[22px] h-px w-1/2 bg-[#E8E6E0]" />
              )}

              {/* Node */}
              <div className="relative z-10 mb-4 flex h-11 w-11 items-center justify-center rounded-full border-2 border-[#8B5CF6] bg-[#F5F4F0]">
                <div className="h-3 w-3 rounded-full bg-[#8B5CF6]" />
              </div>

              {/* Day label */}
              <span className="mb-1 font-mono text-xs font-semibold uppercase tracking-widest text-[#8B5CF6]">
                {step.day}
              </span>

              {/* Title */}
              <h3 className="font-space text-sm font-bold text-[#0D0D0D]">
                {step.title}
              </h3>

              {/* Description */}
              <p className="mt-2 text-xs leading-relaxed text-[#555550]">
                {step.description}
              </p>
            </m.div>
          ))}
        </m.div>

        {/* Mobile: vertical stack */}
        <m.div
          className="flex flex-col gap-0 lg:hidden"
          variants={staggerContainerSlow}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {ABOUT_PAGE.process.steps.map((step, i) => (
            <m.div
              key={step.day}
              variants={fadeUp}
              className="relative flex gap-6 pb-10 last:pb-0"
            >
              {/* Left line + node */}
              <div className="flex flex-col items-center">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 border-[#8B5CF6] bg-[#F5F4F0]">
                  <div className="h-3 w-3 rounded-full bg-[#8B5CF6]" />
                </div>
                {/* Vertical line — hidden on last */}
                {i < ABOUT_PAGE.process.steps.length - 1 && (
                  <div className="mt-2 flex-1 w-px bg-[#E8E6E0]" />
                )}
              </div>

              {/* Content */}
              <div className="pt-2">
                <span className="font-mono text-xs font-semibold uppercase tracking-widest text-[#8B5CF6]">
                  {step.day}
                </span>
                <h3 className="mt-1 font-space text-base font-bold text-[#0D0D0D]">
                  {step.title}
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-[#555550]">
                  {step.description}
                </p>
              </div>
            </m.div>
          ))}
        </m.div>

      </div>
    </section>
  )
}
```

**Step 2: Add to page**

```tsx
import { AboutProcess } from "@/components/sections/AboutProcess"
// ... add <AboutProcess /> after <AboutValues />
```

**Step 3: Type-check + lint**

```bash
npx tsc --noEmit && npm run lint
```

**Step 4: Visual check**

- Desktop: 5 nodes in a row connected by horizontal lines, purple circles, day label + title + description below each
- Mobile: vertical stack with connecting lines, nodes on left
- Stagger: each step fades in slightly after the previous

**Step 5: Commit**

```bash
git add components/sections/AboutProcess.tsx app/o-nama/page.tsx
git commit -m "feat: add AboutProcess horizontal timeline"
```

---

## Task 6: Wire CtaPanel + finalize page

**Files:**
- Modify: `app/o-nama/page.tsx`

**Step 1: Add JSON-LD and complete the page**

```tsx
import type { Metadata } from "next"
import { SEO } from "@/lib/content"
import { AboutHero } from "@/components/sections/AboutHero"
import { AboutStory } from "@/components/sections/AboutStory"
import { AboutValues } from "@/components/sections/AboutValues"
import { AboutProcess } from "@/components/sections/AboutProcess"
import { CtaPanel } from "@/components/sections/CtaPanel"

export const metadata: Metadata = {
  title: SEO.pages.about.title,
  description: SEO.pages.about.description,
}

export default function ONamaPage() {
  return (
    <main>
      <AboutHero />
      <AboutStory />
      <AboutValues />
      <AboutProcess />
      <CtaPanel />
    </main>
  )
}
```

> **Note on SEO path:** Read `lib/content.ts` to confirm the exact path to the about page SEO object. Could be `SEO.pages.about`, `SEO.about`, or `META.about`.

**Step 2: Final type-check + lint**

```bash
npx tsc --noEmit && npm run lint
```

Expected: 0 errors, 0 warnings.

**Step 3: Full page visual walkthrough**

Check at `http://localhost:300x/o-nama`:
- [ ] Nav shows correctly (no overlap with hero padding)
- [ ] Hero: words stagger in, centered, purple rule under label
- [ ] Story: 2-col on desktop, portrait loads, slides in on scroll
- [ ] Values: 4 cards visible, hover scale works
- [ ] Process: horizontal timeline on desktop, vertical on mobile
- [ ] CTA: dark section renders at bottom
- [ ] Mobile (375px): all sections stack correctly, no overflow

**Step 4: Final commit**

```bash
git add app/o-nama/page.tsx
git commit -m "feat: complete /o-nama page — hero, story, values, process, CTA"
```

---

## Verification checklist

- [ ] `npx tsc --noEmit` — 0 errors
- [ ] `npm run lint` — 0 errors
- [ ] Route `/o-nama` loads without console errors
- [ ] All 5 sections visible on desktop and mobile
- [ ] Animations trigger on scroll (not on load)
- [ ] No Tailwind `transition-*` classes on animated elements
- [ ] All text is Croatian (unchanged from `lib/content.ts`)
- [ ] Stock photo loads from Unsplash URL
