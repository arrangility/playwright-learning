# getByRole()が使えないケースと対処法

## 1. 非セマンティックな要素

```html
<!-- ❌ ロールなし - getByRole不可 -->
<div class="btn" onclick="submit()">送信</div>
<span class="link" onclick="navigate()">詳細へ</span>

<!-- ✅ 正しい実装 -->
<button type="submit">送信</button>
<a href="/detail">詳細へ</a>
```

## 2. カスタムコンポーネント（role属性なし）

```html
<!-- ❌ カスタムドロップダウン -->
<div class="dropdown">
  <div class="dropdown-trigger">選択してください</div>
  <div class="dropdown-menu">
    <div class="dropdown-item">オプション1</div>
    <div class="dropdown-item">オプション2</div>
  </div>
</div>

<!-- ✅ ARIA属性付き -->
<div role="combobox" aria-expanded="false">
  <div role="option">オプション1</div>
  <div role="option">オプション2</div>
</div>
```

## 3. アイコンのみのボタン（ラベルなし）

```html
<!-- ❌ 識別不可 -->
<button><svg class="icon-search"></svg></button>
<button><i class="fa fa-edit"></i></button>

<!-- ✅ aria-label付き -->
<button aria-label="検索"><svg class="icon-search"></svg></button>
<button aria-label="編集"><i class="fa fa-edit"></i></button>
```

## 4. 同じロール・名前が複数

```html
<!-- ❌ どの「詳細」か区別不可 -->
<article>
  <h3>商品A</h3>
  <a href="/a">詳細</a>
</article>
<article>
  <h3>商品B</h3>
  <a href="/b">詳細</a>  <!-- 同じ名前 -->
</article>
```

### 対処法

```typescript
// 方法1: 親要素で絞り込む
page.getByRole('article').filter({ hasText: '商品A' })
    .getByRole('link', { name: '詳細' })

// 方法2: data-testid使用
page.getByTestId('product-a-detail')
```

## 5. 動的に生成されるコンテンツ

```html
<!-- ❌ ローディング中は要素なし -->
<div id="results"></div>

<!-- JavaScript後 -->
<div id="results">
  <div class="item">結果1</div>  <!-- role/labelなし -->
</div>
```

## 6. Canvas/SVG内の要素

```html
<!-- ❌ Canvas内部はDOMではない -->
<canvas id="chart"></canvas>

<!-- ❌ SVG内部はロール認識されにくい -->
<svg>
  <rect class="bar" onclick="showDetail()"></rect>
</svg>
```

## まとめ表

| パターン | 問題 | 解決策 |
|----------|------|--------|
| `<div>`ボタン | ロールなし | `<button>`使用 or `role="button"` |
| アイコンのみ | 名前なし | `aria-label`追加 |
| 同名要素複数 | 識別不可 | 親で絞り込み or `data-testid` |
| カスタムUI | ロールなし | `role`属性追加 |
| Canvas/SVG | DOM外 | `data-testid` or 代替テキスト |

## 開発チームへの依頼ポイント

1. **セマンティックHTML使用** - `<button>`, `<a>`, `<nav>`等
2. **アイコンボタンにはaria-label** - スクリーンリーダー対応
3. **複雑なUIにはrole属性** - カスタムコンポーネント対応
4. **最終手段としてdata-testid** - テスト専用属性

## Playwrightロケーター優先順位

| 優先度 | ロケーター | 用途 |
|--------|-----------|------|
| 1 | `getByRole()` | ボタン、リンク、見出し等 |
| 2 | `getByLabel()` | フォーム入力フィールド |
| 3 | `getByPlaceholder()` | プレースホルダーテキスト |
| 4 | `getByText()` | 表示テキストで特定 |
| 5 | `getByTestId()` | data-testid属性 |
| 最終手段 | `locator()` | CSS/XPathセレクタ |

## 参考リンク

- [Playwright Locators](https://playwright.dev/docs/locators)
- [WAI-ARIA Roles](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles)
- [Semantic HTML](https://developer.mozilla.org/en-US/docs/Glossary/Semantics#semantics_in_html)
