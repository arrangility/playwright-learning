# ts-basic - TypeScript Basic Tests

Basic Playwright test samples demonstrating core testing concepts and best practices.

## Overview

This package contains introductory Playwright tests using TypeScript, showcasing:
- Role-based locators (`getByRole`)
- ARIA Snapshot validation
- Navigation testing
- Accessibility-first testing approach

## Test Files

### blog.spec.ts
Tests for the Arrangility blog website demonstrating:
- Page navigation from home to blog
- Locating elements by ARIA roles
- Title and URL validation
- ARIA Snapshot for navigation structure validation

### order-test.spec.ts
Tests validating semantic HTML structure:
- Navigation order verification
- Footer link structure validation
- Heading hierarchy testing (h1, h2 levels)

## Setup

```bash
# From repository root, install dependencies
npm install

# Install Playwright browsers
npx playwright install
```

## Running Tests

```bash
# Run all tests
npx playwright test

# Run in headed mode (visible browser)
npx playwright test --headed

# Run in UI mode
npx playwright test --ui

# View test report
npx playwright show-report
```

## Key Features

- **Role-based Locators**: Uses `getByRole()` for accessible, resilient element selection
- **ARIA Snapshot**: Validates entire accessibility tree structure in YAML format
- **Auto-wait**: Playwright automatically waits for elements to be actionable
- **Type Safety**: Full TypeScript support with IntelliSense

## Target Website

Tests run against: https://www.arrangility.com/
