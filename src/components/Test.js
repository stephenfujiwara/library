import React from "react";
import { useLazyQuery } from "@apollo/client";
import { GET_AUTHOR_BY_NAME } from "../queries/queries";

export default function Test() {
  const [getAuthor] = useLazyQuery(GET_AUTHOR_BY_NAME);
  function handleClick() {
    getAuthor({
      variables: { name: "a" },
      fetchPolicy: "no-cache",
      onCompleted: (data) => {
        console.log(data);
      },
    });
  }
  return (
    <div>
      <button onClick={() => handleClick()}>Get Author</button>
    </div>
  );
}
