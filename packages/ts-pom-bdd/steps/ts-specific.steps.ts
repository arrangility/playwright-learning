import { expect } from '@playwright/test';
import { createBdd, DataTable } from 'playwright-bdd';

const { Then } = createBdd();

// ============================================
// Visual Regression Testing (toHaveScreenshot)
// TypeScript専用機能: スクリーンショット比較
// ============================================

Then('商品カタログ画面のスクリーンショットが一致する', async ({ page }) => {
  // ページ全体のスクリーンショット比較
  // 初回実行時はベースライン画像が自動生成される
  await expect(page).toHaveScreenshot('catalog-page.png', {
    maxDiffPixels: 100, // 許容差分ピクセル数
  });
});

Then('ログインダイアログのスクリーンショットが一致する', async ({ page }) => {
  // 特定要素（ダイアログ）のスクリーンショット比較
  const dialog = page.getByRole('dialog');
  await expect(dialog).toHaveScreenshot('login-dialog.png', {
    maxDiffPixels: 50,
  });
});

Then('ヘッダーのスクリーンショットが一致する', async ({ page }) => {
  // ヘッダー要素のスクリーンショット比較
  const header = page.locator('header').first();
  await expect(header).toHaveScreenshot('header.png', {
    maxDiffPixels: 50,
  });
});

// ============================================
// Soft Assertions (expect.soft)
// TypeScript専用機能: 失敗しても継続、最後にまとめて報告
// ============================================

Then('以下の要素がすべて正しく表示される（Soft Assertions）', async ({ page }, dataTable: DataTable) => {
  const elements = dataTable.rows().map(row => row[0]);

  for (const element of elements) {
    switch (element) {
      case 'ヘッダー':
        // Soft assertion: 失敗しても次の検証を続行
        await expect.soft(page.locator('header').first()).toBeVisible();
        break;
      case '商品カタログ':
        await expect.soft(page.getByRole('button', { name: /カートに追加/ }).first()).toBeVisible();
        break;
      case 'カテゴリタブ':
        await expect.soft(page.getByRole('tablist', { name: '商品カテゴリ' })).toBeVisible();
        break;
      case '検索ボックス':
        await expect.soft(page.getByPlaceholder('商品を検索...')).toBeVisible();
        break;
    }
  }
});

Then('ログイン後の以下の要素がすべて正しく表示される（Soft Assertions）', async ({ page }, dataTable: DataTable) => {
  const elements = dataTable.rows().map(row => row[0]);

  for (const element of elements) {
    switch (element) {
      case 'ログアウトボタン':
        await expect.soft(page.getByRole('button', { name: 'ログアウト' })).toBeVisible();
        break;
      case 'カート':
        // カートセクション（サイドバー）の存在確認
        await expect.soft(page.locator('[class*="cart"], [class*="Cart"]').first()).toBeVisible();
        break;
      case '商品一覧':
        await expect.soft(page.getByRole('button', { name: /カートに追加/ }).first()).toBeVisible();
        break;
    }
  }
});

Then('商品カードに以下の要素が含まれる（Soft Assertions）', async ({ page }, dataTable: DataTable) => {
  const elements = dataTable.rows().map(row => row[0]);

  for (const element of elements) {
    switch (element) {
      case '商品画像':
        // 商品画像（alt属性に商品名が設定されている）
        await expect.soft(page.getByRole('img', { name: /スマートフォン|ノートパソコン|Tシャツ/ }).first()).toBeVisible();
        break;
      case '商品名':
        // 商品名がページ上に表示されている
        await expect.soft(page.getByText(/スマートフォン|ノートパソコン|Tシャツ/).first()).toBeVisible();
        break;
      case '価格':
        // 価格表示（¥マーク付き）
        await expect.soft(page.getByText(/¥[\d,]+/).first()).toBeVisible();
        break;
      case 'カートに追加ボタン':
        // カートに追加ボタン
        await expect.soft(page.getByRole('button', { name: /カートに追加/ }).first()).toBeVisible();
        break;
    }
  }
});
