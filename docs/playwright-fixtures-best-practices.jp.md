# Playwright Fixtures ベストプラクティス

## Playwright Fixturesとは？

Playwright fixturesは、Playwright Testに組み込まれた強力な依存性注入の仕組みです。テストに必要なセットアップ、クリーンアップ、共有リソースを自動的に提供します。

## 主な利点

### 1. 自動的な依存性注入

**Fixtureなし:**
```typescript
test('example', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.login('user', 'pass');
  const cartPage = new CartPage(page);
  await cartPage.addItem('Product');
});
```

**Fixture使用:**
```typescript
// 1回定義
const test = base.extend<{
  authenticatedPage: Page;
  cartPage: CartPage;
}>({
  authenticatedPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.login('user', 'pass');
    await use(page);
  },
  cartPage: async ({ authenticatedPage }, use) => {
    await use(new CartPage(authenticatedPage));
  },
});

// 全テストで使用可能
test('example', async ({ authenticatedPage, cartPage }) => {
  await cartPage.addItem('Product');
});
```

### 2. 自動クリーンアップ

Fixtureはテスト後に自動的にリソースをクリーンアップします:

```typescript
const test = base.extend<{ tempFile: string }>({
  tempFile: async ({}, use) => {
    const file = await createTempFile();
    await use(file); // テスト実行
    // テスト後、自動クリーンアップ
    await deleteTempFile(file);
  },
});
```

### 3. 型安全性

```typescript
type MyFixtures = {
  catalogPage: CatalogPage;
  cartComponent: CartComponent;
};

const test = base.extend<MyFixtures>({
  catalogPage: async ({ page }, use) => {
    await use(new CatalogPage(page));
  },
  cartComponent: async ({ page }, use) => {
    await use(new CartComponent(page));
  },
});

test('test', async ({ catalogPage, cartComponent }) => {
  // TypeScriptの完全なIntelliSenseサポート
  await catalogPage.searchProduct('item');
  expect(await cartComponent.getItemCount()).toBe(1);
});
```

### 4. Fixture間の依存関係

Fixtureは他のFixtureに依存できます:

```typescript
const test = base.extend<{
  loginPage: LoginPage;
  authenticatedPage: Page; // loginPageに依存
}>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  authenticatedPage: async ({ loginPage }, use) => {
    await loginPage.login('demo', 'Demo@2025!');
    await use(loginPage.page);
  },
});
```

### 5. 再利用性

Fixtureを一度定義すれば、全テストで使用可能:

```typescript
// fixtures/test-fixtures.ts で定義
export const test = base.extend<{
  authenticatedPage: Page;
  cartComponent: CartComponent;
}>({ /* ... */ });

// 複数のテストファイルで使用
import { test } from './fixtures/test-fixtures';

test('test 1', async ({ authenticatedPage }) => { /* ... */ });
test('test 2', async ({ authenticatedPage }) => { /* ... */ });
test('test 3', async ({ authenticatedPage }) => { /* ... */ });
```

## Fixturesとデータドリブンテストの組み合わせ

### Scenario Outline + Fixtures = ベストプラクティス

**Scenario Outline**: テストデータのバリエーションを扱う
**Fixtures**: セットアップと依存性注入を扱う

### 例: カートテスト

**Feature File:**
```gherkin
@cart @fixtures
Feature: カートに追加機能（Fixtures活用）

  @positive
  Scenario Outline: 商品をカートに追加して内容を確認
    When "<商品名>"をカートに追加する
    Then カートに商品が<個数>件ある
    And "<商品名>"の価格が正しい

    Examples:
      | 商品名         | 個数 |
      | スマートフォン  | 1    |
      | ノートパソコン  | 1    |
      | Tシャツ        | 1    |
```

**Fixtures定義:**
```typescript
// fixtures/test-fixtures.ts
import { test as base } from '@playwright/test';
import { CartComponent } from '../pages/components/CartComponent';
import { CatalogPage } from '../pages/CatalogPage';
import { ProductData } from './test-data';

type TestFixtures = {
  authenticatedPage: Page;
  cartComponent: CartComponent;
  catalogPage: CatalogPage;
  productData: typeof ProductData;
};

export const test = base.extend<TestFixtures>({
  authenticatedPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await page.goto('https://example.com');
    await loginPage.login('demo', 'Demo@2025!');
    await use(page);
  },

  cartComponent: async ({ authenticatedPage }, use) => {
    await use(new CartComponent(authenticatedPage));
  },

  catalogPage: async ({ authenticatedPage }, use) => {
    await use(new CatalogPage(authenticatedPage));
  },

  productData: async ({}, use) => {
    await use(ProductData);
  },
});
```

**Step定義:**
```typescript
import { createBdd } from 'playwright-bdd';
import { test, expect } from '../fixtures/test-fixtures';

const { When, Then } = createBdd(test);

When('{string}をカートに追加する', async ({ catalogPage }, productName: string) => {
  await catalogPage.addToCart(productName);
});

Then('カートに商品が{int}件ある', async ({ cartComponent }, count: number) => {
  expect(await cartComponent.getItemCount()).toBe(count);
});

Then('{string}の価格が正しい', async ({ cartComponent, productData }, productName: string) => {
  const expectedPrice = Object.values(productData)
    .find(p => p.name === productName)?.price;
  const actualPrice = await cartComponent.getItemPrice(productName);
  expect(actualPrice).toBe(expectedPrice);
});
```

## 効果の比較

### Fixtureなし

```typescript
// 各Stepで繰り返しコード
Then('価格を検証', async ({ page }, productName, price) => {
  const cart = new CartComponent(page); // 毎回生成
  expect(await cart.getItemPrice(productName)).toBe(price);
});

Then('合計を検証', async ({ page }, total) => {
  const cart = new CartComponent(page); // また生成
  expect(await cart.getTotal()).toBe(total);
});
```

**課題:**
- Page Objectの重複インスタンス化
- テストデータのハードコード
- ログイン処理の重複

### Fixture使用

```typescript
// クリーンで再利用可能なコード
Then('価格を検証', async ({ cartComponent, productData }, productName) => {
  const expected = productData.find(p => p.name === productName).price;
  expect(await cartComponent.getItemPrice(productName)).toBe(expected);
});

Then('合計を検証', async ({ cartComponent }, total) => {
  expect(await cartComponent.getTotal()).toBe(total);
});
```

**利点:**
- ✅ Page Objectインスタンスは1つ
- ✅ テストデータの一元管理
- ✅ 自動ログイン
- ✅ 型安全
- ✅ 保守性が高い

## Fixturesを使うべきケース

| シナリオ | Fixtureなし | Fixture使用 |
|----------|-----------|-----------|
| **ログインが必要** | 毎回ログイン処理を書く | `authenticatedPage` fixtureで自動ログイン |
| **Page Objects** | 毎回 `new XxxPage(page)` | `xxxPage` fixtureで自動提供 |
| **テストデータ** | ハードコードorインポート | `testData` fixtureで提供 |
| **複数Step** | オブジェクトを繰り返し生成 | 1回生成、複数Stepで共有 |

## ベストプラクティス

1. **Fixtureを分離定義**: `fixtures/test-fixtures.ts` を作成して再利用性を高める
2. **型安全なデータ**: TypeScriptの型をテストデータに使用
3. **Fixture命名**: 分かりやすい名前を使う（例: `authenticatedPage`, `cartComponent`）
4. **Scenario Outlineと併用**: 両方使用して保守性を最大化
5. **テストデータの一元化**: 商品データ、ユーザー認証情報をFixtureで定義

## まとめ

### Fixtureの利点
- ✅ **セットアップ簡素化**: ログイン処理を1箇所に集約
- ✅ **Page Object自動提供**: 毎回 `new` する必要なし
- ✅ **型安全性**: IntelliSenseサポート
- ✅ **保守性向上**: 変更箇所が最小化
- ✅ **再利用性**: 全テストでFixtureを共有

### 組み合わせの力
🎯 **データドリブンテスト × 依存性注入 = 最適なテスト構成**

- **Scenario Outline**: テストデータのバリエーション
- **Fixtures**: 共通セットアップの自動化
- **両方の使用**: 保守性・可読性・再利用性を最大化

## 参考リンク

- [Playwright Fixtures公式ドキュメント](https://playwright.dev/docs/test-fixtures)
- [高度なFixtures](https://playwright.dev/docs/test-advanced)
