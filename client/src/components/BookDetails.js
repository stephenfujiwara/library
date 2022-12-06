import React from "react";

export default function BookDetails({ book }) {
  return (
    <div>
      {book && (
        <div>
          <h2>{book.name}</h2>
          <p>{book.genre}</p>
          <p>{book.author.name}</p>
          <p>Other books by this author:</p>
        </div>
      )}
    </div>
  );
}
