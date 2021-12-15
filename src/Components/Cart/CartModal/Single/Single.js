import React, { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  increment,
  dencrement,
  get_total,
  remove,
} from "../../../../redux/reducer/cartReducer";

const Single = ({ item }) => {
  const dispatch = useDispatch();
  const state1 = useSelector((st) => st.cartReducer);
  const gItem = useSelector((state) =>
    state.cartReducer.items.find((p) => p._id === item._id)
  );
  return (
    <>
      <div className="item-container">
        <div className="buttons">
          <p
            onClick={() => {
              dispatch(increment(item._id));
              dispatch(get_total());
            }}
          >
            +
          </p>
          <span>{gItem.quintity} </span>
          <p
            onClick={() => {
              dispatch(dencrement(item._id));
              dispatch(get_total());
            }}
          >
            -
          </p>
        </div>
        <div className="m-item-media">
          <img src={gItem.image} alt="" />
        </div>
        <div className="m-item-info">
          <li>
            <span className="m-title">{gItem.name}</span>
          </li>
          <li>
            <span className="m-title">Unit Price:{gItem.price}$</span>
          </li>
          <li>
            <span className="m-title">{gItem.deliveryTime}</span>
          </li>
        </div>
        <li
          className="m-remove-btn"
          onClick={() => {
            dispatch(remove(item._id));
            dispatch(get_total());
          }}
        >
          <span className="m-title">X</span>
        </li>
      </div>
    </>
  );
};

export default Single;
