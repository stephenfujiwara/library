import React from "react";
import { useQuery, gql } from "@apollo/client";
import { GET_BOOKS } from "../GraphQL/Queries";

export default function BookList() {
  const stuff = useQuery(GET_BOOKS);
  console.log(stuff);
  return (
    <div>
      <ul className="book-list">
        <li>Book Name</li>
      </ul>
    </div>
  );
}
