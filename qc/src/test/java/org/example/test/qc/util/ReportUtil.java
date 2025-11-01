package org.example.test.qc.util;

import com.aventstack.extentreports.ExtentReports;
import com.aventstack.extentreports.reporter.ExtentSparkReporter;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

/**
 * Utility class for managing ExtentReports instance.
 * <p>
 * This class provides methods to create, retrieve, and close
 * a singleton instance of {@link ExtentReports} used for generating
 * HTML reports of automated test executions.
 * </p>
 */
public class ReportUtil {
    // Singleton instance of ExtentReports
    private static ExtentReports extent;

    /**
     * Returns the singleton instance of {@link ExtentReports}.
     * <p>
     * If the instance does not exist, this method initializes a new
     * ExtentReports object and configures it with an ExtentSparkReporter.
     * The generated report file is stored in the path:
     * <code>./src/test/java/org/example/test/qc/reports/print1/_yyyy-MM-dd.html</code>
     * where the date is the current date.
     * </p>
     *
     * @return a configured instance of {@link ExtentReports}.
     */
    public static ExtentReports getInstance() {
        if (extent == null) {
            // Generate file name with current date
            String timestamp = LocalDate.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd"));
            String logPath = "./src/test/java/org/example/test/qc/reports/print1/_" + timestamp + ".html";

            // Create and configure the HTML reporter
            ExtentSparkReporter reporter = new ExtentSparkReporter(logPath);
            reporter.config().setReportName("Automation Test Report - " + timestamp);

            // Attach reporter to ExtentReports instance
            extent = new ExtentReports();
            extent.attachReporter(reporter);
        }
        return extent;
    }

    /**
     * Flushes and closes the ExtentReports instance.
     * <p>
     * This method ensures that all logged test information is written
     * to the report file. Should be called at the end of test execution.
     * </p>
     */
    public static void closeReport() {
        if (extent != null) {
            extent.flush();
        }
    }
}
