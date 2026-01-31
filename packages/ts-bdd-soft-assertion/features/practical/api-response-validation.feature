@practical @soft-assertion
Feature: APIレスポンス風の検証

  データ構造の検証パターン（APIレスポンスをUIで確認）

  Background:
    Given ShopTodoのホームページを開く

  @api-response
  Scenario: 商品データの構造を検証
    # 各商品が必要なプロパティを持っているか検証します。
    # これはAPIレスポンスの構造検証に似たパターンです。
    Then 商品データの構造を検証する（Soft Assertions）:
      | プロパティ       |
      | 商品名           |
      | 価格             |
      | カテゴリ         |
      | カートに追加機能 |

  @api-response
  Scenario: カテゴリ別の商品データを検証
    # 各カテゴリに商品が正しく分類されているか検証します。
    Then カテゴリ別の商品データを検証する（Soft Assertions）
