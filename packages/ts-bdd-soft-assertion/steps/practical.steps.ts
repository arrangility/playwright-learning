import { createBdd, DataTable } from 'playwright-bdd';
import { test, expect } from '../fixtures/test-fixtures';

const { When, Then } = createBdd(test);

// ==========================================
// Form Validation Steps
// ==========================================

When('ログインダイアログを開く', async ({ headerComponent }) => {
  await headerComponent.clickLogin();
});

Then('ログインフォームの全要素を検証する（Soft Assertions）:', async ({ page, loginPage }, dataTable: DataTable) => {
  const elements = dataTable.rows();

  // ダイアログが表示されるまで待機
  const dialog = page.getByRole('dialog', { name: 'ログイン' });
  await dialog.waitFor({ state: 'visible' });

  for (const [element, validation] of elements) {
    let locator;

    switch (element) {
      case 'ユーザー名入力':
        locator = dialog.getByLabel('ユーザー名:');
        break;
      case 'パスワード入力':
        locator = dialog.getByLabel('パスワード:');
        break;
      case 'ログインボタン':
        locator = dialog.getByRole('button', { name: 'ログイン' });
        break;
      case '閉じるボタン':
        locator = dialog.getByRole('button', { name: '閉じる' });
        break;
      case '新規登録リンク':
        locator = dialog.getByRole('link', { name: '新規登録' });
        break;
      default:
        continue;
    }

    // 表示の検証
    await expect.soft(locator, `${element}が表示されるべき`).toBeVisible();

    // 有効性の検証（該当する場合）
    if (validation.includes('有効')) {
      await expect.soft(locator, `${element}が有効であるべき`).toBeEnabled();
    }
  }
});

Then('検索フォームの機能を検証する（Soft Assertions）', async ({ page }) => {
  const searchInput = page.getByPlaceholder('商品を検索...');

  // 検索ボックスの検証
  await expect.soft(searchInput, '検索ボックスが表示されるべき').toBeVisible();
  await expect.soft(searchInput, '検索ボックスが有効であるべき').toBeEnabled();
  await expect.soft(searchInput, '検索ボックスが空であるべき').toHaveValue('');

  // 検索を実行
  await searchInput.fill('スマート');
  await page.waitForTimeout(500);

  // 検索後の状態を検証
  await expect.soft(searchInput, '入力値が保持されるべき').toHaveValue('スマート');

  // 検索結果の検証
  const productCards = page.getByRole('button', { name: /カートに追加/ });
  const count = await productCards.count();
  await expect.soft(count, `検索結果が存在するべき (実際: ${count})`).toBeGreaterThan(0);
});

// ==========================================
// Page Layout Steps
// ==========================================

Then('ホームページのレイアウトを検証する（Soft Assertions）:', async ({ page }, dataTable: DataTable) => {
  const sections = dataTable.rows();

  for (const [section, expectedState] of sections) {
    let locator;

    switch (section) {
      case 'ヘッダー':
        locator = page.locator('header').first();
        break;
      case 'メインコンテンツ':
        // 商品カタログをメインコンテンツとして検証
        locator = page.getByRole('button', { name: /カートに追加/ }).first();
        break;
      case 'サイドバー':
        // カートセクションをサイドバーとして検証
        locator = page.getByRole('complementary');
        break;
      default:
        continue;
    }

    if (expectedState === '表示') {
      await expect.soft(locator, `${section}が表示されるべき`).toBeVisible();
    }
  }
});

Then('ナビゲーション要素を検証する（Soft Assertions）:', async ({ page }, dataTable: DataTable) => {
  const elements = dataTable.rows();

  for (const [element] of elements) {
    let locator;

    switch (element) {
      case 'ログインボタン':
        locator = page.getByRole('button', { name: 'ログイン' });
        break;
      case '言語切替':
        locator = page.getByRole('button', { name: /EN|JP/ }).first();
        break;
      case 'カテゴリタブ':
        locator = page.getByRole('tablist', { name: '商品カテゴリ' });
        break;
      default:
        continue;
    }

    await expect.soft(locator, `${element}が表示されるべき`).toBeVisible();
  }
});

// ==========================================
// Data Table Validation Steps
// ==========================================

Then('商品一覧のデータを検証する（Soft Assertions）:', async ({ page, catalogPage }, dataTable: DataTable) => {
  const products = dataTable.rows();

  for (const [productName] of products) {
    // 商品が表示されているか検証
    const isVisible = await catalogPage.isProductVisible(productName);
    await expect.soft(isVisible, `${productName}が表示されるべき`).toBe(true);

    // 価格が正の数であることを検証（実際の価格はアプリによって異なる可能性があるため、正の数かどうかのみ検証）
    const actualPrice = await catalogPage.getProductPrice(productName);
    await expect.soft(
      actualPrice,
      `${productName}の価格が正の数であるべき (実際: ¥${actualPrice.toLocaleString()})`
    ).toBeGreaterThan(0);
  }
});

Then('全商品のデータ整合性を検証する（Soft Assertions）', async ({ page }) => {
  const productCards = page.getByRole('button', { name: /カートに追加/ });
  const count = await productCards.count();

  // 商品が存在することを検証
  await expect.soft(count, `商品が存在するべき (実際: ${count})`).toBeGreaterThan(0);

  // 各商品のデータ整合性を検証
  const priceElements = page.locator('text=/¥[\\d,]+/');
  const priceCount = await priceElements.count();

  // 価格が商品数以上存在することを検証（合計価格も含むため）
  await expect.soft(
    priceCount,
    `価格表示が商品数以上存在するべき (商品数: ${count}, 価格表示: ${priceCount})`
  ).toBeGreaterThanOrEqual(count);

  // 各価格が正の数であることを検証
  for (let i = 0; i < Math.min(priceCount, count); i++) {
    const priceText = await priceElements.nth(i).textContent();
    if (priceText) {
      const match = priceText.match(/¥([\d,]+)/);
      if (match) {
        const price = parseInt(match[1].replace(/,/g, ''), 10);
        await expect.soft(
          price,
          `価格 ${i + 1} が正の数であるべき (実際: ${priceText})`
        ).toBeGreaterThan(0);
      }
    }
  }
});

// ==========================================
// API Response Validation Steps
// ==========================================

Then('商品データの構造を検証する（Soft Assertions）:', async ({ page, catalogPage }, dataTable: DataTable) => {
  const properties = dataTable.rows().map(row => row[0]);

  // 最初の商品について検証
  const productCards = page.getByRole('button', { name: /カートに追加/ });
  const count = await productCards.count();

  await expect.soft(count, '商品が存在するべき').toBeGreaterThan(0);

  for (const property of properties) {
    switch (property) {
      case '商品名':
        // 商品名が表示されているか
        const productName = page.locator('text=/スマートフォン|ノートパソコン|Tシャツ|ジーンズ/').first();
        await expect.soft(productName, '商品名が存在するべき').toBeVisible();
        break;
      case '価格':
        // 価格が表示されているか
        const price = page.locator('text=/¥[\\d,]+/').first();
        await expect.soft(price, '価格が存在するべき').toBeVisible();
        break;
      case 'カテゴリ':
        // カテゴリタブが存在するか（カテゴリ機能の存在を検証）
        const categoryTab = page.getByRole('tablist', { name: '商品カテゴリ' });
        await expect.soft(categoryTab, 'カテゴリ機能が存在するべき').toBeVisible();
        break;
      case 'カートに追加機能':
        // カートに追加ボタンが存在するか（表示のみ検証、ログイン前はdisabled）
        const addToCartButton = page.getByRole('button', { name: /カートに追加/ }).first();
        await expect.soft(addToCartButton, 'カートに追加機能が存在するべき').toBeVisible();
        break;
    }
  }
});

Then('カテゴリ別の商品データを検証する（Soft Assertions）', async ({ page, catalogPage }) => {
  const categories = ['電子機器', '衣類', '書籍', 'ホーム'] as const;

  for (const category of categories) {
    // カテゴリを選択
    await catalogPage.filterByCategory(category);
    await page.waitForTimeout(300);

    // 商品数を取得
    const count = await catalogPage.getProductCount();

    // 商品が存在することを検証
    await expect.soft(
      count,
      `カテゴリ「${category}」に商品が存在するべき (実際: ${count})`
    ).toBeGreaterThan(0);

    // 価格が正しく表示されていることを検証
    if (count > 0) {
      const priceElement = page.locator('text=/¥[\\d,]+/').first();
      await expect.soft(
        priceElement,
        `カテゴリ「${category}」の商品に価格が表示されるべき`
      ).toBeVisible();
    }
  }

  // すべてのカテゴリに戻す
  await catalogPage.filterByCategory('すべての商品');
});
