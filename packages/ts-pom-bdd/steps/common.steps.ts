import { createBdd } from 'playwright-bdd';
import { test, expect } from '../fixtures/base-test';
import { BasePage } from '../pages/BasePage';
import { HeaderComponent } from '../pages/components/HeaderComponent';

const { Given, When, Then } = createBdd(test);

// Navigation steps
Given('ShopTodoのホームページを開く', async ({ page }) => {
  await page.goto('https://toasagi.github.io/shoptodo-app/');
  await page.waitForLoadState('domcontentloaded');
  // Wait for products to load
  await page.waitForSelector('button:has-text("カートに追加")', { timeout: 10000 });
});

// Language steps
When('英語に切り替える', async ({ page }) => {
  const header = new HeaderComponent(page);
  await header.switchToEnglish();
  await page.waitForTimeout(300);
});

When('日本語に切り替える', async ({ page }) => {
  const header = new HeaderComponent(page);
  await header.switchToJapanese();
  await page.waitForTimeout(300);
});

Then('ページが英語で表示される', async ({ page }) => {
  // Check for English text (e.g., "Login" button or "Product Catalog")
  const englishElements = page.getByText(/Login|Product|Cart|Checkout/);
  await expect(englishElements.first()).toBeVisible();
});

Then('ページが日本語で表示される', async ({ page }) => {
  // Check for Japanese text
  const japaneseElements = page.getByText(/ログイン|商品|カート/);
  await expect(japaneseElements.first()).toBeVisible();
});
