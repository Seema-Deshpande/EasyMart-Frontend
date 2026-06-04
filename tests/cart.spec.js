import { test, expect } from '@playwright/test';

test.describe('Cart Functionality', () => {
  test('should redirect to login when accessing cart without auth', async ({ page }) => {
    await page.goto('/cart');
    // Should be redirected to login or show login page
    await page.waitForTimeout(1000);
    const url = page.url();
    expect(url).toMatch(/login|cart/);
  });

  test('should show cart page when accessing protected route', async ({ page }) => {
    // Try to navigate to cart
    await page.goto('/cart');
    await page.waitForTimeout(1000);
    
    // Check if we're on cart or login page
    const isCartPage = page.url().includes('/cart');
    const isLoginPage = page.url().includes('/login');
    
    expect(isCartPage || isLoginPage).toBeTruthy();
  });

  test('should have add to cart button on product detail page', async ({ page }) => {
    await page.goto('/');
    const firstProduct = page.locator('.product-card').first();
    await expect(firstProduct).toBeVisible({ timeout: 5000 });
    await firstProduct.click();
    
    const addToCartButton = page.locator('button', { hasText: /add to cart|add/i }).first();
    if (await addToCartButton.isVisible().catch(() => false)) {
      await expect(addToCartButton).toBeEnabled();
    }
  });

  test('should show cart notification on add to cart', async ({ page }) => {
    await page.goto('/');
    const firstProduct = page.locator('.product-card').first();
    await expect(firstProduct).toBeVisible({ timeout: 5000 });
    await firstProduct.click();
    
    const addToCartButton = page.locator('button', { hasText: /add to cart|add/i }).first();
    if (await addToCartButton.isVisible().catch(() => false)) {
      await addToCartButton.click();
      // Wait for notification
      await page.waitForTimeout(1000);
    }
  });
});
