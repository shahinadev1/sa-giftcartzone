import React, { useState, useEffect } from "react";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Button from "@mui/material/Button";
import axios from "axios";
const Home = () => {
  const [products, setProducts] = useState([]);
  const [totalSubCategory, setSubCategory] = useState([]);
  const [parentCategory, setParentCategory] = useState([]);
  const [discounts, setDiscounts] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios
      .get("https://intense-basin-48901.herokuapp.com/products")
      .then((res) => {
        if (res.status === 200) {
          setProducts(res.data.result);
        }
      });
    axios
      .get("https://intense-basin-48901.herokuapp.com/orders")
      .then((res) => {
        if (res.status === 200) {
          setOrders(res.data.result);
        }
      });
    axios
      .get("https://intense-basin-48901.herokuapp.com/discounts")
      .then((res) => {
        if (res.status === 200) {
          setDiscounts(res.data.result);
        }
      });
    axios
      .get("https://intense-basin-48901.herokuapp.com/parent-category")
      .then((res) => {
        if (res.status === 200) {
          setParentCategory(res.data.result);
        }
      });
    axios
      .get("https://intense-basin-48901.herokuapp.com/sub-category")
      .then((res) => {
        if (res.status === 200) {
          setSubCategory(res.data.result);
        }
      });
  });

  return (
    <>
      <div className="container my-5">
        <div className="row text-center">
          <div className="col-lg-4 my-3 shadow-sm ">
            <h4 className="text-secondary fw-normal">Total products:</h4>
            <p>
              <strong>{products.length}</strong>
            </p>
            <Button variant="contained" sx={{ p: 0 }} color="secondary">
              <RemoveRedEyeIcon />
            </Button>
          </div>
          <div className="col-lg-4 my-3 shadow-sm">
            <h4 className="text-secondary">Total Categories</h4>
            <p>
              <strong>
                {parentCategory?.length} || {totalSubCategory?.length}
              </strong>
            </p>
            <Button variant="contained" sx={{ p: 0 }} color="secondary">
              <RemoveRedEyeIcon />
            </Button>
          </div>
          <div className="col-lg-4 my-3 shadow-sm">
            <h4 className="text-secondary fw-normal">Total discounts</h4>
            <p>
              <strong>{discounts?.length}</strong>
            </p>
            <Button variant="contained" sx={{ p: 0 }} color="secondary">
              <RemoveRedEyeIcon />
            </Button>
          </div>
          <div className="col-lg-4 my-3 shadow-sm">
            <h4 className="text-secondary fw-normal">Total orders</h4>
            <p>
              <strong>{orders?.length}</strong>
            </p>
            <Button variant="contained" sx={{ p: 0 }} color="secondary">
              <RemoveRedEyeIcon />
            </Button>
          </div>
          <div className="col-lg-4 my-3 shadow-sm">
            <h4 className="text-secondary  fw-normal">Orders pending</h4>
            <p>
              <strong>
                {orders?.filter((order) => order.status !== "delivered").length}
              </strong>
            </p>
            <Button variant="contained" sx={{ p: 0 }} color="secondary">
              <RemoveRedEyeIcon />
            </Button>
          </div>
          <div className="col-lg-4 my-3 shadow-sm">
            <h4 className="text-secondary fw-normal">Orders delivered</h4>
            <p>
              <strong>
                {orders?.filter((order) => order.status === "delivered").length}
              </strong>
            </p>
            <Button variant="contained" sx={{ p: 0 }} color="secondary">
              <RemoveRedEyeIcon />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
