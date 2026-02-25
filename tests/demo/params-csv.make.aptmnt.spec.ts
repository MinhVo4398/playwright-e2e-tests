import { test, expect } from "@playwright/test";


import fileHelper from "../helpers/file-helper.js";
import path from "path";

const csvPath = path.resolve(
  `${process.cwd()}/data/functional/make-ampt-test-data.csv`,
);

const makeApptTestData = fileHelper.readCSV(csvPath); // -> return 3 objects of data

// Access the data

for (const apptData of makeApptTestData) {
  test.describe("Make appointment ", () => {
    test.beforeEach("Login with valid credentials", async ({ page }) => {
      // 1. Launch URL and assert title and header
      await page.goto("https://katalon-demo-cura.herokuapp.com/");
      await expect(page).toHaveTitle("CURA Healthcare Service");
      await expect(page.locator("//h1")).toContainText(
        "CURA Healthcare Service",
      );

      // 2. Click on the Make Appointment
      await page.getByRole("link", { name: "Make Appointment" }).click();
      await expect(page.getByText("Please login to make")).toBeVisible();

      // 3. Successful Login
      await page.getByLabel("Username").fill(process.env.TEST_USER_NAME);
      await page.getByLabel("Password").fill(process.env.TEST_USER_PASSWORD);
      await page.getByRole("button", { name: "Login" }).click();

      // Get login cookies
      const loginCookies = await page.context().cookies();
      process.env.LOGIN_COOKIES = JSON.stringify(loginCookies);

      // 4. Verify successful login
      await expect(page.locator("h2")).toContainText("Make Appointment");
    });

    test(`${apptData.testId} -Should make an appointment with non-default `, async ({
      page,
    }) => {
       // Access the login cookies
       console.log(`>>> LOGIN_COOKIES: ${process.env.LOGIN_COOKIES}`);

      // Dropdown
      await page.getByLabel("Facility").selectOption(`${apptData.facility}`);
      // Checkbox
      await page.getByText("Apply for hospital readmission").click();
      // Radio button
      await page.getByText(`${apptData.hcp}`).click();
      // Date input box
      await page
        .getByRole("textbox", { name: "Visit Date (Required)" })
        .click();
      await page
        .getByRole("textbox", { name: "Visit Date (Required)" })
        .fill(`${apptData.visitDt}`);
      await page
        .getByRole("textbox", { name: "Visit Date (Required)" })
        .press("Enter");
      // Multi-line comments input box
      await page.getByRole("textbox", { name: "Comment" }).click();
      await page
        .getByRole("textbox", { name: "Comment" })
        .fill("This is a multi-line comments\ncaptured by Playwright");
      await page.getByRole("button", { name: "Book Appointment" }).click();
      // Assertions
      await expect(page.locator("h2")).toContainText(
        "Appointment Confirmation",
      );
      await expect(
        page.getByRole("link", { name: "Go to Homepage" }),
      ).toBeVisible();
    });
  });
}
