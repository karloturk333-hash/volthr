import type { Metadata } from "next"
import { PRIVACY_PAGE, SEO } from "@/lib/content"

export const metadata: Metadata = {
  title: SEO.privacy.title,
  description: SEO.privacy.description,
  alternates: { canonical: "/privatnost" },
  openGraph: {
    title: SEO.privacy.title,
    description: SEO.privacy.description,
    url: "/privatnost",
    type: "website",
    locale: "hr_HR",
  },
}

export default function PrivatnostPage() {
  return (
    <main className="py-24">
      <div className="mx-auto max-w-3xl px-6">
        {/* Hero */}
        <div className="mb-16">
          <span className="mb-4 block text-[11px] font-medium uppercase tracking-widest text-purple-500">
            ✦ {PRIVACY_PAGE.hero.label}
          </span>
          <h1 className="font-space text-4xl font-bold text-ink md:text-5xl">
            {PRIVACY_PAGE.hero.heading}
          </h1>
          <p className="mt-4 text-sm text-muted">
            Zadnje ažuriranje: {PRIVACY_PAGE.lastUpdated}
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-10">
          {PRIVACY_PAGE.sections.map((section) => (
            <section key={section.title}>
              <h2 className="font-space mb-3 text-xl font-bold text-ink">
                {section.title}
              </h2>
              <p className="text-[17px] leading-relaxed text-muted">
                {section.content}
              </p>
            </section>
          ))}
        </div>
      </div>
    </main>
  )
}
