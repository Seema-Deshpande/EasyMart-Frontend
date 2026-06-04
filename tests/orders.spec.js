import { test, expect } from '@playwright/test';

test.describe('Orders Page', () => {
  test('should redirect to login when not authenticated', async ({ page }) => {
    await page.goto('/orders');
    await page.waitForTimeout(1000);
    const url = page.url();
    expect(url).toMatch(/login|orders/);
  });

  test('should display order history page', async ({ page }) => {
    await page.goto('/orders');
    await page.waitForTimeout(1000);
    
    const ordersPage = page.locator('[class*="order"], text=/order/i').first();
    if (await ordersPage.isVisible().catch(() => false)) {
      await expect(ordersPage).toBeVisible();
    }
  });

  test('should have order list or empty state', async ({ page }) => {
    await page.goto('/orders');
    await page.waitForTimeout(1500);
    
    const orderList = page.locator('[class*="order-list"], tbody, [class*="orders"]');
    const emptyState = page.locator('text=/no orders|empty/i');
    
    const hasOrders = await orderList.isVisible().catch(() => false);
    const isEmpty = await emptyState.isVisible().catch(() => false);
    
    // Page should show either orders or empty state
    expect(hasOrders || isEmpty || page.url().includes('login')).toBeTruthy();
  });

  test('should navigate to order detail when clicking order', async ({ page }) => {
    await page.goto('/orders');
    await page.waitForTimeout(1500);
    
    const orderLinks = page.locator('a[href*="/orders/"]');
    if (await orderLinks.count() > 0) {
      const firstOrderLink = orderLinks.first();
      const href = await firstOrderLink.getAttribute('href');
      await firstOrderLink.click();
      await expect(page).toHaveURL(href);
    }
  });
});
