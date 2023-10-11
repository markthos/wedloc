import { gql } from '@apollo/client';

export const REGISTER_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      _id
      username
      email
      # ... other fields you want to query
    }
  }
`;
