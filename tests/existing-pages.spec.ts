/**
 * Phase 5 — E2E Tests for Existing Pages
 * Verifies that all major sections render on each built page.
 */
import { test, expect } from "@playwright/test"

// ─── Homepage (/) ────────────────────────────────────────────────────────────

test.describe("Homepage", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" })
  })

  test("Hero section renders with heading and CTA buttons", async ({ page }) => {
    const hero = page.locator("#hero")
    await expect(hero).toBeVisible()
    await expect(hero.getByRole("heading", { level: 1 })).toBeVisible()
    await expect(page.getByRole("link", { name: /besplatna konzultacija/i }).first()).toBeVisible()
    await expect(page.getByRole("link", { name: /pogledaj cijene/i })).toBeVisible()
  })

  test("Speed badge renders with Lighthouse score", async ({ page }) => {
    await expect(page.getByText("Lighthouse Score")).toBeVisible()
  })

  test("AboutSplit section renders", async ({ page }) => {
    const about = page.locator("#about")
    await expect(about).toBeVisible()
  })

  test("ServicesGrid section renders", async ({ page }) => {
    const services = page.locator("#services")
    await expect(services).toBeVisible()
  })

  test("StatsCounters section renders", async ({ page }) => {
    // StatsCounters has the label "Volt u brojevima"
    await expect(page.getByText("Volt u brojevima")).toBeVisible()
  })

  test("WhyUs section renders", async ({ page }) => {
    const whyUs = page.locator("#why-us")
    await expect(whyUs).toBeVisible()
  })

  test("Testimonials section renders", async ({ page }) => {
    const testimonials = page.locator("#testimonials")
    await expect(testimonials).toBeVisible()
  })

  test("PricingPreview section renders", async ({ page }) => {
    // PricingPreview uses label "Cijene" and has pricing tier cards
    await expect(page.getByText("Fiksne cijene. Bez iznenađenja.")).toBeVisible()
  })

  test("FaqAccordion section renders", async ({ page }) => {
    await expect(page.getByText("Imate pitanja? Mi imamo odgovore.")).toBeVisible()
  })

  test("CtaPanel section renders", async ({ page }) => {
    const cta = page.locator("#cta")
    await expect(cta).toBeVisible()
  })
})

// ─── About Page (/o-nama) ────────────────────────────────────────────────────

test.describe("About Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/o-nama", { waitUntil: "domcontentloaded" })
  })

  test("page loads with AboutHero heading", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: /profesionalne web stranice za svakoga/i })
    ).toBeVisible()
  })

  test("AboutStory section renders", async ({ page }) => {
    await expect(page.getByText("Naša priča")).toBeVisible()
    await expect(page.getByRole("heading", { name: /zašto volt/i })).toBeVisible()
  })

  test("AboutValues section renders with 4 value cards", async ({ page }) => {
    await expect(page.getByText("Vrijednosti").first()).toBeVisible()
    // 4 value cards: Brzina, Transparentnost, Kvaliteta, Rezultati iznad obećanja
    await expect(page.getByText("Brzina")).toBeVisible()
    await expect(page.getByText("Transparentnost")).toBeVisible()
    await expect(page.getByText("Kvaliteta")).toBeVisible()
    await expect(page.getByText("Rezultati iznad obećanja")).toBeVisible()
  })

  test("AboutProcess section renders with 5 steps", async ({ page }) => {
    await expect(page.getByText("Kako radimo").first()).toBeVisible()
    // 5 steps: Dan 0, Dan 1–2, Dan 3–5, Dan 6, Dan 7
    await expect(page.getByText("Besplatna konzultacija").first()).toBeVisible()
    await expect(page.getByText("Dizajn i koncept").first()).toBeVisible()
    await expect(page.getByText("Lansiranje").first()).toBeVisible()
  })
})

// ─── Services Page (/usluge) ─────────────────────────────────────────────────

test.describe("Services Page", () => {
  test("page loads with heading", async ({ page }) => {
    await page.goto("/usluge", { waitUntil: "domcontentloaded" })
    await expect(
      page.getByRole("heading", { name: /sve što vam treba za uspjeh na webu/i })
    ).toBeVisible()
  })

  test("service chapters render", async ({ page }) => {
    await page.goto("/usluge", { waitUntil: "domcontentloaded" })
    await expect(page.getByText("Web dizajn").first()).toBeVisible()
    await expect(page.getByText("Web razvoj").first()).toBeVisible()
    await expect(page.getByText("SEO optimizacija").first()).toBeVisible()
  })
})

// ─── Pricing Page (/cijene) ──────────────────────────────────────────────────

test.describe("Pricing Page", () => {
  test("page loads with pricing tiers", async ({ page }) => {
    await page.goto("/cijene", { waitUntil: "domcontentloaded" })
    await expect(
      page.getByRole("heading", { name: /transparentne cijene/i })
    ).toBeVisible()
    // 3 tiers visible
    await expect(page.getByText("€399").first()).toBeVisible()
    await expect(page.getByText("€699").first()).toBeVisible()
    await expect(page.getByText("€1.299").first()).toBeVisible()
  })
})
