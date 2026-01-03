import { test, expect } from '@playwright/test';

test.describe('ナビゲーション構造の検証', () => {

  test('メインナビゲーションの順序: Home → Services → Blog → Company', async ({ page }) => {
    await page.goto('https://www.arrangility.com/');
    const nav = page.getByRole('navigation', { name: 'Main' });

    // 正しい順序を検証
    await expect(nav.getByRole('list').first()).toMatchAriaSnapshot(`
      - list:
        - listitem:
          - link "Home"
        - listitem: Services
        - listitem:
          - link "Blog"
        - listitem:
          - link "Company"
    `);
  });

  test('フッターのリンク構造を検証', async ({ page }) => {
    await page.goto('https://www.arrangility.com/');
    const footer = page.getByRole('contentinfo');

    // フッターにリンクが存在することを確認
    await expect(footer.getByRole('link', { name: 'Home' })).toBeVisible();
    await expect(footer.getByRole('link', { name: 'About Us' })).toBeVisible();
    await expect(footer.getByRole('link', { name: 'Services' })).toBeVisible();
    await expect(footer.getByRole('link', { name: 'Blog' })).toBeVisible();
    await expect(footer.getByRole('link', { name: 'Contact Us' })).toBeVisible();
    await expect(footer.getByRole('link', { name: 'Privacy Policy' })).toBeVisible();
  });

  test('ページ見出しの階層構造を検証', async ({ page }) => {
    await page.goto('https://www.arrangility.com/');

    // h1見出しが1つ存在することを確認
    const h1 = page.getByRole('heading', { level: 1 });
    await expect(h1).toHaveCount(1);
    await expect(h1).toContainText('ARRANGILITY');

    // h2見出しが複数存在することを確認
    const h2 = page.getByRole('heading', { level: 2 });
    await expect(h2.first()).toBeVisible();
  });

});
