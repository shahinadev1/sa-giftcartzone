import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { Link } from "react-router-dom";
import UpdateIcon from "@mui/icons-material/Update";
import LoadingTop from "../../Components/common/Loading/LoadingTop";
import Swal from "sweetalert2";
const AllOrders = () => {
  const [Products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [defaultName, setDefaultName] = useState("");
  const [defaultPrice, setDefaultPrice] = useState("");
  const [defaultRegularPrice, setDefaultRegularPrice] = useState("");
  const [defaultQty, setProductQty] = useState("");
  const [productQty, setProductQty1] = useState("");
  const [defaultCategoryId, setDefaultCId] = useState("");
  const [price, setPrice] = useState("");
  const [regularPrice, setRegularPrice] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [id, setId] = useState("");
  const closeModalRef = useRef();
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      name: name || defaultName,
      price: price || defaultPrice,
      regularPrice: regularPrice | defaultRegularPrice,
      categoryId: category || defaultCategoryId,
      productQty: productQty || defaultQty,
      slug:
        name.toLowerCase().replace(" ", "-") ||
        defaultName.toLowerCase().replace(" ", "-"),
      added_date: new Date().toLocaleDateString(),
    };
    let url = `https://intense-basin-48901.herokuapp.com/products/${id}`;
    axios
      .put(url, data)
      .then((res) => {
        Swal.fire({
          icon: "success",
          title: "Product updated successfully..",
          showConfirmButton: true,
          timer: 1500,
        });
        closeModalRef.current.click();
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
      });
  };

  const handleDelete = (delId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`https://intense-basin-48901.herokuapp.com/products/${delId}`)
          .then((res) => {
            const restproducts = Products.filter((p) => p._id !== delId);
            setProducts(restproducts);
            Swal.fire("Deleted!", "The product has been deleted.", "success");
          })
          .catch((err) => {
            alert("something is wrong...");
          });
      }
    });
  };

  useEffect(() => {
    axios
      .get("https://intense-basin-48901.herokuapp.com/products")
      .then((res) => {
        setProducts(res.data.result);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get("https://intense-basin-48901.herokuapp.com/sub-category")
      .then((res) => {
        setCategories(res.data.result);
      });
  }, []);
  if (!Products.length > 0) return <LoadingTop />;
  return (
    <>
      <div className="table-responsive-sm mb-10 ">
        <p>Manage All products</p>
        <table class="table table-striped w-100 bg-light table-bordered">
          <thead>
            <tr>
              <th scope="col">thumbnail</th>
              <th scope="col">Name</th>
              <th scope="col">price</th>
              <th scope="col">Added date</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {Products.length === 0 ? (
              <p>No products found!</p>
            ) : (
              Products.map((product) => (
                <tr>
                  <th scope="row">
                    <Link to={`/product/${product.slug}`}>
                      <img
                        src={product.image}
                        style={{ maxWidth: "100px", height: "50px" }}
                        alt={product.name}
                      />
                    </Link>
                  </th>
                  <td>{product?.name}</td>
                  <td>
                    <del>${product?.regularPrice}</del> | ${product?.price}
                  </td>
                  <td>{product?.added_date}</td>
                  <td>
                    <button
                      className="btn btn-danger bg-transparent mx-2"
                      onClick={() => handleDelete(product._id)}
                    >
                      <DeleteForeverIcon
                        sx={{ cursor: "pointer", color: "red" }}
                      />
                    </button>
                    <button
                      type="button"
                      class="btn btn-primary bg-transparent"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                      onClick={() => {
                        setId(product._id);
                        setDefaultName(product.name);
                        setDefaultPrice(product.price);
                        setDefaultRegularPrice(product.regularPrice);
                        setProductQty(product?.productQty);
                        setDefaultCId(product.categoryId);
                      }}
                    >
                      <UpdateIcon sx={{ cursor: "pointer", color: "green" }} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {/* <!-- Modal --> */}
      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Update Product
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <form onSubmit={handleSubmit}>
                <div class="mb-3">
                  <label for="recipient-name" class="col-form-label">
                    Id
                  </label>
                  <input
                    type="text"
                    readOnly
                    value={id}
                    class="form-control"
                    id="recipient-name"
                  />
                </div>
                <div class="mb-3">
                  <label for="message-text" class="col-form-label">
                    Name:
                  </label>
                  <input
                    onBlur={(e) => setName(e.target.value)}
                    class="form-control"
                    id="message-text"
                    type="text"
                    defaultValue={defaultName}
                    required
                  />
                </div>
                <div class="mb-3">
                  <label for="message-text" class="col-form-label">
                    Price:
                  </label>
                  <input
                    onBlur={(e) => setPrice(e.target.value)}
                    class="form-control"
                    id="message-text"
                    type="number"
                    defaultValue={defaultPrice}
                    required
                  />
                </div>
                <div class="mb-3">
                  <label for="message-text" class="col-form-label">
                    Regular Price:
                  </label>
                  <input
                    onBlur={(e) => setRegularPrice(e.target.value)}
                    class="form-control"
                    id="message-text"
                    type="text"
                    defaultValue={defaultRegularPrice}
                    required
                  />
                </div>
                <div class="mb-3">
                  <label for="message-text" class="col-form-label">
                    Product Qty:
                  </label>
                  <input
                    onBlur={(e) => setProductQty1(e.target.value)}
                    class="form-control"
                    id="message-text"
                    type="number"
                    defaultValue={defaultQty}
                    required
                  />
                </div>
                <div class="mb-3">
                  <label for="message-text" class="col-form-label">
                    Category:
                  </label>
                  <select
                    onBlur={(e) => setCategory(e.target.value)}
                    name=""
                    className="form-control"
                    defaultValue={defaultCategoryId}
                    id=""
                  >
                    <option value={defaultCategoryId} selected disabled>
                      Select category
                    </option>
                    {categories.map((cat) => (
                      <option
                        value={cat._id}
                        selected={cat._id === defaultCategoryId}
                        key={cat._id}
                      >
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>
                <button type="submit" class="btn btn-primary">
                  Save changes
                </button>
              </form>
            </div>
            <div class="modal-footer">
              <button
                ref={closeModalRef}
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AllOrders;
