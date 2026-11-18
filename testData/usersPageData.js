
//Generates a new user on every call so each run invites a brand-new user
function getInviteUserData(prefix)
{
    const uniqueId = `${Date.now()}${Math.floor(Math.random() * 1000)}`;
    return {
        fullName:`${prefix} ${uniqueId}`,
        email:`${prefix.replace(/\s+/g, '').toLowerCase()}.${uniqueId}@test.com`
    };
}

const usersData =
{
    getInviteUserData,

    Roles:{
        departmentHead:'Department Head',
        internalAuditor:'Internal Auditor'
    }
};
export default usersData;
