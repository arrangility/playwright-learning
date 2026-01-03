import { test, expect } from '@playwright/test';

test.describe('順序・階層の変化を検出できるか確認', () => {

  test('【成功】正しい順序: Home → Services → Blog → Company', async ({ page }) => {
    await page.goto('https://www.arrangility.com/');
    const nav = page.getByRole('navigation', { name: 'Main' });

    // 正しい順序
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

  test('【失敗予定】間違った順序: Home → Services → Company → Blog', async ({ page }) => {
    await page.goto('https://www.arrangility.com/');
    const nav = page.getByRole('navigation', { name: 'Main' });

    // BlogとCompanyの順序を入れ替え（実際と異なる）
    await expect(nav.getByRole('list').first()).toMatchAriaSnapshot(`
      - list:
        - listitem:
          - link "Home"
        - listitem: Services
        - listitem:
          - link "Company"
        - listitem:
          - link "Blog"
    `);
  });

  test('【失敗予定】間違った階層: Servicesがサブメニューを持つ', async ({ page }) => {
    await page.goto('https://www.arrangility.com/');
    const nav = page.getByRole('navigation', { name: 'Main' });

    // Servicesに階層を追加（実際と異なる）
    await expect(nav.getByRole('list').first()).toMatchAriaSnapshot(`
      - list:
        - listitem:
          - link "Home"
        - listitem:
          - link "Services"
          - list:
            - listitem:
              - link "Consulting"
            - listitem:
              - link "Development"
        - listitem:
          - link "Blog"
        - listitem:
          - link "Company"
    `);
  });

});
