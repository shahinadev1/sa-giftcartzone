import React, { useState } from "react";
import { TextField, Input } from "@material-ui/core";
import axios from "axios";
const AddCategory = () => {
  const [previewImg, setPreviewImg] = useState(null);
  const [name, setName] = useState("");
  const [img, setImg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const handleChange = (e) => {
    if (!e.target.files[0]) {
      setPreviewImg("");
      return;
    }
    const render = new FileReader();
    setImg(e.target.files[0]);
    render.onload = () => {
      if (render.readyState === 2) {
        setPreviewImg(render.result);
      }
    };
    render.readAsDataURL(e.target.files[0]);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!img) {
      return;
    }
    setIsLoading(true);
    const formData = new FormData();
    formData.append("name", name);
    formData.append("image", img);
    formData.append("slug", name.toString().replace(" ", "-"));
    formData.append("added_date", new Date().toLocaleDateString());
    axios
      .post(
        "https://intense-basin-48901.herokuapp.com/add-parent-category",
        formData
      )
      .then((res) => {
        if (res.data.status === 200) {
          alert("category successfully added..");
        }
      })
      .catch((err) => {
        alert("Something is wrong..");
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
        <div className="row">
          <div className="col-lg-12">
            <label htmlFor="contained-button-file">
              <Input
                accept="image/*"
                className="form-control"
                id="contained-button-file"
                onChange={handleChange}
                required
                type="file"
              />
            </label>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            {previewImg && (
              <div className="w-25">
                <img
                  src={previewImg}
                  className="img-fluid img-thumbnail preview"
                  alt=""
                />
              </div>
            )}
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
