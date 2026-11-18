
//Generates fresh tenant data on every call so each test run / browser registers a brand-new tenant
function getTenantData()
{
    const uniqueId = `${Date.now()}${Math.floor(Math.random() * 1000)}`;
    return {
        fullName:'Auto Tenant User${uniqueId}',
        email:`autotenant.${uniqueId}@cybercommandtest.tech`,
        companyName:`AutoTenant Company ${uniqueId}`,
        password:'Tenant@12345',
        confirmPassword:'Tenant@12345'
    };
}

const registrationData =
{
    getTenantData,

    //Pre-registered Tenant user used to validate sign-in after user creation
    RegisteredTenant:{
        email:'mosilog153@bcough.com',
        password:'Tenant@12345'
    }
};
export default registrationData;
