# Playwright Features and Language Support

## Overview

Playwright supports four languages, but the feature richness varies by language.
This document organizes Playwright features and lists the support status for each language.

---

## 1. Supported Languages and Maturity

| Language | Maturity | Recommended Test Framework |
|----------|----------|---------------------------|
| JavaScript/TypeScript | ✅ Stable (Most complete) | Playwright Test |
| Python | ✅ Stable | pytest |
| Java | ✅ Stable (v1.10+) | JUnit / TestNG |
| C#/.NET | ✅ Stable | MSTest / NUnit / xUnit / xUnit v3 |

---

## 2. Core Features (Core Library)

Basic browser automation features available in all languages.

| Feature | Description | JS/TS | Python | Java | C# | Selenium Comparison |
|---------|-------------|:-----:|:------:|:----:|:--:|---------------------|
| **Cross-browser support** | Chromium, Firefox, WebKit | ✅ | ✅ | ✅ | ✅ | Selenium: More browsers supported |
| **Auto-wait** | Automatically waits until element is actionable | ✅ | ✅ | ✅ | ✅ | 🆕 Selenium: Manual wait handling required |
| **Network interception** | Intercept/modify requests/responses | ✅ | ✅ | ✅ | ✅ | 🆕 Selenium: Requires selenium-wire etc. |
| **Browser Context** | Lightweight isolated browser environment | ✅ | ✅ | ✅ | ✅ | 🆕 Selenium: New browser instance required |
| **Mobile emulation** | Device/viewport simulation | ✅ | ✅ | ✅ | ✅ | Both supported |
| **Screenshots** | Page/element capture | ✅ | ✅ | ✅ | ✅ | Both supported |
| **Video recording** | Test execution recording | ✅ | ✅ | ✅ | ✅ | Selenium: Additional tools required |
| **Tracing** | Execution history recording | ✅ | ✅ | ✅ | ✅ | 🆕 Selenium: No equivalent feature |
| **Shadow DOM support** | Element operations inside Shadow DOM | ✅ | ✅ | ✅ | ✅ | Both supported (different configuration) |
| **iframe support** | Element operations inside frames | ✅ | ✅ | ✅ | ✅ | Both supported |
| **Multi-tab/window** | Multiple tabs/windows handling | ✅ | ✅ | ✅ | ✅ | Both supported |
| **File upload/download** | File operations | ✅ | ✅ | ✅ | ✅ | Both supported |
| **Geolocation emulation** | Location spoofing | ✅ | ✅ | ✅ | ✅ | 🆕 Selenium: Additional setup required |
| **Permission control** | Browser permission control | ✅ | ✅ | ✅ | ✅ | 🆕 Selenium: Limited |
| **WebSocket support** | WebSocket communication monitoring | ✅ | ✅ | ✅ | ✅ | 🆕 Selenium: Additional tools required |

---

## 3. Developer Tools

| Feature | Description | JS/TS | Python | Java | C# |
|---------|-------------|:-----:|:------:|:----:|:--:|
| **Codegen** | Record operations and auto-generate code | ✅ | ✅ | ✅ | ✅ |
| **Playwright Inspector** | GUI debugging/step execution | ✅ | ✅ | ✅ | ✅ |
| **Trace Viewer** | Trace file visualization | ✅ | ✅ | ✅ | ✅ |
| **page.pause()** | Test interruption/debugging | ✅ | ✅ | ✅ | ✅ |

> **Note**: Codegen, Inspector, and Trace Viewer are available in all languages, but CLI command execution differs by language.

---

## 4. Test Runner Features (Playwright Test)

**⚠️ The following are features of "Playwright Test" exclusive to JS/TS.**

| Feature | Description | JS/TS | Python | Java | C# |
|---------|-------------|:-----:|:------:|:----:|:--:|
| **Dedicated test runner** | Playwright Test | ✅ | ❌ | ❌ | ❌ |
| **Configuration file** | playwright.config.ts | ✅ | ❌ | ❌ | ❌ |
| **Sharding** | Test distribution across multiple machines | ✅ | ❌ | ❌ | ❌ |
| **Parallelism (workers)** | Parallel execution on single machine | ✅ | ❌* | ❌* | ❌* |
| **HTML reporter** | Built-in HTML report generation | ✅ | ❌ | ❌ | ❌ |
| **UI Mode** | GUI test execution/management | ✅ | ❌ | ❌ | ❌ |
| **VS Code extension** | Editor integration | ✅ | ❌ | ❌ | ❌ |
| **Screenshot comparison** | Visual regression testing (toHaveScreenshot) | ✅ | ❌* | ❌ | ❌ |
| **Soft Assertions** | Continue test after failure | ✅ | ❌ | ❌ | ❌ |
| **Test Fixtures** | Test setup/teardown mechanism | ✅ | ❌** | ❌ | ❌ |
| **Retry feature** | Automatic retry of failed tests | ✅ | ❌ | ❌ | ❌ |
| **Tags/Filtering** | Filtered test execution | ✅ | ❌*** | ❌*** | ❌*** |

> \* Python: Can be replaced with pytest-xdist, Java/C#: Use parallel features of each framework
> \*\* Python: Similar functionality achievable with pytest fixtures
> \*\*\* Can be replaced with each test framework's features
> \* Screenshot comparison: Python can use third-party plugins like pytest-playwright-visual-snapshot

---

## 5. Alternative Methods for Other Languages

### Python

| Playwright Test Feature | Alternative |
|------------------------|-------------|
| Parallel execution | `pytest-xdist` (`pytest -n auto`) |
| Sharding | CI job matrix + pytest-split |
| Reports | pytest-html, Allure |
| Configuration | conftest.py, pytest.ini |
| Fixtures | pytest fixtures |

### Java

| Playwright Test Feature | Alternative |
|------------------------|-------------|
| Parallel execution | TestNG (parallel attribute), JUnit 5 (parallel) |
| Sharding | CI job matrix |
| Reports | Allure, ExtentReports |
| Configuration | testng.xml, property files |

### C#/.NET

| Playwright Test Feature | Alternative |
|------------------------|-------------|
| Parallel execution | NUnit/xUnit parallel execution features |
| Sharding | CI job matrix |
| Reports | Allure, ExtentReports |

---

## 6. Feature Comparison with Selenium (Playwright Unique Features)

Below are **Playwright's unique advantages** over Selenium.

| Feature | Playwright | Selenium |
|---------|------------|----------|
| **Communication method** | DevTools Protocol (WebSocket) | WebDriver Protocol (HTTP) |
| **Auto-wait** | ✅ Built-in | ❌ Manual implementation required |
| **Network interception** | ✅ Built-in | ❌ Requires selenium-wire etc. |
| **Browser Context** | ✅ Lightweight isolation | ❌ New instance required |
| **Trace Viewer** | ✅ Built-in | ❌ None |
| **Codegen** | ✅ Built-in | ⚠️ Selenium IDE (separate tool) |
| **Execution speed** | 🚀 Fast | 🐢 Somewhat slow |
| **Setup** | Easy (auto browser download) | Complex (driver management required)* |
| **Flaky tests** | Fewer | More common |

> \* Selenium 4+ improved with Selenium Manager

### Selenium Advantages

| Feature | Selenium | Playwright |
|---------|----------|------------|
| **Supported languages** | Java, Python, C#, JS, Ruby (PHP, Perl via third-party) | JS/TS, Python, Java, C# |
| **Supported browsers** | Chrome, Firefox, Safari, Edge, Opera | Chromium, Firefox, WebKit |
| **Real device testing** | ✅ Appium integration | ❌ Emulation only |
| **Community** | Very large | Growing |
| **IE compatibility mode** | ⚠️ Edge IE Mode only (since June 2022) | ❌ Not supported |

> **Note**: Since June 2022, Selenium no longer officially supports standalone Internet Explorer. The IE Driver only supports execution in Microsoft Edge's IE compatibility mode.

---

## 7. Language Selection Guidelines

```
┌─────────────────────────────────────────────────────────────┐
│                Language Selection Flowchart                  │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
              ┌───────────────────────────────┐
              │ Want to utilize latest        │
              │ features fully?               │
              └───────────────────────────────┘
                     │               │
                    Yes              No
                     │               │
                     ▼               ▼
            ┌─────────────┐  ┌───────────────────────────┐
            │ Choose      │  │ What's your team's        │
            │ TypeScript  │  │ preferred language?       │
            └─────────────┘  └───────────────────────────┘
                                      │
                              ┌───────┴───────┐
                              │               │
                         Python/Java      C#/.NET
                              │               │
                              ▼               ▼
                    ┌─────────────┐  ┌─────────────┐
                    │ Choose      │  │ Choose      │
                    │ Python/Java │  │ C#          │
                    └─────────────┘  └─────────────┘
```

### Recommended Patterns

| Scenario | Recommended Language | Reason |
|----------|---------------------|--------|
| New project, maximum feature utilization | **TypeScript** | Full Playwright Test features |
| QA team led, simplicity priority | **Python** | Low learning curve |
| Integration with existing Java assets | **Java** | Ecosystem utilization |
| .NET application testing | **C#** | Unified technology stack |

---

## 8. Summary

### Feature Richness Ranking

```
TypeScript/JavaScript ████████████████████ 100%
Python                ████████████████     80%
Java                  ██████████████       70%
C#/.NET               ██████████████       70%
```

### Key Points

1. **Core browser automation features** are equivalent across all languages
2. **Playwright Test** (test runner) is JS/TS exclusive
3. **Sharding, UI Mode, VS Code integration** are JS/TS exclusive
4. Other languages can achieve equivalent functionality through **external tool combinations**
5. **Auto-wait, Network interception, Trace Viewer** are major differentiators compared to Selenium

---

## Reference Links

- [Playwright Official Documentation](https://playwright.dev/)
- [Playwright Python](https://playwright.dev/python/)
- [Playwright Java](https://playwright.dev/java/)
- [Playwright .NET](https://playwright.dev/dotnet/)
- [Sharding Guide](https://playwright.dev/docs/test-sharding)
- [Parallel Execution Guide](https://playwright.dev/docs/test-parallel)
