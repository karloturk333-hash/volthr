import { test, expect } from "@playwright/test"
import path from "path"

test.describe("Nav — elevated card navbar", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/", { waitUntil: "networkidle" })
  })

  // ─── 1. Header is visible ──────────────────────────────────────────────────

  test("header is visible at the top of the page", async ({ page }) => {
    const header = page.locator("header").first()
    await expect(header).toBeVisible()
    const box = await header.boundingBox()
    expect(box).not.toBeNull()
    expect(box!.y).toBeLessThanOrEqual(12) // near top, accounting for pt-3 on desktop
  })

  // ─── 2. Logo links to homepage ──────────────────────────────────────────────

  test("logo links to homepage", async ({ page }) => {
    const logoLink = page.locator("header a[href='/']").first()
    await expect(logoLink).toBeVisible()
    const img = logoLink.locator("img")
    await expect(img).toHaveAttribute("src", "/images/volt-v-monogram.svg")
  })

  // ─── 3. All desktop nav links render ────────────────────────────────────────

  test("all 7 desktop nav links are visible", async ({ page }) => {
    const navLinks = [
      { label: "Početna", href: "/" },
      { label: "O nama", href: "/o-nama" },
      { label: "Usluge", href: "/usluge" },
      { label: "Projekti", href: "/projekti" },
      { label: "Cijene", href: "/cijene" },
      { label: "Blog", href: "/blog" },
      { label: "Kontakt", href: "/kontakt" },
    ]

    for (const link of navLinks) {
      const el = page.locator(`header nav a[href='${link.href}']`)
      await expect(el).toBeVisible()
      await expect(el).toContainText(link.label)
    }
  })

  // ─── 4. CTA button is visible ──────────────────────────────────────────────

  test("CTA button 'Započni projekt' is visible on desktop", async ({ page }) => {
    const cta = page.locator("header").getByText("Započni projekt")
    await expect(cta).toBeVisible()
  })

  // ─── 5. Card-style: white background on desktop ─────────────────────────────

  test("nav inner container has white background on desktop", async ({ page }) => {
    const innerDiv = page.locator("header > div").first()
    const bg = await innerDiv.evaluate((el) => getComputedStyle(el).backgroundColor)
    // rgb(255, 255, 255) = white
    expect(bg).toBe("rgb(255, 255, 255)")
  })

  // ─── 6. Card-style: rounded corners on desktop ─────────────────────────────

  test("nav inner container has rounded corners on desktop", async ({ page }) => {
    const innerDiv = page.locator("header > div").first()
    const radius = await innerDiv.evaluate((el) => getComputedStyle(el).borderRadius)
    // rounded-2xl = 1rem = 16px
    expect(parseFloat(radius)).toBeGreaterThanOrEqual(16)
  })

  // ─── 7. Card-style: has box-shadow ──────────────────────────────────────────

  test("nav inner container has a box-shadow", async ({ page }) => {
    const innerDiv = page.locator("header > div").first()
    const shadow = await innerDiv.evaluate((el) => getComputedStyle(el).boxShadow)
    expect(shadow).not.toBe("none")
  })

  // ─── 8. Shadow deepens on scroll ────────────────────────────────────────────

  test("shadow deepens after scrolling past 60px", async ({ page }) => {
    const innerDiv = page.locator("header > div").first()

    const shadowBefore = await innerDiv.evaluate((el) => getComputedStyle(el).boxShadow)

    await page.evaluate(() => window.scrollTo(0, 200))
    await page.waitForTimeout(400)

    const shadowAfter = await innerDiv.evaluate((el) => getComputedStyle(el).boxShadow)

    // Shadows should be different after scroll
    expect(shadowAfter).not.toBe(shadowBefore)
  })

  // ─── 9. Active link has purple indicator ────────────────────────────────────

  test("active link (Početna) has purple underline indicator", async ({ page }) => {
    // The homepage link should have an active indicator span
    const homeLink = page.locator("header nav a[href='/']")
    const indicator = homeLink.locator("span")
    await expect(indicator).toBeVisible()
    const bg = await indicator.evaluate((el) => getComputedStyle(el).backgroundColor)
    // #8B5CF6 = rgb(139, 92, 246)
    expect(bg).toBe("rgb(139, 92, 246)")
  })

  // ─── 10. Nav card is inset from viewport edges ─────────────────────────────

  test("nav card is inset from viewport edges on desktop", async ({ page }) => {
    const innerDiv = page.locator("header > div").first()
    const box = await innerDiv.boundingBox()
    expect(box).not.toBeNull()
    // Card should not start at x=0 (it's inset via header px-6)
    expect(box!.x).toBeGreaterThan(0)
    // Card should not extend to full viewport width
    expect(box!.width).toBeLessThan(1440)
  })

  // ─── 11. Mobile: hamburger menu ─────────────────────────────────────────────

  test("mobile: hamburger opens full-screen overlay", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 })
    await page.waitForTimeout(200)

    // Desktop nav should be hidden
    const desktopNav = page.locator("header nav[aria-label='Glavna navigacija']")
    await expect(desktopNav).toBeHidden()

    // Hamburger button should be visible
    const hamburger = page.locator("header button[aria-label='Otvori izbornik']")
    await expect(hamburger).toBeVisible()

    // Open mobile menu
    await hamburger.click()
    await page.waitForTimeout(400)

    // Mobile overlay should appear with nav links
    const mobileNav = page.locator("nav[aria-label='Mobilna navigacija']")
    await expect(mobileNav).toBeVisible()

    // Check a few links
    await expect(mobileNav.getByText("O nama")).toBeVisible()
    await expect(mobileNav.getByText("Usluge")).toBeVisible()
    await expect(mobileNav.getByText("Cijene")).toBeVisible()
  })

  // ─── 12. Mobile: full-width (no card style) ────────────────────────────────

  test("mobile: nav is full-width, not card-style", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 })
    await page.waitForTimeout(200)

    const header = page.locator("header").first()
    const box = await header.boundingBox()
    expect(box).not.toBeNull()
    // Header should span full viewport width on mobile
    expect(box!.x).toBe(0)
    expect(box!.width).toBe(390)
  })

  // ─── 13. Screenshot (visual baseline) ───────────────────────────────────────

  test("nav desktop screenshot", async ({ page }) => {
    await page.waitForTimeout(600)
    // Capture just the nav area (top ~80px of page)
    await page.screenshot({
      path: path.join(__dirname, "screenshots", "nav-desktop.png"),
      clip: { x: 0, y: 0, width: 1440, height: 100 },
    })
  })

  test("nav mobile screenshot", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 })
    await page.waitForTimeout(600)
    await page.screenshot({
      path: path.join(__dirname, "screenshots", "nav-mobile.png"),
      clip: { x: 0, y: 0, width: 390, height: 80 },
    })
  })
})
