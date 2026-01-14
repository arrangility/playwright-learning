import { createBdd } from 'playwright-bdd';
import { test, expect } from '../fixtures/test-fixtures';

const { Given, When, Then } = createBdd(test);

// ==========================================
// Login steps (DI version)
// ==========================================

When('ログインボタンをクリックする', async ({ headerComponent }) => {
  await headerComponent.clickLogin();
});

When('ユーザー名{string}とパスワード{string}でログインする', async ({ loginPage }, username: string, password: string) => {
  await loginPage.login(username, password);
});

When('ログアウトする', async ({ headerComponent }) => {
  await headerComponent.clickLogout();
});

Then('ログインに成功する', async ({ loginPage, page }) => {
  // Wait for dialog to close
  await page.waitForTimeout(500);
  expect(await loginPage.isVisible()).toBe(false);
});

Then('ログアウトボタンが表示される', async ({ headerComponent }) => {
  expect(await headerComponent.isLoggedIn()).toBe(true);
});

Then('ログインボタンが表示される', async ({ headerComponent }) => {
  expect(await headerComponent.isLoggedIn()).toBe(false);
});

Then('ログインダイアログが表示されたままである', async ({ loginPage }) => {
  expect(await loginPage.isVisible()).toBe(true);
});

// ==========================================
// Register steps (DI version)
// ==========================================

When('新規登録リンクをクリックする', async ({ loginPage }) => {
  await loginPage.clickRegisterLink();
});

When('ユーザー名{string}、メール{string}、パスワード{string}で登録する', async ({ registerPage }, username: string, email: string, password: string) => {
  await registerPage.register(username, email, password, password);
});

When('ユーザー名{string}、メール{string}、パスワード{string}、確認パスワード{string}で登録する', async ({ registerPage }, username: string, email: string, password: string, confirmPassword: string) => {
  await registerPage.register(username, email, password, confirmPassword);
});

Then('登録ダイアログが閉じる', async ({ registerPage, page }) => {
  await page.waitForTimeout(500);
  expect(await registerPage.isVisible()).toBe(false);
});

Then('登録ダイアログが表示されたままである', async ({ registerPage }) => {
  expect(await registerPage.isVisible()).toBe(true);
});

// ==========================================
// Shared login step for other features (DI version)
// ==========================================

Given('ログイン済みである', async ({ headerComponent, loginPage, page }) => {
  await headerComponent.clickLogin();
  await loginPage.login('demo', 'Demo@2025!');
  await page.waitForTimeout(500);
});
