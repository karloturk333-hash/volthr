/**
 * Captures viewport screenshots of live portfolio sites using Playwright.
 * Run with: npx tsx scripts/capture-portfolio.ts
 */
import { chromium } from "playwright"
import { mkdirSync } from "fs"
import { resolve } from "path"

const OUTPUT_DIR = resolve(__dirname, "../public/images/portfolio")

const SITES = [
  {
    url: "https://villa-aurea.vercel.app",
    filename: "villa-aurea.png",
  },
  {
    url: "https://nemafleka.vercel.app",
    filename: "nema-fleka.png",
  },
] as const

async function main() {
  mkdirSync(OUTPUT_DIR, { recursive: true })

  const browser = await chromium.launch({ headless: true })
  const context = await browser.newContext({
    viewport: { width: 1280, height: 800 },
  })

  for (const site of SITES) {
    const page = await context.newPage()
    console.log(`Visiting ${site.url}...`)
    await page.goto(site.url, { waitUntil: "networkidle" })

    const outputPath = resolve(OUTPUT_DIR, site.filename)
    await page.screenshot({ path: outputPath, fullPage: false })
    console.log(`Saved ${outputPath}`)
    await page.close()
  }

  await browser.close()
  console.log("Done.")
}

main().catch((err) => {
  console.error("Screenshot capture failed:", err)
  process.exit(1)
})
