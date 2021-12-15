import axios from "axios";
import React, { useEffect, useState } from "react";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import UpdateIcon from "@mui/icons-material/Update";
import "../AddCategory/AllCategory/AllCategory.css";
import LoadingTop from "../../Components/common/Loading/LoadingTop";
const AllDiscounts = () => {
  const [discounts, setDiscounts] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [isUpdate, setUpdate] = useState(false);
  const [id, setId] = useState("");

  const handleDelete = (id) => {
    if (window.confirm("are you sure. to delete??")) {
      let url = `https://intense-basin-48901.herokuapp.com/discounts/${id}`;
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
      .get("https://intense-basin-48901.herokuapp.com/discounts")
      .then((res) => {
        setDiscounts(res.data.result);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [isUpdate]);

  useEffect(() => {
    axios
      .get("https://intense-basin-48901.herokuapp.com/discounts")
      .then((res) => {
        setDiscounts(res.data.result);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [isUpdate, toggle]);

  useEffect(() => {
    axios
      .get("https://intense-basin-48901.herokuapp.com/discounts")
      .then((res) => {
        setDiscounts(res.data.result);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  if (discounts.length > 0) return <LoadingTop />;
  return (
    <>
      <div className="table-responsive-sm mb-10">
        <p>Manage all discounts</p>
        <table class="table w-100">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Added date</th>
              <th scope="col">Expire Date</th>
              <th scope="col">Discount</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {discounts.length === 0 ? (
              <p>No discount found!</p>
            ) : (
              discounts.map((sub) => (
                <>
                  <tr>
                    <td>{sub?.name}</td>
                    <td>{sub?.added_date}</td>
                    <td>{sub?.date?.expire_date}</td>
                    <td>
                      {sub?.amount?.amount} /{" "}
                      {sub?.amount?.type === "amount" ? "$" : "%"}
                    </td>
                    <td>
                      <button
                        className="btn btn-danger bg-transparent mx-2"
                        onClick={() => handleDelete(sub._id)}
                      >
                        <DeleteForeverIcon
                          sx={{ cursor: "pointer", color: "red" }}
                        />
                      </button>
                    </td>
                  </tr>
                </>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AllDiscounts;
