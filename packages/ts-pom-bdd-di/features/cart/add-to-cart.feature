

@cart @add-to-cart
Feature: カートに追加機能

  商品をカートに追加できることを確認する

  Background:
    Given ShopTodoのホームページを開く

  @positive
  Scenario: ログイン後に商品をカートに追加できる
    Given ログイン済みである
    When "スマートフォン"をカートに追加する
    Then カートに商品が1件ある
    And カートの合計が0円より大きい

  @positive
  Scenario: 複数商品をカートに追加できる
    Given ログイン済みである
    When "スマートフォン"をカートに追加する
    And "Tシャツ"をカートに追加する
    Then カートに商品が2件ある

  @positive
  Scenario: カートの合計が正しく計算される
    Given ログイン済みである
    When "Tシャツ"をカートに追加する
    Then カートの合計が正しい

  @negative
  Scenario: 未ログインではカートに追加ボタンが無効である
    Then "スマートフォン"のカートに追加ボタンが無効である
