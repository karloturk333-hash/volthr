import { CLIENT_LOGOS } from "@/lib/content"

export function ClientLogos() {
  const items = CLIENT_LOGOS.placeholders

  return (
    <section className="py-12">
      <p
        className="mb-8 text-center text-sm font-medium tracking-wide uppercase"
        style={{ color: "var(--text-3)" }}
      >
        {CLIENT_LOGOS.label}
      </p>
      <div className="overflow-hidden">
        <div className="animate-marquee flex w-max gap-8">
          {[...items, ...items].map((item, i) => (
            <div
              key={i}
              className="flex h-12 shrink-0 items-center rounded-full border px-8 text-sm font-medium"
              style={{
                borderColor: "var(--border)",
                color: "var(--text-3)",
              }}
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
