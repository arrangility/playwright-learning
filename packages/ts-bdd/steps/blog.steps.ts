import { expect } from '@playwright/test';
import { Given, When, Then, createBdd } from 'playwright-bdd';

const { Given: given, When: when, Then: then } = createBdd();

given('ホームページを開く', async ({ page }) => {
  await page.goto('/');
});

when('{string}リンクをクリックする', async ({ page }, linkName: string) => {
  await page.getByRole('link', { name: linkName }).first().click();
});

then('ブログページが表示される', async ({ page }) => {
  await expect(page).toHaveURL(/\/blog/);
});

then('ページタイトルに{string}が含まれる', async ({ page }, title: string) => {
  await expect(page).toHaveTitle(new RegExp(title));
});

then('ブログ記事へのリンクが存在する', async ({ page }) => {
  const articleLinks = page.getByRole('link', {
    name: /Test Automation|Cypress|BDD|Appium|Reka/
  });
  await expect(articleLinks.first()).toBeVisible();
});

then('メインナビゲーションが表示される', async ({ page }) => {
  const nav = page.getByRole('navigation', { name: 'Main' });
  await expect(nav).toBeVisible();
});

then('ナビゲーションに{string}リンクが存在する', async ({ page }, linkName: string) => {
  const nav = page.getByRole('navigation', { name: 'Main' });
  const link = nav.getByRole('link', { name: linkName });
  await expect(link).toBeVisible();
});
