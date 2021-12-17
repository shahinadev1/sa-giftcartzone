import React, { useState } from "react";
import "./Checkout.css";
import { useSelector, useDispatch } from "react-redux";
import Single from "../../../Components/Cart/CartModal/Single/Single";
import { useNavigate } from "react-router-dom";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import { useForm } from "react-hook-form";
import { Button } from "@mui/material";
import { emptyCart } from "../../../redux/reducer/cartReducer";
import axios from "axios";
import BTC from "./btc.png";
import useAuth from "../../../Hooks/useAuth";
import { toast } from "react-toastify";
const Checkout = () => {
  const { user } = useAuth();
  const products = useSelector((state) => state.cartReducer);
  const navigate = useNavigate();
  const [discountCode, setDiscountCode] = useState("");
  const [isValid, setIsValid] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [subtotal, setSubtotal] = useState(null);
  const dispatch = useDispatch();
  const validateDiscount = async () => {
    try {
      const { data } = await axios(
        "https://intense-basin-48901.herokuapp.com/discounts"
      );
      if (!data.result.length) {
        toast.error("code is not valid!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        return;
      } else {
        const valid = data.result.find((code) => code.name === discountCode);
        if (valid) {
          setIsValid(true);
          if (valid.quantity <= 1) {
            toast.error("code is expired!", {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            setDiscountCode("");
          } else {
            if (valid.amount.type === "amount") {
              if (!subtotal) {
                setSubtotal(
                  products.totalAmount - parseInt(valid.amount.amount)
                );
                toast.success("code applied successfully..", {
                  position: "top-right",
                  autoClose: 3000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                });
              } else {
                toast.error("code already applied.", {
                  position: "top-right",
                  autoClose: 3000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                });
              }
            } else if (valid.amount.type === "percentage") {
              if (!subtotal) {
                setSubtotal(
                  (products.totalAmount * parseInt(valid.amount.amount)) / 100
                );
                toast.message("code applied successfully..", {
                  position: "top-right",
                  autoClose: 3000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                });
              } else {
                toast.error("code already applied.", {
                  position: "top-right",
                  autoClose: 3000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                });
              }
            }
          }
        } else {
        }
      }
    } catch (error) {
      setIsValid(false);
      setMessage("");
    }
  };

  const onSubmit = (data) => {
    setLoading(true);
    const order = {
      ...data,
      subtotal: subtotal | products.totalAmount,
      name: user.displayName,
      email: user.email,
      discount: { code: discountCode | "" },
      order_date: new Date().toLocaleDateString(),
      order_products: products.items,
      status: "pending",
    };

    axios
      .post("https://intense-basin-48901.herokuapp.com/orders", order)
      .then((res) => {
        if (res.status === 200) {
          dispatch(emptyCart());
          navigate("/thanks", { state: res.data.result });
        }
      })
      .catch((err) => {
        toast.error("Select payment method!", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const {
    handleSubmit,
    register,
    formState: { errors },
    watch,
  } = useForm();
  if (!products.items.length) navigate("/");
  return (
    <div className="container text-center">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div
          className="row checkout"
          style={{ margin: "300px auto !important" }}
        >
          <div className="col-lg-8">
            <div className="card">
              <div className="card-body">
                <h4 className="text-secondary fw-normal">
                  {" "}
                  <ShoppingCartCheckoutIcon sx={{ fontSize: "28px" }} /> Place
                  you order!
                </h4>
                <div className="payment-info-form">
                  <div class="mb-3">
                    <label for="name" class="form-label">
                      Your name
                    </label>
                    <input
                      type="text"
                      readOnly
                      defaultValue={user?.displayName}
                      class="form-control"
                      id="name"
                      aria-describedby="emailHelp"
                    />
                  </div>
                  <div class="mb-3">
                    <label for="email" class="form-label">
                      Email address
                    </label>
                    <input
                      type="email"
                      readOnly
                      defaultValue={user?.email}
                      class="form-control"
                      id="email"
                      aria-describedby="emailHelp"
                    />
                  </div>
                  <div class="mb-3">
                    <label for="phone" class="form-label">
                      Phone Number
                    </label>
                    <input
                      {...register("phone", { required: true })}
                      type="number"
                      class="form-control"
                      id="phone"
                    />
                    {errors.phone && (
                      <p className="text-danger">Number is required</p>
                    )}
                  </div>
                  <div class="mb-3">
                    <label for="phone" class="form-label">
                      Address
                    </label>
                    <textarea
                      name=""
                      className="form-control"
                      id=""
                      cols="3"
                      rows="3"
                      {...register("address", { required: true })}
                    ></textarea>
                    {errors.address && (
                      <p className="text-danger">Address is required</p>
                    )}
                  </div>
                  <div class="mb-3">
                    <label for="payment" class="form-label">
                      Select payment method
                    </label>
                    <select
                      className="form-control mb-2"
                      {...register("paymentMethod", { required: true })}
                      id="payment"
                    >
                      <option selected value="bkash">
                        bKash
                      </option>
                      <option value="nagad">Nagad</option>
                      <option value="btc">BTC</option>
                    </select>
                    {errors.paymentMethod && (
                      <p className="text-danger">Payment Method is required</p>
                    )}
                    <div className="row">
                      <div className="col-lg-4 mx-auto">
                        <div>
                          <p className="m-0">bKash: 01715343037 (Personal)</p>
                          <div className="m-0 card p-2 shaodw-sm">
                            <p className="m-0">
                              <b>Please complete your bKash payment at first</b>
                            </p>
                            <p className="m-0">then fill-up the form below.</p>
                            <p className="m-0">
                              Also, <b>note that 1.85%</b>
                            </p>
                            <p className="m-0">
                              bKash "SEND MONEY" cost will be added with
                              Calculation of Dollar to BDT $1=86 tk (Send Money)
                            </p>
                          </div>
                          <span>
                            Send Money: $
                            {subtotal ? subtotal : products.totalAmount}
                          </span>
                        </div>
                      </div>
                      <div className="col-lg-4">
                        <div>
                          <p className="m-0">Nagad: 01715343037 (Personal)</p>
                          <div className="m-0 card p-2 shaodw-sm">
                            <p className="m-0">
                              <b>Please complete your bKash payment at first</b>
                            </p>
                            <p className="m-0">then fill-up the form below.</p>
                            <p className="m-0">
                              Also, <b>note that 1.85%</b>
                            </p>
                            <p className="m-0">
                              bKash "SEND MONEY" cost will be added with
                              Calculation of Dollar to BDT $1=86 tk (Send Money)
                            </p>
                          </div>
                          <span>
                            Send Money: $
                            {subtotal ? subtotal : products.totalAmount}
                          </span>
                        </div>
                      </div>
                      <div className="col-lg-4">
                        <div>
                          <div className="card">
                            <p className="m-0">
                              Only BTC Address:
                              <input
                                type="text"
                                className="form-control"
                                readOnly
                                disabled
                                defaultValue="38swY8TrjdrWE7xg5YDC453oQL1BVwMVHz"
                              />
                              <div
                                className="qr-code"
                                style={{ backgroundImage: `url(${BTC})` }}
                              ></div>
                            </p>
                          </div>
                          <span>
                            Send: ${subtotal ? subtotal : products.totalAmount}{" "}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  {watch("paymentMethod") && (
                    <>
                      <div class="mb-3">
                        <label for="phone-p" class="form-label">
                          {watch("paymentMethod") === "bkash" && "bKash No."}
                          {watch("paymentMethod") === "nagad" && "Nagad No."}
                          {watch("paymentMethod") === "btc" && "BTC Address."}
                        </label>
                        <input
                          type="text"
                          {...register("senderNumber", { required: true })}
                          class="form-control"
                          id="phone-p"
                        />
                        {errors.senderNumber && (
                          <p className="text-danger">This filed is required</p>
                        )}
                      </div>
                      {watch("paymentMethod") !== "btc" && (
                        <div class="mb-3">
                          <label for="trxId" class="form-label">
                            TrxID
                          </label>
                          <input
                            {...register("TrxID", { required: true })}
                            type="text"
                            class="form-control"
                            id="trxId"
                          />
                          {errors.TrxID && (
                            <p className="text-danger">
                              This filed is required
                            </p>
                          )}
                        </div>
                      )}
                    </>
                  )}

                  <div class="mb-3 form-check">
                    <input
                      type="checkbox"
                      class="form-check-input"
                      id="exampleCheck1"
                      required
                    />
                    <label class="form-check-label" for="exampleCheck1">
                      Agree with our terms policy
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="card">
              <div className="card-body">
                {products?.items.map((product) => (
                  <Single item={product} />
                ))}
              </div>
              <div className="card-footer">
                <p className="m-0">Total:{products.totalAmount}$</p>
                <p className="m-0">
                  Pay :{subtotal ? subtotal : products.totalAmount}$
                </p>
                <div className="my-0">
                  <span>have spacial code?</span>
                  <input
                    type="text"
                    placeholder="enter promo code"
                    className="form-control"
                    onChange={(e) => setDiscountCode(e.target.value)}
                  />{" "}
                  <Button
                    size="small"
                    variant="contained"
                    sx={{ my: 1 }}
                    color="primary"
                    onClick={() => {
                      validateDiscount();
                    }}
                    disabled={!discountCode.length}
                  >
                    Apply
                  </Button>
                </div>
                {!loading ? (
                  <Button
                    type="submit"
                    role="button"
                    variant="contained"
                    color="success"
                  >
                    Confirm Order
                  </Button>
                ) : (
                  <button class="btn btn-primary" type="button" disabled>
                    <span
                      class="spinner-grow spinner-grow-sm"
                      role="status"
                      aria-hidden="true"
                    ></span>
                    Processing...
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Checkout;
