package com.example.steps;

import com.example.hooks.BrowserHooks;
import com.example.pages.components.HeaderComponent;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;

import java.util.regex.Pattern;

import static org.assertj.core.api.Assertions.assertThat;

public class CommonSteps {

    @Given("ShopTodoのホームページを開く")
    public void openHomePage() {
        BrowserHooks.page.navigate("https://toasagi.github.io/shoptodo-app/");
        BrowserHooks.page.waitForLoadState();
        BrowserHooks.page.waitForSelector("button:has-text(\"カートに追加\")",
                new com.microsoft.playwright.Page.WaitForSelectorOptions().setTimeout(10000));
    }

    @When("英語に切り替える")
    public void switchToEnglish() {
        HeaderComponent header = new HeaderComponent(BrowserHooks.page);
        header.switchToEnglish();
        BrowserHooks.page.waitForTimeout(300);
    }

    @When("日本語に切り替える")
    public void switchToJapanese() {
        HeaderComponent header = new HeaderComponent(BrowserHooks.page);
        header.switchToJapanese();
        BrowserHooks.page.waitForTimeout(300);
    }

    @Then("ページが英語で表示される")
    public void verifyEnglishPage() {
        var englishElements = BrowserHooks.page.getByText(Pattern.compile("Login|Product|Cart|Checkout"));
        assertThat(englishElements.first().isVisible()).isTrue();
    }

    @Then("ページが日本語で表示される")
    public void verifyJapanesePage() {
        var japaneseElements = BrowserHooks.page.getByText(Pattern.compile("ログイン|商品|カート"));
        assertThat(japaneseElements.first().isVisible()).isTrue();
    }
}
