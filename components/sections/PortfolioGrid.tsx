"use client"

import { m } from "motion/react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, ArrowUpRight, MapPin, MessageCircle } from "lucide-react"
import { PORTFOLIO, SITE } from "@/lib/content"
import { projectCard, staggerContainerProjects } from "@/lib/animations"
import { TextRevealByWord } from "@/components/ui/text-reveal"
import type { SanityProject } from "@/lib/sanity/types"
import { urlFor } from "@/lib/sanity/image"

const GRADIENT_FALLBACKS = [
  "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
] as const

interface PortfolioGridProps {
  projects?: SanityProject[]
}

export function PortfolioGrid({ projects = [] }: PortfolioGridProps) {
  const hasProjects = projects.length > 0

  return (
    <section id="projects" className="bg-paper">
      {/* Section label */}
      <div className="px-6 pt-16 md:px-12 md:pt-20 lg:pt-24">
        <div className="mx-auto max-w-7xl">
          <m.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={projectCard}
          >
            <span className="section-label">{PORTFOLIO.label}</span>
          </m.div>
        </div>
      </div>

      {/* Scroll-reveal heading */}
      <TextRevealByWord text={PORTFOLIO.heading} />

      <div className="mx-auto max-w-7xl px-6 pb-16 md:px-12 md:pb-20 lg:pb-24">
        {hasProjects ? (
          <>
            {/* Project cards */}
            <m.div
              className="grid grid-cols-1 gap-6 md:grid-cols-2"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              variants={staggerContainerProjects}
            >
              {projects.slice(0, 4).map((project, i) => (
                <m.a
                  key={project._id}
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  variants={projectCard}
                  whileHover={{ y: -6, boxShadow: "0 20px 40px -12px rgba(0,0,0,0.12)" }}
                  className="group overflow-hidden rounded-xl border border-line bg-white"
                >
                  {/* Cover image, static image, or gradient fallback */}
                  <div
                    className="relative aspect-[7/4] w-full overflow-hidden"
                    style={
                      project.coverImage || project.staticImage
                        ? undefined
                        : { background: GRADIENT_FALLBACKS[i % GRADIENT_FALLBACKS.length] }
                    }
                  >
                    {project.coverImage ? (
                      <Image
                        src={urlFor(project.coverImage).width(700).height(400).url()}
                        alt={`${project.title} — ${project.category}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    ) : project.staticImage ? (
                      <Image
                        src={project.staticImage}
                        alt={`${project.title} — ${project.category}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center">
                        <span className="font-space text-2xl font-bold text-white/80">
                          {project.title}
                        </span>
                      </div>
                    )}
                    {/* Bottom gradient overlay for depth */}
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                  </div>

                  {/* Card body */}
                  <div className="p-7">
                    <div className="mb-2 flex items-center gap-2">
                      <span className="rounded-full bg-paper px-3 py-1 font-dm text-[11px] font-medium uppercase tracking-wider text-muted">
                        {project.category}
                      </span>
                      {project.location && (
                        <span className="flex items-center gap-1 font-dm text-xs text-faint">
                          <MapPin size={12} />
                          {project.location}
                        </span>
                      )}
                    </div>
                    <h3 className="mb-1.5 font-space text-2xl leading-snug font-bold text-ink">
                      {project.title}
                    </h3>
                    <p className="mb-5 line-clamp-2 font-dm text-[15px] leading-relaxed text-muted">
                      {project.description}
                    </p>
                    <div className="flex items-center gap-4">
                      <span className="inline-flex items-center gap-1.5 font-dm text-sm font-medium text-accent">
                        Posjeti stranicu
                        <ArrowUpRight size={14} />
                      </span>
                      {project.caseStudySlug && (
                        <Link
                          href={`/projekti/${project.caseStudySlug}`}
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center gap-1.5 font-dm text-sm font-medium text-ink hover:text-accent"
                        >
                          Studija slučaja
                          <ArrowRight size={14} />
                        </Link>
                      )}
                    </div>
                  </div>
                </m.a>
              ))}
            </m.div>

            {/* "See all" link */}
            <m.div
              className="mt-8 text-center"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              variants={projectCard}
            >
              <Link
                href="/projekti"
                className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 font-dm text-sm font-semibold text-white hover:opacity-90"
              >
                {PORTFOLIO.cta.label}
                <ArrowRight size={16} />
              </Link>
            </m.div>
          </>
        ) : (
          /* Empty state — preserved from original */
          <m.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={projectCard}
          >
            <div className="mx-auto max-w-2xl rounded-xl border border-line bg-white px-8 py-12 text-center">
              <p className="text-base leading-relaxed text-muted md:text-lg">
                {PORTFOLIO.emptyState}
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link
                  href="/cijene"
                  className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 font-dm text-sm font-semibold text-white hover:opacity-90"
                >
                  Pogledaj cijene
                  <ArrowRight size={16} />
                </Link>
                <Link
                  href={SITE.whatsapp}
                  className="inline-flex items-center gap-2 rounded-full border border-ink px-6 py-3 font-dm text-sm font-semibold text-ink hover:bg-ink hover:text-white"
                >
                  <MessageCircle size={16} />
                  Besplatna konzultacija
                </Link>
              </div>
            </div>
          </m.div>
        )}
      </div>
    </section>
  )
}
