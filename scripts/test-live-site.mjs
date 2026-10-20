import { chromium } from 'playwright';

async function testLive() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 375, height: 812 } });
  
  console.log('Navigating to https://americanadigest.blog...');
  await page.goto('https://americanadigest.blog', { waitUntil: 'load' });

  // Scroll to footer
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(600);
  await page.screenshot({ path: 'C:/Users/Dell/.gemini/antigravity-ide/brain/46c778f1-13f8-4ee6-ad5a-3ab16763e466/live_footer_mobile_375px.png' });
  console.log('Saved live_footer_mobile_375px.png');

  // Click Editorial Standards link
  const policyLink = page.locator('a[href="/editorial-standards"]').first();
  await policyLink.click();
  await page.waitForTimeout(600);
  await page.screenshot({ path: 'C:/Users/Dell/.gemini/antigravity-ide/brain/46c778f1-13f8-4ee6-ad5a-3ab16763e466/live_policy_modal_mobile_375px.png' });
  console.log('Saved live_policy_modal_mobile_375px.png');

  await browser.close();
  console.log('Finished capturing live screenshots!');
}

testLive().catch(err => {
  console.error('Test error:', err);
  process.exit(1);
});
