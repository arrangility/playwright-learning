# ts-pom-bdd

BDD (Behavior-Driven Development) + Page Object Model を使用した Playwright TypeScript テストサンプル

## 概要

このパッケージは、[ShopTodo](https://toasagi.github.io/shoptodo-app/) E2Eテスト練習用アプリを対象に、BDD形式のテストを Page Object Model パターンで実装したサンプルです。

## 技術スタック

- **Playwright** - E2Eテストフレームワーク
- **playwright-bdd** - Gherkin記法でテストを記述するためのライブラリ
- **TypeScript** - 型安全なコード記述
- **Page Object Model** - テストコードの保守性向上パターン

## ディレクトリ構成

```
ts-pom-bdd/
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
│   └── common/
│       └── language.feature     # 言語切替テスト
├── steps/                       # Step definitions
│   ├── auth.steps.ts            # 認証関連ステップ
│   ├── catalog.steps.ts         # カタログ関連ステップ
│   ├── cart.steps.ts            # カート関連ステップ
│   └── common.steps.ts          # 共通ステップ
├── pages/                       # Page Object Models
│   ├── BasePage.ts              # 基底ページクラス
│   ├── LoginPage.ts             # ログインページ
│   ├── RegisterPage.ts          # 新規登録ページ
│   ├── CatalogPage.ts           # カタログページ
│   └── components/
│       ├── HeaderComponent.ts   # ヘッダーコンポーネント
│       └── CartComponent.ts     # カートコンポーネント
├── fixtures/
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

# 特定のタグでフィルタ
npm run test -- --grep "@login"
npm run test -- --grep "@cart"
```

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

## Page Object Model の設計

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

### ロケーター戦略

- **ロールベースロケーター優先**: `getByRole()` を使用
- **アクセシビリティ属性活用**: `getByLabel()`, `getByPlaceholder()`
- **テキストベースは最終手段**: `getByText()` は必要な場合のみ

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
