import React from "react";
import useAuth from "../Hooks/useAuth";
import TopBarProgress from "react-topbar-progress-indicator";
import { useNavigate, useLocation } from "react-router-dom";

function PrivateRoute({ children }) {
  TopBarProgress.config({
    barColors: {
      0: "#fff",
      "1.0": "#fff",
    },
    shadowBlur: 5,
  });
  const { user, isLoading } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  if (isLoading) return <TopBarProgress />;
  if (!user.email) {
    navigate("/login", { state: location.pathname || "/" });
  }
  return children;
}

export default PrivateRoute;
