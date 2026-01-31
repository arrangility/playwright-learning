@practical @soft-assertion
Feature: ページレイアウト検証

  ページ全体のレイアウトと構造の検証パターン

  Background:
    Given ShopTodoのホームページを開く

  @layout
  Scenario: ホームページのレイアウトを検証
    # ホームページの主要なレイアウト要素を
    # Soft Assertionで検証します。
    Then ホームページのレイアウトを検証する（Soft Assertions）:
      | セクション       | 期待する状態 |
      | ヘッダー         | 表示         |
      | メインコンテンツ | 表示         |
      | サイドバー       | 表示         |

  @layout
  Scenario: ナビゲーション要素を検証
    # ナビゲーションに必要な要素がすべて揃っているか検証します。
    Then ナビゲーション要素を検証する（Soft Assertions）:
      | 要素           |
      | ログインボタン |
      | 言語切替       |
      | カテゴリタブ   |
