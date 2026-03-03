"use client"

import { m } from "motion/react"
import Image from "next/image"
import Link from "next/link"
import { Check } from "lucide-react"
import { SERVICES_PAGE } from "@/lib/content"
import {
  fadeUp,
  staggerContainer,
  staggerContainerSlow,
  slideFromLeft,
  slideFromRight,
} from "@/lib/animations"

const servicePhotos: Record<string, string> = {
  "dizajn":     "https://images.unsplash.com/photo-1558655146-d09347e92766?w=800&auto=format&fit=crop&q=80",
  "razvoj":     "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&auto=format&fit=crop&q=80",
  "seo":        "https://images.unsplash.com/photo-1562577309-4932fdd64cd1?w=800&auto=format&fit=crop&q=80",
  "web-shop":   "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&auto=format&fit=crop&q=80",
  "odrzavanje": "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=80",
}

export function ServicesChapters() {
  return (
    <>
      {SERVICES_PAGE.services.map((service, i) => {
        const isEven = i % 2 === 0
        const bg = isEven ? "bg-[#F5F4F0]" : "bg-white"
        const textVariant = isEven ? slideFromLeft : slideFromRight
        const visualVariant = isEven ? slideFromRight : slideFromLeft
        const photoUrl = servicePhotos[service.slug]

        return (
          <section
            key={service.slug}
            id={service.slug}
            className={`relative overflow-hidden px-6 py-28 md:px-12 md:py-36 ${bg}`}
          >
            {/* Giant decorative number */}
            <span
              className={[
                "pointer-events-none absolute top-0 select-none font-space font-black leading-none text-[#EBEBEA]",
                isEven ? "right-0 -translate-y-1/4" : "left-0 -translate-y-1/4",
              ].join(" ")}
              style={{ fontSize: "clamp(160px, 18vw, 260px)" }}
              aria-hidden="true"
            >
              {String(i + 1).padStart(2, "0")}
            </span>

            {/* Content */}
            <m.div
              className="relative mx-auto max-w-7xl"
              variants={staggerContainerSlow}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
            >
              <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-20">

                {/* Text column */}
                <m.div
                  variants={textVariant}
                  className={isEven ? "" : "lg:order-2"}
                >
                  <span className="section-label mb-3 block">{service.title}</span>
                  <h2 className="font-space text-3xl font-bold leading-tight text-[#0D0D0D] md:text-4xl lg:text-5xl">
                    {service.headline}
                  </h2>
                  <p className="mt-6 text-base leading-relaxed text-[#555550] md:text-lg">
                    {service.description}
                  </p>
                  <Link
                    href="/kontakt"
                    className="mt-8 inline-block rounded-full bg-[#0D0D0D] px-8 py-3 font-dm text-sm font-semibold text-white hover:opacity-90"
                    style={{ transition: "opacity 0.2s ease" }}
                  >
                    Zatraži konzultaciju
                  </Link>
                </m.div>

                {/* Visual column */}
                <m.div
                  variants={visualVariant}
                  className={isEven ? "" : "lg:order-1"}
                >
                  <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-[#E8E6E0]">
                    <Image
                      src={photoUrl}
                      alt={service.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>

                  {/* Feature list */}
                  <m.ul
                    className="mt-6 flex flex-col gap-3"
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                  >
                    {service.features.map((feature) => (
                      <m.li
                        key={feature}
                        variants={fadeUp}
                        className="flex items-start gap-3"
                      >
                        <Check size={16} className="mt-0.5 shrink-0 text-[#8B5CF6]" />
                        <span className="text-sm text-[#555550]">{feature}</span>
                      </m.li>
                    ))}
                  </m.ul>
                </m.div>

              </div>
            </m.div>
          </section>
        )
      })}
    </>
  )
}
