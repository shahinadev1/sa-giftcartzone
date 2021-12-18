import axios from "axios";
import React, { useEffect, useState } from "react";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import "../AddCategory/AllCategory/AllCategory.css";
import LoadingTop from "../../Components/common/Loading/LoadingTop";
import Swal from "sweetalert2";
const AllDiscounts = () => {
  const [discounts, setDiscounts] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [isUpdate, setUpdate] = useState(false);

  const handleDelete = (id) => {
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
        let url = `https://intense-basin-48901.herokuapp.com/discounts/${id}`;
        axios
          .delete(url)
          .then((res) => {
            const resetDiscount = discounts.filter((dis) => dis._id !== id);
            setDiscounts(resetDiscount);
            Swal.fire("Deleted!", "discount has been deleted.", "success");
          })
          .catch((err) => {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Something went wrong!",
              footer: '<a href="">Why do I have this issue?</a>',
            });
          });
      }
    });
  };

  useEffect(() => {
    axios
      .get("https://intense-basin-48901.herokuapp.com/discounts")
      .then((res) => {
        if (res.data.result.length > 0) {
          setDiscounts(res.data.result);
        } else {
          setDiscounts([]);
        }
      })
      .catch((err) => {
        // console.log(err);
      });
  }, []);

  if (!discounts) return <LoadingTop />;
  return (
    <>
      <div className="table-responsive-sm mb-10">
        <p>Manage all discounts</p>
        <table className="table w-100">
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
