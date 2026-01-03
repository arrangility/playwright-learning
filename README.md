# Playwright E2E Testing Learning

Playwright MCPとARIA Snapshotについて学習した内容と、E2Eテストのサンプルコードです。

## ARIA Snapshotとは

ブラウザのアクセシビリティツリーをYAML形式で表現したものです。

### 特徴

| 特性 | 説明 |
|------|------|
| 決定論的 | 同じページなら常に同じ構造を返す |
| トークン効率 | スクリーンショット比で70-80%削減 |
| 軽量 | テキストベースで処理が軽い |
| 意味的 | role、name、stateが明確 |

### Snapshotの例

```yaml
- navigation "Main":
  - link "Logo":
    - /url: /
    - img "Logo"
  - list:
    - listitem:
      - link "Home":
        - /url: /
    - listitem: Services
    - listitem:
      - link "Blog":
        - /url: /blog
```

### 従来のセレクタとの比較

```typescript
// 従来: CSSセレクタ（脆弱）
await page.click('.nav-menu > li:nth-child(3) > a');

// ロールベース（推奨）
await page.getByRole('link', { name: 'Blog' }).click();

// ARIA Snapshot: 構造全体を検証
await expect(nav).toMatchAriaSnapshot(`...`);
```

## ディレクトリ構成

```
learning/
├── README.md
├── typescript/           # TypeScript版テスト
│   ├── blog.spec.ts
│   ├── playwright.config.ts
│   └── package.json
└── java/                 # Java版テスト
    ├── pom.xml
    └── src/test/java/com/example/
        └── BlogTest.java
```

## テスト内容

両バージョンとも同じテストシナリオを実装しています：

1. **ホームページからBlogページに遷移できること**
   - ホームページを開く
   - Blogリンクをクリック
   - Blogページが表示されることを確認

2. **Blogページにブログ記事一覧が表示されること**
   - ブログ記事へのリンクが存在することを確認

3. **ナビゲーションの構造を検証**
   - TypeScript: `toMatchAriaSnapshot()` でARIA Snapshot検証
   - Java: ナビゲーション内のBlogリンクの存在確認

## TypeScript版

### セットアップ

```bash
cd typescript
npm install
npx playwright install
```

### テスト実行

```bash
# 全テスト実行
npm test

# ブラウザを表示して実行
npm run test:headed

# UIモードで実行
npm run test:ui

# レポート表示
npm run report
```

### コード例

```typescript
import { test, expect } from '@playwright/test';

test('Blogページに遷移できること', async ({ page }) => {
  await page.goto('https://www.arrangility.com/');

  // ロールベースのロケータ
  const blogLink = page.getByRole('link', { name: 'Blog' }).first();
  await blogLink.click();

  // アサーション
  await expect(page).toHaveURL(/\/blog/);
  await expect(page).toHaveTitle(/Blog/);
});

test('ナビゲーション構造をARIA Snapshotで検証', async ({ page }) => {
  await page.goto('https://www.arrangility.com/');

  const nav = page.getByRole('navigation', { name: 'Main' });

  await expect(nav).toMatchAriaSnapshot(`
    - navigation "Main":
      - link "Logo"
      - list:
        - listitem:
          - link "Home"
        - listitem:
          - link "Blog"
  `);
});
```

## Java版

### 前提条件

- Java 17以上
- Maven 3.x

### セットアップ

```bash
cd java
mvn install -DskipTests
```

### テスト実行

```bash
# 全テスト実行
mvn test

# 特定のテストクラスを実行
mvn test -Dtest=BlogTest

# 特定のテストメソッドを実行
mvn test -Dtest=BlogTest#shouldNavigateToBlogPage
```

### コード例

```java
import com.microsoft.playwright.*;
import static com.microsoft.playwright.assertions.PlaywrightAssertions.assertThat;

@Test
void shouldNavigateToBlogPage() {
    page.navigate("https://www.arrangility.com/");

    // ロールベースのロケータ
    Locator blogLink = page.getByRole(AriaRole.LINK,
        new Page.GetByRoleOptions().setName("Blog")).first();
    blogLink.click();

    // アサーション
    assertThat(page).hasURL(Pattern.compile("/blog"));
    assertThat(page).hasTitle(Pattern.compile("Blog"));
}
```

## TypeScript vs Java 比較

| 項目 | TypeScript | Java |
|------|------------|------|
| ロケータ | `page.getByRole('link', { name: 'Blog' })` | `page.getByRole(AriaRole.LINK, new Options().setName("Blog"))` |
| アサーション | `await expect(page).toHaveURL(/blog/)` | `assertThat(page).hasURL(Pattern.compile("/blog"))` |
| ARIA Snapshot | `toMatchAriaSnapshot()` 対応 | 直接サポートなし |
| 実行速度 | 高速（3-4秒） | 初回遅い（ドライバーDL）、2回目以降高速（5-6秒） |

## 参考リンク

- [Playwright公式ドキュメント](https://playwright.dev/)
- [Playwright for Java](https://playwright.dev/java/)
- [Playwright MCP](https://github.com/anthropics/claude-code/blob/main/docs/mcp.md)
- [ARIA Snapshotの解説記事](https://zenn.dev/nossa/articles/8d90efd840934f)
