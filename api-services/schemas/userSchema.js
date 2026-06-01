const userSchema = `#graphql

type User{
id:ID!
username:String!
}

extend type Query{
users:[User]
user(id:ID!):User
}

extend type Mutation{
createUser(username:String!,password:String!):User
loginUser(username:String!,password:String!):String
}
`;

module.exports = userSchema;