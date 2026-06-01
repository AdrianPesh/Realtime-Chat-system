const workspaceMemberService = require("../services/workspaceMemberService");


const workspaceMemeberResolver = {
    Query:{
      getMembers:()=>{}
    },
    Mutation:{
        addMember:async(_,{workspaceId,userIdToAdd,role},{user})=>{ 
            if(!user){
              throw new Error("User is not authenticated");
            }
            return await workspaceMemberService.addMember(workspaceId,user.id,userIdToAdd,role);
        },
        removeMember:async(_,{workspaceId,userIdToRemove},{user})=>{
             if(!user){
              throw new Error("User is not authenticated");
            }
            return await workspaceMemberService.removeMember(workspaceId,user.id,userIdToRemove);
        },
        changeMemberRole:async(_,{workspaceId,userIdToChange,newRole},{user})=>{
             if(!user){
              throw new Error("User is not authenticated");
            }

            return await workspaceMemberService.changeMemberRole(workspaceId,user.id,userIdToChange,newRole);

        }

    }
};

module.exports = workspaceMemeberResolver;