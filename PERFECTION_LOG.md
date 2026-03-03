# PERFECTION_LOG.md — Volt Web Studio Autonomous Audit

**Branch:** `auto/website-perfection`
**Started:** 2026-03-03
**Stack:** Next.js 16.1.6 · React 19 · Tailwind CSS 4 · Motion 12.x · TypeScript 5 · Playwright

---

## Phase 1 — Audit & Baseline

### Build Status (before any changes)
| Check | Status | Notes |
|-------|--------|-------|
| `npm run build` | ❌ FAILED | lightningcss native binary missing for WSL Linux |
| `npx tsc --noEmit` | ✅ PASS | Zero TypeScript errors |
| `npm run lint` | ❌ FAILED | 196 errors — ALL in `everything-claude-code/` (third-party tool dir) |
| `npm audit` | ✅ PASS | 0 vulnerabilities |

**Baseline fixes applied in Phase 1:**
- Fixed: installed `lightningcss-linux-x64-gnu` (WSL binary was missing, Windows-only binary present)
- Fixed: added `everything-claude-code/**` and `scripts/**` to ESLint ignore list (third-party tool files)

Build now: ✅ PASS · TypeScript: ✅ PASS · Lint: ✅ PASS

### Pages (all static, SSG)
- `/` — Homepage (13 sections)
- `/o-nama` — About page
- `/usluge` — Services page
- `/cijene` — Pricing page
- `/robots.txt` — Auto-generated
- `/sitemap.xml` — Auto-generated

### Baseline Screenshots
Captured 12 screenshots: 4 pages × 3 viewports (375/768/1440px)
Location: `audit/screenshots/before/`

---

## Security Issues

| ID | Severity | Issue | File | Status |
|----|----------|-------|------|--------|
| SEC-H1 | HIGH | No security headers globally: missing CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy | `next.config.ts:13` | Pending Phase 2 |
| SEC-H2 | HIGH | `dangerouslySetInnerHTML` JSON-LD injection without `safeJsonLd` escape for `<`, `>`, `&` | `app/page.tsx:34`, `app/cijene/page.tsx:32` | Pending Phase 2 |
| SEC-M1 | MEDIUM | WhatsApp URL builder: safe for current static constants, fragile pattern if ever dynamic | `components/sections/PricingTiers.tsx:9` | Monitor |
| SEC-M2 | MEDIUM | Unregistered social media handles (instagram.com/volt.hr, etc.) linked in footer — could be squatted | `components/layout/Footer.tsx:44` | Human action required |
| SEC-M3 | MEDIUM | Sitemap lists unbuilt routes `/projekti` and `/kontakt` → 404s indexed by crawlers | `app/sitemap.ts:9` | Pending Phase 2 |
| SEC-M4 | MEDIUM | GDPR cookie consent claimed in pricing copy but not implemented; no analytics yet | `lib/content.ts:438` | Human action required (before analytics) |
| SEC-L1 | LOW | Placeholder address `// TODO: Replace` in JSON-LD structured data | `lib/content.ts:22` | Human action required |
| SEC-L2 | LOW | robots.ts allows all crawlers — acceptable for marketing site | `app/robots.ts:4` | No action |
| SEC-L3 | LOW | Next.js 16 is a new major — monitor security advisories | `package.json` | Monitor |

---

## Performance Issues

| ID | Severity | Issue | File | Status |
|----|----------|-------|------|--------|
| PERF-H1 | HIGH | `ServicesChapters` uses bare `<img>` for external Unsplash images — bypasses Next.js WebP/AVIF optimisation and lazy loading | `components/sections/ServicesChapters.tsx:88` | Pending Phase 3 |
| PERF-H2 | HIGH | `AboutStory` uses bare `<img>` for external Unsplash image | `components/sections/AboutStory.tsx:46` | Pending Phase 3 |
| PERF-M1 | MEDIUM | `FaqAccordion` loaded via `next/dynamic` on homepage but direct static import on `/cijene` — inconsistent lazy-loading | `app/cijene/page.tsx:6` | Pending Phase 3 |

---

## Accessibility Issues

| ID | Severity | Issue | File | Status |
|----|----------|-------|------|--------|
| A11Y-H1 | HIGH | FaqAccordion toggle buttons missing `aria-expanded` and `aria-controls` — screen readers cannot announce open/closed state | `components/sections/FaqAccordion.tsx:54` | Pending Phase 4 |
| A11Y-M1 | MEDIUM | Footer social icons `aria-label` uses raw key string ("instagram") not human-readable ("Volt na Instagramu") | `components/layout/Footer.tsx:48` | Pending Phase 4 |

---

## Code Quality Issues

| ID | Severity | Issue | File | Status |
|----|----------|-------|------|--------|
| CQ-H1 | HIGH | `any` type on `BentoCard.Icon` prop — use `LucideIcon` from lucide-react | `components/ui/bento-grid.tsx:44` | Pending Phase 2 |
| CQ-H2 | HIGH | `BrowserMockup` uses default export — violates named-export convention | `components/ui/BrowserMockup.tsx:42` | Pending Phase 2 |
| CQ-H3 | HIGH | Tailwind `transition-*` and `duration-*` classes on Motion-animated elements in BentoCard | `components/ui/bento-grid.tsx:65,82,95` | Pending Phase 2 |
| CQ-H4 | HIGH | FAQ accordion button: inline `style` for paddingLeft + CSS transition — use Tailwind + Motion | `components/sections/FaqAccordion.tsx:57` | Pending Phase 2 |
| CQ-H5 | HIGH | `ClientLogos` hardcodes logo list instead of importing `CLIENT_LOGOS` from `lib/content.ts` | `components/sections/ClientLogos.tsx:5` | Pending Phase 2 |
| CQ-H6 | HIGH | `AboutStory`, `AboutValues`, `AboutProcess` hardcode section label strings | Multiple | Pending Phase 2 |
| CQ-H7 | HIGH | `ServicesChapters` hardcodes CTA string "Zatraži konzultaciju" | `components/sections/ServicesChapters.tsx:78` | Pending Phase 2 |
| CQ-H8 | HIGH | `BrowserMockup` hardcodes `volt.hr` domain and "Započni projekt" CTA | `components/ui/BrowserMockup.tsx:78,422` | Pending Phase 2 |
| CQ-M1 | MEDIUM | `lib/animations.ts` — only `fadeUpSmall` is typed with `Variants`; all others lack explicit typing | `lib/animations.ts` | Pending Phase 2 |
| CQ-M2 | MEDIUM | `PortfolioGrid` uses inline `style={{ background: gradient }}` — move to Tailwind arbitrary values | `components/sections/PortfolioGrid.tsx:51` | Pending Phase 2 |
| CQ-M3 | MEDIUM | `BrowserMockup` has inline `<style>` tag for CSS keyframes — belongs in `globals.css` | `components/ui/BrowserMockup.tsx:50` | Pending Phase 2 |
| CQ-M4 | MEDIUM | `BrowserMockup` `whileHover={{ scale: 1.3 }}` exceeds the 1.02 scale limit from CLAUDE.md | `components/ui/BrowserMockup.tsx:67` | Pending Phase 2 |
| CQ-M5 | MEDIUM | `Nav.tsx` uses inline `style={{ color: ... }}` — use Tailwind conditional classes | `components/layout/Nav.tsx:53,137` | Pending Phase 2 |
| CQ-M6 | MEDIUM | `sitemap.ts` lists unbuilt routes (`/projekti`, `/kontakt`) causing 404 SEO damage | `app/sitemap.ts` | Pending Phase 2 |
| CQ-L1 | LOW | `StatsCounters` and `AboutStory` use array index `i` as React key | Multiple | Pending Phase 2 |
| CQ-L2 | LOW | `ServicesHero` and `PricingHero` define inline animation variants instead of using shared `lib/animations.ts` | Multiple | Pending Phase 2 |

---

## Phase 2 — Security & Critical Fixes
*Status: Pending*

---

## Phase 3 — Performance & Web Vitals
*Status: Pending*

---

## Phase 4 — UI/UX, Responsiveness & Accessibility
*Status: Pending*

---

## Phase 5 — E2E Validation & Final Report
*Status: Pending*

---

## Skipped Items
*None yet.*

---

## Commits
| Commit | Phase | Description |
|--------|-------|-------------|
| (pending) | 1 | Baseline audit — screenshots, security, code quality, lint fixes |
