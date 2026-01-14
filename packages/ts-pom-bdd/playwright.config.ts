import { defineConfig } from '@playwright/test';
import { defineBddConfig } from 'playwright-bdd';

const testDir = defineBddConfig({
  features: 'features/**/*.feature',
  steps: ['steps/*.ts', 'fixtures/*.ts'],
});

export default defineConfig({
  testDir,
  timeout: 60000,
  expect: {
    timeout: 10000,
  },
  workers: 4,
  reporter: [['html'], ['list']],
  use: {
    baseURL: 'https://toasagi.github.io/shoptodo-app/',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    actionTimeout: 15000,
    navigationTimeout: 30000,
  },
  projects: [
    {
      name: 'chromium',
      use: { browserName: 'chromium' },
    },
  ],
});
