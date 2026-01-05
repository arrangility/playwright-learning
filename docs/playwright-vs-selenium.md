# Playwright vs Selenium Comparison

## Locators

| Feature | Playwright | Selenium |
|---------|------------|----------|
| `getByRole()` | ✅ Built-in | ❌ None |
| `getByLabel()` | ✅ Built-in | ❌ None |
| `getByText()` | ✅ Built-in | ⚠️ Use XPath |
| CSS selector | ✅ | ✅ |
| XPath | ✅ | ✅ |
| data-testid | ✅ `getByTestId()` | ⚠️ Via CSS/XPath |

## Code Comparison: Button Click

### Playwright

```java
page.getByRole(AriaRole.BUTTON, new Page.GetByRoleOptions().setName("Submit"));
```

### Selenium - Using XPath

```java
driver.findElement(By.xpath("//button[text()='Submit']"));
driver.findElement(By.xpath("//*[@role='button' and text()='Submit']"));
```

## ARIA Snapshot

| Feature | Playwright | Selenium |
|---------|------------|----------|
| ARIA Snapshot retrieval | ✅ `ariaSnapshot()` | ❌ None |
| Snapshot validation | ✅ `matchesAriaSnapshot()` | ❌ None |
| Accessibility tree | ✅ Built-in | ❌ None |

## Other Feature Comparison

| Feature | Playwright | Selenium |
|---------|------------|----------|
| Auto-wait | ✅ Built-in | ❌ Explicit wait required |
| Network control | ✅ Easy | ⚠️ Complex |
| Multi-tab handling | ✅ Easy | ⚠️ Complex |
| Screenshots | ✅ | ✅ |
| Parallel execution | ✅ Built-in | ⚠️ Grid required |
| Browser installation | ✅ Automatic | ❌ Manual |

## Wait Handling Differences

### Playwright - Auto-wait

```java
page.getByRole(AriaRole.BUTTON, opts.setName("Submit")).click();
```

### Selenium - Explicit Wait Required

```java
WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
WebElement button = wait.until(
    ExpectedConditions.elementToBeClickable(By.xpath("//button[text()='Submit']"))
);
button.click();
```

## Overall Comparison

| Aspect | Playwright | Selenium |
|--------|------------|----------|
| Role-based testing | ◎ | △ |
| ARIA Snapshot | ◎ | ✗ |
| Developer experience | ◎ | ○ |
| Learning curve | Low | High |
| History/Track record | New (2020~) | Long (2004~) |
| Enterprise adoption | Growing | High |

## Selection Guidelines

### Reasons to Choose Selenium

- Large existing test assets
- Team is familiar with Selenium
- Need to support older browsers

### Reasons to Choose Playwright

- New project
- Accessibility focus
- Modern developer experience

## Reference Links

- [Playwright Official](https://playwright.dev/)
- [Selenium Official](https://www.selenium.dev/)
- [Playwright vs Selenium (Official Comparison)](https://playwright.dev/docs/selenium)
