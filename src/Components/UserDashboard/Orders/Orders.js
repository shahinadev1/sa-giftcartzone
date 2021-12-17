import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import LoadingTop from "../../common/Loading/LoadingTop";
import "./Orders.css";
import notFound from "./notFound.svg";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import useAuth from "../../../Hooks/useAuth";
const Orders = () => {
  const [orders, setOrders] = useState([]);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`https://intense-basin-48901.herokuapp.com/orders/${user.email}`)
      .then((res) => {
        if (res.status === 200) {
          setOrders(res.data.result);
        }
      })
      .catch((err) => {
        // console.log(err);
        setOrders([]);
      });
  }, []);
  if (!orders.length > 1) return <LoadingTop />;
  return (
    <div
      className="w-100 h-100"
      style={{ marginBottom: "80px", overflowX: "scroll" }}
    >
      <h2 className="bg-light mt-2 p-0 fw-normal">My orders</h2>
      {orders.length === 0 ? (
        <div
          className="not-order"
          style={{ backgroundImage: `url(${notFound})` }}
        >
          <h4 style={{ color: "#333" }}>No order found</h4>
        </div>
      ) : (
        <div className="table-responsive ">
          <table class="table table-striped table-hover w-100">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Placed On</th>
                <th scope="col">Status</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr>
                  <th>#{order?._id.slice(0, 3)}...</th>
                  <td>{order?.order_date}</td>
                  <td>{order?.status}</td>
                  <td>
                    <Button
                      onClick={() =>
                        navigate("/user/orders/manage", {
                          state: { order: order },
                        })
                      }
                      variant="contained"
                      color="primary"
                      size="small"
                    >
                      Manage
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Orders;
