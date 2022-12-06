import React, { useState } from "react";
import { useQuery } from "@apollo/client";

import BookDetails from "../components/BookDetails";
import { QUERY_ALL_BOOKS } from "../queries/queries";

export default function BookList() {
  const { data, loading, error } = useQuery(QUERY_ALL_BOOKS);

  if (error) console.log(error);

  const [active, setActive] = useState();

  function displayBooks() {
    return data.books.map((book) => {
      return (
        <li key={book.id} onClick={() => setActive(book)}>
          {book.name}
        </li>
      );
    });
  }

  return (
    <div>
      {data && displayBooks()} <BookDetails book={active} />
    </div>
  );
}
