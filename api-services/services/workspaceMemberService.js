const prisma = require("../config/prisma");
const { canManageRoles} = require("../helpers/roleHelper");

const addMember = async(workspaceId,currentUserId,userIdToAdd,role)=>{
 
 try{
if(currentUserId==userIdToAdd){
  throw new Error("Target user cannot be the same as the current user");
}

  const existingMember = await prisma.workspaceMember.findFirst({
        where:{
            workspaceId:Number(workspaceId),
            userId:Number(userIdToAdd)
        }
    });
    if(existingMember){
       throw new Error("User already exists");
    }
    const currentUser = await prisma.workspaceMember.findFirst({
        where:{
            workspaceId:Number(workspaceId),
            userId:Number(currentUserId)
        }
    });

    if(!currentUser){
      throw new Error("Current user not a member of this workpsace");
    }

   const canManageRows= canManageRoles(currentUser.role,role);

    if(!canManageRows){
      throw new Error("User doesn;t have permission for this action");
    }
    
    



    const newMember= await prisma.workspaceMember.create({
        data:{
            userId:Number(userIdToAdd),
            workspaceId:Number(workspaceId),
            role:role
        }
    });

    return newMember;
}catch(error){
  throw error;
}
}

const removeMember = async(workspaceId,userId,userIdToRemove)=>{

   const CurrentUser = await prisma.workspaceMember.findFirst({
    where:{
        workspaceId:Number(workspaceId),
        userId:Number(userId)
    }
   });

   if(!CurrentUser){
     throw new Error("Current user is not member of this workspace");
   }

   const targetUser = await prisma.workspaceMember.findFirst({
    where:{
        userId:Number(userIdToRemove),
        workspaceId:Number(workspaceId)
    }
   });
   if(!targetUser){
      throw new Error("Target user isn't part of this workspace");
   }
   

  const canManageRoles = canManageRoles(CurrentUser.role,targetUser.role);
  if(!canManageRoles){
      throw new Error("User doesn't have permssion for this operation");
  }

   
   const removedMember =  await prisma.workspaceMember.delete({
    where:{
        userId_workspaceId:{
        workspaceId:Number(workspaceId),
        userId:Number(userIdToRemove)
        }
    }
   });


   return removedMember;
}

const changeMemberRole = async(workspaceId,CurrentUserId,userIdToChange,newRole)=>{

  

    if(CurrentUserId == userIdToChange){
          throw new Error("Cannot change your own role");
    }


    const CurrentUser = await prisma.workspaceMember.findFirst({
        where:{
            workspaceId:Number(workspaceId),
            userId:Number(CurrentUserId)
        }
    });
    if(!CurrentUser){
      throw new Error("No such member");
    }

    const targetMember = await prisma.workspaceMember.findFirst({
        where:{
            workspaceId:Number(workspaceId),
            userId:Number(userIdToChange)
        }
    });

    if(!targetMember){
      throw new Error("User you are trying to modify doesn't exist");
    }

    const canManageRolesCurrent = canManageRoles(CurrentUser.role,targetMember.role);

    if(!canManageRolesCurrent){
      throw new Error("User cannot change target user role because target user has higher authority");
    }

    const canManageRolesTarget = canManageRoles(CurrentUser.role,newRole);

    if(!canManageRolesTarget){
        throw new Error("User cannot give higher authority than their own");
    }




    try{

   const updatedMember = await prisma.workspaceMember.update({
        where:{
            userId_workspaceId:{
            userId:Number(userIdToChange),
            workspaceId:Number(workspaceId)
        }
    },
        data:{
            role:newRole
        }
    });


    return updatedMember;
}catch(error){
  throw new Error("Cannot change user's role");
}
}

module.exports = {
    changeMemberRole,
    addMember,
    removeMember
};