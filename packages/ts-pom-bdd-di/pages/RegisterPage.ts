import { Page, Locator } from '@playwright/test';

export class RegisterPage {
  private readonly dialog: Locator;
  private readonly usernameInput: Locator;
  private readonly emailInput: Locator;
  private readonly passwordInput: Locator;
  private readonly confirmPasswordInput: Locator;
  private readonly registerButton: Locator;
  private readonly closeButton: Locator;
  private readonly loginLink: Locator;
  private readonly errorMessage: Locator;

  constructor(private page: Page) {
    this.dialog = page.getByRole('dialog', { name: '新規登録' });
    this.usernameInput = this.dialog.getByLabel('ユーザー名:');
    this.emailInput = this.dialog.getByLabel('メールアドレス');
    this.passwordInput = this.dialog.getByLabel('パスワード:').first();
    this.confirmPasswordInput = this.dialog.getByLabel('パスワード確認:');
    this.registerButton = this.dialog.getByRole('button', { name: '新規登録' });
    this.closeButton = this.dialog.getByRole('button', { name: '閉じる' });
    this.loginLink = this.dialog.getByRole('link', { name: 'ログイン' });
    this.errorMessage = this.dialog.locator('[class*="error"]');
  }

  async isVisible() {
    return await this.dialog.isVisible();
  }

  async register(username: string, email: string, password: string, confirmPassword: string) {
    await this.usernameInput.fill(username);
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.confirmPasswordInput.fill(confirmPassword);
    await this.registerButton.click();
  }

  async close() {
    await this.closeButton.click();
  }

  async clickLoginLink() {
    await this.loginLink.click();
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
