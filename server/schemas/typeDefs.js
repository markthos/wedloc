const { gql } = require("apollo-server-express");

const typeDefs = gql`
  scalar Upload

  type Capsule {
    _id: ID
    title: String!
    date: String!
    owner: String!
    location: String
    eventPic: String
    posts_count: Int
    posts: [Post]
    chat_count: Int
    chat: [LiveChat]
    attendant_count: Int
    attendants: [Attendees]
  }

  type Post {
    _id: ID
    url: String
    thumbnail: String
    date: String
    upVotes: Int
    comment_count: Int
    comments: [Comment]
    owner: String
  }

  type User {
    _id: ID
    username: String
    firstName: String
    lastName: String
    email: String
    password: String
    profilePic: String
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

  type Attendees {
    _id: ID
    name: String!
  }

  type CreditCard {
    _id: ID!
    cardNumber: String!
    expiryDate: String!
    CVV: String!
    cardHolderName: String!
    user: User!
}

  type Query {
    me: User
    getUserPic: User
    getChat: [LiveChat]
    getCapsulesDev: [Capsule]
    getCapsule(_id: ID!): Capsule
    getUserCapsules: [Capsule]
    getUsers: [User]
    getPost(capsuleId: ID!, postId: ID!): Post
    getCreditCard(_id: ID!): CreditCard
    getUserCreditCards: [CreditCard]!
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

  type Payment {
    _id: ID
    userId: ID!
    chargeId: String!
    amount: Float!
    currency: String!
    description: String
    createdAt: String!
  }


  type Mutation {
    createCapsule(title: String!, eventPic: String, location: String!, date: String!): Capsule
    updateCapsule(capsuleId: ID!, title: String!, eventPic: String, location: String!): Capsule
    deleteCapsule(capsuleId: ID!): Capsule
    devDelCapsule(capsuleId: ID!): Capsule
    uploadPost(capsuleId: ID!, url: String!, owner: String): Post
    deletePost(capsuleId: ID!, postId: ID!): Post
    login(username: String!, password: String!): Auth
    addUser(username: String!, firstName: String!, lastName: String!, email: String!, password: String!): Auth
    updateUser(firstName: String!, lastName: String!, username: String!, email: String!, profilePic: String!): User
    addChat(text: String!, author: String!, capsuleId: ID!): LiveChat
    uploadFile(file: Upload!): File!
    devDelUser(userId: ID!): User
    deleteUser(username:String!): Auth
    addPayment(userId: ID!, chargeId: String!, amount: Float!, currency: String!, description: String): Payment
    addCreditCard(cardNumber: String!, expiryDate: String!, CVV: String!, cardHolderName: String!): CreditCard
    deleteCreditCard(_id: ID!): CreditCard
    updateCreditCard(_id: ID!, cardNumber: String, expiryDate: String, CVV: String, cardHolderName: String): CreditCard
    validateAndStoreCard(number: String!, exp_month: Int!, exp_year: Int!, cvc: String!): CreditCard
    upVote(capsuleId: ID!, postId: ID!): Post
    downVote(capsuleId: ID!, postId: ID!): Post
    addComment(capsuleId: ID!, postId: ID!, text: String!, author: String!): Post  
  }
`;

module.exports = typeDefs;
