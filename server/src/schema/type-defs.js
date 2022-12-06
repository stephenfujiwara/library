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
    book(name: String!): Book!
    authors: [Author]
    author(name: String!): Author
  }
  input createBookInput {
    name: String
    genre: String
    authorName: String
  }
  input createAuthorInput {
    name: String
    age: Int
  }
  type Mutation {
    createBook(input: createBookInput): Book
    createAuthor(input: createAuthorInput): Author
    deleteBooks: Int
    deleteAuthors: Int
  }
`;