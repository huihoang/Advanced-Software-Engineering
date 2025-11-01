package org.example.test.qc.ui_testing;

import com.aventstack.extentreports.ExtentReports;
import com.aventstack.extentreports.ExtentTest;
import org.example.test.qc.util.ReportUtil;
import org.junit.jupiter.api.*;
import org.openqa.selenium.WebDriver;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * UI Test class for user registration functionality.
 * <p>
 * This class is responsible for preparing the environment for UI-based
 * registration tests and integrating them with ExtentReports
 * to generate detailed HTML test reports.
 * </p>
 *
 * <p>The test lifecycle follows:
 * <ul>
 *     <li>{@code @BeforeAll}: Initialize report</li>
 *     <li>{@code @BeforeEach}: Create new test log with timestamp</li>
 *     <li>{@code @AfterEach}: Quit browser driver</li>
 *     <li>{@code @AfterAll}: Finalize and flush report</li>
 * </ul>
 * </p>
 */
public class Register {

    /** WebDriver instance for interacting with the browser */
    private WebDriver driver;

    /** Shared ExtentReports instance for all tests */
    private static ExtentReports extent;

    /** ExtentTest instance for logging individual test results */
    private ExtentTest test;

    /** Logger instance for logging test lifecycle events */
    private static final Logger logger = LoggerFactory.getLogger(Register.class);

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
