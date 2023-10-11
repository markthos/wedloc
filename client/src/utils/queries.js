import { gql } from "@apollo/client";

export const GET_CAPSULE = gql`
  query GetCapsule($id: ID!) {
    getCapsule(_id: $id) {
      _id
      title
      date
      location
      posts {
        _id
        url
        thumbnail
        date
        upVotes
        comments {
          _id
          text
          author
          date
        }
        owner
      }
      chat {
        _id
        text
        date
        author
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      _id
      username
    }
  }
`;

export const GET_POST = gql`
query getPost($capsuleId: ID!, $postId: ID!) {
  getPost(capsuleId: $capsuleId, postId: $postId) {
    _id
    url
    thumbnail
    date
    upVotes
    comments {
      _id
      text
      author
      date
    }
    owner
  }
}
`;

export const GET_CHAT = gql`
  query getCapsule($id: ID!) {
    getCapsule(_id: $id) {
      _id
      title
      date
      location
      chat {
        _id
        text
        date
        author
      }
    }
  }
`;
