import React from "react";
import { useParams, Outlet } from "react-router-dom";
const Category = () => {
  const { slug } = useParams();
  return (
    <div>
      <h1>category name: {slug}</h1>
      <Outlet />
    </div>
  );
};

export default Category;
