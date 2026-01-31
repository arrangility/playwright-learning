import { createBdd, DataTable } from 'playwright-bdd';
import { test, expect } from '../fixtures/test-fixtures';

const { Then } = createBdd(test);

// ==========================================
// Single Soft Assertion Steps
// ==========================================

Then('ヘッダーが表示されている（Soft Assertion）', async ({ page }) => {
  // expect.soft() を使用 - 失敗してもテストは継続
  await expect.soft(page.locator('header').first()).toBeVisible();
});

Then('フッターが表示されている（Soft Assertion）', async ({ page }) => {
  // フッターがない場合でもテストは継続される
  await expect.soft(page.locator('footer').first()).toBeVisible();
});

Then('以下の要素が順番に表示される（Soft Assertions）:', async ({ page }, dataTable: DataTable) => {
  const elements = dataTable.rows();

  for (const [element] of elements) {
    switch (element) {
      case 'ヘッダー':
        await expect.soft(page.locator('header').first(), `${element}が表示されるべき`).toBeVisible();
        break;
      case '商品カタログ':
        await expect.soft(
          page.getByRole('button', { name: /カートに追加/ }).first(),
          `${element}が表示されるべき`
        ).toBeVisible();
        break;
      case 'カートセクション':
        await expect.soft(
          page.getByRole('complementary'),
          `${element}が表示されるべき`
        ).toBeVisible();
        break;
    }
  }
});

// ==========================================
// Multiple Soft Assertions Steps
// ==========================================

Then('以下のUI要素がすべて表示される（Soft Assertions）:', async ({ page }, dataTable: DataTable) => {
  const elements = dataTable.rows();

  for (const [elementName, selectorType] of elements) {
    let locator;

    switch (selectorType) {
      case 'role-button':
        locator = page.getByRole('button', { name: 'ログイン' });
        break;
      case 'placeholder':
        locator = page.getByPlaceholder('商品を検索...');
        break;
      case 'role-tablist':
        locator = page.getByRole('tablist', { name: '商品カテゴリ' });
        break;
      default:
        locator = page.locator(selectorType);
    }

    await expect.soft(locator, `${elementName}が表示されるべき`).toBeVisible();
  }
});

Then('最初の商品カードに以下の要素が含まれる（Soft Assertions）:', async ({ page }, dataTable: DataTable) => {
  const elements = dataTable.rows();

  // 最初の商品カードを特定（カートに追加ボタンを持つ要素）
  const firstProductCard = page.getByRole('button', { name: /カートに追加/ }).first().locator('..');

  for (const [element] of elements) {
    switch (element) {
      case '商品画像':
        await expect.soft(
          page.getByRole('img').first(),
          '商品画像が表示されるべき'
        ).toBeVisible();
        break;
      case '商品名':
        // 商品名は価格の前にあるテキスト
        await expect.soft(
          page.locator('text=/スマートフォン|ノートパソコン|Tシャツ/').first(),
          '商品名が表示されるべき'
        ).toBeVisible();
        break;
      case '価格':
        await expect.soft(
          page.locator('text=/¥[\\d,]+/').first(),
          '価格が表示されるべき'
        ).toBeVisible();
        break;
      case 'カートに追加ボタン':
        await expect.soft(
          page.getByRole('button', { name: /カートに追加/ }).first(),
          'カートに追加ボタンが表示されるべき'
        ).toBeVisible();
        break;
    }
  }
});

// ==========================================
// Failure Aggregation Steps
// ==========================================

Then('以下の要素を検証し失敗を集約する:', async ({ page }, dataTable: DataTable) => {
  const elements = dataTable.rows();

  for (const [element, expectedState] of elements) {
    let locator;

    switch (element) {
      case 'ログインボタン':
        locator = page.getByRole('button', { name: 'ログイン' });
        break;
      case '商品一覧':
        locator = page.getByRole('button', { name: /カートに追加/ }).first();
        break;
      case 'カート':
        locator = page.getByRole('complementary');
        break;
      default:
        locator = page.locator(element);
    }

    if (expectedState === '表示') {
      await expect.soft(locator, `${element}が表示されるべき`).toBeVisible();
    } else if (expectedState === '非表示') {
      await expect.soft(locator, `${element}が非表示であるべき`).not.toBeVisible();
    }
  }
});

Then('全商品の価格が正の数であることを検証（Soft Assertions）', async ({ page }) => {
  const priceElements = page.locator('text=/¥[\\d,]+/');
  const count = await priceElements.count();

  // 最大10個まで検証（パフォーマンスを考慮）
  const maxCount = Math.min(count, 10);
  for (let i = 0; i < maxCount; i++) {
    const priceText = await priceElements.nth(i).textContent();
    if (priceText) {
      const match = priceText.match(/¥([\d,]+)/);
      if (match) {
        const price = parseInt(match[1].replace(/,/g, ''), 10);
        await expect.soft(price, `価格 ${i + 1} (${priceText}) が正の数であるべき`).toBeGreaterThan(0);
      }
    }
  }
});
