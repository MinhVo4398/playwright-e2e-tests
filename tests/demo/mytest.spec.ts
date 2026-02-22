import { test, expect, devices } from "@playwright/test";

test("Should load home page with correct title", async ({ page }) => {
  //1. Go to the home page
  await page.goto("https://katalon-demo-cura.herokuapp.com/");
  //2. Assert if the title is correct
  await expect(page).toHaveTitle("CURA Healthcare Service");
  //3. Assert header text
  await expect(page.locator("//h1")).toHaveText("CURA Healthcare Service");
});

test.skip(
  "Should do something",
  { tag: "@smoke" },
  async ({ page }, testInfo) => {
    // step...
    await page.locator("//h1").click();
  },
);

test("Should demo locators", async ({ page }) => {
  await page.goto("https://katalon-demo-cura.herokuapp.com/");

  // 2. Click on the Make Appointment
  let makeAppmBtn = page.getByRole("link", { name: "Make Appointment" });
  await makeAppmBtn.click();
  await expect(page.getByText("Please login to make")).toBeVisible();
});

test("Should demo config", async ({ page }, testInfo) => {
  console.log(`>>>> Config at run-time: ${JSON.stringify(testInfo.config)}`);
});

test("Should demo fixtures", async ({ page, browserName }, testInfo) => {
  console.log(`>>>> The test runs on ${browserName}`); //The test runs on chromium
});

test("Should demo devices", async ({ page }, testInfo) => {
  console.log(`>> The list of devices: ${Object.keys(devices)}`);
});

test("Should demo parallel run 1", { tag: "@demo" }, async ({ page }) => {
  await page.goto("https://google.com");
});

test("Should demo parallel run 2", { tag: "@demo" }, async ({ page }) => {
  await page.goto("https://google.com");
});
