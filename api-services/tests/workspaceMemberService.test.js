jest.mock("../config/prisma",()=>({
    workspaceMember:{
        findFirst:jest.fn(),
        create:jest.fn()
    }
}));


const prisma = require("../config/prisma");

const {addMember} = require("../services/workspaceMemberService");

describe("addMember",()=>{
    it("should add member",async()=>{
        prisma.workspaceMember.findFirst.mockResolvedValueOnce(null);
        prisma.workspaceMember.findFirst.mockResolvedValueOnce({
            id:1,
            role:"OWNER"
        });
        prisma.workspaceMember.create.mockResolvedValue({
            id:2,
            userId:5,
            workspaceId:1,
            role:"MEMBER"
        });

        const result = await addMember(1,1,5,"MEMBER");

        expect(result.id).toBe(2);
        expect(result.role).toBe("MEMBER");
    })
})