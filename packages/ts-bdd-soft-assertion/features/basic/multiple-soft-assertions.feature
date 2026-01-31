@basic @soft-assertion
Feature: 複数のSoft Assertions

  複数の要素を一度に検証するパターンを示す

  Background:
    Given ShopTodoのホームページを開く

  @multiple
  Scenario: 複数のSoft Assertionsがすべて成功
    # DataTableを使用して複数の要素を一度に検証します。
    # すべてのアサーションが実行され、失敗があれば
    # 最後にまとめて報告されます。
    Then 以下のUI要素がすべて表示される（Soft Assertions）:
      | 要素名         | セレクタタイプ |
      | ログインボタン | role-button    |
      | 検索フィールド | placeholder    |
      | カテゴリタブ   | role-tablist   |

  @multiple
  Scenario: 商品カードの要素を複数検証する
    # 各商品カードに必要な要素が含まれているか検証します。
    Then 最初の商品カードに以下の要素が含まれる（Soft Assertions）:
      | 要素               |
      | 商品画像           |
      | 商品名             |
      | 価格               |
      | カートに追加ボタン |
