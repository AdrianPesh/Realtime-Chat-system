const authHelper = require("../helpers/authHelper");

const socketAuth = async(socket,next)=>{
  try{
    const token = socket.handshake.auth.token;

    if(!token){
      return next(new Error("Unauthorized"));
    }
    const user =  authHelper.verifyJWT(token);

   

    socket.user = user;

    next();
  }catch(error){
    
    next(new Error("Unauthorized"));
  }
}

module.exports = socketAuth;