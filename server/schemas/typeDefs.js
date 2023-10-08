const { gql } = require('apollo-server-express');

const typeDefs = gql`
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
        getMessages: [Message]
    }

    type Mutation {
        login(email: String!, password: String!): User
        addUser(username: String!, email: String!, password: String!): User
        addMessage(text: String!): Message
    }
`;

module.exports = typeDefs;