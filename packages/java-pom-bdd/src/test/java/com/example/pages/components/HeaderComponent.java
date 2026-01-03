package com.example.pages.components;

import com.microsoft.playwright.Locator;
import com.microsoft.playwright.Page;

public class HeaderComponent {
    private final Page page;
    private final Locator loginButton;
    private final Locator logoutButton;
    private final Locator enButton;
    private final Locator jpButton;

    public HeaderComponent(Page page) {
        this.page = page;
        this.loginButton = page.getByRole(com.microsoft.playwright.options.AriaRole.BUTTON,
                new Page.GetByRoleOptions().setName("ログイン"));
        this.logoutButton = page.getByRole(com.microsoft.playwright.options.AriaRole.BUTTON,
                new Page.GetByRoleOptions().setName("ログアウト"));
        this.enButton = page.getByRole(com.microsoft.playwright.options.AriaRole.BUTTON,
                new Page.GetByRoleOptions().setName("EN"));
        this.jpButton = page.getByRole(com.microsoft.playwright.options.AriaRole.BUTTON,
                new Page.GetByRoleOptions().setName("JP"));
    }

    public void clickLogin() {
        loginButton.click();
    }

    public void clickLogout() {
        logoutButton.click();
    }

    public boolean isLoginButtonVisible() {
        return loginButton.isVisible();
    }

    public boolean isLogoutButtonVisible() {
        return logoutButton.isVisible();
    }

    public void switchToEnglish() {
        enButton.click();
    }

    public void switchToJapanese() {
        jpButton.click();
    }
}
