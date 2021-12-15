import React, { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  increment,
  dencrement,
  get_total,
  remove,
} from "../../../redux/reducer/cartReducer";
import "./Item.css";

const Items = ({ item }) => {
  const dispatch = useDispatch();
  const state = useSelector((st) => st.cartReducer);
  const gItem = useSelector((state) =>
    state.cartReducer.items.find((p) => p._id === item._id)
  );
  return (
    <>
      <li className="row">
        <div
          className="col-1 d-flex justify-center align-items-center align-content-center"
          style={{ flexDirection: "column" }}
        >
          <button
            className="btn btn-primary p-1"
            onClick={() => {
              dispatch(increment(item._id));
              dispatch(get_total());
            }}
          >
            +
          </button>
          <p style={{ fontSize: 14, margin: 0, textAlign: "center" }}>
            {gItem?.quintity}
          </p>
          <button
            className="btn btn-success p-1"
            onClick={() => {
              dispatch(dencrement(item._id));
              dispatch(get_total());
            }}
          >
            -
          </button>
        </div>
        <div className="col-11">
          <div className="row justify-around">
            <div className="col-4">
              <img src={item.image} className="item-img" alt="" />
            </div>
            <div className="col-8 mx-auto">
              <span className="d-block">{item.name}</span>
              <span className="d-block text-secondary">
                unit price: {item.price} ৳
              </span>
              <span className="d-block text-secondary">
                Delivery: {item.deliveryTime}
              </span>
              <button
                className="btn btn-danger p-0"
                onClick={() => {
                  dispatch(remove(item._id));
                  dispatch(get_total());
                }}
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      </li>

      <hr />
    </>
  );
};

export default Items;
