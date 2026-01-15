# Playwright Learning

Playwright E2Eテストのサンプル集（TypeScript & Java）

## プロジェクト構成

```
playwright-learning/
├── docs/                    # ドキュメント
│   ├── playwright-typescript-vs-java.md
│   ├── playwright-vs-selenium.md
│   └── getbyrole-limitations.md
└── packages/
    ├── ts-basic/            # TypeScript基本テスト
    ├── ts-bdd/              # TypeScript BDDテスト
    ├── ts-pom-bdd/          # TypeScript BDD + Page Object Model
    ├── ts-pom-bdd-di/       # TypeScript BDD + POM + 依存性注入（Fixtures）
    ├── ts-api/              # TypeScript APIテスト（REST & GraphQL）
    ├── java-basic/          # Java基本テスト
    └── java-pom-bdd/        # Java BDD + Page Object Model
```

## セットアップ

```bash
# 依存関係インストール（TypeScript全体）
npm install

# Playwrightブラウザインストール
npx playwright install
```

## テスト実行

### TypeScript - 基本テスト

```bash
cd packages/ts-basic
npx playwright test
```

### TypeScript - BDDテスト

```bash
cd packages/ts-bdd
npm install
npm run test
```

### TypeScript - BDD + Page Object Model

```bash
cd packages/ts-pom-bdd
npm install
npm run test
```

### TypeScript - BDD + POM + 依存性注入

```bash
cd packages/ts-pom-bdd-di
npm install
npm run test
```

### TypeScript - APIテスト

```bash
cd packages/ts-api
npm install
npm test
```

### Java - 基本テスト

```bash
cd packages/java-basic
mvn test
```

### Java - BDD + Page Object Model

```bash
cd packages/java-pom-bdd
mvn test
```

## テストレポートの確認

### TypeScriptパッケージ（HTMLレポーター）

テスト実行後、HTMLレポートを開く：

```bash
# デフォルトブラウザでレポートを開く
npx playwright show-report

# レポート出力先: playwright-report/index.html
```

### Javaパッケージ（Surefireレポート）

テスト結果は `target/surefire-reports/` に出力される：

```bash
# テスト結果を確認
cat target/surefire-reports/*.txt

# HTMLレポート生成（オプション）
mvn surefire-report:report
# レポート出力先: target/site/surefire-report.html
```

## 各パッケージの説明

### ts-basic
- 基本的なPlaywrightテスト
- ロールベースロケーター使用
- ARIA Snapshot検証

### ts-bdd
- BDD形式のテスト（Gherkin記法）
- playwright-bdd使用
- Feature/Stepファイル構成

### ts-pom-bdd
- BDD + Page Object Model パターン
- [ShopTodo](https://toasagi.github.io/shoptodo-app/)を対象とした実践的サンプル
- ステップ定義内で手動でPage Objectをインスタンス化
- 29シナリオ（ログイン、新規登録、カタログ、カート、言語切替、TypeScript固有機能）
- 詳細は [ts-pom-bdd/README.md](packages/ts-pom-bdd/README.md) を参照

### ts-pom-bdd-di
- BDD + Page Object Model + **依存性注入（Fixtures）**
- 完全DI実装 - 全ステップ定義でFixturesを使用
- **9つのカスタムFixtures**: Page Objects、Components、Test Dataを自動注入
- **40ステップ定義メソッド**: `new XxxPage(page)` のような手動インスタンス化なし
- ts-pom-bddと同じテスト対象: [ShopTodo](https://toasagi.github.io/shoptodo-app/)
- 29シナリオ（28成功、1スキップ：想定通り）
- **主なメリット**: ボイラープレート削減、保守性向上、テストデータの一元管理
- 詳細は [ts-pom-bdd-di/README.md](packages/ts-pom-bdd-di/README.md) を参照

### ts-api
- REST API テスト（JSONPlaceholder使用）
- GraphQL テスト（Countries API使用）
- Playwright request コンテキスト使用
- 27テストケース
- 詳細は [ts-api/README.md](packages/ts-api/README.md) を参照

### java-basic
- Java + JUnit5によるテスト
- Maven構成
- ARIA Snapshot検証（v1.49+）

### java-pom-bdd
- Cucumber + Playwright Java によるBDDテスト
- Page Object Model パターン
- [ShopTodo](https://toasagi.github.io/shoptodo-app/)を対象（ts-pom-bddと同じ）
- 23シナリオ（ログイン、カタログ、カート、言語切替）
- 詳細は [java-pom-bdd/README.md](packages/java-pom-bdd/README.md) を参照

## ARIA Snapshotとは

ブラウザのアクセシビリティツリーをYAML形式で表現したものです。

### 特徴

| 特性 | 説明 |
|------|------|
| 決定論的 | 同じページなら常に同じ構造を返す |
| トークン効率 | スクリーンショット比で70-80%削減 |
| 軽量 | テキストベースで処理が軽い |
| 意味的 | role、name、stateが明確 |

### 従来のセレクタとの比較

```typescript
// 従来: CSSセレクタ（脆弱）
await page.click('.nav-menu > li:nth-child(3) > a');

// ロールベース（推奨）
await page.getByRole('link', { name: 'Blog' }).click();

// ARIA Snapshot: 構造全体を検証
await expect(nav).toMatchAriaSnapshot(`...`);
```

## ドキュメント

- [TypeScript vs Java比較](docs/playwright-typescript-vs-java.md)
- [Playwright vs Selenium比較](docs/playwright-vs-selenium.md)
- [getByRole()の制限と対処法](docs/getbyrole-limitations.md)

## 参考リンク

- [Playwright公式ドキュメント](https://playwright.dev/)
- [Playwright for Java](https://playwright.dev/java/)
- [playwright-bdd](https://github.com/vitalets/playwright-bdd)
- [ARIA Snapshotの解説記事](https://zenn.dev/nossa/articles/8d90efd840934f)
