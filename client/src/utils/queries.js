import { gql } from "@apollo/client";

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

