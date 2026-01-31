@advanced @soft-assertion
Feature: カスタムエラーメッセージ

  デバッグしやすいカスタムエラーメッセージの使用方法を示す

  Background:
    Given ShopTodoのホームページを開く

  @custom-message
  Scenario: カスタムエラーメッセージで要素を検証
    # expect.soft()の第2引数にカスタムメッセージを指定することで、
    # 失敗時により詳細な情報を得ることができます。
    Then デバッグ情報付きで商品一覧を検証する

  @custom-message
  Scenario: テスト情報を含むカスタムメッセージ
    # TestInfoを使用してテストIDやタイトルを
    # エラーメッセージに含めることができます。
    Then テスト情報を含むカスタムメッセージで検証する

  @custom-message
  Scenario: 動的なコンテキスト情報を含むメッセージ
    # ループ内でインデックスや現在の値を
    # エラーメッセージに含めることで、
    # どの項目で失敗したか特定しやすくなります。
    Then 各商品にインデックス付きのカスタムメッセージで検証する
