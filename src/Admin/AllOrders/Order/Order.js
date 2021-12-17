import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./Order.css";
import LoadingTop from "../../../Components/common/Loading/LoadingTop";
import Swal from "sweetalert2";
const OrderView = () => {
  const [order, setOrder] = useState({});
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const handleUpdate = (e) => {
    e.preventDefault();
    if (!status) return;
    setLoading(true);
    axios
      .put(`https://intense-basin-48901.herokuapp.com/orders/${id}`, { status })
      .then((res) => {
        console.log(res.data);
        if (res.status === 200) {
          Swal.fire({
            icon: "success",
            title: "order status has been changed!",
            showConfirmButton: false,
            timer: 1500,
          });
          setStatus("");
        }
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };
  useEffect(() => {
    axios
      .get(`https://intense-basin-48901.herokuapp.com/order/${id}`)
      .then((res) => {
        setOrder(res.data.result);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  if (!Object.keys(order).length > 0) return <LoadingTop />;
  return (
    <div>
      <h4 className="text-center mt-2">Update Order</h4>
      <ul class="list-group list-group-flush">
        <li class="list-group-item">
          <div className="row">
            <div className="col-lg-2">
              <strong>ID</strong>
            </div>
            <div className="col-lg-10">
              <p className="m-0">{order?._id}</p>
            </div>
          </div>
        </li>
        <li class="list-group-item">
          <div className="row">
            <div className="col-lg-2">
              <strong>Name</strong>
            </div>
            <div className="col-lg-10">
              <p className="m-0">{order?.name}</p>
            </div>
          </div>
        </li>
        <li class="list-group-item">
          <div className="row">
            <div className="col-lg-2">
              <strong>Email</strong>
            </div>
            <div className="col-lg-10">
              <p className="m-0">{order?.email}</p>
            </div>
          </div>
        </li>
        <li class="list-group-item">
          <div className="row">
            <div className="col-lg-2">
              <strong>Contact</strong>
            </div>
            <div className="col-lg-10">
              <p className="m-0">{order?.phone}</p>
            </div>
          </div>
        </li>
        <li class="list-group-item">
          <div className="row">
            <div className="col-lg-2">
              <strong>Items</strong>
            </div>
            <div className="col-lg-10">
              <div class="row row-cols-1 row-cols-lg-3 g-4">
                {order?.order_products?.map((product) => (
                  <div className="col">
                    <div
                      class="card shadow"
                      style={{ height: "233px !important" }}
                    >
                      <img
                        src={product?.image}
                        style={{
                          width: "100px",
                          display: "block",
                          margin: "0 auto",
                        }}
                        class="card-img-top"
                        alt="..."
                      />
                      <div class="card-body">
                        <p className="m-0">
                          <b>Name:</b>
                          <span class="product-title">
                            {product?.name?.slice(0, 16)}
                          </span>
                        </p>
                        <p className="m-0">
                          <b>Desc:</b>
                          <span class="product-title">
                            {product?.description?.slice(0, 19)}
                          </span>
                        </p>
                        <p className="m-0">
                          <b>Quantity: {product.quintity}</b>
                        </p>
                        <p className="m-0">
                          <b>Price: ${product.price}</b>
                        </p>
                        <p className="m-0">
                          <b>Subtotal: ${product.price * product.quintity}</b>
                        </p>
                        <p className="m-0">
                          <b>Delivery time:</b>
                          <span class="product-title">
                            {product?.deliveryTime}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </li>
        <li class="list-group-item">
          <div className="row">
            <div className="col-lg-2">
              <strong>Total($)</strong>
            </div>
            <div className="col-lg-10">
              <p className="m-0">{order?.subtotal}</p>
            </div>
          </div>
        </li>
        <li class="list-group-item">
          <div className="row">
            <div className="col-lg-2">
              <strong>Payment info</strong>
            </div>
            <div className="col-lg-10">
              <p className="m-0">
                {order?.paymentMethod} => {order?.senderNumber} =>
                {order?.TrxID}
              </p>
            </div>
          </div>
        </li>

        <li class="list-group-item">
          <div className="row">
            <div className="col-lg-2">
              <strong>Address</strong>
            </div>
            <div className="col-lg-10">
              <p className="m-0">{order?.address}</p>
            </div>
          </div>
        </li>
        <li class="list-group-item">
          <div className="row">
            <div className="col-lg-2">
              <strong>Order Date</strong>
            </div>
            <div className="col-lg-10">
              <p className="m-0">{order?.order_date}</p>
            </div>
          </div>
        </li>
        <li class="list-group-item" style={{ marginBottom: "50px !important" }}>
          <div className="row">
            <div className="col-lg-2">
              <strong>Status</strong>
            </div>
            <form onSubmit={handleUpdate}>
              <div className="col-lg-10">
                <select
                  className="form-control"
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="processing">Processing</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="cancel">Cancel</option>
                  <option value="delivered">Delivered</option>
                </select>
              </div>
              <button disabled={loading} className="btn btn-primary mt-2 mb-5">
                Update
              </button>
            </form>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default OrderView;