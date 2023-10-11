import { gql } from '@apollo/client';

export const ADD_CHAT = gql`
  mutation addChat($text: String!, $author: String!) {
    addChat(text: $text, author: $author) {
      id
      text
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