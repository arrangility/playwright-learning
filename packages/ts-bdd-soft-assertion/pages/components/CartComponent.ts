import { Page, Locator, expect } from '@playwright/test';

export class CartComponent {
  private readonly cartSection: Locator;
  private readonly cartTotal: Locator;
  private readonly checkoutButton: Locator;
  private readonly orderHistoryButton: Locator;
  private readonly emptyMessage: Locator;

  constructor(private page: Page) {
    this.cartSection = page.getByRole('complementary');
    this.cartTotal = this.cartSection.locator('text=/合計:/');
    this.checkoutButton = page.getByRole('button', { name: 'チェックアウト' });
    this.orderHistoryButton = page.getByRole('button', { name: '注文履歴を見る' });
    this.emptyMessage = page.getByText('カートは空です');
  }

  async getTotal() {
    const totalText = await this.cartTotal.textContent();
    if (totalText) {
      const match = totalText.match(/¥([\d,]+)/);
      if (match) {
        return parseInt(match[1].replace(',', ''), 10);
      }
    }
    return 0;
  }

  async getItemCount() {
    // Count cart items by counting remove buttons (🗑️)
    const removeButtons = this.cartSection.getByRole('button', { name: '🗑️' });
    return await removeButtons.count();
  }

  async isEmpty() {
    return await this.emptyMessage.isVisible();
  }

  async checkout() {
    await this.checkoutButton.click();
  }

  async isCheckoutEnabled() {
    return await this.checkoutButton.isEnabled();
  }

  async viewOrderHistory() {
    await this.orderHistoryButton.click();
  }

  async removeItem(productName: string) {
    // Find the cart item containing the product name and click its remove button
    const cartItem = this.cartSection.locator(`text=${productName}`).locator('xpath=ancestor::*[.//button]').first();
    await cartItem.getByRole('button', { name: '🗑️' }).click();
  }

  /**
   * Get list of all product names in the cart
   * @returns Array of product names
   */
  async getItemNames(): Promise<string[]> {
    const items: string[] = [];
    const removeButtons = this.cartSection.getByRole('button', { name: '🗑️' });
    const count = await removeButtons.count();

    for (let i = 0; i < count; i++) {
      const cartItem = removeButtons.nth(i).locator('xpath=ancestor::*[contains(@class, "cart") or contains(@class, "item")]').first();
      const text = await cartItem.textContent();
      if (text) {
        // Extract product name from cart item text
        // Text format: "ProductName ¥Price 🗑️"
        const match = text.match(/^(.+?)¥/);
        if (match) {
          items.push(match[1].trim());
        }
      }
    }
    return items;
  }

  /**
   * Get price of a specific product in the cart
   * @param productName Name of the product
   * @returns Price in yen (integer)
   */
  async getItemPrice(productName: string): Promise<number> {
    // Find cart item containing the product name
    const cartItem = this.cartSection.locator(`text=${productName}`).locator('xpath=ancestor::*[.//button]').first();
    const text = await cartItem.textContent();

    if (text) {
      // Extract price from text (format: "ProductName ¥XX,XXX 🗑️")
      const match = text.match(/¥([\d,]+)/);
      if (match) {
        return parseInt(match[1].replace(/,/g, ''), 10);
      }
    }
    return 0;
  }
}
