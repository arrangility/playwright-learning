import { createBdd } from 'playwright-bdd';
import { test } from '../fixtures/test-fixtures';

const { Given } = createBdd(test);

// ==========================================
// Navigation steps
// ==========================================

Given('ShopTodoのホームページを開く', async ({ page }) => {
  await page.goto('https://toasagi.github.io/shoptodo-app/');
  await page.waitForLoadState('domcontentloaded');
  await page.waitForSelector('button:has-text("カートに追加")', { timeout: 10000 });
});

Given('ログイン済みの状態でホームページを開く', async ({ authenticatedPage }) => {
  // authenticatedPage fixture handles login automatically
  await authenticatedPage.waitForLoadState('domcontentloaded');
});
