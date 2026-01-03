

@catalog @product-list
Feature: 商品一覧機能

  商品カタログが正しく表示されることを確認する

  Background:
    Given ShopTodoのホームページを開く

  @positive
  Scenario: 商品一覧が表示される
    Then 商品が1件以上表示される
    And 商品カテゴリのタブが表示される

  @positive
  Scenario Outline: カテゴリでフィルタリングできる
    When "<カテゴリ>"タブをクリックする
    Then 商品が1件以上表示される

    Examples:
      | カテゴリ   |
      | 電子機器   |
      | 衣類       |
      | 書籍       |
      | ホーム     |

  @positive
  Scenario: 価格順でソートできる
    When "価格（安い順）"でソートする
    Then 商品が価格の安い順に並ぶ
