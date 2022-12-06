import { useState } from "react";
import { useLazyQuery, gql } from "@apollo/client";

const GET_BOOK_BY_NAME = gql`
  query GetBook($bookName: String!) {
    book(name: $bookName) {
      name
      genre
    }
  }
`;

export default function BookSearch() {
  const [bookSearchName, setBookSearchName] = useState("");

  // useLazyQuery lets us make queries only when we explicitly want to make one
  const [fetchBook, { data, error }] = useLazyQuery(GET_BOOK_BY_NAME);

  if (error) console.log(error);

  return (
    <div>
      <input
        type="text"
        placeholder="Search for a book"
        onChange={(e) => setBookSearchName(e.target.value)}
      ></input>
      <button
        onClick={() => fetchBook({ variables: { bookName: bookSearchName } })}
      >
        Fetch Book
      </button>
      {data && (
        <div>
          <h1>
            Book Name: {data.book.name} Genre: {data.book.genre}
          </h1>
        </div>
      )}
      {error && <h1>Couldn't find a book with that title</h1>}
    </div>
  );
}
