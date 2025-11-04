package org.example.test.qc.ui_testing.sprint1;

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

/**
 * UI Test class for login functionality.
 * <p>
 * This class automates the testing of various login scenarios
 * using Selenium WebDriver and generates an HTML test report via ExtentReports.
 * </p>
 */
public class LoginTest {

    /** WebDriver instance for interacting with the browser */
    private WebDriver driver;

    /** Shared ExtentReports instance for all tests */
    private static ExtentReports extent;

    /** ExtentTest instance for logging individual test results */
    private ExtentTest test;

    /** Logger instance for logging test execution details */
    private static final Logger logger = LoggerFactory.getLogger(LoginTest.class);

    /**
     * Initializes ExtentReports once before all tests.
     * <p>
     * Ensures the reporting system is ready before test execution begins.
     * </p>
     */
    @BeforeAll
    public static void setupReport() {
        extent = ReportUtil.getInstance();
    }

    /**
     * Sets up an individual test.
     * <p>
     * Creates a timestamped entry in ExtentReports for the test
     * and logs which test is being executed.
     * </p>
     */
    @BeforeEach
    public void setup(TestInfo testInfo) {
        String timestamp = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
        test = extent.createTest(testInfo.getDisplayName() + " - " + timestamp);
    }

    /**
     * LOGIN_REGISTER_1: Login successfully with valid credentials.
     * <p>
     * Steps:
     * 1. Launch the browser and open the login page.
     * 2. Enter a valid email and password.
     * 3. Click the Sign In button.
     * 4. Verify redirection to the homepage URL.
     * Expected Result: Login succeeds and redirects to homepage.
     * </p>
     */
    @ParameterizedTest
    @ValueSource(strings = {"chrome", "edge", "firefox"})
    public void testLoginSuccessfully(String browser) {
        logger.info("=== Starting login test with browser: {} ===", browser);

        driver = BrowserFactory.getDriver(browser);
        driver.get("http://localhost:5173/login");
        logger.info("Navigated to login page");

        try {
            WebElement usernameField = driver.findElement(By.name("username"));
            usernameField.sendKeys("example@gmail.com");
            logger.debug("Entered username: example@gmail.com");

            WebElement passwordField = driver.findElement(By.name("password"));
            passwordField.sendKeys("password1");
            logger.debug("Entered password");

            WebElement signInButton = driver.findElement(By.xpath("//button[span[text()='Login']]"));
            signInButton.click();
            logger.info("Clicked on Sign In button");

            Thread.sleep(3000);

            String currentUrl = driver.getCurrentUrl();
            String expectedUrl = "http://localhost:5173";

            if (currentUrl.equals(expectedUrl)) {
                logger.info("Login successful. Current URL: {}", currentUrl);
                test.pass("Login successful.");
            } else {
                logger.warn("Login failed. Expected URL: {}, but got: {}", expectedUrl, currentUrl);
                test.fail("Login failed.");
            }

        } catch (Exception e) {
            logger.error("Error occurred during login test: {}", e.getMessage(), e);
            test.fail(e.getMessage());
        } finally {
            logger.info("=== Finished login test with browser: {} ===", browser);
        }
    }

    /**
     * Closes the WebDriver instance after each test.
     * <p>
     * Prevents resource leaks by ensuring all browser sessions are terminated.
     * </p>
     */
    @AfterEach
    public void tearDown() {
        if (driver != null) {
            driver.quit();
        }
    }


    /**
     * Finalizes and writes the ExtentReports report after all tests complete.
     * <p>
     * Ensures all logs are flushed and saved to the output HTML report.
     * </p>
     */
    @AfterAll
    public static void closeTest() {
        ReportUtil.closeReport();
    }
}
