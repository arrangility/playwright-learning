@advanced @soft-assertion
Feature: 非同期操作後のSoft Assertions

  状態変化を伴う操作後の検証パターン

  Background:
    Given ShopTodoのホームページを開く

  @async
  Scenario: カート追加後の状態変化を検証
    # 商品をカートに追加した後、
    # UIの状態変化をSoft Assertionで検証します。
    When 商品「スマートフォン」をカートに追加する
    Then カートの状態を検証する（Soft Assertions）:
      | 検証項目         | 期待値 |
      | カートが空でない | true   |
      | 合計金額が正     | true   |

  @async
  Scenario: 検索後の結果を検証
    # 検索実行後、結果をSoft Assertionで検証します。
    When 「スマート」で商品を検索する
    Then 検索結果を検証する（Soft Assertions）
