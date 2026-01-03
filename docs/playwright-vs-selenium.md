# Playwright vs Selenium 比較

## ロケーター

| 機能 | Playwright | Selenium |
|------|------------|----------|
| `getByRole()` | ✅ 組み込み | ❌ なし |
| `getByLabel()` | ✅ 組み込み | ❌ なし |
| `getByText()` | ✅ 組み込み | ⚠️ XPathで代用 |
| CSSセレクタ | ✅ | ✅ |
| XPath | ✅ | ✅ |
| data-testid | ✅ `getByTestId()` | ⚠️ CSS/XPathで |

## コード比較: ボタンクリック

### Playwright

```java
page.getByRole(AriaRole.BUTTON, new Page.GetByRoleOptions().setName("送信"));
```

### Selenium - XPathで代用

```java
driver.findElement(By.xpath("//button[text()='送信']"));
driver.findElement(By.xpath("//*[@role='button' and text()='送信']"));
```

## ARIA Snapshot

| 機能 | Playwright | Selenium |
|------|------------|----------|
| ARIA Snapshot取得 | ✅ `ariaSnapshot()` | ❌ なし |
| Snapshot検証 | ✅ `matchesAriaSnapshot()` | ❌ なし |
| アクセシビリティツリー | ✅ 組み込み | ❌ なし |

## その他の機能比較

| 機能 | Playwright | Selenium |
|------|------------|----------|
| 自動待機 | ✅ 組み込み | ❌ 明示的に書く |
| ネットワーク制御 | ✅ 簡単 | ⚠️ 複雑 |
| 複数タブ操作 | ✅ 簡単 | ⚠️ 複雑 |
| スクリーンショット | ✅ | ✅ |
| 並列実行 | ✅ 組み込み | ⚠️ Grid必要 |
| ブラウザインストール | ✅ 自動 | ❌ 手動 |

## 待機処理の違い

### Playwright - 自動待機

```java
page.getByRole(AriaRole.BUTTON, opts.setName("送信")).click();
```

### Selenium - 明示的な待機が必要

```java
WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
WebElement button = wait.until(
    ExpectedConditions.elementToBeClickable(By.xpath("//button[text()='送信']"))
);
button.click();
```

## 総合比較

| 観点 | Playwright | Selenium |
|------|------------|----------|
| ロールベーステスト | ◎ | △ |
| ARIA Snapshot | ◎ | ✗ |
| 開発体験 | ◎ | ○ |
| 学習コスト | 低い | 高い |
| 歴史・実績 | 新しい (2020~) | 長い (2004~) |
| 企業採用率 | 増加中 | 高い |

## 選択の指針

### Seleniumを選ぶ理由

- 既存資産が大量にある
- チームがSeleniumに慣れている
- 古いブラウザ対応が必要

### Playwrightを選ぶ理由

- 新規プロジェクト
- アクセシビリティ重視
- モダンな開発体験

## 参考リンク

- [Playwright公式](https://playwright.dev/)
- [Selenium公式](https://www.selenium.dev/)
- [Playwright vs Selenium (公式比較)](https://playwright.dev/docs/selenium)
