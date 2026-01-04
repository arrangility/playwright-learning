# ts-api - Playwright API Testing

Playwright の APIテスト機能を使用した REST API と GraphQL のサンプルテストです。

## 概要

このパッケージでは、Playwright の `request` コンテキストを使用した API テストのサンプルを提供します。

### 使用している公開API

| API | 種類 | URL | 説明 |
|-----|------|-----|------|
| JSONPlaceholder | REST | https://jsonplaceholder.typicode.com | 無料のFake REST API |
| Countries | GraphQL | https://countries.trevorblades.com | 国・大陸・言語情報API |

## テスト内容

### REST API テスト (`tests/rest-api/`)

- **GET リクエスト**: リソースの取得、クエリパラメータ、ネストリソース
- **POST リクエスト**: 新規リソース作成
- **PUT リクエスト**: リソースの完全更新
- **PATCH リクエスト**: リソースの部分更新
- **DELETE リクエスト**: リソースの削除
- **レスポンス検証**: ヘッダー、レスポンスタイム、JSONスキーマ

### GraphQL テスト (`tests/graphql/`)

- **基本クエリ**: シンプルなデータ取得
- **変数とフィルタリング**: パラメータ化されたクエリ
- **エラーハンドリング**: 不正なクエリ、存在しないリソース
- **ネストされたデータ**: 複雑なデータ構造の検証

## セットアップ

```bash
cd packages/ts-api
npm install
```

## テスト実行

```bash
# 全テスト実行
npm test

# REST API テストのみ
npm run test:rest

# GraphQL テストのみ
npm run test:graphql
```

## Playwright APIテストの特徴

### request コンテキスト

```typescript
import { test, expect } from '@playwright/test';

test('APIリクエストの例', async ({ request }) => {
  // GET リクエスト
  const response = await request.get('https://api.example.com/data');

  // ステータスコード検証
  expect(response.ok()).toBeTruthy();
  expect(response.status()).toBe(200);

  // JSONボディの検証
  const data = await response.json();
  expect(data).toHaveProperty('id');
});
```

### POST リクエスト

```typescript
test('POSTリクエストの例', async ({ request }) => {
  const response = await request.post('https://api.example.com/users', {
    data: {
      name: 'John',
      email: 'john@example.com',
    },
  });

  expect(response.status()).toBe(201);
});
```

### GraphQL リクエスト

```typescript
test('GraphQLクエリの例', async ({ request }) => {
  const response = await request.post('https://api.example.com/graphql', {
    data: {
      query: `
        query GetUser($id: ID!) {
          user(id: $id) {
            name
            email
          }
        }
      `,
      variables: { id: '1' },
    },
  });

  const { data } = await response.json();
  expect(data.user.name).toBeDefined();
});
```

## ブラウザテストとの違い

| 項目 | ブラウザテスト | APIテスト |
|------|--------------|----------|
| 実行速度 | 遅い | 高速 |
| リソース消費 | 多い | 少ない |
| テスト対象 | UI/UX | データ/ロジック |
| セットアップ | ブラウザ必要 | 不要 |

## 参考リンク

- [Playwright API Testing](https://playwright.dev/docs/api-testing)
- [APIRequestContext](https://playwright.dev/docs/api/class-apirequestcontext)
