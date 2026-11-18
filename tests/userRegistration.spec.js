
import { test } from '@playwright/test';
import LoginPage from '../pages/LoginPage';
import RegistrationPage from '../pages/RegistrationPage';
import registrationPageData from '../testData/registrationPageData';


test.describe('User Registration', () => {

    test('Register new user as Tenant @smoke', async ({ page }) => {
        const loginpage = new LoginPage(page);
        const registrationpage = new RegistrationPage(page);

        //Step 1: Navigate to URL
        await loginpage.navigateLoginPage();

        //Step 2: Click on "Create your account"
        await registrationpage.clickCreateYourAccount();

        //Step 3: Click on Tenant
        await registrationpage.selectTenant();

        //Step 4: Complete the registration form and submit
        await registrationpage.registerTenant(registrationPageData.getTenantData());
        await registrationpage.checkRegistrationSuccess();
    });
});
