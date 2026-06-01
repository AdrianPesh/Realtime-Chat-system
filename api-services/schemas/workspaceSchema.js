const workspaceSchema = `#graphql
type Workspace{
id:ID!
name:String!
}
extend type Query{
workspace(id:ID!):Workspace
workspaces:[Workspace]
}

extend type Mutation{
joinWorkspace(name:String!):String
createWorkspace(name:String!):Workspace
deleteWorkspace(id:ID!):String

}

`;

module.exports = workspaceSchema;