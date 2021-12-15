import React from "react";
import { ShoppingBasketSharp } from "@material-ui/icons";
const Home = () => {
  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-lg-4 shadow-sm">
          <h4>
            <ShoppingBasketSharp />
          </h4>
          <p>
            <strong>1</strong>
          </p>
        </div>
        <div className="col-lg-4 shadow-sm">
          <h4>Total Categories</h4>
          <p>
            <strong>1</strong>
          </p>
        </div>
        <div className="col-lg-4 shadow-sm">
          <h4>Total Categories</h4>
          <p>
            <strong>1</strong>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
