import { test, expect } from "@playwright/test";

const PAGES = [
  { path: "/", heading: "their animals should be safe too" },
  { path: "/intake", heading: "Intake Workflow" },
  { path: "/resources", heading: "Resource Directory" },
  { path: "/forms", heading: "Consent Forms" },
  { path: "/legal", heading: "Legal Reference" },
];

for (const p of PAGES) {
  test(`renders ${p.path}`, async ({ page }) => {
    await page.goto(p.path);
    await expect(page.locator("h1")).toContainText(p.heading);
    // no horizontal scroll on mobile-ish viewport
    await expect(page).toHaveTitle(/Patient Animal Resource/);
  });
}

test("resource directory filters by search", async ({ page }) => {
  await page.goto("/resources");
  await expect(page.getByText(/From The Binder/).first()).toBeVisible();
  await page.getByPlaceholder(/Town, organization, or keyword/i).fill("Kommunity");
  await expect(page.getByText("Kommunity Kritters")).toBeVisible();
  await expect(page.getByText("Greater Androscoggin")).toHaveCount(0);
});

test("intake checklist tracks progress", async ({ page }) => {
  await page.goto("/intake");
  await expect(page.getByText(/0\/\d+ steps checked/)).toBeVisible();
  await page.getByRole("checkbox").first().check();
  await expect(page.getByText(/1\/\d+ steps checked/)).toBeVisible();
});

// CLAUDE.md globals.css dark-mode trap: native controls must stay readable
// (dark text), not light-gray-on-white, even when the OS is in dark mode.
test("form controls stay readable in dark mode", async ({ browser }) => {
  const ctx = await browser.newContext({ colorScheme: "dark" });
  const page = await ctx.newPage();
  await page.goto("/resources");
  const color = await page
    .locator('input[type="search"]')
    .evaluate((el) => getComputedStyle(el).color);
  const [r, g, b] = color.match(/\d+/g)!.map(Number);
  // dark ink: all channels well below mid-gray
  expect(r + g + b).toBeLessThan(300);
  await ctx.close();
});
