# Playwright 機能一覧と言語別対応状況

## 概要

Playwrightは4つの言語をサポートしていますが、機能の充実度は言語によって異なります。
本ドキュメントでは、Playwrightの機能を整理し、各言語での対応状況を一覧化します。

---

## 1. サポート言語と成熟度

| 言語 | 成熟度 | 推奨テストフレームワーク |
|------|--------|------------------------|
| JavaScript/TypeScript | ✅ 正式版（最も充実） | Playwright Test |
| Python | ✅ 正式版 | pytest |
| Java | ✅ 正式版（v1.10〜） | JUnit / TestNG |
| C#/.NET | ✅ 正式版 | MSTest / NUnit / xUnit / xUnit v3 |

---

## 2. 基本機能（コアライブラリ）

すべての言語で利用可能なブラウザ自動化の基本機能です。

| 機能 | 説明 | JS/TS | Python | Java | C# | Selenium比較 |
|------|------|:-----:|:------:|:----:|:--:|-------------|
| **クロスブラウザ対応** | Chromium, Firefox, WebKit | ✅ | ✅ | ✅ | ✅ | Selenium: より多くのブラウザ対応 |
| **Auto-wait（自動待機）** | 要素が操作可能になるまで自動で待機 | ✅ | ✅ | ✅ | ✅ | 🆕 Selenium: 手動で待機処理が必要 |
| **ネットワークインターセプション** | リクエスト/レスポンスの傍受・変更 | ✅ | ✅ | ✅ | ✅ | 🆕 Selenium: selenium-wire等が必要 |
| **Browser Context** | 軽量な分離ブラウザ環境 | ✅ | ✅ | ✅ | ✅ | 🆕 Selenium: 新規ブラウザインスタンスが必要 |
| **モバイルエミュレーション** | デバイス・ビューポートの模倣 | ✅ | ✅ | ✅ | ✅ | 両方対応 |
| **スクリーンショット** | ページ/要素のキャプチャ | ✅ | ✅ | ✅ | ✅ | 両方対応 |
| **動画録画** | テスト実行の録画 | ✅ | ✅ | ✅ | ✅ | Selenium: 追加ツール必要 |
| **Tracing（トレース）** | 実行履歴の記録 | ✅ | ✅ | ✅ | ✅ | 🆕 Selenium: 同等機能なし |
| **Shadow DOM対応** | Shadow DOM内の要素操作 | ✅ | ✅ | ✅ | ✅ | 両方対応（設定が異なる） |
| **iframe対応** | フレーム内の要素操作 | ✅ | ✅ | ✅ | ✅ | 両方対応 |
| **マルチタブ/ウィンドウ** | 複数タブ・ウィンドウの操作 | ✅ | ✅ | ✅ | ✅ | 両方対応 |
| **ファイルアップロード/ダウンロード** | ファイル操作 | ✅ | ✅ | ✅ | ✅ | 両方対応 |
| **Geolocation模倣** | 位置情報の偽装 | ✅ | ✅ | ✅ | ✅ | 🆕 Selenium: 追加設定必要 |
| **Permission制御** | ブラウザ権限の制御 | ✅ | ✅ | ✅ | ✅ | 🆕 Selenium: 限定的 |
| **WebSocket対応** | WebSocket通信の監視 | ✅ | ✅ | ✅ | ✅ | 🆕 Selenium: 追加ツール必要 |

---

## 3. 開発者ツール

| 機能 | 説明 | JS/TS | Python | Java | C# |
|------|------|:-----:|:------:|:----:|:--:|
| **Codegen（コード生成）** | 操作を記録してコード自動生成 | ✅ | ✅ | ✅ | ✅ |
| **Playwright Inspector** | GUIでのデバッグ・ステップ実行 | ✅ | ✅ | ✅ | ✅ |
| **Trace Viewer** | トレースファイルの可視化 | ✅ | ✅ | ✅ | ✅ |
| **page.pause()** | テスト中断・デバッグ | ✅ | ✅ | ✅ | ✅ |

> **補足**: Codegen, Inspector, Trace Viewerは全言語で利用可能ですが、CLIコマンドの実行方法が言語ごとに異なります。

---

## 4. テストランナー機能（Playwright Test）

**⚠️ 以下はJS/TS専用の「Playwright Test」の機能です。**

| 機能 | 説明 | JS/TS | Python | Java | C# |
|------|------|:-----:|:------:|:----:|:--:|
| **専用テストランナー** | Playwright Test | ✅ | ❌ | ❌ | ❌ |
| **設定ファイル** | playwright.config.ts | ✅ | ❌ | ❌ | ❌ |
| **シャーディング** | 複数マシンへのテスト分散 | ✅ | ❌ | ❌ | ❌ |
| **パラレリズム（workers）** | 1マシン内の並列実行 | ✅ | ❌* | ❌* | ❌* |
| **HTMLレポーター** | 組み込みHTMLレポート生成 | ✅ | ❌ | ❌ | ❌ |
| **UIモード** | GUIでのテスト実行・管理 | ✅ | ❌ | ❌ | ❌ |
| **VS Code拡張機能** | エディタ統合 | ✅ | ❌ | ❌ | ❌ |
| **スクリーンショット比較** | ビジュアルリグレッションテスト（toHaveScreenshot） | ✅ | ❌* | ❌ | ❌ |
| **Soft Assertions** | 失敗してもテスト継続 | ✅ | ❌ | ❌ | ❌ |
| **Test Fixtures** | テストの前後処理の仕組み | ✅ | ❌** | ❌ | ❌ |
| **Retry機能** | 失敗テストの自動再実行 | ✅ | ❌ | ❌ | ❌ |
| **タグ/フィルタリング** | テストの絞り込み実行 | ✅ | ❌*** | ❌*** | ❌*** |

> \* Python: pytest-xdist、Java/C#: 各フレームワークの並列機能で代替可能  
> \*\* Python: pytestのfixtureで同様の機能を実現可能  
> \*\*\* 各テストフレームワークの機能で代替可能  
> \* スクリーンショット比較: Pythonではpytest-playwright-visual-snapshotなどのサードパーティプラグインで対応可能

---

## 5. 他言語での代替方法

### Python

| Playwright Test機能 | 代替方法 |
|---------------------|----------|
| 並列実行 | `pytest-xdist` (`pytest -n auto`) |
| シャーディング | CIのジョブマトリックス + pytest-split |
| レポート | pytest-html, Allure |
| 設定管理 | conftest.py, pytest.ini |
| Fixtures | pytest fixtures |

### Java

| Playwright Test機能 | 代替方法 |
|---------------------|----------|
| 並列実行 | TestNG (parallel属性), JUnit 5 (parallel) |
| シャーディング | CIのジョブマトリックス |
| レポート | Allure, ExtentReports |
| 設定管理 | testng.xml, プロパティファイル |

### C#/.NET

| Playwright Test機能 | 代替方法 |
|---------------------|----------|
| 並列実行 | NUnit/xUnit の並列実行機能 |
| シャーディング | CIのジョブマトリックス |
| レポート | Allure, ExtentReports |

---

## 6. Seleniumとの機能比較（Playwright独自機能）

以下はPlaywrightがSeleniumに対して持つ**独自の優位性**です。

| 機能 | Playwright | Selenium |
|------|------------|----------|
| **通信方式** | DevTools Protocol（WebSocket） | WebDriver Protocol（HTTP） |
| **Auto-wait** | ✅ 標準搭載 | ❌ 手動実装必要 |
| **ネットワークインターセプション** | ✅ 標準搭載 | ❌ selenium-wire等が必要 |
| **Browser Context** | ✅ 軽量分離環境 | ❌ 新規インスタンス必要 |
| **Trace Viewer** | ✅ 標準搭載 | ❌ なし |
| **Codegen** | ✅ 標準搭載 | ⚠️ Selenium IDE（別ツール） |
| **実行速度** | 🚀 高速 | 🐢 やや遅い |
| **セットアップ** | 簡単（ブラウザ自動DL） | 複雑（ドライバ管理必要）* |
| **フレーク（不安定）テスト** | 少ない | 多くなりがち |

> \* Selenium 4以降はSelenium Managerで改善

### Seleniumの優位点

| 機能 | Selenium | Playwright |
|------|----------|------------|
| **対応言語** | Java, Python, C#, JS, Ruby（PHP, Perlはサードパーティ） | JS/TS, Python, Java, C# |
| **対応ブラウザ** | Chrome, Firefox, Safari, Edge, Opera | Chromium, Firefox, WebKit |
| **実機テスト** | ✅ Appiumとの連携 | ❌ エミュレーションのみ |
| **コミュニティ** | 非常に大きい | 成長中 |
| **IE互換モード** | ⚠️ Edge IE Modeのみ（2022年6月〜）| ❌ 非対応 |

> **注意**: Seleniumは2022年6月以降、スタンドアロンのInternet Explorerを公式にサポートしていません。IEドライバーはMicrosoft EdgeのIE互換モードでの実行のみをサポートしています。

---

## 7. 言語選択の指針

```
┌─────────────────────────────────────────────────────────────┐
│                    言語選択フローチャート                      │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
              ┌───────────────────────────────┐
              │ 最新機能をフル活用したい？      │
              └───────────────────────────────┘
                     │               │
                    Yes              No
                     │               │
                     ▼               ▼
            ┌─────────────┐  ┌───────────────────────────┐
            │ TypeScript  │  │ チームの得意な言語は？      │
            │ を選択      │  └───────────────────────────┘
            └─────────────┘           │
                              ┌───────┴───────┐
                              │               │
                         Python/Java      C#/.NET
                              │               │
                              ▼               ▼
                    ┌─────────────┐  ┌─────────────┐
                    │ Python/Java │  │    C#       │
                    │ を選択      │  │  を選択     │
                    └─────────────┘  └─────────────┘
```

### 推奨パターン

| シナリオ | 推奨言語 | 理由 |
|----------|----------|------|
| 新規プロジェクト、最大限の機能活用 | **TypeScript** | Playwright Testのフル機能 |
| QAチーム主導、シンプルさ重視 | **Python** | 学習コストが低い |
| 既存Java資産との統合 | **Java** | エコシステム活用 |
| .NETアプリケーションのテスト | **C#** | 統一された技術スタック |

---

## 8. まとめ

### 機能充実度ランキング

```
TypeScript/JavaScript ████████████████████ 100%
Python                ████████████████     80%
Java                  ██████████████       70%
C#/.NET               ██████████████       70%
```

### 重要なポイント

1. **コアのブラウザ自動化機能**は全言語で同等
2. **Playwright Test**（テストランナー）はJS/TS専用
3. **シャーディング・UIモード・VS Code統合**はJS/TS専用
4. 他言語では**外部ツールとの組み合わせ**で同等機能を実現可能
5. Seleniumと比較して**Auto-wait、ネットワークインターセプション、Trace Viewer**が大きな差別化ポイント

---

## 参考リンク

- [Playwright 公式ドキュメント](https://playwright.dev/)
- [Playwright Python](https://playwright.dev/python/)
- [Playwright Java](https://playwright.dev/java/)
- [Playwright .NET](https://playwright.dev/dotnet/)
- [シャーディングガイド](https://playwright.dev/docs/test-sharding)
- [並列実行ガイド](https://playwright.dev/docs/test-parallel)
