# Volt Studio — Brand Guidelines

## Brand essence
Fast, honest, local. We build professional websites for Croatian entrepreneurs in 7 days at a fixed price. No jargon, no hidden costs, no waiting.

## Voice & tone
- Direct and confident — not salesy
- Friendly but professional — like a trusted local expert
- Short sentences. No fluff.
- Always Croatian (HR) in UI copy

## Logo
- Wordmark: "Volt" with styled V in purple (#8B5CF6)
- Never recolor the logo
- Minimum clear space: 16px all sides
- Dark version: white wordmark on #0D0D0D
- Light version: #0D0D0D wordmark on #F5F4F0

## Color palette
| Name | Hex | Usage |
|------|-----|-------|
| Warm White | #F5F4F0 | Site background |
| Near Black | #0D0D0D | Headlines, dark CTA section |
| Secondary Text | #555550 | Body copy |
| Volt Purple | #8B5CF6 | Accent, labels, primary CTA |
| Card White | #FFFFFF | Card backgrounds |
| Border | #E8E6E0 | Card and nav borders |
| Muted | #999994 | Placeholders, tertiary text |

## Typography
- Display font: **Space Grotesk** (`--font-space`) — headings, hero text, stats
- Body font: **DM Sans** (`--font-dm`) — body copy, UI elements, buttons
- H1: font-black, tight leading
- H2: font-bold, section headlines
- Body: font-normal, relaxed leading
- Labels: uppercase, tracked, small — always with ✦ prefix in purple

## Spacing system
- Section padding: py-24 (96px) minimum
- Container max-width: max-w-7xl mx-auto px-6
- Card padding: p-6 or p-8
- Gap between cards: gap-6

## Component library
### Section label
```tsx
<p className="text-xs uppercase tracking-widest text-purple-500 mb-4">
  ✦ Label text
</p>
```

### Primary CTA button
```tsx
<button className="bg-[#8B5CF6] text-white rounded-full px-6 py-3 text-sm font-medium hover:opacity-90 transition">
  CTA text
</button>
```

### Card
```tsx
<div className="bg-white border border-[#E8E6E0] rounded-xl p-8 hover:scale-[1.02] transition-transform duration-200">
  content
</div>
```

### Stat
```tsx
<div className="flex flex-col">
  <span className="text-5xl font-bold text-[#0D0D0D]">7</span>
  <span className="text-xs text-[#999994] uppercase tracking-wide mt-1">dana isporuke</span>
</div>
```

## What the brand is NOT
- Not dark/moody — we are clear and confident
- Not corporate — we are human and local
- Not flashy — premium comes from restraint, not effects
- Not generic — every section should feel considered
