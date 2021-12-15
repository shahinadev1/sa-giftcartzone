import React from "react";

import { useParams } from "react-router-dom";
const SearchPage = () => {
  const { term } = useParams();

  return (
    <div className="container">
      <p>{term}</p>
    </div>
  );
};

export default SearchPage;
