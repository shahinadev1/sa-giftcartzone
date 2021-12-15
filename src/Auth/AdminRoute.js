import React, { useState } from "react";
import TopBarProgress from "react-topbar-progress-indicator";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import useAuth from "../Hooks/useAuth";

function AdminRoute({ children }) {
  "";
  TopBarProgress.config({
    barColors: {
      0: "#fff",
      "1.0": "#fff",
    },
    shadowBlur: 5,
  });

  const state1 = useSelector((state) => state.firebaseReducer);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAdmin, isAdminLoading, isLoading } = useAuth();
  console.log(state1);
  if (isLoading || isAdminLoading) return <TopBarProgress />;
  if (!user?.email) {
    navigate("/login", { state: location.pathname || "/" });
  }
  if (!isAdmin) navigate("/");
  return children;
}

export default AdminRoute;
