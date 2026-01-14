@cart @fixtures @data-driven
Feature: カートに追加機能（Fixtures活用）

  Fixturesを活用したデータドリブンテスト
  - authenticatedPage: 自動ログイン（Backgroundで明示不要）
  - cartComponent/catalogPage: Page Object自動生成
  - productData: 商品データ一元管理

  @positive
  Scenario Outline: 商品をカートに追加して内容が正しいことを確認
    When Fixturesで"<商品名>"をカートに追加する
    Then Fixturesでカートに商品が<個数>件あることを確認する

    Examples:
      | 商品名             | 個数 |
      | スマートフォン      | 1    |
      | ノートパソコン      | 1    |
      | Tシャツ            | 1    |
      | ジーンズ           | 1    |
      | プログラミング入門書 | 1    |

  @positive
  Scenario Outline: 複数商品をカートに追加
    When Fixturesで"<商品1>"をカートに追加する
    And Fixturesで"<商品2>"をカートに追加する
    Then Fixturesでカートに商品が2件あることを確認する

    Examples:
      | 商品1          | 商品2             |
      | スマートフォン  | Tシャツ           |
      | ノートパソコン  | コーヒーメーカー   |
      | ジーンズ       | プログラミング入門書|
