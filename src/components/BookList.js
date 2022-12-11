import React, { useState } from "react";
import { useMutation, useQuery, useLazyQuery } from "@apollo/client";

import BookDetails from "../components/BookDetails";
import {
  QUERY_ALL_BOOKS,
  DELETE_BOOK,
  GET_AUTHOR_BY_NAME,
  DELETE_AUTHOR,
} from "../queries/queries";

export default function BookList() {
  const { data, loading } = useQuery(QUERY_ALL_BOOKS);
  const [getAuthor] = useLazyQuery(GET_AUTHOR_BY_NAME);
  const [deleteBook] = useMutation(DELETE_BOOK);
  const [deleteAuthor] = useMutation(DELETE_AUTHOR);

  const [active, setActive] = useState();
  const [open, setOpen] = useState(true);

  function closeDetails() {
    setOpen(false);
    deleteBook({
      variables: { id: active.id },
      refetchQueries: [{ query: QUERY_ALL_BOOKS }],
    });
    getAuthor({
      variables: { name: active.author.name },
      fetchPolicy: "no-cache",
      onCompleted: (data) => {
        //console.log(data.author.books.length);
        if (data.author.books.length === 0) {
          deleteAuthor({
            variables: { id: data.author.id },
          });
        }
      },
    });
  }

  function displayBooks() {
    if (data && !loading) {
      return data.books.map((book) => {
        return (
          <li
            className="inline-block px-4 py-2 mx-4 rounded shadow-lg border border-purple-500 cursor-pointer text-purple-500 hover:shadow-purple-500/50"
            key={book.id}
            onClick={() => {
              setActive(book);
              setOpen(true);
            }}
          >
            {book.name}
          </li>
        );
      });
    }
  }

  return (
    <div>
      <h2 className="absolute left-8 top-28">Stored Books:</h2>
      {data && <ul className="w-1/2 pt-40 pl-6">{displayBooks()}</ul>}
      {data && open && (
        <BookDetails book={active} closeDetails={closeDetails} />
      )}
    </div>
  );
}
