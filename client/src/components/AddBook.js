import { useState } from "react";
import { useMutation, useLazyQuery } from "@apollo/client";

import {
  CREATE_BOOK_MUTATION,
  QUERY_ALL_BOOKS,
  GET_AUTHOR_BY_NAME,
  CREATE_AUTHOR_MUTATION,
} from "../queries/queries";

export default function AddBook() {
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [author, setAuthor] = useState("");

  const [createBook] = useMutation(CREATE_BOOK_MUTATION);
  const [createAuthor] = useMutation(CREATE_AUTHOR_MUTATION);

  const [getAuthor] = useLazyQuery(GET_AUTHOR_BY_NAME);

  return (
    <div className="w-1/2 flex-col space-y-4 absolute bottom-0 bg-white pb-20">
      <div className="flex items-center">
        <label
          className="block w-1/3 text-center text-gray-500 font-bold pr-4"
          for="book-name"
        >
          Book name
        </label>
        <input
          className="w-1/2 appearance-none shadow border-2 border-gray-100 rounded bg-gray-100 focus:bg-white focus:border-purple-500 focus:outline-none text-black text-sm px-4 py-2 placeholder:italic"
          type="text"
          placeholder="Lord of the Rings"
          id="book-name"
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="flex items-center">
        <label
          className="block w-1/3 text-center text-gray-500 font-bold pr-4"
          for="genre-name"
        >
          Genre
        </label>
        <input
          className="w-1/2 appearance-none shadow border-2 border-gray-100 rounded bg-gray-100 focus:bg-white focus:border-purple-500 focus:outline-none text-black text-sm px-4 py-2 placeholder:italic"
          type="text"
          id="genre-name"
          placeholder="Fantasy"
          onChange={(e) => setGenre(e.target.value)}
        />
      </div>

      <div className="flex items-center">
        <label
          className="block w-1/3 text-center text-gray-500 font-bold pr-4"
          for="author-name"
        >
          Author
        </label>
        <input
          className="w-1/2 appearance-none shadow border-2 border-gray-100 rounded bg-gray-100 focus:bg-white focus:border-purple-500 focus:outline-none text-black text-sm px-4 py-2 placeholder:italic"
          type="text"
          id="author-name"
          placeholder="John Tolkien"
          onChange={(e) => setAuthor(e.target.value)}
        />
      </div>
      <div className="flex items-center">
        <div className="w-1/3"></div>
        <button
          className="shadow-lg text-white font-bold bg-purple-500 rounded-md mt-3 py-2 px-4 hover:shadow-purple-500/50"
          onClick={() => {
            createBook({
              variables: {
                input: { name: title, genre: genre, authorName: author },
              },
              refetchQueries: [{ query: QUERY_ALL_BOOKS }],
            });
            // upon creating new book entry, check if author exists, if not, create it
            getAuthor({
              variables: { name: author },
              fetchPolicy: "no-cache",
              onCompleted: (data) => {
                if (!data.author) {
                  createAuthor({
                    variables: {
                      input: { name: author },
                    },
                  });
                }
              },
            });
          }}
        >
          Add Book
        </button>
      </div>
    </div>
  );
}
