import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar/Sidebar";
const UserDashboard = () => {
  document.body.style.backgroundColor = "#eee";
  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-3">
          <Sidebar />
        </div>
        <div className="col-lg-9  mt-2" style={{ backgroundColor: "#ffff" }}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
