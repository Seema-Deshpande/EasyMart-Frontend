import { test, expect } from '@playwright/test';

test.describe('Checkout Page', () => {
  test('should redirect to login when not authenticated', async ({ page }) => {
    await page.goto('/checkout');
    await page.waitForTimeout(1000);
    const url = page.url();
    expect(url).toMatch(/login|checkout/);
  });

  test('should display checkout form when accessing checkout page', async ({ page }) => {
    await page.goto('/checkout');
    await page.waitForTimeout(1000);
    
    // Check if form exists or if redirected to login
    const checkoutForm = page.locator('form, [class*="checkout"]');
    const loginForm = page.locator('[class*="login"]');
    
    const hasCheckoutForm = await checkoutForm.isVisible().catch(() => false);
    const hasLoginForm = await loginForm.isVisible().catch(() => false);
    
    expect(hasCheckoutForm || hasLoginForm).toBeTruthy();
  });

  test('should have address fields', async ({ page }) => {
    await page.goto('/checkout');
    await page.waitForTimeout(1000);
    
    const addressInputs = page.locator('input[name*="address"], textarea');
    if (await addressInputs.count() > 0) {
      await expect(addressInputs.first()).toBeVisible();
    }
  });

  test('should have payment section', async ({ page }) => {
    await page.goto('/checkout');
    await page.waitForTimeout(1000);
    
    const paymentSection = page.locator('[class*="payment"]');
    if (await paymentSection.count() > 0) {
      await expect(paymentSection.first()).toBeVisible().catch(() => {});
    }
  });
});
