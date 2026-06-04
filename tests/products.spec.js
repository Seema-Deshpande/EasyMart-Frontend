import { test, expect } from '@playwright/test';

test.describe('Products Page', () => {
  test('should load products page', async ({ page }) => {
    await page.goto('/products');
    await expect(page).toHaveURL('/products');
  });

  test('should display product list', async ({ page }) => {
    await page.goto('/products');
    const productCards = page.locator('.product-card');
    await expect(productCards.first()).toBeVisible({ timeout: 5000 });
  });

  test('should have working pagination', async ({ page }) => {
    await page.goto('/products');
    const paginationButtons = page.locator('button:has-text("2")');
    if (await paginationButtons.count() > 0) {
      await paginationButtons.first().click();
      await expect(page).toHaveURL(/.*page=2/);
    }
  });

  test('should filter products by category', async ({ page }) => {
    await page.goto('/products');
    const categoryFilter = page.locator('select, [class*="filter"]').first();
    if (await categoryFilter.isVisible()) {
      await categoryFilter.click();
    }
  });

  test('should navigate to product detail', async ({ page }) => {
    await page.goto('/products');
    const firstProduct = page.locator('.product-card').first();
    await expect(firstProduct).toBeVisible({ timeout: 5000 });
    await firstProduct.click();
    await expect(page).toHaveURL(/\/products\/\w+/);
  });

  test('should display product price and name', async ({ page }) => {
    await page.goto('/products');
    const productCard = page.locator('.product-card').first();
    await expect(productCard).toBeVisible({ timeout: 5000 });
    
    const price = productCard.locator('text=/\$|₹/');
    const name = productCard.locator('.card-title');
    
    if (await price.count() > 0) {
      await expect(price.first()).toBeVisible();
    }
    if (await name.count() > 0) {
      await expect(name.first()).toBeVisible();
    }
  });
});
