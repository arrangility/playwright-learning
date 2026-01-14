# Playwright Fixtures Best Practices

## What are Playwright Fixtures?

Playwright fixtures are a powerful dependency injection mechanism built into Playwright Test. They automatically provide setup, teardown, and shared resources to your tests.

## Key Benefits

### 1. Automatic Dependency Injection

**Without Fixtures:**
```typescript
test('example', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.login('user', 'pass');
  const cartPage = new CartPage(page);
  await cartPage.addItem('Product');
});
```

**With Fixtures:**
```typescript
// Define once
const test = base.extend<{
  authenticatedPage: Page;
  cartPage: CartPage;
}>({
  authenticatedPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.login('user', 'pass');
    await use(page);
  },
  cartPage: async ({ authenticatedPage }, use) => {
    await use(new CartPage(authenticatedPage));
  },
});

// Use everywhere
test('example', async ({ authenticatedPage, cartPage }) => {
  await cartPage.addItem('Product');
});
```

### 2. Automatic Cleanup

Fixtures automatically clean up resources after each test:

```typescript
const test = base.extend<{ tempFile: string }>({
  tempFile: async ({}, use) => {
    const file = await createTempFile();
    await use(file); // Test execution
    // Automatic cleanup after test
    await deleteTempFile(file);
  },
});
```

### 3. Type Safety

```typescript
type MyFixtures = {
  catalogPage: CatalogPage;
  cartComponent: CartComponent;
};

const test = base.extend<MyFixtures>({
  catalogPage: async ({ page }, use) => {
    await use(new CatalogPage(page));
  },
  cartComponent: async ({ page }, use) => {
    await use(new CartComponent(page));
  },
});

test('test', async ({ catalogPage, cartComponent }) => {
  // Full TypeScript IntelliSense support
  await catalogPage.searchProduct('item');
  expect(await cartComponent.getItemCount()).toBe(1);
});
```

### 4. Fixture Dependencies

Fixtures can depend on other fixtures:

```typescript
const test = base.extend<{
  loginPage: LoginPage;
  authenticatedPage: Page; // Depends on loginPage
}>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  authenticatedPage: async ({ loginPage }, use) => {
    await loginPage.login('demo', 'Demo@2025!');
    await use(loginPage.page);
  },
});
```

### 5. Reusability

Define fixtures once, use them in all tests:

```typescript
// Define in fixtures/test-fixtures.ts
export const test = base.extend<{
  authenticatedPage: Page;
  cartComponent: CartComponent;
}>({ /* ... */ });

// Use in multiple test files
import { test } from './fixtures/test-fixtures';

test('test 1', async ({ authenticatedPage }) => { /* ... */ });
test('test 2', async ({ authenticatedPage }) => { /* ... */ });
test('test 3', async ({ authenticatedPage }) => { /* ... */ });
```

## Combining Fixtures with Data-Driven Tests

### Scenario Outline + Fixtures = Best Practice

**Scenario Outline**: Handles test data variations
**Fixtures**: Handles setup and dependency injection

### Example: Cart Testing

**Feature File:**
```gherkin
@cart @fixtures
Feature: Cart with Fixtures

  @positive
  Scenario Outline: Add product and verify details
    When I add "<product>" to cart
    Then cart has <count> items
    And "<product>" price is correct

    Examples:
      | product      | count |
      | Smartphone   | 1     |
      | Laptop       | 1     |
      | T-shirt      | 1     |
```

**Fixtures Definition:**
```typescript
// fixtures/test-fixtures.ts
import { test as base } from '@playwright/test';
import { CartComponent } from '../pages/components/CartComponent';
import { CatalogPage } from '../pages/CatalogPage';
import { ProductData } from './test-data';

type TestFixtures = {
  authenticatedPage: Page;
  cartComponent: CartComponent;
  catalogPage: CatalogPage;
  productData: typeof ProductData;
};

export const test = base.extend<TestFixtures>({
  authenticatedPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await page.goto('https://example.com');
    await loginPage.login('demo', 'Demo@2025!');
    await use(page);
  },

  cartComponent: async ({ authenticatedPage }, use) => {
    await use(new CartComponent(authenticatedPage));
  },

  catalogPage: async ({ authenticatedPage }, use) => {
    await use(new CatalogPage(authenticatedPage));
  },

  productData: async ({}, use) => {
    await use(ProductData);
  },
});
```

**Step Definitions:**
```typescript
import { createBdd } from 'playwright-bdd';
import { test, expect } from '../fixtures/test-fixtures';

const { When, Then } = createBdd(test);

When('I add {string} to cart', async ({ catalogPage }, productName: string) => {
  await catalogPage.addToCart(productName);
});

Then('cart has {int} items', async ({ cartComponent }, count: number) => {
  expect(await cartComponent.getItemCount()).toBe(count);
});

Then('{string} price is correct', async ({ cartComponent, productData }, productName: string) => {
  const expectedPrice = Object.values(productData)
    .find(p => p.name === productName)?.price;
  const actualPrice = await cartComponent.getItemPrice(productName);
  expect(actualPrice).toBe(expectedPrice);
});
```

## Benefits Comparison

### Without Fixtures

```typescript
// Repetitive code in every step
Then('verify price', async ({ page }, productName, price) => {
  const cart = new CartComponent(page); // Create every time
  expect(await cart.getItemPrice(productName)).toBe(price);
});

Then('verify total', async ({ page }, total) => {
  const cart = new CartComponent(page); // Create again
  expect(await cart.getTotal()).toBe(total);
});
```

**Issues:**
- Duplicate Page Object instantiation
- Hardcoded test data
- Repeated login logic

### With Fixtures

```typescript
// Clean, reusable code
Then('verify price', async ({ cartComponent, productData }, productName) => {
  const expected = productData.find(p => p.name === productName).price;
  expect(await cartComponent.getItemPrice(productName)).toBe(expected);
});

Then('verify total', async ({ cartComponent }, total) => {
  expect(await cartComponent.getTotal()).toBe(total);
});
```

**Benefits:**
- ✅ Single Page Object instance
- ✅ Centralized test data
- ✅ Automatic login
- ✅ Type-safe
- ✅ Highly maintainable

## When to Use Fixtures

| Scenario | Without Fixtures | With Fixtures |
|----------|-----------------|---------------|
| **Login Required** | Write login logic each time | `authenticatedPage` fixture auto-login |
| **Page Objects** | `new XxxPage(page)` every time | `xxxPage` fixture auto-provided |
| **Test Data** | Hardcode or import | `testData` fixture provides |
| **Multiple Steps** | Create object repeatedly | Create once, share across steps |

## Best Practices

1. **Define Fixtures Separately**: Create `fixtures/test-fixtures.ts` for reusability
2. **Type-Safe Data**: Use TypeScript types for test data
3. **Fixture Naming**: Use descriptive names (e.g., `authenticatedPage`, `cartComponent`)
4. **Combine with Scenario Outline**: Use both for maximum maintainability
5. **Centralize Test Data**: Define product data, user credentials in fixtures

## Summary

### Fixture Benefits
- ✅ **Setup Simplification**: Login logic in one place
- ✅ **Auto Page Objects**: No need to `new` every time
- ✅ **Type Safety**: IntelliSense support
- ✅ **Maintainability**: Changes in one place
- ✅ **Reusability**: Share fixtures across all tests

### Combined Power
🎯 **Data-Driven Tests × Dependency Injection = Optimal Test Structure**

- **Scenario Outline**: Test data variations
- **Fixtures**: Automated common setup
- **Together**: Maximize maintainability, readability, and reusability

## References

- [Playwright Fixtures Documentation](https://playwright.dev/docs/test-fixtures)
- [Advanced Fixtures](https://playwright.dev/docs/test-advanced)
