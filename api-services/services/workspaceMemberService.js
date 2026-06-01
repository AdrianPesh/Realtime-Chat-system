const prisma = require("../config/prisma");

  const roles = {
        OWNER:1,
        ADMIN:2,
        MEMBER:3
    }

const addMember = async(workspaceId,currentUserId,userIdToAdd,role)=>{
 
 try{
if(currentUserId==userIdToAdd){
  throw new Error("Target user cannot be the same as the current user");
}
if(!roles[role]){
  throw new Error("Invalid role provided");
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

    const currentUserRoleIndex = roles[currentUser.role];
    const targetUserRoleIndex = roles[role];
    
    if(currentUserRoleIndex>=targetUserRoleIndex){
          throw new Error("Current user doesn't have permission to add this user's role");
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
   const currentuserRoleIndex = roles[CurrentUser.role];
   const targetUserRoleIndex = roles[targetUser.role];

   if(currentuserRoleIndex>=targetUserRoleIndex){
        throw new Error("Current user doesn't have permission to remove target user");
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

    if(!roles[newRole]){
         throw new Error("Invalid role");
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

    const currentUserRoleIndex = roles[CurrentUser.role];
    const newRoleIndex = roles[newRole];

    const targetMember = await prisma.workspaceMember.findFirst({
        where:{
            workspaceId:Number(workspaceId),
            userId:Number(userIdToChange)
        }
    });

    if(!targetMember){
      throw new Error("User you are trying to modify doesn't exist");
    }
    const targetRoleIndex = roles[targetMember.role];

    if(currentUserRoleIndex>=targetRoleIndex){
       throw new Error("Current user doesn't have permission for this operation");
    }

    if(newRoleIndex<=currentUserRoleIndex){
       throw new Error("User has no such permission");
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