
import { test } from '@playwright/test';
import LoginPage from '../pages/LoginPage';
import RegistrationPage from '../pages/RegistrationPage';
import registrationPageData from '../testData/registrationPageData';
import UsersPage from '../pages/UsersPage';
import usersPageData from '../testData/usersPageData';


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

    test('Sign in with the registered Tenant credentials @smoke', async ({ page }) => {
        const loginpage = new LoginPage(page);
        const tenant = registrationPageData.RegisteredTenant;

        //Step 1: Navigate to Login page
        await loginpage.navigateLoginPage();

        //Step 2 & 3: Enter the registered Email and Password and click Login
        await loginpage.submitLogin(tenant.email, tenant.password);

        //Step 4: Validate user is navigated to Users page
        await loginpage.checkNavigatedToUsersPage();
    });
});

test.describe('Tenant Users - Invite and assign role', () => {
    let loginpage;
    let userspage;

    test.beforeEach(async ({ page }) => {
        loginpage = new LoginPage(page);
        userspage = new UsersPage(page);

        //Sign in as Tenant Super Admin and open Administration > Users
        await loginpage.navigateLoginPage();
        await loginpage.submitLogin(registrationPageData.RegisteredTenant.email,
                                    registrationPageData.RegisteredTenant.password);
        await loginpage.checkNavigatedToUsersPage();
        await userspage.navigateToUsers();
    });

    test('Invite user and update role to Department Head @smoke', async () => {
        const user = usersPageData.getInviteUserData('Dept Head');

        //Invite User > enter Full name and Email > Send Invitation
        await userspage.inviteUser(user);
        await userspage.checkUserListed(user.fullName, user.email);

        //Update role to Department Head from Tenant users section
        await userspage.updateRole(user.fullName, usersPageData.Roles.departmentHead);
        await userspage.checkRole(user.fullName, usersPageData.Roles.departmentHead);
    });

    test('Invite user and update role to Internal Auditor @smoke', async () => {
        const user = usersPageData.getInviteUserData('Internal Auditor');

        //Invite User > enter Full name and Email > Send Invitation
        await userspage.inviteUser(user);
        await userspage.checkUserListed(user.fullName, user.email);

        //Update role to Internal Auditor from Tenant users section
        await userspage.updateRole(user.fullName, usersPageData.Roles.internalAuditor);
        await userspage.checkRole(user.fullName, usersPageData.Roles.internalAuditor);
    });
});
