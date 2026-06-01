const prisma = require("../config/prisma");

const createMessage=async(userId,workspaceId,message)=>{
try{
    const member = await prisma.workspaceMember.findFirst({
        where:{
            userId:Number(userId),
            workspaceId:Number(workspaceId)
        }
    });
     
    if(!member){
       throw new Error("User not member of the current workspace");
    }
  const newMessage = await prisma.message.create({
    data:{
        content:message,
        workspaceId:Number(workspaceId),
        userId:Number(userId)
    }
  });
  

  return newMessage;
}catch(error){
  throw error;
}
}
const updateMessage = async(userId,workspaceId,messageId,newMessage)=>{
     const member = await prisma.workspaceMember.findFirst({
        where:{
            userId:Number(userId),
            workspaceId:Number(workspaceId)
        }
    });
    if(!member){
       throw new Error("User not member of the current workspace");
    }
     const message =await prisma.message.findFirst({
          where:{
            userId:Number(userId),
            id:Number(messageId)
          }
     });
     if(!message){
        throw new Error("No such message for the current user");
     }

     const updatedMessage = await prisma.message.update({
        where:{
            userId:Number(userId),
            id:Number(messageId)
        },
        data:{
            content:newMessage
        }
     });

     return updatedMessage;
}

const deleteMessage=async(userId,workspaceId,messageId)=>{
     const member = await prisma.workspaceMember.findFirst({
        where:{
            userId:Number(userId),
            workspaceId:Number(workspaceId)
        }
    });
    if(!member){
       throw new Error("User not member of the current workspace");
    }

    const message = await prisma.message.findFirst({
        where:{
            userId:Number(userId),
            id:Number(messageId)
        }
    });
    if(!message){
       throw new Error("This message doesn't exist");
    }

   const deletedMessage= await prisma.message.delete({
        where:{
            id:(messageId)
        }
    });

    return deletedMessage;
}


module.exports = {
    updateMessage,
    deleteMessage,
    createMessage
};