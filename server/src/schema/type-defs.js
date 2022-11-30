import { gql } from "apollo-server";

export const typeDefs = gql`
  type Book {
    id: ID
    name: String
    genre: String
    author: Author
  }
  type Author {
    id: ID
    name: String
    age: String
    books: [Book]
  }
  type Query {
    books: [Book]
    book(id: ID!): Book
    authors: [Author]
    author(id: ID!): Author
  }
  input createBookInput {
    name: String
    genre: String
    authorID: ID
  }
  input createAuthorInput {
    name: String
    age: Int
  }
  type Mutation {
    createBook(input: createBookInput): Book
    createAuthor(input: createAuthorInput): Author
  }
`;
