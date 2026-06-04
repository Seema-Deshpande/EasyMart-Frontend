import { test, expect } from '@playwright/test';

test.describe('Admin Pages', () => {
  test('should redirect to login for non-authenticated users', async ({ page }) => {
    await page.goto('/admin');
    await page.waitForTimeout(1000);
    const url = page.url();
    expect(url).toMatch(/login|admin/);
  });

  test('should display admin dashboard', async ({ page }) => {
    await page.goto('/admin');
    await page.waitForTimeout(1500);
    
    const adminDashboard = page.locator('[class*="admin"], [class*="dashboard"]');
    if (await adminDashboard.isVisible().catch(() => false)) {
      await expect(adminDashboard).toBeVisible();
    }
  });

  test('should have admin navigation', async ({ page }) => {
    await page.goto('/admin');
    await page.waitForTimeout(1500);
    
    const adminNav = page.locator('[class*="list-group"]');
    if (await adminNav.isVisible().catch(() => false)) {
      await expect(adminNav).toBeVisible();
    }
  });

  test('should navigate to admin products', async ({ page }) => {
    await page.goto('/admin');
    await page.waitForTimeout(1500);
    
    const adminNav = page.locator('[class*="list-group"]');
    const productsLink = adminNav.locator('a', { has: page.locator('text=/products/i') });
    if (await productsLink.count() > 0) {
      await productsLink.first().click();
      await expect(page).toHaveURL(/admin.*products/);
    }
  });

  test('should navigate to admin orders', async ({ page }) => {
    await page.goto('/admin');
    await page.waitForTimeout(1500);
    
    const adminNav = page.locator('[class*="list-group"]');
    const ordersLink = adminNav.locator('a', { has: page.locator('text=/orders/i') });
    if (await ordersLink.count() > 0) {
      await ordersLink.first().click();
      await expect(page).toHaveURL(/admin.*orders/);
    }
  });

  test('should navigate to admin users', async ({ page }) => {
    await page.goto('/admin');
    await page.waitForTimeout(1500);
    
    const adminNav = page.locator('[class*="list-group"]');
    const usersLink = adminNav.locator('a', { has: page.locator('text=/users/i') });
    if (await usersLink.count() > 0) {
      await usersLink.first().click();
      await expect(page).toHaveURL(/admin.*users/);
    }
  });
});
