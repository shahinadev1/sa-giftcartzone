import React, { useState } from "react";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import "./Cart.css";
import CartModal from "./CartModal/CartModal";
import { useSelector } from "react-redux";
const Cart = () => {
  const [open, setOpen] = useState(false);
  const { items, totalAmount } = useSelector((state) => state.cartReducer);

  return (
    <>
      <div className="cart-fixed-left-center" onClick={() => setOpen(!open)}>
        <div className="header">
          <ShoppingBagIcon sx={{ fontSize: "17px", marginRight: "10px" }} />
          <span>{items.length} items</span>
        </div>
        <div className="cart-body p-3">
          <div className="cart-btn">
            <span className="cart-currency fw-bold">৳</span> {totalAmount}
          </div>
        </div>
      </div>
      {open && <CartModal products={items} isOpen={{ open, setOpen }} />}
    </>
  );
};

export default Cart;
