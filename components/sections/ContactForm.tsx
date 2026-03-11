"use client"

import { useState } from "react"
import { m } from "motion/react"
import { Send, MessageCircle, Mail, Phone } from "lucide-react"
import { CONTACT_PAGE, SITE } from "@/lib/content"
import { fadeUp, staggerContainer } from "@/lib/animations"

type FormStatus = "idle" | "submitting" | "success" | "error"

const INPUT_CLASS =
  "w-full rounded-lg border border-[#E8E6E0] bg-[#F5F4F0] px-4 py-3 text-sm text-[#0D0D0D] placeholder:text-[#999] focus:border-[#8B5CF6] focus:outline-none focus:ring-1 focus:ring-[#8B5CF6]"

export function ContactForm() {
  const [status, setStatus] = useState<FormStatus>("idle")
  const [whatsappUrl, setWhatsappUrl] = useState<string | null>(null)

  const { fields, submit, success, error } = CONTACT_PAGE.form
  const { alternatives } = CONTACT_PAGE

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus("submitting")

    const formData = new FormData(e.currentTarget)
    const body = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      service: formData.get("service") as string,
      message: formData.get("message") as string,
      budget: formData.get("budget") as string,
      website: formData.get("website") as string,
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })

      const data = await res.json()

      if (data.success) {
        setStatus("success")
        if (data.whatsappUrl) setWhatsappUrl(data.whatsappUrl)
        ;(e.target as HTMLFormElement).reset()
      } else {
        setStatus("error")
      }
    } catch {
      setStatus("error")
    }
  }

  return (
    <m.div
      className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-3"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={staggerContainer}
    >
      {/* Form — 2 cols */}
      <m.div variants={fadeUp} className="lg:col-span-2">
        <div className="rounded-xl border border-[#E8E6E0] bg-white p-8 md:p-10">
          {status === "success" ? (
            <div className="flex flex-col items-center gap-6 py-12 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-50">
                <Send className="h-7 w-7 text-green-600" />
              </div>
              <p className="max-w-md text-lg text-[#555550]">{success}</p>
              {whatsappUrl && (
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-[var(--color-whatsapp)] px-6 py-3 text-sm font-medium text-white"
                >
                  <MessageCircle className="h-4 w-4" />
                  Otvori WhatsApp
                </a>
              )}
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Honeypot — hidden from real users */}
              <div className="absolute opacity-0" style={{ position: "absolute", left: "-9999px" }} aria-hidden="true">
                <input
                  type="text"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                {/* Name */}
                <div>
                  <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-[#0D0D0D]">
                    {fields.name.label} *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    aria-required="true"
                    placeholder={fields.name.placeholder}
                    className={INPUT_CLASS}
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-[#0D0D0D]">
                    {fields.email.label} *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    aria-required="true"
                    placeholder={fields.email.placeholder}
                    className={INPUT_CLASS}
                  />
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                {/* Phone */}
                <div>
                  <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-[#0D0D0D]">
                    {fields.phone.label}
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    placeholder={fields.phone.placeholder}
                    className={INPUT_CLASS}
                  />
                </div>

                {/* Service */}
                <div>
                  <label htmlFor="service" className="mb-1.5 block text-sm font-medium text-[#0D0D0D]">
                    {fields.service.label}
                  </label>
                  <select
                    id="service"
                    name="service"
                    className={INPUT_CLASS}
                  >
                    <option value="">Odaberite...</option>
                    {fields.service.options.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Budget */}
              <div>
                <label htmlFor="budget" className="mb-1.5 block text-sm font-medium text-[#0D0D0D]">
                  {fields.budget.label}
                </label>
                <select
                  id="budget"
                  name="budget"
                  className={INPUT_CLASS}
                >
                  <option value="">Odaberite...</option>
                  {fields.budget.options.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-[#0D0D0D]">
                  {fields.message.label} *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  aria-required="true"
                  rows={5}
                  placeholder={fields.message.placeholder}
                  className="w-full resize-none rounded-lg border border-[#E8E6E0] bg-[#F5F4F0] px-4 py-3 text-sm text-[#0D0D0D] placeholder:text-[#999] focus:border-[#8B5CF6] focus:outline-none focus:ring-1 focus:ring-[#8B5CF6]"
                />
              </div>

              {status === "error" && (
                <p className="text-sm text-red-600">{error}</p>
              )}

              <button
                type="submit"
                disabled={status === "submitting"}
                className="inline-flex items-center gap-2 rounded-full bg-[#0D0D0D] px-8 py-3.5 text-sm font-medium text-white disabled:opacity-50"
              >
                <Send className="h-4 w-4" />
                {status === "submitting" ? "Slanje..." : submit}
              </button>
            </form>
          )}
        </div>
      </m.div>

      {/* Alternatives sidebar — 1 col */}
      <m.div variants={fadeUp} className="space-y-6">
        {/* WhatsApp */}
        <a
          href={SITE.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="group block rounded-xl border border-[#E8E6E0] bg-white p-6"
        >
          <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--color-whatsapp)]/10">
            <MessageCircle className="h-5 w-5 text-[var(--color-whatsapp)]" />
          </div>
          <h3 className="font-space text-lg font-bold text-[#0D0D0D]">
            {alternatives.whatsapp.label}
          </h3>
          <p className="mt-1 text-sm text-[#555550]">
            {alternatives.whatsapp.description}
          </p>
          <span className="mt-3 block text-sm font-medium text-[#8B5CF6]">
            {SITE.phone}
          </span>
        </a>

        {/* Email */}
        <a
          href={`mailto:${SITE.email}`}
          className="group block rounded-xl border border-[#E8E6E0] bg-white p-6"
        >
          <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-[#8B5CF6]/10">
            <Mail className="h-5 w-5 text-[#8B5CF6]" />
          </div>
          <h3 className="font-space text-lg font-bold text-[#0D0D0D]">
            {alternatives.email.label}
          </h3>
          <p className="mt-1 text-sm text-[#555550]">
            {alternatives.email.description}
          </p>
          <span className="mt-3 block text-sm font-medium text-[#8B5CF6]">
            {SITE.email}
          </span>
        </a>

        {/* Call */}
        <a
          href={`tel:${SITE.phone.replace(/\s/g, "")}`}
          className="group block rounded-xl border border-[#E8E6E0] bg-white p-6"
        >
          <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-[#0D0D0D]/10">
            <Phone className="h-5 w-5 text-[#0D0D0D]" />
          </div>
          <h3 className="font-space text-lg font-bold text-[#0D0D0D]">
            {alternatives.call.label}
          </h3>
          <p className="mt-1 text-sm text-[#555550]">
            {alternatives.call.description}
          </p>
          <span className="mt-3 block text-sm font-medium text-[#8B5CF6]">
            {SITE.phone}
          </span>
        </a>
      </m.div>
    </m.div>
  )
}
