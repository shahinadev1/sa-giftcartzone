import axios from "axios";
import React, { useEffect, useState } from "react";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import UpdateIcon from "@mui/icons-material/Update";
import "./AllCategory.css";
import LoadingTop from "../../../Components/common/Loading/LoadingTop";
const AllCategory = () => {
  const [parentCategories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [name, setName] = useState("");
  const [defaultName, setDefaultName] = useState("");
  const [isUpdate, setUpdate] = useState(false);
  const [id, setId] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      name,
      slug: name.toLowerCase().replace(" ", "-"),
      added_date: new Date().toLocaleDateString(),
    };
    let url = `https://intense-basin-48901.herokuapp.com/parent-category`;
    if (!toggle) {
      data.image = "";
      url = `https://intense-basin-48901.herokuapp.com/parent-category/${id}`;
    } else {
      url = `https://intense-basin-48901.herokuapp.com/sub-category/${id}`;
    }
    axios
      .put(url, data)
      .then((res) => {
        alert("updated successfully..");
        setUpdate(true);
      })
      .catch((err) => {
        alert("something is wrong...");
      });
  };
  const handleDelete = (id) => {
    if (window.confirm("are you sure. to delete??")) {
      let url = `https://intense-basin-48901.herokuapp.com/parent-category`;
      if (!toggle) {
        url = `https://intense-basin-48901.herokuapp.com/parent-category/${id}`;
      } else {
        url = `https://intense-basin-48901.herokuapp.com/sub-category/${id}`;
      }
      axios
        .delete(url)
        .then((res) => {
          alert("deleted successfully..");
          setUpdate(true);
        })
        .catch((err) => {
          alert("something is wrong...");
        });
    }
  };

  useEffect(() => {
    axios
      .get("https://intense-basin-48901.herokuapp.com/parent-category")
      .then((res) => {
        setCategories(res.data.result);
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .get("https://intense-basin-48901.herokuapp.com/sub-category")
      .then((res) => {
        setSubCategories(res.data.result);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [isUpdate]);

  useEffect(() => {
    axios
      .get("https://intense-basin-48901.herokuapp.com/parent-category")
      .then((res) => {
        setCategories(res.data.result);
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .get("https://intense-basin-48901.herokuapp.com/sub-category")
      .then((res) => {
        setSubCategories(res.data.result);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [isUpdate, toggle]);

  useEffect(() => {
    axios
      .get("https://intense-basin-48901.herokuapp.com/parent-category")
      .then((res) => {
        setCategories(res.data.result);
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .get("https://intense-basin-48901.herokuapp.com/sub-category")
      .then((res) => {
        setSubCategories(res.data.result);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <>
      <div className="table-responsive-sm mb-10">
        <p>Manage all category</p>
        <table class="table w-100">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Added date</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {!toggle ? (
              !parentCategories.length > 0 ? (
                <LoadingTop />
              ) : (
                parentCategories.map((parent) => (
                  <tr>
                    <td>{parent?.name}</td>
                    <td>{parent?.added_date}</td>
                    <td>
                      <button
                        className="btn btn-danger bg-transparent mx-2"
                        onClick={() => handleDelete(parent._id)}
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
                          setId(parent._id);
                          setDefaultName(parent.name);
                        }}
                      >
                        <UpdateIcon
                          sx={{ cursor: "pointer", color: "green" }}
                        />
                      </button>
                    </td>
                  </tr>
                ))
              )
            ) : !subCategories.length > 0 ? (
              subCategories.length === 0 ? (
                <p>No Sub Category Found!</p>
              ) : (
                <div class="text-center">
                  <div class="spinner-border" role="status">
                    <span class="visually-hidden">Loading...</span>
                  </div>
                </div>
              )
            ) : (
              subCategories.map((sub) => (
                <tr>
                  <td>{sub?.name}</td>
                  <td>{sub?.added_date}</td>
                  <td>
                    <button
                      className="btn btn-danger bg-transparent mx-2"
                      onClick={() => handleDelete(sub._id)}
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
                      onClick={() => setId(sub._id)}
                    >
                      <UpdateIcon sx={{ cursor: "pointer", color: "green" }} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        <input type="checkbox" id="sub" onChange={() => setToggle(!toggle)} />
        <label htmlFor="sub" className="mx-2 select-none">
          Sub Categories
        </label>
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
                Update Category
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
                    onChange={(e) => setName(e.target.value)}
                    class="form-control"
                    id="message-text"
                    type="text"
                    defaultValue={defaultName}
                    required
                  />
                </div>
                <button type="submit" class="btn btn-primary">
                  Save changes
                </button>
              </form>
            </div>
            <div class="modal-footer">
              <button
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

export default AllCategory;
