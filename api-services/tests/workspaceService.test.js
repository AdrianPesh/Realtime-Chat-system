beforeEach(()=>{
    jest.clearAllMocks();
});

jest.mock("../config/prisma",()=>({
    workspace:{
        findFirst:jest.fn(),
        create:jest.fn()
    },
    workspaceMember:{
        create:jest.fn()
    },
    $transaction:jest.fn()
}));

const prisma = require("../config/prisma");

const workspaceService = require("../services/workspaceService");

describe("Create workspace",()=>{
    it("Should create workspace",async ()=>{
        prisma.workspace.findFirst.mockResolvedValueOnce(null);
        prisma.workspace.create.mockResolvedValueOnce({
            id:2,
            name:"workspace1",
            created_by:1
        });
        prisma.workspaceMember.create.mockResolvedValueOnce({
            id:1,
            userId:1,
            workspaceId:2,
            role:"OWNER"
        });
        prisma.$transaction.mockImplementation(async(callback)=>{
           return callback({
            workspace:prisma.workspace,
            workspaceMember:prisma.workspaceMember
           });
        });
        const result = await workspaceService.createWorkspace("workspace1",1);

        expect(result.id).toBe(2);
        expect(result.name).toBe("workspace1");
        expect(prisma.workspace.create).toHaveBeenCalledWith({
            data:{
                name:"workspace1",
                created_by:1
            }
        });
        expect(prisma.$transaction).toHaveBeenCalledTimes(1);
    })
    it("should throw if workspace already exists",async()=>{
        prisma.workspace.findFirst.mockResolvedValueOnce({
            id:1,
            name:"workspace1"
        });

        await expect(workspaceService.createWorkspace("workspace1",1)).rejects.toThrow("Workspace already exists");
    })
})