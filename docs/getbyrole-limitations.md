# Cases Where getByRole() Cannot Be Used and Solutions

## 1. Non-Semantic Elements

```html
<!-- ❌ No role - getByRole not possible -->
<div class="btn" onclick="submit()">Submit</div>
<span class="link" onclick="navigate()">Details</span>

<!-- ✅ Correct implementation -->
<button type="submit">Submit</button>
<a href="/detail">Details</a>
```

## 2. Custom Components (Without role Attribute)

```html
<!-- ❌ Custom dropdown -->
<div class="dropdown">
  <div class="dropdown-trigger">Please select</div>
  <div class="dropdown-menu">
    <div class="dropdown-item">Option 1</div>
    <div class="dropdown-item">Option 2</div>
  </div>
</div>

<!-- ✅ With ARIA attributes -->
<div role="combobox" aria-expanded="false">
  <div role="option">Option 1</div>
  <div role="option">Option 2</div>
</div>
```

## 3. Icon-Only Buttons (Without Labels)

```html
<!-- ❌ Not identifiable -->
<button><svg class="icon-search"></svg></button>
<button><i class="fa fa-edit"></i></button>

<!-- ✅ With aria-label -->
<button aria-label="Search"><svg class="icon-search"></svg></button>
<button aria-label="Edit"><i class="fa fa-edit"></i></button>
```

## 4. Multiple Elements with Same Role and Name

```html
<!-- ❌ Cannot distinguish which "Details" link -->
<article>
  <h3>Product A</h3>
  <a href="/a">Details</a>
</article>
<article>
  <h3>Product B</h3>
  <a href="/b">Details</a>  <!-- Same name -->
</article>
```

### Solutions

```typescript
// Method 1: Filter by parent element
page.getByRole('article').filter({ hasText: 'Product A' })
    .getByRole('link', { name: 'Details' })

// Method 2: Use data-testid
page.getByTestId('product-a-detail')
```

## 5. Dynamically Generated Content

```html
<!-- ❌ No element during loading -->
<div id="results"></div>

<!-- After JavaScript -->
<div id="results">
  <div class="item">Result 1</div>  <!-- No role/label -->
</div>
```

## 6. Elements Inside Canvas/SVG

```html
<!-- ❌ Canvas internals are not DOM -->
<canvas id="chart"></canvas>

<!-- ❌ SVG internals are not easily recognized by role -->
<svg>
  <rect class="bar" onclick="showDetail()"></rect>
</svg>
```

## Summary Table

| Pattern | Problem | Solution |
|---------|---------|----------|
| `<div>` button | No role | Use `<button>` or `role="button"` |
| Icon only | No name | Add `aria-label` |
| Multiple same-name elements | Not identifiable | Filter by parent or `data-testid` |
| Custom UI | No role | Add `role` attribute |
| Canvas/SVG | Outside DOM | `data-testid` or alternative text |

## Key Points for Development Teams

1. **Use semantic HTML** - `<button>`, `<a>`, `<nav>`, etc.
2. **Add aria-label to icon buttons** - Screen reader support
3. **Add role attribute to complex UI** - Custom component support
4. **Use data-testid as last resort** - Test-specific attribute

## Playwright Locator Priority

| Priority | Locator | Use Case |
|----------|---------|----------|
| 1 | `getByRole()` | Buttons, links, headings, etc. |
| 2 | `getByLabel()` | Form input fields |
| 3 | `getByPlaceholder()` | Placeholder text |
| 4 | `getByText()` | Identify by displayed text |
| 5 | `getByTestId()` | data-testid attribute |
| Last resort | `locator()` | CSS/XPath selectors |

## Reference Links

- [Playwright Locators](https://playwright.dev/docs/locators)
- [WAI-ARIA Roles](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles)
- [Semantic HTML](https://developer.mozilla.org/en-US/docs/Glossary/Semantics#semantics_in_html)
