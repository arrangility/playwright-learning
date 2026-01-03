package com.example.pages;

import com.microsoft.playwright.Locator;
import com.microsoft.playwright.Page;

public class LoginPage extends BasePage {
    private final Locator dialog;
    private final Locator usernameInput;
    private final Locator passwordInput;
    private final Locator loginButton;
    private final Locator registerLink;

    public LoginPage(Page page) {
        super(page);
        this.dialog = page.getByRole(com.microsoft.playwright.options.AriaRole.DIALOG,
                new Page.GetByRoleOptions().setName("ログイン"));
        this.usernameInput = dialog.getByLabel("ユーザー名:");
        this.passwordInput = dialog.getByLabel("パスワード:");
        this.loginButton = dialog.getByRole(com.microsoft.playwright.options.AriaRole.BUTTON,
                new Locator.GetByRoleOptions().setName("ログイン"));
        this.registerLink = dialog.getByRole(com.microsoft.playwright.options.AriaRole.LINK,
                new Locator.GetByRoleOptions().setName("新規登録"));
    }

    public boolean isVisible() {
        return dialog.isVisible();
    }

    public void login(String username, String password) {
        usernameInput.fill(username);
        passwordInput.fill(password);
        loginButton.click();
    }

    public void clickRegisterLink() {
        registerLink.click();
    }
}
