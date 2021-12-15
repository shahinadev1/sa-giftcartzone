import React from "react";
import { useNavigate } from "react-router-dom";
function SaLink({route}) {
  const navigate = useNavigate();
  return navigate(route);
}

export default SaLink;
