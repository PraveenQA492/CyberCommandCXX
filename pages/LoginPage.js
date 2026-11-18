import { expect } from '@playwright/test';

class LoginPage
{
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page)
    {
        this.page = page;
       

        //Locators for Login page
        this.loginPageUsername = page.getByPlaceholder('Work email');
        this.loginPagePassword = page.getByPlaceholder('Password');
        this.loginPageSubmit = page.getByRole('button',{name:'Login', exact:true});
    }

    //Navigate to CCX Login page
    async navigateLoginPage()
    {
        await this.page.goto("https://dev-app-grc.cybercommand.tech/login");
    }

    async enterLoginPageUsername(username)
    {
        await this.loginPageUsername.fill(username);
    }

    async enterLoginPagePassword(password)
    {
        await this.loginPagePassword.fill(password);
    }

    async clickLogin()
    {
        await this.loginPageSubmit.click();
    }

    async submitLogin(username, password)
    {
         await this.enterLoginPageUsername(username);
        await this.enterLoginPagePassword(password);
             await this.clickLogin();
    }

    //After successful login user lands on the Users page
    async checkNavigatedToUsersPage()
    {
        await expect(this.page).toHaveURL('https://dev-app-grc.cybercommand.tech/users', { timeout: 30000 });
    }

    async checkValidLogin()
    {
        await expect(this.page).toHaveTitle(/.*ccx-frontend/);
    }




}
export default LoginPage;