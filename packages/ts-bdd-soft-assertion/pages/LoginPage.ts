import { Page, Locator } from '@playwright/test';

export class LoginPage {
  private readonly dialog: Locator;
  private readonly usernameInput: Locator;
  private readonly passwordInput: Locator;
  private readonly loginButton: Locator;
  private readonly closeButton: Locator;
  private readonly registerLink: Locator;
  private readonly errorMessage: Locator;

  constructor(private page: Page) {
    this.dialog = page.getByRole('dialog', { name: 'ログイン' });
    this.usernameInput = this.dialog.getByLabel('ユーザー名:');
    this.passwordInput = this.dialog.getByLabel('パスワード:');
    this.loginButton = this.dialog.getByRole('button', { name: 'ログイン' });
    this.closeButton = this.dialog.getByRole('button', { name: '閉じる' });
    this.registerLink = this.dialog.getByRole('link', { name: '新規登録' });
    this.errorMessage = this.dialog.locator('[class*="error"]');
  }

  async isVisible() {
    return await this.dialog.isVisible();
  }

  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async close() {
    await this.closeButton.click();
  }

  async clickRegisterLink() {
    await this.registerLink.click();
  }

  async getErrorMessage() {
    if (await this.errorMessage.isVisible()) {
      return await this.errorMessage.textContent();
    }
    return null;
  }

  async hasError() {
    return await this.errorMessage.isVisible();
  }
}
