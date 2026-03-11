import type { Metadata } from "next"
import { TERMS_PAGE, SEO } from "@/lib/content"

export const metadata: Metadata = {
  title: SEO.terms.title,
  description: SEO.terms.description,
}

export default function UvjetiPage() {
  return (
    <main className="py-24">
      <div className="mx-auto max-w-3xl px-6">
        {/* Hero */}
        <div className="mb-16">
          <span className="mb-4 block text-[11px] font-medium uppercase tracking-widest text-purple-500">
            ✦ {TERMS_PAGE.hero.label}
          </span>
          <h1 className="font-space text-4xl font-bold text-[#0D0D0D] md:text-5xl">
            {TERMS_PAGE.hero.heading}
          </h1>
          <p className="mt-4 text-sm text-[#555550]">
            Zadnje ažuriranje: {TERMS_PAGE.lastUpdated}
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-10">
          {TERMS_PAGE.sections.map((section) => (
            <section key={section.title}>
              <h2 className="font-space mb-3 text-xl font-bold text-[#0D0D0D]">
                {section.title}
              </h2>
              <p className="text-[17px] leading-relaxed text-[#555550]">
                {section.content}
              </p>
            </section>
          ))}
        </div>
      </div>
    </main>
  )
}
