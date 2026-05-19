//! Login to vtiger application->click on products link->click on create product lookup image->Enter product name
//! ->click on save Btn->verify whether the product is created in product Information page and Logout from the application.

import {expect, test} from "@playwright/test"
test("Products",async({page})=>
{

 const productName = "Samsung_" + Date.now() 

 await page.goto("http://localhost:8888/index.php?action=Login&module=Users")
 await page.locator('//input[@name="user_name"]').fill("admin")
 await page.locator('//input[@name="user_password"]').fill("admin")
 await page.locator('#submitButton').click() 

 await page.locator('//td[@class="tabUnSelected"]//a[text()="Products"]').click()
 await page.locator('//img[@alt="Create Product..."]').click()

 await page.locator('//input[@name="productname"]').fill(productName)
 await page.locator('(//input[@class="crmbutton small save"])[1]').click()

 await page.waitForSelector('text=Product Information')
 let expectedProductName= await page.locator('//span[@id="dtlview_Product Name"]').textContent()

await expect(productName).toContain(expectedProductName)

 await page.locator('(//td[@style="padding-bottom: 1em;"])[1]').click()
 await page.locator('//a[text()="Sign Out"]').click()

})