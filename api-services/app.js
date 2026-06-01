const express = require("express");
const {expressMiddleware} = require("@as-integrations/express5");
const typeDefs = require("./schemas/index");
const cors = require("cors");
const context = require("./middleware/context");
const resolvers = require("./resolvers/index");
const {ApolloServer} = require("@apollo/server");
const createApp = async()=>{
const app =express();

   const server = new ApolloServer({
    typeDefs,
    resolvers
  });    

  await server.start();

app.use("/graphql",cors(),express.json(),expressMiddleware(server,{context}));

return app;
}
module.exports = {createApp};