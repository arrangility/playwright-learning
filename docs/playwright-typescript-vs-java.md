# Playwright: TypeScript vs Java Comparison

## 1. ARIA Snapshot Features

| Feature | TypeScript | Java |
|---------|------------|------|
| `matchesAriaSnapshot()` | ✅ | ✅ (v1.49+) |
| `ariaSnapshot()` retrieval | ✅ | ✅ (v1.49+) |
| Snapshot auto-update | ✅ `--update-snapshots` | ❌ Manual update only |
| Snapshot file management | ✅ Auto-generated `.snap` files | ❌ None |

## 2. Test Features

| Feature | TypeScript | Java |
|---------|------------|------|
| Built-in test runner | ✅ `@playwright/test` | ❌ Use JUnit/TestNG |
| Parallel execution | ✅ Built-in | ⚠️ JUnit configuration required |
| Retry feature | ✅ Built-in | ❌ Separate implementation |
| HTML report | ✅ Built-in | ❌ Allure etc. required |
| Trace collection | ✅ Easy configuration | ✅ Possible but complex setup |
| Auto screenshot save | ✅ Built-in | ⚠️ Manual implementation |

## 3. API Features (Available in Both)

| Feature | TypeScript | Java |
|---------|------------|------|
| Role-based locators | ✅ | ✅ |
| Auto-wait | ✅ | ✅ |
| Network intercept | ✅ | ✅ |
| Mobile emulation | ✅ | ✅ |
| PDF generation | ✅ | ✅ |
| Video recording | ✅ | ✅ |
| Multi-browser support | ✅ | ✅ |

## 4. Code Examples Differences

### Fixtures/Setup

**TypeScript** - page, browser, context are automatically provided:
```typescript
test('example', async ({ page }) => {
  await page.goto('https://example.com');
});
```

**Java** - Manual setup required:
```java
@BeforeAll
void setupAll() {
    playwright = Playwright.create();
    browser = playwright.chromium().launch();
}

@BeforeEach
void setup() {
    context = browser.newContext();
    page = context.newPage();
}
```

### Configuration File

**TypeScript** (`playwright.config.ts`):
```typescript
export default defineConfig({
  retries: 2,
  reporter: [['html'], ['junit']],
  use: { trace: 'on-first-retry' },
});
```

**Java**: No configuration file, configure in code

### ARIA Snapshot Assertions

**TypeScript**:
```typescript
await expect(nav).toMatchAriaSnapshot(`
  - navigation "Main":
    - link "Home"
    - link "Blog"
`);
```

**Java**:
```java
assertThat(nav).matchesAriaSnapshot("""
    - navigation "Main":
      - link "Home"
      - link "Blog"
    """);
```

## 5. TypeScript-Only Features

- **Component Testing**: Component testing for React/Vue etc.
- **UI Mode**: Interactive debugging UI (`npx playwright test --ui`)
- **Codegen**: Auto test code generation (`npx playwright codegen`)
- **Test Generator Extension**: Test recording in VS Code extension

## 6. Developer Experience

| Item | TypeScript | Java |
|------|------------|------|
| Official documentation | ◎ Most comprehensive | ○ Basic |
| New feature releases | Fastest | 1-2 weeks delay |
| Community | Large | Small |
| IDE completion | ◎ VS Code optimized | ○ IntelliJ supported |

## 7. Selection Guidelines

### When to Choose TypeScript

- Frontend development team
- Want to use latest features immediately
- Need built-in reports/retry
- Want to utilize test auto-generation/debugging UI

### When to Choose Java

- Backend is Java project
- Have existing JUnit/TestNG assets
- CI/CD is Maven/Gradle based
- Corporate technology stack constraints

## Reference Links

- [Playwright Official Documentation (TypeScript)](https://playwright.dev/)
- [Playwright Java API](https://playwright.dev/java/)
- [ARIA Snapshot (TypeScript)](https://playwright.dev/docs/aria-snapshots)
- [ARIA Snapshot (Java)](https://playwright.dev/java/docs/aria-snapshots)
