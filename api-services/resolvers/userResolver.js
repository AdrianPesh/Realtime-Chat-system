const userService = require("../services/userService");

const userResolver = {
    Query:{
        user:()=>{},
        users:()=>{}
    },
    Mutation:{
        createUser:async(_,{username,password})=>{ return await userService.registerUser(username,password)},
        loginUser:async(_,{username,password})=>{return await userService.loginUser(username,password)}
    }
};

module.exports = userResolver;