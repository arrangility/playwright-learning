@advanced @soft-assertion
Feature: ループ内でのSoft Assertions

  繰り返し処理の中でSoft Assertionを使用するパターン

  Background:
    Given ShopTodoのホームページを開く

  @loop
  Scenario: 各商品カードが正しい構造を持つ
    # すべての商品カードをループで検証します。
    # 一部の商品カードに問題があっても、
    # すべてのカードの検証が完了します。
    Then すべての商品カードの構造を検証する

  @loop
  Scenario: カテゴリごとの商品数を検証
    # 各カテゴリに商品が存在することを検証します。
    Then 以下のカテゴリに商品が存在する:
      | カテゴリ |
      | 電子機器 |
      | 衣類     |
      | 書籍     |
      | ホーム   |
