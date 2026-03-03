"use client"

import { m } from "motion/react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, ExternalLink, MapPin, MessageCircle } from "lucide-react"
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
    <section id="projects" className="bg-[#F5F4F0]">
      {/* Section label */}
      <div className="px-6 pt-24 md:px-12 md:pt-32 lg:pt-36">
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

      <div className="mx-auto max-w-7xl px-6 pb-24 md:px-12 md:pb-32 lg:pb-36">
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
                  whileHover={{ y: -4 }}
                  className="group overflow-hidden rounded-xl border border-[#E8E6E0] bg-white"
                >
                  {/* Cover image or gradient */}
                  <div
                    className="relative h-48 w-full overflow-hidden md:h-56"
                    style={
                      project.coverImage
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
                    ) : (
                      <div className="flex h-full items-center justify-center">
                        <span className="font-space text-2xl font-bold text-white/80">
                          {project.title}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Card body */}
                  <div className="p-5">
                    <div className="mb-2 flex items-center gap-2">
                      <span className="rounded-full bg-[#F5F4F0] px-3 py-1 font-dm text-xs font-medium text-[#555550]">
                        {project.category}
                      </span>
                      {project.location && (
                        <span className="flex items-center gap-1 font-dm text-xs text-[#888880]">
                          <MapPin size={12} />
                          {project.location}
                        </span>
                      )}
                    </div>
                    <h3 className="mb-1.5 font-space text-lg font-bold text-[#0D0D0D]">
                      {project.title}
                    </h3>
                    <p className="mb-3 line-clamp-2 font-dm text-sm leading-relaxed text-[#555550]">
                      {project.description}
                    </p>
                    <span className="inline-flex items-center gap-1.5 font-dm text-sm font-medium text-[#8B5CF6]">
                      Posjeti stranicu
                      <ExternalLink size={14} />
                    </span>
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
                className="inline-flex items-center gap-2 rounded-full bg-[#0D0D0D] px-6 py-3 font-dm text-sm font-semibold text-white hover:opacity-90"
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
            <div className="mx-auto max-w-2xl rounded-xl border border-[#E8E6E0] bg-white px-8 py-12 text-center">
              <p className="text-base leading-relaxed text-[#555550] md:text-lg">
                {PORTFOLIO.emptyState}
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link
                  href="/cijene"
                  className="inline-flex items-center gap-2 rounded-full bg-[#0D0D0D] px-6 py-3 font-dm text-sm font-semibold text-white hover:opacity-90"
                >
                  Pogledaj cijene
                  <ArrowRight size={16} />
                </Link>
                <Link
                  href={SITE.whatsapp}
                  className="inline-flex items-center gap-2 rounded-full border border-[#0D0D0D] px-6 py-3 font-dm text-sm font-semibold text-[#0D0D0D] hover:bg-[#0D0D0D] hover:text-white"
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
