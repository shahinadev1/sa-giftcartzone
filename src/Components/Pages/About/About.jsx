import React from "react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="container mb-5 overflow-hidden">
      <div>
        <nav class="navbar navbar-expand-lg navbar-light bg-light mb-4">
          <div class="container-fluid">
            <button
              class="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarTogglerDemo02"
              aria-controls="navbarTogglerDemo02"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
              <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item">
                  <Link
                    class="nav-link active"
                    aria-current="page"
                    to="/policy"
                  >
                    Privacy
                  </Link>
                </li>
                <li class="nav-item">
                  <Link class="nav-link active" aria-current="page" to="/terms">
                    Terms and Conditions
                  </Link>
                </li>
                <li class="nav-item">
                  <Link class="nav-link active" aria-current="page" to="/about">
                    About us
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
      <h3>About us</h3>
      <p>Last updated: December 17, 2021</p>
      <h4>
        Welcome To <span>US Virtual Shop</span>
      </h4>
      <p>
        <span>US Virtual Shop</span> is a Professional <span>Cart Shop</span>{" "}
        Platform. Here we will provide you only interesting content, which you
        will like very much. We're dedicated to providing you the best of{" "}
        <span>Cart Shop</span>, with a focus on dependability and{" "}
        <span>Get All kinds of Carts</span>. We're working to turn our passion
        for <span>Cart Shop</span>. We hope you enjoy our <span>Cart Shop</span>{" "}
        as much as we enjoy offering them to you.
      </p>
      <p>
        I will keep posting more important posts on my Website for all of you.
        Please give your support and love.
      </p>
      <h4>Contact Us</h4>
      <p>If you have any questions , You can contact us:</p>
      <ul>
        <li>
          <p>By email: infousvirtualshop@gmail.com</p>
        </li>
        <li>
          <p>
            By visiting this page on our website:{" "}
            <a
              href="http://usvirtualshop.com/contact"
              rel="external nofollow noopener"
              target="_blank"
            >
              http://usvirtualshop.com/contact
            </a>
          </p>
        </li>
        <li>
          <p>By phone number: +8801715343037</p>
        </li>
      </ul>
      <p className="fw-bold">
        Thanks For Visiting Our Site
        <br />
        <br />
        <span
          style={{
            color: "blue",
            fontSize: "16px",
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          Have a nice day !
        </span>
      </p>
    </div>
  );
};

export default About;
