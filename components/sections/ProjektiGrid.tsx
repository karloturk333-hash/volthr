"use client"

import { useState } from "react"
import { m } from "motion/react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, ArrowUpRight, MapPin } from "lucide-react"
import { PROJECTS_PAGE } from "@/lib/content"
import { projectCard, staggerContainerProjects, fadeUp } from "@/lib/animations"
import type { SanityProject } from "@/lib/sanity/types"
import { urlFor } from "@/lib/sanity/image"

// Gradient fallbacks when no cover image is uploaded
const GRADIENT_FALLBACKS = [
  "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
  "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
  "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
] as const

interface ProjektiGridProps {
  projects: SanityProject[]
}

export function ProjektiGrid({ projects }: ProjektiGridProps) {
  const [activeCategory, setActiveCategory] = useState("Svi")

  const filtered =
    activeCategory === "Svi"
      ? projects
      : projects.filter((p) => p.category === activeCategory)

  return (
    <>
      {/* Category filters */}
      <div className="mx-auto max-w-7xl px-6 pb-8 md:px-12">
        <div className="flex flex-wrap gap-2">
          {PROJECTS_PAGE.categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`rounded-full px-4 py-2 font-dm text-sm font-medium ${
                activeCategory === cat
                  ? "bg-[#8B5CF6] text-white"
                  : "border border-[#E8E6E0] bg-white text-[#555550] hover:border-[#D0CEC8]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Project grid or empty state */}
      <div className="mx-auto max-w-7xl px-6 pb-24 md:px-12 md:pb-32 lg:pb-36">
        {filtered.length > 0 ? (
          <m.div
            className="grid grid-cols-1 gap-6 md:grid-cols-2"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={staggerContainerProjects}
          >
            {filtered.map((project, i) => (
              <m.a
                key={project._id}
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                variants={projectCard}
                whileHover={{ y: -6, boxShadow: "0 20px 40px -12px rgba(0,0,0,0.12)" }}
                className="group overflow-hidden rounded-xl border border-[#E8E6E0] bg-white"
              >
                {/* Cover image, static image, or gradient fallback */}
                <div
                  className="relative h-60 w-full overflow-hidden md:h-72"
                  style={
                    project.coverImage || project.staticImage
                      ? undefined
                      : { background: GRADIENT_FALLBACKS[i % GRADIENT_FALLBACKS.length] }
                  }
                >
                  {project.coverImage ? (
                    <Image
                      src={urlFor(project.coverImage).width(800).height(500).url()}
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
                      className="object-cover group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <span className="font-space text-3xl font-bold text-white/80">
                        {project.title}
                      </span>
                    </div>
                  )}
                  {/* Bottom gradient overlay for depth */}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                </div>

                {/* Card body */}
                <div className="p-7">
                  <div className="mb-3 flex items-center gap-2">
                    <span className="rounded-full bg-[#F5F4F0] px-3 py-1 font-dm text-[11px] font-medium uppercase tracking-wider text-[#555550]">
                      {project.category}
                    </span>
                    {project.location && (
                      <span className="flex items-center gap-1 font-dm text-xs text-[#888880]">
                        <MapPin size={12} />
                        {project.location}
                      </span>
                    )}
                  </div>

                  <h3 className="mb-2 font-space text-2xl leading-snug font-bold text-[#0D0D0D]">
                    {project.title}
                  </h3>
                  <p className="mb-5 line-clamp-2 font-dm text-[15px] leading-relaxed text-[#555550]">
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div className="mb-4 flex flex-wrap gap-1.5">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-md border border-[#E8E6E0] bg-transparent px-2.5 py-1 font-dm text-[11px] uppercase tracking-wide text-[#888880]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex items-center gap-4">
                    <span className="inline-flex items-center gap-1.5 font-dm text-sm font-medium text-[#8B5CF6]">
                      Posjeti stranicu
                      <ArrowUpRight size={14} className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                    {project.caseStudySlug && (
                      <Link
                        href={`/projekti/${project.caseStudySlug}`}
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-1.5 font-dm text-sm font-medium text-[#0D0D0D] hover:text-[#8B5CF6]"
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
        ) : (
          <m.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={fadeUp}
            className="mx-auto max-w-2xl rounded-xl border border-[#E8E6E0] bg-white px-8 py-12 text-center"
          >
            <h3 className="mb-3 font-space text-xl font-bold text-[#0D0D0D]">
              {PROJECTS_PAGE.emptyState.heading}
            </h3>
            <p className="mb-6 font-dm text-base leading-relaxed text-[#555550]">
              {PROJECTS_PAGE.emptyState.body}
            </p>
            <a
              href={PROJECTS_PAGE.emptyState.cta.href}
              className="inline-flex items-center gap-2 rounded-full bg-[#0D0D0D] px-6 py-3 font-dm text-sm font-semibold text-white hover:opacity-90"
            >
              {PROJECTS_PAGE.emptyState.cta.label}
            </a>
          </m.div>
        )}
      </div>
    </>
  )
}
