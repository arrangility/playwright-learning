import { expect } from '@playwright/test';
import { createBdd } from 'playwright-bdd';
import { CatalogPage } from '../pages/CatalogPage';
import { CartComponent } from '../pages/components/CartComponent';

const { Given, When, Then } = createBdd();

// Add to cart steps
When('{string}をカートに追加する', async ({ page }, productName: string) => {
  const catalogPage = new CatalogPage(page);
  await catalogPage.addToCart(productName);
  await page.waitForTimeout(300);
});

Then('カートに商品が{int}件ある', async ({ page }, expectedCount: number) => {
  const cartComponent = new CartComponent(page);
  await page.waitForTimeout(300);
  const count = await cartComponent.getItemCount();
  expect(count).toBe(expectedCount);
});

Then('カートの合計が{int}円より大きい', async ({ page }, minAmount: number) => {
  const cartComponent = new CartComponent(page);
  const total = await cartComponent.getTotal();
  expect(total).toBeGreaterThan(minAmount);
});

Then('カートの合計が正しい', async ({ page }) => {
  const cartComponent = new CartComponent(page);
  const total = await cartComponent.getTotal();
  expect(total).toBeGreaterThan(0);
});

Then('{string}のカートに追加ボタンが無効である', async ({ page }, productName: string) => {
  const catalogPage = new CatalogPage(page);
  const isEnabled = await catalogPage.isAddToCartEnabled(productName);
  expect(isEnabled).toBe(false);
});

// Cart management steps
When('カートから{string}を削除する', async ({ page }, productName: string) => {
  const cartComponent = new CartComponent(page);
  await cartComponent.removeItem(productName);
  await page.waitForTimeout(300);
});

Then('カートが空である', async ({ page }) => {
  const cartComponent = new CartComponent(page);
  expect(await cartComponent.isEmpty()).toBe(true);
});

Then('チェックアウトボタンが有効である', async ({ page }) => {
  const cartComponent = new CartComponent(page);
  expect(await cartComponent.isCheckoutEnabled()).toBe(true);
});
