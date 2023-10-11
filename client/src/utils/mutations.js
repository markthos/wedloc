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

