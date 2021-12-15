import React from "react";
import useAuth from "../Hooks/useAuth";
import TopBarProgress from "react-topbar-progress-indicator";
import { useNavigate, useLocation } from "react-router-dom";

function AdminRoute({ children }) {
  "";
  TopBarProgress.config({
    barColors: {
      0: "#fff",
      "1.0": "#fff",
    },
    shadowBlur: 5,
  });
  const { user, isAdminLoading, isLoading, isAdmin } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  if (!user.email && !isAdmin) return <TopBarProgress />;
  if (!user.email && !isAdmin) {
    navigate("/login", { state: location.pathname || "/" });
  }
  return children;
}

export default AdminRoute;
