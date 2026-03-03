import type { Metadata } from "next"
import { SEO, PROJECTS_PAGE } from "@/lib/content"
import { client } from "@/lib/sanity/client"
import { ALL_PROJECTS_QUERY } from "@/lib/sanity/queries"
import { FALLBACK_PROJECTS } from "@/lib/sanity/fallback"
import type { SanityProject } from "@/lib/sanity/types"
import { ProjektiGrid } from "@/components/sections/ProjektiGrid"

export const metadata: Metadata = {
  title: SEO.projects.title,
  description: SEO.projects.description,
  alternates: { canonical: "/projekti" },
  openGraph: {
    title: SEO.projects.title,
    description: SEO.projects.description,
    url: "/projekti",
    type: "website",
    locale: "hr_HR",
  },
}

async function getProjects(): Promise<SanityProject[]> {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    return FALLBACK_PROJECTS
  }
  try {
    const projects = await client.fetch<SanityProject[]>(
      ALL_PROJECTS_QUERY,
      {},
      { next: { tags: ["project"] } }
    )
    return projects.length > 0 ? projects : FALLBACK_PROJECTS
  } catch {
    return FALLBACK_PROJECTS
  }
}

export default async function ProjektiPage() {
  const projects = await getProjects()

  return (
    <main>
      {/* Hero */}
      <section className="bg-[#F5F4F0] px-6 pt-32 pb-12 md:px-12 md:pt-40 md:pb-16">
        <div className="mx-auto max-w-7xl">
          <span className="section-label">{PROJECTS_PAGE.hero.label}</span>
          <h1 className="mt-4 font-space text-4xl font-bold leading-tight text-[#0D0D0D] md:text-5xl lg:text-6xl">
            {PROJECTS_PAGE.hero.heading}
          </h1>
          <p className="mt-4 max-w-2xl font-dm text-lg leading-relaxed text-[#555550]">
            {PROJECTS_PAGE.hero.subheading}
          </p>
        </div>
      </section>

      {/* Grid with filters */}
      <section className="bg-[#F5F4F0]">
        <ProjektiGrid projects={projects} />
      </section>
    </main>
  )
}
