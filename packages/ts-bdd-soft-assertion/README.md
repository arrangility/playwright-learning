# ts-bdd-soft-assertion

Playwright の `expect.soft()` 機能を使用した**ソフトアサーションの包括的なパターン**を BDD 形式で示すサンプルパッケージです。

## Soft Assertion とは

Soft Assertion（ソフトアサーション）は、アサーションが失敗してもテストの実行を継続する機能です。通常の `expect()` ではアサーションが失敗すると即座にテストが停止しますが、`expect.soft()` を使用すると、すべてのアサーションが実行され、失敗は最後にまとめて報告されます。

### 通常のアサーション vs ソフトアサーション

```typescript
// 通常のアサーション - 失敗でテスト停止
await expect(page.locator('#element1')).toBeVisible();  // 失敗するとここで停止
await expect(page.locator('#element2')).toBeVisible();  // 実行されない

// ソフトアサーション - 失敗しても継続
await expect.soft(page.locator('#element1')).toBeVisible();  // 失敗しても継続
await expect.soft(page.locator('#element2')).toBeVisible();  // 実行される
// テスト終了時に両方の結果が報告される
```

## ディレクトリ構成

```
packages/ts-bdd-soft-assertion/
├── features/                   # Gherkin Feature files
│   ├── basic/                  # 基本パターン
│   │   ├── single-soft-assertion.feature
│   │   ├── multiple-soft-assertions.feature
│   │   └── failure-aggregation.feature
│   ├── advanced/               # 高度なパターン
│   │   ├── custom-error-messages.feature
│   │   ├── combined-assertions.feature
│   │   ├── loop-iterations.feature
│   │   └── async-operations.feature
│   └── practical/              # 実践的ユースケース
│       ├── form-validation.feature
│       ├── page-layout.feature
│       ├── data-table-validation.feature
│       └── api-response-validation.feature
├── steps/                      # Step definitions
│   ├── common.steps.ts
│   ├── basic.steps.ts
│   ├── advanced.steps.ts
│   └── practical.steps.ts
├── fixtures/                   # Custom fixtures
│   ├── test-fixtures.ts
│   └── test-data.ts
├── pages/                      # Page Objects
│   ├── BasePage.ts
│   ├── CatalogPage.ts
│   ├── LoginPage.ts
│   └── components/
│       ├── HeaderComponent.ts
│       └── CartComponent.ts
├── playwright.config.ts
├── package.json
└── README.md
```

## 使い方

### セットアップ

```bash
cd packages/ts-bdd-soft-assertion
npm install
```

### テスト実行

```bash
# 全テスト実行
npm test

# カテゴリ別実行
npm run test:basic      # 基本パターンのみ
npm run test:advanced   # 高度なパターンのみ
npm run test:practical  # 実践的ユースケースのみ

# ブラウザ表示で実行
npm run test:headed

# デバッグモード
npm run test:debug

# レポート表示
npm run report
```

## パターン解説

### 1. 基本パターン (@basic)

#### 単一のSoft Assertion

最もシンプルな使用方法です。

```typescript
Then('ヘッダーが表示されている（Soft Assertion）', async ({ page }) => {
  await expect.soft(page.locator('header').first()).toBeVisible();
});
```

#### 複数のSoft Assertions

DataTable を使用して複数の要素を検証します。

```typescript
Then('以下のUI要素がすべて表示される（Soft Assertions）:', async ({ page }, dataTable) => {
  for (const [elementName, selector] of dataTable.rows()) {
    await expect.soft(page.locator(selector), `${elementName}が表示されるべき`).toBeVisible();
  }
});
```

#### 失敗の集約

一部が失敗してもすべての検証が実行されます。

```typescript
Then('全商品の価格が正の数であることを検証（Soft Assertions）', async ({ page }) => {
  const priceElements = page.locator('text=/¥[\\d,]+/');
  const count = await priceElements.count();

  for (let i = 0; i < count; i++) {
    const price = /* 価格を取得 */;
    await expect.soft(price, `価格 ${i + 1} が正の数であるべき`).toBeGreaterThan(0);
  }
});
```

### 2. 高度なパターン (@advanced)

#### カスタムエラーメッセージ

デバッグしやすい詳細なエラーメッセージを指定します。

```typescript
Then('デバッグ情報付きで商品一覧を検証する', async ({ page }, testInfo) => {
  const count = await page.getByRole('button', { name: /カートに追加/ }).count();

  await expect.soft(
    productCards.first(),
    `商品カード検証: 検出数=${count}, TestID=${testInfo.testId}`
  ).toBeVisible();
});
```

#### Hard Assertion + Soft Assertion の組み合わせ

前提条件は Hard Assertion、詳細は Soft Assertion で検証します。

```typescript
// 前提条件 - 失敗でテスト停止
Then('ページタイトルが正しい（Hard Assertion）', async ({ page }) => {
  await expect(page).toHaveTitle(/ShopTodo/);
});

// 詳細検証 - 失敗しても継続
Then('UI要素の詳細を検証する（Soft Assertions）:', async ({ page }, dataTable) => {
  for (const [element] of dataTable.rows()) {
    await expect.soft(/* locator */, `${element}が表示されるべき`).toBeVisible();
  }
});
```

#### ループ内での使用

すべての項目を検証し、問題があるものを一覧で報告します。

```typescript
Then('すべての商品カードの構造を検証する', async ({ page }) => {
  const productCards = page.getByRole('button', { name: /カートに追加/ });
  const count = await productCards.count();

  for (let i = 0; i < count; i++) {
    await expect.soft(
      productCards.nth(i),
      `商品カード ${i + 1}/${count}: 表示されるべき`
    ).toBeVisible();
  }
});
```

### 3. 実践的ユースケース (@practical)

#### フォームバリデーション

フォームのすべての要素を一括検証します。

```typescript
Then('ログインフォームの全要素を検証する（Soft Assertions）:', async ({ page }, dataTable) => {
  for (const [element, validation] of dataTable.rows()) {
    const locator = /* 要素を特定 */;
    await expect.soft(locator, `${element}が表示されるべき`).toBeVisible();
    if (validation.includes('有効')) {
      await expect.soft(locator, `${element}が有効であるべき`).toBeEnabled();
    }
  }
});
```

#### ページレイアウト検証

ページの構造が正しいか検証します。

#### データテーブル検証

商品一覧などのデータを検証します。

```typescript
Then('商品一覧のデータを検証する（Soft Assertions）:', async ({ catalogPage }, dataTable) => {
  for (const [productName, expectedPrice] of dataTable.rows()) {
    const actualPrice = await catalogPage.getProductPrice(productName);
    await expect.soft(
      actualPrice,
      `${productName}の価格が${expectedPrice}であるべき`
    ).toBe(expectedPriceNum);
  }
});
```

## ベストプラクティス

### 1. カスタムメッセージを必ず指定する

失敗時にどの要素で問題が発生したか特定しやすくなります。

```typescript
// 推奨
await expect.soft(element, '商品名が表示されるべき').toBeVisible();

// 非推奨
await expect.soft(element).toBeVisible();
```

### 2. 前提条件は Hard Assertion で検証

ページが正しく読み込まれていない場合など、前提条件が満たされない場合は即座に失敗させます。

```typescript
// 前提条件は Hard Assertion
await expect(page).toHaveTitle(/ShopTodo/);

// 詳細検証は Soft Assertion
await expect.soft(element).toBeVisible();
```

### 3. ループ内ではインデックス情報を含める

どの項目で失敗したか特定しやすくなります。

```typescript
for (let i = 0; i < count; i++) {
  await expect.soft(
    items.nth(i),
    `項目 [${i + 1}/${count}]: 表示されるべき`
  ).toBeVisible();
}
```

### 4. 関連する検証をグループ化

関連する検証は同じシナリオでまとめて実行します。

## 注意点

- Soft Assertion は失敗しても継続するため、後続のアサーションが前のアサーションの結果に依存する場合は使用しない
- すべてのテストで Soft Assertion を使用する必要はなく、適切な場面で使い分ける
- 失敗が多すぎると報告が見づらくなるため、適切な粒度で分割する

## 関連リンク

- [Playwright - Soft Assertions](https://playwright.dev/docs/test-assertions#soft-assertions)
- [playwright-bdd](https://github.com/vitalets/playwright-bdd)
