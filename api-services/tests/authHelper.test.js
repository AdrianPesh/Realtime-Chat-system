const authHelper = require("../helpers/authHelper");
beforeAll(()=>{
    process.env.JWT_SECRET="top-secret";
})

describe("Auth Helper Test",()=>{
    it("Sign jwt and validate",()=>{
        const jwt = authHelper.signJWT({id:1,username:"admin"});
        const decoded = authHelper.verifyJWT(jwt);

        expect(decoded.id).toBe(1);
    })
});