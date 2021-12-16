import React, { useState } from "react";
import "./CartModal.css";
import Items from "./Item";
import { useSelector } from "react-redux";
import axios from "axios";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
const CartModal = ({ isOpen, products }) => {
  const { open, setOpen } = isOpen || true;
  const [close, setClose] = useState(false);
  const data = useSelector((state) => state.cartReducer);
  const [isClicked, setIsClicked] = useState(false);
  const navigate = useNavigate();
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
            <>
              <svg
                style={{ margin: "0 auto" }}
                width="140"
                height="176"
                viewBox="0 0 231.91 292"
              >
                <defs>
                  <linearGradient
                    id="linear-gradient"
                    x1="1"
                    y1="0.439"
                    x2="0.369"
                    y2="1"
                    gradientUnits="objectBoundingBox"
                  >
                    <stop offset="0" stop-color="#029477"></stop>{" "}
                    <stop offset="1" stop-color="#428e3c"></stop>
                  </linearGradient>
                </defs>{" "}
                <g
                  id="no_cart_in_bag_2"
                  data-name="no cart in bag 2"
                  transform="translate(-1388 -351)"
                >
                  <ellipse
                    id="Ellipse_2873"
                    data-name="Ellipse 2873"
                    cx="115.955"
                    cy="27.366"
                    rx="115.955"
                    ry="27.366"
                    transform="translate(1388 588.268)"
                    fill="#ddd"
                    opacity="0.25"
                  ></ellipse>{" "}
                  <path
                    id="Path_18691"
                    data-name="Path 18691"
                    d="M29.632,0H170.368A29.828,29.828,0,0,1,200,30.021V209.979A29.828,29.828,0,0,1,170.368,240H29.632A29.828,29.828,0,0,1,0,209.979V30.021A29.828,29.828,0,0,1,29.632,0Z"
                    transform="translate(1403 381)"
                    fill="#428e3c"
                  ></path>{" "}
                  <path
                    id="Rectangle_1852"
                    data-name="Rectangle 1852"
                    d="M30,0H170a30,30,0,0,1,30,30v0a30,30,0,0,1-30,30H12.857A12.857,12.857,0,0,1,0,47.143V30A30,30,0,0,1,30,0Z"
                    transform="translate(1403 381)"
                    fill="#2b632a"
                  ></path>{" "}
                  <path
                    id="Rectangle_1853"
                    data-name="Rectangle 1853"
                    d="M42,0H158a42,42,0,0,1,42,42v0a18,18,0,0,1-18,18H18A18,18,0,0,1,0,42v0A42,42,0,0,1,42,0Z"
                    transform="translate(1403 381)"
                    fill="#2b632a"
                  ></path>{" "}
                  <path
                    id="Path_18685"
                    data-name="Path 18685"
                    d="M446.31,246.056a30,30,0,1,1,30-30A30.034,30.034,0,0,1,446.31,246.056Zm0-53.294A23.3,23.3,0,1,0,469.9,216.056,23.471,23.471,0,0,0,446.31,192.762Z"
                    transform="translate(1056.69 164.944)"
                    fill="#2b632a"
                  ></path>{" "}
                  <path
                    id="Path_18686"
                    data-name="Path 18686"
                    d="M446.31,375.181a30,30,0,1,1,30-30A30.034,30.034,0,0,1,446.31,375.181Zm0-53.294A23.3,23.3,0,1,0,469.9,345.181,23.471,23.471,0,0,0,446.31,321.887Z"
                    transform="translate(1057.793 95.684)"
                    fill="#428e3c"
                  ></path>{" "}
                  <circle
                    id="Ellipse_2874"
                    data-name="Ellipse 2874"
                    cx="28.689"
                    cy="28.689"
                    r="28.689"
                    transform="translate(1473.823 511.046)"
                    fill="#2b632a"
                  ></circle>{" "}
                  <circle
                    id="Ellipse_2875"
                    data-name="Ellipse 2875"
                    cx="15.046"
                    cy="15.046"
                    r="15.046"
                    transform="translate(1481.401 547.854) rotate(-45)"
                    fill="#428e3c"
                  ></circle>{" "}
                  <path
                    id="Path_18687"
                    data-name="Path 18687"
                    d="M399.71,531.27a71.755,71.755,0,0,1,12.65-13.6c3.4-2.863-1.5-7.726-4.882-4.882a78.392,78.392,0,0,0-13.73,15c-2.56,3.644,3.424,7.1,5.962,3.485Z"
                    transform="translate(1060.579 -35.703)"
                    fill="#2b632a"
                  ></path>{" "}
                  <path
                    id="Path_18688"
                    data-name="Path 18688"
                    d="M412.913,527.786a78.419,78.419,0,0,0-13.73-15c-3.38-2.843-8.289,2.017-4.882,4.882a71.785,71.785,0,0,1,12.65,13.6c2.535,3.609,8.525.162,5.962-3.485Z"
                    transform="translate(1060.566 -35.704)"
                    fill="#2b632a"
                  ></path>{" "}
                  <path
                    id="Path_18689"
                    data-name="Path 18689"
                    d="M583.278,527.786a78.417,78.417,0,0,0-13.73-15c-3.38-2.843-8.289,2.017-4.882,4.882a71.768,71.768,0,0,1,12.65,13.6c2.535,3.609,8.525.162,5.962-3.485Z"
                    transform="translate(970.304 -35.704)"
                    fill="#2b632a"
                  ></path>{" "}
                  <path
                    id="Path_18690"
                    data-name="Path 18690"
                    d="M570.075,531.27a71.77,71.77,0,0,1,12.65-13.6c3.4-2.863-1.5-7.726-4.882-4.882a78.407,78.407,0,0,0-13.73,15c-2.56,3.644,3.424,7.1,5.962,3.485Z"
                    transform="translate(970.318 -35.703)"
                    fill="#2b632a"
                  ></path>{" "}
                  <path
                    id="Path_18692"
                    data-name="Path 18692"
                    d="M301.243,287.464a19.115,19.115,0,0,1,8.071,9.077,19.637,19.637,0,0,1,1.6,7.88v26.085a19.349,19.349,0,0,1-9.672,16.957c-10.048-6.858-16.544-17.742-16.544-30S291.2,294.322,301.243,287.464Z"
                    transform="translate(1292.301 101.536)"
                    fill="#3d8638ab"
                  ></path>{" "}
                  <path
                    id="Path_18693"
                    data-name="Path 18693"
                    d="M294.371,287.464a19.115,19.115,0,0,0-8.071,9.077,19.637,19.637,0,0,0-1.6,7.88v26.085a19.349,19.349,0,0,0,9.672,16.957c10.048-6.858,16.544-17.742,16.544-30S304.419,294.322,294.371,287.464Z"
                    transform="translate(1118.301 101.536)"
                    fill="#3d8638ab"
                  ></path>
                </g>
              </svg>
              <h4
                style={{
                  fontWeight: "400",
                  textAlign: "center",
                  color: "#333",
                }}
              >
                Your cart is empty.
              </h4>
            </>
          )}
        </ul>
      </div>
      <div className="mobile card-footer">
        <footer>
          <span style={{ color: "#333" }}>Subtotal: {data?.totalAmount} $</span>
        </footer>
        <Button
          disabled={!products.length > 0}
          variant="contained"
          color="success"
          fullWidth
          onClick={() => {
            setOpen(false);
            setClose(true);
            navigate("/checkout");
          }}
        >
          Checkout
        </Button>
      </div>
    </div>
  );
};

export default CartModal;
