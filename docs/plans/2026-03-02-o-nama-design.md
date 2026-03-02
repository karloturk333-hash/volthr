# O nama — Page Design

**Date:** 2026-03-02
**Route:** `/o-nama`
**Approach:** Option A — Editorial narrative

---

## Page Structure

| # | Section | Component | Content source |
|---|---------|-----------|----------------|
| 1 | Hero | `AboutHero` | `ABOUT_PAGE.hero` |
| 2 | Story | `AboutStory` | `ABOUT_PAGE.story` + stock portrait |
| 3 | Values | `AboutValues` | `ABOUT_PAGE.values` |
| 4 | Process | `AboutProcess` | `ABOUT_PAGE.process` |
| 5 | CTA | `CtaPanel` (reuse) | existing |

---

## Section Specs

### 1. AboutHero
- Full-width, `py-32 md:py-40`, centered column `max-w-3xl mx-auto`
- Section label: `✦ O nama`
- H1: `ABOUT_PAGE.hero.heading` — `font-space font-bold text-4xl md:text-5xl lg:text-6xl` tight leading
- Purple `2px` horizontal rule under label
- No CTA buttons — narrative page, let the headline breathe
- Animation: `heroWord` + `heroStagger` from `lib/animations.ts` (word split stagger)

### 2. AboutStory
- 2-column `lg:grid-cols-2 gap-16`
- **Left:** label `✦ Zašto Volt?` + `ABOUT_PAGE.story.heading` (H2) + 3 paragraphs
- **Right:** Stock portrait (`aspect-[4/5] rounded-2xl object-cover border border-[#E8E6E0]`)
  - Unsplash: `https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=800&q=80` (developer at desk)
  - Decorative `✦` in `text-[#8B5CF6]` positioned `top-4 right-4` inside image wrapper
- Animation: `slideFromLeft` (text) + `slideFromRight` (image) from `lib/animations.ts`

### 3. AboutValues
- Section label `✦ Vrijednosti` + H2
- 4-card grid: `grid md:grid-cols-2 lg:grid-cols-4 gap-6`
- Each card: `bg-white border border-[#E8E6E0] rounded-xl p-8`
  - Index `01`–`04` in `text-xs font-mono text-[#999994]` top-left
  - Title: `font-space font-bold text-lg text-[#0D0D0D] mt-3`
  - Description: `text-sm text-[#555550] leading-relaxed mt-2`
  - `whileHover={{ scale: 1.02 }}`
- Animation: `staggerContainer` + `fadeUp`

### 4. AboutProcess
- Section label `✦ Kako radimo` + H2
- Desktop (`lg+`): horizontal flex timeline
  - Each step: flex column, centered, `flex-1`
  - Step node: `w-3 h-3 rounded-full bg-[#8B5CF6]` on a `h-[2px] bg-[#E8E6E0]` connecting line
  - Day label: `text-xs font-mono text-[#8B5CF6] uppercase tracking-widest`
  - Title: `font-space font-semibold text-[#0D0D0D]`
  - Description: `text-sm text-[#555550] leading-relaxed`
- Mobile (`<lg`): vertical stack, left border line `border-l-2 border-[#E8E6E0]`, steps offset `pl-6`
  - Step node: `w-3 h-3 rounded-full bg-[#8B5CF6]` positioned on the left border
- Animation: `staggerContainerSlow` (0.15s stagger) + `fadeUp` per step

### 5. CtaPanel (reuse)
- Import and render existing `CtaPanel` component unchanged

---

## Files

**Create:**
- `app/o-nama/page.tsx` — Server Component, imports SEO from `SEO.about`, renders sections
- `components/sections/AboutHero.tsx` — `"use client"` (motion)
- `components/sections/AboutStory.tsx` — `"use client"` (motion)
- `components/sections/AboutValues.tsx` — `"use client"` (motion + hover)
- `components/sections/AboutProcess.tsx` — `"use client"` (motion)

**Reuse:**
- `components/sections/CtaPanel.tsx` — unchanged
- `lib/animations.ts` — import `fadeUp`, `staggerContainer`, `staggerContainerSlow`, `heroWord`, `heroStagger`, `slideFromLeft`, `slideFromRight`
- `lib/content.ts` — import `ABOUT_PAGE`, `SEO`, `SITE`

---

## Design Constraints (non-negotiable)
- Background `#F5F4F0` everywhere except CtaPanel (`#0D0D0D`)
- No glassmorphism, no backdrop-blur
- All text Croatian — never change copy
- Import from `motion/react` as `m`, not `framer-motion`
- Remove all `transition-*` Tailwind classes from Motion-animated elements
- `"use client"` only where hooks or event handlers are used
