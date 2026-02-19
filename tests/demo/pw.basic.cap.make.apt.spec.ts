import { test, expect } from "@playwright/test";

test.describe(
  "Make appointment ",
  {
    annotation: {
      type: "Story",
      description: "JIRA-1234: Make Appointment Feature",
    },
  },
  () => {
    test.beforeEach(
      "Login with valid credentials",
      async ({ page }, testInfo) => {
        // 1. Launch URL and assert title and header
        await page.goto("https://katalon-demo-cura.herokuapp.com/", {
          timeout: 60_000,
        }); // will run over the config option
        await expect(page).toHaveTitle("CURA Healthcare Service");
        await expect(page.locator("//h1")).toContainText(
          "CURA Healthcare Service",
        );
      },
    );

    test(
      "Should make an appointment with non-default ",
      {
        annotation: {
          type: "Bug",
          description: "Defect: 1234 - Does not work in Firefox",
        },
        tag: "@smoke",
      },
      async ({ page }, testInfo) => {
        // 2. Click on the Make Appointment
        await page.getByRole("link", { name: "Make Appointment" }).click();
        await expect(page.getByText("Please login to make")).toBeVisible();

        // 3. Successful Login
        await page.getByLabel("Username").fill("John Doe");
        await page.getByLabel("Password").fill("ThisIsNotAPassword");
        await page.getByRole("button", { name: "Login" }).click();

        /**
         * Add custom screenshot at test scope level
         * @TODO : add this as a helper function
         */
        let fullPageScreenshot = await page.screenshot({ fullPage: true });
        testInfo.attach("login page", {
          body: fullPageScreenshot,
          contentType: "image/png",
        });

        // 4. Verify successful login
        await expect(page.locator("h2")).toContainText("Make Appointment");
      },
    );
  },
);
