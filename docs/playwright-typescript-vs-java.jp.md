# Playwright: TypeScript vs Java 比較

## 1. ARIA Snapshot関連

| 機能 | TypeScript | Java |
|------|------------|------|
| `matchesAriaSnapshot()` | ✅ | ✅ (v1.49+) |
| `ariaSnapshot()` 取得 | ✅ | ✅ (v1.49+) |
| スナップショット自動更新 | ✅ `--update-snapshots` | ❌ 手動更新のみ |
| スナップショットファイル管理 | ✅ `.snap`ファイル自動生成 | ❌ なし |

## 2. テスト機能

| 機能 | TypeScript | Java |
|------|------------|------|
| 組み込みテストランナー | ✅ `@playwright/test` | ❌ JUnit/TestNG使用 |
| 並列実行 | ✅ 組み込み | ⚠️ JUnit設定必要 |
| リトライ機能 | ✅ 組み込み | ❌ 別途実装 |
| HTMLレポート | ✅ 組み込み | ❌ Allure等が必要 |
| トレース収集 | ✅ 簡単設定 | ✅ 可能だが設定複雑 |
| スクリーンショット自動保存 | ✅ 組み込み | ⚠️ 手動実装 |

## 3. API機能 (両方で利用可能)

| 機能 | TypeScript | Java |
|------|------------|------|
| ロールベースロケーター | ✅ | ✅ |
| 自動待機 (Auto-wait) | ✅ | ✅ |
| ネットワークインターセプト | ✅ | ✅ |
| モバイルエミュレーション | ✅ | ✅ |
| PDF生成 | ✅ | ✅ |
| ビデオ録画 | ✅ | ✅ |
| 複数ブラウザ対応 | ✅ | ✅ |

## 4. コード例の違い

### フィクスチャ/セットアップ

**TypeScript** - 自動的にpage, browser, contextが提供される:
```typescript
test('example', async ({ page }) => {
  await page.goto('https://example.com');
});
```

**Java** - 手動でセットアップが必要:
```java
@BeforeAll
void setupAll() {
    playwright = Playwright.create();
    browser = playwright.chromium().launch();
}

@BeforeEach
void setup() {
    context = browser.newContext();
    page = context.newPage();
}
```

### 設定ファイル

**TypeScript** (`playwright.config.ts`):
```typescript
export default defineConfig({
  retries: 2,
  reporter: [['html'], ['junit']],
  use: { trace: 'on-first-retry' },
});
```

**Java**: 設定ファイルなし、コードで設定

### ARIA Snapshotアサーション

**TypeScript**:
```typescript
await expect(nav).toMatchAriaSnapshot(`
  - navigation "Main":
    - link "Home"
    - link "Blog"
`);
```

**Java**:
```java
assertThat(nav).matchesAriaSnapshot("""
    - navigation "Main":
      - link "Home"
      - link "Blog"
    """);
```

## 5. TypeScriptのみの機能

- **Component Testing**: React/Vue等のコンポーネントテスト
- **UI Mode**: インタラクティブなデバッグUI (`npx playwright test --ui`)
- **Codegen**: テストコード自動生成 (`npx playwright codegen`)
- **Test Generator拡張**: VS Code拡張でのテスト記録

## 6. 開発体験

| 項目 | TypeScript | Java |
|------|------------|------|
| 公式ドキュメント | ◎ 最も充実 | ○ 基本的 |
| 新機能リリース | 最速 | 1-2週間遅れ |
| コミュニティ | 大きい | 小さい |
| IDE補完 | ◎ VS Code最適化 | ○ IntelliJ対応 |

## 7. 選択の指針

### TypeScriptを選ぶべき場合

- フロントエンド開発チーム
- 最新機能をすぐに使いたい
- 組み込みレポート・リトライが必要
- テストの自動生成・デバッグUIを活用したい

### Javaを選ぶべき場合

- バックエンドがJavaのプロジェクト
- 既存のJUnit/TestNG資産がある
- CI/CDがMaven/Gradle前提
- 企業の技術スタック制約

## 参考リンク

- [Playwright公式ドキュメント (TypeScript)](https://playwright.dev/)
- [Playwright Java API](https://playwright.dev/java/)
- [ARIA Snapshot (TypeScript)](https://playwright.dev/docs/aria-snapshots)
- [ARIA Snapshot (Java)](https://playwright.dev/java/docs/aria-snapshots)
