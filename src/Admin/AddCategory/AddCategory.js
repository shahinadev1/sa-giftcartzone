import React, { useState } from "react";
import { TextField, Input } from "@material-ui/core";
import axios from "axios";
const AddCategory = () => {
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    setIsLoading(true);
    const data = {
      name,
      slug: name.toString().replace(" ", "-"),
      added_date: new Date().toLocaleDateString(),
    };
    axios
      .post(
        "https://intense-basin-48901.herokuapp.com/add-parent-category",
        data
      )
      .then((res) => {
        if (res.data.status === 200) {
          alert("category successfully added..");
        }
      })
      .catch((err) => {
        alert("Something is wrong..");
        console.log(err.message);
      })
      .finally(() => {
        setIsLoading(false);
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
          <button class="btn btn-primary" type="button" disabled>
            <span
              class="spinner-border spinner-border-sm"
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
