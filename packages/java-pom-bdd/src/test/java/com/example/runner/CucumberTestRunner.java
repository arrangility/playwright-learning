package com.example.runner;

import org.junit.platform.suite.api.ConfigurationParameter;
import org.junit.platform.suite.api.IncludeEngines;
import org.junit.platform.suite.api.SelectClasspathResource;
import org.junit.platform.suite.api.Suite;

import static io.cucumber.junit.platform.engine.Constants.*;

@Suite
@IncludeEngines("cucumber")
@SelectClasspathResource("features")
@ConfigurationParameter(key = PLUGIN_PROPERTY_NAME, value = "pretty,html:target/cucumber-reports/cucumber.html")
@ConfigurationParameter(key = GLUE_PROPERTY_NAME, value = "com.example.steps,com.example.hooks")
@ConfigurationParameter(key = FILTER_TAGS_PROPERTY_NAME, value = "not @skip")
public class CucumberTestRunner {
}
