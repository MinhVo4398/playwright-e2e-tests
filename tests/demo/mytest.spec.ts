import { test, expect } from "@playwright/test";

test("Should load home page with correct title", async ({ page }) => {
  //1. Go to the home page
  await page.goto("https://katalon-demo-cura.herokuapp.com/");
  //2. Assert if the title is correct
  await expect(page).toHaveTitle("CURA Healthcare Service");
  //3. Assert header text
  await expect(page.locator("//h1")).toHaveText("CURA Healthcare Service");
});

test("Should do something", { tag: "@smoke" }, async ({ page }, testInfo) => {
  // step...
  await page.locator("//h1").click();
}); 

test.only("Should demo locators", async ({ page }) => {
  await page.goto("https://katalon-demo-cura.herokuapp.com/");

  // 2. Click on the Make Appointment
  let makeAppmBtn =  page.getByRole("link", { name: "Make Appointment" });
  await makeAppmBtn.click();
  await expect(page.getByText('Please login to make')).toBeVisible();
});

