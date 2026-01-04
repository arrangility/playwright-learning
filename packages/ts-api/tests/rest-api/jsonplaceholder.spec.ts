import { test, expect } from '@playwright/test';

/**
 * REST API テストサンプル
 * JSONPlaceholder (https://jsonplaceholder.typicode.com/) を使用
 * - 無料の公開 Fake REST API
 * - CRUD操作のテストに最適
 */

const BASE_URL = 'https://jsonplaceholder.typicode.com';

test.describe('REST API - GET リクエスト', () => {
  test('全投稿を取得する', async ({ request }) => {
    // GET リクエスト
    const response = await request.get(`${BASE_URL}/posts`);

    // ステータスコードの検証
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);

    // レスポンスボディの検証
    const posts = await response.json();
    expect(posts).toBeInstanceOf(Array);
    expect(posts.length).toBe(100); // JSONPlaceholderは100件の投稿を返す
  });

  test('特定の投稿を取得する', async ({ request }) => {
    const postId = 1;
    const response = await request.get(`${BASE_URL}/posts/${postId}`);

    expect(response.ok()).toBeTruthy();

    const post = await response.json();
    expect(post.id).toBe(postId);
    expect(post).toHaveProperty('title');
    expect(post).toHaveProperty('body');
    expect(post).toHaveProperty('userId');
  });

  test('存在しないリソースは404を返す', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/posts/99999`);

    expect(response.status()).toBe(404);
  });

  test('クエリパラメータでフィルタリングする', async ({ request }) => {
    // userId=1 の投稿のみ取得
    const response = await request.get(`${BASE_URL}/posts`, {
      params: {
        userId: 1,
      },
    });

    expect(response.ok()).toBeTruthy();

    const posts = await response.json();
    expect(posts.length).toBeGreaterThan(0);

    // すべての投稿が userId=1 であることを確認
    for (const post of posts) {
      expect(post.userId).toBe(1);
    }
  });

  test('ネストされたリソースを取得する', async ({ request }) => {
    // 投稿ID=1 のコメントを取得
    const response = await request.get(`${BASE_URL}/posts/1/comments`);

    expect(response.ok()).toBeTruthy();

    const comments = await response.json();
    expect(comments).toBeInstanceOf(Array);
    expect(comments.length).toBeGreaterThan(0);

    // コメントの構造を検証
    const firstComment = comments[0];
    expect(firstComment).toHaveProperty('id');
    expect(firstComment).toHaveProperty('name');
    expect(firstComment).toHaveProperty('email');
    expect(firstComment).toHaveProperty('body');
    expect(firstComment.postId).toBe(1);
  });
});

test.describe('REST API - POST リクエスト', () => {
  test('新しい投稿を作成する', async ({ request }) => {
    const newPost = {
      title: 'テスト投稿',
      body: 'これはPlaywright APIテストで作成した投稿です',
      userId: 1,
    };

    const response = await request.post(`${BASE_URL}/posts`, {
      data: newPost,
    });

    expect(response.status()).toBe(201); // Created

    const createdPost = await response.json();
    expect(createdPost.title).toBe(newPost.title);
    expect(createdPost.body).toBe(newPost.body);
    expect(createdPost.userId).toBe(newPost.userId);
    expect(createdPost.id).toBeDefined(); // IDが自動生成される
  });

  test('Content-Typeヘッダーを確認する', async ({ request }) => {
    const response = await request.post(`${BASE_URL}/posts`, {
      data: { title: 'Test', body: 'Test body', userId: 1 },
    });

    // レスポンスヘッダーの検証
    const contentType = response.headers()['content-type'];
    expect(contentType).toContain('application/json');
  });
});

test.describe('REST API - PUT リクエスト', () => {
  test('既存の投稿を更新する', async ({ request }) => {
    const updatedPost = {
      id: 1,
      title: '更新されたタイトル',
      body: '更新された本文',
      userId: 1,
    };

    const response = await request.put(`${BASE_URL}/posts/1`, {
      data: updatedPost,
    });

    expect(response.ok()).toBeTruthy();

    const result = await response.json();
    expect(result.title).toBe(updatedPost.title);
    expect(result.body).toBe(updatedPost.body);
  });
});

test.describe('REST API - PATCH リクエスト', () => {
  test('投稿の一部を更新する', async ({ request }) => {
    const partialUpdate = {
      title: 'タイトルのみ更新',
    };

    const response = await request.patch(`${BASE_URL}/posts/1`, {
      data: partialUpdate,
    });

    expect(response.ok()).toBeTruthy();

    const result = await response.json();
    expect(result.title).toBe(partialUpdate.title);
    // bodyとuserIdは変更されない
    expect(result.body).toBeDefined();
    expect(result.userId).toBeDefined();
  });
});

test.describe('REST API - DELETE リクエスト', () => {
  test('投稿を削除する', async ({ request }) => {
    const response = await request.delete(`${BASE_URL}/posts/1`);

    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
  });
});

test.describe('REST API - レスポンス検証', () => {
  test('レスポンスヘッダーを検証する', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/posts/1`);

    // 各種ヘッダーの検証
    const headers = response.headers();
    expect(headers['content-type']).toContain('application/json');
  });

  test('レスポンスタイムを検証する', async ({ request }) => {
    const startTime = Date.now();
    await request.get(`${BASE_URL}/posts`);
    const endTime = Date.now();

    const responseTime = endTime - startTime;
    // レスポンスタイムが5秒以内であることを確認
    expect(responseTime).toBeLessThan(5000);
  });

  test('JSONスキーマを検証する', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/users/1`);
    const user = await response.json();

    // ユーザーオブジェクトの必須フィールドを検証
    expect(user).toMatchObject({
      id: expect.any(Number),
      name: expect.any(String),
      username: expect.any(String),
      email: expect.any(String),
      address: expect.objectContaining({
        street: expect.any(String),
        city: expect.any(String),
      }),
    });
  });
});
