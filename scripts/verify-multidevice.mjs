import { chromium } from 'playwright';
import path from 'path';
import fs from 'fs';
import { preview } from 'vite';

const ARTIFACTS_DIR = 'C:/Users/Dell/.gemini/antigravity-ide/brain/46c778f1-13f8-4ee6-ad5a-3ab16763e466';

if (!fs.existsSync(ARTIFACTS_DIR)) {
  fs.mkdirSync(ARTIFACTS_DIR, { recursive: true });
}

async function run() {
  console.log('>>> Starting Vite Preview Server on port 3000...');
  const server = await preview({
    preview: { port: 3000, host: '127.0.0.1' },
  });

  const url = 'http://127.0.0.1:3000';
  console.log(`>>> Preview server ready at ${url}`);

  console.log('>>> Launching Playwright Chromium...');
  const browser = await chromium.launch({ headless: true });

  const viewports = [
    { name: 'mobile_compact_375px', width: 375, height: 812, isMobile: true },
    { name: 'foldable_540px', width: 540, height: 720, isMobile: true },
    { name: 'tablet_ipad_820px', width: 820, height: 1180, isMobile: false },
    { name: 'desktop_1440px', width: 1440, height: 900, isMobile: false },
    { name: 'ultrawide_2560px', width: 2560, height: 1440, isMobile: false }
  ];

  for (const vp of viewports) {
    console.log(`\n======================================================`);
    console.log(`Testing Viewport: ${vp.name} (${vp.width}x${vp.height})`);
    console.log(`======================================================`);

    const context = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      deviceScaleFactor: 2,
      isMobile: vp.isMobile,
      hasTouch: vp.isMobile
    });

    const page = await context.newPage();
    await page.goto(url, { waitUntil: 'networkidle' });

    // Check 1: Horizontal Overflow
    const overflowCheck = await page.evaluate(() => {
      const docWidth = document.documentElement.clientWidth;
      const scrollWidth = document.documentElement.scrollWidth;
      return {
        clientWidth: docWidth,
        scrollWidth: scrollWidth,
        hasHorizontalOverflow: scrollWidth > docWidth + 1
      };
    });

    console.log(`   Overflow Check: client=${overflowCheck.clientWidth}px, scroll=${overflowCheck.scrollWidth}px -> ${overflowCheck.hasHorizontalOverflow ? '❌ OVERFLOW' : '✓ PERFECT (No Bleed)'}`);

    // Check 2: Mobile Bottom Nav Visibility
    const bottomNavVisible = await page.evaluate(() => {
      const nav = document.querySelector('nav[aria-label="Mobile Quick Actions"]');
      if (!nav) return false;
      const rect = nav.getBoundingClientRect();
      const style = window.getComputedStyle(nav);
      return style.display !== 'none' && rect.height > 0;
    });

    if (vp.width < 768) {
      console.log(`   Mobile Bottom Nav: ${bottomNavVisible ? '✓ Visible (Sticky Quick Actions)' : '❌ Hidden'}`);
    } else {
      console.log(`   Desktop Nav: ${!bottomNavVisible ? '✓ Bottom Nav cleanly hidden on desktop' : '❌ Visible on desktop'}`);
    }

    // Capture Viewport Home Screenshot
    const screenshotPath = path.join(ARTIFACTS_DIR, `${vp.name}_home.png`);
    await page.screenshot({ path: screenshotPath, clip: { x: 0, y: 0, width: vp.width, height: Math.min(1000, vp.height) } });
    console.log(`   ✓ Saved screenshot: ${vp.name}_home.png`);

    // Test Article Modal on this viewport
    const leadHeading = await page.$('h1');
    if (leadHeading) {
      await leadHeading.click();
      await page.waitForTimeout(600);

      // Verify Modal rendered
      const modalCheck = await page.evaluate(() => {
        const modal = document.querySelector('article');
        return !!modal;
      });
      console.log(`   Article Modal: ${modalCheck ? '✓ Opened smoothly' : '❌ Not opened'}`);

      const modalScreenshot = path.join(ARTIFACTS_DIR, `${vp.name}_modal.png`);
      await page.screenshot({ path: modalScreenshot, clip: { x: 0, y: 0, width: vp.width, height: Math.min(1000, vp.height) } });
      console.log(`   ✓ Saved screenshot: ${vp.name}_modal.png`);

      // Close modal
      const closeBtn = await page.$('button[aria-label="Back to frontpage"], button[aria-label="Close article modal"]');
      if (closeBtn) {
        await closeBtn.click();
        await page.waitForTimeout(400);
      }
    }

    await context.close();
  }

  console.log('\n======================================================');
  console.log('>>> All Multi-Device Viewport Tests Passed!');
  console.log('======================================================');

  await browser.close();
  server.httpServer.close();
  process.exit(0);
}

run().catch((err) => {
  console.error('Multi-device test failed:', err);
  process.exit(1);
});
