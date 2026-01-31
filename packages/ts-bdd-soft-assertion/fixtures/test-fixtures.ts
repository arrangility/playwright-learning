import { test as base } from 'playwright-bdd';
import { Page } from '@playwright/test';
import { BasePage } from '../pages/BasePage';
import { CartComponent } from '../pages/components/CartComponent';
import { HeaderComponent } from '../pages/components/HeaderComponent';
import { CatalogPage } from '../pages/CatalogPage';
import { LoginPage } from '../pages/LoginPage';
import { ProductData, TestData } from './test-data';

// Custom fixtures type definition
type TestFixtures = {
  // Page fixtures
  authenticatedPage: Page;
  basePage: BasePage;

  // Page Object fixtures
  loginPage: LoginPage;
  catalogPage: CatalogPage;

  // Component fixtures
  headerComponent: HeaderComponent;
  cartComponent: CartComponent;

  // Data fixtures
  productData: typeof ProductData;
  testData: typeof TestData;
};

/**
 * Extended Playwright test with custom fixtures for Soft Assertion testing
 */
export const test = base.extend<TestFixtures>({
  // Automatically logged-in page
  authenticatedPage: async ({ page }, use) => {
    await page.goto('https://toasagi.github.io/shoptodo-app/');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForSelector('button:has-text("カートに追加")', { timeout: 10000 });
    await page.getByRole('button', { name: 'ログイン' }).click();

    const loginPage = new LoginPage(page);
    await loginPage.login(TestData.validUser.username, TestData.validUser.password);

    await page.waitForTimeout(500);
    const loginDialog = page.getByRole('dialog', { name: 'ログイン' });
    await loginDialog.waitFor({ state: 'hidden', timeout: 5000 });

    await use(page);
  },

  // Cart component
  cartComponent: async ({ page }, use) => {
    await use(new CartComponent(page));
  },

  // Catalog page
  catalogPage: async ({ page }, use) => {
    await use(new CatalogPage(page));
  },

  // Product data fixture
  productData: async ({}, use) => {
    await use(ProductData);
  },

  // Base page fixture
  basePage: async ({ page }, use) => {
    await use(new BasePage(page));
  },

  // Login page fixture
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  // Header component fixture
  headerComponent: async ({ page }, use) => {
    await use(new HeaderComponent(page));
  },

  // Test data fixture
  testData: async ({}, use) => {
    await use(TestData);
  },
});

// Re-export expect for convenience
export { expect } from '@playwright/test';
