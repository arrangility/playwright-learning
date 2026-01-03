package com.example.pages;

import com.microsoft.playwright.Locator;
import com.microsoft.playwright.Page;

public class RegisterPage extends BasePage {
    private final Locator dialog;
    private final Locator usernameInput;
    private final Locator emailInput;
    private final Locator passwordInput;
    private final Locator confirmPasswordInput;
    private final Locator registerButton;

    public RegisterPage(Page page) {
        super(page);
        this.dialog = page.getByRole(com.microsoft.playwright.options.AriaRole.DIALOG,
                new Page.GetByRoleOptions().setName("新規登録"));
        this.usernameInput = dialog.getByLabel("ユーザー名:");
        this.emailInput = dialog.getByLabel("メールアドレス");
        this.passwordInput = dialog.getByLabel("パスワード:");
        this.confirmPasswordInput = dialog.getByLabel("パスワード確認:");
        this.registerButton = dialog.getByRole(com.microsoft.playwright.options.AriaRole.BUTTON,
                new Locator.GetByRoleOptions().setName("新規登録"));
    }

    public boolean isVisible() {
        return dialog.isVisible();
    }

    public void register(String username, String email, String password) {
        usernameInput.fill(username);
        emailInput.fill(email);
        passwordInput.fill(password);
        confirmPasswordInput.fill(password);
        registerButton.click();
    }

    public void registerWithDifferentPasswords(String username, String email, String password, String confirmPassword) {
        usernameInput.fill(username);
        emailInput.fill(email);
        passwordInput.fill(password);
        confirmPasswordInput.fill(confirmPassword);
        registerButton.click();
    }
}
