import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  FormControl,
  Input,
  Select,
  InputLabel,
  MenuItem,
  IconButton,
} from "@material-ui/core";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

import "./AddProduct.css";
import useAuth from "../../Hooks/useAuth";
const AddProduct = () => {
  const { user } = useAuth();
  const [previewImg, setPreviewImg] = useState(null);
  const [categoryId, setCategoryId] = useState("");
  const [subCategories, setSubCategories] = useState([]);
  const [parentCategory, setParentCategory] = useState([]);
  const [img, setImg] = useState("");
  const [name, setName] = useState("");
  const [productQty, setProductQty] = useState(0);
  const [price, setPrice] = useState("");
  const [regularPrice, setRegularPrice] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [description, setDescription] = useState("");
  const [deliveryTime, setDeliveryTime] = useState("");
  const handleChange = (e) => {
    if (!e.target.files[0]) {
      setPreviewImg("");
      return;
    }
    setImg(e.target.files[0]);
    const render = new FileReader();
    render.onload = () => {
      if (render.readyState === 2) {
        setPreviewImg(render.result);
      }
    };
    render.readAsDataURL(e.target.files[0]);
  };

  const handleUpdate = (img, data, e) => {
    setIsLoading(true);
    const storage = getStorage();
    // Upload file and metadata to the object 'images/mountains.jpg'
    const storageRef = ref(storage, img.name);
    const uploadTask = uploadBytesResumable(storageRef, img);

    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(progress);
      },
      (error) => {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case "storage/unauthorized":
            // User doesn't have permission to access the object
            break;
          case "storage/canceled":
            // User canceled the upload
            break;

          // ...

          case "storage/unknown":
            // Unknown error occurred, inspect error.serverResponse
            break;
        }
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          const oldData = { ...data };
          oldData.image = downloadURL;
          console.log(oldData);
          axios
            .post(
              "https://intense-basin-48901.herokuapp.com/add-product",
              oldData
            )
            .then((res) => {
              console.log(res.data);
              alert("product added successfully..");
            })
            .catch((err) => {
              alert("something is wrong..");
            })
            .finally(() => {
              setIsLoading(false);
              setImg("");
              e.target.reset();
            });
        });
      }
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      name,
      price,
      regularPrice,
      description,
      categoryId,
      deliveryTime,
      productQty,
      slug: name.toLowerCase().replace(" ", "-"),
      added_date: new Date().toLocaleDateString(),
    };
    handleUpdate(img, data, e);
  };

  useEffect(() => {
    axios
      .get("https://intense-basin-48901.herokuapp.com/parent-category")
      .then((res) => {
        setParentCategory(res.data.result);
      })
      .catch((err) => {
        alert("something is wrong..");
      });
    axios
      .get("https://intense-basin-48901.herokuapp.com/sub-category")
      .then((res) => {
        setSubCategories(res.data.result);
      })
      .catch((err) => {
        alert("something is wrong..");
      });
  }, []);

  return (
    <div className="mb-10">
      <form className="my-3" onSubmit={handleSubmit}>
        <div className="row mb-3">
          <div className="col-lg-12">
            <TextField
              id="standard-basic"
              required
              fullWidth
              onChange={(e) => setName(e.target.value)}
              label="Product title"
              variant="standard"
            />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-lg-6">
            <TextField
              type="number"
              required
              id="standard-basic"
              onChange={(e) => setPrice(e.target.value)}
              fullWidth
              label="Product price"
              variant="standard"
            />
          </div>
          <div className="col-lg-6">
            <TextField
              type="number"
              required
              id="standard-basic"
              onChange={(e) => setRegularPrice(e.target.value)}
              fullWidth
              label="Regular price"
              variant="standard"
            />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-lg-6">
            <label htmlFor="contained-button-file">
              <Input
                accept="image/*"
                className="form-control"
                id="contained-button-file"
                onChange={handleChange}
                type="file"
              />
            </label>
          </div>
          {previewImg && (
            <div className="col-lg-6">
              <img
                src={previewImg}
                className="img-fluid img-thumbnail preview"
                alt=""
              />
            </div>
          )}
        </div>
        <div className="row mb-3">
          <div className="col-12">
            <TextField
              id="standard-multiline-static"
              label="Product Description"
              multiline
              rows={4}
              onInput={(e) => setDescription(e.target.value)}
              required
              fullWidth
              variant="standard"
            />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-lg-6">
            <TextField
              type="text"
              required
              onChange={(e) => setDeliveryTime(e.target.value)}
              id="standard-basic"
              fullWidth
              label="delivery time"
              variant="standard"
            />
          </div>
          <div className="col-lg-6">
            <TextField
              type="text"
              required
              onChange={(e) => setProductQty(e.target.value)}
              id="standard-basic"
              fullWidth
              label="Product Qty"
              variant="standard"
            />
          </div>
        </div>
        <FormControl fullWidth sx={{ mt: 4 }}>
          <InputLabel>Select category</InputLabel>
          <Select
            id="demo-simple-select"
            label="Select category"
            onChange={(e) => setCategoryId(e.target.value)}
            required
          >
            {subCategories.map((sub) => (
              <MenuItem value={sub._id}>{sub.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
        {isLoading ? (
          <button class="btn btn-primary my-3" type="button" disabled>
            <span
              class="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            ></span>
            Product Adding..
          </button>
        ) : (
          <button className="btn my-3 btn-primary">Add product</button>
        )}
      </form>
    </div>
  );
};

export default AddProduct;
