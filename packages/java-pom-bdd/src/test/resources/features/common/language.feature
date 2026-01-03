

@common @language
Feature: 言語切替機能

  言語を切り替えられることを確認する

  Background:
    Given ShopTodoのホームページを開く

  @positive
  Scenario: 英語に切り替えられる
    When 英語に切り替える
    Then ページが英語で表示される

  @positive
  Scenario: 日本語に切り替えられる
    When 英語に切り替える
    And 日本語に切り替える
    Then ページが日本語で表示される
