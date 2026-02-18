import { test, expect } from "@playwright/test";
import { describe } from "node:test";
/**
 * Scenario:
 * 1. Login as standard user
 * 2. Get a list of producers with its price
 * 3. Assert that all products have non-zero dollar value
 */

test.describe("Inventory Page Tests", () => {
  test.beforeEach("Login with valid creds", async ({ page }) => {
    // Launch the URL
    await page.goto("https://www.saucedemo.com/");
    // Login
    await page.locator("#user-name").fill("standard_user");
    await page.locator("#password").fill("secret_sauce");
    await page.locator("#login-button").click();
    // Assertion
    await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
    await expect(page).toHaveURL(/.*inventory/);
  });

  test("Should confirm all prices with non-zero price", async ({ page }) => {});
});
