# java-basic - Java Basic Tests

Playwright Java test samples with JUnit 5 demonstrating browser automation for Java developers.

## Overview

This package demonstrates Playwright usage in Java with:
- JUnit 5 test framework
- Maven project configuration
- Role-based locators (same API as TypeScript)
- ARIA Snapshot validation (Playwright v1.49+)
- Cross-browser testing (Chromium, Firefox, WebKit)

## Technology Stack

| Tool | Purpose | Version |
|------|---------|---------|
| Playwright Java | Browser automation | 1.49.0 |
| JUnit 5 | Test framework | 5.10.1 |
| Maven | Build tool | 3.x |
| Java | Language | 17+ |

## Test Files

### BlogTest.java
Main test suite demonstrating:
- Browser and page lifecycle (`@BeforeAll`, `@AfterEach`)
- Navigation and assertions
- Role-based element selection
- ARIA Snapshot validation

### BlogTestChrome.java / BlogTestSafari.java
Browser-specific test configurations for cross-browser testing.

## Prerequisites

- Java 17 or higher
- Maven 3.x

## Setup

```bash
cd packages/java-basic

# Install Playwright browsers (first time only)
mvn exec:java -e -D exec.mainClass=com.microsoft.playwright.CLI -D exec.args="install"
```

## Running Tests

```bash
# Run all tests
mvn test

# Run specific test class
mvn test -Dtest=BlogTest

# View test results
cat target/surefire-reports/*.txt

# Generate HTML report (optional)
mvn surefire-report:report
# Report location: target/site/surefire-report.html
```

## Key Features

- **Same API as TypeScript**: Playwright provides consistent API across languages
- **Type Safety**: Strongly-typed Java API
- **JUnit Integration**: Uses familiar JUnit 5 annotations
- **Maven Support**: Standard Java project structure

## Comparison with TypeScript

| Feature | TypeScript | Java |
|---------|------------|------|
| Syntax | `await page.goto()` | `page.navigate()` |
| Async | async/await | Synchronous API |
| Test Runner | Playwright Test | JUnit 5 |
| Config | playwright.config.ts | pom.xml |

## Target Website

Tests run against: https://www.arrangility.com/
