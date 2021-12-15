import React from "react";
import { useParams } from "react-router-dom";
const Search = () => {
  const { term } = useParams();
  return (
    <>
      <h1>Search: {term}</h1>
    </>
  );
};

export default Search;
