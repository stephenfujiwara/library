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
      name
      genre
    }
  }
`;

export const GET_AUTHOR_BY_NAME = gql`
  query GetAuthor($name: String!) {
    author(name: $name) {
      name
      age
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
      age
    }
  }
`;