const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID
        username: String!
        email: String!
        password: String!
    }

    type Query {
        me: User
    }
`;

module.exports = typeDefs;