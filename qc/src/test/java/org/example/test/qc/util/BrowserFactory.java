package org.example.test.qc.util;

import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.edge.EdgeDriver;
import org.openqa.selenium.firefox.FirefoxDriver;

/**
 * Factory class for creating and managing different types of WebDriver instances.
 * <p>
 * This class provides a simple interface to initialize a browser driver
 * (Chrome, Firefox, Edge) based on the given browser name.
 * </p>
 *
 * <p><b>Example usage:</b></p>
 * <pre>{@code
 * WebDriver driver = BrowserFactory.getDriver("chrome");
 * driver.get("https://example.com");
 * }</pre>
 */
public class BrowserFactory {

    /**
     * Returns a {@link WebDriver} instance based on the provided browser name.
     * <p>
     * Supported browsers include:
     * <ul>
     *   <li><b>chrome</b> – Uses {@link ChromeDriver}.</li>
     *   <li><b>firefox</b> – Uses {@link FirefoxDriver}.</li>
     *   <li><b>edge</b> – Uses {@link EdgeDriver}.</li>
     * </ul>
     * </p>
     *
     * <p>If the browser name does not match any supported option,
     * an {@link IllegalArgumentException} will be thrown.</p>
     *
     * @param browser the name of the browser to initialize (e.g., "chrome", "firefox", "edge")
     * @return a configured instance of the corresponding {@link WebDriver}
     * @throws IllegalArgumentException if the provided browser name is not supported
     */
    public static WebDriver getDriver(String browser) {
        WebDriver driver;

        switch (browser.toLowerCase()) {
            case "chrome":
                // Initialize ChromeDriver with default options
                ChromeOptions options = new ChromeOptions();
                driver = new ChromeDriver(options);
                break;

            case "firefox":
                // Setup and initialize FirefoxDriver
                WebDriverManager.firefoxdriver().setup();
                driver = new FirefoxDriver();
                break;

            case "edge":
                // Setup and initialize EdgeDriver
                WebDriverManager.edgedriver().setup();
                driver = new EdgeDriver();
                break;

            default:
                // Handle unsupported browsers
                throw new IllegalArgumentException("Trình duyệt không được hỗ trợ: " + browser);
        }

        return driver;
    }

}
