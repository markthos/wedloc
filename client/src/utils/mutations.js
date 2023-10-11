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
