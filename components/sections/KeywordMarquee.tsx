import { MARQUEE_WORDS } from "@/lib/content"

export function KeywordMarquee() {
  const words = MARQUEE_WORDS.join(" · ")

  return (
    <section className="overflow-hidden py-8" style={{ background: "var(--surface-card)" }}>
      <div className="animate-marquee flex w-max items-center gap-0">
        {[0, 1].map((i) => (
          <span
            key={i}
            className="shrink-0 px-4 text-2xl font-semibold uppercase tracking-wider md:text-3xl"
            style={{ color: "var(--text-3)" }}
          >
            {words} ·{" "}
          </span>
        ))}
      </div>
    </section>
  )
}
