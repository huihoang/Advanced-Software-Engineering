package org.example.test.qc.ui_testing.sprint2;

import com.aventstack.extentreports.ExtentReports;
import com.aventstack.extentreports.ExtentTest;
import org.example.test.qc.util.ReportUtil;
import org.example.test.qc.util.BrowserFactory;
import org.junit.jupiter.api.*;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import java.util.List;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.openqa.selenium.Keys;

/**
 * Test class for verifying the "Find Doctor" feature.
 * <p>
 * This class manages test lifecycle methods (setup and teardown)
 * and integrates ExtentReports for generating test execution reports.
 * Each test case related to find doctors should be defined here.
 * </p>
 */
public class FindDoctor {

    /** WebDriver instance for interacting with the browser */
    private WebDriver driver;

    /** Shared ExtentReports instance for all tests */
    private static ExtentReports extent;

    /** ExtentTest instance for logging individual test results */
    private ExtentTest test;

    /** Logger instance for logging test execution details */
    private static final Logger logger = LoggerFactory.getLogger(ViewProfile.class);

    /**
     * Initializes ExtentReports once before all tests.
     * <p>
     * Ensures the reporting system is ready before test execution begins.
     * Called only once per test class.
     * </p>
     */
    @BeforeAll
    public static void setupReport() {
        extent = ReportUtil.getInstance();
    }

    /**
     * Sets up an individual test before execution.
     * <p>
     * Creates a timestamped entry in ExtentReports for each test
     * and logs which test is currently being executed.
     * </p>
     *
     * @param testInfo Metadata of the currently running test (used to name reports)
     */
    @BeforeEach
    public void setup(TestInfo testInfo) {
        String timestamp = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
        test = extent.createTest(testInfo.getDisplayName() + " - " + timestamp);
        logger.info("Starting test: {}", testInfo.getDisplayName());
    }



    /**
     * Closes the WebDriver instance after each test.
     * <p>
     * Prevents resource leaks by ensuring all browser sessions are terminated.
     * Executed even if a test fails.
     * </p>
     */
    @AfterEach
    public void tearDown() {
        if (driver != null) {
            logger.info("Closing WebDriver instance after test.");
            driver.quit();
        }
    }

    /**
     * Finalizes and writes the ExtentReports report after all tests complete.
     * <p>
     * Ensures that all logs and results are properly flushed and saved
     * into the output HTML report for later review.
     * </p>
     */
    @AfterAll
    public static void closeTest() {
        logger.info("Closing ExtentReports after all ViewProfile tests.");
        ReportUtil.closeReport();
    }
}
