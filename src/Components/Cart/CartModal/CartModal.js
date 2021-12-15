import React, { useState } from "react";
import "./CartModal.css";
import Items from "./Item";
import { useSelector } from "react-redux";
import axios from "axios";
const CartModal = ({ isOpen, products }) => {
  const { open, setOpen } = isOpen || true;
  const [close, setClose] = useState(false);
  const data = useSelector((state) => state.cartReducer);
  const [discountCode, setDicountCode] = useState("");
  const validDicountCode = async (code) => {
    try {
      const discount = await axios.get(
        `https://intense-basin-48901.herokuapp.com/discount/${code}`
      );
    } catch (error) {}
  };
  const handleDiscount = (e) => {
    e.prevetDefault();
    if (!discountCode) return;
    validDicountCode(discountCode);
  };
  return (
    <div
      className={`cart-modal shadow-lg border-0 card animate__fadeIn ${
        open && "open"
      } ${close ? "close" : ""}`}
    >
      <div className="card-header bg-primary">
        <button
          className="btn btn-primary"
          onClick={() => {
            setOpen(false);
            setClose(true);
          }}
        >
          Close
        </button>
      </div>
      <div className="card-body">
        <ul class="list-group">
          {products.length > 0 ? (
            <>
              {products.map((p) => (
                <Items item={p} />
              ))}
            </>
          ) : (
            "No Product found..."
          )}
        </ul>
      </div>
      <div className="card-footer">
        <div className="discount">
          <form onSubmit={handleDiscount}>
            <div className="row">
              <div className="col-lg-7">
                <input
                  type="text"
                  onInput={(e) => setDicountCode(e.target.value)}
                  className="form-control"
                  placeholder="spacial code.."
                  required
                />
              </div>
              <div className="col-lg-5">
                <input
                  type="submit"
                  value="apply"
                  className="form-control btn btn-primary"
                  placeholder="spacial code.."
                />
              </div>
            </div>
          </form>
        </div>
        <footer>
          <p>Total Amount: {data?.totalAmount} ৳</p>
        </footer>
      </div>
    </div>
  );
};

export default CartModal;
