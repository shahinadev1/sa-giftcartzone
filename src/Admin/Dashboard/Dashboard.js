import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";

const Dashboard = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-3">
          <Sidebar />
        </div>
        <div className="col-lg-9 mt-2" style={{ backgroundColor: "#fff" }}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
