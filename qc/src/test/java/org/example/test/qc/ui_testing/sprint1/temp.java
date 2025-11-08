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
public class temp{
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
     * LOGIN_RESGISTER_2: Login with incorrect email and valid password.
     * <p>
     * Steps:
     * 1. Open the login page.
     * 2. Enter an invalid email and correct password.
     * 3. Click Sign In.
     * 4. Verify an error message like "Login failed:".
     * Expected Result: Login fails with correct error message displayed.
     * </p>
     */
    @ParameterizedTest
    @ValueSource(strings = {"chrome", "edge", "firefox"})
    public void testLoginWithIncorrectEmail(String browser) {
        logger.info("=== Starting login test with browser: {} ===", browser);

        driver = BrowserFactory.getDriver(browser);
        driver.get("http://localhost:5173/login");
        logger.info("Navigated to login page");

        try {
            WebElement usernameField = driver.findElement(By.name("username"));
            usernameField.sendKeys("wrongemail@gmail.com");
            logger.debug("Entered invalid username: wrongemail@gmail.com");

            WebElement passwordField = driver.findElement(By.name("password"));
            passwordField.sendKeys("password1");
            logger.debug("Entered valid password");

            WebElement signInButton = driver.findElement(By.xpath("//button[span[text()='Sign In']]"));
            signInButton.click();
            logger.info("Clicked on Sign In button");

            Thread.sleep(3000);

            List<WebElement> errorMessages = driver.findElements(By.xpath("//*[contains(text(), 'Login failed:')]"));
            if (!errorMessages.isEmpty()) {
                logger.info("Detected 'Invalid email or password.' message — test passed.");
                test.pass("Displayed correct error message: Invalid email or password.");
            } else {
                logger.warn("Error message not found — test failed.");
                test.fail("Expected error message not found.");
            }

        } catch (Exception e) {
            logger.error("Error occurred during login test: {}", e.getMessage(), e);
            test.fail(e.getMessage());
        } finally {
            logger.info("=== Finished login test with browser: {} ===", browser);
        }
    }

    /**
     * LOGIN_REGISTER_3: Login with correct email but incorrect password.
     * <p>
     * Steps:
     * 1. Open login page.
     * 2. Enter valid email and invalid password.
     * 3. Click Sign In.
     * 4. Verify error message "Login failed:".
     * Expected Result: Login fails and displays the correct error.
     * </p>
     */
    @ParameterizedTest
    @ValueSource(strings = {"chrome", "edge", "firefox"})
    public void testLoginWithIncorrectPassword(String browser) {
        logger.info("=== Starting login test with browser: {} ===", browser);

        driver = BrowserFactory.getDriver(browser);
        driver.get("http://localhost:5173/login");
        logger.info("Navigated to login page");

        try {
            WebElement usernameField = driver.findElement(By.name("username"));
            usernameField.sendKeys("example@gmail.com");
            logger.debug("Entered valid username");

            WebElement passwordField = driver.findElement(By.name("password"));
            passwordField.sendKeys("wrongpass");
            logger.debug("Entered incorrect password");

            WebElement signInButton = driver.findElement(By.xpath("//button[span[text()='Sign In']]"));
            signInButton.click();
            logger.info("Clicked on Sign In button");

            Thread.sleep(3000);

            List<WebElement> errorMessages = driver.findElements(By.xpath("//*[contains(text(), 'Login failed:')]"));
            if (!errorMessages.isEmpty()) {
                logger.info("Detected 'Invalid email or password.' message — test passed.");
                test.pass("Displayed correct error message: Invalid email or password.");
            } else {
                logger.warn("Error message not found — test failed.");
                test.fail("Expected error message not found.");
            }

        } catch (Exception e) {
            logger.error("Error occurred during login test: {}", e.getMessage(), e);
            test.fail(e.getMessage());
        } finally {
            logger.info("=== Finished login test with browser: {} ===", browser);
        }
    }


    /**
     * LOGIN_REGISTER_4: Successful login with valid phone number and password
     * <p>
     * Objective: Verify that a user can log in successfully using a valid phone number 
     * and correct password.
     * </p>
     *
     * <p><b>Test Procedure:</b></p>
     * - Open the login page.  
     * - Enter a valid phone number (e.g., "0912345678").  
     * - Enter a valid password.  
     * - Click the “Sign In” button.  
     *
     * <p><b>Expected Result:</b></p>
     * - The system should navigate to the home page (“http://localhost:5173”).  
     * - Login should succeed without showing any error message.  
     */
    @ParameterizedTest
    @ValueSource(strings = {"chrome", "edge", "firefox"})
    public void testLoginSuccessfullyWithPhone(String browser) {
        driver = BrowserFactory.getDriver(browser);
        logger.info("Start testLoginSuccessfullyWithPhone on browser: {}", browser);
        driver.get("http://localhost:5173/login");

        try {
            // Enter valid phone number and password
            WebElement usernameField = driver.findElement(By.name("username"));
            usernameField.sendKeys("0912345678");
            WebElement passwordField = driver.findElement(By.name("password"));
            passwordField.sendKeys("password1");

            // Click Sign In button
            driver.findElement(By.xpath("//button[span[text()='Sign In']]")).click();
            Thread.sleep(3000);

            // Verify that login redirects to homepage
            String currentUrl = driver.getCurrentUrl();
            Assertions.assertEquals("http://localhost:5173", currentUrl, "Login with phone should succeed.");
            logger.info("Login successfully with phone number.");
            test.pass("Login successfully with phone number.");
        } catch (Exception e) {
            logger.error("Error during login with phone number: {}", e.getMessage());
            test.fail(e.getMessage());
        } finally {
            driver.quit();
        }
    }

    /**
     * LOGIN_REGISTER_5: Login with invalid phone number (not registered)
     * <p>
     * Objective: Verify that login fails when the user enters a phone number 
     * that does not exist in the system.
     * </p>
     *
     * <p><b>Test Procedure:</b></p>
     * - Open the login page.  
     * - Enter a non-existent phone number (e.g., "0999999999").  
     * - Enter a valid password.  
     * - Click the “Sign In” button.  
     *
     * <p><b>Expected Result:</b></p>
     * - The system should display an error message “Login failed:”  
     * - User should not be logged in.  
     */
    @ParameterizedTest
    @ValueSource(strings = {"chrome", "edge", "firefox"})
    public void testLoginWithInvalidPhone(String browser) {
        driver = BrowserFactory.getDriver(browser);
        logger.info("Start testLoginWithInvalidPhone on browser: {}", browser);
        driver.get("http://localhost:5173/login");

        try {
            // Enter invalid phone number and valid password
            WebElement usernameField = driver.findElement(By.name("username"));
            usernameField.sendKeys("0999999999");
            WebElement passwordField = driver.findElement(By.name("password"));
            passwordField.sendKeys("password1");

            // Click Sign In button
            driver.findElement(By.xpath("//button[span[text()='Sign In']]")).click();
            Thread.sleep(2000);

            // Verify that proper error message is shown
            WebElement errorMsg = driver.findElement(By.xpath("//*[contains(text(),'Login failed:')]"));
            Assertions.assertTrue(errorMsg.isDisplayed(), "Error message should be displayed.");
            logger.info("Displayed error for invalid phone number.");
            test.pass("Displayed error for invalid phone number.");
        } catch (Exception e) {
            logger.error("Error during invalid phone login test: {}", e.getMessage());
            test.fail(e.getMessage());
        } finally {
            driver.quit();
        }
    }

    /**
     * LOGIN_REGISTER_6: Login with valid phone number and incorrect password
     * <p>
     * Objective: Verify that the system prevents login when the user enters 
     * a valid phone number but an incorrect password.
     * </p>
     *
     * <p><b>Test Procedure:</b></p>
     * - Open the login page.  
     * - Enter a valid phone number (e.g., "0912345678").  
     * - Enter an incorrect password.  
     * - Click the “Sign In” button.  
     *
     * <p><b>Expected Result:</b></p>
     * - The system should display the message “Login failed:”  
     * - The user should remain on the login page.  
     */
    @ParameterizedTest
    @ValueSource(strings = {"chrome", "edge", "firefox"})
    public void testLoginWithIncorrectPhonePassword(String browser) {
        driver = BrowserFactory.getDriver(browser);
        logger.info("Start testLoginWithIncorrectPhonePassword on browser: {}", browser);
        driver.get("http://localhost:5173/login");

        try {
            // Enter valid phone number and wrong password
            WebElement usernameField = driver.findElement(By.name("username"));
            usernameField.sendKeys("0912345678");
            WebElement passwordField = driver.findElement(By.name("password"));
            passwordField.sendKeys("wrongpassword");

            // Click Sign In button
            driver.findElement(By.xpath("//button[span[text()='Sign In']]")).click();
            Thread.sleep(2000);

            // Verify error message is displayed
            WebElement errorMsg = driver.findElement(By.xpath("//*[contains(text(),'Login failed:')]"));
            Assertions.assertTrue(errorMsg.isDisplayed(), "Should show incorrect password message.");
            logger.info("Displayed error for incorrect password.");
            test.pass("Displayed error for incorrect password.");
        } catch (Exception e) {
            logger.error("Error during wrong password login test: {}", e.getMessage());
            test.fail(e.getMessage());
        } finally {
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