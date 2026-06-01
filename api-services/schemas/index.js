const userSchema = require("./userSchema");
const workspaceSchema = require("./workspaceSchema");
const baseSchema = require("./baseSchema");
const workspaceMemberSchema = require("./workspaceMemberSchema");

const schemas = `#graphql

${baseSchema}

${userSchema}

${workspaceSchema}

${workspaceMemberSchema}



`;

module.exports = schemas;