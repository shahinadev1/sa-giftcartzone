import { TextField } from "@mui/material";
import React, { useState, useEffect } from "react";
import axios from "axios";
import LoadingTop from "../../Components/common/Loading/LoadingTop";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
const AddDiscount = () => {
  const [products, setProducts] = useState([]);
  const { register, handleSubmit, reset } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    axios
      .get("https://intense-basin-48901.herokuapp.com/products")
      .then((res) => setProducts(res.data.result));
  }, []);
  const onSubmit = (data) => {
    setIsLoading(true);
    const newData = {
      name: data.name,
      amount: {
        type: data.type,
        amount: data.amount,
      },
      limited_products: data.limited_products,
      date: {
        start_date: data.start_date,
        expire_date: data.expire_date,
      },
      quantity: data.quantity,
      added_date: new Date().toLocaleDateString(),
    };

    axios
      .post("https://intense-basin-48901.herokuapp.com/discount", newData)
      .then((res) => {
        if (res.data.result) {
          Swal.fire({
            icon: "success",
            title: "Discount has been added! Successfully.",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
      })
      .finally(() => {
        setIsLoading(false);
        reset();
      });
  };
  if (!products.length) return <LoadingTop />;
  return (
    <div className="mb-10">
      <p className="text-center my-2">Add Discount</p>
      <div className="my-5 shaodw-sm">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row mb-3">
            <div className="col-lg-8 mx-auto">
              <TextField
                id="standard-basic"
                required
                fullWidth
                type="text"
                {...register("name")}
                label="Discount code"
                variant="standard"
              />
            </div>
          </div>
          <div className="row mb-3" style={{ justifyContent: "center" }}>
            <div className="col-lg-4">
              <TextField
                id="standard-basic"
                {...register("amount")}
                required
                fullWidth
                label="Discount amount"
                variant="standard"
              />
            </div>
            <div className="col-lg-4 mt-2">
              <select
                name=""
                {...register("type")}
                required
                className="form-control"
                id=""
              >
                <option value="0" selected disabled>
                  Select type
                </option>
                <option value="percentage">Percentage: %</option>
                <option value="amount">Amount: $</option>
              </select>
            </div>
          </div>
          <div className="row mb-3" style={{ justifyContent: "center" }}>
            <div className="col-lg-4">
              <TextField
                id="standard-basic"
                required
                fullWidth
                {...register("start_date")}
                type="date"
                label="Start Date"
                variant="standard"
              />
            </div>
            <div className="col-lg-4">
              <TextField
                id="standard-basic"
                required
                fullWidth
                {...register("expire_date")}
                type="date"
                label="Expire Date"
                variant="standard"
              />
            </div>
          </div>
          <div className="row mb-3" style={{ justifyContent: "center" }}>
            <div className="col-lg-8 mx-auto">
              <label htmlFor="">set limited for product(s)</label>
              <select
                {...register("limited_products")}
                multiple
                required
                className="form-control"
              >
                <option value="0" selected disabled>
                  Select type
                </option>
                {products.map((product) => (
                  <option value={product?._id}>{product?.name}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-lg-8 mx-auto">
              <TextField
                id="standard-basic"
                required
                fullWidth
                type="text"
                {...register("quantity")}
                label="use limite"
                variant="standard"
              />
            </div>
          </div>
          {isLoading ? (
            <button
              class="btn btn-primary d-block my-2 mx-auto"
              type="button"
              disabled
            >
              <span
                class="spinner-grow spinner-grow-sm"
                role="status"
                aria-hidden="true"
              ></span>
              Save Changes...
            </button>
          ) : (
            <button className="btn btn-primary my-2 d-block mx-auto">
              Save Changes
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default AddDiscount;
