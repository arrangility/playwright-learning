import { createBdd, DataTable } from 'playwright-bdd';
import { test, expect } from '../fixtures/test-fixtures';

const { When, Then } = createBdd(test);

// ==========================================
// Custom Error Messages Steps
// ==========================================

Then('デバッグ情報付きで商品一覧を検証する', async ({ page }) => {
  const productCards = page.getByRole('button', { name: /カートに追加/ });
  const count = await productCards.count();

  // カスタムメッセージにデバッグ情報を含める
  await expect.soft(
    productCards.first(),
    `商品カード検証: 検出数=${count}, 期待=1以上`
  ).toBeVisible();

  await expect.soft(
    count,
    `商品カード数の検証: 実際=${count}, 期待=1以上`
  ).toBeGreaterThan(0);
});

Then('テスト情報を含むカスタムメッセージで検証する', async ({ page, $testInfo }) => {
  const loginButton = page.getByRole('button', { name: 'ログイン' });

  await expect.soft(
    loginButton,
    `[TestID: ${$testInfo.testId}] [Title: ${$testInfo.title}] ログインボタンが表示されるべき`
  ).toBeVisible();

  const searchBox = page.getByPlaceholder('商品を検索...');
  await expect.soft(
    searchBox,
    `[TestID: ${$testInfo.testId}] 検索ボックスが表示されるべき`
  ).toBeVisible();
});

Then('各商品にインデックス付きのカスタムメッセージで検証する', async ({ page }) => {
  const productCards = page.getByRole('button', { name: /カートに追加/ });
  const count = await productCards.count();

  for (let i = 0; i < Math.min(count, 5); i++) {
    const card = productCards.nth(i);

    await expect.soft(
      card,
      `商品 [${i + 1}/${count}]: カートに追加ボタンが表示されるべき`
    ).toBeVisible();

    // ボタンの存在確認（ログイン前はdisabledの可能性があるため、toBeVisibleのみ）
  }
});

// ==========================================
// Combined Assertions Steps
// ==========================================

Then('ページタイトルが正しい（Hard Assertion）', async ({ page }) => {
  // Hard Assertion - 失敗でテスト停止
  await expect(page).toHaveTitle(/ShopTodo/);
});

Then('UI要素の詳細を検証する（Soft Assertions）:', async ({ page }, dataTable: DataTable) => {
  const elements = dataTable.rows();

  for (const [element] of elements) {
    switch (element) {
      case 'ログインボタン':
        await expect.soft(
          page.getByRole('button', { name: 'ログイン' }),
          `${element}が表示されるべき`
        ).toBeVisible();
        break;
      case '検索ボックス':
        await expect.soft(
          page.getByPlaceholder('商品を検索...'),
          `${element}が表示されるべき`
        ).toBeVisible();
        break;
      case 'カテゴリタブ':
        await expect.soft(
          page.getByRole('tablist', { name: '商品カテゴリ' }),
          `${element}が表示されるべき`
        ).toBeVisible();
        break;
    }
  }
});

Then('商品が1つ以上存在する（Hard Assertion）', async ({ page }) => {
  const productCards = page.getByRole('button', { name: /カートに追加/ });
  // Hard Assertion - 商品がなければ即座に失敗
  await expect(productCards.first()).toBeVisible();
});

Then('各商品の構造を検証する（Soft Assertions）', async ({ page }) => {
  const productCards = page.getByRole('button', { name: /カートに追加/ });
  const count = await productCards.count();

  for (let i = 0; i < Math.min(count, 3); i++) {
    const card = productCards.nth(i);

    // 各商品カードの構造を検証（ボタンの表示確認のみ - ログイン前はdisabled）
    await expect.soft(card, `商品${i + 1}: カートに追加ボタン`).toBeVisible();
  }

  // 価格が表示されていることを検証
  const prices = page.locator('text=/¥[\\d,]+/');
  await expect.soft(prices.first(), '価格が表示されるべき').toBeVisible();
});

// ==========================================
// Loop Iterations Steps
// ==========================================

Then('すべての商品カードの構造を検証する', async ({ page }) => {
  const productCards = page.getByRole('button', { name: /カートに追加/ });
  const count = await productCards.count();

  for (let i = 0; i < count; i++) {
    const card = productCards.nth(i);

    // 各カードの構造を検証（Soft Assertionで全カード検証）
    // ボタンの表示確認のみ（ログイン前はdisabledなのでtoBeEnabledは検証しない）
    await expect.soft(
      card,
      `商品カード ${i + 1}/${count}: 表示されるべき`
    ).toBeVisible();
  }
});

Then('以下のカテゴリに商品が存在する:', async ({ page, catalogPage }, dataTable: DataTable) => {
  const categories = dataTable.rows();

  for (const [category] of categories) {
    // カテゴリをクリック
    await catalogPage.filterByCategory(category as '電子機器' | '衣類' | '書籍' | 'ホーム');
    await page.waitForTimeout(300);

    // 商品が存在するか検証
    const productCount = await catalogPage.getProductCount();

    await expect.soft(
      productCount,
      `カテゴリ「${category}」に商品が存在するべき (実際: ${productCount})`
    ).toBeGreaterThan(0);
  }

  // すべてのカテゴリに戻す
  await catalogPage.filterByCategory('すべての商品');
});

// ==========================================
// Async Operations Steps
// ==========================================

When('商品「スマートフォン」をカートに追加する', async ({ page, catalogPage, headerComponent, loginPage, testData }) => {
  // カート追加にはログインが必要
  await headerComponent.clickLogin();
  await loginPage.login(testData.validUser.username, testData.validUser.password);
  await page.waitForTimeout(500);
  const loginDialog = page.getByRole('dialog', { name: 'ログイン' });
  await loginDialog.waitFor({ state: 'hidden', timeout: 5000 });

  await catalogPage.addToCart('スマートフォン');
});

When('「スマート」で商品を検索する', async ({ catalogPage }) => {
  await catalogPage.searchProduct('スマート');
});

Then('カートの状態を検証する（Soft Assertions）:', async ({ cartComponent }, dataTable: DataTable) => {
  const validations = dataTable.rows();

  for (const [item, expected] of validations) {
    switch (item) {
      case 'カートが空でない':
        if (expected === 'true') {
          const isEmpty = await cartComponent.isEmpty();
          await expect.soft(isEmpty, 'カートが空でないべき').toBe(false);
        }
        break;
      case '合計金額が正':
        if (expected === 'true') {
          const total = await cartComponent.getTotal();
          await expect.soft(total, `合計金額が正であるべき (実際: ${total})`).toBeGreaterThan(0);
        }
        break;
    }
  }
});

Then('検索結果を検証する（Soft Assertions）', async ({ page, catalogPage }) => {
  const count = await catalogPage.getProductCount();

  // 検索結果が存在することを検証
  await expect.soft(
    count,
    `検索結果が存在するべき (実際: ${count})`
  ).toBeGreaterThan(0);

  // 検索キーワードを含む商品が表示されていることを検証
  const isVisible = await catalogPage.isProductVisible('スマートフォン');
  await expect.soft(isVisible, 'スマートフォンが検索結果に表示されるべき').toBe(true);
});
