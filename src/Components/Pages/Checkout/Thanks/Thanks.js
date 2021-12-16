import React from "react";
import checkImage from "./checkmark.png";
import { useLocation, useNavigate } from "react-router-dom";
import "./Thanks.css";
import { Button } from "@mui/material";
const Thanks = () => {
  const location = useLocation();
  document.body.style.backgroundColor = "#f9fafb";
  const navigate = useNavigate();
  console.log(location.state);
  if (!location.state) navigate("/");
  return (
    <div className="container text-center d-grid place-content-center">
      <div
        className="thanks card mx-auto"
        style={{ backgroundColor: "#ffffff", margin: "60px !important auto" }}
      >
        <div className="card-header" style={{ backgroundColor: "#ffffff" }}>
          <img
            src={checkImage}
            style={{ width: "100px", marginBottom: "10px" }}
            alt=""
          />
          <h2
            className="fw-normal"
            style={{ color: "#69b67c", fontSize: "24px" }}
          >
            Thank you for ordering!
          </h2>
          <h2
            className="fw-normal"
            style={{ color: "#69b67c", fontSize: "18px" }}
          >
            Order #{location?.state?._id}
          </h2>
          <Button
            onClick={() => navigate("/user/orders")}
            variant="contained"
            sx={{ mt: 2 }}
            color="success"
          >
            Check your order.
          </Button>
          <Button
            onClick={() => navigate("/")}
            variant="contained"
            sx={{ mx: { md: 1 }, mt: 2 }}
            color="primary"
          >
            Continue Shopping.
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Thanks;
