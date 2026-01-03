package com.example;

import com.microsoft.playwright.*;
import com.microsoft.playwright.options.*;
import org.junit.jupiter.api.*;

import java.util.regex.Pattern;

import static com.microsoft.playwright.assertions.PlaywrightAssertions.assertThat;

@TestInstance(TestInstance.Lifecycle.PER_CLASS)
public class BlogTest {

    private Playwright playwright;
    private Browser browser;
    private BrowserContext context;
    private Page page;

    @BeforeAll
    void setupAll() {
        playwright = Playwright.create();
        browser = playwright.chromium().launch(new BrowserType.LaunchOptions()
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
    @DisplayName("ホームページからBlogページに遷移できること")
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

    @Test
    @DisplayName("Blogページにブログ記事一覧が表示されること")
    void shouldDisplayBlogArticles() {
        // ホームページを開く
        page.navigate("https://www.arrangility.com/");

        // Blogリンクをクリック
        page.getByRole(AriaRole.LINK,
            new Page.GetByRoleOptions().setName("Blog")).first().click();

        // ブログ記事へのリンクが存在することを確認
        Locator articleLinks = page.getByRole(AriaRole.LINK,
            new Page.GetByRoleOptions().setName(Pattern.compile("Test Automation|Cypress|BDD|Appium|Reka")));
        assertThat(articleLinks.first()).isVisible();
    }

    @Test
    @DisplayName("ナビゲーションにBlogリンクが存在すること")
    void shouldHaveBlogLinkInNavigation() {
        page.navigate("https://www.arrangility.com/");

        // ナビゲーション内のBlogリンクを確認
        Locator nav = page.getByRole(AriaRole.NAVIGATION,
            new Page.GetByRoleOptions().setName("Main"));
        assertThat(nav).isVisible();

        Locator blogLink = nav.getByRole(AriaRole.LINK,
            new Locator.GetByRoleOptions().setName("Blog"));
        assertThat(blogLink).isVisible();
        assertThat(blogLink).hasAttribute("href", "/blog");
    }

    @Test
    @DisplayName("ナビゲーションの構造をARIA Snapshotで検証")
    void shouldMatchNavigationAriaSnapshot() {
        page.navigate("https://www.arrangility.com/");

        // ナビゲーションのリスト構造をARIA Snapshotで検証
        Locator nav = page.getByRole(AriaRole.NAVIGATION,
            new Page.GetByRoleOptions().setName("Main"));
        Locator navList = nav.getByRole(AriaRole.LIST).first();

        // ARIA Snapshotでナビゲーション順序を検証
        assertThat(navList).matchesAriaSnapshot("""
            - list:
              - listitem:
                - link "Home"
              - listitem: Services
              - listitem:
                - link "Blog"
              - listitem:
                - link "Company"
            """);
    }
}
