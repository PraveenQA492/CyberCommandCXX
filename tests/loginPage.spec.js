
import { test } from '@playwright/test';
import LoginPage from '../pages/LoginPage';
import loginPageData from '../testData/loginPageData';


test.describe('LoginPage', () => {
    let loginpage;

    test('Loginpage- valid @smoke', async ({ page }) => {
        loginpage = new LoginPage(page);
        //navigate to URL
        await loginpage.navigateLoginPage();

        //Perform login with valid credentials
        await loginpage.submitLogin(loginPageData.Adminuser.username, 
                                    loginPageData.Adminuser.password);
        await loginpage.checkValidLogin();
        //added comments
        
    });
});

