@ts-specific @visual
Feature: ビジュアルリグレッションテスト
  TypeScript専用のスクリーンショット比較機能（toHaveScreenshot）を検証する
  この機能はPlaywright TestのJS/TS専用機能です

  Background:
    Given ShopTodoのホームページを開く

  @positive
  Scenario: 商品カタログ画面のスクリーンショット比較
    Then 商品カタログ画面のスクリーンショットが一致する

  @positive
  Scenario: ログインダイアログのスクリーンショット比較
    When ログインボタンをクリックする
    Then ログインダイアログのスクリーンショットが一致する

  @positive
  Scenario: ヘッダーコンポーネントのスクリーンショット比較
    Then ヘッダーのスクリーンショットが一致する
