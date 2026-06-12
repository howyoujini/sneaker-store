// Screenshot every screen of this preview into ./.screens/*.png for visual review.
// Usage: node scripts/shoot.mjs   (start the dev server first; override base with URL=...)
import { mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const RAW = process.env.URL || 'http://localhost:5188';
const BASE = RAW.endsWith('/') ? RAW.slice(0, -1) : RAW;
const outDir = fileURLToPath(new URL('../.screens/', import.meta.url));
mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch({ channel: 'chrome' });
// Viewport fits the largest device frame at scale 1 (shoot mode disables fit-scaling).
const context = await browser.newContext({ viewport: { width: 620, height: 1100 }, deviceScaleFactor: 2 });
const page = await context.newPage();

await page.goto(BASE, { waitUntil: 'networkidle' });
const labels = await page.evaluate(() => window.__screens || []);
if (!labels.length) {
  console.error('No screens found on window.__screens — is the dev server running at ' + BASE + '?');
  await browser.close();
  process.exit(1);
}

const slug = (s, i) => String(s).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || String(i);
// Both appearances per screen: <slug>.png (light) and <slug>.dark.png — dark
// surfaces fail differently, so the review loop must SEE both.
for (let i = 0; i < labels.length; i++) {
  for (const mode of ['light', 'dark']) {
    await page.goto(BASE + '/?screen=' + i + '&shoot=1&theme=' + mode, { waitUntil: 'networkidle' });
    await page.waitForTimeout(400);
    const frame = page.locator('[data-device-frame]').first();
    const target = (await frame.count()) ? frame : page;
    const suffix = mode === 'dark' ? '.dark' : '';
    await target.screenshot({ path: outDir + slug(labels[i], i) + suffix + '.png' });
    console.log('shot', labels[i], mode);
  }
}
await browser.close();
console.log('done ->', outDir);
