// Audit the interaction flow on the RUNNING preview: dead data-nav targets,
// unresponsive toggles, and runtime errors. Writes .screens/interaction-report.json.
// Usage: node scripts/audit-interaction.mjs   (start the dev server first; URL=... overrides)
import { mkdirSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const RAW = process.env.URL || 'http://localhost:5188';
const BASE = RAW.endsWith('/') ? RAW.slice(0, -1) : RAW;
const outDir = fileURLToPath(new URL('../.screens/', import.meta.url));
mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch({ channel: 'chrome' });
const context = await browser.newContext({ viewport: { width: 620, height: 1100 } });
const page = await context.newPage();
const norm = (s) => String(s).trim().toLowerCase();

await page.goto(BASE, { waitUntil: 'networkidle' });
const labels = await page.evaluate(() => window.__screens || []);
if (!labels.length) {
  console.error('No screens found on window.__screens — is the dev server running at ' + BASE + '?');
  await browser.close();
  process.exit(1);
}

const report = { checked: 0, deadNav: [], brokenToggles: [], consoleErrors: [] };

for (let i = 0; i < labels.length; i++) {
  const errors = [];
  page.removeAllListeners('console');
  page.removeAllListeners('pageerror');
  page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
  page.on('pageerror', (e) => errors.push(String(e)));
  const land = BASE + '/?screen=' + i + '&shoot=1';
  await page.goto(land, { waitUntil: 'networkidle' });
  await page.waitForTimeout(250);

  // Every unique non-back data-nav target should land on its named screen.
  const targets = await page.evaluate(() => {
    const out = [];
    document.querySelectorAll('[data-nav]').forEach((el) => {
      const t = (el.getAttribute('data-nav') || '').trim();
      if (t) out.push(t);
    });
    return out;
  });
  const seen = new Set();
  for (const t of targets) {
    if (norm(t) === 'back' || seen.has(norm(t))) continue;
    seen.add(norm(t));
    await page.goto(land, { waitUntil: 'networkidle' });
    await page.waitForTimeout(150);
    const el = page.locator('[data-nav=' + JSON.stringify(t) + ']').first();
    if (!(await el.count())) continue;
    await el.click({ timeout: 2000 }).catch(() => {});
    await page.waitForTimeout(320);
    const landedOn = await page.evaluate(() => window.__currentScreen || '');
    report.checked++;
    if (norm(landedOn) !== norm(t)) report.deadNav.push({ from: labels[i], target: t, landedOn });
  }

  // Toggle controls should flip their reflected data-on state on tap.
  await page.goto(land, { waitUntil: 'networkidle' });
  await page.waitForTimeout(150);
  const toggles = page.locator('[data-action^="toggle:"]');
  const n = await toggles.count();
  for (let k = 0; k < n; k++) {
    const el = toggles.nth(k);
    const before = await el.getAttribute('data-on');
    await el.click({ timeout: 2000 }).catch(() => {});
    await page.waitForTimeout(120);
    const after = await el.getAttribute('data-on');
    if (before === after) report.brokenToggles.push({ screen: labels[i], action: await el.getAttribute('data-action') });
  }

  for (const e of errors) report.consoleErrors.push({ screen: labels[i], error: e });
}

writeFileSync(outDir + 'interaction-report.json', JSON.stringify(report, null, 2));
await browser.close();
const problems = report.deadNav.length + report.brokenToggles.length + report.consoleErrors.length;
if (problems) {
  console.log(problems + ' interaction issue(s) -> ' + outDir + 'interaction-report.json');
  for (const d of report.deadNav) console.log('[dead-nav] ' + d.from + ' -> "' + d.target + '" landed on "' + d.landedOn + '"');
  for (const t of report.brokenToggles) console.log('[dead-toggle] ' + t.screen + ' ' + t.action);
  for (const e of report.consoleErrors) console.log('[error] ' + e.screen + ': ' + e.error);
  process.exit(1);
}
console.log('Interaction flow OK: ' + report.checked + ' nav target(s) land, all toggles respond, no runtime errors.');
