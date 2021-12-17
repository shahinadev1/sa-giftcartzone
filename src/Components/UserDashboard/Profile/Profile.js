import React, { useRef, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import useAuth from "../../../Hooks/useAuth";

const Profile = () => {
  const { user, updateUser2, message, isLoading } = useAuth();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const updateProfile = (e) => {
    e.preventDefault();
    if (!name.length) return;
    updateUser2(name);
  };
  return (
    <div className="card border-0 shadow-sm ">
      <div className="card-header bg-light border-0 px-2">
        <h6 className="text-muted">Your Profile</h6>
      </div>
      <div className="card-body mb-2">
        <form onSubmit={updateProfile}>
          <div className="row">
            <div className="col-lg-12 mb-3">
              <TextField
                id="demo-helper-text-aligned"
                label="Name"
                onChange={(e) => setName(e.target.value)}
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
            {/* <div className="col-lg-12 mb-3">
              <TextField
                helperText="Please enter your name"
                id="demo-helper-text-aligned"
                label="Phone"
                onChange={(e) => setPhone(e.target.value)}
                size="small"
                sx={{ width: "100%" }}
              />
            </div> */}
          </div>

          <Button
            disabled={(user.displayName === name) | isLoading}
            variant="contained"
            className="mb-3"
            type="submit"
            role="button"
          >
            Save
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
