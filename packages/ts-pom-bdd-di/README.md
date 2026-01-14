# ts-pom-bdd-di

BDD (Behavior-Driven Development) + Page Object Model + **Dependency Injection (Fixtures)** を使用した Playwright TypeScript テストサンプル

## 概要

このパッケージは、[ShopTodo](https://toasagi.github.io/shoptodo-app/) E2Eテスト練習用アプリを対象に、**完全DI化された**BDD形式のテストを Page Object Model パターンで実装したサンプルです。

**ts-pom-bddとの違い:**
- ✅ **全てのステップ定義でDI (Fixtures)を使用**
- ✅ **`new XxxPage(page)` のような手動インスタンス化が不要**
- ✅ **テストデータの一元管理 (productData, testData)**
- ✅ **自動ログイン済みページ (authenticatedPage) の提供**
- ✅ **保守性の大幅向上**

## 技術スタック

- **Playwright** - E2Eテストフレームワーク
- **playwright-bdd** - Gherkin記法でテストを記述するためのライブラリ
- **TypeScript** - 型安全なコード記述
- **Page Object Model** - テストコードの保守性向上パターン
- **Fixtures (Dependency Injection)** - 依存性の自動注入

## ディレクトリ構成

```
ts-pom-bdd-di/
├── features/                    # Gherkin Feature ファイル
│   ├── auth/
│   │   ├── login.feature        # ログイン機能テスト
│   │   └── register.feature     # 新規登録機能テスト
│   ├── catalog/
│   │   ├── product-list.feature # 商品一覧テスト
│   │   └── search.feature       # 検索機能テスト
│   ├── cart/
│   │   ├── add-to-cart.feature  # カート追加テスト
│   │   └── cart-management.feature # カート管理テスト
│   ├── common/
│   │   └── language.feature     # 言語切替テスト
│   └── ts-specific/
│       ├── soft-assertions.feature # Soft Assertions
│       └── visual-regression.feature # Visual Regression
├── steps/                       # Step definitions (全てDI化)
│   ├── auth.steps.ts            # 認証関連ステップ
│   ├── catalog.steps.ts         # カタログ関連ステップ
│   ├── cart.steps.ts            # カート関連ステップ
│   ├── common.steps.ts          # 共通ステップ
│   └── ts-specific.steps.ts     # TypeScript固有機能
├── pages/                       # Page Object Models
│   ├── BasePage.ts              # 基底ページクラス
│   ├── LoginPage.ts             # ログインページ
│   ├── RegisterPage.ts          # 新規登録ページ
│   ├── CatalogPage.ts           # カタログページ
│   └── components/
│       ├── HeaderComponent.ts   # ヘッダーコンポーネント
│       └── CartComponent.ts     # カートコンポーネント
├── fixtures/
│   ├── test-fixtures.ts         # 拡張Fixtures定義（9つのFixtures）
│   └── test-data.ts             # テストデータ
├── playwright.config.ts         # Playwright設定
└── package.json
```

## セットアップ

```bash
# 依存関係のインストール
npm install

# ブラウザのインストール
npx playwright install chromium
```

## テスト実行

```bash
# 全テスト実行
npm run test

# ヘッドモードで実行（ブラウザ表示あり）
npm run test:headed

# デバッグモードで実行
npm run test:debug

# テストレポート表示
npm run report

# 特定のタグでフィルタ
npm run test -- --grep "@login"
npm run test -- --grep "@cart"
```

## Dependency Injection (Fixtures) とは

### 9つのFixtures

このパッケージでは、以下の9つのFixturesを提供しています:

| Fixture | 型 | 説明 |
|---------|-----|------|
| `page` | `Page` | 標準のPlaywright Page (playwright-bddから提供) |
| `authenticatedPage` | `Page` | 自動ログイン済みのPage |
| `basePage` | `BasePage` | 基本ページオブジェクト |
| `loginPage` | `LoginPage` | ログインページオブジェクト |
| `registerPage` | `RegisterPage` | 新規登録ページオブジェクト |
| `catalogPage` | `CatalogPage` | カタログページオブジェクト |
| `headerComponent` | `HeaderComponent` | ヘッダーコンポーネント |
| `cartComponent` | `CartComponent` | カートコンポーネント |
| `productData` | `typeof ProductData` | 商品データ (価格情報など) |
| `testData` | `typeof TestData` | テストデータ (ユーザー情報など) |

### Fixturesの定義

```typescript
// fixtures/test-fixtures.ts
export const test = base.extend<TestFixtures>({
  // 自動ログイン済みPage
  authenticatedPage: async ({ page }, use) => {
    await page.goto('https://toasagi.github.io/shoptodo-app/');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForSelector('button:has-text("カートに追加")', { timeout: 10000 });
    await page.getByRole('button', { name: 'ログイン' }).click();

    const loginPage = new LoginPage(page);
    await loginPage.login(TestData.validUser.username, TestData.validUser.password);
    await page.waitForTimeout(500);

    await use(page);
  },

  // Page Objectの自動生成
  catalogPage: async ({ authenticatedPage }, use) => {
    await use(new CatalogPage(authenticatedPage));
  },

  cartComponent: async ({ authenticatedPage }, use) => {
    await use(new CartComponent(authenticatedPage));
  },

  // ... 他のFixtures
});
```

### ステップ定義での使用例

#### 従来の方法 (ts-pom-bdd)

```typescript
// ❌ 手動でインスタンス化が必要
When('ユーザー名{string}とパスワード{string}でログインする',
  async ({ page }, username: string, password: string) => {
  const loginPage = new LoginPage(page);  // 毎回new必要
  await loginPage.login(username, password);
});

When('{string}をカートに追加する',
  async ({ page }, productName: string) => {
  const catalogPage = new CatalogPage(page);  // 毎回new必要
  await catalogPage.addToCart(productName);

  const cartComponent = new CartComponent(page);  // 毎回new必要
  const count = await cartComponent.getItemCount();
});
```

#### DI版の方法 (ts-pom-bdd-di)

```typescript
// ✅ Fixturesで自動注入される
When('ユーザー名{string}とパスワード{string}でログインする',
  async ({ loginPage }, username: string, password: string) => {
  // loginPageが自動で注入される！
  await loginPage.login(username, password);
});

When('{string}をカートに追加する',
  async ({ catalogPage, cartComponent }, productName: string) => {
  // catalogPageとcartComponentが自動で注入される！
  await catalogPage.addToCart(productName);
  const count = await cartComponent.getItemCount();
});
```

### Fixturesの依存関係

```typescript
// catalogPageはauthenticatedPageに依存
catalogPage: async ({ authenticatedPage }, use) => {
  await use(new CatalogPage(authenticatedPage));
},

// cartComponentもauthenticatedPageに依存
cartComponent: async ({ authenticatedPage }, use) => {
  await use(new CartComponent(authenticatedPage));
},
```

これにより、`catalogPage`や`cartComponent`を使用するステップでは、自動的にログイン済みの状態が保証されます。

## テストケース一覧

### 認証機能 (@auth)

| シナリオ | タグ | 説明 |
|----------|------|------|
| 正しい認証情報でログインできる | @login @positive | demo/Demo@2025! でログイン |
| 無効なパスワードでログインに失敗する | @login @negative | 誤ったパスワードでエラー |
| 空のフィールドでログインに失敗する | @login @negative | 空入力でエラー |
| ログアウトできる | @login @positive | ログアウト動作確認 |
| パスワード不一致で登録に失敗する | @register @negative | パスワード確認不一致 |
| 必須フィールド未入力で登録に失敗する | @register @negative | 空フィールドでエラー |

### カタログ機能 (@catalog)

| シナリオ | タグ | 説明 |
|----------|------|------|
| 商品一覧が表示される | @product-list @positive | 商品カード表示確認 |
| カテゴリでフィルタリングできる | @product-list @positive | 電子機器/衣類/書籍/ホーム |
| 価格順でソートできる | @product-list @positive | ソート機能確認 |
| キーワードで商品を検索できる | @search @positive | 検索機能確認 |
| 該当なしの検索結果が表示される | @search @positive | 0件表示確認 |

### カート機能 (@cart)

| シナリオ | タグ | 説明 |
|----------|------|------|
| ログイン後に商品をカートに追加できる | @add-to-cart @positive | カート追加動作 |
| 複数商品をカートに追加できる | @add-to-cart @positive | 複数商品追加 |
| カートの合計が正しく計算される | @add-to-cart @positive | 合計金額確認 |
| 未ログインではカートに追加ボタンが無効である | @add-to-cart @negative | ボタン無効確認 |
| カートから商品を削除できる | @cart-management @positive | 削除動作確認 |
| チェックアウトボタンが有効になる | @cart-management @positive | チェックアウト有効化 |

### 言語切替機能 (@common)

| シナリオ | タグ | 説明 |
|----------|------|------|
| 英語に切り替えられる | @language @positive | EN切替確認 |
| 日本語に切り替えられる | @language @positive | JP切替確認 |

### TypeScript固有機能 (@ts-specific)

| シナリオ | タグ | 説明 |
|----------|------|------|
| 商品カタログ画面のスクリーンショット比較 | @visual-regression @positive | toHaveScreenshot() |
| ログインダイアログのスクリーンショット比較 | @visual-regression @positive | 要素スクリーンショット |
| Soft Assertionsで複数要素を検証 | @soft-assertions @positive | expect.soft() |

## DI化のメリット

### 1. コード量の削減

**変更前 (ts-pom-bdd)**: 37箇所で `new XxxPage(page)` を記述
```typescript
// 40個のステップ定義で毎回newが必要
When('...', async ({ page }) => {
  const catalogPage = new CatalogPage(page);  // 1回目
  await catalogPage.addToCart(...);
});

When('...', async ({ page }) => {
  const catalogPage = new CatalogPage(page);  // 2回目
  await catalogPage.searchProduct(...);
});
// ... 38回繰り返し
```

**変更後 (ts-pom-bdd-di)**: Fixture定義に1回のみ
```typescript
// fixtures/test-fixtures.ts で1回だけ定義
catalogPage: async ({ authenticatedPage }, use) => {
  await use(new CatalogPage(authenticatedPage));
},

// ステップ定義では自動注入
When('...', async ({ catalogPage }) => {
  await catalogPage.addToCart(...);
});
```

### 2. 保守性の向上

Page Object作成方法を変更する場合:
- **変更前**: 37箇所すべてを修正
- **変更後**: Fixture定義の1箇所のみ修正

### 3. テストデータの一元管理

```typescript
// fixtures/test-data.ts
export const ProductData = {
  smartphone: { name: 'スマートフォン', price: 79800 },
  tshirt: { name: 'Tシャツ', price: 2980 },
  // ...
};

// ステップ定義で使用
Then('価格が正しいことを確認する',
  async ({ cartComponent, productData }, productName: string) => {
  const expectedPrice = productData[productName].price;
  const actualPrice = await cartComponent.getItemPrice(productName);
  expect(actualPrice).toBe(expectedPrice);
});
```

### 4. 再利用性の向上

- **変更前**: 同じPage Objectを複数回生成
- **変更後**: Fixtureで1回生成、複数ステップで共有

### 5. 型安全性の確保

```typescript
// IntelliSenseで補完が効く
When('...', async ({ catalogPage, cartComponent, productData }) => {
  // catalogPage. で自動補完
  // cartComponent. で自動補完
  // productData. で自動補完
});
```

## Page Object Model の設計

### ロケーター戦略

- **ロールベースロケーター優先**: `getByRole()` を使用
- **アクセシビリティ属性活用**: `getByLabel()`, `getByPlaceholder()`
- **テキストベースは最終手段**: `getByText()` は必要な場合のみ

### 基本構造

```typescript
// pages/CatalogPage.ts
export class CatalogPage {
  private readonly searchInput: Locator;
  private readonly productCards: Locator;

  constructor(private page: Page) {
    this.searchInput = page.getByPlaceholder('商品を検索...');
    this.productCards = page.getByRole('button', { name: /カートに追加/ });
  }

  async searchProduct(keyword: string) {
    await this.searchInput.fill(keyword);
  }

  async addToCart(productName: string) {
    const productImg = this.page.getByRole('img', { name: productName });
    const card = productImg.locator('..');
    await card.getByRole('button', { name: /カートに追加/i }).click();
  }
}
```

## BDD Gherkin 記法

```gherkin
@cart @add-to-cart
Feature: カートに追加機能

  Background:
    Given ShopTodoのホームページを開く

  @positive
  Scenario: ログイン後に商品をカートに追加できる
    Given ログイン済みである
    When "スマートフォン"をカートに追加する
    Then カートに商品が1件ある
    And カートの合計が0円より大きい
```

## 注意事項

- **デモモード**: バックエンドサーバーがないため、新規登録は動作しません（@skip タグ付き）
- **ログイン情報**: demo / Demo@2025! でデモモードログイン可能
- **テスト実行順序**: `workers: 1` で直列実行（状態共有のため）

## 参考リンク

- [Playwright Fixtures公式ドキュメント](https://playwright.dev/docs/test-fixtures)
- [playwright-bdd](https://vitalets.github.io/playwright-bdd/)
- [ShopTodo デモアプリ](https://toasagi.github.io/shoptodo-app/)
