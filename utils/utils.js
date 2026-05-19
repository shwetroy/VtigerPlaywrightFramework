export function getOrgName(baseName)
{
    return baseName + Date.now()
}


export async function selectDropdown(page, locator, value)
{
     await page.locator(locator).selectOption(value)

} 
