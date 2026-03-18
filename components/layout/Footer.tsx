import Image from "next/image"
import Link from "next/link"
import { Instagram, Linkedin, Facebook } from "lucide-react"
import { FOOTER, SITE, NAV } from "@/lib/content"

const socialIcons = {
  instagram: Instagram,
  linkedin: Linkedin,
  facebook: Facebook,
} as const

const socialLabels: Record<string, string> = {
  instagram: "Posjetite nas na Instagramu",
  linkedin: "Posjetite nas na LinkedInu",
  facebook: "Posjetite nas na Facebooku",
}

export function Footer() {
  return (
    <footer id="footer" className="bg-[#0D0D0D]">
      <div className="border-t border-[var(--border-dark)]" />

      <div className="mx-auto max-w-7xl px-6 py-16 md:px-12">
        <div className="flex flex-col gap-12 md:flex-row md:items-start md:justify-between">
          {/* Logo */}
          <div className="shrink-0">
            <Image src="/images/volt-v-monogram-dark.svg" alt={SITE.fullName} width={40} height={40} className="h-10 w-10" />
          </div>

          {/* Nav links */}
          <nav className="flex flex-wrap gap-x-8 gap-y-3" aria-label="Footer navigacija">
            {NAV.links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-[#A8A8A0] hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Social icons */}
          <div className="flex gap-3">
            {Object.entries(SITE.social).map(([key, url]) => {
              const Icon = socialIcons[key as keyof typeof socialIcons]
              return (
                <a
                  key={key}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border-dark)] text-[#888880] hover:border-[#888880] hover:text-white"
                  aria-label={socialLabels[key] ?? key}
                >
                  <Icon size={16} />
                </a>
              )
            })}
          </div>
        </div>
      </div>

      {/* Grant partner */}
      <div className="border-t border-[var(--border-dark)]">
        <div className="mx-auto flex max-w-7xl flex-col items-start gap-2 px-6 py-6 md:px-12">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#8B5CF6]">
            {FOOTER.grant.title}
          </p>
          <p className="max-w-lg text-xs leading-relaxed text-[#A8A8A0]">
            {FOOTER.grant.text}
          </p>
          <Link href={FOOTER.grant.cta.href} className="text-xs font-medium text-[#8B5CF6] hover:underline">
            {FOOTER.grant.cta.label}
          </Link>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[var(--border-dark)]">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-6 sm:flex-row md:px-12">
          <p className="text-xs text-[#A8A8A0]">
            {SITE.copyright}
          </p>
          <div className="flex gap-6">
            <Link href={FOOTER.legal.privacy.href} className="text-xs text-[#A8A8A0] hover:text-[#888880]">
              {FOOTER.legal.privacy.label}
            </Link>
            <Link href={FOOTER.legal.terms.href} className="text-xs text-[#A8A8A0] hover:text-[#888880]">
              {FOOTER.legal.terms.label}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
