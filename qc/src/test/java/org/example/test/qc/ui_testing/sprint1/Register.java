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
     * LOGIN_REGISTER_7: Successful registration with valid information
     *
     * Objective: Verify that a new user can register successfully using valid information.
     *
     * Test Procedure:
     * - Open the register page.
     * - Enter a unique email (e.g., "newuser123@example.com").
     * - Enter a unique phone number (e.g., "0987654321").
     * - Enter a valid password.
     * - Click “Sign Up”.
     *
     * Expected Result:
     * - Registration should succeed.
     * - System redirects to home page ("http://localhost:5173").
     */
    @ParameterizedTest
    @ValueSource(strings = {"chrome", "edge", "firefox"})
    public void testRegisterSuccessfully(String browser) {
        driver = BrowserFactory.getDriver(browser);
        logger.info("Start testRegisterSuccessfully on browser: {}", browser);
        driver.get("http://localhost:5173/register");

        try {
            // Fill in registration form
            driver.findElement(By.name("email")).sendKeys("newuser" + System.currentTimeMillis() + "@example.com");
            driver.findElement(By.name("phone")).sendKeys("09" + (int)(Math.random() * 10000000));
            driver.findElement(By.name("password")).sendKeys("password123");

            // Click Sign Up
            driver.findElement(By.xpath("//button[span[text()='Sign Up']]")).click();
            Thread.sleep(3000);

            String currentUrl = driver.getCurrentUrl();
            Assertions.assertEquals("http://localhost:5173", currentUrl, "Registration should redirect to homepage.");
            logger.info("Registration successful.");
            test.pass("Registration successful.");
        } catch (Exception e) {
            logger.error("Error during registration: {}", e.getMessage());
            test.fail(e.getMessage());
        } finally {
            driver.quit();
        }
    }

    /**
     * LOGIN_REGISTER_8: Registration fails with existing email
     *
     * Objective: Verify that user cannot register with an already registered email.
     *
     * Expected Result:
     * - Error message like “Email already exists” is displayed.
     * - User stays on the registration page.
     */
    @ParameterizedTest
    @ValueSource(strings = {"chrome", "edge", "firefox"})
    public void testRegisterFailWithExistingEmail(String browser) {
        driver = BrowserFactory.getDriver(browser);
        logger.info("Start testRegisterFailWithExistingEmail on browser: {}", browser);
        driver.get("http://localhost:5173/register");

        try {
            driver.findElement(By.name("email")).sendKeys("existing@example.com");
            driver.findElement(By.name("phone")).sendKeys("0976543210");
            driver.findElement(By.name("password")).sendKeys("password123");

            driver.findElement(By.xpath("//button[span[text()='Sign Up']]")).click();
            Thread.sleep(2000);

            WebElement errorMessage = driver.findElement(By.xpath("//*[contains(text(), 'Email already exists')]"));
            Assertions.assertTrue(errorMessage.isDisplayed(), "Error message should be shown for existing email.");

            logger.info("Registration failed with existing email as expected.");
            test.pass("Registration failed with existing email as expected.");
        } catch (Exception e) {
            logger.error("Error during registration with existing email: {}", e.getMessage());
            test.fail(e.getMessage());
        } finally {
            driver.quit();
        }
    }

    /**
     * LOGIN_REGISTER_9: Registration fails with existing phone number
     *
     * Objective: Verify that user cannot register with a phone number that is already registered.
     *
     * Expected Result:
     * - Error message like “Phone number already exists” is displayed.
     * - User stays on the registration page.
     */
    @ParameterizedTest
    @ValueSource(strings = {"chrome", "edge", "firefox"})
    public void testRegisterFailWithExistingPhone(String browser) {
        driver = BrowserFactory.getDriver(browser);
        logger.info("Start testRegisterFailWithExistingPhone on browser: {}", browser);
        driver.get("http://localhost:5173/register");

        try {
            driver.findElement(By.name("email")).sendKeys("newmail" + System.currentTimeMillis() + "@example.com");
            driver.findElement(By.name("phone")).sendKeys("0912345678"); // already used
            driver.findElement(By.name("password")).sendKeys("password123");

            driver.findElement(By.xpath("//button[span[text()='Sign Up']]")).click();
            Thread.sleep(2000);

            WebElement errorMessage = driver.findElement(By.xpath("//*[contains(text(), 'Phone number already exists')]"));
            Assertions.assertTrue(errorMessage.isDisplayed(), "Error message should be shown for existing phone.");

            logger.info("Registration failed with existing phone number as expected.");
            test.pass("Registration failed with existing phone number as expected.");
        } catch (Exception e) {
            logger.error("Error during registration with existing phone: {}", e.getMessage());
            test.fail(e.getMessage());
        } finally {
            driver.quit();
        }
    }

    /**
     * LOGIN_REGISTER_10: Registration fails with invalid email format
     *
     * Objective: Verify that the system prevents registration when the email format is invalid.
     *
     * Test Procedure:
     * - Open the register page.
     * - Enter an invalid email (e.g., "invalidemail").
     * - Fill in other valid fields.
     * - Click “Sign Up”.
     *
     * Expected Result:
     * - Error message like “Invalid email format” is displayed.
     * - Registration does not succeed.
     */
    @ParameterizedTest
    @ValueSource(strings = {"chrome", "edge", "firefox"})
    public void testRegisterFailWithInvalidEmailFormat(String browser) {
        driver = BrowserFactory.getDriver(browser);
        logger.info("Start testRegisterFailWithInvalidEmailFormat on browser: {}", browser);
        driver.get("http://localhost:5173/register");

        try {
            driver.findElement(By.name("email")).sendKeys("invalidemail");
            driver.findElement(By.name("phone")).sendKeys("0987654321");
            driver.findElement(By.name("password")).sendKeys("password123");
            driver.findElement(By.name("confirmPassword")).sendKeys("password123");

            driver.findElement(By.xpath("//button[span[text()='Sign Up']]")).click();
            Thread.sleep(1500);

            WebElement errorMessage = driver.findElement(By.xpath("//*[contains(text(), 'Invalid email format')]"));
            Assertions.assertTrue(errorMessage.isDisplayed(), "Error message should appear for invalid email.");
            logger.info("Registration failed with invalid email format as expected.");
            test.pass("Registration failed with invalid email format as expected.");
        } catch (Exception e) {
            logger.error("Error during registration with invalid email format: {}", e.getMessage());
            test.fail(e.getMessage());
        } finally {
            driver.quit();
        }
    }

    /**
     * LOGIN_REGISTER_11: Registration fails with invalid phone number format
     *
     * Objective: Verify that user cannot register with a malformed phone number.
     *
     * Test Procedure:
     * - Open the register page.
     * - Enter an invalid phone number (e.g., "12345").
     * - Fill in valid email and password.
     * - Click “Sign Up”.
     *
     * Expected Result:
     * - Error message like “Invalid phone number” is displayed.
     * - Registration should fail.
     */
    @ParameterizedTest
    @ValueSource(strings = {"chrome", "edge", "firefox"})
    public void testRegisterFailWithInvalidPhoneFormat(String browser) {
        driver = BrowserFactory.getDriver(browser);
        logger.info("Start testRegisterFailWithInvalidPhoneFormat on browser: {}", browser);
        driver.get("http://localhost:5173/register");

        try {
            driver.findElement(By.name("email")).sendKeys("validuser" + System.currentTimeMillis() + "@example.com");
            driver.findElement(By.name("phone")).sendKeys("12345");
            driver.findElement(By.name("password")).sendKeys("password123");
            driver.findElement(By.name("confirmPassword")).sendKeys("password123");

            driver.findElement(By.xpath("//button[span[text()='Sign Up']]")).click();
            Thread.sleep(1500);

            WebElement errorMessage = driver.findElement(By.xpath("//*[contains(text(), 'Invalid phone number')]"));
            Assertions.assertTrue(errorMessage.isDisplayed(), "Error message should appear for invalid phone number.");
            logger.info("Registration failed with invalid phone format as expected.");
            test.pass("Registration failed with invalid phone format as expected.");
        } catch (Exception e) {
            logger.error("Error during registration with invalid phone format: {}", e.getMessage());
            test.fail(e.getMessage());
        } finally {
            driver.quit();
        }
    }

    /**
     * LOGIN_REGISTER_12: Registration fails when confirm password does not match
     *
     * Objective: Verify that registration fails if confirm password does not match password.
     *
     * Test Procedure:
     * - Open the register page.
     * - Enter valid email, phone, and password.
     * - Enter a different confirm password.
     * - Click “Sign Up”.
     *
     * Expected Result:
     * - Error message like “Passwords do not match” is displayed.
     * - Registration should fail.
     */
    @ParameterizedTest
    @ValueSource(strings = {"chrome", "edge", "firefox"})
    public void testRegisterFailWithMismatchedPasswords(String browser) {
        driver = BrowserFactory.getDriver(browser);
        logger.info("Start testRegisterFailWithMismatchedPasswords on browser: {}", browser);
        driver.get("http://localhost:5173/register");

        try {
            driver.findElement(By.name("email")).sendKeys("validuser" + System.currentTimeMillis() + "@example.com");
            driver.findElement(By.name("phone")).sendKeys("0978999888");
            driver.findElement(By.name("password")).sendKeys("password123");
            driver.findElement(By.name("confirmPassword")).sendKeys("password321");

            driver.findElement(By.xpath("//button[span[text()='Sign Up']]")).click();
            Thread.sleep(1500);

            WebElement errorMessage = driver.findElement(By.xpath("//*[contains(text(), 'Passwords do not match')]"));
            Assertions.assertTrue(errorMessage.isDisplayed(), "Error message should appear for mismatched passwords.");
            logger.info("Registration failed with mismatched passwords as expected.");
            test.pass("Registration failed with mismatched passwords as expected.");
        } catch (Exception e) {
            logger.error("Error during registration with mismatched passwords: {}", e.getMessage());
            test.fail(e.getMessage());
        } finally {
            driver.quit();
        }
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
