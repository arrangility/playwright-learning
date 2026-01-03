# Java BDD + Page Object Model

Cucumber + Playwright Java を使用した BDD テストパッケージ。

## 技術スタック

| 項目 | 技術 | バージョン |
|------|------|------------|
| テストフレームワーク | Cucumber | 7.14.0 |
| ブラウザ自動化 | Playwright Java | 1.49.0 |
| テスト実行 | JUnit 5 | 5.10.1 |
| アサーション | AssertJ | 3.24.2 |
| Java | OpenJDK | 17+ |
| ビルド | Maven | 3.x |

## ディレクトリ構成

```
src/test/
├── java/com/example/
│   ├── hooks/
│   │   └── BrowserHooks.java       # Playwright setup/teardown
│   ├── pages/
│   │   ├── BasePage.java
│   │   ├── LoginPage.java
│   │   ├── RegisterPage.java
│   │   ├── CatalogPage.java
│   │   └── components/
│   │       ├── HeaderComponent.java
│   │       └── CartComponent.java
│   ├── steps/
│   │   ├── AuthSteps.java
│   │   ├── CatalogSteps.java
│   │   ├── CartSteps.java
│   │   └── CommonSteps.java
│   └── runner/
│       └── CucumberTestRunner.java
└── resources/
    ├── features/
    │   ├── auth/
    │   │   ├── login.feature
    │   │   └── register.feature
    │   ├── catalog/
    │   │   ├── product-list.feature
    │   │   └── search.feature
    │   ├── cart/
    │   │   ├── add-to-cart.feature
    │   │   └── cart-management.feature
    │   └── common/
    │       └── language.feature
    └── cucumber.properties
```

## テスト実行

```bash
# 全テスト実行
mvn test

# 特定のタグで実行
mvn test -Dcucumber.filter.tags="@auth"
mvn test -Dcucumber.filter.tags="@cart"
mvn test -Dcucumber.filter.tags="@catalog"

# スキップタグを除外して実行
mvn test -Dcucumber.filter.tags="not @skip"
```

## テストシナリオ（23件）

### 認証 (auth) - 6シナリオ
- ログイン成功/失敗
- ログアウト
- ユーザー登録

### カタログ (catalog) - 7シナリオ
- 商品一覧表示
- カテゴリフィルタリング
- 価格ソート
- 商品検索

### カート (cart) - 6シナリオ
- カートへの追加/削除
- 合計金額計算
- チェックアウト

### 共通 (common) - 2シナリオ
- 言語切り替え（日/英）

## ts-pom-bdd との比較

| TypeScript | Java |
|------------|------|
| playwright-bdd | Cucumber + Playwright Java |
| `createBdd()` | `@Given/@When/@Then` アノテーション |
| `page` fixture | `BrowserHooks.page` static変数 |
| `async/await` | 同期メソッド |
| `Locator` | `Locator` (同じAPI) |

## レポート

テスト実行後、以下にレポートが生成されます：
- `target/cucumber-reports/cucumber.html` - Cucumber HTMLレポート
- `target/surefire-reports/` - JUnit レポート
