@practical @soft-assertion
Feature: データテーブル検証

  商品一覧などのデータテーブルの検証パターン

  Background:
    Given ShopTodoのホームページを開く

  @data-table
  Scenario: 商品一覧のデータを検証
    # 各商品のデータ（名前、価格）が正しく表示されているか
    # Soft Assertionで検証します。
    Then 商品一覧のデータを検証する（Soft Assertions）:
      | 商品名         | 期待価格  |
      | スマートフォン | ¥59,800   |
      | ノートパソコン | ¥128,000  |
      | Tシャツ        | ¥2,980    |

  @data-table
  Scenario: 全商品のデータ整合性を検証
    # すべての商品が必要なデータを持っているか検証します。
    Then 全商品のデータ整合性を検証する（Soft Assertions）
