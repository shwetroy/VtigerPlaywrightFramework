import {test} from "@playwright/test"
import excel from "exceljs"
import path from "node:path"

test("Read Single Data",async({page})=>
{
    //! To read the data from excel we hvae to create a workbook
    //? We can store multiple excel sheet in a workbook
    //? With the help of workbook we can recognise the worksheet easily
    let book = new excel.Workbook() 
    //_dirname gives the currentpath
    await book.xlsx.readFile(path.join(__dirname,"../../testdata/exceldata.xlsx"))
    //! In order to know which exact worksheet we are going to pick from the workbook
    let sheet = await book.getWorksheet("Sheet1")
    //? getRow(1)= returns the row1 data
    //? getCell()= returns the data from the cell
    //? toString()= cell can contain number,text,date,boolean
    //! to make sure that we get the data in text e convert it into the string by using this toString()
   let data = await sheet.getRow(1).getCell(1).toString() 
   console.log(data)
})

//! Multiple Data
test("Reading Multiple Data",async({page})=>
{
    let book = new excel.Workbook()
    await book.xlsx.readFile(path.join(__dirname,"../../testdata/exceldata.xlsx"))
    let sheet = await book.getWorksheet("Sheet2")
    //? sheet whatever contents it will be having
    for(let row =1 ; row <= sheet.actualRowCount ;row++)
    {
        for(let col=1 ; col <= sheet.actualColumnCount ; col++)
        {
            let data = sheet.getRow(row).getCell(col).toString()
            console.log(data)
        }
    }

})

//! Passing data from excel to the Application

test.only("passing data to appplication",async({page})=>
{
    let book = new excel.Workbook()
    await book.xlsx.readFile(path.join(__dirname,"../../testdata/exceldata.xlsx"))
    let sheet = await book.getWorksheet("Sheet3")
    //! creating an empty array to store the excel data
    let allData=[]
    for(let row=1; row<=sheet.actualRowCount; row++)
    {
        //! to get the current row
     let row1 = sheet.getRow(row)
     let url1 = row1.getCell(1).toString()
     let username = row1.getCell(2).toString()
     let password = row1.getCell(3).toString()
     //? pushing to the empty array
     allData.push({url:url1,usn:username,pwd:password})
    }
    //! prints the excel data in the console
    console.log(allData)
    //! loop through testData
    for(let i of allData)
    {
        await page.goto(i.url)
        await page.locator('//input[@name="user-name"]').fill(i.usn)
        await page.locator('//input[@name="password"]').fill(i.pwd)
        await page.locator('//input[@name="login-button"]').click()
    }
})