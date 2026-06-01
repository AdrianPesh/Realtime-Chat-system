const messageService = require("../services/messageService");
const {publisher} = require("../config/redis");
const messageHandler = (socket,io)=>{
    socket.on("send-message",async(data)=>{
      console.log("Message received: ",data.message);
          try{
            if(!data || !data.message || !data.workspaceId){
              throw new Error("Missing required fields");
            }
            console.log("Stage 1");
            const message = await messageService.createMessage(socket.user.id,data.workspaceId,data.message);
 console.log("Stage 2");
           await publisher.publish("workspace-events",JSON.stringify({
                type:"message-created",
                workspaceId:data.workspaceId,
                payload:message
            }));
   
           
          }catch(error){
            socket.emit("create-message-error",error.message);
          }
    });
    socket.on("update-message",async(data)=>{
            try{
            if(!data || !data.newMessage || !data.messageId || !data.workspaceId){
              throw new Error("Missing required fields");
            }
            const message = await messageService.updateMessage(socket.user.id,data.workspaceId,data.messageId,data.newMessage);

             publisher.publish("workspace-events",JSON.stringify({
                type:"message-updated",
                workspaceId:data.workspaceId,
                payload:message
            }));
           
          }catch(error){
            socket.emit("update-message-error",error.message);
          }
    });
    socket.on("delete-message",async(data)=>{
          try{
            if(!data || !data.messageId || !data.workspaceId){
              throw new Error("Missing required fields");
            }
            const message = await messageService.deleteMessage(socket.user.id,data.workspaceId,data.messageId);

             publisher.publish("workspace-events",JSON.stringify({
                type:"message-deleted",
                workspaceId:data.workspaceId,
                payload:message
            }));
           
          }catch(error){
            socket.emit("delete-message-error",error.message);
          }
    })

}

module.exports = {messageHandler}