import React, { useState, useEffect } from "react";
import axios from "axios";
import LoadingTop from "../../../Components/common/Loading/LoadingTop";
import { TextField } from "@material-ui/core";
import Swal from "sweetalert2";
const SubCategory = () => {
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [parentId, setParentId] = useState("");
  const [parentCategories, setParentCategories] = useState([]);
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      name,
      parentId,
      slug: name.toLowerCase().replace(" ", "-"),
      added_date: new Date().toLocaleDateString(),
    };
    setIsLoading(true);
    axios
      .post("https://intense-basin-48901.herokuapp.com/add-sub-category", data)
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

  useEffect(() => {
    setIsLoading(true);
    axios
      .get("https://intense-basin-48901.herokuapp.com/parent-category")
      .then((res) => {
        setParentCategories(res.data.result);
        console.log(res.data.result);
      })
      .catch((err) => {
        console.log(err.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="my-2">
      <form className="my-5" onSubmit={handleSubmit}>
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
          <div className="col-12 my-2">
            <label htmlFor="parent-category">Parent category</label>
            <select
              name="parentCategory"
              id="parent-category"
              className="form-control"
              onInput={(e) => setParentId(e.target.value)}
            >
              <option value="0" disabled selected>
                Select parent category
              </option>
              {parentCategories.map((cat) => (
                <option value={cat._id} key={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        {isLoading ? (
          <LoadingTop />
        ) : (
          <button className="btn btn-primary">Add Parent Category</button>
        )}
      </form>
    </div>
  );
};

export default SubCategory;
