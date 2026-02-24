import { expect, Locator, type Page } from "@playwright/test";
import BasePage from "./base.page";
import { log } from "../helpers/logger";

export default class NopcommerceHomePage extends BasePage {
  constructor(page: Page) {
    super(page);
  }
  /**Elements */
  get userNameInput(): Locator {
    return this.page.locator("#Email");
  }

  get passwordInput(): Locator {
    return this.page.locator("#Password");
  }

  get loginButton(): Locator {
    return this.page.getByRole("button", { name: "Log in" });
  }

  /** Page Actions */
  async loginToNopCommerceApp(url: string, userName: string, password: string) {
    await log('info', `Login to ${url}`)
    // Login
    await this.navigateTo(url);
    await this.typeInto(this.userNameInput, userName);
    await this.typeInto(this.passwordInput, password);
    await this.click(this.loginButton);
    // Assert the URL
    await expect(this.page).toHaveURL(`${url}admin/`);
    await log('info', `Home Page is successfully launched`)
  }
  
}
