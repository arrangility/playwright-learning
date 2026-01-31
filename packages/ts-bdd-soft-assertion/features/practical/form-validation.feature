@practical @soft-assertion
Feature: フォームバリデーション

  フォーム要素の一括検証パターン

  Background:
    Given ShopTodoのホームページを開く

  @form
  Scenario: ログインフォームの全フィールドを検証
    # ログインダイアログのすべてのフォーム要素を
    # Soft Assertionで一括検証します。
    When ログインダイアログを開く
    Then ログインフォームの全要素を検証する（Soft Assertions）:
      | 要素           | 検証内容   |
      | ユーザー名入力 | 表示・有効 |
      | パスワード入力 | 表示・有効 |
      | ログインボタン | 表示・有効 |
      | 閉じるボタン   | 表示・有効 |
      | 新規登録リンク | 表示       |

  @form
  Scenario: 検索フォームの機能を検証
    # 検索フォームの入力と結果表示を検証します。
    Then 検索フォームの機能を検証する（Soft Assertions）
