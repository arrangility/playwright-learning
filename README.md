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
    └── java-basic/          # Java基本テスト
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

### Java

```bash
cd packages/java-basic
mvn test
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

### java-basic
- Java + JUnit5によるテスト
- Maven構成
- ARIA Snapshot検証（v1.49+）

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
