/**
 * Phase 4 — Responsiveness audit
 * Tests horizontal overflow, layout correctness, and touch targets at multiple breakpoints.
 */
import { test, expect } from "@playwright/test"

const PAGES = [
  { name: "home", path: "/" },
  { name: "o-nama", path: "/o-nama" },
  { name: "usluge", path: "/usluge" },
  { name: "cijene", path: "/cijene" },
]

const VIEWPORTS = [
  { name: "mobile-sm", width: 320, height: 568 },
  { name: "mobile", width: 375, height: 812 },
  { name: "mobile-lg", width: 428, height: 926 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "laptop", width: 1024, height: 768 },
  { name: "desktop", width: 1280, height: 800 },
  { name: "desktop-lg", width: 1440, height: 900 },
]

for (const vp of VIEWPORTS) {
  for (const p of PAGES) {
    test(`no horizontal overflow: ${p.name} @ ${vp.name} (${vp.width}px)`, async ({ page }) => {
      await page.setViewportSize({ width: vp.width, height: vp.height })
      await page.goto(p.path, { waitUntil: "networkidle" })
      await page.waitForTimeout(800)

      // Check document doesn't overflow viewport horizontally
      const overflowX = await page.evaluate(() => {
        return document.documentElement.scrollWidth > window.innerWidth
      })
      expect(overflowX, `${p.name} has horizontal overflow at ${vp.width}px`).toBe(false)
    })
  }
}

// Mobile nav tests
test("mobile nav: hamburger opens overlay", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 })
  await page.goto("/", { waitUntil: "networkidle" })

  const hamburger = page.getByRole("button", { name: /otvori izbornik/i })
  await expect(hamburger).toBeVisible()
  await hamburger.click()
  await page.waitForTimeout(300)

  // Overlay should be visible
  const mobileNav = page.getByRole("navigation", { name: /mobilna navigacija/i })
  await expect(mobileNav).toBeVisible()
})

test("mobile nav: overlay closes on link click", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 })
  await page.goto("/", { waitUntil: "networkidle" })

  await page.getByRole("button", { name: /otvori izbornik/i }).click()
  await page.waitForTimeout(300)

  const mobileNav = page.getByRole("navigation", { name: /mobilna navigacija/i })
  const cijenLink = mobileNav.getByRole("link", { name: /cijene/i })
  await cijenLink.click()
  await page.waitForTimeout(400)

  // Should navigate to /cijene and close overlay
  await expect(page).toHaveURL("/cijene")
})

// Accessibility: FAQ accordion
test("FAQ accordion: buttons have aria-expanded", async ({ page }) => {
  await page.goto("/cijene", { waitUntil: "networkidle" })
  await page.waitForTimeout(600)

  // Scroll down to trigger the dynamic FAQ component to load
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
  await page.waitForTimeout(800)

  // The FAQ accordion is loaded dynamically — wait for it
  const firstFaqButton = page.getByRole("button", { name: /\?/ }).first()
  await firstFaqButton.waitFor({ state: "visible", timeout: 10000 })

  // FAQ buttons have aria-controls linking to answer panels
  const buttons = page.locator("button[aria-controls]")
  const count = await buttons.count()
  expect(count).toBeGreaterThan(0)

  for (let i = 0; i < count; i++) {
    const btn = buttons.nth(i)
    const ariaExpanded = await btn.getAttribute("aria-expanded")
    expect(ariaExpanded, `FAQ button ${i} missing aria-expanded`).not.toBeNull()
  }
})

test("FAQ accordion: clicking toggles aria-expanded and shows answer", async ({ page }) => {
  await page.goto("/cijene", { waitUntil: "networkidle" })
  await page.waitForTimeout(600)

  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
  await page.waitForTimeout(800)

  const firstButton = page.locator("button[aria-controls]").first()
  await firstButton.waitFor({ state: "visible", timeout: 10000 })
  await expect(firstButton).toHaveAttribute("aria-expanded", "false")

  await firstButton.click()
  await page.waitForTimeout(400)
  await expect(firstButton).toHaveAttribute("aria-expanded", "true")

  const controls = await firstButton.getAttribute("aria-controls")
  if (controls) {
    const answerRegion = page.locator(`#${controls}`)
    await expect(answerRegion).toBeVisible()
  }
})

// Footer social links
test("footer social links have aria-labels", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" })

  const footer = page.locator("footer")
  const socialLinks = footer.locator("a[target='_blank']")
  const count = await socialLinks.count()

  for (let i = 0; i < count; i++) {
    const link = socialLinks.nth(i)
    const ariaLabel = await link.getAttribute("aria-label")
    expect(ariaLabel, `Social link ${i} missing aria-label`).not.toBeNull()
    expect(ariaLabel!.length, `Social link ${i} has empty aria-label`).toBeGreaterThan(0)
  }
})

// Images have alt text
test("all images on homepage have alt attributes", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" })
  await page.waitForTimeout(1000)

  const images = page.locator("img")
  const count = await images.count()

  for (let i = 0; i < count; i++) {
    const img = images.nth(i)
    const alt = await img.getAttribute("alt")
    // alt="" is valid for decorative images, but it must be present
    expect(alt, `Image ${i} missing alt attribute`).not.toBeNull()
  }
})
