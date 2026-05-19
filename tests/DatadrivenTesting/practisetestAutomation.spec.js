import {test} from "@playwright/test"
import practicetestAutomation from "../../testdata/practisetestAutomation.json"

test("Practise Test Automation",async({page})=>
{
    await page.goto(practicetestAutomation.url)
    await page.locator('//input[@name="username"]').fill(practicetestAutomation.username)
    await page.locator('//input[@name="password"]').fill(practicetestAutomation.password)
    await page.getByRole('button',{name:"Submit"}).click()
    let url = page.url()
    console.log(url)
    if(url == "https://practicetestautomation.com/logged-in-successfully/")
    {
        console.log("Valid Credentials")
    }
    else
    {
        console.log("Invalid Credentials")
    }
})