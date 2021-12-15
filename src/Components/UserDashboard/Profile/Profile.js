import React, { useRef } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useSelector } from "react-redux";

const Profile = () => {
  const user = useSelector((state) => state.firebaseInfo.user);
  return (
    <div className="card border-0 shadow-sm ">
      <div className="card-header bg-light border-0 px-2">
        <h6 className="text-muted">Your Profile</h6>
      </div>
      <div className="card-body mb-2">
        <form>
          <div className="row">
            <div className="col-lg-12 mb-3">
              <TextField
                id="demo-helper-text-aligned"
                label="Name"
                defaultValue={user.displayName}
                size="small"
                sx={{ width: "100%" }}
              />
            </div>
            <div className="col-lg-12 mb-3">
              <TextField
                id="demo-helper-text-aligned"
                label="Email"
                size="small"
                helperText="Email can't be changed."
                defaultValue={user.email}
                disabled
                sx={{ width: "100%" }}
              />
            </div>
            <div className="col-lg-12 mb-3">
              <TextField
                helperText="Please enter your name"
                id="demo-helper-text-aligned"
                label="Phone"
                size="small"
                sx={{ width: "100%" }}
              />
            </div>
          </div>
          <Button variant="contained" className="mb-3">
            Save
          </Button>
        </form>
        <div className="card-footer border-0 bg-transparent">
          <h5 className="text-muted">Delivery Address</h5>
          <div className="card">
            <div className="card-body">
              {/* <!-- Button trigger modal --> */}
              <button
                type="button"
                class="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal">
                Launch demo modal
              </button>

              {/* <!-- Modal --> */}
              <div
                class="modal fade"
                id="exampleModal"
                tabindex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="exampleModalLabel">
                        Add Address
                      </h5>
                      <button
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                      <form>
                        <div className="row">
                          <div className="col-lg-12 mb-3">
                            <TextField
                              id="demo-helper-text-aligned"
                              label="Name"
                              defaultValue={user.displayName}
                              size="small"
                              sx={{ width: "100%" }}
                            />
                          </div>
                          <div className="col-lg-12 mb-3">
                            <TextField
                              id="demo-helper-text-aligned"
                              label="Email"
                              size="small"
                              helperText="Email can't be changed."
                              defaultValue={user.email}
                              disabled
                              sx={{ width: "100%" }}
                            />
                          </div>
                          <div className="col-lg-12 mb-3">
                            <TextField
                              helperText="Please enter your name"
                              id="demo-helper-text-aligned"
                              label="Phone"
                              size="small"
                              sx={{ width: "100%" }}
                            />
                          </div>
                        </div>
                        <Button variant="contained" className="mb-3">
                          Save
                        </Button>
                      </form>
                    </div>
                    {/* <div class="modal-footer">
                      <button
                        type="button"
                        class="btn btn-secondary"
                        data-bs-dismiss="modal">
                        Close
                      </button>
                      <button type="button" class="btn btn-primary">
                        Save changes
                      </button>
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
