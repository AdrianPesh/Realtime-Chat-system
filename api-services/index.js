const express = require("express");

const context = require("./middleware/context");

const {connectRedis} = require("./config/redis");

const {subscriber} = require("./config/redis");

const cors = require("cors");

const {ApolloServer} = require("@apollo/server");

const {Server}=require("socket.io");

const http = require("http");

const {workspaceHandler} = require("./handlers/workspaceHandler");

const {messageHandler} = require("./handlers/messageHandler");

const {redisSubscriber} = require("./handlers/redisHandler");

const typeDefs = require("./schemas/index");

const resolvers = require("./resolvers/index");

const {expressMiddleware} = require("@as-integrations/express5");

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



    const app = express();

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

    const server = new ApolloServer({
    typeDefs,
    resolvers
  });    

  await server.start();

  app.use("/graphql",cors(),express.json(),expressMiddleware(server,{context}));

  httpServer.listen(3000,()=>{
    console.log("Server is running");
  });
}

start();
