@advanced @soft-assertion
Feature: Hard AssertionとSoft Assertionの組み合わせ

  前提条件はHard Assertion、詳細検証はSoft Assertionを使用するパターン

  Background:
    Given ShopTodoのホームページを開く

  @combined
  Scenario: ページが表示されてから詳細を検証
    # まずHard Assertionでページの基本的な状態を確認し、
    # その後Soft Assertionで詳細な検証を行います。
    Then ページタイトルが正しい（Hard Assertion）
    And UI要素の詳細を検証する（Soft Assertions）:
      | 要素           |
      | ログインボタン |
      | 検索ボックス   |
      | カテゴリタブ   |

  @combined
  Scenario: 商品の存在確認後に詳細検証
    # 商品が存在することをHard Assertionで確認してから、
    # 各商品の詳細をSoft Assertionで検証します。
    Then 商品が1つ以上存在する（Hard Assertion）
    And 各商品の構造を検証する（Soft Assertions）
