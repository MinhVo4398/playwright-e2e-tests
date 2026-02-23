import { test, expect } from "@playwright/test";

test.describe("Make appointment ", () => {
  test.beforeEach("Login with valid credentials", async ({ page }, testInfo) => {
    // 1. Launch URL and assert title and header
    // Get the URL from the config file
    const envConfig =  testInfo.project.use as any;
    await page.goto(envConfig.appURL);
    // await page.goto("https://katalon-demo-cura.herokuapp.com/");
    await page.goto("https://katalon-demo-cura.herokuapp.com/");
    await expect(page).toHaveTitle("CURA Healthcare Service");
    await expect(page.locator("//h1")).toContainText("CURA Healthcare Service");

    // 2. Click on the Make Appointment
    await page.getByRole("link", { name: "Make Appointment" }).click();
    await expect(page.getByText("Please login to make")).toBeVisible();

    // 3. Successful Login
    await page.getByLabel("Username").fill("John Doe");
    await page.getByLabel("Password").fill("ThisIsNotAPassword");
    await page.getByRole("button", { name: "Login" }).click();

    // 4. Verify successful login
    await expect(page.locator("h2")).toContainText("Make Appointment");
  });

  test("Should make an appointment with non-default ", async ({ page }) => {
    // Dropdown
    await page
      .getByLabel("Facility")
      .selectOption("Hongkong CURA Healthcare Center");
    // Checkbox
    await page.getByText("Apply for hospital readmission").click();
    // Radio button
    await page.getByText("Medicaid").click();
    // Date input box
    await page.getByRole("textbox", { name: "Visit Date (Required)" }).click();
    await page
      .getByRole("textbox", { name: "Visit Date (Required)" })
      .fill("05/10/2027");
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
    await expect(page.locator("h2")).toContainText("Appointment Confirmation");
    await expect(
      page.getByRole("link", { name: "Go to Homepage" }),
    ).toBeVisible();
  });
});
