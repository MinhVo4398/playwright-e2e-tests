import { test, expect } from "@playwright/test";
import HomePage from "../page-objects/nopcommerce.home.page";
import { log } from "../helpers/logger";

test("Login to NopCommerce App", async ({ page }, testInfo) => {
  //  Env Config
  const envConfig = testInfo.project.use as any;

  // Create an page object
  const homePage = new HomePage(page);

  // Login nopCommerceWeb
  await homePage.loginToNopCommerceApp(
    envConfig.nopCommerceWeb,
    process.env.NOP_COMMERCE_TEST_USERNAME,
    process.env.NOP_COMMERCE_TEST_PASSWORD,
  );
});
