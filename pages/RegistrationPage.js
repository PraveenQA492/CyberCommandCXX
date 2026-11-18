import { expect } from '@playwright/test';

class RegistrationPage
{
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page)
    {
        this.page = page;

        //Locators for "Create your account" entry point on Login page
        this.createAccountButton = page.getByRole('button', { name: 'Create your account' });

        //Locators for "Register as" role selection
        this.registerHeading = page.getByText('Choose how you’ll join CCX');
        this.tenantOption = page.getByRole('button', { name: /^Tenant/ });
        this.dpoOption = page.getByRole('button', { name: /^DPO/ });
        this.externalAuditorOption = page.getByRole('button', { name: /^External Auditor/ });

        //Locators for Tenant registration form
        this.fullName = page.getByPlaceholder('Full name');
        this.workEmail = page.getByPlaceholder('Work email');
        this.companyName = page.getByPlaceholder('Company name');
        this.password = page.getByPlaceholder('Password', { exact: true });
        this.confirmPassword = page.getByPlaceholder('Confirm password');
        this.createAccountSubmit = page.getByRole('button', { name: 'Create account →' });
        this.backButton = page.getByRole('button', { name: '← Back' });
    }

    async clickCreateYourAccount()
    {
        await this.createAccountButton.click();
        await expect(this.registerHeading).toBeVisible();
    }

    async selectTenant()
    {
        await this.tenantOption.click();
        await expect(this.companyName).toBeVisible();
    }

    async enterFullName(fullName)
    {
        await this.fullName.fill(fullName);
    }

    async enterWorkEmail(email)
    {
        await this.workEmail.fill(email);
    }

    async enterCompanyName(companyName)
    {
        await this.companyName.fill(companyName);
    }

    async enterPassword(password)
    {
        await this.password.fill(password);
    }

    async enterConfirmPassword(password)
    {
        await this.confirmPassword.fill(password);
    }

    //Click "Create account" and wait for the register API call to complete
    async clickCreateAccount()
    {
        const responsePromise = this.page.waitForResponse(
            res => res.url().includes('/api/auth/register') && res.request().method() === 'POST',
            { timeout: 30000 });
        await this.createAccountSubmit.click();
        this.registerResponse = await responsePromise;
        return this.registerResponse;
    }

    //Fill the complete tenant registration form and submit
    async registerTenant({ fullName, email, companyName, password, confirmPassword })
    {
        await this.enterFullName(fullName);
        await this.enterWorkEmail(email);
        await this.enterCompanyName(companyName);
        await this.enterPassword(password);
        await this.enterConfirmPassword(confirmPassword ?? password);
        await this.clickCreateAccount();
    }

    //Registration is successful when the register API returns 2xx
    //TODO: also assert the success message / redirect the UI shows after registration
    async checkRegistrationSuccess()
    {
        const status = this.registerResponse.status();
        const body = await this.registerResponse.text();
        expect(status, `Register API failed: ${body}`).toBeGreaterThanOrEqual(200);
        expect(status, `Register API failed: ${body}`).toBeLessThan(300);
    }
}
export default RegistrationPage;
