import React from "react";
import "./ProductCard.css";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import VisibilityIcon from "@mui/icons-material/Visibility";
const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  return (
    <div
      className="card product-card shadow-sm"
      style={{ backgroundColor: "#fff" }}
    >
      <span className="price-bage">
        <del>${product?.regularPrice}</del>/${product?.price}
      </span>
      <div
        style={{
          backgroundImage: `url(${
            product?.image
              ? product?.image
              : "https://i0.wp.com/static.helpjuice.com/helpjuice_production/uploads/upload/image/6076/497049/loader.gif"
          })`,
          width: "100%",
          borderRadius: "10px !important",
        }}
        className="card-img-top card-img"
      />
      <div className="card-body">
        <p className="text-muted product-title-card">{product?.name}</p>
        <p className="text-muted">
          <del>
            {product?.regularPrice}
            <span className="currency fw-bold text-muted">$</span>
          </del>{" "}
          {product?.price}
          <span className="currency fw-bold text-muted">$</span> /{" "}
          <span>{product?.deliveryTime}</span>
        </p>
        {product.productQty <= 1 ? (
          <Button
            variant="contained"
            size="small"
            disabled
            sx={{ width: "100%", borderRadius: "15px" }}
          >
            Out of Stock
            <VisibilityIcon sx={{ fontSize: "18px", marginLeft: "10px" }} />
          </Button>
        ) : (
          <Button
            variant="contained"
            size="small"
            onClick={() => navigate(`${"/product/" + product?.slug}`)}
            sx={{ width: "100%", borderRadius: "15px" }}
          >
            View Details
            <VisibilityIcon sx={{ fontSize: "18px", marginLeft: "10px" }} />
          </Button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
