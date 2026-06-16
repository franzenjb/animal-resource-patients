import { test, expect } from "@playwright/test";

// CONTRAST CONTRACT enforcement. Walks every visible text node on every page and asserts
// WCAG AA: >=4.5:1 normal text, >=3:1 large text (>=24px, or >=18.66px bold). Fails the run
// on ANY violation. This is the durable guard against black-on-dark-green and friends.

const PAGES = ["/", "/intake", "/resources", "/forms", "/legal", "/contact"];

const AUDIT = `
(() => {
  const FALLBACK_BG = [253, 246, 238]; // --cream, used when no solid ancestor bg found
  const parse = (c) => {
    const m = c && c.match(/rgba?\\(([^)]+)\\)/);
    if (!m) return null;
    const p = m[1].split(',').map(s => parseFloat(s.trim()));
    const a = p.length > 3 ? p[3] : 1;
    return { r: p[0], g: p[1], b: p[2], a };
  };
  const lin = (v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); };
  const lum = ({ r, g, b }) => 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
  const ratio = (a, b) => { const L1 = lum(a), L2 = lum(b); const hi = Math.max(L1, L2), lo = Math.min(L1, L2); return (hi + 0.05) / (lo + 0.05); };

  const bgOf = (el) => {
    let node = el;
    while (node && node.nodeType === 1) {
      const s = getComputedStyle(node);
      const c = parse(s.backgroundColor);
      if (c && c.a > 0.5) return c;
      node = node.parentElement;
    }
    return { r: FALLBACK_BG[0], g: FALLBACK_BG[1], b: FALLBACK_BG[2], a: 1 };
  };

  const hasOwnText = (el) => {
    for (const n of el.childNodes) {
      if (n.nodeType === 3 && n.textContent && n.textContent.trim().length > 1) return true;
    }
    return false;
  };

  const failures = [];
  const all = document.querySelectorAll('body *');
  for (const el of all) {
    if (!hasOwnText(el)) continue;
    if (el.closest('[aria-hidden="true"]')) continue;
    const s = getComputedStyle(el);
    if (s.visibility === 'hidden' || s.display === 'none' || parseFloat(s.opacity) === 0) continue;
    const rect = el.getBoundingClientRect();
    if (rect.width < 1 || rect.height < 1) continue;
    const fg = parse(s.color);
    if (!fg) continue;
    const bg = bgOf(el);
    // flatten fg over bg if semi-transparent
    const eff = fg.a < 1
      ? { r: fg.r * fg.a + bg.r * (1 - fg.a), g: fg.g * fg.a + bg.g * (1 - fg.a), b: fg.b * fg.a + bg.b * (1 - fg.a) }
      : fg;
    const size = parseFloat(s.fontSize);
    const weight = parseInt(s.fontWeight) || 400;
    const large = size >= 24 || (size >= 18.66 && weight >= 700);
    const threshold = large ? 3 : 4.5;
    const r = ratio(eff, bg);
    if (r < threshold) {
      failures.push({
        text: (el.textContent || '').trim().slice(0, 40),
        ratio: Math.round(r * 100) / 100,
        threshold,
        fg: s.color,
        bg: 'rgb(' + bg.r + ',' + bg.g + ',' + bg.b + ')',
        size,
      });
    }
  }
  return failures;
})()
`;

for (const path of PAGES) {
  test(`contrast AA: ${path}`, async ({ page }) => {
    await page.goto(path);
    await page.waitForLoadState("networkidle");
    const failures = await page.evaluate(AUDIT);
    if (failures.length) {
      console.log(`Contrast failures on ${path}:`, JSON.stringify(failures, null, 2));
    }
    expect(failures, `low-contrast text on ${path}`).toEqual([]);
  });
}

test("content ideas modal passes contrast", async ({ page }) => {
  await page.goto("/");
  await page.waitForLoadState("networkidle");
  await page.getByRole("button", { name: "Ideas to grow this site" }).click();
  await expect(page.getByText("15 Ways To Grow This Site")).toBeVisible();
  const failures = await page.evaluate(AUDIT);
  if (failures.length) {
    console.log("Modal contrast failures:", JSON.stringify(failures, null, 2));
  }
  expect(failures).toEqual([]);
});
