const { chromium } = require('@playwright/test');
const path = require('path');

const SCREENSHOTS_DIR = path.join(__dirname, 'screenshots');

async function takeScreenshots() {
  const browser = await chromium.launch({ headless: true });

  // --- Reference site ---
  console.log('📸 Capturing reference site: eloqwnt.com');
  const refContext = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
  });
  const refPage = await refContext.newPage();
  try {
    await refPage.goto('https://www.eloqwnt.com', { waitUntil: 'load', timeout: 45000 });
    await refPage.waitForTimeout(3000); // let animations settle
    await refPage.screenshot({ path: path.join(SCREENSHOTS_DIR, 'reference-full.png'), fullPage: true });

    // Viewport-only hero screenshot
    await refPage.screenshot({ path: path.join(SCREENSHOTS_DIR, 'reference-hero.png'), fullPage: false });

    // Scroll-based section captures
    const sections = [
      { name: 'reference-fold2', scrollY: 900 },
      { name: 'reference-fold3', scrollY: 1800 },
      { name: 'reference-fold4', scrollY: 2700 },
      { name: 'reference-fold5', scrollY: 3600 },
      { name: 'reference-fold6', scrollY: 4500 },
      { name: 'reference-fold7', scrollY: 5400 },
    ];
    for (const s of sections) {
      await refPage.evaluate((y) => window.scrollTo(0, y), s.scrollY);
      await refPage.waitForTimeout(1000);
      await refPage.screenshot({ path: path.join(SCREENSHOTS_DIR, `${s.name}.png`), fullPage: false });
    }
    console.log('✅ Reference screenshots saved');
  } catch (e) {
    console.error('❌ Reference site error:', e.message);
  }
  await refContext.close();

  // --- Local site ---
  console.log('📸 Capturing local site: localhost:3000');
  const localContext = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
  });
  const localPage = await localContext.newPage();
  try {
    await localPage.goto('http://localhost:3000', { waitUntil: 'networkidle', timeout: 15000 });
    await localPage.waitForTimeout(2000);
    await localPage.screenshot({ path: path.join(SCREENSHOTS_DIR, 'current-full.png'), fullPage: true });

    await localPage.screenshot({ path: path.join(SCREENSHOTS_DIR, 'current-hero.png'), fullPage: false });

    const sections = [
      { name: 'current-fold2', scrollY: 900 },
      { name: 'current-fold3', scrollY: 1800 },
      { name: 'current-fold4', scrollY: 2700 },
      { name: 'current-fold5', scrollY: 3600 },
      { name: 'current-fold6', scrollY: 4500 },
      { name: 'current-fold7', scrollY: 5400 },
    ];
    for (const s of sections) {
      await localPage.evaluate((y) => window.scrollTo(0, y), s.scrollY);
      await localPage.waitForTimeout(1000);
      await localPage.screenshot({ path: path.join(SCREENSHOTS_DIR, `${s.name}.png`), fullPage: false });
    }
    console.log('✅ Local screenshots saved');
  } catch (e) {
    console.error('❌ Local site error:', e.message);
  }
  await localContext.close();

  await browser.close();
  console.log('\n📁 All screenshots saved to:', SCREENSHOTS_DIR);
}

takeScreenshots().catch(console.error);
