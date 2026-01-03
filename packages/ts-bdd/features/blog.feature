Feature: ブログページ

  ユーザーがブログページにアクセスして記事を閲覧できることを確認する

  Background:
    Given ホームページを開く

  Scenario: ホームからブログページへ遷移する
    When "Blog"リンクをクリックする
    Then ブログページが表示される
    And ページタイトルに"Blog"が含まれる

  Scenario: ブログページに記事一覧が表示される
    When "Blog"リンクをクリックする
    Then ブログページが表示される
    And ブログ記事へのリンクが存在する

  Scenario: ナビゲーションにBlogリンクが存在する
    Then メインナビゲーションが表示される
    And ナビゲーションに"Blog"リンクが存在する
