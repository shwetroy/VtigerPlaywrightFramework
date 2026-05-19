//! Login to vtiger application->click on Leads link->click on create lead lookup image->Enter FirstName,LastName and companyName
//! ->click on save Btn->verify whether the Lead is created with LastName and CompanyName in Lead Information page and Logout from the application.

import {expect, test} from "@playwright/test"
import Leads from "../../testdata/Leads.json"
test("Leads",async({page})=>
{
  
 const firstName = Leads.firstName + Date.now();
 const lastName = Leads.lastName;   
 const companyName = Leads.companyName;

 await page.goto(Leads.url)
 await page.locator('//input[@name="user_name"]').fill(Leads.username)
 await page.locator('//input[@name="user_password"]').fill(Leads.password)
 await page.locator('#submitButton').click() 

 await page.locator('//td[@class="tabUnSelected"]//a[text()="Leads"]').click()
 await page.locator('//img[@alt="Create Lead..."]').click()

 await page.locator('select[name="salutationtype"]').selectOption(Leads.dropdownOption)
 await page.locator('//input[@name="firstname"]').fill(firstName)
 await page.locator('//input[@name="lastname"]').fill(lastName)
 await page.locator('//input[@name="company"]').fill(companyName)

 await page.locator('(//input[@class="crmbutton small save"])[1]').click()
 await page.waitForSelector('text=Lead Information')

 const actualFirstName = await page.locator('//span[@id="dtlview_First Name"]').textContent();
 const actualLastName = await page.locator('//span[@id="dtlview_Last Name"]').textContent();
 const actualCompanyName = await page.locator('//span[@id="dtlview_Company"]').textContent()

 await expect(actualFirstName).toContain(firstName);
 await expect(actualLastName).toContain(lastName);
 await expect(actualCompanyName).toContain(companyName)

 await page.locator('(//td[@style="padding-bottom: 1em;"])[1]').click()
 await page.locator('//a[text()="Sign Out"]').click()

})