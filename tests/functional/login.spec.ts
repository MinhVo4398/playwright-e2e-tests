import { test, expect } from "@playwright/test";

test.describe("Login functionality", () => {
  test.beforeEach(async ({ page }) => {
    // 1. Launch URL and assert title and header
    await page.goto("https://katalon-demo-cura.herokuapp.com/");
    await expect(page).toHaveTitle("CURA Healthcare Service");
    await expect(page.locator("//h1")).toContainText("CURA Healthcare Service");

    // 2. Click on the Make Appointment
    await page.getByRole("link", { name: "Make Appointment" }).click();
    await expect(page.getByText("Please login to make")).toBeVisible();
  });

  test("Should login successfully", async ({ page }) => {
    // 3. Successful Login
    await page.getByLabel("Username").fill("John Doe");
    await page.getByLabel("Password").fill("ThisIsNotAPassword");
    await page.getByRole("button", { name: "Login" }).click();

    // 4. Assert a text
    await expect(page.locator("h2")).toContainText("Make Appointment");
  });

  test("Should prevent login with incorrect credentials", async ({ page }) => {
    // 3. Unsuccessful Login
    await page.getByLabel("Username").fill("invalidusername");
    await page.getByLabel("Password").fill("invalidpassword");
    await page.getByRole("button", { name: "Login" }).click();

    // 4. Assert a text
    await expect(
      page.getByText(
        "Login failed! Please ensure the username and password are valid.",
      ),
    ).toBeVisible();
  });
});
