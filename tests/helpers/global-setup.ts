import { chromium, type FullConfig } from "@playwright/test";
import path from "path";
import fs from "fs";

export default async function globalSetup(config: FullConfig) {
  console.log(`[INFO]: Starting the global setup...`);

  if (process.env.RUNNER?.toUpperCase() === "LOCAL") {
    console.log(`[INFO]: Detecting local runs...`);
    // Delete allure results
    const resultsDir = path.resolve(process.cwd(), "allure-results");
    console.log(`>>> resultDir: ${resultsDir}`);

    if (fs.existsSync(resultsDir)) {
      fs.rmSync(resultsDir, { recursive: true, force: true });
      console.log(`[INFO]: Allure results directory has been deleted for local run`);
    }
  }
  // Add any other global setup logic here:
  // - Database initialization
  // - Test data preparation
  // - Environment configuration
  // - External service setup
  // - Start test servers

  console.log(`[INFO]: Completed the global setup...`);

  // Set the login coookie gloabal vairable
  process.env.LOGIN_COOKIES = undefined;
  


}
