import { expect } from '@playwright/test';

class UsersPage
{
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page)
    {
        this.page = page;

        //Locators for Administration > Users navigation
        this.usersNavLink = page.getByRole('navigation', { name: 'Main' }).getByRole('link', { name: 'Users', exact: true });

        //Locators for Invite User modal
        this.inviteUserButton = page.getByRole('button', { name: 'Invite User' });
        this.inviteUserHeading = page.getByRole('heading', { name: 'Invite User' });
        this.inviteFullName = page.getByRole('textbox', { name: 'Full Name' });
        this.inviteEmail = page.getByRole('textbox', { name: 'Email Address' });
        this.sendInvitationButton = page.getByRole('button', { name: 'Send Invitation' });

        //Locators for Tenant users table
        this.searchUsers = page.getByPlaceholder('Search name, email…');
    }

    //Navigate to Administration > Users from the sidebar
    async navigateToUsers()
    {
        await this.usersNavLink.click();
        await expect(this.page).toHaveURL(/\/users$/);
        await expect(this.inviteUserButton).toBeVisible();
    }

    async clickInviteUser()
    {
        await this.inviteUserButton.click();
        await expect(this.inviteUserHeading).toBeVisible();
    }

    async enterFullName(fullName)
    {
        await this.inviteFullName.fill(fullName);
    }

    async enterEmail(email)
    {
        await this.inviteEmail.fill(email);
    }

    async clickSendInvitation()
    {
        await expect(this.sendInvitationButton).toBeEnabled();
        await this.sendInvitationButton.click();
        await expect(this.inviteUserHeading).toBeHidden({ timeout: 15000 });
    }

    //Invite a new user with Full name and Email
    async inviteUser({ fullName, email })
    {
        await this.clickInviteUser();
        await this.enterFullName(fullName);
        await this.enterEmail(email);
        await this.clickSendInvitation();
    }

    //Role dropdown in Tenant users table for the given user
    roleDropdown(fullName)
    {
        return this.page.getByRole('combobox', { name: `Role for ${fullName}`, exact: true });
    }

    async checkUserListed(fullName, email)
    {
        await expect(this.roleDropdown(fullName)).toBeVisible({ timeout: 15000 });
        await expect(this.page.getByText(email, { exact: true })).toBeVisible();
    }

    //Update the role of the given user from the Role dropdown
    async updateRole(fullName, role)
    {
        await this.roleDropdown(fullName).selectOption({ label: role });
    }

    //Verify the role is saved by reloading the Users page
    async checkRole(fullName, role)
    {
        await expect(this.roleDropdown(fullName).locator('option:checked')).toHaveText(role);
        await this.page.reload();
        await expect(this.roleDropdown(fullName).locator('option:checked')).toHaveText(role, { timeout: 15000 });
    }
}
export default UsersPage;
