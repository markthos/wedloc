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

