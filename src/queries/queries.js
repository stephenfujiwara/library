import { gql } from "@apollo/client";

export const QUERY_ALL_BOOKS = gql`
  query GetAllBooks {
    books {
      name
      genre
      id
      author {
        name
      }
    }
  }
`;

export const GET_BOOK_BY_NAME = gql`
  query GetBook($bookName: String!) {
    book(name: $bookName) {
      id
      name
      genre
    }
  }
`;

export const GET_AUTHOR_BY_NAME = gql`
  query Author($name: String!) {
    author(name: $name) {
      id
      name
      books {
        id
        name
      }
    }
  }
`;

export const CREATE_BOOK_MUTATION = gql`
  mutation createBook($input: createBookInput) {
    createBook(input: $input) {
      id
      name
      genre
    }
  }
`;

export const CREATE_AUTHOR_MUTATION = gql`
  mutation createAuthor($input: createAuthorInput) {
    createAuthor(input: $input) {
      id
      name
    }
  }
`;

export const DELETE_BOOK = gql`
  mutation deleteBook($id: ID!) {
    deleteBook(id: $id) {
      id
      name
    }
  }
`;

export const DELETE_AUTHOR = gql`
  mutation deleteAuthor($id: ID!) {
    deleteAuthor(id: $id) {
      id
      name
    }
  }
`;
