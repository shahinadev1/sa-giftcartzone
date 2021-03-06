import React, { useEffect, useState } from "react";
import ProductCard from "../../ProductCard/ProductCard";
import SideBar from "../SideBar/SideBar";
import "./ContentWrapper.css";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../../../common/Loading/Loading";
const ContentWrapper = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const { slug, q } = useParams();
  useEffect(() => {
    if (!slug) {
      axios
        .get("https://intense-basin-48901.herokuapp.com/products")
        .then((res) => {
          setProducts(res.data.result);
        })
        .catch((err) => {
          // console.log(err);
        });
    } else {
      axios
        .get(`https://intense-basin-48901.herokuapp.com/sub-categories/${slug}`)
        .then((res) => {
          if (res.data.result) {
            let id = res.data.result._id;
            axios
              .get("https://intense-basin-48901.herokuapp.com/products")
              .then((res) => {
                const filteredProducts = res.data.result.filter(
                  (p) => p.categoryId === id
                );
                if (filteredProducts.length === 0) navigate("/");
                setProducts(filteredProducts);
              })
              .catch((err) => {
                // console.log(err);
              });
          }
        })
        .catch((err) => {
          // console.log(err);
        })
        .finally(() => {
          if (products.length === 0) navigate("/");
        });
    }
  }, [slug]);

  function replaceText(element) {
    let regx = new RegExp(q, "gi");
    if (element.hasChildNodes()) {
      element.childNodes.forEach(replaceText);
    } else if (element.nodeType === Text.TEXT_NODE) {
      if (element.textContent.match(regx)) {
        element.parentElement.classList.remove("text-muted");
        element.parentElement.style.color = "orange";
      }
    }
  }

  useEffect(() => {
    if (!q) return;
    axios
      .get(`https://intense-basin-48901.herokuapp.com/search/${q}`)
      .then((res) => {
        setProducts(res.data.result);
      })
      .catch((err) => {
        // console.log(err);
      });
    replaceText(document.getElementById("wrapper"), q);
  }, [q]);

  useEffect(() => {
    axios
      .get("https://intense-basin-48901.herokuapp.com/products")
      .then((res) => {
        setProducts(res.data.result);
      })
      .catch((err) => {
        // console.log(err);
      });
  }, []);
  return (
    <main className="pt-2 h-100">
      <section className="container-fluid h-100">
        <div className="row">
          <div className="col-lg-8">
            <div className="container p-0">
              <div
                className="row row-cols-1 row-cols-lg-3 g-lg-4 g-2"
                id="wrapper"
              >
                {!products.length > 0 ? (
                  <>
                    <Loading key={0} />
                    <Loading key={1} />
                    <Loading key={2} />
                    <Loading key={3} />
                    <Loading key={4} />
                    <Loading key={5} />
                    <Loading key={6} />
                    <Loading key={7} />
                  </>
                ) : products.length === 0 ? (
                  <p>No product found!</p>
                ) : (
                  products.map((p) => (
                    <div className="col">
                      <ProductCard key={p._id} product={p} />
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
          <div className="col-lg-4 custom-display w-25 h-custom side-sticky">
            <div className="container p-0">
              <SideBar />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ContentWrapper;
