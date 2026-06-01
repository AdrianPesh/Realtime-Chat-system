const workspaceService = require("../services/workspaceService");


const workspaceResolver = {
    Query:{
        workspaces:()=>{},
        workspace:async(_,{id},{user})=>{
            if(!user){
              throw new Error("Unathorized user");
            }

        }
      
    },
      Mutation:{
            createWorkspace:async(_,{name},{user})=>{
              if(!user){
                throw new Error("Unathorized user");
              }
              
              return await workspaceService.createWorkspace(name,user.id);
            },
            deleteWorkspace:async(_,{id},{user})=>{
              if(!user){
                throw new Error("Unathorized user");
              }
              return await workspaceService.deleteWorkspace(id,user.id);
            }
        }
};

module.exports = workspaceResolver;