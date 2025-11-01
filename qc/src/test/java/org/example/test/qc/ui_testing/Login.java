package org.example.test.qc.ui_testing;

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

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Set;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * UI Test class for login functionality.
 * <p>
 * This class demonstrates how to integrate Selenium WebDriver tests
 * with ExtentReports for generating detailed HTML reports.
 * </p>
 *
 * <p>Each test method will automatically create a timestamped test log entry
 * and will close the browser instance after execution.</p>
 *
 * <p>Reports are initialized once before all tests
 * and finalized after all test cases complete.</p>
 */
public class Login {

    /** WebDriver instance for interacting with the browser */
    private WebDriver driver;

    /** Shared ExtentReports instance for all tests */
    private static ExtentReports extent;

    /** ExtentTest instance for logging individual test results */
    private ExtentTest test;

    /** Logger instance for logging test lifecycle events */
    private static final Logger logger = LoggerFactory.getLogger(Login.class);

    /**
     * Initializes the ExtentReports instance before all test methods run.
     * <p>
     * This ensures that the report file is created and ready to log test results.
     * </p>
     */
    @BeforeAll
    public static void setupReport() {
        extent = ReportUtil.getInstance();
    }

    /**
     * Sets up the test environment before each test case.
     * <p>
     * Creates a new test log in the Extent report with the current test name
     * and a timestamp for easier tracking.
     * </p>
     *
     * param testInfo information about the currently running test (provided by JUnit)
     */
    @BeforeEach
    public void setup(TestInfo testInfo) {
        String timestamp = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
        test = extent.createTest(testInfo.getDisplayName() + " - " + timestamp);
    }

    /**
     * Cleans up after each test execution.
     * <p>
     * Closes the WebDriver instance to ensure that no browser processes remain open.
     * </p>
     */
    @AfterEach
    public void tearDown() {
        if (driver != null) {
            driver.quit();
        }
    }

    /**
     * Finalizes the ExtentReports instance after all tests are completed.
     * <p>
     * This ensures that all test data is written to the report file.
     * </p>
     */
    @AfterAll
    public static void closeTest() {
        ReportUtil.closeReport();
    }
}
