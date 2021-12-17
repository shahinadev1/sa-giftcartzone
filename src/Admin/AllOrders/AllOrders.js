import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { Link, useNavigate } from "react-router-dom";
import UpdateIcon from "@mui/icons-material/Update";
import LoadingTop from "../../Components/common/Loading/LoadingTop";
import Swal from "sweetalert2";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Button, Typography } from "@mui/material";
const AllOrders = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  //delete order
  const deleteOrder = (id) => {
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
          .delete(`https://intense-basin-48901.herokuapp.com/orders/${id}`)
          .then((res) => {
            if (res.status === 200) {
              const restOrders = orders.filter((order) => order._id !== id);
              setOrders(restOrders);
              Swal.fire("Deleted!", "order has been deleted.", "success");
            }
          })
          .catch((err) => {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Something went wrong!",
            });
          });
      }
    });
  };

  useEffect(() => {
    axios
      .get("https://intense-basin-48901.herokuapp.com/orders")
      .then((res) => {
        setOrders(res.data.result);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  if (!orders.length) return <LoadingTop />;
  return (
    <Box sx={{ marginBottom: { md: 0, sm: "100px", xs: "100px" } }}>
      <Typography>Manage all orders</Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="caption table">
          <TableHead>
            <TableRow>
              <TableCell>Order ID</TableCell>
              <TableCell align="right">User Name</TableCell>
              <TableCell align="right">Total($)</TableCell>
              <TableCell align="right">Payment Method</TableCell>
              <TableCell align="right">Status</TableCell>
              <TableCell align="right">Order Date</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow>
                <TableCell component="th" scope="row">
                  {order?._id.slice(-0, -6)}
                </TableCell>
                <TableCell align="right">{order?.name}</TableCell>
                <TableCell align="right">${order?.subtotal}</TableCell>
                <TableCell align="right">{order?.paymentMethod}</TableCell>
                <TableCell align="right">{order?.status}</TableCell>
                <TableCell align="right">{order?.order_date}</TableCell>
                <TableCell align="right">
                  <Button
                    variant="contained"
                    onClick={() => navigate(`/admin/orders/${order?._id}`)}
                    color="info"
                    sx={{ p: 0, mb: 1 }}
                  >
                    <RemoveRedEyeIcon />
                  </Button>

                  <Button
                    onClick={() => deleteOrder(order?._id)}
                    size="small"
                    color="error"
                    sx={{ p: 0 }}
                    variant="contained"
                  >
                    <DeleteForeverIcon />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default AllOrders;
