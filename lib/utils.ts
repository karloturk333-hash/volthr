export function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(" ")
}

/**
 * Safely serialise data for JSON-LD <script> tags.
 * Escapes < > & so injected values can never break out of the JSON context,
 * even if data ever becomes dynamic (e.g. via Sanity CMS).
 */
export function safeJsonLd(data: unknown): string {
  return JSON.stringify(data)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026")
}
