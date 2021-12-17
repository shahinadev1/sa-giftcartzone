import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Single from "../Single/Single";
const Order = () => {
  const location = useLocation();
  const [products, setProducts] = useState(location.state.order.order_products);
  const navigate = useNavigate();
  // console.log(location.state.order);
  useEffect(() => {
    if (location.state === null) navigate("/");
  }, []);
  return (
    <div>
      <h2>All ordered products</h2>
      <div className="card" style={{ marginBottom: "60px" }}>
        <div className="card-body">
          {products.map((product) => (
            <Single key={product._id} item={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Order;
