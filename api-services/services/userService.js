const userHelper = require("../helpers/userHelper");
const authHelper = require("../helpers/authHelper");
const prisma = require("../config/prisma");



const registerUser = async(username,password)=>{

    const existingUser = await prisma.user.findUnique({
        where:{
            username
        }
    });
    if(existingUser){
       throw new Error("User already exists");
    }

    const password_hash = await userHelper.hashPassword(password);

    const user = await prisma.user.create({
        data:{
            username,
            password_hash
        }
    });

 

    return user;
}

const loginUser = async(username,password)=>{
    const user = await prisma.user.findUnique({
        where:{
            username
        }
    });

    if(!user){
      throw new Error("Wrong credentials");
    }

    const match = await userHelper.verifyPassword(password,user.password_hash);

    if(match){
        const data = {
            id:user.id,
            username:username
        };
        const token = authHelper.signJWT(data);

        return token;

    }
}

module.exports={
    registerUser,
    loginUser
};