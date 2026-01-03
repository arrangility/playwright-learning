package com.example.pages.components;

import com.microsoft.playwright.Locator;
import com.microsoft.playwright.Page;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class CartComponent {
    private final Page page;
    private final Locator cartSection;
    private final Locator cartTotal;
    private final Locator checkoutButton;
    private final Locator emptyMessage;

    public CartComponent(Page page) {
        this.page = page;
        this.cartSection = page.getByRole(com.microsoft.playwright.options.AriaRole.COMPLEMENTARY);
        this.cartTotal = cartSection.locator("text=/合計:/");
        this.checkoutButton = page.getByRole(com.microsoft.playwright.options.AriaRole.BUTTON,
                new Page.GetByRoleOptions().setName("チェックアウト"));
        this.emptyMessage = page.getByText("カートは空です");
    }

    public int getTotal() {
        String totalText = cartTotal.textContent();
        if (totalText != null) {
            Pattern pattern = Pattern.compile("¥([\\d,]+)");
            Matcher matcher = pattern.matcher(totalText);
            if (matcher.find()) {
                return Integer.parseInt(matcher.group(1).replace(",", ""));
            }
        }
        return 0;
    }

    public int getItemCount() {
        Locator removeButtons = cartSection.getByRole(com.microsoft.playwright.options.AriaRole.BUTTON,
                new Locator.GetByRoleOptions().setName("🗑️"));
        return removeButtons.count();
    }

    public boolean isEmpty() {
        return emptyMessage.isVisible();
    }

    public void checkout() {
        checkoutButton.click();
    }

    public boolean isCheckoutEnabled() {
        return checkoutButton.isEnabled();
    }

    public void removeItem(String productName) {
        Locator cartItem = cartSection.locator("text=" + productName)
                .locator("xpath=ancestor::*[.//button]").first();
        cartItem.getByRole(com.microsoft.playwright.options.AriaRole.BUTTON,
                new Locator.GetByRoleOptions().setName("🗑️")).click();
    }
}
