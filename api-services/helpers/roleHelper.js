const canManageRoles = (currentRole,targetRole)=>{
   const roles = {
    OWNER:1,
    ADMIN:2,
    MEMBER:3
   };
   return roles[currentRole]<roles[targetRole];
}

module.exports = {canManageRoles};