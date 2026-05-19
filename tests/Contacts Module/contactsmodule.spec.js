//! Login to vtiger application->click on Contacts link->click on create contact lookup image
//!->Enter FirstName and LastName->click on save Btn->verify whether the Contact is created with firstName and LastName in Contact Information page and Logout from the application.

import {expect, test} from "@playwright/test"
import contactsmodule from "../../testdata/contactsmodule.json"
import { selectDropdown } from "../../utils/utils";
test("contacts module",async({page})=>
{

 const firstName = contactsmodule.firstName + Date.now();
 const lastName = contactsmodule.lastName;

 await page.goto(contactsmodule.url)
 await page.locator('//input[@name="user_name"]').fill(contactsmodule.username)
 await page.locator('//input[@name="user_password"]').fill(contactsmodule.password)
 await page.locator('#submitButton').click()

 await page.locator('//td[@class="tabUnSelected"]//a[text()="Contacts"]').click()
 await page.locator('//img[@alt="Create Contact..."]').click()

 //await page.locator('select[name="salutationtype"]').selectOption("Ms.")
 await selectDropdown(page,'select[name="salutationtype"]','Ms.')
 await page.locator('//input[@name="firstname"]').fill(firstName)
 await page.locator('//input[@name="lastname"]').fill(lastName)

 await page.locator('(//input[@class="crmbutton small save"])[1]').click()

 await page.waitForSelector('text=Contact Information')
const actualFirstName = await page.locator('//span[@id="dtlview_First Name"]').textContent();
const actualLastName = await page.locator('//span[@id="dtlview_Last Name"]').textContent();

await expect(actualFirstName).toContain(firstName);
await expect(actualLastName).toContain(lastName);

 
 await page.locator('(//td[@style="padding-bottom: 1em;"])[1]').click()
 await page.locator('//a[text()="Sign Out"]').click()

})