import React from "react";
import TopBarProgress from "react-topbar-progress-indicator";
import { useNavigate, useLocation } from "react-router-dom";
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

  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAdmin, isAdminLoading, isLoading } = useAuth();
  if (isAdminLoading | isLoading) return <TopBarProgress />;
  if (!isAdmin) navigate("/");

  return children;
}

export default AdminRoute;
