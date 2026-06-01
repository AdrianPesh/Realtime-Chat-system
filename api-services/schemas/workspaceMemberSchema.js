const workspaceMemberSchema = `#graphql

enum workspaceRole {
OWNER
ADMIN
MEMBER
}

type WorkspaceMember{
id:ID!
userId:ID!
workspaceId:ID!
role:String
}

extend type Query{
getMembers(workspaceId:ID!):[WorkspaceMember]
}

extend type Mutation{
addMember(workspaceId:ID!,userIdToAdd:ID!,role:workspaceRole!):WorkspaceMember
removeMember(workspaceId:ID!,userIdToRemove:ID!):WorkspaceMember
changeMemberRole(workspaceId:ID!,userIdToChange:ID!,newRole:workspaceRole!):WorkspaceMember
}
`;

module.exports = workspaceMemberSchema;