import { test, expect } from "@playwright/test"
import path from "path"

test.describe("ServicesGrid — bento layout", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/", { waitUntil: "networkidle" })
    // Scroll the services section into view so animations settle
    await page.locator("#services").scrollIntoViewIfNeeded()
    await page.waitForTimeout(600)
  })

  // ─── 1. Section exists ────────────────────────────────────────────────────

  test("services section is present", async ({ page }) => {
    await expect(page.locator("#services")).toBeVisible()
  })

  // ─── 2. All 4 service cards render ───────────────────────────────────────

  test("all 4 service card titles are visible", async ({ page }) => {
    const services = page.locator("#services")
    const titles = ["Web dizajn", "Branding", "SEO optimizacija", "E-commerce"]
    for (const title of titles) {
      await expect(services.getByRole("heading", { name: title })).toBeVisible()
    }
  })

  // ─── 3. Cards have descriptions ──────────────────────────────────────────

  test("each card shows its description", async ({ page }) => {
    const services = page.locator("#services")
    // Each fragment is unique to one card's description
    const fragments = [
      "odgovara vašem poslu",       // Web dizajn
      "od logotipa do boja",        // Branding
      "meta tagovi",                // SEO
      "košaricom",                  // E-commerce
    ]
    for (const fragment of fragments) {
      await expect(services.getByText(fragment, { exact: false })).toBeVisible()
    }
  })

  // ─── 4. Hover reveals CTA link pointing to /usluge ────────────────────────

  test("hovering a card reveals the Saznaj više link to /usluge", async ({ page }) => {
    const firstCard = page.locator("#services .group").first()

    // CTA anchor is in the DOM but hidden before hover
    const ctaLink = firstCard.locator("a[href='/usluge']")
    await expect(ctaLink).toBeAttached()

    // Hover to reveal it
    await firstCard.hover()
    await page.waitForTimeout(350) // let transition finish

    await expect(ctaLink).toBeVisible()
    await expect(ctaLink).toContainText("Saznaj više")
  })

  // ─── 5. CTA links all point to /usluge ───────────────────────────────────

  test("all CTA anchors href to /usluge", async ({ page }) => {
    const links = page.locator("#services a[href='/usluge']")
    await expect(links).toHaveCount(4)
  })

  // ─── 6. Icon stays within card boundary on hover ─────────────────────────

  test("icon stays within card bounds after hover", async ({ page }) => {
    const firstCard = page.locator("#services .group").first()
    const icon = firstCard.locator("svg").first()

    const cardBox = await firstCard.boundingBox()
    await firstCard.hover()
    await page.waitForTimeout(350)
    const iconBox = await icon.boundingBox()

    expect(cardBox).not.toBeNull()
    expect(iconBox).not.toBeNull()
    // Icon top edge must be within the card
    expect(iconBox!.y).toBeGreaterThanOrEqual(cardBox!.y)
    expect(iconBox!.y).toBeLessThan(cardBox!.y + cardBox!.height)
  })

  // ─── 7. Screenshot (visual baseline) ─────────────────────────────────────

  test("bento grid screenshot", async ({ page }) => {
    await page.waitForTimeout(800)
    await page.locator("#services").screenshot({
      path: path.join(__dirname, "screenshots", "bento-grid.png"),
    })
  })
})

// ─── Mobile responsiveness ────────────────────────────────────────────────────

test.describe("ServicesGrid — mobile (390px)", () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 })
    await page.goto("/", { waitUntil: "networkidle" })
    await page.locator("#services").scrollIntoViewIfNeeded()
    await page.waitForTimeout(600)
  })

  test("all 4 cards stack in single column", async ({ page }) => {
    const cards = page.locator("#services .group")
    await expect(cards).toHaveCount(4)

    const boxes = await cards.evaluateAll((els) =>
      els.map((el) => el.getBoundingClientRect().left)
    )
    // All cards start at same x = single column
    const unique = new Set(boxes.map((x) => Math.round(x)))
    expect(unique.size).toBe(1)
  })

  test("CTA link is immediately visible without hover on mobile", async ({ page }) => {
    // On touch/mobile the CTA should be statically visible (no opacity-0)
    const firstCard = page.locator("#services .group").first()
    const ctaLink = firstCard.locator("a[href='/usluge']")
    await expect(ctaLink).toBeVisible()
    await expect(ctaLink).toContainText("Saznaj više")
  })

  test("cards have comfortable minimum height on mobile", async ({ page }) => {
    const cards = page.locator("#services .group")
    const count = await cards.count()
    for (let i = 0; i < count; i++) {
      const box = await cards.nth(i).boundingBox()
      expect(box!.height).toBeGreaterThanOrEqual(200)
    }
  })

  test("mobile screenshot", async ({ page }) => {
    await page.waitForTimeout(800)
    await page.locator("#services").screenshot({
      path: path.join(__dirname, "screenshots", "bento-grid-mobile.png"),
    })
  })
})

// ─── Tablet responsiveness ────────────────────────────────────────────────────

test.describe("ServicesGrid — tablet (768px)", () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 })
    await page.goto("/", { waitUntil: "networkidle" })
    await page.locator("#services").scrollIntoViewIfNeeded()
    await page.waitForTimeout(600)
  })

  test("cards lay out in 2 columns at tablet", async ({ page }) => {
    const cards = page.locator("#services .group")
    await expect(cards).toHaveCount(4)

    const boxes = await cards.evaluateAll((els) =>
      els.map((el) => el.getBoundingClientRect().left)
    )
    // Should have 2 distinct left positions = 2 columns
    const uniqueX = new Set(boxes.map((x) => Math.round(x)))
    expect(uniqueX.size).toBe(2)
  })

  test("tablet screenshot", async ({ page }) => {
    await page.waitForTimeout(800)
    await page.locator("#services").screenshot({
      path: path.join(__dirname, "screenshots", "bento-grid-tablet.png"),
    })
  })
})
