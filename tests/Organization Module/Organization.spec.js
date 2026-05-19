
//! 1. Login to vtiger application->click on organizations link->click on create organization lookup image->Enter organisation name
//! ->click on saveLoginPage Btn->verify whether the organization is created in Organization Information page and Logout from the application.

//! Comments
//?LoginPage.js----> It is a fileName/Class
//? To handle all the login Page related operations
//? export class LoginPage  ----> Here we are defining the LoginPage class 
//? This class stores : Locators, methods , login related Functionality

//!constructor(page)
//? Constructor executes automatically when object is created
//! What is Page here? 
//? Page is playwright browser page object
//? Used for browser interactions
//! Why to store Page here ?
//? this.page = page ------> so it is used to store browser page object inside the class
//? Allows all methods to use same page instance 
//? this.username = "loactor" ----> this refers to the object 



import {expect, test} from "@playwright/test"
import Organization from "../../testdata/Organization.json"
import { getOrgName } from "../../utils/utils"
import {LoginPage} from "../../pageObjectModel/LoginPage.js"
import { HomePage } from "../../pageObjectModel/HomePage.js"
import { OrganizationPage } from "../../pageObjectModel/OrganizationPage.js"

test("OragnizationModule",async({page})=>
{
 
const loginPage = new LoginPage(page)
const homePage = new HomePage(page)
const organizationPage =new Organization(page)

await page.goto(Organization.url)
await loginPage.login(Organization.username,Organization.password)
await homePage.gotoOrganization()
const orgName =  getOrgName(Organization.orgname)
await organizationPage.orgPage()
await homePage.logout()




//  await page.locator('//input[@name="user_name"]').fill(Organization.username)
//  await page.locator('//input[@name="user_password"]').fill(Organization.password)
//  await page.locator('#submitButton').click()
// await page.locator('//td[@class="tabUnSelected"]//a[text()="Organizations"]').click()
//  await page.locator('//img[@alt="Create Organization..."]').click()
//? Date.now wll create current date and orgame+random number will get generated
//  const orgName = Organization.orgname + Date.now()

   
//  await page.locator('//input[@name="accountname"]').fill(orgName)
//  await page.locator('(//input[@class="crmbutton small save"])[1]').click()
//  await page.waitForTimeout(2000)

 await page.waitForSelector('text=Organization Information')
 const createdOrg = await page.locator('//span[@id="dtlview_Organization Name"]').allTextContents()
 await expect(createdOrg).toContain(orgName)
 await page.waitForTimeout(3000)

//  await page.locator('(//td[@style="padding-bottom: 1em;"])[1]').click()
//  await page.locator('//a[text()="Sign Out"]').click()
//  await page.waitForTimeout(3000)
})