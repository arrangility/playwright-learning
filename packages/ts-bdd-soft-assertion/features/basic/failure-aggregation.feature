@basic @soft-assertion
Feature: 失敗の集約

  Soft Assertionの失敗がどのように集約されるかを示す

  Background:
    Given ShopTodoのホームページを開く

  @aggregation
  Scenario: 成功と失敗が混在する場合の動作
    # 一部のSoft Assertionが失敗しても、他のアサーションは
    # 継続して実行されます。すべての失敗は最後にまとめて報告されます。
    # 注意: このシナリオは意図的に成功するようになっています。
    Then 以下の要素を検証し失敗を集約する:
      | 要素           | 期待する状態 |
      | ログインボタン | 表示         |
      | 商品一覧       | 表示         |
      | カート         | 表示         |

  @aggregation
  Scenario: すべてのアサーションが実行されることを確認
    # 通常のexpect()では最初の失敗でテストが停止しますが、
    # expect.soft()ではすべてのアサーションが実行されます。
    Then 全商品の価格が正の数であることを検証（Soft Assertions）
