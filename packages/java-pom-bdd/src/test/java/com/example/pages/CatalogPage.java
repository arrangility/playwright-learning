package com.example.pages;

import com.microsoft.playwright.Locator;
import com.microsoft.playwright.Page;

import java.util.ArrayList;
import java.util.List;
import java.util.regex.Pattern;

public class CatalogPage extends BasePage {
    private final Locator searchInput;
    private final Locator sortSelect;
    private final Locator categoryTabs;
    private final Locator productCards;

    public CatalogPage(Page page) {
        super(page);
        this.searchInput = page.getByPlaceholder("商品を検索...");
        this.sortSelect = page.getByRole(com.microsoft.playwright.options.AriaRole.COMBOBOX,
                new Page.GetByRoleOptions().setName("並び替え"));
        this.categoryTabs = page.getByRole(com.microsoft.playwright.options.AriaRole.TABLIST,
                new Page.GetByRoleOptions().setName("商品カテゴリ"));
        this.productCards = page.getByRole(com.microsoft.playwright.options.AriaRole.BUTTON,
                new Page.GetByRoleOptions().setName(Pattern.compile("カートに追加")));
    }

    public void searchProduct(String keyword) {
        searchInput.fill(keyword);
        page.waitForTimeout(500);
    }

    public void clearSearch() {
        searchInput.clear();
    }

    public void sortBy(String option) {
        sortSelect.selectOption(option);
    }

    public void filterByCategory(String category) {
        categoryTabs.getByRole(com.microsoft.playwright.options.AriaRole.TAB,
                new Locator.GetByRoleOptions().setName(category)).click();
    }

    public int getProductCount() {
        return productCards.count();
    }

    public void addToCart(String productName) {
        Locator productImg = page.getByRole(com.microsoft.playwright.options.AriaRole.IMG,
                new Page.GetByRoleOptions().setName(productName));
        Locator card = productImg.locator("..");
        card.getByRole(com.microsoft.playwright.options.AriaRole.BUTTON,
                new Locator.GetByRoleOptions().setName(Pattern.compile("カートに追加"))).click();
    }

    public boolean isAddToCartEnabled(String productName) {
        Locator productImg = page.getByRole(com.microsoft.playwright.options.AriaRole.IMG,
                new Page.GetByRoleOptions().setName(productName));
        Locator card = productImg.locator("..");
        Locator button = card.getByRole(com.microsoft.playwright.options.AriaRole.BUTTON,
                new Locator.GetByRoleOptions().setName(Pattern.compile("カートに追加")));
        return button.isEnabled();
    }

    public boolean isProductVisible(String productName) {
        return page.locator("text=" + productName).isVisible();
    }

    public void clickCategoryTab(String category) {
        categoryTabs.getByRole(com.microsoft.playwright.options.AriaRole.TAB,
                new Locator.GetByRoleOptions().setName(category)).click();
    }

    public boolean areCategoryTabsVisible() {
        return categoryTabs.isVisible();
    }

    public boolean isSortedByPriceAsc() {
        List<Locator> cards = page.locator("[class*='MuiCard-root']").all();
        if (cards.size() < 2) return true;

        List<Integer> prices = new ArrayList<>();
        for (Locator card : cards) {
            String priceText = card.locator("text=/¥[0-9,]+/").first().textContent();
            if (priceText != null) {
                String numStr = priceText.replace("¥", "").replace(",", "");
                prices.add(Integer.parseInt(numStr));
            }
        }

        for (int i = 1; i < prices.size(); i++) {
            if (prices.get(i) < prices.get(i - 1)) {
                return false;
            }
        }
        return true;
    }
}
