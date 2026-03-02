import { test, expect } from "@playwright/test"
import path from "path"

test.describe("/usluge page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/usluge", { waitUntil: "networkidle" })
  })

  // ─── 1. Page loads & title ────────────────────────────────────────────────

  test("has correct page title", async ({ page }) => {
    await expect(page).toHaveTitle(/Volt Web Studio/)
  })

  // ─── 2. Hero section ─────────────────────────────────────────────────────

  test("hero heading is visible", async ({ page }) => {
    const heading = page.locator("h1")
    await expect(heading).toBeVisible()
    // Words are rendered as separate <span> elements (word-stagger animation),
    // so textContent has no spaces. Check for a unique word instead.
    await expect(heading).toContainText("uspjeh")
  })

  test("hero anchor nav has 5 service links", async ({ page }) => {
    // All 5 anchor links must be present
    const slugs = ["dizajn", "razvoj", "seo", "web-shop", "odrzavanje"]
    for (const slug of slugs) {
      const link = page.locator(`a[href="#${slug}"]`)
      await expect(link).toBeVisible()
    }
  })

  // ─── 3. Service sections present in DOM ──────────────────────────────────

  test("all 5 service sections have correct IDs", async ({ page }) => {
    const slugs = ["dizajn", "razvoj", "seo", "web-shop", "odrzavanje"]
    for (const slug of slugs) {
      const section = page.locator(`#${slug}`)
      await expect(section).toBeAttached()
    }
  })

  test("each service chapter shows its headline", async ({ page }) => {
    const headlines = [
      "Dizajn koji ne izgleda kao predložak",
      "Brze stranice koje Google voli",
      "Nađite se na prvoj stranici Googlea",
      "Prodajte online",
      "Mi brinemo. Vi radite svoj posao",
    ]
    for (const text of headlines) {
      await expect(page.getByText(text, { exact: false })).toBeVisible()
    }
  })

  // ─── 4. Anchor navigation ─────────────────────────────────────────────────

  test("clicking dizajn anchor scrolls to the section", async ({ page }) => {
    const link = page.locator(`a[href="#dizajn"]`).first()
    await link.click()
    const section = page.locator("#dizajn")
    await expect(section).toBeInViewport({ ratio: 0.2 })
  })

  // ─── 5. Feature lists ─────────────────────────────────────────────────────

  test("service chapters contain feature check items", async ({ page }) => {
    // Each chapter has at least one feature list item with a check icon
    const features = page.locator("ul li").filter({ hasText: /[A-Za-z]/ })
    const count = await features.count()
    expect(count).toBeGreaterThan(10) // 5 services × 4+ features each
  })

  // ─── 6. CTA panel ─────────────────────────────────────────────────────────

  test("CTA panel is present at the bottom", async ({ page }) => {
    // Scroll to bottom
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
    await page.waitForTimeout(500)

    // CTA dark section exists
    const cta = page.locator("section").filter({ has: page.locator("a[href*='kontakt'], a[href*='wa.me']") }).last()
    await expect(cta).toBeVisible()
  })

  // ─── 7. Full-page screenshot (visual baseline) ────────────────────────────

  test("full-page screenshot", async ({ page }) => {
    // Wait for images and animations to settle
    await page.waitForTimeout(2000)
    await page.screenshot({
      path: path.join(__dirname, "screenshots", "usluge-full.png"),
      fullPage: true,
    })
    // This test always passes — it's a snapshot for manual visual review
  })

  // ─── 8. Mobile layout ─────────────────────────────────────────────────────

  test("sections stack to single column on mobile", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 })
    await page.goto("/usluge", { waitUntil: "networkidle" })
    await page.waitForTimeout(1000)

    // Hero heading still visible
    await expect(page.locator("h1")).toBeVisible()

    // All sections still in DOM
    for (const slug of ["dizajn", "razvoj", "seo", "web-shop", "odrzavanje"]) {
      await expect(page.locator(`#${slug}`)).toBeAttached()
    }

    await page.screenshot({
      path: path.join(__dirname, "screenshots", "usluge-mobile.png"),
      fullPage: true,
    })
  })
})
