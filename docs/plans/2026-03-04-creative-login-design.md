# Creative Split Login Page — Design Document

**Date:** 2026-03-04
**Scope:** Replace `app/(auth)/layout.tsx` + `app/(auth)/prijava/page.tsx` with creative animated split login

---

## Overview

Replace the current minimal centered-card login with a two-column split layout featuring Volt AI branding, animated background, and rich motion design. All existing Supabase auth logic (password + magic link + redirect) is preserved.

## Layout

### Desktop (lg+)
Two-column grid: left = Volt AI branding panel, right = login card.

### Mobile (< lg)
Single column: condensed branding (logo + headline) above login card.

## Auth Layout (`app/(auth)/layout.tsx`)

Full-viewport wrapper with layered animated background:
1. Aurora background (existing `aurora-background.tsx` component, purple-tinted)
2. Three floating purple gradient blobs (infinite y-oscillation, staggered timing)
3. Subtle grid pattern overlay (`#8B5CF6` at 3% opacity)
4. Bottom decorative gradient line (purple fade)
5. Mouse-tracking parallax on floating blobs

## Login Page (`app/(auth)/prijava/page.tsx`)

### Left Panel — Branding

**Logo block:**
- Volt icon (Zap) in purple gradient square (rounded-2xl)
- Rotating border ring around icon (20s infinite linear)
- "VOLT" text with purple gradient + "AI Studio" subtitle

**Headline:**
- "Kreiraj sadržaj za digitalni uspjeh" (or similar)
- Words stagger in individually (y: 40→0, 80ms stagger)

**Subtitle:**
- "AI-powered alat za kreiranje postova za Instagram i Facebook, prilagoden hrvatskim obrtnicima."
- Fade up with 0.6s delay

**Feature cards (2x2 grid):**
1. Sparkles — "AI Postovi" — "Generiraj sadrzaj u sekundi"
2. TrendingUp — "Instagram & Facebook" — "Optimizirano za svaku platformu"
3. Users — "Za obrtnike" — "Prilagodeno hrvatskim obrtnicima"
4. Zap — "Brza dostava" — "Rezultati u 7 dana"

Animations: stagger entrance (0.8s base + 0.2s per card), hover scale 1.05 + accent-soft bg

**Stats row:**
- 50+ Klijenata (count-up from 0)
- 98% Zadovoljstvo (count-up from 0)
- 24/7 Podrska (static)

### Right Panel — Login Card

**Card:** white bg, `#E8E6E0` border, rounded-xl, shadow-xl. Slides in from right (x: 50→0).

**Content (top to bottom):**
1. "Prijavi se" heading (fade in)
2. "Pristupi svom kreativnom dashboardu" subtitle (fade in)
3. Separator
4. Email field (Mail icon in label, slide from left)
5. Password field (Lock icon in label, show/hide toggle, slide from left)
6. Remember me checkbox + "Zaboravljena lozinka?" link
7. Submit button: purple gradient, gradient sweep on hover, shadow pulse idle
8. Separator + "ili"
9. Magic link button (outline style)
10. "Nemas racun? Registriraj se" footer link

**Form animations:**
- Fields stagger from left (x: -20→0, 0.1s delay)
- Input focus: purple gradient glow border
- Submit button: gradient slides left-to-right on hover, subtle shadow pulse
- Card hover: faint rotating gradient border effect

## Color Map

| Reference | Volt |
|---|---|
| cyan-500 | #8B5CF6 |
| blue-600 | #7C4FE0 |
| cyan-500/5 | rgba(139,92,246,0.05) |
| cyan-500/20 | var(--accent-border) |
| cyan-50 | var(--accent-soft) |
| gray-50 | #F5F4F0 |
| gray-200 | #E8E6E0 |
| white gradient bg | #F5F4F0 |

## Fonts

- Heading/logo: Space Grotesk (`--font-space`)
- Body/UI/labels: DM Sans (`--font-dm`)

## Files Changed

1. `app/(auth)/layout.tsx` — Aurora + blobs + grid animated layout
2. `app/(auth)/prijava/page.tsx` — Split layout with branding + animated login
3. `tests/visual-login.spec.ts` — Playwright visual test (desktop + mobile screenshots)

## Dependencies

None new. Uses: `motion/react`, `lucide-react`, existing shadcn components, existing `aurora-background.tsx`.

## What Stays Unchanged

- `app/(auth)/registracija/page.tsx` (sign-up page)
- `lib/supabase/client.ts` (browser auth client)
- `middleware.ts` (route protection)
- `app/api/auth/callback/route.ts` (magic link callback)
- All auth logic: password login, magic link OTP, redirect params, error messages
