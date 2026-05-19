export class HomePage{
    constructor(page)
    {
        this.page = page 
        this.goOrgPage ='//td[@class="tabUnSelected"]//a[text()="Organizations"]'
        this.createOrganization = '//img[@alt="Create Organization..."]'
        this.icon ='(//td[@style="padding-bottom: 1em;"])[1]'
        this.signout='//a[text()="Sign Out"]'
    }

    async gotoOrganization()
    {
         await this.page.click(this.goOrgPage)
         await this.page.click(this.createOrganization)
    }

    async logout()
    {
        await this.page.click(this.icon)
        await this.page.click(this.signout)
    }
}