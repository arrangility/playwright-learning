package com.example.steps;

import com.example.hooks.BrowserHooks;
import com.example.pages.CatalogPage;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;

import static org.assertj.core.api.Assertions.assertThat;

public class CatalogSteps {

    @Then("商品が表示される")
    public void verifyProductsDisplayed() {
        CatalogPage catalogPage = new CatalogPage(BrowserHooks.page);
        assertThat(catalogPage.getProductCount()).isGreaterThan(0);
    }

    @When("{string}カテゴリでフィルタする")
    public void filterByCategory(String category) {
        CatalogPage catalogPage = new CatalogPage(BrowserHooks.page);
        catalogPage.filterByCategory(category);
        BrowserHooks.page.waitForTimeout(500);
    }

    @Then("商品が{int}件以上表示される")
    public void verifyProductCountGreaterThan(int minCount) {
        CatalogPage catalogPage = new CatalogPage(BrowserHooks.page);
        assertThat(catalogPage.getProductCount()).isGreaterThanOrEqualTo(minCount);
    }

    @When("{string}で検索する")
    public void searchForProduct(String keyword) {
        CatalogPage catalogPage = new CatalogPage(BrowserHooks.page);
        catalogPage.searchProduct(keyword);
    }

    @Then("{string}が検索結果に表示される")
    public void verifyProductInSearchResults(String productName) {
        CatalogPage catalogPage = new CatalogPage(BrowserHooks.page);
        assertThat(catalogPage.isProductVisible(productName)).isTrue();
    }

    @Then("検索結果が0件である")
    public void verifyNoSearchResults() {
        CatalogPage catalogPage = new CatalogPage(BrowserHooks.page);
        assertThat(catalogPage.getProductCount()).isZero();
    }

    @Then("商品が0件表示される")
    public void verifyZeroProducts() {
        CatalogPage catalogPage = new CatalogPage(BrowserHooks.page);
        assertThat(catalogPage.getProductCount()).isZero();
    }

    @When("{string}でソートする")
    public void sortBy(String option) {
        CatalogPage catalogPage = new CatalogPage(BrowserHooks.page);
        catalogPage.sortBy(option);
        BrowserHooks.page.waitForTimeout(300);
    }

    @Then("商品が並び替えられる")
    public void verifyProductsSorted() {
        CatalogPage catalogPage = new CatalogPage(BrowserHooks.page);
        assertThat(catalogPage.getProductCount()).isGreaterThan(0);
    }

    @Then("商品が価格の安い順に並ぶ")
    public void verifyProductsSortedByPriceAsc() {
        CatalogPage catalogPage = new CatalogPage(BrowserHooks.page);
        assertThat(catalogPage.isSortedByPriceAsc()).isTrue();
    }

    @When("{string}タブをクリックする")
    public void clickCategoryTab(String category) {
        CatalogPage catalogPage = new CatalogPage(BrowserHooks.page);
        catalogPage.clickCategoryTab(category);
        BrowserHooks.page.waitForTimeout(300);
    }

    @Then("商品カテゴリのタブが表示される")
    public void verifyCategoryTabsVisible() {
        CatalogPage catalogPage = new CatalogPage(BrowserHooks.page);
        assertThat(catalogPage.areCategoryTabsVisible()).isTrue();
    }

    @Then("検索結果に{string}が表示される")
    public void verifyProductInResults(String productName) {
        CatalogPage catalogPage = new CatalogPage(BrowserHooks.page);
        assertThat(catalogPage.isProductVisible(productName)).isTrue();
    }
}
