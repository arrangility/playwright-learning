import { Page, Locator } from '@playwright/test';

export class CatalogPage {
  private readonly searchInput: Locator;
  private readonly sortSelect: Locator;
  private readonly categoryTabs: Locator;
  private readonly productCards: Locator;

  constructor(private page: Page) {
    this.searchInput = page.getByPlaceholder('商品を検索...');
    this.sortSelect = page.getByRole('combobox', { name: '並び替え' });
    this.categoryTabs = page.getByRole('tablist', { name: '商品カテゴリ' });
    // Product cards are containers that have "カートに追加" button
    this.productCards = page.getByRole('button', { name: /カートに追加/ });
  }

  async searchProduct(keyword: string) {
    await this.searchInput.fill(keyword);
    await this.page.waitForTimeout(500); // Wait for filter to apply
  }

  async clearSearch() {
    await this.searchInput.clear();
  }

  async sortBy(option: '名前順' | '価格（安い順）' | '価格（高い順）') {
    await this.sortSelect.selectOption(option);
  }

  async filterByCategory(category: 'すべての商品' | '電子機器' | '衣類' | '書籍' | 'ホーム') {
    await this.categoryTabs.getByRole('tab', { name: category }).click();
  }

  async getProductCount() {
    return await this.productCards.count();
  }

  async getProductNames() {
    const names: string[] = [];
    const count = await this.productCards.count();
    for (let i = 0; i < count; i++) {
      const card = this.productCards.nth(i);
      const nameElement = card.locator('text=/^[^¥]+$/').first();
      const name = await nameElement.textContent();
      if (name) names.push(name.trim());
    }
    return names;
  }

  async addToCart(productName: string) {
    // Use img alt attribute to locate the product card
    const productImg = this.page.getByRole('img', { name: productName });
    const card = productImg.locator('..');
    await card.getByRole('button', { name: /カートに追加/i }).click();
  }

  async isAddToCartEnabled(productName: string) {
    const productImg = this.page.getByRole('img', { name: productName });
    const card = productImg.locator('..');
    const button = card.getByRole('button', { name: /カートに追加/i });
    return await button.isEnabled();
  }

  async getProductPrice(productName: string) {
    const productImg = this.page.getByRole('img', { name: productName });
    const card = productImg.locator('..');
    const priceText = await card.locator('text=/¥[\\d,]+/').textContent();
    if (priceText) {
      const match = priceText.match(/¥([\d,]+)/);
      if (match) {
        return parseInt(match[1].replace(',', ''), 10);
      }
    }
    return 0;
  }

  async isProductVisible(productName: string) {
    return await this.page.locator(`text=${productName}`).isVisible();
  }
}
