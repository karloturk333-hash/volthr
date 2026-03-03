import { test } from "@playwright/test"
import path from "path"
import fs from "fs"

const pages = [
  { name: "home", path: "/" },
  { name: "o-nama", path: "/o-nama" },
  { name: "usluge", path: "/usluge" },
  { name: "cijene", path: "/cijene" },
]

const viewports = [
  { name: "mobile", width: 375, height: 812 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "desktop", width: 1440, height: 900 },
]

const beforeDir = path.join(process.cwd(), "audit/screenshots/before")
fs.mkdirSync(beforeDir, { recursive: true })

for (const vp of viewports) {
  for (const p of pages) {
    test(`screenshot: ${p.name} @ ${vp.name}`, async ({ page }) => {
      await page.setViewportSize({ width: vp.width, height: vp.height })
      await page.goto(p.path, { waitUntil: "networkidle" })
      await page.waitForTimeout(1500)
      const filename = path.join(beforeDir, `${p.name}-${vp.name}.png`)
      await page.screenshot({ path: filename, fullPage: true })
    })
  }
}
