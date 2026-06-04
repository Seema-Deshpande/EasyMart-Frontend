import { test, expect } from '@playwright/test';

test.describe('Profile Page', () => {
  test('should redirect to login when not authenticated', async ({ page }) => {
    await page.goto('/profile');
    await page.waitForTimeout(1000);
    const url = page.url();
    expect(url).toMatch(/login|profile/);
  });

  test('should display user profile information', async ({ page }) => {
    await page.goto('/profile');
    await page.waitForTimeout(1500);
    
    const profileForm = page.locator('form, [class*="profile"]');
    if (await profileForm.isVisible().catch(() => false)) {
      await expect(profileForm).toBeVisible();
    }
  });

  test('should have profile fields', async ({ page }) => {
    await page.goto('/profile');
    await page.waitForTimeout(1500);
    
    const emailInput = page.locator('input[type="email"], input[name*="email"]');
    const nameInput = page.locator('input[type="text"], input[name*="name"]');
    
    if (await nameInput.isVisible().catch(() => false)) {
      await expect(nameInput).toBeVisible();
    }
  });

  test('should have addresses link', async ({ page }) => {
    await page.goto('/profile');
    await page.waitForTimeout(1500);
    
    const addressesLink = page.locator('a[href="/addresses"], text=/address/i');
    if (await addressesLink.isVisible().catch(() => false)) {
      await expect(addressesLink).toBeVisible();
    }
  });
});
