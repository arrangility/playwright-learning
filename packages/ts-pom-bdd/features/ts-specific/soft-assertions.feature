@ts-specific @soft-assertions
Feature: Soft Assertionsテスト
  TypeScript専用のSoft Assertions機能（expect.soft）を検証する
  通常のexpectと異なり、失敗しても後続の検証を続行し、最後にまとめて報告する

  Background:
    Given ShopTodoのホームページを開く

  @positive
  Scenario: 複数要素を一括検証（すべて成功）
    Then 以下の要素がすべて正しく表示される（Soft Assertions）
      | 要素 |
      | ヘッダー |
      | 商品カタログ |
      | カテゴリタブ |
      | 検索ボックス |

  @positive
  Scenario: ログイン後の複数要素を一括検証
    Given ログイン済みである
    Then ログイン後の以下の要素がすべて正しく表示される（Soft Assertions）
      | 要素 |
      | ログアウトボタン |
      | カート |
      | 商品一覧 |

  @positive
  Scenario: 商品カード内の複数要素を検証
    Then 商品カードに以下の要素が含まれる（Soft Assertions）
      | 要素 |
      | 商品画像 |
      | 商品名 |
      | 価格 |
      | カートに追加ボタン |
