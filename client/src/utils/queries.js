import { gql } from '@apollo/client';

export const GET_CHAT = gql`
  query getChat {
    messages {
      id
      text
      author
      date
    }
  }
`;

export const GET_CAPSULE = gql`
  query getCapsule($capsuleId: ID!) {
    capsule(capsuleId: $capsuleId) {
      _id
      title
      date
      owner
      chat {
        _id
        text
        author
        date
      }
      posts {
        _id
        text
        date
        upVotes
        comments {
          _id
          text
          date
          author
        }
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(userName: $username, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;