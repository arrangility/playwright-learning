package com.example.steps;

import com.example.hooks.BrowserHooks;
import com.example.pages.CatalogPage;
import com.example.pages.components.CartComponent;
import io.cucumber.java.en.And;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;

import static org.assertj.core.api.Assertions.assertThat;

public class CartSteps {

    @When("{string}をカートに追加する")
    public void addToCart(String productName) {
        CatalogPage catalogPage = new CatalogPage(BrowserHooks.getPage());
        catalogPage.addToCart(productName);
        BrowserHooks.getPage().waitForTimeout(300);
    }

    @Then("カートに商品が{int}件ある")
    public void verifyCartItemCount(int expectedCount) {
        CartComponent cartComponent = new CartComponent(BrowserHooks.getPage());
        BrowserHooks.getPage().waitForTimeout(300);
        int count = cartComponent.getItemCount();
        assertThat(count).isEqualTo(expectedCount);
    }

    @Then("カートの合計が{int}円より大きい")
    public void verifyCartTotalGreaterThan(int minAmount) {
        CartComponent cartComponent = new CartComponent(BrowserHooks.getPage());
        int total = cartComponent.getTotal();
        assertThat(total).isGreaterThan(minAmount);
    }

    @Then("カートの合計が正しい")
    public void verifyCartTotalIsCorrect() {
        CartComponent cartComponent = new CartComponent(BrowserHooks.getPage());
        int total = cartComponent.getTotal();
        assertThat(total).isGreaterThan(0);
    }

    @Then("{string}のカートに追加ボタンが無効である")
    public void verifyAddToCartDisabled(String productName) {
        CatalogPage catalogPage = new CatalogPage(BrowserHooks.getPage());
        boolean isEnabled = catalogPage.isAddToCartEnabled(productName);
        assertThat(isEnabled).isFalse();
    }

    @When("カートから{string}を削除する")
    public void removeFromCart(String productName) {
        CartComponent cartComponent = new CartComponent(BrowserHooks.getPage());
        cartComponent.removeItem(productName);
        BrowserHooks.getPage().waitForTimeout(300);
    }

    @Then("カートが空である")
    public void verifyCartIsEmpty() {
        CartComponent cartComponent = new CartComponent(BrowserHooks.getPage());
        assertThat(cartComponent.isEmpty()).isTrue();
    }

    @Then("チェックアウトボタンが有効である")
    public void verifyCheckoutEnabled() {
        CartComponent cartComponent = new CartComponent(BrowserHooks.getPage());
        assertThat(cartComponent.isCheckoutEnabled()).isTrue();
    }
}
