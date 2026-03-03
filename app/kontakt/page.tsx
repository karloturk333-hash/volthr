import type { Metadata } from "next"
import { SEO, CONTACT_PAGE } from "@/lib/content"
import { ContactForm } from "@/components/sections/ContactForm"
import { ContactMapWrapper } from "@/components/sections/ContactMapWrapper"

export const metadata: Metadata = {
  title: SEO.contact.title,
  description: SEO.contact.description,
  alternates: { canonical: "/kontakt" },
  openGraph: {
    title: SEO.contact.title,
    description: SEO.contact.description,
    locale: "hr_HR",
  },
}

export default function KontaktPage() {
  return (
    <main>
      {/* Hero */}
      <section className="bg-[#F5F4F0] px-6 pb-12 pt-32 md:pt-40">
        <div className="mx-auto max-w-7xl text-center">
          <span className="section-label">{CONTACT_PAGE.hero.label}</span>
          <h1 className="mt-4 font-space text-4xl font-bold leading-tight text-[#0D0D0D] md:text-6xl">
            {CONTACT_PAGE.hero.heading}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-[#555550]">
            {CONTACT_PAGE.hero.subheading}
          </p>
        </div>
      </section>

      {/* Form + Alternatives */}
      <section className="bg-[#F5F4F0] py-24">
        <ContactForm />
      </section>

      {/* Map */}
      <section className="bg-[#F5F4F0] pb-24 pt-8">
        <ContactMapWrapper />
      </section>
    </main>
  )
}
