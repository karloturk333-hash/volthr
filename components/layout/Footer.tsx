import Link from "next/link"
import Image from "next/image"
import { FOOTER, SITE, CONTACT_PAGE } from "@/lib/content"

export function Footer() {
  return (
    <footer style={{ background: "var(--surface-card)", borderTop: "1px solid var(--border)" }}>
      <div className="mx-auto max-w-[1100px] px-6 py-16 md:px-12">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-12">
          {/* Column 1: Logo + description */}
          <div className="col-span-2 lg:col-span-1">
            <Image
              src="/images/volt-logo-dark-bg.svg"
              alt={SITE.fullName}
              width={90}
              height={32}
            />
            <p
              className="mt-4 text-sm leading-relaxed"
              style={{ color: "var(--text-2)" }}
            >
              {FOOTER.description}
            </p>
          </div>

          {/* Column 2: Navigation */}
          <div>
            <h4
              className="mb-4 text-sm font-semibold uppercase tracking-wider"
              style={{ color: "var(--text)" }}
            >
              {FOOTER.columns.navigation.title}
            </h4>
            <ul className="flex flex-col gap-3">
              {FOOTER.columns.navigation.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm"
                    style={{ color: "var(--text-2)" }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Services */}
          <div>
            <h4
              className="mb-4 text-sm font-semibold uppercase tracking-wider"
              style={{ color: "var(--text)" }}
            >
              {FOOTER.columns.services.title}
            </h4>
            <ul className="flex flex-col gap-3">
              {FOOTER.columns.services.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm"
                    style={{ color: "var(--text-2)" }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div className="col-span-2 lg:col-span-1">
            <h4
              className="mb-4 text-sm font-semibold uppercase tracking-wider"
              style={{ color: "var(--text)" }}
            >
              {FOOTER.columns.contact.title}
            </h4>
            <ul className="flex flex-col gap-3 text-sm" style={{ color: "var(--text-2)" }}>
              <li>
                {SITE.address.street}, {SITE.address.zip} {SITE.address.city}
              </li>
              <li>
                <a href={`tel:${SITE.phone.replace(/\s/g, "")}`}>{SITE.phone}</a>
              </li>
              <li>
                <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
              </li>
              <li>
                <a
                  href={SITE.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "var(--accent)" }}
                >
                  {CONTACT_PAGE.alternatives.whatsapp.label}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        className="border-t"
        style={{ borderColor: "var(--border)" }}
      >
        <div className="mx-auto flex max-w-[1100px] flex-col items-center justify-between gap-4 px-6 py-6 sm:flex-row md:px-12">
          <p className="text-xs" style={{ color: "var(--text-3)" }}>
            {SITE.copyright}
          </p>
          <div className="flex gap-6">
            <Link
              href={FOOTER.legal.privacy.href}
              className="text-xs"
              style={{ color: "var(--text-3)" }}
            >
              {FOOTER.legal.privacy.label}
            </Link>
            <Link
              href={FOOTER.legal.terms.href}
              className="text-xs"
              style={{ color: "var(--text-3)" }}
            >
              {FOOTER.legal.terms.label}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
