import {test} from "@playwright/test"
import excel from "exceljs"
import path from "node:path"

test("write data",async({page})=>
{
    let book =new excel.Workbook()
    await book.xlsx.readFile(path.join(__dirname,"../../testdata/exceldata.xlsx"))
    let sheet = book.getWorksheet("Sheet4") // ! getting the existing worksheet
    if(!sheet)
    {
        sheet = book.addWorksheet("Sheet4") //! create the sheet
    }
    //! assign  the value
    sheet.getRow(1).getCell(1).value="Hello Playwright"
    await book.xlsx.writeFile(path.join(__dirname,"../../testdata/exceldata.xlsx"))

})

test.only("Write Suggestions",async({page})=>
{
    let book = new excel.Workbook()
    await book.xlsx.readFile(path.join(__dirname,"../../testdata/exceldata.xlsx"))
    let sheet = book.getWorksheet("Sheet5")
    if(!sheet)
    {
        sheet = book.addWorksheet("Sheet5")
    }
    await page.goto("https://www.amazon.in/")
    await page.locator('//input[@id="twotabsearchtextbox"]').fill("shoes")
    await page.locator('//div[@role="row"]').first().waitFor()
    //? getting all auto suggestions and storing in variable
    let suggestions = await page.locator('//div[@role="row"]').allTextContents()
    console.log(suggestions)

    let rowIndex = 1
    for(let text of suggestions)
    {
        sheet.getRow(rowIndex).getCell(1).value = text
    }
    let colIndex =1
    for(let text of suggestions)
    {
     sheet.getRow(1).getCell(colIndex).value = text
     colIndex ++
    }
        
 await book.xlsx.writeFile(path.join(__dirname,"../../testdata/exceldata.xlsx"))
})
