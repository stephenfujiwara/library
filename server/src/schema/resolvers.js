import { Author } from "../models/Author.js";
import { Book } from "../models/Book.js";

export const resolvers = {
  Query: {
    books: async () => {
      return await Book.find({});
    },
    book: async (parent, args) => {
      return await Book.findOne({ name: args.name });
    },
    authors: async () => {
      return await Author.find({});
    },
    author: async (parent, args) => {
      return await Author.findOne({ name: args.name });
    },
  },
  Book: {
    author: async (parent, args) => {
      return await Author.findOne({ name: parent.authorName });
    },
  },
  Author: {
    books: async (parent, args) => {
      return await Book.find({
        authorName: parent.name,
      });
    },
  },
  Mutation: {
    createBook: async (parent, args) => {
      const newBook = new Book({
        name: args.input.name,
        genre: args.input.genre,
        authorName: args.input.authorName,
      });
      const res = await newBook.save(); //writing to DB
      return {
        id: res.id,
        ...res._doc,
      };
    },
    createAuthor: async (parent, args) => {
      const newAuthor = new Author({
        name: args.input.name,
        age: args.input.age,
      });
      const res = await newAuthor.save();
      return {
        id: res.id,
        ...res._doc,
      };
    },
    deleteBooks: async (parent, args) => {
      return (await Book.deleteMany({})).deletedCount;
    },
    deleteAuthors: async (parent, args) => {
      return (await Author.deleteMany({})).deletedCount;
    },
  },
};
