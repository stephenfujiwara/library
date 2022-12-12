import { authorModel } from "../models/Author.js";
import { bookModel } from "../models/Book.js";

import mongoose from "mongoose";

const uri = process.env.MONGO_URI;

const getAuthorModel = async () => {
  const connection = await mongoose.createConnection(uri).asPromise();
  return authorModel(connection);
};

const getBookModel = async () => {
  const connection = await mongoose.createConnection(uri).asPromise();
  return bookModel(connection);
};

export const resolvers = {
  Query: {
    books: async (parent, args) => {
      const Book = await getBookModel();
      return await Book.find({});
    },
    book: async (parent, args) => {
      const Book = await getBookModel();
      return await Book.findOne({ name: args.name });
    },
    authors: async () => {
      const Author = await getAuthorModel();
      return await Author.find({});
    },
    author: async (parent, args) => {
      const Author = await getAuthorModel();
      return await Author.findOne({ name: args.name });
    },
  },
  Book: {
    author: async (parent, args) => {
      const Author = await getAuthorModel();
      return await Author.findOne({ name: parent.authorName });
    },
  },
  Author: {
    books: async (parent, args) => {
      const Book = await getBookModel();
      return await Book.find({
        authorName: parent.name,
      });
    },
  },
  Mutation: {
    createBook: async (parent, args) => {
      const Book = await getBookModel();
      const newBook = await Book.create({
        name: args.input.name,
        genre: args.input.genre,
        authorName: args.input.authorName,
      });
      return newBook;
    },
    createAuthor: async (parent, args) => {
      const Author = await getAuthorModel();
      const newAuthor = await Author.create({
        name: args.input.name,
      });
      return newAuthor;
    },
    deleteBook: async (parents, args) => {
      const Book = await getBookModel();
      return await Book.findByIdAndDelete(args.id);
    },
    deleteAuthor: async (parent, args) => {
      const Author = await getAuthorModel();
      return await Author.findByIdAndDelete(args.id);
    },
    deleteBooks: async (parent, args) => {
      const Book = await getBookModel();
      return (await Book.deleteMany({})).deletedCount;
    },
    deleteAuthors: async (parent, args) => {
      const Author = await getAuthorModel();
      return (await Author.deleteMany({})).deletedCount;
    },
  },
};
