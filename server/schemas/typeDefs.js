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
        user: User
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
    }

    type Query {
        me: User
        GetMessages: [Message]
        GetCapsule(_id: ID!): Capsule
    }

    type File {
        filename: String!
        mimetype: String!
        encoding: String!
        url: String!
      }
    
    type Mutation {
        createCapsule(title: String!, date: String!): Capsule
        addPost(capsuleId: ID!, text: String!): Post
        deletePost(postId: ID!): Post
        login(email: String!, password: String!): User
        addUser(username: String!, email: String!, password: String!): User
        AddMessage(text: String!): Message
        uploadFile(file: Upload!): File!
    }
`;

module.exports = typeDefs;