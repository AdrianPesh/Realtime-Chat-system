const request = require("supertest");

const {createApp} = require("../app");
const authHelper = require("../helpers/authHelper");
let app;
beforeAll(async()=>{
 app=await createApp();
});

describe("Workspace API",()=>{
    it("should create workspace",async()=>{
        const token = authHelper.signJWT({
            id:1,
            username:"admin"
        });
        const response = await request(app).post("/graphql").set("Authorization",`Bearer ${token}`).send({
            query:`
              mutation {
                createWorkspace(name:"workspace1"){id,name}
              }
            `
        });

        expect(response.status).toBe(200);
        expect(response.body.data.createWorkspace.name).toBe("workspace1");

    })
})