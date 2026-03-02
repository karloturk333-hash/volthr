# Usluge — Page Design

**Date:** 2026-03-02
**Route:** `/usluge`
**Approach:** Editorial scrolling chapters with giant decorative number backdrops

---

## Page Structure

| # | Section | Component | Content source |
|---|---------|-----------|----------------|
| 1 | Hero + nav strip | `ServicesHero` | `SERVICES_PAGE.hero` |
| 2 | 5 service chapters | `ServicesChapters` | `SERVICES_PAGE.services` |
| 3 | CTA | `CtaPanel` (reuse) | existing |

---

## Section Specs

### 1. ServicesHero
- Centered column `max-w-3xl`, `py-32 md:py-40`
- Section label: `✦ Usluge`
- H1: `SERVICES_PAGE.hero.heading` — word stagger via `heroStagger` + `heroWord`
- Subheading: `SERVICES_PAGE.hero.subheading` — `text-lg text-[#555550]`
- Purple rule `h-px w-12 bg-[#8B5CF6]` between label and H1
- **Anchor nav strip** below subheading:
  - `flex flex-wrap justify-center gap-x-6 gap-y-2 mt-8`
  - 5 links: `href="#service.slug"`, format `01 Web dizajn`
  - Style: `font-mono text-xs uppercase tracking-widest text-[#888880] hover:text-[#8B5CF6]`
  - Dots separator (via `divide-x` or gap)
- Animation: `heroStagger` on entrance

### 2. ServicesChapters
One component, maps `SERVICES_PAGE.services` (5 items). Each item renders a `<section>`:

**Per chapter:**
- `id={service.slug}` for anchor navigation
- Alternating bg: `i % 2 === 0` → `bg-[#F5F4F0]`, `i % 2 === 1` → `bg-white`
- `py-28 md:py-36 px-6 md:px-12 overflow-hidden relative`

**Giant decorative number (absolute):**
- `font-space font-black leading-none select-none pointer-events-none`
- Size: `text-[clamp(160px,18vw,260px)]`
- Color: `text-[#EBEBEA]`
- Position: odd → `top-0 right-0 -translate-y-1/4`, even → `top-0 left-0 -translate-y-1/4`
- Value: `String(i + 1).padStart(2, "0")`

**2-column grid** `lg:grid-cols-2 gap-16 lg:gap-24`:
- Odd (i % 2 === 0): text left, visual right
- Even (i % 2 === 1): visual left, text right (via `lg:order-1/2`)

**Text column:**
- `section-label` = `service.title` (e.g. "Web dizajn")
- H2: `service.headline` — `font-space text-3xl md:text-4xl lg:text-5xl font-bold leading-tight`
- Body: `service.description` — `text-base md:text-lg text-[#555550] leading-relaxed mt-6`
- CTA button: "Zatraži konzultaciju" → `/kontakt`, `bg-[#0D0D0D] text-white rounded-full px-8 py-3 text-sm font-semibold mt-8 inline-block`

**Visual column:**
- Stock photo: `aspect-[16/10] w-full rounded-2xl border border-[#E8E6E0] object-cover`
- Feature list below photo (`mt-6 flex flex-col gap-3`):
  - Each: `Check` icon (16px, `text-[#8B5CF6]`) + `text-sm text-[#555550]`

**Stock images (Unsplash):**
- `dizajn`: `https://images.unsplash.com/photo-1558655146-d09347e92766?w=800&auto=format&fit=crop&q=80`
- `razvoj`: `https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&auto=format&fit=crop&q=80`
- `seo`: `https://images.unsplash.com/photo-1562577309-4932fdd64cd1?w=800&auto=format&fit=crop&q=80`
- `web-shop`: `https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&auto=format&fit=crop&q=80`
- `odrzavanje`: `https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=80`

**Animation per chapter:**
- Wrap in `m.div` with `staggerContainerSlow` + `whileInView` + `viewport={{ once: true, amount: 0.1 }}`
- Text column: `slideFromLeft` (odd) or `slideFromRight` (even)
- Visual column: `slideFromRight` (odd) or `slideFromLeft` (even)
- Features list items: `staggerContainer` + `fadeUp`

### 3. CtaPanel (reuse)
- Import and render unchanged

---

## Files

**Create:**
- `app/usluge/page.tsx` — Server Component, metadata from `SEO.services`
- `components/sections/ServicesHero.tsx` — `"use client"` (motion)
- `components/sections/ServicesChapters.tsx` — `"use client"` (motion, Check icon)

**Reuse:**
- `components/sections/CtaPanel.tsx` — unchanged
- `lib/animations.ts` — `fadeUp`, `staggerContainer`, `staggerContainerSlow`, `heroWord`, `heroStagger`, `slideFromLeft`, `slideFromRight`
- `lib/content.ts` — `SERVICES_PAGE`, `SEO`

---

## Post-build step
After implementation: use Playwright to screenshot `/usluge` and review visually. Adjust spacing, number positioning, image aspect ratios, and typography scale as needed.

---

## Design constraints
- `#F5F4F0` / `#FFFFFF` alternating — no dark except CtaPanel
- `overflow-hidden` on each chapter section (clips giant number)
- No `transition-*` Tailwind on Motion-animated elements
- All copy from `lib/content.ts`
- `"use client"` on section components
