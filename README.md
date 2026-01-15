# Playwright Learning

A collection of Playwright E2E test samples (TypeScript & Java)

[日本語版はこちら / Japanese Version](README.ja.md)

## Project Structure

```
playwright-learning/
├── docs/                    # Documentation (English .md files with Japanese .jp.md versions)
│   ├── playwright-features-comparison.md
│   ├── playwright-typescript-vs-java.md
│   ├── playwright-vs-selenium.md
│   └── getbyrole-limitations.md
└── packages/
    ├── ts-basic/            # TypeScript basic tests
    ├── ts-bdd/              # TypeScript BDD tests
    ├── ts-pom-bdd/          # TypeScript BDD + Page Object Model
    ├── ts-pom-bdd-di/       # TypeScript BDD + POM + Dependency Injection (Fixtures)
    ├── ts-api/              # TypeScript API tests (REST & GraphQL)
    ├── java-basic/          # Java basic tests
    └── java-pom-bdd/        # Java BDD + Page Object Model
```

## Setup

```bash
# Install dependencies (TypeScript)
npm install

# Install Playwright browsers
npx playwright install
```

## Running Tests

### TypeScript - Basic Tests

```bash
cd packages/ts-basic
npx playwright test
```

### TypeScript - BDD Tests

```bash
cd packages/ts-bdd
npm install
npm run test
```

### TypeScript - BDD + Page Object Model

```bash
cd packages/ts-pom-bdd
npm install
npm run test
```

### TypeScript - BDD + POM + Dependency Injection

```bash
cd packages/ts-pom-bdd-di
npm install
npm run test
```

### TypeScript - API Tests

```bash
cd packages/ts-api
npm install
npm test
```

### Java - Basic Tests

```bash
cd packages/java-basic
mvn test
```

### Java - BDD + Page Object Model

```bash
cd packages/java-pom-bdd
mvn test
```

## Viewing Test Reports

### TypeScript Packages (HTML Reporter)

After running tests, open the HTML report:

```bash
# Open report in default browser
npx playwright show-report

# Report location: playwright-report/index.html
```

### Java Packages (Surefire Report)

Test results are output to `target/surefire-reports/`:

```bash
# View test results
cat target/surefire-reports/*.txt

# Generate HTML report (optional)
mvn surefire-report:report
# Report location: target/site/surefire-report.html
```

## Package Descriptions

### ts-basic
- Basic Playwright tests
- Role-based locators
- ARIA Snapshot validation

### ts-bdd
- BDD-style tests (Gherkin syntax)
- Using playwright-bdd
- Feature/Step file structure

### ts-pom-bdd
- BDD + Page Object Model pattern
- Practical samples targeting [ShopTodo](https://toasagi.github.io/shoptodo-app/)
- Manual Page Object instantiation in step definitions
- 29 scenarios (login, register, catalog, cart, language switching, TypeScript-specific features)
- See [ts-pom-bdd/README.md](packages/ts-pom-bdd/README.md) for details

### ts-pom-bdd-di
- BDD + Page Object Model + **Dependency Injection (Fixtures)**
- Complete DI implementation - all step definitions use Fixtures
- **9 custom Fixtures**: Page Objects, Components, Test Data auto-injection
- **40 step definition methods**: No manual `new XxxPage(page)` instantiation
- Same test target as ts-pom-bdd: [ShopTodo](https://toasagi.github.io/shoptodo-app/)
- 29 scenarios (28 passed, 1 skipped as expected)
- **Key benefits**: Reduced boilerplate, improved maintainability, centralized test data
- See [ts-pom-bdd-di/README.md](packages/ts-pom-bdd-di/README.md) for details

### ts-api
- REST API tests (using JSONPlaceholder)
- GraphQL tests (using Countries API)
- Using Playwright request context
- 27 test cases
- See [ts-api/README.md](packages/ts-api/README.md) for details

### java-basic
- Java + JUnit5 tests
- Maven configuration
- ARIA Snapshot validation (v1.49+)

### java-pom-bdd
- Cucumber + Playwright Java BDD tests
- Page Object Model pattern
- Same target as ts-pom-bdd: [ShopTodo](https://toasagi.github.io/shoptodo-app/)
- 23 scenarios (login, catalog, cart, language switching)
- See [java-pom-bdd/README.md](packages/java-pom-bdd/README.md) for details

## What is ARIA Snapshot?

A YAML representation of the browser's accessibility tree.

### Features

| Property | Description |
|----------|-------------|
| Deterministic | Always returns the same structure for the same page |
| Token Efficient | 70-80% reduction compared to screenshots |
| Lightweight | Text-based, easy to process |
| Semantic | Clear role, name, and state |

### Comparison with Traditional Selectors

```typescript
// Traditional: CSS selector (fragile)
await page.click('.nav-menu > li:nth-child(3) > a');

// Role-based (recommended)
await page.getByRole('link', { name: 'Blog' }).click();

// ARIA Snapshot: Validate entire structure
await expect(nav).toMatchAriaSnapshot(`...`);
```

## Documentation

- [Playwright Features and Language Support](docs/playwright-features-comparison.md)
- [TypeScript vs Java Comparison](docs/playwright-typescript-vs-java.md)
- [Playwright vs Selenium Comparison](docs/playwright-vs-selenium.md)
- [getByRole() Limitations and Workarounds](docs/getbyrole-limitations.md)

## References

- [Playwright Official Documentation](https://playwright.dev/)
- [Playwright for Java](https://playwright.dev/java/)
- [playwright-bdd](https://github.com/vitalets/playwright-bdd)
