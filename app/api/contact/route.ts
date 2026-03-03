import { NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"
import { SITE } from "@/lib/content"

// In-memory rate limiter: IP → timestamp array
const rateLimitMap = new Map<string, number[]>()
const RATE_LIMIT_MAX = 5
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000 // 1 hour

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const timestamps = rateLimitMap.get(ip) ?? []

  // Clean stale entries
  const recent = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW_MS)
  rateLimitMap.set(ip, recent)

  if (recent.length >= RATE_LIMIT_MAX) return true

  recent.push(now)
  rateLimitMap.set(ip, recent)
  return false
}

function sanitize(str: string): string {
  return str.replace(/[\r\n]/g, " ").trim()
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown"

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { success: false, error: "Previše zahtjeva. Pokušajte kasnije." },
        { status: 429 }
      )
    }

    const body = await request.json()
    const { name, email, phone, service, message, budget } = body

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: "Ime, email i poruka su obavezni." },
        { status: 400 }
      )
    }

    if (typeof name !== "string" || name.length > 200) {
      return NextResponse.json(
        { success: false, error: "Neispravno ime." },
        { status: 400 }
      )
    }

    if (!isValidEmail(email) || email.length > 320) {
      return NextResponse.json(
        { success: false, error: "Neispravna email adresa." },
        { status: 400 }
      )
    }

    if (typeof message !== "string" || message.length > 5000) {
      return NextResponse.json(
        { success: false, error: "Poruka je predugačka (max 5000 znakova)." },
        { status: 400 }
      )
    }

    const safeName = sanitize(name)
    const safeEmail = sanitize(email)
    const safePhone = sanitize(String(phone ?? "").slice(0, 30))
    const safeService = sanitize(String(service ?? "").slice(0, 100))
    const safeMessage = sanitize(message)
    const safeBudget = sanitize(String(budget ?? "").slice(0, 50))

    // Build WhatsApp fallback URL
    const whatsappMessage = encodeURIComponent(
      `Bok! Zovem se ${safeName}. ${safeService ? `Zanima me: ${safeService}. ` : ""}${safeMessage}`
    )
    const whatsappUrl = `${SITE.whatsapp}?text=${whatsappMessage}`

    // Send email via Resend
    const resendApiKey = process.env.RESEND_API_KEY
    if (resendApiKey && resendApiKey !== "re_placeholder_replace_me") {
      const resend = new Resend(resendApiKey)

      await resend.emails.send({
        from: "Volt Kontakt <onboarding@resend.dev>",
        to: SITE.email,
        replyTo: safeEmail,
        subject: `Novi upit — ${escapeHtml(safeName)}${safeService ? ` (${escapeHtml(safeService)})` : ""}`,
        html: `
          <h2>Novi upit s web stranice</h2>
          <p><strong>Ime:</strong> ${escapeHtml(safeName)}</p>
          <p><strong>Email:</strong> ${escapeHtml(safeEmail)}</p>
          ${safePhone ? `<p><strong>Telefon:</strong> ${escapeHtml(safePhone)}</p>` : ""}
          ${safeService ? `<p><strong>Usluga:</strong> ${escapeHtml(safeService)}</p>` : ""}
          ${safeBudget ? `<p><strong>Budžet:</strong> ${escapeHtml(safeBudget)}</p>` : ""}
          <p><strong>Poruka:</strong></p>
          <p>${escapeHtml(safeMessage).replace(/\n/g, "<br>")}</p>
        `,
      })
    }

    return NextResponse.json({ success: true, whatsappUrl })
  } catch {
    return NextResponse.json(
      { success: false, error: "Greška na serveru. Pokušajte ponovno." },
      { status: 500 }
    )
  }
}
