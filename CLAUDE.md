# Claude Code ルール

このプロジェクトで作業する際のルールです。

## Git ワークフロー

### 必須ルール

1. **mainブランチへの直接コミット禁止**
   - mainブランチには直接push/commitしない
   - 必ずfeatureブランチ経由でマージする

2. **Issue駆動開発**
   - 作業開始前に必ずGitHub Issueを作成する
   - `gh issue create --title "タイトル" --body "説明"`

3. **ブランチ作成**
   - Issue番号を含むブランチ名を使用する
   - 例: `feature/#123-add-login-test`
   - `git checkout -b feature/#<issue番号>-<説明>`

4. **Pull Request経由でマージ**
   - 作業完了後はPull Requestを作成する
   - `gh pr create --title "タイトル" --body "Closes #<issue番号>"`
   - PRをマージしてブランチを削除する

### ワークフロー例

```bash
# 1. Issue作成
gh issue create --title "ログインテストを追加" --body "ログイン機能のE2Eテストを追加する"

# 2. ブランチ作成（Issue番号が#5の場合）
git checkout -b feature/#5-add-login-test

# 3. 作業・コミット
git add .
git commit -m "Add login test"

# 4. Push
git push -u origin feature/#5-add-login-test

# 5. PR作成
gh pr create --title "Add login test" --body "Closes #5"

# 6. マージ（レビュー後）
gh pr merge --squash --delete-branch
```

## コーディング規約

- ロールベースロケーター（`getByRole`）を優先使用
- テストは日本語で説明を記述
- BDDテストはGherkin記法（日本語）で記述
