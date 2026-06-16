import { test, expect } from "@playwright/test";

// Keep the auto-opening ideas modal from covering the page during interaction tests.
test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    try {
      window.localStorage.setItem("par-ideas-seen-v1", "1");
    } catch {}
  });
});

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
    await expect(page).toHaveTitle(/Patient Animal Resource/);
  });
}

test("resource directory filters by search", async ({ page }) => {
  await page.goto("/resources");
  await page.waitForLoadState("networkidle");
  await expect(page.getByText("Showing 593 resources")).toBeVisible();
  await page.getByPlaceholder(/Town, organization, or keyword/i).fill("Kommunity");
  await expect(page.getByText("Showing 1 resource")).toBeVisible();
  await expect(page.getByText("Kommunity Kritters")).toBeVisible();
});

test("resource directory has real Maine data", async ({ page }) => {
  await page.goto("/resources");
  await expect(page.getByText("Showing 593 resources")).toBeVisible();
});

test("intake checklist tracks progress", async ({ page }) => {
  await page.goto("/intake");
  await page.waitForLoadState("networkidle");
  await expect(page.getByText(/0\/\d+ steps checked/)).toBeVisible();
  await page.getByLabel("Do you have an animal at home?").click();
  await expect(page.getByText(/1\/\d+ steps checked/)).toBeVisible();
});

// CLAUDE.md globals.css dark-mode trap: native controls must stay readable in OS dark mode.
test("form controls stay readable in dark mode", async ({ browser }) => {
  const ctx = await browser.newContext({ colorScheme: "dark" });
  const page = await ctx.newPage();
  await page.goto("/resources");
  const color = await page
    .locator('input[type="search"]')
    .evaluate((el) => getComputedStyle(el).color);
  const [r, g, b] = color.match(/\d+/g)!.map(Number);
  expect(r + g + b).toBeLessThan(300);
  await ctx.close();
});
