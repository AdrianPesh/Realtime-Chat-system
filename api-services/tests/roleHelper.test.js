const {canManageRoles} = require("../helpers/roleHelper");

describe("Role permissions",()=>{
    it("owner can manage admin",()=>{
        expect(canManageRoles("OWNER","ADMIN")).toBe(true);
    });
    it("member cannot manage admin",()=>{
        expect(canManageRoles("MEMBER","ADMIN")).toBe(false);
    })
})