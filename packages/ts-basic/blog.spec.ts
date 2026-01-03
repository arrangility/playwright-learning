import { test, expect } from '@playwright/test';

test.describe('Arrangility Blog Tests', () => {

  test('ホームページからBlogページに遷移できること', async ({ page }) => {
    // 1. ホームページを開く
    await page.goto('https://www.arrangility.com/');

    // ホームページが表示されていることを確認
    await expect(page).toHaveTitle(/Software testing/);

    // 2. Blogリンクをクリック
    const blogLink = page.getByRole('link', { name: 'Blog' }).first();
    await blogLink.click();

    // 3. Blogページが表示されることを確認
    await expect(page).toHaveURL(/\/blog/);
    await expect(page).toHaveTitle(/Blog/);

    // Blogページの見出しが表示されていることを確認
    const heading = page.getByRole('heading', { name: 'Blog', level: 1 });
    await expect(heading).toBeVisible();
  });

  test('Blogページにブログ記事一覧が表示されること', async ({ page }) => {
    // ホームページを開く
    await page.goto('https://www.arrangility.com/');

    // Blogリンクをクリック
    await page.getByRole('link', { name: 'Blog' }).first().click();

    // ブログ記事へのリンクが存在することを確認
    const articleLinks = page.getByRole('link', { name: /Test Automation|Cypress|BDD|Appium|Reka/ });
    await expect(articleLinks.first()).toBeVisible();
  });

  test('ナビゲーションの構造をARIA Snapshotで検証', async ({ page }) => {
    await page.goto('https://www.arrangility.com/');

    // ナビゲーション部分のARIA Snapshot検証
    const nav = page.getByRole('navigation', { name: 'Main' });

    await expect(nav).toMatchAriaSnapshot(`
      - navigation "Main":
        - link "Logo":
          - /url: /
          - img "Logo"
        - list:
          - listitem:
            - link "Home":
              - /url: /
          - listitem: Services
          - listitem:
            - link "Blog":
              - /url: /blog
          - listitem:
            - link "Company":
              - /url: /company
        - link "Contact Us":
          - /url: /company/contact-us
        - img
    `);
  });

});
