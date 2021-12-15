import React from "react";
import Slider from "./slider.png";
import "./Slider.css";
function HeaderSlider() {
  return (
    <div className="container-fluid p-0 mb-4 mt-1">
      <div
        id="carouselExampleIndicators"
        className="carousel slide custom-height"
        data-bs-ride="carousel">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src={Slider} className="d-block w-100" alt="..." />
          </div>
          <div className="carousel-item">
            <img src={Slider} className="d-block w-100" alt="..." />
          </div>
          <div className="carousel-item">
            <img src={Slider} className="d-block w-100" alt="..." />
          </div>
        </div>
        <button
          className="carousel-control-prev custom-cursor-button"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="prev">
          <span
            className="carousel-control-prev-icon bg-dark rounded-circle"
            aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next custom-cursor-button"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="next">
          <span
            className="carousel-control-next-icon bg-dark rounded-circle"
            aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
}

export default HeaderSlider;
