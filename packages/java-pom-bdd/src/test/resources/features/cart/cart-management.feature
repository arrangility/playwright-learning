

@cart @cart-management
Feature: カート管理機能

  カート内の商品を管理できることを確認する

  Background:
    Given ShopTodoのホームページを開く
    And ログイン済みである
    And "スマートフォン"をカートに追加する

  @positive
  Scenario: カートから商品を削除できる
    When カートから"スマートフォン"を削除する
    Then カートが空である

  @positive
  Scenario: チェックアウトボタンが有効になる
    Then チェックアウトボタンが有効である
