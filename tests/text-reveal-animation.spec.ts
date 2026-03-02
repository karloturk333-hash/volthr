import { test, expect } from "@playwright/test"

test.describe("TextRevealByWord scroll animation", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/")
    await page.waitForLoadState("networkidle")
  })

  test("container scrollable height is at most 50vh", async ({ page }) => {
    // Viewport is 900px per playwright.config.ts
    // Max scrollable range = containerHeight - viewportHeight should be ≤ 450px (50vh)
    const scrollableHeight = await page.evaluate(() => {
      const el = document.querySelector("[data-testid='text-reveal-container']")
      if (!el) return 9999
      return el.getBoundingClientRect().height - window.innerHeight
    })
    expect(scrollableHeight).toBeLessThanOrEqual(450)
    expect(scrollableHeight).toBeGreaterThan(0)
  })

  test("all words are fully visible within 400px of scroll past section start", async ({ page }) => {
    const sectionTop = await page.evaluate(() => {
      const el = document.querySelector("[data-testid='text-reveal-container']")
      return (el?.getBoundingClientRect().top ?? 0) + window.scrollY
    })
    await page.evaluate((top) => window.scrollTo({ top: top + 400, behavior: "instant" }), sectionTop)
    await page.waitForTimeout(150)

    const lastWordOpacity = await page.evaluate(() => {
      const words = document.querySelectorAll("[data-testid='text-reveal-word']")
      const last = words[words.length - 1] as HTMLElement | null
      return last ? parseFloat(window.getComputedStyle(last).opacity) : 0
    })
    expect(lastWordOpacity).toBeGreaterThan(0.8)
  })

  test("multiple words reveal simultaneously (cascade overlap)", async ({ page }) => {
    const sectionTop = await page.evaluate(() => {
      const el = document.querySelector("[data-testid='text-reveal-container']")
      return (el?.getBoundingClientRect().top ?? 0) + window.scrollY
    })
    // Scroll to ~55% through the animation zone
    await page.evaluate((top) => window.scrollTo({ top: top + 200, behavior: "instant" }), sectionTop)
    await page.waitForTimeout(150)

    const opacities = await page.evaluate(() => {
      return Array.from(document.querySelectorAll("[data-testid='text-reveal-word']"))
        .map((el) => parseFloat(window.getComputedStyle(el as HTMLElement).opacity))
    })
    // At midpoint, at least 2 words should be mid-reveal (between 0.1 and 0.95)
    const midReveal = opacities.filter((o) => o > 0.1 && o < 0.95)
    expect(midReveal.length).toBeGreaterThanOrEqual(2)
  })
})
