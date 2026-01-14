import { test as base } from 'playwright-bdd';
import { Page } from '@playwright/test';
import { CartComponent } from '../pages/components/CartComponent';
import { CatalogPage } from '../pages/CatalogPage';
import { LoginPage } from '../pages/LoginPage';
import { ProductData, TestData } from './test-data';

// Custom fixtures type definition
type TestFixtures = {
  authenticatedPage: Page;
  cartComponent: CartComponent;
  catalogPage: CatalogPage;
  productData: typeof ProductData;
};

/**
 * Extended Playwright test with custom fixtures
 *
 * Provides:
 * - authenticatedPage: Page that is already logged in with demo user
 * - cartComponent: CartComponent instance (auto-initialized)
 * - catalogPage: CatalogPage instance (auto-initialized)
 * - productData: Product data with prices
 */
export const test = base.extend<TestFixtures>({
  // Automatically logged-in page
  authenticatedPage: async ({ page }, use) => {
    // Navigate to the app
    await page.goto('https://toasagi.github.io/shoptodo-app/');
    await page.waitForLoadState('domcontentloaded');

    // Wait for the page to be ready and click login button
    await page.waitForSelector('button:has-text("カートに追加")', { timeout: 10000 });
    await page.getByRole('button', { name: 'ログイン' }).click();

    // Now perform login
    const loginPage = new LoginPage(page);
    await loginPage.login(TestData.validUser.username, TestData.validUser.password);

    // Wait for successful login (dialog closes)
    await page.waitForTimeout(500);
    // Verify login was successful by checking the dialog is gone
    const loginDialog = page.getByRole('dialog', { name: 'ログイン' });
    await loginDialog.waitFor({ state: 'hidden', timeout: 5000 });

    await use(page);
    // Cleanup automatically handled by Playwright
  },

  // Cart component - depends on authenticatedPage
  cartComponent: async ({ authenticatedPage }, use) => {
    await use(new CartComponent(authenticatedPage));
  },

  // Catalog page - depends on authenticatedPage
  catalogPage: async ({ authenticatedPage }, use) => {
    await use(new CatalogPage(authenticatedPage));
  },

  // Product data fixture
  productData: async ({}, use) => {
    await use(ProductData);
  },
});

// Re-export expect for convenience
export { expect } from '@playwright/test';
