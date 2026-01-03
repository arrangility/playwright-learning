import { Page, Locator } from '@playwright/test';

export class HeaderComponent {
  private readonly loginButton: Locator;
  private readonly logoutButton: Locator;
  private readonly enButton: Locator;
  private readonly jpButton: Locator;
  private readonly userNameDisplay: Locator;

  constructor(private page: Page) {
    this.loginButton = page.getByRole('button', { name: 'ログイン' });
    this.logoutButton = page.getByRole('button', { name: 'ログアウト' });
    this.enButton = page.getByRole('button', { name: 'EN' });
    this.jpButton = page.getByRole('button', { name: 'JP' });
    this.userNameDisplay = page.locator('[class*="user-name"]');
  }

  async clickLogin() {
    await this.loginButton.click();
  }

  async clickLogout() {
    await this.logoutButton.click();
  }

  async switchToEnglish() {
    await this.enButton.click();
  }

  async switchToJapanese() {
    await this.jpButton.click();
  }

  async isLoggedIn() {
    return await this.logoutButton.isVisible();
  }

  async getLoggedInUserName() {
    if (await this.isLoggedIn()) {
      return await this.userNameDisplay.textContent();
    }
    return null;
  }
}
