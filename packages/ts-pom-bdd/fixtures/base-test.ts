import { test as base } from 'playwright-bdd';

/**
 * Base test without custom fixtures
 * Use this for step definitions that don't need custom fixtures
 * Note: Using playwright-bdd's test to ensure compatibility with BDD steps
 */
export const test = base;

// Re-export expect for convenience
export { expect } from '@playwright/test';
