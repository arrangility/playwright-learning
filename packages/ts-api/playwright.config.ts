import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',

  // APIテスト用の設定
  use: {
    // ベースURLは各テストで個別に設定
    extraHTTPHeaders: {
      'Accept': 'application/json',
    },
  },

  // プロジェクト設定
  projects: [
    {
      name: 'REST API',
      testMatch: /rest-api\/.*.spec.ts/,
    },
    {
      name: 'GraphQL',
      testMatch: /graphql\/.*.spec.ts/,
    },
  ],
});
