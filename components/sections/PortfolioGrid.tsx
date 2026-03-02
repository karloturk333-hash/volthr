"use client"

import { m } from "motion/react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { PORTFOLIO } from "@/lib/content"
import { projectCard, staggerContainerProjects } from "@/lib/animations"
import { TextRevealByWord } from "@/components/ui/text-reveal"

const projects = [
  { name: "AutoServis Pro", category: "Web dizajn", gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" },
  { name: "Salon Ljepote", category: "Branding", gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)" },
  { name: "Pekara Sunce", category: "E-commerce", gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)" },
  { name: "Stolarija Hrast", category: "Web dizajn", gradient: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)" },
  { name: "Elektro Servis", category: "SEO", gradient: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)" },
  { name: "Cvjećarnica Flora", category: "Web dizajn", gradient: "linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)" },
]

export function PortfolioGrid() {
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

      {/* Project grid + CTA */}
      <m.div
        className="mx-auto max-w-7xl px-6 pb-24 md:px-12 md:pb-32 lg:pb-36"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.05 }}
        variants={staggerContainerProjects}
      >
        {/* 2-col grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((project) => (
            <m.div
              key={project.name}
              variants={projectCard}
              whileHover={{ scale: 1.02 }}
              className="group cursor-pointer overflow-hidden rounded-2xl"
            >
              {/* Gradient placeholder image */}
              <div
                className="aspect-[4/3] w-full"
                style={{ background: project.gradient }}
              />
              {/* Info */}
              <div className="mt-4 flex items-center justify-between">
                <div>
                  <h3 className="font-space text-lg font-bold text-[#0D0D0D]">
                    {project.name}
                  </h3>
                  <span className="mt-1 inline-block rounded-full bg-[rgba(139,92,246,0.08)] px-3 py-1 text-xs font-medium text-[#8B5CF6]">
                    {project.category}
                  </span>
                </div>
              </div>
            </m.div>
          ))}
        </div>

        {/* View all link */}
        <m.div variants={projectCard} className="mt-12 flex justify-end">
          <Link
            href={PORTFOLIO.cta.href}
            className="inline-flex items-center gap-2 font-dm text-sm font-medium text-[#0D0D0D] hover:text-[#8B5CF6]"
          >
            {PORTFOLIO.cta.label}
            <ArrowRight size={16} />
          </Link>
        </m.div>
      </m.div>

    </section>
  )
}
