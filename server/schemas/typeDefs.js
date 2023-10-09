const { gql } = require('apollo-server-express');

const typeDefs = gql`

scalar Upload

    type Capsule {
        _id: ID
        title: String!
        date: String!
        posts: [Post]
        user: User
    }
    type Post {
        _id: ID
        text: String!
        capsuleId: ID!
        owner: User
    }
    type User {
        _id: ID
        username: String!
        email: String!
        password: String!
    }
    type Message {
        _id: ID
        text: String!
        date: String!
        author: User
    }

    type Query {
        me: User
        GetMessages: [Message]
        GetCapsule(_id: ID!): Capsule
        getUsers: [User]
    }

    type File {
        filename: String!
        mimetype: String!
        encoding: String!
        url: String!
      }
    
    type Mutation {
        createCapsule(title: String!, date: String!, owner:ID!): Capsule
        addPost(capsuleId: ID!, text: String!): Post
        deletePost(postId: ID!): Post
        login(email: String!, password: String!): User
        addUser(username: String!, email: String!, password: String!): User
        AddMessage(text: String!): Message
        uploadFile(file: Upload!): File!
    }
`;


// TRACKING BASIC USER FLOW

// make account WORKS (small error issue, but saves to db regardless)
// delete account WORKS
//



module.exports = typeDefs;