const { gql } = require("apollo-server-express");

const typeDefs = gql`
  scalar Upload

  type Capsule {
    _id: ID
    title: String!
    date: String!
    location: String
    posts: [Post]
    chat: [LiveChat]
  }
  type Post {
    _id: ID
    url: String!
    thumbnail: String
    date: String!
    upVotes: Int!
    comments: [Comment]
    owner: String!
  }
  type User {
    _id: ID
    username: String
    firstName: String
    lastName: String
    email: String
    password: String
    capsules: [Capsule]
  }
  type Auth {
    token: ID!
    user: User
  }
 
  type LiveChat {
    _id: ID
    text: String!
    date: String!
    author: String!
  }
  type Comment {
    _id: ID
    text: String!
    author: String!
    date: String!
  }

  type Query {
    me: User
    getChat: [LiveChat]
    getCapsule(_id: ID!): Capsule
    getUsers: [User]
    getPost(capsuleId: ID!, postId: ID!): Post
  }

  type File {
    filename: String!
    mimetype: String!
    encoding: String!
    url: String!
  }


  type ImageUploadResponse {
    public_id: String
    secure_url: String
  }

  type Mutation {
    createCapsule(title: String!, date: String!, owner: ID!): Capsule
    addPost(capsuleId: ID!, text: String!): Post
    deletePost(postId: ID!): Post
    login(username: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    addChat(text: String!, author: String!, capsuleId: ID!): LiveChat
    uploadFile(file: Upload!): File!
    deleteUser(userId: ID!): User
    uploadPost(file: Upload!): ImageUploadResponse # trying this out for cloudinary  - Will
  }
`;

// TRACKING BASIC USER FLOW

// make account WORKS (small error issue, but saves to db regardless)
// delete account WORKS
//

module.exports = typeDefs;
