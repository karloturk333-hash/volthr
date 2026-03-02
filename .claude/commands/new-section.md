Kreiraj novi section component za Volt Studio projekt.

Ime componente je: $ARGUMENTS

## Koraci

1. Pročitaj `lib/content.ts` da razumiješ trenutni content pattern
2. Dodaj novi content objekt u `lib/content.ts` s `as const`
3. Kreiraj `components/sections/$ARGUMENTS.tsx`
4. Importaj animacije iz `lib/animations.ts` (fadeUp, staggerContainer)
5. Dodaj section u `app/page.tsx` na logično mjesto

## Obavezni design system

- Background: `bg-[#F5F4F0]` — nikad pure white, nikad dark
- Container: `max-w-7xl mx-auto px-6`
- Sekcija spacing: `py-24` minimum
- Section label: `text-[11px] font-semibold uppercase tracking-widest text-[#8B5CF6]` s `✦` prefiksom
- Naslovi: `font-space font-bold text-[#0D0D0D]`
- Body tekst: `text-[#555550] leading-relaxed`
- Kartice: `bg-white border border-[#E8E6E0] rounded-xl`
- Zero glassmorphism — bez `backdrop-blur`, bez `bg-white/10`

## Animacije (obavezno)

```tsx
import { m } from "motion/react"
import { fadeUp, staggerContainer } from "@/lib/animations"

// Wrapper
<m.div
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, amount: 0.1 }}
  variants={staggerContainer}
>
  // Svaki child element
  <m.div variants={fadeUp}>...</m.div>
</m.div>
```

- Nikad Tailwind `transition-*`, `duration-*`, `ease-*` na Motion elementima
- Hover na karticama: `whileHover={{ y: -4 }}`

## Pravila

- `"use client"` samo ako koristiš hooks, events ili browser API
- Named export (ne default export)
- Sav tekst iz `lib/content.ts` — nikad hardcode strings
- Sav tekst u **hrvatskom jeziku**
- Tipovi za props eksplicitni, bez `any`
