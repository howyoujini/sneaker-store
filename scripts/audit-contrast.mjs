// Measure WCAG text contrast on the RENDERED screens (light + dark).
// Usage: node scripts/audit-contrast.mjs   (start the dev server first; URL=... overrides)
// Writes .screens/contrast-report.json; prints a summary.
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
await page.goto(BASE, { waitUntil: 'networkidle' });
const labels = await page.evaluate(() => window.__screens || []);
if (!labels.length) {
  console.error('No screens found on window.__screens — is the dev server running at ' + BASE + '?');
  await browser.close();
  process.exit(1);
}

// Runs IN THE PAGE: walks visible text nodes, composites each one's effective
// background up the ancestor chain, and returns the pairs that miss WCAG AA
// (4.5:1 body text, 3:1 for >=24px or bold >=18.66px).
function measure() {
  const out = [];
  const root = document.querySelector('[data-screen-viewport]') || document.body;
  const parse = (c) => {
    const m = /rgba?\(([^)]+)\)/.exec(c || '');
    if (!m) return null;
    const p = m[1].split(',').map(Number);
    return { r: p[0], g: p[1], b: p[2], a: p.length > 3 ? p[3] : 1 };
  };
  const lin = (v) => { v /= 255; return v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); };
  const lum = (c) => 0.2126 * lin(c.r) + 0.7152 * lin(c.g) + 0.0722 * lin(c.b);
  const ratio = (a, b) => { const hi = Math.max(a, b), lo = Math.min(a, b); return (hi + 0.05) / (lo + 0.05); };
  const over = (top, under) => ({
    r: top.r * top.a + under.r * (1 - top.a),
    g: top.g * top.a + under.g * (1 - top.a),
    b: top.b * top.a + under.b * (1 - top.a),
    a: 1,
  });
  const effectiveBg = (el) => {
    const layers = [];
    for (let n = el; n; n = n.parentElement) {
      const c = parse(getComputedStyle(n).backgroundColor);
      if (c && c.a > 0) { layers.push(c); if (c.a >= 1) break; }
    }
    let acc = layers.length && layers[layers.length - 1].a >= 1 ? layers.pop() : { r: 255, g: 255, b: 255, a: 1 };
    while (layers.length) acc = over(layers.pop(), acc);
    return acc;
  };
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  const seen = new Set();
  while (walker.nextNode()) {
    const node = walker.currentNode;
    const text = (node.textContent || '').trim();
    if (!text) continue;
    const el = node.parentElement;
    if (!el || seen.has(el)) continue;
    seen.add(el);
    const cs = getComputedStyle(el);
    if (cs.visibility === 'hidden' || cs.display === 'none' || Number(cs.opacity) === 0) continue;
    const rect = el.getBoundingClientRect();
    if (!rect.width || !rect.height) continue;
    const fg = parse(cs.color);
    if (!fg) continue;
    const bg = effectiveBg(el);
    const fgFlat = fg.a < 1 ? over(fg, bg) : fg;
    const r = ratio(lum(fgFlat), lum(bg));
    const size = parseFloat(cs.fontSize);
    const weight = parseInt(cs.fontWeight, 10) || 400;
    const required = size >= 24 || (size >= 18.66 && weight >= 700) ? 3 : 4.5;
    if (r < required) {
      out.push({
        text: text.slice(0, 60),
        ratio: Math.round(r * 100) / 100,
        required,
        fontSizePx: size,
        color: cs.color,
        background: 'rgb(' + Math.round(bg.r) + ', ' + Math.round(bg.g) + ', ' + Math.round(bg.b) + ')',
      });
    }
  }
  return out;
}

const report = [];
for (let i = 0; i < labels.length; i++) {
  for (const mode of ['light', 'dark']) {
    await page.goto(BASE + '/?screen=' + i + '&shoot=1&theme=' + mode, { waitUntil: 'networkidle' });
    await page.waitForTimeout(300);
    const failures = await page.evaluate(measure);
    for (const f of failures) report.push({ screen: labels[i], mode, ...f });
  }
}
writeFileSync(outDir + 'contrast-report.json', JSON.stringify(report, null, 2));
if (report.length) {
  console.log(report.length + ' contrast failure(s) -> ' + outDir + 'contrast-report.json');
  for (const f of report) console.log('[' + f.screen + '/' + f.mode + '] ' + f.ratio + ':1 (needs ' + f.required + ':1) "' + f.text + '"');
} else {
  console.log('All rendered text passes WCAG AA in both appearances.');
}
await browser.close();
