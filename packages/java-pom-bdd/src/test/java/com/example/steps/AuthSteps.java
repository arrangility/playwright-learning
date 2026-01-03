package com.example.steps;

import com.example.hooks.BrowserHooks;
import com.example.pages.LoginPage;
import com.example.pages.RegisterPage;
import com.example.pages.components.HeaderComponent;
import io.cucumber.java.en.And;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;

import static org.assertj.core.api.Assertions.assertThat;

public class AuthSteps {

    @Given("ログイン済みである")
    public void loggedIn() {
        HeaderComponent header = new HeaderComponent(BrowserHooks.page);
        header.clickLogin();
        LoginPage loginPage = new LoginPage(BrowserHooks.page);
        loginPage.login("demo", "Demo@2025!");
        BrowserHooks.page.waitForTimeout(500);
    }

    @When("ログインボタンをクリックする")
    public void clickLoginButton() {
        HeaderComponent header = new HeaderComponent(BrowserHooks.page);
        header.clickLogin();
    }

    @When("ユーザー名{string}とパスワード{string}でログインする")
    public void loginWithCredentials(String username, String password) {
        LoginPage loginPage = new LoginPage(BrowserHooks.page);
        loginPage.login(username, password);
        BrowserHooks.page.waitForTimeout(300);
    }

    @Then("ログインに成功する")
    public void verifyLoginSuccess() {
        BrowserHooks.page.waitForTimeout(500);
        LoginPage loginPage = new LoginPage(BrowserHooks.page);
        assertThat(loginPage.isVisible()).isFalse();
    }

    @Then("ログインダイアログが表示されたままである")
    public void verifyLoginDialogStillVisible() {
        LoginPage loginPage = new LoginPage(BrowserHooks.page);
        assertThat(loginPage.isVisible()).isTrue();
    }

    @Then("ログアウトボタンが表示される")
    public void verifyLogoutButtonVisible() {
        HeaderComponent header = new HeaderComponent(BrowserHooks.page);
        assertThat(header.isLogoutButtonVisible()).isTrue();
    }

    @Then("ログインボタンが表示される")
    public void verifyLoginButtonVisible() {
        HeaderComponent header = new HeaderComponent(BrowserHooks.page);
        assertThat(header.isLoginButtonVisible()).isTrue();
    }

    @When("ログアウトする")
    public void logout() {
        HeaderComponent header = new HeaderComponent(BrowserHooks.page);
        header.clickLogout();
        BrowserHooks.page.waitForTimeout(300);
    }

    // Register steps
    @And("新規登録リンクをクリックする")
    public void clickRegisterLink() {
        LoginPage loginPage = new LoginPage(BrowserHooks.page);
        loginPage.clickRegisterLink();
    }

    @When("ユーザー名{string}、メール{string}、パスワード{string}で登録する")
    public void registerWithCredentials(String username, String email, String password) {
        RegisterPage registerPage = new RegisterPage(BrowserHooks.page);
        registerPage.register(username, email, password);
        BrowserHooks.page.waitForTimeout(300);
    }

    @When("ユーザー名{string}、メール{string}、パスワード{string}、確認パスワード{string}で登録する")
    public void registerWithDifferentPasswords(String username, String email, String password, String confirmPassword) {
        RegisterPage registerPage = new RegisterPage(BrowserHooks.page);
        registerPage.registerWithDifferentPasswords(username, email, password, confirmPassword);
        BrowserHooks.page.waitForTimeout(300);
    }

    @Then("登録ダイアログが閉じる")
    public void verifyRegisterDialogClosed() {
        RegisterPage registerPage = new RegisterPage(BrowserHooks.page);
        BrowserHooks.page.waitForTimeout(500);
        assertThat(registerPage.isVisible()).isFalse();
    }

    @Then("登録ダイアログが表示されたままである")
    public void verifyRegisterDialogStillVisible() {
        RegisterPage registerPage = new RegisterPage(BrowserHooks.page);
        assertThat(registerPage.isVisible()).isTrue();
    }
}
