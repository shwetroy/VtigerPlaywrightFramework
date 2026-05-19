export class Organization
{
    constructor(page)
    {
        this.page = page
        this.accountname ='//input[@name="accountname"]'
        this.savebtn ='(//input[@class="crmbutton small save"])[1]'
     }

    async orgPage(accountname)
    {
       await this.page.fill(this.accountname,accountname)
       await this.page.click(this.savebtn)
    }

    
}