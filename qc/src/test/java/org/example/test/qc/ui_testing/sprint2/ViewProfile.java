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
 * Test class for verifying the "View Doctor Patient Profile" feature.
 * <p>
 * This class manages test lifecycle methods (setup and teardown)
 * and integrates ExtentReports for generating test execution reports.
 * Each test case related to viewing doctor or patient profiles should be defined here.
 * </p>
 */
public class ViewProfile {

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
     * LOGIN_DOCTOR_1:
     * Verify that doctor list page displays successfully after login.
     */
    @ParameterizedTest
    @ValueSource(strings = {"chrome", "edge", "firefox"})
    @Order(1)
    @DisplayName("Hiển thị trang danh sách bác sĩ thành công khi người dùng đã đăng nhập")
    public void testViewDoctorListAfterLogin(String browser) {
        driver = BrowserFactory.getDriver(browser);
        try {
            logger.info("Start testViewDoctorListAfterLogin on {}", browser);
            driver.get("http://localhost:5173/login");

            // Step 1–4: Login
            driver.findElement(By.name("username")).sendKeys("example@gmail.com");
            driver.findElement(By.name("password")).sendKeys("password1");
            driver.findElement(By.xpath("//button[span[text()='Sign In']]")).click();
            Thread.sleep(3000);

            // Step 5: Navigate to Doctor List
            driver.get("http://localhost:5173/doctors");
            Thread.sleep(2000);

            // Expected: Page URL is correct and doctor list visible
            String currentUrl = driver.getCurrentUrl();
            Assertions.assertEquals("http://localhost:5173/doctors", currentUrl, "Should navigate to doctor list page.");

            test.pass("Doctor list page displayed successfully after login.");
            logger.info("Doctor list page displayed successfully after login.");
        } catch (Exception e) {
            logger.error("Error in testViewDoctorListAfterLogin: {}", e.getMessage());
            test.fail(e.getMessage());
        }
    }

    /**
     * LOGIN_DOCTOR_2:
     * Verify that doctor list page is not accessible without login.
     */
    @ParameterizedTest
    @ValueSource(strings = {"chrome", "edge", "firefox"})
    @Order(2)
    @DisplayName("Hiển thị trang danh sách bác sĩ thất bại khi người dùng chưa đăng nhập")
    public void testViewDoctorListWithoutLogin(String browser) {
        driver = BrowserFactory.getDriver(browser);
        try {
            logger.info("Start testViewDoctorListWithoutLogin on {}", browser);
            driver.get("http://localhost:5173/doctors");
            Thread.sleep(2000);

            // Expected: Redirect to login page
            String currentUrl = driver.getCurrentUrl();
            Assertions.assertTrue(currentUrl.contains("login"), "User should be redirected to login page.");

            test.pass("Access to doctor list blocked without login (redirected to login).");
            logger.info("Access to doctor list blocked without login.");
        } catch (Exception e) {
            logger.error("Error in testViewDoctorListWithoutLogin: {}", e.getMessage());
            test.fail(e.getMessage());
        }
    }

    /**
     * LOGIN_DOCTOR_3:
     * Verify that searching for an existing doctor name succeeds.
     */
    @ParameterizedTest
    @ValueSource(strings = {"chrome", "edge", "firefox"})
    @Order(3)
    @DisplayName("Tìm kiếm bác sĩ theo tên thành công sau khi đăng nhập")
    public void testSearchDoctorByNameSuccess(String browser) {
        driver = BrowserFactory.getDriver(browser);
        try {
            logger.info("Start testSearchDoctorByNameSuccess on {}", browser);
            driver.get("http://localhost:5173/login");

            // Login
            driver.findElement(By.name("username")).sendKeys("example@gmail.com");
            driver.findElement(By.name("password")).sendKeys("password1");
            driver.findElement(By.xpath("//button[span[text()='Sign In']]")).click();
            Thread.sleep(3000);

            // Go to doctor list
            driver.get("http://localhost:5173/doctors");
            Thread.sleep(2000);

            // Search for doctor
            WebElement searchBox = driver.findElement(By.name("search"));
            searchBox.sendKeys("Nguyễn Văn A");
            searchBox.sendKeys(Keys.ENTER);
            Thread.sleep(2000);

            // Expected: Doctor list contains result
            WebElement result = driver.findElement(By.xpath("//*[contains(text(),'Nguyễn Văn A')]"));
            Assertions.assertTrue(result.isDisplayed(), "Doctor should appear in search results.");

            test.pass("Doctor search by name succeeded.");
            logger.info("Doctor search by name succeeded.");
        } catch (Exception e) {
            logger.error("Error in testSearchDoctorByNameSuccess: {}", e.getMessage());
            test.fail(e.getMessage());
        }
    }

    /**
     * LOGIN_DOCTOR_4:
     * Verify that searching for a non-existent doctor name fails.
     */
    @ParameterizedTest
    @ValueSource(strings = {"chrome", "edge", "firefox"})
    @Order(4)
    @DisplayName("Tìm kiếm bác sĩ theo tên thất bại (không tồn tại)")
    public void testSearchDoctorByNameFail(String browser) {
        driver = BrowserFactory.getDriver(browser);
        try {
            logger.info("Start testSearchDoctorByNameFail on {}", browser);
            driver.get("http://localhost:5173/login");

            // Login
            driver.findElement(By.name("username")).sendKeys("example@gmail.com");
            driver.findElement(By.name("password")).sendKeys("password1");
            driver.findElement(By.xpath("//button[span[text()='Sign In']]")).click();
            Thread.sleep(3000);

            // Go to doctor list
            driver.get("http://localhost:5173/doctors");
            Thread.sleep(2000);

            // Search non-existing doctor
            WebElement searchBox = driver.findElement(By.name("search"));
            searchBox.sendKeys("Trần Vô Danh");
            searchBox.sendKeys(Keys.ENTER);
            Thread.sleep(2000);

            // Expected: Display message "Không tìm thấy bác sĩ"
            WebElement message = driver.findElement(By.xpath("//*[contains(text(),'Không tìm thấy bác sĩ')]"));
            Assertions.assertTrue(message.isDisplayed(), "No results message should be displayed.");

            test.pass("Doctor search failed correctly for non-existing name.");
            logger.info("Doctor search failed correctly for non-existing name.");
        } catch (Exception e) {
            logger.error("Error in testSearchDoctorByNameFail: {}", e.getMessage());
            test.fail(e.getMessage());
        }
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
