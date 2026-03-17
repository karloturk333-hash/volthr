import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, ArrowUpRight, MessageCircle, Target, Lightbulb, Trophy } from "lucide-react"
import { notFound } from "next/navigation"
import { PUB_CUBISMO, SITE } from "@/lib/content"
import { safeJsonLd } from "@/lib/utils"
import { BusinessCard3D } from "@/components/sections/BusinessCard3D"

// Static case study registry — add new case studies here
const CASE_STUDIES: Record<string, typeof PUB_CUBISMO> = {
  "pub-cubismo": PUB_CUBISMO,
}

export async function generateStaticParams() {
  return Object.keys(CASE_STUDIES).map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const study = CASE_STUDIES[slug]
  if (!study) return {}

  return {
    title: study.seo.title,
    description: study.seo.description,
    alternates: { canonical: `/projekti/${slug}` },
    openGraph: {
      title: study.seo.title,
      description: study.seo.description,
      url: `/projekti/${slug}`,
      type: "article",
      locale: "hr_HR",
    },
  }
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const study = CASE_STUDIES[slug]
  if (!study) notFound()

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${study.title} — ${study.headline}`,
    description: study.seo.description,
    author: { "@type": "Organization", name: SITE.name },
    publisher: { "@type": "Organization", name: SITE.name },
  }

  return (
    <main className="bg-[#F5F4F0]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(jsonLd) }}
      />

      {/* Hero */}
      <section className="px-6 pt-32 pb-16 md:px-12 md:pt-40 md:pb-20">
        <div className="mx-auto max-w-4xl">
          <Link
            href="/projekti"
            className="mb-6 inline-flex items-center gap-1.5 font-dm text-sm text-[#555550] hover:text-[#0D0D0D]"
          >
            <ArrowLeft size={14} />
            Svi projekti
          </Link>

          {/* Tags */}
          <div className="mb-4 flex flex-wrap gap-2">
            {study.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-white px-3 py-1 font-dm text-[11px] font-medium uppercase tracking-wider text-[#555550] border border-[#E8E6E0]"
              >
                {tag}
              </span>
            ))}
          </div>

          <h1 className="font-space text-4xl font-bold leading-tight text-[#0D0D0D] md:text-5xl lg:text-6xl">
            {study.title} — {study.headline}
          </h1>
          <p className="mt-4 max-w-2xl font-dm text-lg leading-relaxed text-[#555550]">
            {study.subtitle}
          </p>

          <a
            href={study.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#0D0D0D] px-6 py-3 font-dm text-sm font-semibold text-white hover:opacity-90"
          >
            Posjeti stranicu
            <ArrowUpRight size={16} />
          </a>
        </div>
      </section>

      {/* Stats row */}
      <section className="border-y border-[#E8E6E0] bg-white px-6 py-12 md:px-12">
        <div className="mx-auto grid max-w-4xl grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-6">
          {study.stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-space text-3xl font-bold text-[#0D0D0D]">
                {stat.value}
              </div>
              <div className="mt-1 font-dm text-xs text-[#888880]">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Challenge / Solution / Results */}
      <section className="px-6 py-16 md:px-12 md:py-24">
        <div className="mx-auto max-w-4xl space-y-16">
          {/* Challenge */}
          <div>
            <div className="mb-4 flex items-center gap-2">
              <Target size={20} className="text-[#8B5CF6]" />
              <span className="font-dm text-xs font-semibold uppercase tracking-widest text-[#8B5CF6]">
                Izazov
              </span>
            </div>
            <p className="font-dm text-base leading-relaxed text-[#555550] md:text-lg">
              {study.challenge}
            </p>
          </div>

          {/* Solution */}
          <div>
            <div className="mb-4 flex items-center gap-2">
              <Lightbulb size={20} className="text-[#8B5CF6]" />
              <span className="font-dm text-xs font-semibold uppercase tracking-widest text-[#8B5CF6]">
                Rješenje
              </span>
            </div>
            <p className="font-dm text-base leading-relaxed text-[#555550] md:text-lg">
              {study.solution}
            </p>
          </div>

          {/* Results */}
          <div>
            <div className="mb-4 flex items-center gap-2">
              <Trophy size={20} className="text-[#8B5CF6]" />
              <span className="font-dm text-xs font-semibold uppercase tracking-widest text-[#8B5CF6]">
                Rezultati
              </span>
            </div>
            <ul className="space-y-3">
              {study.results.map((result) => (
                <li
                  key={result}
                  className="flex items-start gap-3 font-dm text-base text-[#555550]"
                >
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[#8B5CF6]" />
                  {result}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 3D Business Cards */}
      <section className="border-t border-[#E8E6E0] px-6 py-16 md:px-12 md:py-24">
        <div className="mx-auto max-w-4xl">
          <span className="section-label">✦ PREMIUM VIZITKE</span>
          <h2 className="mt-4 mb-10 font-space text-2xl font-bold text-[#0D0D0D] md:text-3xl">
            Dizajnirane vizitke za oba suvlasnika
          </h2>
          <BusinessCard3D cards={study.businessCards} />
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-[#E8E6E0] bg-[#0D0D0D] px-6 py-16 md:px-12 md:py-20">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="font-space text-3xl font-bold text-white md:text-4xl">
            Trebate sličan projekt?
          </h2>
          <p className="mx-auto mt-3 max-w-lg font-dm text-base text-white/60">
            Javite nam se na WhatsApp — odgovaramo u roku 2 sata.
          </p>
          <a
            href={study.cta.href}
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#8B5CF6] px-8 py-3.5 font-dm text-base font-semibold text-white"
          >
            <MessageCircle size={18} />
            {study.cta.label}
          </a>
        </div>
      </section>
    </main>
  )
}
