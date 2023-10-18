import { gql } from "@apollo/client";

export const ADD_CHAT = gql`
  mutation addChat($text: String!, $author: String!, $capsuleId: ID!) {
    addChat(text: $text, author: $author, capsuleId: $capsuleId) {
      _id
      text
      date
      author
    }
  }
`;

export const UPDATE_CAPSULE = gql`
  mutation Mutation(
    $capsuleId: ID!
    $title: String!
    $location: String!
    $eventPic: String
  ) {
    updateCapsule(
      capsuleId: $capsuleId
      title: $title
      location: $location
      eventPic: $eventPic
    ) {
      _id
      eventPic
      location
      title
    }
  }
`;

export const DELETE_CAPSULE = gql`
  mutation Mutation($capsuleId: ID!) {
    deleteCapsule(capsuleId: $capsuleId) {
      _id
      owner
      title
    }
  }
`;
export const REGISTER_USER = gql`
  mutation addUser(
    $username: String!
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
  ) {
    addUser(
      username: $username
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
    ) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const UPDATE_USER = gql`
  mutation Mutation($username: String!, $firstName: String!, $lastName: String!, $email: String!, $profilePic: String!) { 
    updateUser(username: $username, firstName: $firstName, lastName: $lastName, email: $email, profilePic: $profilePic) {
      username
      firstName
      lastName
      email
      profilePic
    }
  }
`;


export const UPLOAD_IMAGE = gql`
  mutation uploadPost($file: Upload!) {
    uploadPost(file: $file) {
      public_id
      secure_url
    }
  }
`;

export const ADD_CAPSULE = gql`
  mutation CreateCapsule(
    $title: String!
    $eventPic: String!
    $date: String!
    $location: String!
  ) {
    createCapsule(
      title: $title
      date: $date
      eventPic: $eventPic
      location: $location
    ) {
      _id
      title
      date
      location
      eventPic
    }
  }
`;

// upvote on a single post
export const UPVOTE = gql`
  mutation upVote($capsuleId: ID!, $postId: ID!) {
    upVote(capsuleId: $capsuleId, postId: $postId) {
      upVotes
    }
  }
`;

// downvote on a single post
export const DOWNVOTE = gql`
  mutation downVote($capsuleId: ID!, $postId: ID!) {
    downVote(capsuleId: $capsuleId, postId: $postId) {
      upVotes
    }
  }
`;

// add a comment to a single post
export const ADD_COMMENT = gql`
  mutation addComment(
    $capsuleId: ID!
    $postId: ID!
    $text: String!
    $author: String!
  ) {
    addComment(
      capsuleId: $capsuleId
      postId: $postId
      text: $text
      author: $author
    ) {
      comment_count
      comments {
        _id
        text
        author
        date
      }
    }
  }
`;

export const ADD_POST = gql`
  mutation uploadPost($capsuleId: ID!, $url: String!, $owner: String!) {
    uploadPost(capsuleId: $capsuleId, url: $url, owner: $owner) {
      _id
      url
      thumbnail
      date
      upVotes
      comment_count
      owner
    }
  }
`;

export const DELETE_POST = gql`
  mutation Mutation($capsuleId: ID!, $postId: ID!) {
    deletePost(capsuleId: $capsuleId, postId: $postId) {
      owner
    }
  }
`;
