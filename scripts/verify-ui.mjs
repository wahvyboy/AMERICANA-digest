import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const ARTIFACTS_DIR = 'C:/Users/Dell/.gemini/antigravity-ide/brain/5997d4b1-4862-40c1-babe-b9649f71872f';

async function run() {
  console.log('Launching Playwright Chromium...');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2
  });
  const page = await context.newPage();

  console.log('Navigating to http://localhost:3000 ...');
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });

  // 1. Capture Splash Hero & Header
  console.log('Capturing Hero Splash...');
  await page.screenshot({
    path: path.join(ARTIFACTS_DIR, '01_hero_splash_verified.png'),
    clip: { x: 0, y: 0, width: 1440, height: 950 }
  });

  // 2. Capture Latest News Grid
  console.log('Capturing Latest News Grid...');
  await page.evaluate(() => window.scrollTo(0, 950));
  await page.waitForTimeout(500);
  await page.screenshot({
    path: path.join(ARTIFACTS_DIR, '02_latest_news_grid_verified.png'),
    clip: { x: 0, y: 0, width: 1440, height: 950 }
  });

  // 3. Click lead article to open Article Modal
  console.log('Opening Article Modal for Lead Story...');
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(300);
  
  // Click on the lead headline
  const heroClickable = await page.$('h1');
  if (heroClickable) {
    await heroClickable.click();
    await page.waitForTimeout(1000);
    console.log('Capturing Article Modal...');
    await page.screenshot({
      path: path.join(ARTIFACTS_DIR, '03_article_modal_verified.png')
    });
    // Close modal
    const closeBtn = await page.$('button[aria-label="Close article"]');
    if (closeBtn) {
      await closeBtn.click();
      await page.waitForTimeout(400);
    }
  }

  // 4. Capture Full Page
  console.log('Capturing Full Page Screenshot...');
  await page.screenshot({
    path: path.join(ARTIFACTS_DIR, '04_full_homepage_verified.png'),
    fullPage: true
  });

  console.log('All screenshots captured successfully!');
  await browser.close();
}

run().catch(err => {
  console.error('Playwright verification failed:', err);
  process.exit(1);
});
