import type { PortableTextComponents } from "@portabletext/react"

export const portableTextComponents: PortableTextComponents = {
  block: {
    h2: ({ children }) => (
      <h2 className="font-space mt-10 mb-4 text-2xl font-bold text-[#0D0D0D]">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="font-space mt-8 mb-3 text-xl font-bold text-[#0D0D0D]">
        {children}
      </h3>
    ),
    normal: ({ children }) => (
      <p className="mb-4 text-[17px] leading-relaxed text-[#555550]">
        {children}
      </p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-6 border-l-4 border-[#8B5CF6] pl-4 italic text-[#555550]">
        {children}
      </blockquote>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold text-[#0D0D0D]">{children}</strong>
    ),
    em: ({ children }) => <em>{children}</em>,
    link: ({ value, children }) => {
      const href = value?.href ?? "#"
      const isExternal = href.startsWith("http")
      return (
        <a
          href={href}
          className="text-[#8B5CF6] underline underline-offset-2 hover:text-[#7C3AED]"
          {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        >
          {children}
        </a>
      )
    },
  },
  list: {
    bullet: ({ children }) => (
      <ul className="mb-4 ml-6 list-disc space-y-1 text-[17px] text-[#555550]">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="mb-4 ml-6 list-decimal space-y-1 text-[17px] text-[#555550]">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li>{children}</li>,
    number: ({ children }) => <li>{children}</li>,
  },
}
