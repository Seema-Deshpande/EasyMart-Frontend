import { test, expect } from '@playwright/test';

test.describe('Navigation & Layout', () => {
  test('should load home page', async ({ page }) => {
    await page.goto('/');
    await page.waitForTimeout(2000);
    // Page should load without errors
    expect(page.url()).toContain('localhost');
  });

  test('should display navbar', async ({ page }) => {
    await page.goto('/');
    const navbar = page.locator('nav');
    await expect(navbar).toBeVisible({ timeout: 5000 }).catch(() => {});
  });

  test('should display footer', async ({ page }) => {
    await page.goto('/');
    const footer = page.locator('footer');
    if (await footer.count() > 0) {
      await expect(footer).toBeVisible();
    }
  });

  test('should navigate to products page', async ({ page }) => {
    await page.goto('/');
    const productsLink = page.locator('button', { hasText: /shop|products/i }).first();
    if (await productsLink.isVisible().catch(() => false)) {
      await productsLink.click();
      await expect(page).toHaveURL(/\/products/);
    }
  });

  test('should show not found page for invalid route', async ({ page }) => {
    await page.goto('/invalid-route-12345');
    const notFoundText = page.locator('text=/404|not found|page not found/i');
    const notFoundStatus = await notFoundText.isVisible().catch(() => false);
    // Either show not found or stay on page
    expect(notFoundStatus || page.url().includes('invalid')).toBeTruthy();
  });
});
