const userHelper =require("../helpers/userHelper");

describe("User password hashing",()=>{
    it("Hash password",async()=>{
        const pass="12345";
        const hashed = await userHelper.hashPassword(pass);
        expect(hashed).not.toBe(pass);
        const match = await userHelper.verifyPassword(pass,hashed);
        expect(match).toBe(true);
    })
});