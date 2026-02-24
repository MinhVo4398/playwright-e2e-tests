import { test, expect, request } from "@playwright/test";
import { log } from "../helpers/logger.js";

import constants from "../../data/constants.json";
import TestData from "../../data/test-data";

test.describe("REST API Demo", () => {
  let envConfig: any;

  test.beforeEach("Get the env config", async ({ request }, testInfo) => {
    envConfig = testInfo.project.use as any;
  });

  test("Should get list of users", async ({ request }) => {
    // Make a GET call
    await log("info", `Making a GET call using ${envConfig.apiURL}`);
    const res = await request.get(
      `${envConfig.apiURL}${constants.REQ_RES_ENDPOINTS.GET_USERS_LIST}`,
      {
        headers: {
          "x-api-key": process.env.REQRES_API_KEY,
          "Content-Type": "application/json",
        },
      },
    );
    // Assert the status code
    expect(res.status()).toBe(200);
    await log(
      "info",
      `The GET call is successful with status code ${res.status()}`,
    );

    // Get list of users
    const userData = await res.json();
    await log("info", `List of users:  ${JSON.stringify(userData, null, 2)}`);
  });

  test("Should create a user (POST)", async ({ request }) => {
    await log("info", `Making a POST call using ${envConfig.apiURL}`);

    const payload = TestData.apiUserCreation()[0];

    const res = await request.post(
      `${envConfig.apiURL}${constants.REQ_RES_ENDPOINTS.POST_CREATE_USER}`,
      {
        headers: {
          "x-api-key": process.env.REQRES_API_KEY,
          "Content-Type": "application/json",
        },
        data: payload,
      },
    );

    expect(res.status()).toBe(201);
    const resJSON = await res.json();
    await log("info", `Response: ${JSON.stringify(resJSON)}`);
  });
});
