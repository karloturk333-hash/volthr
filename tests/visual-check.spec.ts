import { test, expect } from "@playwright/test"

const BASE = "http://localhost:3000"

test.describe("Agency pivot — public pages", () => {
  test("Homepage loads with agency messaging", async ({ page }) => {
    await page.goto(BASE, { waitUntil: "networkidle" })
    await expect(page.locator("#hero")).toBeVisible()
    // No SaaS remnants
    await expect(page.locator('a[href="/ai-content"]')).toHaveCount(0)
    await expect(page.locator('a[href="/registracija"]')).toHaveCount(0)
    await expect(page.getByText("Isprobaj besplatno")).toHaveCount(0)
    // Agency CTA present (WhatsApp link)
    const whatsappLink = page.locator('a[href*="wa.me"]').first()
    await expect(whatsappLink).toBeVisible()
    await page.screenshot({ path: "test-results/01-homepage.png", fullPage: true })
  })

  test("Pricing page shows agency retainers", async ({ page }) => {
    await page.goto(`${BASE}/cijene`, { waitUntil: "networkidle" })
    await expect(page.locator("h1")).toBeVisible()
    // Agency pricing tiers
    await expect(page.getByText("149").first()).toBeVisible()
    await expect(page.getByText("299").first()).toBeVisible()
    await expect(page.getByText("499").first()).toBeVisible()
    // No SaaS AI pricing
    await expect(page.getByText("AI koji piše umjesto tebe")).toHaveCount(0)
    await page.screenshot({ path: "test-results/02-pricing.png", fullPage: true })
  })

  test("Services page loads", async ({ page }) => {
    await page.goto(`${BASE}/usluge`, { waitUntil: "networkidle" })
    await expect(page.locator("h1")).toBeVisible()
    await page.screenshot({ path: "test-results/03-services.png", fullPage: true })
  })

  test("About page loads", async ({ page }) => {
    await page.goto(`${BASE}/o-nama`, { waitUntil: "networkidle" })
    await expect(page.locator("h1")).toBeVisible()
    await page.screenshot({ path: "test-results/04-about.png", fullPage: true })
  })

  test("Contact page loads", async ({ page }) => {
    await page.goto(`${BASE}/kontakt`, { waitUntil: "networkidle" })
    await expect(page.locator("h1")).toBeVisible()
    await page.screenshot({ path: "test-results/05-contact.png", fullPage: true })
  })

  test("Projects page loads", async ({ page }) => {
    await page.goto(`${BASE}/projekti`, { waitUntil: "networkidle" })
    await expect(page.locator("h1")).toBeVisible()
    await page.screenshot({ path: "test-results/06-projects.png", fullPage: true })
  })
})

test.describe("Agency pivot — login page", () => {
  test("Login page has no registration link", async ({ page }) => {
    await page.goto(`${BASE}/prijava`, { waitUntil: "networkidle" })
    await expect(page.getByText("Prijavi se").first()).toBeVisible()
    // No registration link (agency model — no public signup)
    await expect(page.locator('a[href="/registracija"]')).toHaveCount(0)
    await expect(page.getByText("Samo za Volt tim").first()).toBeVisible()
    await page.screenshot({ path: "test-results/07-login.png", fullPage: true })
  })
})

test.describe("Agency pivot — no SaaS remnants anywhere", () => {
  const pages = [
    { name: "Homepage", path: "/" },
    { name: "Services", path: "/usluge" },
    { name: "Pricing", path: "/cijene" },
    { name: "About", path: "/o-nama" },
    { name: "Contact", path: "/kontakt" },
  ]

  for (const p of pages) {
    test(`${p.name} has no "Volt Autopilot" text`, async ({ page }) => {
      await page.goto(`${BASE}${p.path}`, { waitUntil: "networkidle" })
      const autopilotText = page.getByText("Volt Autopilot")
      await expect(autopilotText).toHaveCount(0)
    })
  }
})
