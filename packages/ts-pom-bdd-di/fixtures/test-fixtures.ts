import { test as base } from 'playwright-bdd';
import { Page } from '@playwright/test';
import { BasePage } from '../pages/BasePage';
import { CartComponent } from '../pages/components/CartComponent';
import { HeaderComponent } from '../pages/components/HeaderComponent';
import { CatalogPage } from '../pages/CatalogPage';
import { LoginPage } from '../pages/LoginPage';
import { RegisterPage } from '../pages/RegisterPage';
import { ProductData, TestData } from './test-data';

// Custom fixtures type definition
type TestFixtures = {
  // Page fixtures
  authenticatedPage: Page;
  basePage: BasePage;

  // Page Object fixtures
  loginPage: LoginPage;
  registerPage: RegisterPage;
  catalogPage: CatalogPage;

  // Component fixtures
  headerComponent: HeaderComponent;
  cartComponent: CartComponent;

  // Data fixtures
  productData: typeof ProductData;
  testData: typeof TestData;
};

/**
 * Extended Playwright test with custom fixtures (Full DI)
 *
 * Page fixtures:
 * - authenticatedPage: Page that is already logged in with demo user
 * - basePage: BasePage instance (auto-initialized)
 *
 * Page Object fixtures:
 * - loginPage: LoginPage instance (auto-initialized)
 * - registerPage: RegisterPage instance (auto-initialized)
 * - catalogPage: CatalogPage instance (auto-initialized)
 *
 * Component fixtures:
 * - headerComponent: HeaderComponent instance (auto-initialized)
 * - cartComponent: CartComponent instance (auto-initialized)
 *
 * Data fixtures:
 * - productData: Product data with prices
 * - testData: Test data (users, products, categories, etc.)
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

  // Cart component - depends on page
  cartComponent: async ({ page }, use) => {
    await use(new CartComponent(page));
  },

  // Catalog page - depends on page
  catalogPage: async ({ page }, use) => {
    await use(new CatalogPage(page));
  },

  // Product data fixture
  productData: async ({}, use) => {
    await use(ProductData);
  },

  // ===== New Fixtures =====

  // Base page fixture
  basePage: async ({ page }, use) => {
    await use(new BasePage(page));
  },

  // Login page fixture
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  // Register page fixture
  registerPage: async ({ page }, use) => {
    await use(new RegisterPage(page));
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
