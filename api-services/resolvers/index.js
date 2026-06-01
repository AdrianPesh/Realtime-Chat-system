const userResolver = require("./userResolver");
const workspaceResolver = require("./workspaceResolver");
const workspaceMemberResolver= require("./workspaceMemberResolver");

const resolvers = {
    Query:{
        ...userResolver.Query,
        ...workspaceResolver.Query,
        ...workspaceMemberResolver.Query
    },
    Mutation:{
        ...userResolver.Mutation,
        ...workspaceResolver.Mutation,
        ...workspaceMemberResolver.Mutation
    }
};

module.exports = resolvers;