import { test, expect } from "@playwright/test"
import path from "path"

test.describe("/cijene page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/cijene", { waitUntil: "networkidle" })
  })

  // ─── 1. Page loads & title ────────────────────────────────────────────────

  test("has correct page title", async ({ page }) => {
    await expect(page).toHaveTitle(/Cijene/)
  })

  // ─── 2. Hero section ─────────────────────────────────────────────────────

  test("hero heading is visible", async ({ page }) => {
    const heading = page.locator("h1")
    await expect(heading).toBeVisible()
    await expect(heading).toContainText("cijene")
  })

  test("hero has 3 trust badges", async ({ page }) => {
    const badges = page.getByText("Gotovo za 7 dana")
    await expect(badges).toBeVisible()
    await expect(page.getByText("Fiksne cijene")).toBeVisible()
    await expect(page.getByText("Bez ugovora o vezanju", { exact: true })).toBeVisible()
  })

  // ─── 3. Pricing tier cards ─────────────────────────────────────────────────

  test("all 3 pricing tiers are visible", async ({ page }) => {
    await expect(page.getByRole("heading", { name: "Start" })).toBeVisible()
    await expect(page.getByRole("heading", { name: "Profesionalni" })).toBeVisible()
    await expect(page.getByRole("heading", { name: "Premium" })).toBeVisible()
  })

  test("prices are displayed correctly", async ({ page }) => {
    await expect(page.getByText("€399")).toBeVisible()
    await expect(page.getByText("€699")).toBeVisible()
    await expect(page.getByText("€1.299")).toBeVisible()
  })

  test("popular badge shows on Profesionalni tier", async ({ page }) => {
    await expect(page.getByText("Najpopularniji")).toBeVisible()
  })

  test("each tier has expanded feature list", async ({ page }) => {
    // Each tier should have multiple check-marked features
    const features = page.locator("ul li").filter({ hasText: /[A-Za-z]/ })
    const count = await features.count()
    // 8 + 10 + 12 = 30 features total
    expect(count).toBeGreaterThanOrEqual(28)
  })

  // ─── 4. CTA buttons ───────────────────────────────────────────────────────

  test("each tier has WhatsApp CTA", async ({ page }) => {
    const whatsappLinks = page.locator("a[href*='wa.me']")
    const count = await whatsappLinks.count()
    expect(count).toBeGreaterThanOrEqual(3)
  })

  test("WhatsApp links have pre-filled messages", async ({ page }) => {
    const whatsappLinks = page.locator("a[href*='wa.me']")
    const first = whatsappLinks.first()
    const href = await first.getAttribute("href")
    expect(href).toContain("text=")
    expect(href).toContain("paket")
  })

  test("each tier has kontakt secondary CTA", async ({ page }) => {
    const kontaktLinks = page.locator("a[href='/kontakt']")
    const count = await kontaktLinks.count()
    expect(count).toBeGreaterThanOrEqual(3)
  })

  // ─── 5. All plans include section ─────────────────────────────────────────

  test("all plans include section is visible", async ({ page }) => {
    await expect(page.getByText("Svi paketi uključuju")).toBeVisible()
    await expect(page.getByText("SSL certifikat", { exact: true })).toBeVisible()
    await expect(page.getByText("GDPR kolačići")).toBeVisible()
  })

  // ─── 6. Guarantee badge ───────────────────────────────────────────────────

  test("guarantee badge is visible", async ({ page }) => {
    await expect(page.getByText("Naše jamstvo")).toBeVisible()
    await expect(page.getByText("10% popusta po danu kašnjenja")).toBeVisible()
  })

  // ─── 7. EU Grant section (reused component) ──────────────────────────────

  test("EU grant banner is present", async ({ page }) => {
    await expect(page.getByText("EU Potpore")).toBeVisible()
    await expect(page.getByText("85%")).toBeVisible()
  })

  // ─── 8. FAQ section (reused component) ────────────────────────────────────

  test("FAQ section is present", async ({ page }) => {
    await expect(page.getByText("Česta pitanja")).toBeVisible()
  })

  // ─── 9. CTA panel (reused component) ──────────────────────────────────────

  test("CTA panel is present at the bottom", async ({ page }) => {
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
    await page.waitForTimeout(500)

    const cta = page.locator("section").filter({
      has: page.locator("a[href*='wa.me']"),
    }).last()
    await expect(cta).toBeVisible()
  })

  // ─── 10. Full-page screenshot ─────────────────────────────────────────────

  test("full-page screenshot", async ({ page }) => {
    // Scroll through entire page to trigger whileInView animations
    await page.evaluate(async () => {
      const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))
      for (let i = 0; i < document.body.scrollHeight; i += 300) {
        window.scrollTo(0, i)
        await delay(100)
      }
      window.scrollTo(0, 0)
    })
    await page.waitForTimeout(1000)
    await page.screenshot({
      path: path.join(__dirname, "screenshots", "cijene-full.png"),
      fullPage: true,
    })
  })

  // ─── 11. Mobile layout ────────────────────────────────────────────────────

  test("cards stack on mobile", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 })
    await page.goto("/cijene", { waitUntil: "networkidle" })
    // Scroll through to trigger whileInView animations
    await page.evaluate(async () => {
      const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))
      for (let i = 0; i < document.body.scrollHeight; i += 300) {
        window.scrollTo(0, i)
        await delay(100)
      }
      window.scrollTo(0, 0)
    })
    await page.waitForTimeout(1000)

    // Hero still visible
    await expect(page.locator("h1")).toBeVisible()

    // All 3 tiers still present
    await expect(page.getByRole("heading", { name: "Start" })).toBeVisible()
    await expect(page.getByRole("heading", { name: "Profesionalni" })).toBeVisible()
    await expect(page.getByRole("heading", { name: "Premium" })).toBeVisible()

    await page.screenshot({
      path: path.join(__dirname, "screenshots", "cijene-mobile.png"),
      fullPage: true,
    })
  })
})
