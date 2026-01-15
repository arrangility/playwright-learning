

@catalog @search
Feature: 商品検索機能

  商品を検索できることを確認する

  Background:
    Given ShopTodoのホームページを開く

  @positive
  Scenario: キーワードで商品を検索できる
    When "スマートフォン"で検索する
    Then 検索結果に"スマートフォン"が表示される

  @positive
  Scenario: 該当なしの検索結果が表示される
    When "存在しない商品XYZ123"で検索する
    Then 商品が0件表示される
