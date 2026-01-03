package com.example.hooks;

import com.microsoft.playwright.*;
import io.cucumber.java.After;
import io.cucumber.java.Before;
import io.cucumber.java.Scenario;

public class BrowserHooks {
    private static final ThreadLocal<Playwright> playwright = new ThreadLocal<>();
    private static final ThreadLocal<Browser> browser = new ThreadLocal<>();
    private static final ThreadLocal<BrowserContext> context = new ThreadLocal<>();
    private static final ThreadLocal<Page> pageThreadLocal = new ThreadLocal<>();

    @Before
    public void setUp(Scenario scenario) {
        playwright.set(Playwright.create());
        browser.set(playwright.get().chromium().launch(
                new BrowserType.LaunchOptions().setHeadless(true)));
        context.set(browser.get().newContext());
        pageThreadLocal.set(context.get().newPage());
    }

    @After
    public void tearDown(Scenario scenario) {
        Page currentPage = pageThreadLocal.get();
        if (scenario.isFailed() && currentPage != null) {
            byte[] screenshot = currentPage.screenshot();
            scenario.attach(screenshot, "image/png", "screenshot");
        }
        if (context.get() != null) {
            context.get().close();
        }
        if (browser.get() != null) {
            browser.get().close();
        }
        if (playwright.get() != null) {
            playwright.get().close();
        }
        pageThreadLocal.remove();
        context.remove();
        browser.remove();
        playwright.remove();
    }

    public static Page getPage() {
        return pageThreadLocal.get();
    }
}
