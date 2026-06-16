# Volt — Design Audit & Refresh Plan

> **Date:** 2026-06-16
> **Scope:** (1) Inventory of dead / irrelevant files and (2) a bold visual-redesign
> direction that **keeps the brand palette and content untouched** while
> re-imagining the layout and component language, using **v0** and **21st.dev**
> as the aesthetic north star.
>
> **Stack:** Next.js 16 · React 19 · Tailwind CSS 4 · Motion 12 · TypeScript 5 · Sanity · Playwright

---

## 0. Executive summary

The codebase is a clean, single-purpose marketing site (a Croatian digital
agency for craftsmen — *obrtnici*). The architecture is healthy — content is
fully centralised in `lib/content.ts`, sections are composable, Motion is used
consistently. But two classes of debt have accumulated:

1. **Dead weight.** ~14 unused components, 8 unused shadcn primitives, several
   stale docs/tests pointing at *removed* features (admin panel, n8n, Supabase,
   Stripe, login/registration), a third-party HTML template kept "for
   reference", and **~26 MB of binary screenshot artifacts** committed to git.
2. **A build-breaking bug.** The homepage imports a `GrantHero` component that
   **does not exist** (it was renamed to `EuGrantBanner` but the import on the
   homepage was never updated). `next build` currently fails / the homepage
   renders blank below the hero.

The design itself is competent but *safe*: a warm-cream page with a single
violet accent, one repeated section pattern (label → big heading → body →
fade-up), a dark CTA, a dark footer. There is one "hero moment" (the browser
mockup) and then a long scroll of near-identical centered/2-column text blocks.

The refresh keeps everything that makes it *Volt* — the **palette, the two
typefaces, the ✦ section-label motif, the monogram, and every word of Croatian
copy** — and boldly rebuilds the *spatial and motion language* into something
closer to a modern v0 / 21st.dev landing page: editorial grid, dark-first hero,
spotlight/bento/marquee component vocabulary, and a real visual rhythm.

---

## PART 1 — Dead & irrelevant files

> Every item below was verified by import-graph analysis (grep of actual import
> sites, not string matches). Everything is recoverable from git history.

### 1.1 Unused components (never imported anywhere)

| File | Reason | Confidence |
|------|--------|------------|
| `components/sections/KeywordMarquee.tsx` | No importer | High |
| `components/sections/ClientLogos.tsx` | No importer (homepage never renders it) | High |
| `components/sections/PricingHero.tsx` | No importer; `/cijene` uses `GrantPackageHero` | High |
| `components/sections/PricingTiers.tsx` | No importer; superseded by `OneTimePackages` / `MaintenanceTiers` | High |
| `components/ui/LightningBolt.tsx` | No importer (bolt is drawn inside `BrowserMockup`) | High |
| `components/ui/SpeedBadge.tsx` | No importer (`HERO.speedBadge` content is unused) | High |
| `components/ui/aurora-background.tsx` | No importer — the aurora in `app/layout.tsx` is inline CSS, not this component | High |

### 1.2 Unused shadcn/ui primitives (0 import sites)

`label`, `avatar`, `separator`, `input`, `textarea`, `tabs`, `dropdown-menu`
were scaffolded but never wired up. The contact form uses **native** `<input>` /
`<textarea>`. Only `button`, `card`, `badge` are live (imported solely by the
blog page).

| File | Confidence |
|------|-----------|
| `components/ui/label.tsx` | High |
| `components/ui/avatar.tsx` | High |
| `components/ui/separator.tsx` | High |
| `components/ui/input.tsx` | High |
| `components/ui/textarea.tsx` | High |
| `components/ui/tabs.tsx` | High |
| `components/ui/dropdown-menu.tsx` | High |

**Also:** `lib/sanity/index.ts` — a barrel re-export that nothing imports (every
consumer imports directly from `@/lib/sanity/client`, `/queries`, etc.). Removed.

### 1.3 Stale docs & tests (point at removed features)

| File | Reason | Confidence |
|------|--------|------------|
| `docs/TODO.md` | Entirely about the removed agency backend — Supabase tables, n8n workflows, Stripe, `/admin` panel, `/odobri/[token]` approval flow. None of it exists in `e7c179d "strip all backend — pure marketing site"`. Actively misleading. | High |
| `docs/plans/2026-03-04-creative-login-design.md` | Login/auth was removed; no `/prijava` route exists | High |
| `tests/visual-check.spec.ts` | Asserts on `/prijava` login page and `/registracija` — both removed | High |
| `PERFECTION_LOG.md` | One-off autonomous-audit log on a dead branch (`auto/website-perfection`); references `everything-claude-code/` (deleted) and removed routes. Superseded by this document. | Medium |

### 1.4 Third-party reference template

| File | Reason | Confidence |
|------|--------|------------|
| `reference/demo-web-agency.html` | A "Crafto — Multipurpose HTML5 Template" by ThemeZaa (Bootstrap 5). Pure visual reference, not project source; not linked anywhere. | High |

### 1.5 Committed binary artifacts (~26 MB)

These bloat every clone. None are application assets; all are regenerable.

| Path | Size | Reason |
|------|------|--------|
| `scripts/screenshots/` | ~14 MB | Mockup-vs-reference dev captures (vs `eloqwnt.com`) | 
| `audit/screenshots/before` + `after` | ~9.4 MB | One-off before/after audit captures of the *old* design |
| `tests/screenshots/` | ~2.3 MB | Playwright visual baselines — will be invalidated by the redesign anyway |
| `tests/audit-screenshots.spec.ts`, `tests/audit-screenshots-after.spec.ts` | — | One-off capture scripts tied to `audit/screenshots/` |

**Action:** delete the directories and add them to `.gitignore` so capture
runs never re-commit binaries. Regenerate the Playwright visual baselines once
the redesign lands (`playwright test --update-snapshots`).

### 1.6 Stale config references

| File | Fix |
|------|-----|
| `eslint.config.mjs` | Remove `"everything-claude-code/**"` from `globalIgnores` — that dir was deleted | 
| `.gitignore` | Remove `everything-claude-code/` and the three `nav-*.png` debug-screenshot entries; add `scripts/screenshots/`, `audit/screenshots/`, `tests/screenshots/` |

### 1.7 Keep (verified live — do **not** remove)

`lib/*` (all imported), `scripts/seed-*.{mjs,ts}` (seed live Sanity dataset),
`scripts/capture-portfolio.ts` + `scripts/design-check.js` (dev tooling),
`components/ui/{button,card,badge,bento-grid,glowing-effect,rainbow-button,shimmer-button,text-reveal,BrowserMockup,Counter,BusinessCard3D,portableTextComponents}.tsx`,
and every live section.

> **Note on `EuGrantBanner`:** it *appears* unused only because the homepage
> imports it under the wrong name (`GrantHero`). It is **not** dead — see Part 2.

---

## PART 2 — Critical bug (fix before anything else)

`app/(marketing)/page.tsx` lazy-imports a module that does not exist:

```ts
const GrantHero = dynamic(() =>
  import("@/components/sections/GrantHero")...   // ❌ no such file
)
```

Git history (`ea817bb`) shows the component was renamed to **`EuGrantBanner`**
but only the *definition* moved — the homepage import was left dangling.
`components/sections/GrantHero.tsx` was never committed. Result: `next build`
fails to resolve the chunk and the homepage renders blank below the hero (visible
in `audit/screenshots/after/home-desktop.png`).

**Fix:** point the import and JSX at `EuGrantBanner`. (Applied in this branch.)

---

## PART 3 — Design audit & bold refresh

### 3.1 What we KEEP (the brand DNA — untouched)

| Token / asset | Value | Why it stays |
|---------------|-------|--------------|
| **Background** | `#F5F4F0` warm cream | Signature "off-white, not sterile-white" feel |
| **Ink** | `#0D0D0D` | Near-black, high contrast |
| **Accent** | `#8B5CF6` violet | The single brand accent — never multiply |
| **Aurora** | violet `#a78bfa` · indigo `#818cf8` · blue `#60a5fa` | Ambient gradient identity |
| **Display type** | Space Grotesk (700) tight tracking | Geometric, confident headings |
| **Body type** | DM Sans | Warm, readable |
| **Motif** | `✦` + uppercase tracked `.section-label` | Instantly recognisable |
| **Monogram** | `volt-v-monogram.svg` | Logo |
| **Copy** | All Croatian content in `lib/content.ts` | Voice & SEO are correct |
| **Semantics** | WhatsApp green, success/error/warning, radius scale | Functional tokens |

### 3.2 What's holding the design back (the critique)

1. **One section, repeated 11×.** Almost every block is `label → big heading →
   body → fade-up`, left- or center-aligned, on the same cream background. No
   rhythm, no contrast, no "moment" after the hero.
2. **The palette is barely used.** Violet appears only as the rule, the label,
   and a couple of buttons. The aurora is masked away after 30 % of the
   viewport. The page is 90 % cream + black.
3. **Flat depth.** Outside the bento `GlowingEffect`, there's no layering — no
   spotlight cards, no glass, no grid texture, no borders-as-architecture.
4. **Hardcoded hex everywhere.** Components write `text-[#0D0D0D]`,
   `bg-[#F5F4F0]` literally instead of the tokens already defined in
   `globals.css`. This makes a global re-theme (or a dark mode) a find-replace
   nightmare and is the #1 structural blocker to a bold refresh.
5. **Motion is monotonous.** Everything is the same `fadeUp`. No scroll-linked
   reveals, no stagger variety, no marquee/beam/counter interplay.
6. **No dark mode / no dark rhythm.** Only the CTA and footer go dark. A
   v0/21st-style site alternates light and dark *bands* to create cadence.

### 3.3 The bold direction (v0 × 21st.dev)

The two references pull in complementary directions — we want the **synthesis**:

- **From v0:** restraint and structure — generous whitespace, hairline borders
  as layout, monochrome + one accent, dotted/grid backgrounds, shadcn primitives,
  a real **dark-mode** system, "ship-fast" clarity.
- **From 21st.dev:** the *wow* — bold oversized type, gradient/aurora as a
  feature (not a whisper), glassmorphism, spotlight & bento cards, animated
  beams/marquees, motion as a first-class citizen.

**Net concept:** *"Editorial light, with engineered dark moments."* Keep the
warm-cream editorial base, but introduce **alternating dark aurora bands**,
**spotlight/bento card vocabulary**, **oversized display type**, and **a proper
tokenised theme** so violet finally earns its place.

#### 3.3.1 Foundational system work (do this first — unblocks everything)

1. **Tokenise.** Promote the `globals.css` variables into Tailwind v4
   `@theme` colors (`bg-bg`, `text-ink`, `text-accent`, `border-line`…) and
   **replace every hardcoded hex** in components with the token. One mechanical
   pass; massive payoff. ✅ **Done** — see Part 6.
2. **Add a dark theme.** Define a `[data-theme="dark"]` token set (ink ground,
   cream text, violet glow). Even if there's no toggle yet, dark *sections* can
   consume the same tokens instead of bespoke `#0D0D0D`.
3. **Spacing & type scale.** Introduce a fluid display scale
   (`--text-display`, `clamp()`-based) and a consistent section-rhythm
   (alternating `py` and ground color) instead of per-component values.
4. **Texture primitives.** Add reusable `<GridBackground/>` (dotted/line grid,
   masked) and `<Spotlight/>` follow-cursor glow — the connective tissue of the
   v0/21st look.

#### 3.3.2 Component vocabulary upgrade

| Today | Refresh |
|-------|---------|
| Cream blocks, repeated | **Alternating bands**: cream → dark-aurora → cream → dark-footer |
| `fadeUp` everywhere | Scroll-linked reveals, word-stagger headings, number counters on view |
| Plain stat row (`AboutSplit`) | **Bento stat grid** with `GlowingEffect` (already in repo) |
| Flat testimonial table | **Spotlight testimonial cards** / marquee of logos (revive `KeywordMarquee`/`ClientLogos` *into* this) |
| Static service list | **Bento** services (already have `BentoGrid`) with icon + hover lift |
| Buttons: violet fill / outline | Keep, but add a `shimmer`/`rainbow` hero CTA hierarchy (already in repo) |
| Browser mockup hero | Keep the mockup, but set it on a **dark aurora hero band** with grid texture + spotlight, oversized headline |

> Note: this *reuses* components we'd otherwise delete in Part 1
> (`KeywordMarquee`, `ClientLogos`, the bolt) by folding them into real sections —
> a deliberate "delete or commit" decision per component.

#### 3.3.3 Page-by-page

- **Home** — Dark aurora hero band (oversized `clamp(3rem,7vw,6rem)` headline,
  grid texture, spotlight, the browser mockup floating with depth). Then a light
  editorial band, a bento services/stats band, a dark testimonial-spotlight
  band, pricing preview as comparison cards, FAQ, dark CTA. Light/dark cadence
  throughout.
- **/usluge** — Keep chapter structure but give each chapter a sticky-scroll
  visual on one side (21st-style scroll-pinned media).
- **/cijene** — Pricing as **interactive comparison cards** with a grant toggle;
  highlight the recommended tier with the violet glow border.
- **/o-nama** — Editorial story with a vertical timeline + counters; values as a
  bento.
- **/projekti, /blog** — Spotlight/bento cards, consistent hover-lift.

#### 3.3.4 Motion language

LazyMotion + `m` stays. Add a small set of reusable variants:
scroll-linked `revealUp`, `wordStagger` (headings), `countUp` (already have
`Counter`), `spotlightFollow`, `marquee` (have it). Respect
`prefers-reduced-motion` (already handled in `globals.css`).

### 3.4 Guardrails (so "bold" stays on-brand)

- One accent only — violet. Never introduce a second hue; the aurora is the
  only place multiple hues are allowed.
- Cream and ink stay the two grounds; dark bands use ink, not pure black.
- Type stays Space Grotesk + DM Sans. Go bigger, not different.
- Keep the ✦ label motif on every section — it's the through-line.
- All copy stays in `lib/content.ts`; the redesign is presentational only.

---

## PART 4 — Suggested execution order

1. ✅ **Fix the `GrantHero` → `EuGrantBanner` build bug** (this branch).
2. ✅ **Delete dead files** (Part 1) + fix stale config.
3. **Tokenise** `globals.css` → Tailwind `@theme`; replace hardcoded hex.
4. **Add texture primitives** (`GridBackground`, `Spotlight`) + dark token set.
5. **Rebuild the hero band** (dark aurora + oversized type + mockup depth).
6. **Re-rhythm the homepage** into alternating light/dark bands.
7. **Upgrade sections** to the bento/spotlight/marquee vocabulary.
8. **Roll the system** across `/usluge`, `/cijene`, `/o-nama`, `/projekti`, `/blog`.
9. **Regenerate Playwright visual baselines** and re-run E2E.

Steps 1–2 are done in this branch; 3+ are the design implementation phase.

---

## PART 5 — Visual audit (rendered, not code): the biggest loser

> Captured by running the fixed build locally and scrolling each page fold-by-fold
> (the sections animate in on scroll, so full-page captures look falsely blank).

### 🥇 Biggest loser: the hero "browser mockup"

It's the single most prominent element on the site — a full-width panel directly
under the headline — and for an **agency that sells websites**, it shows… no
website. Inside realistic browser chrome (traffic-light dots + a fake address
bar that primes you to expect a rendered site) sits a **dark purple gradient void
with a floating animated "V" logo, a tagline and a button**. It is a glorified
splash screen wearing a browser costume.

Why this is the worst offender, specifically:
1. **It breaks its own promise at the most important moment.** The browser frame
   says "you're about to see a website"; it delivers an empty logo loader. The
   hero is where the agency proves it can build beautiful sites — and it shows
   nothing it has built.
2. **It sets a dark, empty tone** the rest of the (too-sparse) page inherits.
3. **The fix is trivial and high-leverage:** drop a real client screenshot
   (Villa Aurea / Pub Cubismo already exist in `public/images/portfolio/`) into
   that frame — ideally a subtle device-scroll or before/after. The portfolio
   cards lower down already do exactly this and are the best thing on the site.

What sharpens it: **every other media frame on the site shows real imagery** —
the `ServicesChapters` photos and `ServicesGrid` bento cards pull Unsplash
images, and `PortfolioGrid` uses real client screenshots (Villa Aurea / Pub
Cubismo) that look genuinely good. The hero frame is the **one** that, by design,
contains no website — just the logo. It's the odd one out at the most important
moment.

> **Correction (sandbox honesty):** my first pass also called the `/usluge` box
> and the bento cards "empty placeholders." That was wrong — they're external
> **Unsplash images that 403'd in this sandbox** (same egress block as Google
> Fonts). On your Vercel domain they load real photos. The hero mockup is *not*
> an image (it's an SVG/CSS component), so its emptiness is real on prod.

### The real systemic problem: **dead space / low density**

Independent of images and fonts (this is pure layout, so it's real on prod):

- The homepage document is **~12,100 px tall** for roughly five screens of actual
  content. Section labels float ~250–300 px below the previous block; the
  `PortfolioGrid` header sits in a near-empty viewport. The page reads closer to
  ~40 % content / 60 % void — the opposite of the confident, dense v0 / 21st.dev
  feel. Section padding (`py-24 md:py-32 lg:py-36`) stacks to ~290 px of gap
  *between* every section, on top of the in-section spacing.

### Runner-up losers (ranked)

2. **The palette is barely deployed.** Violet shows up as a hairline rule, the
   label, and two buttons; the aurora is masked away after ~30 % of the fold. The
   page is ~90 % cream + black. The brand's best asset is on mute.
3. **One section pattern, repeated ~11×** (label → heading → body → fadeUp), with
   no light/dark cadence — monotony that the band-based plan in Part 3 addresses.

**Net:** putting a real website screenshot in the hero frame, plus tightening the
vertical rhythm (and adding light/dark bands), would lift perceived quality more
than any other change — before a single token is touched.

> **Sandbox artifacts excluded from this critique** (they differ from your Vercel
> render and are NOT design problems): serif fallback (Google Fonts blocked),
> blank image frames (Unsplash 403'd), counters caught mid-animation
> (2/€120/30 % instead of 7/€399/100 %), and a dev-tools overlay in the corner.
> The local build used `npm ci` — i.e. the **exact dependency versions from
> `package-lock.json`, identical to what Vercel builds**; nothing was upgraded, so
> the rendering engine matches production. Only layout, spacing, color and
> hierarchy were judged.

---

## PART 6 — Tokenisation pass (done)

Replaced the hardcoded-hex className layer (the #1 structural blocker to a
re-theme or dark mode) with Tailwind v4 `@theme` tokens. `@theme` is the single
source of truth; the legacy `:root` semantic vars (`--bg`, `--accent`, `--text`,
`--black`, `--border`…) are now **aliases** of the tokens, so inline `style`/SVG
references keep working unchanged.

**Tokens** (`app/globals.css`): `--color-paper #F5F4F0`, `--color-ink #0D0D0D`,
`--color-muted #555550`, `--color-faint #888880`, `--color-accent #8B5CF6`,
`--color-line #E8E6E0`, `--color-card #FFFFFF`.

**Replaced** 399 bracketed hex utilities across 41 files (bracketed `[#hex]`
only ever appears in Tailwind classes, so inline styles/SVG were untouched):

| Before | After |
|--------|-------|
| `text-[#0D0D0D]` (90) | `text-ink` |
| `text-[#555550]` (69) | `text-muted` |
| `text-[#8B5CF6]` / `bg-` / `border-` (96) | `text/bg/border-accent` |
| `border-[#E8E6E0]` (46) | `border-line` |
| `bg-[#F5F4F0]` (34) | `bg-paper` |
| `text-[#888880]` (25) | `text-faint` |

Opacity modifiers carried over (`text-ink/20`, `bg-accent/10`, `to-accent/5`).

**Verified:** computed styles resolve to the exact original hexes
(`bg-paper`→rgb(245,244,240), `text-ink`→rgb(13,13,13), `text-accent`→
rgb(139,92,246), `border-line`→rgb(232,230,224)); home/projekti render with
pixel parity; the production build compiles all token CSS cleanly (it only fails
in this sandbox on the blocked Google-Fonts fetch — not on CSS).

**Deliberately left as literals** (low-frequency, semantic/one-off — a smaller
follow-up if desired): the grant-savings greens (`#15803D`, `#F0FDF4`,
`#1A6B2A`), form-error reds (`#DC2626`, `#EF4444`, `#FEF2F2`), the dark-CTA muted
`#A8A8A0`, and decorative gradient/SVG hexes (aurora, mockup). These are not the
re-theme blocker the neutral+accent palette was.

**Unlocked by this:** a dark mode is now a `[data-theme="dark"]` token override
instead of a 399-site find-replace.

---

## PART 7 — Dark mode + toggle (done)

Tokenisation made this a token-override, not a rewrite.

**Token sets** (`app/globals.css`): light values live in `@theme`; dark values
override the same custom properties under `:root[data-theme="dark"]`, so every
token-based utility flips automatically. Dark gives a layered hierarchy —
page `#0E0E11` < band `#17171C` < card `#1C1C22` — with `ink` → `#F2F1EC`,
`accent` → `#A78BFA`, and the aurora switched to `screen` blend so it reads as a
violet glow instead of washing out.

**Two surfaces that can't just invert** were split out first:
- `bg-white` (32×) → `bg-card` (white → dark-elevated)
- `bg-ink` (18×) → `bg-contrast` — a token that **stays dark in both themes**
  (CTA band, footer, dark buttons) so it doesn't flip to light.

**Toggle** (`components/ui/ThemeToggle.tsx`) in the nav (all breakpoints): sun/moon,
persists to `localStorage('volt-theme')`, defaults to system preference.

**No-flash:** a pre-paint inline script in `layout.tsx` sets `data-theme` before
first paint. React 19 hydration *strips* that attribute (even with
`suppressHydrationWarning`), so the toggle re-asserts it in a **layout effect**
(same commit, before paint) — verified: `data-theme` survives hydration and the
body stays `#0E0E11`.

**Verified:** toggle flips dark↔light and persists; cards/bands/text/accents all
legible in dark; light mode is pixel-identical (tokens map to the original hexes).

**Known refinement:** the status colors (grant-savings green `#F0FDF4`/`#15803D`,
error reds) are still literals, so the "€500 recommended" card stays light-green
in dark mode (reads as an intentional highlight). Making those dark-aware is the
natural next small step.
