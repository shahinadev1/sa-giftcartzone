import React from "react";
import TopBarProgress from "react-topbar-progress-indicator";
const LoadingTop = () => {
  TopBarProgress.config({
    barColors: {
      0: "#fff",
      "1.0": "#fff",
    },
    shadowBlur: 5,
  });
  return <TopBarProgress />;
};

export default LoadingTop;
