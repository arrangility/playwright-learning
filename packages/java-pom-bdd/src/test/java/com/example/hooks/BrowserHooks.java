package com.example.hooks;

import com.microsoft.playwright.*;
import io.cucumber.java.After;
import io.cucumber.java.Before;
import io.cucumber.java.Scenario;

public class BrowserHooks {
    private static Playwright playwright;
    private static Browser browser;
    public static BrowserContext context;
    public static Page page;

    @Before
    public void setUp(Scenario scenario) {
        playwright = Playwright.create();
        browser = playwright.chromium().launch(
                new BrowserType.LaunchOptions().setHeadless(true));
        context = browser.newContext();
        page = context.newPage();
    }

    @After
    public void tearDown(Scenario scenario) {
        if (scenario.isFailed()) {
            byte[] screenshot = page.screenshot();
            scenario.attach(screenshot, "image/png", "screenshot");
        }
        if (context != null) {
            context.close();
        }
        if (browser != null) {
            browser.close();
        }
        if (playwright != null) {
            playwright.close();
        }
    }

    public static Page getPage() {
        return page;
    }
}
