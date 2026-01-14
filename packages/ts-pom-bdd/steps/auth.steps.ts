import { createBdd } from 'playwright-bdd';
import { test, expect } from '../fixtures/base-test';
import { HeaderComponent } from '../pages/components/HeaderComponent';
import { LoginPage } from '../pages/LoginPage';
import { RegisterPage } from '../pages/RegisterPage';

const { Given, When, Then } = createBdd(test);

// Login steps
When('ログインボタンをクリックする', async ({ page }) => {
  const header = new HeaderComponent(page);
  await header.clickLogin();
});

When('ユーザー名{string}とパスワード{string}でログインする', async ({ page }, username: string, password: string) => {
  const loginPage = new LoginPage(page);
  await loginPage.login(username, password);
});

When('ログアウトする', async ({ page }) => {
  const header = new HeaderComponent(page);
  await header.clickLogout();
});

Then('ログインに成功する', async ({ page }) => {
  const loginPage = new LoginPage(page);
  // Wait for dialog to close
  await page.waitForTimeout(500);
  expect(await loginPage.isVisible()).toBe(false);
});

Then('ログアウトボタンが表示される', async ({ page }) => {
  const header = new HeaderComponent(page);
  expect(await header.isLoggedIn()).toBe(true);
});

Then('ログインボタンが表示される', async ({ page }) => {
  const header = new HeaderComponent(page);
  expect(await header.isLoggedIn()).toBe(false);
});

Then('ログインダイアログが表示されたままである', async ({ page }) => {
  const loginPage = new LoginPage(page);
  expect(await loginPage.isVisible()).toBe(true);
});

// Register steps
When('新規登録リンクをクリックする', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.clickRegisterLink();
});

When('ユーザー名{string}、メール{string}、パスワード{string}で登録する', async ({ page }, username: string, email: string, password: string) => {
  const registerPage = new RegisterPage(page);
  await registerPage.register(username, email, password, password);
});

When('ユーザー名{string}、メール{string}、パスワード{string}、確認パスワード{string}で登録する', async ({ page }, username: string, email: string, password: string, confirmPassword: string) => {
  const registerPage = new RegisterPage(page);
  await registerPage.register(username, email, password, confirmPassword);
});

Then('登録ダイアログが閉じる', async ({ page }) => {
  const registerPage = new RegisterPage(page);
  await page.waitForTimeout(500);
  expect(await registerPage.isVisible()).toBe(false);
});

Then('登録ダイアログが表示されたままである', async ({ page }) => {
  const registerPage = new RegisterPage(page);
  expect(await registerPage.isVisible()).toBe(true);
});

// Shared login step for other features
Given('ログイン済みである', async ({ page }) => {
  const header = new HeaderComponent(page);
  const loginPage = new LoginPage(page);

  await header.clickLogin();
  await loginPage.login('demo', 'Demo@2025!');
  await page.waitForTimeout(500);
});
