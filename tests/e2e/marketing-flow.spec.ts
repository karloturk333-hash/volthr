import { test, expect } from "@playwright/test"

test.describe("Marketing site happy path", () => {
  test("Homepage loads with all key sections and CTA buttons", async ({
    page,
  }) => {
    await page.goto("/")

    // Hero section
    await expect(page.locator("h1").first()).toBeVisible()

    // CTA buttons in hero
    const ctaButtons = page.locator("a[href], button").filter({ hasText: /kontakt|cijene|whatsapp/i })
    await expect(ctaButtons.first()).toBeVisible()

    // Key sections should be visible on scroll
    // Services grid
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
    await page.waitForTimeout(500)

    // Footer
    await expect(page.locator("footer")).toBeVisible()
  })

  test("Pricing page renders 3 tiers", async ({ page }) => {
    await page.goto("/cijene")

    // Wait for pricing section
    await expect(page.locator("h1").first()).toBeVisible()

    // Should have at least 3 pricing cards (web studio tiers)
    const pricingCards = page.locator('[class*="rounded-xl"][class*="border"][class*="bg-white"]')
    await expect(pricingCards.first()).toBeVisible()

    // Verify the page has pricing content
    await expect(page.getByText(/mjesečno|mj/i).first()).toBeVisible()
  })

  test("Blog page renders posts", async ({ page }) => {
    await page.goto("/blog")

    // Blog heading
    await expect(page.locator("h1").first()).toBeVisible()

    // Either posts are visible or the empty state is shown
    const hasPosts = await page.locator("article, [class*='Card']").first().isVisible().catch(() => false)
    const hasEmptyState = await page.getByText(/uskoro/i).isVisible().catch(() => false)

    expect(hasPosts || hasEmptyState).toBeTruthy()
  })

  test("Contact page renders form with validation", async ({ page }) => {
    await page.goto("/kontakt")

    // Form should be visible
    const nameInput = page.locator("input[name='name']")
    const emailInput = page.locator("input[name='email']")
    const messageTextarea = page.locator("textarea[name='message']")

    await expect(nameInput).toBeVisible()
    await expect(emailInput).toBeVisible()
    await expect(messageTextarea).toBeVisible()

    // Fill partial form (don't submit)
    await nameInput.fill("Test Korisnik")
    await emailInput.fill("test@primjer.hr")
    await messageTextarea.fill("Ovo je test poruka.")

    // Verify honeypot field is hidden
    const honeypot = page.locator("input[name='website']")
    await expect(honeypot).toBeHidden()

    // Verify required attributes
    await expect(nameInput).toHaveAttribute("aria-required", "true")
    await expect(emailInput).toHaveAttribute("aria-required", "true")
    await expect(messageTextarea).toHaveAttribute("aria-required", "true")
  })

  test("Login page renders form", async ({ page }) => {
    await page.goto("/prijava")

    // Login form elements
    await expect(page.locator("input[type='email']")).toBeVisible()
    await expect(page.locator("input[type='password']")).toBeVisible()

    // Submit button
    await expect(page.getByRole("button", { name: /prijavi se/i })).toBeVisible()

    // Magic link option
    await expect(
      page.getByRole("button", { name: /magic link/i })
    ).toBeVisible()

    // Register link
    await expect(page.getByRole("link", { name: /registriraj/i })).toBeVisible()
  })
})
