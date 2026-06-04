import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
  test('should load home page with products', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveURL('/');
    // Wait for products to load
    const productCards = page.locator('.product-card');
    await expect(productCards.first()).toBeVisible({ timeout: 5000 });
  });

  test('should display featured products', async ({ page }) => {
    await page.goto('/');
    const products = page.locator('.product-card');
    await expect(products.first()).toBeVisible({ timeout: 5000 });
  });

  test('should navigate to product detail page when clicking product', async ({ page }) => {
    await page.goto('/');
    // Wait for product cards to be visible
    const firstProductCard = page.locator('.product-card').first();
    await expect(firstProductCard).toBeVisible({ timeout: 5000 });
    await firstProductCard.click();
    await expect(page).toHaveURL(/\/products\/\w+/);
  });

  test('should have working search functionality', async ({ page }) => {
    await page.goto('/');
    const searchInput = page.locator('input[type="text"][placeholder*="search" i]');
    if (await searchInput.isVisible()) {
      await searchInput.fill('test');
      await page.keyboard.press('Enter');
    }
  });
});
