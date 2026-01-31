@basic @soft-assertion
Feature: 単一のSoft Assertion

  Soft Assertionの基本的な使い方を示す

  Background:
    Given ShopTodoのホームページを開く

  @single
  Scenario: 単一のSoft Assertionが成功する
    # expect.soft() を使用すると、アサーションが失敗しても
    # テストは継続して実行されます。
    # この例では成功するケースを示します。
    Then ヘッダーが表示されている（Soft Assertion）
    And フッターが表示されている（Soft Assertion）

  @single
  Scenario: Soft Assertionで複数の要素を順番に検証する
    # 複数のSoft Assertionを順番に実行し、
    # すべての検証結果を最後にまとめて報告します。
    Then 以下の要素が順番に表示される（Soft Assertions）:
      | 要素           |
      | ヘッダー       |
      | 商品カタログ   |
      | カートセクション |
