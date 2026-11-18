
//Generates fresh tenant data on every call so each test run / browser registers a brand-new tenant
function getTenantData()
{
    const uniqueId = `${Date.now()}${Math.floor(Math.random() * 1000)}`;
    return {
        fullName:'Auto Tenant User',
        email:`autotenant.${uniqueId}@cybercommandtest.tech`,
        companyName:`AutoTenant Company ${uniqueId}`,
        password:'Tenant@12345',
        confirmPassword:'Tenant@12345'
    };
}

const registrationData =
{
    getTenantData
};
export default registrationData;
