import { expect, Locator, type Page } from "@playwright/test";
import BasePage from "./base.page";
import { log } from "../helpers/logger";

export default class CustList extends BasePage {
  constructor(page: Page) {
    super(page);
  }
  /** Elements **/
  get firstNameInputBox() {
    return this.page.getByRole("textbox", { name: "First name" });
  }

  get lastNameInputBox() {
    return this.page.getByRole("textbox", { name: "Last name" });
  }

  get searchBtn() {
    return this.page.getByRole("button", { name: "Search" });
  }

  get noDataAvailableCell() {
    return this.page.locator("[id=search-customers]");
  }

  /** Page Actions */
  async goToCustomerListPage(custListPage: string) {
    this.navigateTo(custListPage)
  }

  async searchAndConfirmUser(firstName: string, lastName: string): Promise<Boolean> {
    await log("info", `Searching for customer ${firstName} ${lastName}`)
    // Search actions
    await this.typeInto(this.firstNameInputBox, firstName);
    await this.typeInto(this.lastNameInputBox, lastName);
    await this.click(this.searchBtn);
    
    // Check wheather the customer present 
    await this.page.waitForTimeout(1_500); // 1.5s delay
    let customerNotFound = await this.noDataAvailableCell.isVisible();
    return customerNotFound;
  }
}
