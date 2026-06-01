const {subscriber} = require("../config/redis");

const types = [   "message-created","message-updated","message-deleted"]

const redisSubscriber = async(io)=>{
    console.log("Starting redis subscriber");
    
   await subscriber.subscribe("workspace-events",(data)=>{
        try{
            console.log("Redis received the message");
        const message = JSON.parse(data);
        const type = message.type;

        if(!types.includes(type)){
           throw new Error("Invalid type");
        }

        io.to(`workspace-${message.workspaceId}`).emit(type,message.payload);
}catch(error){
  console.log(error.message);
}

    });

}

module.exports = {redisSubscriber};