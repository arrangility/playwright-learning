

@auth @register
Feature: 新規登録機能

  ユーザーが新規登録できることを確認する

  Background:
    Given ShopTodoのホームページを開く
    And ログインボタンをクリックする
    And 新規登録リンクをクリックする

  @positive @skip
  Scenario: 正しい情報で新規登録できる
    # Note: This test requires backend server (skipped in demo mode)
    When ユーザー名"newuser"、メール"new@example.com"、パスワード"NewUser@2025!"で登録する
    Then 登録ダイアログが閉じる

  @negative
  Scenario: パスワード不一致で登録に失敗する
    When ユーザー名"testuser"、メール"test@example.com"、パスワード"Test@2025!"、確認パスワード"Different@2025!"で登録する
    Then 登録ダイアログが表示されたままである

  @negative
  Scenario: 必須フィールド未入力で登録に失敗する
    When ユーザー名""、メール""、パスワード""で登録する
    Then 登録ダイアログが表示されたままである
