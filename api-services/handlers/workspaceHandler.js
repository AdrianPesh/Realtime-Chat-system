const workspaceService = require("../services/workspaceService");

const workspaceHandler = (socket,io)=>{
  socket.on("join-workspace",async(workspaceId)=>{
      try{
           
        const allowed = await workspaceService.joinWorkspace(workspaceId,socket.user.id);

    
        if(!allowed){
            console.log("Not allowed to join the current workspace");
          return;
        }
        socket.join(`workspace-${workspaceId}`);

        console.log("Client joined succesfully the workspace");
      }catch(error){
        console.log(error.message);
       socket.emit("error",error.message);
      }
    }
  );
}

module.exports = {workspaceHandler};