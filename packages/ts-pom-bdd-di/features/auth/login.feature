@auth @login
Feature: ログイン機能

  ユーザーがログインできることを確認する

  Background:
    Given ShopTodoのホームページを開く

  @positive
  Scenario: 正しい認証情報でログインできる
    When ログインボタンをクリックする
    And ユーザー名"demo"とパスワード"Demo@2025!"でログインする
    Then ログインに成功する
    And ログアウトボタンが表示される

  @negative
  Scenario: 無効なパスワードでログインに失敗する
    When ログインボタンをクリックする
    And ユーザー名"demo"とパスワード"wrongpassword"でログインする
    Then ログインダイアログが表示されたままである

  @negative
  Scenario: 空のフィールドでログインに失敗する
    When ログインボタンをクリックする
    And ユーザー名""とパスワード""でログインする
    Then ログインダイアログが表示されたままである

  @positive
  Scenario: ログアウトできる
    When ログインボタンをクリックする
    And ユーザー名"demo"とパスワード"Demo@2025!"でログインする
    And ログアウトする
    Then ログインボタンが表示される
