export class LoginPage {
    constructor(page)
    {
        this.page = page
        this.username = '//input[@name="user_name"]'
        this.password = '//input[@name="user_password"]'
        this.loginButton = "'#submitButton'"
    }

  async login(username,password)
  {
    await this.page.fill(this.username,username)
    await this.page.fill(this.password,password)
    await this.page.click(this.loginButton)
  }  
}











