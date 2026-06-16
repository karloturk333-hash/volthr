import type { PortableTextComponents } from "@portabletext/react"

export const portableTextComponents: PortableTextComponents = {
  block: {
    h2: ({ children }) => (
      <h2 className="font-space mt-10 mb-4 text-2xl font-bold text-ink">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="font-space mt-8 mb-3 text-xl font-bold text-ink">
        {children}
      </h3>
    ),
    normal: ({ children }) => (
      <p className="mb-4 text-[17px] leading-relaxed text-muted">
        {children}
      </p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-6 border-l-4 border-accent pl-4 italic text-muted">
        {children}
      </blockquote>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold text-ink">{children}</strong>
    ),
    em: ({ children }) => <em>{children}</em>,
    link: ({ value, children }) => {
      const href = value?.href ?? "#"
      const isExternal = href.startsWith("http")
      return (
        <a
          href={href}
          className="text-accent underline underline-offset-2 hover:text-[#7C3AED]"
          {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        >
          {children}
        </a>
      )
    },
  },
  list: {
    bullet: ({ children }) => (
      <ul className="mb-4 ml-6 list-disc space-y-1 text-[17px] text-muted">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="mb-4 ml-6 list-decimal space-y-1 text-[17px] text-muted">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li>{children}</li>,
    number: ({ children }) => <li>{children}</li>,
  },
}
