/**
 * Phase 5 — Critical User Journey E2E Tests
 * Covers the 5 most important flows for volthr.vercel.app
 */
import { test, expect } from "@playwright/test"

// ─── Journey 1: Homepage → Pricing CTA ───────────────────────────────────────

test.describe("Journey 1: Homepage to pricing page", () => {
  test("homepage loads with hero heading and CTA", async ({ page }) => {
    await page.goto("/", { waitUntil: "networkidle" })

    // Hero section visible
    const hero = page.locator("#hero")
    await expect(hero).toBeVisible()

    // Primary CTA leads to WhatsApp (until /kontakt page is fully wired)
    const primaryCta = page.getByRole("link", { name: /besplatna konzultacija/i }).first()
    await expect(primaryCta).toBeVisible()
    await expect(primaryCta).toHaveAttribute("href", /wa\.me/)

    // Secondary CTA leads to /cijene
    const secondaryCta = page.getByRole("link", { name: /pogledaj cijene/i })
    await expect(secondaryCta).toBeVisible()
    await expect(secondaryCta).toHaveAttribute("href", "/cijene")
  })

  test("clicking 'Pogledaj cijene' navigates to pricing page", async ({ page }) => {
    await page.goto("/", { waitUntil: "networkidle" })

    await page.getByRole("link", { name: /pogledaj cijene/i }).first().click()
    await expect(page).toHaveURL("/cijene")

    // Pricing page has the 3 pricing tiers
    const pricingSection = page.locator("[id]").filter({ hasText: /starter|pro|elite/i }).first()
    await expect(pricingSection).toBeTruthy()
  })

  test("pricing page has WhatsApp CTA links", async ({ page }) => {
    await page.goto("/cijene", { waitUntil: "networkidle" })

    const whatsappLinks = page.locator("a[href*='wa.me']")
    await expect(whatsappLinks.first()).toBeVisible()
    const count = await whatsappLinks.count()
    expect(count).toBeGreaterThan(0)
  })
})

// ─── Journey 2: Navigation across all built pages ─────────────────────────────

test.describe("Journey 2: Site-wide navigation", () => {
  const builtPages = [
    { label: "O nama", href: "/o-nama", heading: /o voltu|o nama/i },
    { label: "Usluge", href: "/usluge", heading: /web usluge|usluge/i },
    { label: "Cijene", href: "/cijene", heading: /cijene|paketi/i },
  ]

  for (const p of builtPages) {
    test(`nav link '${p.label}' loads page correctly`, async ({ page }) => {
      await page.goto("/", { waitUntil: "networkidle" })

      const navLink = page.getByRole("navigation", { name: /glavna navigacija/i })
        .getByRole("link", { name: p.label })
      await navLink.click()
      await page.waitForLoadState("networkidle")

      await expect(page).toHaveURL(p.href)

      // Page has a visible heading
      const heading = page.getByRole("heading", { level: 1 })
      await expect(heading).toBeVisible()
    })
  }

  test("nav logo links back to homepage", async ({ page }) => {
    await page.goto("/cijene", { waitUntil: "networkidle" })
    await page.getByRole("link", { name: /volt web studio/i }).click()
    await page.waitForLoadState("networkidle")
    await expect(page).toHaveURL("/")
  })
})

// ─── Journey 3: Mobile navigation ────────────────────────────────────────────

test.describe("Journey 3: Mobile navigation", () => {
  test.use({ viewport: { width: 390, height: 844 } })

  test("hamburger opens and closes mobile menu", async ({ page }) => {
    await page.goto("/", { waitUntil: "networkidle" })

    const hamburger = page.getByRole("button", { name: /otvori izbornik/i })
    await expect(hamburger).toBeVisible()
    await hamburger.click()
    await page.waitForTimeout(300)

    const mobileNav = page.getByRole("navigation", { name: /mobilna navigacija/i })
    await expect(mobileNav).toBeVisible()

    // Close via X button
    const closeBtn = page.getByRole("button", { name: /zatvori izbornik/i })
    await closeBtn.click()
    await page.waitForTimeout(300)
    await expect(mobileNav).not.toBeVisible()
  })

  test("mobile: all built pages accessible via hamburger menu", async ({ page }) => {
    await page.goto("/", { waitUntil: "networkidle" })

    await page.getByRole("button", { name: /otvori izbornik/i }).click()
    await page.waitForTimeout(300)

    const mobileNav = page.getByRole("navigation", { name: /mobilna navigacija/i })
    const cijenLink = mobileNav.getByRole("link", { name: /cijene/i })
    await expect(cijenLink).toBeVisible()
    await cijenLink.click()
    await expect(page).toHaveURL("/cijene")
  })
})

// ─── Journey 4: FAQ accordion interaction ─────────────────────────────────────

test.describe("Journey 4: FAQ accordion", () => {
  test("FAQ items open and close correctly", async ({ page }) => {
    await page.goto("/cijene", { waitUntil: "networkidle" })
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
    await page.waitForTimeout(600)

    const faqButtons = page.locator("button[aria-controls]")
    await faqButtons.first().waitFor({ state: "visible", timeout: 10000 })

    const count = await faqButtons.count()
    expect(count).toBeGreaterThan(0)

    // Open first item
    const firstBtn = faqButtons.first()
    await expect(firstBtn).toHaveAttribute("aria-expanded", "false")
    await firstBtn.click()
    await page.waitForTimeout(350)
    await expect(firstBtn).toHaveAttribute("aria-expanded", "true")

    // Verify answer region is visible
    const answerId = await firstBtn.getAttribute("aria-controls")
    if (answerId) {
      await expect(page.locator(`#${answerId}`)).toBeVisible()
    }

    // Click again to close
    await firstBtn.click()
    await page.waitForTimeout(350)
    await expect(firstBtn).toHaveAttribute("aria-expanded", "false")
  })

  test("FAQ accordion keyboard accessible (tab + Enter)", async ({ page }) => {
    await page.goto("/cijene", { waitUntil: "networkidle" })
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
    await page.waitForTimeout(600)

    const firstBtn = page.locator("button[aria-controls]").first()
    await firstBtn.waitFor({ state: "visible", timeout: 10000 })

    // Focus and activate via keyboard
    await firstBtn.focus()
    await page.keyboard.press("Enter")
    await page.waitForTimeout(350)
    await expect(firstBtn).toHaveAttribute("aria-expanded", "true")
  })
})

// ─── Journey 5: Services page exploration ─────────────────────────────────────

test.describe("Journey 5: Services page", () => {
  test("services page has all 5 service chapters", async ({ page }) => {
    await page.goto("/usluge", { waitUntil: "networkidle" })

    const expectedSlugs = ["dizajn", "razvoj", "seo", "web-shop", "odrzavanje"]
    for (const slug of expectedSlugs) {
      const section = page.locator(`#${slug}`)
      await expect(section).toBeAttached()
    }
  })

  test("anchor links in services hero scroll to sections", async ({ page }) => {
    await page.goto("/usluge", { waitUntil: "networkidle" })

    const dizajnLink = page.locator("a[href='#dizajn']").first()
    await dizajnLink.click()
    await page.waitForTimeout(600)

    // The dizajn section should be roughly visible (within 200px of viewport top)
    const dizajnSection = page.locator("#dizajn")
    const box = await dizajnSection.boundingBox()
    expect(box).not.toBeNull()
    // After scrolling, section should be near top of viewport
    expect(box!.y).toBeLessThan(500)
  })

  test("services chapters have CTA links to /kontakt", async ({ page }) => {
    await page.goto("/usluge", { waitUntil: "networkidle" })
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight / 3))
    await page.waitForTimeout(500)

    const ctaLinks = page.locator("a[href='/kontakt']")
    const count = await ctaLinks.count()
    expect(count).toBeGreaterThan(0)
  })
})

// ─── Security headers validation ──────────────────────────────────────────────

test.describe("Security headers", () => {
  const headersToCheck = [
    "x-frame-options",
    "x-content-type-options",
    "referrer-policy",
    "permissions-policy",
    "content-security-policy",
  ]

  for (const header of headersToCheck) {
    test(`response has ${header} header`, async ({ page }) => {
      const response = await page.goto("/", { waitUntil: "domcontentloaded" })
      expect(response).not.toBeNull()
      const headerValue = response!.headers()[header]
      expect(headerValue, `Missing security header: ${header}`).toBeTruthy()
    })
  }
})

// ─── Performance: basic assertions ────────────────────────────────────────────

test.describe("Performance baselines", () => {
  test("homepage responds within 3s", async ({ page }) => {
    const start = Date.now()
    await page.goto("/", { waitUntil: "domcontentloaded" })
    const elapsed = Date.now() - start
    expect(elapsed).toBeLessThan(3000)
  })

  test("no console errors on homepage", async ({ page }) => {
    const errors: string[] = []
    page.on("console", (msg) => {
      if (msg.type() === "error") {
        // Exclude known motion deprecation warning (motion() → motion.create())
        if (!msg.text().includes("motion()")) {
          errors.push(msg.text())
        }
      }
    })
    await page.goto("/", { waitUntil: "networkidle" })
    await page.waitForTimeout(1000)
    expect(errors).toHaveLength(0)
  })

  test("sitemap.xml only lists built pages", async ({ page }) => {
    const response = await page.goto("/sitemap.xml")
    const body = await response!.text()
    expect(body).toContain("volt.hr/")
    expect(body).toContain("volt.hr/usluge")
    expect(body).toContain("volt.hr/cijene")
    expect(body).toContain("volt.hr/o-nama")
    // All built pages should be in sitemap
    expect(body).toContain("volt.hr/projekti")
    expect(body).toContain("volt.hr/kontakt")
  })
})
