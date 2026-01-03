package com.example;

import com.microsoft.playwright.*;
import com.microsoft.playwright.options.*;
import org.junit.jupiter.api.*;

import java.util.regex.Pattern;

import static com.microsoft.playwright.assertions.PlaywrightAssertions.assertThat;

@TestInstance(TestInstance.Lifecycle.PER_CLASS)
public class BlogTestSafari {

    private Playwright playwright;
    private Browser browser;
    private BrowserContext context;
    private Page page;

    @BeforeAll
    void setupAll() {
        playwright = Playwright.create();
        // Safari (WebKit) をヘッドレスモードで起動
        browser = playwright.webkit().launch(new BrowserType.LaunchOptions()
            .setHeadless(true));
    }

    @AfterAll
    void teardownAll() {
        browser.close();
        playwright.close();
    }

    @BeforeEach
    void setup() {
        context = browser.newContext();
        page = context.newPage();
    }

    @AfterEach
    void teardown() {
        context.close();
    }

    @Test
    @DisplayName("【Safari】ホームページからBlogページに遷移できること")
    void shouldNavigateToBlogPage() {
        // 1. ホームページを開く
        page.navigate("https://www.arrangility.com/");

        // ホームページが表示されていることを確認
        assertThat(page).hasTitle(Pattern.compile("Software testing"));

        // 2. Blogリンクをクリック
        Locator blogLink = page.getByRole(AriaRole.LINK,
            new Page.GetByRoleOptions().setName("Blog")).first();
        blogLink.click();

        // 3. Blogページが表示されることを確認
        assertThat(page).hasURL(Pattern.compile("/blog"));
        assertThat(page).hasTitle(Pattern.compile("Blog"));

        // Blogページの見出しが表示されていることを確認
        Locator heading = page.getByRole(AriaRole.HEADING,
            new Page.GetByRoleOptions().setName("Blog"));
        assertThat(heading).isVisible();
    }
}
