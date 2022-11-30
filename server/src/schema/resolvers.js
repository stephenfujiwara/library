import { Author } from "../models/Author.js";
import { Book } from "../models/Book.js";

export const resolvers = {
  Query: {
    books: () => {
      return Book.find({});
    },
    book: (parent, args) => {
      return Book.findByID(args.id);
    },
    authors: () => {
      return Author.find({});
    },
    author: (parent, args) => {
      return Author.findById(args.id);
    },
  },
  Book: {
    author: (parent, args) => {
      return Author.findById(parent.id);
    },
  },
  Author: {
    books: (parent, args) => {
      return Book.find({
        authorId: parent.id,
      });
    },
  },
  Mutation: {
    createBook: async (parent, args) => {
      const newBook = new Book({
        name: args.input.name,
        genre: args.input.genre,
        author: args.input.author,
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
  },
};
