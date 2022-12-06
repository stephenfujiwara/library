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
    <div>
      <div>
        <label>Book name:</label>
        <input type="text" onChange={(e) => setTitle(e.target.value)} />
      </div>

      <div>
        <label>Genre:</label>
        <input type="text" onChange={(e) => setGenre(e.target.value)} />
      </div>

      <div>
        <label>Author:</label>
        <input type="text" onChange={(e) => setAuthor(e.target.value)} />
      </div>
      <button
        onClick={() => {
          createBook({
            variables: {
              input: { name: title, genre: genre, authorName: author },
            },
            refetchQueries: [{ query: QUERY_ALL_BOOKS }],
          });
          // upon creating new book entry, check if author doesn't exist, if not, create it
          getAuthor({ variables: { name: author } }).then((result) => {
            if (result.data.author) {
            } else {
              createAuthor({
                variables: {
                  input: { name: author },
                },
              });
            }
          });
        }}
      >
        Add Book
      </button>
    </div>
  );
}
