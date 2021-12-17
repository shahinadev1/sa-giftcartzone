import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Typography, Button } from "@mui/material";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import ProductCard from "../ProductCard/ProductCard";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { add, get_total } from "../../../redux/reducer/cartReducer";
import LoadingTop from "../../../Components/common/Loading/LoadingTop";
const Product = () => {
  const [value, setValue] = useState("1");
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [category, setCategory] = useState("");
  const [isLoading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const added = useSelector((state) => state.cartReducer.items);

  const navigate = useNavigate();
  const { slug } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://intense-basin-48901.herokuapp.com/products/`)
      .then((res) => {
        const currentProduct = res.data.result.filter((p) => p.slug === slug);
        setProduct(currentProduct[0]);
        const similar = res.data.result.filter(
          (p) =>
            p.categoryId === currentProduct[0].categoryId &&
            p.slug !== currentProduct[0].slug
        );
        setRelatedProducts(similar);
      })
      .catch((er) => navigate("/"))
      .finally(() => {
        setLoading(false);
      });
  }, [slug]);
  const setMarkup = () => {
    return {
      __html: product.description,
    };
  };
  if (isLoading) return <LoadingTop />;
  if (!product) navigate("/");

  return (
    <>
      {!product ? (
        <div class="text-center">
          <div class="spinner-border" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <Container sx={{ backgroundColor: "#fff", padding: "0" }}>
          <div className="container">
            <div className="row justify-center">
              <div className="col-12">
                <div
                  className="card mb-3 border-0"
                  style={{ maxWidth: "100%" }}
                >
                  <div className="row g-0 mt-5">
                    <div className="col-lg-4 mx-auto">
                      <img
                        src={product?.image}
                        className="img-fluid d-block mx-auto rounded-start shadow-sm"
                        alt="..."
                      />
                    </div>
                    <div className="col-lg-8 mr-4 mx-auto">
                      <div className="card-body pl-lg-5">
                        <h5 className="card-title">{product?.name}</h5>
                        <h6 className="subtitle">
                          <span className="text-primary fw-bold">Price:</span>
                          <del>
                            {product?.regularPrice}
                            <span className="currency fw-bold text-muted">
                              $
                            </span>
                          </del>{" "}
                          {product?.price}$
                        </h6>
                        <div
                          className="card-text"
                          dangerouslySetInnerHTML={setMarkup()}
                        ></div>
                        <p className="card-text">
                          <small className="text-muted text-primary">
                            <span className="text-danger">Weight:</span>
                            <span className="text-primary">
                              {product?.deliveryTime}
                            </span>
                          </small>
                        </p>
                        {added?.find((i) => i._id === product._id) ? (
                          <Button
                            variant="contained"
                            size="small"
                            disabled
                            sx={{
                              width: { md: "25%", xs: "100%" },
                              borderRadius: "15px",
                            }}
                          >
                            already in cart
                            <Typography
                              sx={{ fontSize: "18px", marginLeft: "10px" }}
                            >
                              +
                            </Typography>
                          </Button>
                        ) : (
                          <Button
                            variant="contained"
                            size="small"
                            onClick={() => {
                              dispatch(add(product));
                              get_total();
                            }}
                            sx={{
                              width: { md: "25%", xs: "100%" },
                              borderRadius: "15px",
                            }}
                          >
                            add to cart
                            <Typography
                              sx={{ fontSize: "18px", marginLeft: "10px" }}
                            >
                              +
                            </Typography>
                          </Button>
                        )}
                        {category && (
                          <Button
                            variant="contained"
                            sx={{
                              display: "block",
                              my: 2,
                              background: "transparent",
                              color: "#333",
                            }}
                          >
                            {category}
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <TabContext value={value}>
            <Box>
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
              >
                <Tab label="Description" value="1" />
              </TabList>
            </Box>
            <TabPanel value="1">
              <div dangerouslySetInnerHTML={setMarkup()}></div>
            </TabPanel>
          </TabContext>
        </Container>
      )}

      <div className="container-fluid p-lg-5 bg-light w-100 mb-10">
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
          Related Products
        </Typography>
        <div className="row mt-5">
          <div className="col-lg-12">
            <div className="container p-0">
              <div className="row row-cols-1 row-cols-lg-4 g-lg-4 g-2">
                {!relatedProducts.length > 0 ? (
                  ""
                ) : (
                  <>
                    {relatedProducts.map((p) => (
                      <div className="col">
                        <ProductCard product={p} key={p._id} />{" "}
                      </div>
                    ))}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
