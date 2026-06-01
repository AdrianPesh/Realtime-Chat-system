const express = require("express");



const {connectRedis} = require("./config/redis");




const {createApp} = require("./app");

const {Server}=require("socket.io");

const http = require("http");

const {workspaceHandler} = require("./handlers/workspaceHandler");

const {messageHandler} = require("./handlers/messageHandler");

const {redisSubscriber} = require("./handlers/redisHandler");





const socketAuth = require("./middleware/socketAuth");



const sleep = (ms)=>{
 return new Promise(resolve=>setTimeout(resolve,ms));
}

const start = async()=>{

    let connected = false;
    let redisConnect=false;
    let prismaConnect=false;

    while(!connected){
      try{
        if(!prismaConnect){
          require("./config/prisma");
          prismaConnect=true;
        }
        if(!redisConnect){
         await connectRedis();
         redisConnect=true;
        }
        connected=true;
      }catch(error){
        console.log("Retrying connection...");
        await sleep(1000);

      }
    }



    const app = await createApp();

    const httpServer = http.createServer(app);

    const io = new Server(httpServer,{
        cors:"*"
    });


    io.use(socketAuth);
    
    redisSubscriber(io);
  io.on("connection",(socket)=>{
     console.log("User connected: ",socket.id);
     workspaceHandler(socket,io);
     messageHandler(socket,io);
    
  });

 

  

  httpServer.listen(3000,()=>{
    console.log("Server is running");
  });
}

start();
