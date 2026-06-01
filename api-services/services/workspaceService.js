const prisma = require("../config/prisma");

const createWorkspace = async (name, user_id) => {

    const workspace = await prisma.workspace.findFirst({
        where: {
            name,
            created_by:Number(user_id)
        }
    });

    if (workspace) {
        throw new Error("Workspace already exists");
    }

    const result = await prisma.$transaction(

        async (tx) => {
            const newWorkspace = await tx.workspace.create({
                data: {
                    name,
                    created_by: Number(user_id)
                }
            });
             

            const newWorkspaceMember = await tx.workspaceMember.create({
                data: {
                    userId:Number(user_id),
                    workspaceId: Number(newWorkspace.id),
                    role: "OWNER"
                }
            }
            
            );
           
            return {
                newWorkspace,
                newWorkspaceMember
            };
        }
    );



    return result.newWorkspace;
}

const deleteWorkspace = async (workspaceId, userId) => {
   
    const workspace = await prisma.workspace.findFirst({
        where: {
            id: Number(workspaceId)
        }
    });
    if (!workspace) {
        throw new Error("Workspace doesn't exist");
    }

    const workspaceMember = await prisma.workspaceMember.findFirst({
        where: {
            userId:Number(userId),
            workspaceId:Number(workspaceId)
        }
    });

    if (!workspaceMember) {
        throw new Error("User is not a member of this workspace");
    }

    const role = workspaceMember.role;
    

    if (role != "OWNER") {
        throw new Error("User doesn't have the right to delete this workspace");
    }
    await prisma.$transaction(
        async(tx)=>{
            await tx.message.deleteMany({
                where:{
                    workspaceId:Number(workspaceId)
                }
            });
              await tx.workspaceMember.deleteMany({
        where: {
         workspaceId:Number(workspaceId)
        }
    });

    await tx.workspace.delete({
        where: {
            id: Number(workspaceId)
        }
    });

  
}
);
    return "Workspace deleted succesfully";
}
const joinWorkspace = async(workspaceId,userId)=>{

    const member = await prisma.workspaceMember.findFirst({
        where:{
            userId:Number(userId),
            workspaceId:Number(workspaceId)
        }
    });

    if(!member){
      throw new Error("This user is not part of this workpsace");
    }

return true;




}




module.exports = {
    createWorkspace,
    deleteWorkspace,
    joinWorkspace
};