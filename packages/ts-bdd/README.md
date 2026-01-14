# ts-bdd - TypeScript BDD Tests

BDD (Behavior-Driven Development) test samples using Gherkin syntax and playwright-bdd.

## Overview

This package demonstrates BDD-style testing with:
- Gherkin feature files (Given-When-Then syntax)
- Step definitions with playwright-bdd
- Separation of test scenarios and implementation
- Japanese Gherkin syntax for international teams

## Technology Stack

| Tool | Purpose | Version |
|------|---------|---------|
| Playwright | Browser automation | ^1.49.0 |
| playwright-bdd | BDD framework | ^7.0.0 |
| TypeScript | Type safety | ^5.3.0 |

## Directory Structure

```
ts-bdd/
├── features/
│   └── blog.feature          # Gherkin scenarios (Japanese)
├── steps/
│   └── blog.steps.ts         # Step definitions
├── playwright.config.ts      # Playwright configuration
└── package.json
```

## Setup

```bash
cd packages/ts-bdd

# Install dependencies
npm install
```

## Running Tests

```bash
# Run all tests (generates spec files then runs tests)
npm run test

# Run in headed mode
npm run test:headed
```

## BDD Workflow

1. **Feature file** defines behavior in Gherkin (Given-When-Then)
2. **bddgen** command generates spec files from features
3. **Step definitions** implement the actual test logic
4. **Playwright Test** executes the generated specs

Example from `features/blog.feature`:
```gherkin
Scenario: ホームからブログページへ遷移する
  When "Blog"リンクをクリックする
  Then ブログページが表示される
  And ページタイトルに"Blog"が含まれる
```

## Benefits of BDD

- **Readable**: Non-technical stakeholders can understand test scenarios
- **Maintainable**: Separate test intent (feature) from implementation (steps)
- **Reusable**: Step definitions can be shared across scenarios
- **Documentation**: Feature files serve as living documentation

## Target Website

Tests run against: https://www.arrangility.com/
