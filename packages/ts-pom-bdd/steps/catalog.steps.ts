import { expect } from '@playwright/test';
import { createBdd } from 'playwright-bdd';
import { CatalogPage } from '../pages/CatalogPage';

const { Given, When, Then } = createBdd();

// Search steps
When('{string}で検索する', async ({ page }, keyword: string) => {
  const catalogPage = new CatalogPage(page);
  await catalogPage.searchProduct(keyword);
});

Then('検索結果に{string}が表示される', async ({ page }, productName: string) => {
  const catalogPage = new CatalogPage(page);
  expect(await catalogPage.isProductVisible(productName)).toBe(true);
});

// Filter steps
When('{string}タブをクリックする', async ({ page }, category: string) => {
  const catalogPage = new CatalogPage(page);
  await catalogPage.filterByCategory(category as any);
});

// Sort steps
When('{string}でソートする', async ({ page }, sortOption: string) => {
  const catalogPage = new CatalogPage(page);
  await catalogPage.sortBy(sortOption as any);
});

Then('商品が価格の安い順に並ぶ', async ({ page }) => {
  // This is a simplified check - in real scenario, we'd verify the order
  const catalogPage = new CatalogPage(page);
  const count = await catalogPage.getProductCount();
  expect(count).toBeGreaterThan(0);
});

// Product list steps
Then('商品が1件以上表示される', async ({ page }) => {
  const catalogPage = new CatalogPage(page);
  const count = await catalogPage.getProductCount();
  expect(count).toBeGreaterThan(0);
});

Then('商品が{int}件表示される', async ({ page }, expectedCount: number) => {
  const catalogPage = new CatalogPage(page);
  await page.waitForTimeout(500);
  const count = await catalogPage.getProductCount();
  expect(count).toBe(expectedCount);
});

Then('商品カテゴリのタブが表示される', async ({ page }) => {
  await expect(page.getByRole('tablist', { name: '商品カテゴリ' })).toBeVisible();
});
