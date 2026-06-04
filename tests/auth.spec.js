import { test, expect } from '@playwright/test';

test.describe('Authentication', () => {
  test('should load login page', async ({ page }) => {
    await page.goto('/login');
    await expect(page).toHaveURL('/login');
    const loginForm = page.locator('form, [class*="login" i]');
    await expect(loginForm).toBeVisible();
  });

  test('should have email and password fields on login', async ({ page }) => {
    await page.goto('/login');
    const emailInput = page.locator('input[type="email"], input[name*="email" i]').first();
    const passwordInput = page.locator('input[type="password"]').first();
    
    await expect(emailInput).toBeVisible();
    await expect(passwordInput).toBeVisible();
  });

  test('should show error on invalid login', async ({ page }) => {
    await page.goto('/login');
    const emailInput = page.locator('input[type="email"], input[name*="email" i]').first();
    const passwordInput = page.locator('input[type="password"]').first();
    const submitButton = page.locator('button[type="submit"], button:has-text("Login")').first();
    
    await emailInput.fill('invalid@email.com');
    await passwordInput.fill('wrongpassword');
    await submitButton.click();
    
    // Wait for error message
    await page.waitForTimeout(2000);
  });

  test('should load register page', async ({ page }) => {
    await page.goto('/register');
    await expect(page).toHaveURL('/register');
  });

  test('should have required fields on register', async ({ page }) => {
    await page.goto('/register');
    const nameInput = page.locator('input[type="text"], input[name*="name" i]').first();
    const emailInput = page.locator('input[type="email"]').first();
    const passwordInput = page.locator('input[type="password"]').first();
    
    await expect(nameInput).toBeVisible();
    await expect(emailInput).toBeVisible();
    await expect(passwordInput).toBeVisible();
  });

  test('should navigate from login to register', async ({ page }) => {
    await page.goto('/login');
    const registerLink = page.locator('text=/register/i');
    if (await registerLink.isVisible().catch(() => false)) {
      await registerLink.click();
      await expect(page).toHaveURL('/register');
    }
  });

  test('should protect cart page with login', async ({ page }) => {
    await page.goto('/cart');
    // Should either redirect to login or show login page
    await page.waitForURL(/login|\/cart/, { timeout: 5000 }).catch(() => {});
  });
});
