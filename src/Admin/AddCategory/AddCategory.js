import React, { useState } from "react";
import { TextField, Input } from "@material-ui/core";
import axios from "axios";
import Swal from "sweetalert2";
const AddCategory = () => {
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    setIsLoading(true);

    const regex = /\s/g;
    const replace = "-";
    const data = {
      name,
      slug: name.toString().replace(regex, replace),
      added_date: new Date().toLocaleDateString(),
    };
    axios
      .post(
        "https://intense-basin-48901.herokuapp.com/add-parent-category",
        data
      )
      .then((res) => {
        if (res.data.status === 200) {
          Swal.fire({
            icon: "success",
            title: "Category has been added! Successfully.",
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
        e.target.reset();
      });
  };
  return (
    <div className="my-2">
      <form
        className="my-5"
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <div className="row my-3">
          <div className="col-12">
            <TextField
              id="standard-basic"
              required
              fullWidth
              onInput={(e) => setName(e.target.value)}
              label="Category name"
              variant="standard"
            />
          </div>
        </div>
        {isLoading ? (
          <button className="btn btn-primary" type="button" disabled>
            <span
              className="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            ></span>
            Category Adding..
          </button>
        ) : (
          <button className="btn my-3 btn-primary">Add Parent Category</button>
        )}
      </form>
    </div>
  );
};

export default AddCategory;
